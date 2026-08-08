import Link from "next/link";
import type { PostBlock, Tour } from "@/content/types";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { DataTable } from "@/components/ui/DataTable";
import { IconArrowRight } from "@/components/ui/icons";
import { priceLabel } from "@/lib/format";
import styles from "./PostBody.module.css";

/**
 * Renders the closed PostBlock set. No dangerouslySetInnerHTML, no raw HTML - every
 * block maps to safe React elements, so untrusted markup can never render. Related
 * tours referenced by blocks are resolved and passed via `tours` for CTA cards.
 */
export function PostBody({ blocks, tours = [] }: { blocks: PostBlock[]; tours?: Tour[] }) {
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
          case "image":
            return (
              <figure key={i} className={styles.figure}>
                <div className={styles.figMedia}>
                  <OptimizedImage image={block.image} rounded />
                </div>
                {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
              </figure>
            );
          case "gallery":
            return (
              <div key={i} className={styles.gallery}>
                {block.images.map((img, j) => (
                  <div key={j} className={styles.galleryItem}>
                    <OptimizedImage image={img} rounded />
                  </div>
                ))}
              </div>
            );
          case "quote":
            return (
              <blockquote key={i} className={styles.quote}>
                <p>{block.text}</p>
                {block.cite && <cite className={styles.cite}>{block.cite}</cite>}
              </blockquote>
            );
          case "table":
            return (
              <div key={i} className={styles.tableWrap}>
                <DataTable caption={block.caption} columns={block.headers} rows={block.rows} />
              </div>
            );
          case "linkButton": {
            // Internal links must be root-relative; external links open safely.
            const internal = !block.external && block.href.startsWith("/");
            if (block.external) {
              return (
                <p key={i} className={styles.linkRow}>
                  <a
                    className={styles.linkBtn}
                    href={block.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {block.label} <IconArrowRight />
                  </a>
                </p>
              );
            }
            if (!internal) return null; // reject malformed internal links
            return (
              <p key={i} className={styles.linkRow}>
                <Link className={styles.linkBtn} href={block.href}>
                  {block.label} <IconArrowRight />
                </Link>
              </p>
            );
          }
          case "relatedTour": {
            const tour = tours.find((t) => t.slug === block.tourSlug);
            if (!tour) return null;
            return (
              <Link key={i} href={`${tour.route}/`} className={styles.relatedTour}>
                <span className={styles.relatedKicker}>Polecana wycieczka</span>
                <span className={styles.relatedTitle}>{tour.title}</span>
                <span className={styles.relatedMeta}>
                  {priceLabel(tour.price)} / dorosły
                  <IconArrowRight />
                </span>
              </Link>
            );
          }
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

/** Slugs of tours referenced by relatedTour blocks (so pages can resolve them). */
export function relatedTourSlugsInBody(blocks: PostBlock[]): string[] {
  return blocks
    .filter((b): b is Extract<PostBlock, { type: "relatedTour" }> => b.type === "relatedTour")
    .map((b) => b.tourSlug);
}
