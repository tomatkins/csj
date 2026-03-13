"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const links = [
  { href: '/dashboard' as const, label: 'Dashboard' },
  { href: '/music' as const, label: 'High Strung Music Library' },
  { href: '/lessons' as const, label: 'Lessons' },
  { href: '/contact' as const, label: 'Contact' },
];

export function NavBar() {
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/25 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/dashboard" className="text-lg font-semibold tracking-[0.25em] text-electric uppercase">
          Cloudsurfing Jupiter
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-white/80">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-electric">
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={signOut}
            className="rounded-full border border-electric/40 px-4 py-2 text-electric transition hover:border-electric hover:bg-electric/10"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  );
}
