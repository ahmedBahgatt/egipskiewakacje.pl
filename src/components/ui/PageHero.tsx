import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { OptimizedImage } from "./OptimizedImage";
import type { MediaImage } from "@/content/types";
import styles from "./PageHero.module.css";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  /** Full-bleed background photography (destination / category). */
  image?: MediaImage;
  /** Prioritise the hero image (it is the LCP on interior pages). */
  imagePriority?: boolean;
  /** Compact CTA row (use the shared Button: gold + whatsappOutline). */
  actions?: ReactNode;
}

/**
 * Shared interior-page hero: one cinematic composition for every destination and
 * category landing page. The real photography fills the whole section (full-bleed,
 * object-fit cover with a destination-tuned crop). A left-to-right navy scrim keeps
 * the LEFT column readable (breadcrumb, eyebrow, H1, intro, compact CTAs) while the
 * RIGHT side of the photo stays bright and open. Content is left-aligned to the
 * normal site gutter and never centred; it stacks over the photo on mobile.
 */
export function PageHero({ eyebrow, title, intro, crumbs, image, imagePriority, actions }: Props) {
  return (
    <header className={`${styles.hero} on-dark`}>
      {image && (
        <div className={styles.media} aria-hidden="true">
          <OptimizedImage image={image} priority={imagePriority} className={styles.img} />
        </div>
      )}
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <Breadcrumbs crumbs={crumbs} />
          {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {intro && <p className={styles.intro}>{intro}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </div>
    </header>
  );
}
