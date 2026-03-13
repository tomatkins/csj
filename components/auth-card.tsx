import { ReactNode } from 'react';

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/8 p-5 shadow-glow backdrop-blur-2xl sm:p-8">
      <div className="mb-8 space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-electric/80">Cloudsurfing Jupiter</p>
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
        <p className="text-sm text-white/65 sm:text-base">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
