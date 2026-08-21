import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import DemoForm from '@/components/DemoForm';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';

export const metadata: Metadata = {
  title: 'Ukážka Rewory na vašom e-shope ★ Rewora',
  description:
    'Zadajte adresu svojho e-shopu a do minúty dostanete PDF ukážku, ako by na ňom vyzerali recenzie, poradňa, hotspoty a BI dáta.',
  alternates: { canonical: '/sk/ukazka/' },
};

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

export default function UkazkaPage() {
  return (
    <>
      <TopBar />
      <PageHero
        eyebrow="Ukážka na mieru"
        title="Ukážka Rewory na vašom e-shope"
        lead="Zadajte adresu svojho e-shopu a do minúty dostanete PDF s tým, ako by na ňom vyzerali recenzie, poradňa, hotspoty a BI dáta — vo vašich farbách a s vaším produktom."
      />

      <section className="section">
        <div className="container">
          <DemoForm />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            Ako to funguje
          </span>
          <h2 className="h2" style={{ maxWidth: 720, marginTop: 8 }}>
            Štyri kroky k ukážke na mieru
          </h2>
          <div className="integrations__grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {steps.map((step) => (
              <div key={step.num} className="integration">
                <span className="integration__num">{step.num}</span>
                <h3 className="integration__name">{step.title}</h3>
                <p className="integration__text">{step.text}</p>
              </div>
            ))}
          </div>
          <p className="faq__note">
            Ukážka je nezáväzná a vytvára sa len zo verejne dostupných stránok vášho e-shopu.
            Chcete ju rovno nasadiť? Napíšte nám na <a href="mailto:info@rewora.com">info@rewora.com</a>.
          </p>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </>
  );
}
