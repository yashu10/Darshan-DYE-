import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { WHY_BUYERS } from "@/data/home";

export function WhyBuyers() {
  return (
    <section>
      <div className="wrap">
        <SectionHead
          title="Why buyers choose us"
          description="A manufacturer you can talk to directly, with consistent shades and dependable supply."
        />
        <div className="features">
          {WHY_BUYERS.map((item) => (
            <div key={item.title} className="f-card reveal">
              <div className="ico">
                <Icon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
