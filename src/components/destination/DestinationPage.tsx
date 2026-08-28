import Link from "next/link";
import type { BlogPost, Destination, Tour } from "@/content/types";
import { PageHero } from "@/components/ui/PageHero";
import { PageIntro } from "@/components/ui/PageIntro";
import { RelatedLinks, type RelatedLink } from "@/components/ui/RelatedLinks";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataTable } from "@/components/ui/DataTable";
import { Faq } from "@/components/ui/Faq";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { DestinationExperience } from "./DestinationExperience";
import { DestinationSignature } from "./DestinationSignature";
import { IconArrowRight, IconCheck, IconWhatsApp } from "@/components/ui/icons";
import { formatMoney } from "@/lib/format";
import { hubFacts, fromPriceLabel } from "@/lib/facts";
import { orderedPresentCategories } from "@/lib/grouping";
import { categoryLabel } from "@/lib/categories";
import { formatTourCount } from "@/lib/polish";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  faqJsonLd,
  touristDestinationJsonLd,
} from "@/lib/seo";
import styles from "./DestinationPage.module.css";

export function DestinationPage({
  destination,
  tours,
  relatedPost,
  otherDestinations = [],
}: {
  destination: Destination;
  tours: Tour[];
  relatedPost?: BlogPost;
  /** The other departure resorts, for the cross-resort internal-link block. */
  otherDestinations?: Destination[];
}) {
  const crumbs = [
    { name: "Strona główna", path: "/" },
    { name: `Wycieczki z ${destination.nameGenitive}`, path: `${destination.routeBase}/` },
  ];

  const heroTitle = destination.heroTitle ?? `Wycieczki z ${destination.nameGenitive}`;

  const price = fromPriceLabel(tours);
  const catNames = orderedPresentCategories(destination.slug, tours)
    .map((c) => categoryLabel[c])
    .slice(0, 6);
  const catNamesLabel =
    catNames.length > 1
      ? `${catNames.slice(0, -1).join(", ")} i ${catNames[catNames.length - 1]}`
      : catNames.join("");

  const otherResortLinks: RelatedLink[] = [
    ...otherDestinations.map((d) => ({
      title: `Wycieczki z ${d.nameGenitive}`,
      href: `${d.routeBase}/`,
      blurb: `${d.shortIntro.split(". ")[0]}.`,
    })),
    {
      title: "Wszystkie wycieczki w Egipcie",
      href: "/wycieczki/",
      blurb: "Pełna oferta z trzech kurortów - filtruj po kurorcie i rodzaju.",
    },
  ];

  // Aggregate the distinct transfer-supplement zones across THIS resort's tours
  // (the lowest per-person amount seen for each zone). This is destination-level
  // and honest - it never promises one universal pickup time or fee; exact times
  // and fees live on each tour page.
  const zoneMap = new Map<string, number>();
  for (const t of tours) {
    for (const ts of t.transferSupplements) {
      const cur = zoneMap.get(ts.zone);
      if (cur == null || ts.amount < cur) zoneMap.set(ts.zone, ts.amount);
    }
  }
  const transferRows = [...zoneMap.entries()].sort((a, b) => a[1] - b[1]);

  return (
    <article>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          touristDestinationJsonLd(destination),
          collectionPageJsonLd({
            name: `Wycieczki z ${destination.nameGenitive}`,
            description: destination.seo.description,
            path: destination.seo.canonicalPath,
            items: tours.map((t) => ({ name: t.title, path: t.seo.canonicalPath })),
          }),
          faqJsonLd(destination.faqs),
        ]}
      />

      {/* hero */}
      <PageHero
        eyebrow="Kurort wyjazdu"
        title={heroTitle}
        intro={destination.shortIntro}
        crumbs={crumbs}
        image={destination.heroImage}
        imagePriority
        actions={
          <>
            <Button href="#wycieczki" variant="gold" iconRight={<IconArrowRight />}>
              Zobacz wycieczki
            </Button>
            <Button
              href={contactWhatsappUrl(
                `Cześć! Interesują mnie wycieczki z ${destination.nameGenitive}.`,
              )}
              external
              variant="whatsappOutline"
              iconLeft={<IconWhatsApp />}
            >
              Napisz na WhatsApp
            </Button>
          </>
        }
      />

      <PageIntro
        facts={hubFacts(tours, destination.name)}
        lead={
          <>
            <p>
              Z <strong>{destination.name}</strong> organizujemy {formatTourCount(tours.length)}{" "}
              fakultatywnych po polsku, z odbiorem spod hotelu
              {price ? `, ceny ${price}` : ""}. Do wyboru masz {catNamesLabel}.
            </p>
            <p>
              Rezerwację potwierdzasz na WhatsApp, a{" "}
              <strong>za wycieczkę płacisz dopiero przy jej rozpoczęciu</strong> - bez przedpłaty i
              płatności online. Dokładną godzinę odbioru podajemy przed wyjazdem.
            </p>
          </>
        }
      />

      {/* quiet visual bridge - destination identity, not repeated category nav */}
      <DestinationSignature slug={destination.slug} />

      {/* practical (destination-level) */}
      <section className={`section ${styles.afterSignature}`}>
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

      {/* grouped experience sections + quick finder */}
      <DestinationExperience destination={destination} tours={tours} />

      {/* pickup + transfers (destination-level, not one universal promise) */}
      <section className="section">
        <div className={`container ${styles.detailGrid}`}>
          <div>
            <h2 className={styles.h2}>Odbiór z hotelu i transfery</h2>
            <p className={styles.para}>
              Prawie każda wycieczka z {destination.nameGenitive} obejmuje odbiór spod hotelu i
              powrót w to samo miejsce. Godzina odbioru zależy od konkretnej wyprawy i strefy hotelu
              - przy krótkich atrakcjach jest to zwykle poranek lub popołudnie, przy dalekich trasach
              (Kair, Luksor) często noc. Dokładną godzinę potwierdzamy na WhatsApp przed wyjazdem, a
              precyzyjne dane znajdziesz na stronie każdej wycieczki.
            </p>
            <Button href="#wycieczki" variant="outline" iconRight={<IconArrowRight />}>
              Wybierz wycieczkę
            </Button>
          </div>

          {transferRows.length > 0 && (
            <div>
              <h2 className={styles.h2}>Przykładowe dopłaty za transfer</h2>
              <DataTable
                columns={["Strefa / hotele", "Dopłata od osoby"]}
                rows={transferRows.map(([zone, amount]) => [zone, `od ${formatMoney(amount, "USD")}`])}
              />
              <p className={styles.note}>
                Dopłaty dotyczą wybranych, bardziej oddalonych stref i różnią się w zależności od
                wycieczki. Ostateczną kwotę dla Twojego hotelu potwierdzamy przy rezerwacji.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--bg-paper)" }}>
        <div className="container container-narrow">
          <SectionHeading eyebrow="FAQ" title={`Pytania o wycieczki z ${destination.nameGenitive}`} />
          <Faq items={destination.faqs} />
        </div>
      </section>

      {/* related guide */}
      {relatedPost && (
        <section className="section">
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

      {/* internal linking: other resorts + all-tours hub */}
      <RelatedLinks
        eyebrow="Zobacz też"
        title="Wycieczki z innych kurortów"
        items={otherResortLinks}
        columns={3}
      />

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
