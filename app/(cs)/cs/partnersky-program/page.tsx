import type { Metadata } from 'next';
import PartnerPage from '@/components/pages/PartnerPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('partner', 'cs');

export default function Page() {
  return <PartnerPage lang="cs" />;
}
