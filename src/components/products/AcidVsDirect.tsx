import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/data/images";
import { ROUTES } from "@/data/site";

export function AcidVsDirect() {
  return (
    <section className="alt">
      <div className="wrap split">
        <div className="reveal">
          <span className="eyebrow eyebrow--light">Acid vs direct dyes</span>
          <h2>Which dye family fits your material?</h2>
          <p>
            <b>Acid dyes</b> are commonly used on wool, silk, nylon and leather. <b>Direct dyes</b> are commonly used on cotton, other
            cellulosic fibres and paper.
          </p>
          <p>Not sure which to choose? Tell us your material and process and our team will advise.</p>
          <Link className="btn btn-navy" href={ROUTES.tools}>
            Use the dye finder
          </Link>
        </div>
        <div className="photo reveal">
          <Image
            src={IMAGES.labScientist.src}
            alt="Scientist working in a laboratory"
            width={IMAGES.labScientist.width}
            height={IMAGES.labScientist.height}
          />
        </div>
      </div>
    </section>
  );
}
