import { FaqList } from "@/components/ui/FaqList";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Faq } from "@/data/faqs";

interface FaqSectionProps {
  faqs: readonly Faq[];
  description?: string;
  /** Grey background variant. */
  alt?: boolean;
  id?: string;
}

export function FaqSection({ faqs, description, alt, id }: FaqSectionProps) {
  return (
    <section className={alt ? "alt" : undefined} id={id}>
      <div className="wrap">
        <SectionHead title="Frequently asked questions" description={description} />
        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}
