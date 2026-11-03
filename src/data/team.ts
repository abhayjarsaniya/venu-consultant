export interface Member {
  name: string;
  role: string;
  qualification?: string;
  experience?: string;
  bio: string;
}

export const leadership: Member = {
  name: "Mr. Keyur Ladani",
  role: "Managing Director, Principal Structural Engineer",
  qualification: "M.E. Structure",
  experience: "18+ years",
  bio: "Keyur leads Venu Consultants' technical practice with over 18 years of experience across industrial, water, wastewater, bulk water transmission and commercial projects. He has personally led the design of more than 25 water and wastewater treatment plants and over 300 industrial, residential, formwork, power-plant and high-rise structures across India. He is fluent in IS, ACI and BS codes with cross-disciplinary knowledge of electro-mechanical systems and on-site experience in installation and commissioning of water and sewage treatment plants. He has also acted as third-party consultant for projects in Telangana and Gujarat.",
};

export const team: Member[] = [
  {
    name: "Mrs. Kinjal Ladani",
    role: "HR & Accounts",
    bio: "Leads recruitment, compensation, statutory compliance and people operations for the firm.",
  },
  {
    name: "Mr. Divyesh Vachhani",
    role: "Senior Architect (Registered with COA)",
    experience: "15+ years",
    bio: "Architectural planning, design and interiors across residential, educational, industrial and commercial projects. Registered architect with AUDA.",
  },
  {
    name: "Mr. Vivek Bhalodia",
    role: "Process Lead, Water & Wastewater",
    qualification: "B.E. Mechanical",
    experience: "14+ years",
    bio: "Water and wastewater treatment plant and network design, with hands-on experience in procurement, installation and commissioning.",
  },
  {
    name: "Mr. Utsav Ratanpara",
    role: "Hydraulic Engineer",
    qualification: "B.E. Civil",
    experience: "6 years",
    bio: "Estimation and hydraulic design of water, sewage, water supply and area drainage projects.",
  },
  {
    name: "Mr. Chirag Borsaniya",
    role: "Electrical & Instrumentation Lead",
    qualification: "B.E. Electrical",
    experience: "14+ years",
    bio: "Electrical design, operations and instrumentation including HT and LT panel design.",
  },
  {
    name: "Mr. Jay Patel",
    role: "Senior Structural Engineer",
    qualification: "M.E. Structure",
    experience: "8 years",
    bio: "Specialises in RCC design and detailing. Proficient in ETABS, SAFE, SAP2000, STAAD Pro and STRUDS.",
  },
  {
    name: "Mr. Girish Pokar",
    role: "Senior Structural Engineer",
    qualification: "M.E. Structure",
    experience: "12+ years",
    bio: "RCC structural design and detailing. Proficient in RCDC, STAAD Pro and STRUDS.",
  },
  {
    name: "Mr. Umesh Mathukiya",
    role: "Site Engineer & Technical Coordinator",
    qualification: "DCE Civil",
    experience: "10 years",
    bio: "On-site technical service, drafting, estimation and bill measurement.",
  },
  {
    name: "Mr. Sameer Mistri",
    role: "Senior Draftsman",
    qualification: "ITI Civil",
    experience: "8+ years",
    bio: "Civil and structural draftsmanship across project disciplines.",
  },
  {
    name: "Mr. Sunil Prajapati",
    role: "Draftsman, Civil & Structural",
    qualification: "DCE",
    experience: "8 years",
    bio: "Production drafting for civil and structural deliverables.",
  },
  {
    name: "Mr. Prince Senjaliya",
    role: "Accountant",
    experience: "3 years",
    bio: "Day-to-day accounts, statutory filings and book-keeping.",
  },
];
