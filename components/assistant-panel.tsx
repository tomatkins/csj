"use client";

import { FormEvent, useState } from 'react';
import { ChatMessage } from '@/lib/types';
import { StatusMessage } from '@/components/status-message';

export function AssistantPanel() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user' as const, content: input.trim() }].slice(-5);
    setMessages(nextMessages);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unable to contact the Jupiter assistant.');

      const assistantReply = data.reply as string;
      setResponse(assistantReply);
      setMessages([...nextMessages, { role: 'assistant' as const, content: assistantReply }].slice(-5));
      setInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/6 p-6 shadow-glow backdrop-blur-2xl">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.35em] text-electric/75">AI Assistant</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">How can I help you today?</h3>
        <p className="mt-2 text-white/65">Ask about the platform, the music library, lessons, or how to get in touch.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="Plot your next move through the Cloudsurfing Jupiter universe…"
          className="w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-electric/60 focus:ring-2 focus:ring-electric/20"
        />
        <button disabled={loading} className="rounded-full bg-gradient-to-r from-electric via-cyan-300 to-violet-400 px-5 py-3 font-medium text-space transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Consulting the cosmos…' : 'Ask the Assistant'}
        </button>
      </form>

      <div className="mt-5 space-y-4">
        <StatusMessage type="error" message={error} />
        {response ? (
          <div className="rounded-3xl border border-white/10 bg-black/25 p-5 text-white/85">
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-electric/80">Assistant reply</p>
            <p className="whitespace-pre-wrap leading-7">{response}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
