import { m } from 'framer-motion';

type Props = {
  eyebrow?: string;
  title: string;
  desc?: string;
  className?: string;
};

/**
 * SectionHeading displays an optional eyebrow, title, and description
 * with scroll-reveal animation.
 */
export function SectionHeading({ eyebrow, title, desc, className = '' }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`text-center mb-8 ${className}`}
    >
      {eyebrow && (
        <p className="text-emerald-400 text-sm font-medium mb-2">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
      {desc && <p className="text-slate-400">{desc}</p>}
    </m.div>
  );
}