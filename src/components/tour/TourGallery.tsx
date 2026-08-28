"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { MediaImage } from "@/content/types";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconChevronLeft, IconChevronRight, IconX } from "@/components/ui/icons";
import styles from "./TourGallery.module.css";

/**
 * Reusable premium tour gallery + lightbox. Editorial mosaic on desktop (one
 * large primary + supporting tiles), a clean stacked grid on mobile. Every image
 * opens a full-screen lightbox with prev/next, a counter, swipe, keyboard arrows,
 * Escape, focus trap/return and body scroll-lock. No external gallery dependency.
 *
 * Built to drop onto any tour page: pass the tour's `gallery` (primary first).
 */

const PRIMARY_SIZES = "(min-width: 900px) 42vw, (min-width: 600px) 66vw, 100vw";
const TILE_SIZES = "(min-width: 900px) 22vw, (min-width: 600px) 45vw, 50vw";
const SWIPE_THRESHOLD = 40; // px

function largestWebp(image: MediaImage): string | undefined {
  if (image.sources?.webp) return image.sources.webp;
  if (image.widths?.length) return `${image.src}-${image.widths[image.widths.length - 1]}.webp`;
  return `${image.src}.webp`;
}

/** Full srcSet for one format - responsive local variants, Sanity URL, or plain triplet. */
function srcSetFor(image: MediaImage, ext: "avif" | "webp" | "jpg"): string {
  if (image.sources) return image.sources[ext];
  if (image.widths?.length) return image.widths.map((w) => `${image.src}-${w}.${ext} ${w}w`).join(", ");
  return `${image.src}.${ext}`;
}

/** JPG fallback URL for the lightbox <img>. */
function jpgSrc(image: MediaImage): string {
  if (image.sources?.jpg) return image.sources.jpg;
  if (image.widths?.length) return `${image.src}-${image.widths[image.widths.length - 1]}.jpg`;
  return `${image.src}.jpg`;
}

export function TourGallery({ images }: { images: MediaImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreIndex = useRef<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const count = images.length;
  const isOpen = openIndex !== null;

  useEffect(() => setMounted(true), []);

  const open = useCallback((i: number) => {
    restoreIndex.current = i;
    setOpenIndex(i);
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);

  const go = useCallback(
    (dir: 1 | -1) => setOpenIndex((prev) => (prev === null ? prev : (prev + dir + count) % count)),
    [count],
  );

  // Body scroll-lock + FAB hide while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    body.dataset.lightboxOpen = "true";
    return () => {
      body.style.overflow = prevOverflow;
      delete body.dataset.lightboxOpen;
    };
  }, [isOpen]);

  // Move focus into the dialog on open; return it to the triggering tile on close.
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    } else if (restoreIndex.current !== null) {
      triggerRefs.current[restoreIndex.current]?.focus();
      restoreIndex.current = null;
    }
  }, [isOpen]);

  // Preload the adjacent images (current is already rendered) - never all six.
  useEffect(() => {
    if (openIndex === null || count < 2) return;
    [(openIndex + 1) % count, (openIndex - 1 + count) % count].forEach((i) => {
      const url = largestWebp(images[i]);
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, [openIndex, images, count]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Tab") {
        // Focus trap: keep Tab inside the dialog.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [close, go],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  if (count === 0) return null;

  return (
    <div className={styles.wrap}>
      <ul className={styles.grid} data-count={count}>
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 ? `${styles.tile} ${styles.primary}` : styles.tile}>
            <button
              type="button"
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              className={styles.tileBtn}
              onClick={() => open(i)}
              aria-label={`Powiększ zdjęcie ${i + 1} z ${count}: ${img.alt}`}
              aria-haspopup="dialog"
            >
              <OptimizedImage
                image={img}
                priority={i === 0}
                sizes={i === 0 ? PRIMARY_SIZES : TILE_SIZES}
                rounded
              />
              <span className={styles.zoom} aria-hidden="true">
                <IconChevronRight />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {mounted && isOpen
        ? createPortal(
            <div
              className={styles.lightbox}
              role="dialog"
              aria-modal="true"
              aria-label={`Galeria zdjęć - wycieczka do Kairu (${openIndex! + 1} z ${count})`}
              ref={dialogRef}
              onKeyDown={onKeyDown}
              onClick={close}
            >
              <div className={styles.lbBar} onClick={(e) => e.stopPropagation()}>
                <span className={styles.counter} aria-live="polite">
                  {openIndex! + 1} / {count}
                </span>
                <button
                  type="button"
                  ref={closeRef}
                  className={styles.close}
                  onClick={close}
                  aria-label="Zamknij galerię"
                >
                  <IconX />
                </button>
              </div>

              <button
                type="button"
                className={`${styles.nav} ${styles.prev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Poprzednie zdjęcie"
              >
                <IconChevronLeft />
              </button>

              <figure
                className={styles.stage}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <picture className={styles.stagePic} key={images[openIndex!].src}>
                  <source srcSet={srcSetFor(images[openIndex!], "avif")} sizes="100vw" type="image/avif" />
                  <source srcSet={srcSetFor(images[openIndex!], "webp")} sizes="100vw" type="image/webp" />
                  <img
                    className={styles.stageImg}
                    src={jpgSrc(images[openIndex!])}
                    srcSet={srcSetFor(images[openIndex!], "jpg")}
                    sizes="100vw"
                    alt={images[openIndex!].alt}
                    width={images[openIndex!].width}
                    height={images[openIndex!].height}
                    decoding="async"
                  />
                </picture>
                <figcaption className={styles.caption}>{images[openIndex!].alt}</figcaption>
              </figure>

              <button
                type="button"
                className={`${styles.nav} ${styles.next}`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Następne zdjęcie"
              >
                <IconChevronRight />
              </button>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
