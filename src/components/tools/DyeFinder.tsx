"use client";

import Link from "next/link";
import { useState } from "react";
import { MATERIAL_ADVICE, MATERIAL_OPTIONS } from "@/data/tools";
import { ROUTES } from "@/data/site";

const productLink = (name: string) => `${ROUTES.contact}?product=${encodeURIComponent(name)}`;

/** Tells which dye family is commonly used for the chosen material, with products to ask about. */
export function DyeFinder() {
  const [material, setMaterial] = useState("");
  const advice = MATERIAL_ADVICE[material];

  return (
    <>
      <form className="form-plain" noValidate onSubmit={(event) => event.preventDefault()}>
        <div className="fld">
          <label htmlFor="mat">What are you dyeing?</label>
          <select id="mat" name="mat" value={material} onChange={(event) => setMaterial(event.target.value)}>
            <option value="">Select a material</option>
            {MATERIAL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div id="matchOut" className={advice && !advice.supported ? "match no" : "match"} hidden={!advice} aria-live="polite">
        {advice?.supported ? (
          <>
            <h3>{advice.family}</h3>
            <p>{advice.reason}</p>
            <div className="tags">
              {advice.suggestions.map((name) => (
                <Link key={name} href={productLink(name)}>
                  {name}
                </Link>
              ))}
            </div>
            <Link className="btn btn-amber" href={productLink(advice.suggestions[0] ?? "")}>
              Request price
            </Link>
          </>
        ) : null}
        {advice && !advice.supported ? (
          <>
            <h3>Not our range</h3>
            <p>{advice.reason} Ask us anyway — we may be able to help or point you in the right direction.</p>
            <Link className="btn btn-navy" href={ROUTES.contact}>
              Ask our team
            </Link>
          </>
        ) : null}
      </div>
    </>
  );
}
