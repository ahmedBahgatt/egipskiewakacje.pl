import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconWhatsApp } from "@/components/ui/icons";
import { priceLabel, priceUnit, formatMoney, formatDatePl } from "@/lib/format";
import { buildBookingWhatsappUrl } from "@/lib/whatsapp";
import { absoluteUrl } from "@/content/config";
import styles from "./cennik.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Cennik wycieczek w Egipcie | Hurghada, Marsa Alam, Sharm",
  description:
    "Przejrzysty cennik wycieczek fakultatywnych z Hurghady, Marsa Alam i Sharm el Sheikh. Ceny za dorosłych i dzieci, data weryfikacji, rezerwacja przez WhatsApp.",
  canonicalPath: "/cennik/",
});

const crumbs = [
  { name: "Strona główna", path: "/" },
  { name: "Cennik", path: "/cennik/" },
];

export default async function Page() {
  const tours = await content.getTours();

  const rows = tours.map((t) => {
    const childOpt = t.price.options.find((o) => /dziecko/i.test(o.label) && !o.free);
    return [
    <Link key="n" href={`${t.route}/`} className={styles.tourLink}>
      {t.title}
    </Link>,
    t.departure,
    `${priceLabel(t.price)} ${priceUnit(t.price)}`.trim(),
    childOpt ? formatMoney(childOpt.amount, childOpt.currency) : "-",
    t.price.infantFree ? "bezpłatnie" : "-",
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
    ];
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="Cennik"
        title="Przejrzyste ceny wycieczek"
        intro="Ceny podajemy w walucie operatora (USD, kursy nurkowe w EUR), bez ukrytych kosztów i sztucznych promocji. Przy wielu wycieczkach dzieci poniżej 5 lat jadą bezpłatnie."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container">
          <DataTable
            columns={[
              "Wycieczka",
              "Wyjazd",
              "Cena",
              "Dziecko",
              "Niemowlę",
              "Dostępność",
              "Zweryfikowano",
              "Akcje",
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
