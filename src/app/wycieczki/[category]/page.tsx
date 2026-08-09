import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionJumpNav, type JumpItem } from "@/components/experience/SectionJumpNav";
import { ExperienceVisual } from "@/components/experience/ExperienceVisual";
import { CategoryDestinationSection } from "@/components/category/CategoryDestinationSection";
import { CategoryComparison } from "@/components/category/CategoryComparison";
import { EXPERIENCE, CATEGORY_DESTINATION_ORDER } from "@/lib/experiences";
import { groupByDestination } from "@/lib/grouping";
import type { Destination, Tour } from "@/content/types";
import styles from "./category.module.css";

type DestGroup = { destination: Destination; tours: Tour[] };

export const dynamicParams = false;

function routeSlug(routeBase: string): string {
  return routeBase.split("/").filter(Boolean).pop() as string;
}

export async function generateStaticParams() {
  const cats = await content.getCategories();
  return cats.map((c) => ({ category: routeSlug(c.routeBase) }));
}

async function resolve(param: string) {
  const cats = await content.getCategories();
  return cats.find((c) => routeSlug(c.routeBase) === param);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = await resolve(category);
  return c ? buildMetadata(c.seo) : {};
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = await resolve(category);
  if (!c) notFound();

  const [tours, allCats, destinations] = await Promise.all([
    content.getToursByCategory(c.slug),
    content.getCategories(),
    content.getDestinations(),
  ]);

  const destBySlug = new Map(destinations.map((d) => [d.slug, d]));
  const grouped = groupByDestination(tours);
  // Group the category BY DEPARTURE resort, in a stable order, present only.
  const presentDests: DestGroup[] = CATEGORY_DESTINATION_ORDER.flatMap((slug) => {
    const destination = destBySlug.get(slug);
    const list = grouped.get(slug) ?? [];
    return destination && list.length > 0 ? [{ destination, tours: list }] : [];
  });

  const meta = EXPERIENCE[c.slug];
  const crumbs = [
    { name: "Strona główna", path: "/" },
    { name: "Wycieczki", path: "/wycieczki/" },
    { name: c.shortLabel, path: `${c.routeBase}/` },
  ];
  const jumpItems: JumpItem[] = presentDests.map(({ destination, tours }) => ({
    id: `z-${destination.slug}`,
    label: `Z ${destination.nameGenitive}`,
    count: tours.length,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(tours.map((t) => ({ name: t.title, path: t.seo.canonicalPath }))),
          faqJsonLd(c.faqs),
        ]}
      />
      <PageHeader eyebrow="Rodzaj wycieczki" title={c.name} intro={c.intro} crumbs={crumbs} />

      <nav className={styles.catNav} aria-label="Rodzaje wycieczek">
        {allCats.map((other) => (
          <Link
            key={other.slug}
            href={`${other.routeBase}/`}
            className={`${styles.chip} ${other.slug === c.slug ? styles.chipActive : ""}`}
            aria-current={other.slug === c.slug ? "page" : undefined}
          >
            {other.shortLabel}
          </Link>
        ))}
      </nav>

      <section className="section">
        <div className="container">
          <div className={styles.motifBand} style={{ color: meta.accent }}>
            <ExperienceVisual motif={meta.motif} accent={meta.accent} />
          </div>

          {presentDests.length > 1 && (
            <>
              <h2 className={styles.compareHeading}>Ta sama kategoria z różnych kurortów</h2>
              <div className={styles.compareWrap}>
                <CategoryComparison rows={presentDests} categoryLabel={c.shortLabel} />
              </div>
              <p className={styles.compareNote}>
                Ceny, liczba wariantów i czas dojazdu różnią się w zależności od kurortu wyjazdu.
                Wybierz swój kurort, aby zobaczyć wszystkie warianty.
              </p>
              <div className={styles.jumpWrap}>
                <SectionJumpNav items={jumpItems} label="Przejdź do kurortu" lead="Wyjazd" />
              </div>
            </>
          )}

          {presentDests.map(({ destination, tours }) => (
            <CategoryDestinationSection
              key={destination.slug}
              category={c}
              destination={destination}
              tours={tours}
            />
          ))}
        </div>
      </section>

      {c.faqs.length > 0 && (
        <section className="section" style={{ background: "var(--bg-paper)" }}>
          <div className="container container-narrow">
            <h2 className={styles.faqTitle}>Najczęstsze pytania</h2>
            <Faq items={c.faqs} />
          </div>
        </section>
      )}
    </>
  );
}
