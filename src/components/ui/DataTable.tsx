import type { ReactNode } from "react";
import styles from "./DataTable.module.css";

interface Props {
  caption?: string;
  columns: string[];
  rows: ReactNode[][];
  className?: string;
  /**
   * Opt-in: keep ONE bordered/rounded table box but make it fit narrow phones -
   * the value column shrinks to its content (right-aligned) and the label column
   * wraps, so no sideways scroll is needed. Use for small transactional tables
   * (pricing, transfers). Wide data tables keep the default horizontal scroll.
   */
  responsive?: boolean;
}

/** Semantic table. Default = horizontally scrollable; `responsive` = fits phones in one box. */
export function DataTable({ caption, columns, rows, className, responsive }: Props) {
  return (
    <div
      className={`${styles.wrap}${responsive ? ` ${styles.responsive}` : ""}${className ? ` ${className}` : ""}`}
    >
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
                <td key={j} data-label={columns[j]}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
