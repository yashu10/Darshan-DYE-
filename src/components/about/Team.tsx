import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { TEAM } from "@/data/about";

export function Team() {
  return (
    <section>
      <div className="wrap">
        <SectionHead title="Meet the team" description="The people behind every order, from the first enquiry to the final dispatch." />
        <div className="team">
          {TEAM.map((member) => (
            <article key={member.name} className="member reveal">
              <div className="av" aria-hidden="true">
                {member.initials ?? (member.icon ? <Icon name={member.icon} /> : null)}
              </div>
              <div className="mb">
                <h3>{member.name}</h3>
                <span className="role">{member.role}</span>
                <p>{member.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
