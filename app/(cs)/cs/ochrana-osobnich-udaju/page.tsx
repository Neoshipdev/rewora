import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { routes } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('privacy', 'cs');

export default function Page() {
  return (
    <ContentPage
      file="ochrana-osobnich-udaju"
      eyebrow="Ochrana osobních údajů"
      lang="cs"
      url={routes.privacy['cs'] ?? undefined}
    />
  );
}
