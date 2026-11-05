"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Counts the element's text up from 0 to `target` the first time it becomes visible.
 * The server-rendered text is already the final number, so crawlers and no-JS visitors see it.
 */
export function useCountUp(ref: RefObject<HTMLElement | null>, target: number, durationMs = 1600) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    let frame = 0;
    element.textContent = "0";

    const observer = new IntersectionObserver(
      (entries, self) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        self.disconnect();
        const startedAt = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - startedAt) / durationMs);
          element.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.textContent = String(target);
    };
  }, [ref, target, durationMs]);
}
