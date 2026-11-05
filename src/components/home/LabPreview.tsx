import Link from "next/link";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { SectionHead } from "@/components/ui/SectionHead";
import { HOME_LAB_PHOTO_INDEXES, LAB_PHOTOS } from "@/data/lab-photos";
import { ROUTES } from "@/data/site";

const PREVIEW_PHOTOS = HOME_LAB_PHOTO_INDEXES.flatMap((position) => LAB_PHOTOS[position] ?? []);

export function LabPreview() {
  return (
    <section id="lab">
      <div className="wrap">
        <SectionHead title="Inside our laboratory" description="A look at the laboratory where we test and match shades." />
        <PhotoGallery photos={PREVIEW_PHOTOS} layout="grid" />
        <p className="reveal action-row">
          <Link className="btn btn-navy" href={`${ROUTES.about}#facility`}>
            View all {LAB_PHOTOS.length} photos
          </Link>
        </p>
      </div>
    </section>
  );
}
