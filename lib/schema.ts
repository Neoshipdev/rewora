/**
 * Štruktúrované dáta (JSON-LD). Vyhľadávače aj jazykové modely z nich
 * čítajú, čo Rewora je, čo ponúka a za koľko — preto ich skladáme z tých
 * istých dát ako samotné stránky, nie ručne.
 */
import { contact, faq, faqLegal } from './content';
import { features } from './features';
import type { GuideSection } from './guides';
import { bezPredpony, home, htmlLang, routes, type Lang, type RouteKey } from './i18n';
import { plans } from './pricing';
import { tDeep } from './t';

const DOMENA = 'https://rewora.com';
const LOGO = `${DOMENA}/images/logo-rewora.svg`;

/** Absolútna adresa bez predpony podpriečinka (na Pages beží web v /rewora). */
export const abs = (cesta: string | null | undefined) =>
  cesta ? DOMENA + bezPredpony(cesta) : DOMENA;

const cena = (text: string) => {
  const cislo = text.replace(/[^\d,.]/g, '').replace(',', '.');
  return cislo ? Number(cislo) : null;
};

/** Firma — na domovskej stránke a v O nás. */
export function organization(lang: Lang) {
  const k = tDeep(contact, lang);
  return {
    '@type': 'Organization',
    '@id': `${DOMENA}/#organization`,
    name: 'Rewora',
    legalName: k.company.name,
    url: abs(home[lang]),
    logo: { '@type': 'ImageObject', url: LOGO },
    email: k.general.email,
    telephone: k.person.phoneHref.replace('tel:', ''),
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Prešovská 40A',
      addressLocality: 'Bratislava',
      postalCode: '821 02',
      addressCountry: 'SK',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        name: k.person.name,
        email: k.person.email,
        telephone: k.person.phoneHref.replace('tel:', ''),
        availableLanguage: ['sk', 'cs', 'en'],
      },
    ],
    sameAs: ['https://www.linkedin.com/company/rewora'],
  };
}

/** Web ako celok — spolu s jazykovou mutáciou. */
export function website(lang: Lang) {
  return {
    '@type': 'WebSite',
    '@id': `${abs(home[lang])}#website`,
    name: 'Rewora',
    url: abs(home[lang]),
    inLanguage: htmlLang[lang],
    publisher: { '@id': `${DOMENA}/#organization` },
  };
}

/** Produkt so všetkými balíkmi — cenník aj domovská stránka. */
export function softwareApplication(lang: Lang) {
  const balíky = tDeep(plans, lang);
  const nastroje = tDeep(features, lang);

  return {
    '@type': 'SoftwareApplication',
    '@id': `${DOMENA}/#software`,
    name: 'Rewora',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Customer review and social proof platform',
    operatingSystem: 'Web',
    url: abs(routes.pricing[lang]),
    inLanguage: htmlLang[lang],
    publisher: { '@id': `${DOMENA}/#organization` },
    featureList: nastroje.map((f) => f.name),
    offers: balíky.map((p) => {
      const mesacne = cena(p.priceMonthly);
      const rocne = cena(p.priceYearly);
      return {
        '@type': 'Offer',
        name: p.name,
        url: abs(routes.pricing[lang]),
        priceCurrency: 'EUR',
        ...(mesacne === null
          ? { priceSpecification: { '@type': 'PriceSpecification', valueAddedTaxIncluded: false } }
          : {
              price: mesacne,
              priceSpecification: [
                {
                  '@type': 'UnitPriceSpecification',
                  price: mesacne,
                  priceCurrency: 'EUR',
                  billingDuration: 1,
                  billingIncrement: 1,
                  unitCode: 'MON',
                },
                ...(rocne !== null && rocne !== mesacne
                  ? [
                      {
                        '@type': 'UnitPriceSpecification',
                        price: rocne,
                        priceCurrency: 'EUR',
                        billingDuration: 12,
                        unitCode: 'ANN',
                      },
                    ]
                  : []),
              ],
            }),
        itemOffered: { '@type': 'Service', name: p.name, description: p.features.join('; ') },
        availability: 'https://schema.org/InStock',
      };
    }),
  };
}

/** Otázky a odpovede — domovská stránka aj samostatné FAQ. */
export function faqPage(lang: Lang, url: string) {
  const otazky = [...tDeep(faq, lang), ...tDeep(faqLegal, lang)];
  return {
    '@type': 'FAQPage',
    '@id': `${abs(url)}#faq`,
    url: abs(url),
    inLanguage: htmlLang[lang],
    mainEntity: otazky.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.a.join(' ') },
    })),
  };
}

const MESIACE: Record<string, string> = {
  január: '01', januára: '01', jan: '01', leden: '01', ledna: '01', january: '01',
  február: '02', februára: '02', únor: '02', února: '02', february: '02',
  marec: '03', marca: '03', březen: '03', března: '03', march: '03',
  apríl: '04', apríla: '04', duben: '04', dubna: '04', april: '04',
  máj: '05', mája: '05', květen: '05', května: '05', may: '05',
  jún: '06', júna: '06', červen: '06', června: '06', june: '06',
  júl: '07', júla: '07', červenec: '07', července: '07', july: '07',
  august: '08', augusta: '08', srpen: '08', srpna: '08',
  september: '09', septembra: '09', září: '09', 'zaří': '09',
  október: '10', októbra: '10', říjen: '10', října: '10', october: '10',
  november: '11', novembra: '11', listopad: '11', listopadu: '11',
  december: '12', decembra: '12', prosinec: '12', prosince: '12',
};

/** „24. máj 2023“, „9 May 2023“ aj „24. 5. 2023“ na ISO dátum. */
export function isoDatum(text?: string): string | undefined {
  if (!text) return undefined;
  const t = text.trim().toLowerCase();
  const slovny = /(\d{1,2})\.?\s+([^\s\d.]+)\s+(\d{4})/.exec(t);
  if (slovny) {
    const mesiac = MESIACE[slovny[2].replace(/[.,]/g, '')];
    if (mesiac) return `${slovny[3]}-${mesiac}-${slovny[1].padStart(2, '0')}`;
  }
  const ciselny = /(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})/.exec(t);
  if (ciselny) return `${ciselny[3]}-${ciselny[2].padStart(2, '0')}-${ciselny[1].padStart(2, '0')}`;
  const iso = /(\d{4})-(\d{2})-(\d{2})/.exec(t);
  return iso?.[0];
}

/** Článok blogu alebo prípadová štúdia. */
export function article(opts: {
  lang: Lang;
  url: string;
  title: string;
  description?: string;
  image?: string;
  author?: string;
  date?: string;
  section?: string;
  typ?: 'Article' | 'BlogPosting';
}) {
  const publikovane = isoDatum(opts.date);
  return {
    '@type': opts.typ ?? 'BlogPosting',
    '@id': `${abs(opts.url)}#article`,
    headline: opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    url: abs(opts.url),
    inLanguage: htmlLang[opts.lang],
    ...(opts.image ? { image: abs(opts.image) } : {}),
    ...(publikovane ? { datePublished: publikovane, dateModified: publikovane } : {}),
    author: opts.author
      ? { '@type': 'Person', name: opts.author }
      : { '@id': `${DOMENA}/#organization` },
    publisher: { '@id': `${DOMENA}/#organization` },
    ...(opts.section ? { articleSection: opts.section } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(opts.url) },
  };
}

/** Návod na nasadenie ako HowTo — kroky sú tie isté ako na stránke. */
export function howTo(opts: {
  lang: Lang;
  url: string;
  title: string;
  description: string;
  sections: GuideSection[];
  video?: { src: string; caption: string };
}) {
  return {
    '@type': 'HowTo',
    '@id': `${abs(opts.url)}#howto`,
    name: opts.title,
    description: opts.description,
    url: abs(opts.url),
    inLanguage: htmlLang[opts.lang],
    publisher: { '@id': `${DOMENA}/#organization` },
    step: opts.sections.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      url: `${abs(opts.url)}#${s.num}`,
      itemListElement: s.steps.map((k) => ({ '@type': 'HowToDirection', text: k.text })),
    })),
  };
}

/** Prehľadová stránka so zoznamom položiek (blog, štúdie). */
export function collection(opts: {
  lang: Lang;
  url: string;
  title: string;
  description?: string;
  items: { url: string; name: string }[];
}) {
  return {
    '@type': 'CollectionPage',
    '@id': `${abs(opts.url)}#collection`,
    name: opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    url: abs(opts.url),
    inLanguage: htmlLang[opts.lang],
    isPartOf: { '@id': `${abs(home[opts.lang])}#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: abs(p.url),
        name: p.name,
      })),
    },
  };
}

/** Omrvinky — domov › sekcia › stránka. */
export function breadcrumbs(lang: Lang, cesta: { name: string; url: string }[]) {
  const polozky = [{ name: 'Rewora', url: home[lang] }, ...cesta];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: polozky.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      item: abs(p.url),
    })),
  };
}

/** Bežná podstránka — WebPage s väzbou na web a firmu. */
export function webPage(opts: {
  lang: Lang;
  url: string;
  title: string;
  description?: string;
  typ?: string;
}) {
  return {
    '@type': opts.typ ?? 'WebPage',
    '@id': `${abs(opts.url)}#page`,
    name: opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    url: abs(opts.url),
    inLanguage: htmlLang[opts.lang],
    isPartOf: { '@id': `${abs(home[opts.lang])}#website` },
    about: { '@id': `${DOMENA}/#organization` },
  };
}

/** Adresa sekcie v danom jazyku — skratka pre omrvinky. */
export const cestaK = (kluc: RouteKey, lang: Lang) => routes[kluc][lang] ?? home[lang];
