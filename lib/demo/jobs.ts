/**
 * Jednoduchý in-memory register úloh na generovanie ukážky.
 * (Pri nasadení na viac inštancií nahradiť frontou / úložiskom.)
 */
import { randomUUID } from 'node:crypto';
import { captureSite, normalizeUrl } from './capture';
import { buildDeckHtml, renderPdf } from './deck';

export type JobStatus = 'pending' | 'running' | 'done' | 'error';

export type Job = {
  id: string;
  url: string;
  domain: string;
  status: JobStatus;
  step: string;
  steps: string[];
  warnings: string[];
  error?: string;
  pdf?: Buffer;
  html?: string;
  fileName?: string;
  createdAt: number;
};

/**
 * Next.js bundluje route handlery samostatne, takže obyčajná modulová premenná
 * by pre každý endpoint vytvorila vlastnú mapu — register držíme na globalThis.
 */
const globalStore = globalThis as unknown as { __reworaJobs?: Map<string, Job> };
const jobs = (globalStore.__reworaJobs ??= new Map<string, Job>());
const MAX_AGE_MS = 30 * 60 * 1000;

function sweep() {
  const now = Date.now();
  for (const [id, job] of jobs) {
    if (now - job.createdAt > MAX_AGE_MS) jobs.delete(id);
  }
}

export function getJob(id: string): Job | undefined {
  sweep();
  return jobs.get(id);
}

export function createJob(rawUrl: string): Job {
  sweep();
  const url = normalizeUrl(rawUrl);
  const job: Job = {
    id: randomUUID(),
    url,
    domain: new URL(url).hostname.replace(/^www\./, ''),
    status: 'pending',
    step: 'Zaraďujem do fronty…',
    steps: [],
    warnings: [],
    createdAt: Date.now(),
  };
  jobs.set(job.id, job);

  void run(job);
  return job;
}

async function run(job: Job) {
  const setStep = (message: string) => {
    job.step = message;
    job.steps.push(message);
  };

  try {
    job.status = 'running';
    const capture = await captureSite(job.url, setStep);
    job.warnings = capture.warnings;

    setStep('Skladám widgety do ukážky…');
    const html = buildDeckHtml(capture);
    job.html = html;

    setStep('Generujem PDF…');
    job.pdf = await renderPdf(html);
    job.fileName = `Rewora ukazka - ${job.domain}.pdf`;

    setStep('Hotovo.');
    job.status = 'done';
  } catch (error) {
    job.status = 'error';
    job.error = error instanceof Error ? error.message : 'Neznáma chyba pri generovaní ukážky.';
  }
}
