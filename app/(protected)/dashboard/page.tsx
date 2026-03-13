import { AssistantPanel } from '@/components/assistant-panel';
import { WelcomeBanner } from '@/components/welcome-banner';
import { createClient } from '@/lib/supabase/server';
import { Profile } from '@/lib/types';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single<Profile>();

  const firstName = profile?.first_name || user?.email?.split('@')[0] || 'Explorer';

  return (
    <div className="space-y-8">
      <WelcomeBanner firstName={firstName} />
      <section className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <AssistantPanel />
        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/6 p-6 shadow-glow backdrop-blur-2xl">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-electric/75">Mission status</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Your creative orbit at a glance</h3>
          </div>
          <div className="grid gap-4">
            {[
              ['Music Library', 'High Strung Music Library placeholder catalog is online.'],
              ['Lessons', 'The lesson bay is staged for upcoming tutorials.'],
              ['Contact', 'Mission Control contact channel is active.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="mt-2 text-sm text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
