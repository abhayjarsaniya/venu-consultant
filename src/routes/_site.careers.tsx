import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTASection, SectionHeader } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";
import { useState } from "react";

export const Route = createFileRoute("/_site/careers")({
  head: () => ({
    meta: [
      { title: "Careers, Venu Consultants" },
      { name: "description", content: "Join a multi-disciplinary engineering bench delivering nationwide projects from Ahmedabad. Open positions and culture." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: Careers,
});

function Careers() {
  const { content } = useSiteContent();
  const careersData = content.careers;
  const openRoles = (careersData.openRoles || []).filter((r) => r.active !== false);
  const benefits = careersData.benefits || [];
  const vis = content.sectionVisibility || {
    careersCulture: true,
    careersOpenings: true,
    careersApplicationForm: true,
  };

  const [appliedRole, setAppliedRole] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <>
      <SEOHead
        pageKey="careers"
        fallbackTitle="Careers & Job Openings | Venu Consultants"
        fallbackDescription="Join our dynamic engineering bench in Ahmedabad. Open positions for structural engineers, draftsmen and architects."
        fallbackKeywords="engineering jobs ahmedabad, structural engineer vacancy, draftsman jobs gujarat"
      />
      <PageHero
        eyebrow={careersData.eyebrow}
        title={<>{careersData.title}</>}
        intro={careersData.intro}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Careers" }]}
      />

      {vis.careersCulture && (
        <section className="border-b border-border">
          <div className="container-wide grid gap-12 py-20 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Life at Venu</p>
              <h2 className="mt-5 font-display text-3xl">{careersData.cultureTitle}</h2>
              <p className="mt-5 text-muted-foreground">{careersData.cultureBody}</p>
            </div>
            <div>
              <p className="eyebrow">Culture & Benefits</p>
              <ul className="mt-5 space-y-3">
                {benefits.map((x) => (
                  <li key={x} className="rule-gold">{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {vis.careersOpenings && (
        <section className="border-b border-border bg-bone/40">
          <div className="container-wide py-20">
            <SectionHeader eyebrow="Open Positions" title="We are hiring." />
            {openRoles.length === 0 ? (
              <p className="mt-8 text-center text-sm text-muted-foreground">
                No active openings currently listed. Feel free to submit your CV below for future opportunities!
              </p>
            ) : (
              <div className="mt-10 divide-y divide-border border-y border-border">
                {openRoles.map((r) => (
                  <div key={r.id || r.title} className="grid gap-4 py-6 lg:grid-cols-[1.5fr_1fr_2fr_auto] lg:items-center">
                    <div>
                      <h3 className="font-display text-xl">{r.title}</h3>
                      <p className="mt-1 text-xs text-gold font-medium">{r.department || "Engineering"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{r.type}</p>
                      <p className="text-xs text-muted-foreground/80">{r.experience}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.brief}</p>
                    <button
                      onClick={() => {
                        setAppliedRole(r.title);
                        const formEl = document.getElementById("apply-form-section");
                        formEl?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center justify-center bg-foreground px-4 py-2 text-xs font-semibold text-background transition hover:bg-foreground/90 cursor-pointer"
                    >
                      Apply Now →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {vis.careersApplicationForm && (
        <section id="apply-form-section" className="border-b border-border">
          <div className="container-wide py-20">
            <SectionHeader eyebrow="Apply" title="Send us your CV." intro="Interested in joining our team? Fill out the details below and we will get back to you." />
            {formSubmitted ? (
              <div className="mt-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-6 text-center text-emerald-800">
                <p className="font-display text-lg font-bold">Application Received!</p>
                <p className="mt-1 text-xs">Thank you for your interest. Our HR team will review your profile shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="mt-10 grid gap-6 lg:grid-cols-2"
              >
                <Field label="Full Name" name="name" required />
                <Field label="Email Address" name="email" type="email" required />
                <Field label="Phone Number" name="phone" required />
                <Field label="Position of Interest" name="position" value={appliedRole} onChange={(e) => setAppliedRole(e.target.value)} required />
                <div className="lg:col-span-2">
                  <label className="eyebrow block">Cover Note / Experience Summary</label>
                  <textarea name="message" rows={5} className="mt-3 w-full border border-border bg-background p-4 outline-none focus:border-gold text-sm" placeholder="Tell us about your educational background, key software skills, and prior project experience." required />
                </div>
                <button type="submit" className="justify-self-start bg-foreground px-7 py-4 text-sm font-semibold text-background hover:bg-foreground/90 transition cursor-pointer">
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      <CTASection eyebrow="Get in Touch" title="Questions about careers?" ctaLabel="Email Careers" />
    </>
  );
}

function Field({ label, name, type = "text", value, onChange, required }: { label: string; name: string; type?: string; value?: string; onChange?: (e: any) => void; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow block">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-3 w-full border-b border-border bg-transparent py-3 outline-none focus:border-gold text-sm"
      />
    </div>
  );
}
