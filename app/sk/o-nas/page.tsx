import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { about, contact } from '@/lib/content';

export const metadata: Metadata = {
  title: 'O nás ★ Rewora',
  description:
    'Rewora je slovenská SaaS platforma pre zákaznícku skúsenosť. Na trhu od roku 2023, používa ju viac než 100 domén na Slovensku a v Česku.',
  alternates: { canonical: '/sk/o-nas/' },
};

export default function ONasPage() {
  const { person } = contact;

  return (
    <>
      <TopBar />
      <PageHero eyebrow={about.eyebrow} title={about.title} lead={about.lead} />

      <section className="numbers">
        <div className="container">
          <div className="numbers__grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {about.facts.map((fact) => (
              <div key={fact.label} className="numbers__cell">
                <span className="numbers__value">{fact.value}</span>
                <span className="numbers__label">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about__story">
          <h2 className="h2">{about.story.title}</h2>
          <div className="about__text">
            {about.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section integrations" style={{ paddingTop: 0, paddingBottom: 72 }}>
        <div className="container" style={{ paddingTop: 72 }}>
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            {about.market.title}
          </span>
          <p style={{ maxWidth: 640, marginTop: 14, fontSize: 17, color: 'var(--ink-600)' }}>
            {about.market.intro}
          </p>
          <div className="about__market">
            {about.market.items.map((item) => (
              <div key={item.label} className="about__market-item">
                <span className="about__market-value">{item.value}</span>
                <span className="about__market-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about__story">
          <h2 className="h2">{about.team.title}</h2>
          <div className="about__text">
            {about.team.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="about__roles">
              {about.team.roles.map((role) => (
                <li key={role.role}>
                  <b>{role.count}</b> {role.role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section admin-section">
        <div className="container">
          <span className="eyebrow">Roadmapa</span>
          <h2 className="h2" style={{ maxWidth: 760, marginTop: 8 }}>
            {about.future.title}
          </h2>
          <div className="about__future">
            {about.future.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
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
              {about.cta.title}
            </h2>
            <p className="partner__contact-text">{about.cta.text}</p>
            <div className="partner__contact-actions">
              <a className="btn btn--orange" href={`mailto:${person.email}`}>
                {person.email}
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

      <CtaBand />
      <SiteFooter />
    </>
  );
}
