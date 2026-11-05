"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Writes how far the element has been scrolled through (0-100) into its `--p` CSS variable,
 * which the timeline uses to draw its coloured line while you scroll.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const update = () => {
      const { top, height } = element.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - top) / height));
      element.style.setProperty("--p", (progress * 100).toFixed(1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);
}
