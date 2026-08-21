'use client';

import { useState } from 'react';
import { videoReviews } from '@/lib/panel-data';

/**
 * Widget s foto a video recenziami. Stredná karta je zväčšená,
 * šípky posúvajú poradie dokola.
 */
export default function VideoReviews() {
  const [offset, setOffset] = useState(0);
  const items = videoReviews.items;
  const ordered = items.map((_, i) => items[(i + offset) % items.length]);
  const middle = Math.floor(items.length / 2);

  return (
    <div className="vrev">
      <div className="vrev__head">
        <span className="vrev__title">{videoReviews.title}</span>
        <span className="vrev__score">
          <span className="stars" style={{ fontSize: 13.3 }}>
            ★★★★★
          </span>
          <b>{videoReviews.average}</b>
          <small>{videoReviews.count}</small>
        </span>
      </div>

      <div className="vrev__row">
        {ordered.map((item, i) => (
          <figure
            key={item.name}
            className={`vrev__card ${i === middle ? 'vrev__card--active' : ''}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vrev__photo" src={item.photo} alt="" loading="lazy" />
            <span className="vrev__play" aria-hidden>
              ▶
            </span>
            <figcaption className="vrev__meta">
              <span className="stars" style={{ fontSize: 10.4 }}>
                {'★'.repeat(item.stars)}
              </span>
              <b>{item.name}</b>
              <small>{item.caption}</small>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="vrev__nav">
        <button
          type="button"
          onClick={() => setOffset((o) => (o - 1 + items.length) % items.length)}
          aria-label="Predchádzajúce video"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setOffset((o) => (o + 1) % items.length)}
          aria-label="Nasledujúce video"
        >
          ›
        </button>
      </div>
    </div>
  );
}
