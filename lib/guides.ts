/** Krok návodu — voliteľne s vnorenými bodmi. */
export type GuideStep = { text: string; items?: string[] };

export type GuideSection = {
  num: string;
  title: string;
  intro?: string;
  steps: GuideStep[];
  /** Číslované kroky (1., 2., …) alebo obyčajné odrážky. */
  ordered?: boolean;
  outro?: string;
};

/** Návod na nasadenie doplnku Rewora Product Reviews na Shopify. */
export const shopifyGuide = {
  eyebrow: 'Návod',
  title: 'Nasadenie doplnku Rewora Product Reviews na Shopify',
  lead: 'Od inštalácie z Shopify App Store cez aktiváciu widgetu v šablóne až po schválenie prvej recenzie. Celé nasadenie zvládnete sami, bez zásahu do kódu šablóny.',
  video: {
    src: '/images/shopify-navod.mp4',
    caption: 'Celé nasadenie krok za krokom — od inštalácie doplnku po schválenú recenziu na karte produktu.',
  },
  sections: [
    {
      num: '01',
      title: 'Inštalácia doplnku',
      ordered: true,
      steps: [
        { text: 'V Shopify admine choď do Apps → Shopify App Store (alebo priamo na apps.shopify.com).' },
        { text: 'Do vyhľadávania napíš rewora a otvor Rewora Product Reviews ($4,99/mesiac, 7-dňová skúšobná doba).' },
        { text: 'Klikni Install.' },
        { text: 'Zobrazí sa okno Install app so zoznamom prístupov, ktoré appka potrebuje. Potvrď Install.' },
      ],
    },
    {
      num: '02',
      title: 'Výber a schválenie platby',
      ordered: true,
      steps: [
        {
          text: 'Otvorí sa obrazovka Select a plan → prepínač Pay monthly / Pay yearly. Standard plan stojí $4,99 / 30 dní alebo $49,99 / rok (o $9 lacnejšie), so 7 dňami zdarma. Klikni Select.',
        },
        {
          text: 'Na obrazovke Approve charge skontroluj plán a klikni Approve.',
          items: [
            'Ak ti Shopify hlási „You don’t have any payment methods on file“, cez Go to billing settings najprv pridaj platobnú metódu, inak sa Approve nedá dokončiť.',
          ],
        },
      ],
    },
    {
      num: '03',
      title: 'Aktivácia app embed v šablóne',
      ordered: true,
      steps: [
        { text: 'Po inštalácii sa otvorí úvodná stránka appky Rewora → Reviews.' },
        {
          text: 'V bloku 1. Activate app embed klikni na Activate App Embed. Otvorí sa editor témy s panelom App embeds.',
        },
        {
          text: 'Prepínač pri Rewora – Rewora Product Reviews prepni na zapnuté a vpravo hore daj Save.',
        },
      ],
    },
    {
      num: '04',
      title: 'Vloženie widgetu na stránku produktu',
      ordered: true,
      steps: [
        { text: 'Vráť sa do appky a v bloku 2. Add widget to your page klikni Add to the page.' },
        {
          text: 'V editore témy sa v šablóne Default product pridá blok Product Reviews. Presuň ho tam, kde ho chceš mať.',
        },
        {
          text: 'V ľavom paneli si nastav vzhľad widgetu, aby sedel s tvojím brandom:',
          items: [
            'Main colors – Text color, Text small color, Text caption color, Background color, Border color',
            'Action – Text on action color, Action color, Action hover color (farba tlačidla Write a review)',
            'Input – farby polí formulára',
            'Feedback colors – Positive / Negative color a ich pozadia',
            'Other – Stars color, Empty stars color, Delete icon color, Modal background, Avatar background',
          ],
        },
        {
          text: 'Klikni Save. Na stránke produktu sa objaví sekcia Reviews and Ratings s filtrami 1–5 hviezdičiek.',
        },
      ],
    },
    {
      num: '05',
      title: 'Ako zákazník pridá recenziu',
      intro: 'Na stránke produktu klikne Write a review a vyplní formulár:',
      steps: [
        { text: 'Overall rating – hviezdičky, povinné' },
        { text: 'Review title – max. 150 znakov' },
        { text: 'Review – min. 5 znakov' },
        { text: 'Positives & Negatives – ľubovoľný počet plusov a mínusov' },
        {
          text: 'Images & Videos – až 5 obrázkov (JPG, JPEG, PNG, GIF, WEBP, max. 10 MB), video (MP4, MOV, AVI, MKV, WEBM, max. 40 MB)',
        },
        { text: 'Your name – ak nechá prázdne, recenzia je anonymná' },
        { text: 'Your email – povinný, nezverejňuje sa, slúži len na overenie' },
        { text: 'Zaškrtne súhlas s Terms & Conditions a Privacy Policy a dá Send' },
      ],
      outro:
        'Recenziu vie zákazník dostať aj automaticky e-mailom po nákupe — počet dní po objednávke a odosielací e-mail sa nastavujú v Settings v appke. Tam sa dá zapnúť aj import recenzií z Heureka.sk, Heureka.cz a Arukereso (treba account key).',
    },
    {
      num: '06',
      title: 'Schválenie recenzie',
      ordered: true,
      steps: [
        { text: 'V Shopify admine choď do Apps → Rewora Product Reviews → Reviews Management.' },
        {
          text: 'Zoznam má záložky All / Not approved / Approved a stĺpce Title, Product name, Review text, Rating source, Rating, Is approved, Reviewed at. Nová recenzia má Is approved = No a na e-shope zatiaľ nie je vidieť.',
        },
        {
          text: 'Schváliť sa dá dvoma spôsobmi:',
          items: [
            'Hromadne: zaškrtni checkbox pri recenzii → nad zoznamom sa objaví Approve / Reject → klikni Approve.',
            'Cez detail: klikni na názov recenzie. Uvidíš Summary text, Pros, Cons a panel Info (produkt, hodnotenie, zdroj, dátum) s tlačidlom na schválenie/zamietnutie.',
          ],
        },
        {
          text: 'Po schválení sa stĺpec prepne na Is approved = Yes, v detaile pribudne Approved at s časom a tlačidlo sa zmení na červené Reject (schválenie sa dá kedykoľvek vziať späť).',
        },
        {
          text: 'Skontroluj výsledok na e-shope — na stránke produktu sa objaví priemerné hodnotenie (napr. 5.0, 1 review), rozpad hodnotení 1–5, meno autora, dátum, text, plusy/mínusy, priložená fotka a Was this helpful? / Report.',
        },
      ],
    },
  ] as GuideSection[],
  warning: {
    title: 'Na čo si dať pozor',
    text: 'Widget sa nezobrazí, ak nie je zapnutý app embed alebo ak si po vložení bloku nedal Save v editore témy. A recenzia sa na e-shope zobrazí až po schválení — dovtedy ostáva len v Reviews Management.',
  },
  cta: {
    title: 'Potrebujete s nasadením pomôcť?',
    text: 'Napíšte nám a prejdeme nastavenie doplnku spolu — vrátane farieb widgetu a automatických žiadostí o recenziu.',
  },
};

/** Návod na nasadenie doplnku Rewora na platforme Shoptet. */
export const shoptetGuide = {
  eyebrow: 'Návod',
  title: 'Nasadenie doplnku Rewora na Shoptete',
  lead: 'Doplnok nainštalujete priamo z katalógu Shoptet Doplnky — bez zásahu do šablóny. Návod vás prevedie od inštalácie cez aktiváciu predplatného až po schválenie prvej recenzie.',
  video: {
    src: '/images/shoptet-navod.mp4',
    caption: 'Celé nasadenie krok za krokom — od katalógu doplnkov po recenziu zobrazenú na karte produktu.',
  },
  sections: [
    {
      num: '01',
      title: 'Inštalácia doplnku',
      ordered: true,
      steps: [
        { text: 'V administrácii Shoptetu choďte do Prepojenie → Shoptet Doplnky.' },
        { text: 'Do vyhľadávania napíšte rewora a otvorte doplnok Rewora.' },
        {
          text: 'V pravom stĺpci pri „Vaša cena“ je uvedené Zadarmo za inštaláciu doplnku — kliknite na Objednať a nainštalovať.',
        },
        {
          text: 'Potvrďte objednávku doplnku. Shoptet vás vráti späť do administrácie, kde už Rewora figuruje medzi prepojeniami.',
        },
      ],
    },
    {
      num: '02',
      title: 'Overenie e-mailu a otvorenie administrácie',
      ordered: true,
      steps: [
        {
          text: 'V Prepojenie → Shoptet Doplnky otvorte Reworu — zobrazí sa obrazovka Dokončite nastavenie pre váš obchod.',
        },
        {
          text: 'Overte svoju e-mailovú adresu. Potvrdzovací odkaz sme poslali na kontaktný e-mail obchodu.',
          items: [
            'Ak e-mail nedorazil, použite Zaslať overovací email znova a skontrolujte priečinok so spamom.',
          ],
        },
        {
          text: 'Po overení sa aktivuje tlačidlo Otvoriť administráciu Rewora — kliknutím sa dostanete do svojho účtu.',
        },
      ],
    },
    {
      num: '03',
      title: 'Aktivácia predplatného',
      ordered: true,
      steps: [
        { text: 'V administrácii Rewora otvorte sekciu Fakturácia.' },
        {
          text: 'Prepínačom Mesačne / Ročne zvoľte obdobie a vyberte balík — Štandardný za 29 € alebo Profesionálny za 149 € mesačne. Kliknite Predplatiť.',
        },
        {
          text: 'Platba prebieha cez Stripe: vyplňte údaje karty alebo zvoľte Revolut Pay a potvrďte Zaplatiť a predplatiť. K cene sa pripočíta DPH podľa krajiny.',
        },
        {
          text: 'Predplatné je bez rizika — ak nebudete spokojní, do 30 dní od zakúpenia vám vrátime peniaze.',
        },
      ],
    },
    {
      num: '04',
      title: 'Nastavenie obchodu',
      ordered: true,
      steps: [
        {
          text: 'V sekcii Nastavenia skontrolujte názov a URL domény, nahrajte logo, prípadne súbor s dátami pre Business Intelligence.',
        },
        {
          text: 'Doplňte URL všeobecných obchodných podmienok a kód jazyka. Ak predávate do viacerých krajín, zapnite widgety na automatický preklad a vyberte jazyky.',
        },
        {
          text: 'Nastavte, kedy sa má odosielať žiadosť o recenziu:',
          items: [
            'krátkodobá a dlhodobá žiadosť po doručení objednávky (napríklad 7 a 70 dní),',
            'krátkodobá a dlhodobá žiadosť po nákupe, ak nie je známy dátum doručenia (napríklad 21 a 90 dní).',
          ],
        },
        {
          text: 'V pravom stĺpci sú vzory adries e-shopu (produkt, katalóg, košík, pokladňa, úspešná objednávka, domovská stránka) a selektor tlačidla „Pridať do košíka“. Pri štandardnej šablóne Shoptetu ich netreba meniť.',
        },
        { text: 'Nastavenia uložte.' },
      ],
    },
    {
      num: '05',
      title: 'Ako to vyzerá na e-shope',
      intro:
        'Po aktivácii sa widgety zobrazia bez zásahu do šablóny. Na karte produktu pribudne:',
      steps: [
        { text: 'hviezdičkové hodnotenie a počet recenzií hneď pri názve produktu,' },
        { text: 'sekcia Recenzie a hodnotenia s priemerom a rozpadom hodnotení 1 – 5,' },
        { text: 'tlačidlo Napísať recenziu s formulárom — hodnotenie, názov, text, plusy a mínusy,' },
        { text: 'možnosť pripojiť fotografie (JPG, JPEG, PNG, GIF, WEBP do 10 MB) alebo video.' },
      ],
      outro:
        'Ktoré widgety sa zobrazujú, spravujete v administrácii Rewora v sekcii Widgety.',
    },
    {
      num: '06',
      title: 'Schválenie recenzie',
      ordered: true,
      steps: [
        { text: 'V administrácii Rewora otvorte Recenzie → Recenzie a kliknite na novú recenziu.' },
        {
          text: 'V detaile vidíte nadpis, hodnotenie, text, výhody a nevýhody, autora, zdroj recenzie aj jazyk.',
        },
        {
          text: 'Vpravo hore kliknite na Označiť ako schválené — recenzia sa vzápätí zobrazí na e-shope. Prepínačom Je odporúčaný ju viete vyzdvihnúť medzi ostatnými.',
        },
        {
          text: 'Stav žiadostí o recenziu ku konkrétnej objednávke nájdete v sekcii Objednávky — vidíte, či už bola odoslaná krátkodobá alebo dlhodobá žiadosť.',
        },
      ],
    },
  ] as GuideSection[],
  warning: {
    title: 'Na čo si dať pozor',
    text: 'Widgety sa na e-shope zobrazia až po overení e-mailu a aktivácii predplatného. Nová recenzia je verejná až po schválení — dovtedy ju vidíte len v administrácii Rewora.',
  },
  cta: {
    title: 'Potrebujete s nasadením pomôcť?',
    text: 'Napíšte nám a prejdeme nastavenie doplnku spolu — vrátane žiadostí o recenziu a prekladov do ďalších jazykov.',
  },
};
