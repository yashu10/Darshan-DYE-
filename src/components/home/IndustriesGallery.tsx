import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import { INDUSTRY_PHOTOS } from "@/data/home";

export function IndustriesGallery() {
  return (
    <section className="alt">
      <div className="wrap">
        <SectionHead
          title="Industries we serve"
          description="Acid and direct dyes are widely used in these sectors. Confirm suitability for your substrate with our team."
        />
        <div className="gallery">
          {INDUSTRY_PHOTOS.map((photo) => (
            <figure key={photo.image.src} className={photo.shape ? `${photo.shape} reveal` : "reveal"}>
              <Image src={photo.image.src} alt={photo.alt} width={photo.image.width} height={photo.image.height} />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
