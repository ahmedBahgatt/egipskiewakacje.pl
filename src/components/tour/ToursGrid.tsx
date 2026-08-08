import type { Tour } from "@/content/types";
import { TourCard } from "./TourCard";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ToursGrid.module.css";

export function ToursGrid({ tours, priorityFirst = false }: { tours: Tour[]; priorityFirst?: boolean }) {
  return (
    <div className={styles.grid}>
      {tours.map((tour, i) => (
        <Reveal key={tour.slug} delay={i * 0.06} className={styles.cell}>
          <TourCard tour={tour} position={i + 1} priority={priorityFirst && i === 0} />
        </Reveal>
      ))}
    </div>
  );
}
