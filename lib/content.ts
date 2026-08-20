/**
 * Marketingový obsah domovskej stránky na jednom mieste.
 * Podľa handoffu je tento obsah kandidát na CMS (Wagtail) — preto je držaný
 * v jednom objekte, nie roztrúsený po komponentoch.
 */

/**
 * Horná lišta — Kontakt a Partnerský program sú schované pod „O nás“,
 * FAQ a Kontakt sú dostupné z pätičky.
 * Kotvy smerujú na sekcie domovskej stránky, aby fungovali aj z podstránok.
 */
export type NavItem = { label: string; href: string; children?: NavItem[] };

export const nav: NavItem[] = [
  { label: 'Funkcie', href: '/sk/#features' },
  { label: 'Prípadové štúdie', href: '/sk/pripadove-studie/' },
  { label: 'Cenník', href: '/sk/cennik/' },
  { label: 'Integrácie', href: '/sk/#integration' },
  { label: 'Blog', href: '/sk/blog/' },
  {
    label: 'O nás',
    href: '/sk/o-nas/',
    children: [
      { label: 'O Rewore', href: '/sk/o-nas/' },
      { label: 'Kontakt', href: '/sk/kontakt/' },
      { label: 'Partnerský program', href: '/sk/partnersky-program/' },
    ],
  },
];

/** Pätička ukazuje celú štruktúru vrátane FAQ a kontaktu. */
export const footerNav: NavItem[] = [
  { label: 'Funkcie', href: '/sk/#features' },
  { label: 'Prípadové štúdie', href: '/sk/pripadove-studie/' },
  { label: 'Cenník', href: '/sk/cennik/' },
  { label: 'Integrácie', href: '/sk/#integration' },
  { label: 'FAQ', href: '/sk/#faq' },
  { label: 'Blog', href: '/sk/blog/' },
  { label: 'O nás', href: '/sk/o-nas/' },
  { label: 'Kontakt', href: '/sk/kontakt/' },
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
  titleLines: ['Dôvera zákazníkov', 'mení návštevy', 'na nákupy'],
  lead: 'Budujte dôveru u vašich zákazníkov a merateľne zvýšte konverzný pomer vášho webu jednoducho na pár klikov. Rewora je rozhodujúci impulz k nákupu.',
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
    metric: { value: '+15 %', label: 'nárast konverzného pomeru' },
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
    metric: { value: '+25 %', label: 'nárast konverzného pomeru' },
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
    metric: { value: '~10 %', label: 'viac vložení do košíka' },
    color: '#28B0EA',
    logo: '/images/media/kilpi-logo_whitepng.max-200x60.png',
    cover: '/images/media/kilpi_en.2e16d0ba.fill-800x500.png',
    href: '/sk/pripadove-studie/od-dovery-k-vykonu-ako-rewora-pomohla-eshopu-kilpi/',
  },
];

export const testimonialsCta = 'Prečítať si prípadovú štúdiu';

/** Ľavý stĺpec sekcie s referenciami. */
export const testimonialsIntro = {
  eyebrow: 'Referencie',
  title: 'Čo hovoria naši klienti',
  text: 'Reworu používa viac než 100 domén na Slovensku a v Česku — od distribútorov nápojov cez servis elektroniky až po výrobcov športového oblečenia. Tri z nich sme spracovali do prípadových štúdií s konkrétnymi číslami.',
  button: { label: 'Všetky prípadové štúdie', href: '/sk/pripadove-studie/' },
};

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

/**
 * Legislatíva k recenziám pre slovenské e-shopy.
 * Informatívny prehľad — nenahrádza právne poradenstvo.
 */
export const faqLegalIntro =
  'Od 1. júla 2024 platí zákon č. 108/2024 Z. z. o ochrane spotrebiteľa, ktorý do slovenského práva preniesol európsku smernicu Omnibus (EÚ) 2019/2161. Priniesol konkrétne povinnosti pre každý e-shop, ktorý zverejňuje spotrebiteľské recenzie alebo hodnotenia. Nižšie sú zhrnuté v praktickej podobe.';

export const faqLegal = [
  {
    q: 'Aké predpisy upravujú recenzie na slovenských e-shopoch?',
    a: [
      'Základom je zákon č. 108/2024 Z. z. o ochrane spotrebiteľa, účinný od 1. júla 2024, ktorý nahradil pôvodné zákony č. 250/2007 Z. z. a č. 102/2014 Z. z. Preberá smernicu Európskeho parlamentu a Rady (EÚ) 2019/2161, známu ako smernica Omnibus.',
      'Na recenzie sa vzťahujú aj všeobecné pravidlá o nekalých obchodných praktikách a klamlivom konaní, zoznam praktík zakázaných za každých okolností (tzv. čierna listina) a pri zverejňovaní mien recenzentov aj nariadenie GDPR.',
      'Ak predávate do iných krajín EÚ, rovnaké pravidlá platia aj tam — smernica Omnibus je transponovaná vo všetkých členských štátoch.',
    ],
  },
  {
    q: 'Musím uvádzať, či sú recenzie overené?',
    a: [
      'Áno. Ak sprístupňujete spotrebiteľské recenzie produktov, máte informačnú povinnosť uviesť, či a akým spôsobom zabezpečujete, že zverejnené recenzie pochádzajú od spotrebiteľov, ktorí produkt skutočne kúpili alebo použili.',
      'Informácia musí byť dostupná na mieste, kde sa recenzie zobrazujú — teda pri produkte alebo v sekcii hodnotení, nie schovaná len v obchodných podmienkach. V praxi ide o krátky text typu „Recenzie zbierame od zákazníkov, ktorí si produkt objednali; každú párujeme s číslom objednávky.“',
      'Ak recenzie neoverujete, nesmiete tvrdiť ani naznačovať, že overené sú. Aj to je legitímna možnosť — musíte to však uviesť pravdivo.',
    ],
  },
  {
    q: 'Čo je pri recenziách zakázané za každých okolností?',
    a: [
      'Tvrdiť, že recenzie zverejnené na e-shope pochádzajú od spotrebiteľov, ktorí produkt skutočne kúpili alebo použili, bez toho, aby ste podnikli primerané a proporcionálne kroky na overenie tejto skutočnosti.',
      'Zverejňovať falošné recenzie alebo odporúčania, poveriť ich vytvorením inú osobu (napríklad nakupovať recenzie od agentúry) alebo písať recenzie na vlastné produkty pod menom zákazníka.',
      'Skresľovať spotrebiteľské recenzie s cieľom propagovať produkt — napríklad zverejňovať len pozitívne a systematicky zamlčiavať negatívne, meniť ich obsah, presúvať hodnotenia z iného produktu alebo zobrazovať priemer, ktorý nezodpovedá reálnym recenziám.',
      'Uvádzať zavádzajúce agregované hodnotenie, napríklad počítať priemer len z vybraných recenzií alebo ponechať hviezdičky z obdobia, keď mal produkt inú podobu.',
    ],
  },
  {
    q: 'Ako mám overovať, že recenzia pochádza od skutočného zákazníka?',
    a: [
      'Zákon nepredpisuje jednu konkrétnu technológiu, vyžaduje „primerané a proporcionálne kroky“. V praxi sa za dostatočné považuje spárovanie recenzie s konkrétnou objednávkou — teda pozvánka na hodnotenie odoslaná po doručení tovaru na e-mail z objednávky, s jedinečným odkazom.',
      'Odporúča sa uchovávať väzbu medzi recenziou a identifikátorom objednávky, dátum odoslania pozvánky a dátum zverejnenia. Pri kontrole zo strany Slovenskej obchodnej inšpekcie tak viete preukázať, že proces reálne funguje.',
      'Ak zbierate aj recenzie od návštevníkov bez objednávky alebo preberáte hodnotenia z iných platforiem, mali by byť viditeľne odlíšené od overených — napríklad štítkom „overená recenzia“ pri tých, ktoré sú spárované s nákupom.',
    ],
  },
  {
    q: 'Môžem mazať negatívne recenzie?',
    a: [
      'Selektívne mazanie negatívnych recenzií je zakázané — ide o skresľovanie recenzií a teda o nekalú obchodnú praktiku.',
      'Odstrániť možno recenziu, ktorá porušuje vopred zverejnené pravidlá moderovania: obsahuje vulgarizmy, urážky, osobné údaje tretích osôb, reklamu, netýka sa produktu alebo existuje dôvodné podozrenie, že je podvodná. Dôvod odstránenia by mal byť zdokumentovaný.',
      'Pravidlá moderovania odporúčame zverejniť a uplatňovať rovnako na pozitívne aj negatívne hodnotenia. Na negatívnu recenziu je vhodnejšie verejne odpovedať než ju skrývať — reakcia obchodu býva pre ďalších zákazníkov silnejším signálom dôveryhodnosti než samotná recenzia.',
    ],
  },
  {
    q: 'Môžem za recenziu ponúknuť zľavu alebo darček?',
    a: [
      'Motivovať zákazníkov k napísaniu recenzie je prípustné, no odmena nesmie byť podmienená pozitívnym hodnotením. Formulácia „napíšte 5-hviezdičkovú recenziu a získate zľavu“ je zakázaná.',
      'Ak bola recenzia odmenená, táto skutočnosť by mala byť pri recenzii uvedená, aby nebola zavádzajúca. Rovnako sa označuje spolupráca s influencermi a recenzie výmenou za produkt zdarma.',
      'Odmena musí byť poskytnutá bez ohľadu na to, či zákazník napísal pochvalu alebo kritiku.',
    ],
  },
  {
    q: 'Aké povinnosti mám pri osobných údajoch recenzentov?',
    a: [
      'Meno, e-mail či fotografia recenzenta sú osobné údaje. Potrebujete pre ich spracúvanie právny základ, informovať dotknutú osobu o účele a dobe uchovávania a umožniť jej uplatniť práva podľa GDPR vrátane výmazu.',
      'Odporúčame zverejňovať iba údaje, ktoré zákazník na zverejnenie odsúhlasil — napríklad krstné meno a iniciálu priezviska, prípadne označenie „overený zákazník“.',
      'Ak recenzie spracúva externý nástroj, ide o sprostredkovateľa a vzťah treba ošetriť zmluvou o spracúvaní osobných údajov.',
    ],
  },
  {
    q: 'Platia pravidlá aj pre hviezdičky v reklame a vo vyhľadávaní?',
    a: [
      'Áno. Ak zobrazujete hodnotenie v Google Shopping, v reklamách alebo v štruktúrovaných dátach vo vyhľadávaní, musí zodpovedať reálnym recenziám na vašom e-shope a spĺňať rovnaké požiadavky na pravdivosť.',
      'Rovnako to platí pre hodnotenie obchodu uvádzané v pätičke, na bannery či do e-mailov. Priemer aj počet recenzií musia byť aktuálne.',
      'Platformy majú navyše vlastné pravidlá — pri porušení môžu produktové kampane pozastaviť aj nezávisle od štátneho dozoru.',
    ],
  },
  {
    q: 'Čo hrozí pri porušení pravidiel?',
    a: [
      'Dozor vykonáva Slovenská obchodná inšpekcia, ktorá môže uložiť pokutu a nariadiť odstránenie protiprávneho stavu. Konanie môže začať na základe vlastnej kontroly aj podnetu spotrebiteľa či konkurencie.',
      'Pri rozsiahlych porušeniach s cezhraničným dosahom umožňuje smernica Omnibus pokutu až do výšky 4 % ročného obratu obchodníka v dotknutých členských štátoch.',
      'Popri sankcii treba počítať aj s reputačnou stratou — kauzy s falošnými recenziami sú mediálne vďačné a zákazníci ich dohľadajú aj po rokoch.',
    ],
  },
  {
    q: 'Ako pomáha Rewora splniť tieto povinnosti?',
    a: [
      'Pozvánky na recenziu sa odosielajú až po objednávke, takže každá recenzia má väzbu na konkrétny nákup — to je jadro požadovaného overenia. Overené recenzie sú viditeľne označené a odlíšené od neoverených.',
      'Moderovanie prebieha podľa jednotných pravidiel s históriou zásahov, takže viete preukázať, prečo bola recenzia odstránená. Negatívne hodnotenia sa nedajú „potichu“ schovať — namiesto toho máte upozornenie a priestor na verejnú odpoveď.',
      'Agregované hodnotenie a počet recenzií sa počítajú zo všetkých zverejnených recenzií a rovnaké čísla putujú aj do Google Shopping. Informáciu o spôsobe overovania zobrazíme priamo pri widgete s recenziami.',
      'Tento prehľad má informatívny charakter a nenahrádza právne poradenstvo — konkrétne nastavenie procesov odporúčame konzultovať s vaším právnikom.',
    ],
  },
];

/**
 * Partnerský program pre agentúry a freelancerov.
 * Konkrétne provízne sadzby si Rewora dopĺňa podľa dohody — v texte sú
 * zámerne uvedené ako „podľa zmluvy“, nie ako fixné číslo.
 */
export const partner = {
  eyebrow: 'Partnerský program',
  title: 'Odporúčajte Reworu a zarábajte na tom',
  lead: 'Robíte e-shopy, marketing alebo konzultácie? Za každého klienta, ktorý cez vás začne používať Reworu, dostávate províziu — a klient nadštandardnú starostlivosť.',
  audience: {
    title: 'Pre koho je program',
    items: [
      {
        title: 'E-commerce agentúry',
        text: 'Riešite klientom e-shop na Shoptete, Shopify či na mieru. Recenzie sú prirodzená súčasť nasadenia a vy k nej pridáte ďalší príjem.',
      },
      {
        title: 'Marketingové agentúry',
        text: 'Staráte sa o výkonnostné kampane a SEO. Hviezdičky v Google Shopping a obsah z recenzií zlepšia čísla, ktoré klientovi reportujete.',
      },
      {
        title: 'Freelanceri a konzultanti',
        text: 'Radíte e-shopom, ako rásť. Rewora je nástroj, ktorý viete odporučiť s čistým svedomím a mať z odporúčania podiel.',
      },
    ],
  },
  steps: {
    title: 'Ako to funguje',
    items: [
      {
        num: '01',
        title: 'Ozvete sa nám',
        text: 'Napíšete nám pár viet o tom, s akými e-shopmi pracujete. Dohodneme si krátky hovor a podmienky spolupráce.',
      },
      {
        num: '02',
        title: 'Dostanete partnerský prístup',
        text: 'Získate demo účet, podklady na prezentáciu klientovi a vlastný odkaz či kód, cez ktorý sa registrácie priradia k vám.',
      },
      {
        num: '03',
        title: 'Odporučíte Reworu klientovi',
        text: 'Nasadenie zvládnete sami cez GTM alebo API, alebo ho necháte na nás — podľa toho, ako veľmi sa chcete zapojiť.',
      },
      {
        num: '04',
        title: 'Poberáte províziu',
        text: 'Za každého platiaceho klienta dostávate províziu podľa zmluvy, opakovane počas trvania jeho predplatného.',
      },
    ],
  },
  benefits: {
    title: 'Čo od nás dostanete',
    items: [
      {
        title: 'Opakovaná provízia',
        text: 'Nejde o jednorazový bonus za registráciu — provízia vám chodí, kým je klient aktívny.',
      },
      {
        title: 'Demo účet zdarma',
        text: 'Plnohodnotný prístup, na ktorom klientovi ukážete widgety aj administráciu naživo.',
      },
      {
        title: 'Podklady na predaj',
        text: 'Prezentácia, prípadové štúdie a automaticky generovaná PDF ukážka widgetov na e-shope vášho klienta.',
      },
      {
        title: 'Prednostná podpora',
        text: 'Priamy kontakt na náš tím pri nasadení, bez čakania v bežnej fronte.',
      },
      {
        title: 'Technická pomoc pri integrácii',
        text: 'Pomôžeme s GTM, API aj s netypickými riešeniami na mieru.',
      },
      {
        title: 'Spoločná propagácia',
        text: 'Úspešné nasadenie spracujeme do prípadovej štúdie, kde má priestor aj vaša značka.',
      },
    ],
  },
  cta: {
    title: 'Chcete sa stať partnerom?',
    text: 'Napíšte nám alebo zavolajte — dohodneme si 20-minútový hovor a prejdeme podmienky.',
    button: 'Napísať Andrei',
  },
};

/**
 * O nás — fakty z investorskej prezentácie (november 2025), z ktorej sú
 * použité len údaje vhodné na verejný web. Finančné ukazovatele, investičný
 * dopyt ani interná konverzia obchodného lievika tu zámerne nie sú.
 */
export const about = {
  eyebrow: 'O nás',
  title: 'Zo Slovenska meníme, ako e-shopy pracujú s dôverou',
  lead: 'Rewora je slovenská SaaS platforma pre zákaznícku skúsenosť. Začali sme pilotmi, dnes ovplyvňujeme tržby desiatok e-shopov na Slovensku a v Česku — a to je len začiatok.',
  heroImage: {
    src: '/images/media/rewora-reviews-that-matter-44.format-webp.width-1200.webp',
    alt: 'Recenzie s fotografiami produktov na e-shope',
  },
  facts: [
    { value: '2023', label: 'na trhu od roku' },
    { value: '100+', label: 'domén používa Reworu' },
    { value: '8', label: 'ľudí v tíme' },
    { value: '13 rokov', label: 'pracujeme spolu' },
  ],
  story: {
    title: 'Prečo Rewora vznikla',
    paragraphs: [
      'Európa je po Ázii druhý najväčší e-commerce trh a do online nákupov sa zapája osem z desiatich Európanov. Napriek tomu končí až 85 % košíkov opustených — zákazník si nie je istý produktom, obchodom alebo oboma.',
      'Táto nedôvera stojí e-shopy miliardy. Pritom nástroj, ktorý ju rieši, majú na dosah: skúsenosti vlastných zákazníkov. Recenzie sú dôveryhodnejšie ako reklama a pri rozhodovaní vážia viac než cena.',
      'Rewora preto spája do jednej platformy všetko, čím sa dá sociálny dôkaz na e-shope využiť — recenzie produktov aj obchodu, poradňu a fórum, hotspoty, BI dáta o produkte a prenos hodnotení do Google Shopping.',
    ],
  },
  /* Úvodné krédo — vľavo text, vpravo ukážka widgetu. */
  belief: {
    title: 'Veríme, že najlepším predajcom značky je jej zákazník.',
    paragraphs: [
      'Rewora vznikla z jednoduchej myšlienky: ľudia dôverujú skúsenostiam iných ľudí viac než reklame. Preto pomáhame e-shopom premieňať skúsenosti ich zákazníkov na dôveru — a dôveru na nákup.',
      'Zbierame, prepájame a zobrazujeme autentické produktové a obchodné recenzie presne tam, kde ich zákazník potrebuje pri rozhodovaní.',
      'Rewora však nie je iba nástroj na hviezdičky a hodnotenia. Spájame recenzie, sociálny dôkaz, zákaznícke otázky a odpovede, produktové dáta, Google Shopping, interaktívny obsah a analytiku do jednej platformy, ktorá pomáha zákazníkom rozhodovať sa jednoduchšie a e-shopom predávať viac.',
    ],
  },
  /* Dôvera ako merateľná hodnota — pod textom kolobeh nákupnej cesty. */
  trust: {
    eyebrow: 'Dôvera je merateľná hodnota',
    title: 'Zákaznícka dôvera je pre nás merateľná hodnota',
    paragraphs: [
      'Nechceme, aby boli recenzie iba doplnkom na konci produktovej stránky. Chceme z nich vytvoriť jeden z najsilnejších predajných nástrojov e-shopu.',
      'Rewora pracuje so zákazníckou skúsenosťou počas celej nákupnej cesty — od automatického získavania spätnej väzby cez jej zobrazovanie pri produktoch až po využitie recenzií vo vyhľadávačoch, Google Shoppingu a ďalších miestach, kde sa zákazník rozhoduje.',
      'Každá skúsenosť jedného zákazníka tak môže pomôcť pri rozhodovaní ďalšieho.',
    ],
    flow: ['Nákup', 'Skúsenosť', 'Recenzia', 'Dôvera', 'Ďalší nákup'],
  },
  team: {
    title: 'Zo Slovenska tvoríme technológiu pre európsky e-commerce',
    paragraphs: [
      'Reworu budujeme od roku 2023. Za platformou stojí zohraný tím ľudí z technológií, e-commerce, obchodu a marketingu, ktorí spolupracujú dlhé roky a spájajú skúsenosti zo slovenských aj zahraničných technologických spoločností.',
      'Dnes Rewora pomáha e-shopom pracovať s dôverou zákazníkov na viac ako 100 doménach a naše ambície siahajú ďaleko za hranice Slovenska.',
      'V roku 2025 sme získali 1. miesto v inkubačnom programe Upsteer by Asseco CE. Vnímame to ako potvrdenie, že problém, ktorý riešime, je reálny — a že spôsob, akým zákazníci nakupujú online, sa dá robiť lepšie.',
    ],
    disciplines: ['Technológie', 'E-commerce', 'Obchod', 'Marketing'],
    roles: [
      { count: '2', role: 'programátori' },
      { count: '3', role: 'obchodníci' },
      { count: '1', role: 'produktový vlastník' },
      { count: '1', role: 'dizajn a marketing' },
      { count: '1', role: 'technická podpora' },
    ],
  },
  future: {
    title: 'Kam smerujeme',
    paragraphs: [
      'Pracujeme na TrustGraph™ — technológii, ktorá z reálneho správania zákazníkov vytvára personalizované odporúčania. Každý návštevník uvidí obsah zoradený podľa svojich preferencií a nákupnej histórie, podobne ako to poznáte zo streamovacích služieb.',
      'Rozširujeme pluginy pre e-commerce platformy, prehlbujeme viacjazyčnosť pre expanziu do zahraničia a staviame komunitu, ktorá e-shopom prináša organickú návštevnosť a prirodzený rast predaja cez odporúčania.',
    ],
  },
  cta: {
    title: 'Chcete vedieť viac?',
    text: 'Radi vám ukážeme, ako Rewora funguje na vašom e-shope.',
  },
};

export const finalCta = {
  title: 'Vyskúšajte Reworu teraz',
  subtitle: 'GTM, integrácia na mieru alebo Shopify plugin — vyberte si.',
  button: { label: 'Vyskúšať teraz', href: '/sk/cennik/' },
};

/** Kontaktné údaje — obchodný kontakt a firemné údaje z VOP. */
export const contact = {
  eyebrow: 'Kontakt',
  title: 'Ozvite sa nám',
  lead: 'Poradíme s nasadením, pripravíme ukážku na vašom e-shope alebo prejdeme cenník podľa veľkosti vášho obchodu.',
  person: {
    name: 'Andrea Vargová',
    role: 'Sales manažérka Rewora',
    photo: '/images/andrea-vargova.png',
    phone: '+421 948 227 871',
    phoneHref: 'tel:+421948227871',
    email: 'andrea.vargova@rewora.com',
  },
  general: {
    title: 'Všeobecné otázky a podpora',
    email: 'info@rewora.io',
  },
  company: {
    title: 'Fakturačné údaje',
    name: 'Rewora s. r. o.',
    address: 'Prešovská 40A, 821 02 Bratislava – Ružinov, Slovenská republika',
    ico: 'IČO: 50 647 652',
    registration:
      'Zapísaná v Obchodnom registri Mestského súdu Bratislava III, oddiel Sro, vložka č. 116449/B',
  },
};

export const footer = {
  links: [
    { label: 'Partnerský program', href: '/sk/partnersky-program/' },
    { label: 'Všeobecné obchodné podmienky', href: '/sk/vseobecne-obchodne-podmienky/' },
    { label: 'Ochrana osobných údajov', href: '/sk/ochrana-osobnych-udajov/' },
  ],
  copy: '© 2026 Rewora. Všetky práva vyhradené.',
};
