'use client';

import { useState } from 'react';
import Stars from './Stars';
import { ArrowRightIcon } from './icons';

type Dot = { left: string; top: string };
type Bubble = { name: string; badge: string; price: string };

type Props = {
  height: number;
  caption: string;
  dots: Dot[];
  bubble: Bubble;
  bubbleWidth?: number;
  /** Reálny kampaňový vizuál; bez neho sa zobrazí pruhovaný placeholder z dizajnu. */
  image?: string;
  /** Vlastné body a bublina — pri reálnom vizuáli, ktorý ich už obsahuje, sa vypnú. */
  showMarkers?: boolean;
};

const shift = (pct: string, by: number) => `calc(${pct} + ${by}%)`;

/**
 * Plocha s hotspot bodmi. Bublina je viditeľná pre aktívny bod (default prvý),
 * hover/klik na iný bod ju prepne — na mobile funguje klik.
 */
export default function HotspotStage({
  height,
  caption,
  dots,
  bubble,
  bubbleWidth = 200,
  image,
  showMarkers,
}: Props) {
  const [active, setActive] = useState(0);
  const anchor = dots[active] ?? dots[0];
  /* Reálny vizuál z e-shopu už má body aj bublinu vypálené v obrázku. */
  const markers = showMarkers ?? !image;

  return (
    <div
      className="hotspot-stage"
      style={
        image
          ? { height, background: `#F6F3F0 center/cover no-repeat url(${image})` }
          : { height }
      }
    >
      {!image && <span className="hotspot-stage__caption mono">{caption}</span>}

      {markers &&
        dots.map((dot, i) => (
        <button
          key={`${dot.left}-${dot.top}`}
          type="button"
          className="hotspot-dot"
          style={{ left: dot.left, top: dot.top }}
          aria-label={`Zobraziť produkt v bode ${i + 1}`}
          aria-pressed={i === active}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
          />
        ))}

      {markers && (
      <div
        className="hotspot-bubble"
        style={{ left: shift(anchor.left, 8), top: shift(anchor.top, 12), width: bubbleWidth }}
      >
        <div className="hotspot-bubble__row">
          <span className="hotspot-bubble__name">{bubble.name}</span>
          <span className="hotspot-bubble__off">{bubble.badge}</span>
        </div>
        <Stars value={5} size={12} />
        <div className="hotspot-bubble__row">
          <span className="hotspot-bubble__price">{bubble.price}</span>
          <span className="hotspot-bubble__go" aria-hidden>
            <ArrowRightIcon size={12} />
          </span>
        </div>
      </div>
      )}
    </div>
  );
}
