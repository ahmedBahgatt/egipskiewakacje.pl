"use client";

import { useMemo, useRef, useState } from "react";
import type { CategorySlug, Destination, Tour } from "@/content/types";
import { categoryLabel, categoryRoute } from "@/lib/categories";
import { EXPERIENCE, sectionIntro } from "@/lib/experiences";
import { groupByCategory, orderedPresentCategories } from "@/lib/grouping";
import { formatTourCount } from "@/lib/polish";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TourSectionHeader } from "@/components/experience/TourSectionHeader";
import { TourCard } from "@/components/tour/TourCard";
import styles from "./DestinationExperience.module.css";

/**
 * The core of a destination page: the resort's whole offer, grouped into designed
 * experience sections (rejsy, snorkeling, nurkowanie, safari, Kair, Luksor, ...) in
 * an editorial, resort-specific order. A compact quick-finder filters to a single
 * experience (hiding the rest and updating an accessible count); the default view
 * shows every section. No tour is ever hidden from crawlers - every card is
 * rendered in its section; the filter only toggles CSS-level visibility client-side.
 */
export function DestinationExperience({
  destination,
  tours,
}: {
  destination: Destination;
  tours: Tour[];
}) {
  const cats = useMemo(
    () => orderedPresentCategories(destination.slug, tours),
    [destination.slug, tours],
  );
  const groups = useMemo(() => groupByCategory(tours), [tours]);
  const [active, setActive] = useState<CategorySlug | "all">("all");
  const resultsRef = useRef<HTMLDivElement>(null);

  const visibleCats = active === "all" ? cats : cats.filter((c) => c === active);
  const shownCount = visibleCats.reduce((s, c) => s + (groups.get(c)?.length ?? 0), 0);

  function select(next: CategorySlug | "all") {
    setActive(next);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultsRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  return (
    <section className="section" id="wycieczki" style={{ background: "var(--bg-paper)" }}>
      <div className="container">
        <SectionHeading
          eyebrow="Cała oferta"
          title={`Wycieczki z ${destination.nameGenitive} według rodzaju`}
          intro="Każda sekcja to inny pomysł na dzień - od rejsów i snorkelingu, przez nurkowanie i safari, po Kair i Luksor. Wybierz rodzaj albo przewiń całość."
        />

        <div className={styles.finder} role="group" aria-label="Filtruj wycieczki według rodzaju">
          <button
            type="button"
            className={`${styles.chip} ${active === "all" ? styles.chipActive : ""}`}
            aria-pressed={active === "all"}
            onClick={() => select("all")}
          >
            Wszystkie
            <span className={styles.chipCount}>{tours.length}</span>
          </button>
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.chip} ${active === c ? styles.chipActive : ""}`}
              aria-pressed={active === c}
              onClick={() => select(c)}
            >
              {categoryLabel[c]}
              <span className={styles.chipCount}>{groups.get(c)?.length ?? 0}</span>
            </button>
          ))}
        </div>

        <p className={styles.resultCount} aria-live="polite">
          Pokazano {formatTourCount(shownCount)}
          {active !== "all" ? ` - ${categoryLabel[active]}` : ` z ${destination.nameGenitive}`}.
        </p>

        <div ref={resultsRef} className={styles.results}>
          {visibleCats.map((c) => {
            const list = groups.get(c) ?? [];
            const meta = EXPERIENCE[c];
            const route = categoryRoute[c];
            return (
              <section key={c} className={styles.expSection} aria-label={categoryLabel[c]}>
                <TourSectionHeader
                  id={`sekcja-${c}`}
                  eyebrow={formatTourCount(list.length)}
                  title={categoryLabel[c]}
                  intro={sectionIntro(c, destination.nameGenitive)}
                  motif={meta.motif}
                  accent={meta.accent}
                  linkHref={route ? `${route}/` : undefined}
                  linkLabel={route ? "Zobacz tę kategorię z innych kurortów" : undefined}
                />
                <div className={styles.grid}>
                  {list.map((t, i) => (
                    <TourCard key={t.route} tour={t} position={i + 1} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
