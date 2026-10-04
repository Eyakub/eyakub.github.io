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
  'http-journey': { x: 120, y: 110, lab: 'up', phase: 3, line: 'backend', name: { en: 'HTTP journey', bn: 'HTTP-র যাত্রা' } },
  'rest-basics': { x: 300, y: 110, lab: 'up', phase: 4, line: 'backend', name: { en: 'REST basics', bn: 'REST-এর মূল কথা' } },
  'fastapi-lifecycle': { x: 480, y: 110, lab: 'up', phase: 1, line: 'backend', interchange: true, name: { en: 'FastAPI lifecycle', bn: 'FastAPI-র জীবনচক্র' } },
  'auth-jwt-oauth': { x: 660, y: 110, lab: 'up', phase: 4, line: 'backend', name: { en: 'Auth: JWT & OAuth', bn: 'অথ: JWT ও OAuth' } },
  'celery-redis': { x: 610, y: 240, lab: 'down', phase: 1, line: 'async', name: { en: 'Celery + Redis', bn: 'Celery + Redis' } },
  'redis-deep-dive': { x: 760, y: 240, lab: 'down', phase: 4, line: 'async', name: { en: 'Redis deep-dive', bn: 'Redis গভীরে' } },
  databases: { x: 900, y: 240, lab: 'down', phase: 4, line: 'async', name: { en: 'Databases', bn: 'ডেটাবেস' } },
  'git-basics': { x: 120, y: 240, lab: 'down', phase: 1, line: 'git', name: { en: 'Git basics', bn: 'Git-এর শুরু' } },
  'github-pull-requests': { x: 300, y: 240, lab: 'down', phase: 4, line: 'git', name: { en: 'Pull requests', bn: 'পুল রিকোয়েস্ট' } },
  docker: { x: 120, y: 370, lab: 'down', phase: 3, line: 'devops', name: { en: 'Docker', bn: 'Docker' } },
  'docker-compose': { x: 300, y: 370, lab: 'down', phase: 3, line: 'devops', name: { en: 'Docker Compose', bn: 'Docker Compose' } },
  'ci-cd': { x: 480, y: 370, lab: 'down', phase: 3, line: 'devops', interchange: true, name: { en: 'CI/CD', bn: 'CI/CD' } },
  nginx: { x: 660, y: 370, lab: 'down', phase: 3, line: 'devops', name: { en: 'Nginx', bn: 'Nginx' } },
  kubernetes: { x: 840, y: 370, lab: 'down', phase: 4, line: 'devops', name: { en: 'Kubernetes', bn: 'Kubernetes' } },
  'concurrency-vs-parallelism': { x: 120, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'Concurrency vs parallelism', bn: 'কনকারেন্সি বনাম প্যারালেলিজম' } },
  'processes-vs-threads': { x: 270, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'Processes vs threads', bn: 'প্রসেস বনাম থ্রেড' } },
  'python-gil': { x: 420, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'The Python GIL', bn: 'Python GIL' } },
  'multiprocessing-pools': { x: 570, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'Multiprocessing pools', bn: 'মাল্টিপ্রসেসিং পুল' } },
  'asyncio-event-loop': { x: 720, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'asyncio event loop', bn: 'asyncio ইভেন্ট লুপ' } },
  'race-conditions-locks': { x: 870, y: 490, lab: 'down', phase: 2, line: 'concurrency', name: { en: 'Race conditions & locks', bn: 'রেস কন্ডিশন ও লক' } },
}

export const LINES: Line[] = [
  { id: 'backend', color: '--l-backend', name: 'lineBackend', pts: [[120, 110], [660, 110]], stops: ['http-journey', 'rest-basics', 'fastapi-lifecycle', 'auth-jwt-oauth'] },
  { id: 'async', color: '--l-async', name: 'lineAsync', pts: [[480, 110], [610, 240], [900, 240]], stops: ['fastapi-lifecycle', 'celery-redis', 'redis-deep-dive', 'databases'] },
  { id: 'devops', color: '--l-devops', name: 'lineDevops', pts: [[120, 370], [840, 370]], stops: ['docker', 'docker-compose', 'ci-cd', 'nginx', 'kubernetes'] },
  { id: 'git', color: '--l-git', name: 'lineGit', pts: [[120, 240], [350, 240], [480, 370]], stops: ['git-basics', 'github-pull-requests', 'ci-cd'] },
  { id: 'concurrency', color: '--l-concurrency', name: 'lineConcurrency', pts: [[120, 490], [870, 490]], stops: ['concurrency-vs-parallelism', 'processes-vs-threads', 'python-gil', 'multiprocessing-pools', 'asyncio-event-loop', 'race-conditions-locks'] },
]

export const WALKWAYS: [string, string][] = [
  ['multiprocessing-pools', 'celery-redis'],
  ['asyncio-event-loop', 'fastapi-lifecycle'],
]
