/**
 * Stiahne anglickú a českú verziu rewora.com do content/en a content/cs.
 * Štruktúra kopíruje slovenskú vetvu, aby sa dala vykresliť rovnakými stránkami.
 *
 *   node scripts/scrape-langs.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://rewora.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36';

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ',
  hellip: '…', ndash: '–', mdash: '—', bdquo: '„', ldquo: '"', rdquo: '"', lsquo: '‚', rsquo: '’',
};
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&([a-z#0-9]+);/gi, (m, e) => ENTITIES[e] ?? m);
const text = (html) => decode(String(html).replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

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
  ).replace(/[ \t]+/g, ' ').trim();

function toMarkdown(html) {
  const out = [];
  const re = /<(h2|h3|h4|p|ul|ol|blockquote|figure|table)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const [, tag, body] = m;
    if (tag === 'ul' || tag === 'ol') {
      const items = [...body.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((li) => inline(li[1]));
      items.forEach((it, i) => it && out.push(tag === 'ol' ? `${i + 1}. ${it}` : `* ${it}`));
      out.push('');
      continue;
    }
    if (tag === 'figure') {
      const src = /<img[^>]*src="([^"]*)"/i.exec(body)?.[1];
      if (src) out.push(`![](${src})`, '');
      continue;
    }
    const t = inline(body);
    if (!t) continue;
    if (tag === 'h2') out.push(`## ${t}`, '');
    else if (tag === 'h3') out.push(`### ${t}`, '');
    else if (tag === 'h4') out.push(`#### ${t}`, '');
    else if (tag === 'blockquote') out.push(`> ${t}`, '');
    else out.push(t, '');
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

const slice = (html, start, ...endMarkers) => {
  const s = html.indexOf(start);
  if (s < 0) return '';
  const rest = html.slice(s);
  const end = endMarkers.map((mk) => rest.indexOf(mk)).filter((i) => i > 0).sort((a, b) => a - b)[0];
  return end ? rest.slice(0, end) : rest;
};

async function get(path) {
  const res = await fetch(BASE + path, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.text();
}

async function save(rel, content) {
  const full = join(ROOT, 'content', rel);
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, content, 'utf8');
}

/** Jeden článok alebo štúdia → markdown v rovnakom tvare ako slovenské. */
async function scrapeArticle(url, cielovyPriecinok) {
  const html = await get(url);
  const title = text(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1] ?? '');
  const slug = url.replace(/\/$/, '').split('/').pop();
  const hlavicka = slice(html, '<h1', '<footer', 'Cookie', 'Nastavenia');
  const perex = text(/<p[^>]*class="[^"]*lead[^"]*"[^>]*>([\s\S]*?)<\/p>/i.exec(html)?.[1] ?? '');
  const thumb = /<meta property="og:image" content="([^"]*)"/i.exec(html)?.[1] ?? '';
  const meta = text(slice(html, '<time', '</div>')) || '';
  const md = [
    `# ${title}`,
    '',
    `> Zdroj: ${BASE}${url}`,
    `> Stiahnuté: ${new Date().toISOString().slice(0, 10)}`,
    '',
    thumb ? `**Náhľad:** ${thumb.replace(BASE, '')}` : '',
    meta ? `**Autor a dátum:** ${meta}` : '',
    '',
    perex ? `## Perex\n\n${perex}\n` : '',
    toMarkdown(hlavicka),
    '',
  ].filter((r) => r !== null).join('\n');
  await save(`${cielovyPriecinok}/${slug}.md`, md);
  return { slug, title };
}

const sitemap = await (await fetch(`${BASE}/sitemap.xml`, { headers: { 'User-Agent': UA } })).text();
const vsetky = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(BASE, ''));

const jazyky = {
  en: {
    priecinok: 'en',
    je: (u) => !u.startsWith('/sk/') && !u.startsWith('/cs/'),
    blog: '/resources/',
    studie: '/case-studies/',
  },
  cs: {
    priecinok: 'cs',
    je: (u) => u.startsWith('/cs/'),
    blog: '/cs/blog/',
    studie: '/cs/pripadove-studie/',
  },
};

for (const [kod, j] of Object.entries(jazyky)) {
  const url = vsetky.filter(j.je);
  const clanky = url.filter((u) => u.startsWith(j.blog) && u !== j.blog);
  const studie = url.filter((u) => u.startsWith(j.studie) && u !== j.studie);
  const ostatne = url.filter((u) => !clanky.includes(u) && !studie.includes(u));

  console.log(`\n=== ${kod.toUpperCase()} — ${url.length} adries (${clanky.length} článkov, ${studie.length} štúdií) ===`);

  for (const u of clanky) {
    try {
      const { slug } = await scrapeArticle(u, `${j.priecinok}/blog`);
      process.stdout.write('.');
    } catch (e) {
      console.error('\n✗', u, e.message);
    }
  }
  for (const u of studie) {
    try {
      await scrapeArticle(u, `${j.priecinok}/pripadove-studie`);
      process.stdout.write('.');
    } catch (e) {
      console.error('\n✗', u, e.message);
    }
  }
  for (const u of ostatne) {
    try {
      const html = await get(u);
      const title = text(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1] ?? '');
      const nazov = u === '/' ? 'index' : u.replace(/^\/(cs\/)?/, '').replace(/\/$/, '').replace(/\//g, '-') || 'index';
      await save(
        `${j.priecinok}/stranky/${nazov}.md`,
        [`# ${title}`, '', `> Zdroj: ${BASE}${u}`, '', toMarkdown(slice(html, '<h1', '<footer', 'Cookie')), ''].join('\n')
      );
      process.stdout.write('.');
    } catch (e) {
      console.error('\n✗', u, e.message);
    }
  }
}
console.log('\nHotovo.');
