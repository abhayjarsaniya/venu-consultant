import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/_site")({
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  ),
});
