/* SVG moon mascot, mirroring the app's src/components/ui/Moon.tsx
 * (crescent + full phases, sand halo, cool moonlight tint). References
 * the shared gradients (#lo-mg halo, #lo-ms surface) defined once in
 * <Starfield />. `breathe` adds the 8s scale + glow cycle. */

type Props = {
  size?: number;
  phase?: 'crescent' | 'full';
  breathe?: boolean;
  className?: string;
};

export function Moon({ size = 96, phase = 'crescent', breathe = false, className }: Props) {
  return (
    <span className={`moon-wrap${breathe ? ' breathe' : ''}${className ? ` ${className}` : ''}`}>
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none" aria-hidden>
        <circle cx="70" cy="70" r="66" fill="url(#lo-mg)" />
        {phase === 'crescent' ? (
          <>
            <path
              d="M 86 28 C 64 32, 48 50, 48 72 C 48 94, 64 110, 86 114 C 70 116, 50 112, 38 96 C 26 80, 26 60, 38 44 C 50 28, 70 26, 86 28 Z"
              fill="url(#lo-ms)"
            />
            <circle cx="46" cy="64" r="2.5" fill="#D9C7A0" fillOpacity="0.18" />
            <circle cx="54" cy="84" r="1.6" fill="#D9C7A0" fillOpacity="0.14" />
            <circle cx="42" cy="78" r="1.2" fill="#D9C7A0" fillOpacity="0.12" />
          </>
        ) : (
          <>
            <circle cx="70" cy="70" r="44" fill="url(#lo-ms)" />
            <circle cx="58" cy="62" r="4" fill="#D9C7A0" fillOpacity="0.16" />
            <circle cx="78" cy="76" r="2.5" fill="#D9C7A0" fillOpacity="0.14" />
            <circle cx="84" cy="58" r="2" fill="#D9C7A0" fillOpacity="0.12" />
            <circle cx="64" cy="84" r="1.6" fill="#D9C7A0" fillOpacity="0.14" />
          </>
        )}
      </svg>
    </span>
  );
}
