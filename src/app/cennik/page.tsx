import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconWhatsApp } from "@/components/ui/icons";
import { formatMoney, formatDatePl } from "@/lib/format";
import { buildBookingWhatsappUrl } from "@/lib/whatsapp";
import { absoluteUrl } from "@/content/config";
import styles from "./cennik.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Cennik wycieczek do Kairu | Egipskie Wakacje",
  description:
    "Przejrzysty cennik wycieczek do Kairu z Hurghady, Marsa Alam i Sharm el Sheikh. Ceny w USD dla dorosłych i dzieci, data weryfikacji, rezerwacja przez WhatsApp.",
  canonicalPath: "/cennik/",
});

const crumbs = [
  { name: "Strona główna", path: "/" },
  { name: "Cennik", path: "/cennik/" },
];

export default async function Page() {
  const tours = await content.getTours();

  const rows = tours.map((t) => [
    <Link key="n" href={`${t.route}/`} className={styles.tourLink}>
      {t.title}
    </Link>,
    t.departure,
    formatMoney(t.price.adult, t.price.currency),
    `${formatMoney(t.price.child, t.price.currency)} (${t.price.childAgeMin}-${t.price.childAgeMax} lat)`,
    "bezpłatnie",
    t.availabilityLabel,
    formatDatePl(t.price.lastVerifiedAt),
    <div key="a" className={styles.rowActions}>
      <Link href={`${t.route}/`} className={styles.details}>
        Szczegóły
      </Link>
      <a
        href={buildBookingWhatsappUrl({
          tourTitle: t.title,
          departure: t.departure,
          date: "(do ustalenia)",
          hotel: "(do podania)",
          adults: 2,
          name: "(do podania)",
          pageUrl: absoluteUrl(t.seo.canonicalPath),
        })}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.wa}
        aria-label={`Zapytaj o ${t.title} na WhatsApp`}
      >
        <IconWhatsApp /> WhatsApp
      </a>
    </div>,
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="Cennik"
        title="Przejrzyste ceny wycieczek"
        intro="Ceny podajemy w USD, bez ukrytych kosztów i sztucznych promocji. Dzieci poniżej 5 lat jadą bezpłatnie."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container">
          <DataTable
            columns={[
              "Wycieczka",
              "Wyjazd",
              "Dorosły",
              "Dziecko",
              "Poniżej 5 lat",
              "Dostępność",
              "Zweryfikowano",
              "",
            ]}
            rows={rows}
          />
          <p className={styles.note}>
            Ostateczny koszt może zależeć od strefy hotelowej (dopłata za transfer) oraz opcjonalnych
            atrakcji. Dostępność i ostateczną cenę potwierdzamy na WhatsApp.
          </p>
        </div>
      </section>
    </>
  );
}
