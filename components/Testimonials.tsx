'use client';

import { useEffect, useRef, useState } from 'react';
import { testimonials, testimonialsCta, testimonialsIntro } from '@/lib/content';

/** O koľko sa karta posunie, kým odíde zo scény. */
const EXIT = 130;
const ENTER = 28;

/**
 * Referencie — vľavo text, vpravo karty prípadových štúdií.
 * Scrollovaním sa karty striedajú: prvá odíde nadol a odkryje druhú,
 * druhá rovnako tretiu, ktorá zostane zobrazená.
 */
export default function Testimonials() {
  const runway = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setEnabled(desktop.matches && !reduced.matches);
      const el = runway.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      setProgress(distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    desktop.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      desktop.removeEventListener('change', update);
    };
  }, []);

  const count = testimonials.length;

  return (
    <div className="cases">
      <div className="cases__intro">
        <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
          {testimonialsIntro.eyebrow}
        </span>
        <h2 className="h2">{testimonialsIntro.title}</h2>
        <p className="cases__text">{testimonialsIntro.text}</p>
        <a className="btn btn--outline-dark" href={testimonialsIntro.button.href}>
          {testimonialsIntro.button.label}
        </a>
      </div>

      <div className="cases__runway" ref={runway}>
        <div className="cases__stage">
          {testimonials.map((item, i) => {
            /* poloha v poradí: 0 = práve zobrazená, <0 čaká, >0 odchádza */
            const step = progress * (count - 1) - i;
            const last = i === count - 1;
            const waiting = Math.min(1, Math.max(0, -step));
            const leaving = last ? 0 : Math.min(1, Math.max(0, step));

            /* odchádzajúca karta zmizne skôr, než sa objaví ďalšia —
               aby sa texty dvoch kariet neprekrývali */
            const fadeOut = Math.min(1, leaving / 0.45);
            const fadeIn = Math.min(1, waiting / 0.45);
            const shift = -ENTER * waiting + EXIT * leaving;
            const scale = 1 - 0.06 * waiting - 0.04 * leaving;
            const opacity = 1 - Math.max(fadeOut, fadeIn);

            return (
              <article
                className="case-card"
                key={item.company}
                style={
                  enabled
                    ? {
                        transform: `translateY(${shift}px) scale(${scale})`,
                        opacity: Math.max(0, opacity),
                        zIndex: count - i,
                        pointerEvents: opacity > 0.6 ? 'auto' : 'none',
                      }
                    : undefined
                }
              >
                <div className="case-card__head">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="case-card__logo" src={item.logo} alt={item.company} />
                  <span className="case-card__metric">
                    <b>{item.metric.value}</b>
                    <small>{item.metric.label}</small>
                  </span>
                </div>
                <blockquote className="case-card__quote">{item.quote}</blockquote>
                <div className="case-card__foot">
                  <span className="case-card__author">
                    <b>{item.author}</b>
                    <small>
                      {item.role} · {item.company}
                    </small>
                  </span>
                  <a className="case-card__link" href={item.href}>
                    {testimonialsCta} →
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
