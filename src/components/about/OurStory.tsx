import Image from "next/image";
import { IMAGES } from "@/data/images";

export function OurStory() {
  return (
    <section>
      <div className="wrap split rev">
        <div className="photo reveal">
          <Image src={IMAGES.dyeTiedye.src} alt="Vividly dyed fabric in many colours" width={IMAGES.dyeTiedye.width} height={IMAGES.dyeTiedye.height} />
          <span className="tag">Ahmedabad, Gujarat</span>
        </div>
        <div className="reveal">
          <span className="eyebrow eyebrow--light">Our story</span>
          <h2>Colour you can count on</h2>
          <p>
            Darshan Dye-Chem is a manufacturer, wholesaler and retailer of dyes based in Ahmedabad, Gujarat, one of India&apos;s
            leading textile and chemical hubs.
          </p>
          <p>
            Led by Girish Patel, we supply acid dyes, direct dyes and specialty colourants and have served buyers through IndiaMART
            for over a decade.
          </p>
          <ul className="ticks">
            <li>Manufacturer with wholesale and retail supply</li>
            <li>GST registered since 2017</li>
            <li>Direct communication with the owner&apos;s team</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
