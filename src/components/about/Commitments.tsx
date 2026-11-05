import { COMMITMENTS } from "@/data/about";

export function Commitments() {
  return (
    <section className="alt">
      <div className="wrap">
        <div className="commit reveal">
          {COMMITMENTS.map((item) => (
            <div key={item.title}>
              <b>{item.title}</b>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
