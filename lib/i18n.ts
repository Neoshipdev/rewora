/**
 * Jazykové verzie webu. Adresy musia sedieť s pôvodným rewora.com:
 * angličtina beží v koreni, slovenčina na /sk/ a čeština na /cs/.
 */
export type Lang = 'sk' | 'cs' | 'en';

export const LANGS: Lang[] = ['sk', 'cs', 'en'];

/**
 * Predpona pri behu v podpriecinku domeny (GitHub Pages). Next si vlastne
 * odkazy prefixuje sam, nase `<a href>` v datach musime prefixnut tu — na
 * serveri aj na kliente rovnako, preto NEXT_PUBLIC_.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Adresa s predponou podpriecinka. */
const p = (url: string) => (BASE_PATH ? BASE_PATH + url : url);

/** Adresa bez predpony — pre kanonicke URL a sitemap. */
export const bezPredpony = (url: string) =>
  BASE_PATH && url.startsWith(BASE_PATH) ? url.slice(BASE_PATH.length) || '/' : url;

export const langLabel: Record<Lang, string> = { sk: 'SK', cs: 'CZ', en: 'EN' };
export const htmlLang: Record<Lang, string> = { sk: 'sk', cs: 'cs', en: 'en' };

/** Koreň jazyka — angličtina nemá predponu. */
export const home: Record<Lang, string> = { sk: p('/sk/'), cs: p('/cs/'), en: p('/') };

/** Cesty jednotlivých sekcií; null = v danom jazyku neexistuje. */
export const routes = {
  blog: { sk: p('/sk/blog/'), cs: p('/cs/blog/'), en: p('/resources/') },
  pricing: { sk: p('/sk/cennik/'), cs: p('/cs/cenik/'), en: p('/pricing/') },
  cases: { sk: p('/sk/pripadove-studie/'), cs: p('/cs/pripadove-studie/'), en: p('/case-studies/') },
  thanks: { sk: p('/sk/dakujeme/'), cs: p('/cs/dekujeme/'), en: p('/thank-you/') },
  privacy: {
    sk: p('/sk/ochrana-osobnych-udajov/'),
    cs: p('/cs/ochrana-osobnich-udaju/'),
    en: p('/personal-data-protection/'),
  },
  terms: {
    sk: p('/sk/vseobecne-obchodne-podmienky/'),
    cs: p('/cs/vseobecne-obchodni-podminky/'),
    en: p('/general-terms-and-conditions/'),
  },
  shoptet: {
    sk: p('/sk/shoptet-obchodne-podmienky/'),
    cs: p('/cs/shoptet-obchodni-podminky/'),
    en: null,
  },
  /* stránky, ktoré pribudli na novom webe */
  about: { sk: p('/sk/o-nas/'), cs: p('/cs/o-nas/'), en: p('/about/') },
  contact: { sk: p('/sk/kontakt/'), cs: p('/cs/kontakt/'), en: p('/contact/') },
  partner: { sk: p('/sk/partnersky-program/'), cs: p('/cs/partnersky-program/'), en: p('/partner-program/') },
  demo: { sk: p('/sk/ukazka/'), cs: p('/cs/ukazka/'), en: p('/demo/') },
  shopifyGuide: {
    sk: p('/sk/navody/shopify-plugin/'),
    cs: p('/cs/navody/shopify-plugin/'),
    en: p('/guides/shopify-plugin/'),
  },
};

export type RouteKey = keyof typeof routes;

export const route = (key: RouteKey, lang: Lang): string | null => routes[key][lang];

/** Priečinok so stiahnutým obsahom pre daný jazyk. */
export const contentDir: Record<Lang, string> = { sk: '', cs: 'cs/', en: 'en/' };

/** Texty rozhrania — navigácia, tlačidlá, pätička, popisky výpisov. */
export const ui = {
  sk: {
    nav: { features: 'Funkcie', cases: 'Prípadové štúdie', pricing: 'Cenník', integrations: 'Integrácie', blog: 'Blog', about: 'O nás' },
    aboutMenu: { about: 'O Rewore', contact: 'Kontakt', partner: 'Partnerský program' },
    cta: { demo: 'Ukážka na vašom e-shope', try: 'Vyskúšať teraz' },
    footer: { faq: 'Časté otázky', privacy: 'Ochrana osobných údajov', terms: 'Všeobecné obchodné podmienky', rights: 'Všetky práva vyhradené.' },
    blogHero: { eyebrow: 'Blog', title: 'Recenzie, sociálny dôkaz a e-commerce v praxi' },
    casesHero: { eyebrow: 'Referencie', title: 'Pomáhame klientom dosiahnuť merateľné výsledky' },
    more: 'Čítať článok →',
    caseCta: 'Prečítať si prípadovú štúdiu →',
    back: { blog: 'Späť na blog', cases: 'Späť na prípadové štúdie' },
    langSwitch: 'Jazyk',
  },
  cs: {
    nav: { features: 'Funkce', cases: 'Případové studie', pricing: 'Ceník', integrations: 'Integrace', blog: 'Blog', about: 'O nás' },
    aboutMenu: { about: 'O Reworze', contact: 'Kontakt', partner: 'Partnerský program' },
    cta: { demo: 'Ukázka na vašem e-shopu', try: 'Vyzkoušet nyní' },
    footer: { faq: 'Časté otázky', privacy: 'Ochrana osobních údajů', terms: 'Všeobecné obchodní podmínky', rights: 'Všechna práva vyhrazena.' },
    blogHero: { eyebrow: 'Blog', title: 'Recenze, sociální důkaz a e-commerce v praxi' },
    casesHero: { eyebrow: 'Reference', title: 'Pomáháme klientům dosáhnout měřitelných výsledků' },
    more: 'Číst článek →',
    caseCta: 'Přečíst si případovou studii →',
    back: { blog: 'Zpět na blog', cases: 'Zpět na případové studie' },
    langSwitch: 'Jazyk',
  },
  en: {
    nav: { features: 'Features', cases: 'Case studies', pricing: 'Pricing', integrations: 'Integrations', blog: 'Resources', about: 'About' },
    aboutMenu: { about: 'About Rewora', contact: 'Contact', partner: 'Partner program' },
    cta: { demo: 'See Rewora on your store', try: 'Try it now' },
    footer: { faq: 'FAQ', privacy: 'Privacy policy', terms: 'Terms and conditions', rights: 'All rights reserved.' },
    blogHero: { eyebrow: 'Resources', title: 'Reviews, social proof and e-commerce in practice' },
    casesHero: { eyebrow: 'Case studies', title: 'We help clients achieve measurable results' },
    more: 'Read the article →',
    caseCta: 'Read the case study →',
    back: { blog: 'Back to resources', cases: 'Back to case studies' },
    langSwitch: 'Language',
  },
} as const;

/** Adresy tej istej stránky v ostatných jazykoch (pre prepínač jazykov). */
export const altOf = (key: RouteKey): Partial<Record<Lang, string>> =>
  Object.fromEntries(LANGS.map((l) => [l, routes[key][l]]).filter(([, v]) => v));

/** Zoznam jazykových alternatív jednej stránky pre hreflang. */
export const alternates = (key: RouteKey) =>
  Object.fromEntries(LANGS.map((l) => [htmlLang[l], routes[key][l]]).filter(([, v]) => v)) as Record<string, string>;
