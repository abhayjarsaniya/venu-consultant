import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";

export const Route = createFileRoute("/_site/about/team")({
  head: () => ({
    meta: [
      { title: "Our Team, Venu Consultants" },
      { name: "description", content: "Meet the engineering, architectural and operations team behind Venu Consultants." },
      { property: "og:url", content: "/about/team" },
    ],
    links: [{ rel: "canonical", href: "/about/team" }],
  }),
  component: Team,
});

function Team() {
  const { content } = useSiteContent();
  const teamList = content.about.team.members;

  return (
    <>
      <SEOHead
        pageKey="about-team"
        fallbackTitle="Our Engineering Team | Venu Consultants"
        fallbackDescription="Meet the engineering, architectural and operations team behind Venu Consultants."
        fallbackKeywords="engineering team ahmedabad, architects, structural engineers, water process engineers"
      />
      <PageHero
        eyebrow="Our Team"
        title={<>Multi-disciplinary engineering, <span className="italic text-muted-foreground">one bench.</span></>}
        intro="Architects, structural, mechanical, electrical and hydraulic engineers, draftsmen and accountants working as a single integrated team."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Team" }]}
      />
      <section className="border-b border-border">
        <div className="container-wide py-20">
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {teamList.map((m) => (
              <article key={m.name} className="bg-background p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl leading-tight">{m.name}</h3>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                </div>
                <p className="mt-2 text-sm font-medium text-gold">{m.role}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {[m.qualification, m.experience].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection eyebrow="Careers" title="Want to join the bench?" body="We are always interested in talented engineers, architects and draftsmen." ctaLabel="See Careers" />
    </>
  );
}
