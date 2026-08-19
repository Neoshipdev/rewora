/**
 * Oreže rámovanie okolo hotspot vizuálu tak, aby fotografia tvorila celý obrázok.
 * Zdroj sa nemení — výsledok sa ukladá ako nový súbor.
 *
 * Spustenie: node scripts/crop-hotspot.mjs
 */
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const SOURCE = 'image-hotspot-sk.format-avif.width-1400.avif';
const TARGET = 'hotspot-vizual.png';
const DIR = join(process.cwd(), 'public', 'images', 'media');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:3040/sk/', { waitUntil: 'domcontentloaded' });

const result = await page.evaluate(async (src) => {
  const img = new Image();
  img.src = `/images/media/${src}`;
  await img.decode();

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  /* Rám je hladká plocha (nízka variancia), fotka má vysokú — hľadáme prechod. */
  const at = (x, y) => {
    const i = (y * width + x) * 4;
    return (data[i] + data[i + 1] + data[i + 2]) / 3;
  };
  const variance = (values) => {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    return Math.sqrt(values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length);
  };
  const rowVar = (y) => {
    const values = [];
    for (let x = 0; x < width; x += 3) values.push(at(x, y));
    return variance(values);
  };
  const colVar = (x) => {
    const values = [];
    for (let y = 0; y < height; y += 3) values.push(at(x, y));
    return variance(values);
  };

  /* Okrajový pixel býva artefakt — hranicu potvrdíme až sériou riadkov nad prahom. */
  const THRESHOLD = 12;
  const RUN = 6;
  const SKIP = 10; /* prvých pár pixelov pri hrane sú artefakty kompresie */
  const edge = (limit, step, measure) => {
    let run = 0;
    for (let i = SKIP; i >= 0 && i < limit; i += step) {
      if (measure(i) >= THRESHOLD) {
        run++;
        if (run >= RUN) return i - (RUN - 1) * step;
      } else {
        run = 0;
      }
    }
    return SKIP;
  };

  let top = edge(height, 1, rowVar);
  let bottom = height - 1 - edge(height, 1, (i) => rowVar(height - 1 - i));
  let left = edge(width, 1, colVar);
  let right = width - 1 - edge(width, 1, (i) => colVar(width - 1 - i));

  /* Pár pixelov dovnútra kvôli zaobleným rohom a tieňu karty. */
  const inset = 6;
  left += inset;
  top += inset;
  right -= inset;
  bottom -= inset;

  const cropW = right - left + 1;
  const cropH = bottom - top + 1;
  const out = document.createElement('canvas');
  out.width = cropW;
  out.height = cropH;
  out.getContext('2d').drawImage(canvas, left, top, cropW, cropH, 0, 0, cropW, cropH);

  return {
    dataUrl: out.toDataURL('image/png'),
    original: `${width}x${height}`,
    crop: `${cropW}x${cropH}`,
    offset: `${left},${top}`,
  };
}, SOURCE);

await browser.close();

const base64 = result.dataUrl.replace(/^data:image\/png;base64,/, '');
await writeFile(join(DIR, TARGET), Buffer.from(base64, 'base64'));

console.log(`originál ${result.original} → orez ${result.crop} (od ${result.offset})`);
console.log(`uložené: public/images/media/${TARGET}`);
