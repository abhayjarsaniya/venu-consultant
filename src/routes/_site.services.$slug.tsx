import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, CTASection, SectionHeader } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";
import { getService, type Service } from "@/data/services";

export const Route = createFileRoute("/_site/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service, slug: params.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return {};
    return {
      meta: [
        { title: `${s.title}, Venu Consultants` },
        { name: "description", content: s.summary },
        { property: "og:title", content: `${s.title}, Venu Consultants` },
        { property: "og:description", content: s.summary },
        { property: "og:url", content: `/services/${s.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${s.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service: initialService, slug } = Route.useLoaderData() as {
    service: Service;
    slug: string;
  };
  const { content } = useSiteContent();

  // Pick up updated service from content store if modified by admin
  const s = content.services.find((x) => x.slug === slug) || initialService;
  const related = content.services
    .filter((x) => x.slug !== s.slug && x.category === s.category)
    .slice(0, 3);

  return (
    <>
      <SEOHead
        overrideSEO={{
          title: `${s.title} | Venu Consultants`,
          description: s.summary,
          keywords: `${s.title.toLowerCase()}, ${s.category.toLowerCase()} engineering, ahmedabad, gujarat, india`,
          canonical: `/services/${s.slug}`,
        }}
      />
      <PageHero
        eyebrow={s.category}
        title={s.title}
        intro={s.summary}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: s.title },
        ]}
      />

      <section className="border-b border-border">
        <div className="container-wide grid gap-16 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <p className="eyebrow">Overview</p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{s.overview}</p>

            <p className="eyebrow mt-16">Capabilities</p>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {s.capabilities.map((c) => (
                <li key={c} className="rule-gold">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-10 lg:col-span-5">
            <div className="border border-border p-8">
              <p className="eyebrow">What We Deliver</p>
              <ul className="mt-5 space-y-3 text-sm">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-3 shrink-0 bg-gold" /> {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border bg-bone/40 p-8">
              <p className="eyebrow">Industries Served</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.industries.map((i) => (
                  <li key={i} className="border border-border bg-background px-3 py-1.5 text-xs">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-border bg-bone/40">
        <div className="container-wide py-20">
          <SectionHeader eyebrow="Process" title="A disciplined path from brief to handover." />
          <div className="mt-14 grid gap-px bg-border lg:grid-cols-5">
            {s.process.map((p, i) => (
              <div key={p.step} className="bg-background p-6">
                <p className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 font-display text-xl">{p.step}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide grid gap-16 py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Benefits</p>
            <ul className="mt-6 space-y-4 text-lg">
              {s.benefits.map((b) => (
                <li key={b} className="rule-gold">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Frequently Asked</p>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {s.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg">
                    {f.q}
                    <span className="text-gold transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-b border-border bg-bone/40">
          <div className="container-wide py-16">
            <p className="eyebrow">Related Services</p>
            <div className="mt-8 grid gap-px bg-border md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/services/$slug"
                  params={{ slug: r.slug }}
                  className="bg-background p-6 transition hover:bg-foreground hover:text-background"
                >
                  <h3 className="font-display text-xl">{r.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{r.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={`Ready to start your ${s.title.toLowerCase()} project?`}
        ctaLabel="Discuss Your Project"
      />
    </>
  );
}
