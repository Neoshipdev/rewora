import { biIcons } from '@/components/icons';
import type { Lang } from '@/lib/i18n';
import { bi, biProduct, biRowMetrics } from '@/lib/panel-data';
import { tDeep } from '@/lib/t';

/**
 * BI dáta tak, ako ich zákazník vidí na karte produktu — pod fotografiou.
 * `compact` je verzia do riadka nástrojov (bez chipsov a kratšie dátumy).
 */
export default function BiCard({ compact = false, lang = 'sk' }: { compact?: boolean; lang?: Lang }) {
  const biData = tDeep(bi, lang);
  const produkt = tDeep(biProduct, lang);
  const metrics = compact ? tDeep(biRowMetrics, lang) : biData.metrics;

  return (
    <div className={`bi-card ${compact ? 'bi-card--compact' : ''}`}>
      <div className="bi-card__photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={produkt.photo} alt={produkt.name} />
        <span className="bi-card__badge">{produkt.badge}</span>
      </div>

      <div className="bi-card__info">
        <span className="bi-card__brand">{produkt.brand}</span>
        <span className="bi-card__name">{produkt.name}</span>
        <span className="bi-card__price">{produkt.price}</span>
      </div>

      <div className="metrics bi-card__metrics">
        {metrics.map((metric) => {
          const Icon = biIcons[metric.icon];
          return (
            <div key={metric.label} className="metric">
              <span className="metric__icon">
                <Icon size={compact ? 18 : 20} />
              </span>
              <span className="metric__text">
                <span className="metric__value">{metric.value}</span>
                <span className="metric__label">{metric.label}</span>
              </span>
            </div>
          );
        })}
      </div>

      {!compact && (
        <div className="chips">
          <span className="chips__title">{biData.chips.title}</span>
          <div className="chips__row">
            {biData.chips.items.map((chip) => (
              <span key={chip.label} className={`chip ${chip.on ? 'chip--on' : ''}`}>
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
