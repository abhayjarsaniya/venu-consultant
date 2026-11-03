import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { getIndustry, industries, type Industry } from "@/data/industries";
import { services } from "@/data/services";

export const Route = createFileRoute("/_site/industries/$slug")({
  loader: ({ params }) => {
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    const i = loaderData?.industry;
    if (!i) return {};
    return {
      meta: [
        { title: `${i.name}, Engineering Services | Venu Consultants` },
        { name: "description", content: i.description },
        { property: "og:url", content: `/industries/${i.slug}` },
      ],
      links: [{ rel: "canonical", href: `/industries/${i.slug}` }],
    };
  },
  component: IndustryDetail,
});

function IndustryDetail() {
  const { industry: i } = Route.useLoaderData() as { industry: Industry };
  const relatedServices = services.filter((s) => s.industries.includes(i.name)).slice(0, 6);
  const otherIndustries = industries.filter((x) => x.slug !== i.slug).slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow="Industry"
        title={i.name}
        intro={i.description}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Industries", to: "/industries" },
          { label: i.name },
        ]}
      />

      <section className="border-b border-border">
        <div className="container-wide grid gap-16 py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Our Expertise</p>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {i.highlights.map((h) => (
                <li key={h} className="rule-gold">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-border p-8">
              <p className="eyebrow">Related Services</p>
              {relatedServices.length === 0 ? (
                <p className="mt-5 text-sm text-muted-foreground">
                  All our service lines apply to this sector.
                </p>
              ) : (
                <ul className="mt-5 divide-y divide-border">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="flex items-center justify-between py-3 text-sm transition hover:text-gold"
                      >
                        {s.title}
                        <span className="text-gold">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-border bg-bone/40">
        <div className="container-wide py-16">
          <p className="eyebrow">Other Industries</p>
          <div className="mt-8 grid gap-px bg-border md:grid-cols-3 lg:grid-cols-6">
            {otherIndustries.map((o) => (
              <Link
                key={o.slug}
                to="/industries/$slug"
                params={{ slug: o.slug }}
                className="bg-background p-5 text-sm transition hover:bg-foreground hover:text-background"
              >
                {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
