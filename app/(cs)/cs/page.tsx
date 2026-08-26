import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('home', 'cs');

export default function Page() {
  return <HomePage lang="cs" />;
}
