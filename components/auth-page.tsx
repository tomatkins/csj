"use client";

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { CosmicShell } from '@/components/cosmic-shell';
import { AuthCard } from '@/components/auth-card';
import { StatusMessage } from '@/components/status-message';

type Mode = 'signin' | 'signup';

type SigninState = {
  email: string;
  password: string;
};

type SignupState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  xHandle: string;
  facebookUrl: string;
  youtubeUrl: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
  email: 254,
  firstName: 50,
  lastName: 50,
  password: 128,
  xHandle: 50,
  facebookUrl: 200,
  youtubeUrl: 200,
} as const;

const initialSignup: SignupState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  xHandle: '',
  facebookUrl: '',
  youtubeUrl: '',
};

function trimValue(value: string) {
  return value.trim();
}

function sanitizeSignup(values: SignupState): SignupState {
  return {
    firstName: trimValue(values.firstName),
    lastName: trimValue(values.lastName),
    email: trimValue(values.email),
    password: trimValue(values.password),
    xHandle: trimValue(values.xHandle),
    facebookUrl: trimValue(values.facebookUrl),
    youtubeUrl: trimValue(values.youtubeUrl),
  };
}

function sanitizeSignin(values: SigninState): SigninState {
  return {
    email: trimValue(values.email),
    password: trimValue(values.password),
  };
}

function validateSignin(values: SigninState) {
  if (!values.email || !values.password) return 'Email and password are required';
  if (values.email.length > MAX_LENGTHS.email) return 'Email must be 254 characters or less';
  if (values.password.length > MAX_LENGTHS.password) return 'Password must be 128 characters or less';
  if (!EMAIL_REGEX.test(values.email)) return 'Please enter a valid email address';
  return null;
}

function validateSignup(values: SignupState) {
  if (!values.firstName || !values.lastName || !values.email || !values.password) {
    return 'Please complete all required fields';
  }
  if (values.firstName.length > MAX_LENGTHS.firstName) return 'First name must be 50 characters or less';
  if (values.lastName.length > MAX_LENGTHS.lastName) return 'Last name must be 50 characters or less';
  if (values.email.length > MAX_LENGTHS.email) return 'Email must be 254 characters or less';
  if (values.password.length > MAX_LENGTHS.password) return 'Password must be 128 characters or less';
  if (values.password.length < 12) return 'Password must be at least 12 characters';
  if (values.xHandle.length > MAX_LENGTHS.xHandle) return 'X Handle must be 50 characters or less';
  if (values.facebookUrl.length > MAX_LENGTHS.facebookUrl) return 'Facebook URL must be 200 characters or less';
  if (values.youtubeUrl.length > MAX_LENGTHS.youtubeUrl) return 'YouTube URL must be 200 characters or less';
  if (!EMAIL_REGEX.test(values.email)) return 'Please enter a valid email address';
  return null;
}

export function AuthPage() {
  const [mode, setMode] = useState<Mode>('signin');
  const [signin, setSignin] = useState<SigninState>({ email: '', password: '' });
  const [signup, setSignup] = useState<SignupState>(initialSignup);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const sanitizedSignin = sanitizeSignin(signin);
    setSignin(sanitizedSignin);

    const validationError = validateSignin(sanitizedSignin);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: sanitizedSignin.email,
      password: sanitizedSignin.password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const sanitizedSignup = sanitizeSignup(signup);
    setSignup(sanitizedSignup);

    const validationError = validateSignup(sanitizedSignup);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const redirectTo = `${window.location.origin}/verify?email=${encodeURIComponent(sanitizedSignup.email)}`;
    const { error: signUpError } = await supabase.auth.signUp({
      email: sanitizedSignup.email,
      password: sanitizedSignup.password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          first_name: sanitizedSignup.firstName,
          last_name: sanitizedSignup.lastName,
          x_handle: sanitizedSignup.xHandle || null,
          facebook_url: sanitizedSignup.facebookUrl || null,
          youtube_url: sanitizedSignup.youtubeUrl || null,
        },
      },
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    setLoading(false);
    setSuccess('Account created. Enter the 6-digit code from your email to finish docking.');
    router.push(`/verify?email=${encodeURIComponent(sanitizedSignup.email)}`);
  };

  return (
    <CosmicShell>
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <section className="space-y-6 text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-electric/80 sm:tracking-[0.45em]">Space-aged sound. Human connection.</p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              Welcome to <span className="bg-gradient-to-r from-electric via-cyan-300 to-violet-400 bg-clip-text text-transparent">Cloudsurfing Jupiter</span>.
            </h1>
            <p className="max-w-xl text-base text-white/70 sm:text-lg">
              Step into Tom Atkins&apos; cosmic corner of music, lessons, and creative connection — wrapped in a sleek neon orbit.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Music Library', 'Lessons', 'Direct Contact'].map((item, index) => (
                <div key={item} className="animate-drift rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-xl" style={{ animationDelay: `${index * 300}ms` }}>
                  <div className="mb-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-electric to-nebula" />
                  <p className="text-sm text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <AuthCard
            title={mode === 'signin' ? 'Return to orbit' : 'Create your cosmic account'}
            subtitle={mode === 'signin' ? 'Sign in to access your dashboard.' : 'Sign up to unlock the full Cloudsurfing Jupiter experience.'}
          >
            <div className="mb-6 grid grid-cols-2 rounded-full border border-white/10 bg-black/20 p-1">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`rounded-full px-4 py-2.5 text-sm transition sm:text-base ${mode === 'signin' ? 'bg-electric text-space' : 'text-white/70 hover:text-white'}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`rounded-full px-4 py-2.5 text-sm transition sm:text-base ${mode === 'signup' ? 'bg-electric text-space' : 'text-white/70 hover:text-white'}`}
              >
                Sign Up
              </button>
            </div>

            <div className="space-y-4">
              <StatusMessage type="error" message={error} />
              <StatusMessage type="success" message={success} />
            </div>

            {mode === 'signin' ? (
              <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
                <Field label="Email">
                  <input required type="email" maxLength={MAX_LENGTHS.email} value={signin.email} onChange={(e) => setSignin({ ...signin, email: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Password">
                  <input required type="password" maxLength={MAX_LENGTHS.password} value={signin.password} onChange={(e) => setSignin({ ...signin, password: e.target.value })} className={inputClass} />
                </Field>
                <button disabled={loading} className={buttonClass}>{loading ? 'Launching…' : 'Sign In'}</button>
              </form>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
                <Field label="First Name">
                  <input required maxLength={MAX_LENGTHS.firstName} value={signup.firstName} onChange={(e) => setSignup({ ...signup, firstName: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Last Name">
                  <input required maxLength={MAX_LENGTHS.lastName} value={signup.lastName} onChange={(e) => setSignup({ ...signup, lastName: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Email">
                  <input required type="email" maxLength={MAX_LENGTHS.email} value={signup.email} onChange={(e) => setSignup({ ...signup, email: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Create your password" helperText="Minimum 12 characters">
                  <input required type="password" minLength={12} maxLength={MAX_LENGTHS.password} value={signup.password} onChange={(e) => setSignup({ ...signup, password: e.target.value })} className={inputClass} />
                </Field>
                <Field label="X Handle">
                  <input maxLength={MAX_LENGTHS.xHandle} value={signup.xHandle} placeholder="@yourhandle" onChange={(e) => setSignup({ ...signup, xHandle: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Facebook URL">
                  <input type="url" maxLength={MAX_LENGTHS.facebookUrl} value={signup.facebookUrl} onChange={(e) => setSignup({ ...signup, facebookUrl: e.target.value })} className={inputClass} />
                </Field>
                <Field label="YouTube URL">
                  <input type="url" maxLength={MAX_LENGTHS.youtubeUrl} value={signup.youtubeUrl} onChange={(e) => setSignup({ ...signup, youtubeUrl: e.target.value })} className={inputClass} />
                </Field>
                <button disabled={loading} className={buttonClass}>{loading ? 'Creating orbit…' : 'Create Account'}</button>
              </form>
            )}
          </AuthCard>
        </div>
      </main>
    </CosmicShell>
  );
}

function Field({ label, helperText, children }: { label: string; helperText?: string; children: React.ReactNode }) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm text-white/80 sm:text-base">
      <span>{label}</span>
      {children}
      {helperText ? <span className="text-sm text-white/45">{helperText}</span> : null}
    </label>
  );
}

const inputClass = 'h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-electric/60 focus:ring-2 focus:ring-electric/20';
const buttonClass = 'h-12 w-full rounded-full bg-gradient-to-r from-electric via-cyan-300 to-violet-400 px-5 text-base font-medium text-space transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60';
