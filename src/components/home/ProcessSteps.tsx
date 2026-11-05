import { SectionHead } from "@/components/ui/SectionHead";
import { PROCESS_STEPS } from "@/data/home";

export function ProcessSteps() {
  return (
    <section>
      <div className="wrap">
        <SectionHead title="From enquiry to delivery" description="A simple process so you always know what happens next." />
        <ol className="steps">
          {PROCESS_STEPS.map((step) => (
            <li key={step.title} className="reveal">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
