import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { caseAssets } from '@/lib/assets';
import { altOf, routes, ui, type Lang } from '@/lib/i18n';
import { readDoc } from '@/lib/markdown';
import { caseStudyRef } from '@/lib/posts';
import { createT } from '@/lib/t';

/** Jedna prípadová štúdia — spoločná pre všetky jazykové mutácie. */
export default async function CasePage({ lang, slug }: { lang: Lang; slug: string }) {
  const ref = caseStudyRef(slug, lang);
  if (!ref) notFound();
  const doc = await readDoc(`${ref.file}.md`);
  const assets = caseAssets[ref.key];
  const t = createT(lang);

  return (
    <>
      <TopBar lang={lang} alt={altOf('cases')} />
      <PageHero
        eyebrow={t('Prípadová štúdia')}
        title={doc.title}
        back={{ label: ui[lang].back.cases, href: routes.cases[lang] ?? '/' }}
      >
        {assets && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className="page-hero__logo" src={assets.logo} alt={t('Logo klienta')} />
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

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
