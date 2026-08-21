import { aiSummary } from '@/lib/panel-data';

/**
 * AI zhrnutie recenzií — pozitíva zelenou, výhrady červenou, aby zákazník
 * na prvý pohľad videl, čo produkt vie a kde má slabinu.
 */
export default function AiSummary() {
  const stlpec = (
    data: { title: string; items: readonly string[] },
    druh: 'plus' | 'minus'
  ) => (
    <div className={`aisum__col aisum__col--${druh}`}>
      <span className="aisum__col-head">
        <span className="aisum__mark" aria-hidden>
          {druh === 'plus' ? '↑' : '↓'}
        </span>
        {data.title}
      </span>
      <ul>
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="aisum">
      <div className="aisum__head">
        <span className="aisum__title">{aiSummary.title}</span>
        <span className="aisum__badge">✦ {aiSummary.badge}</span>
      </div>

      <p className="aisum__text">{aiSummary.text}</p>

      <div className="aisum__cols">
        {stlpec(aiSummary.pros, 'plus')}
        {stlpec(aiSummary.cons, 'minus')}
      </div>

      <div className="aisum__foot">
        <span>{aiSummary.foot}</span>
        <span className="aisum__votes">
          <span className="aisum__vote aisum__vote--yes">Pomohlo</span>
          <span className="aisum__vote">Nepomohlo</span>
        </span>
      </div>
    </div>
  );
}
