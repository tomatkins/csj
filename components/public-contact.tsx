"use client";

import { FormEvent, useState } from 'react';
import { StatusMessage } from '@/components/status-message';

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_SUBJECT = 100;
const MAX_MESSAGE = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimValue(value: string) {
  return value.trim();
}

export function PublicContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setError(null);

    const trimmedName = trimValue(name);
    const trimmedEmail = trimValue(email);
    const trimmedSubject = trimValue(subject);
    const trimmedMessage = trimValue(message);

    setName(trimmedName);
    setEmail(trimmedEmail);
    setSubject(trimmedSubject);
    setMessage(trimmedMessage);

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setError('Please complete all fields.');
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail) || trimmedEmail.length > MAX_EMAIL) {
      setError('Please enter a valid email.');
      return;
    }
    if (trimmedName.length > MAX_NAME) {
      setError('Name must be 120 characters or less.');
      return;
    }
    if (trimmedSubject.length > MAX_SUBJECT) {
      setError('Subject must be 100 characters or less.');
      return;
    }
    if (trimmedMessage.length > MAX_MESSAGE) {
      setError('Message must be 2000 characters or less.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          username: '',
          subject: trimmedSubject,
          message: trimmedMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unable to send message');
      setStatus('Message received. We will be in touch.');
      setName('');
      setEmail('');
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
          <input
            required
            maxLength={MAX_NAME}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-electric/60 focus:ring-2 focus:ring-electric/20"
          />
        </label>
        <label className="space-y-2 text-sm text-white/75">
          <span>Email</span>
          <input
            required
            type="email"
            maxLength={MAX_EMAIL}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-electric/60 focus:ring-2 focus:ring-electric/20"
          />
        </label>
      </div>
      <label className="block space-y-2 text-sm text-white/75">
        <span>Subject</span>
        <input
          required
          maxLength={MAX_SUBJECT}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-electric/60 focus:ring-2 focus:ring-electric/20"
        />
      </label>
      <label className="block space-y-2 text-sm text-white/75">
        <span>Message</span>
        <textarea
          required
          rows={6}
          maxLength={MAX_MESSAGE}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-electric/60 focus:ring-2 focus:ring-electric/20"
        />
      </label>
      <div className="space-y-4">
        <StatusMessage type="success" message={status} />
        <StatusMessage type="error" message={error} />
      </div>
      <button
        disabled={loading}
        className="rounded-full bg-gradient-to-r from-electric via-cyan-300 to-violet-400 px-5 py-3 font-medium text-space transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
