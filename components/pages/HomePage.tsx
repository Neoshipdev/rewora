import AdminPanel from '@/components/AdminPanel';
import AdminTabs from '@/components/AdminTabs';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import IntegrationGrid from '@/components/IntegrationGrid';
import SiteFooter from '@/components/SiteFooter';
import Stars from '@/components/Stars';
import Testimonials from '@/components/Testimonials';
import ToolsSection from '@/components/ToolsSection';
import TopBar from '@/components/TopBar';
import VideoButton from '@/components/VideoButton';
import { clientLogos } from '@/lib/assets';
import { hero as heroData, numbers as numbersData } from '@/lib/content';
import {
  adminPanelSection as adminPanelData,
  integrationsIntro as integrationsIntroData,
} from '@/lib/features';
import { home, routes, type Lang } from '@/lib/i18n';
import { faqPage, organization, softwareApplication, website } from '@/lib/schema';
import { createT, tDeep } from '@/lib/t';

export default function HomePage({ lang }: { lang: Lang }) {
  const t = createT(lang);
  const hero = tDeep(heroData, lang);
  const numbers = tDeep(numbersData, lang);
  const adminPanelSection = tDeep(adminPanelData, lang);

  return (
    <>
      <JsonLd
        graf={[
          organization(lang),
          website(lang),
          softwareApplication(lang),
          faqPage(lang, home[lang]),
        ]}
      />
      <TopBar lang={lang} />

      {/* Split hero */}
      <section className="hero">
        <div className="hero__left">
          <div className="hero__copy">
            <span className="eyebrow hero__eyebrow">{hero.eyebrow}</span>
            <h1>
              {hero.titleLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < hero.titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="hero__lead">{hero.lead}</p>
            <div className="hero__actions">
              {/* „Vyskúšať teraz" mieri na cenník — v jazyku, v ktorom sa web číta */}
              <a className="btn btn--dark" href={routes.pricing[lang] ?? hero.primary.href}>
                {hero.primary.label}
              </a>
              <VideoButton lang={lang} />
            </div>
            <div className="hero__rating">
              <Stars value={5} size={18} emptyColor="#fff" lang={lang} />
              <span>{hero.rating}</span>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__photo" src="/images/image-1787143637388.webp" alt="" />
        </div>

        <div className="hero__right">
          <AdminPanel lang={lang} />
        </div>
      </section>

      {/* Číselný pás */}
      <section className="numbers">
        <div className="container">
          <div className="numbers__grid">
            {numbers.map((item) => (
              <div key={item.value} className="numbers__cell">
                <span className="numbers__value">{item.value}</span>
                <span className="numbers__label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Značky, ktoré nám dôverujú */}
      <div className="container">
        <div className="logos">
          <p className="logos__label">{t('Značky, ktoré nám dôverujú')}</p>
          <div className="logos__row">
            {clientLogos.map((logo) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={logo.name}
                className={`logos__img ${'tall' in logo && logo.tall ? 'logos__img--tall' : ''}`}
                src={logo.src}
                alt={`${logo.name} logo`}
              />
            ))}
          </div>
        </div>
      </div>

      <ToolsSection lang={lang} />

      {/* Referencie */}
      <section className="container" style={{ paddingBottom: 24 }}>
        <Testimonials lang={lang} />
      </section>

      {/* Administrátorský panel */}
      <section className="section admin-section">
        <div className="container">
          <span className="eyebrow">{adminPanelSection.eyebrow}</span>
          <h2 className="h2" style={{ maxWidth: 820, marginTop: 8 }}>
            {adminPanelSection.title}
          </h2>
          <p className="admin-section__lead">{adminPanelSection.lead}</p>
          <AdminTabs lang={lang} />
        </div>
      </section>

      {/* Integrácie */}
      <section className="section integrations" id="integration">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            {t('Integrácie')}
          </span>
          <h2 className="h2" style={{ maxWidth: 720, marginTop: 8 }}>
            {t('Jednoduchá a rýchla integrácia')}
          </h2>
          <p style={{ maxWidth: 640, marginTop: 14, fontSize: 16.1, color: 'var(--ink-600)' }}>
            {t(integrationsIntroData)}
          </p>
          <IntegrationGrid lang={lang} />
        </div>
      </section>

      <Faq lang={lang} />

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
