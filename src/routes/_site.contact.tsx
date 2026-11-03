import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SEOHead } from "@/components/site/SEOHead";
import { useSiteContent } from "@/context/ContentContext";
import heroImg from "@/assets/engineer-site.jpg";
import { useState } from "react";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact, Venu Consultants Pvt. Ltd." },
      {
        name: "description",
        content:
          "Start your next engineering project with confidence. Contact Venu Consultants, Ahmedabad.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { content } = useSiteContent();
  const company = content.company;
  const contactInfo = content.contact;
  const services = content.services;
  const vis = content.sectionVisibility || {
    contactForm: true,
    contactDetails: true,
    contactMap: true,
  };

  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <SEOHead
        pageKey="contact"
        fallbackTitle="Contact Us | Venu Consultants Pvt. Ltd."
        fallbackDescription="Start your next engineering project with confidence. Contact Venu Consultants, Ahmedabad."
        fallbackKeywords="contact venu consultants, engineering consultancy phone number, ahmedabad office address"
      />
      <PageHero
        eyebrow={contactInfo.eyebrow}
        title={<>{contactInfo.title}</>}
        intro={contactInfo.intro}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        image={heroImg}
        imageAlt="Engineer on construction site"
      />

      <section className="border-b border-border">
        <div className="container-wide grid gap-16 py-20 lg:grid-cols-12">
          {vis.contactForm && (
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-8 text-center text-emerald-800">
                  <p className="font-display text-2xl font-bold">Enquiry Sent Successfully!</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thank you for reaching out. Our engineering team typically responds within one
                    business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  <Field label="Full Name" name="name" required />
                  <Field label="Company" name="company" />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" required />
                  <div className="sm:col-span-2">
                    <label className="eyebrow block">Service Required</label>
                    <select className="mt-3 w-full border-b border-border bg-transparent py-3 outline-none focus:border-gold text-sm">
                      <option value="">Select a service…</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="eyebrow block">Project Brief</label>
                    <textarea
                      rows={6}
                      className="mt-3 w-full border border-border bg-background p-4 outline-none focus:border-gold text-sm"
                      placeholder="Site location, scope, programme and any technical constraints."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="justify-self-start bg-foreground px-7 py-4 text-sm text-background font-semibold hover:bg-foreground/90 transition cursor-pointer sm:col-span-2"
                  >
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          )}

          {vis.contactDetails && (
            <aside className={`space-y-10 ${vis.contactForm ? "lg:col-span-5" : "lg:col-span-12"}`}>
              <div>
                <p className="eyebrow">Office</p>
                <p className="mt-4 font-display text-2xl leading-snug">{company.name}</p>
                <p className="mt-2 text-muted-foreground">{company.address}</p>
              </div>
              <div>
                <p className="eyebrow">Email</p>
                <p className="mt-4">
                  <a href={`mailto:${company.email}`} className="link-underline">
                    {company.email}
                  </a>
                </p>
              </div>
              <div>
                <p className="eyebrow">Phone</p>
                <p className="mt-4">{company.phone}</p>
              </div>
              {company.workingHours && (
                <div>
                  <p className="eyebrow">Working Hours</p>
                  <p className="mt-4 text-muted-foreground">{company.workingHours}</p>
                </div>
              )}
              {vis.contactMap && (
                <div className="aspect-[4/3] w-full overflow-hidden border border-border">
                  <iframe
                    title="Office Location"
                    src="https://www.google.com/maps?q=Ahmedabad,Gujarat,India&output=embed"
                    loading="lazy"
                    className="h-full w-full grayscale"
                  />
                </div>
              )}
            </aside>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow block">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-b border-border bg-transparent py-3 outline-none focus:border-gold text-sm"
      />
    </div>
  );
}
