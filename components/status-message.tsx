export function StatusMessage({ type, message }: { type: 'error' | 'success'; message?: string | null }) {
  if (!message) return null;

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm ${
        type === 'error'
          ? 'border-rose-400/30 bg-rose-500/10 text-rose-100'
          : 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
      }`}
    >
      {message}
    </div>
  );
}
