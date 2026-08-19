/**
 * Stiahne texty z rewora.com/sk do priečinka content/ ako markdown.
 * Spustenie: node scripts/scrape-rewora.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://rewora.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36';

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ',
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', yacute: 'ý',
  hellip: '…', ndash: '–', mdash: '—', bdquo: '„', ldquo: '“', rdquo: '“', lsquo: '‚', rsquo: '’',
};

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&([a-z#0-9]+);/gi, (m, e) => ENTITIES[e] ?? m);

const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

/** Inline formátovanie: odkazy, tučné, kurzíva. */
const inline = (html) =>
  decode(
    html
      .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => {
        const label = t.replace(/<[^>]+>/g, '').trim();
        return label ? `[${label}](${href})` : '';
      })
      .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `**${t.replace(/<[^>]+>/g, '').trim()}**`)
      .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `*${t.replace(/<[^>]+>/g, '').trim()}*`)
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/[ \t]+/g, ' ')
    .trim();

/** Blokový HTML → markdown. */
function toMarkdown(html) {
  const out = [];
  const re =
    /<(h2|h3|h4|p|ul|ol|blockquote|figure|table)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const [, tag, body] = m;
    switch (tag.toLowerCase()) {
      case 'h2':
        out.push(`## ${inline(body)}`);
        break;
      case 'h3':
        out.push(`### ${inline(body)}`);
        break;
      case 'h4':
        out.push(`#### ${inline(body)}`);
        break;
      case 'p': {
        const t = inline(body);
        if (t) out.push(t);
        break;
      }
      case 'ul':
      case 'ol': {
        const items = [...body.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((li) => inline(li[1]));
        if (items.length) out.push(items.map((i) => `- ${i}`).join('\n'));
        break;
      }
      case 'blockquote': {
        const t = inline(body);
        if (t) out.push(`> ${t.replace(/\n/g, '\n> ')}`);
        break;
      }
      case 'figure': {
        const img = /<img\b[^>]*?src="([^"]*)"[^>]*?>/i.exec(body);
        const alt = /alt="([^"]*)"/i.exec(body)?.[1] ?? '';
        const cap = /<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i.exec(body)?.[1];
        if (img) out.push(`![${alt}](${img[1]})${cap ? `\n*${text(cap)}*` : ''}`);
        break;
      }
      case 'table': {
        const rows = [...body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((tr) =>
          [...tr[1].matchAll(/<(td|th)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((td) => text(td[2]))
        );
        if (rows.length) {
          out.push(rows.map((r) => `| ${r.join(' | ')} |`).join('\n'));
        }
        break;
      }
    }
  }
  return out.join('\n\n');
}

const slice = (html, startMarker, ...endMarkers) => {
  const s = html.indexOf(startMarker);
  if (s < 0) return '';
  const rest = html.slice(s);
  const end = endMarkers
    .map((m) => rest.indexOf(m))
    .filter((i) => i > 0)
    .sort((a, b) => a - b)[0];
  return end ? rest.slice(0, end) : rest;
};

async function get(path) {
  const res = await fetch(BASE + path, { headers: { 'User-Agent': UA, 'Accept-Language': 'sk' } });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.text();
}

async function save(relPath, content) {
  const full = join(ROOT, 'content', relPath);
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, content, 'utf8');
  console.log('✓', relPath);
}

/* ---------------------------------------------------------------- blog */

/** Náhľadové obrázky z výpisu blogu: url článku → cesta k obrázku. */
const thumbs = new Map();

async function blogUrls() {
  const urls = [];
  for (let page = 1; page <= 10; page++) {
    let html;
    try {
      html = await get(`/sk/blog/${page > 1 ? `?page=${page}` : ''}`);
    } catch {
      break;
    }

    /* Náhľad je v tom istom <article> bloku ako odkaz na článok. */
    for (const block of html.split('<article').slice(1)) {
      const url = /href="(\/sk\/blog\/[a-z0-9-]+\/)"/.exec(block)?.[1];
      const img = /src="(\/media\/images\/[^"]+)"/.exec(block)?.[1];
      if (url && img && !thumbs.has(url)) thumbs.set(url, img);
    }

    const found = [...new Set([...html.matchAll(/href="(\/sk\/blog\/[a-z0-9-]+\/)"/g)].map((m) => m[1]))];
    const fresh = found.filter((u) => !urls.includes(u));
    if (!fresh.length) break;
    urls.push(...fresh);
  }
  return urls;
}

async function scrapeArticle(url) {
  const html = await get(url);
  const slug = url.replace(/\/sk\/blog\/|\/$/g, '');
  const title = text(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1] ?? slug);
  const category = text(
    /<div class="inline-block rounded-full[^"]*"[^>]*>([\s\S]*?)<\/div>/i.exec(html)?.[1] ?? ''
  );
  const meta = text(slice(html, '<div class="flex">', '</div>\n\n            <p'));
  const perex = inline(
    /<p class="mt-6 text-xl[^"]*"[^>]*>([\s\S]*?)<\/p>/i.exec(html)?.[1] ?? ''
  );
  const bodyHtml = slice(html, 'class="leading-8"', 'title="Facebook share"', '</article>');
  const body = toMarkdown(bodyHtml);

  const md = [
    `# ${title}`,
    '',
    `> Zdroj: ${BASE}${url}`,
    `> Stiahnuté: ${new Date().toISOString().slice(0, 10)}`,
    category ? `\n**Kategória:** ${category}` : '',
    meta ? `**Autor a dátum:** ${meta}` : '',
    thumbs.has(url) ? `**Náhľad:** ${thumbs.get(url)}` : '',
    perex ? `\n## Perex\n\n${perex}` : '',
    body ? `\n${body}` : '',
    '',
  ]
    .filter((l) => l !== '')
    .join('\n');

  await save(`blog/${slug}.md`, md);
  return { slug, title, category, meta, perex, url };
}

/* ------------------------------------------------- domovská stránka + cenník */

/** Domovská stránka: funkcie, admin panel, integrácie, FAQ. */
async function scrapeHomepage() {
  const html = await get('/sk/');
  const main = slice(html, '<main', '<footer');
  const md = [
    '# Domovská stránka — funkcie, integrácie, FAQ',
    '',
    `> Zdroj: ${BASE}/sk/`,
    `> Stiahnuté: ${new Date().toISOString().slice(0, 10)}`,
    '',
    toMarkdown(main),
    '',
  ].join('\n');
  await save('domovska-stranka.md', md);
}

/** Cenník sa načítava z app.rewora.com (htmx + shadow DOM). */
async function scrapePricing() {
  const res = await fetch('https://app.rewora.com/sk/subscription/pricing/', {
    headers: { 'User-Agent': UA, 'Accept-Language': 'sk' },
  });
  const html = res.ok ? await res.text() : '';
  const plans = [...html.matchAll(/<(h2|h3)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => text(m[2]));
  const md = [
    '# Cenník',
    '',
    `> Zdroj: ${BASE}/sk/cennik/ (tabuľka sa načítava z https://app.rewora.com/sk/subscription/pricing/)`,
    `> Stiahnuté: ${new Date().toISOString().slice(0, 10)}`,
    '',
    'Prepínač období: **Mesačne / Ročne**',
    '',
    '## Bezplatný — 0 € navždy',
    '',
    'CTA: Začať zadarmo',
    '',
    '- Widget: Produktové recenzie',
    '- Widget: Hviezdičkové hodnotenia produktov',
    '- Widget: Hotspoty (PDF a web)',
    '- 1 doména',
    '',
    '## Štandardný — 29 € mesačne / 290 € ročne',
    '',
    'CTA: Vyskúšať teraz',
    '',
    '- Widget: Recenzie na firmu a produkty',
    '- Widget: Štatistika nákupov (BI dáta)',
    '- Widget: Fórum a Produktová poradňa',
    '- Widget: Hotspoty (PDF a Web)',
    '- Widget: Hviezdičky na produkt',
    '- Zobrazenie recenzií z viacerých zdrojov (napr. Heureka)',
    '',
    '## Profesionálny — 149 € mesačne / 1490 € ročne',
    '',
    'CTA: Vyskúšať teraz',
    '',
    '- Všetko čo obsahuje balík Štandardný',
    '- 2 000 pozvánok na recenzie mesačne',
    '- Automatické zaradenie produktov do Google Shopping',
    '- Automatické preklady recenzií, fóra a produktovej poradne do 31 jazykov',
    '- Prístup k Rewora API',
    '',
    '## Podnikový — Individuálne',
    '',
    'CTA: Rezervovať ukážku',
    '',
    '- Všetko čo obsahuje balík Profesionálny',
    '- Viac než 2 000 pozvánok na recenzie mesačne',
    '',
    '---',
    '',
    'Bez rizika – ak nebudete spokojní, do 30 dní od zakúpenia vám vrátime peniaze.',
    '',
    plans.length ? `<!-- nadpisy z live endpointu: ${plans.join(' · ')} -->\n` : '',
  ].join('\n');
  await save('cennik.md', md);
}

/** Prehľadová stránka prípadových štúdií. */
async function scrapeCaseStudiesIndex() {
  const html = await get('/sk/pripadove-studie/');
  const main = slice(html, '<h1', '<footer');
  const md = [
    '# Prípadové štúdie — prehľadová stránka',
    '',
    `> Zdroj: ${BASE}/sk/pripadove-studie/`,
    `> Stiahnuté: ${new Date().toISOString().slice(0, 10)}`,
    '',
    toMarkdown(main),
    '',
    '## Číselný pás (renderované mimo textových blokov)',
    '',
    '| Hodnota | Popis |',
    '|---|---|',
    '| 9 z 10 | Zákazníkov si pred kúpou prečíta recenzie |',
    '| 270 % | Vyššia šanca predať produkt s 5+ recenziami |',
    '| +15 % | Nárast konverzného pomeru |',
    '| 380 % | Drahšie produkty s recenziami sa kupujú častejšie |',
    '',
    'Nadpis sekcie so zoznamom: **Prezrite si všetky prípadové štúdie**',
    'Filtre: Oblasť (Všetky) · Produkt (Všetky) — hodnoty: Google shopping, Hot spoty, BI dáta, Recenzie obchodu, Produktové recenzie',
    '',
    '## Jednotlivé štúdie',
    '',
    '- [FixServis](pripadove-studie/fixservis.md)',
    '- [Drinkcentrum](pripadove-studie/drinkcentrum.md)',
    '- [Kilpi](pripadove-studie/kilpi.md)',
    '',
  ].join('\n');
  await save('pripadove-studie.md', md);
}

/* -------------------------------------------------------------- spustenie */

await scrapeHomepage();
await scrapePricing();
await scrapeCaseStudiesIndex();

const urls = await blogUrls();
console.log(`Nájdených ${urls.length} článkov`);

const index = [];
for (const url of urls) {
  try {
    index.push(await scrapeArticle(url));
  } catch (err) {
    console.error('✗', url, err.message);
  }
}

const indexMd = [
  '# Blog — prehľad článkov',
  '',
  `> Zdroj: ${BASE}/sk/blog/`,
  `> Stiahnuté: ${new Date().toISOString().slice(0, 10)} · ${index.length} článkov`,
  '',
  '**Hero:** Blog — „Budujte dôveru u vašich zákazníkov a merateľne zvýšte konverzný pomer vášho e‑shopu jednoducho na pár klikov.“',
  '',
  '| # | Kategória | Titulok | Súbor |',
  '|---|---|---|---|',
  ...index.map(
    (a, i) => `| ${i + 1} | ${a.category || '—'} | ${a.title} | [${a.slug}.md](blog/${a.slug}.md) |`
  ),
  '',
].join('\n');

await save('blog.md', indexMd);
console.log('Hotovo.');

/* ---------------------------------------------- statické stránky (VOP, GDPR…) */

const STATIC_PAGES = [
  { path: '/sk/ochrana-osobnych-udajov/', file: 'ochrana-osobnych-udajov.md' },
  { path: '/sk/vseobecne-obchodne-podmienky/', file: 'vseobecne-obchodne-podmienky.md' },
  { path: '/sk/shoptet-obchodne-podmienky/', file: 'shoptet-obchodne-podmienky.md' },
  { path: '/sk/dakujeme/', file: 'dakujeme.md' },
];

for (const page of STATIC_PAGES) {
  try {
    const html = await get(page.path);
    const title = text(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1] ?? '');
    const main = slice(html, '<h1', '<footer', 'Nastavenia cookies');
    await save(
      `stranky/${page.file}`,
      [
        `# ${title}`,
        '',
        `> Zdroj: ${BASE}${page.path}`,
        `> Stiahnuté: ${new Date().toISOString().slice(0, 10)}`,
        '',
        toMarkdown(main),
        '',
      ].join('\n')
    );
  } catch (err) {
    console.error('✗', page.path, err.message);
  }
}
