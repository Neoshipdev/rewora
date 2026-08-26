import type { Metadata } from 'next';
import BlogIndexPage from '@/components/pages/BlogIndexPage';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = pageMeta('blog', 'sk');

export default function Page() {
  return <BlogIndexPage lang="sk" />;
}
