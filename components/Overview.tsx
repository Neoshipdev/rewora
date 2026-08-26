'use client';

import type { Lang } from '@/lib/i18n';
import { overview as overviewData } from '@/lib/panel-data';
import { createT, tDeep } from '@/lib/t';

function Donut({ lang }: { lang: Lang }) {
  const t = createT(lang);
  const overview = tDeep(overviewData, lang);
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg viewBox="0 0 90 90" className="donut" role="img" aria-label={t('Rozloženie zobrazení widgetov')}>
      <g transform="rotate(-90 45 45)">
        {overview.activity.items.map((item) => {
          const length = (item.share / 100) * circumference;
          const dash = `${length} ${circumference - length}`;
          const segment = (
            <circle
              key={item.label}
              cx="45"
              cy="45"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="14"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
            />
          );
          offset += length;
          return segment;
        })}
      </g>
      <text x="45" y="43" className="donut__value">
        {overview.activity.total}
      </text>
      <text x="45" y="52" className="donut__label">
        {t('zobrazení')}
      </text>
    </svg>
  );
}

export default function Overview({ lang = 'sk' }: { lang?: Lang }) {
  const overview = tDeep(overviewData, lang);
  return (
    <div className="panel__stack" style={{ gap: 12 }}>
      <div className="dash__headline">
        {overview.headline.map((item) => (
          <div key={item.label} className="dash__tile">
            <span className="dash__tile-label">{item.label}</span>
            <span className="dash__tile-value">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="dash__card">
        <span className="dash__head">
          <span className="dash__num">1</span>
          {overview.performance.title}
        </span>
        <dl className="dash__rows">
          {overview.performance.rows.map((row) => (
            <div key={row.label} className="dash__row">
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="dash__card">
        <span className="dash__head">
          <span className="dash__num">2</span>
          {overview.activity.title}
        </span>
        <div className="dash__activity">
          <Donut lang={lang} />
          <ul className="dash__legend">
            {overview.activity.items.map((item) => (
              <li key={item.label}>
                <span className="dash__dot" style={{ background: item.color }} />
                <span className="dash__legend-label">{item.label}</span>
                <span className="dash__legend-value">{item.value}</span>
                <span className="dash__legend-share">{item.share.toFixed(1).replace('.', ',')} %</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dash__card">
        <span className="dash__head">
          <span className="dash__num">3</span>
          {overview.assisted.title}
        </span>
        <div className="dash__funnel">
          {overview.assisted.steps.map((step) => (
            <div key={step.label} className="dash__bar" style={{ width: `${step.width}%` }}>
              <b>{step.value}</b> {step.label}
            </div>
          ))}
        </div>
        <div className="dash__split">
          <div className="dash__tile">
            <span className="dash__tile-label">{overview.assisted.revenue.label}</span>
            <span className="dash__tile-value">{overview.assisted.revenue.value}</span>
          </div>
          <div className="dash__tile">
            <span className="dash__tile-label">{overview.assisted.share.label}</span>
            <span className="dash__tile-value">{overview.assisted.share.value}</span>
          </div>
        </div>
        <span className="dash__note">{overview.assisted.note}</span>
      </div>
    </div>
  );
}
