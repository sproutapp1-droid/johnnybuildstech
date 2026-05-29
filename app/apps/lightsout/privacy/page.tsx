import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lights Out — privacy policy',
  description:
    'Lights Out is offline by design. Your sleep data never leaves your phone. No account, no cloud, no analytics, no crash reports.',
  alternates: { canonical: 'https://johnnybuildstech.com/apps/lightsout/privacy' },
};

export default function LightsOutPrivacy() {
  return (
    <article className="lo-wrap lo-article">
      <p className="kicker sand">lights out</p>
      <h1>privacy policy</h1>
      <p className="updated">last updated · 2026</p>

      <p>
        lights out is built offline-first. the short version: your sleep data never leaves your
        phone, and there is no lights out server for it to leave to. this page is the long version.
      </p>

      <h2>what stays on your phone</h2>
      <p>
        everything you create in the app lives in a local database on your device only: your
        schedules and blocks, wind-down history, sleep and morning journal entries, worry notes,
        stats, and your override passcode (stored in the device keychain / encrypted storage). none
        of it is uploaded, synced, or backed up to us. if you delete the app, this data is gone and
        we cannot recover it. you can export a copy yourself at any time from settings.
      </p>

      <h2>what leaves your phone (the entire list)</h2>
      <ul>
        <li>
          <strong>your purchase receipt</strong>, sent to RevenueCat and the app store, so we can
          tell whether your subscription or lifetime unlock is active. this is tied to your app
          store account, not a Lights Out account.
        </li>
        <li>
          <strong>nothing else.</strong> no analytics, no crash reports, no advertising identifiers,
          no third-party trackers, no usage telemetry.
        </li>
      </ul>

      <h2>apple health (optional, off by default)</h2>
      <p>
        on iphone, you can let lights out read sleep durations from apple health so your stats can
        show how much of your phone curfew became real sleep. this is read-only, opt-in, and off
        until you turn it on. lights out never writes your health data anywhere off the device, and
        you can revoke access in settings at any time.
      </p>

      <h2>permissions</h2>
      <p>
        the app asks for the system permissions it needs to do the blocking: screen-time / family
        controls on iphone, and accessibility, usage access and overlay on android. these power the
        shield and the app limits. they are used only to show the shield over apps you chose to
        block, and never to read the content of any app.
      </p>

      <h2>children</h2>
      <p>lights out is not directed at children under 13 and does not knowingly collect data from them.</p>

      <h2>changes</h2>
      <p>
        if this policy changes, we&rsquo;ll update the date above. since we hold no contact details,
        the current version always lives here.
      </p>

      <h2>contact</h2>
      <p>
        questions? the <Link href="/apps/lightsout/support">support page</Link> has the best way to
        reach a human.
      </p>
    </article>
  );
}
