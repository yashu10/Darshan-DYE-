"use client";

import { useRef } from "react";
import { TIMELINE, YEARS_IN_BUSINESS } from "@/data/about";
import { useCountUp } from "@/hooks/use-count-up";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

/** "25 years" milestone timeline. The coloured line fills as you scroll and the number counts up. */
export function Timeline() {
  const lineRef = useRef<HTMLOListElement>(null);
  const yearsRef = useRef<HTMLElement>(null);
  useScrollProgress(lineRef);
  useCountUp(yearsRef, YEARS_IN_BUSINESS);

  return (
    <section className="tl" id="milestones">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="tl-big">
            <b ref={yearsRef}>{YEARS_IN_BUSINESS}</b>
            <span>Years</span>
          </div>
          <h2>Our milestone journey</h2>
          <p>A quarter of a century of making colour, one batch and one customer at a time.</p>
        </div>
        <ol className="line" ref={lineRef}>
          {TIMELINE.map((milestone) => (
            <li key={milestone.year} className="reveal">
              <div className="tl-card">
                <span className="yr">{milestone.year}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
