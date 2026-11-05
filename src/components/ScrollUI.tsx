import { m, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ScrollUI shows a top progress bar and a back‑to‑top button (desktop only).
 * The bar follows scroll position via `useScroll` + `useSpring`.
 */
export function ScrollUI() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handler = () => {
      setShowBtn(window.scrollY > 600);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Back‑to‑top click handler
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress bar */}
      <m.div
        className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-r from-emerald-500 to-sky-500"
        style={{ transformOrigin: '0%', scaleX }}
      />

      {/* Back‑to‑top button */}
      <AnimatePresence>
        {showBtn && (
          <m.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 btn btn-primary"
            onClick={backToTop}
            aria-label="Kembali ke atas"
          >
            <span aria-hidden="true">↑</span>
          </m.button>
        )}
      </AnimatePresence>
    </>
  );
}
