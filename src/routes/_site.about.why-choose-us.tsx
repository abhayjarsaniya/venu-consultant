import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";

export const Route = createFileRoute("/_site/about/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Venu Consultants" },
      {
        name: "description",
        content:
          "Six reasons clients return, innovative engineering, cost-effective designs, fast turnaround, quality assurance, national presence and client satisfaction.",
      },
      { property: "og:url", content: "/about/why-choose-us" },
    ],
    links: [{ rel: "canonical", href: "/about/why-choose-us" }],
  }),
  component: Why,
});

function Why() {
  const { content } = useSiteContent();
  const whyData = content.about.whyChooseUs;
  const reasons = whyData.reasons;

  return (
    <>
      <SEOHead
        pageKey="about-why-choose-us"
        fallbackTitle="Why Choose Us | Venu Consultants"
        fallbackDescription="Discover why national clients trust Venu Consultants for structural precision, value engineering and fast turnaround."
        fallbackKeywords="why choose venu consultants, value engineering, proof checking, quality assurance engineering"
      />
      <PageHero
        eyebrow={whyData.eyebrow}
        title={<>{whyData.title}</>}
        intro={whyData.intro}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
          { label: "Why Choose Us" },
        ]}
      />
      <section className="border-b border-border">
        <div className="container-wide py-20">
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <div key={r.title} className="bg-background p-10">
                <p className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 font-display text-2xl">{r.title}</h3>
                <p className="mt-4 text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
