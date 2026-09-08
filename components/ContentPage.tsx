import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { contentDir, type Lang } from '@/lib/i18n';
import { breadcrumbs, webPage } from '@/lib/schema';
import { readDoc } from '@/lib/markdown';

type Props = {
  /** Súbor v content/stranky/ bez prípony. */
  file: string;
  eyebrow: string;
  /** Bez CTA pásu (napr. ďakovacia stránka). */
  hideCta?: boolean;
  lang?: Lang;
  /** Adresa stránky — pre štruktúrované dáta. */
  url?: string;
};

/** Statická textová stránka (VOP, GDPR, ďakujeme) z markdownu. */
export default async function ContentPage({ file, eyebrow, hideCta, lang = 'sk', url }: Props) {
  const doc = await readDoc(`${contentDir[lang]}stranky/${file}.md`);

  return (
    <>
      {url && (
        <JsonLd
          graf={[
            webPage({ lang, url, title: doc.title, description: doc.perex }),
            breadcrumbs(lang, [{ name: doc.title, url }]),
          ]}
        />
      )}
      <TopBar lang={lang} />
      <PageHero eyebrow={eyebrow} title={doc.title} />

      <section className="section">
        <div className="container article">
          <div>
            {doc.perex && <p className="article__perex">{doc.perex}</p>}
            <div className="prose prose--legal" dangerouslySetInnerHTML={{ __html: doc.html }} />
          </div>
        </div>
      </section>

      {!hideCta && <CtaBand lang={lang} />}
      <SiteFooter lang={lang} />
    </>
  );
}
