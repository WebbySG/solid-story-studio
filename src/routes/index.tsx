import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import heroHome from "@/assets/hero-home.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APdS Architects — Contemporary Architectural Solutions" },
      { name: "description", content: "A design-driven architectural practice combining creativity and collaborative teamwork to deliver contemporary solutions." },
      { property: "og:title", content: "APdS Architects — Contemporary Architectural Solutions" },
      { property: "og:description", content: "A design-driven architectural practice combining creativity and collaborative teamwork to deliver contemporary solutions." },
    ],
  }),
  component: HomePage,
});

const featuredProjects = [
  { image: project1, title: "The Loft House", category: "Residential", id: "1", size: "large" },
  { image: project2, title: "Horizon Tower", category: "Commercial", id: "2", size: "small" },
  { image: project3, title: "Sunset Villa", category: "Residential", id: "3", size: "small" },
  { image: project4, title: "Zen Courtyard", category: "Residential", id: "4", size: "large" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal-on-scroll ${className}`}>
      {children}
    </div>
  );
}

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={heroHome}
          alt="Modern contemporary architecture by APdS Architects"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 h-px w-12 bg-copper-light/60" />
          <h1 className="animate-fade-in-up text-4xl font-extralight tracking-[0.15em] text-off-white md:text-6xl lg:text-7xl">
            Design with Purpose
          </h1>
          <p className="animate-fade-in-up animation-delay-200 mt-6 max-w-xl text-sm font-light leading-relaxed tracking-wider text-off-white/80">
            A design-driven architectural practice combining creativity & collaborative teamwork to deliver contemporary solutions
          </p>
          <Link
            to="/work"
            className="animate-fade-in-up animation-delay-400 group mt-10 flex items-center gap-3 border border-off-white/40 px-8 py-3 text-xs tracking-[0.25em] text-off-white transition-all hover:border-off-white hover:bg-off-white/10"
          >
            VIEW PROJECTS
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-off-white/40">SCROLL</span>
          <div className="h-8 w-px animate-pulse bg-off-white/30" />
        </div>
      </section>

      {/* Intro */}
      <RevealSection>
        <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <p className="text-xs tracking-[0.3em] text-accent">OUR PHILOSOPHY</p>
          <h2 className="mt-6 text-2xl font-extralight leading-relaxed text-foreground md:text-3xl">
            We believe in architecture that responds to its context, embraces natural light, and creates spaces that inspire the people who inhabit them.
          </h2>
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-border" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
            <div className="h-px w-8 bg-border" />
          </div>
        </section>
      </RevealSection>

      {/* Featured Projects — Asymmetric Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <RevealSection>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] text-accent">SELECTED</p>
              <h2 className="mt-2 text-2xl font-extralight text-foreground md:text-3xl">Featured Work</h2>
            </div>
            <Link to="/work" className="group flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
              VIEW ALL <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </RevealSection>
        <div className="grid gap-6 md:grid-cols-12">
          {featuredProjects.map((project, i) => (
            <RevealSection
              key={project.id}
              className={project.size === "large" ? "md:col-span-7" : "md:col-span-5"}
            >
              <div className="project-card group cursor-pointer overflow-hidden">
                <div className={`relative overflow-hidden ${project.size === "large" ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={1200}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/30" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-6 transition-transform duration-500 group-hover:translate-y-0">
                    <span className="text-xs tracking-[0.2em] text-off-white/80">{project.category.toUpperCase()}</span>
                    <h3 className="mt-1 text-lg font-light text-off-white">{project.title}</h3>
                  </div>
                </div>
                <div className="py-4 md:hidden">
                  <p className="text-xs tracking-[0.2em] text-accent">{project.category.toUpperCase()}</p>
                  <h3 className="mt-1 text-lg font-light text-foreground">{project.title}</h3>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Process strip */}
      <RevealSection>
        <section className="border-y border-border py-16">
          <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-4 lg:px-12">
            {[
              { num: "01", label: "Discover", desc: "Understanding context & vision" },
              { num: "02", label: "Design", desc: "Shaping space & experience" },
              { num: "03", label: "Develop", desc: "Refining detail & materiality" },
              { num: "04", label: "Deliver", desc: "Realising built excellence" },
            ].map((step, i) => (
              <div key={step.num} className={`group py-6 px-6 transition-colors hover:bg-secondary/50 ${i < 3 ? "md:border-r md:border-border" : ""}`}>
                <span className="text-xs text-accent">{step.num}</span>
                <h3 className="mt-3 text-lg font-light text-foreground">{step.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* CTA */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-px bg-copper/20 ml-[15%]" />
        <div className="absolute top-0 right-0 h-full w-px bg-copper/20 mr-[15%]" />
        <RevealSection>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="mx-auto mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-primary-foreground/20" />
              <div className="h-1.5 w-1.5 rotate-45 border border-copper" />
              <div className="h-px w-8 bg-primary-foreground/20" />
            </div>
            <h2 className="text-2xl font-extralight tracking-wide text-primary-foreground md:text-3xl">
              Let's Create Something Remarkable
            </h2>
            <p className="mt-4 text-sm font-light text-primary-foreground/60">
              Have a project in mind? We'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-3 border border-primary-foreground/30 px-8 py-3 text-xs tracking-[0.25em] text-primary-foreground transition-all hover:border-primary-foreground hover:bg-primary-foreground/10"
            >
              GET IN TOUCH
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
