"use client";

import { FormEvent, useState } from 'react';
import { StatusMessage } from '@/components/status-message';

type Props = {
  name: string;
  email: string;
  username: string;
};

export function ContactForm({ name, email, username }: Props) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, username, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unable to send message');
      setStatus('Message received. Mission Control will be in touch soon.');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/6 p-6 shadow-glow backdrop-blur-2xl">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/75">
          <span>Name</span>
          <input readOnly value={name} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/80" />
        </label>
        <label className="space-y-2 text-sm text-white/75">
          <span>Email</span>
          <input readOnly value={email} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/80" />
        </label>
      </div>
      <label className="space-y-2 text-sm text-white/75 block">
        <span>Subject</span>
        <input required value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-electric/60 focus:ring-2 focus:ring-electric/20" />
      </label>
      <label className="space-y-2 text-sm text-white/75 block">
        <span>Message</span>
        <textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-electric/60 focus:ring-2 focus:ring-electric/20" />
      </label>
      <div className="space-y-4">
        <StatusMessage type="success" message={status} />
        <StatusMessage type="error" message={error} />
      </div>
      <button disabled={loading} className="rounded-full bg-gradient-to-r from-electric via-cyan-300 to-violet-400 px-5 py-3 font-medium text-space transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
