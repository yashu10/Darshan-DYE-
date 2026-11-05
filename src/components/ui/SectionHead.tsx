import type { ReactNode } from "react";

interface SectionHeadProps {
  title: ReactNode;
  description?: ReactNode;
}

/** Centered section heading with the amber accent bar. */
export function SectionHead({ title, description }: SectionHeadProps) {
  return (
    <div className="sec-head reveal">
      <span className="bar" />
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
