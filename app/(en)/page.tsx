import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('home', 'en');

export default function Page() {
  return <HomePage lang="en" />;
}
