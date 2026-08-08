"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/icons";
import styles from "./CairoStory.module.css";

const STORY_IMG = {
  src: "/media/cairo/story",
  alt: "Panorama Kairu o zmierzchu z sylwetkami piramid i miasta",
  width: 1920,
  height: 1080,
};

const CHAPTERS = [
  { title: "Piramidy i Sfinks", text: "Płaskowyż w Gizie - trzy piramidy i Wielki Sfinks z bliska." },
  { title: "Muzea Kairu", text: "Muzeum Egipskie lub nowoczesne GEM, w zależności od trasy." },
  { title: "Stary Kair", text: "Kościoły, meczet i synagoga w jednej zabytkowej dzielnicy." },
  { title: "Nil (opcjonalnie)", text: "Krótki rejs po Nilu jako dodatkowa atrakcja dla chętnych." },
];

export function CairoStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className={`${styles.story} on-dark`} aria-label="Kair z bliska">
      <div className={styles.bg}>
        <OptimizedImage image={STORY_IMG} className={styles.bgImg} />
        <div className={styles.scrim} />
      </div>

      <m.div className={styles.progress} style={{ scaleX }} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className="eyebrow" style={{ color: "var(--gold-400)" }}>
            Kair z bliska
          </p>
          <h2 className={styles.title}>Jeden dzień, tysiące lat historii</h2>
          <p className={styles.lead}>
            Wyprawy prowadzą do serca starożytnego Egiptu - od piramid w Gizie po muzea i uliczki
            Starego Kairu. Poniżej to, co zobaczysz po drodze.
          </p>
        </Reveal>

        <div className={styles.chapters}>
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className={styles.chapter}>
                <span className={styles.chapterNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.chapterTitle}>{c.title}</h3>
                <p className={styles.chapterText}>{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Button href="/wycieczki/" size="lg" iconRight={<IconArrowRight />}>
            Zobacz wszystkie wycieczki
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
