import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities — APdS Architects" },
      { name: "description", content: "Join APdS Architects. Submit your portfolio and CV for internship or full-time opportunities." },
      { property: "og:title", content: "Opportunities — APdS Architects" },
      { property: "og:description", content: "Join APdS Architects. Submit your portfolio and CV for internship or full-time opportunities." },
    ],
  }),
  component: OpportunitiesPage,
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

function OpportunitiesPage() {
  return (
    <div className="pt-32">
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-12 lg:py-24">
          <p className="text-xs tracking-[0.3em] text-accent">OPPORTUNITIES</p>
          <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl">Join the Studio</h1>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </section>
      </RevealSection>


      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12 lg:pb-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-[10px] tracking-[0.22em] text-muted-foreground">CAREERS</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-12 bg-accent" />
                <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
              </div>
            </div>
            <div className="space-y-6 text-base font-light leading-relaxed text-foreground/90 md:col-span-8 md:text-xl">
              <p>
                We are always on the lookout for talented, creative, and driven individuals to join our team.
              </p>
              <p>
                Interested applicants may submit their portfolio and CV to{" "}
                <a href="mailto:apds@apdsarchitects.com" className="text-foreground underline underline-offset-4 transition-colors hover:text-accent">
                  apds@apdsarchitects.com
                </a>{" "}
                for internship or full-time opportunities.
              </p>
            </div>
          </div>
        </section>
      </RevealSection>
    </div>
  );
}
