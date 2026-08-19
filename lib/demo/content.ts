/**
 * Obsah widgetov podľa kategórie produktu.
 * Prevzaté z Rewora Presentation Agent (widget_content.py) — aby ukážka
 * hovorila jazykom e-shopu (cukrovinky riešia cukor, hračky vek…).
 */

export type Category =
  | 'sweets'
  | 'toys'
  | 'alcohol'
  | 'cosmetics'
  | 'electronics'
  | 'books'
  | 'drinks'
  | 'food'
  | 'fashion'
  | 'tools'
  | 'garden'
  | 'sport'
  | 'pets'
  | 'default';

const PATTERNS: [Category, RegExp][] = [
  ['sweets', /cukrovin|cukrík|cukor|sladkos|čokolád|cokolad|bonbón|bonbon|keks|sušienk|susienk|candy|zákusk|zakusk/i],
  ['toys', /hračk|hracka|lego|toy|plyšov|plysov|pre deti|detsk|puzzle|stavebnic|bábik|babik/i],
  ['alcohol', /\brum\b|víno|vino|whisky|whiskey|pivo|alkohol|\bgin\b|vodka|likér|liker|destilát|destilat|šampansk|sampansk/i],
  ['cosmetics', /kozmetik|krém|krem|pleť|plet|make-?up|parfum|parfém|parfem|šampón|sampon|starostlivos|sérum|serum/i],
  ['electronics', /telefón|telefon|mobil|notebook|laptop|elektronik|televíz|televiz|slúchadl|sluchadl|monitor|počítač|pocitac|tablet/i],
  ['books', /kniha|knih|book|publikác|publikac|román|roman|učebnic|ucebnic|encyklopéd|encykloped/i],
  ['drinks', /nápoj|napoj|káva|kava|čaj|caj|džús|dzus|limonád|limonad|minerálk|mineralk|sirup/i],
  ['food', /potravin|múka|muka|cestovin|olej|korenie|omáčk|omack|syr|mäso|maso|konzerv|müsli|musli/i],
  ['fashion', /oblečen|oblecen|tričk|trick|nohavic|šaty|saty|topánk|topank|bunda|mikina|kabel|obuv|džíns|dzins/i],
  ['tools', /náradie|naradie|vŕtačk|vrtack|nástroj|nastroj|hilti|skrutkovač|skrutkovac|píl|brúsk|brusk|kladiv/i],
  ['garden', /záhrad|zahrad|kvetin|rastlin|semen|hnojiv|kosačk|kosack|trávnik|travnik|záhon|zahon/i],
  ['sport', /šport|sport|fitnes|bicykl|lopta|činky|cinky|posilň|posiln|beh|turistick|lyž|lyz/i],
  ['pets', /pre psy|pre mačk|pre macky|granul|krmiv|zviera|domáce zviera|domace zviera|obojok|akvár|akvar/i],
];

export function categorize(productName: string, url = '', pageText = ''): Category {
  const haystack = `${productName} ${url} ${pageText.slice(0, 4000)}`;
  for (const [category, pattern] of PATTERNS) {
    if (pattern.test(haystack)) return category;
  }
  return 'default';
}

type Qa = { topic: string; question: string; answer: string };

/** Otázka a odborná odpoveď pre widget Poradňa. */
export const qaByCategory: Record<Category, Qa> = {
  sweets: {
    topic: 'Množstvo cukru',
    question: 'Dobrý deň, koľko cukru obsahuje tento výrobok? Sledujem príjem cukru u detí. Ďakujem.',
    answer:
      'Dobrý deň, ďakujeme za otázku. Presné množstvo nájdete v zložení na obale; ponúkame aj varianty so zníženým obsahom cukru. Radi poradíme s výberom.',
  },
  toys: {
    topic: 'Vhodný vek',
    question: 'Dobrý deň, od koľkých rokov je táto hračka vhodná? Kupujem pre 3-ročné dieťa. Ďakujem.',
    answer:
      'Dobrý deň, hračka je vhodná od veku uvedeného na obale. Pre 3-ročné dieťa je bezpečná a neobsahuje drobné časti. V prípade otázok sme k dispozícii.',
  },
  alcohol: {
    topic: 'Ročník a pôvod',
    question: 'Dobrý deň, aký je pôvod a ročník tejto fľaše? Chcem ju dať ako darček. Ďakujem.',
    answer:
      'Dobrý deň, pôvod aj ročník uvádzame priamo v popise produktu. Na darček vieme priložiť darčekové balenie — stačí zvoliť pri objednávke.',
  },
  cosmetics: {
    topic: 'Vhodnosť pre citlivú pleť',
    question: 'Dobrý deň, je tento produkt vhodný aj na citlivú pleť? Ďakujem za odpoveď.',
    answer:
      'Dobrý deň, produkt je dermatologicky testovaný a vhodný aj pre citlivú pleť. Pri alergii na konkrétnu zložku odporúčame skontrolovať zloženie v popise.',
  },
  electronics: {
    topic: 'Záruka a kompatibilita',
    question: 'Dobrý deň, aká je dĺžka záruky a je zariadenie kompatibilné s mojím systémom? Ďakujem.',
    answer:
      'Dobrý deň, na produkt sa vzťahuje záruka 24 mesiacov. Kompatibilitu nájdete v technických parametroch — v prípade pochybností nám napíšte model zariadenia.',
  },
  books: {
    topic: 'Vydanie a väzba',
    question: 'Dobrý deň, ide o pevnú alebo mäkkú väzbu a o ktoré vydanie? Ďakujem.',
    answer:
      'Dobrý deň, presné vydanie aj typ väzby uvádzame v parametroch produktu. Ak potrebujete iné vydanie, radi ho pre vás objednáme.',
  },
  drinks: {
    topic: 'Zloženie a skladovanie',
    question: 'Dobrý deň, ako sa má nápoj skladovať a aká je trvanlivosť po otvorení? Ďakujem.',
    answer:
      'Dobrý deň, po otvorení odporúčame uchovávať v chlade a spotrebovať podľa údaja na obale. Neotvorené balenie skladujte v suchu mimo priameho slnka.',
  },
  food: {
    topic: 'Zloženie a alergény',
    question: 'Dobrý deň, obsahuje výrobok lepok alebo iné alergény? Ďakujem.',
    answer:
      'Dobrý deň, kompletné zloženie vrátane alergénov nájdete v popise produktu. V ponuke máme aj bezlepkové alternatívy — radi vám ich odporučíme.',
  },
  fashion: {
    topic: 'Veľkosť a materiál',
    question: 'Dobrý deň, sedí veľkosť podľa tabuľky a z akého materiálu je produkt? Ďakujem.',
    answer:
      'Dobrý deň, strih zodpovedá tabuľke veľkostí v popise. Materiálové zloženie uvádzame pri parametroch; výmena veľkosti je u nás zdarma.',
  },
  tools: {
    topic: 'Výkon a príslušenstvo',
    question: 'Dobrý deň, je v balení aj príslušenstvo a na aké použitie je náradie určené? Ďakujem.',
    answer:
      'Dobrý deň, obsah balenia uvádzame v popise. Náradie je určené na bežné aj profesionálne použitie; radi odporučíme vhodné príslušenstvo.',
  },
  garden: {
    topic: 'Starostlivosť a sezóna',
    question: 'Dobrý deň, v akom období je najlepšie produkt použiť a ako sa oň starať? Ďakujem.',
    answer:
      'Dobrý deň, odporúčané obdobie aj postup starostlivosti nájdete v popise produktu. Pri konkrétnych podmienkach vo vašej záhrade radi poradíme.',
  },
  sport: {
    topic: 'Vhodnosť pre začiatočníka',
    question: 'Dobrý deň, je produkt vhodný aj pre začiatočníka? Ďakujem za odpoveď.',
    answer:
      'Dobrý deň, produkt je vhodný pre začiatočníkov aj pokročilých. Ak nám napíšete vašu úroveň a cieľ, radi odporučíme presnú variantu.',
  },
  pets: {
    topic: 'Dávkovanie a veľkosť',
    question: 'Dobrý deň, aké je odporúčané dávkovanie pre psa strednej veľkosti? Ďakujem.',
    answer:
      'Dobrý deň, dávkovanie podľa hmotnosti nájdete na obale. Pre psa strednej veľkosti odporúčame dávku uvedenú v tabuľke; radi poradíme aj individuálne.',
  },
  default: {
    topic: 'Parametre produktu',
    question: 'Dobrý deň, viete mi prosím upresniť parametre a dostupnosť tohto produktu? Ďakujem.',
    answer:
      'Dobrý deň, ďakujeme za otázku. Všetky parametre nájdete v popise produktu, tovar máme skladom a odosielame do 24 hodín.',
  },
};

export type DemoReview = {
  name: string;
  initials: string;
  stars: number;
  date: string;
  title?: string;
  text: string;
  badge?: string;
};

const highlightByCategory: Record<Category, string> = {
  sweets: 'Vynikajúca chuť, deti si pochutili. Zloženie je v poriadku a nie je to príliš sladké.',
  toys: 'Hračka je kvalitná a bezpečná, deti sa s ňou hrajú celé dni. Vek sedí podľa popisu.',
  alcohol: 'Skvelá chuť aj balenie, presne ako v popise. Ako darček to spravilo veľkú radosť.',
  cosmetics: 'Pleť je po týždni viditeľne pokojnejšia, vôňa je jemná. Určite objednám znova.',
  electronics: 'Zariadenie funguje bez problémov, nastavenie bolo otázkou pár minút.',
  books: 'Kvalitná väzba aj tlač, čítanie je pôžitok. Dodanie bolo veľmi rýchle.',
  drinks: 'Skvelá chuť a poctivé zloženie. Balenie prišlo v poriadku a rýchlo.',
  food: 'Čerstvé, chutné a pekne zabalené. Zloženie zodpovedá popisu.',
  fashion: 'Veľkosť sedí podľa tabuľky, materiál je príjemný. Odporúčam.',
  tools: 'Náradie je pevné a výkonné, v balení bolo všetko podľa popisu.',
  garden: 'Rastliny prišli v perfektnom stave, rastú krásne. Odporúčam.',
  sport: 'Kvalitné spracovanie, vhodné aj pre začiatočníka. S nákupom som spokojný.',
  pets: 'Psíkovi chutí a zloženie je poctivé. Doručenie bolo rýchle.',
  default: 'Presne to, čo som hľadal. Kvalita zodpovedá cene a dodanie bolo rýchle.',
};

export function reviewsFor(category: Category): DemoReview[] {
  return [
    {
      name: 'Overený zákazník',
      initials: 'OZ',
      stars: 5,
      date: '23. apríl 2026',
      text: highlightByCategory[category],
      badge: 'Top recenzia',
    },
    {
      name: 'Lenka',
      initials: 'L',
      stars: 5,
      date: '23. január 2026',
      title: 'Splnilo očakávania',
      text: 'Objednávka dorazila načas, tovar bol pekne zabalený. Určite objednám znova.',
    },
    {
      name: 'Martin',
      initials: 'M',
      stars: 4,
      date: '19. december 2025',
      text: 'Kvalita zodpovedá cene, komunikácia s obchodom bola bezproblémová.',
      badge: 'Overená recenzia',
    },
  ];
}

/** BI dáta na karte produktu — demo hodnoty. */
export const biMetrics = [
  { icon: '📦', value: '1000+', label: 'predaných kusov' },
  { icon: '📅', value: '31. január 2022', label: 'začiatok predaja' },
  { icon: '🛠', value: '<0,1 %', label: 'reklamovanosť' },
  { icon: '↩', value: '<0,1 %', label: 'vratkovosť' },
];
