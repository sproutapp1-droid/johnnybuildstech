/* Fixed night-sky substrate for the Lights Out page: two tiled star
 * layers, a few bright twinkles, and the shared moon gradient defs
 * (defined once so every <Moon /> can reference them without id
 * collisions). Rendered once in the route layout. */

const TWINKLES = [
  { top: '14%', left: '22%', delay: '0s' },
  { top: '24%', left: '74%', delay: '1.4s' },
  { top: '62%', left: '12%', delay: '2.7s' },
  { top: '78%', left: '84%', delay: '0.7s' },
  { top: '40%', left: '48%', delay: '3.6s' },
];

export function Starfield() {
  return (
    <>
      <div className="lo-stars" aria-hidden />
      <div className="lo-stars layer2" aria-hidden />
      {TWINKLES.map((t, i) => (
        <span
          key={i}
          className="lo-twinkle"
          aria-hidden
          style={{ top: t.top, left: t.left, animationDelay: t.delay }}
        />
      ))}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <radialGradient id="lo-mg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D9C7A0" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#7891C7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#D9C7A0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lo-ms" cx="40%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#D9C7A0" stopOpacity="1" />
            <stop offset="80%" stopColor="#D9C7A0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7891C7" stopOpacity="0.55" />
          </radialGradient>
        </defs>
      </svg>
    </>
  );
}
