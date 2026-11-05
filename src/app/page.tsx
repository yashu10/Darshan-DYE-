import Link from "next/link";
import { preload } from "react-dom";
import { IndustriesGallery } from "@/components/home/IndustriesGallery";
import { LabPreview } from "@/components/home/LabPreview";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ProductRange } from "@/components/home/ProductRange";
import { ShadeCardsTeaser } from "@/components/home/ShadeCardsTeaser";
import { ToolsTeaser } from "@/components/home/ToolsTeaser";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { WhyBuyers } from "@/components/home/WhyBuyers";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqSection } from "@/components/ui/FaqSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { StatsBand } from "@/components/ui/StatsBand";
import { HOME_FAQS } from "@/data/faqs";
import { HERO_IMAGES } from "@/data/home";
import { PAGE_SEO } from "@/data/seo";
import { ROUTES } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { faqPage, graph, organization, webPage, website } from "@/lib/schema";

const seo = PAGE_SEO.home;

export const metadata = pageMetadata({ absoluteTitle: seo.absoluteTitle, description: seo.description, path: seo.path });

export default function HomePage() {
  // The first hero image is the largest thing on screen: start fetching it as early as possible.
  preload(HERO_IMAGES[0], { as: "image", fetchPriority: "high" });

  return (
    <>
      <JsonLd
        data={graph(
          organization(),
          website(),
          webPage({ path: seo.path, name: seo.absoluteTitle, description: seo.description, breadcrumb: false }),
          faqPage(seo.path, HOME_FAQS)
        )}
      />
      <PageHero
        images={HERO_IMAGES}
        compact={false}
        eyebrow="Manufacturer & Exporter · Ahmedabad, India"
        title="Your trusted partner in industrial dyes & colourants"
        description="Darshan Dye-Chem manufactures acid dyes, direct dyes and specialty colourants for textile, leather, paper and industrial buyers across India and overseas."
        actions={
          <>
            <Link className="btn btn-amber" href={ROUTES.contact}>
              Get a Quote
            </Link>
            <Link className="btn btn-outline" href={ROUTES.products}>
              View Products
            </Link>
          </>
        }
      />
      <WhyBuyers />
      <WhoWeAre />
      <ProductRange />
      <ToolsTeaser />
      <StatsBand />
      <ProcessSteps />
      <IndustriesGallery />
      <ShadeCardsTeaser />
      <LabPreview />
      <FaqSection id="faq" alt faqs={HOME_FAQS} description="Quick answers to what buyers ask us most." />
      <CtaBand />
    </>
  );
}
