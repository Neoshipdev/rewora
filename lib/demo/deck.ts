/**
 * Zloženie ukážky do PDF.
 * Zo snímok e-shopu poskladá 7 strán (16:9) s Rewora widgetmi prefarbenými
 * podľa dizajnovej farby webu a vytlačí ich cez Playwright do PDF.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import type { Capture, Strip } from './capture';
import { biMetrics, categorize, qaByCategory, reviewsFor } from './content';

const SLIDE = { width: 1280, height: 720 };

/** Logo vkladáme priamo do HTML — deck sa renderuje bez base URL. */
const logoDataUri = (variant: 'brand' | 'light') => {
  const file = variant === 'light' ? 'logo-rewora-white.svg' : 'logo-rewora.svg';
  const svg = readFileSync(join(process.cwd(), 'public', 'images', file), 'utf8');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

const logoImg = (variant: 'brand' | 'light', height: number) =>
  `<img class="logo" style="height:${height}px" src="${logoDataUri(variant)}" alt="Rewora">`;

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stars = (count = 5, color = 'currentColor') =>
  `<span style="color:${color};letter-spacing:1px">${'★'.repeat(count)}${
    count < 5 ? `<span style="color:#E2DDD6">${'★'.repeat(5 - count)}</span>` : ''
  }</span>`;

/** Snímka stránky v okne prehliadača, orezaná na hornú časť. */
const browserFrame = (src: string, height: number, domain: string) => `
  <div class="frame" style="height:${height}px">
    <div class="frame__bar">
      <span></span><span></span><span></span>
      <div class="frame__url">${escape(domain)}</div>
    </div>
    <div class="frame__shot"><img src="${src}" alt=""></div>
  </div>`;

/** Reálny výpis Google Shopping s hviezdičkami — snímka obrazovky, nie mock. */
const googleShopping = (() => {
  try {
    const bin = readFileSync(join(process.cwd(), 'public', 'images', 'Google_shopping.png'));
    return `data:image/png;base64,${bin.toString('base64')}`;
  } catch {
    return undefined;
  }
})();

/** Šírka obsahu snímky prezentácie — podľa nej škálujeme snímky e-shopu. */
const CONTENT = SLIDE.width - 96;

/**
 * Widget vykreslíme priamo do stránky: nad ním kus webu končiaci v mieste,
 * kam widget patrí, pod ním pokračovanie tej istej stránky.
 */
const vlozene = (
  strip: Strip | undefined,
  nahrada: string,
  widget: string,
  domain: string,
  nad = 150,
  pod = 110
) => {
  if (!strip) return `${browserFrame(nahrada, 250, domain)}${widget}`;
  const mierka = CONTENT / strip.width;
  const kotva = Math.round(strip.anchor * mierka);
  const sirka = Math.round(strip.width * mierka);
  const cast = (posun: number, vyska: number) => `
    <div class="cut" style="height:${vyska}px">
      <img src="${strip.image}" style="width:${sirka}px;margin-top:${-posun}px" alt="">
    </div>`;
  return `
    <div class="frame frame--flow">
      <div class="frame__bar"><span></span><span></span><span></span>
        <div class="frame__url">${escape(domain)}</div></div>
      ${cast(Math.max(0, kotva - nad), Math.min(nad, kotva))}
      <div class="inject">${widget}</div>
      ${cast(kotva, pod)}
    </div>`;
};

export function buildDeckHtml(capture: Capture): string {
  const category = categorize(capture.productName ?? '', capture.url, capture.pageText);
  const qa = qaByCategory[category];
  const reviews = reviewsFor(category);
  const accent = capture.accent || '#FF570D';
  const productName = capture.productName || 'Váš produkt';
  const price = capture.productPrice || '24,90 €';
  const today = new Date().toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' });

  const reviewRows = reviews
    .map(
      (review) => `
      <div class="review">
        <div class="review__avatar">${escape(review.initials)}</div>
        <div class="review__body">
          <div class="review__head">
            <b>${escape(review.name)}</b>
            ${review.badge ? `<span class="badge">${escape(review.badge)}</span>` : ''}
            <span class="review__date">${escape(review.date)}</span>
          </div>
          ${stars(review.stars, accent)}
          ${review.title ? `<div class="review__title">${escape(review.title)}</div>` : ''}
          <div class="review__text">${escape(review.text)}</div>
        </div>
      </div>`
    )
    .join('');

  const biStrip = `
    <div class="bi">
      ${biMetrics
        .map(
          (metric) => `
        <div class="bi__item">
          <span class="bi__icon">${metric.icon}</span>
          <span><b>${escape(metric.value)}</b><small>${escape(metric.label)}</small></span>
        </div>`
        )
        .join('')}
    </div>`;

  const hotspotBubble = `
    <div class="bubble">
      <div class="bubble__row">
        <b>${escape(productName.slice(0, 28))}</b>
        <span class="bubble__off">20 % OFF</span>
      </div>
      ${stars(5, accent)}
      <div class="bubble__row">
        <span class="bubble__price">${escape(price)}</span>
        <span class="bubble__go">→</span>
      </div>
    </div>`;

  const slide = (options: {
    num: string;
    title: string;
    lead: string;
    body: string;
    note?: string;
  }) => `
    <section class="slide">
      <header class="slide__head">
        ${logoImg('brand', 22)}
        <span class="slide__client">${escape(capture.domain)}</span>
      </header>
      <div class="slide__title">
        <span class="slide__num">${options.num}</span>
        <div>
          <h2>${escape(options.title)}</h2>
          <p>${escape(options.lead)}</p>
        </div>
      </div>
      <div class="slide__body">${options.body}</div>
      ${options.note ? `<footer class="slide__note">${escape(options.note)}</footer>` : ''}
    </section>`;

  const cover = `
    <section class="slide slide--cover">
      <div class="cover__top">
        ${logoImg('light', 24)}
        <span class="cover__date">${escape(today)}</span>
      </div>
      <div class="cover__main">
        <span class="cover__eyebrow">Ukážka Rewory na vašom e-shope</span>
        <h1>${escape(capture.domain)}</h1>
        <p>Recenzie, poradňa, hotspoty a BI dáta — takto by vyzerali priamo na vašom webe.
        Widgety sú prefarbené podľa dizajnovej farby vášho e-shopu.</p>
        ${capture.logo ? `<img class="cover__logo" src="${capture.logo}" alt="">` : ''}
      </div>
      <div class="cover__foot">
        <span>Vytvorené automaticky nástrojom rewora</span>
        <span>rewora.com</span>
      </div>
    </section>`;

  const hotspotDots = `
    <span class="dot" style="left:24%;top:34%"></span>
    <span class="dot" style="left:68%;top:56%"></span>`;

  const slides = [
    cover,
    slide({
      num: '01',
      title: 'Hotspots na hlavnom banneri',
      lead: 'Zákazník nakupuje priamo z obrázka — bez hľadania v katalógu.',
      body: `<div class="stage">${browserFrame(capture.homepage, 430, capture.domain)}
        <div class="overlay">${hotspotDots}<div class="bubble-wrap">${hotspotBubble}</div></div></div>`,
      note: 'Hotspoty fungujú aj v lookbookoch a PDF katalógoch.',
    }),
    slide({
      num: '02',
      title: 'BI dáta na karte produktu',
      lead: 'Predajnosť, reklamovanosť a vratkovosť presvedčia aj váhajúceho zákazníka.',
      body: vlozene(capture.stripPhoto, capture.product ?? capture.homepage, biStrip, capture.domain, 215, 95),
      note: 'Dáta si vyberáte vy — zobrazíme len tie, ktoré dávajú zmysel vášmu segmentu.',
    }),
    slide({
      num: '03',
      title: 'Recenzie na homepage',
      lead: 'Sociálny dôkaz hneď pri vstupe na web.',
      body: vlozene(
        capture.stripHero,
        capture.homepage,
        `<div class="carousel">
          ${reviews
            .map(
              (review) => `
            <div class="carousel__card">
              ${stars(review.stars, accent)}
              <p>${escape(review.text)}</p>
              <span>${escape(review.name)} · ${escape(review.date)}</span>
            </div>`
            )
            .join('')}
        </div>`,
        capture.domain,
        150,
        110
      ),
      note: 'Priemerné hodnotenie e-shopu sa dá zobraziť aj v pätičke a v Google Shopping.',
    }),
    slide({
      num: '04',
      title: 'Recenzie pri produkte',
      lead: 'Hodnotenia priamo pod produktom — tam, kde sa zákazník rozhoduje.',
      body: vlozene(
        capture.stripDesc,
        capture.product ?? capture.homepage,
        `<div class="widget">
          <div class="widget__head">
            <div>
              <span class="widget__title">Recenzie a hodnotenia</span>
              <div class="widget__score"><b style="color:${accent}">4,8</b> ${stars(5, accent)}
              <small>na základe 37 recenzií</small></div>
            </div>
            <span class="widget__cta" style="background:${accent}">Napísať recenziu</span>
          </div>
          ${reviewRows}
        </div>`,
        capture.domain,
        140,
        100
      ),
      note: `Produkt: ${capture.productName ?? capture.domain}`,
    }),
    slide({
      num: '05',
      title: 'Poradňa a fórum pri produkte',
      lead: `Zákazníci sa pýtajú na to, čo ich brzdí — napríklad „${qa.topic.toLowerCase()}“.`,
      body: vlozene(
        capture.stripDesc,
        capture.product ?? capture.homepage,
        `<div class="widget">
          <div class="widget__head">
            <span class="widget__title">Otázky a odpovede k produktu</span>
            <span class="widget__cta" style="background:${accent}">＋ Položiť otázku</span>
          </div>
          <div class="qa">
            <div class="qa__topic">${escape(qa.topic)}</div>
            <div class="qa__q">${escape(qa.question)}</div>
            <div class="qa__a">${escape(qa.answer)}</div>
            <div class="qa__meta">Odpovedal <b style="color:${accent}">odborník e-shopu</b> · 2 dni</div>
          </div>
        </div>`,
        capture.domain,
        140,
        100
      ),
      note: 'Odpoviete raz, odpoveď sa zobrazuje všetkým ďalším zákazníkom.',
    }),
    slide({
      num: '06',
      title: 'Hviezdičky v Google Shopping',
      lead: 'Produktové hodnotenia sa prenášajú do Google Shopping a zvyšujú preklikovosť.',
      body: `<div class="gshop">
          ${
            googleShopping
              ? `<img class="gshop__shot" src="${googleShopping}" alt="Výpis Google Shopping s hviezdičkami pri produkte">`
              : ''
          }
          <div class="gshop__note">
            <b>Takto vyzerá výpis v Google Shopping</b>
            <p>Karta s hviezdičkami a počtom hodnotení vyčnieva medzi ponukami bez nich.
            Recenzie zozbierané Reworou posielame do Google Merchant Center automaticky, takže
            rovnaké hodnotenie sa zobrazí aj pri produktoch e-shopu ${escape(capture.domain)}.</p>
          </div>
        </div>`,
      note: 'Automatické zaradenie produktov do Google Shopping je súčasťou balíka Profesionálny.',
    }),
    `<section class="slide slide--cta">
      ${logoImg('light', 24)}
      <h2>Chcete to nasadiť na ${escape(capture.domain)}?</h2>
      <p>Integrácia cez Google Tag Manager, na mieru alebo Shopify plugin — nasadenie zvládneme za pár dní.
      Bezplatný balík je k dispozícii navždy.</p>
      <div class="cta__row">
        <span class="cta__btn">rewora.com/sk/cennik</span>
        <span class="cta__mail">info@rewora.io</span>
      </div>
    </section>`,
  ];

  return `<!doctype html>
<html lang="sk"><head><meta charset="utf-8">
<style>
  @page { size: ${SLIDE.width}px ${SLIDE.height}px; margin: 0; }
  * { box-sizing: border-box; }
  body { margin:0; font-family:'DM Sans','Segoe UI',Arial,sans-serif; color:#101828; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .slide { position:relative; width:${SLIDE.width}px; height:${SLIDE.height}px; padding:40px 48px; background:#fff;
           page-break-after:always; overflow:hidden; display:flex; flex-direction:column; }
  .slide:last-child { page-break-after:auto; }
  .logo { display:block; width:auto; }
  .slide__head { display:flex; justify-content:space-between; align-items:center; }
  .slide__client { font-size:13px; color:#8A9099; }
  .slide__title { display:flex; gap:18px; margin:22px 0 18px; }
  .slide__num { font-family:'Space Grotesk',sans-serif; font-size:20px; font-weight:700; color:${accent}; }
  .slide__title h2 { margin:0; font-family:'Space Grotesk',sans-serif; font-size:30px; letter-spacing:-.03em; }
  .slide__title p { margin:6px 0 0; font-size:15px; color:#5A6270; }
  .slide__body { flex:1; display:flex; flex-direction:column; gap:14px; min-height:0; }
  .slide__note { margin-top:12px; font-size:12px; color:#8A9099; border-top:1px solid #EFEAE4; padding-top:10px; }

  .frame { border:1px solid #E7E2DC; border-radius:10px; overflow:hidden; background:#fff; display:flex; flex-direction:column; }
  .frame__bar { display:flex; align-items:center; gap:6px; padding:8px 12px; border-bottom:1px solid #EFEAE4; background:#FCFAF8; }
  .frame__bar span { width:8px; height:8px; border-radius:50%; background:#E2DDD6; }
  .frame__url { margin-left:12px; font-size:11px; color:#8A9099; }
  .frame__shot { flex:1; overflow:hidden; }
  /* widget vložený priamo do toku stránky e-shopu */
  .frame--flow .cut { overflow:hidden; }
  .frame--flow .cut img { display:block; }
  .inject { padding:12px 14px; background:#fff; border-top:1px solid #EFEAE4; border-bottom:1px solid #EFEAE4; }
  .frame__shot img { width:100%; display:block; }

  .stage { position:relative; }
  .overlay { position:absolute; inset:32px 0 0 0; }
  .dot { position:absolute; width:18px; height:18px; border-radius:50%; background:${accent};
         box-shadow:0 0 0 6px ${accent}38; }
  .bubble-wrap { position:absolute; left:30%; top:44%; }
  .bubble { width:210px; background:#fff; border-radius:8px; box-shadow:0 12px 28px rgba(16,24,40,.18); padding:12px;
            display:flex; flex-direction:column; gap:6px; }
  .bubble__row { display:flex; align-items:center; justify-content:space-between; gap:8px; }
  .bubble__row b { font-size:12px; }
  .bubble__off { border-radius:4px; padding:2px 7px; background:${accent}1F; color:${accent}; font-size:10px; font-weight:700; }
  .bubble__price { font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:600; }
  .bubble__go { width:24px; height:24px; border-radius:50%; background:${accent}; color:#fff;
                display:inline-flex; align-items:center; justify-content:center; font-size:12px; }

  .bi { border-radius:8px; display:grid; grid-template-columns:repeat(4,1fr); gap:12px; padding:16px; border:1px solid #EFEAE4; background:#fff; }
  .bi__item { display:flex; align-items:center; gap:10px; }
  .bi__icon { width:34px; height:34px; border-radius:50%; background:${accent}1A; display:inline-flex;
              align-items:center; justify-content:center; font-size:15px; }
  .bi__item b { display:block; font-family:'Space Grotesk',sans-serif; font-size:15px; }
  .bi__item small { display:block; font-size:11px; color:#8A9099; }

  .carousel { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  .carousel__card { border:1px solid #EFEAE4; border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:6px; }
  .carousel__card p { margin:0; font-size:12px; line-height:1.5; }
  .carousel__card span { font-size:11px; color:#8A9099; }

  .widget { border:1px solid #EFEAE4; border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:10px; }
  .widget__head { display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .widget__title { font-family:'Space Grotesk',sans-serif; font-size:15px; font-weight:600; }
  .widget__score { display:flex; align-items:center; gap:8px; font-size:12px; margin-top:4px; }
  .widget__score b { font-family:'Space Grotesk',sans-serif; font-size:20px; }
  .widget__score small { color:#8A9099; }
  .widget__cta { border-radius:6px; color:#fff; font-size:11px; font-weight:600; padding:7px 12px; white-space:nowrap; }
  .review { display:flex; gap:10px; padding:8px 0; border-top:1px solid #EFEAE4; }
  .review__avatar { width:28px; height:28px; border-radius:50%; background:#EFEAE4; color:#767E8B;
                    font-size:10px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; flex:none; }
  .review__body { display:flex; flex-direction:column; gap:3px; }
  .review__head { display:flex; align-items:center; gap:8px; font-size:11px; }
  .review__date { color:#8A9099; }
  .badge { border-radius:4px; background:${accent}1A; color:${accent}; font-size:9px; font-weight:700; padding:2px 6px; }
  .review__title { font-size:12px; font-weight:700; }
  .review__text { font-size:12px; color:#5A6270; line-height:1.45; }

  .qa { border-top:1px solid #EFEAE4; padding-top:10px; display:flex; flex-direction:column; gap:6px; }
  .qa__topic { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:${accent}; }
  .qa__q { font-size:13px; font-weight:700; }
  .qa__a { font-size:12px; color:#5A6270; line-height:1.5; }
  .qa__meta { font-size:11px; color:#8A9099; }

  .gshop { display:flex; flex-direction:column; gap:14px; }
  /* reálna snímka z Google Shopping — orezaná na pás s kartami produktov */
  /* snímku nechávame celú — orez by odrezal práve hviezdičky */
  .gshop__shot { width:100%; max-height:360px; object-fit:contain; object-position:center top;
    border:1px solid #E7E2DC; border-radius:10px; display:block; background:#fff; }
  .gshop__card { border:1px solid #E7E2DC; border-radius:10px; padding:16px; display:flex; gap:16px; }
  .gshop__card img { width:180px; height:180px; object-fit:contain; }
  .gshop__ph { width:180px; height:180px; background:repeating-linear-gradient(135deg,#F3EFEA 0 10px,#EDE8E2 10px 20px); }
  .gshop__info { display:flex; flex-direction:column; gap:6px; }
  .gshop__info b { font-size:15px; }
  .gshop__price { font-family:'Space Grotesk',sans-serif; font-size:20px; font-weight:700; }
  .gshop__shop { font-size:12px; color:#8A9099; }
  .gshop__stars { font-size:13px; }
  .gshop__stars small { color:#8A9099; font-size:11px; }
  .gshop__note { background:#F6F3F0; border-radius:10px; padding:16px; }
  .gshop__note b { font-family:'Space Grotesk',sans-serif; font-size:15px; }
  .gshop__note p { margin:8px 0 0; font-size:13px; line-height:1.6; color:#5A6270; }

  .slide--cover { background:${accent}; color:#fff; justify-content:space-between; }
  .cover__top { display:flex; justify-content:space-between; align-items:center; }
  .cover__date { font-size:13px; opacity:.85; }
  .cover__main h1 { margin:12px 0 0; font-family:'Space Grotesk',sans-serif; font-size:64px; letter-spacing:-.04em; }
  .cover__main p { max-width:640px; font-size:17px; line-height:1.6; opacity:.92; }
  .cover__eyebrow { font-size:13px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; opacity:.85; }
  .cover__logo { border-radius:8px; max-height:56px; max-width:280px; margin-top:24px; background:#fff; padding:10px 14px; }
  .cover__foot { display:flex; justify-content:space-between; font-size:12px; opacity:.85; }

  .slide--cta { background:#101828; color:#fff; justify-content:center; gap:14px; }
  .slide--cta h2 { margin:18px 0 0; font-family:'Space Grotesk',sans-serif; font-size:44px; letter-spacing:-.03em; }
  .slide--cta p { max-width:720px; font-size:17px; line-height:1.6; color:#C3C9D4; }
  .cta__row { display:flex; gap:16px; align-items:center; margin-top:12px; }
  .cta__btn { border-radius:6px; background:${accent}; color:#fff; font-weight:600; padding:14px 24px; }
  .cta__mail { color:#C3C9D4; font-size:15px; }
</style></head>
<body>${slides.join('')}</body></html>`;
}

export async function renderPdf(html: string): Promise<Buffer> {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: SLIDE });
    await page.setContent(html, { waitUntil: 'networkidle' });
    return await page.pdf({
      width: `${SLIDE.width}px`,
      height: `${SLIDE.height}px`,
      printBackground: true,
      pageRanges: '1-8',
    });
  } finally {
    await browser.close().catch(() => {});
  }
}
