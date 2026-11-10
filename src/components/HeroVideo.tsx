import { useEffect, useRef } from 'react';

/**
 * HeroVideo renders a full-width cinematic video background.
 * - Single webm source dengan mp4 fallback untuk Safari/iOS lama.
 * - aria-hidden karena murni dekoratif.
 * - Pause otomatis bila user mengaktifkan prefers-reduced-motion.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (mql.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    apply();
    mql.addEventListener('change', apply);
    return () => mql.removeEventListener('change', apply);
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/hero-poster.jpg"
      aria-hidden="true"
      disablePictureInPicture
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/hero.webm" type="video/webm" />
    </video>
  );
}