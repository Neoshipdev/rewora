import CtaBand from '@/components/CtaBand';
import IntegrationGrid from '@/components/IntegrationGrid';
import PageHero from '@/components/PageHero';
import PricingPlans from '@/components/PricingPlans';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { integrationsIntro } from '@/lib/features';
import { altOf, ui, type Lang } from '@/lib/i18n';
import { createT } from '@/lib/t';

/** Cenník — spoločný pre všetky jazykové mutácie. */
export default function PricingPage({ lang }: { lang: Lang }) {
  const t = createT(lang);

  return (
    <>
      <TopBar lang={lang} alt={altOf('pricing')} />
      <PageHero
        eyebrow={ui[lang].nav.pricing}
        title={t('Vyberte si balík, ktorý sedí vášmu e-shopu')}
        lead={t(
          'Začnite zadarmo a rozšírte sa vtedy, keď to dáva zmysel. Všetky balíky obsahujú widgety, ktoré presvedčia zákazníka priamo na karte produktu.'
        )}
      />

      <section className="section">
        <div className="container">
          <PricingPlans lang={lang} />
        </div>
      </section>

      <section className="section integrations">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            {t('Integrácie')}
          </span>
          <h2 className="h2" style={{ maxWidth: 720, marginTop: 8 }}>
            {t('Jednoduchá a rýchla integrácia')}
          </h2>
          <p style={{ maxWidth: 640, marginTop: 14, fontSize: 16.1, color: 'var(--ink-600)' }}>
            {t(integrationsIntro)}
          </p>
          <IntegrationGrid lang={lang} />
        </div>
      </section>

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
