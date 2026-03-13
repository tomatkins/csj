import { ReactNode } from 'react';
import { Starfield } from './starfield';

export function CosmicShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-space text-white">
      <Starfield />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
