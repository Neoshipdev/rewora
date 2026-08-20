import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'sk-SK' });
await page.goto(process.argv[2], { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2200);
const out = await page.evaluate(() => {
  const vzor = /^(popis|popis produktu|o produkte|charakteristika|description|detail produktu|informácie o produkte)/i;
  const najdene = [];
  for (const el of document.querySelectorAll('h2,h3,h4,button,a,[role="tab"],li,span,div')) {
    const t = (el.textContent ?? '').trim();
    if (t.length > 40 || !vzor.test(t)) continue;
    const r = el.getBoundingClientRect();
    if (r.height === 0) continue;
    /* sekcia, ktorá popis obsahuje */
    let sekcia = el;
    for (let i = 0; i < 4 && sekcia.parentElement; i++) sekcia = sekcia.parentElement;
    const sr = sekcia.getBoundingClientRect();
    najdene.push({
      text: t, tag: el.tagName,
      nadpisY: Math.round(r.top + window.scrollY),
      sekcia: `${sekcia.tagName}.${`${sekcia.className}`.slice(0, 30)}`,
      sekciaBottom: Math.round(sr.bottom + window.scrollY),
      sekciaText: (sekcia.innerText ?? '').trim().length,
    });
  }
  return najdene.slice(0, 6);
});
console.log(process.argv[2] ?? '', JSON.stringify(out, null, 1));
await browser.close();
