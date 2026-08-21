'use client';

import { useEffect, useRef, useState } from 'react';
import { testimonials, testimonialsCta, testimonialsIntro } from '@/lib/content';

/** Odsadenie kariet v balíčku a posun pri odchode zo scény. */
const PEEK = 16;
const EXIT = 130;

/**
 * Referencie — vľavo text, vpravo balíček kariet prípadových štúdií.
 * Na začiatku sú viditeľné všetky tri: prvá celá, z ďalších dvoch trčí
 * horný okraj. Scrollovaním predná karta odíde nadol a odkryje ďalšiu.
 */
export default function Testimonials() {
  const runway = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setEnabled(desktop.matches && !reduced.matches);
      const el = runway.current;
      const scena = stage.current;
      if (!el || !scena) return;
      const rect = el.getBoundingClientRect();
      /* animácia beží presne po dobu, počas ktorej je scéna prilepená —
         nezávisle od výšky okna, aby dráha mohla byť krátka */
      const lepenieOd = parseFloat(getComputedStyle(scena).top) || 0;
      const distance = rect.height - scena.offsetHeight - lepenieOd;
      setProgress(
        distance > 0 ? Math.min(1, Math.max(0, (lepenieOd - rect.top) / distance)) : 0
      );
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
        <div className="cases__stage" ref={stage}>
          {testimonials.map((item, i) => {
            /* poloha v poradí: 0 = predná karta, <0 čaká v balíčku, >0 odchádza */
            const step = progress * (count - 1) - i;
            const last = i === count - 1;
            /* koľko kariet je pred touto — o toľko vyššie z nej trčí okraj */
            const behind = Math.min(count - 1, Math.max(0, -step));
            const leaving = last ? 0 : Math.min(1, Math.max(0, step));

            const shift = PEEK * (count - 1 - behind) + EXIT * leaving;
            const scale = 1 - 0.03 * behind - 0.03 * leaving;
            /* karty v balíčku zostávajú viditeľné, mizne len tá odchádzajúca */
            const opacity = 1 - Math.min(1, leaving / 0.45);

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
                <div className="case-card__body">
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
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="case-card__shot" src={item.shot} alt={`Rewora na e-shope ${item.company}`} />
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
