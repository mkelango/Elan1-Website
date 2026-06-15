// components/Layout.tsx — app shell: scroll-to-top + consent-gated pageview on route change, Nav,
// page, Footer, and the privacy consent banner.
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ConsentBanner } from "./ConsentBanner";
import { trackPageview } from "../lib/analytics";

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    trackPageview(pathname); // no-op unless the visitor consented (and an endpoint is configured)
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <RouteEffects />
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  );
}
