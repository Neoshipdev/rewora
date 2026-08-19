import { getJob } from '@/lib/demo/jobs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const job = getJob(params.id);
  if (!job || job.status !== 'done' || !job.pdf) {
    return new Response('Ukážka ešte nie je pripravená.', { status: 404 });
  }

  return new Response(new Uint8Array(job.pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(job.fileName ?? 'rewora-ukazka.pdf')}"`,
      'Cache-Control': 'no-store',
    },
  });
}
