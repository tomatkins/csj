import { ReactNode } from 'react';

export function LegalArticle({
  title,
  kicker,
  updated,
  children,
}: {
  title: string;
  kicker?: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <article className="rounded-3xl border border-white/10 bg-[rgba(12,28,64,0.21)] p-6 shadow-glow backdrop-blur-2xl sm:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-electric/80">{kicker ?? 'Cloudsurfing Jupiter'}</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-white/50">Last updated {updated}</p>
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-white/75 sm:text-base">{children}</div>
      </article>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}
