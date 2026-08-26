import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('terms', 'en');

export default function Page() {
  return <ContentPage file="general-terms-and-conditions" eyebrow="Terms and conditions" lang="en" />;
}
