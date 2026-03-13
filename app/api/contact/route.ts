import { NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
  name: 120,
  email: 254,
  username: 50,
  subject: 100,
  message: 2000,
} as const;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  username?: unknown;
  subject?: unknown;
  message?: unknown;
};

function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return null;
  const sanitized = value.replace(/[\u0000-\u001F\u007F]/g, '').trim();
  if (!sanitized) return null;
  if (sanitized.length > maxLength) return null;
  return sanitized;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = sanitizeText(body.name, MAX_LENGTHS.name);
    const email = sanitizeText(body.email, MAX_LENGTHS.email);
    const username = typeof body.username === 'string'
      ? body.username.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, MAX_LENGTHS.username)
      : '';
    const subject = sanitizeText(body.subject, MAX_LENGTHS.subject);
    const message = sanitizeText(body.message, MAX_LENGTHS.message);

    if (!name) {
      return NextResponse.json({ error: 'Name is required and must be 120 characters or less.' }, { status: 400 });
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!subject) {
      return NextResponse.json({ error: 'Subject is required and must be 100 characters or less.' }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: 'Message is required and must be 2000 characters or less.' }, { status: 400 });
    }

    console.log('Cloudsurfing Jupiter contact submission:', {
      name,
      email,
      username: username || null,
      subject,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json({ error: 'Unable to process contact request.' }, { status: 500 });
  }
}
