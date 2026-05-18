'use client';

/* HeroPhones: Breezzy-style double-phone composition for the
 * /apps/pebble hero. Two iPhone mockups, one tilted back-left
 * showing the Today screen, the other tilted back-right showing
 * the Brief receipt. Pebble mascot floats above, framing the
 * composition. */

import { motion, useReducedMotion } from 'motion/react';
import { PhoneMockup } from './PhoneMockup';
import { Pebble } from './Pebble';

export function HeroPhones() {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* soft terracotta wash behind the phones */}
      <span
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          inset: '8% -10% 8% -5%',
          background:
            'radial-gradient(60% 60% at 50% 45%, rgba(198, 106, 78, 0.22) 0%, rgba(198, 106, 78, 0) 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* the two phones */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 560, perspective: 1200 }}
      >
        {/* back phone — Today, tilted left, slightly behind */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -18 }}
          animate={{ opacity: 1, y: 0, rotate: -14 }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.25,
          }}
          className="absolute"
          style={{
            left: '8%',
            top: '8%',
            zIndex: 1,
            transformOrigin: 'center',
          }}
        >
          <PhoneMockup variant="today" size="md" rotation={-14} bobDelay={0.6} />
        </motion.div>

        {/* front phone — Brief, tilted right, in front */}
        <motion.div
          initial={{ opacity: 0, y: 56, rotate: 12 }}
          animate={{ opacity: 1, y: 0, rotate: 8 }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.45,
          }}
          className="absolute"
          style={{
            right: '4%',
            top: '14%',
            zIndex: 2,
            transformOrigin: 'center',
          }}
        >
          <PhoneMockup variant="brief" size="md" rotation={8} bobDelay={0} />
        </motion.div>

        {/* mascot peeking from upper area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -16 }}
          animate={
            reduce
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 1, scale: 1, y: [0, -6, 0] }
          }
          transition={
            reduce
              ? { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }
              : {
                  opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 },
                  scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 },
                  y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                }
          }
          className="absolute"
          style={{
            top: '0%',
            right: '20%',
            zIndex: 3,
          }}
        >
          <Pebble size={72} state="idle" priority />
        </motion.div>

        {/* small handwritten ink annotation */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="pebble-hand absolute"
          style={{
            bottom: '4%',
            left: '8%',
            zIndex: 3,
            color: 'var(--pebble-terracotta)',
            fontSize: 22,
            lineHeight: 1.1,
            transform: 'rotate(-3deg)',
            maxWidth: 180,
          }}
        >
          log in 30 seconds,<br />walk in with a brief.
        </motion.p>
      </div>
    </div>
  );
}
