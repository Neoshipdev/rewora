import { footer, footerNav } from '@/lib/content';
import Logo from './Logo';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo variant="light" height={22} />
        <nav className="footer__links" aria-label="Pätička">
          {footerNav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          {footer.links.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <span className="footer__copy">{footer.copy}</span>
      </div>
    </footer>
  );
}
