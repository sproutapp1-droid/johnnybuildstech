/* Phone mockups for the Lights Out page. The shield, the wind-down
 * session and the protocol chooser are real device captures, shown full
 * bleed inside the brand's phone bezel so they read as the actual app.
 * The late-night scroll stays a CSS surface — it illustrates the
 * problem, not an app screen, so there's nothing real to capture. */

import Image from 'next/image';

type Variant = 'shield' | 'shield-sm' | 'session' | 'deep-rest' | 'scroll';

/* raw captures live in /public/apps/lightsout, 912x2048 */
const SHOTS: Partial<Record<Variant, { src: string; alt: string }>> = {
  shield: {
    src: '/apps/lightsout/screen-shield.jpg',
    alt: 'the lights out shield: your phone, but only for sleeping',
  },
  'shield-sm': {
    src: '/apps/lightsout/screen-shield.jpg',
    alt: 'the lights out shield: your phone, but only for sleeping',
  },
  session: {
    src: '/apps/lightsout/screen-winddown.jpg',
    alt: 'the 4-7-8 wind-down: breathe in for four, hold for seven, exhale for eight',
  },
  'deep-rest': {
    src: '/apps/lightsout/screen-chooser.jpg',
    alt: 'the wind-down chooser: how would you like to fall asleep',
  },
};

export function PhoneMockup({ variant, float }: { variant: Variant; float?: boolean | 'b' }) {
  const floatClass = float ? `float${float === 'b' ? ' b' : ''}` : '';
  const shot = SHOTS[variant];

  if (shot) {
    return (
      <div className={`phone${floatClass ? ` ${floatClass}` : ''}`}>
        <div className="screen shot">
          <Image src={shot.src} alt={shot.alt} width={912} height={2048} sizes="244px" />
        </div>
      </div>
    );
  }

  /* the late-night scroll — a representation of the problem, not an app
   * screen, so it stays a CSS surface. */
  return (
    <div className={`phone${floatClass ? ` ${floatClass}` : ''}`}>
      {variant === 'scroll' ? (
        <div className="screen scroll-feed">
          <div className="feed-top">
            <span className="ph-kicker danger">00:58 · still scrolling</span>
          </div>
          <div className="feed" aria-hidden>
            {[true, false, true, true].map((media, i) => (
              <div className="post" key={i}>
                <div className="post-head">
                  <span className="av" />
                  <span className="meta">
                    <span className="l l1" />
                    <span className="l l2" />
                  </span>
                </div>
                {media ? (
                  <span className="post-media" />
                ) : (
                  <span className="post-text">
                    <span className="l w90" />
                    <span className="l w80" />
                    <span className="l w55" />
                  </span>
                )}
                <div className="post-acts">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ))}
          </div>
          <p className="ph-body feed-caption">
            one more, then sleep. (you said that 40 minutes ago.)
          </p>
        </div>
      ) : null}
    </div>
  );
}
