const tracks = [
  'Jupiter Skies',
  'High Strung Aurora',
  'Cosmic Drift',
];

export default function MusicPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-electric/75">Cloudsurfing Jupiter</p>
        <h1 className="text-4xl font-semibold text-white">High Strung Music Library</h1>
        <p className="text-lg text-white/65">The complete Cloudsurfing Jupiter music catalog.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tracks.map((track, index) => (
          <article key={track} className="rounded-3xl border border-white/10 bg-white/6 p-5 shadow-glow backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-100">
                Coming Soon
              </span>
              <span className="text-white/35">0{index + 1}</span>
            </div>
            <div className="mt-5 h-56 rounded-3xl bg-gradient-to-br from-electric/30 via-nebula/35 to-aurora/25" />
            <div className="mt-5 space-y-2">
              <h2 className="text-2xl font-semibold text-white">{track}</h2>
              <p className="text-white/65">Tom Atkins</p>
            </div>
            <button disabled className="mt-5 w-full rounded-full border border-white/10 bg-black/20 px-4 py-3 text-white/40">
              Play Soon
            </button>
          </article>
        ))}
      </section>

      <p className="text-white/55">Music files and full catalog coming soon.</p>
    </div>
  );
}
