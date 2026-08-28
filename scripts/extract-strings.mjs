/**
 * Vyzbiera všetky slovenské reťazce, ktoré treba preložiť:
 * dátové moduly (prekladajú sa cez tDeep) a volania t('…') v komponentoch.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BS = String.fromCharCode(92);

/** Rozdelí zdroják na reťazcové literály. */
function literals(src) {
  const out = [];
  for (let i = 0; i < src.length; i++) {
    const q = src[i];
    if (q !== "'" && q !== '"' && q !== '`') continue;
    let j = i + 1;
    let buf = '';
    while (j < src.length && src[j] !== q) {
      if (src[j] === BS) {
        buf += src[j] + src[j + 1];
        j += 2;
        continue;
      }
      if (src[j] === '\n' && q !== '`') {
        buf = null;
        break;
      }
      buf += src[j];
      j++;
    }
    if (buf !== null && j < src.length) {
      out.push(buf);
      i = j;
    }
  }
  return out;
}

const technicky = (s) =>
  !s ||
  s.includes('$' + '{') ||
  (!s.includes(' ') && (s.includes('/') || s.includes('@') || s.startsWith('.'))) ||
  s.endsWith('.md') ||
  s.startsWith('/') ||
  s.startsWith('#') ||
  s.startsWith('http') ||
  s.startsWith('mailto') ||
  s.startsWith('@') ||
  /^[a-z0-9-]+$/.test(s) ||
  !/[a-zA-ZáäčďéíĺľňóôŕšťúýžÁČĎÉÍĽŇÓŠŤÚÝŽ]/.test(s);

const DATA = [
  'lib/assets.ts',
  'lib/content.ts',
  'lib/features.ts',
  'lib/guides.ts',
  'lib/panel-data.ts',
  'lib/pricing.ts',
  'lib/posts.ts',
];

const subory = [];
const zbierPriecinok = (dir) => {
  for (const meno of readdirSync(dir)) {
    const cesta = join(dir, meno);
    if (statSync(cesta).isDirectory()) zbierPriecinok(cesta);
    else if (/\.tsx?$/.test(meno)) subory.push(cesta);
  }
};
zbierPriecinok('components');

const retazce = new Set();

/* dátové moduly — všetky netechnické literály */
for (const f of DATA) {
  for (const l of literals(readFileSync(f, 'utf8'))) {
    if (!technicky(l)) retazce.add(l);
  }
}

/* komponenty — argumenty t('…') a dátové konštanty v components/pages */
for (const f of subory) {
  const src = readFileSync(f, 'utf8');
  const volania = src.split("t('").slice(1);
  for (const kus of volania) {
    const koniec = kus.indexOf("')");
    if (koniec > 0) {
      const text = kus.slice(0, koniec);
      if (!technicky(text) && !text.includes("'")) retazce.add(text);
    }
  }
  /* viacriadkové t(\n  '…'\n) */
  for (const kus of src.split('t(\n').slice(1)) {
    const m = /^\s*'([^']+)'/.exec(kus);
    if (m && !technicky(m[1])) retazce.add(m[1]);
  }
  /* konštanty prekladané cez tDeep priamo v komponente stránky */
  if (/tDeep\((steps|bandStats)/.test(src)) {
    const zaciatok = src.indexOf('const ');
    for (const l of literals(src.slice(zaciatok, src.indexOf('export default')))) {
      if (!technicky(l)) retazce.add(l);
    }
  }
}

const zoznam = [...retazce].sort((a, b) => a.localeCompare(b, 'sk'));
writeFileSync('scripts/strings.json', JSON.stringify(zoznam, null, 2), 'utf8');
console.log('retazcov:', zoznam.length, 'znakov:', zoznam.join('').length);
