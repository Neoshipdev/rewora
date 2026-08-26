import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { contact as contactData, demoCta as demoCtaData } from '@/lib/content';
import { altOf, routes, type Lang } from '@/lib/i18n';
import { createT, tDeep } from '@/lib/t';

/** Kontakt — spoločná stránka pre všetky jazykové mutácie. */
export default function ContactPage({ lang }: { lang: Lang }) {
  const t = createT(lang);
  const contact = tDeep(contactData, lang);
  const demoCta = tDeep(demoCtaData, lang);
  const { person, general, company } = contact;

  return (
    <>
      <TopBar lang={lang} alt={altOf('contact')} />
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
                  {t('Napísať e-mail')}
                </a>
                <a className="btn btn--outline-dark" href={routes.demo[lang] ?? demoCta.href}>
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

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
