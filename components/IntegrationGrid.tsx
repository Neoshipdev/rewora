import { integrationShots } from '@/lib/assets';
import { integrations } from '@/lib/content';

/** Spôsoby integrácie — spoločné pre homepage aj cenník. */
export default function IntegrationGrid() {
  return (
    <div className="integrations__grid">
      {integrations.map((item) => {
        const shot = integrationShots[item.name];
        return (
          <div key={item.name} className="integration">
            {shot ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img className="integration__img" src={shot.src} alt={shot.alt} loading="lazy" />
            ) : (
              /* doplnok, ktorý ešte nie je vonku — namiesto snímky dlaždica */
              <span className="integration__img integration__img--text" aria-hidden>
                Už čoskoro
              </span>
            )}
            <span className="integration__num">{item.num}</span>
            <h3 className="integration__name">{item.name}</h3>
            <p className="integration__text">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}
