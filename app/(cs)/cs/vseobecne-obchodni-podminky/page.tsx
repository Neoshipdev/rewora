import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('terms', 'cs');

export default function Page() {
  return <ContentPage file="vseobecne-obchodni-podminky" eyebrow="Obchodní podmínky" lang="cs" />;
}
