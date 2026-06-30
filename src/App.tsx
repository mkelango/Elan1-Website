// App.tsx — routes for the elan1 corporate site.
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Concept from "./pages/Concept";
import Demo from "./pages/Demo";
import ProductPage from "./pages/ProductPage";
import SolutionPage from "./pages/SolutionPage";
import ServicePage from "./pages/ServicePage";
import { ProductsOverview, SolutionsOverview, ServicesOverview } from "./pages/Overviews";
import { InitiativesOverview, InitiativePage } from "./pages/Initiatives";
import { Philosophy, Flywheel, BuiltOnClaude } from "./pages/Platform";
import WhyElan1 from "./pages/WhyElan1";
import Governance from "./pages/Governance";
import Trust from "./pages/Trust";
import Academy from "./pages/Academy";
import Pricing from "./pages/Pricing";
import Band from "./pages/Band";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import DiagramLibrary from "./pages/DiagramLibrary";
import Proof from "./pages/Proof";
import Glossary from "./pages/Glossary";
import Playbooks from "./pages/Playbooks";
import Insights, { InsightArticle } from "./pages/Insights";
import UseCasesIndex, { UseCasePage } from "./pages/UseCases";
import PartnerPortal from "./pages/PartnerPortal";
import Learn from "./pages/Learn";
import About from "./pages/About";
import { Careers, Partners } from "./pages/Company";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Concept — the cornerstone authority page */}
        <Route path="/what-is-agentic-transformation" element={<Concept />} />
        <Route path="/concept" element={<Navigate to="/what-is-agentic-transformation" replace />} />

        {/* Products */}
        <Route path="/products" element={<ProductsOverview />} />
        <Route path="/products/customer1" element={<Navigate to="/products/sales1" replace />} />
        <Route path="/products/:slug" element={<ProductPage />} />

        {/* Solutions */}
        <Route path="/solutions" element={<SolutionsOverview />} />
        <Route path="/solutions/initiatives" element={<InitiativesOverview />} />
        <Route path="/solutions/initiatives/:slug" element={<InitiativePage />} />
        <Route path="/solutions/:slug" element={<SolutionPage />} />

        {/* Services */}
        <Route path="/services" element={<ServicesOverview />} />
        <Route path="/services/:slug" element={<ServicePage />} />

        {/* Platform */}
        {/* /platform/approach merged into the canonical concept page (maturity curve + why-now live there now) */}
        <Route path="/platform/approach" element={<Navigate to="/what-is-agentic-transformation" replace />} />
        <Route path="/platform/the-1-philosophy" element={<Philosophy />} />
        <Route path="/platform/flywheel" element={<Flywheel />} />
        <Route path="/platform/built-on-claude" element={<BuiltOnClaude />} />
        <Route path="/platform/why-elan1" element={<WhyElan1 />} />
        <Route path="/platform/governance" element={<Governance />} />

        {/* Trust */}
        <Route path="/trust" element={<Trust />} />

        {/* Academy */}
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/learn" element={<Learn />} />

        {/* Resources */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/diagrams" element={<DiagramLibrary />} />
        <Route path="/resources/proof" element={<Proof />} />
        <Route path="/resources/glossary" element={<Glossary />} />
        <Route path="/resources/playbooks" element={<Playbooks />} />
        <Route path="/resources/insights" element={<Insights />} />
        <Route path="/resources/insights/:slug" element={<InsightArticle />} />

        {/* Programmatic use cases (vertical × use-case) */}
        <Route path="/agentic" element={<UseCasesIndex />} />
        <Route path="/agentic/:slug" element={<UseCasePage />} />

        {/* Company */}
        <Route path="/company/about" element={<About />} />
        <Route path="/company/careers" element={<Careers />} />
        <Route path="/company/partners" element={<Partners />} />
        <Route path="/partners" element={<PartnerPortal />} />

        {/* Conversion */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/for/:band" element={<Band />} />
        <Route path="/get-started" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/demo" element={<Demo />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
