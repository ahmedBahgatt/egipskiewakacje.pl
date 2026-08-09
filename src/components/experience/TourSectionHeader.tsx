import type { CSSProperties } from "react";
import Link from "next/link";
import type { Motif } from "@/lib/experiences";
import { ExperienceVisual } from "./ExperienceVisual";
import { IconArrowRight } from "@/components/ui/icons";
import styles from "./TourSectionHeader.module.css";

/**
 * Reusable header for an experience section (used on destination and category
 * pages). Data-driven: title, count eyebrow, intro, motif and an optional
 * "see the whole category / departure" link all come from props - no hardcoded
 * tour titles. The `id` is the scroll anchor for the jump navigation.
 */
export function TourSectionHeader({
  id,
  eyebrow,
  title,
  intro,
  motif,
  accent,
  linkHref,
  linkLabel,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  motif: Motif;
  accent: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <header id={id} className={styles.header} style={{ "--accent": accent } as CSSProperties}>
      <span className={styles.rule} aria-hidden="true" />
      <div className={styles.row}>
        <div className={styles.textCol}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.title}>{title}</h2>
          {intro && <p className={styles.intro}>{intro}</p>}
          {linkHref && linkLabel && (
            <Link href={linkHref} className={styles.link}>
              {linkLabel} <IconArrowRight />
            </Link>
          )}
        </div>
        <div className={styles.visualCol}>
          <ExperienceVisual motif={motif} accent="var(--accent)" />
        </div>
      </div>
    </header>
  );
}
