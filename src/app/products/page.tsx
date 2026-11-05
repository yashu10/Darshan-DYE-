import Link from "next/link";
import { AcidVsDirect } from "@/components/products/AcidVsDirect";
import { OtherColourants } from "@/components/products/OtherColourants";
import { ShadeCardDownloads } from "@/components/products/ShadeCardDownloads";
import { ShadeExplorer } from "@/components/products/ShadeExplorer";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { IMAGES } from "@/data/images";
import { PAGE_SEO } from "@/data/seo";
import { ROUTES } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs, dyeCatalog, graph, organization, shadeCardDatasets, webPage, website } from "@/lib/schema";

const seo = PAGE_SEO.products;

export const metadata = pageMetadata({ title: seo.title, description: seo.description, path: seo.path });

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organization(),
          website(),
          webPage({ path: seo.path, name: seo.name, description: seo.description, type: "CollectionPage" }),
          breadcrumbs(seo.path, seo.name),
          dyeCatalog(),
          ...shadeCardDatasets()
        )}
      />
      <PageHero
        images={[IMAGES.powders.src]}
        crumb={seo.name}
        title="Dyes and colourants for every process"
        description="Browse our core dye families. Shades, strengths and packing can be matched to your requirement."
        actions={
          <>
            <Link className="btn btn-amber" href={ROUTES.contact}>
              Request full price list
            </Link>
            <a className="btn btn-outline" href="#explorer">
              Explore shades
            </a>
          </>
        }
      />
      <ShadeExplorer />
      <OtherColourants />
      <ShadeCardDownloads />
      <AcidVsDirect />
      <CtaBand />
    </>
  );
}
