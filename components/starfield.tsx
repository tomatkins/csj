export function Starfield() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden opacity-70">
      <div className="absolute inset-0 bg-space/55 bg-cosmic" />
      <div className="stars-layer stars-sm" />
      <div className="stars-layer stars-md" />
      <div className="stars-layer stars-lg" />
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(84,210,255,0.16),transparent_60%)]" />
    </div>
  );
}
