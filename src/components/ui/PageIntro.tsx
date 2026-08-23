import type { ReactNode } from "react";
import type { Fact } from "@/lib/facts";
import styles from "./PageIntro.module.css";

/**
 * Answer-first intro block for the destination/category/all-tours hubs.
 *
 * The `lead` is a concise, crawlable paragraph that directly answers "what does
 * this page offer, from where, how do I book" - written to be easy for users,
 * Google, AI Overviews and answer engines to extract. It sits high on the page as
 * normal HTML (no hidden text, no "AI answer" labelling). Alongside it, a compact
 * Quick Facts list surfaces the real, derived numbers (trip count, from-price,
 * departure resorts) plus the permanent booking rules.
 */
export function PageIntro({
  lead,
  facts,
  factsTitle = "W skrócie",
}: {
  lead: ReactNode;
  facts: Fact[];
  factsTitle?: string;
}) {
  return (
    <section className="section">
      <div className={`container ${styles.grid}`}>
        <div className={styles.prose}>{lead}</div>
        {facts.length > 0 && (
          <aside className={styles.facts} aria-label={factsTitle}>
            <p className={styles.factsTitle}>{factsTitle}</p>
            <dl className={styles.factList}>
              {facts.map((f) => (
                <div key={f.label} className={styles.factRow}>
                  <dt className={styles.factLabel}>{f.label}</dt>
                  <dd className={styles.factValue}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>
    </section>
  );
}
