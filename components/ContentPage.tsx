import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { contentDir, type Lang } from '@/lib/i18n';
import { readDoc } from '@/lib/markdown';

type Props = {
  /** Súbor v content/stranky/ bez prípony. */
  file: string;
  eyebrow: string;
  /** Bez CTA pásu (napr. ďakovacia stránka). */
  hideCta?: boolean;
  lang?: Lang;
};

/** Statická textová stránka (VOP, GDPR, ďakujeme) z markdownu. */
export default async function ContentPage({ file, eyebrow, hideCta, lang = 'sk' }: Props) {
  const doc = await readDoc(`${contentDir[lang]}stranky/${file}.md`);

  return (
    <>
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
