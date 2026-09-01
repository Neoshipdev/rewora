import { integrationShots } from '@/lib/assets';
import { integrations } from '@/lib/content';
import { routes, type Lang } from '@/lib/i18n';
import { createT } from '@/lib/t';

/** Integrácie, ku ktorým máme návod — na karte pribudne odkaz naň. */
const navody: Record<string, keyof typeof routes> = { 'Shopify Plugin': 'shopifyGuide' };

/**
 * Spôsoby integrácie — spoločné pre homepage aj cenník.
 * Snímky aj návody hľadáme podľa pôvodného názvu, preklad riešime až pri výpise.
 */
export default function IntegrationGrid({ lang = 'sk' }: { lang?: Lang }) {
  const t = createT(lang);

  return (
    <div className="integrations__grid">
      {integrations.map((item) => {
        const shot = integrationShots[item.name];
        const navod = navody[item.name] ? routes[navody[item.name]][lang] : null;

        return (
          <div key={item.name} className="integration">
            {shot ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img className="integration__img" src={shot.src} alt={t(shot.alt)} loading="lazy" />
            ) : (
              /* doplnok, ktorý ešte nie je vonku — namiesto snímky dlaždica */
              <span className="integration__img integration__img--text" aria-hidden>
                {t('Už čoskoro')}
              </span>
            )}
            <span className="integration__num">{item.num}</span>
            <h3 className="integration__name">{t(item.name)}</h3>
            <p className="integration__text">{t(item.text)}</p>
            {navod && (
              <a className="integration__link" href={navod}>
                {t('Zobraziť návod')} →
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
