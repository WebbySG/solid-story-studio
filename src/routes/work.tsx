import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import heroHome from "@/assets/hero-home.jpg";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — APdS Architects" },
      { name: "description", content: "Explore our portfolio of residential, commercial, and institutional architecture projects." },
      { property: "og:title", content: "Work — APdS Architects" },
      { property: "og:description", content: "Explore our portfolio of residential, commercial, and institutional architecture projects." },
    ],
  }),
  component: WorkPage,
});

const projects = [
  { image: project1, title: "The Loft House", category: "Residential", location: "Mumbai", year: "2024" },
  { image: project2, title: "Horizon Tower", category: "Commercial", location: "Pune", year: "2023" },
  { image: project3, title: "Sunset Villa", category: "Residential", location: "Goa", year: "2023" },
  { image: project4, title: "Zen Courtyard", category: "Residential", location: "Bangalore", year: "2022" },
  { image: heroHome, title: "Garden Residence", category: "Residential", location: "Mumbai", year: "2022" },
  { image: project1, title: "Urban Office", category: "Commercial", location: "Delhi", year: "2021" },
];

const categories = ["All", "Residential", "Commercial"];

function WorkPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-20">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <p className="text-xs tracking-[0.3em] text-accent">PORTFOLIO</p>
        <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl">Our Work</h1>

        {/* Filter */}
        <div className="mt-10 flex gap-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs tracking-[0.2em] transition-colors ${filter === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <div key={`${project.title}-${i}`} className="project-card group cursor-pointer">
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
                <p className="mt-1 text-xs text-muted-foreground">{project.location} · {project.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
