import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APdS Architects — Contemporary Architectural Solutions" },
      { name: "description", content: "A design-driven practice focused on architecture and interiors with a contemporary, site-responsive approach." },
      { property: "og:title", content: "APdS Architects — Contemporary Architectural Solutions" },
      { property: "og:description", content: "A design-driven practice focused on architecture and interiors with a contemporary, site-responsive approach." },
    ],
  }),
  component: HomePage,
});

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("revealed");
        observer.unobserve(el);
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

function HomePage() {
  const featuredProject = projects[0];

  return (
    <div>
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={featuredProject.image}
          alt={featuredProject.title}
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 h-px w-12 bg-copper-light/60" />
          <h1 className="animate-fade-in-up text-4xl font-extralight tracking-[0.12em] text-off-white md:text-6xl lg:text-7xl">
            APdS Architects
          </h1>
          <p className="animate-fade-in-up animation-delay-200 mt-6 max-w-2xl text-sm font-light leading-relaxed tracking-wider text-off-white/80">
            Architectural and interior design practice shaping calm, contemporary spaces with clarity, light, and a strong connection to site.
          </p>
          <Link
            to="/work/$slug"
            params={{ slug: featuredProject.slug }}
            className="animate-fade-in-up animation-delay-400 group mt-10 flex items-center gap-3 border border-off-white/40 px-8 py-3 text-xs tracking-[0.25em] text-off-white transition-all hover:border-off-white hover:bg-off-white/10"
          >
            VIEW PROJECT
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      <RevealSection>
        <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <p className="text-xs tracking-[0.3em] text-accent">OUR PHILOSOPHY</p>
          <h2 className="mt-6 text-2xl font-extralight leading-relaxed text-foreground md:text-3xl">
            We create spaces that respond to context, welcome natural light, and bring architecture closer to everyday living.
          </h2>
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-border" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
            <div className="h-px w-8 bg-border" />
          </div>
        </section>
      </RevealSection>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <RevealSection>
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="text-xs tracking-[0.3em] text-accent">SELECTED</p>
              <h2 className="mt-2 text-2xl font-extralight text-foreground md:text-3xl">Featured Work</h2>
            </div>
            <Link to="/work" className="group flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
              VIEW ALL <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </RevealSection>

        <RevealSection>
          <Link to="/work/$slug" params={{ slug: featuredProject.slug }} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
              <img src={featuredProject.image} alt={featuredProject.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" width={1800} height={1100} />
            </div>
            <div className="grid gap-4 border-b border-border py-5 md:grid-cols-[180px_minmax(0,1fr)_24px] md:items-start">
              <div>
                <p className="text-[10px] tracking-[0.22em] text-accent">{featuredProject.category.toUpperCase()}</p>
              </div>
              <div>
                <h3 className="text-2xl font-extralight text-foreground">{featuredProject.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{featuredProject.description[0]}</p>
              </div>
              <div className="pt-1 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent">→</div>
            </div>
          </Link>
        </RevealSection>
      </section>

      <RevealSection>
        <section className="border-y border-border py-16">
          <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-4 lg:px-12">
            {[
              { num: "01", label: "Context", desc: "Reading the site and its constraints" },
              { num: "02", label: "Light", desc: "Shaping openness, shade, and views" },
              { num: "03", label: "Material", desc: "Refining detail and atmosphere" },
              { num: "04", label: "Living", desc: "Designing for everyday experience" },
            ].map((step, i) => (
              <div key={step.num} className={`group px-6 py-6 transition-colors hover:bg-secondary/50 ${i < 3 ? "md:border-r md:border-border" : ""}`}>
                <span className="text-xs text-accent">{step.num}</span>
                <h3 className="mt-3 text-lg font-light text-foreground">{step.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute top-0 left-0 ml-[15%] h-full w-px bg-copper/20" />
        <div className="absolute top-0 right-0 mr-[15%] h-full w-px bg-copper/20" />
        <RevealSection>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="mx-auto mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-primary-foreground/20" />
              <div className="h-1.5 w-1.5 rotate-45 border border-copper" />
              <div className="h-px w-8 bg-primary-foreground/20" />
            </div>
            <h2 className="text-2xl font-extralight tracking-wide text-primary-foreground md:text-3xl">Let’s Discuss Your Project</h2>
            <p className="mt-4 text-sm font-light text-primary-foreground/60">Architecture, interiors, and thoughtful spaces designed with clarity and purpose.</p>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-3 border border-primary-foreground/30 px-8 py-3 text-xs tracking-[0.25em] text-primary-foreground transition-all hover:border-primary-foreground hover:bg-primary-foreground/10"
            >
              CONTACT US
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
