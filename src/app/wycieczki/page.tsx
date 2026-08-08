import type { Metadata } from "next";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ToursFilter } from "@/components/tour/ToursFilter";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Wszystkie wycieczki w Egipcie do Kairu | Egipskie Wakacje",
  description:
    "Wszystkie wycieczki fakultatywne do Kairu i piramid: z Hurghady, Marsa Alam i Sharm el Sheikh. Ceny w USD, odbiór z hotelu, rezerwacja przez WhatsApp.",
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
        title="Wycieczki do Kairu i piramid"
        intro="Wszystkie nasze wyprawy prowadzą do Kairu i Gizy. Wybierz kurort, z którego wyjeżdżasz, i porównaj ceny."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container">
          <ToursFilter tours={tours} />
        </div>
      </section>
    </>
  );
}
