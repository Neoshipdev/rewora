import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import IntegrationGrid from '@/components/IntegrationGrid';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import ToolsSection from '@/components/ToolsSection';
import TopBar from '@/components/TopBar';
import { featuresIntro, integrationsIntro } from '@/lib/features';
import { altOf, routes, ui, type Lang } from '@/lib/i18n';
import { breadcrumbs, softwareApplication, webPage } from '@/lib/schema';
import { createT } from '@/lib/t';

/** Funkcie — osem nástrojov z homepage na samostatnej stránke. */
export default function FeaturesPage({ lang }: { lang: Lang }) {
  const t = createT(lang);

  const url = routes.features[lang]!;

  return (
    <>
      <JsonLd
        graf={[
          webPage({ lang, url, title: t(featuresIntro.title), description: t(featuresIntro.lead) }),
          softwareApplication(lang),
          breadcrumbs(lang, [{ name: ui[lang].nav.features, url }]),
        ]}
      />
      <TopBar lang={lang} alt={altOf('features')} />
      <PageHero
        eyebrow={t(featuresIntro.eyebrow)}
        title={t(featuresIntro.title)}
        lead={t(featuresIntro.lead)}
      />

      <ToolsSection lang={lang} withHeading={false} />

      <section className="section integrations" id="integration">
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
