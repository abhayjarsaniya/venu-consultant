import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";

export const Route = createFileRoute("/_site/about/infrastructure")({
  head: () => ({
    meta: [
      { title: "Infrastructure & Technology, Venu Consultants" },
      {
        name: "description",
        content:
          "Our engineering infrastructure, licensed software, drawing standards, cross-checking process and documentation quality.",
      },
      { property: "og:url", content: "/about/infrastructure" },
    ],
    links: [{ rel: "canonical", href: "/about/infrastructure" }],
  }),
  component: Infrastructure,
});

const pillars = [
  {
    t: "Licensed Software",
    d: "Licensed STAAD Pro, STRUDS, ETABS, SAFE, SAP2000, AutoCAD and proprietary in-house tools, used since the firm's earliest days.",
  },
  {
    t: "Drawing Standards",
    d: "Controlled CAD standards governing line types, fonts, layers and revision protocol. Every sheet follows the same template.",
  },
  {
    t: "Cross-checking Process",
    d: "All fabrication and construction drawings are checked for readability and ambiguity by an engineer independent of the originator.",
  },
  {
    t: "Error Control",
    d: "Errors and changes are recorded on a drawing print; the original creator updates the file. Every revision is logged and superseded sheets archived.",
  },
  {
    t: "Documentation Quality",
    d: "BBS, BOQ, specifications and calculations all carry traceability back to source, auditable from concept to construction.",
  },
];

function Infrastructure() {
  return (
    <>
      <SEOHead
        pageKey="about-infrastructure"
        fallbackTitle="Infrastructure & Technology | Venu Consultants"
        fallbackDescription="Our engineering infrastructure, licensed software, drawing standards, cross-checking process and documentation quality."
        fallbackKeywords="staad pro consultant, etabs design office, autodesk revit consultancy ahmedabad"
      />
      <PageHero
        eyebrow="Infrastructure"
        title={
          <>
            An engineering shop floor{" "}
            <span className="italic text-muted-foreground">built for quality.</span>
          </>
        }
        intro="Venu Consultants has invested in software, standards and process so every drawing leaves the studio readable, unambiguous and error-controlled."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
          { label: "Infrastructure" },
        ]}
      />
      <section className="border-b border-border">
        <div className="container-wide py-20">
          <div className="grid gap-px bg-border lg:grid-cols-5">
            {pillars.map((p, i) => (
              <div key={p.t} className="bg-background p-8">
                <p className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 font-display text-xl leading-tight">{p.t}</h3>
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
