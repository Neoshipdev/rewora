import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { routes } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('terms', 'cs');

export default function Page() {
  return (
    <ContentPage
      file="vseobecne-obchodni-podminky"
      eyebrow="Obchodní podmínky"
      lang="cs"
      url={routes.terms['cs'] ?? undefined}
    />
  );
}
