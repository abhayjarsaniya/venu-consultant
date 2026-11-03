import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";
import heroImg from "@/assets/cement-plant.jpg";

export const Route = createFileRoute("/_site/clients")({
  head: () => ({
    meta: [
      { title: "Clients, Venu Consultants" },
      {
        name: "description",
        content:
          "Defence, government, public sector and industrial clients who have engaged Venu Consultants for engineering services.",
      },
      { property: "og:url", content: "/clients" },
    ],
    links: [{ rel: "canonical", href: "/clients" }],
  }),
  component: Clients,
});

function Clients() {
  const { content } = useSiteContent();
  const clientsList = content.clients;
  const sectors = Array.from(new Set(clientsList.map((c) => c.sector)));

  return (
    <>
      <SEOHead
        pageKey="clients"
        fallbackTitle="Our Clients & Credentials | Venu Consultants"
        fallbackDescription="Defence, government, public sector and industrial clients who have engaged Venu Consultants for engineering services."
        fallbackKeywords="indian army consultant, gws&sb consultant, western railway civil engineer, torrent pharma consultant"
      />
      <PageHero
        eyebrow="Clients"
        title={
          <>
            Trusted by defence,{" "}
            <span className="italic text-muted-foreground">government & industry.</span>
          </>
        }
        intro="We are honoured to work with multinational companies, departments of central and state government, defence services and leading industrial groups."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Clients" }]}
        image={heroImg}
        imageAlt="Industrial cement plant"
      />
      {sectors.map((sector) => (
        <section key={sector} className="border-b border-border">
          <div className="container-wide py-12">
            <div className="flex items-baseline gap-4">
              <span className="h-px w-16 bg-gold" />
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{sector}</p>
            </div>
            <div className="mt-8 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
              {clientsList
                .filter((c) => c.sector === sector)
                .map((c) => (
                  <div key={c.name} className="bg-background p-6">
                    <p className="font-display text-lg leading-tight">{c.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ))}
      <CTASection />
    </>
  );
}
