import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { projectCategories } from "@/data/clients";
import waterImg from "@/assets/water-treatment.jpg";
import stpImg from "@/assets/stp-aerial.jpg";
import industrialImg from "@/assets/industrial.jpg";
import highriseImg from "@/assets/highrise.jpg";
import hospitalImg from "@/assets/hospital.jpg";
import bridgeImg from "@/assets/bridge.jpg";
import steelImg from "@/assets/steel-structure.jpg";
import cementImg from "@/assets/cement-plant.jpg";

const categoryHero: Record<string, string> = {
  "water-treatment": waterImg,
  "sewage-treatment": stpImg,
  industrial: industrialImg,
  "high-rise": highriseImg,
  commercial: hospitalImg,
  infrastructure: bridgeImg,
};

const projectImages = [waterImg, stpImg, industrialImg, highriseImg, hospitalImg, bridgeImg, steelImg, cementImg];

const sampleProjects: Record<string, { name: string; location: string; scope: string }[]> = {
  "water-treatment": [
    { name: "Surface Water Treatment Plant", location: "Karnataka", scope: "Conventional WTP for Karnataka Urban Water Supply & Drainage Board." },
    { name: "Packaged WTP, Defence Cantonment", location: "Gujarat", scope: "Packaged treatment with disinfection for Indian Army installation." },
    { name: "UF + RO Industrial WTP", location: "Telangana", scope: "Process water plant for pharmaceutical manufacturing." },
    { name: "Bulk Treatment & Pumping", location: "Odisha", scope: "Raw water intake, clarification, filtration and clear-water pumping." },
  ],
  "sewage-treatment": [
    { name: "Municipal STP", location: "Gujarat", scope: "SBR-based STP for Gujarat Water Supply & Sewerage Board." },
    { name: "Industrial ETP + STP", location: "Telangana", scope: "Combined treatment for pharmaceutical plant." },
    { name: "Basement STP, Hospitality", location: "Ahmedabad", scope: "Compact MBBR STP integrated into hotel basement." },
    { name: "Township STP", location: "Karnataka", scope: "MBR-based STP for high-rise township development." },
  ],
  industrial: [
    { name: "Laminate Manufacturing Plant", location: "Gujarat", scope: "Master planning, structural and utility design." },
    { name: "Pharmaceutical Plant Expansion", location: "Telangana", scope: "Process buildings, utilities and effluent treatment civil." },
    { name: "Food Processing Facility", location: "Gujarat", scope: "Hygiene-led layout, structures and drainage." },
    { name: "132 kV Substation", location: "Gujarat", scope: "Civil and structural design for GSECL substation." },
  ],
  "high-rise": [
    { name: "Residential Tower", location: "Ahmedabad", scope: "Structural design including pile-raft foundation and shear-wall system." },
    { name: "Mixed-use Tower", location: "Hyderabad (GHMC)", scope: "Tall mixed-use development with podium and basements." },
    { name: "Hotel Tower", location: "Gujarat", scope: "Slender tower with basement STP and podium integration." },
  ],
  commercial: [
    { name: "Office Park", location: "Ahmedabad", scope: "Column-free office floors with façade engineering." },
    { name: "Hospital Block", location: "Gujarat", scope: "NABH-aligned hospital structure and services civil." },
    { name: "Retail Complex", location: "Gujarat", scope: "Long-span retail mall with basement parking." },
  ],
  infrastructure: [
    { name: "Bulk Water Transmission Main", location: "Karnataka", scope: "Hydraulic design and pipe profile for long-distance MS main." },
    { name: "Water Supply Network", location: "Gujarat", scope: "DMA-based 24×7 distribution network design." },
    { name: "Sewerage Network & Lift Stations", location: "Odisha", scope: "Gravity network with packaged lift stations." },
    { name: "Area Drainage", location: "Gujarat (GIDC)", scope: "Industrial area drainage design with detention." },
  ],
};

export const Route = createFileRoute("/_site/projects/$category")({
  loader: ({ params }) => {
    const cat = projectCategories.find((c) => c.slug === params.category);
    if (!cat) throw notFound();
    return { cat, items: sampleProjects[params.category] ?? [] };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.cat;
    if (!c) return {};
    return {
      meta: [
        { title: `${c.name}, Venu Consultants` },
        { name: "description", content: c.blurb },
        { property: "og:url", content: `/projects/${c.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${c.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData() as { cat: { slug: string; name: string; count: string; blurb: string }; items: { name: string; location: string; scope: string }[] };
  return (
    <>
      <PageHero
        eyebrow={`${cat.count} delivered`}
        title={cat.name}
        intro={cat.blurb}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Projects", to: "/projects" }, { label: cat.name }]}
        image={categoryHero[cat.slug] ?? industrialImg}
        imageAlt={cat.name}
      />
      <section className="border-b border-border">
        <div className="container-wide py-16">
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {items.map((p, idx) => (
              <article key={p.name} className="group flex flex-col bg-background">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={projectImages[idx % projectImages.length]} alt={p.name} loading="lazy" width={1600} height={1100} className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <div className="p-8">
                  <p className="eyebrow">{p.location}</p>
                  <h3 className="mt-5 font-display text-2xl leading-tight">{p.name}</h3>
                  <p className="mt-4 text-sm text-muted-foreground">{p.scope}</p>
                </div>
              </article>
            ))}
            {items.length === 0 && (
              <div className="col-span-full bg-background p-10">
                <p className="text-muted-foreground">Project case studies for this category are being curated. Please contact us for references.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="border-b border-border bg-bone/40">
        <div className="container-wide py-12">
          <p className="eyebrow">Other Categories</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {projectCategories.filter((c) => c.slug !== cat.slug).map((c) => (
              <Link key={c.slug} to="/projects/$category" params={{ category: c.slug }} className="border border-border bg-background px-4 py-2 text-sm transition hover:bg-foreground hover:text-background">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
