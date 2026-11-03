import { company as baseCompany, stats as baseStats } from "../data/site";
import { services as baseServices, type Service } from "../data/services";
import { industries as baseIndustries, type Industry } from "../data/industries";
import { clients as baseClients, projectCategories as baseProjectCategories } from "../data/clients";
import { leadership as baseLeadership, team as baseTeam, type Member } from "../data/team";

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
  robots?: string;
}

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  type: string;
  experience: string;
  location: string;
  brief: string;
  responsibilities?: string[];
  requirements?: string[];
  active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  cat: string;
  excerpt: string;
  content?: string;
  author?: string;
  date?: string;
  readTime?: string;
  active: boolean;
}

export interface SectionVisibility {
  homeHero: boolean;
  homeStats: boolean;
  homeAboutIntro: boolean;
  homeServices: boolean;
  homeIndustries: boolean;
  homeWhyChoose: boolean;
  homeProjects: boolean;
  homeClients: boolean;
  homeCta: boolean;
  aboutOverviewStats: boolean;
  aboutOverviewValues: boolean;
  aboutOverviewCta: boolean;
  aboutMissionVision: boolean;
  aboutLeadershipBio: boolean;
  aboutLeadershipExpertise: boolean;
  aboutTeamGrid: boolean;
  aboutWhyChooseGrid: boolean;
  aboutInfrastructureSoftware: boolean;
  aboutInfrastructurePillars: boolean;
  aboutLibraryStats: boolean;
  aboutLibraryWhy: boolean;
  careersCulture: boolean;
  careersOpenings: boolean;
  careersApplicationForm: boolean;
  blogCategories: boolean;
  blogPosts: boolean;
  contactForm: boolean;
  contactDetails: boolean;
  contactMap: boolean;
}

export interface DefaultSiteContent {
  company: {
    name: string;
    short: string;
    tagline: string;
    city: string;
    email: string;
    phone: string;
    address: string;
    founded: number | string;
    workingHours?: string;
    linkedin?: string;
  };
  stats: { value: string; label: string }[];
  sectionVisibility: SectionVisibility;
  seo: Record<string, PageSEO>;
  home: {
    hero: {
      eyebrow: string;
      title: string;
      highlightedWord: string;
      subtitle: string;
      ctaPrimaryText: string;
      ctaPrimaryLink: string;
      ctaSecondaryText: string;
      ctaSecondaryLink: string;
    };
    aboutIntro: {
      eyebrow: string;
      title: string;
      body: string;
      bulletPoints: string[];
    };
    whyChooseTitle: string;
    whyChooseSubtitle: string;
    whyChooseItems: { t: string; d: string }[];
    featuredServicesTitle: string;
    featuredServicesSubtitle: string;
    featuredIndustriesTitle: string;
    featuredIndustriesSubtitle: string;
    projectsTitle: string;
    projectsSubtitle: string;
    clientsTitle: string;
    clientsSubtitle: string;
    cta: {
      eyebrow: string;
      title: string;
      highlightedWord: string;
      intro: string;
      buttonText: string;
      buttonLink: string;
    };
  };
  about: {
    overview: {
      eyebrow: string;
      title: string;
      intro: string;
      paragraphs: string[];
    };
    mission: {
      eyebrow: string;
      title: string;
      intro: string;
      missionStatement: string;
      visionStatement: string;
      values: { title: string; desc: string }[];
    };
    leadership: {
      eyebrow: string;
      title: string;
      intro: string;
      director: Member;
      quote: string;
      expertise: string[];
      approvedBodies: string[];
    };
    team: {
      eyebrow: string;
      title: string;
      intro: string;
      members: Member[];
    };
    whyChooseUs: {
      eyebrow: string;
      title: string;
      intro: string;
      reasons: { title: string; desc: string }[];
    };
    infrastructure: {
      eyebrow: string;
      title: string;
      intro: string;
      softwareLicenses: string[];
      hardwareSpecs: string[];
      pillars: { t: string; d: string }[];
    };
    library: {
      eyebrow: string;
      title: string;
      intro: string;
      stats: { v: string; l: string }[];
      whyTitle: string;
      whyDesc: string;
      clientBenefitTitle: string;
      clientBenefitDesc: string;
      categories: { title: string; items: string[] }[];
    };
  };
  services: Service[];
  industries: Industry[];
  clients: { name: string; sector: string }[];
  projectCategories: { slug: string; name: string; count: string; blurb: string }[];
  technology: {
    eyebrow: string;
    title: string;
    intro: string;
    software: { name: string; purpose: string }[];
    pillars: { t: string; d: string }[];
  };
  careers: {
    eyebrow: string;
    title: string;
    intro: string;
    cultureTitle: string;
    cultureBody: string;
    benefits: string[];
    openRoles: CareerRole[];
  };
  blog: {
    eyebrow: string;
    title: string;
    intro: string;
    categories: string[];
    posts: BlogPost[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    offices: { city: string; address: string; phone: string; email: string }[];
  };
}

export const defaultSiteContent: DefaultSiteContent = {
  company: {
    ...baseCompany,
    workingHours: "Monday to Saturday: 9:30 AM - 6:30 PM",
    linkedin: "https://www.linkedin.com/company/venu-consultants",
  },
  stats: [...baseStats],
  sectionVisibility: {
    homeHero: true,
    homeStats: true,
    homeAboutIntro: true,
    homeServices: true,
    homeIndustries: true,
    homeWhyChoose: true,
    homeProjects: true,
    homeClients: true,
    homeCta: true,
    aboutOverviewStats: true,
    aboutOverviewValues: true,
    aboutOverviewCta: true,
    aboutMissionVision: true,
    aboutLeadershipBio: true,
    aboutLeadershipExpertise: true,
    aboutTeamGrid: true,
    aboutWhyChooseGrid: true,
    aboutInfrastructureSoftware: true,
    aboutInfrastructurePillars: true,
    aboutLibraryStats: true,
    aboutLibraryWhy: true,
    careersCulture: true,
    careersOpenings: true,
    careersApplicationForm: true,
    blogCategories: true,
    blogPosts: true,
    contactForm: true,
    contactDetails: true,
    contactMap: true,
  },
  seo: {
    home: {
      title: "Venu Consultants, Engineering Consultancy, Ahmedabad",
      description: "Ahmedabad-based engineering consultancy delivering innovative, cost-effective architectural, civil, structural, environmental, water and industrial engineering across India.",
      keywords: "engineering consultancy ahmedabad, structural engineer gujarat, civil engineering india, water treatment design, architectural engineering ahmedabad, industrial plant design",
      ogTitle: "Venu Consultants, Engineering Consultancy",
      ogDescription: "Architectural, civil & structural, environmental, water and industrial engineering across India.",
      canonical: "/",
      robots: "index, follow",
    },
    about: {
      title: "About Us | Venu Consultants, Ahmedabad",
      description: "Learn about Venu Consultants, 18+ years of engineering consultancy experience delivering 300+ projects pan-India.",
      keywords: "about venu consultants, keyur ladani, structural consultants ahmedabad, engineering firm gujarat",
      ogTitle: "About Venu Consultants",
      ogDescription: "Eighteen years of engineering consultancy delivering 300+ projects across India.",
      canonical: "/about",
      robots: "index, follow",
    },
    "about-mission": {
      title: "Mission & Vision | Venu Consultants",
      description: "Our mission, vision and core values guiding innovative and cost-effective engineering consultancy.",
      keywords: "venu consultants mission, engineering vision, core engineering values",
      canonical: "/about/mission",
      robots: "index, follow",
    },
    "about-leadership": {
      title: "Leadership | Mr. Keyur Ladani | Venu Consultants",
      description: "Led by Mr. Keyur Ladani, Principal Structural Engineer with over 18 years of multidisciplinary engineering leadership.",
      keywords: "Keyur Ladani, principal structural engineer, structural engineering consultant ahmedabad",
      canonical: "/about/leadership",
      robots: "index, follow",
    },
    "about-team": {
      title: "Our Engineering Team | Venu Consultants",
      description: "Meet our multidisciplinary team of structural engineers, architects, hydraulic leads and project engineers.",
      keywords: "engineering team ahmedabad, architects, structural engineers, water process engineers",
      canonical: "/about/team",
      robots: "index, follow",
    },
    "about-why-choose-us": {
      title: "Why Choose Us | Venu Consultants",
      description: "Discover why national clients trust Venu Consultants for structural precision, value engineering and fast turnaround.",
      keywords: "why choose venu consultants, value engineering, proof checking, quality assurance engineering",
      canonical: "/about/why-choose-us",
      robots: "index, follow",
    },
    "about-infrastructure": {
      title: "Infrastructure & Tools | Venu Consultants",
      description: "Explore our modern engineering design office equipped with licensed STAAD Pro, ETABS, AutoCAD and high-performance workstations.",
      keywords: "staad pro consultant, etabs design office, autodesk revit consultancy ahmedabad",
      canonical: "/about/infrastructure",
      robots: "index, follow",
    },
    "about-library": {
      title: "Technical Library & Standards | Venu Consultants",
      description: "Our comprehensive 200+ engineering library spanning IS, ACI, BS, Eurocode standards and specialized structural reference publications.",
      keywords: "IS codes engineering, ACI standards, structural handbooks, engineering library ahmedabad",
      canonical: "/about/library",
      robots: "index, follow",
    },
    services: {
      title: "Engineering Services | Venu Consultants",
      description: "Explore our full spectrum of AEC services: Architectural, Civil & Structural, Environmental, Project Management, and Proof Checking.",
      keywords: "architectural engineering, structural design, civil engineering services, environmental engineering, STP WTP design",
      canonical: "/services",
      robots: "index, follow",
    },
    industries: {
      title: "Industries Served | Venu Consultants",
      description: "Cross-sector engineering solutions for industrial plants, pharmaceuticals, high-rise towers, hospitals, and water infrastructure.",
      keywords: "industrial plant engineering, pharma plant design, high rise structural engineering, hospital civil engineering",
      canonical: "/industries",
      robots: "index, follow",
    },
    projects: {
      title: "Delivered Projects Portfolio | Venu Consultants",
      description: "Over 300 successful engineering projects delivered across India, including 25+ water and wastewater treatment plants.",
      keywords: "engineering projects portfolio, water treatment projects, industrial projects india, structural design cases",
      canonical: "/projects",
      robots: "index, follow",
    },
    clients: {
      title: "Our Clients & Credentials | Venu Consultants",
      description: "Trusted by Indian Defence forces, State Governments, PSU corporations and leading industrial conglomerates across India.",
      keywords: "indian army consultant, gws&sb consultant, western railway civil engineer, torrent pharma consultant",
      canonical: "/clients",
      robots: "index, follow",
    },
    technology: {
      title: "Technology & Software Stack | Venu Consultants",
      description: "State-of-the-art analytical tools: STAAD Pro, ETABS, SAFE, SAP2000, AutoCAD, and BIM coordination.",
      keywords: "staad pro, etabs analysis, structural software, bim engineering ahmedabad",
      canonical: "/technology",
      robots: "index, follow",
    },
    careers: {
      title: "Careers & Job Openings | Venu Consultants",
      description: "Join our dynamic engineering bench in Ahmedabad. Open positions for structural engineers, draftsmen and architects.",
      keywords: "engineering jobs ahmedabad, structural engineer vacancy, draftsman jobs gujarat",
      canonical: "/careers",
      robots: "index, follow",
    },
    blog: {
      title: "Engineering Insights Blog | Venu Consultants",
      description: "Technical articles and practical engineering insights on structural design, wastewater treatment, and construction management.",
      keywords: "structural engineering blog, water treatment insights, construction tips india",
      canonical: "/blog",
      robots: "index, follow",
    },
    contact: {
      title: "Contact Us | Venu Consultants Pvt. Ltd.",
      description: "Start your next engineering project with confidence. Contact Venu Consultants in Ahmedabad, Gujarat, India.",
      keywords: "contact venu consultants, engineering consultancy phone number, ahmedabad office address",
      canonical: "/contact",
      robots: "index, follow",
    },
  },
  home: {
    hero: {
      eyebrow: "Engineering Consultancy · Est. 2006",
      title: "Innovative &\ncost-effective",
      highlightedWord: "engineering",
      subtitle: "Eighteen years of structural precision, water infrastructure and multidisciplinary engineering delivered from Ahmedabad across India.",
      ctaPrimaryText: "Explore services",
      ctaPrimaryLink: "/services",
      ctaSecondaryText: "Discuss your project",
      ctaSecondaryLink: "/contact",
    },
    aboutIntro: {
      eyebrow: "About Venu Consultants",
      title: "Engineering that balances ambition with reality.",
      body: "Founded in 2006 by Mr. Keyur Ladani, Venu Consultants is an Ahmedabad-based multidisciplinary engineering consultancy. Over eighteen years, our studio has delivered more than three hundred projects spanning civil and structural engineering, water and wastewater treatment plants, industrial facilities, high-rise buildings and government infrastructure across India.",
      bulletPoints: [
        "18+ years of proven engineering leadership",
        "300+ completed projects across 6 Indian states",
        "In-house architects, structural leads, hydraulic & process engineers",
        "Independent cross-checking on every drawing before issue",
      ],
    },
    whyChooseTitle: "Engineered for Confidence",
    whyChooseSubtitle: "Why clients across defence, government and private sectors repeatedly choose Venu Consultants.",
    whyChooseItems: [
      { t: "Innovative Engineering", d: "Creative, practical and technically sound solutions to difficult engineering problems." },
      { t: "Cost Effective Designs", d: "Value engineering applied at every stage to deliver real money for the client." },
      { t: "Fast Turnaround", d: "Quick technical support, we keep your project moving without costly delays." },
      { t: "Quality Assurance", d: "Independent cross-checking by experienced engineers on every drawing." },
      { t: "National Presence", d: "Projects across Gujarat, Karnataka, Telangana, Odisha, Maharashtra and beyond." },
      { t: "Client Satisfaction", d: "Long-term relationships with defence, government, public sector and industrial clients." },
    ],
    featuredServicesTitle: "Core Services",
    featuredServicesSubtitle: "End-to-end engineering consultancy from concept to commissioning.",
    featuredIndustriesTitle: "Industries Served",
    featuredIndustriesSubtitle: "Deep domain experience across fourteen specialised industrial and infrastructure sectors.",
    projectsTitle: "Selected Projects",
    projectsSubtitle: "A representative track record across water treatment, industrial complexes and high-rise structures.",
    clientsTitle: "Trusted by Leaders",
    clientsSubtitle: "From the Indian Armed Forces to state water boards and private industry conglomerates.",
    cta: {
      eyebrow: "Start a Conversation",
      title: "Have a project in mind? Let's engineer it",
      highlightedWord: "together.",
      intro: "Whether you need structural analysis, treatment plant process design, or comprehensive project consultancy, our Ahmedabad bench is ready to assist.",
      buttonText: "Get in touch",
      buttonLink: "/contact",
    },
  },
  about: {
    overview: {
      eyebrow: "Company Overview",
      title: "Eighteen years of structural precision and multidisciplinary engineering.",
      intro: "Founded in Ahmedabad in 2006, Venu Consultants Pvt. Ltd. has grown from a focused structural design studio into a full-scope AEC consultancy delivering nationwide.",
      paragraphs: [
        "Venu Consultants was established with a singular objective: to provide clients with uncompromising engineering quality, cost-effective designs, and hands-on technical accountability.",
        "Over the past 18 years, we have delivered more than 300 engineering projects spanning industrial manufacturing complexes, municipal water treatment facilities, residential and commercial high-rises, and critical defence infrastructure.",
        "Our strength lies in our multidisciplinary team of COA-registered architects, structural specialists, environmental engineers, and site coordinators who collaborate seamlessly under one roof.",
      ],
    },
    mission: {
      eyebrow: "Mission & Vision",
      title: "Setting the standard for engineering excellence.",
      intro: "Our philosophy is built on technical precision, integrity, and client value.",
      missionStatement: "To deliver innovative, technically robust, and cost-effective engineering solutions that enable clients to build with absolute confidence, while upholding the highest standards of safety, quality, and environmental stewardship.",
      visionStatement: "To be recognized as India's premier engineering consultancy, celebrated for technical ingenuity, multidisciplinary execution, and long-term client partnerships.",
      values: [
        { title: "Technical Rigour", desc: "Never compromising on code compliance, safety factors, or analytical thoroughness." },
        { title: "Value Engineering", desc: "Optimizing material quantities and constructability without sacrificing longevity." },
        { title: "Client Accountability", desc: "Providing direct access to principal engineers and responsive on-site coordination." },
        { title: "Lifelong Learning", desc: "Continually investing in cutting-edge simulation software, code revisions, and technical literature." },
      ],
    },
    leadership: {
      eyebrow: "Leadership",
      title: "Led by hands-on engineering experience.",
      intro: "Our principals remain directly involved in calculation reviews, code checks, and client strategy.",
      director: baseLeadership,
      quote: "True value engineering isn't cutting corners; it's understanding the physics and codes so well that you eliminate every kilogram of unnecessary steel without compromising safety.",
      expertise: [
        "Industrial Projects",
        "Water Treatment Plants",
        "Wastewater Treatment Plants",
        "Structural Engineering",
        "Bulk Water Pipelines",
        "High-Rise Structures",
      ],
      approvedBodies: [
        "Ahmedabad Municipal Corporation (AMC)",
        "Ahmedabad Urban Development Authority (AUDA)",
        "Greater Hyderabad Municipal Corporation (GHMC)",
      ],
    },
    team: {
      eyebrow: "Our Team",
      title: "A multidisciplinary bench of experienced engineers.",
      intro: "Our strength is in the depth of our bench: structural engineers, architects, water process leads, hydraulic specialists, and draftsmen.",
      members: baseTeam,
    },
    whyChooseUs: {
      eyebrow: "Why Choose Us",
      title: "Six reasons clients trust Venu Consultants.",
      intro: "From independent cross-checking to pan-India project delivery, here is how we create measurable client value.",
      reasons: [
        { title: "Independent 2-tier Cross Checking", desc: "Every drawing and calculation sheet is peer-checked by a senior engineer before release." },
        { title: "Measurable Material Savings", desc: "Our value-engineered structural framing routinely saves 8-15% on rebar and concrete quantities." },
        { title: "Speed & Responsiveness", desc: "Rapid turnaround on RFIs and revisions to keep site execution on track without delays." },
        { title: "Deep Regulatory Familiarity", desc: "Proven track record obtaining approvals with AUDA, AMC, GHMC and state boards." },
        { title: "Pan-India Footprint", desc: "Extensive site execution experience across Gujarat, Maharashtra, Karnataka, Telangana, and Odisha." },
        { title: "High Client Retention", desc: "Over 80% of our annual project volume comes from repeat clients and long-term partnerships." },
      ],
    },
    infrastructure: {
      eyebrow: "Infrastructure",
      title: "Modern workstations, licensed software, and design tools.",
      intro: "We invest heavily in cutting-edge computational tools to ensure our designs are rigorously verified.",
      softwareLicenses: [
        "STAAD Pro V8i / CONNECT Edition",
        "ETABS Ultimate (Nonlinear Seismic Analysis)",
        "SAFE (Foundation & Slab Design)",
        "SAP2000 (Special Structural Systems)",
        "Autodesk AutoCAD & Revit BIM",
        "RCDC (Reinforced Concrete Design & Detailing)",
        "WaterCAD & SewerCAD Hydraulics",
      ],
      hardwareSpecs: [
        "High-performance Intel Xeon & Core i9 workstations",
        "Dual-monitor CAD and analysis setups",
        "Gigabit networked design repository with automated off-site backups",
        "Dedicated A0 high-speed wide-format plotting infrastructure",
      ],
      pillars: [
        { t: "Licensed Software", d: "Licensed STAAD Pro, STRUDS, ETABS, SAFE, SAP2000, AutoCAD and proprietary in-house tools, used since the firm's earliest days." },
        { t: "Drawing Standards", d: "Controlled CAD standards governing line types, fonts, layers and revision protocol. Every sheet follows the same template." },
        { t: "Cross-checking Process", d: "All fabrication and construction drawings are checked for readability and ambiguity by an engineer independent of the originator." },
        { t: "Error Control", d: "Errors and changes are recorded on a drawing print; the original creator updates the file. Every revision is logged and superseded sheets archived." },
        { t: "Documentation Quality", d: "BBS, BOQ, specifications and calculations all carry traceability back to source, auditable from concept to construction." },
      ],
    },
    library: {
      eyebrow: "Technical Library & Resources",
      title: "Over 200 standards, handbooks, and reference publications.",
      intro: "A proprietary knowledge repository built over nearly two decades of engineering practice.",
      stats: [
        { v: "200+", l: "Books & Publications" },
        { v: "All", l: "National Codes (IS / NBC / CPHEEO)" },
        { v: "Key", l: "International Codes (ACI, BS, Eurocode, DIN)" },
      ],
      whyTitle: "Why a library still matters.",
      whyDesc: "Software outputs are only as good as the engineering judgement guiding them. Codes evolve, materials change, methods improve. By maintaining a curated reference library and continuous professional development through national and international professional bodies, we keep our practice current.",
      clientBenefitTitle: "What you get as a client.",
      clientBenefitDesc: "Code-compliant deliverables, defensible design rationale and an engineering team that can answer the \"why\" behind every number on the drawing.",
      categories: [
        {
          title: "Indian Standards (BIS)",
          items: ["IS 456 (Plain and Reinforced Concrete)", "IS 800 (General Construction in Steel)", "IS 1893 (Earthquake Resistant Design)", "IS 13920 (Ductile Design)", "IS 3370 (Concrete Structures for Liquid Storage)", "IS 875 Parts 1-5 (Design Loads)"],
        },
        {
          title: "International Codes",
          items: ["ACI 318 (Building Code Requirements for Structural Concrete)", "AISC 360 (Specification for Structural Steel Buildings)", "BS 8110 (Structural Use of Concrete)", "Eurocode 2 & Eurocode 3"],
        },
        {
          title: "Specialized Literature",
          items: ["CPHEEO Manual on Water Supply and Treatment", "CPHEEO Manual on Sewerage and Sewage Treatment", "SP 16, SP 34, SP 24 Design Handbooks", "Foundation Analysis & Design by Bowles"],
        },
      ],
    },
  },
  services: baseServices,
  industries: baseIndustries,
  clients: baseClients,
  projectCategories: baseProjectCategories,
  technology: {
    eyebrow: "Technology",
    title: "Software, standards & cross-checks.",
    intro: "We invest in licensed engineering software and a disciplined drafting practice, the combination is how we deliver fast, accurate, code-compliant deliverables.",
    software: [
      { name: "STAAD Pro", purpose: "3D structural analysis and design, RCC and steel." },
      { name: "STRUDS", purpose: "RCC building analysis and design with Indian code post-processing." },
      { name: "ETABS", purpose: "Tall and irregular building analysis with sequential construction." },
      { name: "SAFE", purpose: "Slab, mat and post-tensioned floor design." },
      { name: "SAP2000", purpose: "Special structures, dynamics and non-linear analysis." },
      { name: "AutoCAD", purpose: "Production drafting with controlled CAD standards." },
    ],
    pillars: [
      { t: "Structural Analysis", d: "Multi-package modelling to cross-validate critical results, outputs are engineered, never blindly accepted." },
      { t: "Drafting Standards", d: "Controlled CAD templates, layers, line types and revision protocol applied uniformly across every project." },
      { t: "BIM-Ready Approach", d: "Coordinated CAD that can be lifted into Revit for projects requiring multi-discipline BIM coordination." },
      { t: "Quality Control", d: "Independent cross-checking on every issued drawing, readability, ambiguity and error logged and resolved." },
    ],
  },
  careers: {
    eyebrow: "Careers",
    title: "Engineers, architects & draftsmen, wanted.",
    intro: "Join a multi-disciplinary bench where every engineer is accountable for the design they produce. We invest in our people, our tools and our library.",
    cultureTitle: "Real engineering, real responsibility.",
    cultureBody: "From day one you work on projects that get built. You are mentored by senior engineers, you cross-check colleagues' drawings and your name signs the work you deliver.",
    benefits: [
      "Mentorship by principal-level engineers with 18+ years experience",
      "Licensed software and a 200+ book technical library",
      "Multi-discipline exposure across India",
      "Performance-linked growth path",
      "Statutory benefits and on-time payroll",
    ],
    openRoles: [
      {
        id: "role-1",
        title: "Senior Structural Engineer",
        department: "Structural Engineering",
        type: "Full-time · Ahmedabad",
        experience: "5+ years",
        location: "Ahmedabad, Gujarat",
        brief: "Lead RCC design for industrial and high-rise projects. M.E. Structure with 5+ years experience.",
        responsibilities: [
          "Lead structural analysis and design for high-rise and industrial plants using ETABS & STAAD Pro",
          "Perform independent proof checking and peer review on structural calculations",
          "Coordinate with architectural and MEP leads for service integration",
        ],
        requirements: [
          "M.E. / M.Tech in Structural Engineering",
          "Proficiency in IS 456, IS 1893, IS 13920, and IS 800",
          "5+ years of practical design office experience",
        ],
        active: true,
      },
      {
        id: "role-2",
        title: "Process Engineer, Water & Wastewater",
        department: "Environmental Engineering",
        type: "Full-time · Ahmedabad",
        experience: "3+ years",
        location: "Ahmedabad, Gujarat",
        brief: "Process design, hydraulics and commissioning for WTPs and STPs.",
        responsibilities: [
          "Design process flow diagrams (PFD) and P&IDs for water & sewage treatment plants",
          "Prepare hydraulic flow calculations and unit sizing for ASP, SBR, MBBR systems",
          "Conduct site commissioning and performance trials",
        ],
        requirements: [
          "B.E. in Chemical or Environmental Engineering",
          "Familiarity with CPHEEO manuals and state water board standards",
          "3+ years experience in water infrastructure design",
        ],
        active: true,
      },
      {
        id: "role-3",
        title: "Architectural Designer",
        department: "Architecture Studio",
        type: "Full-time · Ahmedabad",
        experience: "3+ years",
        location: "Ahmedabad, Gujarat",
        brief: "Concept-to-GFC for commercial and industrial buildings.",
        responsibilities: [
          "Master planning, layout and statutory approval drawings for industrial and commercial projects",
          "Façade detailing and interior layout documentation",
          "AUDA and AMC municipal submission drawings",
        ],
        requirements: [
          "B.Arch registered with Council of Architecture (COA)",
          "Proficiency in AutoCAD, Revit, and presentation software",
        ],
        active: true,
      },
      {
        id: "role-4",
        title: "CAD Draftsman, Civil & Structural",
        department: "Drafting & BIM",
        type: "Full-time · Ahmedabad",
        experience: "4+ years",
        location: "Ahmedabad, Gujarat",
        brief: "Production drafting with strong attention to detail.",
        responsibilities: [
          "Prepare bar bending schedules (BBS) and structural GFC drawings",
          "Structural steel connection detailing and fabrication drawings",
          "Implement office CAD layer and typography standards",
        ],
        requirements: [
          "Diploma in Civil Engineering or ITI Draftsman",
          "Expert proficiency in AutoCAD",
        ],
        active: true,
      },
    ],
  },
  blog: {
    eyebrow: "Blog",
    title: "Engineering insights from the bench.",
    intro: "Practical notes from our engineers, written for clients, contractors and fellow practitioners.",
    categories: [
      "Structural Engineering",
      "Water Treatment",
      "Industrial Design",
      "Construction Management",
      "Sustainability",
      "Project Planning",
    ],
    posts: [
      {
        id: "post-1",
        cat: "Structural Engineering",
        title: "Choosing lateral systems for Indian high-rises",
        excerpt: "Outriggers, shear walls and tubed cores, what the seismic and wind regime really demands above 30 storeys.",
        content: "High-rise construction in India requires balanced structural efficiency against stringent seismic zone stipulations (Zone III and IV). This article details the structural response comparison between conventional shear wall cores and outrigger systems.",
        author: "Mr. Keyur Ladani",
        date: "October 2026",
        readTime: "6 min read",
        active: true,
      },
      {
        id: "post-2",
        cat: "Water Treatment",
        title: "When does packaged WTP beat conventional?",
        excerpt: "A practical framework for small and medium-capacity treatment selection.",
        content: "Prefabricated and skid-mounted water treatment plants offer rapid commissioning and compact footprints, making them ideal for townships and industrial estates with capacities below 5 MLD.",
        author: "Vivek Bhalodia",
        date: "September 2026",
        readTime: "4 min read",
        active: true,
      },
      {
        id: "post-3",
        cat: "Industrial Design",
        title: "Pipe-rack engineering for brownfield expansions",
        excerpt: "Tie-ins, load growth and the discipline of leaving room for the next phase.",
        content: "Brownfield expansions in chemical and manufacturing plants routinely encounter congested pipe routes. We analyze the critical load paths and thermal expansion factors for safe tie-ins.",
        author: "Engineering Bench",
        date: "August 2026",
        readTime: "5 min read",
        active: true,
      },
      {
        id: "post-4",
        cat: "Construction Management",
        title: "RFI hygiene that actually saves cost",
        excerpt: "How disciplined RFI flow protects programme and reduces commercial leakage.",
        content: "Delays in Request for Information (RFI) resolution compound contractor standing charges. A 24-hour RFI turnaround protocol safeguards both project timeline and commercial integrity.",
        author: "Site Operations",
        date: "July 2026",
        readTime: "3 min read",
        active: true,
      },
      {
        id: "post-5",
        cat: "Sustainability",
        title: "Treated water reuse in commercial buildings",
        excerpt: "Tertiary treatment and the operating economics of in-building reuse.",
        content: "Dual plumbing systems coupled with tertiary filtration (sand, carbon, UV) allow commercial complexes to cut fresh municipal water consumption by up to 60%.",
        author: "Environmental Team",
        date: "June 2026",
        readTime: "5 min read",
        active: true,
      },
      {
        id: "post-6",
        cat: "Project Planning",
        title: "S-curves vs earned value, getting honest data",
        excerpt: "Why weight factors matter and how to set them up properly on day one.",
        content: "Physical progress curves often deceive if deliverable weightages are improperly assigned. An objective earned value management baseline prevents late-stage surprises.",
        author: "Project Management Team",
        date: "May 2026",
        readTime: "4 min read",
        active: true,
      },
    ],
  },
  contact: {
    eyebrow: "Contact Us",
    title: "Start your next engineering project with confidence.",
    intro: "Tell us about your project scope, location, and timelines. Our engineering team typically responds within one working day.",
    offices: [
      {
        city: "Head Office — Ahmedabad",
        address: "Ahmedabad, Gujarat, India",
        phone: "+91 79 0000 0000",
        email: "info@venuconsultants.in",
      },
    ],
  },
};
