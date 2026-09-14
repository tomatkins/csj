import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicChrome } from '@/components/public-chrome';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That Cloudsurfing Jupiter route is not on this orbit.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PublicChrome>
      <main className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6 py-16">
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
    </PublicChrome>
  );
}
