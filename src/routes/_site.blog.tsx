import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";
import { useState } from "react";

export const Route = createFileRoute("/_site/blog")({
  head: () => ({
    meta: [
      { title: "Blog, Engineering Insights | Venu Consultants" },
      { name: "description", content: "Insights on structural engineering, water treatment, industrial design, construction management and sustainability." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

function Blog() {
  const { content } = useSiteContent();
  const blogData = content.blog;
  const categories = blogData.categories || [];
  const posts = (blogData.posts || []).filter((p) => p.active !== false);
  const vis = content.sectionVisibility || {
    blogCategories: true,
    blogPosts: true,
  };

  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const filteredPosts = selectedCat === "All" ? posts : posts.filter((p) => p.cat === selectedCat);

  return (
    <>
      <SEOHead
        pageKey="blog"
        fallbackTitle="Engineering Insights Blog | Venu Consultants"
        fallbackDescription="Insights on structural engineering, water treatment, industrial design, construction management and sustainability."
        fallbackKeywords="structural engineering blog, water treatment insights, construction tips india"
      />
      <PageHero
        eyebrow={blogData.eyebrow}
        title={<>{blogData.title}</>}
        intro={blogData.intro}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
      />

      {vis.blogCategories && (
        <section className="border-b border-border bg-bone/40">
          <div className="container-wide flex flex-wrap gap-2 py-6">
            <button
              onClick={() => setSelectedCat("All")}
              className={`border px-4 py-2 text-xs uppercase tracking-[0.16em] transition cursor-pointer ${
                selectedCat === "All"
                  ? "border-gold bg-foreground text-background font-bold"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              All Articles ({posts.length})
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.16em] transition cursor-pointer ${
                  selectedCat === c
                    ? "border-gold bg-foreground text-background font-bold"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>
      )}

      {vis.blogPosts && (
        <section className="border-b border-border">
          <div className="container-wide py-16">
            {filteredPosts.length === 0 ? (
              <p className="text-center py-12 text-sm text-muted-foreground">
                No articles published in this category yet.
              </p>
            ) : (
              <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((p) => {
                  const isExpanded = expandedPostId === (p.id || p.title);
                  return (
                    <article key={p.id || p.title} className="bg-background p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="eyebrow">{p.cat}</p>
                          <span className="text-[11px] text-muted-foreground">{p.readTime || "4 min read"}</span>
                        </div>
                        <h3 className="mt-5 font-display text-2xl leading-tight">{p.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                        {isExpanded && p.content && (
                          <div className="mt-4 pt-4 border-t border-border text-sm leading-relaxed text-foreground/80">
                            {p.content}
                          </div>
                        )}
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{p.author || "Venu Consultants"}</span>
                        <button
                          onClick={() => setExpandedPostId(isExpanded ? null : (p.id || p.title))}
                          className="text-xs uppercase tracking-[0.18em] text-gold hover:underline cursor-pointer font-medium"
                        >
                          {isExpanded ? "Close ↑" : "Read full article →"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
