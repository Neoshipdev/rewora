import type { Lang } from '@/lib/i18n';
import { aiSummary } from '@/lib/panel-data';
import { createT, tDeep } from '@/lib/t';

/**
 * AI zhrnutie recenzií — pozitíva zelenou, výhrady červenou, aby zákazník
 * na prvý pohľad videl, čo produkt vie a kde má slabinu.
 */
export default function AiSummary({ lang = 'sk' }: { lang?: Lang }) {
  const t = createT(lang);
  const suhrn = tDeep(aiSummary, lang);
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
        <span className="aisum__title">{suhrn.title}</span>
        <span className="aisum__badge">✦ {suhrn.badge}</span>
      </div>

      <p className="aisum__text">{suhrn.text}</p>

      <div className="aisum__cols">
        {stlpec(suhrn.pros, 'plus')}
        {stlpec(suhrn.cons, 'minus')}
      </div>

      <div className="aisum__foot">
        <span>{suhrn.foot}</span>
        <span className="aisum__votes">
          <span className="aisum__vote aisum__vote--yes">{t('Pomohlo')}</span>
          <span className="aisum__vote">{t('Nepomohlo')}</span>
        </span>
      </div>
    </div>
  );
}
