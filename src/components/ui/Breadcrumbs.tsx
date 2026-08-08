import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export interface Crumb {
  name: string;
  path: string;
}

/** Visual breadcrumb trail. JSON-LD is emitted separately by the page. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Okruszki" className={styles.wrap}>
      <ol className={styles.list}>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className={styles.item}>
              {last ? (
                <span aria-current="page" className={styles.current}>
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className={styles.link}>
                  {c.name}
                </Link>
              )}
              {!last && <span className={styles.sep} aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
