import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  align = "left",
  image,
  imageAlt = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs?: { label: string; to?: string }[];
  align?: "left" | "center";
  image?: string;
  imageAlt?: string;
}) {
  if (image) {
    return (
      <section className="relative isolate overflow-hidden border-b border-border bg-ink text-background">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="container-wide py-24 lg:py-32">
          {breadcrumbs && (
            <nav className="mb-10 text-xs uppercase tracking-[0.18em] text-background/60">
              {breadcrumbs.map((b, i) => (
                <span key={i}>
                  {b.to ? <Link to={b.to} className="hover:text-background">{b.label}</Link> : <span className="text-background">{b.label}</span>}
                  {i < breadcrumbs.length - 1 && <span className="mx-2 text-gold">/</span>}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <p className="eyebrow mb-6 text-gold">{eyebrow}</p>}
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-tight max-w-4xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-background/80">
              {intro}
            </p>
          )}
        </div>
      </section>
    );
  }
  return (
    <section className="border-b border-border bg-background">
      <div className={`container-wide py-20 lg:py-28 ${align === "center" ? "text-center" : ""}`}>
        {breadcrumbs && (
          <nav className="mb-10 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {breadcrumbs.map((b, i) => (
              <span key={i}>
                {b.to ? <Link to={b.to} className="hover:text-foreground">{b.label}</Link> : <span className="text-foreground">{b.label}</span>}
                {i < breadcrumbs.length - 1 && <span className="mx-2 text-gold">/</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-tight">
          {title}
        </h1>
        {intro && (
          <p className={`mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground ${align === "center" ? "mx-auto" : ""}`}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function CTASection({
  eyebrow = "Start a Project",
  title = "Let's build better infrastructure together.",
  body = "Tell us about your project, site, scope, programme and constraints. We will respond within one working day.",
  ctaLabel = "Discuss Your Project",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="border-t border-border bg-ink text-background">
      <div className="container-wide grid items-end gap-12 py-20 lg:grid-cols-[1.4fr_1fr] lg:py-28">
        <div>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-tight">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-background/70">{body}</p>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-gold px-7 py-4 text-sm font-medium text-ink transition hover:bg-gold/90"
          >
            {ctaLabel}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link to="/services" className="text-sm text-background/60 transition hover:text-background">
            Or explore our services →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, intro, align = "left" }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; align?: "left" | "center" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,3rem)] leading-[1.08] tracking-tight">{title}</h2>
      {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
