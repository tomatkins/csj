'use client';

import { openCookieSettings } from '@/lib/cookie-consent';

export function CookieSettingsButton() {
  return (
    <button type="button" onClick={openCookieSettings} className="transition hover:text-electric">
      Cookies
    </button>
  );
}
