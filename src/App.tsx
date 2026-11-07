import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RouteEffects } from './components/RouteEffects';
import { ScrollUI } from './components/ScrollUI';
import { PageLoader } from './components/PageLoader';
import { Home } from './pages/Home';
import { AnnouncementBar } from './components/AnnouncementBar';

const Store = lazy(() => import('./pages/Store').then((m) => ({ default: m.Store })));
const Vote = lazy(() => import('./pages/Vote').then((m) => ({ default: m.Vote })));
const Rules = lazy(() => import('./pages/Rules').then((m) => ({ default: m.Rules })));
const News = lazy(() => import('./pages/News').then((m) => ({ default: m.News })));
const Staff = lazy(() => import('./pages/Staff').then((m) => ({ default: m.Staff })));
const Support = lazy(() => import('./pages/Support').then((m) => ({ default: m.Support })));
const Wiki = lazy(() => import('./pages/Wiki').then((m) => ({ default: m.Wiki })));
const Donors = lazy(() => import('./pages/Donors').then((m) => ({ default: m.Donors })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));


const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/donatur" element={<Donors />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/news" element={<News />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/support" element={<Support />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </m.div>
    </AnimatePresence>
  );
};


export default function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <ScrollUI />
      <a href="#main-content" className="skip-link">Langsung ke konten utama</a>
      <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--foreground)]">
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 mt-20 focus:outline-none">
          <AnnouncementBar />
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}