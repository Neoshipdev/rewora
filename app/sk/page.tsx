import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/sk/' },
};

import AdminPanel from '@/components/AdminPanel';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import HotspotStage from '@/components/HotspotStage';
import SiteFooter from '@/components/SiteFooter';
import Stars from '@/components/Stars';
import Testimonials from '@/components/Testimonials';
import TopBar from '@/components/TopBar';
import ForumThread from '@/components/ForumThread';
import GoogleShopping from '@/components/GoogleShopping';
import ReviewsWidget from '@/components/ReviewsWidget';
import VideoReviews from '@/components/VideoReviews';
import VideoButton from '@/components/VideoButton';
import { biIcons, subfeatureIcons } from '@/components/icons';
import { adminShots, clientLogos, hotspotVisual, integrationShots } from '@/lib/assets';
import { hero, integrations, numbers } from '@/lib/content';
import { adminPanelSection, features, featuresIntro, integrationsIntro } from '@/lib/features';
import { biRowMetrics, hotspots } from '@/lib/panel-data';

/** Ukážka vpravo v riadku nástroja — podľa dizajnu 1c. */
function ToolDemo({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="tool-row__demo demo demo--widget">
        <ReviewsWidget />
        <div className="demo__gshop">
          <span className="demo__gshop-title">Foto a video recenzie</span>
          <VideoReviews />
        </div>
        <div className="demo__gshop">
          <span className="demo__gshop-title">Hviezdičky v Google Shopping</span>
          <GoogleShopping />
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="tool-row__demo demo demo--thread">
        <ForumThread showStrip={false} />
      </div>
    );
  }
  if (index === 2) {
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
        />
      </div>
    );
  }
  return (
    <div className="tool-row__demo demo demo--bi">
      {biRowMetrics.map((metric) => {
        const Icon = biIcons[metric.icon];
        return (
          <div key={metric.label} className="metric">
            <span className="metric__icon">
              <Icon size={20} />
            </span>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="metric__value">{metric.value}</span>
              <span className="metric__label">{metric.label}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <TopBar />

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
              <a className="btn btn--dark" href={hero.primary.href}>
                {hero.primary.label}
              </a>
              <VideoButton />
            </div>
            <div className="hero__rating">
              <Stars value={5} size={18} emptyColor="#fff" />
              <span>{hero.rating}</span>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__photo" src="/images/image-1787143637388.webp" alt="" />
        </div>

        <div className="hero__right">
          <AdminPanel />
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
          <p className="logos__label">Značky, ktoré nám dôverujú</p>
          <div className="logos__row">
            {clientLogos.map((logo) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={logo.name} className="logos__img" src={logo.src} alt={`${logo.name} logo`} />
            ))}
          </div>
        </div>
      </div>

      {/* Nástroje — numerované riadky s pôvodnými textami */}
      <section className="section" id="features">
        <div className="container">
          <div className="tools__head">
            <span className="eyebrow">{featuresIntro.eyebrow}</span>
            <h2 className="h2">{featuresIntro.title}</h2>
            <p style={{ maxWidth: 720, marginTop: 6, fontSize: 17, color: 'var(--ink-600)' }}>
              {featuresIntro.lead}
            </p>
          </div>

          {features.map((feature, i) => (
            <div className="tool-row" key={feature.num}>
              <span className="tool-row__num">{feature.num}</span>
              <div className="tool-row__copy">
                <h3 className="tool-row__name">{feature.name}</h3>
                <p className="tool-row__text">{feature.short}</p>
                <p className="tool-row__long">{feature.long}</p>
              </div>
              <ToolDemo index={i} />
              <div className="subfeatures">
                {feature.items.map((item) => {
                  const Icon = subfeatureIcons[item.icon];
                  return (
                    <div className="subfeature" key={item.title}>
                      <span className="subfeature__icon" aria-hidden>
                        <Icon size={26} />
                      </span>
                      <span className="subfeature__title">{item.title}</span>
                      <span className="subfeature__text">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Referencie */}
      <section className="container" style={{ paddingBottom: 72 }}>
        <Testimonials />
      </section>

      {/* Administrátorský panel */}
      <section className="section admin-section">
        <div className="container">
          <span className="eyebrow">{adminPanelSection.eyebrow}</span>
          <h2 className="h2" style={{ maxWidth: 820, marginTop: 8 }}>
            {adminPanelSection.title}
          </h2>
          <p className="admin-section__lead">{adminPanelSection.lead}</p>
          <div className="admin-shots">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="admin-shots__main"
              src={adminShots.dashboard.src}
              alt={adminShots.dashboard.alt}
              loading="lazy"
            />
            <div className="admin-shots__side">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={adminShots.reviews.src} alt={adminShots.reviews.alt} loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={adminShots.manage.src} alt={adminShots.manage.alt} loading="lazy" />
            </div>
          </div>
          <div className="admin-section__grid">
            {adminPanelSection.items.map((item, i) => (
              <div className="admin-section__item" key={item.title}>
                <span className="admin-section__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="admin-section__title">{item.title}</span>
                <span className="admin-section__text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrácie */}
      <section className="section integrations" id="integration">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            Integrácie
          </span>
          <h2 className="h2" style={{ maxWidth: 720, marginTop: 8 }}>
            Jednoduchá a rýchla integrácia
          </h2>
          <p style={{ maxWidth: 640, marginTop: 14, fontSize: 17, color: 'var(--ink-600)' }}>
            {integrationsIntro}
          </p>
          <div className="integrations__grid">
            {integrations.map((item) => {
              const shot = integrationShots[item.name];
              return (
                <div key={item.name} className="integration">
                  {shot && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img className="integration__img" src={shot.src} alt={shot.alt} loading="lazy" />
                  )}
                  <span className="integration__num">{item.num}</span>
                  <h3 className="integration__name">{item.name}</h3>
                  <p className="integration__text">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Faq />

      <CtaBand />
      <SiteFooter />
    </>
  );
}
