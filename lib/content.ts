/**
 * Marketingový obsah domovskej stránky na jednom mieste.
 * Podľa handoffu je tento obsah kandidát na CMS (Wagtail) — preto je držaný
 * v jednom objekte, nie roztrúsený po komponentoch.
 */

/* Kotvy smerujú na sekcie domovskej stránky, aby fungovali aj z podstránok. */
export const nav = [
  { label: 'Funkcie', href: '/sk/#features' },
  { label: 'Prípadové štúdie', href: '/sk/pripadove-studie/' },
  { label: 'Cenník', href: '/sk/cennik/' },
  { label: 'Integrácie', href: '/sk/#integration' },
  { label: 'FAQ', href: '/sk/#faq' },
  { label: 'Blog', href: '/sk/blog/' },
];

export const cta = { label: 'Vyskúšať teraz', href: '/sk/cennik/' };

/** Video z pôvodného webu (YouTube bez cookies). */
export const heroVideo = {
  label: 'Pozrieť video',
  title: 'Rewora — video',
  embed: 'https://www.youtube-nocookie.com/embed/jQ4ItkcmFSA',
};

/** Ukážka widgetov na e-shope zákazníka (generátor PDF). */
export const demoCta = {
  label: 'Ukážka Rewory na vašom e-shope',
  shortLabel: 'Ukážka na vašom e-shope',
  href: '/sk/ukazka/',
};

export const hero = {
  eyebrow: 'Na recenziách záleží',
  titleLines: ['Každý produkt', 'si zaslúži', 'svoj dôkaz.'],
  lead: 'Recenzie, poradňa, hotspoty a BI dáta. Nasaďte sociálny dôkaz na celý e-shop a sledujte, ako rastie konverzný pomer.',
  primary: { label: 'Vyskúšať teraz', href: '/sk/cennik/' },
  rating: '4,8 priemerné hodnotenie našich klientov',
};

/* Logá klientov sú v lib/assets.ts (obrázky stiahnuté z rewora.com). */

export const numbers = [
  { value: '+10 %', label: 'priemerný nárast tržieb po zavedení recenzií' },
  { value: '88 %', label: 'zákazníkov verí recenziám ako odporúčaniu známych' },
  { value: '270 %', label: 'vyššia pravdepodobnosť nákupu pri 5+ recenziách' },
];

export const tools = [
  {
    num: '01',
    name: 'Recenzie',
    text: 'Produktové, obchodné aj Google Shopping recenzie. 12× dôveryhodnejšie ako iné marketingové materiály.',
  },
  {
    num: '02',
    name: 'Poradňa a fórum',
    text: 'Otázky ku produktom, diskusné fórum a odborné odpovede. Odpoviete raz, použijete stokrát.',
  },
  {
    num: '03',
    name: 'Hotspots',
    text: 'Označte produkty v obrázku, lookbooku či PDF katalógu — a zmeňte inšpiráciu na nákup.',
  },
  {
    num: '04',
    name: 'Business Intelligence',
    text: 'Predajnosť, reklamovanosť, vratkovosť. Vy si vyberiete, ktoré dáta váš segment potrebuje.',
  },
];

/**
 * Referencie klientov — slidy s farbou značky klienta, logom a titulnou
 * fotografiou prípadovej štúdie (rovnaká skladba ako na rewora.com/sk).
 */
export const testimonials = [
  {
    quote:
      '„Rewora nám okamžite priniesla poriadok do recenzií naprieč krajinami. Získali sme viac spätnej väzby, vyššiu dôveru zákazníkov a konečne máme jasný prehľad o tom, čo funguje.“',
    author: 'Ľuboš Tanáč',
    role: 'Managing director',
    company: 'FixServis',
    color: '#28B0EA',
    logo: '/images/media/01-logo-fixservis.max-200x60.svg',
    cover: '/images/media/fixservis_en.2e16d0ba.fill-800x500.png',
    href: '/sk/pripadove-studie/ako-sme-pre-fixservis-pomocou-recenzii-zvysili-obrat-o-vyse-10/',
  },
  {
    quote:
      '„Rewora sa stala súčasťou nášho marketingu a predaja. Po jej nasadení sme pocítili dôveru zákazníkov, viac spätnej väzby a lepšie rozhodovanie pri nákupe.“',
    author: 'Pavol Šťastný',
    role: 'Marketing manager',
    company: 'Drinkcentrum',
    color: '#081335',
    logo: '/images/media/03-logo-drinkcentrum.max-200x60.png',
    cover: '/images/media/drinkcentrum_en.2e16d0ba.fill-800x500.png',
    href: '/sk/pripadove-studie/rewora-ako-katalyzator-rastu-drinkcentrum/',
  },
  {
    quote:
      '„Vďaka Rewore sme výrazne posilnili dôveru zákazníkov a získali cennú spätnú väzbu priamo pri produktoch. Recenzie dnes reálne pomáhajú zákazníkom pri rozhodovaní o nákupe.“',
    author: 'Patrik Jucha',
    role: 'E-commerce manager',
    company: 'kilpi.cz',
    color: '#28B0EA',
    logo: '/images/media/kilpi-logo_whitepng.max-200x60.png',
    cover: '/images/media/kilpi_en.2e16d0ba.fill-800x500.png',
    href: '/sk/pripadove-studie/od-dovery-k-vykonu-ako-rewora-pomohla-eshopu-kilpi/',
  },
];

export const testimonialsCta = 'Prečítať si prípadovú štúdiu';

export const integrations = [
  {
    num: '01',
    name: 'Google Tag Manager',
    text: 'Integrácia cez Google Tag Manager umožňuje jednoduché napojenie a zdieľanie informácií medzi vaším obchodom a nástrojom Rewora.',
  },
  {
    num: '02',
    name: 'Integrácia na mieru',
    text: 'Rewora funguje s akýmkoľvek e-commerce riešením. Vďaka nášmu tímu bude pre vás integrácia hračkou.',
  },
  {
    num: '03',
    name: 'Shopify Plugin',
    text: 'Integrujte so Shopify e-shopom na 1 klik a používajte všetky dostupné funkcie.',
  },
];

export const faq = [
  {
    q: 'Čo je sociálny dôkaz?',
    a: [
      'Koncept sociálneho dôkazu spočíva v tom, že niekoho možno presvedčiť, aby vyskúšal výrobok alebo službu len preto, že videl pozitívnu recenziu alebo si prečítal hodnotenie odborníka, ktorý súvisí s daným výrobkom.',
      'Sociálny dôkaz pomáha upokojiť myseľ spotrebiteľov a presvedčiť ich, že kúpou produktu vyriešia svoju potrebu.',
    ],
  },
  {
    q: 'Sú online recenzie naozaj také dôležité?',
    a: [
      'Online recenzie sú pre spotrebiteľov dôležité, pretože poskytujú sociálny dôkaz a budujú dôveru v značku.',
      'Produkty s piatimi a viac recenziami majú o 270 % vyššiu pravdepodobnosť, že sa predajú, ako produkty bez recenzií. Deväť z desiatich online kupujúcich si pred nákupom prečíta recenzie.',
      'Štúdie ukázali, že recenzie zákazníkov sú pri rozhodovaní o nákupe dôležitejšie ako ceny, pretože im ľudia dôverujú viac ako odporúčaniam známych osobností a tradičným reklamným metódam.',
    ],
  },
  {
    q: 'Prečo by ma mali zaujímať recenzie?',
    a: [
      'Recenzie zákazníkov nahradili ústne podanie ako hlavný motor zvyšovania reputácie podniku. Online recenzie sú ľahko dostupné; v dôsledku toho môžu mať neuveriteľný vplyv na vaše podnikanie.',
      'Obsah generovaný používateľmi je pokladnicou informácií a do veľkej miery nevyužitým zdrojom spätnej väzby od zákazníkov bohatej na súvislosti.',
    ],
  },
  {
    q: 'Prečo by mal každý e-commerce obchod zbierať produktové recenzie?',
    a: [
      'Recenzie píšu skutoční zákazníci so skutočnými rukami, nohami, ušami, domovmi a rodinami. Špecifikácie produktov často píšu talentovaní marketéri, ktorí majú so samotným produktom len malé alebo žiadne skúsenosti.',
      'Jednotlivé recenzie produktov môžu mať úžasný vplyv na zákaznícku skúsenosť a váš konverzný pomer.',
    ],
  },
  {
    q: 'Aké jazyky sú podporované automatickým prekladom?',
    a: [
      'Angličtina, bulharčina, čínština, čeština, dánčina, estónčina, fínčina, francúzština, indonézština, taliančina, japončina, kórejčina, litovčina, lotyština, maďarčina, nemčina, holandčina, nórčina, poľština, portugalčina, rumunčina, ruština, slovenčina, slovinčina, španielčina, švédčina, turečtina, ukrajinčina a iné.',
    ],
  },
  {
    q: 'Sú recenzie produktov prínosom pre SEO?',
    a: [
      'Áno. Ak umožníte vyhľadávačom indexovať obsah recenzií produktov, pomôžete potenciálnym zákazníkom nájsť stránky s vašimi produktmi a posúvate sa v organickom vyhľadávaní.',
      'Väčšina zákazníkov používa vo svojich recenziách kľúčové slová, ako napríklad názov produktu, čím sa na internete pridáva viac obsahu spojeného s vami.',
    ],
  },
];

export const finalCta = {
  title: 'Vyskúšajte Reworu teraz',
  subtitle: 'GTM, integrácia na mieru alebo Shopify plugin — vyberte si.',
  button: { label: 'Vyskúšať teraz', href: '/sk/cennik/' },
};

export const footer = {
  links: [
    { label: 'Všeobecné obchodné podmienky', href: '/sk/vseobecne-obchodne-podmienky/' },
    { label: 'Ochrana osobných údajov', href: '/sk/ochrana-osobnych-udajov/' },
  ],
  copy: '© 2026 Rewora. Všetky práva vyhradené.',
};
