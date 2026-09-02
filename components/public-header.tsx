import Link from 'next/link';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#who', label: 'Who we help' },
  { href: '#proof', label: 'Proof' },
  { href: '#contact', label: 'Contact' },
];

export function PublicHeader() {
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
