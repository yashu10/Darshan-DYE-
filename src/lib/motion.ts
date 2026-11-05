/** True when the visitor asked their system for less animation. Only call in the browser (effects, handlers). */
export const prefersReducedMotion = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
