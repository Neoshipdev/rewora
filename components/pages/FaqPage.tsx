import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { altOf, routes, ui, type Lang } from '@/lib/i18n';
import { breadcrumbs, faqPage } from '@/lib/schema';
import { createT } from '@/lib/t';

/** Často kladené otázky — samostatná stránka, tie isté otázky ako na homepage. */
export default function FaqPage({ lang }: { lang: Lang }) {
  const t = createT(lang);

  const url = routes.faq[lang]!;

  return (
    <>
      <JsonLd
        graf={[faqPage(lang, url), breadcrumbs(lang, [{ name: ui[lang].footer.faq, url }])]}
      />
      <TopBar lang={lang} alt={altOf('faq')} />
      <PageHero
        eyebrow="FAQ"
        title={t('Často kladené otázky')}
        lead={t(
          'Odpovede na to, čo sa nás pýtate najčastejšie — od zbierania recenzií cez integrácie až po povinnosti e-shopov pri zverejňovaní hodnotení.'
        )}
      />

      <Faq lang={lang} withHeading={false} />

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
