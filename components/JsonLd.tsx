/**
 * Vloží štruktúrované dáta do stránky. Všetky objekty idú v jednom grafe,
 * aby sa vedeli navzájom odkazovať cez @id.
 */
export default function JsonLd({ graf }: { graf: object[] }) {
  const data = { '@context': 'https://schema.org', '@graph': graf };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
