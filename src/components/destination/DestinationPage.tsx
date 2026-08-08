import Link from "next/link";
import type { BlogPost, Destination, Tour } from "@/content/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToursGrid } from "@/components/tour/ToursGrid";
import { DataTable } from "@/components/ui/DataTable";
import { Faq } from "@/components/ui/Faq";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import {
  IconArrowRight,
  IconCheck,
  IconWhatsApp,
} from "@/components/ui/icons";
import { formatMoney } from "@/lib/format";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  itemListJsonLd,
  touristDestinationJsonLd,
} from "@/lib/seo";
import styles from "./DestinationPage.module.css";

export function DestinationPage({
  destination,
  tours,
  relatedPost,
}: {
  destination: Destination;
  tours: Tour[];
  relatedPost?: BlogPost;
}) {
  const crumbs = [
    { name: "Strona główna", path: "/" },
    { name: `Wycieczki z ${destination.nameGenitive}`, path: `${destination.routeBase}/` },
  ];
  const mainTour = tours[0];
  const transfers = mainTour?.transferSupplements ?? [];

  return (
    <article>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          touristDestinationJsonLd(destination),
          itemListJsonLd(tours.map((t) => ({ name: t.title, path: t.seo.canonicalPath }))),
          faqJsonLd(destination.faqs),
        ]}
      />

      {/* hero */}
      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <OptimizedImage image={destination.heroImage} priority className={styles.heroImg} />
          <div className={styles.heroScrim} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <Breadcrumbs crumbs={crumbs} />
          <h1 className={styles.title}>Wycieczki z {destination.nameGenitive}</h1>
          <p className={styles.intro}>{destination.shortIntro}</p>
          <div className={styles.heroCtas}>
            <Button href="#wycieczki" size="lg" iconRight={<IconArrowRight />}>
              Zobacz wycieczki
            </Button>
            <Button
              href={contactWhatsappUrl(
                `Cześć! Interesują mnie wycieczki z ${destination.name}.`,
              )}
              external
              variant="whatsapp"
              size="lg"
              iconLeft={<IconWhatsApp />}
            >
              Napisz na WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* practical */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Praktycznie"
            title={`Co warto wiedzieć o wyjazdach z ${destination.nameGenitive}`}
          />
          <ul className={styles.practical}>
            {destination.practical.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 0.05} className={styles.practicalItem}>
                <IconCheck className={styles.pIcon} />
                <span>{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* tours */}
      <section className="section" id="wycieczki" style={{ background: "var(--bg-paper)" }}>
        <div className="container">
          <SectionHeading
            eyebrow="Dostępne wycieczki"
            title="Wyprawy do Kairu z tego kurortu"
            intro="Aktualnie oferujemy poniższą wyprawę. Kolejne trasy dodamy, gdy będą dostępne."
          />
          <ToursGrid tours={tours} priorityFirst />
        </div>
      </section>

      {/* price + pickup + transfers */}
      {mainTour && (
        <section className="section">
          <div className={`container ${styles.detailGrid}`}>
            <div>
              <h2 className={styles.h2}>Ceny i odbiór z hotelu</h2>
              <DataTable
                columns={["Kategoria", "Cena"]}
                rows={[
                  ["Dorosły", formatMoney(mainTour.price.adult, mainTour.price.currency)],
                  [
                    `Dziecko ${mainTour.price.childAgeMin}-${mainTour.price.childAgeMax} lat`,
                    formatMoney(mainTour.price.child, mainTour.price.currency),
                  ],
                  [`Dziecko poniżej ${mainTour.price.childAgeMin} lat`, "bezpłatnie"],
                ]}
              />
              <p className={styles.para}>
                Odbiór i powrót odbywają się pod hotel. Planowany odbiór: {mainTour.pickupLabel}.
                Dokładną godzinę potwierdzamy na WhatsApp przed wyjazdem.
              </p>
            </div>

            {transfers.length > 0 && (
              <div>
                <h2 className={styles.h2}>Dopłaty za transfer</h2>
                <DataTable
                  columns={["Strefa / hotele", "Dopłata (od osoby)"]}
                  rows={transfers.map((t) => [t.zone, formatMoney(t.amount, mainTour.price.currency)])}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* how it looks */}
      {mainTour && (
        <section className="section" style={{ background: "var(--bg-paper)" }}>
          <div className="container container-narrow">
            <h2 className={styles.h2}>Jak wygląda wycieczka?</h2>
            <p className={styles.para}>{mainTour.overview}</p>
            <ul className={styles.highlightRow}>
              {mainTour.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <Button href={`${mainTour.route}/`} variant="outline" iconRight={<IconArrowRight />}>
              Pełny plan dnia
            </Button>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section">
        <div className="container container-narrow">
          <SectionHeading eyebrow="FAQ" title={`Pytania o wycieczki z ${destination.nameGenitive}`} />
          <Faq items={destination.faqs} />
        </div>
      </section>

      {/* related guide */}
      {relatedPost && (
        <section className="section" style={{ background: "var(--bg-paper)" }}>
          <div className="container">
            <Link href={`${relatedPost.route}/`} className={styles.guideCard}>
              <div className={styles.guideMedia}>
                <OptimizedImage image={relatedPost.featuredImage} className={styles.guideImg} />
              </div>
              <div className={styles.guideBody}>
                <span className={styles.guideKicker}>Poradnik</span>
                <h3 className={styles.guideTitle}>{relatedPost.title}</h3>
                <p className={styles.para}>{relatedPost.excerpt}</p>
                <span className={styles.guideMore}>
                  Czytaj poradnik <IconArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* final CTA */}
      <section className={`${styles.finalCta} motif-dark on-dark`}>
        <div className={`container ${styles.finalInner}`}>
          <h2 className={styles.finalTitle}>Masz pytania o wyjazd z {destination.nameGenitive}?</h2>
          <p className={styles.finalText}>
            Napisz na WhatsApp - potwierdzimy dostępność, godzinę odbioru i cenę dla Twojego hotelu.
          </p>
          <Button
            href={contactWhatsappUrl(`Cześć! Mam pytanie o wycieczki z ${destination.name}.`)}
            external
            variant="whatsapp"
            size="lg"
            iconLeft={<IconWhatsApp />}
          >
            Napisz na WhatsApp
          </Button>
        </div>
      </section>
    </article>
  );
}
