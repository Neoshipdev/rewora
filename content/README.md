# Obsah stiahnutý z rewora.com/sk

Všetky texty zo živého webu, stiahnuté **17. 8. 2026** skriptom [`scripts/scrape-rewora.mjs`](../scripts/scrape-rewora.mjs).
Opätovné stiahnutie (prepíše súbory):

```bash
node scripts/scrape-rewora.mjs
```

Prípadové štúdie sú ručne štruktúrované (grafy a číselné pásy na webe nie sú v textových blokoch), zvyšok generuje skript.

## Prehľad

| Súbor | Čo obsahuje |
|---|---|
| [domovska-stranka.md](domovska-stranka.md) | **Funkcie** (Recenzie, Poradňa a fórum, Hotspots, BI dáta), benefity, admin panel, **Integrácie** (GTM, na mieru, Shopify) a celé **FAQ** |
| [cennik.md](cennik.md) | 4 balíky (Bezplatný / Štandardný / Profesionálny / Podnikový), mesačné aj ročné ceny, zoznamy funkcií, CTA |
| [pripadove-studie.md](pripadove-studie.md) | prehľadová stránka — hero, číselný pás, filtre, perexy troch štúdií |
| [pripadove-studie/fixservis.md](pripadove-studie/fixservis.md) | celá štúdia FixServis (o firme, výzva, ciele, riešenie, výsledky, citát) |
| [pripadove-studie/drinkcentrum.md](pripadove-studie/drinkcentrum.md) | celá štúdia Drinkcentrum |
| [pripadove-studie/kilpi.md](pripadove-studie/kilpi.md) | celá štúdia kilpi.cz |
| [blog.md](blog.md) | index 29 blogových článkov s kategóriami |
| [blog/](blog/) | 29 článkov v plnom znení (titulok, kategória, autor, dátum, perex, telo, obrázky) |

## Poznámky

- Cenník sa na webe načítava cez htmx zo `app.rewora.com/sk/subscription/pricing/` do shadow DOM — ceny sú v `cennik.md` prepísané ručne z oboch prepínačov (mesačne/ročne).
- Odkazy na obrázky v článkoch smerujú na `/media/...` na rewora.com — pri migrácii ich treba stiahnuť do `public/`.
- Jazykové mutácie: `/` (EN), `/sk/`, `/cs/` — stiahnutá je len slovenská verzia.
