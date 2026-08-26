'use client';

import { useCallback, useEffect, useState } from 'react';
import { heroVideo as heroVideoData } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { createT, tDeep } from '@/lib/t';

/** Tlačidlo „Pozrieť video“ + modálny prehrávač (YouTube bez cookies). */
export default function VideoButton({
  className = 'btn btn--video',
  lang = 'sk',
}: {
  className?: string;
  lang?: Lang;
}) {
  const t = createT(lang);
  const heroVideo = tDeep(heroVideoData, lang);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        <svg width="14" height="16" viewBox="0 0 13 16" aria-hidden focusable="false">
          <path
            d="M2.3 0.84A1.5 1.5 0 0 0 0 2.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.34-5.89a1.5 1.5 0 0 0 0-2.54L2.3 0.84Z"
            fill="currentColor"
          />
        </svg>
        {heroVideo.label}
      </button>

      {open && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={heroVideo.title}
          onClick={close}
        >
          <div className="video-modal__box" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="video-modal__close" onClick={close} aria-label={t('Zavrieť video')}>
              ✕
            </button>
            <div className="video-modal__frame">
              <iframe
                src={`${heroVideo.embed}?autoplay=1&rel=0`}
                title={heroVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
