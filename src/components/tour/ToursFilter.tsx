"use client";

import { useMemo, useState } from "react";
import type { CategorySlug, Tour } from "@/content/types";
import { categoryLabel } from "@/lib/categories";
import { pluralTours } from "@/lib/polish";
import { IconChevronDown } from "@/components/ui/icons";
import { TourCard } from "./TourCard";
import styles from "./ToursFilter.module.css";

type Departure = "all" | "hurghada" | "marsa-alam" | "sharm-el-sheikh";
type Sort = "default" | "price-asc" | "price-desc";

const DEPARTURES: { value: Departure; label: string }[] = [
  { value: "all", label: "Wszystkie kurorty" },
  { value: "hurghada", label: "Hurghada" },
  { value: "marsa-alam", label: "Marsa Alam" },
  { value: "sharm-el-sheikh", label: "Sharm el Sheikh" },
];

const A = "/media/filter";

/**
 * Client-side filtering only (no URL query params) so no indexable filter
 * combinations are ever generated. Only controls that actually work are shown.
 * Decorations and icons are supplied gold-line WebP assets under /media/filter.
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
  const baseCategory: CategorySlug | "all" = initialCategory ?? "all";
  const [departure, setDeparture] = useState<Departure>(initialDeparture);
  const [category, setCategory] = useState<CategorySlug | "all">(baseCategory);
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

  const reset = () => {
    setDeparture(initialDeparture);
    setCategory(baseCategory);
    setSort("default");
  };

  return (
    <div>
      <div className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <img
              className={styles.ornament}
              src={`${A}/ornament.webp`}
              alt=""
              width={820}
              height={130}
              decoding="async"
            />
            <h2 className={styles.title}>Znajdź odpowiednią wycieczkę</h2>
            <p className={styles.subtitle}>
              Wybierz kierunek, rodzaj wycieczki i sposób sortowania, aby znaleźć idealną ofertę
              dopasowaną do Twoich planów.
            </p>
          </div>
          <img
            className={styles.scene}
            src={`${A}/scene.webp`}
            alt=""
            width={1120}
            height={594}
            decoding="async"
          />
        </div>

        <div className={styles.controls}>
          {!hideDeparture && (
            <div className={styles.control}>
              <label className={styles.label} htmlFor="f-departure">
                <img className={styles.labelIcon} src={`${A}/icon-pin.webp`} alt="" width={49} height={64} />
                Miejsce wyjazdu
              </label>
              <div className={styles.selectWrap}>
                <img className={styles.badge} src={`${A}/badge-palm.webp`} alt="" width={120} height={120} />
                <select
                  id="f-departure"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value as Departure)}
                >
                  {DEPARTURES.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
                <IconChevronDown className={styles.chev} />
              </div>
            </div>
          )}

          {!hideCategory && (
            <div className={styles.control}>
              <label className={styles.label} htmlFor="f-category">
                <img className={styles.labelIcon} src={`${A}/icon-map.webp`} alt="" width={64} height={56} />
                Rodzaj wycieczki
              </label>
              <div className={styles.selectWrap}>
                <img className={styles.badge} src={`${A}/badge-boat.webp`} alt="" width={120} height={119} />
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
                <IconChevronDown className={styles.chev} />
              </div>
            </div>
          )}

          <div className={styles.control}>
            <label className={styles.label} htmlFor="f-sort">
              <img className={styles.labelIcon} src={`${A}/icon-sort.webp`} alt="" width={64} height={62} />
              Sortuj
            </label>
            <div className={styles.selectWrap}>
              <img className={styles.badge} src={`${A}/badge-list.webp`} alt="" width={120} height={120} />
              <select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="default">Domyślnie</option>
                <option value="price-asc">Cena: rosnąco</option>
                <option value="price-desc">Cena: malejąco</option>
              </select>
              <IconChevronDown className={styles.chev} />
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.results}>
            <p className={styles.count} aria-live="polite">
              <img
                className={styles.countIcon}
                src={`${A}/icon-binoculars.webp`}
                alt=""
                width={120}
                height={119}
              />
              <span className={styles.countNum}>{filtered.length}</span>{" "}
              {pluralTours(filtered.length)}
            </p>
            <button type="button" className={styles.reset} onClick={reset}>
              <img
                className={styles.resetIcon}
                src={`${A}/icon-reset.webp`}
                alt=""
                width={96}
                height={95}
              />
              Wyczyść
            </button>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((tour, i) => (
            <TourCard key={tour.route} tour={tour} placement="all_tours" priority={i === 0} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Brak wycieczek dla wybranych kryteriów.</p>
      )}
    </div>
  );
}
