import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { projectCategories } from "@/data/clients";

const BASE_URL = "https://venuconsultants.in";

interface SitemapEntry { path: string; changefreq?: string; priority?: string }

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/about/mission", changefreq: "yearly", priority: "0.6" },
          { path: "/about/leadership", changefreq: "yearly", priority: "0.7" },
          { path: "/about/team", changefreq: "monthly", priority: "0.6" },
          { path: "/about/why-choose-us", changefreq: "yearly", priority: "0.6" },
          { path: "/about/infrastructure", changefreq: "yearly", priority: "0.6" },
          { path: "/about/library", changefreq: "yearly", priority: "0.5" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          ...services.map((s) => ({ path: `/services/${s.slug}`, changefreq: "monthly", priority: "0.8" })),
          { path: "/industries", changefreq: "monthly", priority: "0.8" },
          ...industries.map((i) => ({ path: `/industries/${i.slug}`, changefreq: "monthly", priority: "0.7" })),
          { path: "/projects", changefreq: "monthly", priority: "0.8" },
          ...projectCategories.map((c) => ({ path: `/projects/${c.slug}`, changefreq: "monthly", priority: "0.7" })),
          { path: "/clients", changefreq: "monthly", priority: "0.7" },
          { path: "/technology", changefreq: "yearly", priority: "0.6" },
          { path: "/careers", changefreq: "weekly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/contact", changefreq: "yearly", priority: "0.9" },
        ];

        const urls = entries.map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
