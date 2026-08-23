"use client";

import { useEffect, useRef } from "react";
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

  if (!open) return null;

  return (
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
    </div>
  );
}
