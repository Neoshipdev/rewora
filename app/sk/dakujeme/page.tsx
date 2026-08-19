import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';

export const metadata: Metadata = {
  title: 'Ďakujeme ★ Rewora',
  description: 'Ďakujeme za váš záujem o Reworu — čoskoro sa vám ozveme.',
  alternates: { canonical: '/sk/dakujeme/' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ContentPage file="dakujeme" eyebrow="Ďakujeme" hideCta />;
}
