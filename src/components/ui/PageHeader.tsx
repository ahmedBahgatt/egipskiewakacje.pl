import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import styles from "./PageHeader.module.css";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
}

/** Consistent interior-page header band with breadcrumbs, H1 and intro. */
export function PageHeader({ eyebrow, title, intro, crumbs }: Props) {
  return (
    <header className={styles.header}>
      <div className="container">
        <Breadcrumbs crumbs={crumbs} />
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {intro && <p className={styles.intro}>{intro}</p>}
      </div>
    </header>
  );
}
