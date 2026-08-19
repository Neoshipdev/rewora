/**
 * Značka Rewora — oficiálne logo (SVG).
 * `variant="light"` je biela verzia pre tmavé a oranžové pozadia.
 */
type Props = {
  variant?: 'light' | 'brand';
  height?: number;
  href?: string | null;
  className?: string;
};

export default function Logo({ variant = 'light', height = 26, href = '/sk/', className }: Props) {
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

  if (!href) return image;
  return (
    <a href={href} className="logo-link" aria-label="Rewora — domovská stránka">
      {image}
    </a>
  );
}
