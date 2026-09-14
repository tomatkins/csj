'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect, useState } from 'react';
import { COOKIE_CONSENT_EVENT, readCookieConsent } from '@/lib/cookie-consent';

const PRODUCTION_HOSTS = ['cloudsurfing-jupiter.com', 'www.cloudsurfing-jupiter.com'];
const GA_ID = 'G-7CYRQCN6MB';

export default function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => {
      const hostOk = PRODUCTION_HOSTS.includes(window.location.hostname);
      setEnabled(hostOk && readCookieConsent() === 'accepted');
    };
    sync();
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
  }, []);

  // Production hostname + explicit consent. Previews and local remain out of GA.
  return enabled ? <GoogleAnalytics gaId={GA_ID} /> : null;
}
