import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { altOf, routes, ui, type Lang } from '@/lib/i18n';
import { getCaseStudies } from '@/lib/posts';
import { createT, tDeep } from '@/lib/t';

const bandStats = [
  { value: '9 z 10', label: 'zákazníkov si pred kúpou prečíta recenzie' },
  { value: '270 %', label: 'vyššia šanca predať produkt s 5+ recenziami' },
  { value: '+15 %', label: 'nárast konverzného pomeru' },
  { value: '380 %', label: 'drahšie produkty s recenziami sa kupujú častejšie' },
];

/** Prehľad prípadových štúdií — spoločný pre všetky jazykové mutácie. */
export default async function CasesPage({ lang }: { lang: Lang }) {
  const studies = await getCaseStudies(lang);
  const t = createT(lang);
  const stats = tDeep(bandStats, lang);
  const base = routes.cases[lang] ?? '/';

  return (
    <>
      <TopBar lang={lang} alt={altOf('cases')} />
      <PageHero
        eyebrow={ui[lang].nav.cases}
        title={t('Ako naši zákazníci rastú s Rewora')}
        lead={t(
          'Budujte dôveru u vašich zákazníkov a merateľne zvýšte konverzný pomer vášho webu jednoducho na pár klikov.'
        )}
      />

      <section className="numbers">
        <div className="container">
          <div className="numbers__grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {stats.map((stat) => (
              <div key={stat.value} className="numbers__cell">
                <span className="numbers__value">{stat.value}</span>
                <span className="numbers__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tools__head">
            <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
              {ui[lang].casesHero.eyebrow}
            </span>
            <h2 className="h2">{ui[lang].casesHero.title}</h2>
          </div>

          {studies.map((study, i) => (
            <article className="case-row" key={study.slug}>
              <span className="tool-row__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="case-row__logo" src={study.logo} alt={`${study.client} logo`} />
                <h3 className="case-row__title">
                  <a href={`${base}${study.slug}/`}>{study.title}</a>
                </h3>
                <p className="case-row__perex">{study.perex}</p>
                {study.tags.length > 0 && (
                  <div className="case-row__tags">
                    {study.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <a className="case-row__link" href={`${base}${study.slug}/`}>
                  {ui[lang].caseCta}
                </a>
              </div>
              <div className="case-row__metrics">
                {study.metrics.map((metric) => (
                  <div className="case-row__metric" key={metric.label}>
                    <b>{metric.value}</b>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
