import type { PostBlock } from "@/content/types";
import styles from "./PostBody.module.css";

/**
 * Renders the closed PostBlock set. No dangerouslySetInnerHTML, no raw HTML -
 * every block maps to safe React elements, so untrusted markup can never render.
 */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className={styles.body}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} id={block.id} className={styles.h2}>
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className={styles.p}>
                {block.text}
              </p>
            );
          case "list":
            return block.ordered ? (
              <ol key={i} className={styles.ol}>
                {block.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            ) : (
              <ul key={i} className={styles.ul}>
                {block.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside key={i} className={`${styles.callout} ${styles[block.tone]}`} role="note">
                {block.text}
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/** Extract headings for a table of contents. */
export function tableOfContents(blocks: PostBlock[]): { id: string; text: string }[] {
  return blocks
    .filter((b): b is Extract<PostBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: b.id, text: b.text }));
}
