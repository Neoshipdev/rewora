/**
 * Stiahne obrázky a logá z rewora.com/sk do public/images/.
 * Spustenie: node scripts/fetch-assets.mjs
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://rewora.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36';

async function getHtml(path) {
  const res = await fetch(BASE + path, { headers: { 'User-Agent': UA, 'Accept-Language': 'sk' } });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.text();
}

/** Zoznam stránok, z ktorých zbierame obrázky. */
async function pagePaths() {
  const paths = ['/sk/', '/sk/cennik/', '/sk/pripadove-studie/'];

  /* Výpis blogu — obsahuje náhľadové obrázky článkov. */
  for (let page = 1; page <= 6; page++) paths.push(`/sk/blog/${page > 1 ? `?page=${page}` : ''}`);

  const studies = await readdir(join(ROOT, 'content', 'pripadove-studie'));
  const studyUrls = {
    'fixservis.md': '/sk/pripadove-studie/ako-sme-pre-fixservis-pomocou-recenzii-zvysili-obrat-o-vyse-10/',
    'drinkcentrum.md': '/sk/pripadove-studie/rewora-ako-katalyzator-rastu-drinkcentrum/',
    'kilpi.md': '/sk/pripadove-studie/od-dovery-k-vykonu-ako-rewora-pomohla-eshopu-kilpi/',
  };
  studies.forEach((f) => studyUrls[f] && paths.push(studyUrls[f]));

  const blog = await readdir(join(ROOT, 'content', 'blog'));
  blog
    .filter((f) => f.endsWith('.md'))
    .forEach((f) => paths.push(`/sk/blog/${f.replace(/\.md$/, '')}/`));

  return paths;
}

/** Najväčšia varianta zo srcset, inak src. */
function pickSources(html) {
  const urls = new Set();

  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const src = /src="([^"]+)"/i.exec(tag)?.[1];
    if (src) urls.add(src);
    const srcset = /srcset="([^"]+)"/i.exec(tag)?.[1];
    if (srcset) {
      srcset
        .split(',')
        .map((part) => part.trim().split(/\s+/)[0])
        .filter(Boolean)
        .forEach((u) => urls.add(u));
    }
  }
  for (const m of html.matchAll(/<source\b[^>]*srcset="([^"]+)"/gi)) {
    m[1]
      .split(',')
      .map((part) => part.trim().split(/\s+/)[0])
      .filter(Boolean)
      .forEach((u) => urls.add(u));
  }
  for (const m of html.matchAll(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/gi)) {
    urls.add(m[1]);
  }

  return [...urls]
    .map((u) => (u.startsWith('http') ? u : u.startsWith('/') ? BASE + u : null))
    .filter((u) => u && u.startsWith(BASE))
    .map((u) => u.replace(BASE, ''));
}

/** /media/images/foo.avif → public/images/media/foo.avif */
const localPath = (remote) =>
  remote.startsWith('/media/')
    ? join('images', 'media', remote.split('/').pop())
    : remote.startsWith('/static/')
      ? join('images', 'static', remote.split('/').pop())
      : join('images', remote.split('/').pop());

async function download(remote) {
  const target = join(ROOT, 'public', localPath(remote));
  const res = await fetch(BASE + remote, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await res.arrayBuffer()));
  return target;
}

const paths = await pagePaths();
console.log(`Prehľadávam ${paths.length} stránok…`);

const remoteUrls = new Set();
for (const path of paths) {
  try {
    pickSources(await getHtml(path)).forEach((u) => remoteUrls.add(u));
  } catch (err) {
    console.error('✗ stránka', path, err.message);
  }
}

/** Obrázky odkazované priamo v stiahnutom markdowne (istota pre blog). */
for (const dir of ['blog', 'pripadove-studie']) {
  const files = await readdir(join(ROOT, 'content', dir));
  for (const file of files.filter((f) => f.endsWith('.md'))) {
    const raw = await readFile(join(ROOT, 'content', dir, file), 'utf8');
    for (const m of raw.matchAll(/\]\((https:\/\/rewora\.com)?(\/(?:media|static)\/[^)\s]+)\)/g)) {
      remoteUrls.add(m[2]);
    }
  }
}

console.log(`Nájdených ${remoteUrls.size} obrázkov, sťahujem…`);

const manifest = {};
let ok = 0;
for (const remote of remoteUrls) {
  try {
    await download(remote);
    manifest[remote] = '/' + localPath(remote).replace(/\\/g, '/');
    ok++;
  } catch (err) {
    console.error('✗', remote, err.message);
  }
}

await writeFile(
  join(ROOT, 'public', 'images', 'manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf8'
);

console.log(`Hotovo: ${ok}/${remoteUrls.size} obrázkov v public/images/`);
