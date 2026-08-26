import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { authorPhotos } from '@/lib/assets';
import { altOf, contentDir, routes, ui, type Lang } from '@/lib/i18n';
import { listSlugs, readDoc } from '@/lib/markdown';

/** Cesta k článku v danom jazyku. */
export const blogDir = (lang: Lang) => `${contentDir[lang]}blog`;

/** Jeden článok blogu — spoločný pre všetky jazykové mutácie. */
export default async function ArticlePage({ lang, slug }: { lang: Lang; slug: string }) {
  const slugs = await listSlugs(blogDir(lang));
  if (!slugs.includes(slug)) notFound();
  const doc = await readDoc(`${blogDir(lang)}/${slug}.md`);

  /* Časť článkov má rovnakú fotografiu aj v texte — vtedy vrchnú vynecháme,
     aby sa hneď pod sebou nezobrazila dvakrát. */
  const nahlad = doc.thumb?.split('/').pop()?.split('.format')[0] ?? '';
  const jeVTexte = nahlad ? doc.html.includes(nahlad) : false;

  return (
    <>
      <TopBar lang={lang} alt={altOf('blog')} />
      <PageHero
        eyebrow={doc.category ?? ui[lang].nav.blog}
        title={doc.title}
        back={{ label: ui[lang].back.blog, href: routes.blog[lang] ?? '/' }}
      >
        <div className="page-hero__meta">
          {doc.author && (
            <span className="page-hero__author">
              {authorPhotos[doc.author] && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img className="page-hero__avatar" src={authorPhotos[doc.author]} alt="" />
              )}
              {doc.author}
            </span>
          )}
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

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
