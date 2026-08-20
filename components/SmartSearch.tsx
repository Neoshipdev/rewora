import Stars from '@/components/Stars';
import { SearchIcon } from '@/components/icons';
import { smartSearch } from '@/lib/panel-data';

/**
 * Inteligentné vyhľadávanie — widget rozumie celej otázke zákazníka
 * a rozloží ju na vlastnosti, podľa ktorých zúži výsledky.
 */
export default function SmartSearch() {
  return (
    <div className="ssearch">
      <div className="ssearch__bar">
        <span className="ssearch__icon" aria-hidden>
          <SearchIcon size={18} />
        </span>
        <span className="ssearch__query">{smartSearch.query}</span>
        <span className="ssearch__caret" aria-hidden />
      </div>

      <div className="ssearch__chips">
        {smartSearch.understood.map((chip) => (
          <span key={chip.label} className="ssearch__chip">
            <span className="ssearch__chip-label">{chip.label}:</span> {chip.value}
          </span>
        ))}
        <span className="ssearch__count">{smartSearch.resultsLabel}</span>
      </div>

      <ul className="ssearch__results">
        {smartSearch.results.map((item) => (
          <li key={item.name} className="ssearch__item">
            <span className="ssearch__thumb" aria-hidden />
            <span className="ssearch__info">
              <span className="ssearch__name">{item.name}</span>
              <span className="ssearch__meta">{item.meta}</span>
              <Stars value={item.stars} size={12} />
            </span>
            <span className="ssearch__price">{item.price}</span>
          </li>
        ))}
      </ul>

      <p className="ssearch__hint">{smartSearch.hint}</p>
    </div>
  );
}
