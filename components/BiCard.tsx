import { biIcons } from '@/components/icons';
import { bi, biProduct, biRowMetrics } from '@/lib/panel-data';

/**
 * BI dáta tak, ako ich zákazník vidí na karte produktu — pod fotografiou.
 * `compact` je verzia do riadka nástrojov (bez chipsov a kratšie dátumy).
 */
export default function BiCard({ compact = false }: { compact?: boolean }) {
  const metrics = compact ? biRowMetrics : bi.metrics;

  return (
    <div className={`bi-card ${compact ? 'bi-card--compact' : ''}`}>
      <div className="bi-card__photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={biProduct.photo} alt={biProduct.name} />
        <span className="bi-card__badge">{biProduct.badge}</span>
      </div>

      <div className="bi-card__info">
        <span className="bi-card__brand">{biProduct.brand}</span>
        <span className="bi-card__name">{biProduct.name}</span>
        <span className="bi-card__price">{biProduct.price}</span>
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
          <span className="chips__title">{bi.chips.title}</span>
          <div className="chips__row">
            {bi.chips.items.map((chip) => (
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
