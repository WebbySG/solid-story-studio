import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { getProject, projects, type Project } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const project = getProject(params.slug);
    const title = project ? `${project.title} — APdS Architects` : "Project — APdS Architects";
    const description = project
      ? `${project.title}. ${project.description[0]?.slice(0, 150)}`
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
          onClick={() => {
            router.invalidate();
            reset();
          }}
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

function Carousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const go = (n: number) => setIndex((n + total) % total);

  return (
    <div className="w-full">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary md:aspect-[16/8]">
        <img
          src={images[index]}
          alt={`${title} — featured view ${index + 1}`}
          className="h-full w-full object-cover transition-opacity duration-500"
          loading="eager"
          width={2200}
          height={1400}
        />

        <button
          aria-label="Previous image"
          onClick={() => go(index - 1)}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-background/70 px-4 py-3 text-xs tracking-[0.2em] text-foreground backdrop-blur-sm transition hover:bg-background md:left-8"
        >
          ←
        </button>
        <button
          aria-label="Next image"
          onClick={() => go(index + 1)}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-background/70 px-4 py-3 text-xs tracking-[0.2em] text-foreground backdrop-blur-sm transition hover:bg-background md:right-8"
        >
          →
        </button>

        <div className="absolute right-4 bottom-4 bg-background/70 px-3 py-1.5 text-[10px] tracking-[0.2em] text-foreground backdrop-blur-sm md:right-6 md:bottom-6">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Show image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`group relative aspect-[4/3] overflow-hidden border transition ${i === index ? "border-accent" : "border-border hover:border-accent/60"}`}
          >
            <img
              src={src}
              alt={`${title} — thumbnail ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              width={600}
              height={450}
            />
            <span className={`absolute inset-0 transition ${i === index ? "bg-foreground/10" : "bg-foreground/0 group-hover:bg-foreground/10"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? projects[(idx - 1 + projects.length) % projects.length] : null;
  const next = idx >= 0 && projects.length > 1 ? projects[(idx + 1) % projects.length] : null;
  const carouselImages = [project.image, ...project.gallery.filter((g) => g !== project.image)];

  return (
    <div className="pt-20">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-8 lg:px-12 lg:pt-12">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-accent">
            {project.discipline.toUpperCase()} · {project.category.toUpperCase()}
          </p>
          <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl lg:text-6xl">{project.title}</h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <Carousel images={carouselImages} title={project.title} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="text-xs tracking-[0.3em] text-accent">OVERVIEW</p>
            <div className="mt-8 space-y-5 text-sm">
              {project.location ? (
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground">LOCATION</p>
                  <p className="mt-1 font-light text-foreground">{project.location}</p>
                </div>
              ) : null}
              {project.client ? (
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground">CLIENT</p>
                  <p className="mt-1 font-light text-foreground">{project.client}</p>
                </div>
              ) : null}
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground">DISCIPLINE</p>
                <p className="mt-1 font-light text-foreground">{project.discipline}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground">CATEGORY</p>
                <p className="mt-1 font-light text-foreground">{project.category}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-8">
            <p className="text-xs tracking-[0.3em] text-accent">DESCRIPTION</p>
            <div className="mt-8 space-y-6 text-base font-light leading-relaxed text-foreground/90 md:text-lg">
              {project.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
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

      {prev && next ? (
        <section className="border-t border-border">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 lg:px-12">
            <Link to="/work/$slug" params={{ slug: prev.slug }} className="group flex flex-col items-start gap-2 py-10 pr-6">
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-accent">← PREVIOUS</span>
              <span className="text-base font-light text-foreground md:text-xl">{prev.title}</span>
            </Link>
            <Link to="/work/$slug" params={{ slug: next.slug }} className="group flex flex-col items-end gap-2 border-l border-border py-10 pl-6 text-right">
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-accent">NEXT →</span>
              <span className="text-base font-light text-foreground md:text-xl">{next.title}</span>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <Link to="/work" className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
          <span className="h-px w-8 bg-current" />
          BACK TO ALL WORK
        </Link>
      </section>
    </div>
  );
}
