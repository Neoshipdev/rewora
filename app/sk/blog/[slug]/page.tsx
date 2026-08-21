import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { listSlugs, readDoc } from '@/lib/markdown';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await listSlugs('blog');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugs = await listSlugs('blog');
  if (!slugs.includes(params.slug)) return {};
  const doc = await readDoc(`blog/${params.slug}.md`);
  return {
    title: `${doc.title} ★ Rewora`,
    description: doc.perex,
    alternates: { canonical: `/sk/blog/${params.slug}/` },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const slugs = await listSlugs('blog');
  if (!slugs.includes(params.slug)) notFound();
  const doc = await readDoc(`blog/${params.slug}.md`);

  /* Časť článkov má rovnakú fotografiu aj v texte — vtedy vrchnú vynecháme,
     aby sa hneď pod sebou nezobrazila dvakrát. */
  const nahlad = doc.thumb?.split('/').pop()?.split('.format')[0] ?? '';
  const jeVTexte = nahlad ? doc.html.includes(nahlad) : false;

  return (
    <>
      <TopBar />
      <PageHero
        eyebrow={doc.category ?? 'Blog'}
        title={doc.title}
        back={{ label: 'Späť na blog', href: '/sk/blog/' }}
      >
        <div className="page-hero__meta">
          {doc.author && <span>{doc.author}</span>}
          {doc.date && <span>{doc.date}</span>}
        </div>
      </PageHero>

      <section className="section">
        <div className="container article">
          <div>
            {doc.thumb && !jeVTexte && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img className="article__cover" src={doc.thumb} alt={doc.title} />
            )}
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
