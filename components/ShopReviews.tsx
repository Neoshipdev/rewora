/**
 * Karusel recenzií obchodu — widget, ktorý e-shop nasadzuje na homepage.
 * Používa sa v mockupe admin panela.
 */
import { shopReviews } from '@/lib/panel-data';

export default function ShopReviews() {
  return (
    <div className="shopr">
      <div className="shopr__head">
        <span className="shopr__title">{shopReviews.title}</span>
        <span className="shopr__arrows" aria-hidden>
          <span className="shopr__arrow">←</span>
          <span className="shopr__arrow">→</span>
        </span>
      </div>

      <div className="shopr__grid">
        {shopReviews.items.map((item) => (
          <div className="shopr__item" key={item.text}>
            <span className="shopr__stars" role="img" aria-label={`Hodnotenie ${item.stars} z 5`}>
              {'★'.repeat(item.stars)}
            </span>
            <p className="shopr__text">{item.text}</p>
            <span className="shopr__source">{item.source}</span>
            <span className="shopr__report">⚑ {shopReviews.report}</span>
          </div>
        ))}
      </div>

      <div className="shopr__foot">
        <span className="shopr__progress" aria-hidden>
          <span />
        </span>
      </div>
    </div>
  );
}
