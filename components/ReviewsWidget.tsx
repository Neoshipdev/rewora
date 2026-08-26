/**
 * Widget „Recenzie a hodnotenia“ tak, ako sa zobrazuje na karte produktu.
 * Používa sa v mockupe admin panela aj v sekcii Nástroje.
 */
import type { Lang } from '@/lib/i18n';
import { productWidget } from '@/lib/panel-data';
import { createT, tDeep } from '@/lib/t';

/** Ilustrácia telefónu — fotografia produktu v ľavom stĺpci widgetu. */
function PhoneShot() {
  return (
    <svg viewBox="0 0 120 210" className="wdg__photo" role="img" aria-label="Fotografia produktu">
      <defs>
        <linearGradient id="wdgBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3A3D42" />
          <stop offset="45%" stopColor="#26282C" />
          <stop offset="100%" stopColor="#141518" />
        </linearGradient>
        <linearGradient id="wdgCam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A4D53" />
          <stop offset="100%" stopColor="#1B1C1F" />
        </linearGradient>
      </defs>
      <rect x="14" y="6" width="92" height="198" rx="18" fill="url(#wdgBody)" />
      <rect x="17" y="9" width="86" height="192" rx="15.5" fill="none" stroke="#54575D" strokeWidth="0.8" />
      <rect x="10.5" y="52" width="3.5" height="16" rx="1.6" fill="#3C3F44" />
      <rect x="10.5" y="76" width="3.5" height="26" rx="1.6" fill="#3C3F44" />
      <rect x="106" y="70" width="3.5" height="34" rx="1.6" fill="#3C3F44" />
      <rect x="22" y="14" width="46" height="46" rx="14" fill="url(#wdgCam)" />
      <circle cx="35" cy="27" r="9.5" fill="#0E0F11" stroke="#5B5E64" strokeWidth="1.4" />
      <circle cx="35" cy="27" r="4.6" fill="#1D2A38" />
      <circle cx="55" cy="27" r="9.5" fill="#0E0F11" stroke="#5B5E64" strokeWidth="1.4" />
      <circle cx="55" cy="27" r="4.6" fill="#1D2A38" />
      <circle cx="35" cy="47" r="9.5" fill="#0E0F11" stroke="#5B5E64" strokeWidth="1.4" />
      <circle cx="35" cy="47" r="4.6" fill="#1D2A38" />
      <circle cx="56" cy="46" r="4" fill="#15171A" stroke="#4A4D53" strokeWidth="0.8" />
      <rect x="50" y="52" width="7" height="5" rx="2" fill="#15171A" />
    </svg>
  );
}

export default function ReviewsWidget({ lang = 'sk' }: { lang?: Lang }) {
  const t = createT(lang);
  const { accent, product, summary, filters, items } = tDeep(productWidget, lang);

  return (
    <div className="panel__stack" style={{ gap: 10 }}>
      <div className="wdg" style={{ ['--wdg' as string]: accent }}>
        <div className="wdg__layout">
          <div className="wdg__media">
            <PhoneShot />
            <span className="wdg__badge">{product.badge}</span>
          </div>

          <div className="wdg__main">
            <span className="wdg__brand">{product.brand}</span>
            <span className="wdg__name">{product.name}</span>
            <span className="wdg__product-meta">
              <WidgetStars value={5} half />
              <b>{summary.average}</b> · {summary.count}
            </span>
            <span className="wdg__price">{product.price}</span>
            <p className="wdg__desc">{product.description}</p>
          </div>
        </div>

        {/* Pod fotografiou: vľavo súhrn hodnotení, vpravo jednotlivé recenzie. */}
        <div className="wdg__columns">
          <div className="wdg__box">
            <span className="wdg__box-title">{summary.title}</span>
            <div className="wdg__summary">
              <div className="wdg__score">
                <span className="wdg__average">{summary.average}</span>
                <span className="wdg__score-meta">
                  <WidgetStars value={5} half />
                  <small>{summary.count}</small>
                </span>
              </div>
            </div>
            <div className="wdg__bars">
              {summary.distribution.map((row) => (
                <div className="wdg__bar-row" key={row.stars}>
                  <span className="wdg__bar-label">{row.stars}</span>
                  <span className="wdg__bar-track">
                    <span className="wdg__bar-fill" style={{ width: `${row.share}%` }} />
                  </span>
                  <span className="wdg__bar-count">{row.count} x</span>
                </div>
              ))}
            </div>

            <div className="wdg__cta">
              <span className="wdg__cta-title">{summary.ctaTitle}</span>
              <span className="wdg__cta-text">{summary.ctaText}</span>
              <span className="wdg__cta-btn">{summary.ctaButton}</span>
            </div>
          </div>

          <div className="wdg__reviews">
            <div className="wdg__filters">
              {filters.map((filter, i) => (
                <span key={filter} className={`wdg__chip ${i === 0 ? 'wdg__chip--on' : ''}`}>
                  {filter}
                  {i > 0 && ' ★'}
                </span>
              ))}
            </div>

            <div className="wdg__list">
              {items.map((item) => (
                <div className="wdg__card" key={item.name + item.date}>
                  <div className="wdg__card-head">
                    <span className="wdg__avatar">{item.initials}</span>
                    <span className="wdg__author">
                      <b>{item.name}</b>
                      <span className="wdg__card-meta">
                        <WidgetStars value={item.stars} /> {item.date}
                      </span>
                    </span>
                    <span className="wdg__verified">{item.badge}</span>
                  </div>
                  {item.title && <span className="wdg__card-title">{item.title}</span>}
                  <span className="wdg__card-text">{item.text}</span>
                  <span className="wdg__card-foot">
                    {t('Bolo to užitočné?')} 👍 {item.helpful.up} 👎 {item.helpful.down}
                    {item.top && <span className="wdg__top">{t('Top recenzia')}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Hviezdičky vo farbe widgetu (posledná môže byť polovičná). */
function WidgetStars({ value, half }: { value: number; half?: boolean }) {
  return (
    <span className="wdg__stars" aria-label={`Hodnotenie ${value} z 5`} role="img">
      {'★'.repeat(value)}
      {half && <span className="wdg__stars-half">★</span>}
      {value < 5 && !half && <span className="wdg__stars-empty">{'★'.repeat(5 - value)}</span>}
    </span>
  );
}
