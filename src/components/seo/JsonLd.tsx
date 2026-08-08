/**
 * Renders controlled JSON-LD. The only sanctioned use of dangerouslySetInnerHTML
 * in the project - the payload is always a plain object we build ourselves, never
 * user-generated content.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
