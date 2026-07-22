export type AppEntry = {
  slug: string;
  name: string;
  subtitle: string;
  problem: string;
  solution: string;
  features: string[];
  audience: string;
  web?: string;
  appStore?: string;
  playStore?: string;
  shots: string[];
  accent: string;
  /** When 'waitlist', AppCard swaps store badges for a "join waitlist" pill
   *  pointing to `waitlistHref`. Defaults to 'live'. */
  status?: 'live' | 'waitlist';
  waitlistHref?: string;
};

export const APPS: AppEntry[] = [
  {
    slug: 'sprout',
    name: 'Sprout',
    subtitle: 'Smart ADHD task app · AI focus planner',
    problem:
      'Traditional to-do apps punish ADHD brains — harsh deadlines, streak shame, endless lists that all look equally urgent. Most productivity tools are built for neurotypicals on a good day.',
    solution:
      'A calm task system with an AI that turns a brain-dump into organised tasks, a virtual pet that grows as you do, penalty-free streaks with Free Days, and a Pomodoro timer that actually fits how ADHD focus works.',
    features: [
      'AI brain-dump → organised tasks, typed or spoken',
      'Virtual pet companion that evolves as you ship your days',
      'Penalty-free streaks, auto-rollover tasks, calming palettes',
      'Built-in Pomodoro, 4-7-8 breathing, "what\'s next" decider',
    ],
    audience:
      'ADHD brains · neurodivergent minds · anyone tired of guilt-trip productivity',
    web: 'https://sproutapp.tech',
    appStore:
      'https://apps.apple.com/us/app/sprout-smart-adhd-task-app/id6754895173',
    playStore: 'https://play.google.com/store/apps/details?id=com.sproutapp.sprout',
    shots: ['/apps/sprout/01.png', '/apps/sprout/02.png', '/apps/sprout/03.png'],
    accent: '#2f7a3a',
  },
  {
    slug: 'tidywell',
    name: 'Tidywell',
    subtitle: 'Household planner · ADHD-friendly tools for every brain',
    problem:
      "Chore charts are either kids' sticker books or spreadsheets for grown-ups who love spreadsheets. Nobody has built one that works when your home has three humans, two energy levels and zero patience for \"you missed 3 days\" shame — or for the days when executive dysfunction means you literally can't pick where to start.",
    solution:
      "Built for everyone, but packed with ADHD-friendly tools: spin a random wheel when executive dysfunction means you can't choose a task; hit Focus Mode with built-in lofi beats when distractions pull you sideways; run live Body-Doubling sprints so you're never cleaning alone. The 2.5D dollhouse view glows sage when clean, and Fair Share quietly ends the \"who does more\" argument.",
    features: [
      'Random wheel — picks the task for you when executive dysfunction hits',
      'Focus Mode + built-in lofi beats to calm distractions and settle in',
      'Body-doubling live sprints — clean alongside others in real time',
      '2.5D dollhouse view — rooms glow sage when clean, amber when due',
    ],
    audience:
      'ADHD households · families · flatmates · parents · anyone who struggles to start',
    web: 'https://www.tidywell-app.com',
    appStore: 'https://apps.apple.com/us/app/tidywell-chore-tracker/id6761951172',
    playStore: 'https://play.google.com/store/apps/details?id=com.tidywell.app',
    shots: ['/apps/tidywell/01.png', '/apps/tidywell/02.png', '/apps/tidywell/03.png'],
    accent: '#2e3a27',
  },
  {
    slug: 'glaze',
    name: 'Glaze',
    subtitle: 'Skin tracker · progress photos, your shelf & what works',
    problem:
      "You've spent a small fortune on skincare and still can't say what actually works. Progress is invisible day to day, so you judge your skin in bad mirrors on bad days, buy on hype, and your bathroom fills with half-used bottles you will never finish.",
    solution:
      'A calm skin tracker that keeps the receipts. A smart face outline lines up every check-in so your weekly photos genuinely compare, your shelf holds every product with a keeper, still-trying or cut verdict read from your own ratings, and empties show cost per use so you only rebuy what earned it. It tracks. It never diagnoses and never sells you products.',
    features: [
      'Smart face outline lines up the same photo every week, so progress is real, not remembered',
      'Track your whole shelf in one place: keeper, still trying, or cut, read from your own ratings',
      'Empties and refills with cost per use, so you only repurchase what actually worked',
      'A shareable before-and-after and a monthly "skin wrapped", no product recs, ever',
    ],
    audience:
      'Skincare spenders · acne, texture & routine trackers · anyone tired of buying on hype',
    web: 'https://glazeskintracker.com',
    shots: ['/apps/glaze/01.png', '/apps/glaze/03.png', '/apps/glaze/05.png'],
    accent: '#6E5AC8',
    status: 'waitlist',
    waitlistHref: 'https://glazeskintracker.com',
  },
  {
    slug: 'payoff',
    name: 'Payoff',
    subtitle: 'Smart debt planner · AI coach, snowball & tracker',
    problem:
      'Debt is a solved maths problem with a completely unsolved emotional one. Most finance apps want your bank login, bury you in charts, and treat a £12k credit card balance like a spreadsheet instead of a weight on your chest.',
    solution:
      "A personal debt coach in your pocket. Pick a strategy (Snowball, Avalanche, Dave Ramsey's Baby Steps and four more), watch a debt-free countdown, and hit Focus Mode when the balances get too loud to look at.",
    features: [
      'AI debt coach tailored to your balances — no bank access required',
      '7 payoff strategies including Snowball, Avalanche, Dave Ramsey',
      'Focus Mode hides balances when you need to just keep going',
      'Partner Mode for couples sharing debts and a shared AI coach',
    ],
    audience:
      'Credit card, student loan, car loan & BNPL payers · couples tackling debt together',
    web: 'https://www.payoffdebtplanner.com',
    appStore: 'https://apps.apple.com/us/app/payoff-smart-debt-planner/id6761310986',
    shots: ['/apps/payoff/01.png', '/apps/payoff/02.png', '/apps/payoff/03.png'],
    accent: '#143226',
  },
  {
    slug: 'lapsed',
    name: 'Lapsed',
    subtitle: 'Days since tracker · count days since you last did',
    problem:
      'You know you called mum recently. But was it Tuesday or three Tuesdays ago? Watered the plants. Went for a run. Called the dentist. The gap between "not long ago" and "oh no" is always the bit you forget to track.',
    solution:
      "A beautiful, deliberately small app that plots everything you care about as coloured dots drifting across a canvas. As days pass, dots drift further from \"today\" and cross a gentle threshold line when they're overdue. Flip into quitting mode to count days clean of something instead. No guilt, no ads.",
    features: [
      'Visual canvas — coloured dots, balloons, spaceships & jellyfish (Pro)',
      'Smart + recurring reminders with a calm threshold line',
      '90-day heatmap, 12-week charts, goal linking across habits',
      'Quitting mode, one-time tasks, satisfying completion animations',
    ],
    audience:
      'Habit nerds · people breaking bad habits · carers · plant people · anyone with a "when did I last…" brain',
    web: 'https://www.lapsed-app.com',
    appStore: 'https://apps.apple.com/us/app/lapsed-days-since-tracker/id6760619087',
    playStore: 'https://play.google.com/store/apps/details?id=com.lapsedapp.lapsed',
    shots: ['/apps/lapsed/01.png', '/apps/lapsed/02.png', '/apps/lapsed/03.png'],
    accent: '#ff6b4a',
  },
  {
    slug: 'skip-or-buy',
    name: 'Skip or Buy',
    subtitle: 'Cost per use · smart shopping value tracker',
    problem:
      "You don't know if that £180 jacket is a bargain or a regret until you've already bought it. \"Cost per use\" is the honest answer — but nobody does that maths in the shop.",
    solution:
      "Enter price, how often you'll use it, for how long. Get a colour-coded verdict in seconds — Buy, Think Twice, or Skip. Works offline, no account, no data collected.",
    features: [
      'Buy · Think Twice · Skip verdict with 0–100 value score',
      '"Worth It By" date — when the item actually pays for itself',
      '"Hours worked to afford" — price translated into your time',
      'Side-by-side compare, usage logging, fully offline',
    ],
    audience:
      'Conscious spenders · minimalists · anyone mid-doomscroll on a checkout page',
    web: 'https://skiporbuyapp.com',
    appStore: 'https://apps.apple.com/us/app/skip-or-buy-cost-per-use/id6759465475',
    playStore: 'https://play.google.com/store/apps/details?id=com.skiporbuy.app',
    shots: [
      '/apps/skip-or-buy/01.png',
      '/apps/skip-or-buy/02.png',
      '/apps/skip-or-buy/03.png',
    ],
    accent: '#0a0a0a',
  },
  {
    slug: 'pebble',
    name: 'Pebble',
    subtitle: 'quiet symptom tracker · for chronic illness + ADHD',
    problem:
      "Most symptom apps feel like spreadsheets. You log for two weeks, you forget, you give up — then your appointment comes and you sit in the waiting room trying to remember what Wednesday was like, three weeks ago.",
    solution:
      "A beautifully simplistic tracker for people with chronic illness (POTS, EDS, MCAS, endometriosis, PMDD, long COVID, migraine, fibromyalgia, ME/CFS) — often comorbid with ADHD or AuDHD. Log in 30 seconds. Before your appointment, Pebble prints a one-page Brief your doctor reads in 60. Data never leaves the phone.",
    features: [
      '30-second log — three sliders, tap symptoms, done',
      'A narrative Brief your doctor reads in 60 seconds, not a chart dump',
      'On-device only — no accounts, no cloud, no analytics, ever',
      "Quiet correlations: when sleep, weather or your cycle line up with a flare, you see a margin note — no heatmaps",
    ],
    audience:
      'Chronically ill adults · ADHD/AuDHD brains · carers tracking on behalf · anyone who has bounced off Bearable',
    web: 'https://johnnybuildstech.com/apps/pebble',
    shots: ['/apps/pebble/01.png', '/apps/pebble/02.png', '/apps/pebble/03.png'],
    accent: '#C66A4E',
    // iPhone is live on the App Store; Android is still on the waitlist.
    appStore: 'https://apps.apple.com/us/app/pebble-symptom-tracker/id6772501410',
    status: 'live',
    waitlistHref: '/apps/pebble#waitlist',
  },
  {
    slug: 'lightsout',
    name: 'Lights Out',
    subtitle: 'a phone curfew for sleep · CBT-I, fully offline',
    problem:
      "You don't have a sleep problem. You have a phone problem. It's 11pm, you meant to sleep an hour ago, and the phone is still in your hand. Willpower loses to an infinite feed every night, and screen-time limits are one tap away from off.",
    solution:
      'A bedtime app that shields your phone against distracting apps after dark, behind a calm screen that doesn’t have an easy off switch, then opens into a CBT-I wind-down: a breathing moon, a sleep protocol, and a screen that dims itself. By day the same gentle blocking runs your focus hours. No account, no cloud, no analytics, ever.',
    features: [
      'A bedtime shield that actually holds, not a one-tap screen-time limit',
      'Nine wind-down protocols (4-7-8, NSDR, PMR, a 22-min sleep story) with a breathing moon',
      'Daytime focus blocks and app limits from the same gentle shield',
      'Fully offline: no account, no cloud, no analytics or crash reports, ever',
    ],
    audience:
      'Revenge bedtime procrastinators · doomscrollers · shift workers · anyone who has tapped past a screen-time limit',
    web: 'https://johnnybuildstech.com/apps/lightsout',
    shots: ['/apps/lightsout/01.png', '/apps/lightsout/02.png', '/apps/lightsout/03.png'],
    accent: '#D9C7A0',
    status: 'waitlist',
    waitlistHref: '/apps/lightsout#waitlist',
  },
];
