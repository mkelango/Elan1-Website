// App.tsx — routes for the elan1 corporate site.
// All page components are lazy-loaded for code splitting.
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Concept = lazy(() => import("./pages/Concept"));
const Demo = lazy(() => import("./pages/Demo"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const PlatformOverview = lazy(() => import("./pages/PlatformOverview"));
const Assistant1Page = lazy(() => import("./pages/Assistant1Page"));
const EngineeringPage = lazy(() => import("./pages/EngineeringPage"));
const ConnectorsPage = lazy(() => import("./pages/ConnectorsPage"));
const VerticalsConfigPage = lazy(() => import("./pages/VerticalsConfigPage"));
const SolutionPage = lazy(() => import("./pages/SolutionPage"));
const ServicePage = lazy(() => import("./pages/ServicePage").then(m => ({ default: m.default })));
const ServicesRedirect = lazy(() => import("./pages/ServicePage").then(m => ({ default: m.ServicesRedirect })));
const ProductsOverview = lazy(() => import("./pages/Overviews").then(m => ({ default: m.ProductsOverview })));
const SolutionsOverview = lazy(() => import("./pages/Overviews").then(m => ({ default: m.SolutionsOverview })));
const InitiativesOverview = lazy(() => import("./pages/Initiatives").then(m => ({ default: m.InitiativesOverview })));
const InitiativePage = lazy(() => import("./pages/Initiatives").then(m => ({ default: m.InitiativePage })));
const Philosophy = lazy(() => import("./pages/Platform").then(m => ({ default: m.Philosophy })));
const Flywheel = lazy(() => import("./pages/Platform").then(m => ({ default: m.Flywheel })));
const BuiltOnClaude = lazy(() => import("./pages/Platform").then(m => ({ default: m.BuiltOnClaude })));
const WhyElan1 = lazy(() => import("./pages/WhyElan1"));
const Governance = lazy(() => import("./pages/Governance"));
const Trust = lazy(() => import("./pages/Trust"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Band = lazy(() => import("./pages/Band"));
const Contact = lazy(() => import("./pages/Contact"));
const Resources = lazy(() => import("./pages/Resources"));
const DiagramLibrary = lazy(() => import("./pages/DiagramLibrary"));
const Proof = lazy(() => import("./pages/Proof"));
const Glossary = lazy(() => import("./pages/Glossary"));
const Playbooks = lazy(() => import("./pages/Playbooks"));
const Insights = lazy(() => import("./pages/Insights").then(m => ({ default: m.default })));
const InsightArticle = lazy(() => import("./pages/Insights").then(m => ({ default: m.InsightArticle })));
const UseCasesIndex = lazy(() => import("./pages/UseCases").then(m => ({ default: m.default })));
const UseCasePage = lazy(() => import("./pages/UseCases").then(m => ({ default: m.UseCasePage })));
const Learn = lazy(() => import("./pages/Learn"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Company").then(m => ({ default: m.Careers })));
const Partners = lazy(() => import("./pages/Company").then(m => ({ default: m.Partners })));
const Newsroom = lazy(() => import("./pages/Newsroom"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-clay border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* Concept — the cornerstone authority page */}
          <Route path="/what-is-agentic-transformation" element={<Concept />} />
          <Route path="/concept" element={<Navigate to="/what-is-agentic-transformation" replace />} />

          {/* Products */}
          <Route path="/products" element={<ProductsOverview />} />
          <Route path="/products/category/revenue1" element={<Navigate to="/products/category/revenue" replace />} />
          <Route path="/products/category/service1" element={<Navigate to="/products/category/service" replace />} />
          <Route path="/products/category/trade1" element={<Navigate to="/products/category/trade" replace />} />
          <Route path="/products/category/works1" element={<Navigate to="/products/category/works" replace />} />
          <Route path="/products/category/compass1" element={<Navigate to="/products/category/compass" replace />} />
          <Route path="/products/category/:slug" element={<CategoryPage />} />
          <Route path="/products/customer1" element={<Navigate to="/products/sales1" replace />} />
          <Route path="/products/enterprise1" element={<Navigate to="/platform/enterprise1" replace />} />
          <Route path="/products/:slug" element={<ProductPage />} />

          {/* Solutions */}
          <Route path="/solutions" element={<SolutionsOverview />} />
          <Route path="/solutions/initiatives" element={<InitiativesOverview />} />
          <Route path="/solutions/initiatives/:slug" element={<InitiativePage />} />
          <Route path="/solutions/:slug" element={<SolutionPage />} />

          {/* Services — RETIRED */}
          <Route path="/services" element={<Navigate to="/platform" replace />} />
          <Route path="/services/:slug" element={<ServicesRedirect />} />

          {/* Platform */}
          <Route path="/platform" element={<PlatformOverview />} />
          <Route path="/platform/approach" element={<Navigate to="/what-is-agentic-transformation" replace />} />
          <Route path="/platform/the-1-philosophy" element={<Philosophy />} />
          <Route path="/platform/flywheel" element={<Flywheel />} />
          <Route path="/platform/built-on-claude" element={<BuiltOnClaude />} />
          <Route path="/platform/why-elan1" element={<WhyElan1 />} />
          <Route path="/platform/governance" element={<Governance />} />
          <Route path="/platform/assistant1" element={<Assistant1Page />} />
          <Route path="/platform/enterprise1" element={<ProductPage slug="enterprise1" />} />
          <Route path="/platform/engineering" element={<EngineeringPage />} />
          <Route path="/platform/connectors" element={<ConnectorsPage />} />
          <Route path="/platform/verticals-are-config" element={<VerticalsConfigPage />} />
          <Route path="/platform/:slug" element={<ServicePage home="platform" />} />

          {/* Trust */}
          <Route path="/trust" element={<Trust />} />

          {/* Academy — RETIRED */}
          <Route path="/academy" element={<Navigate to="/resources/academy" replace />} />
          <Route path="/academy/learn" element={<Navigate to="/resources/academy/learn" replace />} />
          <Route path="/academy/:slug" element={<ServicesRedirect />} />

          {/* Resources */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/diagrams" element={<DiagramLibrary />} />
          <Route path="/resources/proof" element={<Proof />} />
          <Route path="/resources/glossary" element={<Glossary />} />
          <Route path="/resources/playbooks" element={<Playbooks />} />
          <Route path="/resources/insights" element={<Insights />} />
          <Route path="/resources/insights/:slug" element={<InsightArticle />} />
          <Route path="/resources/academy" element={<ServicePage home="resources" slug="academy" />} />
          <Route path="/resources/academy1" element={<Navigate to="/resources/academy" replace />} />
          <Route path="/resources/academy/learn" element={<Learn />} />

          {/* Programmatic use cases */}
          <Route path="/agentic" element={<UseCasesIndex />} />
          <Route path="/agentic/:slug" element={<UseCasePage />} />

          {/* Company */}
          <Route path="/company/about" element={<About />} />
          <Route path="/company/careers" element={<Careers />} />
          <Route path="/company/newsroom" element={<Newsroom />} />
          <Route path="/company/partners" element={<Partners />} />
          <Route path="/partners" element={<Navigate to="/company/partners" replace />} />

          {/* Conversion */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/for/:band" element={<Band />} />
          <Route path="/get-started" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
