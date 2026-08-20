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

/**
 * Cesty k obrázkom z public/ uvádzame v komponentoch absolútne, takže ich Next
 * neprefixuje — dorobíme to tu. Rátame aj s JS balíkmi: časť widgetov sa
 * vykresľuje až na klientovi a cesta k obrázku je v nich ako reťazec.
 * /_next/ a routy rieši samotný Next cez basePath.
 */
async function applyBasePath() {
  if (!BASE) return 0;
  const files = await walk(OUT);
  const images = new RegExp('(?<!rewora[.]com)(?<!' + BASE + ')/images/', 'g');
  const routy = new RegExp('(?<!rewora[.]com)(?<!' + BASE + ')/sk/', 'g');

  let changed = 0;
  for (const file of files) {
    if (!/\.(html|css|js|txt|xml|json)$/i.test(file)) continue;
    const original = await readFile(file, 'utf8');
    let updated = original.replace(images, `${BASE}/images/`).replace(routy, `${BASE}/sk/`);
    /* url(/…) v CSS mieri na koreň domény, ten na Pages patrí niekomu inému */
    if (/\.(css|html)$/i.test(file)) {
      const cssUrl = new RegExp('url[(]/(?!/|' + BASE.slice(1) + '/)', 'g');
      updated = updated.replace(cssUrl, 'url(' + BASE + '/');
    }
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
  execSync('npx next build', {
    stdio: 'inherit',
    env: { ...process.env, NEXT_EXPORT: '1', NEXT_EXPORT_BASE: BASE },
  });
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

/* Koreň exportu presmerujeme na slovenskú verziu — statický hosting nevie 301. */
const home = `${BASE}/sk/`;
await writeFile(
  join(OUT, 'index.html'),
  `<!doctype html>
<html lang="sk">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${home}">
<link rel="canonical" href="${home}">
<title>Rewora</title>
</head>
<body>
<p>Presmerovanie na <a href="${home}">slovenskú verziu</a>…</p>
<script>location.replace(${JSON.stringify(home)});</script>
</body>
</html>
`,
  'utf8'
);

const pages = (await walk(OUT)).filter((f) => f.endsWith('.html'));
const size = (await Promise.all((await walk(OUT)).map((f) => stat(f)))).reduce(
  (sum, s) => sum + s.size,
  0
);
console.log(`\nHotovo: ${pages.length} HTML stránok, ${(size / 1024 / 1024).toFixed(1)} MB v out/`);
