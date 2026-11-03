import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site/SiteChrome";
import { CTASection, SectionHeader } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";
import heroImg from "@/assets/hero-plant.jpg";
import industrialImg from "@/assets/industrial.jpg";
import highriseImg from "@/assets/highrise.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Venu Consultants, Engineering Consultancy, Ahmedabad" },
      { name: "description", content: "Ahmedabad-based engineering consultancy delivering innovative, cost-effective architectural, civil, structural, environmental, water and industrial engineering across India." },
      { property: "og:title", content: "Venu Consultants, Engineering Consultancy" },
      { property: "og:description", content: "Architectural, civil & structural, environmental, water and industrial engineering across India." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Venu Consultants Pvt. Ltd.",
        description: "Engineering consultancy delivering architectural, civil, structural, environmental, water and industrial engineering across India.",
        address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
        areaServed: "IN",
      }),
    }],
  }),
  component: Home,
});

function Home() {
  const { content } = useSiteContent();
  const hero = content.home.hero;
  const aboutIntro = content.home.aboutIntro;
  const whyChoose = content.home.whyChooseItems;
  const statsList = content.stats;
  const servicesList = content.services;
  const industriesList = content.industries;
  const clientsList = content.clients;
  const projectCategoriesList = content.projectCategories;
  const vis = content.sectionVisibility || {
    homeHero: true,
    homeStats: true,
    homeAboutIntro: true,
    homeServices: true,
    homeIndustries: true,
    homeWhyChoose: true,
    homeProjects: true,
    homeClients: true,
    homeCta: true,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        pageKey="home"
        fallbackTitle="Venu Consultants, Engineering Consultancy, Ahmedabad"
        fallbackDescription="Ahmedabad-based engineering consultancy delivering innovative, cost-effective architectural, civil, structural, environmental, water and industrial engineering across India."
        fallbackKeywords="engineering consultancy ahmedabad, structural engineer gujarat, civil engineering india, water treatment design, architectural engineering ahmedabad, industrial plant design"
      />
      <SiteHeader />

      {/* Hero */}
      {vis.homeHero && (
        <section className="relative overflow-hidden border-b border-border">
          <div className="container-wide grid items-end gap-16 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-7">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="mt-8 font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] tracking-tight">
                {hero.title.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
                <span className="italic text-muted-foreground">{hero.highlightedWord}</span>
                <br />
                solutions.
              </h1>
              <p className="mt-10 max-w-xl text-lg text-muted-foreground">
                {hero.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to={hero.ctaPrimaryLink || "/services"} className="group inline-flex items-center gap-3 bg-foreground px-7 py-4 text-sm font-medium text-background transition hover:bg-foreground/90">
                  {hero.ctaPrimaryText || "Explore Services"}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link to={hero.ctaSecondaryLink || "/contact"} className="link-underline px-2 text-sm font-medium">
                  {hero.ctaSecondaryText || "Contact Us"}
                </Link>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={heroImg} alt="Water treatment plant at dusk" className="h-full w-full object-cover" width={1920} height={1280} />
              </div>
              <div className="absolute -bottom-px right-0 bg-background py-3 pl-6 pr-0 text-right">
                <p className="eyebrow">{statsList[0]?.value || "18+ Years"}</p>
                <p className="mt-1 font-display text-2xl">{statsList[0]?.label || "Engineering Practice"}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      {vis.homeStats && (
        <section className="border-b border-border">
          <div className="container-wide grid grid-cols-2 divide-x divide-border lg:grid-cols-5">
            {statsList.map((s) => (
              <div key={s.label} className="p-8 lg:p-10">
                <p className="font-display text-4xl lg:text-5xl">{s.value}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Overview */}
      {vis.homeAboutIntro && (
        <section className="border-b border-border">
          <div className="container-wide grid gap-16 py-24 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-5">
              <p className="eyebrow">{aboutIntro.eyebrow}</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-tight">
                {aboutIntro.title}
              </h2>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground lg:col-span-7 lg:pt-6">
              <p>{aboutIntro.body}</p>
              {aboutIntro.bulletPoints && aboutIntro.bulletPoints.length > 0 && (
                <ul className="mt-6 space-y-2 text-sm text-foreground/80">
                  {aboutIntro.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/about" className="link-underline inline-block pt-4 text-sm font-medium text-foreground">Read the full story →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {vis.homeServices && (
        <section className="border-b border-border bg-bone/40">
          <div className="container-wide py-24 lg:py-32">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeader eyebrow="Services" title={content.home.featuredServicesTitle || "Full-spectrum engineering, under one roof."} intro={content.home.featuredServicesSubtitle || "From concept and permits through detailed design, construction administration and commissioning."} />
              <Link to="/services" className="link-underline text-sm font-medium">All services →</Link>
            </div>
            <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
              {servicesList.slice(0, 8).map((s, i) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex flex-col justify-between bg-background p-8 transition hover:bg-foreground hover:text-background"
                >
                  <div>
                    <p className="font-display text-5xl text-gold/70 group-hover:text-gold">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-8 font-display text-2xl leading-tight">{s.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-background/70">{s.summary}</p>
                  </div>
                  <span className="mt-10 text-xs uppercase tracking-[0.18em] text-gold">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industries */}
      {vis.homeIndustries && (
        <section className="border-b border-border">
          <div className="container-wide py-24 lg:py-32">
            <SectionHeader eyebrow="Industries We Serve" title={content.home.featuredIndustriesTitle || "Sector expertise across infrastructure, industry & buildings."} />
            <div className="mt-14 grid grid-cols-2 gap-px bg-border md:grid-cols-3 lg:grid-cols-5">
              {industriesList.slice(0, 10).map((ind) => (
                <Link key={ind.slug} to="/industries/$slug" params={{ slug: ind.slug }} className="group bg-background p-6 transition hover:bg-bone">
                  <p className="font-display text-lg leading-tight">{ind.name}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{ind.blurb}</p>
                  <p className="mt-6 text-xs uppercase tracking-[0.18em] text-gold opacity-0 transition group-hover:opacity-100">View →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why */}
      {vis.homeWhyChoose && (
        <section className="border-b border-border bg-ink text-background">
          <div className="container-wide grid gap-16 py-24 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-4">
              <p className="eyebrow">{content.home.whyChooseTitle || "Why Choose Us"}</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-tight">{content.home.whyChooseSubtitle || "Six reasons clients return."}</h2>
              <img src={industrialImg} alt="Industrial facility" loading="lazy" width={1600} height={1100} className="mt-10 hidden aspect-[4/3] w-full object-cover grayscale lg:block" />
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-px bg-background/10 sm:grid-cols-2">
                {whyChoose.map((w, i) => (
                  <div key={w.t} className="bg-ink p-8">
                    <p className="font-display text-xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-5 font-display text-2xl">{w.t}</h3>
                    <p className="mt-3 text-sm text-background/70">{w.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured projects */}
      {vis.homeProjects && (
        <section className="border-b border-border">
          <div className="container-wide py-24 lg:py-32">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeader eyebrow="Featured Projects" title={content.home.projectsTitle || "A portfolio across India."} />
              <Link to="/projects" className="link-underline text-sm font-medium">View all projects →</Link>
            </div>
            <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
              <div className="lg:col-span-2 lg:row-span-2">
                <Link to="/projects/$category" params={{ category: "high-rise" }} className="group relative block aspect-[16/11] overflow-hidden bg-background">
                  <img src={highriseImg} alt="High rise" loading="lazy" width={1280} height={1600} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-8 text-background">
                    <p className="eyebrow text-gold">High Rise Structures</p>
                    <h3 className="mt-3 font-display text-3xl lg:text-4xl">Towers engineered for performance and pace.</h3>
                  </div>
                </Link>
              </div>
              {projectCategoriesList.slice(0, 4).map((c) => (
                <Link key={c.slug} to="/projects/$category" params={{ category: c.slug }} className="group bg-background p-8 transition hover:bg-bone">
                  <p className="font-display text-3xl text-gold">{c.count}</p>
                  <h3 className="mt-4 font-display text-xl">{c.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clients */}
      {vis.homeClients && (
        <section className="border-b border-border bg-bone/40">
          <div className="container-wide py-24">
            <SectionHeader eyebrow="Major Clients" title={content.home.clientsTitle || "Trusted by defence, government & industry."} />
            <div className="mt-12 grid grid-cols-2 gap-px bg-border md:grid-cols-3 lg:grid-cols-5">
              {clientsList.slice(0, 15).map((c) => (
                <div key={c.name} className="bg-background p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-gold">{c.sector}</p>
                  <p className="mt-3 font-display text-lg leading-tight">{c.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/clients" className="link-underline text-sm font-medium">See all clients →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      {vis.homeCta && (
        <CTASection
          title={
            <>
              {content.home.cta.title}{" "}
              <span className="italic text-muted-foreground">{content.home.cta.highlightedWord}</span>
            </>
          }
          intro={content.home.cta.intro}
        />
      )}
      <SiteFooter />
    </div>
  );
}
