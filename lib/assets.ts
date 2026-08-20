/**
 * Obrázky stiahnuté z rewora.com skriptom scripts/fetch-assets.mjs.
 * Cesty smerujú do public/images/.
 */

const M = '/images/media';
const S = '/images/static';

/** Logá klientov v páse „Značky, ktoré nám dôverujú“. */
export const clientLogos = [
  /* zvislá značka — v rovnako vysokom boxe by pôsobila menšia než nápisy */
  { name: 'Panta Rhei', src: `${S}/logo-pantarhei.png`, tall: true },
  { name: 'eTabletka', src: `${S}/logo-etabletka.496670ca5ac0.png` },
  { name: 'FixServis', src: `${S}/logo-fixservis.0d2f81e253f7.png` },
  { name: 'Origos', src: `${S}/logo-origos.eac328ebe908.png` },
  { name: 'Najlekáreň', src: `${S}/logo-najlekaren.dfcf93699d59.png` },
  { name: 'Drinkcentrum', src: `${S}/logo-drinkcentrum.463e914add1e.png` },
];

/**
 * Reálne screenshoty widgetov z rewora.com — na domovskej stránke sa
 * momentálne nepoužívajú, sú tu pripravené na prípadné ďalšie sekcie.
 */
export const widgetShots = [
  {
    src: `${M}/image-reviews-ratings-sk.format-avif.width-684.avif`,
    srcLarge: `${M}/image-reviews-ratings-sk.format-avif.width-1400.avif`,
    alt: 'Recenzie a hodnotenia na karte produktu',
    caption: 'Recenzie a hodnotenia',
  },
  {
    src: `${M}/image-ask-question-sk.format-avif.width-684.avif`,
    srcLarge: `${M}/image-ask-question-sk.format-avif.width-1400.avif`,
    alt: 'Otázky ku produktom a diskusné fórum',
    caption: 'Poradňa a fórum',
  },
  {
    src: `${M}/image-hotspot-sk.format-avif.width-684.avif`,
    srcLarge: `${M}/image-hotspot-sk.format-avif.width-1400.avif`,
    alt: 'Hotspoty — interaktívne obrázky',
    caption: 'Hotspots',
  },
  {
    src: `${M}/image-business-intelligence-sk.format-avif.width-684.avif`,
    srcLarge: `${M}/image-business-intelligence-sk.format-avif.width-1400.avif`,
    alt: 'Business Intelligence — štatistiky a základné informácie o produkte',
    caption: 'BI dáta',
  },
];

/** Reálny vizuál pod hotspot bodmi (nahrádza pruhovaný placeholder z dizajnu). */
export const hotspotVisual = `${M}/hotspot-vizual.png`;

/** Screenshoty administrátorského panelu. */
export const adminShots = {
  reviews: {
    src: `${M}/admin-reviews.format-avif.width-640.avif`,
    alt: 'Moderovanie recenzií v administrácii Rewora',
  },
  manage: {
    src: `${M}/admin-manage.format-avif.width-640.avif`,
    alt: 'Správa žiadostí o recenziu v administrácii Rewora',
  },
};

/** Screenshoty k spôsobom integrácie. */
export const integrationShots: Record<string, { src: string; alt: string }> = {
  'Google Tag Manager': {
    src: `${M}/screenshot-gtm.e325b59f.format-avif.width-1240.avif`,
    alt: 'Nasadenie Rewora cez Google Tag Manager',
  },
  'Integrácia na mieru': {
    src: `${M}/screenshot-code.f0160f47.format-avif.width-1240.avif`,
    alt: 'Integrácia Rewora na mieru cez kód',
  },
  'Shopify Plugin': {
    src: `${M}/screenshot-plugin.format-avif.width-1240.avif`,
    alt: 'Rewora plugin pre Shopify',
  },
};

/** Prípadové štúdie — logo klienta a titulný obrázok. */
export const caseAssets: Record<string, { logo: string; cover: string; alt: string }> = {
  fixservis: {
    logo: `${M}/01-logo-fixservis.max-200x60.svg`,
    cover: `${M}/fixservis_en.2e16d0ba.fill-800x500.png`,
    alt: 'FixServis — prípadová štúdia',
  },
  drinkcentrum: {
    logo: `${M}/03-logo-drinkcentrum.max-200x60.png`,
    cover: `${M}/drinkcentrum_en.2e16d0ba.fill-800x500.png`,
    alt: 'Drinkcentrum — prípadová štúdia',
  },
  kilpi: {
    logo: `${M}/kilpi-logo_whitepng.max-200x60.png`,
    cover: `${M}/kilpi_en.2e16d0ba.fill-800x500.png`,
    alt: 'kilpi.cz — prípadová štúdia',
  },
};

export const ogImage = `${S}/rewora-og-image.fc95944d3928.jpg`;
