import type { ReactNode } from "react";
import styles from "./DataTable.module.css";

interface Props {
  caption?: string;
  columns: string[];
  rows: ReactNode[][];
  className?: string;
}

/** Semantic, horizontally scrollable table. Used for pricing / transfers / comparison. */
export function DataTable({ caption, columns, rows, className }: Props) {
  return (
    <div className={`${styles.wrap}${className ? ` ${className}` : ""}`}>
      <table className={styles.table}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
