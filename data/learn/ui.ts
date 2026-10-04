import type { L10n } from '../../lib/learn/l10n'

export const UI = {
  hubTitle: {
    en: 'Watch real systems move data, one stop at a time.',
    bn: 'আসল সিস্টেমে ডেটা কীভাবে চলে, এক স্টপ এক স্টপ করে দেখুন।'
  },
  hubLede: {
    en: 'Every topic is a metro line. Stations are the parts of a system, and the moving tag is the data riding between them. Press play and follow along. Made for interview prep, written so a first-timer can keep up.',
    bn: 'প্রতিটি টপিক একটি মেট্রো লাইন। স্টেশনগুলো সিস্টেমের এক-একটি অংশ, আর চলন্ত ট্যাগটি হলো ডেটা, যা এক স্টেশন থেকে আরেক স্টেশনে যায়। প্লে চাপুন, সাথে সাথে দেখুন। ইন্টারভিউ প্রস্তুতির জন্য বানানো, কিন্তু এমনভাবে লেখা যে একদম নতুনরাও বুঝবে।'
  },
  hubCta: { en: 'Ride the Celery + Redis line', bn: 'Celery + Redis লাইনে চড়ুন' },
  mapHeading: { en: 'Network map of topics', bn: 'টপিকের নেটওয়ার্ক ম্যাপ' },
  allLines: { en: 'All lines', bn: 'সব লাইন' },
  open: { en: 'Open', bn: 'চালু' },
  p1: { en: 'Phase 1', bn: 'ধাপ ১' },
  p2: { en: 'Phase 2', bn: 'ধাপ ২' },
  p3: { en: 'Phase 3', bn: 'ধাপ ৩' },
  learned: { en: 'Learned', bn: 'শেখা হয়েছে' },
  changeFor: { en: 'Change for the {line}', bn: 'এখানে বদলে {line}' },
  lineBackend: { en: 'Backend line', bn: 'ব্যাকএন্ড লাইন' },
  lineAsync: { en: 'Async & data line', bn: 'অ্যাসিঙ্ক ও ডেটা লাইন' },
  lineDevops: { en: 'DevOps line', bn: 'ডেভঅপস লাইন' },
  lineGit: { en: 'Git line', bn: 'গিট লাইন' },
  backToMap: { en: 'Network map', bn: 'নেটওয়ার্ক ম্যাপ' },
  explainLabel: { en: 'Explain it', bn: 'ব্যাখ্যা' },
  modeSimple: { en: 'Simply', bn: 'সহজভাবে' },
  modeTech: { en: 'Technically', bn: 'টেকনিক্যালি' },
  routeLabel: { en: 'Route', bn: 'রুট' },
  routeMain: { en: 'Everything works', bn: 'সব ঠিক থাকলে' },
  routeFail: { en: 'A job fails', bn: 'কাজ ব্যর্থ হলে' },
  stopOf: { en: 'Stop {n} of {total}', bn: 'স্টপ {n} / {total}' },
  nextStop: { en: 'Next stop: {t}', bn: 'পরের স্টপ: {t}' },
  endLine: { en: 'End of the line.', bn: 'এটাই লাইনের শেষ স্টপ।' },
  underHood: { en: 'Under the hood', bn: 'ভেতরে যা ঘটে' },
  prev: { en: 'Previous stop', bn: 'আগের স্টপ' },
  next: { en: 'Next stop', bn: 'পরের স্টপ' },
  play: { en: 'Play', bn: 'চালান' },
  pause: { en: 'Pause', bn: 'থামান' },
  again: { en: 'Ride again', bn: 'আবার চলুন' },
  allStops: { en: 'All stops', bn: 'সব স্টপ' },
  kRequest: { en: 'Request', bn: 'রিকোয়েস্ট' },
  kQueue: { en: 'Queued message', bn: 'কিউ-এর মেসেজ' },
  kResult: { en: 'Reply or result', bn: 'উত্তর বা ফলাফল' },
  kError: { en: 'Failure or retry', bn: 'ব্যর্থতা বা রিট্রাই' },
  analogyH: { en: 'The everyday version', bn: 'রোজকার উদাহরণে' },
  analogyIntro: {
    en: 'A busy restaurant runs the same way. Every station has a twin in the kitchen.',
    bn: 'একটা ব্যস্ত রেস্টুরেন্টও ঠিক এভাবেই চলে। প্রতিটি স্টেশনের একটা জোড়া আছে রান্নাঘরে।'
  },
  isThe: { en: 'is the {x}', bn: 'মানে {x}' },
  qaH: { en: 'Interview questions', bn: 'ইন্টারভিউ প্রশ্ন' },
  qaIntro: {
    en: 'Say the short answer first. Go deeper only if they ask.',
    bn: 'আগে ছোট উত্তরটা বলুন। ওরা জানতে চাইলে তবেই বিস্তারিত।'
  },
  shortA: { en: 'Short answer', bn: 'ছোট উত্তর' },
  deepA: { en: 'If they dig deeper', bn: 'আরও জানতে চাইলে' },
  redFlag: { en: 'Answer that loses points', bn: 'যে উত্তরে নম্বর কাটে' },
  cheatH: { en: 'Cheat-sheet', bn: 'চিট-শিট' },
  cheatIntro: { en: 'Commands you will actually type.', bn: 'যেসব কমান্ড আসলেই টাইপ করবেন।' },
  copy: { en: 'Copy', bn: 'কপি' },
  copied: { en: 'Copied', bn: 'কপি হয়েছে' },
  selected: { en: 'Selected, press Ctrl+C', bn: 'সিলেক্ট হয়েছে, Ctrl+C চাপুন' },
  markDone: { en: 'Mark this line as learned', bn: 'এই লাইন শেখা হয়েছে' },
  markedDone: { en: 'Learned. Tap to undo', bn: 'শেখা হয়েছে। বাতিল করতে চাপুন' },
  toastLater: { en: '{name} opens in {phase}.', bn: '{name} চালু হবে {phase}-এ।' },
  footer: {
    en: 'Stop by Stop is a study companion by Eyakub.',
    bn: 'Stop by Stop, Eyakub-এর বানানো পড়াশোনার সঙ্গী।'
  },
  backToPortfolio: { en: 'Back to portfolio', bn: 'পোর্টফোলিওতে ফিরুন' },
  sourcesH: { en: 'Sources', bn: 'সূত্র' },
  lineConcurrency: { en: 'Concurrency line', bn: 'কনকারেন্সি লাইন' },
  p4: { en: 'Phase 4', bn: 'ধাপ ৪' }
} satisfies Record<string, L10n>

export type UiKey = keyof typeof UI
