/**
 * Hviezdičky v Google Shopping — reálny screenshot z vyhľadávania.
 * Obrázok sa nijako neupravuje, dopĺňa ho len vysvetľujúca poznámka.
 */
import { googleShopping } from '@/lib/panel-data';

export default function GoogleShopping() {
  return (
    <div className="gsh">
      <figure className="gsh__shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={googleShopping.image} alt={googleShopping.alt} />
      </figure>
      <span className="gsh__note">{googleShopping.note}</span>
    </div>
  );
}
