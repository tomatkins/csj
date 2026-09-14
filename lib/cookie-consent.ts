export const COOKIE_CONSENT_KEY = 'csj-cookie-consent';
export const COOKIE_CONSENT_EVENT = 'csj-cookie-consent';
export const COOKIE_CONSENT_OPEN_EVENT = 'csj-cookie-consent-open';

export type CookieConsent = 'accepted' | 'declined';

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === 'accepted' || value === 'declined' ? value : null;
}

export function writeCookieConsent(value: CookieConsent) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
}
