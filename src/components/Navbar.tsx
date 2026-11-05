import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE, NAVIGATION } from '../config/site';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, m, useScroll, useMotionValueEvent } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    const onPop = () => setIsOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('popstate', onPop);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('popstate', onPop);
    };
  }, [isOpen]);

  return (
    <m.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-lg' 
          : 'bg-[#09090b]/80 backdrop-blur-md border-[#1f1f23]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="SatuNusaMC Logo"
            className="w-10 h-10 rounded-xl object-cover shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-float"
            loading="eager"
          />
          <span className="text-xl font-bold font-display text-white tracking-tight">{SITE.name}</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1 bg-[#111113]/80 p-1.5 rounded-full border border-[#1f1f23]">
          {NAVIGATION.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                aria-current={active ? 'page' : undefined}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active ? 'bg-emerald-500/15 text-emerald-400 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="hidden md:block">
          <Link to="/store" className="btn btn-primary text-sm py-2.5 px-5">
            Beli Rank
          </Link>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg"
        >
          {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-label="Menu navigasi"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#111113] border-b border-[#1f1f23] px-4 py-6 flex flex-col gap-3 overflow-hidden"
          >
            {NAVIGATION.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className={`py-3 px-4 rounded-xl text-base font-medium ${location.pathname === item.href ? 'bg-emerald-500/15 text-emerald-400' : 'text-slate-400'}`}>
                {item.name}
              </Link>
            ))}
            <Link to="/store" onClick={() => setIsOpen(false)} className="btn btn-primary text-center mt-2">
              Beli Rank
            </Link>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
  );
}