import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";

export const Route = createFileRoute("/_site/about/mission")({
  head: () => ({
    meta: [
      { title: "Mission & Vision, Venu Consultants" },
      { name: "description", content: "Our mission to satisfy clients with unparalleled engineering services and our vision to become an internationally recognised consultancy." },
      { property: "og:url", content: "/about/mission" },
    ],
    links: [{ rel: "canonical", href: "/about/mission" }],
  }),
  component: Mission,
});

function Mission() {
  const { content } = useSiteContent();
  const missionData = content.about.mission;

  return (
    <>
      <SEOHead
        pageKey="about-mission"
        fallbackTitle="Mission & Vision | Venu Consultants"
        fallbackDescription="Our mission to satisfy clients with unparalleled engineering services and our vision to become an internationally recognised consultancy."
        fallbackKeywords="venu consultants mission, engineering vision, core engineering values"
      />
      <PageHero
        eyebrow={missionData.eyebrow}
        title={<>{missionData.title}</>}
        intro={missionData.intro}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Mission & Vision" }]}
      />
      <section className="border-b border-border">
        <div className="container-wide grid gap-px bg-border py-0 lg:grid-cols-2">
          <div className="bg-background p-10 lg:p-16">
            <p className="eyebrow">Mission</p>
            <p className="mt-8 font-display text-3xl leading-snug lg:text-4xl">
              "{missionData.missionStatement}"
            </p>
            <p className="mt-8 text-muted-foreground">Improving people's living standards through innovation.</p>
          </div>
          <div className="bg-background p-10 lg:p-16">
            <p className="eyebrow">Vision</p>
            <p className="mt-8 font-display text-3xl leading-snug lg:text-4xl">
              "{missionData.visionStatement}"
            </p>
            <p className="mt-8 text-muted-foreground">
              Our value-driven approach and unwavering commitment to excellence consistently delivers award-winning projects on schedule and within budget. We proudly stand as one company, driven by one vision.
            </p>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
