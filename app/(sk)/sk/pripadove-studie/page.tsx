import type { Metadata } from 'next';
import CasesPage from '@/components/pages/CasesPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('cases', 'sk');

export default function Page() {
  return <CasesPage lang="sk" />;
}
