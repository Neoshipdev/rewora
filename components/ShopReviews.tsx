/**
 * Karusel recenzií obchodu — widget, ktorý e-shop nasadzuje na homepage.
 * Používa sa v mockupe admin panela.
 */
import type { Lang } from '@/lib/i18n';
import { shopReviews } from '@/lib/panel-data';
import { createT, tDeep } from '@/lib/t';

export default function ShopReviews({ lang = 'sk' }: { lang?: Lang }) {
  const t = createT(lang);
  const recenzie = tDeep(shopReviews, lang);
  return (
    <div className="shopr">
      <div className="shopr__head">
        <span className="shopr__title">{recenzie.title}</span>
        <span className="shopr__arrows" aria-hidden>
          <span className="shopr__arrow">←</span>
          <span className="shopr__arrow">→</span>
        </span>
      </div>

      <div className="shopr__grid">
        {recenzie.items.map((item) => (
          <div className="shopr__item" key={item.text}>
            <span className="shopr__stars" role="img" aria-label={t('Hodnotenie {n} z 5').replace('{n}', String(item.stars))}>
              {'★'.repeat(item.stars)}
            </span>
            <p className="shopr__text">{item.text}</p>
            <span className="shopr__source">{item.source}</span>
            <span className="shopr__report">⚑ {recenzie.report}</span>
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
