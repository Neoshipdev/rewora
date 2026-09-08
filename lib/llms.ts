/**
 * Obsah pre /llms.txt — jedna strana, z ktorej si jazykový model prečíta,
 * čo Rewora je, pre koho, čo vie, koľko stojí a kam ísť pre detaily.
 * Skladá sa z tých istých dát ako web, takže sa nemôže rozísť s obsahom.
 */
import { about, contact, faq, faqLegal, integrations, numbers } from './content';
import { features, featuresIntro } from './features';
import { htmlLang, routes, type Lang } from './i18n';
import { plans, pricingNote } from './pricing';
import { getCaseStudies } from './posts';
import { createT, tDeep } from './t';

const DOMENA = 'https://rewora.com';

/** Popisky sekcií — llms.txt číta stroj, nie zákazník, preto krátko a vecne. */
const nadpisy = {
  sk: {
    coJe: 'Čo je Rewora',
    preKoho: 'Pre koho je',
    funkcie: 'Funkcie',
    balíky: 'Balíky a ceny',
    integracie: 'Integrácie',
    studie: 'Prípadové štúdie',
    faq: 'Časté otázky',
    odkazy: 'Ďalšie odkazy',
    kontakt: 'Kontakt',
    jazyky: 'Jazykové verzie',
    cislaTitulok: 'Čísla',
    navody: 'Návody na nasadenie',
    poznamka: 'Poznámka',
  },
  cs: {
    coJe: 'Co je Rewora',
    preKoho: 'Pro koho je',
    funkcie: 'Funkce',
    balíky: 'Balíčky a ceny',
    integracie: 'Integrace',
    studie: 'Případové studie',
    faq: 'Časté otázky',
    odkazy: 'Další odkazy',
    kontakt: 'Kontakt',
    jazyky: 'Jazykové verze',
    cislaTitulok: 'Čísla',
    navody: 'Návody na nasazení',
    poznamka: 'Poznámka',
  },
  en: {
    coJe: 'What Rewora is',
    preKoho: 'Who it is for',
    funkcie: 'Features',
    balíky: 'Plans and pricing',
    integracie: 'Integrations',
    studie: 'Case studies',
    faq: 'Frequently asked questions',
    odkazy: 'More links',
    kontakt: 'Contact',
    jazyky: 'Language versions',
    cislaTitulok: 'Key numbers',
    navody: 'Deployment guides',
    poznamka: 'Note',
  },
} as const;

const uvod = {
  sk: 'Rewora je slovenská SaaS platforma pre zákaznícku skúsenosť. E-shopom pomáha zbierať, moderovať a zobrazovať recenzie tam, kde sa zákazník rozhoduje — pri produkte, v poradni, vo vyhľadávaní aj v Google Shopping.',
  cs: 'Rewora je slovenská SaaS platforma pro zákaznickou zkušenost. E-shopům pomáhá sbírat, moderovat a zobrazovat recenze tam, kde se zákazník rozhoduje — u produktu, v poradně, ve vyhledávání i v Google Shopping.',
  en: 'Rewora is a Slovak SaaS platform for customer experience. It helps online stores collect, moderate and display reviews exactly where customers decide — on the product page, in the Q&A, in search and in Google Shopping.',
} as const;

const preKoho = {
  sk: [
    'E-shopy na Shoptete, Shopify aj vlastných riešeniach, ktoré chcú viac autentických recenzií a vyšší konverzný pomer.',
    'Predajcov, ktorí musia plniť povinnosti pri zverejňovaní spotrebiteľských recenzií (smernica Omnibus).',
    'Značky predávajúce do viacerých krajín — recenzie, fórum aj poradňa sa automaticky prekladajú do 31 jazykov.',
    'Agentúry, freelancerov a konzultantov, ktorí Reworu nasadzujú klientom v partnerskom programe.',
  ],
  cs: [
    'E-shopy na Shoptetu, Shopify i vlastních řešeních, které chtějí více autentických recenzí a vyšší konverzní poměr.',
    'Prodejce, kteří musí plnit povinnosti při zveřejňování spotřebitelských recenzí (směrnice Omnibus).',
    'Značky prodávající do více zemí — recenze, fórum i poradna se automaticky překládají do 31 jazyků.',
    'Agentury, freelancery a konzultanty, kteří Reworu nasazují klientům v partnerském programu.',
  ],
  en: [
    'Online stores on Shoptet, Shopify or custom platforms that want more authentic reviews and a higher conversion rate.',
    'Merchants who must comply with the rules for publishing consumer reviews (the Omnibus directive).',
    'Brands selling across borders — reviews, the forum and the Q&A are translated automatically into 31 languages.',
    'Agencies, freelancers and consultants who roll Rewora out for clients through the partner program.',
  ],
} as const;

const poznamka = {
  sk: 'Tento súbor je strojovo generovaný z obsahu webu. Ceny sú bez DPH a platia pre jednu doménu; aktuálny stav vždy na stránke cenníka.',
  cs: 'Tento soubor je strojově generovaný z obsahu webu. Ceny jsou bez DPH a platí pro jednu doménu; aktuální stav vždy na stránce ceníku.',
  en: 'This file is generated from the website content. Prices exclude VAT and apply to a single domain; the pricing page always holds the current state.',
} as const;

const url = (cesta: string | null) => (cesta ? DOMENA + cesta.replace(/^\/rewora/, '') : '');

/** Zostaví celý llms.txt pre daný jazyk. */
export async function llmsTxt(lang: Lang): Promise<string> {
  const t = createT(lang);
  const n = nadpisy[lang];
  const studie = await getCaseStudies(lang);
  const nastroje = tDeep(features, lang);
  const cennik = tDeep(plans, lang);
  const integracie = tDeep(integrations, lang);
  const cisla = tDeep(numbers, lang);
  const otazky = [...tDeep(faq, lang), ...tDeep(faqLegal, lang)];
  const oNas = tDeep(about, lang);
  const kontakt = tDeep(contact, lang);

  const r = (kluc: keyof typeof routes) => url(routes[kluc][lang]);

  const riadky: string[] = [
    '# Rewora',
    '',
    `> ${uvod[lang]}`,
    '',
    `## ${n.coJe}`,
    '',
    t(featuresIntro.lead),
    '',
    `## ${n.preKoho}`,
    '',
    ...preKoho[lang].map((v) => `- ${v}`),
    '',
    `## ${n.cislaTitulok}`,
    '',
    ...cisla.map((c) => `- ${c.value} — ${c.label}`),
    ...oNas.facts.map((f) => `- ${f.label}: ${f.value}`),
    '',
    `## ${n.funkcie}`,
    '',
    `${r('features')}`,
    '',
  ];

  for (const f of nastroje) {
    riadky.push(`### ${f.num} ${f.name}`, '', f.long, '');
    for (const i of f.items) riadky.push(`- **${i.title}** — ${i.text}`);
    riadky.push('');
  }

  riadky.push(`## ${n.balíky}`, '');
  for (const p of cennik) {
    const cena = (
      p.priceMonthly === p.priceYearly
        ? `${p.priceMonthly} ${p.periodMonthly}`
        : `${p.priceMonthly} ${p.periodMonthly} / ${p.priceYearly} ${p.periodYearly}`
    ).trim();
    riadky.push(`### ${p.name} — ${cena}`, '');
    if (p.intro) riadky.push(p.intro, '');
    for (const v of p.features) riadky.push(`- ${v}`);
    riadky.push('');
  }
  riadky.push(t(pricingNote), '', `${r('pricing')}`, '');

  riadky.push(`## ${n.integracie}`, '');
  for (const i of integracie) riadky.push(`- **${i.name}** — ${i.text}`);
  riadky.push(
    '',
    `### ${n.navody}`,
    '',
    `- Shopify: ${r('shopifyGuide')}`,
    `- Shoptet: ${r('shoptetGuide')}`,
    ''
  );

  riadky.push(`## ${n.studie}`, '');
  for (const s of studie) {
    const metriky = s.metrics.map((m) => `${m.value} ${m.label}`).join(', ');
    riadky.push(`- [${s.title}](${r('cases')}${s.slug}/) — ${s.client}: ${metriky}`);
  }
  riadky.push('', `${r('cases')}`, '');

  riadky.push(`## ${n.faq}`, '', `${r('faq')}`, '');
  for (const q of otazky) riadky.push(`### ${q.q}`, '', ...q.a, '');

  riadky.push(
    `## ${n.odkazy}`,
    '',
    `- ${url(routes.blog[lang])}`,
    `- ${r('about')}`,
    `- ${r('demo')}`,
    `- ${r('partner')}`,
    `- ${r('terms')}`,
    `- ${r('privacy')}`,
    '',
    `## ${n.kontakt}`,
    '',
    `- ${kontakt.person.name}, ${kontakt.person.role} — ${kontakt.person.email}, ${kontakt.person.phone}`,
    `- ${kontakt.general.title}: ${kontakt.general.email}`,
    `- ${kontakt.company.name}, ${kontakt.company.address}, ${kontakt.company.ico}`,
    '',
    `## ${n.jazyky}`,
    '',
    `- Slovensky: ${DOMENA}/sk/ · ${DOMENA}/sk/llms.txt`,
    `- Česky: ${DOMENA}/cs/ · ${DOMENA}/cs/llms.txt`,
    `- English: ${DOMENA}/ · ${DOMENA}/llms.txt`,
    '',
    `## ${n.poznamka}`,
    '',
    poznamka[lang],
    `${htmlLang[lang]} · ${new Date().toISOString().slice(0, 10)}`,
    ''
  );

  return riadky.join('\n').replace(/\n{3,}/g, '\n\n');
}
