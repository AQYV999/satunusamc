import { m } from 'framer-motion';
import { Link } from 'react-router-dom';

type SpringButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler;
};

const MotionLink = m.create(Link);

export function SpringButton({
  children,
  className = '',
  href,
  to,
  target,
  rel,
  onClick,
}: SpringButtonProps) {
  const commonProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
    className: `relative overflow-hidden btn btn-primary ${className}`,
    onClick,
  };

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="btn-shine" />
    </>
  );

  if (to) {
    return <MotionLink to={to} {...commonProps}>{inner}</MotionLink>;
  }
  
  if (href) {
    return <m.a href={href} target={target} rel={rel} {...commonProps}>{inner}</m.a>;
  }

  return <m.button {...commonProps}>{inner}</m.button>;
}
