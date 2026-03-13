import { CosmicShell } from '@/components/cosmic-shell';
import { AuthCard } from '@/components/auth-card';
import { VerifyForm } from '@/components/verify-form';

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const params = await searchParams;
  const email = params.email ?? '';

  return (
    <CosmicShell>
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-16">
        <AuthCard
          title="Verify your email"
          subtitle={`Check your email — we sent a 6-digit code to ${email || 'your inbox'}.`}
        >
          <div className="space-y-6 text-center text-white/70">
            <p>
              Enter the code below to complete your Cloudsurfing Jupiter launch sequence.
            </p>
            <VerifyForm email={email} />
          </div>
        </AuthCard>
      </main>
    </CosmicShell>
  );
}
