"use client";

import { useMemo, useState } from "react";
import type { Tour } from "@/content/types";
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

/**
 * Client-side filtering only (no URL query params) so no indexable filter
 * combinations are ever generated. Only controls that actually work are shown.
 */
export function ToursFilter({ tours }: { tours: Tour[] }) {
  const [departure, setDeparture] = useState<Departure>("all");
  const [sort, setSort] = useState<Sort>("default");

  const filtered = useMemo(() => {
    let list = tours;
    if (departure !== "all") list = list.filter((t) => t.destination === departure);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price.adult - b.price.adult);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price.adult - a.price.adult);
    return list;
  }, [tours, departure, sort]);

  return (
    <div>
      <div className={styles.controls}>
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

        <div className={styles.control}>
          <label htmlFor="f-sort">Sortuj</label>
          <select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="default">Domyślnie</option>
            <option value="price-asc">Cena: rosnąco</option>
            <option value="price-desc">Cena: malejąco</option>
          </select>
        </div>

        <p className={styles.count} aria-live="polite">
          {filtered.length}{" "}
          {filtered.length === 1 ? "wycieczka" : filtered.length < 5 ? "wycieczki" : "wycieczek"}
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((tour, i) => (
            <TourCard key={tour.slug} tour={tour} position={i + 1} priority={i === 0} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Brak wycieczek dla wybranych kryteriów.</p>
      )}
    </div>
  );
}
