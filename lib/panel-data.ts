/**
 * DEMO dáta pre mockup administrátorského panelu v hero sekcii.
 * Podľa handoffu držané v jednom objekte — nie roztrúsené v šablónach.
 */

export type PanelKey =
  | 'overview'
  | 'widget'
  | 'shop'
  | 'gshop'
  | 'reviews'
  | 'qa'
  | 'hotspots'
  | 'bi';

export const panelTabs: { key: PanelKey; label: string }[] = [
  { key: 'widget', label: 'Recenzie' },
  { key: 'overview', label: 'Prehľad' },
  { key: 'shop', label: 'Recenzie obchodu' },
  { key: 'gshop', label: 'Google Shopping recenzie' },
  { key: 'reviews', label: 'Moderovanie recenzií' },
  { key: 'qa', label: 'Poradňa a fórum' },
  { key: 'hotspots', label: 'Hotspots' },
  { key: 'bi', label: 'BI dáta' },
];

export const overview = {
  /* Demo dáta — anonymizované, nepatria žiadnemu konkrétnemu e-shopu. */
  headline: [
    { label: 'Rewora ROI', value: '8,4 ×' },
    { label: 'Nárast tržieb', value: '4 250 €' },
    { label: 'Pokrytie relácií', value: '74,2 %' },
  ],
  performance: {
    title: 'Výkon vášho e-shopu',
    rows: [
      { label: 'Zobrazenia stránok', value: '1 240 000' },
      { label: 'Relácie', value: '618 400' },
      { label: 'Pridania do košíka', value: '18 900' },
      { label: 'Košíky', value: '10 700' },
      { label: 'Objednávky', value: '4 930' },
      { label: 'Tržby', value: '125 400 €' },
      { label: 'Priemerná hodnota objednávky', value: '25,40 €' },
      { label: 'Konverzia relácia → objednávka', value: '0,80 %' },
      { label: 'Konverzia košík → objednávka', value: '46,1 %' },
    ],
  },
  activity: {
    title: 'Aktivita Rewory na e-shope',
    total: '948 200',
    totalLabel: 'zobrazení widgetov',
    items: [
      { label: 'Hodnotenie produktu', value: '518 400', share: 54.7, color: 'var(--bar-6)' },
      { label: 'Produktové recenzie', value: '306 100', share: 32.3, color: '#12A5A0' },
      { label: 'Produktové fórum', value: '114 300', share: 12.1, color: '#F5A524' },
      { label: 'Karusel recenzií obchodu', value: '5 200', share: 0.5, color: '#3B6EF3' },
      { label: 'Formulár hodnotenia', value: '4 200', share: 0.4, color: '#1FA971' },
    ],
  },
  assisted: {
    title: 'Nákupy s pomocou Rewory',
    steps: [
      { label: 'pridaní do košíka', value: '15 700', width: 100 },
      { label: 'košíkov', value: '9 200', width: 62 },
      { label: 'objednávok', value: '4 220', width: 31 },
    ],
    revenue: { label: 'Tržby s pomocou Rewory', value: '107 300 €' },
    share: { label: 'Podiel na tržbách', value: '85,6 %' },
    note: 'Sekcia ukazuje dosah — koľko nákupov zahŕňalo zobrazenie widgetu.',
  },
};

/**
 * Widget „Recenzie a hodnotenia“ tak, ako sa zobrazuje na karte produktu
 * v e-shope. Farba widgetu sa preberá z dizajnu e-shopu — tu zelená.
 */
export const productWidget = {
  accent: '#FF570D',
  product: {
    name: 'Apple iPhone 15 Pro Max, 256 GB, Black Titanium',
    brand: 'Apple',
    price: '1 199,00 €',
    badge: 'Skladom',
    description:
      'Titánové telo, čip A17 Pro a trojitý fotoaparát s 5× optickým zoomom. Displej Super Retina XDR 6,7\" s ProMotion, USB-C a batéria na celý deň.',
  },
  summary: {
    title: 'Recenzie a hodnotenia',
    average: '4,6',
    count: '25 recenzií',
    distribution: [
      { stars: 5, count: 17, share: 68 },
      { stars: 4, count: 7, share: 28 },
      { stars: 3, count: 1, share: 4 },
      { stars: 2, count: 0, share: 0 },
      { stars: 1, count: 0, share: 0 },
    ],
    ctaTitle: 'Páči sa Vám náš produkt?',
    ctaText: 'Podeľte sa o svoju skúsenosť s produktom a pomôžte ostatným pri rozhodovaní.',
    ctaButton: '＋ Napísať recenziu',
  },
  filters: ['Všetky recenzie', '1', '2', '3', '4', '5'],
  items: [
    {
      name: 'Katarína',
      initials: 'K',
      stars: 5,
      date: '14. február 2026',
      title: 'Batéria vydrží celý deň',
      text: 'Aj pri celodennom fotení a navigácii mi ostane do večera vyše tretina batérie.',
      badge: 'Overená recenzia',
      helpful: { up: 3, down: 0 },
      top: true,
    },
    {
      name: 'Overený zákazník',
      initials: 'OZ',
      stars: 5,
      date: '18. júl 2026',
      text: 'Fotky zo zoomu sú ostré aj po zotmení. Telefón prišiel zabalený a načas.',
      badge: 'Overená recenzia',
      helpful: { up: 1, down: 0 },
    },
  ],
};

/**
 * Foto a video recenzie — widget s krátkymi videami od zákazníkov.
 * Náhľady sú zástupné (farebné dlaždice), po nasadení ich nahradia
 * reálne miniatúry videí z e-shopu.
 */
export const videoReviews = {
  title: 'Skutočné príbehy zákazníkov',
  average: '4,8',
  count: '84 recenzií',
  items: [
    { name: 'Katarína H.', stars: 5, photo: '/images/video-recenzia-1.png', caption: 'Rozbalenie objednávky' },
    { name: 'Martin P.', stars: 5, photo: '/images/video-recenzia-2.png', caption: 'Prvé dojmy po týždni' },
    { name: 'Simona K.', stars: 5, photo: '/images/video-recenzia-3.png', caption: 'Ako to nosím každý deň' },
    { name: 'Jakub M.', stars: 4, photo: '/images/video-recenzia-4.png', caption: 'Porovnanie s predchádzajúcim' },
    { name: 'Lucia V.', stars: 5, photo: '/images/video-recenzia-5.png', caption: 'Darček, ktorý potešil' },
  ],
};

/** Karusel recenzií obchodu — widget na homepage e-shopu. */
export const shopReviews = {
  title: 'Čo hovoria naši zákazníci',
  report: 'Nahlásiť',
  items: [
    {
      stars: 5,
      text: 'S obchodom som veľmi spokojná. Komunikácia je rýchla, informácie o objednávke chodia priebežne a ponuka je naozaj široká.',
      source: 'Overená recenzia',
    },
    {
      stars: 5,
      text: 'Nakupoval som prvýkrát a zásielka dorazila o dva dni skôr, než sľubovali. Balenie bolo starostlivé, nič sa nepoškodilo.',
      source: 'Heureka recenzia',
    },
    {
      stars: 5,
      text: 'Objednávku som si vyzdvihla priamo na predajni, takže som nemusela čakať na kuriéra. Veľké plus.',
      source: 'Overená recenzia',
    },
    {
      stars: 5,
      text: 'Jednoducho, prehľadne a rýchlo doručené. Viac od e-shopu ani nepotrebujem.',
      source: 'Heureka recenzia',
    },
  ],
};

/** Hviezdičky v Google Shopping — screenshot z reálneho vyhľadávania. */
export const googleShopping = {
  image: '/images/Google_shopping.png',
  alt: 'Produktové karty v Google Shopping s hviezdičkovým hodnotením',
  note: 'Hviezdičky na karte pochádzajú z produktových recenzií zozbieraných Reworou. Karty s hodnotením majú vyššiu mieru prekliku.',
};

export const reviews = {
  /* Zoznam recenzií ako v administrácii Rewory — demo texty. */
  title: 'Recenzie',
  export: 'Stiahnuť XLSX',
  filter: 'Všetky',
  search: 'Hľadať…',
  columns: 'Stĺpce',
  selection: {
    count: '2 vybrané',
    actions: ['Vybrať všetky', 'Zrušiť výber', 'Označiť ako schválené', 'Exportovať vybrané'],
  },
  rows: [
    {
      text: 'Sprej používame na čistenie plastov už roky, stále rovnaká kvalita a vôňa.',
      source: 'Produktové recenzie e-shopu',
      rating: '3.0',
      date: '11. máj 2026, 0:48',
      approved: false,
      language: 'Slovenčina',
      selected: true,
    },
    {
      text: 'Veľmi dobrá priľnavosť a dlhá životnosť, s nákupom sme spokojní.',
      source: 'Produktové recenzie e-shopu',
      rating: '5.0',
      date: '17. marec 2026, 11:55',
      approved: true,
      language: 'Slovenčina',
      selected: true,
    },
    {
      text: 'Balenie prišlo v poriadku a načas, produkt zodpovedá popisu.',
      source: 'Recenzie obchodu',
      rating: '4.0',
      date: '2. marec 2026, 9:20',
      approved: true,
      language: 'Slovenčina',
      selected: false,
    },
  ],
  strip: { text: 'Automatický preklad · 31 jazykov', link: 'Nastaviť →' },
};

export const qa = {
  /* Vlákno v poradni tak, ako ho vidí zákazník na karte produktu. */
  back: 'Späť',
  reply: '＋ Odpovedať',
  question: {
    title: 'Je v balení aj nabíjací adaptér?',
    author: 'Overený zákazník',
    initials: 'OZ',
    date: '15. február',
    text: 'Dobrý deň, chcela by som sa opýtať, či je súčasťou balenia aj nabíjací adaptér do zásuvky, alebo len kábel. Ďakujem.',
    helpful: { up: 0, down: 0 },
  },
  answer: {
    author: 'Zákaznícka podpora e-shopu',
    initials: 'ZP',
    date: '18. február',
    paragraphs: [
      'Ďakujeme za Vašu otázku.',
      'V balení nájdete telefón a kábel USB-C, adaptér do zásuvky výrobca už nepribaľuje. Odporúčame adaptér s výkonom aspoň 20 W — s ním sa telefón nabije na 50 % približne za pol hodinu.',
      'Vhodné adaptéry máme v sekcii príslušenstvo, radi Vám poradíme s výberom.',
    ],
    helpful: { up: 0, down: 0 },
  },
  report: 'Nahlásiť',
  strip: { text: '3 nové otázky na moderovanie', link: 'Zobraziť →' },
};

export const hotspots = {
  meta: '2 body · kampaň Leto 2026',
  caption: '[ kampaňový vizuál 1200×600 ]',
  dots: [
    { left: '24%', top: '36%' },
    { left: '70%', top: '62%' },
  ],
  bubble: {
    left: '32%',
    top: '48%',
    name: 'Hugo Spritz set',
    badge: '20 % OFF',
    price: '24,90 €',
  },
  strip: { text: 'Funguje aj v PDF katalógoch', link: 'Pridať bod →' },
};

/** Produkt, na ktorom ukazujeme BI dáta — rovnaký ako vo widgete recenzií. */
export const biProduct = {
  photo: '/images/produkt-iphone.png',
  name: 'Apple iPhone 17 Pro, 256 GB, Cosmic Orange',
  brand: 'Apple',
  price: '1 329,00 €',
  badge: 'Skladom',
};

export const bi = {
  title: 'BI dáta na karte produktu',
  metrics: [
    { icon: 'cart', value: '1000+', label: 'predaných kusov' },
    { icon: 'calendar', value: '31. január 2022', label: 'začiatok predaja' },
    { icon: 'refresh', value: '<0.1 %', label: 'reklamovanosť' },
    { icon: 'return', value: '<0.1 %', label: 'vratkovosť' },
  ] as const,
  chips: {
    title: 'Vyberte dáta pre váš segment',
    items: [
      { label: 'Predajnosť', on: true },
      { label: 'Reklamovanosť', on: true },
      { label: 'Vratkovosť', on: false },
      { label: 'Skladovosť', on: false },
      { label: 'Rezervácie', on: false },
    ],
  },
};

/** Ukážka BI metrík v sekcii Nástroje (kratší dátum). */
export const biRowMetrics = [
  { icon: 'cart', value: '1000+', label: 'predaných kusov' },
  { icon: 'calendar', value: '31. jan 2022', label: 'začiatok predaja' },
  { icon: 'refresh', value: '<0.1 %', label: 'reklamovanosť' },
  { icon: 'return', value: '<0.1 %', label: 'vratkovosť' },
] as const;

/** Inteligentné vyhľadávanie — ukážka, ako widget rozumie celej otázke. */
export const smartSearch = {
  query: 'modré tenisky na leto do 80 €',
  understood: [
    { label: 'farba', value: 'modrá' },
    { label: 'sezóna', value: 'leto' },
    { label: 'cena', value: 'do 80 €' },
  ],
  resultsLabel: '14 produktov',
  results: [
    { name: 'Plátenné tenisky Marina', meta: 'modrá · textil · unisex', price: '59,90 €', stars: 5 },
    { name: 'Bežecké tenisky Coast Air', meta: 'tmavomodrá · sieťovina', price: '74,00 €', stars: 4 },
    { name: 'Nízke tenisky Summer Pier', meta: 'modro-biela · koža', price: '68,50 €', stars: 5 },
  ],
  hint: 'Skúste aj „niečo pohodlné na dovolenku k moru“.',
};
