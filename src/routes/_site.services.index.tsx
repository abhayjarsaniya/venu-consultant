import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";
import heroImg from "@/assets/studio.jpg";
import waterImg from "@/assets/water-treatment.jpg";
import steelImg from "@/assets/steel-structure.jpg";
import bridgeImg from "@/assets/bridge.jpg";

const categoryImages: Record<string, string> = {
  Design: steelImg,
  Management: heroImg,
  Infrastructure: waterImg,
  Specialised: bridgeImg,
};

export const Route = createFileRoute("/_site/services/")({
  head: () => ({
    meta: [
      { title: "Engineering Services, Venu Consultants" },
      { name: "description", content: "Architectural, civil & structural, environmental, water, sewage, industrial, project management and specialist engineering services." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { content } = useSiteContent();
  const services = content.services;
  const cats = Array.from(new Set(services.map((s) => s.category)));

  return (
    <>
      <SEOHead
        pageKey="services"
        fallbackTitle="Engineering Services | Venu Consultants"
        fallbackDescription="Architectural, civil & structural, environmental, water, sewage, industrial, project management and specialist engineering services."
        fallbackKeywords="architectural engineering, structural design, civil engineering services, environmental engineering, STP WTP design"
      />
      <PageHero
        eyebrow="Services"
        title={<>Full-spectrum engineering, <span className="italic text-muted-foreground">under one roof.</span></>}
        intro="From initial planning and concept development to permitting, construction documents, design management, continuous technical supervision and contract administration."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
        image={heroImg}
        imageAlt="Engineering studio reviewing project drawings"
      />
      {cats.map((c) => (
        <section key={c} className="border-b border-border">
          <div className="container-wide grid gap-12 py-20 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={categoryImages[c] || steelImg} alt={`${c} engineering`} loading="lazy" width={1600} height={2000} className="h-full w-full object-cover grayscale" />
              </div>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="h-px w-16 bg-gold" />
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{c}</p>
              </div>
              <h2 className="mt-4 font-display text-3xl leading-tight">{c} services.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-px bg-border sm:grid-cols-2">
                {services.filter((s) => s.category === c).map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group flex flex-col justify-between bg-background p-8 transition hover:bg-foreground hover:text-background"
                  >
                    <div>
                      <h3 className="font-display text-xl leading-tight">{s.title}</h3>
                      <p className="mt-4 text-sm text-muted-foreground group-hover:text-background/70">{s.summary}</p>
                    </div>
                    <p className="mt-8 text-xs uppercase tracking-[0.18em] text-gold">Explore →</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
      <CTASection />
    </>
  );
}
