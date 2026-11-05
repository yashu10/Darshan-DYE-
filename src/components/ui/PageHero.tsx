import Link from "next/link";
import type { ReactNode } from "react";
import { ROUTES } from "@/data/site";
import { HeroSlideshow } from "./HeroSlideshow";

interface PageHeroProps {
  /** One image, or several for the auto-scrolling slideshow (home page). */
  images: readonly string[];
  title: string;
  description: string;
  /** Inner pages show "Home / <crumb>"; the home page shows an eyebrow line instead. */
  crumb?: string;
  eyebrow?: string;
  /** Call-to-action buttons. */
  actions?: ReactNode;
  /** Large hero (home page) when false. */
  compact?: boolean;
}

export function PageHero({ images, title, description, crumb, eyebrow, actions, compact = true }: PageHeroProps) {
  const [first] = images;
  return (
    <section className={compact ? "hero sm" : "hero"} style={{ backgroundImage: `url(${first})` }}>
      {images.length > 1 ? <HeroSlideshow images={images} /> : null}
      <div className="wrap">
        {crumb ? (
          <div className="crumbs">
            <Link href={ROUTES.home}>Home</Link> / {crumb}
          </div>
        ) : null}
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        <p>{description}</p>
        {actions ? <div className="row">{actions}</div> : null}
      </div>
    </section>
  );
}
