import type { Metadata } from 'next';
import BaseLayout from '@/components/BaseLayout';
import { ogImage } from '@/lib/assets';
import { homeSeo } from '@/lib/meta';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rewora.com'),
  title: homeSeo.cs.title,
  description: homeSeo.cs.description,
  openGraph: {
    title: homeSeo.cs.title,
    description: homeSeo.cs.description,
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Rewora' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BaseLayout lang="cs">{children}</BaseLayout>;
}
