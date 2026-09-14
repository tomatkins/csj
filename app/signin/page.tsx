import type { Metadata } from 'next';
import { AuthPage } from '@/components/auth-page';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to the Cloudsurfing Jupiter client portal. Separate from the public mailing list.',
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return <AuthPage />;
}
