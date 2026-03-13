const lessonCards = ['Lead Guitar', 'Songwriting', 'Tone Craft'];

export default function LessonsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-electric/75">Learn in orbit</p>
        <h1 className="text-4xl font-semibold text-white">Lessons</h1>
        <p className="text-lg text-white/65">Guitar lessons and tutorials from Tom Atkins — coming soon.</p>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/6 p-6 shadow-glow backdrop-blur-2xl">
        <div className="aspect-video w-full rounded-3xl border border-dashed border-electric/30 bg-black/30 p-6">
          <div className="flex h-full items-center justify-center rounded-3xl bg-gradient-to-br from-electric/10 via-nebula/10 to-transparent">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-electric/75">Video Bay</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">YouTube lesson embed placeholder</h2>
              <p className="mt-3 text-white/60">Future videos will land here with cosmic polish.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {lessonCards.map((card) => (
          <article key={card} className="rounded-3xl border border-white/10 bg-white/6 p-5 shadow-glow backdrop-blur-2xl">
            <div className="h-36 rounded-3xl bg-gradient-to-br from-nebula/25 via-electric/10 to-aurora/20" />
            <h3 className="mt-5 text-2xl font-semibold text-white">{card}</h3>
            <p className="mt-2 text-white/65">Coming soon from Tom Atkins.</p>
          </article>
        ))}
      </section>
    </div>
  );
}
