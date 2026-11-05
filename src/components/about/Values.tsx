import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { VALUES } from "@/data/about";

export function Values() {
  return (
    <section className="alt">
      <div className="wrap">
        <SectionHead title="What we stand for" />
        <div className="vals">
          {VALUES.map((value) => (
            <div key={value.title} className="f-card reveal">
              <div className="ico">
                <Icon name={value.icon} />
              </div>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
