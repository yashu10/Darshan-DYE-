import { ContactCards, LocationMap } from "@/components/contact/ContactDetails";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { IMAGES } from "@/data/images";
import { PAGE_SEO } from "@/data/seo";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs, graph, organization, webPage, website } from "@/lib/schema";

const seo = PAGE_SEO.contact;

export const metadata = pageMetadata({ title: seo.title, description: seo.description, path: seo.path });

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organization(),
          website(),
          webPage({ path: seo.path, name: seo.name, description: seo.description, type: "ContactPage" }),
          breadcrumbs(seo.path, seo.name)
        )}
      />
      <PageHero
        images={[IMAGES.dyeTiedye.src]}
        crumb={seo.name}
        title="Let us talk about your colour requirement"
        description="Send your enquiry and our team will reply with pricing and sample options."
      />
      <section>
        <div className="wrap">
          <div className="contact-grid">
            <ContactCards />
            <EnquiryForm />
          </div>
          <LocationMap />
        </div>
      </section>
    </>
  );
}
