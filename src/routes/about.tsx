import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import aboutTeam from "@/assets/about-team.jpg";
import desmondImg from "@/assets/team-desmond.jpg";
import sinyongImg from "@/assets/team-sinyong.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — APdS Architects" },
      { name: "description", content: "Learn about our design philosophy, team, and approach to contemporary architecture." },
      { property: "og:title", content: "About — APdS Architects" },
      { property: "og:description", content: "Learn about our design philosophy, team, and approach to contemporary architecture." },
    ],
  }),
  component: AboutPage,
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

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

type Leader = {
  name: string;
  title: string;
  credentials: string;
  image: string;
  background: string[];
  academic: string[];
  experience: { year: string; role: string }[];
};

const leaders: Leader[] = [
  {
    name: "Desmond Chen",
    title: "Executive Director",
    credentials: "B.Arch · B.Sc Architectural Engineering · MSIA · Registered Architect, Singapore",
    image: desmondImg,
    background: [
      "Ar. Desmond Chen graduated with a Bachelor of Architecture from the School of Architecture, University of Kansas, USA in 1993. In 1992, he also obtained a Bachelor of Science in Architectural Engineering, concentrating in illumination and power distribution systems. He is a registered architect in Singapore and a Corporate Member of the Singapore Institute of Architects (MSIA), and has been practicing architecture for over 30 years in Singapore.",
      "He has extensive and relevant local and overseas experience in design, authority submissions, and execution of projects. His key experience ranges from master planning of townships to the micro-detailing of architectural features. This vast experience has helped shape outstanding designs for some of Singapore's most notable buildings.",
    ],
    academic: [
      "University of Kansas, USA",
      "Bachelor of Science in Architectural Engineering",
      "Bachelor of Architecture",
    ],
    experience: [
      { year: "1993 – 1998", role: "Architects 61 Pte Ltd, Singapore" },
      { year: "1998 – 2000", role: "SCDA Architects Pte Ltd, Singapore" },
      { year: "2005", role: "Founded APdS Architects, Singapore" },
      { year: "2011", role: "Joined AVID Architects Pte Ltd as Executive Director" },
      { year: "2015", role: "Executive Director, LT&T AVID Architects Pte Ltd" },
      { year: "2005 – present", role: "APdS Architects, Singapore" },
    ],
  },
  {
    name: "Ng Sin Yong",
    title: "Director",
    credentials: "B.Arch (Hons) · MSIA · Registered Architect, Singapore",
    image: sinyongImg,
    background: [
      "Ar. Ng Sin Yong graduated with a Bachelor of Architecture from the School of Architecture and Built Environment, Deakin University, Australia in 2007. He is a registered architect in Singapore and a Corporate Member of the Singapore Institute of Architects (MSIA) since 2014, with 13 years of architectural practice in Singapore.",
      "A BCA Young Leaders Programme (YLP) participant, he specialises in multi-unit residential developments with a proven track record from project inception through sales launch and construction — designing more than 20 developments across condominiums, HDBs, and mixed-use projects totalling over 6,000 units. Selected condominium projects include Ki Residences @ Brookvale, the award-winning Cube 8 (Singapore Good Design Mark 2014), and Sky Everton.",
      "Experienced in DfMA and PPVC methodologies, with direct involvement in multiple PPVC projects, he brings a forward-thinking approach to high-rise residential design by integrating prefabrication technologies to enhance efficiency, buildability, and design innovation.",
    ],
    academic: [
      "Deakin University, Australia",
      "Bachelor of Arts (Architecture)",
      "Bachelor of Architecture (Hons)",
    ],
    experience: [
      { year: "2008 – 2026", role: "ADDP Architects LLP, Singapore" },
      { year: "2026 – present", role: "APdS Architects, Singapore" },
    ],
  },
];

const values = [
  { title: "Design Excellence", description: "Every project is an opportunity to push boundaries and create architecture that is both beautiful and functional.", icon: "◇" },
  { title: "Collaborative Approach", description: "We work closely with clients, consultants, and craftspeople to bring shared visions to life.", icon: "○" },
  { title: "Contextual Sensitivity", description: "Our designs respond to site, climate, and culture — creating buildings that belong to their place.", icon: "△" },
  { title: "Sustainable Practice", description: "We integrate environmental responsibility into every aspect of our design process.", icon: "□" },
];

function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
          <p className="text-xs tracking-[0.3em] text-accent">ABOUT US</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-extralight leading-snug text-foreground md:text-5xl">
            Architecture shaped by<br />
            <span className="text-accent">people</span> and <span className="text-accent">place</span>
          </h1>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </section>
      </RevealSection>

      {/* Image + text — asymmetric */}
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="overflow-hidden lg:col-span-7">
              <div className="relative">
                <img src={aboutTeam} alt="APdS Architects team" className="w-full object-cover" loading="lazy" width={1200} height={800} />
                <div className="absolute -bottom-3 -right-3 h-full w-full border border-accent/20 -z-10" />
              </div>
            </div>
            <div className="lg:col-span-5 lg:pl-4">
              <span className="text-xs tracking-[0.3em] text-accent">EST. 2009</span>
              <h2 className="mt-4 text-2xl font-extralight text-foreground md:text-3xl">Our Practice</h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                APdS Architects is a design-driven architectural practice combining creativity and collaborative teamwork to deliver contemporary solutions. Founded on the belief that great architecture emerges from a deep understanding of context, our studio brings together diverse expertise to create spaces that are meaningful, sustainable, and enduring.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Our portfolio spans residential, commercial, and institutional projects. Each is approached with the same commitment to design excellence and attention to detail that defines our practice.
              </p>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* Leadership */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <RevealSection>
          <p className="text-xs tracking-[0.3em] text-accent">LEADERSHIP</p>
          <h2 className="mt-4 max-w-xl text-2xl font-extralight text-foreground md:text-3xl">
            Led by <span className="text-accent">principals</span> who shape every project
          </h2>
        </RevealSection>

        <div className="mt-16 space-y-24">
          {leaders.map((leader, i) => (
            <RevealSection key={leader.name}>
              <article className="grid gap-10 md:grid-cols-12 md:gap-12">
                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="aspect-[4/5] w-full object-cover"
                      loading="lazy"
                      width={1000}
                      height={1250}
                    />
                    <div className={`absolute -bottom-3 -z-10 h-full w-full border border-accent/20 ${i % 2 === 1 ? "-left-3" : "-right-3"}`} />
                  </div>
                </div>

                <div className="md:col-span-7">
                  <p className="text-[10px] tracking-[0.3em] text-accent">{leader.title.toUpperCase()}</p>
                  <h3 className="mt-2 text-3xl font-extralight text-foreground md:text-4xl">{leader.name}</h3>
                  <p className="mt-2 text-xs tracking-[0.15em] text-muted-foreground">{leader.credentials}</p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px w-12 bg-accent" />
                    <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
                  </div>

                  <div className="mt-8">
                    <p className="text-[10px] tracking-[0.3em] text-accent">BACKGROUND</p>
                    <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                      {leader.background.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 grid gap-10 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] tracking-[0.3em] text-accent">ACADEMIC</p>
                      <ul className="mt-4 space-y-2 text-sm font-light text-foreground">
                        {leader.academic.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.3em] text-accent">EXPERIENCE</p>
                      <ul className="mt-4 space-y-3">
                        {leader.experience.map((e) => (
                          <li key={e.year} className="grid grid-cols-[5rem_1fr] gap-3 text-sm">
                            <span className="font-light text-accent">{e.year}</span>
                            <span className="font-light text-foreground">{e.role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Values */}

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <RevealSection>
          <p className="text-xs tracking-[0.3em] text-accent">OUR VALUES</p>
        </RevealSection>
        <div className="mt-10 grid gap-0 md:grid-cols-2">
          {values.map((value, i) => (
            <RevealSection key={value.title}>
              <div className={`group border-t border-border p-8 transition-colors hover:bg-secondary/40 ${i % 2 === 0 ? "md:border-r md:border-border" : ""}`}>
                <span className="text-lg text-accent">{value.icon}</span>
                <h3 className="mt-4 text-lg font-light text-foreground">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Design Philosophy */}
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-xs tracking-[0.3em] text-accent">01 — PHILOSOPHY</p>
              <h2 className="mt-4 text-2xl font-extralight text-foreground md:text-3xl">
                Design <span className="text-accent">Philosophy</span>
              </h2>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-12 bg-accent" />
                <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
              </div>
            </div>
            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:col-span-8 md:text-base">
              <p>
                APdS is a design-oriented practice. The firm emphasises design creativity and innovation. Our design philosophy focuses on creating strong and clear architectural forms and spaces that are appropriate and contemporary — using available technology and everyday operational problems to arrive at elegant solutions.
              </p>
              <p>
                The firm adopts a team approach towards project work, providing continuity in design and enhancing the co-ordination and collaboration of all parties involved. Each member is an integral part of the team, and client involvement is actively encouraged for the effective development of each project.
              </p>
              <p>
                Ultimately, through personalised attention from key personnel, the use of the latest technologies, and the teamwork of a diverse group of talented individuals, APdS Architects is ready to take on the challenges of designing for the most discerning clients.
              </p>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* Scope of Work */}
      <RevealSection>
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-xs tracking-[0.3em] text-accent">02 — SCOPE OF WORK</p>
                <h2 className="mt-4 text-2xl font-extralight text-foreground md:text-3xl">
                  What we <span className="text-accent">offer</span>
                </h2>
                <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Full architectural services — from initial concept through to authorities' submission and on-site supervision.
                </p>
              </div>
              <div className="md:col-span-8">
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  Our services include master planning, high-rise commercial, multi-residential, hospitality, institutional, mixed-use, interior, private residential, and landscape design. Full architectural services are offered — including master planning, concept and detail design, documentation, approval, supervision and authorities submission — in addition to full interior, landscape, and project management.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                  {[
                    "Master Planning",
                    "High-Rise Commercial",
                    "Multi-Residential",
                    "Hospitality",
                    "Institutional",
                    "Mixed-Use",
                    "Interior Design",
                    "Private Residential",
                    "Landscape Design",
                    "Concept & Detail Design",
                    "Authorities Submission",
                    "Project Management",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 border-t border-border/60 py-3">
                      <span className="text-accent">—</span>
                      <span className="text-xs tracking-[0.05em] text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>



      {/* Stats */}
      <RevealSection>
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute top-0 left-[20%] h-full w-px bg-copper/15" />
          <div className="absolute top-0 left-[40%] h-full w-px bg-copper/15" />
          <div className="absolute top-0 left-[60%] h-full w-px bg-copper/15" />
          <div className="absolute top-0 left-[80%] h-full w-px bg-copper/15" />
          <div className="mx-auto grid max-w-5xl gap-10 px-6 text-center md:grid-cols-4">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "120+", label: "Projects Completed" },
              { number: "25+", label: "Awards Won" },
              { number: "18", label: "Team Members" },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <p className="text-4xl font-extralight text-accent transition-transform group-hover:scale-110">{stat.number}</p>
                <p className="mt-3 text-xs tracking-[0.15em] text-primary-foreground/50">{stat.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>
    </div>
  );
}
