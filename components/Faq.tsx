'use client';

import { useState } from 'react';
import { faq } from '@/lib/content';
import { faqIntro } from '@/lib/features';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
          FAQ
        </span>
        <h2 className="h2" style={{ maxWidth: 720, marginTop: 8 }}>
          Často kladené otázky
        </h2>
        <p style={{ maxWidth: 720, marginTop: 14, fontSize: 17, color: 'var(--ink-600)' }}>
          {faqIntro}
        </p>

        <div className="faq__list">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="faq__item">
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <span className="faq__sign" aria-hidden>
                      {isOpen ? '–' : '+'}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div className="faq__a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                    {item.a.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="faq__note">
          Nenašli ste odpoveď na svoju otázku? Napíšte nám na{' '}
          <a href="mailto:info@rewora.io">info@rewora.io</a>.
        </p>
      </div>
    </section>
  );
}
