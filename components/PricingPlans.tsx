'use client';

import { useState } from 'react';
import { plans, pricingNote } from '@/lib/pricing';

export default function PricingPlans() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div className="period-toggle" role="group" aria-label="Obdobie platby">
        <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
          Mesačne
        </button>
        <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
          Ročne
        </button>
      </div>

      <div className="plans">
        {plans.map((plan) => (
          <div key={plan.name} className={`plan ${plan.featured ? 'plan--featured' : ''}`}>
            <span className="plan__name">
              {plan.name}
              {plan.featured && <span className="plan__badge">Najobľúbenejší</span>}
            </span>
            <div>
              <div className="plan__price">{yearly ? plan.priceYearly : plan.priceMonthly}</div>
              <span className="plan__period">
                {yearly ? plan.periodYearly : plan.periodMonthly}
              </span>
            </div>
            <a className="plan__cta" href={plan.cta.href}>
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

      <p className="pricing-note">{pricingNote}</p>
    </>
  );
}
