import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type EmailActionType = 'signup' | 'magiclink' | 'recovery' | 'invite' | 'email_change' | 'reauthentication' | string;

type SupabaseEmailHookPayload = {
  user?: {
    id?: string;
    email?: string;
  };
  email_data?: {
    token?: string;
    token_hash?: string;
    redirect_to?: string;
    email_action_type?: EmailActionType;
    site_url?: string;
    token_new?: string;
    token_hash_new?: string;
  };
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getEnv(name: string) {
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

function getExpectedSecret() {
  return getEnv('SUPABASE_HOOK_SECRET');
}

function extractProvidedSecret(request: Request) {
  // Supabase sends the secret as the full Authorization header value
  const authorizationHeader = request.headers.get('authorization')?.trim();
  if (authorizationHeader) {
    // Could be "Bearer v1,whsec_..." or just "v1,whsec_..."
    const bearerMatch = authorizationHeader.match(/^Bearer\s+(.+)$/i);
    return bearerMatch?.[1]?.trim() ?? authorizationHeader;
  }

  return request.headers.get('x-supabase-hook-secret')?.trim() ?? '';
}

function isAuthorized(request: Request) {
  const expectedSecret = getExpectedSecret();
  if (!expectedSecret) return false;

  const providedSecret = extractProvidedSecret(request);
  if (!providedSecret) return false;

  return timingSafeEqual(expectedSecret, providedSecret);
}

function sanitizeEmail(value: unknown) {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (!email || email.length > 254) return null;
  if (!EMAIL_REGEX.test(email)) return null;
  return email;
}

function sanitizeToken(value: unknown) {
  if (typeof value !== 'string') return null;
  const token = value.replace(/\D/g, '').slice(0, 8);
  return token.length >= 6 ? token : null;
}

function getActionLabel(actionType: EmailActionType | undefined) {
  switch (actionType) {
    case 'signup':
      return 'Confirm your account';
    case 'magiclink':
      return 'Your sign-in code';
    case 'recovery':
      return 'Your password reset code';
    case 'invite':
      return 'Your invitation code';
    case 'email_change':
      return 'Confirm your email change';
    case 'reauthentication':
      return 'Your security verification code';
    default:
      return 'Your verification code';
  }
}

function getPreheader(actionLabel: string, token: string) {
  return `${actionLabel}: ${token}`;
}

function buildEmailHtml({ token, actionLabel, recipientEmail }: { token: string; actionLabel: string; recipientEmail: string }) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${actionLabel}</title>
  </head>
  <body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f8fafc;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${getPreheader(actionLabel, token)}</div>
    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background:#0a0a0f;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="max-width:620px;border:1px solid rgba(255,255,255,0.08);border-radius:28px;overflow:hidden;background:linear-gradient(180deg,#0f1220 0%,#090b12 100%);box-shadow:0 30px 80px rgba(0,0,0,0.45);">
            <tr>
              <td style="padding:40px 36px 16px;background:radial-gradient(circle at top left, rgba(34,211,238,0.18), transparent 36%), radial-gradient(circle at top right, rgba(167,139,250,0.16), transparent 34%), #0f1220;">
                <div style="font-size:12px;letter-spacing:0.38em;text-transform:uppercase;color:#67e8f9;opacity:0.9;">Cloudsurfing Jupiter</div>
                <h1 style="margin:18px 0 10px;font-size:34px;line-height:1.1;font-weight:700;color:#ffffff;">${actionLabel}</h1>
                <p style="margin:0;font-size:16px;line-height:1.7;color:rgba(248,250,252,0.72);">
                  Space-aged sound. Human connection.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 36px 0;">
                <p style="margin:0 0 12px;font-size:15px;line-height:1.7;color:rgba(248,250,252,0.82);">
                  Hey there — use this 6-digit code to continue your Cloudsurfing Jupiter launch sequence for <span style="color:#ffffff;">${recipientEmail}</span>.
                </p>
                <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(248,250,252,0.58);">Your verification code:</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 36px 16px;">
                <div style="border-radius:24px;border:1px solid rgba(103,232,249,0.24);background:linear-gradient(135deg, rgba(34,211,238,0.1), rgba(167,139,250,0.08));padding:24px 20px;text-align:center;">
                  <div style="font-size:40px;line-height:1;font-weight:800;letter-spacing:0.38em;text-indent:0.38em;color:#ffffff;">${token}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 36px;">
                <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:rgba(248,250,252,0.58);">
                  Enter this code on the verification screen to finish signing in. If you didn&apos;t request this, you can safely ignore this email.
                </p>
                <p style="margin:0;font-size:13px;line-height:1.7;color:rgba(248,250,252,0.4);">
                  Sent from noreply@cloudsurfing-jupiter.com
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildEmailText({ token, actionLabel }: { token: string; actionLabel: string }) {
  return `${actionLabel}\n\nCloudsurfing Jupiter\n\nYour verification code: ${token}\n\nSpace-aged sound. Human connection.\n\nIf you didn’t request this, you can safely ignore this email.\n\nFrom: noreply@cloudsurfing-jupiter.com`;
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({}, { status: 401 });
    }

    const resendApiKey = getEnv('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY for Supabase email hook');
      return NextResponse.json({}, { status: 500 });
    }

    const body = (await request.json()) as SupabaseEmailHookPayload;
    const recipientEmail = sanitizeEmail(body?.user?.email);
    const token = sanitizeToken(body?.email_data?.token);
    const actionType = body?.email_data?.email_action_type;

    if (!recipientEmail || !token) {
      console.error('Invalid Supabase send email payload', {
        hasEmail: Boolean(recipientEmail),
        hasToken: Boolean(token),
        actionType,
      });
      return NextResponse.json({}, { status: 400 });
    }

    const resend = new Resend(resendApiKey);
    const actionLabel = getActionLabel(actionType);

    const { error } = await resend.emails.send({
      from: 'Cloudsurfing Jupiter <noreply@cloudsurfing-jupiter.com>',
      to: recipientEmail,
      subject: `${actionLabel} · Cloudsurfing Jupiter`,
      html: buildEmailHtml({ token, actionLabel, recipientEmail }),
      text: buildEmailText({ token, actionLabel }),
    });

    if (error) {
      console.error('Resend email send failed', error);
      return NextResponse.json({}, { status: 502 });
    }

    return NextResponse.json({});
  } catch (error) {
    console.error('Supabase send email hook error', error);
    return NextResponse.json({}, { status: 500 });
  }
}
