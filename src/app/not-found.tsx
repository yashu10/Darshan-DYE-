import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { IMAGES } from "@/data/images";
import { ROUTES } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false }
};

/** Exported as 404.html; most static hosts serve it for any address that does not exist. */
export default function NotFound() {
  return (
    <PageHero
      images={[IMAGES.dyeIndigo.src]}
      title="Page not found"
      description="The page you are looking for does not exist or has moved. Try the home page or browse our dyes."
      actions={
        <>
          <Link className="btn btn-amber" href={ROUTES.home}>
            Back to home
          </Link>
          <Link className="btn btn-outline" href={ROUTES.products}>
            View products
          </Link>
        </>
      }
    />
  );
}
