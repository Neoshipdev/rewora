'use client';

import { Fragment, useState } from 'react';
import Overview from '@/components/Overview';
import { adminShots } from '@/lib/assets';
import { adminPanelSection } from '@/lib/features';
import type { Lang } from '@/lib/i18n';
import { createT, tDeep } from '@/lib/t';

/**
 * Administrátorský panel — vľavo zoznam možností, vpravo screenshot.
 * Po prekliku záložky sa vymení obrázok, rovnako ako na rewora.com.
 * Na mobile je zoznam pod sebou, preto sa snímka zobrazí hneď pod
 * vybranou funkciou — nie až na konci celého zoznamu.
 */
export default function AdminTabs({ lang = 'sk' }: { lang?: Lang }) {
  const t = createT(lang);
  const [active, setActive] = useState(0);
  const items = tDeep(adminPanelSection, lang).items;

  /* šípkami sa dá prechádzať medzi záložkami rovnako ako myšou */
  const onKey = (e: React.KeyboardEvent) => {
    const posun = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!posun) return;
    e.preventDefault();
    setActive((i) => (i + posun + items.length) % items.length);
  };

  /* prehľad nie je screenshot, ale ten istý živý dashboard ako v hero sekcii */
  const nahlad = (i: number) => {
    const shot = items[i].shot === 'overview' ? null : adminShots[items[i].shot];
    return shot ? (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img key={shot.src} src={shot.src} alt={t(shot.alt)} loading="lazy" />
    ) : (
      <div className="admin-tabs__dash">
        <Overview lang={lang} />
      </div>
    );
  };

  return (
    <div className="admin-tabs">
      <div className="admin-tabs__list" onKeyDown={onKey}>
        {items.map((item, i) => (
          <Fragment key={item.title}>
            <button
              type="button"
              id={`admin-tab-${i}`}
              aria-expanded={i === active}
              aria-controls={`admin-panel-${i}`}
              className="admin-tab"
              onClick={() => setActive(i)}
            >
              <span className="admin-tab__title">{item.title}</span>
              <span className="admin-tab__text">{item.text}</span>
            </button>
            {i === active && (
              <div
                className="admin-tabs__shot admin-tabs__shot--inline"
                id={`admin-panel-${i}`}
                aria-labelledby={`admin-tab-${i}`}
              >
                {nahlad(i)}
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* na širokej obrazovke stojí snímka vpravo vedľa zoznamu */}
      <div
        className="admin-tabs__shot admin-tabs__shot--side"
        aria-labelledby={`admin-tab-${active}`}
      >
        {nahlad(active)}
      </div>
    </div>
  );
}
