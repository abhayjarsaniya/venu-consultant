import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/about")({
  component: AboutLayout,
});

const aboutNav = [
  { to: "/about" as const, label: "Overview" },
  { to: "/about/mission" as const, label: "Mission & Vision" },
  { to: "/about/leadership" as const, label: "Leadership" },
  { to: "/about/team" as const, label: "Team" },
  { to: "/about/why-choose-us" as const, label: "Why Choose Us" },
  { to: "/about/infrastructure" as const, label: "Infrastructure" },
  { to: "/about/library" as const, label: "Library" },
];

function AboutLayout() {
  return (
    <div>
      <div className="border-b border-border bg-bone/40">
        <div className="container-wide flex gap-1 overflow-x-auto py-4">
          {aboutNav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-foreground text-background" }}
              className="whitespace-nowrap px-4 py-2 text-xs uppercase tracking-[0.16em] transition hover:bg-foreground hover:text-background"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
