import { llmsTxt } from '@/lib/llms';

/* Statický súbor pre jazykové modely — vzniká pri builde. */
export const dynamic = 'force-static';

export async function GET() {
  return new Response(await llmsTxt('en'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
