import { COMPANY_FACTS } from "@/data/about";

export function CompanyFacts() {
  return (
    <section>
      <div className="wrap split rev">
        <div className="reveal">
          <span className="eyebrow eyebrow--light">Company facts</span>
          <h2>At a glance</h2>
          <p>Registered business details as listed on our IndiaMART profile.</p>
        </div>
        <dl className="facts reveal">
          {COMPANY_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
