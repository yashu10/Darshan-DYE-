import Image from "next/image";
import Link from "next/link";
import { SHADE_CARD_PDFS } from "@/data/products";
import { ROUTES } from "@/data/site";
import { shadeCount } from "@/lib/dyes";

const FASTNESS_RATINGS = 4;

export function ShadeCardsTeaser() {
  const { acid, direct } = SHADE_CARD_PDFS;
  return (
    <section className="dark sh-home" id="shades">
      <div className="wrap">
        <div className="sh-text reveal">
          <span className="eyebrow">Shade cards</span>
          <h2>See every shade before you order</h2>
          <p>
            Browse our Acid and Direct dye shade cards online. Each dye is shown at 0.5% and 2.0% depth with its C.I. name and
            fastness ratings.
          </p>
          <ul className="sh-facts">
            <li>
              <b>{shadeCount("acid")}</b>
              <span>Acid shades</span>
            </li>
            <li>
              <b>{shadeCount("direct")}</b>
              <span>Direct shades</span>
            </li>
            <li>
              <b>{FASTNESS_RATINGS}</b>
              <span>Fastness ratings</span>
            </li>
          </ul>
          <div className="sh-act">
            <Link className="btn btn-amber" href={`${ROUTES.products}#explorer`}>
              Explore all shades
            </Link>
            <a className="btn btn-outline" href={acid.url} download>
              Acid card PDF
            </a>
            <a className="btn btn-outline" href={direct.url} download>
              Direct card PDF
            </a>
          </div>
        </div>
        <div className="sh-covers reveal" aria-label="Shade card covers">
          {[
            { pdf: acid, className: "sh-c1" },
            { pdf: direct, className: "sh-c2" }
          ].map(({ pdf, className }) => (
            <a key={pdf.family} href={pdf.url} target="_blank" rel="noopener" className={className}>
              <Image src={pdf.cover} alt={pdf.coverAlt} width={1189} height={1683} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
