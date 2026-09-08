import type { Metadata } from 'next';
import FaqPage from '@/components/pages/FaqPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('faq', 'en');

export default function Page() {
  return <FaqPage lang="en" />;
}
