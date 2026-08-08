import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconWhatsApp, IconGlobe, IconMapPin } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/content/config";
import styles from "./kontakt.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt | Egipskie Wakacje",
  description:
    "Skontaktuj się z Egipskie Wakacje przez WhatsApp. Obsługa rezerwacji po polsku, odbiór z hotelu w Hurghadzie, Marsa Alam i Sharm el Sheikh.",
  canonicalPath: "/kontakt/",
});

const crumbs = [
  { name: "Strona główna", path: "/" },
  { name: "Kontakt", path: "/kontakt/" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="Kontakt"
        title="Napisz do nas"
        intro="Najszybciej odpowiadamy na WhatsApp. Obsługę rezerwacji prowadzimy po polsku."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.icon}>
                <IconWhatsApp />
              </span>
              <h2 className={styles.cardTitle}>WhatsApp</h2>
              <p className={styles.cardText}>
                Rezerwacje, dostępność, godziny odbioru i pytania - wszystko załatwisz w rozmowie.
              </p>
              <p className={styles.number}>{siteConfig.whatsappDisplay}</p>
              <Button
                href={contactWhatsappUrl("Cześć! Mam pytanie o wycieczki w Egipcie.")}
                external
                variant="whatsapp"
                size="lg"
                iconLeft={<IconWhatsApp />}
              >
                Napisz na WhatsApp
              </Button>
            </div>

            <div className={styles.info}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <IconGlobe />
                </span>
                <div>
                  <h3>Obsługa po polsku</h3>
                  <p>Rezerwację i pytania prowadzimy w języku polskim.</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <IconMapPin />
                </span>
                <div>
                  <h3>Odbiór z hotelu</h3>
                  <p>Obsługujemy hotele w Hurghadzie, Marsa Alam i Sharm el Sheikh.</p>
                </div>
              </div>
              <div className={styles.note}>
                <p>
                  Nie prowadzimy płatności online. Zgłoszenie z formularza rezerwacji tworzy gotową
                  wiadomość na WhatsApp, a szczegóły potwierdzamy indywidualnie.
                </p>
              </div>
              <Button href="/rezerwacja/" variant="outline" size="lg">
                Przejdź do rezerwacji
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
