import { ContactForm } from '@/components/contact-form';
import { createClient } from '@/lib/supabase/server';
import { Profile } from '@/lib/types';

export default async function ContactPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single<Profile>();

  const name = profile ? `${profile.first_name} ${profile.last_name}` : user?.email ?? '';
  const email = profile?.email ?? user?.email ?? '';
  const username = profile?.username ?? '';

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-electric/75">Signal the mothership</p>
        <h1 className="text-4xl font-semibold text-white">Contact Us</h1>
        <p className="text-lg text-white/65">Send a note to Cloudsurfing Jupiter and Tom Atkins.</p>
      </section>

      <ContactForm name={name} email={email} username={username} />
    </div>
  );
}
