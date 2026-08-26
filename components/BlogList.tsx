'use client';

import { useMemo, useState } from 'react';
import type { BlogListItem } from '@/lib/posts';

type Texts = { all: string; filter: string };

export default function BlogList({
  posts,
  base = '/sk/blog/',
  locale = 'sk',
  texts = { all: 'Všetky články', filter: 'Filtrovať podľa kategórie' },
}: {
  posts: BlogListItem[];
  base?: string;
  locale?: string;
  texts?: Texts;
}) {
  const categories = useMemo(
    () =>
      Array.from(new Set(posts.map((p) => p.category).filter(Boolean))).sort((a, b) =>
        a.localeCompare(b, locale)
      ),
    [posts]
  );
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? posts.filter((p) => p.category === active) : posts;

  return (
    <>
      <div className="blog-filters" role="group" aria-label={texts.filter}>
        <button
          type="button"
          className={`chip ${active === null ? 'chip--on' : ''}`}
          aria-pressed={active === null}
          onClick={() => setActive(null)}
        >
          {texts.all} ({posts.length})
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip ${active === category ? 'chip--on' : ''}`}
            aria-pressed={active === category}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {shown.map((post) => (
          <article className="post-card" key={post.slug}>
            {post.image && (
              <a href={`${base}${post.slug}/`} className="post-card__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt="" loading="lazy" />
              </a>
            )}
            {post.category && <span className="post-card__cat">{post.category}</span>}
            <h2 className="post-card__title">
              <a href={`${base}${post.slug}/`}>{post.title}</a>
            </h2>
            {post.perex && <p className="post-card__perex">{post.perex}</p>}
            <span className="post-card__meta">
              {[post.author, post.date].filter(Boolean).join(' · ')}
            </span>
          </article>
        ))}
      </div>
    </>
  );
}
