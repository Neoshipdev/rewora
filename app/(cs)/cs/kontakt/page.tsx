import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('contact', 'cs');

export default function Page() {
  return <ContactPage lang="cs" />;
}
