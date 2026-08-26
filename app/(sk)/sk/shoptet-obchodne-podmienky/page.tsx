import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('shoptet', 'sk');

export default function Page() {
  return <ContentPage file="shoptet-obchodne-podmienky" eyebrow="Obchodné podmienky Shoptet" lang="sk" />;
}
