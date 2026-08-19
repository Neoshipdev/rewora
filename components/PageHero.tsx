type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Voliteľná drobná navigácia späť. */
  back?: { label: string; href: string };
  children?: React.ReactNode;
};

export default function PageHero({ eyebrow, title, lead, back, children }: Props) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        {back && (
          <a className="page-hero__back" href={back.href}>
            ← {back.label}
          </a>
        )}
        <span className="eyebrow page-hero__eyebrow">{eyebrow}</span>
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
