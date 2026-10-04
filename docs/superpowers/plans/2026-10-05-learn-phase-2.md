# Stop by Stop Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Open the Concurrency line on `/learn`: six new topics, plus the engine support they need for parallel moves (several packets at once) and parallel work (several stations working at once).

**Architecture:**
- No new pages or components. Each topic is one typed data file in `data/learn/topics/`, registered in `data/learn/index.ts`. The hub opens a station as soon as its slug is in `TOPICS`.
- Engine changes are small and live in `flow.ts` (pure helpers), `geometry.ts` (pure `pointAt`), and `FlowDiagram.tsx` (rendering): per-packet colours, arrival flash on every destination, and multi-station `work`.
- The integrity test replaces the Phase 1 "exactly one move" rule with a geometric check that parallel packets never overlap at rest.
- A screenshot mode in the smoke script captures the diagram at every stop in both layouts, so authors and reviewers can check layouts visually.

**Tech Stack:** Next 16.2 Pages Router (`output: 'export'`), React 19, TypeScript 4.9 (`tsconfig.learn.json` strict), vitest, playwright-core (local smoke only).

**Spec:** `docs/superpowers/specs/2026-10-04-learn-stop-by-stop-design.md` (§7.9 engine additions, §11 Concurrency line).

**Research notes:** `docs/superpowers/research/2026-10-05-concurrency-research.md`. One `# N.` section per topic, in the order of Tasks 2–7.

**Format references:**
- `data/learn/topics/celery-redis.ts` for the overall topic file shape.
- `data/learn/topics/fastapi-lifecycle.ts` for groups, `nodeR`, and several alts.
- `data/learn/topics/git-basics.ts` for `state` overrides.

## Global Constraints

- Every topic satisfies `data/learn/types.ts` and `data/learn/integrity.test.ts`:
  - main route 6–12 steps; at least 1 alt;
  - QA ≥ 5; cheats ≥ 5; sources ≥ 1;
  - every `L10n` has non-empty `en` and `bn`;
  - balanced backticks;
  - a twin with `node: null` has `is`.
- Copy rules:
  - `simple` ≤ 30 English words and `tech` ≤ 45 English words;
  - technical terms stay in English inside Bangla (`GIL`, `thread`, `asyncio`, `await`, `Lock`, `pickle`);
  - backticks mark code.
- Python-first framing (CPython). Version claims (free-threaded build, default start methods, pool sizes) must match the "verified" facts in the research doc. Never state a version fact the research did not verify.
- Packet labels are short ASCII (`label: string`, not L10n). Aim for ≤ 18 characters; the hard limit is 24, the Phase 1 maximum.
- Layout rules (lessons from Phase 1):
  - `view.wide` about 760–1000 × 340–460.
  - `view.narrow` is 400 wide and **≤ 580 tall**: the `mobile-fits` smoke check fails beyond about that.
  - Node centres ≥ 110px apart in wide and ≥ 64px apart in narrow. Set `nodeR.narrow` to 20 when narrow spacing is under 80.
  - Corridors are octilinear polylines (0°, 45°, 90° segments) from node centre to node centre.
  - Each node's label (name plus sub, about 8.5px per character, 40px tall) must not overlap a disc, a corridor, another label, or a group label. Pick `side` per node.
  - In narrow, run the spine down the left half and put labels on the `right`.
  - Group rects pad ≥ 40px around member node centres. Nothing that is not a member sits inside a group rect.
- Narrative in the analogy, Q&A and cheats follows the research section. Captions are rewritten fresh to fit the word limits.
- Commit after every task with a conventional message:
  - author email `eyakubsorkar@gmail.com`;
  - no AI attribution trailers;
  - never stage `next-env.d.ts` (pre-existing local change).
- Verification commands, all from the repo root:
  - `npm test` and `npm run typecheck:learn` (vitest needs Node ≥ 22.12; use the Node on PATH, not `.nvmrc`);
  - `npm run build`;
  - `npm run smoke:learn` (about 3–5 min);
  - `SMOKE_ONLY=step-shots LEARN_SHOTS=<slug> node scripts/learn-smoke.mjs` (screenshots only).

## Review Focus

1. **Two parallel packets whose edges sit close together** (sibling threads into one memory node, pool workers fanning out) must not cover each other's labels in either layout. Pinned by the Task 1 integrity rule; every topic task must keep it green.
2. **Several stations working at once** (`work.node` as an array): every listed station pulses, and every one is in focus. Pinned by the Task 1 `flow.test.ts` cases.
3. **Mixed-kind parallel moves** (a `result` and a `request` in one step): each packet and comet takes its own edge's colour, not the first move's. Pinned by a Task 1 smoke assertion on packet fill.
4. **The hub after the Concurrency line opens:** six more stations are open and link to their pages. The "later phase" toast still works for Phase 3 stations. Pinned by the Task 1 smoke change and the Task 8 hub check.
5. **Narrow layout on a phone with the longest Bangla captions:** the diagram and controls still fit one screen. Pinned by `mobile-fits`, which every topic task extends through `TOPIC_CASES`.

---

### Task 1: Engine support for parallel moves and parallel work, plus screenshot mode

**Files:**
- Modify: `data/learn/types.ts` (`Step.work.node` accepts `string | string[]`; extend `IconName`)
- Modify: `data/learn/icons.ts` (new icons)
- Modify: `components/learn/player/flow.ts` (`workNodes`, `focusNodes`)
- Modify: `components/learn/player/flow.test.ts`
- Modify: `components/learn/player/geometry.ts` (`pointAt`)
- Modify: `components/learn/player/geometry.test.ts`
- Modify: `components/learn/player/FlowDiagram.tsx`
- Modify: `data/learn/integrity.test.ts`
- Modify: `scripts/learn-smoke.mjs` (`hub-map` station, packet-colour check, `step-shots` mode)
- Modify: `package.json` (`shots:learn` script)

**Interfaces:**
- Produces:
  - `workNodes(step: Step): string[]` in `flow.ts`;
  - `pointAt(pts: Pt[], t: number): Pt` in `geometry.ts`;
  - `Step.work` is `{ node: string | string[]; kind: Kind }`;
  - new `IconName` members (listed in Step 5);
  - smoke screenshot mode writes `.smoke/shots/<slug>/<wide|narrow>-<route>-<NN>.png`.
- Consumes: existing `edgePoints`, `bidirectionalCorridors`, `visitedEdges`.

- [ ] **Step 1: Write the failing unit tests**

Append to `components/learn/player/flow.test.ts`, and add `workNodes` to its import from `./flow`:

```ts
describe('parallel steps', () => {
  const par = {
    nodes: { a: { sub: L('a') }, b: { sub: L('b') }, c: { sub: L('c') }, d: { sub: L('d') } },
    edges: { ab: { from: 'a', to: 'b', kind: 'request' }, cd: { from: 'c', to: 'd', kind: 'result' } },
    main: {
      label: L('main'),
      steps: [
        st('p1', { moves: [{ edge: 'ab', label: 'x' }, { edge: 'cd', label: 'y' }] }),
        st('p2', { work: { node: ['b', 'd'], kind: 'result' } }),
      ],
    },
    alts: [],
  } as unknown as Topic
  const steps = par.main.steps
  it('work names one node or several', () => {
    expect(workNodes(steps[1])).toEqual(['b', 'd'])
    expect(workNodes(st('w', { work: { node: 'a', kind: 'error' } }))).toEqual(['a'])
    expect(workNodes(steps[0])).toEqual([])
  })
  it('focus covers both ends of every parallel move', () => {
    expect(focusNodes(par, steps[0])).toEqual(['a', 'b', 'c', 'd'])
  })
  it('focus covers every working node', () => {
    expect(focusNodes(par, steps[1])).toEqual(['b', 'd'])
  })
  it('visited edges include every edge of a parallel step', () => {
    expect([...visitedEdges(steps, 1)]).toEqual(['ab', 'cd'])
  })
})
```

Append to `components/learn/player/geometry.test.ts`, and add `pointAt` to its import from `./geometry`:

```ts
describe('pointAt', () => {
  it('walks the polyline by length', () => {
    expect(pointAt([[0, 0], [100, 0], [100, 100]], 0.5)).toEqual([100, 0])
    expect(pointAt([[0, 0], [100, 0], [100, 100]], 0.75)).toEqual([100, 50])
  })
  it('clamps to the ends', () => {
    expect(pointAt([[0, 0], [10, 0]], 0)).toEqual([0, 0])
    expect(pointAt([[0, 0], [10, 0]], 1)).toEqual([10, 0])
  })
})
```

- [ ] **Step 2: Run them to see them fail**

Run: `npx vitest run components/learn/player`
Expected: FAIL. `workNodes` and `pointAt` are not exported.

- [ ] **Step 3: Implement the helpers**

`data/learn/types.ts`, in `Step`:

```ts
  work?: { node: string | string[]; kind: Kind }
```

`components/learn/player/flow.ts`:

```ts
export const workNodes = (step: Step): string[] => (step.work ? ([] as string[]).concat(step.work.node) : [])

export function focusNodes(topic: Topic, step: Step): string[] {
  if (step.work) return workNodes(step)
  const ids = step.moves!.flatMap((m) => [topic.edges[m.edge].from, topic.edges[m.edge].to])
  return [...new Set(ids)]
}
```

`components/learn/player/geometry.ts`:

```ts
export function pointAt(pts: Pt[], t: number): Pt {
  const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  let d = lens.reduce((a, b) => a + b, 0) * t
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i]) {
      const k = lens[i] ? d / lens[i] : 0
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]
    }
    d -= lens[i]
  }
  return pts[pts.length - 1]
}
```

Run: `npx vitest run components/learn/player`
Expected: PASS.

- [ ] **Step 4: Render parallel steps in `FlowDiagram.tsx`**

1. Import `workNodes` from `./flow`. Compute `const working = new Set(workNodes(step))`. The node class uses `working.has(id) ? 'working' : ''` instead of `step.work?.node === id`.
2. Replace the single `pkStyle` with a per-kind helper, applied to each comet and packet from its own edge:

```tsx
const kindStyle = (k: Kind) => ({ '--pk': `var(--k-${k})`, '--pk-on': `var(--k-${k}-on)` } as CSSProperties)
// comet:  style={kindStyle(topic.edges[m.edge].kind)}
// packet: style={kindStyle(topic.edges[m.edge].kind)}
```

   Nodes keep `--k` from `stepKind` (the first move's kind) for their focus ring.
3. Flash every distinct destination on arrival, not only the first. Replace `let arrived: SVGGElement | null = null` and the `if (t >= 1)` block with:

```ts
let arrived: SVGGElement[] = []
// ...inside tick, when t >= 1:
comets.forEach((c) => c?.setAttribute('hidden', ''))
const dests = [...new Set(geo.flatMap((g) => (g ? [g.to] : [])))]
arrived = dests.flatMap((d) => { const g = nodeRefs.current[d]; return g ? [g] : [] })
arrived.forEach((g) => { g.classList.remove('arrive'); void g.getBoundingClientRect(); g.classList.add('arrive') })
if (arrived.length) arriveTimer = setTimeout(() => arrived.forEach((g) => g.classList.remove('arrive')), 600)
return
```

   The effect cleanup becomes `arrived.forEach((g) => g.classList.remove('arrive'))`.

Run: `npm run typecheck:learn`
Expected: PASS.

- [ ] **Step 5: Add the icons**

Extend `IconName` in `data/learn/types.ts` and `ICON` in `data/learn/icons.ts`. Use 24×24 stroke icons in the same style as the existing ones (Lucide-derived, no fill):

| name | use | SVG inner markup |
|---|---|---|
| `cpu` | CPU core | `<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>` |
| `thread` | a thread | `<path d="M3 7c3-3 6 3 9 0s6 3 9 0M3 17c3-3 6 3 9 0s6 3 9 0"/>` |
| `lock` | a lock | `<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>` |
| `memory` | RAM / shared memory | `<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10v4M10 10v4M14 10v4M18 10v4M6 18v3M12 18v3M18 18v3"/>` |
| `loop` | event loop | `<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/>` |
| `hourglass` | waiting / blocked | `<path d="M6 2h12M6 22h12M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M17 2v4.2a2 2 0 0 1-.6 1.4L12 12l4.4 4.4a2 2 0 0 1 .6 1.4V22"/>` |
| `pipe` | pipe / IPC channel | `<path d="M16 3l4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/>` |
| `task` | a task / job | `<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>` |
| `alert` | crash / failure | `<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>` |

- [ ] **Step 6: Replace the Phase 1 one-move rule in the integrity test**

In `data/learn/integrity.test.ts`:
- import `bidirectionalCorridors`, `edgePoints`, `pointAt` from `../../components/learn/player/geometry`;
- import `workNodes` from `../../components/learn/player/flow`;
- in "every step has exactly one of moves/work", replace `if (s.work) expect(t.nodes[s.work.node], s.id).toBeTruthy()` with `workNodes(s).forEach((n) => expect(t.nodes[n], \`${s.id} work ${n}\`).toBeTruthy())`;
- delete the `'every move step carries exactly one move (Phase 1)'` test and add:

```ts
  it('parallel moves use distinct edges and their packets never overlap', () => {
    const pillW = (label: string) => label.length * 7.6 + 26
    const bidir = bidirectionalCorridors(t)
    for (const s of [...t.main.steps, ...t.alts.flatMap((a) => a.steps)]) {
      if (!s.moves || s.moves.length < 2) continue
      expect(s.moves.length, s.id).toBeLessThanOrEqual(3)
      expect(new Set(s.moves.map((m) => m.edge)).size, s.id).toBe(s.moves.length)
      for (const lk of ['wide', 'narrow'] as const) {
        const r = t.nodeR?.[lk] ?? 25
        const box = s.moves.map((m) => ({ c: pointAt(edgePoints(t, m.edge, lk, bidir, r), 0.5), w: pillW(m.label) }))
        for (let i = 0; i < box.length; i++) for (let j = i + 1; j < box.length; j++) {
          const apart = Math.abs(box[i].c[0] - box[j].c[0]) >= (box[i].w + box[j].w) / 2 + 4 || Math.abs(box[i].c[1] - box[j].c[1]) >= 32
          expect(apart, `${s.id} ${lk}: "${s.moves[i].label}" overlaps "${s.moves[j].label}"`).toBe(true)
        }
      }
    }
  })
  it('packet labels stay short', () => {
    for (const s of [...t.main.steps, ...t.alts.flatMap((a) => a.steps)]) s.moves?.forEach((m) => expect(m.label.length, `${s.id}: ${m.label}`).toBeLessThanOrEqual(24))
  })
```

Run: `npm test`
Expected: PASS. Phase 1 topics have no parallel steps, and their longest packet label is 23 characters.

- [ ] **Step 7: Smoke: hub toast station, packet colour, screenshot mode**

In `scripts/learn-smoke.mjs`:

1. **`hub-map`:**
   - click `.network-svg .st[data-id="docker"]` instead of `python-gil`;
   - assert the toast includes `'Phase 3'`;
   - `python-gil` becomes an open station in Task 4.
2. **New check `packet-colour`:**
   - open `/learn/celery-redis` with `reducedMotion: 'reduce'` (add a `reducedMotion` option to `open()` and pass it to `browser.newContext`);
   - read `getComputedStyle(document.querySelector('.packet rect')).fill`, and compare it with the `--k-request` colour resolved on `.learn-root`;
   - the first celery step is a `request` move, so they must match.
3. **New opt-in check `step-shots`:** add it to `checks` only when `process.env.LEARN_SHOTS` is set. The value is a comma list of slugs, or `all` for every `TOPIC_CASES` slug. For each slug and each viewport (`{ name: 'wide', width: 1280, height: 860 }`, `{ name: 'narrow', width: 390, height: 844 }`):
   - open `/learn/<slug>` with `reducedMotion: 'reduce'`;
   - for each route button (`.switch .seg` nth(1) `button`, index `r`), click it, then screenshot `.flow-svg` at every stop until `#next` has `aria-disabled="true"`;
   - the path is `.smoke/shots/<slug>/<viewport>-<r>-<NN>.png`, where `NN` is the 2-digit stop index within that walk;
   - after clicking `#next`, wait 120ms before each screenshot.

4. **`player-alt-route`:** concurrency alts often fail with a pulsing station rather than an error move. The check now also passes when a `.node.working` element has an inline `style` containing `--k-error`. Assertion message: `${slug} no visible error edge or error-working node`.

`package.json` scripts: `"shots:learn": "SMOKE_ONLY=step-shots LEARN_SHOTS=all node scripts/learn-smoke.mjs"`.

Run: `npm run build && npm run smoke:learn && SMOKE_ONLY=step-shots LEARN_SHOTS=celery-redis node scripts/learn-smoke.mjs`
Expected: all PASS; `.smoke/shots/celery-redis/` holds wide and narrow PNGs for both routes. Open one wide and one narrow PNG to confirm they show the diagram.

- [ ] **Step 8: Commit**

```bash
git add data/learn/types.ts data/learn/icons.ts components/learn/player/flow.ts components/learn/player/flow.test.ts components/learn/player/geometry.ts components/learn/player/geometry.test.ts components/learn/player/FlowDiagram.tsx data/learn/integrity.test.ts scripts/learn-smoke.mjs package.json
git commit -m "feat(learn): parallel moves, multi-station work and diagram screenshots"
```

---

## Shared procedure for Tasks 2–7 (one topic each)

Every topic task follows the same steps. The task's own section gives the structural decisions: stations, groups, edges, routes, step ids, parallel steps, and alts. **The research section gives the content**: captions, technical notes, analogy, Q&A, cheats, and sources. Where the task section and the research disagree, the task section wins. Those are deliberate rulings.

**Files (all topic tasks):**
- Create: `data/learn/topics/<slug>.ts`, exporting `export const <camelName>: Topic` with `line: 'concurrency'`.
- Modify: `data/learn/index.ts` (import and register in `TOPICS`).
- Modify: `scripts/learn-smoke.mjs` (append the topic to `TOPIC_CASES`).

**Authoring rules (beyond Global Constraints):**
- **Edge kinds:**
  - `request` for work or data pushed forward;
  - `queue` for a hand-off into something that waits (queue, pipe, selector registration, lock request);
  - `result` for data, results or a granted token coming back;
  - `error` for a failure path.
  - Each edge has exactly one kind. Edge ids are `<from>-<to>`, e.g. `queue-core1`.
- **Corridors:** one per station pair, keyed `<a>-<b>`. Edges in both directions over one pair share it and are drawn offset automatically.
- **Work steps:** `work: { node, kind }`. Use `kind: 'error'` for failures, `'result'` for success, `'queue'` for waiting. `node` may be an array when several stations work at once.
- **`state` overrides:** short sub-labels, ≤ 4 words in EN. Reset them explicitly when the story moves on: a value set earlier persists until overridden.
- **`summary`:** one sentence, ≤ 25 words, plain English.
- **Analogy:** an `intro` plus one twin per station (`node` set), plus one failure twin (`node: null`, with `is`). Pick each twin's `icon` from `IconName`.
- **Counts:**
  - QA 6–8, taken from the research Q&A: `q`, `short`, `deep`, `redFlag`.
  - Cheats 6–8, from the research cheat-sheet: `code` is the snippet, `d` the one-liner.
  - Sources: only the URLs the research marks (verified), each with a short `label`.
- **Bangla:**
  - natural, simple Bangla, not word-for-word;
  - technical terms stay in English;
  - digits inside code stay ASCII;
  - prose numbers may use Bangla digits only where the existing topics do.

**Steps:**

- [ ] **Step 1: Author the data file.** Use the task section and the research section. Start with `view`, `nodes`, `corridors` and `edges`, then the routes, then the remaining content.
- [ ] **Step 2: Register and add the smoke case.** Add the topic to `TOPICS`. Append to `TOPIC_CASES`:
  - `{ slug, total: <main length>, altStop: 'Stop <k+2> of <k+1+altLen>' }`, where `k` is the 0-based index of the alt's `branchAfter` step in main;
  - plus `altBtn: <n>` when the chosen alt is not the first one.
  - Choose an alt whose **second** step is an error move or an error work step (the `player-alt-route` check presses Next once after selecting it).
- [ ] **Step 3: Unit gate.** Run `npm test && npm run typecheck:learn`. Expected: PASS. Integrity failures name the step and layout. Fix the data, never the test.
- [ ] **Step 4: Visual gate.**
  - Run `npm run build && SMOKE_ONLY=step-shots LEARN_SHOTS=<slug> node scripts/learn-smoke.mjs`.
  - Open (Read) at least: the first main stop, every parallel-move stop, one stop per alt, in **both** `wide` and `narrow`.
  - Fix any overlap: label on label, label on disc, label on corridor, packet covering a station name, or a group label clashing with a station.
  - Repeat until clean.
  - List the screenshots you inspected in your report.
- [ ] **Step 5: Smoke gate.** Run `npm run smoke:learn`. Expected: all PASS, including `mobile-fits` and `all-steps-no-errors` for the new topic.
- [ ] **Step 6: Commit.**

```bash
git add data/learn/topics/<slug>.ts data/learn/index.ts scripts/learn-smoke.mjs
git commit -m "feat(learn): add <title> topic"
```

---

### Task 2: Concurrency vs parallelism topic

**Slug and export:** `concurrency-vs-parallelism` / `concurrencyVsParallelism`. **Research:** §1. Title EN "Concurrency vs parallelism"; BN as in `network.ts` station name.

- **Stations** (id: icon, name, sub):
  - `queue`: task, "Task queue", "Dishes A–D";
  - `core1`: cpu, "CPU core 1", "Idle";
  - `core2`: cpu, "CPU core 2", "Idle";
  - `wait`: hourglass, "Waiting area", "Oven, disk, network";
  - `done`: check, "Finished", "0 results".
- **Group:** `cpu`, label "One machine, two cores", containing `core1` and `core2`.
- **Layout sketch (wide):** `queue` at the left middle, the two cores stacked in the centre with `core1` above `core2`, `done` on the right middle, `wait` above `core1`. Narrow: the same top-to-bottom.
  - The `queue→core1` and `queue→core2` packets must sit apart. The same goes for `core1→done` and `core2→done`.
- **Edges:**
  - `queue→core1` request; `queue→core2` request;
  - `core1→wait` queue; `wait→core1` result;
  - `core1→done` result; `core2→done` result.
- **Main** (9 steps; ids in order; research steps 1–9):
  1. `start-a`
  2. `a-waits`
  3. `start-b`
  4. `a-resumes`
  5. `a-done`
  6. `b-done`
  7. `two-start`: parallel, `queue→core1` "C" + `queue→core2` "D"
  8. `two-done`: parallel, `core1→done` "C" + `core2→done` "D"
  9. `tally`: work `done`, result
  - Step 9 state for `done`: "Juggle vs do at once".
- **Alts:**
  - `gil-threads`, label "Python threads, no speed-up", `branchAfter: 'b-done'` (research Alt A, 4 steps):
    - `t-start`: parallel `queue→core1` "T1" + `queue→core2` "T2";
    - `t-blocked`: work `core2`, error;
    - `t1-done`: `core1→done`;
    - `t2-done`: `core2→done`.
    - States as in the research, shortened.
    - **Use this alt in `TOPIC_CASES`** (its second step is an error work step).
  - `io-free`, label "Waiting costs nothing", `branchAfter: 'start-b'` (research Alt B, 2 steps):
    - `many-wait`: work `wait`, queue;
    - `ready-one`: `wait→core1`.

---

### Task 3: Processes vs threads topic

**Slug and export:** `processes-vs-threads` / `processesVsThreads`. **Research:** §2.

- **Stations:**
  - `a_t1`: thread, "Thread 1", "In process A";
  - `a_t2`: thread, "Thread 2", "In process A";
  - `a_mem`: memory, "Memory A", "x = ?";
  - `pipe`: pipe, "Pipe / Queue", "Pickled bytes";
  - `b_main`: thread, "Process B", "Own interpreter";
  - `b_mem`: memory, "Memory B", "x = ?".
- **Groups:**
  - `proc-a` "Process A" = `a_t1`, `a_t2`, `a_mem`;
  - `proc-b` "Process B" = `b_main`, `b_mem`.
  - `pipe` sits between the groups, outside both rects.
- **Layout sketch (wide):** Process A on the left (threads stacked, memory to their right), the pipe in the middle, Process B on the right. Narrow: Process A on top, the pipe in the middle, Process B below.
- **Edges:**
  - `a_t1→a_mem` request; `a_mem→a_t2` result; `a_t2→a_mem` request;
  - `a_t1→pipe` queue; `pipe→b_main` queue;
  - `b_main→b_mem` request;
  - `b_main→pipe` result; `pipe→a_t1` result.
- **Main** (10 steps). **Ruling:** research step 4 is dropped as redundant, and research step 10 (shown as one hop) is split into two real moves.
  1. `t1-writes` (`a_t1→a_mem` "x=1")
  2. `t2-reads` (`a_mem→a_t2` "read x")
  3. `t2-writes` (`a_t2→a_mem` "x=2")
  4. `send` (`a_t1→pipe` "pickle(x)")
  5. `arrive` (`pipe→b_main` "bytes")
  6. `unpickle` (work `b_main`, result; state `b_mem` "x = 2 (copy)")
  7. `b-writes` (`b_main→b_mem` "x=99")
  8. `a-untouched` (work `a_mem`, result; state "x = 2, unchanged")
  9. `reply` (`b_main→pipe` "result")
  10. `reply-lands` (`pipe→a_t1` "copy of result")
- **Alts:**
  - `process-crash`, label "A process crashes", `branchAfter: 'b-writes'`:
    - `b-dies`: work `['b_main', 'b_mem']`, error; states "Dead (signal 9)" and "Gone";
    - `a-survives`: work `a_t1`, result; state "Alive, sees EOF".
  - `thread-crash`, label "A thread crashes", `branchAfter: 't2-writes'`:
    - `t2-segfault`: work `a_t2`, error; state "SIGSEGV";
    - `all-gone`: work `['a_t1', 'a_mem']`, error; states "Dead" and "Gone".
    - The tech note says a plain Python exception only ends that thread.
    - **Use this alt in `TOPIC_CASES`** (`altBtn: 2`).

---

### Task 4: The Python GIL topic

**Slug and export:** `python-gil` / `pythonGil`. **Research:** §3, content and facts.

**Ruling:** the token direction is made consistent. A grant is always `gil→thread` with label "GIL"; a release is always `thread→gil` with label "release".

- **Stations:**
  - `t1`: thread, "Thread 1", "Idle";
  - `t2`: thread, "Thread 2", "Idle";
  - `gil`: lock, "The GIL", "Free";
  - `interp`: code, "Interpreter", "Runs bytecode";
  - `io`: cloud, "Network / disk", "Outside world";
  - `cext`: box, "C extension", "hashlib, NumPy".
- **Group:** `proc` "One CPython process" = `t1`, `t2`, `gil`, `interp`, `cext`. `io` stays outside the rect.
- **Edges:**
  - `gil→t1` result; `gil→t2` result; `t1→gil` queue; `t2→gil` queue;
  - `t1→interp` request; `t2→interp` request;
  - `t2→io` queue; `io→t2` result;
  - `t1→cext` request.
- **Main** (11 steps):
  1. `t1-takes` (`gil→t1` "GIL")
  2. `t1-runs` (`t1→interp` "bytecode")
  3. `t2-waits` (work `t2`, queue)
  4. `switch-request` (work `gil`, queue; state "T2 asked for it"; tech note: 5 ms switch interval, advisory)
  5. `t1-releases` (`t1→gil` "release")
  6. `t2-takes` (`gil→t2` "GIL")
  7. `io-release`: parallel, `t2→io` "recv()" + `gil→t1` "GIL"; the GIL is released on blocking I/O and T1 takes it
  8. `data-back` (`io→t2` "data")
  9. `c-call` (`t1→cext` "sha256(big)"; state `gil` "Free (C released it)")
  10. `t2-runs` (`gil→t2` "GIL")
  11. `c-returns` (work `cext`, result; state `gil` "T1 must re-take")
  - Never claim the 5 ms default comes from the `sys` docs. The research verified it from `ceval_gil.c`; phrase it as "default 5 ms".
- **Alts:**
  - `cpu-bound`, label "CPU-bound: no speed-up", `branchAfter: 't2-takes'` (5 steps):
    - `both-crunch`: work `['t1', 't2']`, queue; states "CPU loop";
    - `taking-turns`: work `gil`, error; state "T1 / T2 alternating";
    - `ping`: `t2→gil` "release";
    - `pong`: `gil→t1` "GIL";
    - `no-gain`: work `interp`, error; state "Wall time = sum".
    - **Use this alt in `TOPIC_CASES`** (`altBtn: 1`).
  - `free-threaded`, label "Free-threaded Python", `branchAfter: 't1-runs'`:
    - `gil-off`: work `gil`, result; state "Disabled (3.14t)";
    - `both-run`: parallel `t1→interp` "T1 code" + `t2→interp` "T2 code";
    - `ext-reenables`: work `interp`, error; state `gil` "Re-enabled";
    - `still-lock`: work `['t1', 't2']`, queue; state "Still need Lock".
    - Version facts must match research §0: 3.13 experimental, 3.14 supported but optional, the GIL build is still the default.
- **Extra smoke work for this task (ruling from the Task 1 review):** extend the `packet-colour` check in `scripts/learn-smoke.mjs`. After its celery assertion:
  - open `/learn/python-gil` with `reducedMotion: 'reduce'` and click `#next` 6 times to reach `io-release` (stop 7);
  - assert there are exactly two `.packet` elements;
  - assert their `rect` fills resolve to `--k-queue` (the `t2→io` packet) and `--k-result` (the `gil→t1` packet) respectively, using the same colour normalisation as the existing check;
  - this is the one mixed-kind parallel step that would catch a regression to one shared packet colour.
  - Add `scripts/learn-smoke.mjs` to the commit (it already is, via `TOPIC_CASES`).

---

### Task 5: Multiprocessing pools topic

**Slug and export:** `multiprocessing-pools` / `multiprocessingPools`. **Research:** §4.

- **Stations:**
  - `main`: server, "Parent process", "`__main__` guard";
  - `start`: power, "Start method", "forkserver / spawn";
  - `tasks`: queue, "Task queue", "Pickled chunks";
  - `w1`: worker, "Worker 1", "Idle";
  - `w2`: worker, "Worker 2", "Idle";
  - `results`: store, "Result queue", "Pickled results".
- **Group:** `pool` "Pool" = `start`, `tasks`, `w1`, `w2`, `results`. `main` stays outside.
- **Edges:**
  - `main→start` request; `start→w1` request; `start→w2` request;
  - `main→tasks` queue; `tasks→w1` queue; `tasks→w2` queue;
  - `w1→results` result; `w2→results` result;
  - `results→main` result.
- **Main** (9 steps, research 1–9):
  1. `create` (work `main`, result)
  2. `start`
  3. `workers-up`: parallel, `start→w1` "spawn" + `start→w2` "spawn"
  4. `chunk`
  5. `compute`: parallel, `tasks→w1` "chunk 0" + `tasks→w2` "chunk 1"
  6. `w2-first`
  7. `w1-second`
  8. `in-order`
  9. `shutdown` (work `main`, result)
  - Start-method facts follow research §0: Linux 3.14 `forkserver`, macOS and Windows `spawn`.
- **Alts:**
  - `unpicklable`, label "Unpicklable argument", `branchAfter: 'workers-up'`. **Ruling:** research says after step 4, but step 4 is the pickling itself.
    - `pickle-fails`: work `main`, error; state "PicklingError";
    - `fix-def`: work `main`, result; state "Fix: top-level def".
  - `no-guard`, label "Missing `__main__` guard", `branchAfter: 'start'`:
    - `reimport`: `start→w1` "import __main__";
    - `bootstrap-error`: work `w1`, error; state "RuntimeError".
    - **Use this alt in `TOPIC_CASES`** (`altBtn: 2`).
  - `worker-dies`, label "A worker dies", `branchAfter: 'compute'`:
    - `oom`: work `w1`, error; state "Dead (-9)";
    - `broken`: work `main`, error; state "BrokenProcessPool".
- **Celery tie-in:** include research Q&A 7 and the `celery ... --pool=prefork` cheat.

---

### Task 6: asyncio event loop topic

**Slug and export:** `asyncio-event-loop` / `asyncioEventLoop`. **Research:** §5.

- **Stations:**
  - `tasks`: task, "Your tasks", "Coroutines A, B";
  - `ready`: queue, "Ready queue", "Empty";
  - `loop`: loop, "Event loop", "One thread";
  - `selector`: hourglass, "Selector", "epoll / kqueue";
  - `net`: cloud, "Sockets", "Network";
  - `pool`: worker, "Thread pool", "Default executor".
- **Group:** `thread` "One thread" = `tasks`, `ready`, `loop`, `selector`. `net` and `pool` stay outside.
- **Edges:**
  - `tasks→ready` queue; `ready→loop` request; `loop→selector` queue;
  - `net→selector` result; `selector→ready` result; `loop→tasks` result;
  - `loop→pool` request; `pool→ready` result.
- **Main** (10 steps, research 1–10):
  1. `schedule` ("A, B")
  2. `run-a` ("run A")
  3. `a-awaits` ("await recv()")
  4. `run-b` ("run B")
  5. `b-awaits` ("await recv()")
  6. `idle` (work `selector`, queue)
  7. `bytes-arrive` ("A's bytes")
  8. `wake-a` ("wake A")
  9. `resume-a` ("resume A")
  10. `a-done` ("A done")
  - Packet labels: aim for ≤ 18 characters. Shorten the research labels as shown.
- **Alts:**
  - `blocking`, label "Blocking call in `async def`", `branchAfter: 'run-a'`:
    - `sleep-blocks`: work `loop`, error; state "Blocked 3 s";
    - `everyone-waits`: work `['ready', 'net']`, error; states "B, C stuck" and "Timeouts";
    - `fix-await`: work `loop`, result; state "Fix: await sleep".
    - **Use this alt in `TOPIC_CASES`** (`altBtn: 1`).
  - `offload`, label "Offload to a thread", `branchAfter: 'run-a'`:
    - `to-thread`: `loop→pool` "to_thread(f)";
    - `serve-b`: `ready→loop` "run B";
    - `pool-done`: `pool→ready` "done";
    - `gil-caveat`: work `loop`, queue; state "I/O yes, CPU no".
  - `fastapi`, label "FastAPI def vs async def", `branchAfter: 'schedule'`:
    - `async-route`: `ready→loop` "async def route"; state `loop` "Awaited on loop";
    - `def-route`: `loop→pool` "def route"; state `pool` "AnyIO thread, 40 max".

---

### Task 7: Race conditions and locks topic

**Slug and export:** `race-conditions-locks` / `raceConditionsLocks`. **Research:** §6.

- **Stations:**
  - `t1`: thread, "Thread 1", "Idle";
  - `t2`: thread, "Thread 2", "Idle";
  - `counter`: memory, "Shared counter", "value = 0";
  - `lockA`: lock, "Lock A", "Free";
  - `lockB`: lock, "Lock B", "Free".
- **No group.** One group around everything carries no information.
- **Layout sketch (wide):**
  - `t1` at the top centre and `t2` at the bottom centre;
  - `lockA` and `lockB` side by side in the middle row, between them (a diamond of four diagonal corridors);
  - `counter` at the far right middle;
  - the deadlock step's crossing moves (`t1→lockB` and `t2→lockA`) must land apart, which the integrity test enforces.
  - Narrow: the same diamond, rotated if needed.
- **Edges:**
  - `counter→t1` result; `counter→t2` result; `t1→counter` request; `t2→counter` request;
  - `t1→lockA` queue; `t2→lockA` queue; `lockA→t2` result;
  - `t1→lockB` queue; `t2→lockB` queue.
- **Main** (10 steps, research 1–10):
  1. `t1-reads` ("read 0")
  2. `t2-reads` ("read 0")
  3. `t1-adds` (work `t1`, result)
  4. `t1-writes` ("write 1")
  5. `t2-writes` ("write 1"; state `counter` "value = 1, not 2!")
  6. `take-lock` (`t1→lockA` "acquire"; state `counter` "value = 0 (rerun)", `lockA` "Held by T1"; caption makes clear we rerun with a lock)
  7. `t2-blocked` (`t2→lockA` "acquire")
  8. `t1-critical` (`t1→counter` "0+1, write 1")
  9. `handover` (`lockA→t2` "your turn")
  10. `t2-critical` (`t2→counter` "1+1, write 2"; state "value = 2")
- **Alts:**
  - `deadlock`, label "Deadlock", `branchAfter: 't2-writes'`:
    - `take-both`: parallel `t1→lockA` "take A" + `t2→lockB` "take B";
    - `cross-wait`: parallel `t1→lockB` "wait for B" + `t2→lockA` "wait for A";
    - `stuck`: work `['lockA', 'lockB']`, error; state "Stuck";
    - `fix-order`: work `['lockA', 'lockB']`, result; state "Always A, then B".
  - `self-deadlock`, label "Same lock twice (RLock)", `branchAfter: 'take-lock'`:
    - `reenter`: `t1→lockA` "acquire again";
    - `reacquire`: work `t1`, error; state "Blocked by itself";
    - `rlock`: work `lockA`, result; state "RLock: T1 ×2".
    - **Use this alt in `TOPIC_CASES`** (`altBtn: 2`).
  - Research Alt C (asyncio.Lock) is **not** a route, because its stations are threads. Keep it in the Q&A and cheats.

---

### Task 8: Hub check and final verification

**Files:**
- Modify: `scripts/learn-smoke.mjs` (new check `hub-concurrency-open`)

- [ ] **Step 1: Add the hub check**

`hub-concurrency-open`:
- open `/learn`;
- for each of the six concurrency slugs, assert that `.network-svg .st.open[data-id="<slug>"]` exists;
- click the `asyncio-event-loop` station and `waitForURL('**/learn/asyncio-event-loop')`;
- assert the `h1` contains "asyncio";
- assert no problems.

- [ ] **Step 2: Full verification**

Run: `npm test && npm run typecheck:learn && npm run build && npm run smoke:learn && npm run shots:learn`
Expected: all PASS. Spot-check one narrow screenshot per topic in Bangla by setting the language before shooting, or by eye in a browser at 390px.

- [ ] **Step 3: Commit**

```bash
git add scripts/learn-smoke.mjs
git commit -m "test(learn): hub opens the Concurrency line"
```
