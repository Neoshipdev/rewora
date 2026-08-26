import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('about', 'sk');

export default function Page() {
  return <AboutPage lang="sk" />;
}
