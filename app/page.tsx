import Link from 'next/link';
import { EmailCapture } from '@/components/email-capture';
import { PublicHeader } from '@/components/public-header';
import { loadCaseStudies } from '@/lib/case-studies';

export default async function HomePage() {
  const studies = await loadCaseStudies();

  return (
    <div className="min-h-screen bg-space text-white">
      <PublicHeader />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <p className="text-sm text-white/50">Cloudsurfing Jupiter</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          AI for musicians and the music business.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          A small studio from Tom Atkins — the AI face of{' '}
          <a
            href="https://highstrungpro.com"
            className="text-white/90 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
          >
            High Strung Productions
          </a>
          . Information on the work, not a product wall.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55">
          Featured apps are case studies — proof of the work as each project progresses.
        </p>

        <section id="work" className="mt-20 scroll-mt-24">
          <h2 className="text-sm font-medium uppercase tracking-wider text-white/45">Selected work</h2>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {studies.map((study) => (
              <li key={study.slug} className="py-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  {study.href ? (
                    <a href={study.href} className="text-xl font-medium text-white transition hover:text-electric">
                      {study.title}
                    </a>
                  ) : (
                    <h3 className="text-xl font-medium text-white">{study.title}</h3>
                  )}
                  {study.outcome ? <span className="text-sm text-white/45">{study.outcome}</span> : null}
                </div>
                <p className="mt-3 text-base leading-relaxed text-white/65">{study.summary}</p>
                {study.stack.length > 0 ? (
                  <p className="mt-3 text-sm text-white/40">{study.stack.join(' · ')}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section id="list" className="mt-20 scroll-mt-24">
          <EmailCapture source="homepage" />
        </section>
      </main>
      <footer className="mx-auto max-w-3xl px-6 pb-12 text-sm text-white/40">
        <p>
          The signed-in studio is unchanged, behind sign-in.{' '}
          <Link href="/signin" className="text-white/60 transition hover:text-white">
            Sign in
          </Link>
          {' · '}
          <a href="https://highstrungpro.com" className="text-white/60 transition hover:text-white">
            High Strung Productions
          </a>
        </p>
      </footer>
    </div>
  );
}
