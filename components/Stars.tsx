type Props = {
  value?: number;
  size?: number;
  className?: string;
  /** farba prázdnych hviezd — v panely #E2DDD6, na svetlom podklade #F5C3A6 */
  emptyColor?: string;
};

export default function Stars({ value = 5, size = 12, className, emptyColor }: Props) {
  const filled = '★'.repeat(value);
  const empty = '★'.repeat(5 - value);
  return (
    <span
      className={`stars ${className ?? ''}`}
      style={{ fontSize: size, letterSpacing: size >= 16 ? '2px' : '1px' }}
      aria-label={`Hodnotenie ${value} z 5`}
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
