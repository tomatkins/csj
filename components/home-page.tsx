import Link from 'next/link';
import { CosmicShell } from '@/components/cosmic-shell';
import { EmailCapture } from '@/components/email-capture';
import { PublicContact } from '@/components/public-contact';
import { PublicHeader } from '@/components/public-header';
import { HSP_SITE, relatedAppHref, type CaseStudy } from '@/lib/case-studies';

const whoWeHelp = [
  {
    title: 'Musicians',
    copy: 'Practice, catalog, and the messy files around a working career.',
  },
  {
    title: 'Labels',
    copy: 'Release ops, metadata, and the queue that never quite empties.',
  },
  {
    title: 'Catalogs',
    copy: 'Rights, assets, and the question of where that master actually lives.',
  },
  {
    title: 'Music ops',
    copy: 'The unglamorous systems that keep a roster and a calendar moving.',
  },
];

const whatWeDo = [
  {
    title: 'Decide what needs a model',
    copy: 'Some problems want an agent. Some want a script. Some want a better process. We start there, not with a slide about transformation.',
  },
  {
    title: 'Ship into the real workflow',
    copy: 'Prototypes that land in the studio, the catalog, and the label — small enough to use, serious enough to keep.',
  },
  {
    title: 'Keep the work owned',
    copy: 'On-device and private when the material is private. Shared CMS, mailing list, and tools when they already exist — including High Strung Pro.',
  },
];

export function HomePage({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <CosmicShell>
      <PublicHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <section className="max-w-3xl space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-electric/80 sm:tracking-[0.45em]">
            AI consultancy for musicians and the music business
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            Cloudsurfing{' '}
            <span className="bg-gradient-to-r from-electric via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              Jupiter
            </span>
          </h1>
          <p className="max-w-2xl text-base text-white/70 sm:text-lg">
            We help musicians, labels, catalogs, and music ops put AI to work — without turning the studio into a software company. This is the AI consulting front of High Strung Productions.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#proof"
              className="rounded-full bg-gradient-to-r from-electric via-cyan-300 to-violet-400 px-5 py-3 text-sm font-medium text-space transition hover:scale-[1.01]"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/85 transition hover:border-electric/50 hover:text-electric"
            >
              Start a conversation
            </a>
          </div>
        </section>

        <section id="who" className="mt-20 scroll-mt-28">
          <p className="text-xs uppercase tracking-[0.28em] text-electric/80">Who we help</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">People who make and run music.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whoWeHelp.map((item, index) => (
              <article
                key={item.title}
                className="animate-drift rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl"
                style={{ animationDelay: `${index * 180}ms` }}
              >
                <div className="mb-3 h-1.5 w-10 rounded-full bg-gradient-to-r from-electric to-nebula" />
                <h3 className="text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="mt-20 scroll-mt-28">
          <p className="text-xs uppercase tracking-[0.28em] text-electric/80">What we do</p>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
            AI work that belongs in the catalog, not on a pitch deck.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {whatWeDo.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
                <h3 className="text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="proof" className="mt-20 scroll-mt-28">
          <p className="text-xs uppercase tracking-[0.28em] text-electric/80">Proof</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Case studies, not a catalog.</h2>
          <p className="mt-3 max-w-2xl text-sm text-white/65 sm:text-base">
            These apps are evidence of the consulting work. The product home lives at High Strung Productions.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <article key={study.slug} className="flex flex-col rounded-3xl border border-white/10 bg-white/6 p-6 shadow-glow backdrop-blur-2xl">
                <h3 className="text-xl font-semibold text-white">{study.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{study.summary}</p>
                {study.stack.length ? (
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-aurora/80">{study.stack.join(' · ')}</p>
                ) : null}
                {study.outcome ? (
                  <p className="mt-3 text-sm text-white/80">{study.outcome}</p>
                ) : null}
                {study.relatedApp ? (
                  <a
                    href={relatedAppHref(study.relatedApp)}
                    className="mt-5 text-sm text-electric/90 transition hover:text-electric"
                  >
                    Related work at High Strung Pro →
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 max-w-2xl">
          <EmailCapture source="homepage" />
        </section>

        <section id="contact" className="mt-20 scroll-mt-28 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.28em] text-electric/80">Contact</p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Start a conversation.</h2>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              Tell us what you are trying to ship. The mailing list above is for notes; this form is for a working conversation. The signed-in workspace is separate.
            </p>
            <p className="text-sm text-white/60">
              Sister workshop:{' '}
              <a href={HSP_SITE} className="text-electric/90 transition hover:text-electric">
                High Strung Productions
              </a>
              — music home and product catalog. Shared CMS and mailing list; a different face.
            </p>
          </div>
          <PublicContact />
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Cloudsurfing Jupiter · AI consultancy for musicians and the music business</p>
          <div className="flex flex-wrap gap-4">
            <a href={HSP_SITE} className="transition hover:text-electric">
              High Strung Productions
            </a>
            <Link href="/signin" className="transition hover:text-electric">
              Client portal
            </Link>
          </div>
        </div>
      </footer>
    </CosmicShell>
  );
}
