import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram } from "lucide-react";
import apdsLogo from "@/assets/apds-logo-aligned.png.asset.json";

const navLinks = [
  { to: "/" as const, label: "HOME" },
  { to: "/about" as const, label: "ABOUT" },
  { to: "/work" as const, label: "WORK" },
  { to: "/upcoming" as const, label: "UPCOMING" },
  { to: "/team" as const, label: "TEAM" },
  { to: "/contact" as const, label: "CONTACT" },
];

const INSTAGRAM_URL = "https://www.instagram.com/apdsarchitects/";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center">
          <img
            src={apdsLogo.url}
            alt="APdS Architects — Architectural · Interior · Landscape"
            className="h-7 w-auto object-contain md:h-12"
          />
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
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.25} />
          </a>
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
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <Instagram className="h-4 w-4" strokeWidth={1.25} />
              INSTAGRAM
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
