// lib/seo.ts — per-page <head> management for the client-rendered SPA.
// Sets title + description + canonical + OpenGraph/Twitter + (optional) JSON-LD structured data on
// every route change. Back-compatible: `useSeo(title, description)` still works; pass `opts` for an
// OG image, og:type, structured data, or noindex.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Canonical production origin (no trailing slash). */
export const SITE_URL = "https://elan1.in";
/** Default social share image (overridable per page). */
export const DEFAULT_OG_IMAGE = "/img/about.jpg";

export interface SeoOptions {
  /** Social share image (path or absolute URL). */
  image?: string;
  /** og:type — "website" (default), "article", "product"… */
  type?: string;
  /** schema.org JSON-LD object(s) for this page (Product / Service / etc.). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Keep this page out of the index (e.g. thank-you pages). */
  noindex?: boolean;
}

function absolute(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return SITE_URL + (pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`);
}

function upsertMeta(attr: "name" | "property", key: string, content?: string): void {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSONLD_ID = "page-jsonld";
function setJsonLd(data?: SeoOptions["jsonLd"]): void {
  const existing = document.getElementById(JSONLD_ID);
  if (!data) {
    existing?.remove();
    return;
  }
  const el = (existing as HTMLScriptElement | null) ?? document.createElement("script");
  el.id = JSONLD_ID;
  el.setAttribute("type", "application/ld+json");
  el.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(el);
}

export function useSeo(title: string, description?: string, opts: SeoOptions = {}): void {
  const { pathname } = useLocation();
  const { image, type = "website", jsonLd, noindex = false } = opts;
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = absolute(pathname);
    const img = absolute(image ?? DEFAULT_OG_IMAGE);

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");
    upsertLink("canonical", url);

    // OpenGraph
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:image", img);
    upsertMeta("property", "og:site_name", "elan1");

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);

    setJsonLd(jsonLd);

    return () => setJsonLd(undefined); // each route sets its own; clear on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, pathname, image, type, noindex, jsonLdKey]);
}

// ——— JSON-LD builders (schema.org) ———

export function productJsonLd(
  name: string,
  description: string,
  path: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: { "@type": "Brand", name: "elan1" },
    url: absolute(path),
  };
}

export function serviceJsonLd(
  name: string,
  description: string,
  path: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "Organization", name: "elan1", url: SITE_URL },
    url: absolute(path),
  };
}
