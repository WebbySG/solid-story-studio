import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { mediaPosts } from "@/data/media";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media — APdS Architects" },
      { name: "description", content: "Press, project features, and studio updates from APdS Architects." },
      { property: "og:title", content: "Media — APdS Architects" },
      { property: "og:description", content: "Press, project features, and studio updates from APdS Architects." },
    ],
  }),
  component: MediaPage,
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

function MediaPage() {
  return (
    <div className="pt-20">
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
          <p className="text-xs tracking-[0.3em] text-accent">PRESS & MEDIA</p>
          <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl">In the Media</h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </section>
      </RevealSection>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <div className="border-t border-border">
          {mediaPosts.map((item) => (
            <RevealSection key={item.slug}>
              <Link
                to="/media/$slug"
                params={{ slug: item.slug }}
                className="group grid items-start gap-6 border-b border-border py-8 md:grid-cols-[180px_minmax(0,1fr)_32px] md:gap-10"
              >
                <div className="pt-1">
                  <p className="text-[10px] tracking-[0.22em] text-accent">{item.eyebrow.toUpperCase()}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-extralight leading-tight text-foreground transition-colors group-hover:text-accent md:text-[2rem]">
                    {item.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  <p className="mt-4 text-xs tracking-[0.18em] text-muted-foreground">{item.source.toUpperCase()}</p>
                </div>
                <div className="pt-1 text-right text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent">→</div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>
    </div>
  );
}
