import type { Destination, Tour } from "@/content/types";
import { formatMoney } from "@/lib/format";
import styles from "./CategoryComparison.module.css";

interface Row {
  destination: Destination;
  tours: Tour[];
}

/**
 * Cross-destination comparison for a category: how the same experience differs by
 * departure resort. Every value is derived from the real tour data - the duration
 * cell shows "różny" rather than inventing a single figure when the resort's tours
 * differ (B14: never fabricate one duration when tours differ).
 */
export function CategoryComparison({ rows, categoryLabel }: { rows: Row[]; categoryLabel: string }) {
  if (rows.length < 2) return null;

  const computed = rows.map(({ destination, tours }) => {
    const min = tours.reduce((a, b) => (b.price.amount < a.price.amount ? b : a), tours[0]);
    const durations = new Set(tours.map((t) => t.durationLabel));
    const duration = durations.size === 1 ? [...durations][0] : "różny - zobacz oferty";
    return {
      destination,
      variants: tours.length,
      priceFrom: `od ${formatMoney(min.price.amount, min.price.currency)}`,
      duration,
    };
  });

  return (
    <div className={styles.wrap} role="region" aria-label={`Porównanie: ${categoryLabel} według kurortu`} tabIndex={0}>
      <table className={styles.table}>
        <caption className={styles.caption}>
          {categoryLabel} - porównanie według kurortu wyjazdu
        </caption>
        <thead>
          <tr>
            <th scope="col">Wyjazd</th>
            <th scope="col">Warianty</th>
            <th scope="col">Cena od</th>
            <th scope="col">Czas trwania</th>
            <th scope="col" className={styles.jumpCol}></th>
          </tr>
        </thead>
        <tbody>
          {computed.map((r) => (
            <tr key={r.destination.slug}>
              <th scope="row">{r.destination.name}</th>
              <td>{r.variants}</td>
              <td className={styles.price}>{r.priceFrom}</td>
              <td>{r.duration}</td>
              <td className={styles.jumpCol}>
                <a href={`#z-${r.destination.slug}`} className={styles.jump}>
                  Zobacz
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
