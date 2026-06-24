import { Link } from "@tanstack/react-router";
import { useState } from "react";
import apdsLogo from "@/assets/apds-logo.png.asset.json";

const navLinks = [
  { to: "/" as const, label: "HOME" },
  { to: "/about" as const, label: "ABOUT" },
  { to: "/work" as const, label: "WORK" },
  { to: "/team" as const, label: "TEAM" },
  { to: "/media" as const, label: "MEDIA" },
  { to: "/contact" as const, label: "CONTACT" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <img src={apdsLogo.url} alt="APdS Architects" className="h-10 w-10 rounded-full object-cover" width={40} height={40} />
          <span className="text-sm font-light tracking-[0.25em] text-foreground">APdS ARCHITECTS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <div className="flex flex-col gap-1.5">
            <span className={`block h-px w-6 bg-foreground transition-all ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-all ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-background px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: link.to === "/" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
