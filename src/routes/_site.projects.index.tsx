import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTASection, SectionHeader } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";
import heroImg from "@/assets/highrise.jpg";
import waterImg from "@/assets/water-treatment.jpg";
import stpImg from "@/assets/stp-aerial.jpg";
import industrialImg from "@/assets/industrial.jpg";
import highriseImg from "@/assets/highrise.jpg";
import hospitalImg from "@/assets/hospital.jpg";
import bridgeImg from "@/assets/bridge.jpg";

const catImg: Record<string, string> = {
  "water-treatment": waterImg,
  "sewage-treatment": stpImg,
  industrial: industrialImg,
  "high-rise": highriseImg,
  commercial: hospitalImg,
  infrastructure: bridgeImg,
};

export const Route = createFileRoute("/_site/projects/")({
  head: () => ({
    meta: [
      { title: "Projects, Venu Consultants" },
      { name: "description", content: "A portfolio of water treatment, sewage treatment, industrial, commercial, high-rise and infrastructure projects delivered across India." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const { content } = useSiteContent();
  const projectCategories = content.projectCategories;

  return (
    <>
      <SEOHead
        pageKey="projects"
        fallbackTitle="Delivered Projects Portfolio | Venu Consultants"
        fallbackDescription="A portfolio of water treatment, sewage treatment, industrial, commercial, high-rise and infrastructure projects delivered across India."
        fallbackKeywords="engineering projects portfolio, water treatment projects, industrial projects india, structural design cases"
      />
      <PageHero
        eyebrow="Projects"
        title={<>Three hundred projects, <span className="italic text-muted-foreground">one standard.</span></>}
        intro="From bulk water transmission to high-rise residential, our portfolio spans defence, government, public sector and private industry across India."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Projects" }]}
        image={heroImg}
        imageAlt="High rise tower under construction"
      />
      <section className="border-b border-border">
        <div className="container-wide py-16">
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {projectCategories.map((c) => (
              <Link key={c.slug} to="/projects/$category" params={{ category: c.slug }} className="group relative block aspect-[4/5] overflow-hidden bg-foreground text-background">
                <img src={catImg[c.slug] ?? industrialImg} alt={c.name} loading="lazy" width={1200} height={1500} className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-8">
                  <p className="font-display text-5xl text-gold">{c.count}</p>
                  <div>
                    <h3 className="font-display text-2xl">{c.name}</h3>
                    <p className="mt-3 text-sm text-background/80">{c.blurb}</p>
                    <p className="mt-6 text-xs uppercase tracking-[0.18em] text-gold">View category →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-border bg-bone/40">
        <div className="container-wide py-20">
          <SectionHeader eyebrow="Methodology" title="How we deliver." />
          <div className="mt-12 grid gap-px bg-border lg:grid-cols-3">
            {[
              { t: "Engineering Excellence", d: "Independent cross-checking, code compliance and constructable detailing on every drawing." },
              { t: "Quality Standards", d: "ITP, QAP and document control aligned with project and client QMS frameworks." },
              { t: "On-time Delivery", d: "Programme-driven design, with technical responses fast enough to keep contractors building." },
            ].map((m) => (
              <div key={m.t} className="bg-background p-10">
                <h3 className="font-display text-2xl">{m.t}</h3>
                <p className="mt-4 text-muted-foreground">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
