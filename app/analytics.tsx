'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

export default function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(['cloudsurfing-jupiter.com', 'www.cloudsurfing-jupiter.com'].includes(window.location.hostname));
  }, []);

  // Keep local development and Vercel previews out of production reports.
  return enabled ? <GoogleAnalytics gaId="G-7CYRQCN6MB" /> : null;
}
