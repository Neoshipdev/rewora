import type { MetadataRoute } from 'next';
import { listSlugs } from '@/lib/markdown';
import { caseStudies } from '@/lib/posts';

export const dynamic = 'force-static';

const BASE = 'https://rewora.com';

/**
 * Rovnaká štruktúra URL ako na pôvodnom webe — po nasadení sa nesmie
 * stratiť žiadna indexovaná adresa.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await listSlugs('blog');

  const paths = [
    { path: '/sk/', priority: 1 },
    { path: '/sk/cennik/', priority: 0.9 },
    { path: '/sk/pripadove-studie/', priority: 0.8 },
    ...caseStudies.map(({ slug }) => ({ path: `/sk/pripadove-studie/${slug}/`, priority: 0.7 })),
    { path: '/sk/blog/', priority: 0.8 },
    ...blogSlugs.map((slug) => ({ path: `/sk/blog/${slug}/`, priority: 0.6 })),
    { path: '/sk/ukazka/', priority: 0.9 },
    { path: '/sk/vseobecne-obchodne-podmienky/', priority: 0.3 },
    { path: '/sk/shoptet-obchodne-podmienky/', priority: 0.3 },
    { path: '/sk/ochrana-osobnych-udajov/', priority: 0.3 },
  ];

  return paths.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/sk/' || path === '/sk/blog/' ? 'weekly' : 'monthly',
    priority,
  }));
}
