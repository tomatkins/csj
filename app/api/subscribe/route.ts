import { NextResponse } from 'next/server';

/**
 * Mailing list lives on the shared HSP Supabase (public.subscribers),
 * not the CSJ auth project. Anon insert only; Prefer return=minimal so
 * PostgREST does not treat this as an upsert against INSERT-only RLS.
 */
const LIST_URL = (
  process.env.SUBSCRIBERS_SUPABASE_URL ||
  'https://cpdavxsnulzeljgvzcdf.supabase.co'
).replace(/\/$/, '');
const LIST_ANON =
  process.env.SUBSCRIBERS_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwZGF2eHNudWx6ZWxqZ3Z6Y2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NzEyMDUsImV4cCI6MjA5OTA0NzIwNX0.h_qXl_O9tKqxK47wnu3ezPyMekxt1ZNgkAj0UrDcTyo';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown;
      source?: unknown;
      page?: unknown;
    };
    const email =
      typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const source =
      typeof body.source === 'string' ? body.source.trim().slice(0, 120) : 'homepage';
    const page =
      typeof body.page === 'string' ? body.page.trim().slice(0, 240) : '/';

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }

    const res = await fetch(`${LIST_URL}/rest/v1/subscribers`, {
      method: 'POST',
      headers: {
        apikey: LIST_ANON,
        Authorization: `Bearer ${LIST_ANON}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        email,
        brand: 'csj',
        source,
        page,
      }),
    });

    if (res.ok || res.status === 201) {
      return NextResponse.json({ ok: true });
    }
    if (res.status === 409) {
      return NextResponse.json({ ok: true, already: true });
    }

    const detail = await res.text().catch(() => '');
    if (/duplicate|unique/i.test(detail)) {
      return NextResponse.json({ ok: true, already: true });
    }

    console.error('subscribe failed', res.status, detail.slice(0, 300));
    return NextResponse.json(
      { error: 'Could not subscribe right now. Try again in a moment.' },
      { status: 502 },
    );
  } catch (err) {
    console.error('subscribe route error', err);
    return NextResponse.json(
      { error: 'Could not subscribe right now. Try again in a moment.' },
      { status: 500 },
    );
  }
}
