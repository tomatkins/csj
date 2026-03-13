"use client";

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { StatusMessage } from '@/components/status-message';

export function VerifyForm({ email }: { email: string }) {
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup',
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <StatusMessage type="error" message={error} />
      <label className="flex w-full flex-col gap-2 text-left text-sm text-white/80 sm:text-base">
        <span>6-digit verification code</span>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={token}
          onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-center text-2xl tracking-[0.45em] text-white outline-none transition focus:border-electric/60 focus:ring-2 focus:ring-electric/20 sm:tracking-[0.6em]"
        />
      </label>
      <button disabled={loading || token.length !== 6} className="h-12 w-full rounded-full bg-gradient-to-r from-electric via-cyan-300 to-violet-400 px-5 text-base font-medium text-space transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? 'Verifying…' : 'Verify'}
      </button>
    </form>
  );
}
