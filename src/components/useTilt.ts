import { useMotionValue, useTransform, useSpring } from 'framer-motion';

/**
 * Custom hook for 3D tilt card effect.
 * Only active on desktop (hover-capable devices).
 * Maps mouse position over the card to rotateX / rotateY (max ±10deg).
 */
export function useTilt(maxTilt = 10) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xRotation = useTransform(x, [-1, 1], [maxTilt, -maxTilt]);
  const yRotation = useTransform(y, [-1, 1], [-maxTilt, maxTilt]);

  const springX = useSpring(xRotation, { stiffness: 300, damping: 30 });
  const springY = useSpring(yRotation, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mx = (e.clientX - centerX) / (rect.width / 2);
    const my = (e.clientY - centerY) / (rect.height / 2);
    x.set(mx);
    y.set(my);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { style: { rotateX: springY, rotateY: springX }, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
