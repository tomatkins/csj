'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CONTACT_PATH } from '@/lib/site';
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_OPEN_EVENT, readCookieConsent } from '@/lib/cookie-consent';

export function StickyMobileCta() {
  const [bannerOpen, setBannerOpen] = useState(true);

  useEffect(() => {
    const sync = () => setBannerOpen(readCookieConsent() === null);
    sync();
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    const reopen = () => setBannerOpen(true);
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, reopen);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, reopen);
    };
  }, []);

  if (bannerOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[rgba(8,14,28,0.92)] px-4 py-3 backdrop-blur-xl md:hidden">
      <Link
        href={CONTACT_PATH}
        className="flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-electric via-cyan-300 to-violet-400 text-sm font-medium text-space"
      >
        Start a conversation
      </Link>
    </div>
  );
}
