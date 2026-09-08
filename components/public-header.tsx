import Link from 'next/link';

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/#who', label: 'Who we help' },
  { href: '/#proof', label: 'Proof' },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/#contact', label: 'Contact' },
] as const;

export function PublicHeader({ currentPage }: { currentPage?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/25 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:gap-6">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em] text-electric sm:text-base">
          Cloudsurfing Jupiter
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/75 md:justify-end lg:gap-x-5">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={currentPage === link.href ? 'page' : undefined} className="py-2 transition hover:text-electric aria-[current=page]:text-electric">
              {link.label}
            </Link>
          ))}
          <Link
            href="/signin"
            className="rounded-full border border-white/15 px-3 py-1.5 text-white/80 transition hover:border-electric/50 hover:text-electric"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
