import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { architecturalCategories, projectDisciplines, projects, type ProjectCategory, type ProjectDiscipline } from "@/data/projects";

export const Route = createFileRoute("/work")({
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

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <RevealSection>
          <p className="text-xs tracking-[0.3em] text-accent">PORTFOLIO</p>
          <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl">Our Work</h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </RevealSection>

        <RevealSection>
          <div className="mt-12 flex flex-wrap gap-3 border-b border-border pb-6">
            {projectDisciplines.map((item) => (
              <button
                key={item}
                onClick={() => setDiscipline(item)}
                className={`border px-4 py-2 text-xs tracking-[0.2em] transition-colors ${discipline === item ? "border-accent text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </RevealSection>

        {discipline === "Architectural" ? (
          <RevealSection>
            <div className="mt-6 flex flex-wrap gap-8">
              {architecturalCategories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`relative pb-2 text-xs tracking-[0.2em] transition-colors ${category === item ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item.toUpperCase()}
                  {category === item ? <span className="absolute right-0 bottom-0 left-0 h-px bg-accent" /> : null}
                </button>
              ))}
            </div>
          </RevealSection>
        ) : null}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        {filtered.length > 0 ? (
          <div className="grid gap-10 lg:grid-cols-2">
            {filtered.map((project) => (
              <RevealSection key={project.slug}>
                <Link to="/work/$slug" params={{ slug: project.slug }} className="group block">
                  <div className="relative aspect-[16/11] overflow-hidden bg-secondary">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" width={1600} height={1100} />
                  </div>
                  <div className="grid gap-4 border-b border-border py-5 md:grid-cols-[180px_minmax(0,1fr)_24px] md:items-start">
                    <div>
                      <p className="text-[10px] tracking-[0.22em] text-accent">{project.category.toUpperCase()}</p>
                    </div>
                    <div>
                      <h2 className="text-2xl font-extralight text-foreground">{project.title}</h2>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{project.description[0]}</p>
                    </div>
                    <div className="pt-1 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent">→</div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        ) : (
          <RevealSection>
            <div className="border-t border-border py-16">
              <p className="text-sm text-muted-foreground">Projects in this category will be added soon.</p>
            </div>
          </RevealSection>
        )}
      </section>
    </div>
  );
}
