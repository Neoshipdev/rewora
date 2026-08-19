# Rewora web — verzia 1c („Bold Conversion“)

Nová domovská stránka pre rewora.com/sk podľa dizajnového handoffu `design_handoff_rewora_1c`.

## Spustenie

```bash
npm install
npm run dev
```

Dev server beží na **http://localhost:3040** (`/` aj `/sk/` vracajú domovskú stránku).

## Stack

- Next.js 14 (App Router) + TypeScript
- Bez CSS frameworku — dizajnové tokeny sú CSS premenné v `app/globals.css`
- Fonty Space Grotesk + DM Sans cez `next/font/google` (self-hostované pri builde)

## Štruktúra

| Súbor | Obsah |
|---|---|
| `app/globals.css` | dizajnové tokeny (farby, typografia, spacing) + všetky sekcie + responsive breakpointy 1280 / 1024 / 640 |
| `app/layout.tsx` | fonty, metadata, hreflang alternatívy |
| `app/page.tsx` | zloženie domovskej stránky (hero, čísla, logá, nástroje, referencie, integrácie, CTA, pätička) |
| `app/sk/page.tsx` | rovnaká stránka na `/sk/` |
| `app/sk/cennik/page.tsx` | cenník — 4 balíky s prepínačom mesačne/ročne + integrácie |
| `app/sk/pripadove-studie/` | prehľad štúdií + detail `[slug]` (FixServis, Drinkcentrum, kilpi.cz) |
| `app/sk/blog/` | výpis 29 článkov s filtrom kategórií + detail `[slug]` |
| `lib/features.ts` | pôvodné texty funkcií, admin panelu, benefitov, integrácií a FAQ |
| `lib/pricing.ts` | balíky cenníka |
| `lib/markdown.ts`, `lib/posts.ts` | čítanie obsahu z `content/` (markdown → HTML pri builde) |
| `components/AdminPanel.tsx` | interaktívny mockup admin panelu (tablist, šípky, `#panel=<key>` v URL) |
| `components/HotspotStage.tsx` | plocha s hotspot bodmi a produktovou bublinou |
| `components/Faq.tsx` | FAQ akordeón |
| `components/TopBar.tsx` | horná lišta + mobilné menu |
| `content/` | texty stiahnuté zo živého rewora.com/sk (funkcie, cenník, prípadové štúdie, integrácie, FAQ, blog) — viď [content/README.md](content/README.md) |
| `scripts/scrape-rewora.mjs` | skript na opätovné stiahnutie obsahu z rewora.com/sk |
| `scripts/fetch-assets.mjs` | skript na stiahnutie obrázkov a lôg do `public/images/` |
| `lib/assets.ts` | mapovanie obrázkov na miesta v layoute (logá, ukážky widgetov, admin, integrácie, štúdie) |
| `components/Logo.tsx` | oficiálne logo Rewora — `variant="light"` (biele) a `variant="brand"` (oranžové), SVG v `public/images/logo-rewora*.svg` |
| `app/sk/ukazka/page.tsx` | stránka „Ukážka Rewory na vašom e-shope“ — formulár s URL |
| `lib/demo/` | generátor ukážky: `capture.ts` (Playwright snímanie e-shopu), `deck.ts` (zloženie strán + PDF), `content.ts` (texty widgetov podľa kategórie), `jobs.ts` (register úloh) |
| `app/api/ukazka/` | API: POST spustí generovanie, `[id]` stav, `[id]/pdf` stiahnutie, `[id]/nahlad` HTML náhľad |
| `lib/content.ts` | celý marketingový copy na jednom mieste (kandidát na CMS / Wagtail) |
| `lib/panel-data.ts` | demo dáta admin panelu na jednom mieste |

## Čo ešte treba doplniť

- **Podstránky**: VOP a Ochrana osobných údajov zatiaľ nemajú obsah (neboli sťahované).
- **Hotspot v hero panely**: v mockupe admin panelu je stále pruhovaný placeholder z dizajnu; reálny vizuál je použitý v sekcii Nástroje.
- **Video**: tlačidlo „Pozrieť video“ smeruje na `#video` — doplniť modál alebo cieľ.

## Ukážka na mieru (generátor PDF)

Tlačidlo **„Ukážka Rewory na vašom e-shope“** (lišta, hero aj záverečné CTA) vedie na `/sk/ukazka/`.
Zákazník zadá adresu e-shopu a server:

1. otvorí homepage cez Playwright, odklikne cookie lištu aj vekovú bránu a počká na bot ochranu,
2. zistí dizajnovú farbu webu, logo a hero banner,
3. nájde produktovú podstránku (JSON-LD Product / og:type / heuristiky odkazov) a odfotí ju,
4. poskladá 8 strán (hotspoty, BI dáta, recenzie na homepage aj pri produkte, poradňa, Google Shopping)
   s widgetmi prefarbenými podľa farby e-shopu,
5. vytlačí ich do PDF (16:9), ktoré si zákazník stiahne alebo otvorí v prehliadači.

Logika je portom Rewora Presentation Agenta (`rewora-presentation-agent`) z Pythonu do Node —
texty widgetov sa vyberajú podľa kategórie produktu (`lib/demo/content.ts`).

Vyžaduje Chromium pre Playwright:

```bash
npx playwright install chromium
```

Úlohy sú v pamäti procesu (`globalThis`) — pri nasadení na viac inštancií ich treba presunúť do fronty/úložiska.

## Dizajnové rozhodnutia

- Hrany sú jemne zaoblené (`--radius-sm/--radius/--radius-lg`, 4–10 px) — pôvodný dizajn 1c bol hranatý.
- Sekcie sú full-bleed, obsah je centrovaný na max. **1344 px** (`--content`) s paddingom **48 px** (`--pad`);
  hero využíva `--gutter`, takže pri širších obrazovkách zostáva obsah zarovnaný s ostatnými sekciami.
- Textové glyfy z prototypu (`◆ ▣ ◑ ↺`) sú nahradené SVG ikonami v `components/icons.tsx`.
- Hotspot bublina je viditeľná pre aktívny bod (default prvý), hover/focus/klik ju prepne na druhý bod.
