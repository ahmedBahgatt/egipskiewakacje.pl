"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconWhatsApp, IconX } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { primaryNav } from "./nav";
import styles from "./MobileMenu.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose, pathname }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  // The drawer is rendered through a portal into <body> so it escapes the
  // header's stacking/containing context. The header carries `backdrop-filter`,
  // which makes it the containing block for any fixed-position descendant - that
  // trapped this fixed drawer inside the 72px-tall header box (clipped panel +
  // a backdrop covering only the header strip). `mounted` gates the portal so the
  // server/first client render match (no hydration mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // Scroll lock without layout shift.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    // Signal the open drawer to the rest of the app via a body attribute so the
    // global floating WhatsApp button can hide itself in pure CSS (no z-index war).
    document.body.setAttribute("data-menu-open", "true");

    const panel = panelRef.current;
    const focusables = panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
    focusables[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && focusables.length > 0) {
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
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      document.body.removeAttribute("data-menu-open");
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className={styles.root}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        id="mobile-menu"
        className={`${styles.panel} on-dark`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className={styles.head}>
          <span className={styles.headTitle}>Menu</span>
          <button type="button" className={styles.close} aria-label="Zamknij menu" onClick={onClose}>
            <IconX />
          </button>
        </div>

        <nav aria-label="Menu mobilne" className={styles.nav}>
          <ul className={styles.list}>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${pathname === item.href ? styles.active : ""}`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className={styles.sub}>
                    {item.children.slice(1).map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`${styles.subLink} ${
                            pathname === child.href ? styles.active : ""
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <Button href="/rezerwacja/" variant="gold" size="md" fullWidth iconRight={<IconArrowRight />}>
            Zarezerwuj wycieczkę
          </Button>
          <Button
            href={contactWhatsappUrl("Cześć! Mam pytanie o wycieczki w Egipcie.")}
            external
            variant="whatsappOutline"
            size="md"
            fullWidth
            iconLeft={<IconWhatsApp />}
          >
            Napisz na WhatsApp
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
