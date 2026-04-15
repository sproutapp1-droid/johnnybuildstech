import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TO_NAME = 'Jonathan';
const TO_EMAIL = 'jonathanlai928@gmail.com';

const PROJECT_TYPES = new Set([
  'Landing page',
  'Service site',
  'Full build',
  'Apps / other',
  'Just saying hello',
]);

const BUDGETS = new Set([
  '',
  'Under £2k',
  '£2–5k',
  '£5–10k',
  '£10k+',
  'Not sure yet',
]);

type Payload = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  company?: string; // honeypot
  clientMountedAt?: number;
};

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

// in-memory IP throttle (single-region serverless is fine for MVP)
const RECENT = new Map<string, number>();
const THROTTLE_MS = 60_000;

function throttled(ip: string) {
  const now = Date.now();
  const last = RECENT.get(ip);
  for (const [k, v] of RECENT) if (now - v > THROTTLE_MS) RECENT.delete(k);
  if (last && now - last < THROTTLE_MS) return true;
  RECENT.set(ip, now);
  return false;
}

export async function POST(req: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json(
      {
        error:
          'Server email isn’t configured yet. Please use the mailto fallback below.',
      },
      { status: 500 },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return badRequest('Malformed request.');
  }

  // Honeypot — silently succeed so the bot thinks it worked.
  if (body.company && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Timing guard — real humans take longer than 2s.
  if (
    typeof body.clientMountedAt === 'number' &&
    Date.now() - body.clientMountedAt < 2000
  ) {
    return NextResponse.json({ ok: true });
  }

  // IP throttle
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  if (throttled(ip)) {
    return NextResponse.json(
      { error: 'One message per minute, please — try again in a moment.' },
      { status: 429 },
    );
  }

  // Server-side validation
  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const projectType = (body.projectType ?? '').trim();
  const budget = (body.budget ?? '').trim();
  const message = (body.message ?? '').trim();

  if (name.length < 2 || name.length > 120) return badRequest('Name looks off.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
    return badRequest('Email looks off.');
  if (!PROJECT_TYPES.has(projectType))
    return badRequest('Please pick a project type.');
  if (!BUDGETS.has(budget)) return badRequest('Budget value is invalid.');
  if (message.length < 10 || message.length > 5000)
    return badRequest('A few more words about what you have in mind, please.');

  // POST to Web3Forms. It forwards to the verified recipient email.
  // Any custom fields are rendered in the email body.
  const subject = `[johnnybuildstech] New enquiry — ${name} · ${projectType}`;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: `${name} · johnnybuildstech`,
        // Web3Forms uses `email` as the Reply-To address.
        email,
        // Who it's going to (cosmetic; routing is set by the access key).
        to_name: TO_NAME,
        // All other fields render as key/value in the email body.
        'Name': name,
        'Email': email,
        'Project type': projectType,
        'Budget': budget || '—',
        'Message': message,
        'Source': 'johnnybuildstech.com/contact',
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
    };

    if (!res.ok || !data.success) {
      console.error('Web3Forms error', res.status, data);
      return NextResponse.json(
        {
          error:
            data.message ??
            'Email service refused. Please try the mailto fallback below.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Web3Forms exception', err);
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please try again in a minute.' },
      { status: 500 },
    );
  }
}

// Silence the unused-var lint now that we're not routing via a SDK.
void TO_EMAIL;
