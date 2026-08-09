import type { Destination, Tour, TourCategory } from "@/content/types";
import { EXPERIENCE, sectionIntro } from "@/lib/experiences";
import { formatTourCount } from "@/lib/polish";
import { TourSectionHeader } from "@/components/experience/TourSectionHeader";
import { TourCard } from "@/components/tour/TourCard";
import styles from "./CategoryDestinationSection.module.css";

/**
 * One departure-resort block on a global category page. A category page is grouped
 * BY DEPARTURE (Z Hurghady / Z Marsa Alam / Z Sharm el Sheikh) instead of one mixed
 * list, so the same experience from different resorts never blurs together.
 */
export function CategoryDestinationSection({
  category,
  destination,
  tours,
}: {
  category: TourCategory;
  destination: Destination;
  tours: Tour[];
}) {
  if (tours.length === 0) return null;
  const meta = EXPERIENCE[category.slug];
  return (
    <section className={styles.section} aria-label={`${category.shortLabel} z ${destination.nameGenitive}`}>
      <TourSectionHeader
        id={`z-${destination.slug}`}
        eyebrow={formatTourCount(tours.length)}
        title={`Z ${destination.nameGenitive}`}
        intro={sectionIntro(category.slug, destination.nameGenitive)}
        motif={meta.motif}
        accent={meta.accent}
        linkHref={`${destination.routeBase}/`}
        linkLabel={`Wszystkie wycieczki z ${destination.nameGenitive}`}
      />
      <div className={styles.grid}>
        {tours.map((t, i) => (
          <TourCard key={t.route} tour={t} position={i + 1} />
        ))}
      </div>
    </section>
  );
}
