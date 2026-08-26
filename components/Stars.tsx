import type { Lang } from '@/lib/i18n';
import { createT } from '@/lib/t';

type Props = {
  value?: number;
  size?: number;
  className?: string;
  /** farba prázdnych hviezd — v panely #E2DDD6, na svetlom podklade #F5C3A6 */
  emptyColor?: string;
  lang?: Lang;
};

export default function Stars({ value = 5, size = 12, className, emptyColor, lang = 'sk' }: Props) {
  const t = createT(lang);
  const filled = '★'.repeat(value);
  const empty = '★'.repeat(5 - value);
  return (
    <span
      className={`stars ${className ?? ''}`}
      style={{ fontSize: size, letterSpacing: size >= 16 ? '2px' : '1px' }}
      aria-label={t('Hodnotenie {n} z 5').replace('{n}', String(value))}
      role="img"
    >
      {filled}
      {empty && (
        <span style={{ color: emptyColor ?? 'var(--line-400)' }} aria-hidden>
          {empty}
        </span>
      )}
    </span>
  );
}
