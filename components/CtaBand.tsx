import { demoCta, finalCta } from '@/lib/content';

type Props = { title?: string; subtitle?: string };

export default function CtaBand({ title, subtitle }: Props) {
  return (
    <section className="cta">
      <div className="container cta__inner">
        <div className="cta__copy">
          <h2>{title ?? finalCta.title}</h2>
          <p>{subtitle ?? finalCta.subtitle}</p>
        </div>
        <div className="cta__actions">
          <a className="btn btn--dark btn--lg" href={demoCta.href}>
            {demoCta.label}
          </a>
          <a className="btn btn--ghost btn--lg" href={finalCta.button.href}>
            {finalCta.button.label}
          </a>
        </div>
      </div>
    </section>
  );
}
