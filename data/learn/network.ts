import type { L10n, LineId, Pt } from './types'
import type { UiKey } from './ui'

export type Phase = 1 | 2 | 3 | 4

export interface Station {
  x: number
  y: number
  lab: 'up' | 'down'
  phase: Phase
  line: LineId
  interchange?: boolean
  name: L10n
  blurb?: L10n
  level?: 'beginner' | 'intermediate'
}

export interface Line {
  id: LineId
  color: string
  name: UiKey
  pts: Pt[]
  stops: string[]
}

export const PHASE_KEY: Record<Exclude<Phase, 1>, UiKey> = { 2: 'p2', 3: 'p3', 4: 'p4' }

export const STATIONS: Record<string, Station> = {
  'http-journey': { x: 120, y: 110, lab: 'up', phase: 3, line: 'backend', name: { en: 'HTTP journey', bn: 'HTTP-র যাত্রা' }, blurb: { en: 'Follow one click to a company’s computers and back.', bn: 'একটা ক্লিক কোম্পানির কম্পিউটার পর্যন্ত গিয়ে কীভাবে ফিরে আসে, দেখুন।' }, level: 'beginner' },
  'rest-basics': { x: 300, y: 110, lab: 'up', phase: 4, line: 'backend', name: { en: 'REST basics', bn: 'REST-এর মূল কথা' } },
  'fastapi-lifecycle': { x: 480, y: 110, lab: 'up', phase: 1, line: 'backend', interchange: true, name: { en: 'FastAPI lifecycle', bn: 'FastAPI-র জীবনচক্র' }, blurb: { en: 'Everything between a click and the reply.', bn: 'ক্লিক থেকে উত্তর আসা পর্যন্ত মাঝের সবকিছু।' }, level: 'intermediate' },
  'django-lifecycle': { x: 660, y: 110, lab: 'up', phase: 3, line: 'backend', name: { en: 'Django lifecycle', bn: 'Django-র জীবনচক্র' } },
  'auth-jwt-oauth': { x: 840, y: 110, lab: 'up', phase: 4, line: 'backend', name: { en: 'Auth: JWT & OAuth', bn: 'অথ: JWT ও OAuth' } },
  'celery-redis': { x: 610, y: 240, lab: 'down', phase: 1, line: 'async', name: { en: 'Celery + Redis', bn: 'Celery + Redis' }, blurb: { en: 'Hand slow jobs to a background cook so nobody waits.', bn: 'ধীর কাজ পেছনের রাঁধুনিকে দিন, যাতে কাউকে অপেক্ষা করতে না হয়।' }, level: 'beginner' },
  'redis-deep-dive': { x: 760, y: 240, lab: 'down', phase: 4, line: 'async', name: { en: 'Redis deep-dive', bn: 'Redis গভীরে' } },
  databases: { x: 900, y: 240, lab: 'down', phase: 4, line: 'async', name: { en: 'Databases', bn: 'ডেটাবেস' } },
  'git-basics': { x: 120, y: 240, lab: 'down', phase: 1, line: 'git', name: { en: 'Git basics', bn: 'Git-এর শুরু' }, blurb: { en: 'Save points for your files, and sharing them.', bn: 'ফাইলের সেভ পয়েন্ট রাখা, আর অন্যদের সাথে ভাগ করা।' }, level: 'beginner' },
  'github-pull-requests': { x: 300, y: 240, lab: 'down', phase: 4, line: 'git', name: { en: 'Pull requests', bn: 'পুল রিকোয়েস্ট' } },
  docker: { x: 120, y: 370, lab: 'down', phase: 3, line: 'devops', name: { en: 'Docker', bn: 'Docker' } },
  'docker-compose': { x: 300, y: 370, lab: 'down', phase: 3, line: 'devops', name: { en: 'Docker Compose', bn: 'Docker Compose' }, blurb: { en: 'One call sheet starts a whole crew, and shows how they find each other.', bn: 'একটা কল শিট পুরো ক্রুকে চালু করে, আর দেখায় তারা কীভাবে একে অপরকে খুঁজে পায়।' }, level: 'intermediate' },
  'ci-cd': { x: 480, y: 370, lab: 'down', phase: 3, line: 'devops', interchange: true, name: { en: 'CI/CD', bn: 'CI/CD' }, blurb: { en: 'An assembly line that checks, boxes and ships every change.', bn: 'একটা অ্যাসেম্বলি লাইন, যা প্রতিটি পরিবর্তন যাচাই করে, বাক্সে ভরে আর পাঠিয়ে দেয়।' }, level: 'intermediate' },
  nginx: { x: 660, y: 370, lab: 'down', phase: 3, line: 'devops', name: { en: 'Nginx', bn: 'Nginx' }, blurb: { en: 'Hands out simple mail, and shares the rest between desks.', bn: 'সহজ ডাক নিজে দেয়, বাকিটা কয়েকটা ডেস্কে ভাগ করে দেয়।' }, level: 'intermediate' },
  kubernetes: { x: 840, y: 370, lab: 'down', phase: 4, line: 'devops', name: { en: 'Kubernetes', bn: 'Kubernetes' } },
  'concurrency-vs-parallelism': { x: 120, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'Concurrency vs parallelism', bn: 'কনকারেন্সি বনাম প্যারালেলিজম' }, blurb: { en: 'Juggling many jobs, or doing them at the same moment.', bn: 'অনেক কাজ পালা করে সামলানো, নয়তো একই মুহূর্তে করা।' }, level: 'beginner' },
  'processes-vs-threads': { x: 270, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'Processes vs threads', bn: 'প্রসেস বনাম থ্রেড' }, blurb: { en: 'Separate kitchens, or cooks sharing one kitchen.', bn: 'আলাদা রান্নাঘর, নাকি এক রান্নাঘরে ভাগ করে রাঁধুনিরা।' }, level: 'beginner' },
  'python-gil': { x: 420, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'The Python GIL', bn: 'Python GIL' }, blurb: { en: 'Why Python cooks take turns, and when they don\'t.', bn: 'Python-এর রাঁধুনিরা কেন পালা করে কাজ করে, আর কখন করে না।' }, level: 'intermediate' },
  'multiprocessing-pools': { x: 570, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'Multiprocessing pools', bn: 'মাল্টিপ্রসেসিং পুল' }, blurb: { en: 'Send heavy work to a row of side kitchens.', bn: 'ভারী কাজ পাঠান পাশের সারি সারি রান্নাঘরে।' }, level: 'intermediate' },
  'asyncio-event-loop': { x: 720, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'asyncio event loop', bn: 'asyncio ইভেন্ট লুপ' }, blurb: { en: 'One cook, many dishes, a timer that says what\'s ready.', bn: 'একজন রাঁধুনি, অনেক পদ, আর টাইমার বলে দেয় কোনটা তৈরি।' }, level: 'intermediate' },
  'race-conditions-locks': { x: 870, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'Race conditions & locks', bn: 'রেস কন্ডিশন ও লক' }, blurb: { en: 'Two cooks, one tally, and why you need one pen.', bn: 'দুই রাঁধুনি, একটাই হিসাবের খাতা, আর কেন একটাই কলম লাগে।' }, level: 'intermediate' },
}

export const LINES: Line[] = [
  { id: 'backend', color: '--l-backend', name: 'lineBackend', pts: [[120, 110], [840, 110]], stops: ['http-journey', 'rest-basics', 'fastapi-lifecycle', 'django-lifecycle', 'auth-jwt-oauth'] },
  { id: 'async', color: '--l-async', name: 'lineAsync', pts: [[480, 110], [610, 240], [900, 240]], stops: ['fastapi-lifecycle', 'celery-redis', 'redis-deep-dive', 'databases'] },
  { id: 'devops', color: '--l-devops', name: 'lineDevops', pts: [[120, 370], [840, 370]], stops: ['docker', 'docker-compose', 'ci-cd', 'nginx', 'kubernetes'] },
  { id: 'git', color: '--l-git', name: 'lineGit', pts: [[120, 240], [350, 240], [480, 370]], stops: ['git-basics', 'github-pull-requests', 'ci-cd'] },
  { id: 'concurrency', color: '--l-concurrency', name: 'lineConcurrency', pts: [[120, 490], [870, 490]], stops: ['concurrency-vs-parallelism', 'processes-vs-threads', 'python-gil', 'multiprocessing-pools', 'asyncio-event-loop', 'race-conditions-locks'] },
]

// Optional `via` points elbow a walkway so it never passes through an unrelated station or label.
export const WALKWAYS: { from: string; to: string; via?: Pt[] }[] = [
  { from: 'multiprocessing-pools', to: 'celery-redis' },
  { from: 'asyncio-event-loop', to: 'fastapi-lifecycle', via: [[720, 450], [540, 450], [540, 110]] },
]
