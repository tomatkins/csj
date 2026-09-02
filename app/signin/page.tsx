import { redirect } from 'next/navigation';
import { AuthPage } from '@/components/auth-page';
import { createClient } from '@/lib/supabase/server';

export default async function SignInPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect('/dashboard');

  return <AuthPage />;
}
