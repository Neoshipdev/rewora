'use client';

import { useState } from 'react';
import {
  faq as faqData,
  faqLegal as faqLegalData,
  faqLegalIntro as faqLegalIntroData,
} from '@/lib/content';
import { faqIntro as faqIntroData } from '@/lib/features';
import type { Lang } from '@/lib/i18n';
import { createT, tDeep } from '@/lib/t';

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

export default function Faq({ lang = 'sk' }: { lang?: Lang }) {
  const t = createT(lang);
  const faq = tDeep(faqData, lang);
  const faqLegal = tDeep(faqLegalData, lang);
  return (
    <section className="section" id="faq">
      <div className="container">
        <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
          FAQ
        </span>
        <h2 className="h2" style={{ maxWidth: 720, marginTop: 8 }}>
          {t('Často kladené otázky')}
        </h2>
        <p style={{ maxWidth: 720, marginTop: 14, fontSize: 16.1, color: 'var(--ink-600)' }}>
          {t(faqIntroData)}
        </p>

        <FaqList items={faq} idPrefix="faq" />

        <div className="faq__group" id="legislativa">
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            {t('Legislatíva')}
          </span>
          <h2 className="h2" style={{ maxWidth: 760, marginTop: 8 }}>
            {t('Povinnosti slovenských e-shopov pri recenziách')}
          </h2>
          <p style={{ maxWidth: 760, marginTop: 14, fontSize: 16.1, color: 'var(--ink-600)' }}>
            {t(faqLegalIntroData)}
          </p>
          <FaqList items={faqLegal} idPrefix="faq-legal" />
        </div>

        <p className="faq__note">
          {t('Nenašli ste odpoveď na svoju otázku? Napíšte nám na')}{' '}
          <a href="mailto:info@rewora.com">info@rewora.com</a>.
        </p>
      </div>
    </section>
  );
}
