import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/pebble/LegalPage';

export const metadata: Metadata = {
  title: 'Support: Pebble',
  description:
    "Help with Pebble, the local-first symptom tracker. Frequently asked questions, how to back up your data, how to delete everything, and how to contact a real human.",
  alternates: { canonical: 'https://johnnybuildstech.com/apps/pebble/support' },
  robots: { index: true, follow: true },
};

export default function PebbleSupport() {
  return (
    <LegalPage
      eyebrow="support · for pebble"
      title="how can we help?"
      intro="Pebble is a small app, so this is a small support page. If your question isn't covered below, email us. A real human reads every message."
    >
      <h2>get help directly</h2>
      <p>
        Email <a href="mailto:pebble.symptom.app@gmail.com">pebble.symptom.app@gmail.com</a>. That&rsquo;s the address a real person checks. We aim to reply within two working days.
      </p>
      <ul>
        <li>
          <strong>report a bug:</strong>{' '}
          <a href="mailto:pebble.symptom.app@gmail.com?subject=Pebble%20bug%20report&body=What%20happened%3A%0A%0AWhat%20I%20expected%3A%0A%0ADevice%20%26%20OS%20version%3A%0A%0AApp%20version%3A">
            pebble.symptom.app@gmail.com (prefilled)
          </a>
        </li>
        <li>
          <strong>request a feature:</strong>{' '}
          <a href="mailto:pebble.symptom.app@gmail.com?subject=Pebble%20feature%20request">
            send the idea
          </a>{' '}
          (every email is read)
        </li>
        <li>
          <strong>privacy / data request:</strong>{' '}
          <a href="mailto:pebble.symptom.app@gmail.com?subject=Pebble%20privacy%20request">
            ask us anything
          </a>
        </li>
      </ul>

      <hr />

      <h2>the questions we hear most</h2>

      <h3>how do I back up my data?</h3>
      <p>
        Pebble is on-device only, so the most reliable backup is the one your
        phone already does:
      </p>
      <ul>
        <li>
          <strong>iPhone:</strong> Settings → [your name] → iCloud → iCloud
          Backup. Pebble&rsquo;s database is included automatically when iCloud
          Backup is on.
        </li>
        <li>
          <strong>Android:</strong> Settings → Google → Backup. Pebble&rsquo;s
          data is included in Google One backup.
        </li>
      </ul>
      <p>
        For a portable copy that doesn&rsquo;t rely on Apple or Google, use{' '}
        <strong>Settings → Export</strong> inside the app to generate a Brief
        PDF or full data archive (premium tier) that you can save anywhere:
        Files, iCloud Drive, Google Drive, email it to yourself.
      </p>

      <h3>how do I delete all my data?</h3>
      <p>Two options, depending on how clean you want it:</p>
      <ul>
        <li>
          <strong>uninstall the app.</strong> The local database is deleted
          along with Pebble. If you have iCloud / Google backups enabled, your
          phone may keep a copy in those backups until you delete the device
          backup itself.
        </li>
        <li>
          <strong>Settings → privacy → delete all data.</strong> Wipes the
          database while keeping the app installed, if you want a fresh start.
          This is irreversible.
        </li>
      </ul>

      <h3>I lost my phone. Can you restore my data?</h3>
      <p>
        We can&rsquo;t, and we want to be honest about that. Pebble has no
        server. Your data was never copied to us, so there is nothing for us to
        restore. If you had iCloud or Google backup enabled, restoring your new
        phone from that backup will restore Pebble&rsquo;s data along with
        everything else.
      </p>

      <h3>I subscribed but pebble says I&rsquo;m not a member?</h3>
      <p>
        Open Pebble, go to <strong>Settings → unlock premium → restore purchase</strong>.
        This re-checks your purchase receipt with Apple or Google. If it still
        doesn&rsquo;t work, email us with your purchase date and Apple
        ID/Google account email and we&rsquo;ll sort it out.
      </p>

      <h3>does pebble work without internet?</h3>
      <p>
        Yes, everything except (a) the optional Weather factor (which needs an
        internet connection to fetch barometric pressure from Open-Meteo) and
        (b) the initial purchase verification when you subscribe. Day-to-day
        logging, the Brief, and history all work fully offline.
      </p>

      <h3>can I use pebble for someone else (a child, partner, parent)?</h3>
      <p>
        Yes. Pebble is single-profile in v1, so you&rsquo;d set up the app on
        their device (or yours, dedicated to them). Multi-profile / care-team
        mode is on the roadmap for v2.
      </p>

      <h3>what about Apple Watch / Wear OS?</h3>
      <p>
        Not at launch. Pebble reads sleep data from Apple Health / Health
        Connect (which can come from a watch), but there is no Pebble watch
        app yet. We&rsquo;re looking at it for a future release.
      </p>

      <h3>I don&rsquo;t see my condition listed during onboarding.</h3>
      <p>
        Pick &ldquo;something else&rdquo; on the conditions screen. That gives
        you a free-text field and starts you with an empty symptom list, which
        you can fill in as you go. The pre-seeded condition list is for the
        most common chronic conditions, not a complete medical taxonomy.
      </p>

      <hr />

      <h2>also useful</h2>
      <p>
        <Link href="/apps/pebble">← back to pebble</Link>
        <br />
        <Link href="/apps/pebble/privacy">privacy policy</Link>
        <br />
        <Link href="/apps">all johnnybuildstech apps</Link>
      </p>
    </LegalPage>
  );
}
