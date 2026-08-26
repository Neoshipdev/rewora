/**
 * Značka Rewora — oficiálne logo (SVG).
 * `variant="light"` je biela verzia pre tmavé a oranžové pozadia.
 */
import { home, type Lang } from '@/lib/i18n';
import { createT } from '@/lib/t';

type Props = {
  variant?: 'light' | 'brand';
  height?: number;
  href?: string | null;
  className?: string;
  lang?: Lang;
};

export default function Logo({
  variant = 'light',
  height = 26,
  href,
  className,
  lang = 'sk',
}: Props) {
  const t = createT(lang);
  const ciel = href === null ? null : href ?? home[lang];
  const src = variant === 'light' ? '/images/logo-rewora-white.svg' : '/images/logo-rewora.svg';

  const image = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt="Rewora"
      className={`logo-img ${className ?? ''}`}
      style={{ height }}
      width={height * 6.2}
      height={height}
    />
  );

  if (!ciel) return image;
  return (
    <a href={ciel} className="logo-link" aria-label={t('Rewora — domovská stránka')}>
      {image}
    </a>
  );
}
