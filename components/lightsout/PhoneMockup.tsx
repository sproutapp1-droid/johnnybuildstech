/* CSS/SVG phone mockups for the Lights Out page. No real screenshots
 * yet — these render the brand's actual surfaces (shield, wind-down
 * session, the late-night scroll) so the page reads true to the app.
 * Swap in real captures later by replacing the per-variant screen. */

import { Moon } from './Moon';

function Breath({ core = 46, width = 122 }: { core?: number; width?: number }) {
  return (
    <span className="breath" style={{ width }}>
      <span className="ring" />
      <span className="ring" />
      <span className="ring" />
      <span className="core" style={{ width: core }} />
    </span>
  );
}

type Variant = 'shield' | 'shield-sm' | 'session' | 'deep-rest' | 'scroll';

export function PhoneMockup({ variant, float }: { variant: Variant; float?: boolean | 'b' }) {
  const floatClass = float ? `float${float === 'b' ? ' b' : ''}` : '';

  return (
    <div className={`phone${floatClass ? ` ${floatClass}` : ''}`}>
      {variant === 'shield' || variant === 'shield-sm' ? (
        <div className="screen shield">
          <Moon size={variant === 'shield' ? 92 : 76} phase="full" breathe />
          <div className="ph-title">
            your phone, but only
            <br />
            for sleeping.
          </div>
          <div className="ph-body">lights out ends at 7:00 am. you&rsquo;ve got this.</div>
          <div className="ph-btns">
            <div className="ph-btn primary">close</div>
            <div className="ph-btn ghost">request 10 min</div>
          </div>
        </div>
      ) : null}

      {variant === 'session' ? (
        <div className="screen session">
          <p className="ph-kicker">wind-down · long exhale</p>
          <div style={{ margin: '18px 0' }}>
            <Breath width={120} />
          </div>
          <div className="ph-title" style={{ fontSize: 16 }}>
            breathe out, slowly.
          </div>
          <div className="ph-body" style={{ marginTop: 8 }}>
            4 in · 7 hold · 8 out
          </div>
          <p className="ph-kicker" style={{ marginTop: 'auto' }}>
            06:32 left
          </p>
        </div>
      ) : null}

      {variant === 'deep-rest' ? (
        <div className="screen session">
          <p className="ph-kicker">wind-down · deep rest</p>
          <div style={{ margin: '24px 0' }}>
            <Breath width={150} core={54} />
          </div>
          <div className="ph-title" style={{ fontSize: 17 }}>
            let your body get heavy.
          </div>
          <div className="ph-body" style={{ marginTop: 10 }}>
            non-sleep deep rest · 15 min
          </div>
          <p className="ph-kicker" style={{ marginTop: 'auto' }}>
            screen dimming&hellip;
          </p>
        </div>
      ) : null}

      {variant === 'scroll' ? (
        <div className="screen shield">
          <p className="ph-kicker danger">00:58 · still scrolling</p>
          <div className="ph-rows">
            <span className="ph-row" />
            <span className="ph-row" />
            <span className="ph-row" />
            <span className="ph-row" />
            <span className="ph-row" />
          </div>
          <div className="ph-body" style={{ marginTop: 'auto' }}>
            one more, then sleep. (you said that 40 minutes ago.)
          </div>
        </div>
      ) : null}
    </div>
  );
}
