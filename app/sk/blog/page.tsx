import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import { getBlogIndex } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog ★ Rewora',
  description:
    'Články o recenziách, sociálnom dôkaze, obsahovom marketingu a e-commerce od tímu Rewora.',
  alternates: { canonical: '/sk/blog/' },
};

export default async function BlogPage() {
  const posts = await getBlogIndex();

  return (
    <>
      <TopBar />
      <PageHero
        eyebrow="Blog"
        title="Recenzie, sociálny dôkaz a e-commerce v praxi"
        lead="Budujte dôveru u vašich zákazníkov a merateľne zvýšte konverzný pomer vášho e‑shopu jednoducho na pár klikov."
      />

      <section className="section">
        <div className="container">
          <BlogList posts={posts} />
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </>
  );
}
