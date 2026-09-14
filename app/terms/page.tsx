import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalArticle, LegalSection } from '@/components/legal-article';
import { PublicChrome } from '@/components/public-chrome';
import { CONTACT_NAME, CONTACT_PATH, SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms and conditions',
  description: `Terms of use for the ${SITE_NAME} website, mailing list, and client portal.`,
};

export default function TermsPage() {
  return (
    <PublicChrome currentPage="/terms">
      <LegalArticle title="Terms and conditions" updated="14 September 2026">
        <LegalSection title="The site">
          <p>
            {SITE_NAME} is an {SITE_TAGLINE.toLowerCase()} operated by {CONTACT_NAME}. Case studies on the homepage are
            proof of consulting work, not an app store or product catalog. High Strung Productions is a sister workshop
            with a different public face.
          </p>
        </LegalSection>

        <LegalSection title="Using the site">
          <p>
            You may browse the public pages, join the mailing list, and send a message through the contact form. Do not
            misuse the forms, probe the service, or attempt to access the client portal without an account.
          </p>
          <p>
            Information on this site is for general description of the consultancy. It is not legal, financial, or
            professional advice, and it is not an offer to sell software.
          </p>
        </LegalSection>

        <LegalSection title="Accounts and mailing list">
          <p>
            The mailing list is optional and separate from the signed-in workspace. Portal accounts are for people we
            invite or who sign up for that workspace. You are responsible for the credentials you create.
          </p>
        </LegalSection>

        <LegalSection title="Content">
          <p>
            Site copy, layout, and original graphics belong to {CONTACT_NAME} / {SITE_NAME} unless a credit says
            otherwise. The manifesto includes third-party poster art used as an editorial illustration; rights remain
            with the original holders.
          </p>
        </LegalSection>

        <LegalSection title="No warranty">
          <p>
            The site is provided as-is. We do not warrant uninterrupted access or that every description of a case
            study or sister product stays current. To the extent allowed by law, {SITE_NAME} is not liable for
            indirect or consequential loss from using the site.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            {CONTACT_NAME}, {SITE_NAME}. Use the{' '}
            <Link href={CONTACT_PATH} className="text-electric/90 hover:text-electric">
              contact form
            </Link>
            . These terms are an operational draft and should be reviewed by counsel before you rely on them.
          </p>
        </LegalSection>
      </LegalArticle>
    </PublicChrome>
  );
}
