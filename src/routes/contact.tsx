import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — APdS Architects" },
      { name: "description", content: "Get in touch with APdS Architects for your next project." },
      { property: "og:title", content: "Contact — APdS Architects" },
      { property: "og:description", content: "Get in touch with APdS Architects for your next project." },
    ],
  }),
  component: ContactPage,
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

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="pt-20">
      <RevealSection>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
          <p className="text-xs tracking-[0.3em] text-accent">GET IN TOUCH</p>
          <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl">Contact Us</h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-16 bg-accent" />
            <div className="h-1.5 w-1.5 rotate-45 border border-accent" />
          </div>
        </section>
      </RevealSection>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact info */}
          <RevealSection>
            <div className="space-y-10">
              {[
                { label: "OFFICE", content: "APdS Architects\nStudio 405, Business Centre\nBandra West, Mumbai 400050\nIndia" },
                { label: "EMAIL", content: "info@apdsarchitects.com" },
                { label: "PHONE", content: "+91 98765 43210" },
                { label: "WORKING HOURS", content: "Monday — Friday: 10:00 AM — 7:00 PM" },
              ].map((item) => (
                <div key={item.label} className="group">
                  <h3 className="flex items-center gap-3 text-xs tracking-[0.2em] text-accent">
                    <span className="h-px w-4 bg-accent transition-all group-hover:w-8" />
                    {item.label}
                  </h3>
                  <p className="mt-3 pl-7 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{item.content}</p>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Form */}
          <RevealSection>
            <form onSubmit={handleSubmit} className="space-y-8">
              {[
                { label: "NAME", type: "text", key: "name" as const, required: true },
                { label: "EMAIL", type: "email", key: "email" as const, required: true },
                { label: "PHONE", type: "tel", key: "phone" as const, required: false },
              ].map((field) => (
                <div key={field.key} className="group">
                  <label className="text-xs tracking-[0.15em] text-muted-foreground transition-colors group-focus-within:text-accent">{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                    required={field.required}
                  />
                </div>
              ))}
              <div className="group">
                <label className="text-xs tracking-[0.15em] text-muted-foreground transition-colors group-focus-within:text-accent">MESSAGE</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="group mt-4 flex items-center gap-3 border border-foreground px-8 py-3 text-xs tracking-[0.25em] text-foreground transition-all hover:bg-foreground hover:text-background"
              >
                SEND MESSAGE
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
