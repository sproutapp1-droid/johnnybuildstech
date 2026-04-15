export function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: 'calc(100% / 12) 100%',
      }}
    />
  );
}
