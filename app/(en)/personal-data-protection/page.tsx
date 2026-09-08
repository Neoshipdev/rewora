import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { routes } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('privacy', 'en');

export default function Page() {
  return (
    <ContentPage
      file="personal-data-protection"
      eyebrow="Personal data protection"
      lang="en"
      url={routes.privacy['en'] ?? undefined}
    />
  );
}
