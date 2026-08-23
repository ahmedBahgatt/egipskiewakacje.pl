import Link from "next/link";
import { IconArrowRight } from "./icons";
import styles from "./RelatedLinks.module.css";

export interface RelatedLink {
  title: string;
  href: string;
  blurb?: string;
}

/**
 * Hub-and-spoke internal-link block ("Zobacz też ..."). Renders descriptive,
 * keyword-relevant Polish anchors as normal crawlable <a> links - never a generic
 * "kliknij tutaj". Each card is a single link (no nested interactive elements, so
 * no stretched-link ghost-click pattern). Used to connect the all-tours hub to
 * destinations/categories, categories to their departure resorts and reserved
 * tour pages, and destinations to other resorts and guides.
 */
export function RelatedLinks({
  title,
  eyebrow,
  items,
  columns = 3,
  tone = "default",
}: {
  title: string;
  eyebrow?: string;
  items: RelatedLink[];
  columns?: 2 | 3 | 4;
  /** Subtle background alternation to avoid consecutive same-tone card sections. */
  tone?: "default" | "paper";
}) {
  if (items.length === 0) return null;
  return (
    <section className="section" style={tone === "paper" ? { background: "var(--bg-paper)" } : undefined}>
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className={styles.title}>{title}</h2>
        <ul className={styles.grid} data-cols={columns}>
          {items.map((it) => (
            <li key={it.href} className={styles.item}>
              <Link href={it.href} className={styles.card}>
                <span className={styles.cardTitle}>
                  {it.title}
                  <IconArrowRight className={styles.arrow} />
                </span>
                {it.blurb && <span className={styles.blurb}>{it.blurb}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
