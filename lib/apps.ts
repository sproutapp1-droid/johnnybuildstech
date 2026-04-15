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
    shots: ['/apps/tidywell/01.png', '/apps/tidywell/02.png', '/apps/tidywell/03.png'],
    accent: '#2e3a27',
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
];
