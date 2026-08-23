import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

/**
 * The standalone price list has been retired: per-tour prices live on each tour
 * page and in the listings. This route is kept only as an SEO-safe redirect so any
 * indexed/linked `/cennik/` URL is consolidated onto the real tours listing.
 *
 * Static export (GitHub Pages) cannot issue a 301, so we do the closest safe thing:
 * - canonical -> /wycieczki/ (consolidates ranking signals onto the target)
 * - a 0-second <meta http-equiv="refresh"> (React 19 hoists it into <head>)
 * - a visible fallback link for anyone/anything that does not auto-redirect.
 */
export const metadata: Metadata = {
  ...buildMetadata({
    title: "Wycieczki w Egipcie | Egipskie Wakacje",
    description:
      "Wszystkie wycieczki fakultatywne w Egipcie z Hurghady, Marsa Alam i Sharm el Sheikh - ceny podane przy każdej wycieczce.",
    canonicalPath: "/wycieczki/",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/wycieczki/" />
      <section className="section">
        <div className="container container-narrow" style={{ textAlign: "center" }}>
          <h1>Przechodzimy do wycieczek</h1>
          <p style={{ color: "var(--text-muted)", margin: "0.8rem 0 1.4rem" }}>
            Ceny podajemy teraz bezpośrednio przy każdej wycieczce. Za chwilę przeniesiemy Cię do
            pełnej listy wypraw.
          </p>
          <p>
            <Link href="/wycieczki/">Zobacz wszystkie wycieczki</Link>
          </p>
        </div>
      </section>
    </>
  );
}
