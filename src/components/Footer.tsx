export function Footer() {
  return (
    <footer className="border-t border-border bg-primary py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-light tracking-[0.25em] text-primary-foreground">APdS ARCHITECTS</h3>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-primary-foreground/60">
              Architectural and interior design practice crafting thoughtful spaces with clarity, material warmth, and strong responses to site.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] text-primary-foreground/40">CONTACT</h4>
            <div className="mt-4 flex flex-col gap-2 text-xs text-primary-foreground/60">
              <p>118 Joo Chiat Road #02-01, 427407</p>
              <p>+65 6288 1618</p>
              <p>WhatsApp: +65 9072 1618</p>
              <p>apds@apdsarchitects.com</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] text-primary-foreground/40">FOLLOW</h4>
            <div className="mt-4 flex flex-col gap-2 text-xs text-primary-foreground/60">
              <a href="https://www.linkedin.com/company/apds-architects/" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary-foreground">
                LinkedIn
              </a>
              <a href="https://www.facebook.com/p/APdS-Architects-61574526505829/" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary-foreground">
                Facebook
              </a>
              <a href="https://www.instagram.com/apdsarchitects/" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary-foreground">
                Instagram
              </a>
              <a href="https://wa.me/6590721618" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary-foreground">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-6">
          <p className="text-xs text-primary-foreground/30">© {new Date().getFullYear()} APdS Architects. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
