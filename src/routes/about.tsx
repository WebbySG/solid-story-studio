import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
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

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); observer.unobserve(el); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

const values = [
  { title: "Design Excellence", description: "Every project is an opportunity to push boundaries and create architecture that is both beautiful and functional.", icon: "◇" },
  { title: "Collaborative Approach", description: "We work closely with clients, consultants, and craftspeople to bring shared visions to life.", icon: "○" },
  { title: "Contextual Sensitivity", description: "Our designs respond to site, climate, and culture — creating buildings that belong to their place.", icon: "△" },
  { title: "Sustainable Practice", description: "We integrate environmental responsibility into every aspect of our design process.", icon: "□" },
];

function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
          <p className="text-xs tracking-[0.3em] text-accent">ABOUT US</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-extralight leading-snug text-foreground md:text-5xl">
            Architecture shaped by<br />
            <span className="text-accent">people</span> and <span className="text-accent">place</span>
          </h1>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </section>
      </RevealSection>

      {/* Image + text — asymmetric */}
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="overflow-hidden lg:col-span-7">
              <div className="relative">
                <img src={aboutTeam} alt="APdS Architects team" className="w-full object-cover" loading="lazy" width={1200} height={800} />
                <div className="absolute -bottom-3 -right-3 h-full w-full border border-accent/20 -z-10" />
              </div>
            </div>
            <div className="lg:col-span-5 lg:pl-4">
              <span className="text-xs tracking-[0.3em] text-accent">EST. 2009</span>
              <h2 className="mt-4 text-2xl font-extralight text-foreground md:text-3xl">Our Practice</h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                APdS Architects is a design-driven architectural practice combining creativity and collaborative teamwork to deliver contemporary solutions. Founded on the belief that great architecture emerges from a deep understanding of context, our studio brings together diverse expertise to create spaces that are meaningful, sustainable, and enduring.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Our portfolio spans residential, commercial, and institutional projects. Each is approached with the same commitment to design excellence and attention to detail that defines our practice.
              </p>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <RevealSection>
          <p className="text-xs tracking-[0.3em] text-accent">OUR VALUES</p>
        </RevealSection>
        <div className="mt-10 grid gap-0 md:grid-cols-2">
          {values.map((value, i) => (
            <RevealSection key={value.title}>
              <div className={`group border-t border-border p-8 transition-colors hover:bg-secondary/40 ${i % 2 === 0 ? "md:border-r md:border-border" : ""}`}>
                <span className="text-lg text-accent">{value.icon}</span>
                <h3 className="mt-4 text-lg font-light text-foreground">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Design Philosophy */}
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-xs tracking-[0.3em] text-accent">01 — PHILOSOPHY</p>
              <h2 className="mt-4 text-2xl font-extralight text-foreground md:text-3xl">
                Design <span className="text-accent">Philosophy</span>
              </h2>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-12 bg-accent" />
                <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
              </div>
            </div>
            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:col-span-8 md:text-base">
              <p>
                APdS is a design-oriented practice. The firm emphasises design creativity and innovation. Our design philosophy focuses on creating strong and clear architectural forms and spaces that are appropriate and contemporary — using available technology and everyday operational problems to arrive at elegant solutions.
              </p>
              <p>
                The firm adopts a team approach towards project work, providing continuity in design and enhancing the co-ordination and collaboration of all parties involved. Each member is an integral part of the team, and client involvement is actively encouraged for the effective development of each project.
              </p>
              <p>
                Ultimately, through personalised attention from key personnel, the use of the latest technologies, and the teamwork of a diverse group of talented individuals, APdS Architects is ready to take on the challenges of designing for the most discerning clients.
              </p>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* Scope of Work */}
      <RevealSection>
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-xs tracking-[0.3em] text-accent">02 — SCOPE OF WORK</p>
                <h2 className="mt-4 text-2xl font-extralight text-foreground md:text-3xl">
                  What we <span className="text-accent">offer</span>
                </h2>
                <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Full architectural services — from initial concept through to authorities' submission and on-site supervision.
                </p>
              </div>
              <div className="md:col-span-8">
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  Our services include master planning, high-rise commercial, multi-residential, hospitality, institutional, mixed-use, interior, private residential, and landscape design. Full architectural services are offered — including master planning, concept and detail design, documentation, approval, supervision and authorities submission — in addition to full interior, landscape, and project management.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                  {[
                    "Master Planning",
                    "High-Rise Commercial",
                    "Multi-Residential",
                    "Hospitality",
                    "Institutional",
                    "Mixed-Use",
                    "Interior Design",
                    "Private Residential",
                    "Landscape Design",
                    "Concept & Detail Design",
                    "Authorities Submission",
                    "Project Management",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 border-t border-border/60 py-3">
                      <span className="text-accent">—</span>
                      <span className="text-xs tracking-[0.05em] text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>



      {/* Stats */}
      <RevealSection>
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute top-0 left-[20%] h-full w-px bg-copper/15" />
          <div className="absolute top-0 left-[40%] h-full w-px bg-copper/15" />
          <div className="absolute top-0 left-[60%] h-full w-px bg-copper/15" />
          <div className="absolute top-0 left-[80%] h-full w-px bg-copper/15" />
          <div className="mx-auto grid max-w-5xl gap-10 px-6 text-center md:grid-cols-4">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "120+", label: "Projects Completed" },
              { number: "25+", label: "Awards Won" },
              { number: "18", label: "Team Members" },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <p className="text-4xl font-extralight text-accent transition-transform group-hover:scale-110">{stat.number}</p>
                <p className="mt-3 text-xs tracking-[0.15em] text-primary-foreground/50">{stat.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>
    </div>
  );
}
