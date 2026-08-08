import type { FaqItem } from "@/content/types";
import { IconChevronDown } from "./icons";
import styles from "./Faq.module.css";

/**
 * Accessible FAQ built on native <details>/<summary>: keyboard-operable and fully
 * readable with no JavaScript. Matching FAQPage JSON-LD is emitted by the page.
 */
export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={`${styles.faq}${className ? ` ${className}` : ""}`}>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary className={styles.summary}>
            <span>{item.question}</span>
            <IconChevronDown className={styles.chev} />
          </summary>
          <div className={styles.answer}>
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
