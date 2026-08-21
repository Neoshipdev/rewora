'use client';

import { useEffect, useRef, useState } from 'react';
import BiCard from '@/components/BiCard';
import { bi, hotspots, overview, panelTabs, qa, reviews, type PanelKey } from '@/lib/panel-data';
import { hotspotVisual } from '@/lib/assets';
import ForumThread from './ForumThread';
import GoogleShopping from './GoogleShopping';
import Overview from './Overview';
import ReviewsWidget from './ReviewsWidget';
import ShopReviews from './ShopReviews';
import { PlusIcon } from './icons';
import HotspotStage from './HotspotStage';
import Stars from './Stars';

const keys = panelTabs.map((t) => t.key);

export default function AdminPanel() {
  const [tab, setTab] = useState<PanelKey>('widget');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Linkovanie z marketingu: #panel=hotspots */
  useEffect(() => {
    const fromHash = () => {
      const match = /panel=([a-z]+)/.exec(window.location.hash);
      const key = match?.[1] as PanelKey | undefined;
      if (key && keys.includes(key)) setTab(key);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = keys.indexOf(tab);
    let next = i;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % keys.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + keys.length) % keys.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = keys.length - 1;
    else return;
    e.preventDefault();
    setTab(keys[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="panel">
      <div className="panel__chrome">
        <div className="panel__lights" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <span className="panel__locales">SK · CZ · EN</span>
      </div>

      <div className="panel__body">
        <div
          className="panel__nav"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Nástroje v administrátorskom panely"
          onKeyDown={onKeyDown}
        >
          {panelTabs.map((item, i) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              id={`panel-tab-${item.key}`}
              aria-selected={tab === item.key}
              aria-controls={`panel-${item.key}`}
              tabIndex={tab === item.key ? 0 : -1}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              className="panel__tab"
              onClick={() => setTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          className="panel__content"
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`panel-tab-${tab}`}
          tabIndex={0}
        >
          {tab === 'overview' && <Overview />}
          {tab === 'widget' && (
            <div className="panel__stack" style={{ gap: 10 }}>
              <ReviewsWidget />
            </div>
          )}
          {tab === 'shop' && (
            <div className="panel__stack" style={{ gap: 10 }}>
              <ShopReviews />
            </div>
          )}
          {tab === 'gshop' && (
            <div className="panel__stack" style={{ gap: 10 }}>
              <GoogleShopping />
            </div>
          )}
          {tab === 'reviews' && <Reviews />}
          {tab === 'qa' && <ForumThread />}
          {tab === 'hotspots' && <Hotspots />}
          {tab === 'bi' && <Bi />}

          <span className="panel__credit">
            Vytvorené pomocou
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="panel__credit-logo" src="/images/logo-rewora.svg" alt="Rewora" />
          </span>
        </div>
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <div className="panel__stack" style={{ gap: 10 }}>
      <div className="panel__head">
        <span className="panel__title">{reviews.title}</span>
        <span className="rev__export">↓ {reviews.export}</span>
      </div>

      <div className="rev">
        <div className="rev__toolbar">
          <span className="rev__filter">{reviews.filter}</span>
          <span className="rev__search">⌕ {reviews.search}</span>
          <span className="rev__columns">▤ {reviews.columns}</span>
        </div>

        <div className="rev__selection">
          <span className="rev__count">
            <span className="rev__check rev__check--on" aria-hidden />
            {reviews.selection.count}
          </span>
          <span className="rev__actions">
            {reviews.selection.actions.map((action) => (
              <span key={action}>{action}</span>
            ))}
          </span>
        </div>

        {reviews.rows.map((row) => (
          <div key={row.text} className={`rev__row ${row.selected ? 'rev__row--on' : ''}`}>
            <span
              className={`rev__check ${row.selected ? 'rev__check--on' : ''}`}
              aria-hidden
            />
            <div className="rev__body">
              <span className="rev__text">{row.text}</span>
              <span className="rev__meta">
                {row.source} · {row.date} · {row.language}
              </span>
            </div>
            <span className="rev__rating">{row.rating}</span>
            <span className={`rev__pill ${row.approved ? 'rev__pill--yes' : 'rev__pill--no'}`}>
              {row.approved ? 'Áno' : 'Nie'}
            </span>
          </div>
        ))}
      </div>

      <div className="strip">
        <span>{reviews.strip.text}</span>
        <span className="strip__link">{reviews.strip.link}</span>
      </div>
    </div>
  );
}

function Hotspots() {
  return (
    <div className="panel__stack">
      <div className="panel__head">
        <span className="panel__title">Hotspots</span>
        <span style={{ fontSize: 11.4, color: 'var(--ink-500)' }}>{hotspots.meta}</span>
      </div>
      <HotspotStage
        height={300}
        caption={hotspots.caption}
        image={hotspotVisual}
        dots={hotspots.dots}
        bubble={hotspots.bubble}
      />
      <div className="strip">
        <span>{hotspots.strip.text}</span>
        <span className="strip__link">{hotspots.strip.link}</span>
      </div>
    </div>
  );
}

function Bi() {
  return (
    <div className="panel__stack">
      <span className="panel__title">{bi.title}</span>
      <BiCard />
    </div>
  );
}
