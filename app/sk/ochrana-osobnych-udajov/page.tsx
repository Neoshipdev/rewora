import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov ★ Rewora',
  description: 'Zásady spracúvania a ochrany osobných údajov v službe Rewora.',
  alternates: { canonical: '/sk/ochrana-osobnych-udajov/' },
};

export default function Page() {
  return <ContentPage file="ochrana-osobnych-udajov" eyebrow="Ochrana osobných údajov" />;
}
