import type { Metadata } from 'next';
import CasePage from '@/components/pages/CasePage';
import { readDoc } from '@/lib/markdown';
import { docMeta } from '@/lib/meta';
import { caseStudiesByLang, caseStudyRef } from '@/lib/posts';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudiesByLang.cs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ref = caseStudyRef(params.slug, 'cs');
  if (!ref) return {};
  const doc = await readDoc(`${ref.file}.md`);
  return docMeta('cs', `/cs/pripadove-studie/${params.slug}/`, doc.title, doc.perex);
}

export default function Page({ params }: Props) {
  return <CasePage lang="cs" slug={params.slug} />;
}
