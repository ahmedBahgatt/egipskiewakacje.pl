"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import Link from "next/link";
import {
  m,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconPause, IconPlay, IconWhatsApp } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import type { Destination } from "@/content/types";
import styles from "./Hero.module.css";

const HERO_POSTER = {
  src: "/media/hero/hero-poster",
  alt: "Piramidy w Gizie i Morze Czerwone o zachodzie słońca",
  width: 1920,
  height: 1080,
};

export function Hero({ destinations }: { destinations: Destination[] }) {
  // Destination selector is CMS-driven (from the content adapter, via props).
  const departures = destinations.map((d) => ({
    slug: d.slug,
    label: d.name,
    href: `${d.routeBase}/`,
  }));

  // Preload the LCP image (AVIF) at high priority so it is not queued behind
  // other resources on throttled mobile. Emitted into <head> during SSR.
  preload(`${HERO_POSTER.src}.avif`, {
    as: "image",
    type: "image/avif",
    fetchPriority: "high",
  });

  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Pointer parallax for the decorative layer (desktop, fine pointer, motion ok).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  // Decide whether to load the video: skip for reduced motion & Save-Data, and
  // defer until the page is loaded + idle so the tiny poster remains the LCP
  // (the video is never the largest paint during the initial load).
  useEffect(() => {
    if (reduce) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const enable = () => {
      if (typeof w.requestIdleCallback === "function") {
        w.requestIdleCallback(() => setUseVideo(true), { timeout: 3000 });
      } else {
        window.setTimeout(() => setUseVideo(true), 1200);
      }
    };
    if (document.readyState === "complete") {
      enable();
    } else {
      window.addEventListener("load", enable, { once: true });
    }
    return () => window.removeEventListener("load", enable);
  }, [reduce]);

  // Pause when offscreen or when the tab is hidden; resume when visible again.
  useEffect(() => {
    if (!useVideo) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let inView = true;
    const play = () => {
      if (inView && !document.hidden) {
        video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
    };
    const pause = () => {
      video.pause();
      setPlaying(false);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) play();
        else pause();
      },
      { threshold: 0.1 },
    );
    io.observe(section);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [useVideo]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    px.set(((e.clientX / w) - 0.5) * 22);
    py.set(((e.clientY / h) - 0.5) * 22);
  }

  return (
    <section ref={sectionRef} className={styles.hero} onPointerMove={onPointerMove}>
      <div className={styles.media}>
        <OptimizedImage image={HERO_POSTER} priority className={styles.poster} />
        {useVideo && (
          <video
            ref={videoRef}
            className={`${styles.video} ${videoReady && playing ? styles.videoOn : ""}`}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setPlaying(true)}
          >
            <source src="/media/hero/hero.webm" type="video/webm" />
            <source src="/media/hero/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className={styles.scrim} />
        {!reduce && (
          <m.div className={styles.orb} style={{ x: sx, y: sy }} aria-hidden="true" />
        )}
      </div>

      <div className={`container ${styles.content}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>Egipt dla polskich turystów</p>
        <h1 className={styles.title}>Wycieczki fakultatywne w Egipcie dla polskich turystów</h1>
        <p className={styles.lead}>
          Odkrywaj Egipt z Hurghady, Marsa Alam i Sharm el Sheikh. Przejrzyste ceny, odbiór z
          hotelu i szybka rezerwacja przez WhatsApp.
        </p>

        <div className={styles.ctas}>
          <Button href="/wycieczki/" size="lg" iconRight={<IconArrowRight />}>
            Zobacz wycieczki
          </Button>
          <Button
            href={contactWhatsappUrl("Cześć! Chcę zapytać o wycieczki w Egipcie.")}
            external
            variant="whatsapp"
            size="lg"
            iconLeft={<IconWhatsApp />}
          >
            Napisz na WhatsApp
          </Button>
        </div>

        <div className={styles.selector} role="group" aria-label="Skąd wyjeżdżasz?">
          <span className={styles.selectorLabel} aria-hidden="true">
            Skąd wyjeżdżasz?
          </span>
          <div className={styles.chips}>
            {departures.map((d) => (
              <Link
                key={d.slug}
                href={d.href}
                className={styles.chip}
                onClick={() => track("destination_select", { destination: d.slug, source: "hero" })}
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {useVideo && (
        <button
          type="button"
          className={styles.playBtn}
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? "Zatrzymaj wideo w tle" : "Odtwórz wideo w tle"}
        >
          {playing ? <IconPause /> : <IconPlay />}
        </button>
      )}
    </section>
  );
}
