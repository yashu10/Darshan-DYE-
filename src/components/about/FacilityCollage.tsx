import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { SectionHead } from "@/components/ui/SectionHead";
import { LAB_PHOTOS } from "@/data/lab-photos";

export function FacilityCollage() {
  return (
    <section className="alt" id="facility">
      <div className="wrap">
        <SectionHead
          title="Our laboratory & facility"
          description="Take a look inside Darshan Dye-Chem, where shades are developed, matched and checked. Tap any photo to view it larger."
        />
        <PhotoGallery photos={LAB_PHOTOS} layout="collage" />
      </div>
    </section>
  );
}
