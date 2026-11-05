"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brand } from "@/components/ui/Brand";
import { NAV_LINKS, ROUTES } from "@/data/site";

const isActive = (pathname: string, href: string): boolean =>
  href === ROUTES.home ? pathname === ROUTES.home : pathname.startsWith(href);

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site">
      <div className="wrap nav">
        <Brand ariaLabel="Darshan Dye-Chem home" />
        <nav aria-label="Primary">
          <ul id="menu" className={menuOpen ? "open" : undefined}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="btn btn-amber" href={ROUTES.contact}>
          Get a Quote
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={menuOpen}
          aria-controls="menu"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
