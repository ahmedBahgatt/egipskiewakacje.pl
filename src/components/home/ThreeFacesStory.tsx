"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { ExperienceVisual } from "@/components/experience/ExperienceVisual";
import { IconArrowRight } from "@/components/ui/icons";
import type { Motif } from "@/lib/experiences";
import styles from "./ThreeFacesStory.module.css";

interface Face {
  no: string;
  kicker: string;
  title: string;
  text: string;
  motif: Motif;
  accent: string;
  href: string;
  cta: string;
}

/**
 * The homepage's editorial "story" section - a reusable, broad travel narrative
 * that replaced the old Cairo-only CairoStory. Egypt has three faces here: the
 * Red Sea, ancient history and the desert. Cairo lives inside "Historia" but no
 * longer owns the whole section, so the homepage represents the full catalogue.
 */
const FACES: Face[] = [
  {
    no: "01",
    kicker: "Morze Czerwone",
    title: "Morze",
    text: "Rejsy na wyspy, snorkeling z delfinami i nurkowanie na rafach światowej klasy. Turkusowa woda tuż za progiem hotelu.",
    motif: "cruise",
    accent: "var(--teal-500)",
    href: "/wycieczki/rejsy-i-wyspy/",
    cta: "Rejsy, wyspy i snorkeling",
  },
  {
    no: "02",
    kicker: "Tysiące lat historii",
    title: "Historia",
    text: "Piramidy w Gizie, Sfinks i muzea faraonów w Kairze, Dolina Królów i świątynie Luksoru. Cała starożytność w jeden dzień.",
    motif: "history",
    accent: "var(--gold-400)",
    href: "/wycieczki/kair-i-piramidy/",
    cta: "Kair, piramidy i Luksor",
  },
  {
    no: "03",
    kicker: "Pustynia i przygoda",
    title: "Pustynia",
    text: "Quady i buggy na wydmach, jeep safari, zachód słońca i wieczór w wiosce beduińskiej. Druga twarz Egiptu.",
    motif: "safari",
    accent: "var(--terracotta-500)",
    href: "/wycieczki/safari-i-quady/",
    cta: "Safari, quady i pustynia",
  },
];

export function ThreeFacesStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className={`${styles.story} motif-dark on-dark`} aria-label="Trzy oblicza Egiptu">
      <m.div className={styles.progress} style={{ scaleX }} aria-hidden="true" />

      <div className="container">
        <Reveal>
          <p className="eyebrow" style={{ color: "var(--gold-400)" }}>
            Jeden kraj, wiele pomysłów na dzień
          </p>
          <h2 className={styles.title}>Trzy oblicza Egiptu</h2>
          <p className={styles.lead}>
            Nad Morzem Czerwonym wybierasz codziennie od nowa: dzień na łodzi, dzień wśród zabytków
            albo dzień na pustyni. Wszystko z jednego kurortu.
          </p>
        </Reveal>

        <div className={styles.faces}>
          {FACES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <Link href={f.href} className={styles.face} style={{ "--accent": f.accent } as CSSProperties}>
                <div className={styles.faceVisual}>
                  <ExperienceVisual motif={f.motif} accent="var(--accent)" />
                </div>
                <span className={styles.faceNo}>{f.no}</span>
                <span className={styles.faceKicker}>{f.kicker}</span>
                <h3 className={styles.faceTitle}>{f.title}</h3>
                <p className={styles.faceText}>{f.text}</p>
                <span className={styles.faceMore}>
                  {f.cta} <IconArrowRight />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
