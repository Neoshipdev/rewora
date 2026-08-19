/** Cenník podľa rewora.com/sk/cennik/ (stiahnuté 17. 8. 2026). */

export type Plan = {
  name: string;
  priceMonthly: string;
  priceYearly: string;
  periodMonthly: string;
  periodYearly: string;
  cta: { label: string; href: string };
  featured?: boolean;
  intro?: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: 'Bezplatný',
    priceMonthly: '0 €',
    priceYearly: '0 €',
    periodMonthly: 'navždy',
    periodYearly: 'navždy',
    cta: { label: 'Začať zadarmo', href: 'https://app.rewora.io/sk/demo/' },
    features: [
      'Widget: Produktové recenzie',
      'Widget: Hviezdičkové hodnotenia produktov',
      'Widget: Hotspoty (PDF a web)',
      '1 doména',
    ],
  },
  {
    name: 'Štandardný',
    priceMonthly: '29 €',
    priceYearly: '290 €',
    periodMonthly: 'mesačne',
    periodYearly: 'ročne',
    cta: { label: 'Vyskúšať teraz', href: 'https://app.rewora.io/sk/demo/' },
    features: [
      'Widget: Recenzie na firmu a produkty',
      'Widget: Štatistika nákupov (BI dáta)',
      'Widget: Fórum a Produktová poradňa',
      'Widget: Hotspoty (PDF a Web)',
      'Widget: Hviezdičky na produkt',
      'Zobrazenie recenzií z viacerých zdrojov (napr. Heureka)',
    ],
  },
  {
    name: 'Profesionálny',
    priceMonthly: '149 €',
    priceYearly: '1490 €',
    periodMonthly: 'mesačne',
    periodYearly: 'ročne',
    cta: { label: 'Vyskúšať teraz', href: 'https://app.rewora.io/sk/demo/' },
    featured: true,
    intro: 'Všetko čo obsahuje balík Štandardný',
    features: [
      '2 000 pozvánok na recenzie mesačne',
      'Automatické zaradenie produktov do Google Shopping',
      'Automatické preklady recenzií, fóra a produktovej poradne do 31 jazykov',
      'Prístup k Rewora API',
    ],
  },
  {
    name: 'Podnikový',
    priceMonthly: 'Individuálne',
    priceYearly: 'Individuálne',
    periodMonthly: '',
    periodYearly: '',
    cta: { label: 'Rezervovať ukážku', href: 'https://app.rewora.io/sk/demo/' },
    intro: 'Všetko čo obsahuje balík Profesionálny',
    features: ['Viac než 2 000 pozvánok na recenzie mesačne'],
  },
];

export const pricingNote =
  'Bez rizika – ak nebudete spokojní, do 30 dní od zakúpenia vám vrátime peniaze.';
