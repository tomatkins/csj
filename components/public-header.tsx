import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export async function PublicHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="text-sm font-medium tracking-wide text-white">
          Cloudsurfing Jupiter
        </Link>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-white/65">
          <a href="#work" className="transition hover:text-white">
            Work
          </a>
          <a href="#list" className="transition hover:text-white">
            Mailing list
          </a>
          {user ? (
            <Link href="/dashboard" className="transition hover:text-white">
              Dashboard
            </Link>
          ) : (
            <Link href="/signin" className="transition hover:text-white">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
