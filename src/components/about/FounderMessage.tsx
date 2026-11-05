import Image from "next/image";
import { FOUNDER_MESSAGE } from "@/data/about";
import { IMAGES } from "@/data/images";
import { SITE } from "@/data/site";

export function FounderMessage() {
  return (
    <section className="fm" id="founder-message">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow eyebrow--light">Founder&apos;s message</span>
          <h2>{FOUNDER_MESSAGE.heading}</h2>
          <div className="body">
            {FOUNDER_MESSAGE.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="sign">
            <b>Sincerely,</b>
            <div className="sig">{SITE.founder.name}</div>
            <small>Mr. {SITE.founder.name}, Founder &amp; Proprietor</small>
          </div>
        </div>
        <div className="fm-photo reveal">
          <Image
            src={IMAGES.founder.src}
            alt={`Mr. ${SITE.founder.name}, Founder and Proprietor of ${SITE.name}`}
            width={IMAGES.founder.width}
            height={IMAGES.founder.height}
          />
          <div className="fm-tag">
            <b>Mr. {SITE.founder.name}</b>
            <span>Founder &amp; Proprietor</span>
          </div>
        </div>
      </div>
    </section>
  );
}
