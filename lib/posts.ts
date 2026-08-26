import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { caseAssets } from './assets';
import { contentDir, type Lang } from './i18n';
import { tDeep } from './t';
import { CONTENT_DIR, firstImage, listSlugs, readDoc } from './markdown';

export type BlogListItem = {
  slug: string;
  title: string;
  category: string;
  perex?: string;
  date?: string;
  author?: string;
  image?: string;
};

/**
 * Slovenský blog má ručný index s poradím a kategóriami; ostatné jazyky
 * čítame priamo z priečinka so stiahnutými článkami.
 */
export async function getBlogIndex(lang: Lang = 'sk'): Promise<BlogListItem[]> {
  if (lang !== 'sk') {
    const dir = `${contentDir[lang]}blog`;
    const slugs = await listSlugs(dir);
    const items = await Promise.all(
      slugs.map(async (slug) => {
        const doc = await readDoc(`${dir}/${slug}.md`);
        return {
          slug,
          title: doc.title,
          category: doc.category ?? '',
          perex: doc.perex,
          date: doc.date,
          author: doc.author,
          image: doc.thumb ?? firstImage(doc.html),
        };
      })
    );
    return items.filter((i) => i.title);
  }

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
export type CaseKey = 'fixservis' | 'drinkcentrum' | 'kilpi';

/** URL slugy prípadových štúdií presne podľa pôvodného webu. */
export const caseStudiesByLang: Record<Lang, { slug: string; file: string; key: CaseKey }[]> = {
  sk: [
    { slug: 'ako-sme-pre-fixservis-pomocou-recenzii-zvysili-obrat-o-vyse-10', file: 'pripadove-studie/fixservis', key: 'fixservis' },
    { slug: 'rewora-ako-katalyzator-rastu-drinkcentrum', file: 'pripadove-studie/drinkcentrum', key: 'drinkcentrum' },
    { slug: 'od-dovery-k-vykonu-ako-rewora-pomohla-eshopu-kilpi', file: 'pripadove-studie/kilpi', key: 'kilpi' },
  ],
  cs: [
    { slug: 'jak-jsme-za-fix-servisu-pouzili-recenze-ke-zvyseni-obratu-o-10', file: 'cs/pripadove-studie/jak-jsme-za-fix-servisu-pouzili-recenze-ke-zvyseni-obratu-o-10', key: 'fixservis' },
    { slug: 'rewora-ako-katalyzator-rastu-drinkcentrum', file: 'cs/pripadove-studie/rewora-ako-katalyzator-rastu-drinkcentrum', key: 'drinkcentrum' },
    { slug: 'od-sebeduvery-k-vykonu-jak-rewora-pomohla-eshopu-kilpi-cz', file: 'cs/pripadove-studie/od-sebeduvery-k-vykonu-jak-rewora-pomohla-eshopu-kilpi-cz', key: 'kilpi' },
  ],
  en: [
    { slug: 'how-are-we-for-fix-service-using-reviews-to-increase-turnover-by-10', file: 'en/pripadove-studie/how-are-we-for-fix-service-using-reviews-to-increase-turnover-by-10', key: 'fixservis' },
    { slug: 'rewora-as-catalyst-growth-drinkcentre', file: 'en/pripadove-studie/rewora-as-catalyst-growth-drinkcentre', key: 'drinkcentrum' },
    { slug: 'from-dovery-to-performance-how-rescue-helped-eshop-kilpi', file: 'en/pripadove-studie/from-dovery-to-performance-how-rescue-helped-eshop-kilpi', key: 'kilpi' },
  ],
};

export const caseStudies = caseStudiesByLang.sk;

export const caseStudySlugs = caseStudies.map((c) => c.slug);

/** Štúdia pre daný URL slug v danom jazyku (undefined pri neznámej URL). */
export const caseStudyRef = (slug: string, lang: Lang = 'sk') =>
  caseStudiesByLang[lang].find((c) => c.slug === slug);

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

export async function getCaseStudies(lang: Lang = 'sk'): Promise<CaseStudy[]> {
  return Promise.all(
    caseStudiesByLang[lang].map(async ({ slug, file, key }) => {
      const doc = await readDoc(`${file}.md`);
      return {
        slug,
        title: doc.title,
        perex: doc.perex,
        tags: (doc.category ?? '').split('·').map((t) => t.trim()).filter(Boolean),
        ...tDeep(caseHighlights[key], lang),
        ...caseAssets[key],
      };
    })
  );
}
