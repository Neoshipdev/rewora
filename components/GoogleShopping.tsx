/**
 * Hviezdičky v Google Shopping — reálny screenshot z vyhľadávania.
 * Obrázok sa nijako neupravuje, dopĺňa ho len vysvetľujúca poznámka.
 */
import type { Lang } from '@/lib/i18n';
import { googleShopping } from '@/lib/panel-data';
import { tDeep } from '@/lib/t';

export default function GoogleShopping({ lang = 'sk' }: { lang?: Lang }) {
  const shopping = tDeep(googleShopping, lang);
  return (
    <div className="gsh">
      <figure className="gsh__shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shopping.image} alt={shopping.alt} />
      </figure>
      <span className="gsh__note">{shopping.note}</span>
    </div>
  );
}
