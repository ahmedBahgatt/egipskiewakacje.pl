import Link from "next/link";
import styles from "./ChipNav.module.css";

export type ChipNavItem = {
  label: string;
  href: string;
  /** Marks the current page's chip (adds aria-current + active styling). */
  active?: boolean;
};

/**
 * Compact, editorial pill navigation for contextual internal links (category
 * hubs, related routes). Shared treatment reused by the category and destination
 * hubs so the site keeps one chip design, not competing ones. Chips wrap onto
 * multiple lines on narrow viewports - no horizontal page overflow.
 *
 * Vertical rhythm is intentionally left to the caller (pass `className`) so each
 * hub can place the row against its own section spacing.
 */
export function ChipNav({
  items,
  ariaLabel,
  className,
}: {
  items: ChipNavItem[];
  ariaLabel: string;
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <nav className={`${styles.nav} ${className ?? ""}`} aria-label={ariaLabel}>
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className={`${styles.chip} ${it.active ? styles.chipActive : ""}`}
          aria-current={it.active ? "page" : undefined}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
