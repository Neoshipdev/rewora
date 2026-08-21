import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import IntegrationGrid from '@/components/IntegrationGrid';
import PageHero from '@/components/PageHero';
import PricingPlans from '@/components/PricingPlans';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { integrationsIntro } from '@/lib/features';

export const metadata: Metadata = {
  title: 'Cenník ★ Rewora',
  description:
    'Balíky Rewora: Bezplatný, Štandardný, Profesionálny a Podnikový. Widgety pre recenzie, poradňu, hotspoty a BI dáta.',
  alternates: { canonical: '/sk/cennik/' },
};

export default function CennikPage() {
  return (
    <>
      <TopBar />
      <PageHero
        eyebrow="Cenník"
        title="Vyberte si balík, ktorý sedí vášmu e-shopu"
        lead="Začnite zadarmo a rozšírte sa vtedy, keď to dáva zmysel. Všetky balíky obsahujú widgety, ktoré presvedčia zákazníka priamo na karte produktu."
      />

      <section className="section">
        <div className="container">
          <PricingPlans />
        </div>
      </section>

      <section className="section integrations">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--orange-500)' }}>
            Integrácie
          </span>
          <h2 className="h2" style={{ maxWidth: 720, marginTop: 8 }}>
            Jednoduchá a rýchla integrácia
          </h2>
          <p style={{ maxWidth: 640, marginTop: 14, fontSize: 16.1, color: 'var(--ink-600)' }}>
            {integrationsIntro}
          </p>
          <IntegrationGrid />
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </>
  );
}
