import Link from 'next/link';
import { CONTACT_NAME, CONTACT_PATH, HSP_SITE, SITE_NAME } from '@/lib/site';
import { CookieSettingsButton } from '@/components/cookie-settings-button';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-white/50 sm:px-6">
        <p>
          <span className="text-white/75">{CONTACT_NAME}</span>
          {' · '}
          {SITE_NAME} · AI consultancy for musicians and the music business
        </p>
        <p>
          Contact:{' '}
          <Link href={CONTACT_PATH} className="text-electric/90 transition hover:text-electric">
            start a conversation
          </Link>
          . No separate postal address is published on this site.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/privacy" className="transition hover:text-electric">
            Privacy
          </Link>
          <Link href="/terms" className="transition hover:text-electric">
            Terms
          </Link>
          <CookieSettingsButton />
          <a href={HSP_SITE} className="transition hover:text-electric">
            High Strung Productions
          </a>
          <Link href="/signin" className="transition hover:text-electric">
            Client portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
