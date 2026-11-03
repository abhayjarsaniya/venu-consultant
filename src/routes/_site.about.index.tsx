import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection, SectionHeader } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";
import teamImg from "@/assets/team-work.jpg";
import heroImg from "@/assets/studio.jpg";

export const Route = createFileRoute("/_site/about/")({
  head: () => ({
    meta: [
      { title: "About Venu Consultants, Company Overview" },
      { name: "description", content: "Learn about Venu Consultants, an Ahmedabad-based engineering consultancy firm delivering nationwide projects since 2006." },
      { property: "og:title", content: "About, Venu Consultants" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutIndex,
});

const values = [
  { t: "Excellence", d: "Uncompromising technical and craft standards on every drawing we issue." },
  { t: "Innovation", d: "Practical, inventive solutions that meet the client brief and the site reality." },
  { t: "Responsibility", d: "Engineers are accountable, professionally, technically and morally." },
  { t: "Quality", d: "Independent cross-checking and a controlled documentation system." },
  { t: "Integrity", d: "We say what we will deliver and we deliver what we say." },
  { t: "Client Satisfaction", d: "Long relationships built on responsiveness and value." },
];

function AboutIndex() {
  const { content } = useSiteContent();
  const overview = content.about.overview;
  const statsList = content.stats;

  return (
    <>
      <SEOHead
        pageKey="about"
        fallbackTitle="About Venu Consultants | Engineering Consultancy"
        fallbackDescription="Learn about Venu Consultants, an Ahmedabad-based engineering consultancy firm delivering nationwide projects since 2006."
        fallbackKeywords="about venu consultants, keyur ladani, structural consultants ahmedabad, engineering firm gujarat"
      />
      <PageHero
        eyebrow={overview.eyebrow}
        title={<>{overview.title}</>}
        intro={overview.intro}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
        image={heroImg}
        imageAlt="Venu Consultants engineering studio"
      />

      <section className="border-b border-border">
        <div className="container-wide grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="space-y-6 text-lg text-muted-foreground">
            {overview.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
          <div>
            <img src={teamImg} alt="Engineers reviewing drawings" loading="lazy" width={1600} height={1100} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bone/40">
        <div className="container-wide py-20">
          <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-5">
            {statsList.map((s) => (
              <div key={s.label} className="bg-background p-8">
                <p className="font-display text-4xl">{s.value}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide py-24">
          <SectionHeader eyebrow="Our Values" title="Six principles that guide every engagement." />
          <div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.t} className="bg-background p-8">
                <p className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 font-display text-2xl">{v.t}</h3>
                <p className="mt-3 text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
