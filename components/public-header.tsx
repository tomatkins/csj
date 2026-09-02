import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

const links = [
  { href: '#who', label: 'Who we help' },
  { href: '#work', label: 'Work' },
  { href: '#proof', label: 'Proof' },
  { href: '#list', label: 'List' },
  { href: '#contact', label: 'Contact' },
];

export async function PublicHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/25 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em] text-electric sm:text-base">
          Cloudsurfing Jupiter
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-3 text-sm text-white/75 sm:gap-5">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-electric">
              {link.label}
            </a>
          ))}
          {user ? (
            <Link href="/dashboard" className="transition hover:text-electric">
              Dashboard
            </Link>
          ) : (
            <Link
              href="/signin"
              className="rounded-full border border-electric/40 px-3 py-1.5 text-electric transition hover:border-electric hover:bg-electric/10"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
