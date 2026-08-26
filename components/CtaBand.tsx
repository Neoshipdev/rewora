import { demoCta, finalCta } from '@/lib/content';
import { routes, type Lang } from '@/lib/i18n';
import { tDeep } from '@/lib/t';

type Props = { title?: string; subtitle?: string; lang?: Lang };

export default function CtaBand({ title, subtitle, lang = 'sk' }: Props) {
  const demo = tDeep(demoCta, lang);
  const finale = tDeep(finalCta, lang);
  return (
    <section className="cta">
      <div className="container cta__inner">
        <div className="cta__copy">
          <h2>{title ?? finale.title}</h2>
          <p>{subtitle ?? finale.subtitle}</p>
        </div>
        <div className="cta__actions">
          <a className="btn btn--dark btn--lg" href={routes.demo[lang] ?? demo.href}>
            {demo.label}
          </a>
          <a className="btn btn--ghost btn--lg" href={routes.pricing[lang] ?? finale.button.href}>
            {finale.button.label}
          </a>
        </div>
      </div>
    </section>
  );
}
