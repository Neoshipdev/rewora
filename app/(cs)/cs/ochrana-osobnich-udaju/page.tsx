import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('privacy', 'cs');

export default function Page() {
  return <ContentPage file="ochrana-osobnich-udaju" eyebrow="Ochrana osobních údajů" lang="cs" />;
}
