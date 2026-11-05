import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../config/site';

/**
 * RouteEffects handles scroll-to-top on navigation and updates the document title.
 * Title map can be extended later; for now use simple mapping.
 */
export function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.title = SITE.name;
    // Pindahkan fokus ke main untuk screen reader setelah navigasi
    const main = document.getElementById('main-content');
    main?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
