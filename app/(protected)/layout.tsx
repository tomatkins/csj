import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { CosmicShell } from '@/components/cosmic-shell';
import { NavBar } from '@/components/nav-bar';
import { createClient } from '@/lib/supabase/server';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/');

  return (
    <CosmicShell>
      <NavBar />
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </CosmicShell>
  );
}
