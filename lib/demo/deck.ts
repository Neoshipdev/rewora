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
        (() => {
          /* rozloženie kopíruje widget Rewory na e-shope: priemer, rozpad
             hodnotení a výzva na napísanie recenzie — všetko vo farbe e-shopu */
          const rozpad = [
            { hviezd: 5, pocet: 30 },
            { hviezd: 4, pocet: 5 },
            { hviezd: 3, pocet: 1 },
            { hviezd: 2, pocet: 1 },
            { hviezd: 1, pocet: 0 },
          ];
          const spolu = rozpad.reduce((sucet, r) => sucet + r.pocet, 0);
          const riadky = rozpad
            .map(
              (r) => `
            <div class="rat__row">
              <span class="rat__num">${r.hviezd}</span>
              <span class="rat__track"><span class="rat__fill" style="width:${Math.round(
                (r.pocet / spolu) * 100
              )}%;background:${accent}"></span></span>
              <span class="rat__count">${r.pocet} x</span>
            </div>`
            )
            .join('');
          return `<div class="widget">
            <span class="widget__title">Recenzie a hodnotenia</span>
            <div class="rat">
              <div class="rat__summary">
                <b class="rat__avg">4,8</b>
                <span class="rat__meta">${stars(5, accent)}<small>${spolu} recenzií</small></span>
              </div>
              <div class="rat__bars">${riadky}</div>
            </div>
            <div class="rat__cta">
              <b>Páči sa Vám náš produkt?</b>
              <p>Podeľte sa o svoju skúsenosť s produktom a pomôžte ostatným pri rozhodovaní.</p>
              <span class="rat__btn" style="background:${accent}">＋ Napísať recenziu</span>
            </div>
            ${reviewRows}
          </div>`;
        })(),
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
        (() => {
          /* tabuľka otázok ako vo widgete Rewory: téma, počet odpovedí, aktivita */
          const otazky = [
            { tema: qa.topic, text: qa.question },
            { tema: 'Skúsenosti s produktom', text: `Používa niekto ${productName.slice(0, 40)} dlhšie? Zaujíma ma, ako sa osvedčil.` },
            { tema: 'Doprava a dostupnosť', text: 'Dobrý deň, do kedy treba objednať, aby zásielka prišla do konca týždňa? Ďakujem.' },
          ];
          const riadky = otazky
            .map(
              (o, i) => `
            <div class="qat__row">
              <span class="qat__cell">
                <b>${escape(o.tema)}</b>
                <small>${escape(o.text.slice(0, 96))}</small>
                <em>od <b>Overený zákazník</b></em>
              </span>
              <span class="qat__answers" style="color:${accent}">✓ 1</span>
              <span class="qat__date">${i === 0 ? 'dnes' : i === 1 ? 'včera' : 'pred 3 dňami'}</span>
            </div>`
            )
            .join('');
          return `<div class="widget">
            <div class="widget__head">
              <span class="widget__title">Otázky a odpovede k produktu</span>
              <span class="widget__cta" style="background:${accent}">＋ Položiť otázku</span>
            </div>
            <div class="qat">
              <div class="qat__head"><span>Téma</span><span>Odpovede</span><span>Aktivita</span></div>
              ${riadky}
            </div>
            <div class="qa">
              <div class="qa__a">${escape(qa.answer)}</div>
              <div class="qa__meta">Odpovedal <b style="color:${accent}">odborník e-shopu</b> · 2 dni</div>
            </div>
          </div>`;
        })(),
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
      body: (() => {
        /* výpis skladáme z produktov e-shopu — sortiment tak sedí zákazníkovi */
        /* ceny z rôznych webov prídu v rôznom tvare, zjednotíme ich */
        const suma = (hodnota?: string) =>
          (hodnota ?? price).replace(/(\d)[.](\d{2})/, '$1,$2').replace(/(\d)\s*€/, '$1 €');
        const polozky = (capture.items.length ? capture.items : [{ name: productName, price }]).slice(0, 8);
        const dotaz = (polozky[0]?.name ?? productName).split(' ').slice(0, 4).join(' ').toLowerCase();
        const karty = polozky
          .map((item, i) => {
            /* hviezdičky nesie časť ponúk — presne ako to vyzerá vo výpise */
            const hodnotenie = i % 3 === 0
              ? `<span class="g__stars">${stars(5, '#F9AB00')} <small>(${12 + i * 7})</small></span>`
              : `<span class="g__ship">+ dopravné ${(1.9 + i * 0.4).toFixed(2).replace('.', ',')} €</span>`;
            return `
            <div class="g__card">
              ${item.image ? `<img src="${item.image}" alt="">` : '<div class="g__ph"></div>'}
              <span class="g__name">${escape(item.name)}</span>
              <span class="g__price">${escape(suma(item.price))}</span>
              <span class="g__shop">${escape(capture.domain)}</span>
              ${hodnotenie}
              <span class="g__src">Z webu ${escape(capture.domain)}</span>
            </div>`;
          })
          .join('');
        return `<div class="gshop">
          <div class="g">
            <div class="g__bar">
              <span class="g__logo"><b style="color:#4285F4">G</b><b style="color:#EA4335">o</b><b style="color:#FBBC05">o</b><b style="color:#4285F4">g</b><b style="color:#34A853">l</b><b style="color:#EA4335">e</b></span>
              <span class="g__input">${escape(dotaz)}</span>
            </div>
            <div class="g__tabs"><span>Všetko</span><span>Obrázky</span><span>Videá</span><span class="g__tab--on">Výrobky</span><span>Krátke videá</span><span>Viac</span></div>
            <div class="g__label">Sponzorované Produkty ⋮</div>
            <div class="g__row">${karty}</div>
          </div>
          <div class="gshop__note">
            <b>Takto by vyzeral výpis vašich produktov</b>
            <p>Karta s hviezdičkami a počtom hodnotení vyčnieva medzi ponukami bez nich.
            Recenzie zozbierané Reworou posielame do Google Merchant Center automaticky,
            takže hodnotenie sa zobrazí aj pri produktoch e-shopu ${escape(capture.domain)}.</p>
          </div>
        </div>`;
      })(),
      note: 'Automatické zaradenie produktov do Google Shopping je súčasťou balíka Profesionálny.',
    }),
    `<section class="slide slide--cta">
      ${logoImg('light', 24)}
      <h2>Chcete to nasadiť na ${escape(capture.domain)}?</h2>
      <p>Integrácia cez Google Tag Manager, na mieru alebo Shopify plugin — nasadenie zvládneme za pár dní.
      Bezplatný balík je k dispozícii navždy.</p>
      <div class="cta__row">
        <span class="cta__btn">rewora.com/sk/cennik</span>
        <span class="cta__mail">info@rewora.com</span>
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
  .qat { border:1px solid #EFEAE4; border-radius:6px; overflow:hidden; }
  .qat__head, .qat__row { display:grid; grid-template-columns:1fr 70px 80px; gap:10px; padding:8px 12px; align-items:center; }
  .qat__head { background:#F7F4F0; font-size:10px; color:#8A9099; text-transform:none; }
  .qat__row { border-top:1px solid #EFEAE4; }
  .qat__cell { display:flex; flex-direction:column; gap:2px; }
  .qat__cell b { font-size:12px; color:#202124; }
  .qat__cell small { font-size:10px; color:#5F6368; }
  .qat__cell em { font-size:9px; color:#8A9099; font-style:normal; }
  .qat__answers { font-size:11px; font-weight:600; }
  .qat__date { font-size:10px; color:#8A9099; }
  .rat { display:flex; gap:22px; align-items:center; }
  .rat__summary { display:flex; align-items:center; gap:10px; }
  .rat__avg { font-family:'Space Grotesk',sans-serif; font-size:34px; font-weight:700; line-height:1; }
  .rat__meta { display:flex; flex-direction:column; gap:2px; }
  .rat__meta small { color:#8A9099; font-size:11px; }
  .rat__bars { flex:1; display:flex; flex-direction:column; gap:4px; }
  .rat__row { display:flex; align-items:center; gap:8px; font-size:10px; color:#5F6368; }
  .rat__num { width:8px; font-weight:700; color:#202124; }
  .rat__track { flex:1; height:5px; border-radius:3px; background:#EEE9E3; overflow:hidden; }
  .rat__fill { display:block; height:100%; border-radius:3px; }
  .rat__count { width:32px; text-align:right; }
  .rat__cta { border-top:1px solid #EFEAE4; padding-top:10px; display:flex; flex-direction:column; gap:4px; }
  .rat__cta b { font-size:13px; }
  .rat__cta p { font-size:11px; color:#5F6368; }
  .rat__btn { margin-top:4px; border-radius:6px; color:#fff; font-size:12px; font-weight:600;
    padding:9px 14px; text-align:center; }
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
  /* výpis v Google Shopping — vizuál kopíruje záložku Výrobky */
  .g { border:1px solid #E7E2DC; border-radius:10px; padding:14px 16px 16px; background:#fff;
    font-family:Arial,'Helvetica Neue',sans-serif; }
  .g__bar { display:flex; align-items:center; gap:16px; }
  .g__logo { font-family:Arial,sans-serif; font-size:22px; font-weight:700; letter-spacing:-0.5px; }
  .g__input { flex:1; border:1px solid #DFE1E5; border-radius:999px; padding:7px 16px; font-size:13px; color:#202124; }
  .g__tabs { display:flex; gap:20px; margin:10px 0 0 62px; font-size:12px; color:#5F6368; }
  .g__tab--on { color:#1A73E8; border-bottom:2px solid #1A73E8; padding-bottom:3px; }
  .g__label { margin:12px 0 8px; font-size:14px; color:#202124; }
  .g__row { display:flex; gap:8px; overflow:hidden; }
  .g__card { flex:0 0 128px; border:1px solid #E8EAED; border-radius:8px; padding:8px;
    display:flex; flex-direction:column; gap:3px; }
  .g__card img { width:100%; height:92px; object-fit:contain; }
  .g__ph { width:100%; height:92px; background:repeating-linear-gradient(135deg,#F3EFEA 0 10px,#EDE8E2 10px 20px); }
  .g__name { font-size:11px; line-height:1.25; color:#1A0DAB; height:28px; overflow:hidden; }
  .g__price { font-size:12px; font-weight:700; color:#202124; }
  .g__shop, .g__ship, .g__src { font-size:10px; color:#5F6368; }
  .g__src { color:#1A0DAB; }
  .g__stars { font-size:10px; color:#5F6368; display:flex; align-items:center; gap:4px; }
  .g__stars svg { width:52px; }
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
