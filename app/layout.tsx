import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import { ogImage } from '@/lib/assets';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rewora.com'),
  title: 'Rewora ★ Na recenziách záleží',
  description:
    'Recenzie, poradňa, hotspoty a BI dáta. Nasaďte sociálny dôkaz na celý e-shop a sledujte, ako rastie konverzný pomer.',
  alternates: {
    canonical: '/sk/',
    /* EN (/) a CS (/cs/) mutácie zatiaľ nie sú súčasťou nového webu — hreflang
       doplniť až keď budú nasadené, inak by ukazoval na neexistujúce stránky. */
    languages: { 'sk-SK': '/sk/' },
  },
  openGraph: {
    title: 'Rewora ★ Na recenziách záleží',
    description:
      'Recenzie, poradňa, hotspoty a BI dáta. Nasaďte sociálny dôkaz na celý e-shop a sledujte, ako rastie konverzný pomer.',
    locale: 'sk_SK',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Rewora' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
