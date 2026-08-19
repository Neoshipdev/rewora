import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { contact, demoCta } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Kontakt ★ Rewora',
  description:
    'Ozvite sa nám — poradíme s nasadením Rewory, pripravíme ukážku na vašom e-shope alebo prejdeme cenník.',
  alternates: { canonical: '/sk/kontakt/' },
};

export default function KontaktPage() {
  const { person, general, company } = contact;

  return (
    <>
      <TopBar />
      <PageHero eyebrow={contact.eyebrow} title={contact.title} lead={contact.lead} />

      <section className="section">
        <div className="container contact">
          <div className="contact__card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="contact__photo" src={person.photo} alt={person.name} />
            <div className="contact__person">
              <span className="contact__name">{person.name}</span>
              <span className="contact__role">{person.role}</span>
              <a className="contact__link" href={person.phoneHref}>
                {person.phone}
              </a>
              <a className="contact__link" href={`mailto:${person.email}`}>
                {person.email}
              </a>
              <div className="contact__actions">
                <a className="btn btn--orange" href={`mailto:${person.email}`}>
                  Napísať e-mail
                </a>
                <a className="btn btn--outline-dark" href={demoCta.href}>
                  {demoCta.shortLabel}
                </a>
              </div>
            </div>
          </div>

          <div className="contact__side">
            <div className="contact__box">
              <span className="contact__box-title">{general.title}</span>
              <a className="contact__link" href={`mailto:${general.email}`}>
                {general.email}
              </a>
            </div>

            <div className="contact__box">
              <span className="contact__box-title">{company.title}</span>
              <address className="contact__address">
                <b>{company.name}</b>
                <span>{company.address}</span>
                <span>{company.ico}</span>
                <span className="contact__registration">{company.registration}</span>
              </address>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </>
  );
}
