import { m, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Custom cursor — desktop only.
 * Follows the mouse with spring physics; hidden on mobile.
 */
export function CustomCursor() {
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
  
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 28 });
  const springY = useSpring(y, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (!isDesktop) return;

    // Sembunyiin kursor asli OS
    document.body.classList.add('cursor-hidden');

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX - 8); // -8 karena setengah dari width 16px
      y.set(e.clientY - 8);
    };

    window.addEventListener('mousemove', handleMove);
    
    return () => {
      document.body.classList.remove('cursor-hidden');
      window.removeEventListener('mousemove', handleMove);
    };
  }, [isDesktop, x, y]);

  if (!isDesktop) return null;

  return (
    <m.div
      className="custom-cursor"
      style={{ x: springX, y: springY }}
    />
  );
}
