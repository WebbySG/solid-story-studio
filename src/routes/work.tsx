import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — APdS Architects" },
      { name: "description", content: "Explore our portfolio of residential, commercial, and institutional architecture projects." },
      { property: "og:title", content: "Work — APdS Architects" },
      { property: "og:description", content: "Explore our portfolio of residential, commercial, and institutional architecture projects." },
    ],
  }),
  component: WorkPage,
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

const categories = ["All", "Residential", "Commercial"];

function WorkPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-20">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <RevealSection>
          <p className="text-xs tracking-[0.3em] text-accent">PORTFOLIO</p>
          <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl">Our Work</h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </RevealSection>

        {/* Filter */}
        <div className="mt-10 flex gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative text-xs tracking-[0.2em] transition-colors pb-2 ${filter === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {cat.toUpperCase()}
              {filter === cat && <span className="absolute bottom-0 left-0 right-0 h-px bg-accent" />}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <RevealSection key={`${project.title}-${i}`}>
              <div className="project-card group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={1200}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/30" />
                  {/* Hover overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0">
                    <span className="text-[10px] tracking-[0.2em] text-off-white/70">{project.location} · {project.year}</span>
                  </div>
                </div>
                <div className="flex items-start justify-between py-4">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-accent">{project.category.toUpperCase()}</p>
                    <h3 className="mt-1 text-lg font-light text-foreground">{project.title}</h3>
                  </div>
                  <span className="mt-2 text-muted-foreground/0 transition-colors group-hover:text-muted-foreground">→</span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>
    </div>
  );
}
