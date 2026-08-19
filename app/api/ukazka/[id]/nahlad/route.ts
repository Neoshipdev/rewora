import { getJob } from '@/lib/demo/jobs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Náhľad ukážky v prehliadači (rovnaký obsah ako PDF). */
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const job = getJob(params.id);
  if (!job || !job.html) return new Response('Ukážka ešte nie je pripravená.', { status: 404 });

  return new Response(job.html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
