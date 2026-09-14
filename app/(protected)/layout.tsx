import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { CosmicShell } from '@/components/cosmic-shell';
import { NavBar } from '@/components/nav-bar';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/signin');

  return (
    <CosmicShell>
      <NavBar />
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </CosmicShell>
  );
}
