import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('thanks', 'sk', { robots: { index: false, follow: true } });

export default function Page() {
  return <ContentPage file="dakujeme" eyebrow="Ďakujeme" lang="sk" hideCta />;
}
