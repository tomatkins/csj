import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicChrome } from '@/components/public-chrome';
import { CONTACT_PATH } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your message or mailing-list request was received.',
  robots: { index: false, follow: false },
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; already?: string }>;
}) {
  const params = await searchParams;
  const list = params.source === 'list';
  const already = params.already === '1';

  const title = list
    ? already
      ? 'You are already on the list'
      : 'You are on the list'
    : 'Message received';
  const copy = list
    ? already
      ? 'Welcome back. Occasional notes from the orbit will keep going to the address we already have.'
      : 'Thanks for listening. Occasional notes from the orbit will land in that inbox — no account required.'
    : 'Thanks for writing. Tom Atkins / Cloudsurfing Jupiter will be in touch.';

  return (
    <PublicChrome>
      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-16 sm:px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-[rgba(12,28,64,0.21)] p-8 text-center shadow-glow backdrop-blur-2xl sm:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-electric/75">Cloudsurfing Jupiter</p>
          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/70">{copy}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-gradient-to-r from-electric via-cyan-300 to-violet-400 px-5 py-3 text-sm font-medium text-space transition hover:scale-[1.01]"
            >
              Back to Jupiter
            </Link>
            <Link
              href={CONTACT_PATH}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/85 transition hover:border-electric/50 hover:text-electric"
            >
              Contact again
            </Link>
          </div>
        </div>
      </main>
    </PublicChrome>
  );
}
