import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { contact as contactData, partner as partnerData } from '@/lib/content';
import { altOf, type Lang } from '@/lib/i18n';
import { tDeep } from '@/lib/t';

/** Partnerský program — spoločná stránka pre všetky jazykové mutácie. */
export default function PartnerPage({ lang }: { lang: Lang }) {
  const partner = tDeep(partnerData, lang);
  const { person } = tDeep(contactData, lang);

  return (
    <>
      <TopBar lang={lang} alt={altOf('partner')} />
      <PageHero
        eyebrow={partner.eyebrow}
        title={partner.title}
        lead={partner.lead}
        image={partner.image}
      />

      <section className="section">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            {partner.audience.title}
          </span>
          <div className="integrations__grid" style={{ marginTop: 24 }}>
            {partner.audience.items.map((item) => (
              <div key={item.title} className="integration">
                <h2 className="integration__name">{item.title}</h2>
                <p className="integration__text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            {partner.steps.title}
          </span>
          <div className="partner__steps">
            {partner.steps.items.map((step) => (
              <div key={step.num} className="partner__step">
                <span className="partner__num">{step.num}</span>
                <h2 className="partner__step-title">{step.title}</h2>
                <p className="partner__step-text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section integrations">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            {partner.benefits.title}
          </span>
          <div className="partner__benefits">
            {partner.benefits.items.map((item) => (
              <div key={item.title} className="partner__benefit">
                <h2 className="partner__benefit-title">{item.title}</h2>
                <p className="partner__benefit-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container partner__contact">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="partner__photo" src={person.photo} alt={person.name} />
          <div>
            <h2 className="h2" style={{ maxWidth: 560 }}>
              {partner.cta.title}
            </h2>
            <p className="partner__contact-text">{partner.cta.text}</p>
            <div className="partner__contact-actions">
              <a
                className="btn btn--orange"
                href={`mailto:${person.email}?subject=Partnersk%C3%BD%20program`}
              >
                {partner.cta.button}
              </a>
              <a className="btn btn--outline-dark" href={person.phoneHref}>
                {person.phone}
              </a>
            </div>
            <p className="partner__contact-person">
              <b>{person.name}</b> · {person.role}
            </p>
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
