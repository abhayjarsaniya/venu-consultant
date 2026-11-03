import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection, SectionHeader } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";

export const Route = createFileRoute("/_site/technology")({
  head: () => ({
    meta: [
      { title: "Technology, Software & Standards | Venu Consultants" },
      {
        name: "description",
        content:
          "Licensed engineering software, drafting standards and BIM-ready approach behind every Venu Consultants deliverable.",
      },
      { property: "og:url", content: "/technology" },
    ],
    links: [{ rel: "canonical", href: "/technology" }],
  }),
  component: Tech,
});

const software = [
  { name: "STAAD Pro", purpose: "3D structural analysis and design, RCC and steel." },
  { name: "STRUDS", purpose: "RCC building analysis and design with Indian code post-processing." },
  { name: "ETABS", purpose: "Tall and irregular building analysis with sequential construction." },
  { name: "SAFE", purpose: "Slab, mat and post-tensioned floor design." },
  { name: "SAP2000", purpose: "Special structures, dynamics and non-linear analysis." },
  { name: "AutoCAD", purpose: "Production drafting with controlled CAD standards." },
];

const pillars = [
  {
    t: "Structural Analysis",
    d: "Multi-package modelling to cross-validate critical results, outputs are engineered, never blindly accepted.",
  },
  {
    t: "Drafting Standards",
    d: "Controlled CAD templates, layers, line types and revision protocol applied uniformly across every project.",
  },
  {
    t: "BIM-Ready Approach",
    d: "Coordinated CAD that can be lifted into Revit for projects requiring multi-discipline BIM coordination.",
  },
  {
    t: "Quality Control",
    d: "Independent cross-checking on every issued drawing, readability, ambiguity and error logged and resolved.",
  },
];

function Tech() {
  return (
    <>
      <SEOHead
        pageKey="technology"
        fallbackTitle="Technology, Software & Standards | Venu Consultants"
        fallbackDescription="Licensed engineering software, drafting standards and BIM-ready approach behind every Venu Consultants deliverable."
        fallbackKeywords="staad pro, etabs analysis, structural software, bim engineering ahmedabad"
      />
      <PageHero
        eyebrow="Technology"
        title={
          <>
            Software, standards &{" "}
            <span className="italic text-muted-foreground">cross-checks.</span>
          </>
        }
        intro="We invest in licensed engineering software and a disciplined drafting practice, the combination is how we deliver fast, accurate, code-compliant deliverables."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Technology" }]}
      />

      <section className="border-b border-border">
        <div className="container-wide py-20">
          <SectionHeader eyebrow="Software Stack" title="Tools we use every day." />
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {software.map((s) => (
              <div key={s.name} className="bg-background p-8">
                <p className="font-display text-3xl">{s.name}</p>
                <p className="mt-3 text-sm text-muted-foreground">{s.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bone/40">
        <div className="container-wide py-20">
          <SectionHeader eyebrow="Engineering Practice" title="Four pillars of delivery." />
          <div className="mt-12 grid gap-px bg-border lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div key={p.t} className="bg-background p-8">
                <p className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 font-display text-xl">{p.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
