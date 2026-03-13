"use client";

import { useEffect } from 'react';

export function WelcomeBanner({ firstName }: { firstName: string }) {
  const message = `Hello ${firstName}, welcome to Cloudsurfing Jupiter. We are glad you are here!`;

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1;
    utterance.pitch = 1.05;
    utterance.volume = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    return () => window.speechSynthesis.cancel();
  }, [message]);

  return (
    <div className="rounded-3xl border border-electric/25 bg-electric/10 p-6 shadow-glow backdrop-blur-2xl">
      <p className="text-sm uppercase tracking-[0.35em] text-electric/80">Welcome aboard</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{message}</h2>
      <p className="mt-3 max-w-3xl text-white/70">
        Your cosmic dashboard is live. Explore the High Strung Music Library, lessons, and direct contact features from one smooth orbit.
      </p>
    </div>
  );
}
