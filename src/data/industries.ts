import industrialImg from "@/assets/industrial.jpg";
import steelImg from "@/assets/steel-structure.jpg";
import cementImg from "@/assets/cement-plant.jpg";
import hospitalImg from "@/assets/hospital.jpg";
import highriseImg from "@/assets/highrise.jpg";
import bridgeImg from "@/assets/bridge.jpg";
import waterImg from "@/assets/water-treatment.jpg";
import stpImg from "@/assets/stp-aerial.jpg";
import studioImg from "@/assets/studio.jpg";
import siteImg from "@/assets/engineer-site.jpg";
import heroImg from "@/assets/hero-plant.jpg";
import teamImg from "@/assets/team-work.jpg";

export interface Industry {
  slug: string;
  name: string;
  blurb: string;
  description: string;
  highlights: string[];
  image: string;
}

export const industries: Industry[] = [
  {
    slug: "industrial-plants",
    name: "Industrial Plants",
    blurb: "Master planning and engineering for heavy and light industry.",
    description:
      "From laminate and metallurgical units to power and substations, engineered for operational reliability and future expansion.",
    highlights: [
      "Plant layouts & GA",
      "Heavy equipment foundations",
      "Pipe-rack & utilities",
      "132 kV substation civil",
    ],
    image: industrialImg,
  },
  {
    slug: "manufacturing-units",
    name: "Manufacturing Units",
    blurb: "Pre-engineered and conventional manufacturing facilities.",
    description:
      "Long-span manufacturing sheds, mezzanines and process buildings designed for production flow and worker safety.",
    highlights: [
      "PEB & conventional steel",
      "Crane gantries",
      "Mezzanine design",
      "Fire-fighting integration",
    ],
    image: steelImg,
  },
  {
    slug: "pharmaceutical-plants",
    name: "Pharmaceutical Plants",
    blurb: "GMP-grade pharma facilities including clean-room shells.",
    description:
      "Process buildings, clean rooms and utility blocks for formulation, API and biotech operations.",
    highlights: [
      "Clean-room shell design",
      "HVAC coordination",
      "Hazardous area civil",
      "Effluent treatment",
    ],
    image: hospitalImg,
  },
  {
    slug: "food-processing-industries",
    name: "Food Processing Industries",
    blurb: "Hygienic process and warehouse environments for food and beverage.",
    description:
      "Layouts and structures suited to food safety regimes, with cold-room integration and process drainage.",
    highlights: [
      "Hygiene-led layouts",
      "Cold storage shells",
      "Floor drainage",
      "Effluent management",
    ],
    image: cementImg,
  },
  {
    slug: "warehouses",
    name: "Warehouses",
    blurb: "High-volume warehousing and distribution centres.",
    description:
      "PEB and conventional warehouses with optimised column grids, racking compatibility and dock-level engineering.",
    highlights: [
      "PEB & hybrid roofs",
      "Racking-aligned grids",
      "Dock-leveller civil",
      "Yard drainage",
    ],
    image: steelImg,
  },
  {
    slug: "commercial-buildings",
    name: "Commercial Buildings",
    blurb: "Offices, retail and mixed-use developments.",
    description:
      "Architectural and structural design for premium commercial assets with leasable-area efficiency and façade integration.",
    highlights: [
      "Column-free spans",
      "Façade engineering",
      "MEP coordination",
      "Approval delivery",
    ],
    image: highriseImg,
  },
  {
    slug: "hospitals",
    name: "Hospitals",
    blurb: "Healthcare buildings engineered for resilience and flexibility.",
    description:
      "Hospitals and diagnostic centres with column grids and services tailored to NABH-aligned operations.",
    highlights: [
      "NABH-aligned layouts",
      "Vibration-sensitive areas",
      "Medical gas civil",
      "Emergency power civil",
    ],
    image: hospitalImg,
  },
  {
    slug: "hotels",
    name: "Hotels",
    blurb: "Hospitality structures from boutique to high-rise.",
    description:
      "Hotels engineered for guest comfort, MEP densities and operational flexibility, with basement STP integration.",
    highlights: [
      "Slender structural systems",
      "Basement STPs",
      "Façade & podium",
      "Service-coordinated cores",
    ],
    image: highriseImg,
  },
  {
    slug: "high-rise-buildings",
    name: "High Rise Buildings",
    blurb: "Tall residential and commercial towers.",
    description:
      "Lateral system optimisation, sequential construction modelling and value-engineered foundations.",
    highlights: [
      "Outrigger / shear-wall systems",
      "Sequential analysis",
      "Pile-raft foundations",
      "Transfer floors",
    ],
    image: highriseImg,
  },
  {
    slug: "bridges",
    name: "Bridges",
    blurb: "Road and pedestrian bridges and grade-separators.",
    description:
      "Conventional and pre-stressed bridge structures with hydrology, foundation and superstructure design.",
    highlights: [
      "RCC & PSC superstructure",
      "Well & pile foundations",
      "Hydrological analysis",
      "IRC-compliant detailing",
    ],
    image: bridgeImg,
  },
  {
    slug: "water-infrastructure",
    name: "Water Infrastructure",
    blurb: "Water and wastewater treatment, networks and reservoirs.",
    description:
      "Treatment plants, transmission mains, distribution networks, ESRs and underground reservoirs across India.",
    highlights: ["WTP & STP design", "Bulk water mains", "ESR & UGR design", "SCADA architecture"],
    image: waterImg,
  },
  {
    slug: "power-plants",
    name: "Power Plants",
    blurb: "Civil and structural engineering for power generation.",
    description:
      "Boiler, TG, BOP and yard structures for thermal and process power, including formwork engineering.",
    highlights: [
      "TG & BOP foundations",
      "Stack & chimney support",
      "Formwork engineering",
      "Coal & ash handling civil",
    ],
    image: cementImg,
  },
  {
    slug: "electrical-substations",
    name: "Electrical Substations",
    blurb: "Up to 132 kV substation civil and structural.",
    description:
      "Switchyard civil, control building, foundations for transformers, reactors and gantries.",
    highlights: [
      "Switchyard civil",
      "Transformer foundations",
      "Control room buildings",
      "Cable trench systems",
    ],
    image: steelImg,
  },
  {
    slug: "government-projects",
    name: "Government Projects",
    blurb: "Defence, urban local body and state government projects.",
    description:
      "Long-standing engagements with Indian Army, Navy, Air Force, Coast Guard and multiple state water and urban authorities.",
    highlights: [
      "Defence sector projects",
      "ULB & state authorities",
      "Approval-ready documentation",
      "Audit-grade deliverables",
    ],
    image: siteImg,
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);

export const industryGalleryImages = [stpImg, studioImg, heroImg, teamImg];
