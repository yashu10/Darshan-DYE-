import type { Metadata } from "next";
import { OG_IMAGE, SITE } from "@/data/site";

interface PageMetadataOptions {
  /** Page title without the brand; the layout template appends " | Darshan Dye-Chem". */
  title?: string;
  /** Full title for pages that should not get the template (the home page). */
  absoluteTitle?: string;
  description: string;
  /** Route path with trailing slash, e.g. "/about/". Used for the canonical URL and og:url. */
  path: string;
}

/**
 * Builds the complete <head> metadata of a page: title, description, canonical URL,
 * Open Graph and Twitter cards. Open Graph is not merged with the layout defaults by Next,
 * so every field is set here.
 */
export function pageMetadata({ title, absoluteTitle, description, path }: PageMetadataOptions): Metadata {
  const shareTitle = absoluteTitle ?? `${title} | ${SITE.name}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE.name,
      locale: SITE.locale,
      title: shareTitle,
      description,
      images: [{ url: OG_IMAGE.path, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }]
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [OG_IMAGE.path]
    }
  };
}
