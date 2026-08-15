"use client";

import { useEffect, useRef, useState } from "react";
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

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Which desktop dropdown (keyed by its parent href) is open. Controlled purely
  // in React so a menu we close after navigation can never be re-opened by a
  // stale CSS :hover while the pointer is still resting on the header.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  // After a navigation we suppress hover-open until the pointer physically leaves
  // and re-enters, so a stationary cursor over the header does not immediately
  // reopen the menu on the new page (the exact bug being fixed).
  const suppressHoverOpen = useRef(false);
  const firstPathRun = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any route change closes the mobile menu and every desktop dropdown, and (on
  // real navigations, not the initial mount) blocks hover-reopen until the
  // pointer leaves the trigger.
  useEffect(() => {
    setMenuOpen(false);
    setOpenMenu(null);
    if (firstPathRun.current) {
      firstPathRun.current = false;
      return;
    }
    suppressHoverOpen.current = true;
  }, [pathname]);

  // While a dropdown is open: Escape closes it (focus returns to its trigger),
  // and any pointer/focus outside the nav closes it.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = triggerRefs.current[openMenu];
        setOpenMenu(null);
        trigger?.focus();
      }
    };
    const onOutside = (e: Event) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
    };
  }, [openMenu]);

  // On the homepage the header floats transparently over the full-bleed hero and
  // only turns solid once scrolled. Every other page keeps the solid light bar.
  const overHero = pathname === "/";

  return (
    <header
      className={`${styles.header} ${overHero ? styles.overHero : ""} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Egipskie Wakacje - strona główna">
          <Logo />
        </Link>

        <nav ref={navRef} className={styles.nav} aria-label="Menu główne">
          <ul className={styles.navList}>
            {primaryNav.map((item) =>
              item.children ? (
                <li
                  key={item.href}
                  className={styles.hasChildren}
                  onMouseEnter={() => {
                    // Hover-open for fine pointers only; never on touch, and never
                    // straight after a navigation with a stationary cursor.
                    if (suppressHoverOpen.current) return;
                    if (window.matchMedia("(pointer: coarse)").matches) return;
                    setOpenMenu(item.href);
                  }}
                  onMouseLeave={() => {
                    suppressHoverOpen.current = false;
                    setOpenMenu((cur) => (cur === item.href ? null : cur));
                  }}
                  onFocus={() => setOpenMenu(item.href)}
                  onBlur={(e) => {
                    // Close only when focus leaves this <li> entirely (not when it
                    // moves between the trigger and its child links).
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setOpenMenu((cur) => (cur === item.href ? null : cur));
                    }
                  }}
                >
                  <Link
                    ref={(el) => {
                      triggerRefs.current[item.href] = el;
                    }}
                    href={item.href}
                    className={`${styles.navLink} ${isActive(pathname, item.href) ? styles.active : ""}`}
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.href}
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                    <IconChevronDown className={styles.navChev} />
                  </Link>
                  <div
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
                            onClick={() => setOpenMenu(null)}
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
