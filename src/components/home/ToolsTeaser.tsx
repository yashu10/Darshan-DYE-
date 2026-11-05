import Link from "next/link";
import { ROUTES } from "@/data/site";

const SAMPLE_CALCULATION = [
  ["Material", "100 kg"],
  ["Shade depth", "2 %"],
  ["Liquor ratio", "1 : 10"],
  ["Dye required", "2 kg"]
] as const;

export function ToolsTeaser() {
  return (
    <section className="alt">
      <div className="wrap">
        <div className="teaser reveal">
          <div>
            <span className="eyebrow">New &middot; Free tools</span>
            <h2>How much dye does your batch need?</h2>
            <p>
              Use our dye calculator to estimate dye quantity, water and cost for your batch, and our dye finder to see which dye
              family suits your material.
            </p>
            <Link className="btn btn-amber" href={ROUTES.tools}>
              Try the dye tools
            </Link>
          </div>
          <div className="mini" aria-hidden="true">
            {SAMPLE_CALCULATION.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
