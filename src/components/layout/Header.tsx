"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { IconChevronDown, IconMenu } from "@/components/ui/icons";
import { primaryNav } from "./nav";
import { MobileMenu } from "./MobileMenu";
import styles from "./Header.module.css";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

/** True only on genuine hover+fine-pointer devices (laptops/desktops with a mouse). */
function canHover(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Which desktop dropdown (keyed by its parent href) is open - controlled purely in
  // React. A single close timer bridges the pointer moving between the trigger and
  // its panel; there is NO hover-suppression flag (that was the intermittent
  // first-hover bug) and the trigger is a real <button> that never navigates.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const open = useCallback((href: string) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(href);
  }, []);
  const closeSoon = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, []);
  const closeNow = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any route change closes the mobile menu and every desktop dropdown.
  useEffect(() => {
    setMenuOpen(false);
    closeNow();
  }, [pathname, closeNow]);

  // While a dropdown is open: Escape closes it (focus returns to its trigger); any
  // pointer/focus outside the nav closes it.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = triggerRefs.current[openMenu];
        closeNow();
        trigger?.focus();
      }
    };
    const onOutside = (e: Event) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeNow();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
    };
  }, [openMenu, closeNow]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // On the homepage the header floats transparently over the full-bleed hero.
  const overHero = pathname === "/";

  return (
    <header
      className={`${styles.header} ${overHero ? styles.overHero : ""} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Egipskie Wakacje - strona główna">
          {/* Crest + live-text wordmark. The name re-colours via currentColor -
              navy on the cream inner header, white over the dark hero / navy
              scrolled bar - so one lockup works on every surface. */}
          <Logo context="header" />
        </Link>

        <nav ref={navRef} className={styles.nav} aria-label="Menu główne">
          <ul className={styles.navList}>
            {primaryNav.map((item) =>
              item.children ? (
                <li
                  key={item.href}
                  className={styles.hasChildren}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse" && canHover()) open(item.href);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") closeSoon();
                  }}
                >
                  <button
                    type="button"
                    ref={(el) => {
                      triggerRefs.current[item.href] = el;
                    }}
                    className={`${styles.navLink} ${styles.navTrigger} ${
                      isActive(pathname, item.href) ? styles.active : ""
                    }`}
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.href}
                    aria-controls={`menu-${item.href.replace(/\W+/g, "")}`}
                    // Click/Enter/Space OPEN the menu (never navigate). Closing is
                    // via pointer-leave, Escape or an outside click - so a click that
                    // follows a hover-open can't immediately toggle it shut.
                    onClick={() => open(item.href)}
                  >
                    {item.label}
                    <IconChevronDown className={styles.navChev} />
                  </button>
                  <div
                    id={`menu-${item.href.replace(/\W+/g, "")}`}
                    className={`${styles.dropdown} ${openMenu === item.href ? styles.dropdownOpen : ""}`}
                  >
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`${styles.dropLink} ${
                              pathname === child.href ? styles.active : ""
                            }`}
                            tabIndex={openMenu === item.href ? undefined : -1}
                            onClick={closeNow}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive(pathname, item.href) ? styles.active : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href="/rezerwacja/" size="sm" className={styles.cta}>
            Zarezerwuj wycieczkę
          </Button>
          <button
            type="button"
            className={styles.burger}
            aria-label="Otwórz menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}
