import type { Metadata } from 'next';
import ShoptetGuidePage from '@/components/pages/ShoptetGuidePage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('shoptetGuide', 'cs');

export default function Page() {
  return <ShoptetGuidePage lang="cs" />;
}
