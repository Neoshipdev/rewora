import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { routes } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('thanks', 'sk', { robots: { index: false, follow: true } });

export default function Page() {
  return (
    <ContentPage
      file="dakujeme"
      eyebrow="Ďakujeme"
      lang="sk"
      url={routes.thanks['sk'] ?? undefined} hideCta
    />
  );
}
