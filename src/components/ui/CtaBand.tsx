import Link from "next/link";
import { ROUTES } from "@/data/site";

/** Closing "request a quote" band shown above the footer on most pages. */
export function CtaBand() {
  return (
    <section className="cta">
      <div className="wrap reveal">
        <h2>Need a dye for your process?</h2>
        <p>Share the shade, quantity and destination. We will come back with pricing and sample options.</p>
        <Link className="btn btn-amber" href={ROUTES.contact}>
          Request a quote
        </Link>
      </div>
    </section>
  );
}
