import type { MetadataRoute } from "next";
import { SHADE_CARD_PDFS } from "@/data/products";
import { PAGE_SEO } from "@/data/seo";
import { ROUTES, SITE, SITE_LAST_MODIFIED } from "@/data/site";

export const dynamic = "force-static";

const PRIORITY: Record<string, number> = {
  [ROUTES.home]: 1,
  [ROUTES.products]: 0.9,
  [ROUTES.about]: 0.8,
  [ROUTES.contact]: 0.8,
  [ROUTES.tools]: 0.7
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE_LAST_MODIFIED);

  const pages = Object.values(PAGE_SEO).map((page) => ({
    url: `${SITE.url}${page.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: PRIORITY[page.path] ?? 0.5
  }));

  const shadeCards = Object.values(SHADE_CARD_PDFS).map((pdf) => ({
    url: `${SITE.url}${pdf.url}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6
  }));

  return [...pages, ...shadeCards];
}
