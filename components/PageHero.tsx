type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Voliteľná drobná navigácia späť. */
  back?: { label: string; href: string };
  /** Voliteľný vizuál vpravo od textu. */
  image?: { src: string; alt: string };
  children?: React.ReactNode;
};

export default function PageHero({ eyebrow, title, lead, back, image, children }: Props) {
  const obsah = (
    <>
      {back && (
        <a className="page-hero__back" href={back.href}>
          ← {back.label}
        </a>
      )}
      <span className="eyebrow page-hero__eyebrow">{eyebrow}</span>
      <h1 className="page-hero__title">{title}</h1>
      {lead && <p className="page-hero__lead">{lead}</p>}
      {children}
    </>
  );

  return (
    <section className="page-hero">
      <div className={`container page-hero__inner ${image ? 'page-hero__inner--split' : ''}`}>
        {image ? (
          <>
            <div className="page-hero__copy">{obsah}</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="page-hero__visual" src={image.src} alt={image.alt} />
          </>
        ) : (
          obsah
        )}
      </div>
    </section>
  );
}
