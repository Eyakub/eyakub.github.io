# Stop by Stop Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/learn` (metro-map hub) and `/learn/[slug]` (animated flow player + analogy + Q&A + cheat-sheet) with EN/BN, for three topics: Celery + Redis, FastAPI lifecycle, Git basics.

**Architecture:**
- Static Next 16 Pages Router pages under `pages/learn/`.
- Topic content lives in typed data files under `data/learn/`. Each page receives only its own data through `getStaticProps`.
- Pure logic is unit-tested with vitest: geometry, route building, the player reducer, l10n, and stored-preference parsing.
- React components render SVG and markup, ported from the approved mockup.
- **Deviation from spec §5:** styling is ported from the mockup into one scoped stylesheet, `styles/learn.css`, instead of Tailwind utilities. This pixel-matches the approved design with less risk; Tailwind config is untouched.

**Tech Stack:** Next 16.2 (Pages Router, `output: 'export'`), React 19, TypeScript 4.9, `next/font/google` (Anek Latin, Anek Bangla, JetBrains Mono), vitest (new), playwright-core (new, local smoke only).

**Spec:** `docs/superpowers/specs/2026-10-04-learn-stop-by-stop-design.md`

**Reference implementation:** `docs/superpowers/specs/assets/2026-10-04-learn-mockup.html`, the approved mockup. Whenever a step says "port from mockup", copy the named section or function and translate it to React/TS. Keep values (sizes, colours, timings, copy) identical.

**Research notes:** `docs/superpowers/research/2026-10-04-learn-topic-research.md`. Sections: §1 FastAPI, §2 Celery, §3 Git.

## Global Constraints

- Static export only: no API routes, no `getServerSideProps`; `getStaticPaths` uses `fallback: false`.
- `next.config.js` keeps `output: 'export'` and `images.unoptimized: true`; `assetPrefix` is removed.
- Learn code is TypeScript and must pass `npm run typecheck:learn` (strict). Existing files are not converted.
- Naming: kebab-case dirs, PascalCase components, camelCase utils.
- No `window.alert` / `confirm` / `prompt`. Use the toast.
- Every `localStorage` access is wrapped in try/catch. Keys: `learn:lang`, `learn:mode`, `learn:learned`.
- Default language `en`, default mode `simple`.
- Touch targets ≥ 44px; visible focus; `prefers-reduced-motion` disables animation.
- Copy rules: simple caption ≤ 30 English words; tech note ≤ 45 English words; technical terms stay in English inside Bangla.
- Commit after every task with a conventional message. Author email `eyakubsorkar@gmail.com`. No AI attribution trailers.
- Breakpoints: diagram `wide` layout when stage width ≥ 600px; two-column player ≥ 980px; network map shown ≥ 640px.

## Review Focus

1. **Blocked or corrupt localStorage** (private mode throws; `learn:learned` holds garbage): the page renders with defaults and never crashes. Covered in Task 1 (`parseStored` tests).
2. **Rapid next/prev clicks during a packet animation:** the previous rAF is cancelled, exactly one packet is visible on the active edge, and the stop counter matches the click count. Covered in the Task 6 smoke.
3. **Resizing across 600px mid-route:** the layout switches, the stop index is kept, and the packet is redrawn on the new geometry. Covered in the Task 6 smoke.
4. **Switching language during playback:** playback continues, the counter shows Bangla digits, and the diagram labels change. Covered in the Task 6 smoke.
5. **Deep link or refresh on `/learn/celery-redis`, and an unknown slug:** the nested route loads all assets (the `assetPrefix` fix); `/learn/nope` serves the 404 page. Covered in the Task 4 smoke.

---

### Task 1: Tooling, l10n and stored preferences

**Files:**
- Modify: `package.json` (scripts, devDependencies)
- Modify: `tsconfig.json` (`include`, `exclude`)
- Create: `tsconfig.learn.json`
- Create: `vitest.config.mjs`
- Create: `lib/learn/l10n.ts`
- Create: `lib/learn/l10n.test.ts`
- Create: `lib/learn/prefs.ts`
- Create: `lib/learn/prefs.test.ts`

**Interfaces:**
- Produces:
  - `tr(v, lang)`
  - `fmt(template, vars)`
  - `num(n, lang)`
  - `parseStored(raw)`
  - types `Lang`, `L10n`, `Mode`, `Prefs`

- [ ] **Step 1: Install dev tools**

```bash
npm i -D vitest playwright-core
```

Add to `package.json` `scripts`:

```json
"test": "vitest run",
"typecheck:learn": "tsc -p tsconfig.learn.json",
"smoke:learn": "node scripts/learn-smoke.mjs"
```

- [ ] **Step 2: Configure TypeScript and vitest**

In `tsconfig.json`, append these to `include`:
- `"pages/learn/**/*.tsx"`
- `"components/learn/**/*.ts"`
- `"components/learn/**/*.tsx"`
- `"contexts/LearnPrefsContext.tsx"`
- `"data/learn/**/*.ts"`
- `"lib/learn/**/*.ts"`

Then set `"exclude": ["node_modules", "**/*.test.ts"]`.

Create `tsconfig.learn.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": { "strict": true, "noEmit": true, "incremental": false },
  "include": [
    "next-env.d.ts",
    "pages/learn/**/*.tsx",
    "components/learn/**/*.ts",
    "components/learn/**/*.tsx",
    "contexts/LearnPrefsContext.tsx",
    "data/learn/**/*.ts",
    "lib/learn/**/*.ts"
  ],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

Test files are type-stripped by vitest and excluded from both tsconfigs. TS 4.9 cannot resolve vitest's types under `moduleResolution: node`, and Next's build must not see them.

Create `vitest.config.mjs`:

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['lib/**/*.test.ts', 'components/**/*.test.ts', 'data/**/*.test.ts'],
    environment: 'node',
  },
})
```

- [ ] **Step 3: Write failing tests**

`lib/learn/l10n.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { tr, fmt, num } from './l10n'

describe('tr', () => {
  it('picks the language', () => {
    expect(tr({ en: 'Stop', bn: 'স্টপ' }, 'bn')).toBe('স্টপ')
  })
  it('falls back to en when bn is empty', () => {
    expect(tr({ en: 'Stop', bn: '' }, 'bn')).toBe('Stop')
  })
})

describe('fmt', () => {
  it('fills placeholders and leaves unknown ones intact', () => {
    expect(fmt('Stop {n} of {total} {x}', { n: '3', total: '10' })).toBe('Stop 3 of 10 {x}')
  })
})

describe('num', () => {
  it('uses Bangla digits in bn', () => {
    expect(num(10, 'bn')).toBe('১০')
  })
  it('keeps ASCII digits in en', () => {
    expect(num(10, 'en')).toBe('10')
  })
})
```

`lib/learn/prefs.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { parseStored, DEFAULT_PREFS } from './prefs'

describe('parseStored', () => {
  it('returns defaults for null values', () => {
    expect(parseStored({ lang: null, mode: null, learned: null })).toEqual(DEFAULT_PREFS)
  })
  it('accepts valid values', () => {
    expect(parseStored({ lang: '"bn"', mode: '"technical"', learned: '["celery-redis"]' })).toEqual({
      lang: 'bn', mode: 'technical', learned: ['celery-redis'],
    })
  })
  it('ignores garbage and wrong types', () => {
    expect(parseStored({ lang: '"fr"', mode: '{bad json', learned: '{"a":1}' })).toEqual(DEFAULT_PREFS)
  })
  it('drops non-string learned entries', () => {
    expect(parseStored({ lang: null, mode: null, learned: '["git-basics", 4, null]' }).learned).toEqual(['git-basics'])
  })
})
```

- [ ] **Step 4: Run tests and confirm they fail**

Run: `npm test`
Expected: FAIL, cannot resolve `./l10n` and `./prefs`.

- [ ] **Step 5: Implement**

`lib/learn/l10n.ts`:

```ts
export type Lang = 'en' | 'bn'
export type L10n = { en: string; bn: string }

const BN_DIGITS = '০১২৩৪৫৬৭৮৯'

export const tr = (v: L10n, lang: Lang): string => (lang === 'bn' && v.bn ? v.bn : v.en)

export const fmt = (template: string, vars: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (whole, k: string) => (k in vars ? vars[k] : whole))

export const num = (n: number, lang: Lang): string =>
  lang === 'bn' ? String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : String(n)
```

`lib/learn/prefs.ts`:

```ts
import type { Lang } from './l10n'

export type Mode = 'simple' | 'technical'
export interface Prefs { lang: Lang; mode: Mode; learned: string[] }
export interface RawPrefs { lang: string | null; mode: string | null; learned: string | null }

export const DEFAULT_PREFS: Prefs = { lang: 'en', mode: 'simple', learned: [] }
export const KEYS = { lang: 'learn:lang', mode: 'learn:mode', learned: 'learn:learned' } as const

const safeJson = (raw: string | null): unknown => {
  if (raw == null) return undefined
  try { return JSON.parse(raw) } catch { return undefined }
}

export function parseStored(raw: RawPrefs): Prefs {
  const lang = safeJson(raw.lang)
  const mode = safeJson(raw.mode)
  const learned = safeJson(raw.learned)
  return {
    lang: lang === 'en' || lang === 'bn' ? lang : DEFAULT_PREFS.lang,
    mode: mode === 'simple' || mode === 'technical' ? mode : DEFAULT_PREFS.mode,
    learned: Array.isArray(learned) ? learned.filter((x): x is string => typeof x === 'string') : [],
  }
}
```

- [ ] **Step 6: Run tests, type-check and build**

Run: `npm test && npm run typecheck:learn && npm run build`
Expected: all tests PASS, tsc reports no errors, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.learn.json vitest.config.mjs lib/learn
git commit -m "chore(learn): add vitest, strict learn tsconfig, l10n and prefs helpers"
```

---

### Task 2: Types and geometry

**Files:**
- Create: `data/learn/types.ts`
- Create: `components/learn/player/geometry.ts`
- Create: `components/learn/player/geometry.test.ts`

**Interfaces:**
- Consumes: `L10n` from `lib/learn/l10n`.
- Produces:
  - all data types (below)
  - `bidirectionalCorridors(topic): Set<string>`
  - `corridorFor(topic, from, to): { key: string; reversed: boolean }`
  - `offsetPolyline(pts, d): Pt[]`
  - `trimStart(pts, dist): Pt[]`
  - `trimEnd(pts, dist): Pt[]`
  - `edgePoints(topic, edgeId, layout, bidir): Pt[]`
  - `pathD(pts): string`
  - constants `TRACK_OFFSET = 7.5`, `TRIM_START = 28`, `TRIM_END = 33`

- [ ] **Step 1: Write types**

`data/learn/types.ts`:

```ts
import type { L10n } from '../../lib/learn/l10n'

export type { L10n }
export type Kind = 'request' | 'queue' | 'result' | 'error'
export type Side = 'up' | 'down' | 'left' | 'right'
export type Pt = [number, number]
export type LayoutKey = 'wide' | 'narrow'
export type IconName = 'user' | 'server' | 'queue' | 'worker' | 'store' | 'retry' | 'shield' | 'route' | 'check' | 'code' | 'folder' | 'box' | 'archive' | 'cloud' | 'bookmark' | 'mail' | 'power'
export type LineId = 'backend' | 'async' | 'devops' | 'git' | 'concurrency'

export interface FlowNode {
  icon: IconName
  name: L10n
  sub: L10n
  wide: [number, number, Side]
  narrow: [number, number, Side]
}
export interface Corridor { wide: Pt[]; narrow: Pt[] }
export interface Edge { from: string; to: string; kind: Kind }
export interface Move { edge: string; label: string }
export interface Step {
  id: string
  moves?: Move[]
  work?: { node: string; kind: Kind }
  state?: Record<string, L10n>
  title: L10n
  simple: L10n
  tech: L10n
}
export interface AltRoute { id: string; label: L10n; branchAfter: string; steps: Step[] }
export interface Group { id: string; label: L10n; wide: [number, number, number, number]; narrow: [number, number, number, number] }
export interface Twin { node: string | null; icon: IconName; name: L10n; is?: L10n; d: L10n }
export interface QA { q: L10n; short: L10n; deep: L10n; redFlag: L10n }
export interface Cheat { code: string; d: L10n }
export interface Topic {
  slug: string
  line: LineId
  title: L10n
  summary: L10n
  view: Record<LayoutKey, [number, number]>
  nodes: Record<string, FlowNode>
  groups?: Group[]
  corridors: Record<string, Corridor>
  edges: Record<string, Edge>
  main: { label: L10n; steps: Step[] }
  alts: AltRoute[]
  analogy: { intro: L10n; twins: Twin[] }
  qa: QA[]
  cheats: Cheat[]
  sources: { label: string; url: string }[]
}
```

Corridor keys are `"<nodeA>-<nodeB>"`, authored in one direction only.

- [ ] **Step 2: Write failing geometry tests**

`components/learn/player/geometry.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import type { Topic } from '../../../data/learn/types'
import { offsetPolyline, trimStart, trimEnd, corridorFor, bidirectionalCorridors, edgePoints, pathD } from './geometry'

const L = { en: 'x', bn: 'x' }
const node = (x: number, y: number) => ({ icon: 'user' as const, name: L, sub: L, wide: [x, y, 'down'] as [number, number, 'down'], narrow: [x, y, 'down'] as [number, number, 'down'] })
const topic = {
  nodes: { a: node(0, 0), b: node(100, 0), c: node(100, 100) },
  corridors: { 'a-b': { wide: [[0, 0], [100, 0]], narrow: [[0, 0], [100, 0]] }, 'b-c': { wide: [[100, 0], [100, 100]], narrow: [[100, 0], [100, 100]] } },
  edges: { ab: { from: 'a', to: 'b', kind: 'request' }, ba: { from: 'b', to: 'a', kind: 'result' }, bc: { from: 'b', to: 'c', kind: 'queue' } },
} as unknown as Topic

describe('offsetPolyline', () => {
  it('moves an eastbound segment to its right side (south, +y)', () => {
    expect(offsetPolyline([[0, 0], [10, 0]], 5)).toEqual([[0, 5], [10, 5]])
  })
  it('joins a corner at the intersection of the offset segments', () => {
    const out = offsetPolyline([[0, 0], [10, 0], [10, 10]], 2)
    expect(out[1][0]).toBeCloseTo(8)
    expect(out[1][1]).toBeCloseTo(2)
  })
  it('returns the input when d is 0', () => {
    expect(offsetPolyline([[0, 0], [10, 0]], 0)).toEqual([[0, 0], [10, 0]])
  })
})

describe('trim', () => {
  it('walks across short first segments', () => {
    expect(trimStart([[0, 0], [5, 0], [5, 100]], 15)).toEqual([[5, 10], [5, 100]])
  })
  it('trims the end along the path', () => {
    expect(trimEnd([[0, 0], [100, 0]], 30)).toEqual([[0, 0], [70, 0]])
  })
})

describe('corridors', () => {
  it('finds a corridor authored in the opposite direction', () => {
    expect(corridorFor(topic, 'b', 'a')).toEqual({ key: 'a-b', reversed: true })
  })
  it('marks corridors used both ways as bidirectional', () => {
    expect([...bidirectionalCorridors(topic)]).toEqual(['a-b'])
  })
  it('offsets bidirectional edges to opposite sides', () => {
    const bidir = bidirectionalCorridors(topic)
    const ab = edgePoints(topic, 'ab', 'wide', bidir)
    const ba = edgePoints(topic, 'ba', 'wide', bidir)
    expect(ab[0][1]).toBeCloseTo(7.5)
    expect(ba[0][1]).toBeCloseTo(-7.5)
  })
  it('does not offset one-way edges', () => {
    const pts = edgePoints(topic, 'bc', 'wide', bidirectionalCorridors(topic))
    expect(pts[0][0]).toBeCloseTo(100)
  })
})

describe('pathD', () => {
  it('formats points to one decimal', () => {
    expect(pathD([[0, 0], [10.04, 5.55]])).toBe('M0 0L10 5.6')
  })
})
```

- [ ] **Step 3: Run tests and confirm they fail**

Run: `npm test`
Expected: FAIL, cannot resolve `./geometry`.

- [ ] **Step 4: Implement `components/learn/player/geometry.ts`**

Port `offsetPolyline`, `trimStart`, `trimEnd`, `pathD`, `edgePoints` and the BIDIR IIFE from the mockup's `/* ---------------- geometry ---------------- */` section, typed as below. Behaviour must stay identical.

```ts
import type { LayoutKey, Pt, Topic } from '../../../data/learn/types'

export const TRACK_OFFSET = 7.5
export const TRIM_START = 28
export const TRIM_END = 33

export function corridorFor(topic: Topic, from: string, to: string): { key: string; reversed: boolean } {
  const fk = `${from}-${to}`
  if (topic.corridors[fk]) return { key: fk, reversed: false }
  return { key: `${to}-${from}`, reversed: true }
}

export function bidirectionalCorridors(topic: Topic): Set<string> {
  const dirs = new Map<string, Set<boolean>>()
  for (const e of Object.values(topic.edges)) {
    const { key, reversed } = corridorFor(topic, e.from, e.to)
    const set = dirs.get(key) ?? new Set<boolean>()
    set.add(reversed)
    dirs.set(key, set)
  }
  return new Set([...dirs].filter(([, s]) => s.size === 2).map(([k]) => k))
}

export function offsetPolyline(pts: Pt[], d: number): Pt[] {
  if (!d) return pts
  const segs: [Pt, Pt][] = []
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[i + 1]
    const len = Math.hypot(x2 - x1, y2 - y1)
    const nx = -(y2 - y1) / len
    const ny = (x2 - x1) / len
    segs.push([[x1 + nx * d, y1 + ny * d], [x2 + nx * d, y2 + ny * d]])
  }
  const out: Pt[] = [segs[0][0]]
  for (let i = 0; i < segs.length - 1; i++) {
    const [[ax, ay], [bx, by]] = segs[i]
    const [[cx, cy], [dx, dy]] = segs[i + 1]
    const den = (ax - bx) * (cy - dy) - (ay - by) * (cx - dx)
    if (Math.abs(den) < 1e-6) { out.push(segs[i][1]); continue }
    const t = ((ax - cx) * (cy - dy) - (ay - cy) * (cx - dx)) / den
    out.push([ax + t * (bx - ax), ay + t * (by - ay)])
  }
  out.push(segs[segs.length - 1][1])
  return out
}

export function trimStart(input: Pt[], distance: number): Pt[] {
  const pts = input.map((p) => [p[0], p[1]] as Pt)
  let dist = distance
  while (pts.length > 2) {
    const len = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1])
    if (len > dist) break
    dist -= len
    pts.shift()
  }
  const [a, b] = pts
  const len = Math.hypot(b[0] - a[0], b[1] - a[1])
  const t = Math.min(dist / len, 0.9)
  pts[0] = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
  return pts
}

export const trimEnd = (pts: Pt[], dist: number): Pt[] => trimStart([...pts].reverse(), dist).reverse()

export const pathD = (pts: Pt[]): string =>
  'M' + pts.map((p) => p.map((v) => +v.toFixed(1)).join(' ')).join('L')

export function edgePoints(topic: Topic, edgeId: string, layout: LayoutKey, bidir: Set<string>): Pt[] {
  const e = topic.edges[edgeId]
  const { key, reversed } = corridorFor(topic, e.from, e.to)
  let pts = topic.corridors[key][layout].map((p) => [p[0], p[1]] as Pt)
  if (reversed) pts.reverse()
  pts = offsetPolyline(pts, bidir.has(key) ? TRACK_OFFSET : 0)
  return trimEnd(trimStart(pts, TRIM_START), TRIM_END)
}
```

- [ ] **Step 5: Run tests and type-check**

Run: `npm test && npm run typecheck:learn`
Expected: PASS, no type errors.

- [ ] **Step 6: Commit**

```bash
git add data/learn/types.ts components/learn/player/geometry.ts components/learn/player/geometry.test.ts
git commit -m "feat(learn): add topic types and flow geometry"
```

---

### Task 3: Routes, step helpers and player reducer

**Files:**
- Create: `components/learn/player/flow.ts`
- Create: `components/learn/player/flow.test.ts`
- Create: `components/learn/player/playerReducer.ts`
- Create: `components/learn/player/playerReducer.test.ts`
- Create: `components/learn/player/useStepPlayer.ts`

**Interfaces:**
- Consumes: types from Task 2.
- Produces:
  - `type RouteMap = Record<string, Step[]>` (key `'main'` plus alt ids)
  - `buildRoutes(topic): RouteMap`
  - `firstAltIndex(topic, routeId): number`
  - `stepKind(topic, step): Kind`
  - `focusNodes(topic, step): string[]`
  - `visitedEdges(steps, index): Set<string>`
  - `nodeSubAt(topic, steps, index, nodeId): L10n`
  - `dwellMs(mode): number`
  - `playerReducer(state, action, ctx)`, with `PlayerState`, `PlayerAction`, `PlayerCtx`
  - `useStepPlayer(topic, mode): { state, steps, dispatch }`

- [ ] **Step 1: Write failing tests**

`components/learn/player/flow.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import type { Step, Topic } from '../../../data/learn/types'
import { buildRoutes, firstAltIndex, stepKind, focusNodes, visitedEdges, nodeSubAt, dwellMs } from './flow'

const L = (s: string) => ({ en: s, bn: s })
const st = (id: string, extra: Partial<Step>): Step => ({ id, title: L(id), simple: L(id), tech: L(id), ...extra })
const topic = {
  nodes: { a: { sub: L('idle') }, b: { sub: L('b') } },
  edges: { ab: { from: 'a', to: 'b', kind: 'queue' } },
  main: { label: L('main'), steps: [st('s1', { moves: [{ edge: 'ab', label: 'm' }] }), st('s2', { work: { node: 'b', kind: 'error' }, state: { a: L('busy') } }), st('s3', { moves: [{ edge: 'ab', label: 'm' }] })] },
  alts: [{ id: 'fail', label: L('fail'), branchAfter: 's1', steps: [st('f1', { work: { node: 'b', kind: 'error' } })] }],
} as unknown as Topic

describe('routes', () => {
  it('builds alt routes from the main prefix', () => {
    expect(buildRoutes(topic).fail.map((s) => s.id)).toEqual(['s1', 'f1'])
  })
  it('first alt index points at the first alt-only stop', () => {
    expect(firstAltIndex(topic, 'fail')).toBe(1)
    expect(firstAltIndex(topic, 'main')).toBe(0)
  })
})

describe('step helpers', () => {
  const steps = buildRoutes(topic).main
  it('kind comes from the edge or the work entry', () => {
    expect(stepKind(topic, steps[0])).toBe('queue')
    expect(stepKind(topic, steps[1])).toBe('error')
  })
  it('focus is both edge ends or the working node', () => {
    expect(focusNodes(topic, steps[0])).toEqual(['a', 'b'])
    expect(focusNodes(topic, steps[1])).toEqual(['b'])
  })
  it('visited edges exclude the current step', () => {
    expect([...visitedEdges(steps, 0)]).toEqual([])
    expect([...visitedEdges(steps, 2)]).toEqual(['ab'])
  })
  it('state overrides apply from their stop onward', () => {
    expect(nodeSubAt(topic, steps, 0, 'a').en).toBe('idle')
    expect(nodeSubAt(topic, steps, 1, 'a').en).toBe('busy')
    expect(nodeSubAt(topic, steps, 2, 'a').en).toBe('busy')
  })
  it('dwell is longer in technical mode', () => {
    expect(dwellMs('simple')).toBe(4300)
    expect(dwellMs('technical')).toBe(6500)
  })
})
```

`components/learn/player/playerReducer.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { playerReducer, initialPlayer, type PlayerCtx } from './playerReducer'

const ctx: PlayerCtx = { lengths: { main: 10, fail: 8 }, altStart: { main: 0, fail: 4 } }
const run = (actions: Parameters<typeof playerReducer>[1][]) =>
  actions.reduce((s, a) => playerReducer(s, a, ctx), initialPlayer)

describe('playerReducer', () => {
  it('clamps go within the route', () => {
    expect(run([{ type: 'go', index: 99 }]).step).toBe(9)
    expect(run([{ type: 'go', index: -3 }]).step).toBe(0)
  })
  it('manual navigation pauses', () => {
    expect(run([{ type: 'play' }, { type: 'next' }]).playing).toBe(false)
  })
  it('tick advances while playing and stops at the end', () => {
    const s = run([{ type: 'go', index: 8 }, { type: 'play' }, { type: 'tick' }])
    expect(s.step).toBe(9)
    expect(s.playing).toBe(true)
    expect(playerReducer(s, { type: 'tick' }, ctx).playing).toBe(false)
  })
  it('play at the last stop restarts from 0', () => {
    const s = run([{ type: 'go', index: 9 }, { type: 'play' }])
    expect(s.step).toBe(0)
    expect(s.playing).toBe(true)
  })
  it('switching route pauses and jumps to the first alt-only stop', () => {
    const s = run([{ type: 'play' }, { type: 'route', route: 'fail' }])
    expect(s).toMatchObject({ route: 'fail', step: 4, playing: false })
    expect(playerReducer(s, { type: 'route', route: 'main' }, ctx).step).toBe(0)
  })
  it('selecting the current route is a no-op', () => {
    const s = run([{ type: 'go', index: 3 }])
    expect(playerReducer(s, { type: 'route', route: 'main' }, ctx)).toBe(s)
  })
})
```

- [ ] **Step 2: Run tests and confirm they fail**

Run: `npm test`
Expected: FAIL, cannot resolve `./flow` and `./playerReducer`.

- [ ] **Step 3: Implement `flow.ts`**

```ts
import type { Kind, L10n, Step, Topic } from '../../../data/learn/types'
import type { Mode } from '../../../lib/learn/prefs'

export type RouteMap = Record<string, Step[]>

export function buildRoutes(topic: Topic): RouteMap {
  const routes: RouteMap = { main: topic.main.steps }
  for (const alt of topic.alts) {
    const cut = topic.main.steps.findIndex((s) => s.id === alt.branchAfter)
    routes[alt.id] = [...topic.main.steps.slice(0, cut + 1), ...alt.steps]
  }
  return routes
}

export function firstAltIndex(topic: Topic, routeId: string): number {
  const alt = topic.alts.find((a) => a.id === routeId)
  return alt ? topic.main.steps.findIndex((s) => s.id === alt.branchAfter) + 1 : 0
}

export const stepKind = (topic: Topic, step: Step): Kind =>
  step.work ? step.work.kind : topic.edges[step.moves![0].edge].kind

export function focusNodes(topic: Topic, step: Step): string[] {
  if (step.work) return [step.work.node]
  const ids = step.moves!.flatMap((m) => [topic.edges[m.edge].from, topic.edges[m.edge].to])
  return [...new Set(ids)]
}

export function visitedEdges(steps: Step[], index: number): Set<string> {
  return new Set(steps.slice(0, index).flatMap((s) => (s.moves ?? []).map((m) => m.edge)))
}

export function nodeSubAt(topic: Topic, steps: Step[], index: number, nodeId: string): L10n {
  let sub = topic.nodes[nodeId].sub
  for (let i = 0; i <= index; i++) {
    const o = steps[i].state?.[nodeId]
    if (o) sub = o
  }
  return sub
}

export const dwellMs = (mode: Mode): number => (mode === 'technical' ? 6500 : 4300)
```

- [ ] **Step 4: Implement `playerReducer.ts`**

```ts
export interface PlayerState { route: string; step: number; playing: boolean }
export type PlayerAction =
  | { type: 'go'; index: number }
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'tick' }
  | { type: 'route'; route: string }
export interface PlayerCtx { lengths: Record<string, number>; altStart: Record<string, number> }

export const initialPlayer: PlayerState = { route: 'main', step: 0, playing: false }

export function playerReducer(s: PlayerState, a: PlayerAction, ctx: PlayerCtx): PlayerState {
  const last = ctx.lengths[s.route] - 1
  const clamp = (i: number) => Math.max(0, Math.min(last, i))
  switch (a.type) {
    case 'go': return { ...s, step: clamp(a.index), playing: false }
    case 'next': return { ...s, step: clamp(s.step + 1), playing: false }
    case 'prev': return { ...s, step: clamp(s.step - 1), playing: false }
    case 'play': return { ...s, step: s.step >= last ? 0 : s.step, playing: true }
    case 'pause': return { ...s, playing: false }
    case 'tick':
      if (!s.playing) return s
      return s.step < last ? { ...s, step: s.step + 1 } : { ...s, playing: false }
    case 'route':
      if (a.route === s.route) return s
      return { route: a.route, step: ctx.altStart[a.route] ?? 0, playing: false }
  }
}
```

- [ ] **Step 5: Implement `useStepPlayer.ts`** (the only timer owner)

```ts
import { useEffect, useMemo, useReducer } from 'react'
import type { Topic } from '../../../data/learn/types'
import type { Mode } from '../../../lib/learn/prefs'
import { buildRoutes, dwellMs, firstAltIndex } from './flow'
import { initialPlayer, playerReducer, type PlayerAction, type PlayerCtx } from './playerReducer'

export function useStepPlayer(topic: Topic, mode: Mode) {
  const routes = useMemo(() => buildRoutes(topic), [topic])
  const ctx = useMemo<PlayerCtx>(() => ({
    lengths: Object.fromEntries(Object.entries(routes).map(([k, v]) => [k, v.length])),
    altStart: Object.fromEntries(Object.keys(routes).map((k) => [k, firstAltIndex(topic, k)])),
  }), [routes, topic])
  const [state, dispatch] = useReducer((s: typeof initialPlayer, a: PlayerAction) => playerReducer(s, a, ctx), initialPlayer)

  useEffect(() => {
    if (!state.playing) return
    const t = setTimeout(() => dispatch({ type: 'tick' }), dwellMs(mode))
    return () => clearTimeout(t)
  }, [state.playing, state.step, mode])

  return { state, steps: routes[state.route], routes, dispatch }
}
```

- [ ] **Step 6: Run tests and type-check**

Run: `npm test && npm run typecheck:learn`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/learn/player/flow.ts components/learn/player/flow.test.ts components/learn/player/playerReducer.ts components/learn/player/playerReducer.test.ts components/learn/player/useStepPlayer.ts
git commit -m "feat(learn): add route building, step helpers and player state machine"
```

---

### Task 4: Data, integrity test, shell, routes and smoke harness

This task makes `/learn` and `/learn/celery-redis` reachable with the shell (top bar, language switch, footer) and placeholder bodies, plus the smoke script that later tasks extend.

**Files:**
- Create: `data/learn/ui.ts`
- Create: `data/learn/network.ts`
- Create: `data/learn/icons.ts`
- Create: `data/learn/topics/celery-redis.ts`
- Create: `data/learn/index.ts`
- Create: `data/learn/integrity.test.ts`
- Create: `contexts/LearnPrefsContext.tsx`
- Create: `components/learn/shell/LearnLayout.tsx`
- Create: `components/learn/shell/SegmentedControl.tsx`
- Create: `components/learn/shell/Toast.tsx`
- Create: `components/learn/shell/Rich.tsx`
- Create: `styles/learn.css`
- Create: `pages/learn/index.tsx`
- Create: `pages/learn/[slug].tsx`
- Create: `scripts/learn-smoke.mjs`
- Modify: `pages/_app.js` (import `../styles/learn.css`)
- Modify: `next.config.js` (remove `assetPrefix: './'`)

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces:
  - `UI: Record<UiKey, L10n>`
  - `LINES: Line[]` and `STATIONS: Record<string, Station>` (types in `network.ts`)
  - `ICON: Record<IconName, string>`, where each value is SVG inner markup
  - `TOPICS: Record<string, Topic>`
  - `useLearnPrefs(): { lang, mode, learned, setLang, setMode, toggleLearned, t }`, where `t(v: L10n) => string`
  - `<LearnLayout title description>`
  - `<SegmentedControl label options value onChange>`
  - `useToast(): (msg: string) => void` via `<ToastProvider>`
  - `<Rich text>`, which renders backtick spans as `<code>`

- [ ] **Step 1: Write data files**
  - `data/learn/ui.ts`:
    - Port the mockup's `UI` object verbatim as `export const UI = {...} satisfies Record<string, L10n>` and `export type UiKey = keyof typeof UI`. TS 4.9 supports `satisfies`.
    - Then remove `previewNote`, `toastFirst` and `footer`.
    - Add `footer: { en: 'Stop by Stop is a study companion by Eyakub.', bn: 'Stop by Stop, Eyakub-এর বানানো পড়াশোনার সঙ্গী।' }`, `backToPortfolio: { en: 'Back to portfolio', bn: 'পোর্টফোলিওতে ফিরুন' }`, `sourcesH: { en: 'Sources', bn: 'সূত্র' }`, `lineConcurrency: { en: 'Concurrency line', bn: 'কনকারেন্সি লাইন' }` and `p4: { en: 'Phase 4', bn: 'ধাপ ৪' }`.
  - `data/learn/icons.ts`: port the mockup's `ICON` map, then add these 24px stroke paths:

    ```ts
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3Z"/>',
    route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
    box: '<path d="M21 8l-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
    archive: '<rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M10 13h4"/>',
    cloud: '<path d="M7 18a4.5 4.5 0 0 1-.5-8.97A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 9.5H7Z"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    power: '<path d="M12 3v9"/><path d="M6.3 6.8a8 8 0 1 0 11.4 0"/>',
    ```
  - `data/learn/network.ts`:
    - Export `type Phase = 1 | 2 | 3 | 4`.
    - Export `interface Station { x: number; y: number; lab: 'up' | 'down'; phase: Phase; line: LineId; interchange?: boolean; name: L10n }`.
    - Export `interface Line { id: LineId; color: string; name: UiKey; pts: Pt[]; stops: string[] }`.
    - Port `STN` and `LINES` from the mockup, renaming keys to the spec §3 slugs: `fastapi` → `fastapi-lifecycle`, `celery` → `celery-redis`, `git` → `git-basics`, `http` → `http-journey`, `rest` → `rest-basics`, `auth` → `auth-jwt-oauth`, `redis` → `redis-deep-dive`, `db` → `databases`, `prs` → `github-pull-requests`, `compose` → `docker-compose`, `cicd` → `ci-cd`, `k8s` → `kubernetes`.
    - Set phases per spec §2: FastAPI, Celery and Git are phase 1; HTTP, Docker, Compose, Nginx and CI/CD are phase 3; the rest are phase 4.
    - Add the Concurrency line (`color: '--l-concurrency'`) as a sixth row below DevOps. Grow the map viewBox to `40 58 920 488` and place:

      | Station | x | y | Label |
      |---|---|---|---|
      | `concurrency-vs-parallelism` | 120 | 490 | down |
      | `processes-vs-threads` | 270 | 490 | down |
      | `python-gil` | 420 | 490 | down |
      | `multiprocessing-pools` | 570 | 490 | down |
      | `asyncio-event-loop` | 720 | 490 | down |
      | `race-conditions-locks` | 870 | 490 | down |

      All are phase 2. Line `pts: [[120,490],[870,490]]`.
    - Interchanges with lines further up are drawn as a 3px dashed "walkway" connector from `multiprocessing-pools` up to `celery-redis` and from `asyncio-event-loop` up to `fastapi-lifecycle`. Export them as `export const WALKWAYS: [string, string][] = [['multiprocessing-pools','celery-redis'],['asyncio-event-loop','fastapi-lifecycle']]`.
  - `data/learn/topics/celery-redis.ts`: build `export const celeryRedis: Topic` from the mockup's `TOPIC`, `FLOW`, `MAIN`, `FAIL`, `TWINS`, `QA` and `CHEATS` (the corrected copy), with these changes:
    - give each step an `id`: main `request`, `enqueue`, `instant-reply`, `pickup`, `work`, `saved`, `poll`, `lookup`, `answer`, `download`; failure `crash`, `requeue`, `second-try`, `works`;
    - convert `{ edge, pk }` to `moves: [{ edge, label: pk }]`;
    - convert `{ node, kind }` to `work: { node, kind }`;
    - write the alt as `alts: [{ id: 'failure', label: UI.routeFail, branchAfter: 'pickup', steps: [...] }]`, with `main.label = UI.routeMain`;
    - rename QA fields `s`/`d`/`r` to `short`/`deep`/`redFlag`;
    - set `analogy.intro` to the mockup's `analogyIntro` and move `TWINS` into `analogy.twins`;
    - set `sources` to `[{ label: 'Celery: Using Redis', url: 'https://docs.celeryq.dev/en/stable/getting-started/backends-and-brokers/redis.html' }, { label: 'Celery: Configuration', url: 'https://docs.celeryq.dev/en/stable/userguide/configuration.html' }, { label: 'Celery: Tasks', url: 'https://docs.celeryq.dev/en/stable/userguide/tasks.html' }]`;
    - set `line: 'async'`.
  - `data/learn/index.ts`: `import { celeryRedis } from './topics/celery-redis'; export const TOPICS: Record<string, Topic> = { [celeryRedis.slug]: celeryRedis }`.

- [ ] **Step 2: Write the integrity test** (spec §6 rules)

`data/learn/integrity.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { TOPICS } from './index'
import { STATIONS, LINES } from './network'
import type { L10n, Topic } from './types'

const words = (s: string) => s.replace(/`[^`]*`/g, 'x').trim().split(/\s+/).length
function collectL10n(v: unknown, out: L10n[] = []): L10n[] {
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>
    if (typeof o.en === 'string' && typeof o.bn === 'string' && Object.keys(o).length === 2) out.push(o as L10n)
    else Object.values(o).forEach((x) => collectL10n(x, out))
  }
  return out
}

describe.each(Object.values(TOPICS).map((t) => [t.slug, t] as [string, Topic]))('%s', (_slug, t) => {
  it('edges reference nodes and a corridor', () => {
    for (const e of Object.values(t.edges)) {
      expect(t.nodes[e.from], e.from).toBeTruthy()
      expect(t.nodes[e.to], e.to).toBeTruthy()
      expect(t.corridors[`${e.from}-${e.to}`] ?? t.corridors[`${e.to}-${e.from}`], `${e.from}-${e.to}`).toBeTruthy()
    }
  })
  it('every step has exactly one of moves/work and valid refs', () => {
    for (const s of [...t.main.steps, ...t.alts.flatMap((a) => a.steps)]) {
      expect(Boolean(s.moves) !== Boolean(s.work), s.id).toBe(true)
      s.moves?.forEach((m) => expect(t.edges[m.edge], `${s.id}:${m.edge}`).toBeTruthy())
      if (s.work) expect(t.nodes[s.work.node], s.id).toBeTruthy()
      Object.keys(s.state ?? {}).forEach((n) => expect(t.nodes[n], `${s.id} state ${n}`).toBeTruthy())
      expect(words(s.simple.en), `${s.id} simple`).toBeLessThanOrEqual(30)
      expect(words(s.tech.en), `${s.id} tech`).toBeLessThanOrEqual(45)
    }
  })
  it('alt routes branch from a main step and ids are unique per route', () => {
    const mainIds = t.main.steps.map((s) => s.id)
    expect(new Set(mainIds).size).toBe(mainIds.length)
    for (const a of t.alts) {
      expect(mainIds, a.id).toContain(a.branchAfter)
      const ids = [...mainIds.slice(0, mainIds.indexOf(a.branchAfter) + 1), ...a.steps.map((s) => s.id)]
      expect(new Set(ids).size, a.id).toBe(ids.length)
    }
  })
  it('all copy exists in both languages', () => {
    for (const l of collectL10n(t)) {
      expect(l.en.trim().length).toBeGreaterThan(0)
      expect(l.bn.trim().length, l.en).toBeGreaterThan(0)
    }
  })
  it('positions stay inside the viewBox', () => {
    for (const lk of ['wide', 'narrow'] as const) {
      const [w, h] = t.view[lk]
      const inside = ([x, y]: [number, number] | number[]) => x >= 0 && x <= w && y >= 0 && y <= h
      Object.entries(t.nodes).forEach(([id, n]) => expect(inside(n[lk]), `${lk} ${id}`).toBe(true))
      Object.entries(t.corridors).forEach(([id, c]) => c[lk].forEach((p) => expect(inside(p), `${lk} ${id}`).toBe(true)))
    }
  })
  it('content counts follow the rules', () => {
    expect(t.main.steps.length).toBeGreaterThanOrEqual(6)
    expect(t.main.steps.length).toBeLessThanOrEqual(12)
    expect(t.alts.length).toBeGreaterThanOrEqual(1)
    expect(t.qa.length).toBeGreaterThanOrEqual(5)
    expect(t.cheats.length).toBeGreaterThanOrEqual(5)
    expect(t.sources.length).toBeGreaterThanOrEqual(1)
  })
  it('has a station on the map', () => {
    expect(STATIONS[t.slug]).toBeTruthy()
  })
})

describe('network', () => {
  it('every line stop is a station', () => {
    LINES.forEach((l) => l.stops.forEach((s) => expect(STATIONS[s], `${l.id}:${s}`).toBeTruthy()))
  })
})
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: PASS for Celery and the network. If a Celery rule fails, fix the data; never loosen the test.

- [ ] **Step 4: Prefs context**

`contexts/LearnPrefsContext.tsx`:
- A provider with state from `DEFAULT_PREFS`.
- `useEffect` on mount: read the three keys inside try/catch (any throw means defaults), then `setState(parseStored(raw))`.
- The setters write through to localStorage inside try/catch.
- An effect sets `document.documentElement.lang = lang`.
- Exposes `t = (v: L10n) => tr(v, lang)` and `ui = (k: UiKey) => tr(UI[k], lang)`.
- `toggleLearned(slug)` adds or removes the slug.
- Wrap it in `useMemo` so the value identity only changes with state.

- [ ] **Step 5: Stylesheet**

`styles/learn.css`:
- **Tokens.** Copy the mockup's whole `<style>` block, re-scoped as follows:
  - replace bare `:root{` with `.learn-root{` (the tokens);
  - drop the two `[data-theme]` / `:root:not(...)` dark blocks and use one `@media (prefers-color-scheme: dark){ .learn-root{ ...dark tokens...; color-scheme:dark } }`;
  - add `color-scheme:light` to the light block;
  - add `--l-concurrency:#0E7C86` (light) and `#4CC9D3` (dark).
- **Fonts.** Set `--f-ui: var(--font-anek-latin), var(--font-anek-bangla), ui-sans-serif, system-ui, sans-serif`, `--f-bn: var(--font-anek-bangla), var(--font-anek-latin), ui-sans-serif, system-ui, sans-serif` and `--f-code: var(--font-jetbrains), ui-monospace, Menlo, monospace`.
- **Scoping.**
  - Prefix every rule with `.learn-root ` (e.g. `.learn-root .bar{...}`).
  - `body{...}` becomes `.learn-root{background:var(--paper);color:var(--ink);font-family:var(--f-ui);font-size:17px;line-height:1.55;min-height:100dvh;-webkit-font-smoothing:antialiased}`.
  - `html[lang="bn"] body` becomes `html[lang="bn"] .learn-root`.
  - Keep the keyframes global (rename them `learn-pulse` and `learn-arrive`, and update the references).
- **Body background.** Add `body:has(.learn-root){background:#F2F4F8}` and `@media (prefers-color-scheme: dark){body:has(.learn-root){background:#0C121E}}` so overscroll matches.
- **Selectors to change from the mockup:**
  - replace `#flow` with `.flow-svg` and `#network` with `.network-svg`;
  - replace `#done-btn` with `.done-btn`;
  - replace `.ride .now` / `.player .ride` selectors as-is, but prefix them.
- **Add these rules:**
  - Hidden: `.learn-root [hidden]{display:none!important}`.
  - Sources: `.learn-root .sources{list-style:none;margin:0;padding:0;display:grid;gap:8px;font-size:var(--t-sm)}` and `.learn-root .sources a{color:var(--ink-2)}`.
  - Group box: `.learn-root .flow-svg .group rect{fill:color-mix(in srgb,var(--ink) 4%,transparent);stroke:var(--rule);stroke-dasharray:6 5;stroke-width:1.5}` and `.learn-root .flow-svg .group text{fill:var(--ink-3);font-size:13px;font-weight:600}`.
  - Walkway: `.learn-root .network-svg .walk{fill:none;stroke:var(--ink-3);stroke-width:3;stroke-dasharray:2 6;stroke-linecap:round}`.

Import it in `pages/_app.js` right after the existing `martyr.css` import:

```js
import '../styles/learn.css'
```

- [ ] **Step 6: Shell components**
  - `components/learn/shell/LearnLayout.tsx`:
    - Load fonts at module scope:

      ```ts
      import { Anek_Latin, Anek_Bangla, JetBrains_Mono } from 'next/font/google'
      const anekLatin = Anek_Latin({ subsets: ['latin'], axes: ['wdth'], variable: '--font-anek-latin', display: 'swap' })
      const anekBangla = Anek_Bangla({ subsets: ['bengali', 'latin'], axes: ['wdth'], variable: '--font-anek-bangla', display: 'swap' })
      const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })
      ```

    - Render `<Head><title>{title}</title><meta name="description" content={description} /></Head>`, then `<div className={`learn-root ${anekLatin.variable} ${anekBangla.variable} ${mono.variable}`}><div className="shell">`.
    - Inside the shell: the top bar (port the mockup `header.bar`, with the brand linking to `/learn` via `next/link`), the language `SegmentedControl` (EN / বাংলা, the বাংলা button with `lang="bn"`), `{children}`, and a footer. The footer shows `ui('footer')` and a `next/link` to `/` labelled `ui('backToPortfolio')`.
    - Wrap everything in `<LearnPrefsProvider><ToastProvider>`.
  - `SegmentedControl.tsx`:
    - Props: `{ label?: string; ariaLabel?: string; options: { value: string; label: string; lang?: string }[]; value: string; onChange(v: string): void }`.
    - Renders `<div class="seg" role="group">` with buttons that have `type="button"` and `aria-pressed`.
    - With more than 3 options, add class `seg chips` and give `.chips` the CSS `flex-wrap:wrap;border-radius:18px`. Add that rule to `learn.css`.
  - `Toast.tsx`: a context plus `useToast()`. It renders a `<div class="toast" role="status">` hidden when empty and auto-hides after 3800ms (port the mockup's `toast()`).
  - `Rich.tsx`: split on backticks and render odd segments as `<code>`. No `dangerouslySetInnerHTML`.

    ```tsx
    export function Rich({ text }: { text: string }) {
      return <>{text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}</>
    }
    ```

- [ ] **Step 7: Pages**

`pages/learn/index.tsx`:

```tsx
import type { GetStaticProps } from 'next'
import LearnLayout from '../../components/learn/shell/LearnLayout'
import Hub from '../../components/learn/hub/Hub'
import { TOPICS } from '../../data/learn'

interface Props { openSlugs: string[] }

export const getStaticProps: GetStaticProps<Props> = async () => ({ props: { openSlugs: Object.keys(TOPICS) } })

export default function LearnIndex({ openSlugs }: Props) {
  return (
    <LearnLayout title="Stop by Stop: learn backend systems visually" description="Animated, beginner-friendly walkthroughs of Celery, FastAPI, Git and more, in English and Bangla.">
      <Hub openSlugs={openSlugs} />
    </LearnLayout>
  )
}
```

In this task, create `components/learn/hub/Hub.tsx` as a minimal version: the hero only (port `section.hero`, with the CTA as a `next/link` to `/learn/celery-redis`). Task 5 completes it.

`pages/learn/[slug].tsx`:

```tsx
import type { GetStaticPaths, GetStaticProps } from 'next'
import LearnLayout from '../../components/learn/shell/LearnLayout'
import TopicPage from '../../components/learn/topic/TopicPage'
import { TOPICS } from '../../data/learn'
import type { Topic } from '../../data/learn/types'

interface Props { topic: Topic }

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.keys(TOPICS).map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => ({
  props: { topic: TOPICS[params!.slug as string] },
})

export default function LearnTopic({ topic }: Props) {
  return (
    <LearnLayout title={`${topic.title.en} | Stop by Stop`} description={topic.summary.en}>
      <TopicPage topic={topic} />
    </LearnLayout>
  )
}
```

In this task, create `components/learn/topic/TopicPage.tsx` as a minimal version: the breadcrumb `next/link` to `/learn`, the line tag, the title and the summary (port `header.topic-head` without the switches). Task 6 completes it.

- [ ] **Step 8: Remove `assetPrefix`**

In `next.config.js`, delete the line `assetPrefix: './',`.

- [ ] **Step 9: Smoke harness**

`scripts/learn-smoke.mjs`:
- A node script with no new dependencies besides `playwright-core`.
  - It starts a tiny static server over `out/`: for path `p`, it serves `out/p`, else `out/p.html`, else `out/p/index.html`, else `out/404.html` with status 404.
  - It launches Chromium with `executablePath` from `process.env.LEARN_CHROMIUM` or, failing that, the newest `~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell`.
- It runs an array of named checks, collecting `pageerror` events and failed requests (`requestfailed`, plus responses with status ≥ 400 other than the deliberate 404 check).
- It saves screenshots to `.smoke/` (add `.smoke/` to `.gitignore`).
- It exits 1 if any check fails, printing each failure.
- Checks to include now:
  - `hub-loads`: `/learn` at 1280×860 shows an `h1`; no errors.
  - `nested-route-assets`: `/learn/celery-redis` loads with zero failed requests (this is the `assetPrefix` regression check) and shows the topic title.
  - `unknown-slug-404`: `/learn/nope` returns status 404.
  - `lang-persists`: on `/learn`, click বাংলা, reload, and expect `document.documentElement.lang === 'bn'` and the `h1` text to contain Bengali characters (`/[ঀ-৿]/`).
  - `no-overflow`: at 390×844 on both pages, `document.documentElement.scrollWidth <= 390`.
  - `existing-pages`: `/`, `/projects` and `/eyasir` load with no failed requests (proves the `assetPrefix` removal didn't break them).

- [ ] **Step 10: Run everything**

Run: `npm test && npm run typecheck:learn && npm run build && npm run smoke:learn`
Expected: all PASS; the build output lists `/learn` and `/learn/[slug]` with `celery-redis`.

- [ ] **Step 11: Commit**

```bash
git add data/learn contexts/LearnPrefsContext.tsx components/learn styles/learn.css pages/learn pages/_app.js next.config.js scripts/learn-smoke.mjs .gitignore
git commit -m "feat(learn): add learn shell, data registry, routes and smoke harness"
```

---

### Task 5: Hub: network map, line strips and navbar entry

**Files:**
- Create: `components/learn/hub/NetworkMap.tsx`
- Create: `components/learn/hub/LineStrips.tsx`
- Modify: `components/learn/hub/Hub.tsx`
- Modify: `components/Navbar.js` (add a Learn button after Projects, in both the drawer and the desktop menu)
- Modify: `scripts/learn-smoke.mjs`

**Interfaces:**
- Consumes: `LINES`, `STATIONS`, `WALKWAYS`, `useLearnPrefs`, `useToast`, `ICON`.
- Produces: `<NetworkMap openSlugs learned onStation(slug)>` and `<LineStrips openSlugs learned onStation(slug)>`.

- [ ] **Step 1: Extend the smoke checks first (failing)**
  - `hub-map`: at 1280×860, `.network-svg .st` count equals `Object.keys(STATIONS).length` (hardcode 20). Clicking the `celery-redis` station navigates to `/learn/celery-redis`. Clicking `python-gil` shows a toast containing "Phase 2".
  - `hub-strips-mobile`: at 390×844, `.network-svg` is not visible and `.strip` count is 5.
  - `navbar-learn`: on `/` at 1280×860, a link with text "Learn" points to `/learn`.

Run: `npm run build && npm run smoke:learn`
Expected: the new checks FAIL.

- [ ] **Step 2: Implement `NetworkMap`**
  - Port the mockup's `renderMap()` as JSX: polylines per line, then stations as `<g className="st ..." role="link" tabIndex={0} aria-label=...>`.
  - Open state comes from `openSlugs.includes(id)`; otherwise the station is `soon`, and its status label is `UI.p2` / `p3` / `p4` by `phase`.
  - Interchange stations get class `x`. Learned stations get class `done` and the check path.
  - Draw `WALKWAYS` first as `<path className="walk" d={`M${a.x} ${a.y}L${b.x} ${b.y}`} />`.
  - Click and Enter/Space call `onStation(id)`.
  - `viewBox="40 58 920 488"`.
  - The line key `<ul className="line-key">` sits below the map card.
- [ ] **Step 3: Implement `LineStrips`**
  - Port the mockup's `renderStrips()`, including the "Change for the {line}" note and the chips (`learned` beats `open` beats phase).
- [ ] **Step 4: Complete `Hub`**
  - Order: hero, map section (map card + key), then strips.
  - `onStation`: if `openSlugs.includes(slug)`, `router.push('/learn/' + slug)`; else toast `fmt(ui('toastLater'), { name: t(STATIONS[slug].name), phase: ui('p' + phase) })`.
- [ ] **Step 5: Navbar**
  - In both menus, add right after the Projects button:

    ```jsx
    <Button as={NextLink} href="/learn" fontSize="16px" variant="ghost">
      Learn
    </Button>
    ```

    In the desktop menu, also copy that block's `p="4"` and `_hover={{ bg: 'gray.700' }}` props.
- [ ] **Step 6: Run checks**

Run: `npm test && npm run typecheck:learn && npm run build && npm run smoke:learn`
Expected: all PASS. Open `.smoke/hub-*.png` and check that no labels collide and that the dashed later-phase stations and walkways are visible.

- [ ] **Step 7: Commit**

```bash
git add components/learn/hub components/Navbar.js scripts/learn-smoke.mjs
git commit -m "feat(learn): add network map hub, line strips and navbar entry"
```

---

### Task 6: Flow player

**Files:**
- Create: `components/learn/player/FlowPlayer.tsx`
- Create: `components/learn/player/FlowDiagram.tsx`
- Create: `components/learn/player/NowPanel.tsx`
- Create: `components/learn/player/PlayerControls.tsx`
- Create: `components/learn/player/StopList.tsx`
- Create: `components/learn/player/KindLegend.tsx`
- Modify: `components/learn/topic/TopicPage.tsx` (switches + player)
- Modify: `scripts/learn-smoke.mjs`

**Interfaces:**
- Consumes: `useStepPlayer`, `flow.ts`, `geometry.ts`, `ICON`, `useLearnPrefs`, `Rich`, `SegmentedControl`.
- Produces: `<FlowPlayer topic>`, plus `<FlowDiagram topic layout steps index animate>`, where `animate` is false on the first render and after a layout change.

- [ ] **Step 1: Extend the smoke checks first (failing)**

All on `/learn/celery-redis`:

- `player-step`: at 1280×860, click `#next` twice. Expect `#stopno` to read "Stop 3 of 10", `.packet:not([hidden])` count 1, and that packet's bounding box width > 40.
- `player-rapid`: click `#next` 5 times with no wait, then wait 1500ms. Expect "Stop 6 of 10", exactly 1 visible packet, and 0 visible `.comet`.
- `player-resize`: at stop 3, resize to 390×844, wait 300ms. Expect the counter unchanged, the SVG `viewBox` starting with `0 0 400`, and the packet visible.
- `player-lang-during-play`: click Play, click বাংলা, wait 4500ms. Expect `#stopno` to match `/^স্টপ [০-৯]+ \/ ১০$/` and the playing button label to be `থামান`.
- `player-failure-route`: click the "A job fails" segment. Expect "Stop 5 of 8" and a visible `.edge.k-error` after one `#next`.
- `player-keyboard`: focus `#next` and press ArrowRight. Expect the counter to advance by 1.
- `player-mobile-order`: at 390×844, the `.now` top is less than the `.stage` top, which is less than the `.controls` top.
- `reduced-motion`: open with `reducedMotion: 'reduce'`, click `#next`, and with no wait expect the packet visible at its rest position (the packet's transform does not change between two reads 200ms apart).

Run: `npm run build && npm run smoke:learn`
Expected: the new checks FAIL.

- [ ] **Step 2: Implement `FlowDiagram`**
  - **Render.** Port `renderDiagram()` and `nodeLabel()` as JSX:
    - defs with four arrow markers;
    - groups (`<g className="group"><rect rx="16" .../><text>label</text></g>`, the label above the rect at x = rectX + 14, y = rectY − 8);
    - tracks for every corridor; edges with class `edge k-${kind}` plus `active` / `visited` from `visitedEdges` and the current step's moves;
    - one `<circle className="comet">` per move;
    - nodes with `on` / `working` classes from `focusNodes` and `step.work`, `style={{ '--k': `var(--k-${kind})` }}` and the sub-label from `nodeSubAt`;
    - one packet `<g className="packet">` per move.
  - Compute `bidirectionalCorridors(topic)` once with `useMemo`.
  - The SVG gets `className="flow-svg"`, `role="img"` and `aria-labelledby="step-title"`.
  - **Animation.** Port `runPacket()` and `arrive()` into a `useLayoutEffect` keyed on `[index, routeKey, layout]`:
    - use refs to the edge paths, packets and comets;
    - set the packet text, measure `getComputedTextLength()` and size the rect;
    - if `!animate || matchMedia('(prefers-reduced-motion: reduce)').matches`, place the packet at 0.5 and stop;
    - otherwise run the two-phase rAF (packet 0.04 → 0.5 over 750ms, then the comet 0.5 → 1 over 520ms), then add the `arrive` class to the destination node's `<g>` for 600ms;
    - the cleanup cancels the rAF and the timeout and hides the comets.
  - Toggle the packet and comet `hidden` with `setAttribute` / `removeAttribute` (SVG elements have no `.hidden` property; this exact bug was found in the mockup).
- [ ] **Step 3: Implement the panels**
  - `NowPanel`: port `.now` (band with `#stopno` using `fmt(ui('stopOf'), { n: num(i + 1, lang), total: num(len, lang) })`, pips, `#step-title`, `#step-simple` via `<Rich>`, the tech block shown only in technical mode, the next-stop line).
  - `PlayerControls`: port `.controls` with ids `prev`, `play`, `next`, the play/pause/again icons and labels from `syncPlay()`, and aria-labels from `UI.prev` / `UI.next`.
  - `StopList`: a `<details className="stops">`, `open` by default when `matchMedia('(min-width: 980px)')` matches on mount.
  - `KindLegend`: port the `#kind-key` markup.
- [ ] **Step 4: Implement `FlowPlayer`**
  - Use `useStepPlayer(topic, mode)` and a `ResizeObserver` on the stage that sets `layout` to `wide` when width ≥ 600, else `narrow`.
  - Skip animation on the first paint and on layout changes; animate on step changes. Track the previous step in a ref.
  - Handle ArrowLeft/ArrowRight on the player section's `onKeyDown`, ignoring Space/Enter when the target is a button.
  - Markup order matches the mockup: `section.player > div.stage#stage + div.ride > (.now, .controls, details.stops)`.
  - Render the route `SegmentedControl` in `TopicPage`'s switches. Options are main plus the alts, passed up via props; `FlowPlayer` exposes `route` and `onRoute` by owning the player and rendering the switches itself, so place the topic-head switches inside `FlowPlayer`'s top.
  - The mode `SegmentedControl` uses `useLearnPrefs().setMode`.
- [ ] **Step 5: Run checks**

Run: `npm test && npm run typecheck:learn && npm run build && npm run smoke:learn`
Expected: all PASS. Review `.smoke/player-*.png` for label collisions in both layouts.

- [ ] **Step 6: Commit**

```bash
git add components/learn/player components/learn/topic scripts/learn-smoke.mjs
git commit -m "feat(learn): add animated flow player with routes, modes and responsive layout"
```

---

### Task 7: Topic sections and learned progress

**Files:**
- Create: `components/learn/sections/AnalogyTwins.tsx`
- Create: `components/learn/sections/InterviewQA.tsx`
- Create: `components/learn/sections/CheatSheet.tsx`
- Create: `components/learn/sections/Sources.tsx`
- Modify: `components/learn/topic/TopicPage.tsx`
- Modify: `scripts/learn-smoke.mjs`

**Interfaces:**
- Consumes: `Topic` fields `analogy`, `qa`, `cheats`, `sources`, and `useLearnPrefs().toggleLearned`.

- [ ] **Step 1: Extend the smoke checks first (failing)**
  - `sections`: `.twins li` count equals 6, `.qa details` count equals 5 (the first one open), `.cheat` count equals 6, and `.sources a` count is ≥ 1 with an `https://` href.
  - `copy-button`: click the first `.copy` and expect its label to become "Copied" or "Selected, press Ctrl+C" within 500ms.
  - `learned-flow`: click `.done-btn`, expect `aria-pressed="true"`, go to `/learn`, and expect the `celery-redis` strip chip text to be "Learned" and the map station to have class `done`.

Run: `npm run build && npm run smoke:learn`
Expected: the new checks FAIL.

- [ ] **Step 2: Implement the sections**
  - Port the markup for `.twins`, `.qa` and `.cheats` from the mockup's `renderTopic()`, including the heading markup `h2 > i + span`.
  - Twins without an `is` field use `fmt(ui('isThe'), { x: t(topic.nodes[node].name) })`.
  - Cheat copy uses `navigator.clipboard.writeText` inside the click handler, with selection as the fallback (port the mockup's handler).
  - `Sources` renders `<section className="read">` with a heading from `ui('sourcesH')` and `<ul className="sources">` of external links (`target="_blank" rel="noreferrer"`).
- [ ] **Step 3: Done button**
  - Port the mockup's `.done-row` button. `aria-pressed` follows `learned.includes(topic.slug)`, and clicking calls `toggleLearned(topic.slug)`.
- [ ] **Step 4: Run checks**

Run: `npm test && npm run typecheck:learn && npm run build && npm run smoke:learn`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add components/learn/sections components/learn/topic scripts/learn-smoke.mjs
git commit -m "feat(learn): add analogy, interview Q&A, cheat-sheet, sources and learned progress"
```

---

### Task 8: FastAPI lifecycle topic

**Files:**
- Create: `data/learn/topics/fastapi-lifecycle.ts`
- Modify: `data/learn/index.ts` (register it)
- Modify: `scripts/learn-smoke.mjs` (add the topic to the per-topic loop)

**Interfaces:**
- Consumes: `Topic`. Produces: `export const fastapiLifecycle: Topic` (slug `fastapi-lifecycle`, line `backend`).

- [ ] **Step 1: Make the smoke checks per-topic first (failing)**

Refactor the Task 6 checks `player-step`, `player-failure-route` (renamed `player-alt-route`: click the second route option, expect a visible active edge or working node after one `#next`) and `no-overflow` to loop over `['celery-redis', 'fastapi-lifecycle']`. The expected counter totals come from each topic's main length (11 for FastAPI).

Run: `npm run build && npm run smoke:learn`
Expected: FAIL (404 for fastapi-lifecycle).

- [ ] **Step 2: Author the data** (source: research §1; spec §10.2)
  - `view`: `wide: [1000, 360]`, `narrow: [400, 740]`.
  - **Nodes** (`id`: icon, name EN, sub EN):
    - `client`: user, "Client", "Browser or app"
    - `uvicorn`: power, "Uvicorn", "ASGI server"
    - `sem`: shield, "ServerErrorMiddleware", "Safety net"
    - `mw`: route, "Your middleware", "CORS, auth, timing"
    - `exm`: shield, "ExceptionMiddleware", "Errors to replies"
    - `router`: route, "Router", "Picks the function"
    - `deps`: check, "Dependencies", "Inputs + validation"
    - `op`: code, "Your function", "def or async def"
    - `bg`: mail, "BackgroundTasks", "After the reply"
  - **Wide positions:**
    - `client` … `op` at x = 60 + 115·i, y = 150 (op at x = 865);
    - `bg` at (955, 240);
    - label sides: `client` up, `uvicorn` down, `sem` up, `mw` down, `exm` up, `router` down, `deps` up, `op` up, `bg` left.
  - **Narrow positions:**
    - `client` … `op` at x = 150, y = 40 + 80·i (op at y = 600);
    - `bg` at (150, 690);
    - every label `right`.
  - **Group:**
    - `{ id: 'stack', label: { en: 'Middleware stack', bn: 'মিডলওয়্যার স্ট্যাক' } }`;
    - wide rect `[205, 78, 400, 150]`;
    - narrow rect `[100, 165, 290, 230]`.
  - **Corridors:**
    - consecutive pairs are straight segments between node centres in both layouts;
    - `op-bg`: wide `[[865,150],[955,240]]`, narrow `[[150,600],[150,690]]`;
    - `exm-deps` (422 rail): wide `[[520,150],[520,250],[750,250],[750,150]]`, narrow `[[150,360],[60,360],[60,520],[150,520]]`;
    - `sem-op` (500 rail): wide `[[290,150],[290,330],[865,330],[865,150]]`, narrow `[[150,200],[90,200],[90,575],[150,575]]`;
    - `uvicorn-op` (lifespan rail): wide `[[175,150],[175,50],[960,50],[960,150],[865,150]]`, narrow `[[150,120],[30,120],[30,600],[150,600]]`.
  - **Edges:**
    - inward `request` edges for every consecutive pair (`client→uvicorn` … `deps→op`);
    - outward `result` edges for every consecutive pair in reverse (`op→deps` … `uvicorn→client`), which makes those corridors bidirectional;
    - `op→bg` `queue`;
    - `deps→exm` `error` (uses `exm-deps`);
    - `op→sem` `error` (uses `sem-op`);
    - `uvicorn→op` `queue` (uses `uvicorn-op`).
  - **Authoring rule:** positions are not part of the contract; readability is. If a screenshot shows a collision, adjust the coordinates and keep the integrity test green.
  - **Main steps** (ids, from research §1 steps 1–11):
    1. `request` (`client→uvicorn`, label `GET /items/42`)
    2. `asgi` (`uvicorn→sem`, `scope, receive, send`)
    3. `your-mw` (`sem→mw`, `request`)
    4. `exception-layer` (`mw→exm`, `request`)
    5. `route-match` (`exm→router`, `request`)
    6. `deps` (`router→deps`, `path + body`)
    7. `handler` (`deps→op`, `item_id=42`)
    8. `response-model` (`op→deps`, `return value`; tech note: `response_model` validation and filtering happen as the value leaves)
    9. `outward` (`exm→mw`, `JSONResponse`; tech note: the response passes your middleware bottom to top)
    10. `delivered` (`uvicorn→client`, `200 OK`)
    11. `background` (`op→bg`, `send_email()`; tech note: runs after the response is sent, in-process, no retries)
  - **Alts:**
    - `bad-input`, label `{ en: 'Bad input (422)', bn: 'ভুল ইনপুট (422)' }`, `branchAfter: 'deps'`:
      1. `validation-fails` (work `deps`, `error`)
      2. `handler-answers` (`deps→exm`, `RequestValidationError`)
      3. `422-out` (`exm→mw`, `422 + detail[]`)
      4. `422-delivered` (`uvicorn→client`, `422`; the simple caption says your function never ran)
    - `bug-500`, label `{ en: 'A bug (500)', bn: 'বাগ (500)' }`, `branchAfter: 'handler'`:
      1. `crash` (work `op`, `error`)
      2. `escapes` (`op→sem`, `KeyError`; tech note: it skips ExceptionMiddleware and your middleware)
      3. `500-out` (`uvicorn→client`, `500`; tech note: CORS never ran, so the browser reports a CORS error that hides the real 500)
    - `startup`, label `{ en: 'Server starts up', bn: 'সার্ভার চালু হয়' }`, `branchAfter: 'request'`, research §1 alt D. The first alt step's title is "Rewind: before the first request" so the order reads naturally.
      1. `lifespan-start` (`uvicorn→op`, `lifespan.startup`; tech note: code before `yield` runs: DB pool, ML model)
      2. `ready` (work `uvicorn`, `result`; state `uvicorn`: "Accepting requests")
      3. `lifespan-stop` (`uvicorn→op`, `lifespan.shutdown`; tech note: code after `yield` runs)
      4. `closed` (work `op`, `result`; state `op`: "Pool closed")
  - **Analogy** (research §1, restaurant front of house). Twins:
    - client = customer
    - uvicorn = host at the door
    - sem = manager who handles kitchen fires
    - mw = coat check and security
    - exm = waiter who says "we're out of that"
    - router = host seating you
    - deps = waiter checking the order form
    - op = chef
    - a failure twin: "Kitchen fire" is a 500
  - **QA** (6): research §1 questions 1, 2, 3, 4, 5, 6, with short/deep/red flag taken from the research text and tightened to fit.
  - **Cheats** (8): research §1 cheat-sheet lines 1, 2, 3, 5, 6, 8, 9, 10, with the code in `code` and the explanation in `d`.
  - **Sources**: the four "verified" URLs in research §1 (use `https://www.starlette.dev/middleware/`).
  - **Copy rules:** every `title` / `simple` / `tech` is written fresh in both EN and BN following the Global Constraints word limits; the research captions are the starting point. Bangla keeps `FastAPI`, `Uvicorn`, `middleware`, `async def` etc. in English.

- [ ] **Step 3: Register and run**

Add `[fastapiLifecycle.slug]: fastapiLifecycle` to `TOPICS`.

Run: `npm test && npm run typecheck:learn && npm run build && npm run smoke:learn`
Expected: all PASS. Review `.smoke/player-fastapi-*.png` at both sizes for label collisions and fix coordinates if needed.

- [ ] **Step 4: Commit**

```bash
git add data/learn/topics/fastapi-lifecycle.ts data/learn/index.ts scripts/learn-smoke.mjs
git commit -m "feat(learn): add FastAPI request lifecycle topic"
```

---

### Task 9: Git basics topic

**Files:**
- Create: `data/learn/topics/git-basics.ts`
- Modify: `data/learn/index.ts`
- Modify: `scripts/learn-smoke.mjs` (add to the per-topic loop; add a `git-state` check)

**Interfaces:**
- Produces: `export const gitBasics: Topic` (slug `git-basics`, line `git`).

- [ ] **Step 1: Smoke check first (failing)**

Add `git-basics` to the per-topic loop. Add `git-state`: on `/learn/git-basics`, go to stop 3 (commit) and expect the `repo` node's `.sb` text to contain `a1b2c3`.

Run: `npm run build && npm run smoke:learn`
Expected: FAIL.

- [ ] **Step 2: Author the data** (source: research §3; spec §10.3)
  - `view`: `wide: [820, 380]`, `narrow: [400, 600]`.
  - **Nodes:**
    - `wd`: folder, "Working directory", "Files you edit"
    - `idx`: box, "Staging area", "Next snapshot"
    - `repo`: archive, "Local repository", sub `HEAD → main → 9f8e7d`
    - `rtrack`: bookmark, "origin/main", "Last seen: 9f8e7d"
    - `remote`: cloud, "GitHub (origin)", "main → 9f8e7d"
  - **Wide positions:**
    - top row `wd` (80,110), `idx` (290,110), `repo` (500,110), `remote` (740,110);
    - `rtrack` (620,280);
    - labels down for the top row, right for `rtrack`.
  - **Narrow positions:**
    - vertical `wd` (90,50), `idx` (90,170), `repo` (90,290), `remote` (90,520);
    - `rtrack` (290,405);
    - labels right, except `rtrack` uses `left`.
  - **Corridors:**
    - `wd-idx`, `idx-repo`, `repo-remote` straight;
    - `remote-rtrack` wide `[[740,110],[740,170],[630,280],[620,280]]`;
    - `rtrack-repo` wide `[[620,280],[500,280],[500,110]]`;
    - `remote-wd` (pull) wide `[[740,110],[740,40],[80,40],[80,110]]`;
    - narrow equivalents routed on the right side at x = 290 and x = 360.
  - **Edges:**
    - `wd→idx` request (add)
    - `idx→repo` request (commit)
    - `repo→remote` request (push)
    - `remote→rtrack` result (fetch)
    - `rtrack→repo` result (merge)
    - `remote→wd` result (pull)
    - `repo→wd` error (conflict markers)
  - **Main steps:**
    1. `edit`: work `wd`, request; state `wd` "app.py modified"
    2. `add`: `wd→idx`, `git add app.py`; state `idx` "app.py staged"
    3. `commit`: `idx→repo`, `git commit`; state `repo` `HEAD → main → a1b2c3`
    4. `branch-moves`: work `repo`, result; the tech note explains HEAD is a symbolic ref to `main`, and `main` now points at `a1b2c3`
    5. `push`: `repo→remote`, `git push`; state `remote` `main → a1b2c3`, `rtrack` "Last seen: a1b2c3"
    6. `teammate`: work `remote`, queue; state `remote` `main → 77d4e1`; the simple caption says a teammate pushed new work
    7. `fetch`: `remote→rtrack`, `git fetch`; state `rtrack` "Last seen: 77d4e1"; the simple caption stresses your files are untouched
    8. `merge`: `rtrack→repo`, `git merge origin/main`; state `repo` `HEAD → main → 5c6d7e` (a merge commit with two parents)
  - **Alts:**
    - `pull`, label `{ en: 'git pull', bn: 'git pull' }`, `branchAfter: 'teammate'`:
      1. `pull`: `remote→wd`, `git pull`; tech note: fetch + merge in one move, rebase only with `--rebase` or `pull.rebase=true`
      2. `pulled`: work `repo`, result; state `repo` `HEAD → main → 5c6d7e`, `rtrack` "Last seen: 77d4e1"
    - `conflict`, label `{ en: 'Merge conflict', bn: 'মার্জ কনফ্লিক্ট' }`, `branchAfter: 'fetch'`:
      1. `clash`: work `repo`, error; both sides changed the same lines
      2. `markers`: `repo→wd`, `<<<<<<< ======= >>>>>>>`
      3. `resolve`: `wd→idx`, `git add app.py` after editing
      4. `finish`: `idx→repo`, `git commit`; state `repo` `HEAD → main → 8b9c0d`
    - `detached`, label `{ en: 'Detached HEAD', bn: 'ডিটাচড HEAD' }`, `branchAfter: 'commit'`:
      1. `checkout-sha`: work `repo`, error; state `repo` `HEAD → 9f8e7d (no branch)`
      2. `orphan-commit`: `idx→repo`, `git commit`; state `repo` `HEAD → e3f4a5 (no branch)`; the simple caption warns this commit is on no branch
      3. `rescue`: work `repo`, result, `git switch -c rescue`; state `repo` `HEAD → rescue → e3f4a5`
  - **Analogy:** research §3 photo album. Twins: wd = messy desk, idx = arranging tray, repo = photo album, rtrack = your note of the cloud album, remote = shared cloud album, failure twin "two people glued different photos on the same page" = merge conflict.
  - **QA** (6): research §3 questions 1, 2, 3, 4, 5, 7.
  - **Cheats** (8): `git status -sb`, `git add -p`, `git switch -c feature/x`, `git fetch --prune`, `git pull --rebase`, `git log --oneline --graph --decorate --all`, `git revert <sha>`, `git push --force-with-lease`. Each `d` says what it does in one line; the force-with-lease line says why it is safer than `--force`.
  - **Sources:** `https://git-scm.com/book/en/v2/Git-Internals-Git-References`, `https://git-scm.com/book/en/v2/Git-Branching-Rebasing`, `https://git-scm.com/docs/git-pull`.
  - **Copy rules:** same as Task 8.
- [ ] **Step 3: Register and run**

Run: `npm test && npm run typecheck:learn && npm run build && npm run smoke:learn`
Expected: all PASS. Review the screenshots.

- [ ] **Step 4: Commit**

```bash
git add data/learn/topics/git-basics.ts data/learn/index.ts scripts/learn-smoke.mjs
git commit -m "feat(learn): add Git basics topic"
```

---

### Task 10: Final verification

**Files:** none new; fixes only.

- [ ] **Step 1: Full run**

Run: `npm test && npm run typecheck:learn && npm run build && npm run smoke:learn`
Expected: all PASS.

- [ ] **Step 2: Golden path by hand** (spec §13)

Serve with `npx serve out` (or the smoke server) and go through this in a real browser at phone and desktop width, in light and dark:
1. open the hub;
2. open each topic;
3. play the main route;
4. switch to Technically and to বাংলা;
5. play each alt route;
6. mark the topic as learned;
7. back on the hub, confirm the check.

Note any defect; fix it, commit `fix(learn): ...`, and rerun Step 1.

- [ ] **Step 3: Bangla review hand-off**

List every topic file for Eyakub's native-speaker review (spec §9). Do not block the merge on it; record it in the PR body.
