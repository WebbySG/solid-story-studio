import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import desmondImg from "@/assets/team-desmond.jpg";
import sinyongImg from "@/assets/team-sinyong.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — APdS Architects" },
      { name: "description", content: "Meet the architects and designers behind APdS — a collaborative studio led by Desmond and Sin Yong." },
      { property: "og:title", content: "Team — APdS Architects" },
      { property: "og:description", content: "Meet the architects and designers behind APdS — a collaborative studio led by Desmond and Sin Yong." },
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

type Member = { name: string; role: string; image: string; bio?: string };

const principals: Member[] = [
  {
    name: "Desmond",
    role: "Founding Principal",
    image: desmondImg,
    bio: "Desmond leads the practice's design vision, with over two decades of experience shaping residential, commercial, and institutional architecture across Asia.",
  },
  {
    name: "Sin Yong",
    role: "Principal Architect",
    image: sinyongImg,
    bio: "Sin Yong directs project delivery and interior design, bringing a meticulous eye for material, light, and craft to every commission.",
  },
];

const team: Member[] = [
  { name: "Wei Jian", role: "Senior Architect", image: team1 },
  { name: "Mei Lin", role: "Project Architect", image: team2 },
  { name: "Hao Ren", role: "Design Architect", image: team3 },
  { name: "Hui Fang", role: "Interior Designer", image: team4 },
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

      {/* Principals — row 1, large */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12 lg:pb-24">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {principals.map((p) => (
            <Reveal key={p.name}>
              <div className="group">
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    width={1200}
                    height={1500}
                  />
                  <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full border border-accent/20" />
                </div>
                <div className="mt-6">
                  <p className="text-[10px] tracking-[0.3em] text-accent">{p.role.toUpperCase()}</p>
                  <h2 className="mt-2 text-2xl font-extralight text-foreground md:text-3xl">{p.name}</h2>
                  {p.bio && (
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* Team — row 2, smaller grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-accent">THE STUDIO</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {team.map((m) => (
            <Reveal key={m.name}>
              <div className="group">
                <div className="overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={700}
                    height={900}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-light text-foreground">{m.name}</h3>
                  <p className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground">{m.role.toUpperCase()}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
