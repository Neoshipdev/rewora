'use client';

import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/lib/i18n';
import { createT } from '@/lib/t';

type Status = 'idle' | 'running' | 'done' | 'error';

type JobState = {
  id: string;
  status: 'pending' | 'running' | 'done' | 'error';
  step: string;
  steps: string[];
  warnings: string[];
  error?: string;
  fileName?: string;
  domain: string;
};

export default function DemoForm({ lang = 'sk' }: { lang?: Lang }) {
  const t = createT(lang);
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [job, setJob] = useState<JobState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => void (timer.current && clearInterval(timer.current)), []);

  const poll = (id: string) => {
    timer.current = setInterval(async () => {
      const res = await fetch(`/api/ukazka/${id}/`, { cache: 'no-store' });
      if (!res.ok) return;
      const state: JobState = await res.json();
      setJob(state);
      if (state.status === 'done' || state.status === 'error') {
        if (timer.current) clearInterval(timer.current);
        setStatus(state.status === 'done' ? 'done' : 'error');
        if (state.status === 'error') setError(state.error ?? t('Ukážku sa nepodarilo vytvoriť.'));
      }
    }, 1200);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setJob(null);
    setStatus('running');

    const res = await fetch('/api/ukazka/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();

    if (!res.ok) {
      setStatus('error');
      setError(data.error ?? t('Adresu sa nepodarilo spracovať.'));
      return;
    }
    setJob({ id: data.id, domain: data.domain, status: 'pending', step: t('Spúšťam…'), steps: [], warnings: [] });
    poll(data.id);
  };

  const reset = () => {
    setStatus('idle');
    setJob(null);
    setError(null);
  };

  return (
    <div className="demo">
      <form className="demo__form" onSubmit={submit}>
        <label className="demo__label" htmlFor="eshop-url">
          {t('Adresa vášho e-shopu')}
        </label>
        <div className="demo__row">
          <input
            id="eshop-url"
            className="demo__input"
            type="text"
            inputMode="url"
            placeholder={t('napr. www.vasobchod.sk')}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={status === 'running'}
          />
          <button className="btn btn--orange demo__submit" type="submit" disabled={status === 'running'}>
            {status === 'running' ? t('Generujem…') : t('Vytvoriť ukážku')}
          </button>
        </div>
        <p className="demo__hint">
          {t(
            'Ukážku vytvoríme automaticky zo snímok vášho webu — trvá to približne minútu. Nič neinštalujete.'
          )}
        </p>
      </form>

      {status === 'running' && (
        <div className="demo__progress" role="status" aria-live="polite">
          <div className="demo__spinner" aria-hidden />
          <div>
            <b>{job?.step ?? t('Spúšťam…')}</b>
            <ul className="demo__steps">
              {(job?.steps ?? []).slice(0, -1).map((step, i) => (
                <li key={`${step}-${i}`}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {status === 'done' && job && (
        <div className="demo__result">
          <span className="demo__badge">{t('Ukážka je pripravená')}</span>
          <h3>{t('Rewora widgety na')} {job.domain}</h3>
          <p>
            {t(
              'PDF obsahuje 8 strán — hotspoty, BI dáta, recenzie na homepage aj pri produkte, poradňu a hviezdičky v Google Shopping. Widgety sú prefarbené podľa dizajnu vášho webu.'
            )}
          </p>
          {job.warnings.length > 0 && (
            <ul className="demo__warnings">
              {job.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          )}
          <div className="demo__actions">
            <a className="btn btn--dark" href={`/api/ukazka/${job.id}/pdf/`} download>
              {t('Stiahnuť ukážku (PDF)')}
            </a>
            <a
              className="btn btn--outline-dark"
              href={`/api/ukazka/${job.id}/nahlad/`}
              target="_blank"
              rel="noreferrer"
            >
              {t('Otvoriť v prehliadači')}
            </a>
            <button className="demo__again" type="button" onClick={reset}>
              {t('Vytvoriť ďalšiu ukážku')}
            </button>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="demo__error">
          <b>{t('Ukážku sa nepodarilo vytvoriť.')}</b>
          <p>{error}</p>
          <button className="demo__again" type="button" onClick={reset}>
            {t('Skúsiť znova')}
          </button>
        </div>
      )}
    </div>
  );
}
