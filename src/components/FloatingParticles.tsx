import { m } from 'framer-motion';
import { useState } from 'react';

/**
 * Floating particles background for Home Hero.
 * Random values dihitung sekali via lazy state initializer (aman dari purity rule).
 */
export function FloatingParticles({ count = 20 }: { count?: number } = {}) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 12 + 4,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5,
    })),
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <m.div
          key={p.id}
          className="absolute rounded-full bg-emerald-400/30 blur-[8px]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.top}%`,
            left: `${p.left}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
