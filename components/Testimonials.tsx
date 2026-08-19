'use client';

import { useState } from 'react';
import { testimonials, testimonialsCta } from '@/lib/content';

/** Referencie klientov ako preklikávateľné slidy. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const go = (next: number) => setIndex((next + testimonials.length) % testimonials.length);
  const item = testimonials[index];

  return (
    <div className="tm">
      <div className="tm__head">
        <div>
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            Referencie
          </span>
          <h2 className="h2" style={{ marginTop: 8 }}>
            Čo hovoria naši klienti
          </h2>
        </div>
        <div className="tm__nav">
          <button type="button" onClick={() => go(index - 1)} aria-label="Predchádzajúca referencia">
            ←
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Nasledujúca referencia">
            →
          </button>
        </div>
      </div>

      <article className="tm__slide">
        <div className="tm__panel" style={{ background: item.color }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="tm__logo" src={item.logo} alt={item.company} />
          <blockquote className="tm__quote">{item.quote}</blockquote>
          <p className="tm__author">
            {item.author} <span>, {item.role}</span>
          </p>
          <a className="tm__cta" href={item.href}>
            {testimonialsCta}
          </a>
        </div>
        <div className="tm__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.cover} alt={`${item.company} — prípadová štúdia`} />
        </div>
      </article>

      <div className="tm__dots">
        {testimonials.map((slide, i) => (
          <button
            key={slide.company}
            type="button"
            className={i === index ? 'is-active' : ''}
            aria-label={`Referencia ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
