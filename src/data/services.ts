export interface Service {
  slug: string;
  title: string;
  category: "Design" | "Management" | "Infrastructure" | "Specialised";
  summary: string;
  overview: string;
  capabilities: string[];
  deliverables: string[];
  industries: string[];
  process: { step: string; detail: string }[];
  benefits: string[];
  faqs: { q: string; a: string }[];
}

const baseProcess = [
  {
    step: "Discovery",
    detail:
      "Site walk-through, stakeholder briefing and brief consolidation against statutory and operational requirements.",
  },
  {
    step: "Analysis",
    detail:
      "Load, hydraulic, geotechnical and code analysis using STAAD Pro, ETABS, SAFE, SAP2000 and proprietary tools.",
  },
  {
    step: "Design",
    detail:
      "Concept to detailed engineering with value-engineered alternatives and constructability reviews.",
  },
  {
    step: "Documentation",
    detail:
      "Tender drawings, BBS, BOQ and specifications cross-checked by a second engineer for ambiguity and error.",
  },
  {
    step: "Execution Support",
    detail:
      "Site reviews, RFI response, shop-drawing approvals and as-built verification through commissioning.",
  },
];

const make = (s: Omit<Service, "process"> & { process?: Service["process"] }): Service => ({
  process: baseProcess,
  ...s,
});

export const services: Service[] = [
  make({
    slug: "architectural-engineering",
    title: "Architectural Engineering",
    category: "Design",
    summary:
      "Concept, planning and architectural design for residential, industrial, educational and commercial buildings.",
    overview:
      "Our COA-registered architectural studio integrates planning, façade, services coordination and interior design into a single, accountable workflow. Projects are delivered with strict adherence to AMC, AUDA, GHMC and applicable municipal byelaws.",
    capabilities: [
      "Master planning and site layout",
      "Architectural concept and schematic design",
      "Permit and statutory approval drawings",
      "Façade, envelope and interior design",
      "MEP coordination and services routing",
      "3D visualisation and walkthroughs",
    ],
    deliverables: [
      "Concept Design Report",
      "Approval Drawings",
      "GFC Drawing Set",
      "Material & Finish Schedules",
      "Site Supervision Reports",
    ],
    industries: [
      "Commercial Buildings",
      "Industrial Plants",
      "Hotels",
      "Hospitals",
      "High Rise Buildings",
    ],
    benefits: [
      "Optimised carpet area",
      "Faster statutory approvals",
      "Coordinated MEP routing",
      "Lifecycle cost efficiency",
    ],
    faqs: [
      {
        q: "Do you handle municipal approvals?",
        a: "Yes, our principals are approved with AMC, AUDA and GHMC, and we prepare all submission drawings in their required format.",
      },
      {
        q: "Can you work with our existing architect?",
        a: "We frequently act in a structural/services capacity alongside architectural consultants and contractors.",
      },
      {
        q: "What software do you use for drawings?",
        a: "AutoCAD for production, with Revit-ready CAD standards and BIM coordination on request.",
      },
      {
        q: "Do you provide interior design?",
        a: "Yes, including layout, joinery details, finishes and lighting plans.",
      },
      {
        q: "How are revisions managed?",
        a: "All drawings carry revision clouds and a controlled revision register; superseded sheets are archived.",
      },
    ],
  }),
  make({
    slug: "civil-structural-engineering",
    title: "Civil & Structural Engineering",
    category: "Design",
    summary:
      "RCC, steel and composite structural design from foundation to roof for industrial, commercial and high-rise structures.",
    overview:
      "Eighteen years of structural practice across more than three hundred projects, from single-storey warehouses to high-rise residential towers, underpinned by independent cross-checking and IS, ACI and BS code compliance.",
    capabilities: [
      "RCC, steel and composite design",
      "Foundation and pile cap design",
      "Seismic and wind analysis",
      "Long-span and pre-engineered structures",
      "Retaining and water-retaining structures",
      "Peer review and proof-checking",
    ],
    deliverables: [
      "Structural Calculations",
      "GFC Drawings",
      "Bar Bending Schedules",
      "Steel Fabrication Drawings",
      "Method Statements",
    ],
    industries: ["Industrial Plants", "High Rise Buildings", "Hospitals", "Warehouses", "Bridges"],
    benefits: [
      "Optimised steel & concrete consumption",
      "Constructable details",
      "Faster on-site execution",
      "Independent cross-check",
    ],
    faqs: [
      {
        q: "Which codes do you design to?",
        a: "Primarily IS codes; ACI 318, BS 8110 and Eurocode where the project demands.",
      },
      {
        q: "Do you provide proof-checking?",
        a: "Yes, we undertake third-party proof checks for industrial and government projects.",
      },
      {
        q: "Can you handle seismic retrofitting?",
        a: "Yes, including condition assessment, NDT interpretation and retrofit design.",
      },
      {
        q: "Do you cover steel detailing?",
        a: "Connection design and fabrication drawings are part of our standard scope.",
      },
      {
        q: "How is design quality assured?",
        a: "Every drawing is independently checked by a second engineer and signed off by the principal.",
      },
    ],
  }),
  make({
    slug: "environmental-engineering",
    title: "Environmental Engineering",
    category: "Design",
    summary:
      "Water, wastewater, effluent and environmental engineering solutions for industry and urban infrastructure.",
    overview:
      "An integrated environmental practice covering process design, hydraulics, mechanical and electrical packages, instrumentation and commissioning for water, sewage and effluent treatment.",
    capabilities: [
      "Process selection and PFD / P&ID",
      "Hydraulic modelling and pipe network design",
      "Mechanical and equipment sizing",
      "Electrical, control and instrumentation",
      "Compliance with CPCB / SPCB norms",
      "Commissioning and performance testing",
    ],
    deliverables: [
      "Process Design Report",
      "P&ID and PFD",
      "Civil & Mechanical GFC",
      "O&M Manuals",
      "Commissioning Reports",
    ],
    industries: [
      "Pharmaceutical Plants",
      "Food Processing Industries",
      "Water Infrastructure",
      "Government Projects",
    ],
    benefits: [
      "Lower power consumption",
      "Reliable effluent quality",
      "Statutory compliance",
      "Lower lifecycle O&M cost",
    ],
    faqs: [
      {
        q: "Do you design ZLD systems?",
        a: "Yes, with MEE, ATFD and RO integration tailored to the effluent characteristics.",
      },
      {
        q: "Can you handle commissioning?",
        a: "Our team has on-site installation and commissioning experience for over 25 plants.",
      },
      {
        q: "Do you work with CPCB norms?",
        a: "All discharge designs target CPCB / SPCB norms for the respective category.",
      },
      {
        q: "Do you provide O&M training?",
        a: "Yes, including operator training and SOPs at handover.",
      },
      {
        q: "Can you audit existing plants?",
        a: "We undertake performance audits and de-bottlenecking studies.",
      },
    ],
  }),
  make({
    slug: "water-treatment-plant-design",
    title: "Water Treatment Plant Design",
    category: "Infrastructure",
    summary:
      "Full-package design for surface and ground water treatment plants, clariflocculator to disinfection.",
    overview:
      "Over 25 water and wastewater plants designed across India, including raw water intake, conventional and packaged treatment, UF/RO, storage and pumping systems.",
    capabilities: [
      "Conventional and packaged WTPs",
      "Clariflocculator and tube settler design",
      "Filtration: rapid sand, UF, RO",
      "Disinfection: chlorination, UV, ozone",
      "Clear water reservoirs and pumping",
      "SCADA and instrumentation",
    ],
    deliverables: [
      "Process Design Basis",
      "Hydraulic Profile",
      "Civil & Mechanical GFC",
      "Equipment Specifications",
      "Commissioning Protocols",
    ],
    industries: ["Water Infrastructure", "Government Projects", "Industrial Plants"],
    benefits: [
      "Low specific energy",
      "Consistent treated water quality",
      "Scalable in modules",
      "Reduced footprint",
    ],
    faqs: [
      {
        q: "What capacities have you designed?",
        a: "From 0.5 MLD packaged units to plants exceeding 100 MLD.",
      },
      {
        q: "Do you design intake structures?",
        a: "Yes, river intake wells, jack-wells and submersible intake systems.",
      },
      {
        q: "Can you integrate SCADA?",
        a: "Full I&C and SCADA architecture is part of our standard scope.",
      },
      {
        q: "Do you handle approvals?",
        a: "We prepare submission documents for state water supply boards and pollution control authorities.",
      },
      {
        q: "What about lifecycle costing?",
        a: "Each option study includes CAPEX, OPEX and life-cycle cost comparison.",
      },
    ],
  }),
  make({
    slug: "sewage-treatment-plant-design",
    title: "Sewage Treatment Plant Design",
    category: "Infrastructure",
    summary:
      "ASP, SBR, MBBR and MBR sewage treatment plants for municipal, industrial and township applications.",
    overview:
      "Process selection, civil-mechanical-electrical engineering and commissioning support for sewage treatment plants designed against CPCB norms.",
    capabilities: [
      "ASP, SBR, MBBR, MBR processes",
      "Tertiary treatment and reuse",
      "Sludge handling and dewatering",
      "Odour control and ventilation",
      "Effluent reuse and recycle systems",
      "Compact and underground STPs",
    ],
    deliverables: [
      "Process Basis & Mass Balance",
      "Hydraulic Profile",
      "Civil & Mechanical GFC",
      "Electrical & I&C Drawings",
      "O&M Manual",
    ],
    industries: ["Water Infrastructure", "Commercial Buildings", "Hospitals", "Hotels"],
    benefits: [
      "Compliance with CPCB norms",
      "Low odour & noise",
      "Energy-efficient aeration",
      "Compact footprint",
    ],
    faqs: [
      {
        q: "Which STP process is best?",
        a: "We base process selection on flow, load, footprint, power and reuse requirements.",
      },
      {
        q: "Can STPs be installed in basements?",
        a: "Yes, we design underground and compact STPs for buildings and hotels.",
      },
      {
        q: "Do you cover sludge management?",
        a: "Sludge thickening, dewatering and disposal pathways are part of design.",
      },
      {
        q: "Is treated water reusable?",
        a: "With tertiary treatment, water is suitable for flushing, cooling and gardening.",
      },
      {
        q: "Do you support commissioning?",
        a: "Yes, start-up, performance verification and operator training.",
      },
    ],
  }),
  make({
    slug: "industrial-planning-design",
    title: "Industrial Planning & Design",
    category: "Design",
    summary:
      "Master planning, structural and services design for industrial plants and manufacturing facilities.",
    overview:
      "Plant layouts, structural envelopes and utility planning for laminate, pharmaceutical, food, metallurgical and warehouse projects across India.",
    capabilities: [
      "Plant master planning",
      "Process building and utility design",
      "Heavy equipment foundations",
      "Pipe-rack and trestle design",
      "Substation and switchyard civil",
      "Fire-fighting and yard hydraulics",
    ],
    deliverables: [
      "Plant Layout",
      "GA Drawings",
      "Structural & Civil GFC",
      "Foundation Drawings",
      "BBS and BOQ",
    ],
    industries: [
      "Manufacturing Units",
      "Pharmaceutical Plants",
      "Food Processing Industries",
      "Power Plants",
      "Electrical Substations",
    ],
    benefits: [
      "Optimised plot utilisation",
      "Future expansion built-in",
      "Lower steel tonnage",
      "Faster commissioning",
    ],
    faqs: [
      {
        q: "Do you design clean-room facilities?",
        a: "Yes, with pharma-grade finishes and HVAC coordination.",
      },
      {
        q: "Can you handle EPC packages?",
        a: "We act as design consultant to EPC contractors and turnkey vendors.",
      },
      {
        q: "What about brownfield expansions?",
        a: "Existing-condition surveys and tie-in studies are routine for us.",
      },
      {
        q: "Do you design substations?",
        a: "Up to 132 kV substation civil and structural design.",
      },
      { q: "How is HSE addressed?", a: "Layouts follow OISD, NBC and statutory fire norms." },
    ],
  }),
  make({
    slug: "project-management",
    title: "Project Management Services",
    category: "Management",
    summary:
      "End-to-end project management from concept through commissioning with cost, time and quality control.",
    overview:
      "PMC engagements covering scope, schedule, cost, quality, safety and contracts, keeping projects on programme and within budget.",
    capabilities: [
      "Project planning and scheduling",
      "Cost control and forecasting",
      "Procurement and contract management",
      "Risk management",
      "HSE oversight",
      "MIS and stakeholder reporting",
    ],
    deliverables: [
      "Project Execution Plan",
      "Master Schedule",
      "Cost Reports",
      "Risk Register",
      "Monthly MIS",
    ],
    industries: [
      "Industrial Plants",
      "Water Infrastructure",
      "Commercial Buildings",
      "Government Projects",
    ],
    benefits: [
      "Predictable delivery",
      "Lower change-order leakage",
      "Transparent reporting",
      "Single point accountability",
    ],
    faqs: [
      {
        q: "What is your PMC fee model?",
        a: "Lump-sum, percentage of project cost or man-month, selected to suit the engagement.",
      },
      { q: "Do you use Primavera?", a: "Yes, Primavera P6 and MS Project for scheduling." },
      {
        q: "Can you manage multiple sites?",
        a: "Yes, with regional coordinators and a central PMO.",
      },
      {
        q: "Do you cover safety audits?",
        a: "Independent HSE audits are part of standard PMC scope.",
      },
      { q: "What MIS frequency?", a: "Weekly site reports and monthly executive dashboards." },
    ],
  }),
  make({
    slug: "construction-supervision",
    title: "Construction Supervision",
    category: "Management",
    summary: "Continuous technical supervision at site for quality assurance and progress control.",
    overview:
      "Resident engineering teams ensuring works are executed to drawing, specification and code, with proactive issue resolution and documented quality records.",
    capabilities: [
      "Resident site engineering",
      "Drawing and specification compliance",
      "Material and workmanship inspection",
      "Progress monitoring",
      "Snag and de-snag management",
      "As-built documentation",
    ],
    deliverables: [
      "Daily / Weekly Site Reports",
      "Inspection Records",
      "NCRs and Closure",
      "Test Certificates",
      "As-Built Drawings",
    ],
    industries: ["Industrial Plants", "Commercial Buildings", "Water Infrastructure"],
    benefits: [
      "Right-first-time execution",
      "Documented quality trail",
      "Lower rework",
      "Faster handover",
    ],
    faqs: [
      {
        q: "Do you provide resident engineers?",
        a: "Yes, discipline-specific resident engineers for the project duration.",
      },
      {
        q: "How are NCRs managed?",
        a: "Issued, tracked and closed via a controlled register shared with the client.",
      },
      {
        q: "What inspection frequency?",
        a: "Critical activities are 100% inspected; routine activities sampled per QAP.",
      },
      {
        q: "Do you certify contractor bills?",
        a: "Yes, measurement, joint measurement and bill certification are within scope.",
      },
      {
        q: "Will you witness tests?",
        a: "All factory and site acceptance tests are witnessed and reported.",
      },
    ],
  }),
  make({
    slug: "quality-assurance",
    title: "Quality Assurance & Progress Control",
    category: "Management",
    summary:
      "QA / QC systems, inspection regimes and progress reporting aligned with international standards.",
    overview:
      "Independent quality assurance and progress monitoring with documented inspection plans, test witnessing and S-curve based progress reporting.",
    capabilities: [
      "QAP and ITP preparation",
      "Vendor audits and FAT/SAT",
      "Material and workmanship testing",
      "Earned-value progress control",
      "Document control",
      "Lessons-learned reporting",
    ],
    deliverables: [
      "Quality Assurance Plan",
      "Inspection Test Plans",
      "Audit Reports",
      "Earned-Value Dashboards",
      "Final Quality Dossier",
    ],
    industries: ["Industrial Plants", "Water Infrastructure", "Government Projects"],
    benefits: [
      "Independent assurance",
      "Reduced defects",
      "Audit-ready records",
      "Predictable progress",
    ],
    faqs: [
      {
        q: "Do you do vendor audits?",
        a: "Yes, pre-qualification and ongoing audits for critical suppliers.",
      },
      { q: "Which QMS framework?", a: "ISO 9001 aligned, customised to the project requirements." },
      { q: "Can you use client templates?", a: "Yes, all documentation can adopt client formats." },
      { q: "Do you handle FAT abroad?", a: "Yes, international FAT witnessing on request." },
      { q: "How is progress measured?", a: "Earned value with weight-factored activity progress." },
    ],
  }),
  make({
    slug: "design-management",
    title: "Design Management",
    category: "Management",
    summary:
      "Coordinating multi-discipline design teams to deliver coordinated, constructable and complete information.",
    overview:
      "We integrate architectural, structural, MEP and specialist consultants, managing the design programme, RFI flow and clash resolution from concept to GFC.",
    capabilities: [
      "Design programme management",
      "Multi-discipline coordination",
      "Clash detection and resolution",
      "Information delivery management",
      "Vendor drawing review",
      "Change management",
    ],
    deliverables: [
      "Design Programme",
      "Design Coordination Reports",
      "RFI Register",
      "Clash Reports",
      "Design Change Log",
    ],
    industries: ["Industrial Plants", "High Rise Buildings", "Hospitals"],
    benefits: [
      "Lower clashes on site",
      "Faster information flow",
      "Single source of truth",
      "Tighter cost control",
    ],
    faqs: [
      { q: "Do you use BIM?", a: "BIM-ready CAD with optional Revit coordination on request." },
      {
        q: "Who chairs design reviews?",
        a: "Our design manager, with documented minutes and action tracking.",
      },
      {
        q: "Do you manage vendor drawings?",
        a: "Yes, full review, comment and approval workflow.",
      },
      {
        q: "How is change controlled?",
        a: "Through a logged change request and impact-assessment process.",
      },
      {
        q: "What about specialist consultants?",
        a: "We onboard and coordinate façade, vertical transportation, acoustic and other specialists.",
      },
    ],
  }),
  make({
    slug: "contract-administration",
    title: "Contract Administration",
    category: "Management",
    summary:
      "Pre- and post-contract administration including tendering, evaluation, variations and final accounts.",
    overview:
      "Contract documentation and administration across FIDIC, government and bespoke contract forms, protecting the client's commercial position throughout execution.",
    capabilities: [
      "Tender documentation",
      "Bid evaluation",
      "Contract drafting & review",
      "Variation and claim management",
      "Interim and final certification",
      "Dispute support",
    ],
    deliverables: [
      "Tender Document Set",
      "Bid Evaluation Report",
      "Variation Register",
      "Payment Certificates",
      "Final Account",
    ],
    industries: ["Government Projects", "Industrial Plants", "Water Infrastructure"],
    benefits: [
      "Risk-balanced contracts",
      "Lower claim exposure",
      "Robust audit trail",
      "Faster bill processing",
    ],
    faqs: [
      {
        q: "Are you familiar with FIDIC?",
        a: "Yes, Red, Yellow and Silver books for international and EPC projects.",
      },
      { q: "Can you draft contracts?", a: "Yes, in coordination with the client's legal team." },
      {
        q: "Do you handle claims?",
        a: "We assess, prepare and defend / negotiate claims as required.",
      },
      {
        q: "What about LD calculations?",
        a: "Liquidated damages and EOT analysis are part of scope.",
      },
      {
        q: "Do you certify final accounts?",
        a: "Yes, joint final measurement and final account certification.",
      },
    ],
  }),
  make({
    slug: "value-engineering",
    title: "Value Engineering",
    category: "Specialised",
    summary:
      "Function-based value engineering to reduce capital and lifecycle cost without compromising quality.",
    overview:
      "Structured VE workshops applied at concept, schematic and tender stages to extract measurable cost and time savings.",
    capabilities: [
      "Function analysis",
      "Alternative concept generation",
      "Whole-life cost modelling",
      "Constructability review",
      "Material substitution studies",
      "Implementation tracking",
    ],
    deliverables: [
      "VE Workshop Report",
      "Option Evaluation Matrix",
      "Lifecycle Cost Model",
      "Implementation Plan",
    ],
    industries: ["Industrial Plants", "High Rise Buildings", "Water Infrastructure"],
    benefits: [
      "5–15% capital savings typical",
      "Improved buildability",
      "Lower lifecycle cost",
      "Documented decisions",
    ],
    faqs: [
      {
        q: "When should VE be done?",
        a: "Earliest possible, concept and schematic stages yield the highest savings.",
      },
      {
        q: "Do you guarantee savings?",
        a: "We commit to a target range agreed at engagement, subject to client decisions.",
      },
      { q: "How long is a VE workshop?", a: "Typically 2–5 days depending on project scale." },
      {
        q: "Who participates?",
        a: "Client, architect, engineers, contractor (if appointed) and end-user representatives.",
      },
      {
        q: "Is quality compromised?",
        a: "No, VE preserves function and quality while removing unnecessary cost.",
      },
    ],
  }),
  make({
    slug: "existing-structure-analysis",
    title: "Existing Structure Analysis",
    category: "Specialised",
    summary:
      "Condition assessment, load analysis and retrofit design for existing buildings and infrastructure.",
    overview:
      "Detailed study of existing structures including measurement surveys, NDT interpretation, load re-rating and retrofit/strengthening design.",
    capabilities: [
      "Measurement and as-built surveys",
      "NDT and material testing",
      "Load re-rating analysis",
      "Seismic vulnerability assessment",
      "Retrofit and strengthening design",
      "Repair specifications",
    ],
    deliverables: [
      "Condition Assessment Report",
      "Analysis Report",
      "Retrofit Drawings",
      "Method Statements",
      "Quantum & Cost Estimate",
    ],
    industries: ["Commercial Buildings", "Industrial Plants", "Bridges", "Government Projects"],
    benefits: [
      "Asset life extension",
      "Avoided rebuild cost",
      "Code compliance",
      "Documented safety",
    ],
    faqs: [
      {
        q: "Do you conduct NDT?",
        a: "We coordinate and interpret NDT through accredited laboratories.",
      },
      {
        q: "Can you handle heritage structures?",
        a: "Yes, with conservation-sensitive intervention design.",
      },
      {
        q: "What retrofit techniques?",
        a: "FRP wrapping, jacketing, section enlargement, micro-piling and base isolation.",
      },
      { q: "Do you certify safety?", a: "Yes, structural stability certificates post-retrofit." },
      {
        q: "Is rebuild ever recommended?",
        a: "When lifecycle economics favour rebuild, we say so transparently.",
      },
    ],
  }),
  make({
    slug: "formwork-design",
    title: "Formwork Design",
    category: "Specialised",
    summary:
      "Formwork and falsework design for power plants, cement plants and complex civil structures.",
    overview:
      "Engineering of conventional and proprietary formwork systems, including jump form, slip form, table form and complex shoring, for safe, fast and economical execution.",
    capabilities: [
      "Conventional and proprietary system design",
      "Jump, slip and table form",
      "Heavy shoring and falsework",
      "Sequence and cycle planning",
      "Load and stability analysis",
      "Site-specific method statements",
    ],
    deliverables: [
      "Formwork GA Drawings",
      "Component Drawings",
      "Load Calculations",
      "Method Statement",
      "Cycle Plan",
    ],
    industries: ["Power Plants", "Industrial Plants", "High Rise Buildings", "Bridges"],
    benefits: [
      "Faster cycle times",
      "Safer site operations",
      "Reduced material waste",
      "Predictable surface finish",
    ],
    faqs: [
      {
        q: "Do you design for proprietary systems?",
        a: "Yes, Doka, PERI, MFE and indigenous systems.",
      },
      {
        q: "Can you optimise cycle time?",
        a: "Cycle planning is integral to our formwork engagement.",
      },
      {
        q: "What about safety?",
        a: "All designs include stability checks, anchor design and lifting plans.",
      },
      { q: "Do you cover slip form?", a: "Yes, chimneys, silos and core walls." },
      {
        q: "Do you visit site?",
        a: "Pre-pour inspection and trouble-shooting visits are standard.",
      },
    ],
  }),
  make({
    slug: "machine-foundation-design",
    title: "Machine Foundation Design",
    category: "Specialised",
    summary:
      "Dynamic analysis and design of foundations for rotating, reciprocating and impact machinery.",
    overview:
      "Specialist design of block, frame and pile foundations for turbines, compressors, presses and crushers, with dynamic analysis to international standards.",
    capabilities: [
      "Block, frame and pile foundations",
      "Dynamic analysis (DIN 4024, ACI 351)",
      "Vibration isolation design",
      "Coupled soil-structure analysis",
      "Retrofit of existing foundations",
      "Performance monitoring specification",
    ],
    deliverables: [
      "Dynamic Analysis Report",
      "GFC Foundation Drawings",
      "Embedment & Anchor Layouts",
      "Vibration Acceptance Criteria",
    ],
    industries: ["Power Plants", "Manufacturing Units", "Industrial Plants"],
    benefits: [
      "Operational reliability",
      "Lower vibration transmission",
      "Code-compliant design",
      "Vendor-aligned details",
    ],
    faqs: [
      {
        q: "Which codes do you follow?",
        a: "IS 2974, DIN 4024 and ACI 351 depending on machine type.",
      },
      {
        q: "Do you analyse coupled effects?",
        a: "Yes, including soil-structure interaction and pile dynamics.",
      },
      {
        q: "Can you retrofit foundations?",
        a: "Yes, vibration mitigation, grouting and re-anchoring.",
      },
      {
        q: "Do you co-ordinate with OEMs?",
        a: "Vendor loads and embedments are integrated into the design.",
      },
      {
        q: "Vibration monitoring?",
        a: "We specify acceptance criteria and witness initial monitoring.",
      },
    ],
  }),
  make({
    slug: "bulk-water-transmission-pipelines",
    title: "Bulk Water Transmission Pipelines",
    category: "Infrastructure",
    summary:
      "Long-distance bulk water transmission mains, hydraulic, structural and route engineering.",
    overview:
      "End-to-end design of MS, DI and PSC bulk water mains including hydraulic modelling, surge analysis, route engineering, thrust blocks and appurtenances.",
    capabilities: [
      "Hydraulic and surge analysis",
      "Pipe material and class selection",
      "Route survey and alignment",
      "Crossings (road, rail, river)",
      "Thrust blocks and anchorage",
      "Cathodic protection",
    ],
    deliverables: [
      "Hydraulic Report",
      "Alignment Drawings",
      "Pipe Profile & BOQ",
      "Crossing Details",
      "Cathodic Protection Scheme",
    ],
    industries: ["Water Infrastructure", "Government Projects"],
    benefits: [
      "Lower pumping cost",
      "Surge-safe design",
      "Right-of-way optimisation",
      "Long asset life",
    ],
    faqs: [
      {
        q: "Do you use modelling software?",
        a: "WaterGEMS, Bentley HAMMER and proprietary tools.",
      },
      {
        q: "What pipe materials?",
        a: "MS, DI, PSC, HDPE and GRP based on hydraulics and economics.",
      },
      {
        q: "Do you handle approvals?",
        a: "Yes, RoW, forest, railway and road authority approvals.",
      },
      { q: "Surge protection?", a: "Surge vessels, vacuum valves and flywheels as required." },
      {
        q: "Length of pipelines designed?",
        a: "From kilometres to multi-stage trunk mains spanning hundreds of kilometres.",
      },
    ],
  }),
  make({
    slug: "water-supply-networks",
    title: "Water Supply Network Design",
    category: "Infrastructure",
    summary:
      "24×7 water distribution network design with hydraulic modelling, zoning and NRW reduction.",
    overview:
      "Distribution network planning and design including DMA zoning, hydraulic balancing, storage and pumping integration, and NRW management.",
    capabilities: [
      "EPANET / WaterGEMS modelling",
      "DMA zoning and pressure management",
      "Pumping and storage integration",
      "House service connection design",
      "NRW assessment",
      "SCADA architecture",
    ],
    deliverables: [
      "Hydraulic Model & Report",
      "Network GA Drawings",
      "Pipe Schedule & BOQ",
      "Pump House Drawings",
    ],
    industries: ["Water Infrastructure", "Government Projects"],
    benefits: ["24×7 supply capability", "Reduced NRW", "Equitable pressure", "Lower energy cost"],
    faqs: [
      {
        q: "Can you achieve 24×7?",
        a: "Yes, through DMA zoning, network balancing and pressure management.",
      },
      {
        q: "How is NRW addressed?",
        a: "Through metering, DMA isolation and leak survey strategy.",
      },
      { q: "Do you design SCADA?", a: "Full architecture and instrumentation specification." },
      { q: "What about house connections?", a: "Standard details including meters and ferrules." },
      { q: "Can you model demand growth?", a: "Yes, staged designs to 15–30 year horizons." },
    ],
  }),
  make({
    slug: "sewage-networks",
    title: "Sewage Network Design",
    category: "Infrastructure",
    summary: "Gravity and rising main sewage collection networks with pumping stations.",
    overview:
      "Sewerage network design including catchment delineation, gravity profile, manholes, lift stations and connection to STPs.",
    capabilities: [
      "Catchment analysis",
      "Gravity profile design",
      "Pumping station design",
      "Manholes and structures",
      "Network modelling (SewerGEMS)",
      "Rehabilitation studies",
    ],
    deliverables: [
      "Network Drawings",
      "Hydraulic Profile",
      "Pumping Station GFC",
      "BOQ & Specifications",
    ],
    industries: ["Water Infrastructure", "Government Projects", "Commercial Buildings"],
    benefits: [
      "Reliable conveyance",
      "Reduced flooding risk",
      "Future-proof capacity",
      "Low O&M cost",
    ],
    faqs: [
      { q: "Do you use SewerGEMS?", a: "Yes, along with EPA SWMM where required." },
      { q: "Can you design lift stations?", a: "Yes, wet well, dry well and packaged stations." },
      { q: "What about peak factors?", a: "Per CPHEEO guidelines, calibrated to catchment data." },
      { q: "Network rehabilitation?", a: "CCTV-data based rehab and re-lining design." },
      {
        q: "Do you integrate with STP?",
        a: "Networks are designed in lockstep with downstream STP capacity.",
      },
    ],
  }),
  make({
    slug: "area-drainage-systems",
    title: "Area Drainage Systems",
    category: "Infrastructure",
    summary: "Storm water and area drainage design for industrial, commercial and urban areas.",
    overview:
      "Storm water management designs including rainfall analysis, runoff modelling, channel and culvert design, and detention / recharge integration.",
    capabilities: [
      "IDF and runoff analysis",
      "Open channel and culvert design",
      "Closed-conduit drainage",
      "Detention and retention basins",
      "Recharge and SUDS features",
      "Hydraulic modelling",
    ],
    deliverables: [
      "Hydrology Report",
      "Drainage GA Drawings",
      "Structure Details",
      "Flood Risk Assessment",
    ],
    industries: ["Industrial Plants", "Commercial Buildings", "Government Projects"],
    benefits: [
      "Lower flood risk",
      "Groundwater recharge",
      "Compliance with planning norms",
      "Reduced runoff to outfall",
    ],
    faqs: [
      {
        q: "Return period for design?",
        a: "Typically 1-in-5 to 1-in-25 year depending on use and authority.",
      },
      {
        q: "Do you address climate change?",
        a: "Yes, sensitivity analysis with uplifted rainfall intensities.",
      },
      { q: "What software?", a: "EPA SWMM, HEC-RAS and proprietary tools." },
      {
        q: "Recharge integration?",
        a: "Recharge pits, trenches and permeable surfaces designed in.",
      },
      { q: "Maintenance?", a: "Design includes silt traps and access for maintenance." },
    ],
  }),
  make({
    slug: "high-rise-building-design",
    title: "High Rise Building Design",
    category: "Design",
    summary: "Structural design of tall residential, commercial and mixed-use towers.",
    overview:
      "Lateral system selection, wind and seismic analysis, optimised foundations and constructable detailing for tall buildings.",
    capabilities: [
      "Lateral system selection",
      "Wind and seismic analysis",
      "Outrigger and belt-truss design",
      "Mat and pile-raft foundations",
      "Sequential construction analysis",
      "Vertical transportation coordination",
    ],
    deliverables: [
      "Concept Structural Report",
      "ETABS / SAFE Models",
      "GFC Drawings",
      "BBS & BOQ",
      "Sequential Analysis Report",
    ],
    industries: ["High Rise Buildings", "Commercial Buildings", "Hotels"],
    benefits: [
      "Slender architecture enabled",
      "Optimised concrete tonnage",
      "Faster construction cycles",
      "Resilient lateral performance",
    ],
    faqs: [
      {
        q: "How tall have you designed?",
        a: "Multi-storey residential and commercial towers across Indian cities.",
      },
      {
        q: "Wind tunnel testing?",
        a: "Coordinated with specialist labs when structures are wind-sensitive.",
      },
      { q: "Foundation systems?", a: "Mat, piled-raft and bored pile based on geotechnics." },
      { q: "Sequential analysis?", a: "Standard for towers above 25 storeys." },
      { q: "Do you design transfer floors?", a: "Yes, including post-tensioned transfer plates." },
    ],
  }),
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
