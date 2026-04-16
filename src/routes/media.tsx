import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media — APdS Architects" },
      { name: "description", content: "Latest news, awards, and publications featuring APdS Architects." },
      { property: "og:title", content: "Media — APdS Architects" },
      { property: "og:description", content: "Latest news, awards, and publications featuring APdS Architects." },
    ],
  }),
  component: MediaPage,
});

const mediaItems = [
  { date: "March 2024", title: "APdS Architects Wins Best Residential Design Award 2024", source: "Architectural Digest India", type: "Award" },
  { date: "January 2024", title: "The Loft House Featured in AD100 Best Homes", source: "Architectural Digest", type: "Publication" },
  { date: "November 2023", title: "Sustainability in Modern Indian Architecture — A Conversation with APdS", source: "Design Pataki", type: "Interview" },
  { date: "September 2023", title: "Horizon Tower Shortlisted for IIID Design Excellence Award", source: "IIID", type: "Award" },
  { date: "June 2023", title: "Zen Courtyard: Blending Tradition with Modernity", source: "ELLE Decor India", type: "Publication" },
  { date: "February 2023", title: "APdS Studio Visit — Behind the Design Process", source: "Platform Magazine", type: "Interview" },
];

function MediaPage() {
  return (
    <div className="pt-20">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <p className="text-xs tracking-[0.3em] text-accent">PRESS & MEDIA</p>
        <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl">In the Media</h1>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 lg:px-12">
        <div className="flex flex-col">
          {mediaItems.map((item, i) => (
            <article key={i} className="group cursor-pointer border-t border-border py-8 transition-colors hover:bg-secondary/30">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="text-xs tracking-[0.15em] text-accent">{item.type.toUpperCase()}</span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-light text-foreground">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.source}</p>
                </div>
                <span className="mt-3 text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
