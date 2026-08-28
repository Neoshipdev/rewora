/**
 * Vygeneruje súbory route pre všetky tri jazykové mutácie.
 * Adresy sa riadia lib/i18n.ts, takže sedia s pôvodným rewora.com.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const APP = 'app';

/** Priečinok route pre danú URL (bez lomítok na okrajoch). */
const seg = (url) => url.split('/').filter(Boolean).join('/');

const zapis = async (cesta, obsah) => {
  await mkdir(dirname(cesta), { recursive: true });
  await writeFile(cesta, obsah, 'utf8');
};

const layout = (lang) => `import type { Metadata } from 'next';
import BaseLayout from '@/components/BaseLayout';
import { ogImage } from '@/lib/assets';
import { homeSeo } from '@/lib/meta';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rewora.com'),
  title: homeSeo.${lang}.title,
  description: homeSeo.${lang}.description,
  openGraph: {
    title: homeSeo.${lang}.title,
    description: homeSeo.${lang}.description,
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Rewora' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BaseLayout lang="${lang}">{children}</BaseLayout>;
}
`;

/** Jednoduchá stránka postavená na spoločnom komponente. */
const page = (komponent, lang, key, extra = '') => `import type { Metadata } from 'next';
import ${komponent} from '@/components/pages/${komponent}';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('${key}', '${lang}'${extra});

export default function Page() {
  return <${komponent} lang="${lang}" />;
}
`;

/** Prehľad blogu a prípadových štúdií sú asynchrónne (čítajú markdown). */
const asyncPage = (komponent, lang, key) => `import type { Metadata } from 'next';
import ${komponent} from '@/components/pages/${komponent}';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('${key}', '${lang}');

export default function Page() {
  return <${komponent} lang="${lang}" />;
}
`;

const legal = (lang, file, key, eyebrow, hideCta = false) => `import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('${key}', '${lang}'${
  hideCta ? ", { robots: { index: false, follow: true } }" : ''
});

export default function Page() {
  return <ContentPage file="${file}" eyebrow="${eyebrow}" lang="${lang}"${hideCta ? ' hideCta' : ''} />;
}
`;

const article = (lang, base) => `import type { Metadata } from 'next';
import ArticlePage, { blogDir } from '@/components/pages/ArticlePage';
import { listSlugs, readDoc } from '@/lib/markdown';
import { docMeta } from '@/lib/meta';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await listSlugs(blogDir('${lang}'));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugs = await listSlugs(blogDir('${lang}'));
  if (!slugs.includes(params.slug)) return {};
  const doc = await readDoc(\`\${blogDir('${lang}')}/\${params.slug}.md\`);
  return docMeta('${lang}', \`${base}\${params.slug}/\`, doc.title, doc.perex);
}

export default function Page({ params }: Props) {
  return <ArticlePage lang="${lang}" slug={params.slug} />;
}
`;

const caseStudy = (lang, base) => `import type { Metadata } from 'next';
import CasePage from '@/components/pages/CasePage';
import { readDoc } from '@/lib/markdown';
import { docMeta } from '@/lib/meta';
import { caseStudiesByLang, caseStudyRef } from '@/lib/posts';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudiesByLang.${lang}.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ref = caseStudyRef(params.slug, '${lang}');
  if (!ref) return {};
  const doc = await readDoc(\`\${ref.file}.md\`);
  return docMeta('${lang}', \`${base}\${params.slug}/\`, doc.title, doc.perex);
}

export default function Page({ params }: Props) {
  return <CasePage lang="${lang}" slug={params.slug} />;
}
`;

/* ---------------------------------------------------------------- */

const mutacie = {
  sk: {
    group: '(sk)',
    home: '/sk/',
    blog: '/sk/blog/',
    pricing: '/sk/cennik/',
    cases: '/sk/pripadove-studie/',
    thanks: ['/sk/dakujeme/', 'dakujeme', 'Ďakujeme'],
    privacy: ['/sk/ochrana-osobnych-udajov/', 'ochrana-osobnych-udajov', 'Ochrana osobných údajov'],
    terms: ['/sk/vseobecne-obchodne-podmienky/', 'vseobecne-obchodne-podmienky', 'Obchodné podmienky'],
    shoptet: ['/sk/shoptet-obchodne-podmienky/', 'shoptet-obchodne-podmienky', 'Obchodné podmienky Shoptet'],
    about: '/sk/o-nas/',
    contact: '/sk/kontakt/',
    partner: '/sk/partnersky-program/',
    demo: '/sk/ukazka/',
    shopifyGuide: '/sk/navody/shopify-plugin/',
  },
  cs: {
    group: '(cs)',
    home: '/cs/',
    blog: '/cs/blog/',
    pricing: '/cs/cenik/',
    cases: '/cs/pripadove-studie/',
    thanks: ['/cs/dekujeme/', 'dekujeme', 'Děkujeme'],
    privacy: ['/cs/ochrana-osobnich-udaju/', 'ochrana-osobnich-udaju', 'Ochrana osobních údajů'],
    terms: ['/cs/vseobecne-obchodni-podminky/', 'vseobecne-obchodni-podminky', 'Obchodní podmínky'],
    shoptet: ['/cs/shoptet-obchodni-podminky/', 'shoptet-obchodni-podminky', 'Obchodní podmínky Shoptet'],
    about: '/cs/o-nas/',
    contact: '/cs/kontakt/',
    partner: '/cs/partnersky-program/',
    demo: '/cs/ukazka/',
    shopifyGuide: '/cs/navody/shopify-plugin/',
  },
  en: {
    group: '(en)',
    home: '/',
    blog: '/resources/',
    pricing: '/pricing/',
    cases: '/case-studies/',
    thanks: ['/thank-you/', 'thank-you', 'Thank you'],
    privacy: ['/personal-data-protection/', 'personal-data-protection', 'Personal data protection'],
    terms: ['/general-terms-and-conditions/', 'general-terms-and-conditions', 'Terms and conditions'],
    about: '/about/',
    contact: '/contact/',
    partner: '/partner-program/',
    demo: '/demo/',
    shopifyGuide: '/guides/shopify-plugin/',
  },
};

for (const [lang, m] of Object.entries(mutacie)) {
  const koren = join(APP, m.group);
  await rm(koren, { recursive: true, force: true });
  await zapis(join(koren, 'layout.tsx'), layout(lang));

  await zapis(join(koren, seg(m.home), 'page.tsx'), page('HomePage', lang, 'home'));
  await zapis(join(koren, seg(m.blog), 'page.tsx'), asyncPage('BlogIndexPage', lang, 'blog'));
  await zapis(join(koren, seg(m.blog), '[slug]', 'page.tsx'), article(lang, m.blog));
  await zapis(join(koren, seg(m.pricing), 'page.tsx'), page('PricingPage', lang, 'pricing'));
  await zapis(join(koren, seg(m.cases), 'page.tsx'), asyncPage('CasesPage', lang, 'cases'));
  await zapis(join(koren, seg(m.cases), '[slug]', 'page.tsx'), caseStudy(lang, m.cases));
  await zapis(join(koren, seg(m.about), 'page.tsx'), page('AboutPage', lang, 'about'));
  await zapis(join(koren, seg(m.contact), 'page.tsx'), page('ContactPage', lang, 'contact'));
  await zapis(join(koren, seg(m.partner), 'page.tsx'), page('PartnerPage', lang, 'partner'));
  await zapis(join(koren, seg(m.demo), 'page.tsx'), page('DemoPage', lang, 'demo'));
  await zapis(
    join(koren, seg(m.shopifyGuide), 'page.tsx'),
    page('ShopifyGuidePage', lang, 'shopifyGuide')
  );

  for (const key of ['thanks', 'privacy', 'terms', 'shoptet']) {
    const zaznam = m[key];
    if (!zaznam) continue;
    const [url, file, eyebrow] = zaznam;
    await zapis(join(koren, seg(url), 'page.tsx'), legal(lang, file, key, eyebrow, key === 'thanks'));
  }
}

console.log('route subory vygenerovane');
