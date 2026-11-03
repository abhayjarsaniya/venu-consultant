import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { navigation } from "@/data/site";
import { useSiteContent } from "@/context/ContentContext";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { content } = useSiteContent();
  const company = content.company;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-wide flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-tight">
            {company.short.split(" ")[0] || "Venu"}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-gold transition-transform group-hover:scale-150" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {company.short.split(" ").slice(1).join(" ") || "Consultants"}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.slice(1, -1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-sm font-medium text-foreground/80 transition hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: false }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            Contact
            <span className="h-1 w-1 rounded-full bg-gold transition-all group-hover:w-3" />
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center p-2 lg:hidden"
        >
          <span className="block h-px w-6 bg-foreground transition-all" />
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-wide flex flex-col py-4">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 bg-foreground px-5 py-3 text-center text-sm text-background"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { content } = useSiteContent();
  const company = content.company;

  return (
    <footer className="border-t border-border bg-ink text-background">
      <div className="container-wide grid gap-12 py-20 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl">{company.name}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </div>
          <p className="mt-5 max-w-sm text-sm text-background/65">
            {company.tagline}. An Ahmedabad-based engineering consultancy delivering architectural,
            structural, environmental, water and industrial engineering excellence across India.
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-background/50">
            {company.city}
          </p>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { l: "About", to: "/about" },
            { l: "Services", to: "/services" },
            { l: "Industries", to: "/industries" },
            { l: "Projects", to: "/projects" },
            { l: "Technology", to: "/technology" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { l: "Leadership", to: "/about/leadership" },
            { l: "Our Team", to: "/about/team" },
            { l: "Why Choose Us", to: "/about/why-choose-us" },
            { l: "Library", to: "/about/library" },
            { l: "Careers", to: "/careers" },
          ]}
        />
        <FooterCol
          title="Connect"
          links={[
            { l: "Clients", to: "/clients" },
            { l: "Blog", to: "/blog" },
            { l: "Contact", to: "/contact" },
            { l: "Admin CMS", to: "/admin" },
          ]}
        />
      </div>
      <div className="border-t border-background/10">
        <div className="container-wide flex flex-col items-start justify-between gap-2 py-6 text-xs text-background/55 md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span>{company.city}</span>
            <span className="text-background/20">|</span>
            <Link to="/admin" className="text-gold/80 hover:text-gold transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { l: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.22em] text-gold">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((x) => (
          <li key={x.to}>
            <Link to={x.to} className="text-sm text-background/75 transition hover:text-background">
              {x.l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
