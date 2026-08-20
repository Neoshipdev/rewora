/**
 * Pôvodné texty sekcie „Nástroje pre budovanie dôvery“ z rewora.com/sk
 * (stiahnuté do content/domovska-stranka.md).
 */

export const featuresIntro = {
  eyebrow: 'Nástroje',
  title: 'Šesť widgetov, ktoré presvedčia aj náročného zákazníka',
  lead: 'S Reworou získate pokročilé nástroje, ktoré vám pomôžu budovať dôveru vašej značky. Či už vlastníte e-shop alebo je váš biznis zameraný iným smerom, Rewora pomôže aj vám.',
};

export type SubfeatureIcon =
  | 'share'
  | 'return'
  | 'camera'
  | 'video'
  | 'star'
  | 'store'
  | 'bag'
  | 'chat'
  | 'chats'
  | 'language'
  | 'tag'
  | 'book'
  | 'document'
  | 'sliders'
  | 'trending'
  | 'shield';

export type Feature = {
  num: string;
  name: string;
  short: string;
  long: string;
  /** `highlight` je časť textu, ktorú v odrážke zvýrazníme. */
  items: { title: string; text: string; icon: SubfeatureIcon; highlight?: string }[];
};

export const features: Feature[] = [
  {
    num: '01',
    name: 'Recenzie',
    short:
      'Produktové, obchodné aj Google Shopping recenzie. 12× dôveryhodnejšie ako iné marketingové materiály.',
    long: 'Recenzie sú 12-krát dôveryhodnejšie ako iné marketingové materiály, čo dáva sociálnemu dôkazu významnú silu. Až 92 % ľudí si pred nákupom prečíta recenzie zákazníkov.',
    items: [
      {
        title: 'Zbierate produktové aj obchodné recenzie od online aj offline zákazníkov',
        icon: 'store',
        text: 'Rewora vám pomáha získavať spätnú väzbu bez ohľadu na to, či zákazník nakúpil v e-shope alebo v kamennej predajni a ukazuje ich presne tam, kde ich zákazník očakáva.',
      },
      {
        title: 'Automaticky oslovujte zákazníkov po nákupe',
        icon: 'chat',
        text: 'Po dokončení objednávky zákazníkovi automaticky odošleme e-mail so žiadosťou o hodnotenie zakúpeného tovaru aj samotného obchodu. Získavate tak viac autentických a overených recenzií bez ďalšej manuálnej práce.',
      },
      {
        title: 'Agregujeme recenzie z rôznych zdrojov priamo pri produktoch',
        icon: 'star',
        text: 'Hodnotenia z viacerých zdrojov dokážeme sústrediť na jednom mieste priamo na produktovej stránke. Produkty tak získajú viac relevantného používateľského obsahu, čo posilňuje dôveryhodnosť a zároveň môže podporiť SEO a viditeľnosť produktových stránok vo vyhľadávačoch.',
      },
    ],
  },
  {
    num: '02',
    name: 'Foto a video recenzie',
    short:
      'Fotky a krátke videá od zákazníkov priamo pri produkte — najsilnejší druh sociálneho dôkazu.',
    long: 'Text presvedčí, obraz presvedčí rýchlejšie. Zákazník na vlastné oči vidí, ako produkt vyzerá v reálnom používaní, nie na ateliérovej fotografii. Obsah od zákazníkov zároveň zdarma dopĺňa vašu produktovú galériu.',
    items: [
      {
        title: 'Fotky od zákazníkov',
        icon: 'camera',
        text: 'K recenzii sa dá pripojiť fotografia produktu v reálnom prostredí. Ukážete tak veľkosť, farbu aj skutočnú kvalitu spracovania.',
      },
      {
        title: 'Video recenzie',
        icon: 'video',
        text: 'Krátke zvislé videá v štýle, na aký sú zákazníci zvyknutí zo sociálnych sietí. Zobrazujú sa v karuseli priamo na karte produktu aj na homepage.',
      },
      {
        title: 'Prepájanie recenzií so sociálnymi sieťami',
        icon: 'share',
        text: 'Máte možnosť foto a video recenzie zdieľať na svojich sociálnych sieťach a vytvárať tak prirodzený UGC obsah.',
      },
    ],
  },
  {
    num: '03',
    name: 'Hviezdičky v Google Shopping',
    short:
      'Hodnotenia sa prenášajú do Googlu a vaša karta vo výsledkoch vyhľadávania vyčnieva.',
    long: 'Recenzie zozbierané Reworou automaticky posielame do Google Merchant Center. Vaše produkty sa vo vyhľadávaní zobrazia s hviezdičkami a počtom hodnotení — na rozdiel od kariet konkurencie, ktoré ostávajú bez nich.',
    items: [
      {
        title: 'Automatický prenos hodnotení',
        icon: 'bag',
        text: 'Zbierame, overujeme a odosielame recenzie do Google Merchant Center bez toho, aby ste čokoľvek exportovali ručne.',
      },
      {
        title: 'Vyššia preklikovosť',
        icon: 'trending',
        text: 'Karta s hviezdičkami priťahuje pozornosť a získava vyšší podiel preklikov pri rovnakom rozpočte na kampane.',
      },
      {
        title: 'Súlad s pravidlami Googlu',
        icon: 'document',
        text: 'Odosielame len overené recenzie v požadovanom formáte, takže feed prejde kontrolou bez zbytočných zamietnutí.',
      },
    ],
  },
  {
    num: '04',
    name: 'Poradňa a fórum',
    short:
      'Otázky ku produktom, diskusné fórum a odborné odpovede. Odpoviete raz, použijete stokrát.',
    long: 'Poskytnite zákazníkom platformu pre otázky a odpovede. Využite obsah generovaný používateľmi a získajte spätnú väzbu od zákazníkov. Dokážete takto ušetriť zdroje oddelenia podpory.',
    items: [
      {
        title: 'Produktová poradňa',
        icon: 'chat',
        text: 'Zbierajte otázky ku produktom a odpovedajte len 1-krát. Užitočné otázky viete totiž zobraziť ku produktu na 1 klik.',
      },
      {
        title: 'Diskusné fórum a odborná poradňa',
        icon: 'chats',
        text: 'Rewora poskytuje aj komplexné diskusné fórum, s možnosťou kategorizácie príspevkov, odpoveďami odborníkov a mnohými ďalšími funkciami.',
      },
      {
        title: 'Moderovanie príspevkov a preklady',
        icon: 'language',
        text: 'Plná kontrola nad moderovaním príspevkov a pomocou strojového prekladu ich máte automaticky k dispozícii v 31 jazykoch.',
        highlight: '31 jazykoch',
      },
    ],
  },
  {
    num: '05',
    name: 'Hotspots',
    short:
      'Označte produkty v obrázku, lookbooku či PDF katalógu — a zmeňte inšpiráciu na nákup.',
    long: 'Umožnite nakupovanie produktov priamo z obrázkov na iných miestach webu. Pomocou nástroja Hotspots viete jednoducho označiť produkty na požadovanom mieste v akomkoľvek obrázku na webe.',
    items: [
      {
        title: 'Produkty v kontexte',
        icon: 'tag',
        text: 'Vyberte si akýkoľvek obrázok na svojom webe, označte produkty a je to! Zákazník vie nakupovať priamo z obrázku.',
      },
      {
        title: 'Tvorba online katalógu',
        icon: 'book',
        text: 'Premeňte váš e-shop na online katalóg produktov, lookbook alebo umožnite nákupy z blogových článkov.',
      },
      {
        title: 'Integrácia s PDF katalógmi',
        icon: 'document',
        text: 'Hotspoty fungujú aj v PDF katalógoch, stačí zvoliť stranu a umiestniť bod pre produkt.',
      },
    ],
  },
  {
    num: '06',
    name: 'Business Intelligence',
    short:
      'Predajnosť, reklamovanosť, vratkovosť. Vy si vyberiete, ktoré dáta váš segment potrebuje.',
    long: 'Predajnosť, reklamovanosť, či vratkovosť? Aj takéto informácie dokážu zákazníka presvedčiť o nákupe. Pomocou nástroja BI dáta zobrazte prehľadné štatistiky a základné informácie o produkte na jednom mieste.',
    items: [
      {
        title: 'Štatistiky predajnosti',
        icon: 'trending',
        text: 'Prehľad o tom, ktoré produkty sa predávajú najlepšie, ako sa ich výkon mení v čase a kde vzniká obchodný potenciál.',
      },
      {
        title: 'Vratkovosť a reklamovateľnosť',
        icon: 'return',
        text: 'Porovnanie produktov podľa miery vrátenia a reklamácií pomáha odhaliť problémový sortiment aj príčiny nespokojnosti.',
      },
      {
        title: 'Vlastné definovanie dát',
        icon: 'sliders',
        text: 'Možnosť upravovať a definovať zobrazované ukazovatele, filtre a pohľady podľa potrieb konkrétneho tímu alebo klienta.',
      },
    ],
  },
];

/** Sekcia „Spravujte recenzie v prehľadnom administrátorskom paneli“. */
export type AdminShotKey = 'manage' | 'reviews' | 'dashboard';

export const adminPanelSection: {
  eyebrow: string;
  title: string;
  lead: string;
  items: { title: string; text: string; shot: AdminShotKey }[];
} = {
  eyebrow: 'Administrátorský panel',
  title: 'Spravujte recenzie v prehľadnom administrátorskom paneli',
  lead: 'Aktívny monitoring recenzií, automatické preklady pre viaceré krajiny, reagovanie na negatívne recenzie a zdôrazňovanie pozitívnych recenzií môžete spravovať z jedného miesta.',
  items: [
    {
      title: 'Žiadosti o recenziu',
      text: 'Rozhodnite, pre ktoré produkty a kedy sa majú automaticky vyžiadať recenzie.',
      shot: 'manage',
    },
    {
      title: 'Moderovanie recenzií',
      text: 'Overenie totožnosti recenzenta, posúdenie existencie konfliktu záujmov, moderovanie obsahu a schvaľovanie recenzií.',
      shot: 'reviews',
    },
    {
      title: 'Riešenie problémov',
      text: 'Ak zákazník zanechá hodnotenie 1, 2 alebo 3 hviezdičky, budete okamžite informovaní a môžete otvoriť súkromnú diskusiu, aby ste mu pomohli vyriešiť jeho problém.',
      shot: 'reviews',
    },
    {
      title: 'Pokročilá analytika',
      text: 'Zistite viac o svojich zákazníkoch a produktoch tým, že analytika bude pracovať za vás.',
      shot: 'dashboard',
    },
  ],
};

/** Rozšírené texty integrácií (sekcia „Jednoduchá a rýchla integrácia“). */
export const integrationsIntro =
  'Rewora sa vďaka svojej univerzálnosti veľmi ľahko integruje s akýmkoľvek softvérom pre e-commerce obchod pomocou jednej z nasledujúcich metód.';

/** FAQ intro z pôvodného webu. */
export const faqIntro =
  'V tejto sekcii nájdete odpovede na najčastejšie kladené otázky. Zoznam otázok je neustále doplňovaný. V prípade, že ste nenašli odpoveď na vašu otázku, neváhajte nás kontaktovať prostredníctvom emailu info@rewora.io.';
