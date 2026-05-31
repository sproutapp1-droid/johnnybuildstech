/* Real device captures for the Pebble marketing page, shown full bleed
 * inside the phone bezels (PhoneMockup) and the notebook polaroids
 * (Polaroid). Only the surfaces we actually shot are mapped — every
 * other variant keeps its hand-drawn sketch. Lives in its own plain
 * module (no 'use client') so the server-rendered Polaroid can read the
 * data directly. Raw captures live in /public/apps/pebble, 912x2048. */

export const PEBBLE_SHOTS: Record<string, { src: string; alt: string } | undefined> = {
  today: {
    src: '/apps/pebble/screen-today.jpg',
    alt: 'the pebble today log: energy, pain and mood in three sliders',
  },
  brief: {
    src: '/apps/pebble/screen-brief.jpg',
    alt: 'the pebble brief: a one-page symptom summary your doctor reads in 60 seconds',
  },
  'brief-voice': {
    src: '/apps/pebble/screen-brief.jpg',
    alt: 'the pebble brief: your six minutes, summarised on one page',
  },
  'symptom-picker': {
    src: '/apps/pebble/screen-picker.jpg',
    alt: 'the pebble symptom picker: tap what is going on today',
  },
};
