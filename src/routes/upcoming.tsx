import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/upcoming")({
  head: () => ({
    meta: [
      { title: "Upcoming — APdS Architects" },
      { name: "description", content: "Upcoming projects from APdS Architects, currently in design or construction." },
      { property: "og:title", content: "Upcoming — APdS Architects" },
      { property: "og:description", content: "Upcoming projects from APdS Architects, currently in design or construction." },
    ],
  }),
  component: UpcomingPage,
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

// Upcoming projects — populate as project images are received.
type UpcomingProject = {
  title?: string;
  category?: string;
  image: string;
};

const upcoming: UpcomingProject[] = [];

function UpcomingPage() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-accent">IN PROGRESS</p>
          <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl">
            Upcoming <span className="text-accent">Projects</span>
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12 lg:pb-32">
        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((p, i) => (
              <Reveal key={i}>
                <figure className="group overflow-hidden bg-secondary">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title ?? `Upcoming project ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  {(p.title || p.category) && (
                    <figcaption className="border-t border-border bg-background px-5 py-4">
                      {p.category ? (
                        <p className="text-[10px] tracking-[0.25em] text-accent">{p.category.toUpperCase()}</p>
                      ) : null}
                      {p.title ? (
                        <h2 className="mt-1.5 text-lg font-light text-foreground">{p.title}</h2>
                      ) : null}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="border-t border-border py-20 text-center">
              <p className="text-sm text-muted-foreground">
                New projects in design and construction will be published here soon.
              </p>
            </div>
          </Reveal>
        )}
      </section>
    </div>
  );
}
