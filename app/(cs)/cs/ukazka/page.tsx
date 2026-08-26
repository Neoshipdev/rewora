import type { Metadata } from 'next';
import DemoPage from '@/components/pages/DemoPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('demo', 'cs');

export default function Page() {
  return <DemoPage lang="cs" />;
}
