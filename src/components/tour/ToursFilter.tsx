"use client";

import { useMemo, useState } from "react";
import type { CategorySlug, Tour } from "@/content/types";
import { categoryLabel } from "@/lib/categories";
import { TourCard } from "./TourCard";
import { track } from "@/lib/analytics";
import styles from "./ToursFilter.module.css";

type Departure = "all" | "hurghada" | "marsa-alam" | "sharm-el-sheikh";
type Sort = "default" | "price-asc" | "price-desc";

const DEPARTURES: { value: Departure; label: string }[] = [
  { value: "all", label: "Wszystkie kurorty" },
  { value: "hurghada", label: "Hurghada" },
  { value: "marsa-alam", label: "Marsa Alam" },
  { value: "sharm-el-sheikh", label: "Sharm el Sheikh" },
];

function tourWord(n: number): string {
  if (n === 1) return "wycieczka";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return "wycieczki";
  return "wycieczek";
}

/**
 * Client-side filtering only (no URL query params) so no indexable filter
 * combinations are ever generated. Only controls that actually work are shown.
 */
export function ToursFilter({
  tours,
  initialCategory,
  initialDeparture = "all",
  hideCategory = false,
  hideDeparture = false,
}: {
  tours: Tour[];
  initialCategory?: CategorySlug | "all";
  initialDeparture?: Departure;
  hideCategory?: boolean;
  hideDeparture?: boolean;
}) {
  const [departure, setDeparture] = useState<Departure>(initialDeparture);
  const [category, setCategory] = useState<CategorySlug | "all">(initialCategory ?? "all");
  const [sort, setSort] = useState<Sort>("default");

  // categories that actually exist in the current tour set, in a stable order
  const categoryOptions = useMemo(() => {
    const present = new Set(tours.map((t) => t.category));
    const order: CategorySlug[] = [
      "kair", "luksor", "rejsy-wyspy", "snorkeling-delfiny", "nurkowanie",
      "safari", "atrakcje", "prywatne", "synaj", "miedzynarodowe",
    ];
    return order.filter((c) => present.has(c));
  }, [tours]);

  const filtered = useMemo(() => {
    let list = tours;
    if (departure !== "all") list = list.filter((t) => t.destination === departure);
    if (category !== "all") list = list.filter((t) => t.category === category);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price.amount - b.price.amount);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price.amount - a.price.amount);
    return list;
  }, [tours, departure, category, sort]);

  return (
    <div>
      <div className={styles.controls}>
        {!hideDeparture && (
          <div className={styles.control}>
            <label htmlFor="f-departure">Miejsce wyjazdu</label>
            <select
              id="f-departure"
              value={departure}
              onChange={(e) => {
                const v = e.target.value as Departure;
                setDeparture(v);
                if (v !== "all") track("destination_select", { destination: v, source: "filter" });
              }}
            >
              {DEPARTURES.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {!hideCategory && (
          <div className={styles.control}>
            <label htmlFor="f-category">Rodzaj wycieczki</label>
            <select
              id="f-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as CategorySlug | "all")}
            >
              <option value="all">Wszystkie rodzaje</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {categoryLabel[c]}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.control}>
          <label htmlFor="f-sort">Sortuj</label>
          <select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="default">Domyślnie</option>
            <option value="price-asc">Cena: rosnąco</option>
            <option value="price-desc">Cena: malejąco</option>
          </select>
        </div>

        <p className={styles.count} aria-live="polite">
          {filtered.length} {tourWord(filtered.length)}
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((tour, i) => (
            <TourCard key={tour.route} tour={tour} position={i + 1} priority={i === 0} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Brak wycieczek dla wybranych kryteriów.</p>
      )}
    </div>
  );
}
