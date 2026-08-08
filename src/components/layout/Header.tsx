"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Egipskie Wakacje - strona główna">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Menu główne">
          <ul className={styles.navList}>
            {primaryNav.map((item) =>
              item.children ? (
                <li key={item.href} className={styles.hasChildren}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive(pathname, item.href) ? styles.active : ""}`}
                  >
                    {item.label}
                    <IconChevronDown className={styles.navChev} />
                  </Link>
                  <div className={styles.dropdown}>
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`${styles.dropLink} ${
                              pathname === child.href ? styles.active : ""
                            }`}
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
