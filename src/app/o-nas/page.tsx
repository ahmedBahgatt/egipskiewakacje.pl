import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconArrowRight, IconWhatsApp } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import styles from "./o-nas.module.css";

export const metadata: Metadata = buildMetadata({
  title: "O nas | Egipskie Wakacje",
  description:
    "Egipskie Wakacje pomaga polskim turystom rezerwować wycieczki fakultatywne z Hurghady, Marsa Alam i Sharm el Sheikh. Jasne zasady i kontakt po polsku.",
  canonicalPath: "/o-nas/",
});

const crumbs = [
  { name: "Strona główna", path: "/" },
  { name: "O nas", path: "/o-nas/" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="O nas"
        title="Pomagamy polskim turystom odkrywać Egipt"
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container container-narrow">
          <div className={styles.prose}>
            <p>
              Egipskie Wakacje to serwis, który pomaga polskim turystom znaleźć i zarezerwować
              wycieczki fakultatywne w Egipcie. Skupiamy się na trzech kurortach nad Morzem
              Czerwonym i Synajem: Hurghadzie, Marsa Alam oraz Sharm el Sheikh.
            </p>
            <p>
              Naszym celem jest prosta i uczciwa rezerwacja: przejrzysta cena w USD, odbiór z hotelu
              i kontakt po polsku. Nie stosujemy sztucznych promocji, ukrytych kosztów ani presji
              czasu. Wszystkie szczegóły - dostępność, godzinę odbioru i ostateczną cenę -
              potwierdzamy indywidualnie przez WhatsApp.
            </p>
            <p>
              Rezerwacja zaczyna się od krótkiej wiadomości. Ty podajesz datę, hotel i liczbę osób, a
              my dbamy o resztę i odpowiadamy na pytania jeszcze przed wyjazdem.
            </p>

            <div className={styles.values}>
              <div className={styles.value}>
                <h3>Przejrzystość</h3>
                <p>Ceny i program masz od razu na stronie. Bez gwiazdek i drobnego druku.</p>
              </div>
              <div className={styles.value}>
                <h3>Kontakt po polsku</h3>
                <p>Obsługę rezerwacji prowadzimy po polsku, od pierwszej wiadomości.</p>
              </div>
              <div className={styles.value}>
                <h3>Lokalna obsługa</h3>
                <p>Działamy na miejscu w Egipcie i znamy realny przebieg każdej trasy.</p>
              </div>
            </div>

            <div className={styles.cta}>
              <Button
                href={contactWhatsappUrl("Cześć! Chcę dowiedzieć się więcej o wycieczkach.")}
                external
                variant="whatsapp"
                size="lg"
                iconLeft={<IconWhatsApp />}
              >
                Napisz na WhatsApp
              </Button>
              <Button href="/wycieczki/" variant="outline" size="lg" iconRight={<IconArrowRight />}>
                Zobacz wycieczki
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
