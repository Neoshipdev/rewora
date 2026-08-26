import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('terms', 'sk');

export default function Page() {
  return <ContentPage file="vseobecne-obchodne-podmienky" eyebrow="Obchodné podmienky" lang="sk" />;
}
