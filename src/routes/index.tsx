import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/data/projects";
import apdsLogoHero from "@/assets/2026-latest-apds-logo-light.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APdS Architects — Contemporary Architectural Solutions" },
      { name: "description", content: "A design-driven practice focused on architecture and interiors with a contemporary, site-responsive approach." },
      { property: "og:title", content: "APdS Architects — Contemporary Architectural Solutions" },
      { property: "og:description", content: "A design-driven practice focused on architecture and interiors with a contemporary, site-responsive approach." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featuredProject = projects[0];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={featuredProject.image}
        alt={featuredProject.title}
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 h-px w-12 bg-copper-light/60" />
        <img
          src={apdsLogoHero.url}
          alt="APdS Architects"
          className="animate-fade-in-up h-auto w-full max-w-sm md:max-w-md lg:max-w-lg"
        />
        <p className="animate-fade-in-up animation-delay-200 mt-6 max-w-2xl text-sm font-light leading-relaxed tracking-wider text-off-white/80">
          Architectural and interior design practice shaping calm, contemporary spaces with clarity, light, and a strong connection to site.
        </p>
        <Link
          to="/work/$slug"
          params={{ slug: featuredProject.slug }}
          className="animate-fade-in-up animation-delay-400 group mt-10 flex items-center gap-3 border border-off-white/40 px-8 py-3 text-xs tracking-[0.25em] text-off-white transition-all hover:border-off-white hover:bg-off-white/10"
        >
          VIEW PROJECT
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
