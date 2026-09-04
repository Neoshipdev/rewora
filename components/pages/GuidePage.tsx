import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { contact as contactData } from '@/lib/content';
import type { GuideSection } from '@/lib/guides';
import { altOf, type Lang, type RouteKey } from '@/lib/i18n';
import { createT, tDeep } from '@/lib/t';

export type Guide = {
  eyebrow: string;
  title: string;
  lead: string;
  video: { src: string; caption: string };
  sections: GuideSection[];
  warning: { title: string; text: string };
  cta: { title: string; text: string };
};

/** Telo návodu — spoločné pre Shopify aj Shoptet vo všetkých jazykoch. */
export default function GuidePage({
  lang,
  guide,
  routeKey,
}: {
  lang: Lang;
  guide: Guide;
  routeKey: RouteKey;
}) {
  const t = createT(lang);
  const navod = tDeep(guide, lang);
  const { person } = tDeep(contactData, lang);

  return (
    <>
      <TopBar lang={lang} alt={altOf(routeKey)} />
      <PageHero eyebrow={navod.eyebrow} title={navod.title} lead={navod.lead} />

      <section className="section">
        <div className="container">
          <figure className="guide-video">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video src={navod.video.src} controls preload="metadata" playsInline />
            <figcaption>{navod.video.caption}</figcaption>
          </figure>

          <div className="guide">
            {navod.sections.map((section) => {
              const Zoznam = section.ordered ? 'ol' : 'ul';
              return (
                <section className="guide__step" key={section.num}>
                  <span className="guide__num">{section.num}</span>
                  <div className="guide__body">
                    <h2 className="guide__title">{section.title}</h2>
                    {section.intro && <p className="guide__intro">{section.intro}</p>}
                    <Zoznam className="guide__list">
                      {section.steps.map((step) => (
                        <li key={step.text}>
                          {step.text}
                          {step.items && (
                            <ul className="guide__sublist">
                              {step.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </Zoznam>
                    {section.outro && <p className="guide__outro">{section.outro}</p>}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="guide-warning">
            <span className="guide-warning__title">{navod.warning.title}</span>
            <p>{navod.warning.text}</p>
          </div>

          <div className="guide-help">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="partner__photo" src={person.photo} alt={person.name} />
            <div>
              <h2 className="h2" style={{ maxWidth: 560 }}>
                {navod.cta.title}
              </h2>
              <p className="partner__contact-text">{navod.cta.text}</p>
              <div className="partner__contact-actions">
                <a className="btn btn--orange" href={`mailto:${person.email}`}>
                  {t('Napísať e-mail')}
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
        </div>
      </section>

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
