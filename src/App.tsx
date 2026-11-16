import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Route-level code splitting: project and service pages load on demand.
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[200] bg-ink px-4 py-3 font-mono text-xs uppercase tracking-technical text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main">
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
