import type { MetadataRoute } from 'next';
import { LANGS, bezPredpony, contentDir, home, routes, type Lang } from '@/lib/i18n';
import { listSlugs } from '@/lib/markdown';
import { caseStudiesByLang } from '@/lib/posts';

export const dynamic = 'force-static';

const BASE = 'https://rewora.com';

/**
 * Rovnaká štruktúra URL ako na pôvodnom webe vo všetkých troch jazykoch —
 * po nasadení sa nesmie stratiť žiadna indexovaná adresa.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const zaznamy: { path: string; priority: number }[] = [];

  for (const lang of LANGS as Lang[]) {
    const blogSlugs = await listSlugs(`${contentDir[lang]}blog`);
    const r = routes;

    zaznamy.push({ path: home[lang], priority: 1 });
    if (r.pricing[lang]) zaznamy.push({ path: r.pricing[lang]!, priority: 0.9 });
    if (r.cases[lang]) {
      zaznamy.push({ path: r.cases[lang]!, priority: 0.8 });
      for (const { slug } of caseStudiesByLang[lang]) {
        zaznamy.push({ path: `${r.cases[lang]}${slug}/`, priority: 0.7 });
      }
    }
    if (r.blog[lang]) {
      zaznamy.push({ path: r.blog[lang]!, priority: 0.8 });
      for (const slug of blogSlugs) {
        zaznamy.push({ path: `${r.blog[lang]}${slug}/`, priority: 0.6 });
      }
    }
    if (r.demo[lang]) zaznamy.push({ path: r.demo[lang]!, priority: 0.9 });
    if (r.about[lang]) zaznamy.push({ path: r.about[lang]!, priority: 0.7 });
    if (r.contact[lang]) zaznamy.push({ path: r.contact[lang]!, priority: 0.7 });
    if (r.partner[lang]) zaznamy.push({ path: r.partner[lang]!, priority: 0.6 });
    if (r.shopifyGuide[lang]) zaznamy.push({ path: r.shopifyGuide[lang]!, priority: 0.6 });
    if (r.shoptetGuide[lang]) zaznamy.push({ path: r.shoptetGuide[lang]!, priority: 0.6 });
    if (r.terms[lang]) zaznamy.push({ path: r.terms[lang]!, priority: 0.3 });
    if (r.shoptet[lang]) zaznamy.push({ path: r.shoptet[lang]!, priority: 0.3 });
    if (r.privacy[lang]) zaznamy.push({ path: r.privacy[lang]!, priority: 0.3 });
  }

  const domovske = LANGS.map((l) => home[l] as string);

  return zaznamy.map(({ path, priority }) => ({
    url: `${BASE}${bezPredpony(path)}`,
    lastModified: new Date(),
    changeFrequency: domovske.includes(path) || path.endsWith('blog/') ? 'weekly' : 'monthly',
    priority,
  }));
}
