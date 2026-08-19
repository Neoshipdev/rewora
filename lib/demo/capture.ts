/**
 * Snímanie e-shopu pre ukážku widgetov.
 * Port logiky z Rewora Presentation Agent (capture.py) do Playwrightu pre Node:
 * odklikanie cookie líšt a vekových brán, nájdenie produktovej podstránky,
 * detekcia dizajnovej farby, loga a hero bannera.
 */
import { chromium, type Browser, type Page } from 'playwright';

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
        /prebieha bezpečnostné overenie|just a moment|checking your browser|overujeme|kontrola prehliadača|attention required/i.test(
          document.body.innerText.slice(0, 800)
        )
      )
      .catch(() => false);

  for (let attempt = 0; attempt < 4; attempt++) {
    if (!(await isBlocked())) return false;
    await page.waitForTimeout(4000);
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
  const handle = await page
    .evaluateHandle(() => {
      const images = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
      let best: HTMLImageElement | null = null;
      for (const img of images) {
        const rect = img.getBoundingClientRect();
        if (rect.width < 180 || rect.height < 180 || rect.top > 1200) continue;
        if (!best || rect.width * rect.height > best.getBoundingClientRect().width * best.getBoundingClientRect().height)
          best = img;
      }
      return best;
    })
    .catch(() => null);

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

    onStep('Hľadám produktovú stránku…');
    const candidates = await productCandidates(page, url);
    let product: string | undefined;
    let productUrl: string | undefined;
    let meta: { name: string; price: string; text: string } | undefined;
    let productImage: string | undefined;

    /** Prvý kandidát, ktorý sa tvári ako produkt; inak najlepšie hodnotený odkaz. */
    let fallback: { url: string; shot: string; meta: typeof meta; image?: string } | undefined;

    for (const candidate of candidates.slice(0, 5)) {
      try {
        await page.goto(candidate, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(1200);
        if (await waitOutSecurityCheck(page)) continue; // bot ochrana — skúsime inú podstránku
        await dismissOverlays(page);
        const confirmed = await isProductPage(page);
        const candidateMeta = await productMeta(page);
        const candidateShot = await shot(page);

        if (!confirmed) {
          fallback ??= {
            url: candidate,
            shot: candidateShot,
            meta: candidateMeta,
            image: await captureProductImage(page),
          };
          continue;
        }

        productUrl = candidate;
        meta = candidateMeta;
        productImage = await captureProductImage(page);
        product = candidateShot;
        break;
      } catch {
        /* skúsime ďalšieho kandidáta */
      }
    }

    if (!product && fallback) {
      warnings.push('Produktovú stránku sme nevedeli overiť — použili sme najpravdepodobnejšiu podstránku.');
      productUrl = fallback.url;
      meta = fallback.meta;
      productImage = fallback.image;
      product = fallback.shot;
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
      pageText: meta?.text ?? '',
      warnings,
    };
  } finally {
    await browser?.close().catch(() => {});
  }
}
