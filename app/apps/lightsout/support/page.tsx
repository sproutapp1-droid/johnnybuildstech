import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lights Out — support',
  description: 'Help with Lights Out: the phone curfew that shields your phone at night and winds you down to sleep.',
  alternates: { canonical: 'https://johnnybuildstech.com/apps/lightsout/support' },
};

export default function LightsOutSupport() {
  return (
    <article className="lo-wrap lo-article">
      <p className="kicker sand">lights out</p>
      <h1>support</h1>
      <p className="updated">we read every message</p>

      <p>
        lights out is made by one person who actually uses it. if something&rsquo;s broken, confusing,
        or just not working the way you hoped, email{' '}
        <a href="mailto:hello@johnnybuildstech.com">hello@johnnybuildstech.com</a> and you&rsquo;ll get
        a real reply.
      </p>

      <h2>the shield isn&rsquo;t appearing</h2>
      <p>
        the blocking runs on your phone&rsquo;s own screen-time controls, so it needs the right
        permission granted. on iphone that&rsquo;s screen time / family controls; on android it&rsquo;s
        accessibility, usage access and the &ldquo;display over other apps&rdquo; permission. open
        the app, head to the permission step, and make sure each one is on. after a phone restart,
        android may take a few seconds to re-arm the shield.
      </p>

      <h2>i forgot my override passcode</h2>
      <p>
        the passcode is stored only on your device and we never see it, so we can&rsquo;t reset it for
        you. it exists to hold you to your own curfew. it clears if you delete and reinstall the app
        (which also clears your data, so export a backup from settings first if you can).
      </p>

      <h2>restoring a purchase</h2>
      <p>
        your subscription or lifetime unlock is tied to your app store account. on a new phone, tap
        &ldquo;restore purchases&rdquo; in settings to bring it back. nothing to log into.
      </p>

      <h2>deleting your data</h2>
      <p>
        everything lives on your phone. deleting the app deletes your data with it. there&rsquo;s
        nothing on a server for us to remove, because there is no server. more on that in the{' '}
        <Link href="/apps/lightsout/privacy">privacy policy</Link>.
      </p>

      <h2>still stuck?</h2>
      <p>
        email <a href="mailto:hello@johnnybuildstech.com">hello@johnnybuildstech.com</a> with your
        phone model and what happened. screenshots help.
      </p>
    </article>
  );
}
