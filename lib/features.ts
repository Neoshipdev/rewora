/**
 * Pôvodné texty sekcie „Nástroje pre budovanie dôvery“ z rewora.com/sk
 * (stiahnuté do content/domovska-stranka.md).
 */

export const featuresIntro = {
  eyebrow: 'Nástroje',
  title: 'Štyri widgety, ktoré presvedčia aj náročného zákazníka',
  lead: 'S Reworou získate pokročilé nástroje, ktoré vám pomôžu budovať dôveru vašej značky. Či už vlastníte e-shop alebo je váš biznis zameraný iným smerom, Rewora pomôže aj vám.',
};

export type SubfeatureIcon =
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
  items: { title: string; text: string; icon: SubfeatureIcon }[];
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
        title: 'Produktové recenzie',
        icon: 'star',
        text: 'Autentické hodnotenia produktov priamo zvyšujú konverzný pomer e-shopu, zjednodušia rozhodovanie a zvyšujú lojalitu. Rewora navyše integruje recenzie z rôznych zdrojov.',
      },
      {
        title: 'Recenzie obchodu',
        icon: 'store',
        text: 'Ukážte zákazníkom svoje kvality. Rewora vám umožní zobrazovať recenzie od zákazníkov a zbierať spätnú väzbu.',
      },
      {
        title: 'Google Shopping recenzie',
        icon: 'bag',
        text: 'Zobrazte vaše produktové recenzie v Google Shopping. Získate tak náskok voči konkurencii.',
      },
    ],
  },
  {
    num: '02',
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
      },
    ],
  },
  {
    num: '03',
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
    num: '04',
    name: 'Business Intelligence',
    short:
      'Predajnosť, reklamovanosť, vratkovosť. Vy si vyberiete, ktoré dáta váš segment potrebuje.',
    long: 'Predajnosť, reklamovanosť, či vratkovosť? Aj takéto informácie dokážu zákazníka presvedčiť o nákupe. Pomocou nástroja BI dáta zobrazte prehľadné štatistiky a základné informácie o produkte na jednom mieste.',
    items: [
      {
        title: 'Špecifické dáta pre váš segment',
        icon: 'sliders',
        text: 'Každý segment je jedinečný a preto je na vás, aké dáta ku produktu zobrazíte.',
      },
      {
        title: 'Zvýšená miera konverzie',
        icon: 'trending',
        text: 'Zobrazením správnych štatistík a informácií presvedčíte aj náročných zákazníkov, čo zvyšuje konverzný pomer.',
      },
      {
        title: 'Uistenie o správnom nákupe',
        icon: 'shield',
        text: 'Uistením zákazníka o správnej voľbe produktu dokážete preukázateľne zvýšiť mieru spokojnosti s nákupom.',
      },
    ],
  },
];

/** Sekcia „Spravujte recenzie v prehľadnom administrátorskom paneli“. */
export const adminPanelSection = {
  eyebrow: 'Administrátorský panel',
  title: 'Spravujte recenzie v prehľadnom administrátorskom paneli',
  lead: 'Aktívny monitoring recenzií, automatické preklady pre viaceré krajiny, reagovanie na negatívne recenzie a zdôrazňovanie pozitívnych recenzií môžete spravovať z jedného miesta.',
  items: [
    {
      title: 'Žiadosti o recenziu',
      text: 'Rozhodnite, pre ktoré produkty a kedy sa majú automaticky vyžiadať recenzie.',
    },
    {
      title: 'Moderovanie recenzií',
      text: 'Overenie totožnosti recenzenta, posúdenie existencie konfliktu záujmov, moderovanie obsahu a schvaľovanie recenzií.',
    },
    {
      title: 'Riešenie problémov',
      text: 'Ak zákazník zanechá hodnotenie 1, 2 alebo 3 hviezdičky, budete okamžite informovaní a môžete otvoriť súkromnú diskusiu, aby ste mu pomohli vyriešiť jeho problém.',
    },
    {
      title: 'Pokročilá analytika',
      text: 'Zistite viac o svojich zákazníkoch a produktoch tým, že analytika bude pracovať za vás.',
    },
  ],
};

/** Sekcia „Čo vám Rewora prinesie“ — dlhšie znenie k číselnému pásu. */
export const benefits = {
  eyebrow: 'Čo vám Rewora prinesie',
  title: 'Rewora prináša merateľné výsledky od začiatku používania',
  items: [
    {
      value: '+10 %',
      title: 'Zvýšenie tržieb',
      text: 'Priemerný 10 % nárast celkových tržieb súvisiaci so zavedením recenzií na e-shop ich robí jedným z najefektívnejších predajných nástrojov.',
    },
    {
      value: '88 %',
      title: 'Zvýšenie dôveryhodnosti',
      text: 'Online recenziám dôveruje 88 % zákazníkov do takej istej miery ako osobným odporúčaniam známych a priateľov.',
    },
    {
      value: '270 %',
      title: 'Vyšší konverzný pomer',
      text: 'Produkty s 5 a viac recenziami zvyšujú pravdepodobnosť nákupu o 270 % v porovnaní s produktami bez recenzií.',
    },
  ],
};

/** Rozšírené texty integrácií (sekcia „Jednoduchá a rýchla integrácia“). */
export const integrationsIntro =
  'Rewora sa vďaka svojej univerzálnosti veľmi ľahko integruje s akýmkoľvek softvérom pre e-commerce obchod pomocou jednej z nasledujúcich metód.';

/** FAQ intro z pôvodného webu. */
export const faqIntro =
  'V tejto sekcii nájdete odpovede na najčastejšie kladené otázky. Zoznam otázok je neustále doplňovaný. V prípade, že ste nenašli odpoveď na vašu otázku, neváhajte nás kontaktovať prostredníctvom emailu info@rewora.io.';
