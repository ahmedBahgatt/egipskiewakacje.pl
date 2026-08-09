import styles from "./SectionJumpNav.module.css";

export interface JumpItem {
  id: string;
  label: string;
  count?: number;
}

/**
 * Elegant in-page jump navigation: horizontal, scrollable chips that scroll to a
 * section anchor. Pure anchor links (works without JS; smooth-scroll + scroll
 * margin handled in CSS). Used at the top of destination and category pages.
 */
export function SectionJumpNav({
  items,
  label,
  lead,
}: {
  items: JumpItem[];
  label: string;
  lead?: string;
}) {
  if (items.length < 2) return null;
  return (
    <nav className={styles.nav} aria-label={label}>
      {lead && <span className={styles.lead}>{lead}</span>}
      <ul className={styles.list}>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={styles.chip}>
              {it.label}
              {it.count != null && <span className={styles.count}>{it.count}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
