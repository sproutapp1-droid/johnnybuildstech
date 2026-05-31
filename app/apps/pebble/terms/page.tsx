import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/pebble/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of use: Pebble',
  description:
    'The terms for using Pebble, the offline symptom diary: what the app is and is not, subscriptions and billing, the medical disclaimer, and your rights.',
  alternates: { canonical: 'https://johnnybuildstech.com/apps/pebble/terms' },
  robots: { index: true, follow: true },
};

const EFFECTIVE = '31 May 2026';
const UPDATED = '31 May 2026';

export default function PebbleTerms() {
  return (
    <LegalPage
      eyebrow={`effective ${EFFECTIVE} · updated ${UPDATED}`}
      title="terms of use"
      intro="These terms are the agreement between you and johnnybuildstech for using Pebble. They are written to be read, not skimmed. The short version: Pebble is a private diary that helps you walk into appointments prepared — it is not a doctor, and it is not a medical device."
    >
      <p>
        By downloading or using Pebble (the &ldquo;app&rdquo;), you agree to
        these terms. If you do not agree, please do not use the app. This
        agreement is between you and <strong>johnnybuildstech</strong>, a sole
        trader based in the United Kingdom (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
        It is not an agreement with Apple or Google.
      </p>

      <h2>what Pebble is</h2>
      <p>
        Pebble is a personal symptom diary and organisational tool. It lets you
        log how you feel, track factors that may relate to your symptoms,
        notice patterns in your own data, and generate a &ldquo;Brief&rdquo; you
        can share with a clinician. All of your data lives on your device — see
        the <Link href="/apps/pebble/privacy">privacy policy</Link> for exactly
        what that means.
      </p>

      <h2>what Pebble is NOT — please read this</h2>
      <p>
        Pebble is <strong>not a medical device</strong> and does{' '}
        <strong>not</strong> provide medical advice, diagnosis, or treatment.
        Nothing in the app — including correlations, patterns, the Brief, or any
        text it generates — is a clinical finding or a recommendation.
      </p>
      <ul>
        <li>
          the app does <strong>not</strong> diagnose, treat, cure, or prevent
          any disease or condition
        </li>
        <li>
          correlations Pebble surfaces are <strong>patterns in your own data,
          not causes</strong>, and may be coincidental
        </li>
        <li>
          Pebble is a record-keeping aid to support a conversation with a
          qualified professional — it is not a substitute for one
        </li>
        <li>
          always seek the advice of your doctor or another qualified health
          provider with any questions about a medical condition, and never
          disregard professional advice or delay seeking it because of
          something you saw in Pebble
        </li>
      </ul>
      <p>
        <strong>
          If you think you may have a medical emergency, call your local
          emergency number or go to the nearest emergency department
          immediately.
        </strong>{' '}
        Pebble is not for emergencies and does not contact emergency services.
      </p>

      <h2>who can use Pebble</h2>
      <p>
        You must be at least 16 years old to use Pebble. By using the app you
        confirm that you are. Pebble is not directed at children — see the
        privacy policy for more.
      </p>

      <h2>your licence to use the app</h2>
      <p>
        We grant you a personal, non-exclusive, non-transferable, revocable
        licence to use Pebble on devices you own or control, for your own
        personal, non-commercial use, in line with these terms and with the
        App Store or Google Play terms that apply to you.
      </p>
      <p>You agree not to:</p>
      <ul>
        <li>copy, modify, reverse-engineer, decompile, or disassemble the app, except where that restriction is prohibited by law</li>
        <li>rent, lease, lend, sell, redistribute, or sublicense the app</li>
        <li>use the app in any unlawful way, or to harm, harass, or infringe the rights of others</li>
        <li>attempt to circumvent the subscription or purchase mechanisms</li>
      </ul>

      <h2>subscriptions, purchases &amp; billing</h2>
      <p>
        Pebble is free to download and use for its core features. Some features
        are part of <strong>Pebble Premium</strong>, available as an
        auto-renewing monthly or yearly subscription, or as a one-time
        &ldquo;lifetime&rdquo; purchase.
      </p>
      <ul>
        <li>
          payment is charged to your Apple App Store or Google Play account when
          you confirm the purchase
        </li>
        <li>
          subscriptions <strong>automatically renew</strong> at the then-current
          price unless you cancel at least 24 hours before the end of the
          current period
        </li>
        <li>
          your account is charged for renewal within the 24 hours before the
          current period ends
        </li>
        <li>
          you can manage or cancel a subscription at any time in your{' '}
          <strong>App Store</strong> or <strong>Google Play</strong> account
          settings — cancelling stops the next renewal; the current period runs
          to its end
        </li>
        <li>
          if a free trial is offered, any unused portion is forfeited when you
          buy the matching subscription
        </li>
        <li>
          the &ldquo;lifetime&rdquo; option is a one-time purchase for the life
          of the app on the store account that bought it; it is not a guarantee
          of any specific future feature
        </li>
        <li>
          prices are shown in the app, may vary by region, and may change for
          future periods (we will not change the price of a period you have
          already paid for)
        </li>
      </ul>
      <p>
        <strong>Refunds.</strong> Purchases and subscriptions are handled
        entirely by Apple or Google. We do not process payments and cannot issue
        refunds directly. Refund requests are subject to the policy of the store
        you bought from (Apple:{' '}
        <a href="https://support.apple.com/en-us/HT204084">reportaproblem.apple.com</a>;
        Google: <a href="https://support.google.com/googleplay/answer/2479637">Google Play refunds</a>),
        and to any rights you have under applicable consumer law.
      </p>

      <h2>your data</h2>
      <p>
        You own your data. Pebble stores it locally on your device and does not
        send your symptom data to us — there is no server and no account. How
        backup, export, and deletion work is described in the{' '}
        <Link href="/apps/pebble/privacy">privacy policy</Link>. You are
        responsible for keeping your own backups; because we never receive your
        data, we cannot recover it for you if your device is lost or reset.
      </p>

      <h2>intellectual property</h2>
      <p>
        The app, its design, the Pebble name and mascot, and its underlying
        software are owned by johnnybuildstech and protected by intellectual
        property law. These terms do not transfer any ownership to you. The
        content you create in Pebble (your logs, notes, and Briefs) remains
        yours.
      </p>

      <h2>the app is provided &ldquo;as is&rdquo;</h2>
      <p>
        We work hard to make Pebble accurate and reliable, but to the fullest
        extent permitted by law the app is provided &ldquo;as is&rdquo; and
        &ldquo;as available&rdquo;, without warranties of any kind, whether
        express or implied, including fitness for a particular purpose and
        non-infringement. We do not warrant that the app will be uninterrupted,
        error-free, or that any pattern or Brief it produces is complete or
        correct.
      </p>

      <h2>limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, johnnybuildstech will not be
        liable for any indirect, incidental, or consequential loss, or for any
        decision you make about your health based on the app. Nothing in these
        terms limits liability that cannot be limited by law — including
        liability for death or personal injury caused by negligence, or for
        fraud. Your statutory consumer rights are not affected.
      </p>

      <h2>changes to the app or these terms</h2>
      <p>
        We may update the app, change features, or revise these terms. When we
        make a material change to these terms, we will update the
        &ldquo;updated&rdquo; date above and note the change on this page for at
        least 30 days. Continuing to use the app after a change means you accept
        the revised terms.
      </p>

      <h2>ending this agreement</h2>
      <p>
        You can end this agreement at any time by deleting the app and any
        associated data (Settings → &ldquo;delete all data&rdquo;, then
        uninstall). We may suspend or end your licence if you materially breach
        these terms. Any subscription you have bought is still governed by the
        store&rsquo;s cancellation and refund rules.
      </p>

      <h2>Apple App Store</h2>
      <p>
        If you downloaded Pebble from the Apple App Store, the following also
        applies:
      </p>
      <ul>
        <li>this agreement is between you and johnnybuildstech only, not Apple, and Apple is not responsible for the app or its content</li>
        <li>Apple has no obligation to provide any maintenance or support for the app</li>
        <li>if the app fails to conform to any applicable warranty, you may notify Apple and Apple will refund the purchase price (if any); to the maximum extent permitted by law, Apple has no other warranty obligation for the app</li>
        <li>Apple is not responsible for addressing any claims relating to the app, including product-liability, legal/regulatory, or consumer-protection claims</li>
        <li>Apple is not responsible for investigating or resolving any third-party intellectual-property claim relating to the app</li>
        <li>you confirm you are not located in a country subject to a US Government embargo or designated as &ldquo;terrorist supporting&rdquo;, and are not on any US Government restricted-parties list</li>
        <li>Apple and its subsidiaries are third-party beneficiaries of these terms and may enforce them against you</li>
      </ul>

      <h2>governing law</h2>
      <p>
        These terms are governed by the laws of England and Wales, and the
        courts of England and Wales have jurisdiction, except that if you are a
        consumer resident elsewhere you keep the benefit of any mandatory
        consumer-protection rules of the country you live in.
      </p>

      <h2>contact</h2>
      <p>
        Questions about these terms:{' '}
        <a href="mailto:pebble.symptom.app@gmail.com">pebble.symptom.app@gmail.com</a>.
        A real human reads every message.
      </p>

      <hr />
      <p className="muted">
        Looking for the{' '}
        <Link href="/apps/pebble/privacy">privacy policy</Link>,{' '}
        <Link href="/apps/pebble/support">support page</Link>, or{' '}
        <Link href="/apps/pebble">Pebble itself</Link>?
      </p>
    </LegalPage>
  );
}
