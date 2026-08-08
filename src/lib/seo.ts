// lib/seo.ts — per-page <head> management for the client-rendered SPA.
// Sets title + description + canonical + OpenGraph/Twitter + (optional) JSON-LD structured data on
// every route change. Back-compatible: `useSeo(title, description)` still works; pass `opts` for an
// OG image, og:type, structured data, or noindex.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Canonical production origin (no trailing slash). */
export const SITE_URL = "https://elan1.ai";
/** Default social share image (overridable per page). */
// A purpose-built 1200×630 social card: the wordmark, the descriptor, and nothing else.
// It replaced /img/about.jpg — a stock photograph of people at a desk. That was the sitewide share
// image, so every link shared from this site led with an implied team photo, which is a headcount
// claim in the one medium nobody fact-checks. The About page explicitly refuses to make that claim.
export const DEFAULT_OG_IMAGE = "/img/og-elan1.png";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface SeoOptions {
  /** Social share image (path or absolute URL). */
  image?: string;
  /** og:type — "website" (default), "article", "product"… */
  type?: string;
  /** schema.org JSON-LD object(s) for this page (Product / Service / etc.). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Keep this page out of the index (e.g. thank-you pages). */
  noindex?: boolean;
  /** Breadcrumb trail (parent chain). Current page is appended automatically from the title. */
  breadcrumbs?: BreadcrumbItem[];
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

function breadcrumbJsonLd(crumbs: BreadcrumbItem[], currentName: string): Record<string, unknown> {
  const items: Record<string, unknown>[] = [
    { "@type": "ListItem", position: 1, name: "elan1", item: SITE_URL },
  ];
  let pos = 2;
  for (const c of crumbs) {
    items.push({ "@type": "ListItem", position: pos++, name: c.name, item: absolute(c.href) });
  }
  items.push({ "@type": "ListItem", position: pos, name: currentName });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

const BREADCRUMB_ID = "page-breadcrumb-ld";
function setBreadcrumbLd(data?: Record<string, unknown>): void {
  const existing = document.getElementById(BREADCRUMB_ID);
  if (!data) {
    existing?.remove();
    return;
  }
  const el = (existing as HTMLScriptElement | null) ?? document.createElement("script");
  el.id = BREADCRUMB_ID;
  el.setAttribute("type", "application/ld+json");
  el.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(el);
}

export function useSeo(title: string, description?: string, opts: SeoOptions = {}): void {
  const { pathname } = useLocation();
  const { image, type = "website", jsonLd, noindex = false, breadcrumbs } = opts;
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";
  const bcKey = breadcrumbs ? JSON.stringify(breadcrumbs) : "";

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

    // BreadcrumbList — inject if breadcrumbs are provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      const shortTitle = title.replace(/ \| elan1$/, "").replace(/ — .*$/, "") || title;
      setBreadcrumbLd(breadcrumbJsonLd(breadcrumbs, shortTitle));
    } else {
      setBreadcrumbLd(undefined);
    }

    return () => {
      setJsonLd(undefined);
      setBreadcrumbLd(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, pathname, image, type, noindex, jsonLdKey, bcKey]);
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
