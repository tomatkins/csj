import { CosmicShell } from '@/components/cosmic-shell';

export default function RedirectPage() {
  return (
    <CosmicShell>
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-16">
        <section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/8 p-10 text-center shadow-glow backdrop-blur-2xl sm:p-14">
          <p className="text-sm uppercase tracking-[0.35em] text-electric/75">Cloudsurfing Jupiter</p>
          <h1 className="mt-5 bg-gradient-to-r from-electric via-cyan-300 to-violet-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Cloudsurfing Jupiter Productions
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">
            You&apos;ve been redirected here — we will provide more information later.
          </p>
        </section>
      </main>
    </CosmicShell>
  );
}
