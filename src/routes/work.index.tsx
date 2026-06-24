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
    <div className="pt-20">
      {/* Editorial header */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-12 lg:pt-24 lg:pb-16">
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-baseline">
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent">
              Portfolio Index
            </span>
            <div className="hidden h-px w-12 bg-accent/40 md:block" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Vol. 01</span>
          </div>

          <div className="relative">
            <h1 className="text-6xl font-extralight leading-[0.9] tracking-tight text-foreground md:text-8xl lg:text-[9rem]">
              Selected<br />
              <span className="ml-[0.1em] md:ml-[0.5em]">Projects</span>
            </h1>

            <div className="mt-10 max-w-sm md:absolute md:bottom-3 md:right-0 md:mt-0">
              <p className="border-l border-accent pl-6 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                A study of form, light, and the enduring nature of materiality. Each project is a quiet dialogue between site and structure.
              </p>
            </div>
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

      {/* Project entries */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:px-12 lg:pt-28 lg:pb-32">
        {filtered.length > 0 ? (
          <div className="space-y-28 lg:space-y-40">
            {filtered.map((project, idx) => {
              const plate = String(idx + 1).padStart(2, "0");
              const total = String(filtered.length).padStart(2, "0");
              return (
                <Reveal key={project.slug}>
                  <Link
                    to="/work/$slug"
                    params={{ slug: project.slug }}
                    className="group block"
                  >
                    <div className="grid grid-cols-12 items-end gap-y-10 md:gap-x-12 lg:gap-x-20">
                      {/* Image */}
                      <div className="col-span-12 lg:col-span-8">
                        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            width={1600}
                            height={1000}
                            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                          />
                          <div className="pointer-events-none absolute bottom-6 left-6 text-xs uppercase tracking-[0.3em] text-background opacity-0 mix-blend-difference transition-opacity duration-500 group-hover:opacity-100">
                            Explore project
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="col-span-12 lg:col-span-4">
                        <div className="flex h-full flex-col justify-between pb-2">
                          <div className="mb-10">
                            <div className="mb-6 flex items-center gap-4">
                              <span className="text-xs font-medium text-accent">{plate}</span>
                              <div className="h-px flex-grow bg-border" />
                              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">/ {total}</span>
                            </div>

                            <h2 className="mb-6 text-4xl font-extralight tracking-tight text-foreground transition-colors group-hover:text-accent md:text-5xl">
                              {project.title}
                            </h2>

                            <div className="space-y-3">
                              <FactRow label="Discipline" value={project.discipline} />
                              <FactRow label="Typology" value={project.category} />
                              {project.location ? <FactRow label="Location" value={project.location} /> : null}
                              {project.year ? <FactRow label="Year" value={project.year} /> : null}
                              {!project.year && project.client ? <FactRow label="Client" value={project.client} /> : null}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all group-hover:border-foreground group-hover:bg-foreground">
                              <svg viewBox="0 0 18 18" className="h-4 w-4 stroke-foreground transition-colors group-hover:stroke-background" fill="none">
                                <path d="M3.75 14.25L14.25 3.75M14.25 3.75H6M14.25 3.75V12" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <span className="-translate-x-2 text-[11px] uppercase tracking-[0.25em] text-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                              View case study
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <Reveal>
            <div className="border-t border-border py-16">
              <p className="text-sm text-muted-foreground">Projects in this category will be added soon.</p>
            </div>
          </Reveal>
        )}

        {/* Quiet growth footer */}
        <div className="mt-28 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 md:flex-row md:items-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Additional works currently in documentation
          </p>
          <p className="text-[10px] uppercase tracking-[0.35em] text-accent">APdS — MMXXVI</p>
        </div>
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
