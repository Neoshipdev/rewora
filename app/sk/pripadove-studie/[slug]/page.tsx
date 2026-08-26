import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { caseAssets } from '@/lib/assets';
import { readDoc } from '@/lib/markdown';
import { caseStudies, caseStudyFile } from '@/lib/posts';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const file = caseStudyFile(params.slug);
  if (!file) return {};
  const doc = await readDoc(`pripadove-studie/${file}.md`);
  return {
    title: `${doc.title} ★ Rewora`,
    description: doc.perex,
    alternates: { canonical: `/sk/pripadove-studie/${params.slug}/` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const file = caseStudyFile(params.slug);
  if (!file) notFound();
  const doc = await readDoc(`pripadove-studie/${file}.md`);
  const assets = caseAssets[file];

  return (
    <>
      <TopBar />
      <PageHero
        eyebrow="Prípadová štúdia"
        title={doc.title}
        back={{ label: 'Späť na prípadové štúdie', href: '/sk/pripadove-studie/' }}
      >
        {assets && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className="page-hero__logo" src={assets.logo} alt="Logo klienta" />
        )}
        {doc.category && <div className="page-hero__meta">{doc.category}</div>}
      </PageHero>

      <section className="section">
        <div className="container article">
          <div>
            {doc.perex && <p className="article__perex">{doc.perex}</p>}
            <div className="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />
          </div>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </>
  );
}
