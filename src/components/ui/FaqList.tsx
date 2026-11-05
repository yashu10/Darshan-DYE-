import Link from "next/link";
import type { Faq } from "@/data/faqs";

/** Accordion of questions. Uses native <details>, so it works without JavaScript. */
export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="faq reveal">
      {faqs.map((faq) => (
        <details key={faq.question}>
          <summary>{faq.question}</summary>
          <p>
            {faq.answer.map((part, index) =>
              typeof part === "string" ? (
                part
              ) : (
                <Link key={index} href={part.href}>
                  {part.text}
                </Link>
              )
            )}
          </p>
        </details>
      ))}
    </div>
  );
}
