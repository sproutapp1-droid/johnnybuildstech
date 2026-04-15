import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TO = 'jonathanlai928@gmail.com';
// Once the johnnybuildstech.com domain is verified on Resend, swap this to
// 'johnnybuildstech <hello@johnnybuildstech.com>' for better deliverability.
const FROM = 'johnnybuildstech <onboarding@resend.dev>';

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
  // prune old
  for (const [k, v] of RECENT) if (now - v > THROTTLE_MS) RECENT.delete(k);
  if (last && now - last < THROTTLE_MS) return true;
  RECENT.set(ip, now);
  return false;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server email isn’t configured yet. Please use the mailto fallback below.' },
      { status: 500 },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return badRequest('Malformed request.');
  }

  // Honeypot: silently succeed so the bot thinks it worked.
  if (body.company && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Timing guard — real humans take longer than 2 seconds.
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
      {
        error:
          'One message per minute, please — try again in a moment.',
      },
      { status: 429 },
    );
  }

  // Server-side validation (don't trust the client)
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

  // Compose the email
  const subject = `[johnnybuildstech] New enquiry — ${name} · ${projectType}`;

  const plain = [
    `New enquiry via johnnybuildstech.com`,
    ``,
    `Name:         ${name}`,
    `Email:        ${email}`,
    `Project type: ${projectType}`,
    `Budget:       ${budget || '—'}`,
    ``,
    `Message:`,
    message,
    ``,
    `--`,
    `Sent from the /contact form. Reply directly — the Reply-To header is set to the sender's address.`,
  ].join('\n');

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F5ECD9;font-family:'Manrope','Helvetica Neue',Arial,sans-serif;color:#2C1D12;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5ECD9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="background:#E8D9B7;border:1px solid rgba(196,138,58,0.5);border-radius:14px;">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid rgba(196,138,58,0.45);">
                <div style="font-family:'DM Mono',Menlo,monospace;font-size:11px;letter-spacing:0.26em;text-transform:uppercase;color:#A1702A;">
                  johnnybuildstech · new enquiry
                </div>
                <div style="margin-top:10px;font-family:Georgia,'Fraunces',serif;font-size:26px;line-height:1.2;letter-spacing:-0.01em;color:#2C1D12;">
                  ${escapeHtml(name)} &middot; <span style="font-style:italic;color:#7A5B3F;">${escapeHtml(projectType)}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${[
                    ['Name', escapeHtml(name)],
                    ['Email', `<a href="mailto:${escapeHtml(email)}" style="color:#B8421F;text-decoration:underline;">${escapeHtml(email)}</a>`],
                    ['Project type', escapeHtml(projectType)],
                    ['Budget', escapeHtml(budget || '—')],
                  ]
                    .map(
                      ([k, v]) => `
                  <tr>
                    <td style="padding:8px 0;width:120px;font-family:'DM Mono',Menlo,monospace;font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#A1702A;vertical-align:top;">${k}</td>
                    <td style="padding:8px 0;font-family:Georgia,'Fraunces',serif;font-size:16px;color:#2C1D12;">${v}</td>
                  </tr>`,
                    )
                    .join('')}
                </table>

                <div style="margin-top:22px;padding-top:18px;border-top:1px solid rgba(196,138,58,0.4);">
                  <div style="font-family:'DM Mono',Menlo,monospace;font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#A1702A;margin-bottom:10px;">
                    what they have in mind
                  </div>
                  <div style="font-family:Georgia,'Fraunces',serif;font-size:16px;line-height:1.65;color:#2C1D12;white-space:pre-wrap;">${escapeHtml(message)}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;border-top:1px solid rgba(196,138,58,0.45);font-family:'DM Mono',Menlo,monospace;font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#7A5B3F;">
                filed &middot; hit reply — the Reply-To is set to the sender.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      text: plain,
      html,
    });
    if (result.error) {
      console.error('Resend error', result.error);
      return NextResponse.json(
        { error: 'Email service refused. Please try the mailto fallback below.' },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend exception', err);
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please try again in a minute.' },
      { status: 500 },
    );
  }
}
