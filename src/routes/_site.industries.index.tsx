import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";
import heroImg from "@/assets/industrial.jpg";

export const Route = createFileRoute("/_site/industries/")({
  head: () => ({
    meta: [
      { title: "Industries We Serve, Venu Consultants" },
      {
        name: "description",
        content:
          "Sector expertise across industrial plants, pharma, food, warehouses, commercial, hospitality, healthcare, high-rise, infrastructure, power and government.",
      },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  const { content } = useSiteContent();
  const industriesList = content.industries;

  return (
    <>
      <SEOHead
        pageKey="industries"
        fallbackTitle="Industries We Serve | Venu Consultants"
        fallbackDescription="Sector expertise across industrial plants, pharma, food, warehouses, commercial, hospitality, healthcare, high-rise, infrastructure, power and government."
        fallbackKeywords="industrial plant engineering, pharma plant design, high rise structural engineering, hospital civil engineering"
      />
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Sector expertise <span className="italic text-muted-foreground">that compounds.</span>
          </>
        }
        intro="Eighteen years of engagements across India have given us deep knowledge of the operational, statutory and constructability nuances of each industry we serve."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Industries" }]}
        image={heroImg}
        imageAlt="Industrial pipe rack and process structures"
      />
      <section className="border-b border-border">
        <div className="container-wide py-16">
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {industriesList.map((i) => (
              <Link
                key={i.slug}
                to="/industries/$slug"
                params={{ slug: i.slug }}
                className="group relative block overflow-hidden bg-background"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={i.image}
                    alt={i.name}
                    loading="lazy"
                    width={1600}
                    height={1100}
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl leading-tight">{i.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{i.blurb}</p>
                  <p className="mt-6 text-xs uppercase tracking-[0.18em] text-gold">
                    Explore sector →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
