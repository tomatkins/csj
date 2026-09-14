import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalArticle, LegalSection } from '@/components/legal-article';
import { PublicChrome } from '@/components/public-chrome';
import { CONTACT_NAME, CONTACT_PATH, HSP_SITE, SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `How ${SITE_NAME} collects and uses information from the public site, mailing list, contact form, and client portal.`,
};

export default function PrivacyPage() {
  return (
    <PublicChrome currentPage="/privacy">
      <LegalArticle title="Privacy policy" updated="14 September 2026">
        <LegalSection title="Who we are">
          <p>
            {SITE_NAME} is an {SITE_TAGLINE.toLowerCase()} operated by {CONTACT_NAME}. This policy describes the public
            website, the mailing list, the contact form, and the optional signed-in client portal.
          </p>
          <p>
            Questions:{' '}
            <Link href={CONTACT_PATH} className="text-electric/90 hover:text-electric">
              use the contact form
            </Link>
            . That is the published contact for {CONTACT_NAME} on this site. We do not list a postal address here.
          </p>
        </LegalSection>

        <LegalSection title="What we collect">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-white/90">Contact form:</strong> name, email, subject, and message, so we can
              reply.
            </li>
            <li>
              <strong className="text-white/90">Mailing list:</strong> email address, and the page/source you joined
              from. The list is shared with High Strung Productions (
              <a href={HSP_SITE} className="text-electric/90 hover:text-electric">
                highstrungpro.com
              </a>
              ); it is separate from creating a portal account.
            </li>
            <li>
              <strong className="text-white/90">Client portal:</strong> if you sign up, we store account details you
              provide (name, email, optional social URLs) and authentication cookies needed to keep you signed in.
            </li>
            <li>
              <strong className="text-white/90">Analytics:</strong> if you accept optional analytics, Google Analytics
              may collect standard usage data (pages viewed, approximate location, device) on the live domain only.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies">
          <p>
            Essential cookies run the client portal session (Supabase auth). We also store your analytics choice in
            local storage so the banner remembers Accept or Decline.
          </p>
          <p>
            Optional analytics cookies load only after you accept, and only on cloudsurfing-jupiter.com. You can change
            that choice from the Cookies link in the footer.
          </p>
        </LegalSection>

        <LegalSection title="How we use information">
          <p>
            We use contact messages to respond. We use mailing-list addresses to send occasional notes about the work.
            We do not sell this information. We do not use the mailing list as account signup.
          </p>
        </LegalSection>

        <LegalSection title="How to reach us or leave the list">
          <p>
            Email {CONTACT_NAME} through the{' '}
            <Link href={CONTACT_PATH} className="text-electric/90 hover:text-electric">
              contact form
            </Link>{' '}
            to ask a question, request a copy of what we hold, or ask to be removed from the mailing list.
          </p>
        </LegalSection>

        <LegalSection title="Changes">
          <p>
            We may update this page as the site changes. The date at the top is the latest revision. This is an
            operational draft for the live site and should be reviewed by counsel before you rely on it as legal advice.
          </p>
        </LegalSection>
      </LegalArticle>
    </PublicChrome>
  );
}
