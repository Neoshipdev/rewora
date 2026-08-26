import type { Metadata } from 'next';
import CasesPage from '@/components/pages/CasesPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('cases', 'en');

export default function Page() {
  return <CasesPage lang="en" />;
}
