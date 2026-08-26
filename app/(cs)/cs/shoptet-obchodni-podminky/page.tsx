import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('shoptet', 'cs');

export default function Page() {
  return <ContentPage file="shoptet-obchodni-podminky" eyebrow="Obchodní podmínky Shoptet" lang="cs" />;
}
