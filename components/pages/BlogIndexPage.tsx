import BlogList from '@/components/BlogList';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { altOf, routes, ui, type Lang } from '@/lib/i18n';
import { getBlogIndex } from '@/lib/posts';
import { createT } from '@/lib/t';

/** Prehľad článkov — spoločný pre všetky jazykové mutácie. */
export default async function BlogIndexPage({ lang }: { lang: Lang }) {
  const posts = await getBlogIndex(lang);
  const t = createT(lang);

  return (
    <>
      <TopBar lang={lang} alt={altOf('blog')} />
      <PageHero
        eyebrow={ui[lang].nav.blog}
        title={t('Recenzie, sociálny dôkaz a e-commerce v praxi')}
        lead={t(
          'Budujte dôveru u vašich zákazníkov a merateľne zvýšte konverzný pomer vášho e‑shopu jednoducho na pár klikov.'
        )}
      />

      <section className="section">
        <div className="container">
          <BlogList
            posts={posts}
            base={routes.blog[lang] ?? '/'}
            locale={lang}
            texts={{ all: t('Všetky články'), filter: t('Filtrovať podľa kategórie') }}
          />
        </div>
      </section>

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
