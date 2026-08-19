import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { caseAssets } from './assets';
import { CONTENT_DIR, firstImage, readDoc } from './markdown';

export type BlogListItem = {
  slug: string;
  title: string;
  category: string;
  perex?: string;
  date?: string;
  author?: string;
  image?: string;
};

/** Poradie a kategórie berieme z indexu content/blog.md (najnovšie prvé). */
export async function getBlogIndex(): Promise<BlogListItem[]> {
  const raw = await readFile(join(CONTENT_DIR, 'blog.md'), 'utf8');
  const rows = [...raw.matchAll(/^\|\s*\d+\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*\[(.+?)\.md\]/gm)];

  return Promise.all(
    rows.map(async ([, category, title, slug]) => {
      const doc = await readDoc(`blog/${slug}.md`);
      return {
        slug,
        title: doc.title || title,
        category: category === '—' ? '' : category,
        perex: doc.perex,
        date: doc.date,
        author: doc.author,
        image: doc.thumb ?? firstImage(doc.html),
      };
    })
  );
}

/**
 * URL slugy musia zostať zhodné s pôvodným webom kvôli SEO;
 * `file` je názov súboru v content/pripadove-studie/.
 */
export const caseStudies = [
  {
    slug: 'ako-sme-pre-fixservis-pomocou-recenzii-zvysili-obrat-o-vyse-10',
    file: 'fixservis',
  },
  {
    slug: 'rewora-ako-katalyzator-rastu-drinkcentrum',
    file: 'drinkcentrum',
  },
  {
    slug: 'od-dovery-k-vykonu-ako-rewora-pomohla-eshopu-kilpi',
    file: 'kilpi',
  },
] as const;

export const caseStudySlugs = caseStudies.map((c) => c.slug);

/** Súbor s obsahom pre daný URL slug (undefined pri neznámej URL). */
export const caseStudyFile = (slug: string) =>
  caseStudies.find((c) => c.slug === slug)?.file;

export type CaseStudy = {
  slug: string;
  title: string;
  perex?: string;
  tags: string[];
  client: string;
  metrics: { value: string; label: string }[];
  logo: string;
  cover: string;
  alt: string;
};

/** Kľúčové čísla pre prehľadovú stránku — vybrané z výsledkov jednotlivých štúdií. */
const caseHighlights: Record<string, { client: string; metrics: { value: string; label: string }[] }> = {
  fixservis: {
    client: 'FixServis',
    metrics: [
      { value: '+15 %', label: 'nárast konverzného pomeru' },
      { value: '~10 %', label: 'nárast obratu po troch mesiacoch' },
      { value: '4,5 – 5,0', label: 'kvalita hodnotení' },
    ],
  },
  drinkcentrum: {
    client: 'Drinkcentrum',
    metrics: [
      { value: '+25 %', label: 'nárast konverzného pomeru' },
      { value: '+29,9 %', label: 'pridanie produktu do košíka' },
      { value: '91,17 %', label: 'zákazníkov ovplyvnených nástrojmi Rewora' },
    ],
  },
  kilpi: {
    client: 'kilpi.cz',
    metrics: [
      { value: '~10 %', label: 'nárast vložení produktov do košíka' },
      { value: '+6 %', label: 'prezretí Rewora widgetov' },
      { value: '+36 %', label: 'efektívnejšia komunikácia' },
    ],
  },
};

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return Promise.all(
    caseStudies.map(async ({ slug, file }) => {
      const doc = await readDoc(`pripadove-studie/${file}.md`);
      return {
        slug,
        title: doc.title,
        perex: doc.perex,
        tags: (doc.category ?? '').split('·').map((t) => t.trim()).filter(Boolean),
        ...caseHighlights[file],
        ...caseAssets[file],
      };
    })
  );
}
