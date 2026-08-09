import Link from "next/link";
import type { BlogPost, Destination, Tour } from "@/content/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToursFilter } from "@/components/tour/ToursFilter";
import { categoryLabel, categoryRoute } from "@/lib/categories";
import type { CategorySlug } from "@/content/types";
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
  const mainTour = tours.find((t) => t.category === "kair") ?? tours[0];
  const transfers = mainTour?.transferSupplements ?? [];
  const departureFilter = destination.slug;
  // categories that both exist for this destination and have a landing page
  const presentCats = new Set(tours.map((t) => t.category));
  const catChips = (Object.keys(categoryRoute) as CategorySlug[]).filter((c) => presentCats.has(c));

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
                `Cześć! Interesują mnie wycieczki z ${destination.nameGenitive}.`,
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
            title={`Wycieczki z ${destination.nameGenitive}`}
            intro={`W ofercie mamy ${tours.length} ${
              tours.length < 5 ? "wycieczki" : "wycieczek"
            } z ${destination.nameGenitive}. Filtruj po rodzaju, żeby szybciej znaleźć to, czego szukasz.`}
          />
          {catChips.length > 1 && (
            <nav className={styles.catChips} aria-label="Rodzaje wycieczek">
              {catChips.map((c) => (
                <Link key={c} href={`${categoryRoute[c]}/`} className={styles.catChip}>
                  {categoryLabel[c]}
                </Link>
              ))}
            </nav>
          )}
          <ToursFilter tours={tours} initialDeparture={departureFilter} hideDeparture />
        </div>
      </section>

      {/* price + pickup + transfers */}
      {mainTour && (
        <section className="section">
          <div className={`container ${styles.detailGrid}`}>
            <div>
              <h2 className={styles.h2}>Przykładowe ceny i odbiór ({mainTour.title})</h2>
              <DataTable
                columns={["Wariant", "Cena"]}
                rows={mainTour.price.options.map((opt) => [
                  opt.note ? `${opt.label} (${opt.note})` : opt.label,
                  opt.free ? "bezpłatnie" : formatMoney(opt.amount, opt.currency),
                ])}
              />
              <p className={styles.para}>
                Odbiór i powrót odbywają się pod hotel. Planowany odbiór: {mainTour.pickupLabel}.
                Dokładną godzinę potwierdzamy na WhatsApp przed wyjazdem. Ceny pozostałych wycieczek
                znajdziesz na kartach ofert i w cenniku.
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
            href={contactWhatsappUrl(`Cześć! Mam pytanie o wycieczki z ${destination.nameGenitive}.`)}
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
