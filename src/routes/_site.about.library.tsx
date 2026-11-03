import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";

export const Route = createFileRoute("/_site/about/library")({
  head: () => ({
    meta: [
      { title: "Library & Resources, Venu Consultants" },
      { name: "description", content: "A well-stocked library of 200+ books and publications on civil engineering, with all relevant national and international codes." },
      { property: "og:url", content: "/about/library" },
    ],
    links: [{ rel: "canonical", href: "/about/library" }],
  }),
  component: Library,
});

function Library() {
  return (
    <>
      <SEOHead
        pageKey="about-library"
        fallbackTitle="Technical Library & Resources | Venu Consultants"
        fallbackDescription="A well-stocked library of 200+ books and publications on civil engineering, with all relevant national and international codes."
        fallbackKeywords="IS codes engineering, ACI standards, structural handbooks, engineering library ahmedabad"
      />
      <PageHero
        eyebrow="Library & Resources"
        title={<>A lifetime of <span className="italic text-muted-foreground">learning.</span></>}
        intro="We are committed to a lifetime of learning. Our in-house library houses over 200 books and publications on civil, structural, environmental and mechanical engineering, and we maintain every relevant national and international design code."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Library" }]}
      />
      <section className="border-b border-border">
        <div className="container-wide grid gap-px bg-border lg:grid-cols-3">
          {[
            { v: "200+", l: "Books & Publications" },
            { v: "All", l: "National Codes (IS / NBC / CPHEEO)" },
            { v: "Key", l: "International Codes (ACI, BS, Eurocode, DIN)" },
          ].map((s) => (
            <div key={s.l} className="bg-background p-10">
              <p className="font-display text-5xl">{s.v}</p>
              <p className="mt-4 text-sm uppercase tracking-[0.16em] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-b border-border">
        <div className="container-wide py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl">Why a library still matters.</h2>
              <p className="mt-5 text-muted-foreground">
                Software outputs are only as good as the engineering judgement guiding them. Codes evolve, materials change, methods improve. By maintaining a curated reference library and continuous professional development through national and international professional bodies, we keep our practice current.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl">What you get as a client.</h2>
              <p className="mt-5 text-muted-foreground">
                Code-compliant deliverables, defensible design rationale and an engineering team that can answer the "why" behind every number on the drawing.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
