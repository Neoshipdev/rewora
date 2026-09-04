import GuidePage from '@/components/pages/GuidePage';
import { shopifyGuide } from '@/lib/guides';
import type { Lang } from '@/lib/i18n';

/** Návod na nasadenie doplnku na Shopify. */
export default function ShopifyGuidePage({ lang }: { lang: Lang }) {
  return <GuidePage lang={lang} guide={shopifyGuide} routeKey="shopifyGuide" />;
}
