import type { Metadata } from "next";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ToursFilter } from "@/components/tour/ToursFilter";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Wszystkie wycieczki fakultatywne w Egipcie | Egipskie Wakacje",
  description:
    "Pełna oferta wycieczek fakultatywnych z Hurghady, Marsa Alam i Sharm el Sheikh: Kair i piramidy, Luksor, rejsy i wyspy, snorkeling, nurkowanie, safari i atrakcje. Rezerwacja przez WhatsApp.",
  canonicalPath: "/wycieczki/",
});

const crumbs = [
  { name: "Strona główna", path: "/" },
  { name: "Wycieczki", path: "/wycieczki/" },
];

export default async function Page() {
  const tours = await content.getTours();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(tours.map((t) => ({ name: t.title, path: t.seo.canonicalPath }))),
        ]}
      />
      <PageHeader
        eyebrow="Oferta"
        title="Wszystkie wycieczki w Egipcie"
        intro="Pełna oferta wypraw z Hurghady, Marsa Alam i Sharm el Sheikh - od Kairu i Luksoru, przez rejsy i snorkeling, po safari i nurkowanie. Filtruj po kurorcie i rodzaju wycieczki."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container">
          <h2 className="visually-hidden">Lista wszystkich wycieczek</h2>
          <ToursFilter tours={tours} />
        </div>
      </section>
    </>
  );
}
