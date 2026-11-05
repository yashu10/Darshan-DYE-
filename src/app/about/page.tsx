import { Commitments } from "@/components/about/Commitments";
import { CompanyFacts } from "@/components/about/CompanyFacts";
import { FacilityCollage } from "@/components/about/FacilityCollage";
import { FounderMessage } from "@/components/about/FounderMessage";
import { OurStory } from "@/components/about/OurStory";
import { Team } from "@/components/about/Team";
import { Timeline } from "@/components/about/Timeline";
import { Values } from "@/components/about/Values";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqSection } from "@/components/ui/FaqSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { StatsBand } from "@/components/ui/StatsBand";
import { ABOUT_FAQS } from "@/data/faqs";
import { IMAGES } from "@/data/images";
import { PAGE_SEO } from "@/data/seo";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs, faqPage, founder, graph, organization, webPage, website } from "@/lib/schema";

const seo = PAGE_SEO.about;

export const metadata = pageMetadata({ title: seo.title, description: seo.description, path: seo.path });

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organization(),
          website(),
          webPage({ path: seo.path, name: seo.name, description: seo.description, type: "AboutPage" }),
          breadcrumbs(seo.path, seo.name),
          founder(),
          faqPage(seo.path, ABOUT_FAQS)
        )}
      />
      <PageHero
        images={[IMAGES.dyeIndigo.src]}
        crumb={seo.name}
        title="A dye manufacturer rooted in Ahmedabad"
        description="Proprietor-led, factory-direct and focused on dependable supply for industrial colour buyers."
      />
      <FounderMessage />
      <OurStory />
      <Values />
      <CompanyFacts />
      <FacilityCollage />
      <Timeline />
      <Team />
      <Commitments />
      <FaqSection faqs={ABOUT_FAQS} />
      <StatsBand />
      <CtaBand />
    </>
  );
}
