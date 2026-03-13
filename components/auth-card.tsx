import { ReactNode } from 'react';

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/8 p-8 shadow-glow backdrop-blur-2xl">
      <div className="mb-8 space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-electric/80">Cloudsurfing Jupiter</p>
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        <p className="text-white/65">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
