import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { routes } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('privacy', 'sk');

export default function Page() {
  return (
    <ContentPage
      file="ochrana-osobnych-udajov"
      eyebrow="Ochrana osobných údajov"
      lang="sk"
      url={routes.privacy['sk'] ?? undefined}
    />
  );
}
