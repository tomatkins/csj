const guitars = ['Guitar #1', 'Guitar #2', 'Guitar #3'];

export default function GuitarsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-electric/75">String constellation</p>
        <h1 className="text-4xl font-semibold text-white">Guitar Gallery</h1>
        <p className="text-lg text-white/65">Tom Atkins&apos; Guitar Collection</p>
      </section>

      {/* Photos and guitar data to be added from Obsidian vault */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {guitars.map((guitar, index) => (
          <article key={guitar} className="rounded-3xl border border-white/10 bg-white/6 p-5 shadow-glow backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-100">
                Coming Soon
              </span>
              <span className="text-white/35">0{index + 1}</span>
            </div>
            <div className="mt-5 flex h-56 items-center justify-center rounded-3xl bg-gradient-to-br from-electric/30 via-nebula/35 to-aurora/25 text-6xl shadow-[inset_0_0_60px_rgba(255,255,255,0.06)]">
              <span aria-hidden="true">🎸</span>
            </div>
            <div className="mt-5 space-y-2">
              <h2 className="text-2xl font-semibold text-white">{guitar}</h2>
              <p className="text-white/65">A future addition to Tom&apos;s cosmic collection.</p>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/45">
              Detailed specs, photos, and stories landing soon.
            </div>
          </article>
        ))}
      </section>

      <p className="text-white/55">The gallery is staged and ready for real guitar photos, specs, and notes.</p>
    </div>
  );
}
