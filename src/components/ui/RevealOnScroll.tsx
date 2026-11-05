"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades in every `.reveal` element the first time it scrolls into view.
 * The markup stays server-rendered; this only adds the `in` class. Elements are hidden
 * by CSS only while JavaScript runs (`.js .reveal`), so crawlers and no-JS visitors see everything.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
