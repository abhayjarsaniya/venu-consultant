export const company = {
  name: "Venu Consultants Pvt. Ltd.",
  short: "Venu Consultants",
  tagline: "Innovative & Cost Effective Engineering Solutions",
  city: "Ahmedabad, Gujarat, India",
  email: "info@venuconsultants.in",
  phone: "+91 79 0000 0000",
  address: "Ahmedabad, Gujarat, India",
  founded: 2006,
};

export const stats = [
  { value: "18+", label: "Years of Experience" },
  { value: "300+", label: "Projects Delivered" },
  { value: "25+", label: "Water & Wastewater Plants" },
  { value: "200+", label: "Engineering Publications" },
  { value: "Pan India", label: "Project Presence" },
];

export const navigation = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "Company Overview", to: "/about" },
      { label: "Mission & Vision", to: "/about/mission" },
      { label: "Leadership", to: "/about/leadership" },
      { label: "Our Team", to: "/about/team" },
      { label: "Why Choose Us", to: "/about/why-choose-us" },
      { label: "Infrastructure", to: "/about/infrastructure" },
      { label: "Library & Resources", to: "/about/library" },
    ],
  },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Projects", to: "/projects" },
  { label: "Clients", to: "/clients" },
  { label: "Technology", to: "/technology" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];
