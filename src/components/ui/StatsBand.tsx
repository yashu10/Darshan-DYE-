import { STATS } from "@/data/home";

/** Dark band with the four headline numbers. */
export function StatsBand() {
  return (
    <section className="dark">
      <div className="wrap stats">
        {STATS.map((stat) => (
          <div key={stat.label} className="reveal">
            <b>{stat.value}</b>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
