import { NextResponse } from 'next/server';
import { getJob } from '@/lib/demo/jobs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const job = getJob(params.id);
  if (!job) return NextResponse.json({ error: 'Ukážka nebola nájdená.' }, { status: 404 });

  return NextResponse.json({
    id: job.id,
    domain: job.domain,
    status: job.status,
    step: job.step,
    steps: job.steps,
    warnings: job.warnings,
    error: job.error,
    fileName: job.fileName,
  });
}
