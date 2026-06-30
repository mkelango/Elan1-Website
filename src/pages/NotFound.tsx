// pages/NotFound.tsx — 404.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { Icon } from "../components/primitives";

export default function NotFound() {
  useSeo("Page not found | elan1");
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-paper">
      <div className="absolute inset-0 bg-grid-paper opacity-60" aria-hidden />
      <div className="shell relative text-center">
        <p className="display text-7xl text-clayDeep sm:text-8xl">404</p>
        <h1 className="display mt-4 text-2xl text-ink sm:text-3xl">This page hasn't been deployed — yet.</h1>
        <p className="lede mx-auto mt-4 max-w-md">The window to lead is open, but this URL isn't part of it. Let's get you back to something that ships.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Back home <Icon.Arrow className="h-4 w-4" /></Link>
          <Link to="/products" className="btn-ghost">Explore the 1 Suite</Link>
        </div>
      </div>
    </section>
  );
}
