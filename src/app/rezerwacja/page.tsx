import type { Metadata } from "next";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookingForm, type BookingTourOption } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import styles from "./rezerwacja.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Rezerwacja wycieczki | Egipskie Wakacje",
  description:
    "Zarezerwuj wycieczkę do Kairu z Hurghady, Marsa Alam lub Sharm el Sheikh. Krótki formularz tworzy gotową wiadomość WhatsApp. Bez płatności online.",
  canonicalPath: "/rezerwacja/",
});

const crumbs = [
  { name: "Strona główna", path: "/" },
  { name: "Rezerwacja", path: "/rezerwacja/" },
];

const STEPS = [
  "Wybierz wycieczkę i uzupełnij dane.",
  "Wyślij zgłoszenie - otworzy się WhatsApp z gotową wiadomością.",
  "Potwierdzamy dostępność, godzinę odbioru i cenę.",
];

export default async function Page() {
  const tours = await content.getTours();
  const options: BookingTourOption[] = tours.map((t) => ({
    slug: t.slug,
    title: t.title,
    departure: t.departure,
    destination: t.destination,
    canonicalPath: t.seo.canonicalPath,
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="Rezerwacja"
        title="Zarezerwuj wycieczkę"
        intro="Wypełnij krótki formularz - przygotujemy gotową wiadomość na WhatsApp. Bez płatności online."
        crumbs={crumbs}
      />
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.formCol}>
            <BookingForm tours={options} variant="page" />
          </div>
          <aside className={styles.aside}>
            <h2 className={styles.asideTitle}>Jak to działa?</h2>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => (
                <li key={i}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className={styles.note}>
              Nie przechowujemy danych z formularza. Wiadomość powstaje lokalnie w Twojej
              przeglądarce i otwiera się w aplikacji WhatsApp.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
