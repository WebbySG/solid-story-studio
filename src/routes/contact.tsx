import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — APdS Architects" },
      { name: "description", content: "Contact APdS Architects in Singapore for architectural and interior design enquiries." },
      { property: "og:title", content: "Contact — APdS Architects" },
      { property: "og:description", content: "Contact APdS Architects in Singapore for architectural and interior design enquiries." },
    ],
  }),
  component: ContactPage,
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

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/apds-architects/" },
  { label: "Facebook", href: "https://www.facebook.com/p/APdS-Architects-61574526505829/" },
  { label: "Instagram", href: "https://www.instagram.com/apdsarchitects/" },
  { label: "WhatsApp", href: "https://wa.me/6590721618" },
];

function ContactPage() {
  return (
    <div className="pt-20">
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
          <p className="text-xs tracking-[0.3em] text-accent">CONTACT</p>
          <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl">Get in Touch</h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </section>
      </RevealSection>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealSection>
            <div className="grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                <p className="text-[10px] tracking-[0.22em] text-muted-foreground">ADDRESS</p>
                <p className="mt-3 text-base font-light leading-relaxed text-foreground">
                  118 Joo Chiat Road #02-01 <br />
                  Singapore 427407
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.22em] text-muted-foreground">CONTACT</p>
                <div className="mt-3 space-y-2 text-base font-light text-foreground">
                  <p>+65 6288 1618</p>
                  <p>WhatsApp: +65 9072 1618</p>
                  <a href="mailto:apds@apdsarchitects.com" className="transition-colors hover:text-accent">
                    apds@apdsarchitects.com
                  </a>
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="border-t border-border pt-8">
              <p className="text-[10px] tracking-[0.22em] text-muted-foreground">SOCIAL</p>
              <div className="mt-4 grid gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b border-border py-3 text-sm text-foreground transition-colors hover:text-accent"
                  >
                    <span>{item.label}</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Google Map */}
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12 lg:pb-24">
          <p className="text-[10px] tracking-[0.22em] text-muted-foreground">LOCATION</p>
          <div className="mt-4 aspect-[16/9] w-full overflow-hidden border border-border bg-secondary">
            <iframe
              title="APdS Architects on Google Maps"
              src="https://www.google.com/maps?q=118+Joo+Chiat+Road+%2302-01+Singapore+427407&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 grayscale"
            />
          </div>
        </section>
      </RevealSection>

      {/* Opportunities */}
      <RevealSection>
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-xs tracking-[0.3em] text-accent">OPPORTUNITIES</p>
                <h2 className="mt-4 text-2xl font-extralight text-foreground md:text-3xl">
                  Join the <span className="text-accent">studio</span>
                </h2>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-12 bg-accent" />
                  <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
                </div>
              </div>
              <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:col-span-8 md:text-base">
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
          </div>
        </section>
      </RevealSection>
    </div>
  );
}
