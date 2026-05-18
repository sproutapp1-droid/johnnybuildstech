'use client';

/* HeroPhones: Breezzy-style double-phone composition for the
 * /apps/pebble hero. Two iPhone mockups overlapping at ~45% of
 * their width, gently tilted (uprightness > drama so real
 * screenshots remain readable when they swap in). Caption sits
 * BELOW the phone stack so nothing overlaps the visuals. */

import { motion } from 'motion/react';
import { PhoneMockup } from './PhoneMockup';

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroPhones() {
  return (
    <div className="relative w-full" aria-hidden>
      {/* soft terracotta wash behind the phones */}
      <span
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          inset: '6% -6% 14% -4%',
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(198, 106, 78, 0.22) 0%, rgba(198, 106, 78, 0) 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* phone stack */}
      <div
        className="relative mx-auto"
        style={{ height: 580, maxWidth: 480 }}
      >
        {/* back phone — Today, tilted slightly left */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease, delay: 0.25 }}
          className="absolute"
          style={{ left: '2%', top: '3%', zIndex: 1 }}
        >
          <PhoneMockup variant="today" size="md" rotation={-6} bobDelay={0.6} />
        </motion.div>

        {/* front phone — Brief, tilted slightly right, overlapping ~45% */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease, delay: 0.45 }}
          className="absolute"
          style={{ left: '28%', top: '12%', zIndex: 2 }}
        >
          <PhoneMockup variant="brief" size="md" rotation={4} bobDelay={0} />
        </motion.div>
      </div>

      {/* caption below the stack — no longer overlapping the phones */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 1.0 }}
        className="pebble-hand mt-2 text-center md:text-left"
        style={{
          color: 'var(--pebble-terracotta)',
          fontSize: 22,
          lineHeight: 1.2,
          transform: 'rotate(-2deg)',
          paddingLeft: 12,
        }}
      >
        log in 30 seconds,
        <br />
        walk in with a brief.
      </motion.p>
    </div>
  );
}
