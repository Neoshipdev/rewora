import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { marked } from 'marked';

export const CONTENT_DIR = join(process.cwd(), 'content');

/**
 * Obrázky v stiahnutom obsahu ukazujú na /media/images/... na rewora.com;
 * prepíname ich na lokálne kópie v public/images/media/.
 */
const localizeMedia = (html: string) =>
  html
    .replace(/(src|href)="(?:https:\/\/rewora\.com)?\/media\/images\//g, '$1="/images/media/')
    .replace(/(src|href)="(?:https:\/\/rewora\.com)?\/static\/images\/[^"]*\//g, '$1="/images/static/');

/** Prvý obrázok v článku — používame ako náhľad na výpise blogu. */
export const firstImage = (html: string) => /<img[^>]+src="([^"]+)"/i.exec(html)?.[1];

export type Doc = {
  title: string;
  category?: string;
  author?: string;
  date?: string;
  perex?: string;
  html: string;
  /** Náhľadový obrázok z výpisu blogu. */
  thumb?: string;
};

export async function readDoc(relPath: string): Promise<Doc> {
  const raw = await readFile(join(CONTENT_DIR, relPath), 'utf8');
  const lines = raw.split('\n');

  const title = lines.find((l) => l.startsWith('# '))?.slice(2).trim() ?? '';
  const category = /\*\*Kategória:\*\*\s*(.+)/.exec(raw)?.[1]?.trim();
  const tags = /\*\*Štítky:\*\*\s*(.+)/.exec(raw)?.[1]?.trim();
  const metaLine = /\*\*Autor a dátum:\*\*\s*(.+)/.exec(raw)?.[1]?.trim();
  const thumb = /\*\*Náhľad:\*\*\s*(\S+)/
    .exec(raw)?.[1]
    ?.replace(/^(?:https:\/\/rewora\.com)?\/media\/images\//, '/images/media/');

  /* „David Kucak 11. máj 2023“ → autor + dátum */
  const metaMatch = metaLine ? /^(.*?)\s*(\d{1,2}\.\s*\S+\s*\d{4})$/.exec(metaLine) : null;

  const body = lines
    .filter(
      (l) =>
        !l.startsWith('# ') &&
        !l.startsWith('> Zdroj:') &&
        !l.startsWith('> Stiahnuté:') &&
        !l.startsWith('**Kategória:**') &&
        !l.startsWith('**Štítky:**') &&
        !l.startsWith('**Náhľad:**') &&
        !l.startsWith('**Autor a dátum:**')
    )
    .join('\n');

  /* Perex je prvý odstavec pod nadpisom „## Perex“ — rendrujeme ho zvlášť. */
  const perexMatch = /##\s*Perex\s*\n+([\s\S]*?)(?=\n#{2,3}\s|\n!\[|$)/.exec(body);
  const perex = perexMatch?.[1]?.trim().split('\n\n')[0];
  const rest = perexMatch ? body.replace(perexMatch[0], '') : body;

  const html = localizeMedia(await marked.parse(rest, { async: true }));

  return {
    title,
    category: category ?? tags,
    author: metaMatch?.[1]?.trim() || undefined,
    date: metaMatch?.[2]?.trim() || metaLine,
    perex,
    html,
    thumb,
  };
}

export async function listSlugs(dir: string): Promise<string[]> {
  const files = await readdir(join(CONTENT_DIR, dir));
  return files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}
