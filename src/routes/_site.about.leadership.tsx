import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";

export const Route = createFileRoute("/_site/about/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership, Mr. Keyur Ladani, Managing Director" },
      {
        name: "description",
        content:
          "Meet Mr. Keyur Ladani, Managing Director and Principal Structural Engineer of Venu Consultants, with 18+ years of practice.",
      },
      { property: "og:url", content: "/about/leadership" },
    ],
    links: [{ rel: "canonical", href: "/about/leadership" }],
  }),
  component: Leadership,
});

const expertise = [
  "Industrial Projects",
  "Water Treatment Plants",
  "Wastewater Treatment Plants",
  "Structural Engineering",
  "Bulk Water Pipelines",
  "High-Rise Structures",
];

function Leadership() {
  const { content } = useSiteContent();
  const leader = content.about.leadership.director;

  return (
    <>
      <SEOHead
        pageKey="about-leadership"
        fallbackTitle="Leadership | Mr. Keyur Ladani | Venu Consultants"
        fallbackDescription="Meet Mr. Keyur Ladani, Managing Director and Principal Structural Engineer of Venu Consultants, with 18+ years of practice."
        fallbackKeywords="Keyur Ladani, principal structural engineer, structural engineering consultant ahmedabad"
      />
      <PageHero
        eyebrow="Leadership"
        title={leader.name}
        intro={`${leader.role} · ${leader.qualification || ""} · ${leader.experience || ""} of practice`}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
          { label: "Leadership" },
        ]}
      />
      <section className="border-b border-border">
        <div className="container-wide grid gap-16 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-muted-foreground">{leader.bio}</p>
          </div>
          <aside className="space-y-10 lg:col-span-5">
            <div>
              <p className="eyebrow">Areas of Expertise</p>
              <ul className="mt-5 space-y-3">
                {expertise.map((e) => (
                  <li key={e} className="rule-gold text-foreground">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Approved Structural Engineer</p>
              <ul className="mt-5 space-y-3 text-foreground">
                <li className="rule-gold">Ahmedabad Municipal Corporation (AMC)</li>
                <li className="rule-gold">Ahmedabad Urban Development Authority (AUDA)</li>
                <li className="rule-gold">Greater Hyderabad Municipal Corporation (GHMC)</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <CTASection
        eyebrow="Work With Our Principal"
        title="Discuss your project directly with our engineering leadership."
      />
    </>
  );
}
