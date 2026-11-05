import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { OTHER_COLOURANTS } from "@/data/products";
import { ROUTES } from "@/data/site";

export function OtherColourants() {
  return (
    <section id="other">
      <div className="wrap">
        <SectionHead title="Other colourants" description="Specialty colourants we also supply. Ask us for details and pricing." />
        <div className="pgrid">
          {OTHER_COLOURANTS.map((product) => (
            <article key={product.name} className="pcard">
              <div className="sw" style={{ background: product.colour }}>
                <span>Other Colourants</span>
              </div>
              <div className="b">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Link href={`${ROUTES.contact}?product=${encodeURIComponent(product.name)}`}>Request price &rarr;</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
