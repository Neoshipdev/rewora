import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';

export const metadata: Metadata = {
  title: 'Obchodné podmienky pre Shoptet ★ Rewora',
  description: 'Obchodné podmienky pre používanie Rewory na platforme Shoptet.',
  alternates: { canonical: '/sk/shoptet-obchodne-podmienky/' },
};

export default function Page() {
  return <ContentPage file="shoptet-obchodne-podmienky" eyebrow="Obchodné podmienky Shoptet" />;
}
