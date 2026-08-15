import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./Marquee.module.css";

export interface MarqueeItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

/**
 * Seamless navy/gold ticker sitting directly under the hero. Two identical copies
 * of the item list are laid side by side and the track is translated by exactly
 * one copy's width, so the loop never visibly jumps. Pure CSS animation (no JS),
 * paused on hover and disabled for reduced-motion (where the strip becomes
 * horizontally scrollable instead). Items link to real Egipskie Wakacje routes.
 *
 * Concept adapted from the atrakcjeegiptu.pl homepage marquee; restyled to the
 * Egipskie Wakacje palette with real category/destination links.
 */
export function Marquee({ items }: { items: MarqueeItem[] }) {
  if (!items.length) return null;

  const renderSet = (clone: boolean) => (
    <div className={styles.set} aria-hidden={clone || undefined}>
      {items.map((it, i) => (
        <span className={styles.cell} key={`${clone ? "b" : "a"}-${i}`}>
          <Link href={it.href} className={styles.item} tabIndex={clone ? -1 : undefined}>
            {it.icon && (
              <span className={styles.icon} aria-hidden="true">
                {it.icon}
              </span>
            )}
            {it.label}
          </Link>
          <span className={styles.sep} aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section className={styles.marquee} aria-label="Popularne wycieczki i kierunki">
      <div className={styles.viewport}>
        <div className={styles.track}>
          {renderSet(false)}
          {renderSet(true)}
        </div>
      </div>
    </section>
  );
}
