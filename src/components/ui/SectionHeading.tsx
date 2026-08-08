import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./SectionHeading.module.css";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h2" | "h3";
}

export function SectionHeading({ eyebrow, title, intro, align = "left", as = "h2" }: Props) {
  const Tag = as;
  return (
    <Reveal className={`${styles.head} ${align === "center" ? styles.center : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={styles.title}>{title}</Tag>
      {intro && <p className={styles.intro}>{intro}</p>}
    </Reveal>
  );
}
