import Link from 'next/link';
import { CosmicShell } from '@/components/cosmic-shell';

export default function NotFound() {
  return (
    <CosmicShell>
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-3xl border border-white/10 bg-white/6 p-10 text-center shadow-glow backdrop-blur-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-electric/75">Lost in orbit</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
          <p className="mt-4 text-lg text-white/65">That route drifted out past the rings of Jupiter.</p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-electric via-cyan-300 to-violet-400 px-6 py-3 font-medium text-space transition hover:scale-[1.01]"
          >
            Return to base
          </Link>
        </div>
      </main>
    </CosmicShell>
  );
}
