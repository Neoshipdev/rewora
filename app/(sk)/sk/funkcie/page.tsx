import type { Metadata } from 'next';
import FeaturesPage from '@/components/pages/FeaturesPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('features', 'sk');

export default function Page() {
  return <FeaturesPage lang="sk" />;
}
