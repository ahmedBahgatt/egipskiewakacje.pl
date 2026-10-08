import type { Metadata } from "next";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookingForm, type BookingTourOption } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconCheck } from "@/components/ui/icons";
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

const STEPS: { title: string; text: string }[] = [
  { title: "Wypełnij formularz", text: "Wybierz wycieczkę, termin i liczbę osób." },
  { title: "Wyślij przez WhatsApp", text: "Zgłoszenie otwiera gotową wiadomość na WhatsApp." },
  { title: "Potwierdzamy szczegóły", text: "Dostępność, godzinę odbioru i ostateczną cenę." },
];

/** Trust points - only facts already true on the live site. */
const TRUST = [
  "Bez przedpłaty",
  "Płatność przy rozpoczęciu wycieczki",
  "Potwierdzenie przez WhatsApp",
  "Obsługa po polsku",
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
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          webPageJsonLd({
            name: "Rezerwacja wycieczki - Egipskie Wakacje",
            canonicalPath: "/rezerwacja/",
            description:
              "Oficjalny formularz rezerwacji Egipskie Wakacje. Krótki formularz tworzy gotową wiadomość WhatsApp. Bez płatności online.",
          }),
        ]}
      />
      <PageHeader
        eyebrow="Rezerwacja"
        title="Zarezerwuj wycieczkę"
        intro="Rezerwację w Egipskie Wakacje składasz w kilka chwil: wypełnij krótki formularz, a przygotujemy gotową wiadomość na WhatsApp. Bez płatności online."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container">
          <ol className={styles.steps} aria-label="Jak to działa?">
            {STEPS.map((s, i) => (
              <li key={i} className={styles.step}>
                <span className={styles.stepNum}>{i + 1}</span>
                <span className={styles.stepBody}>
                  <span className={styles.stepTitle}>{s.title}</span>
                  <span className={styles.stepText}>{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className={styles.layout}>
            <div className={styles.formCol}>
              <BookingForm tours={options} variant="page" />
            </div>
            <aside className={styles.aside}>
              <div className={styles.trust}>
                <h2 className={styles.asideTitle}>Dlaczego Egipskie Wakacje?</h2>
                <ul className={styles.trustList}>
                  {TRUST.map((t) => (
                    <li key={t}>
                      <IconCheck className={styles.trustCheck} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className={styles.note}>
                Nie przechowujemy danych z formularza. Wiadomość powstaje lokalnie w Twojej
                przeglądarce i otwiera się w aplikacji WhatsApp.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
