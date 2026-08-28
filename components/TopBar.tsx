'use client';

import { useState } from 'react';
import { home, LANGS, langLabel, route, ui, type Lang } from '@/lib/i18n';
import Logo from './Logo';
import { CloseIcon, MenuIcon } from './icons';

type Props = {
  lang?: Lang;
  /** Adresy tej istej stránky v ostatných jazykoch. */
  alt?: Partial<Record<Lang, string>>;
};

export default function TopBar({ lang = 'sk', alt }: Props) {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState(false);
  const t = ui[lang];

  const odkazy = [
    { href: `${home[lang]}#features`, label: t.nav.features },
    { href: route('cases', lang)!, label: t.nav.cases },
    { href: route('pricing', lang)!, label: t.nav.pricing },
    { href: `${home[lang]}#integration`, label: t.nav.integrations },
    { href: route('blog', lang)!, label: t.nav.blog },
  ];
  const podmenu = [
    { href: route('about', lang)!, label: t.aboutMenu.about },
    { href: route('contact', lang)!, label: t.aboutMenu.contact },
    { href: route('partner', lang)!, label: t.aboutMenu.partner },
  ];

  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__left">
          <Logo variant="light" height={26} lang={lang} />
          <nav
            className={`topbar__links ${open ? 'topbar__links--open' : ''}`}
            aria-label={t.nav.features}
          >
            {odkazy.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <div
              className="topbar__has-sub"
              onMouseEnter={() => setSubmenu(true)}
              onMouseLeave={() => setSubmenu(false)}
            >
              <button
                type="button"
                className="topbar__sub-toggle"
                aria-expanded={submenu}
                onClick={() => setSubmenu((v) => !v)}
              >
                {t.nav.about}
                <span aria-hidden>▾</span>
              </button>
              <div className={`topbar__sub ${submenu ? 'topbar__sub--open' : ''}`}>
                {podmenu.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    onClick={() => {
                      setSubmenu(false);
                      setOpen(false);
                    }}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
            {/* na mobile je prepínač jazykov súčasťou rozbaleného menu */}
            <div className="langs langs--menu" aria-label={t.langSwitch}>
              {LANGS.map((l) => (
                <a
                  key={l}
                  href={alt?.[l] ?? home[l]}
                  className={`langs__item ${l === lang ? 'langs__item--on' : ''}`}
                  hrefLang={l}
                >
                  {langLabel[l]}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="topbar__right">
          {/* prepínač jazykov — pri neznámej stránke vedie na domovskú */}
          <div className="langs" aria-label={t.langSwitch}>
            {LANGS.map((l) => (
              <a
                key={l}
                href={alt?.[l] ?? home[l]}
                className={`langs__item ${l === lang ? 'langs__item--on' : ''}`}
                hrefLang={l}
              >
                {langLabel[l]}
              </a>
            ))}
          </div>
          <a className="btn btn--outline-light topbar__demo" href={route('demo', lang)!}>
            {t.cta.demo}
          </a>
          <a className="btn btn--orange" href={route('pricing', lang)!}>
            {t.cta.try}
          </a>
          <button
            type="button"
            className="topbar__burger"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
