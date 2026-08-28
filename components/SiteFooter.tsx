import { home, route, ui, type Lang } from '@/lib/i18n';
import Logo from './Logo';

export default function SiteFooter({ lang = 'sk' }: { lang?: Lang }) {
  const t = ui[lang];
  const odkazy = [
    { href: `${home[lang]}#features`, label: t.nav.features },
    { href: route('cases', lang)!, label: t.nav.cases },
    { href: route('pricing', lang)!, label: t.nav.pricing },
    { href: `${home[lang]}#integration`, label: t.nav.integrations },
    { href: route('blog', lang)!, label: t.nav.blog },
    { href: `${home[lang]}#faq`, label: t.footer.faq },
    { href: route('about', lang)!, label: t.aboutMenu.about },
    { href: route('contact', lang)!, label: t.aboutMenu.contact },
    { href: route('partner', lang)!, label: t.aboutMenu.partner },
    { href: route('terms', lang)!, label: t.footer.terms },
    { href: route('privacy', lang)!, label: t.footer.privacy },
  ];

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo variant="light" height={22} lang={lang} />
        <nav className="footer__links" aria-label="Rewora">
          {odkazy.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <span className="footer__copy">© {new Date().getFullYear()} Rewora. {t.footer.rights}</span>
      </div>
    </footer>
  );
}
