/**
 * Statický HTML export webu na pripomienkovanie.
 *
 *   node scripts/build-static.mjs            → out/ pre koreň domény
 *   node scripts/build-static.mjs --base=/rewora  → pre GitHub Pages projektu
 *
 * Generátor PDF ukážky (app/api) je serverový, preto sa počas exportu
 * dočasne odloží — v statickej verzii nefunguje.
 */
import { execSync } from 'node:child_process';
import { readdir, readFile, rename, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const API = join(ROOT, 'app', 'api');
const API_PARKED = join(ROOT, '.api-parked');
const OUT = join(ROOT, 'out');

const baseArg = process.argv.find((a) => a.startsWith('--base='));
const BASE = (baseArg ? baseArg.split('=')[1] : '').replace(/\/$/, '');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

/** Absolútne cesty prefixneme, aby web fungoval aj v podpriečinku domény. */
async function applyBasePath() {
  if (!BASE) return 0;
  const files = (await walk(OUT)).filter((f) => /\.(html|css|txt|xml|json)$/i.test(f));
  let changed = 0;
  for (const file of files) {
    const original = await readFile(file, 'utf8');
    const updated = original
      .replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`)
      .replace(/url\(\/(?!\/)/g, `url(${BASE}/`)
      .replace(/"\/_next\//g, `"${BASE}/_next/`);
    if (updated !== original) {
      await writeFile(file, updated, 'utf8');
      changed++;
    }
  }
  return changed;
}

console.log(BASE ? `Export pre podpriečinok ${BASE}` : 'Export pre koreň domény');

if (existsSync(API)) {
  await rename(API, API_PARKED);
  console.log('· app/api dočasne odložené (serverové routy sa neexportujú)');
}

try {
  execSync('npx next build', { stdio: 'inherit', env: { ...process.env, NEXT_EXPORT: '1' } });
} finally {
  if (existsSync(API_PARKED)) {
    await rename(API_PARKED, API);
    console.log('· app/api vrátené späť');
  }
}

const changed = await applyBasePath();
if (BASE) console.log(`· cesty prefixnuté v ${changed} súboroch`);

/* GitHub Pages inak ignoruje priečinky začínajúce podčiarkovníkom (_next). */
await writeFile(join(OUT, '.nojekyll'), '', 'utf8');

const pages = (await walk(OUT)).filter((f) => f.endsWith('.html'));
const size = (await Promise.all((await walk(OUT)).map((f) => stat(f)))).reduce(
  (sum, s) => sum + s.size,
  0
);
console.log(`\nHotovo: ${pages.length} HTML stránok, ${(size / 1024 / 1024).toFixed(1)} MB v out/`);
