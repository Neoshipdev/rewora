/**
 * Preklady držíme ako slovník „slovenský originál → preklad“.
 * Vďaka tomu ostávajú dáta a komponenty jednojazyčné a preklad
 * sa aplikuje až pri vykreslení konkrétnej jazykovej mutácie.
 */
import cs from './dict/cs.json';
import en from './dict/en.json';
import type { Lang } from './i18n';

const slovniky: Record<Lang, Record<string, string>> = {
  sk: {},
  cs: cs as Record<string, string>,
  en: en as Record<string, string>,
};

/** Reťazce, ktoré nie sú textom pre používateľa (cesty, triedy, farby). */
const technicky = (s: string) =>
  s.startsWith('/') || s.startsWith('#') || s.startsWith('http') || /^[a-z-]+$/.test(s);

export type T = (sk: string) => string;

export function createT(lang: Lang): T {
  const slovnik = slovniky[lang];
  return (sk: string) => slovnik[sk] ?? sk;
}

/** Preloží všetky textové hodnoty v (vnorenej) dátovej štruktúre. */
export function tDeep<H>(hodnota: H, lang: Lang): H {
  if (lang === 'sk') return hodnota;
  const t = createT(lang);
  const prejdi = (v: unknown): unknown => {
    if (typeof v === 'string') return technicky(v) ? v : t(v);
    if (Array.isArray(v)) return v.map(prejdi);
    if (v && typeof v === 'object') {
      return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, prejdi(x)]));
    }
    return v;
  };
  return prejdi(hodnota) as H;
}
