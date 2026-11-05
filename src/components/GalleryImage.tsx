import { useState } from 'react';

type Props = { src: string; alt: string; className?: string };

export function GalleryImage({ src, alt, className = '' }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10`}>
        <span className="text-5xl opacity-30">📷</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setError(true)}
      className={className}
    />
  );
}