"use client";

import { useEffect, useRef, useState } from "react";

const SLIDE_INTERVAL_MS = 5000;

/**
 * Background slideshow of the home hero. The first image is part of the server-rendered HTML;
 * the others are attached after the page has loaded so they never compete with the first paint.
 * Does nothing (shows the first image only) when the visitor prefers reduced motion.
 */
export function HeroSlideshow({ images }: { images: readonly string[] }) {
  const [active, setActive] = useState(0);
  const slides = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const attachImages = () =>
      slides.current.forEach((slide, index) => {
        if (slide && index > 0) slide.style.backgroundImage = `url(${images[index]})`;
      });
    if (document.readyState === "complete") attachImages();
    else window.addEventListener("load", attachImages, { once: true });

    let timer: number | undefined;
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), SLIDE_INTERVAL_MS);
    };
    const onVisibilityChange = () => (document.hidden ? window.clearInterval(timer) : start());

    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    return () => {
      window.removeEventListener("load", attachImages);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.clearInterval(timer);
    };
  }, [images]);

  return (
    <div className="hero-slides" aria-hidden="true">
      {images.map((src, index) => (
        <div
          key={src}
          ref={(element) => {
            slides.current[index] = element;
          }}
          className={index === active ? "hs on" : "hs"}
          style={index === 0 ? { backgroundImage: `url(${src})` } : undefined}
        />
      ))}
    </div>
  );
}
