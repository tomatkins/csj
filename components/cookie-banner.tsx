'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_OPEN_EVENT,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from '@/lib/cookie-consent';

export function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent | null | 'pending'>('pending');

  useEffect(() => {
    const sync = () => setConsent(readCookieConsent());
    sync();
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    const reopen = () => setConsent(null);
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, reopen);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, reopen);
    };
  }, []);

  if (consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[rgba(8,14,28,0.92)] px-4 py-4 shadow-[0_-12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-white/75">
          Essential cookies keep the client portal signed in. Optional Google Analytics runs only on the live site if you accept.{' '}
          <Link href="/privacy" className="text-electric/90 underline-offset-4 hover:text-electric hover:underline">
            Privacy policy
          </Link>
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => writeCookieConsent('declined')}
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-electric/50 hover:text-electric"
          >
            Decline analytics
          </button>
          <button
            type="button"
            onClick={() => writeCookieConsent('accepted')}
            className="rounded-full bg-gradient-to-r from-electric via-cyan-300 to-violet-400 px-4 py-2 text-sm font-medium text-space transition hover:scale-[1.01]"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
