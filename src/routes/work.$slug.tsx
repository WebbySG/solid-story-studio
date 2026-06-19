import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const project = getProject(params.slug);
    const title = project ? `${project.title} — APdS Architects` : "Project — APdS Architects";
    const description = project
      ? `${project.title}, ${project.location} (${project.year}). ${project.description[0]?.slice(0, 140)}`
      : "Project details by APdS Architects.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(project ? [{ property: "og:image", content: project.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  notFoundComponent: () => (
    <div className="pt-32 text-center">
      <p className="text-xs tracking-[0.3em] text-accent">404</p>
      <h1 className="mt-4 text-3xl font-extralight">Project not found</h1>
      <Link to="/work" className="mt-6 inline-block text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground">
        ← BACK TO WORK
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="pt-32 text-center">
        <h1 className="text-3xl font-extralight">Something went wrong</h1>
        <button
          className="mt-6 text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground"
          onClick={() => { router.invalidate(); reset(); }}
        >
          RETRY
        </button>
      </div>
    );
  },
  component: ProjectPage,
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

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          width={2400}
          height={1600}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-16 lg:px-12 lg:pb-24">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-off-white/80">
              {project.category.toUpperCase()} · {project.location.toUpperCase()} · {project.year}
            </p>
            <h1 className="mt-4 text-4xl font-extralight text-off-white md:text-6xl lg:text-7xl">
              {project.title}
            </h1>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-16 bg-accent" />
              <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="text-xs tracking-[0.3em] text-accent">OVERVIEW</p>
            <div className="mt-8 space-y-5 text-sm">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground">CLIENT</p>
                <p className="mt-1 font-light text-foreground">{project.client}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground">LOCATION</p>
                <p className="mt-1 font-light text-foreground">{project.location}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground">AREA</p>
                <p className="mt-1 font-light text-foreground">{project.area}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground">YEAR</p>
                <p className="mt-1 font-light text-foreground">{project.year}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground">STATUS</p>
                <p className="mt-1 font-light text-foreground">{project.status}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-8">
            <div className="space-y-6 text-base font-light leading-relaxed text-foreground/90 md:text-lg">
              {project.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {project.facts.map((f) => (
                <div key={f.label}>
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground">{f.label.toUpperCase()}</p>
                  <p className="mt-1 text-sm font-light text-foreground">{f.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <div className="grid gap-6 md:grid-cols-12">
          {project.gallery.map((src, i) => {
            // Asymmetric: full / half / half / full pattern
            const span =
              i % 4 === 0 ? "md:col-span-12 aspect-[21/9]"
              : i % 4 === 3 ? "md:col-span-12 aspect-[21/9]"
              : "md:col-span-6 aspect-[4/3]";
            return (
              <Reveal key={i} className={span}>
                <div className="h-full w-full overflow-hidden">
                  <img
                    src={src}
                    alt={`${project.title} — view ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    width={2400}
                    height={1600}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Prev / Next */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 lg:px-12">
          <Link
            to="/work/$slug"
            params={{ slug: prev.slug }}
            className="group flex flex-col items-start gap-2 py-10 pr-6"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-accent">
              ← PREVIOUS
            </span>
            <span className="text-base font-light text-foreground md:text-xl">{prev.title}</span>
          </Link>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group flex flex-col items-end gap-2 border-l border-border py-10 pl-6 text-right"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-accent">
              NEXT →
            </span>
            <span className="text-base font-light text-foreground md:text-xl">{next.title}</span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <Link
          to="/work"
          className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="h-px w-8 bg-current" />
          BACK TO ALL WORK
        </Link>
      </section>
    </div>
  );
}
