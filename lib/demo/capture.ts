/**
 * Snímanie e-shopu pre ukážku widgetov.
 * Port logiky z Rewora Presentation Agent (capture.py) do Playwrightu pre Node:
 * odklikanie cookie líšt a vekových brán, nájdenie produktovej podstránky,
 * detekcia dizajnovej farby, loga a hero bannera.
 */
import { chromium, type Browser, type Page } from 'playwright';

/** Výsek stránky s miestom, kam widget patrí (`anchor` = odsadenie v snímke). */
export type Strip = { image: string; anchor: number; width: number };

/** Položka do ukážky výpisu v Google Shopping. */
export type ShopItem = { image?: string; name: string; price?: string };

export type Capture = {
  url: string;
  domain: string;
  homepage: string; // data URI
  product?: string; // data URI
  productUrl?: string;
  productName?: string;
  productPrice?: string;
  productImage?: string; // data URI
  logo?: string; // data URI
  accent: string; // hex
  heroBox?: { x: number; y: number; width: number; height: number };
  /* miesta, kam widgety patria — pod banner, pod fotku, pod popis produktu */
  stripHero?: Strip;
  stripPhoto?: Strip;
  stripDesc?: Strip;
  /** produkty e-shopu do ukážky Google Shopping */
  items: ShopItem[];
  pageText: string;
  warnings: string[];
};

const VIEWPORT = { width: 1440, height: 900 };
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const COOKIE_SELECTORS = [
  '#didomi-notice-agree-button',
  '#onetrust-accept-btn-handler',
  '#cookiescript_accept',
  '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  '.cmpboxbtnyes',
  '.cc-allow',
  '.cc-btn.cc-dismiss',
  "[data-cookiefirst-action='accept']",
  '.js-cookies-accept',
  '#c-p-bn',
  '.cm-btn-success',
  '#cookies-agree',
  '.cookies-accept-all',
  '.year_yes_button',
  '.age-verification-yes',
  '.age-yes',
  "[data-age-verify='yes']",
  '#AcceptAll',
];

const COOKIE_TEXTS = [
  'Mám viac ako 18',
  'Mám 18',
  'Áno, mám 18',
  'Áno, mám viac ako 18',
  'Som plnoletý',
  'Potvrdzujem',
  'Vstúpiť na stránku',
  'Súhlasím a vstúpiť',
  'Pokračovať na stránku',
  'Prijať všetky',
  'Prijať všetko',
  'Povoliť všetky',
  'Súhlasím',
  'Odsúhlasiť všetko',
  'Rozumiem',
  'Akceptovať',
  'Přijmout vše',
  'Souhlasím',
  'Accept all',
  'Allow all',
  'I agree',
  'Vstúpiť',
];

const PRODUCT_LINK_HINTS = /(produkt|product|\/p\/|detail|item|tovar|zbozi|goods)/i;
const NON_PRODUCT_HINTS =
  /(kosik|kos%C3%ADk|cart|login|prihlas|registr|kontakt|obchodne|podmienky|gdpr|blog|clanok|article|kategor|categor|about|o-nas|doprava|platba|reklamac|faq)/i;

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withScheme);
  if (!/^[\w.-]+\.[a-z]{2,}$/i.test(parsed.hostname)) throw new Error('Neplatná adresa webu.');
  return parsed.toString();
}

export const domainOf = (url: string) => new URL(url).hostname.replace(/^www\./, '');

async function dismissOverlays(page: Page) {
  await page
    .evaluate(() => {
      const w = window as unknown as Record<string, any>;
      w.Didomi?.setUserAgreeToAll?.();
      w.OneTrust?.AllowAll?.();
    })
    .catch(() => {});

  for (let pass = 0; pass < 3; pass++) {
    let clicked = false;
    for (const selector of COOKIE_SELECTORS) {
      const button = page.locator(selector).first();
      try {
        if (await button.isVisible({ timeout: 200 })) {
          await button.click({ timeout: 2000 });
          await page.waitForTimeout(600);
          clicked = true;
          break;
        }
      } catch {
        /* ďalší selektor */
      }
    }
    if (!clicked) {
      for (const text of COOKIE_TEXTS) {
        const button = page
          .locator('button, a, input[type=button], input[type=submit], [role=button]')
          .filter({ hasText: new RegExp(`^\\s*${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') })
          .first();
        try {
          if (await button.isVisible({ timeout: 120 })) {
            await button.click({ timeout: 1500 });
            await page.waitForTimeout(600);
            clicked = true;
            break;
          }
        } catch {
          /* ďalší text */
        }
      }
    }
    if (!clicked) break;
  }

  /* Vekové brány s neštandardným textom: tlačidlo vnútri prekrytia. */
  await page
    .evaluate(() => {
      const affirmative = /^(áno|ano|yes|mám|som|potvrd|vstúpi|vstupi|súhlas|suhlas|prijať|prijat|povoliť|povolit|rozumiem|accept|allow|agree|ok)\b/i;
      const overlays = Array.from(document.querySelectorAll<HTMLElement>('body *')).filter((el) => {
        const style = getComputedStyle(el);
        if (!['fixed', 'absolute'].includes(style.position) || style.display === 'none') return false;
        const rect = el.getBoundingClientRect();
        return rect.width > window.innerWidth * 0.35 && rect.height > 140 && +style.zIndex > 1;
      });
      for (const overlay of overlays) {
        const buttons = Array.from(
          overlay.querySelectorAll<HTMLElement>('button, a, [role=button], input[type=submit]')
        );
        const hit = buttons.find((b) => affirmative.test((b.innerText || (b as HTMLInputElement).value || '').trim()));
        if (hit) {
          hit.click();
          return;
        }
      }
    })
    .catch(() => {});
  await page.waitForTimeout(500);

  /* Zvyšné fixné lišty (chat, newsletter) len skryjeme. */
  await page
    .evaluate(() => {
      for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
        const style = getComputedStyle(el);
        if (style.position !== 'fixed' && style.position !== 'sticky') continue;
        const rect = el.getBoundingClientRect();
        const coversBottom = rect.bottom > window.innerHeight - 40 && rect.height > 60;
        const isModal = rect.height > window.innerHeight * 0.5 && rect.width > window.innerWidth * 0.6;
        const text = (el.innerText || '').toLowerCase();
        if ((coversBottom || isModal) && /cookie|súhlas|souhlas|consent|newsletter|zľav/.test(text)) {
          el.style.display = 'none';
        }
      }
    })
    .catch(() => {});
}

/**
 * Cloudflare a podobné medzistránky — počkáme, kým prebehne overenie.
 * Vracia true, ak stránka po čakaní stále nie je použiteľná.
 */
async function waitOutSecurityCheck(page: Page): Promise<boolean> {
  const isBlocked = () =>
    page
      .evaluate(() =>
        /prebieha bezpečnostné overenie|just a moment|checking your browser|kontrola prehliadača|attention required|overujeme, či ste|overujeme vaše pripojenie|verifying you are human/i.test(
          document.body.innerText.slice(0, 800)
        )
      )
      .catch(() => false);

  /* Cloudflare zvyčajne prepustí do pár sekúnd; dlhšie čakanie sa neoplatí. */
  for (let attempt = 0; attempt < 3; attempt++) {
    if (!(await isBlocked())) return false;
    await page.waitForTimeout(2500);
  }
  return isBlocked();
}

async function shot(page: Page): Promise<string> {
  const buffer = await page.screenshot({ type: 'jpeg', quality: 82 });
  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
}

/** Dizajnová farba webu — najsýtejšia farba použitá v hlavičke a na tlačidlách. */
async function detectAccent(page: Page): Promise<string> {
  const accent = await page
    .evaluate(() => {
      const toHsl = (r: number, g: number, b: number) => {
        const max = Math.max(r, g, b) / 255;
        const min = Math.min(r, g, b) / 255;
        const l = (max + min) / 2;
        const d = max - min;
        const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
        return { s, l };
      };
      const counts = new Map<string, number>();
      const selectors =
        'header *, nav *, [class*="header"] *, [class*="btn"], button, a[class*="button"], [class*="cart"]';
      for (const el of Array.from(document.querySelectorAll<HTMLElement>(selectors)).slice(0, 900)) {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8 || rect.top > 900) continue;
        for (const value of [style.backgroundColor, style.color, style.borderTopColor]) {
          const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(value);
          if (!m) continue;
          const [r, g, b] = [+m[1], +m[2], +m[3]];
          const alpha = m[4] === undefined ? 1 : +m[4];
          if (alpha < 0.6) continue;
          const { s, l } = toHsl(r, g, b);
          if (s < 0.45 || l < 0.2 || l > 0.85) continue;
          const key = `${r},${g},${b}`;
          const weight = style.backgroundColor === value ? rect.width * rect.height : rect.width * 8;
          counts.set(key, (counts.get(key) ?? 0) + weight);
        }
      }
      const best = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
      if (!best) return null;
      const [r, g, b] = best[0].split(',').map(Number);
      return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
    })
    .catch(() => null);

  return accent ?? '#FF570D';
}

async function captureLogo(page: Page): Promise<string | undefined> {
  const handle = await page
    .evaluateHandle(() => {
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          'header img, [class*="logo"] img, a[href="/"] img, header svg, [class*="logo"] svg'
        )
      );
      return (
        candidates.find((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 40 && rect.height > 12 && rect.top < 260;
        }) ?? null
      );
    })
    .catch(() => null);

  const element = handle?.asElement();
  if (!element) return undefined;
  try {
    const buffer = await element.screenshot({ type: 'png', omitBackground: true });
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch {
    return undefined;
  }
}

async function findHeroBox(page: Page) {
  return page
    .evaluate(() => {
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>('img, [class*="banner"], [class*="hero"], [class*="slider"] div')
      );
      let best: { x: number; y: number; width: number; height: number } | null = null;
      for (const el of candidates) {
        const rect = el.getBoundingClientRect();
        if (rect.top < 60 || rect.top > 700 || rect.width < window.innerWidth * 0.5 || rect.height < 160)
          continue;
        const area = rect.width * rect.height;
        if (!best || area > best.width * best.height) {
          best = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        }
      }
      return best;
    })
    .catch(() => null);
}

/**
 * Odfotí okno stránky okolo miesta, kam widget patrí, aby sa dal v prezentácii
 * vykresliť priamo do stránky — nie pod jej snímkou.
 */
async function stripAround(page: Page, y: number, above = 300): Promise<Strip | undefined> {
  try {
    const cielovy = Math.max(0, Math.round(y - above));
    await page.evaluate((t) => window.scrollTo(0, t), cielovy);
    await page.waitForTimeout(500); /* dotiahnu sa obrázky načítavané pri scrollovaní */
    /* Prilepená hlavička či promo pás by prekryli práve to miesto, ktoré ideme ukázať. */
    await page
      .evaluate(() => {
        for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
          const style = getComputedStyle(el);
          if (style.position !== 'fixed' && style.position !== 'sticky') continue;
          const rect = el.getBoundingClientRect();
          /* zaujímajú nás len pásy prilepené o horný okraj okna */
          if (rect.bottom < 0 || rect.top > 200 || rect.height > 500) continue;
          if (rect.width < window.innerWidth * 0.3) continue;
          el.style.visibility = 'hidden';
        }
      })
      .catch(() => {});
    const posun = await page.evaluate(() => window.scrollY);
    const buffer = await page.screenshot({ type: 'jpeg', quality: 82 });
    return {
      image: `data:image/jpeg;base64,${buffer.toString('base64')}`,
      anchor: Math.round(y - posun),
      width: VIEWPORT.width,
    };
  } catch {
    return undefined;
  }
}

/**
 * Produkty z výpisu e-shopu — meno, cena a fotografia. Používame ich vo výpise
 * Google Shopping, aby ukážka zodpovedala sortimentu konkrétneho obchodu.
 */
async function collectItems(page: Page, limit = 8): Promise<ShopItem[]> {
  /* výpisy sa načítavajú až pri scrollovaní — najprv stránku prebehneme */
  for (const y of [600, 1400, 2200]) {
    await page.evaluate((t) => window.scrollTo(0, t), y).catch(() => {});
    await page.waitForTimeout(350);
  }
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  await page.waitForTimeout(250);

  const zaklad = await page
    .evaluate((max) => {
      const cena = /\d+[\s]?[,.]\d{2}\s*€/;
      const vysledok: { name: string; price?: string; imgIndex: number }[] = [];
      const obrazky = Array.from(document.querySelectorAll('img'));
      const pouzite = new Set<string>();

      for (const [index, img] of obrazky.entries()) {
        const rect = img.getBoundingClientRect();
        if (rect.width < 90 || rect.height < 90) continue;

        /* karta produktu je najbližší predok, ktorý obsahuje cenu a je krátky */
        let karta: HTMLElement | null = img.parentElement;
        let text = '';
        for (let i = 0; i < 5 && karta; i++) {
          text = karta.innerText ?? '';
          if (cena.test(text) && text.length < 320) break;
          karta = karta.parentElement;
          text = '';
        }
        if (!karta || !text) continue;

        const odkaz = karta.querySelector('a[href]');
        /* v karte býva aj skladovosť, zľava či tlačidlo — názov je najdlhší zmysluplný riadok */
        const stitok = /^(na sklade|skladom|nie je skladom|posledn|novinka|nové|akcia|zľava|výpredaj|doprava|do košíka|kúpiť|detail|porovnať|obľúben|top|odporúčame|[-+]?\d+\s*%|\d+\s*ks)/i;
        const riadky = text
          .split(String.fromCharCode(10))
          .map((r) => r.trim())
          .filter((r) => r.length > 8 && r.length < 90 && !cena.test(r) && !stitok.test(r));
        riadky.sort((a, b) => b.length - a.length);
        const nazov = riadky[0] ?? (odkaz?.textContent ?? '').trim();
        if (!nazov || nazov.length < 8 || nazov.length > 90) continue;
        if (pouzite.has(nazov)) continue;
        pouzite.add(nazov);

        vysledok.push({ name: nazov, price: text.match(cena)?.[0]?.replace(/\s+/g, ' '), imgIndex: index });
        if (vysledok.length >= max) break;
      }
      return vysledok;
    }, limit)
    .catch(() => [] as { name: string; price?: string; imgIndex: number }[]);

  const items: ShopItem[] = [];
  for (const polozka of zaklad) {
    let image: string | undefined;
    try {
      const handle = await page.evaluateHandle(
        (i) => document.querySelectorAll('img')[i] ?? null,
        polozka.imgIndex
      );
      const element = handle.asElement();
      if (element) {
        const buffer = await element.screenshot({ type: 'jpeg', quality: 75 });
        image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
      }
    } catch {
      /* obrázok preskočíme, karta bude bez fotky */
    }
    items.push({ name: polozka.name, price: polozka.price, image });
  }
  return items;
}

/** Pásy produktovej stránky — pod fotografiou a pod popisom. */
async function productStrips(page: Page): Promise<{ stripPhoto?: Strip; stripDesc?: Strip }> {
  const handle = await productPhotoHandle(page);
  const photoY = await (handle?.asElement()?.evaluate(
    (el) => Math.round(el.getBoundingClientRect().bottom + window.scrollY)
  ) ?? Promise.resolve(null));
  const stripPhoto = photoY ? await stripAround(page, photoY) : undefined;
  const descY = (await productDescBottom(page, photoY)) ?? (photoY ? photoY + 600 : null);
  const stripDesc = descY ? await stripAround(page, descY) : undefined;
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  return { stripPhoto, stripDesc };
}

/** Spodná hrana hlavného banneru na homepage (v súradniciach celej stránky). */
async function heroBottom(page: Page): Promise<number | null> {
  return page
    .evaluate(() => {
      const kandidati = Array.from(
        document.querySelectorAll<HTMLElement>(
          'img, [class*="banner"], [class*="hero"], [class*="slider"], [class*="carousel"], section, div'
        )
      );
      let best: DOMRect | null = null;
      for (const el of kandidati) {
        const r = el.getBoundingClientRect();
        if (r.top < 40 || r.top > 1000 || r.width < window.innerWidth * 0.4 || r.height < 130) continue;
        /* banner býva aj ako pozadie, nie vždy ako <img> */
        const pozadie = getComputedStyle(el).backgroundImage;
        const jeObrazok = el.tagName === 'IMG' || (pozadie && pozadie !== 'none');
        const jeBanner = /banner|hero|slider|carousel/i.test(`${el.className ?? ''}`);
        if (!jeObrazok && !jeBanner) continue;
        if (!best || r.width * r.height > best.width * best.height) best = r;
      }
      /* keď banner nenájdeme, položíme recenzie pod hornú časť stránky */
      return best ? Math.round(best.bottom + window.scrollY) : 620;
    })
    .catch(() => null);
}

/**
 * Hlavná fotografia produktu. Rozlišujeme ju od reklamných bannerov: má
 * približne štvorcový pomer strán a leží blízko nadpisu produktu.
 */
async function productPhotoHandle(page: Page) {
  return page
    .evaluateHandle(() => {
      const nadpis = document.querySelector('h1');
      const nadpisY = nadpis ? nadpis.getBoundingClientRect().top + window.scrollY : 400;
      let best: { el: HTMLImageElement; skore: number } | null = null;
      for (const img of Array.from(document.querySelectorAll<HTMLImageElement>('img'))) {
        const r = img.getBoundingClientRect();
        if (r.width < 160 || r.height < 160) continue;
        const y = r.top + window.scrollY;
        if (y > 1600) continue;
        const pomer = r.width / r.height;
        if (pomer < 0.5 || pomer > 2) continue; /* široký pás je banner, nie produkt */
        const vzdialenost = Math.abs(y - nadpisY);
        const skore = Math.sqrt(r.width * r.height) - vzdialenost / 3;
        if (!best || skore > best.skore) best = { el: img, skore };
      }
      return best?.el ?? null;
    })
    .catch(() => null);
}

/**
 * Koniec popisu produktu — tam patria recenzie aj poradňa.
 * Popis býva raz odsekom textu, inokedy záložkou („Popis produktu“), preto
 * hľadáme jeho nadpis a koniec sekcie: buď začiatok ďalšej sekcie stránky
 * (súvisiace produkty, recenzie), alebo spodok najdlhšieho textu pod ním.
 */
async function productDescBottom(page: Page, photoBottom: number | null): Promise<number | null> {
  return page
    .evaluate((odFotky) => {
      const y = (el: Element) => Math.round(el.getBoundingClientRect().top + window.scrollY);
      const dole = (el: Element) => Math.round(el.getBoundingClientRect().bottom + window.scrollY);
      const zakazane = /cmplz|cookie|consent|newsletter|footer|header|menu|nav|breadcrumb|modal|dialog/i;
      const nadpisPopisu = /^(popis|popis produktu|o produkte|charakteristika|description|detail produktu|informácie o produkte)$/i;
      const dalsiaSekcia = /^(mohlo by vás zaujímať|podobné produkty|súvisiace|odporúčame|naposledy|recenzie|hodnotenia|zákazníci|ostatní zákazníci|k tomuto produktu)/i;

      /* 1. nadpis alebo záložka popisu */
      let popisY: number | null = null;
      for (const el of Array.from(document.querySelectorAll('h2,h3,h4,button,a,[role="tab"],li,span,div'))) {
        const text = (el.textContent ?? '').trim();
        if (text.length > 40 || !nadpisPopisu.test(text)) continue;
        if (el.getBoundingClientRect().height === 0) continue;
        popisY = y(el);
        break;
      }
      const odkial = popisY ?? (odFotky ? odFotky : 0);

      /* 2. začiatok najbližšej ďalšej sekcie pod popisom */
      let hranica: number | null = null;
      for (const el of Array.from(document.querySelectorAll('h2,h3,h4,strong,span,div'))) {
        const text = (el.textContent ?? '').trim();
        if (text.length > 60 || !dalsiaSekcia.test(text)) continue;
        const top = y(el);
        if (top <= odkial + 40) continue;
        if (hranica === null || top < hranica) hranica = top;
      }
      if (hranica !== null) return hranica - 12;

      /* 3. spodok najdlhšieho textového bloku pod popisom */
      let best: { dlzka: number; bottom: number } | null = null;
      for (const el of Array.from(document.querySelectorAll<HTMLElement>('div,section,article,p'))) {
        const trieda = `${el.className ?? ''} ${el.id ?? ''}`;
        if (zakazane.test(trieda)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.height < 60 || rect.width < window.innerWidth * 0.25) continue;
        if (y(el) < odkial - 100) continue;
        const text = (el.innerText ?? '').trim();
        if (text.length < 120 || text.length > 5000) continue;
        if (el.querySelectorAll('div,section,article').length > 10) continue;
        if (!best || text.length > best.dlzka) best = { dlzka: text.length, bottom: dole(el) };
      }
      if (best) return best.bottom;

      /* 4. aspoň koniec záložky s popisom */
      return popisY ? popisY + 60 : null;
    }, photoBottom)
    .catch(() => null);
}

async function isProductPage(page: Page): Promise<boolean> {
  return page
    .evaluate(() => {
      const blobs = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(
        (el) => el.textContent ?? ''
      );
      for (const blob of blobs) {
        try {
          const data = JSON.parse(blob);
          const items = Array.isArray(data) ? data : [data];
          for (const item of items) {
            const graph = Array.isArray(item?.['@graph']) ? item['@graph'] : [item];
            for (const node of graph) {
              const type = node?.['@type'];
              if (type === 'Product' || (Array.isArray(type) && type.includes('Product'))) return true;
            }
          }
        } catch {
          /* nevalidný JSON-LD */
        }
      }
      const og = document.querySelector('meta[property="og:type"]')?.getAttribute('content') ?? '';
      if (og.toLowerCase().includes('product')) return true;

      const body = (document.body.innerText || '').slice(0, 30000).toLowerCase();
      const buys = ['do košíka', 'do kosika', 'kúpiť', 'kupit', 'add to cart'].reduce(
        (sum, needle) => sum + body.split(needle).length - 1,
        0
      );
      return buys >= 1 && buys <= 8 && /€|eur/.test(body) && document.querySelectorAll('h1').length === 1;
    })
    .catch(() => false);
}

async function productCandidates(page: Page, baseUrl: string): Promise<string[]> {
  const host = domainOf(baseUrl);
  const hrefs = await page
    .evaluate(() => {
      const cardHrefs = new Set<string>();
      for (const a of Array.from(document.querySelectorAll('a[href]'))) {
        const card = a.closest('div,li,article');
        const text = card instanceof HTMLElement ? card.innerText || '' : '';
        if (text.length < 400 && /\d+[,.]\d{2}\s*€/.test(text)) cardHrefs.add((a as HTMLAnchorElement).href);
      }
      const navHrefs = new Set(
        Array.from(document.querySelectorAll('nav a[href], header a[href], [class*="menu"] a[href]')).map(
          (a) => (a as HTMLAnchorElement).href
        )
      );
      return Array.from(document.querySelectorAll('a[href]')).map((a) => ({
        href: (a as HTMLAnchorElement).href,
        inCard: cardHrefs.has((a as HTMLAnchorElement).href),
        inNav: navHrefs.has((a as HTMLAnchorElement).href),
      }));
    })
    .catch(() => []);

  const scored: [number, string][] = [];
  const seen = new Set<string>();
  for (const { href, inCard, inNav } of hrefs) {
    if (!href || seen.has(href)) continue;
    seen.add(href);
    let parsed: URL;
    try {
      parsed = new URL(href);
    } catch {
      continue;
    }
    if (parsed.hostname.replace(/^www\./, '') !== host) continue;
    if (!/^https?:$/.test(parsed.protocol)) continue;
    const path = parsed.pathname;
    if (path.length < 8 || /\.(jpg|png|pdf)$/i.test(path)) continue;
    if (NON_PRODUCT_HINTS.test(path)) continue;
    if (inNav && !inCard) continue;

    let score = 0;
    if (inCard) score += 5;
    if (PRODUCT_LINK_HINTS.test(href)) score += 2;
    score += Math.min(path.replace(/^\/|\/$/g, '').split('/').length - 1, 3);
    if (/\d/.test(path)) score += 1;
    scored.push([score, href]);
  }
  return scored.sort((a, b) => b[0] - a[0]).slice(0, 8).map(([, href]) => href);
}

async function productMeta(page: Page) {
  return page.evaluate(() => {
    const clean = (value: string) => value.split(/\s+[|–-]\s+/)[0].trim().slice(0, 80);
    const name =
      document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
      document.querySelector('h1')?.textContent ||
      '';
    let price = '';
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('[class*="price"], [id*="price"]'))) {
      const text = (el.innerText || '').trim();
      const match = /\d{1,6}[,.]\d{2}\s*€|€\s*\d{1,6}[,.]\d{2}/.exec(text);
      if (match) {
        price = match[0].replace(/\s+/g, ' ').trim();
        break;
      }
    }
    if (!price) {
      /* záloha: cena zo štruktúrovaných dát (JSON-LD offers) */
      for (const script of Array.from(document.querySelectorAll('script[type="application/ld+json"]'))) {
        try {
          const found = /"price"\s*:\s*"?(\d+(?:[.,]\d{1,2})?)"?/.exec(script.textContent ?? '');
          if (found) {
            price = `${found[1].replace('.', ',')} €`;
            break;
          }
        } catch {
          /* nevalidný JSON-LD */
        }
      }
    }
    const text = (document.body.innerText || '').slice(0, 4000);
    return { name: clean(name), price, text };
  });
}

async function captureProductImage(page: Page): Promise<string | undefined> {
  const handle = await productPhotoHandle(page);
  const element = handle?.asElement();
  if (!element) return undefined;
  try {
    const buffer = await element.screenshot({ type: 'jpeg', quality: 80 });
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch {
    return undefined;
  }
}

export async function captureSite(
  rawUrl: string,
  onStep: (message: string) => void = () => {}
): Promise<Capture> {
  const url = normalizeUrl(rawUrl);
  const domain = domainOf(url);
  const warnings: string[] = [];
  let browser: Browser | undefined;

  try {
    browser = await chromium.launch({ args: ['--disable-blink-features=AutomationControlled'] });
    const context = await browser.newContext({
      viewport: VIEWPORT,
      userAgent: UA,
      locale: 'sk-SK',
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    onStep('Otváram homepage e-shopu…');
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1500);
    await waitOutSecurityCheck(page);
    await dismissOverlays(page);
    await page.waitForTimeout(800);
    /* druhý prechod — vekové brány sa často zobrazia až po cookie lište */
    await dismissOverlays(page);

    const accent = await detectAccent(page);
    const logo = await captureLogo(page);
    const heroBox = (await findHeroBox(page)) ?? undefined;
    const homepage = await shot(page);
    const items = await collectItems(page);
    const heroY = await heroBottom(page);
    const stripHero = heroY ? await stripAround(page, heroY, 260) : undefined;
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});

    onStep('Hľadám produktovú stránku…');
    /* Niektoré e-shopy presmerujú na inú doménu (napr. .sk → .eu) — odkazy
       porovnávame s adresou, na ktorej sme reálne skončili. */
    const candidates = await productCandidates(page, page.url());
    let product: string | undefined;
    let productUrl: string | undefined;
    let meta: { name: string; price: string; text: string } | undefined;
    let productImage: string | undefined;
    let stripPhoto: Strip | undefined;
    let stripDesc: Strip | undefined;

    /** Prvý kandidát, ktorý sa tvári ako produkt; inak najlepšie hodnotený odkaz. */
    let fallback: { url: string; meta: typeof meta } | undefined;

    const vyber = candidates.slice(0, 4);
    /* Ak web chráni Cloudflare, prepustí nás rovnako málo na každej podstránke —
       po druhom pokuse to vzdáme, aby zákazník nečakal zbytočné desiatky sekúnd. */
    let blokovanych = 0;
    for (const [i, candidate] of vyber.entries()) {
      try {
        onStep(`Overujem podstránku ${i + 1} z ${vyber.length}…`);
        await page.goto(candidate, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForTimeout(700);
        /* prekrytia zavrieme skôr než vyhodnotíme ochranu — veková brána
           inak vyzerá ako bot check a zbytočne sa na ňu čaká */
        await dismissOverlays(page);
        if (await waitOutSecurityCheck(page)) {
          if (++blokovanych >= 2) {
            warnings.push('E-shop chráni služba proti robotom, preto sme podstránky nevedeli načítať.');
            break;
          }
          continue;
        }

        /* Najprv lacné overenie — snímku robíme až pre stránku, ktorú použijeme. */
        const candidateMeta = await productMeta(page);
        if (!(await isProductPage(page))) {
          fallback ??= { url: candidate, meta: candidateMeta };
          continue;
        }

        productUrl = candidate;
        meta = candidateMeta;
        productImage = await captureProductImage(page);
        product = await shot(page);
        ({ stripPhoto, stripDesc } = await productStrips(page));
        if (items.length < 4) items.push(...(await collectItems(page, 8 - items.length)));
        break;
      } catch {
        /* skúsime ďalšieho kandidáta */
      }
    }

    /* Nenašiel sa potvrdený produkt — vrátime sa na najlepšieho kandidáta. */
    if (!product && fallback) {
      try {
        onStep('Pripravujem náhradnú podstránku…');
        await page.goto(fallback.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForTimeout(600);
        await dismissOverlays(page);
        productUrl = fallback.url;
        meta = fallback.meta;
        productImage = await captureProductImage(page);
        product = await shot(page);
        ({ stripPhoto, stripDesc } = await productStrips(page));
        warnings.push('Produktovú stránku sme nevedeli overiť — použili sme najpravdepodobnejšiu podstránku.');
      } catch {
        fallback = undefined;
      }
    }

    if (!product) {
      warnings.push('Produktovú stránku sa nepodarilo nájsť — použili sme homepage.');
      product = homepage;
    }

    await context.close();

    return {
      url,
      domain,
      homepage,
      product,
      productUrl,
      productName: meta?.name || undefined,
      productPrice: meta?.price || undefined,
      productImage,
      logo,
      accent,
      heroBox,
      stripHero,
      stripPhoto,
      stripDesc,
      items,
      pageText: meta?.text ?? '',
      warnings,
    };
  } finally {
    await browser?.close().catch(() => {});
  }
}
