'use client';

/* The receipt artifact. THIS is the peak of the landing page —
 * visitors see the actual thing their doctor would see, not a
 * screenshot. Plex Mono, left-justified, perforated bottom edge,
 * slightly rotated so it reads as "placed on the page".
 *
 * Lines reveal top-down at ~90ms each on enter (matches SPEC §6.2
 * receipt-print animation). Pebble sits beneath, glowing terracotta
 * while it prints. */

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Pebble } from './Pebble';

const LINES: Array<{ text: string; kind?: 'header' | 'rule' | 'section' | 'body' | 'quote' | 'foot' }> = [
  { text: '─────────────────────────────────', kind: 'rule' },
  { text: 'PATIENT-GENERATED', kind: 'header' },
  { text: 'SYMPTOM SUMMARY', kind: 'header' },
  { text: '' },
  { text: 'May 11 – May 17, 2026', kind: 'body' },
  { text: '─────────────────────────────────', kind: 'rule' },
  { text: '' },
  { text: 'THE PATTERN', kind: 'section' },
  { text: '' },
  { text: 'Energy averaged 4/10 this week,', kind: 'body' },
  { text: 'down from 6/10 the previous week.', kind: 'body' },
  { text: 'Pain peaked at 8/10 on Wednesday', kind: 'body' },
  { text: 'morning, correlated with poor sleep', kind: 'body' },
  { text: 'the night before (3.5 hrs, Apple Health).', kind: 'body' },
  { text: 'Brain fog reported 4 of 7 days,', kind: 'body' },
  { text: 'clustered Tuesday through Friday.', kind: 'body' },
  { text: '' },
  { text: 'WHAT MAY HAVE CONTRIBUTED', kind: 'section' },
  { text: '' },
  { text: '  • Pain peaks lined up with skipped', kind: 'body' },
  { text: '    mestinon (3 times this week).', kind: 'body' },
  { text: '  • Worse sleep (4h average)', kind: 'body' },
  { text: '    preceded 3 of your worst days.', kind: 'body' },
  { text: '  • Period day 1, moderate link.', kind: 'body' },
  { text: '' },
  { text: '  These are patterns, not causes.', kind: 'quote' },
  { text: '  Only you and your doctor know', kind: 'quote' },
  { text: "  what's actually going on.", kind: 'quote' },
  { text: '' },
  { text: 'A NOTE I ADDED FOR YOU', kind: 'section' },
  { text: '' },
  { text: '  "I want to ask about the morning', kind: 'quote' },
  { text: '  crashes. they feel different from', kind: 'quote' },
  { text: '  my usual flares."', kind: 'quote' },
  { text: '' },
  { text: '─────────────────────────────────', kind: 'rule' },
  { text: '   Generated locally on iPhone.', kind: 'foot' },
  { text: '   Your symptom data never leaves', kind: 'foot' },
  { text: '   this device.', kind: 'foot' },
  { text: '─────────────────────────────────', kind: 'rule' },
];

export function Receipt() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <div ref={ref} className="relative mx-auto" style={{ maxWidth: 560 }}>
      {/* receipt paper */}
      <motion.div
        initial={{ opacity: 0, y: 36, rotate: 0 }}
        animate={inView ? { opacity: 1, y: 0, rotate: -1.4 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto"
        style={{
          background: 'var(--pebble-receipt)',
          padding: '40px 36px 56px',
          maxWidth: 440,
          boxShadow:
            '0 1px 0 rgba(28,26,24,0.04), 0 6px 16px rgba(28,26,24,0.08), 0 40px 80px -32px rgba(28,26,24,0.35)',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.13 0 0 0 0 0.1 0 0 0 0 0.07 0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: '220px 220px',
          backgroundBlendMode: 'multiply',
        }}
      >
        <pre
          className="pebble-mono"
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.55,
            color: 'var(--pebble-ink)',
            whiteSpace: 'pre-wrap',
            fontFeatureSettings: '"liga" 0',
          }}
        >
          {LINES.map((line, i) => (
            <span
              key={i}
              className={inView ? 'receipt-line' : ''}
              style={
                {
                  display: 'block',
                  opacity: inView ? undefined : 0,
                  '--i': i,
                  letterSpacing: line.kind === 'header' || line.kind === 'section' ? '0.14em' : undefined,
                  fontWeight: line.kind === 'header' || line.kind === 'section' ? 500 : 400,
                  color:
                    line.kind === 'foot' || line.kind === 'rule'
                      ? 'var(--pebble-ink-muted)'
                      : undefined,
                  fontStyle: line.kind === 'quote' ? 'italic' : undefined,
                } as React.CSSProperties
              }
            >
              {line.text || ' '}
            </span>
          ))}
        </pre>

        {/* perforated edge */}
        <div
          aria-hidden
          className="absolute left-0 right-0"
          style={{
            bottom: -14,
            height: 14,
            backgroundImage:
              'radial-gradient(circle at center, var(--pebble-paper) 4px, transparent 5px)',
            backgroundSize: '14px 14px',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'center top',
          }}
        />
      </motion.div>

      {/* Pebble glowing beneath the receipt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="mt-12 flex justify-center"
      >
        <Pebble size={72} state="printing" glow />
      </motion.div>
    </div>
  );
}
