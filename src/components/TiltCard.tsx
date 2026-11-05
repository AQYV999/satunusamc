import { m } from 'framer-motion';
import { useTilt } from './useTilt';

type Props = {
  children: React.ReactNode;
  className?: string;
  max?: number;
};

/**
 * Wrapper component that applies 3D tilt effect.
 * Fixes rules-of-hooks violation by calling useTilt outside of .map().
 */
export function TiltCard({ children, className = '', max = 8 }: Props) {
  const t = useTilt(max);
  
  return (
    <m.div
      style={{ ...t.style, transformPerspective: 1000 }}
      onMouseMove={t.onMouseMove}
      onMouseLeave={t.onMouseLeave}
      className={className}
    >
      {children}
    </m.div>
  );
}
