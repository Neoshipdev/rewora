import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { getCaseStudies } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Prípadové štúdie ★ Rewora',
  description:
    'Ako naši zákazníci rastú s Rewora — merateľné výsledky z e-shopov FixServis, Drinkcentrum a kilpi.cz.',
  alternates: { canonical: '/sk/pripadove-studie/' },
};

const bandStats = [
  { value: '9 z 10', label: 'zákazníkov si pred kúpou prečíta recenzie' },
  { value: '270 %', label: 'vyššia šanca predať produkt s 5+ recenziami' },
  { value: '+15 %', label: 'nárast konverzného pomeru' },
  { value: '380 %', label: 'drahšie produkty s recenziami sa kupujú častejšie' },
];

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return (
    <>
      <TopBar />
      <PageHero
        eyebrow="Prípadové štúdie"
        title="Ako naši zákazníci rastú s Rewora"
        lead="Budujte dôveru u vašich zákazníkov a merateľne zvýšte konverzný pomer vášho webu jednoducho na pár klikov."
      />

      <section className="numbers">
        <div className="container">
          <div className="numbers__grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {bandStats.map((stat) => (
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
              Referencie
            </span>
            <h2 className="h2">Pomáhame klientom dosiahnuť merateľné výsledky</h2>
          </div>

          {studies.map((study, i) => (
            <article className="case-row" key={study.slug}>
              <span className="tool-row__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="case-row__logo" src={study.logo} alt={`${study.client} logo`} />
                <h3 className="case-row__title">
                  <a href={`/sk/pripadove-studie/${study.slug}/`}>{study.title}</a>
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
                <a className="case-row__link" href={`/sk/pripadove-studie/${study.slug}/`}>
                  Prečítať si prípadovú štúdiu →
                </a>
              </div>
              <div>
                <a href={`/sk/pripadove-studie/${study.slug}/`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="case-row__cover" src={study.cover} alt={study.alt} loading="lazy" />
                </a>
                <div className="case-row__metrics">
                  {study.metrics.map((metric) => (
                    <div className="case-row__metric" key={metric.label}>
                      <b>{metric.value}</b>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </>
  );
}
