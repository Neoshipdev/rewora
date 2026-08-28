import type { Metadata } from 'next';
import ShopifyGuidePage from '@/components/pages/ShopifyGuidePage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('shopifyGuide', 'en');

export default function Page() {
  return <ShopifyGuidePage lang="en" />;
}
