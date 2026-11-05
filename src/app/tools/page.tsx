import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { DyeCalculator } from "@/components/tools/DyeCalculator";
import { DyeFinder } from "@/components/tools/DyeFinder";
import { IMAGES } from "@/data/images";
import { PAGE_SEO } from "@/data/seo";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs, graph, organization, toolApplications, webPage, website } from "@/lib/schema";

const seo = PAGE_SEO.tools;

export const metadata = pageMetadata({ title: seo.title, description: seo.description, path: seo.path });

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organization(),
          website(),
          webPage({ path: seo.path, name: seo.name, description: seo.description }),
          breadcrumbs(seo.path, seo.name),
          ...toolApplications()
        )}
      />
      <PageHero
        images={[IMAGES.labPipette.src]}
        crumb={seo.name}
        title="Plan your dyeing in under a minute"
        description="Estimate how much dye your batch needs and find which dye family suits your material. Free to use."
      />
      <section>
        <div className="wrap tools">
          <div className="tool reveal">
            <h2>Dye calculator</h2>
            <p className="sub">
              Quantity = material weight x shade % / 100. Values are indicative; actual use depends on dye strength and process.
            </p>
            <DyeCalculator />
          </div>
          <div className="tool reveal">
            <h2>Dye finder</h2>
            <p className="sub">Pick your material to see which dye family is commonly used.</p>
            <DyeFinder />
            <p className="sub sub--tail">
              General guidance only. Final choice depends on your process and fastness needs, and our team is happy to advise.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
