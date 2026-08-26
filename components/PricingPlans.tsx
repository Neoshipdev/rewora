'use client';

import { useState } from 'react';
import { routes, type Lang } from '@/lib/i18n';
import { plans as plansData, pricingNote as pricingNoteData } from '@/lib/pricing';
import { createT, tDeep } from '@/lib/t';

export default function PricingPlans({ lang = 'sk' }: { lang?: Lang }) {
  const t = createT(lang);
  const plans = tDeep(plansData, lang);
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div className="period-toggle" role="group" aria-label={t('Obdobie platby')}>
        <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
          {t('Mesačne')}
        </button>
        <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
          {t('Ročne')}
        </button>
      </div>

      <div className="plans">
        {plans.map((plan) => (
          <div key={plan.name} className={`plan ${plan.featured ? 'plan--featured' : ''}`}>
            <span className="plan__name">
              {plan.name}
              {plan.featured && <span className="plan__badge">{t('Najobľúbenejší')}</span>}
            </span>
            <div>
              <div className="plan__price">{yearly ? plan.priceYearly : plan.priceMonthly}</div>
              <span className="plan__period">
                {yearly ? plan.periodYearly : plan.periodMonthly}
              </span>
            </div>
            <a className="plan__cta" href={routes.demo[lang] ?? plan.cta.href}>
              {plan.cta.label}
            </a>
            {plan.intro && <span className="plan__intro">{plan.intro}</span>}
            <ul className="plan__features">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="pricing-note">{t(pricingNoteData)}</p>
    </>
  );
}
