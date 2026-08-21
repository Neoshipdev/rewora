'use client';

import { useState } from 'react';
import { faq, faqLegal, faqLegalIntro } from '@/lib/content';
import { faqIntro } from '@/lib/features';

type Item = { q: string; a: string[] };

/** Akordeón s otázkami — v sekcii FAQ sú dve nezávislé skupiny. */
function FaqList({ items, idPrefix }: { items: Item[]; idPrefix: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq__list">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="faq__item">
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-a-${i}`}
                id={`${idPrefix}-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <span className="faq__sign" aria-hidden>
                  {isOpen ? '–' : '+'}
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                className="faq__a"
                id={`${idPrefix}-a-${i}`}
                role="region"
                aria-labelledby={`${idPrefix}-q-${i}`}
              >
                {item.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
          FAQ
        </span>
        <h2 className="h2" style={{ maxWidth: 720, marginTop: 8 }}>
          Často kladené otázky
        </h2>
        <p style={{ maxWidth: 720, marginTop: 14, fontSize: 16.1, color: 'var(--ink-600)' }}>
          {faqIntro}
        </p>

        <FaqList items={faq} idPrefix="faq" />

        <div className="faq__group" id="legislativa">
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            Legislatíva
          </span>
          <h2 className="h2" style={{ maxWidth: 760, marginTop: 8 }}>
            Povinnosti slovenských e-shopov pri recenziách
          </h2>
          <p style={{ maxWidth: 760, marginTop: 14, fontSize: 16.1, color: 'var(--ink-600)' }}>
            {faqLegalIntro}
          </p>
          <FaqList items={faqLegal} idPrefix="faq-legal" />
        </div>

        <p className="faq__note">
          Nenašli ste odpoveď na svoju otázku? Napíšte nám na{' '}
          <a href="mailto:info@rewora.io">info@rewora.io</a>.
        </p>
      </div>
    </section>
  );
}
