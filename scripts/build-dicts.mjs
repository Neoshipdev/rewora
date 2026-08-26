/**
 * Zloží čiastkové slovníky zo scripts/dict-parts do lib/dict/{cs,en}.json
 * a vypíše reťazce, ktoré ešte nemajú preklad.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CASTI = 'scripts/dict-parts';
const BS = String.fromCharCode(92);

/** V zdrojákoch sú zbytočné escapy (\") — kľúč musí sedieť s hodnotou za behu. */
const normalizuj = (s) => s.split(BS + '"').join('"').split(BS + "'").join("'");

const zoznam = JSON.parse(readFileSync('scripts/strings.json', 'utf8')).map(normalizuj);

for (const lang of ['cs', 'en']) {
  const slovnik = {};
  for (const meno of readdirSync(CASTI).filter((m) => m.startsWith(`${lang}-`)).sort()) {
    const cast = JSON.parse(readFileSync(join(CASTI, meno), 'utf8'));
    for (const [k, v] of Object.entries(cast)) slovnik[normalizuj(k)] = v;
  }

  const chyba = zoznam.filter((s) => !(s in slovnik));
  /* cisla a ceny do zoznamu z komponentov nespadnu, preto ich neriesime ako navyse */
  const navyse = Object.keys(slovnik).filter((k) => !zoznam.includes(k) && /[a-zA-Z]{3}/.test(k));

  writeFileSync(`lib/dict/${lang}.json`, JSON.stringify(slovnik, null, 2) + '\n', 'utf8');
  console.log(`${lang}: prelozenych ${Object.keys(slovnik).length}, chyba ${chyba.length}, navyse ${navyse.length}`);
  chyba.slice(0, 40).forEach((s) => console.log('   CHYBA:', JSON.stringify(s)));
  navyse.slice(0, 10).forEach((s) => console.log('   NAVYSE:', JSON.stringify(s)));
}
