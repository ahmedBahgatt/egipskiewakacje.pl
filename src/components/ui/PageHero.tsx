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
  /** Right-hand photography. When omitted the hero is a clean left-aligned band. */
  image?: MediaImage;
  /** Prioritise the hero image (it is the LCP on interior pages). */
  imagePriority?: boolean;
  /** Compact CTA row (use the shared Button: gold + whatsappSubtle). */
  actions?: ReactNode;
}

/**
 * Shared interior-page hero. One premium composition for every destination and
 * category landing page: LEFT column = breadcrumb, H1, intro and compact CTAs,
 * aligned to the normal site gutter (never centred); RIGHT column = clean
 * destination/category photography. Collapses to a single column on mobile with
 * the copy first, so the H1 is the first thing read and the image follows.
 */
export function PageHero({ eyebrow, title, intro, crumbs, image, imagePriority, actions }: Props) {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.inner} ${image ? styles.withMedia : ""}`}>
        <div className={styles.content}>
          <Breadcrumbs crumbs={crumbs} />
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {intro && <p className={styles.intro}>{intro}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>

        {image && (
          <div className={styles.media}>
            <OptimizedImage image={image} priority={imagePriority} className={styles.img} />
          </div>
        )}
      </div>
    </header>
  );
}
