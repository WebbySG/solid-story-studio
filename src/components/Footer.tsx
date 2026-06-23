import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-light tracking-[0.25em] text-primary-foreground">APdS ARCHITECTS</h3>
            <p className="mt-4 text-xs leading-relaxed text-primary-foreground/60">
              A design-driven architectural practice combining creativity and collaborative teamwork to deliver contemporary solutions.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] text-primary-foreground/40">NAVIGATION</h4>
            <div className="mt-4 flex flex-col gap-2">
              {[
                { to: "/" as const, label: "Home" },
                { to: "/about" as const, label: "About" },
                { to: "/work" as const, label: "Work" },
                { to: "/team" as const, label: "Team" },
                { to: "/media" as const, label: "Media" },
                { to: "/contact" as const, label: "Contact" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-xs text-primary-foreground/60 transition-colors hover:text-primary-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] text-primary-foreground/40">CONTACT</h4>
            <div className="mt-4 flex flex-col gap-2 text-xs text-primary-foreground/60">
              <p>info@apdsarchitects.com</p>
              <p>+91 98765 43210</p>
              <p>Mumbai, India</p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-primary-foreground/10 pt-6">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} APdS Architects. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
