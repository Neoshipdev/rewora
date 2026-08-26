import CtaBand from '@/components/CtaBand';
import DemoForm from '@/components/DemoForm';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { altOf, type Lang } from '@/lib/i18n';
import { createT, tDeep } from '@/lib/t';

const steps = [
  {
    num: '01',
    title: 'Zadáte adresu e-shopu',
    text: 'Stačí doména, nič neinštalujete a do e-shopu nezasahujeme.',
  },
  {
    num: '02',
    title: 'Nasnímame váš web',
    text: 'Automaticky otvoríme homepage aj jednu produktovú stránku a zistíme vašu dizajnovú farbu.',
  },
  {
    num: '03',
    title: 'Poskladáme widgety',
    text: 'Recenzie, poradňu, hotspoty a BI dáta vložíme priamo do snímok vášho webu a prefarbíme podľa vášho dizajnu.',
  },
  {
    num: '04',
    title: 'Stiahnete si PDF',
    text: 'Osemstranová ukážka, ktorú môžete rovno poslať kolegom alebo vedeniu.',
  },
];

/** Generátor ukážky — spoločná stránka pre všetky jazykové mutácie. */
export default function DemoPage({ lang }: { lang: Lang }) {
  const t = createT(lang);
  const kroky = tDeep(steps, lang);

  return (
    <>
      <TopBar lang={lang} alt={altOf('demo')} />
      <PageHero
        eyebrow={t('Ukážka na mieru')}
        title={t('Ukážka Rewory na vašom e-shope')}
        lead={t(
          'Zadajte adresu svojho e-shopu a do minúty dostanete PDF s tým, ako by na ňom vyzerali recenzie, poradňa, hotspoty a BI dáta — vo vašich farbách a s vaším produktom.'
        )}
      />

      <section className="section">
        <div className="container demo-split">
          <div className="demo-split__form">
            <DemoForm lang={lang} />

            <div className="demo-steps">
              <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
                {t('Ako to funguje')}
              </span>
              <h2 className="h2 demo-steps__title">{t('Štyri kroky k ukážke na mieru')}</h2>
              <div className="demo-steps__grid">
                {kroky.map((step) => (
                  <div key={step.num} className="integration">
                    <span className="integration__num">{step.num}</span>
                    <h3 className="integration__name">{step.title}</h3>
                    <p className="integration__text">{step.text}</p>
                  </div>
                ))}
              </div>
              <p className="faq__note">
                {t(
                  'Ukážka je nezáväzná a vytvára sa len zo verejne dostupných stránok vášho e-shopu. Chcete ju rovno nasadiť? Napíšte nám na'
                )}{' '}
                <a href="mailto:info@rewora.com">info@rewora.com</a>.
              </p>
            </div>
          </div>
          {/* reálne nasadenie u zákazníka — vedľa generátora ukazuje výsledok */}
          <figure className="demo-sample">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ukazka-pantarhei.png"
              alt={t('Widgety Rewory na produktovej stránke e-shopu Panta Rhei')}
            />
            <figcaption>
              {t(
                'Takto widgety vyzerajú v ostrej prevádzke — recenzie, hodnotenia aj poradňa na karte produktu e-shopu Panta Rhei.'
              )}
            </figcaption>
          </figure>
        </div>
      </section>

      <CtaBand lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
