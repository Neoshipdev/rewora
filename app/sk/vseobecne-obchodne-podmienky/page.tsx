import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';

export const metadata: Metadata = {
  title: 'Všeobecné obchodné podmienky ★ Rewora',
  description: 'Všeobecné obchodné podmienky pre používanie služby Rewora.',
  alternates: { canonical: '/sk/vseobecne-obchodne-podmienky/' },
};

export default function Page() {
  return <ContentPage file="vseobecne-obchodne-podmienky" eyebrow="Obchodné podmienky" />;
}
