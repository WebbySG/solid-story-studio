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
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dragState = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null);

  useEffect(() => {
    const btn = thumbRefs.current[index];
    if (btn) btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (!el) return;
    dragState.current = { startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    const s = dragState.current;
    if (!el || !s) return;
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 3) s.moved = true;
    el.scrollLeft = s.startScroll - dx;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    setTimeout(() => { dragState.current = null; }, 0);
  };

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
        <div className="absolute right-4 bottom-4 bg-background/70 px-3 py-1.5 text-[10px] tracking-[0.2em] text-foreground backdrop-blur-sm md:right-6 md:bottom-6">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      <div
        ref={stripRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="mt-5 flex cursor-grab gap-3 overflow-x-auto pb-2 select-none active:cursor-grabbing [scrollbar-width:thin]"
      >
        {images.map((src, i) => (
          <button
            key={src}
            ref={(el) => { thumbRefs.current[i] = el; }}
            type="button"
            aria-label={`Show image ${i + 1}`}
            onClick={(e) => {
              if (dragState.current?.moved) { e.preventDefault(); return; }
              setIndex(i);
            }}
            className={`group relative aspect-[4/3] w-32 flex-shrink-0 overflow-hidden border transition sm:w-40 md:w-44 ${i === index ? "border-accent" : "border-border hover:border-accent/60"}`}
          >
            <img
              src={src}
              alt={`${title} — thumbnail ${i + 1}`}
              className="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              draggable={false}
              width={400}
              height={300}
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
          <p className="text-sm tracking-[0.3em] text-accent">
            {project.discipline.toUpperCase()} · {project.category.toUpperCase()}
          </p>
          <h1 className="mt-4 text-5xl font-extralight text-foreground md:text-6xl lg:text-7xl">{project.title}</h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-40 bg-accent md:w-56" />
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
            <p className="text-sm tracking-[0.3em] text-accent">OVERVIEW</p>
            <div className="mt-8 space-y-6 text-base">
              {project.location ? (
                <div>
                  <p className="text-xs tracking-[0.2em] text-muted-foreground">LOCATION</p>
                  <p className="mt-1.5 text-lg font-light text-foreground">{project.location}</p>
                </div>
              ) : null}
              {project.client ? (
                <div>
                  <p className="text-xs tracking-[0.2em] text-muted-foreground">CLIENT</p>
                  <p className="mt-1.5 text-lg font-light text-foreground">{project.client}</p>
                </div>
              ) : null}
              <div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground">DISCIPLINE</p>
                <p className="mt-1.5 text-lg font-light text-foreground">{project.discipline}</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground">CATEGORY</p>
                <p className="mt-1.5 text-lg font-light text-foreground">{project.category}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-8">
            <p className="text-sm tracking-[0.3em] text-accent">DESCRIPTION</p>
            <div className="mt-8 space-y-6 text-lg font-light leading-relaxed text-foreground/90 md:text-xl">
              {project.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {project.facts.map((f) => (
                <div key={f.label}>
                  <p className="text-xs tracking-[0.2em] text-muted-foreground">{f.label.toUpperCase()}</p>
                  <p className="mt-1.5 text-base font-light text-foreground">{f.value}</p>
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
