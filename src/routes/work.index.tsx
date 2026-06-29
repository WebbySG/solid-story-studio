import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { architecturalCategories, projectDisciplines, projects, type ProjectCategory, type ProjectDiscipline } from "@/data/projects";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — APdS Architects" },
      { name: "description", content: "Explore selected APdS Architects projects across architectural and interior design categories." },
      { property: "og:title", content: "Work — APdS Architects" },
      { property: "og:description", content: "Explore selected APdS Architects projects across architectural and interior design categories." },
    ],
  }),
  component: WorkPage,
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

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

function WorkPage() {
  const [discipline, setDiscipline] = useState<ProjectDiscipline>("Architectural");
  const [category, setCategory] = useState<ProjectCategory>("Residential");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (project.discipline !== discipline) return false;
      if (discipline === "Architectural") return project.category === category;
      return true;
    });
  }, [discipline, category]);

  return (
    <div className="pt-32">
      {/* Editorial header */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-12 lg:pt-24 lg:pb-16">
        <Reveal>
          <h1 className="text-4xl font-extralight tracking-tight text-foreground md:text-5xl">
            Our <span className="text-accent">Work</span>
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </Reveal>
      </section>


      {/* Filters */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <div className="mt-12 flex flex-wrap gap-3 border-b border-border pb-6">
            {projectDisciplines.map((item) => (
              <button
                key={item}
                onClick={() => setDiscipline(item)}
                className={`border px-4 py-2 text-xs tracking-[0.2em] transition-colors ${
                  discipline === item ? "border-accent text-foreground" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </Reveal>

        {discipline === "Architectural" ? (
          <Reveal>
            <div className="mt-6 flex flex-wrap gap-8">
              {architecturalCategories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`relative pb-2 text-xs tracking-[0.2em] transition-colors ${
                    category === item ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.toUpperCase()}
                  {category === item ? <span className="absolute right-0 bottom-0 left-0 h-px bg-accent" /> : null}
                </button>
              ))}
            </div>
          </Reveal>
        ) : null}
      </section>

      {/* Project grid */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:px-12 lg:pt-32 lg:pb-32">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filtered.map((project) => (
              <Reveal key={project.slug}>
                <Link
                  to="/work/$slug"
                  params={{ slug: project.slug }}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h2 className="text-2xl font-extralight tracking-tight text-white md:text-3xl">
                        {project.title}
                      </h2>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="h-px w-8 bg-accent" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-white/80">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="border-t border-border py-16">
              <p className="text-sm text-muted-foreground">Projects in this category will be added soon.</p>
            </div>
          </Reveal>
        )}
      </section>
    </div>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-2">
      <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <span className="text-right text-xs font-light text-foreground">{value}</span>
    </div>
  );
}
