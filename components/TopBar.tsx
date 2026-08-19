'use client';

import { useState } from 'react';
import { cta, demoCta, nav } from '@/lib/content';
import Logo from './Logo';
import { CloseIcon, MenuIcon } from './icons';

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__left">
          <Logo variant="light" height={26} />
          <nav
            className={`topbar__links ${open ? 'topbar__links--open' : ''}`}
            aria-label="Hlavná navigácia"
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a className="btn btn--outline-light topbar__demo" href={demoCta.href}>
            {demoCta.shortLabel}
          </a>
          <a className="btn btn--orange" href={cta.href}>
            {cta.label}
          </a>
          <button
            type="button"
            className="topbar__burger"
            aria-expanded={open}
            aria-label={open ? 'Zavrieť menu' : 'Otvoriť menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
