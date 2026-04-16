import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
  };

  return (
    <div className="pt-20">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <p className="text-xs tracking-[0.3em] text-accent">GET IN TOUCH</p>
        <h1 className="mt-4 text-3xl font-extralight text-foreground md:text-5xl">Contact Us</h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact info */}
          <div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xs tracking-[0.2em] text-accent">OFFICE</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  APdS Architects<br />
                  Studio 405, Business Centre<br />
                  Bandra West, Mumbai 400050<br />
                  India
                </p>
              </div>
              <div>
                <h3 className="text-xs tracking-[0.2em] text-accent">EMAIL</h3>
                <p className="mt-3 text-sm text-muted-foreground">info@apdsarchitects.com</p>
              </div>
              <div>
                <h3 className="text-xs tracking-[0.2em] text-accent">PHONE</h3>
                <p className="mt-3 text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
              <div>
                <h3 className="text-xs tracking-[0.2em] text-accent">WORKING HOURS</h3>
                <p className="mt-3 text-sm text-muted-foreground">Monday — Friday: 10:00 AM — 7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs tracking-[0.15em] text-muted-foreground">NAME</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                required
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.15em] text-muted-foreground">EMAIL</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                required
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.15em] text-muted-foreground">PHONE</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.15em] text-muted-foreground">MESSAGE</label>
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
              className="mt-4 border border-foreground px-8 py-3 text-xs tracking-[0.25em] text-foreground transition-all hover:bg-foreground hover:text-background"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
