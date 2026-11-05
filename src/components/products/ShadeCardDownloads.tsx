import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import { SHADE_CARD_PDFS } from "@/data/products";

export function ShadeCardDownloads() {
  return (
    <section className="sc" id="shadecards">
      <div className="wrap">
        <SectionHead
          title="Download our shade cards"
          description="Get the complete Darshan Dye-Chem shade cards as PDF files. View them offline or share them with your team."
        />
        <div className="dl-grid">
          {Object.values(SHADE_CARD_PDFS).map((pdf) => (
            <article key={pdf.family} className="dl reveal">
              <Image src={pdf.cover} alt={pdf.coverAlt} width={1189} height={1683} />
              <div className="dl-b">
                <h3>{pdf.title}</h3>
                <p>{pdf.summary}</p>
                <span className="dl-meta">
                  PDF &middot; {pdf.pages} pages &middot; {pdf.sizeLabel}
                </span>
                <div className="dl-act">
                  <a className="btn btn-amber" href={pdf.url} download>
                    Download PDF
                  </a>
                  <a className="btn btn-navy" href={pdf.url} target="_blank" rel="noopener">
                    View online
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="sc-note note--download">
          Colours are scanned from our printed shade cards and may differ slightly on your screen. Request the physical card or a
          sample to confirm a shade.
        </p>
      </div>
    </section>
  );
}
