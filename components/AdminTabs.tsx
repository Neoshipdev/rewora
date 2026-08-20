'use client';

import { useState } from 'react';
import { adminShots } from '@/lib/assets';
import { adminPanelSection } from '@/lib/features';

/**
 * Administrátorský panel — vľavo zoznam možností, vpravo screenshot.
 * Po prekliku záložky sa vymení obrázok, rovnako ako na rewora.com.
 */
export default function AdminTabs() {
  const [active, setActive] = useState(0);
  const items = adminPanelSection.items;
  const shot = adminShots[items[active].shot];

  /* šípkami sa dá prechádzať medzi záložkami rovnako ako myšou */
  const onKey = (e: React.KeyboardEvent) => {
    const posun = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!posun) return;
    e.preventDefault();
    setActive((i) => (i + posun + items.length) % items.length);
  };

  return (
    <div className="admin-tabs">
      <div className="admin-tabs__list" role="tablist" aria-orientation="vertical" onKeyDown={onKey}>
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            id={`admin-tab-${i}`}
            aria-selected={i === active}
            aria-controls="admin-tabpanel"
            tabIndex={i === active ? 0 : -1}
            className="admin-tab"
            onClick={() => setActive(i)}
          >
            <span className="admin-tab__title">{item.title}</span>
            <span className="admin-tab__text">{item.text}</span>
          </button>
        ))}
      </div>

      <div
        className="admin-tabs__shot"
        role="tabpanel"
        id="admin-tabpanel"
        aria-labelledby={`admin-tab-${active}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={shot.src} src={shot.src} alt={shot.alt} loading="lazy" />
      </div>
    </div>
  );
}
