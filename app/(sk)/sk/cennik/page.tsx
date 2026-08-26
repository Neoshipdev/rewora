import type { Metadata } from 'next';
import PricingPage from '@/components/pages/PricingPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('pricing', 'sk');

export default function Page() {
  return <PricingPage lang="sk" />;
}
