import { ReactNode } from 'react';
import { CosmicShell } from '@/components/cosmic-shell';
import { PublicHeader } from '@/components/public-header';
import { SiteFooter } from '@/components/site-footer';
import { StickyMobileCta } from '@/components/sticky-mobile-cta';

export function PublicChrome({
  children,
  currentPage,
  reading = false,
}: {
  children: ReactNode;
  currentPage?: string;
  reading?: boolean;
}) {
  return (
    <CosmicShell reading={reading}>
      <PublicHeader currentPage={currentPage} />
      <div className="pb-24 md:pb-0">{children}</div>
      <SiteFooter />
      <StickyMobileCta />
    </CosmicShell>
  );
}
