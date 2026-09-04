import GuidePage from '@/components/pages/GuidePage';
import { shoptetGuide } from '@/lib/guides';
import type { Lang } from '@/lib/i18n';

/** Návod na nasadenie doplnku na Shoptete. */
export default function ShoptetGuidePage({ lang }: { lang: Lang }) {
  return <GuidePage lang={lang} guide={shoptetGuide} routeKey="shoptetGuide" />;
}
