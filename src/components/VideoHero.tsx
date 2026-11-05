/**
 * VideoHero renders a fullscreen video background for both Desktop and Mobile.
 * Uses autoPlay, loop, muted, and playsInline for universal mobile autoplay support.
 */
export function VideoHero() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        className="w-full h-full object-cover"
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
