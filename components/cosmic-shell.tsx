import { ReactNode } from 'react';
import { Starfield } from './starfield';

export function CosmicShell({ children }: { children: ReactNode }) {
  return (
    <div className="csj-hero relative min-h-screen overflow-hidden bg-space text-white">
      <div aria-hidden className="csj-hero-image" />
      <div aria-hidden className="csj-hero-vignette" />
      <Starfield />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
