import { NextResponse } from 'next/server';
import { createJob } from '@/lib/demo/jobs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function POST(request: Request) {
  let url: unknown;
  try {
    ({ url } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Neplatná požiadavka.' }, { status: 400 });
  }

  if (typeof url !== 'string' || !url.trim()) {
    return NextResponse.json({ error: 'Zadajte adresu vášho e-shopu.' }, { status: 400 });
  }

  try {
    const job = createJob(url);
    return NextResponse.json({ id: job.id, domain: job.domain });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Neplatná adresa webu.' },
      { status: 400 }
    );
  }
}
