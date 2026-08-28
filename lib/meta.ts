import type { Metadata } from 'next';
import { LANGS, bezPredpony, home, htmlLang, routes, type Lang, type RouteKey } from './i18n';

const ogLocale: Record<Lang, string> = { sk: 'sk_SK', cs: 'cs_CZ', en: 'en_US' };

/** Kľúč stránky — 'home' je koreň jazyka, ostatné sú cesty z routes. */
export type PageKey = RouteKey | 'home';

const url = (key: PageKey, lang: Lang): string | null => {
  const cesta = key === 'home' ? home[lang] : routes[key][lang];
  return cesta ? bezPredpony(cesta) : null;
};

/** Jazykové alternatívy stránky pre hreflang. */
const languages = (key: PageKey) =>
  Object.fromEntries(
    LANGS.map((l) => [htmlLang[l], url(key, l)]).filter(([, v]) => v)
  ) as Record<string, string>;

/** Titulok a popis stránky vo všetkých jazykoch. */
export const seo: Record<Lang, Partial<Record<PageKey, { title: string; description: string }>>> = {
  sk: {
    home: {
      title: 'Rewora ★ Na recenziách záleží',
      description:
        'Recenzie, poradňa, hotspoty a BI dáta. Nasaďte sociálny dôkaz na celý e-shop a sledujte, ako rastie konverzný pomer.',
    },
    blog: {
      title: 'Blog ★ Rewora',
      description:
        'Články o recenziách, sociálnom dôkaze, obsahovom marketingu a e-commerce od tímu Rewora.',
    },
    pricing: {
      title: 'Cenník ★ Rewora',
      description:
        'Balíky Rewora: Bezplatný, Štandardný, Profesionálny a Podnikový. Widgety pre recenzie, poradňu, hotspoty a BI dáta.',
    },
    cases: {
      title: 'Prípadové štúdie ★ Rewora',
      description:
        'Ako naši zákazníci rastú s Rewora — merateľné výsledky z e-shopov FixServis, Drinkcentrum a kilpi.cz.',
    },
    thanks: {
      title: 'Ďakujeme ★ Rewora',
      description: 'Ďakujeme za váš záujem o Reworu — čoskoro sa vám ozveme.',
    },
    privacy: {
      title: 'Ochrana osobných údajov ★ Rewora',
      description: 'Zásady spracúvania a ochrany osobných údajov v službe Rewora.',
    },
    terms: {
      title: 'Všeobecné obchodné podmienky ★ Rewora',
      description: 'Všeobecné obchodné podmienky pre používanie služby Rewora.',
    },
    shoptet: {
      title: 'Obchodné podmienky pre Shoptet ★ Rewora',
      description: 'Obchodné podmienky pre používanie Rewory na platforme Shoptet.',
    },
    about: {
      title: 'O nás ★ Rewora',
      description:
        'Rewora je slovenská SaaS platforma pre zákaznícku skúsenosť. Na trhu od roku 2023, používa ju viac než 100 domén na Slovensku a v Česku.',
    },
    contact: {
      title: 'Kontakt ★ Rewora',
      description:
        'Ozvite sa nám — poradíme s nasadením Rewory, pripravíme ukážku na vašom e-shope alebo prejdeme cenník.',
    },
    partner: {
      title: 'Partnerský program ★ Rewora',
      description:
        'Pre agentúry, freelancerov a konzultantov: odporučte Reworu svojim klientom a poberajte opakovanú províziu.',
    },
    demo: {
      title: 'Ukážka Rewory na vašom e-shope ★ Rewora',
      description:
        'Zadajte adresu svojho e-shopu a do minúty dostanete PDF ukážku, ako by na ňom vyzerali recenzie, poradňa, hotspoty a BI dáta.',
    },
    shopifyGuide: {
      title: 'Nasadenie doplnku Rewora na Shopify ★ Rewora',
      description:
        'Krok za krokom: inštalácia doplnku Rewora Product Reviews, aktivácia app embed, vloženie widgetu na kartu produktu a schválenie prvej recenzie.',
    },
  },
  cs: {
    home: {
      title: 'Rewora ★ Na recenzích záleží',
      description:
        'Recenze, poradna, hotspoty a BI data. Nasaďte sociální důkaz na celý e-shop a sledujte, jak roste konverzní poměr.',
    },
    blog: {
      title: 'Blog ★ Rewora',
      description:
        'Články o recenzích, sociálním důkazu, obsahovém marketingu a e-commerce od týmu Rewora.',
    },
    pricing: {
      title: 'Ceník ★ Rewora',
      description:
        'Balíčky Rewora: Bezplatný, Standardní, Profesionální a Podnikový. Widgety pro recenze, poradnu, hotspoty a BI data.',
    },
    cases: {
      title: 'Případové studie ★ Rewora',
      description:
        'Jak naši zákazníci rostou s Rewora — měřitelné výsledky z e-shopů FixServis, Drinkcentrum a kilpi.cz.',
    },
    thanks: {
      title: 'Děkujeme ★ Rewora',
      description: 'Děkujeme za váš zájem o Reworu — brzy se vám ozveme.',
    },
    privacy: {
      title: 'Ochrana osobních údajů ★ Rewora',
      description: 'Zásady zpracování a ochrany osobních údajů ve službě Rewora.',
    },
    terms: {
      title: 'Všeobecné obchodní podmínky ★ Rewora',
      description: 'Všeobecné obchodní podmínky pro používání služby Rewora.',
    },
    shoptet: {
      title: 'Obchodní podmínky pro Shoptet ★ Rewora',
      description: 'Obchodní podmínky pro používání Rewory na platformě Shoptet.',
    },
    about: {
      title: 'O nás ★ Rewora',
      description:
        'Rewora je slovenská SaaS platforma pro zákaznickou zkušenost. Na trhu od roku 2023, používá ji více než 100 domén v Česku a na Slovensku.',
    },
    contact: {
      title: 'Kontakt ★ Rewora',
      description:
        'Ozvěte se nám — poradíme s nasazením Rewory, připravíme ukázku na vašem e-shopu nebo projdeme ceník.',
    },
    partner: {
      title: 'Partnerský program ★ Rewora',
      description:
        'Pro agentury, freelancery a konzultanty: doporučte Reworu svým klientům a pobírejte opakovanou provizi.',
    },
    demo: {
      title: 'Ukázka Rewory na vašem e-shopu ★ Rewora',
      description:
        'Zadejte adresu svého e-shopu a do minuty dostanete PDF ukázku, jak by na něm vypadaly recenze, poradna, hotspoty a BI data.',
    },
    shopifyGuide: {
      title: 'Nasazení doplňku Rewora na Shopify ★ Rewora',
      description:
        'Krok za krokem: instalace doplňku Rewora Product Reviews, aktivace app embed, vložení widgetu na kartu produktu a schválení první recenze.',
    },
  },
  en: {
    home: {
      title: 'Rewora ★ Reviews that matter',
      description:
        'Reviews, Q&A, hotspots and BI data. Roll social proof out across your whole store and watch the conversion rate grow.',
    },
    blog: {
      title: 'Resources ★ Rewora',
      description:
        'Articles on reviews, social proof, content marketing and e-commerce from the Rewora team.',
    },
    pricing: {
      title: 'Pricing ★ Rewora',
      description:
        'Rewora plans: Free, Standard, Professional and Enterprise. Widgets for reviews, Q&A, hotspots and BI data.',
    },
    cases: {
      title: 'Case studies ★ Rewora',
      description:
        'How our customers grow with Rewora — measurable results from the FixServis, Drinkcentrum and kilpi.cz stores.',
    },
    thanks: {
      title: 'Thank you ★ Rewora',
      description: 'Thank you for your interest in Rewora — we will be in touch shortly.',
    },
    privacy: {
      title: 'Personal data protection ★ Rewora',
      description: 'How Rewora processes and protects personal data.',
    },
    terms: {
      title: 'General terms and conditions ★ Rewora',
      description: 'General terms and conditions for using the Rewora service.',
    },
    about: {
      title: 'About us ★ Rewora',
      description:
        'Rewora is a Slovak SaaS platform for customer experience. On the market since 2023 and used by more than 100 domains in Slovakia and Czechia.',
    },
    contact: {
      title: 'Contact ★ Rewora',
      description:
        'Get in touch — we will help you roll Rewora out, prepare a demo on your store or walk you through pricing.',
    },
    partner: {
      title: 'Partner program ★ Rewora',
      description:
        'For agencies, freelancers and consultants: recommend Rewora to your clients and earn recurring commission.',
    },
    demo: {
      title: 'Rewora demo on your store ★ Rewora',
      description:
        'Enter your store address and within a minute you get a PDF showing how reviews, Q&A, hotspots and BI data would look on it.',
    },
    shopifyGuide: {
      title: 'Installing Rewora on Shopify ★ Rewora',
      description:
        'Step by step: installing the Rewora Product Reviews app, activating the app embed, adding the widget to the product page and approving the first review.',
    },
  },
};

/** Titulok a popis domovskej stránky — vždy definovaný. */
export const homeSeo: Record<Lang, { title: string; description: string }> = {
  sk: seo.sk.home as { title: string; description: string },
  cs: seo.cs.home as { title: string; description: string },
  en: seo.en.home as { title: string; description: string },
};

/** Metadáta stránky vrátane kanonickej adresy a hreflang alternatív. */
export function pageMeta(key: PageKey, lang: Lang, extra?: Metadata): Metadata {
  const text = seo[lang][key];
  const canonical = url(key, lang) ?? home[lang];

  return {
    ...(text ? { title: text.title, description: text.description } : {}),
    alternates: { canonical, languages: languages(key) },
    openGraph: text
      ? { title: text.title, description: text.description, locale: ogLocale[lang], type: 'website' }
      : { locale: ogLocale[lang], type: 'website' },
    ...extra,
  };
}

/** Metadáta článku alebo prípadovej štúdie. */
export function docMeta(lang: Lang, canonical: string, title: string, description?: string): Metadata {
  return {
    title: `${title} ★ Rewora`,
    description,
    alternates: { canonical },
    openGraph: { title: `${title} ★ Rewora`, description, locale: ogLocale[lang], type: 'article' },
  };
}
