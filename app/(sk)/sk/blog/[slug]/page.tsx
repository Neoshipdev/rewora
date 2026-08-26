import type { Metadata } from 'next';
import ArticlePage, { blogDir } from '@/components/pages/ArticlePage';
import { listSlugs, readDoc } from '@/lib/markdown';
import { docMeta } from '@/lib/meta';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await listSlugs(blogDir('sk'));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugs = await listSlugs(blogDir('sk'));
  if (!slugs.includes(params.slug)) return {};
  const doc = await readDoc(`${blogDir('sk')}/${params.slug}.md`);
  return docMeta('sk', `/sk/blog/${params.slug}/`, doc.title, doc.perex);
}

export default function Page({ params }: Props) {
  return <ArticlePage lang="sk" slug={params.slug} />;
}
