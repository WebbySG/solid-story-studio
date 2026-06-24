import { createFileRoute } from "@tanstack/react-router";
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
      { name: "description", content: "Meet the architects and designers behind APdS." },
      { property: "og:title", content: "Team — APdS Architects" },
      { property: "og:description", content: "Meet the architects and designers behind APdS." },
    ],
  }),
  component: TeamPage,
});

type Member = { name: string; image: string };

const principals: Member[] = [
  { name: "Desmond Chen", image: desmondImg },
  { name: "Ng Sin Yong", image: sinyongImg },
];

const team: Member[] = [
  { name: "Jenn Lim", image: jennAsset.url },
  { name: "Jason Tan", image: jasonAsset.url },
  { name: "Clarence Goh", image: clarenceAsset.url },
  { name: "Mimi Nguyen", image: mimiAsset.url },
  { name: "Priya Sharma", image: priyaAsset.url },
];

function Tile({ m, ratio = "aspect-[3/4]" }: { m: Member; ratio?: string }) {
  return (
    <figure className="group relative w-full overflow-hidden">
      <img
        src={m.image}
        alt={m.name}
        loading="lazy"
        className={`w-full ${ratio} object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-transparent opacity-90" />
      <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 md:p-5">
        <h3 className="text-sm font-light tracking-wide text-background md:text-base">{m.name}</h3>
        <span className="h-px w-8 bg-accent" />
      </figcaption>
    </figure>
  );
}

function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col pt-32 lg:pt-40">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-[1800px] items-end justify-between px-6 pb-10 pt-2 lg:px-12 lg:pb-14">
        <h1 className="text-2xl font-extralight tracking-tight text-foreground md:text-3xl">
          Our <span className="text-accent">Team</span>
        </h1>
        <div className="flex items-center gap-3">
          <span className="h-px w-16 bg-accent" />
          <span className="h-1.5 w-1.5 rotate-45 border border-accent" />
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1800px] flex-col gap-8 px-6 pb-20 lg:px-12 lg:gap-10 lg:pb-32">
        {/* Principals: 2 wide */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {principals.map((p) => (
            <Tile key={p.name} m={p} />
          ))}
        </div>
        {/* Studio: 5 wide */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5 lg:gap-8">
          {team.map((m) => (
            <Tile key={m.name} m={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
