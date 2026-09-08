import { ReactNode } from 'react';
import { Starfield } from './starfield';

export function CosmicShell({ children, reading = false }: { children: ReactNode; reading?: boolean }) {
  return (
    <div className={`csj-hero relative min-h-screen overflow-hidden bg-space text-white${reading ? ' csj-reading' : ''}`}>
      <div aria-hidden className="csj-hero-image" />
      <div aria-hidden className="csj-hero-vignette" />
      {!reading && <Starfield />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
