import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const ProjectPage = lazy(() => import('./pages/ProjectPage'));

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
