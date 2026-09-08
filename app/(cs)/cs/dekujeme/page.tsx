import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { routes } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('thanks', 'cs', { robots: { index: false, follow: true } });

export default function Page() {
  return (
    <ContentPage
      file="dekujeme"
      eyebrow="Děkujeme"
      lang="cs"
      url={routes.thanks['cs'] ?? undefined} hideCta
    />
  );
}
