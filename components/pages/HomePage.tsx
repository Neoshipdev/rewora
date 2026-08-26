import AdminPanel from '@/components/AdminPanel';
import AdminTabs from '@/components/AdminTabs';
import AiSummary from '@/components/AiSummary';
import BiCard from '@/components/BiCard';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import HotspotStage from '@/components/HotspotStage';
import IntegrationGrid from '@/components/IntegrationGrid';
import SiteFooter from '@/components/SiteFooter';
import Stars from '@/components/Stars';
import Testimonials from '@/components/Testimonials';
import TopBar from '@/components/TopBar';
import ForumThread from '@/components/ForumThread';
import GoogleShopping from '@/components/GoogleShopping';
import ReviewsWidget from '@/components/ReviewsWidget';
import SmartSearch from '@/components/SmartSearch';
import VideoReviews from '@/components/VideoReviews';
import VideoButton from '@/components/VideoButton';
import { subfeatureIcons } from '@/components/icons';
import { clientLogos, hotspotVisual } from '@/lib/assets';
import { hero as heroData, numbers as numbersData } from '@/lib/content';
import {
  adminPanelSection as adminPanelData,
  features as featuresData,
  featuresIntro as featuresIntroData,
  integrationsIntro as integrationsIntroData,
} from '@/lib/features';
import { routes, type Lang } from '@/lib/i18n';
import { hotspots as hotspotsData } from '@/lib/panel-data';
import { createT, tDeep } from '@/lib/t';

/** Text odrážky s voliteľne zvýraznenou časťou. */
function Zvyraznene({ text, cast }: { text: string; cast?: string }) {
  if (!cast || !text.includes(cast)) return <>{text}</>;
  const [pred, ...zvysok] = text.split(cast);
  return (
    <>
      {pred}
      <strong className="subfeature__mark">{cast}</strong>
      {zvysok.join(cast)}
    </>
  );
}

/** Ukážka vpravo v riadku nástroja — podľa dizajnu 1c. */
function ToolDemo({ num, lang }: { num: string; lang: Lang }) {
  const hotspots = tDeep(hotspotsData, lang);

  if (num === '01') {
    return (
      <div className="tool-row__demo demo demo--widget">
        <ReviewsWidget lang={lang} />
      </div>
    );
  }
  if (num === '02') {
    return (
      <div className="tool-row__demo demo demo--widget">
        <VideoReviews lang={lang} />
      </div>
    );
  }
  if (num === '03') {
    return (
      <div className="tool-row__demo demo demo--widget">
        <GoogleShopping lang={lang} />
      </div>
    );
  }
  if (num === '04') {
    return (
      <div className="tool-row__demo demo demo--thread">
        <ForumThread showStrip={false} lang={lang} />
      </div>
    );
  }
  if (num === '05') {
    return (
      <div className="tool-row__demo demo demo--widget">
        <AiSummary lang={lang} />
      </div>
    );
  }
  if (num === '06') {
    return (
      <div className="tool-row__demo">
        <HotspotStage
          height={220}
          caption={hotspots.caption}
          image={hotspotVisual}
          dots={[
            { left: '28%', top: '40%' },
            { left: '66%', top: '28%' },
          ]}
          bubble={hotspots.bubble}
          bubbleWidth={210}
          lang={lang}
        />
      </div>
    );
  }
  if (num === '08') {
    return (
      <div className="tool-row__demo demo demo--widget">
        <SmartSearch lang={lang} />
      </div>
    );
  }
  return (
    <div className="tool-row__demo demo demo--bi">
      <BiCard compact lang={lang} />
    </div>
  );
}

export default function HomePage({ lang }: { lang: Lang }) {
  const t = createT(lang);
  const hero = tDeep(heroData, lang);
  const numbers = tDeep(numbersData, lang);
  const features = tDeep(featuresData, lang);
  const featuresIntro = tDeep(featuresIntroData, lang);
  const adminPanelSection = tDeep(adminPanelData, lang);

  return (
    <>
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
              <a className="btn btn--dark" href={routes.demo[lang] ?? hero.primary.href}>
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

      {/* Nástroje — numerované riadky s pôvodnými textami */}
      <section className="section" id="features">
        <div className="container container--tools">
          <div className="tools__head">
            <span className="eyebrow">{featuresIntro.eyebrow}</span>
            <h2 className="h2">{featuresIntro.title}</h2>
            <p style={{ maxWidth: 720, marginTop: 6, fontSize: 16.1, color: 'var(--ink-600)' }}>
              {featuresIntro.lead}
            </p>
          </div>

          {features.map((feature) => (
            <div
              className={`tool-row ${Number(feature.num) % 2 === 0 ? 'tool-row--tint' : ''}`}
              key={feature.num}
            >
              <span className="tool-row__num">{feature.num}</span>
              <div className="tool-row__copy">
                <h3 className="tool-row__name">{feature.name}</h3>
                {feature.short && <p className="tool-row__text">{feature.short}</p>}
                <p className="tool-row__long">{feature.long}</p>
              </div>
              <ToolDemo num={feature.num} lang={lang} />
              <div className={`subfeatures subfeatures--${feature.items.length}`}>
                {feature.items.map((item) => {
                  const Icon = subfeatureIcons[item.icon];
                  return (
                    <div className="subfeature" key={item.title}>
                      <span className="subfeature__icon" aria-hidden>
                        <Icon size={26} />
                      </span>
                      <span className="subfeature__title">{item.title}</span>
                      <span className="subfeature__text">
                        <Zvyraznene text={item.text} cast={item.highlight} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

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
