import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Instagram } from "lucide-react";
import apdsLogo from "@/assets/2026-latest-apds-logo.png.asset.json";

const navLinks = [
  { to: "/" as const, label: "HOME" },
  { to: "/about" as const, label: "ABOUT" },
  { to: "/work" as const, label: "WORK" },
  { to: "/upcoming" as const, label: "UPCOMING" },
  { to: "/team" as const, label: "TEAM" },
];

const INSTAGRAM_URL = "https://www.instagram.com/apdsarchitects/";

const contactSubLinks = [
  { to: "/contact" as const, label: "Contact" },
  { to: "/opportunities" as const, label: "Opportunities" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const contactActive = pathname === "/contact" || pathname === "/opportunities";

  const linkClass =
    "text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground";
  const activeClass = "text-foreground";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center">
          <img
            src={apdsLogo.url}
            alt="APdS Architects"
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={linkClass}
              activeProps={{ className: activeClass }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}

          {/* Contact dropdown */}
          <div className="group relative flex items-center">
            <Link
              to="/contact"
              className={`${linkClass} ${contactActive ? activeClass : ""}`}
            >
              CONTACT
            </Link>
            <ChevronDown className="ml-1 h-3 w-3 text-muted-foreground transition-transform group-hover:rotate-180" strokeWidth={1.5} />
            <div className="absolute top-full right-0 min-w-[10rem] pt-2 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
              <div className="border border-border bg-background/95 backdrop-blur-sm shadow-sm">
                {contactSubLinks.map((sub) => (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    className={`block px-5 py-3 text-xs tracking-[0.18em] transition-colors hover:text-accent hover:bg-secondary/40 ${
                      pathname === sub.to ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

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

            <div className="border-t border-border pt-3">
              <button
                className="flex w-full items-center justify-between text-sm tracking-[0.2em] text-muted-foreground"
                onClick={() => setMobileContactOpen(!mobileContactOpen)}
              >
                <span className={contactActive ? "text-foreground" : ""}>CONTACT</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileContactOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {mobileContactOpen && (
                <div className="mt-3 flex flex-col gap-3 pl-3">
                  {contactSubLinks.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      className={`text-sm tracking-[0.18em] transition-colors hover:text-foreground ${
                        pathname === sub.to ? "text-foreground" : "text-muted-foreground"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
