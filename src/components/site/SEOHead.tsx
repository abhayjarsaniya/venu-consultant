import { useEffect } from "react";
import { useSiteContent } from "@/context/ContentContext";
import type { PageSEO } from "@/lib/defaultSiteContent";

interface SEOHeadProps {
  pageKey?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackKeywords?: string;
  overrideSEO?: Partial<PageSEO>;
  canonicalPath?: string;
  jsonLd?: Record<string, any>;
}

export function SEOHead({
  pageKey,
  fallbackTitle,
  fallbackDescription,
  fallbackKeywords,
  overrideSEO,
  canonicalPath,
  jsonLd,
}: SEOHeadProps) {
  const { content } = useSiteContent();

  const configuredSEO: Partial<PageSEO> = (pageKey && content.seo[pageKey]) || {};
  const title = overrideSEO?.title || configuredSEO.title || fallbackTitle || content.company.name;
  const description = overrideSEO?.description || configuredSEO.description || fallbackDescription || content.company.tagline;
  const keywords = overrideSEO?.keywords || configuredSEO.keywords || fallbackKeywords || "engineering consultancy, ahmedabad";
  const ogTitle = overrideSEO?.ogTitle || configuredSEO.ogTitle || title;
  const ogDescription = overrideSEO?.ogDescription || configuredSEO.ogDescription || description;
  const robots = overrideSEO?.robots || configuredSEO.robots || "index, follow";
  const canonical = overrideSEO?.canonical || configuredSEO.canonical || canonicalPath || (typeof window !== "undefined" ? window.location.pathname : "/");

  useEffect(() => {
    if (typeof document === "undefined") return;

    // 1. Update Title
    document.title = title;

    // Helper to update or create meta tags
    const setMeta = (nameOrProperty: "name" | "property", key: string, contentValue: string) => {
      let el = document.querySelector(`meta[${nameOrProperty}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameOrProperty, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", contentValue);
    };

    // 2. Set Meta Description & Keywords
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setMeta("name", "robots", robots);
    setMeta("name", "author", content.company.name);

    // 3. Set Open Graph tags
    setMeta("property", "og:title", ogTitle);
    setMeta("property", "og:description", ogDescription);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", content.company.name);
    setMeta("property", "og:url", canonical);

    // 4. Set Twitter card tags
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", ogTitle);
    setMeta("name", "twitter:description", ogDescription);

    // 5. Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonical);

    // 6. JSON-LD structured data
    if (jsonLd) {
      let scriptEl = document.querySelector('script[data-dynamic-seo="jsonld"]');
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.setAttribute("type", "application/ld+json");
        scriptEl.setAttribute("data-dynamic-seo", "jsonld");
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    }
  }, [title, description, keywords, ogTitle, ogDescription, robots, canonical, jsonLd, content.company.name]);

  return null;
}
