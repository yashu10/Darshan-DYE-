import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/data/images";
import { ROUTES } from "@/data/site";

export function WhoWeAre() {
  return (
    <section className="alt">
      <div className="wrap split">
        <div className="photo reveal">
          <Image
            src={IMAGES.powderBowls.src}
            alt="Bowls of red, magenta and violet dye powder"
            width={IMAGES.powderBowls.width}
            height={IMAGES.powderBowls.height}
          />
          <span className="tag">Vibrant, reliable colour</span>
        </div>
        <div className="reveal">
          <span className="eyebrow eyebrow--light">Who we are</span>
          <h2>Making colour for industry since our GST registration in 2017</h2>
          <p>
            Darshan Dye-Chem is a proprietor-led manufacturer, wholesaler and retailer of dyes based in Ahmedabad, Gujarat, one of
            India&apos;s leading textile and chemical hubs.
          </p>
          <ul className="ticks">
            <li>Acid dyes, direct dyes and specialty colourants</li>
            <li>Wholesale and bulk supply</li>
            <li>Trusted on IndiaMART for 11 years</li>
          </ul>
          <Link className="btn btn-navy" href={ROUTES.about}>
            About our company
          </Link>
        </div>
      </div>
    </section>
  );
}
