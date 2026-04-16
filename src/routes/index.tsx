import { createFileRoute, Link } from "@tanstack/react-router";
import heroHome from "@/assets/hero-home.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APdS Architects — Contemporary Architectural Solutions" },
      { name: "description", content: "A design-driven architectural practice combining creativity and collaborative teamwork to deliver contemporary solutions." },
      { property: "og:title", content: "APdS Architects — Contemporary Architectural Solutions" },
      { property: "og:description", content: "A design-driven architectural practice combining creativity and collaborative teamwork to deliver contemporary solutions." },
    ],
  }),
  component: HomePage,
});

const featuredProjects = [
  { image: project1, title: "The Loft House", category: "Residential", id: "1" },
  { image: project2, title: "Horizon Tower", category: "Commercial", id: "2" },
  { image: project3, title: "Sunset Villa", category: "Residential", id: "3" },
  { image: project4, title: "Zen Courtyard", category: "Residential", id: "4" },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={heroHome}
          alt="Modern contemporary architecture by APdS Architects"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="animate-fade-in-up text-4xl font-extralight tracking-[0.15em] text-off-white md:text-6xl lg:text-7xl">
            Design with Purpose
          </h1>
          <p className="animate-fade-in-up animation-delay-200 mt-6 max-w-xl text-sm font-light leading-relaxed tracking-wider text-off-white/80">
            A design-driven architectural practice combining creativity & collaborative teamwork to deliver contemporary solutions
          </p>
          <Link
            to="/work"
            className="animate-fade-in-up animation-delay-400 mt-10 border border-off-white/40 px-8 py-3 text-xs tracking-[0.25em] text-off-white transition-all hover:border-off-white hover:bg-off-white/10"
          >
            VIEW PROJECTS
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
        <p className="text-xs tracking-[0.3em] text-accent">OUR PHILOSOPHY</p>
        <h2 className="mt-6 text-2xl font-extralight leading-relaxed text-foreground md:text-3xl">
          We believe in architecture that responds to its context, embraces natural light, and creates spaces that inspire the people who inhabit them.
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-accent" />
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-accent">SELECTED</p>
            <h2 className="mt-2 text-2xl font-extralight text-foreground md:text-3xl">Featured Work</h2>
          </div>
          <Link to="/work" className="text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
            VIEW ALL →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <div key={project.id} className="project-card group cursor-pointer overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/20" />
              </div>
              <div className="py-4">
                <p className="text-xs tracking-[0.2em] text-accent">{project.category.toUpperCase()}</p>
                <h3 className="mt-1 text-lg font-light text-foreground">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-extralight tracking-wide text-primary-foreground md:text-3xl">
            Let's Create Something Remarkable
          </h2>
          <p className="mt-4 text-sm font-light text-primary-foreground/60">
            Have a project in mind? We'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block border border-primary-foreground/30 px-8 py-3 text-xs tracking-[0.25em] text-primary-foreground transition-all hover:border-primary-foreground hover:bg-primary-foreground/10"
          >
            GET IN TOUCH
          </Link>
        </div>
      </section>
    </div>
  );
}
