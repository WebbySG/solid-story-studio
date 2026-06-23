import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import desmondImg from "@/assets/team-desmond.jpg";
import sinyongImg from "@/assets/team-sinyong.jpg";
import jasonAsset from "@/assets/team-jason.jpg.asset.json";
import jennAsset from "@/assets/team-jenn.jpg.asset.json";
import clarenceAsset from "@/assets/team-clarence.jpg.asset.json";
import mimiAsset from "@/assets/team-mimi.jpg.asset.json";
import priyaAsset from "@/assets/team-priya.jpg.asset.json";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — APdS Architects" },
      { name: "description", content: "Meet the architects and designers behind APdS — a collaborative studio led by Desmond Chen and Ng Sin Yong." },
      { property: "og:title", content: "Team — APdS Architects" },
      { property: "og:description", content: "Meet the architects and designers behind APdS — a collaborative studio led by Desmond Chen and Ng Sin Yong." },
    ],
  }),
  component: TeamPage,
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

type Member = { name: string; role: string; image: string };

const principals: Member[] = [
  { name: "Desmond Chen", role: "Executive Director", image: desmondImg },
  { name: "Ng Sin Yong", role: "Director", image: sinyongImg },
];

const team: Member[] = [
  { name: "Jenn Lim", role: "Senior Architect", image: jennAsset.url },
  { name: "Jason Tan", role: "Associate Director", image: jasonAsset.url },
  { name: "Clarence Goh", role: "Project Architect", image: clarenceAsset.url },
  { name: "Mimi Nguyen", role: "Design Architect", image: mimiAsset.url },
  { name: "Priya Sharma", role: "Architectural Designer", image: priyaAsset.url },
];

function TeamPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <Reveal>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
          <p className="text-xs tracking-[0.3em] text-accent">OUR TEAM</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-extralight leading-snug text-foreground md:text-5xl">
            The people behind<br />
            <span className="text-accent">the practice</span>
          </h1>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            APdS is a collaborative studio of architects, interior designers, and makers. Our work is shaped by a shared commitment to craft, context, and quiet, considered design.
          </p>
        </section>
      </Reveal>

      {/* Unified team container: principals (large) + studio (smaller) */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12 lg:pb-32">
        <div className="border border-border bg-card/30 p-6 md:p-10 lg:p-14">
          {/* Principals row */}
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {principals.map((p) => (
              <Reveal key={p.name}>
                <div className="group">
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="aspect-[4/5] w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                      width={1200}
                      height={1500}
                    />
                  </div>
                  <div className="mt-5">
                    <p className="text-[10px] tracking-[0.3em] text-accent">{p.role.toUpperCase()}</p>
                    <h2 className="mt-2 text-2xl font-extralight text-foreground md:text-3xl">{p.name}</h2>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Divider inside container */}
          <div className="my-12 flex items-center gap-4 md:my-16">
            <div className="h-px flex-1 bg-border" />
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground">THE STUDIO</p>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Studio row */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 md:gap-8">
            {team.map((m) => (
              <Reveal key={m.name}>
                <div className="group">
                  <div className="overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="aspect-[4/5] w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={700}
                      height={900}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-light text-foreground">{m.name}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
