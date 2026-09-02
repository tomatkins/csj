"use client";

import { FormEvent, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * Mailing-list capture — NOT account signup.
 * Writes to public.subscribers (brand=csj). auth.users / profiles are untouched.
 */
type Props = {
  source?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailCapture({ source = 'homepage' }: Props) {
  const [email, setEmail] = useState('');
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setError(null);

    if (honey) {
      setStatus('You’re on the list. Thanks for listening.');
      setEmail('');
      return;
    }

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !EMAIL_RE.test(trimmed) || trimmed.length > 254) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);
    const page = typeof window !== 'undefined' ? window.location.pathname : '/';
    const { error: insertError } = await supabase.from('subscribers').insert({
      email: trimmed,
      brand: 'csj',
      source,
      page,
    });
    setLoading(false);

    if (insertError) {
      if (insertError.code === '23505' || /duplicate|unique/i.test(insertError.message)) {
        setStatus('You’re already on the list. Welcome back.');
        setEmail('');
        return;
      }
      setError('Could not subscribe right now. Try again in a moment.');
      return;
    }

    setStatus('You’re on the list. Thanks for listening.');
    setEmail('');
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/6 p-5 text-left shadow-glow backdrop-blur-2xl sm:p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-electric/80">Mailing list — no account needed</p>
      <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Notes from the orbit</h2>
      <p className="mt-2 text-sm text-white/70">
        Occasional dispatches on AI for musicians and the music business. Separate from signing up for an account.
      </p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="csj-mailing-email">Email</label>
        <input
          id="csj-mailing-email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 w-full rounded-full border border-white/10 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-electric/60 focus:ring-2 focus:ring-electric/20 sm:flex-1"
        />
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        />
        <button
          disabled={loading}
          className="h-12 shrink-0 rounded-full bg-white/10 px-5 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Join the list'}
        </button>
      </form>
      {status ? <p className="mt-3 text-sm text-cyan-200/90">{status}</p> : null}
      {error ? <p className="mt-3 text-sm text-rose-300/90">{error}</p> : null}
    </section>
  );
}
