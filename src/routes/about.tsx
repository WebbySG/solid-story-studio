import { createFileRoute } from "@tanstack/react-router";
import aboutTeam from "@/assets/about-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — APdS Architects" },
      { name: "description", content: "Learn about our design philosophy, team, and approach to contemporary architecture." },
      { property: "og:title", content: "About — APdS Architects" },
      { property: "og:description", content: "Learn about our design philosophy, team, and approach to contemporary architecture." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { title: "Design Excellence", description: "Every project is an opportunity to push boundaries and create architecture that is both beautiful and functional." },
  { title: "Collaborative Approach", description: "We work closely with clients, consultants, and craftspeople to bring shared visions to life." },
  { title: "Contextual Sensitivity", description: "Our designs respond to site, climate, and culture — creating buildings that belong to their place." },
  { title: "Sustainable Practice", description: "We integrate environmental responsibility into every aspect of our design process." },
];

function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <p className="text-xs tracking-[0.3em] text-accent">ABOUT US</p>
        <h1 className="mt-4 max-w-2xl text-3xl font-extralight leading-snug text-foreground md:text-5xl">
          Architecture shaped by people and place
        </h1>
      </section>

      {/* Image + text */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden">
            <img src={aboutTeam} alt="APdS Architects team" className="w-full object-cover" loading="lazy" width={1200} height={800} />
          </div>
          <div>
            <h2 className="text-2xl font-extralight text-foreground md:text-3xl">Our Practice</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              APdS Architects is a design-driven architectural practice combining creativity and collaborative teamwork to deliver contemporary solutions. Founded on the belief that great architecture emerges from a deep understanding of context, our studio brings together diverse expertise to create spaces that are meaningful, sustainable, and enduring.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Our portfolio spans residential, commercial, and institutional projects. Each is approached with the same commitment to design excellence and attention to detail that defines our practice.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <p className="text-xs tracking-[0.3em] text-accent">OUR VALUES</p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="border-t border-border pt-6">
              <h3 className="text-lg font-light text-foreground">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 text-center md:grid-cols-4">
          {[
            { number: "15+", label: "Years Experience" },
            { number: "120+", label: "Projects Completed" },
            { number: "25+", label: "Awards Won" },
            { number: "18", label: "Team Members" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extralight text-accent">{stat.number}</p>
              <p className="mt-2 text-xs tracking-[0.15em] text-primary-foreground/50">{stat.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
