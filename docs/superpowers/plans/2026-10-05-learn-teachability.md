# Stop by Stop Teachability Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** a complete beginner can follow every `/learn` topic in Simply mode.
- Diagram labels have plain Simply-mode variants.
- Each topic gets "Words to know", a hook, a takeaway and "What if…" banners.
- Diagrams are legible on desktop, and the hub has a beginner path.
- All 9 topics have their Simply layer rewritten.

**Architecture:**
- Optional data fields drive new rendering: Simply-mode labels, words card, hook lede, What-if banner, Remember box and legend overrides.
- An integrity "jargon lint" gates migrated topics, i.e. topics with `words`.
- Topics migrate one per task, worst first.
- The last task makes the fields required and enforces `view.wide` width ≤ 820.

**Tech Stack:** Next 16.2 Pages Router (static export), React 19, TypeScript (`tsconfig.learn.json` strict), vitest, playwright-core.

**Spec:** `docs/superpowers/specs/2026-10-05-learn-teachability-design.md`. Read §3 (data and rendering), §4 (the kitchen mapping) and §5 (the Simply writing rules).

**Review findings (per-topic problems and fixes):** `docs/superpowers/research/2026-10-05-teachability-review.md`, sections A, B and C.

## Global Constraints

- Simply-visible English must pass the jargon lint (spec §3). There must be no code in Simply.
- Technically mode keeps the real names, the existing `tech` captions and the existing Q&A and cheats. Fix those only where the review flags an error.
- Copy limits:
  - `simple` ≤ 30 words, `tech` ≤ 45 words;
  - `hook` and `takeaway` ≤ 25 words, one sentence;
  - `words` has 3–6 entries, each `d` ≤ 15 words;
  - a plain packet label is ≤ 18 characters in EN.
- Every L10n has EN and BN. Bangla Simply uses everyday words from spec §4.
- Concurrency topics use exactly the kitchen mapping in spec §4. Celery and FastAPI use the restaurant; Git uses the photo album.
- Layout:
  - `view.wide` width ≤ 820 for any topic touched by a rewrite task;
  - narrow is 400 wide and ≤ 580 tall;
  - labels are checked in **both** modes, because Simply and Technically labels differ in length.
- Never stage `next-env.d.ts`. Commits use conventional messages, author `eyakubsorkar@gmail.com`, and no AI trailers. Do not push.
- Verification:
  - `npm test` and `npm run typecheck:learn` (use the Node on PATH, ≥ 22.12);
  - `npm run build`;
  - `SMOKE_TOPICS=<slug> npm run smoke:learn`;
  - step-shots by mode and language (Task 1 adds this).
  - The machine is loaded. A `page.goto` 30s timeout is load, so re-run that one check.

## Review Focus

1. **Mode toggle mid-route:** diagram names, subs, packet text and state labels all switch, and the stop index is kept. Pinned by the Task 1 `teach-scaffold` smoke check.
2. **The taller Now panel on phones** (What-if banner, Remember box) must still fit above the sticky controls. Pinned by `mobile-fits`, which runs on every migrated topic.
3. **Simply-mode state persistence:** a `plainState` and a `state` set at different stops resolve to the latest one. Pinned by the Task 1 `flow.test.ts` cases.
4. **Bangla Simply labels are longer than English**, so packets and labels may collide in BN only. Pinned by narrow BN step-shots in every topic task.
5. **A topic with no plain variants** (not yet migrated) renders exactly as before in both modes. Pinned by the existing smoke checks staying green after Task 1.

---

### Task 1: Player support for the Simply layer and the teaching scaffold

**Files:**
- Modify: `data/learn/types.ts`, `data/learn/ui.ts`
- Modify: `components/learn/player/flow.ts`, `flow.test.ts`, `FlowDiagram.tsx`, `NowPanel.tsx`, `FlowPlayer.tsx`, `KindLegend.tsx`
- Modify: `components/learn/topic/TopicPage.tsx`
- Create: `components/learn/sections/WordsFirst.tsx`
- Modify: `styles/learn.css`, `data/learn/integrity.test.ts`, `scripts/learn-smoke.mjs`

**Interfaces produced:**
- the type fields in spec §3;
- `nodeLabels(topic, id, mode)`, `nodeSubAt(topic, steps, index, id, mode = 'technical')` and `packetText(move, mode, lang)` in `flow.ts`;
- the UI keys `wordsTitle`, `remember`;
- CSS classes `.words`, `.whatif`, `.remember`;
- the smoke env vars `LEARN_SHOTS_MODES`, `LEARN_SHOTS_LANGS` and the `TOPIC_CASES[].taught` flag.

- [ ] **Step 1: Failing tests (`flow.test.ts`)**

```ts
describe('simply layer', () => {
  const tp = {
    nodes: {
      a: { name: L('Redis queue'), sub: L('The broker'), plain: { name: L('Order rail'), sub: L('Jobs wait here') } },
      b: { name: L('Worker'), sub: L('idle') },
    },
    edges: { ab: { from: 'a', to: 'b', kind: 'queue' } },
    main: {
      label: L('main'),
      steps: [
        st('s1', { moves: [{ edge: 'ab', label: 'POST /x', plain: L('your order') }], state: { b: L('busy(1)') }, plainState: { b: L('Cooking') } }),
        st('s2', { work: { node: 'b', kind: 'result' }, state: { b: L('done=1') } }),
      ],
    },
    alts: [],
  } as unknown as Topic
  const steps = tp.main.steps
  it('node labels switch by mode', () => {
    expect(nodeLabels(tp, 'a', 'simple').name.en).toBe('Order rail')
    expect(nodeLabels(tp, 'a', 'technical').name.en).toBe('Redis queue')
    expect(nodeLabels(tp, 'b', 'simple').name.en).toBe('Worker')
  })
  it('simple state prefers plainState within a step and the latest step overall', () => {
    expect(nodeSubAt(tp, steps, 0, 'b', 'simple').en).toBe('Cooking')
    expect(nodeSubAt(tp, steps, 0, 'b', 'technical').en).toBe('busy(1)')
    expect(nodeSubAt(tp, steps, 1, 'b', 'simple').en).toBe('done=1')
  })
  it('packet text switches by mode and language', () => {
    const m = steps[0].moves![0]
    expect(packetText(m, 'simple', 'en')).toBe('your order')
    expect(packetText(m, 'technical', 'en')).toBe('POST /x')
  })
})
```

(`L` gives the same string for `en` and `bn`, so the `bn` lookup also returns `'your order'`.)

Run `npx vitest run components/learn/player`. Expected: FAIL (not exported).

- [ ] **Step 2: Types and helpers**

Add the fields from spec §3 to `data/learn/types.ts`. In `flow.ts`:

```ts
export function nodeLabels(topic: Topic, id: string, mode: Mode): { name: L10n; sub: L10n } {
  const n = topic.nodes[id]
  return mode === 'simple' && n.plain ? n.plain : { name: n.name, sub: n.sub }
}

export function nodeSubAt(topic: Topic, steps: Step[], index: number, nodeId: string, mode: Mode = 'technical'): L10n {
  let sub = nodeLabels(topic, nodeId, mode).sub
  for (let i = 0; i <= index; i++) {
    const o = (mode === 'simple' ? steps[i].plainState?.[nodeId] : undefined) ?? steps[i].state?.[nodeId]
    if (o) sub = o
  }
  return sub
}

export const packetText = (m: Move, mode: Mode, lang: Lang): string => (mode === 'simple' && m.plain ? m.plain[lang] : m.label)
```

Run the tests. Expected: PASS.

- [ ] **Step 3: Rendering**

1. **`FlowDiagram.tsx`.** Take `mode` and `lang` from `useLearnPrefs()`.
   - Node name comes from `t(nodeLabels(topic, id, mode).name)`.
   - Sub comes from `t(nodeSubAt(topic, steps, index, id, mode))`.
   - Packet text comes from `packetText(cur[i], mode, lang)`.
   - Add `mode` and `lang` to the layout effect's deps, so the pill is re-measured.
2. **`TopicPage.tsx`.**
   - The lede shows `t(mode === 'simple' && topic.hook ? topic.hook : topic.summary)`.
   - Render `<WordsFirst topic={topic} />` between `</header>` and `<FlowPlayer>`.
3. **`WordsFirst.tsx`.** Return `null` when there are no `words`. Otherwise render `<details className="words read" open><summary>{ui('wordsTitle')}</summary><dl>` with one `<div><dt>term</dt><dd>d</dd></div>` per word.
4. **`NowPanel.tsx`.** Accept optional `whatIf?: L10n` and `takeaway?: L10n`.
   - When `whatIf` is set, render `<p className="whatif">` with it, above `<h2 id="step-title">`. Make it one compact line.
   - When `takeaway` is set, render `<div className="remember"><span>{ui('remember')}</span><p>…</p></div>` **in place of** the `.next` line, so the panel does not grow on the last stop.
5. **`FlowPlayer.tsx`.** Compute and pass `whatIf` when the current route is an alt and the index equals `firstAltIndex(topic, route)`. Pass `takeaway` when the route is `main` and the index is the last. Use the existing state names from `useStepPlayer`.
6. **`KindLegend.tsx`.** Each label is `topic.legend?.[k]`, falling back to the current UI string. Pass `topic` in if it is not already available.
7. **`ui.ts`.**
   - `wordsTitle`: `{ en: 'Words to know', bn: 'যে শব্দগুলো জানা দরকার' }`;
   - `remember`: `{ en: 'Remember', bn: 'মনে রাখুন' }`.
8. **`styles/learn.css`.**
   - `.words` is a card in the existing token style (same surface, radius and border as the analogy cards), with a compact two-column `dl` on ≥ 640px and one column below.
   - `.whatif` is a small, semibold line in the alt route's error tone, with a leading "?" glyph made in CSS.
   - `.remember` is a tinted box using `--k-result`.
   - Everything stays scoped under `.learn-root`.

Run `npm run typecheck:learn`. Expected: PASS.

- [ ] **Step 4: Integrity**

In `data/learn/integrity.test.ts`:

(a) In the parallel-overlap test, compute the pill width from the longest of `m.label`, `m.plain?.en` and `m.plain?.bn`.

(b) Add:

```ts
  it('teaching fields are well-formed when present', () => {
    if (t.words) {
      expect(t.words.length).toBeGreaterThanOrEqual(3)
      expect(t.words.length).toBeLessThanOrEqual(6)
      t.words.forEach((w) => expect(words(w.d.en), w.term.en).toBeLessThanOrEqual(15))
    }
    if (t.hook) expect(words(t.hook.en)).toBeLessThanOrEqual(25)
    if (t.takeaway) expect(words(t.takeaway.en)).toBeLessThanOrEqual(25)
    t.alts.forEach((a) => { if (a.whatIf) expect(a.whatIf.en.startsWith('What if'), a.id).toBe(true) })
    for (const s of [...t.main.steps, ...t.alts.flatMap((a) => a.steps)]) s.moves?.forEach((m) => { if (m.plain) expect(m.plain.en.length, s.id).toBeLessThanOrEqual(18) })
  })
  it('Simply mode has no code or undefined acronyms (migrated topics)', () => {
    if (!t.words) return
    const defined = new Set(t.words.flatMap((w) => w.term.en.match(/\b[A-Z]{2,}\b/g) ?? []))
    const allow = new Set(['OK'])
    const code = /`|\(\)|__|->|=|\b[a-z]+\.[a-z]+\b|\b\w\/\w\b/i
    const seen: [string, string][] = []
    Object.entries(t.nodes).forEach(([id, n]) => { const p = n.plain ?? n; seen.push([`node ${id} name`, p.name.en], [`node ${id} sub`, p.sub.en]) })
    for (const s of [...t.main.steps, ...t.alts.flatMap((a) => a.steps)]) {
      seen.push([`${s.id} simple`, s.simple.en], [`${s.id} title`, s.title.en])
      s.moves?.forEach((m) => seen.push([`${s.id} packet`, m.plain?.en ?? m.label]))
      const keys = new Set([...Object.keys(s.state ?? {}), ...Object.keys(s.plainState ?? {})])
      keys.forEach((k) => seen.push([`${s.id} state ${k}`, (s.plainState?.[k] ?? s.state![k]).en]))
    }
    t.alts.forEach((a) => seen.push([`alt ${a.id} label`, a.label.en], [`alt ${a.id} whatIf`, a.whatIf?.en ?? '']))
    seen.push(['hook', t.hook?.en ?? ''], ['takeaway', t.takeaway?.en ?? ''])
    t.words.forEach((w) => seen.push([`word ${w.term.en}`, w.d.en]))
    t.analogy.twins.forEach((tw) => seen.push([`twin ${tw.name.en}`, tw.d.en]))
    for (const [where, s] of seen) {
      expect(code.test(s), `${where}: "${s}"`).toBe(false)
      for (const a of s.match(/\b[A-Z]{2,}\b/g) ?? []) expect(defined.has(a) || allow.has(a), `${where}: acronym ${a}`).toBe(true)
    }
  })
```

Run `npm test`. Expected: PASS. No topic has `words` yet, so the lint is skipped for all of them.

- [ ] **Step 5: Smoke**

In `scripts/learn-smoke.mjs`:

1. **`step-shots` by mode and language.**
   - `LEARN_SHOTS_MODES` (comma list of `simple`, `technical`; default `simple`) and `LEARN_SHOTS_LANGS` (`en`, `bn`; default `en`).
   - For each combination, set the language by clicking `বাংলা` when needed (wait for `html[lang="bn"]`), then click the Explain-it button for the mode before walking the routes.
   - The output path becomes `.smoke/shots/<slug>/<mode>-<lang>/<viewport>-<r>-<NN>.png`.
2. **New check `teach-scaffold`.** For each `TOPIC_CASES` entry with `taught: true`:
   - `.words` is visible;
   - the `.lede` text differs between Simply and Technically, toggled with the Explain-it buttons;
   - the `.node .nm` texts differ between modes for at least one node;
   - selecting the case's `altBtn` alt (default 1) shows a `.whatif` element whose text starts with "What if" (EN);
   - on the main route, clicking `#next` to the end shows a visible `.remember`;
   - `noProblems`.

   No entry is `taught` yet, so it tests nothing until Task 3.

Run `npm run build && npm run smoke:learn`. Expected: all PASS, with every existing check unchanged. Then run:

```
SMOKE_ONLY=step-shots LEARN_SHOTS=celery-redis LEARN_SHOTS_MODES=simple,technical LEARN_SHOTS_LANGS=en,bn node scripts/learn-smoke.mjs
```

It should produce 4 folders.

- [ ] **Step 6: Commit**: `feat(learn): simply-mode labels, words card, what-if and takeaway scaffolding`.

---

### Task 2: Hub beginner path

**Files:** modify `data/learn/network.ts` (`Station` gets `blurb?: L10n; level?: 'beginner' | 'intermediate'`), `data/learn/ui.ts`, `components/learn/hub/Hub.tsx`, `components/learn/hub/LineStrips.tsx`, `styles/learn.css`, `scripts/learn-smoke.mjs`.

- [ ] **Step 1: Station data.** Add `blurb` (EN given below; write plain BN) and `level` to the 9 open stations:

| slug | level | blurb (EN) |
|---|---|---|
| concurrency-vs-parallelism | beginner | Juggling many jobs, or doing them at the same moment. |
| processes-vs-threads | beginner | Separate kitchens, or cooks sharing one kitchen. |
| git-basics | beginner | Save points for your files, and sharing them. |
| celery-redis | beginner | Hand slow jobs to a background cook so nobody waits. |
| race-conditions-locks | intermediate | Two cooks, one tally, and why you need one pen. |
| python-gil | intermediate | Why Python cooks take turns, and when they don't. |
| multiprocessing-pools | intermediate | Send heavy work to a row of side kitchens. |
| asyncio-event-loop | intermediate | One cook, many dishes, a timer that says what's ready. |
| fastapi-lifecycle | intermediate | Everything between a click and the reply. |

- [ ] **Step 2: Hub UI.**
  - The hero button text becomes `{ en: 'Start with the basics', bn: 'বেসিক দিয়ে শুরু করুন' }` and links to `/learn/concurrency-vs-parallelism`.
  - Add a "Start here" section right below the hero, titled `{ en: 'New here? Ride these in order', bn: 'নতুন? এই ক্রমে দেখুন' }`. It is an ordered list linking concurrency-vs-parallelism, processes-vs-threads, git-basics and celery-redis, each showing its name and blurb.
  - In `LineStrips`, each open station shows its blurb under the name and a level chip (`{ en: 'Beginner', bn: 'শুরুর' }` / `{ en: 'Intermediate', bn: 'মাঝারি' }`) where the "Open" chip is. Use existing tokens.
- [ ] **Step 3: Smoke.** Add `hub-start-here`:
  - the "Start here" list has 4 links, in that order;
  - the hero button's href ends with `/learn/concurrency-vs-parallelism`;
  - no horizontal overflow at 390px;
  - `hub-loads` and `hub-strips-mobile` still pass.
  - Screenshot the hub at 1280 and 390, then Read both to check the layout.
- [ ] **Step 4: Verify and commit**: `feat(learn): hub beginner path with blurbs and levels`.

---

## Shared procedure for Tasks 3–11 (one topic each)

**Inputs:**
- spec §3–§5;
- the topic's section in the review doc (its problems, glossary list and factual doubts);
- the topic file.

**Deliverables in `data/learn/topics/<slug>.ts`:**
1. **`words`:** 3–6 terms the topic relies on, with plain definitions. Start from the review's glossary list, and keep only what the Simply story needs.
2. **`hook` and `takeaway`.**
3. **`plain` on every node** whose real name or sub is not everyday English. Use the topic's metaphor from spec §4: the kitchen for concurrency, the restaurant for Celery and FastAPI, the photo album for Git. The plain sub says what the station does.
4. **`plain` on every packet label** that is code or jargon. Use ≤ 18 characters EN and plain BN.
5. **`plainState`** wherever a `state` value is code or jargon.
6. **`whatIf` on every alt**, plus plain alt `label`s for the route buttons.
7. **Rewritten `simple` captions and `title`s** in EN and BN, following spec §5:
   - stop 1 orients;
   - one idea per stop, naming what moves using the Simply names;
   - define new words;
   - no forward references;
   - the last main stop lands the takeaway.
8. **Highlight and tone fixes** the review lists: the lit station matches the caption, and `error` is used only for failures.
9. **`legend` overrides** when the default words ("Request", "Queued message", "Reply or result", "Failure or retry") do not fit the topic.
10. **Analogy section aligned** with the on-diagram Simply names. Keep twins consistent with spec §4, and keep exactly one failure twin.
11. **Re-layout when needed:**
    - if `view.wide` width > 820, re-lay out wide to ≤ 820;
    - fix any collision in either mode or language (narrow ≤ 580 tall).
12. **Factual and stale-state defects** the review lists for this topic that are not fixed yet. Check against git history; the accuracy pass on 2026-10-05 fixed several.
13. **`TOPIC_CASES`:** set `taught: true`. Keep `total`, `altStop`, `altBtn` and `step3Packets` correct.

**Steps:**
1. Author the changes.
2. Run `npm test && npm run typecheck:learn`. This includes the jargon lint, now active for this topic; fix the data, never the lint.
3. Run:

   ```
   npm run build
   SMOKE_ONLY=step-shots LEARN_SHOTS=<slug> LEARN_SHOTS_MODES=simple,technical LEARN_SHOTS_LANGS=en node scripts/learn-smoke.mjs
   ```

   Then shoot again with `LEARN_SHOTS_MODES=simple LEARN_SHOTS_LANGS=bn`.
4. Build contact sheets with `python3 <sheet.py> .smoke/shots/<slug>/<mode>-<lang> <wide|narrow> /tmp/x.png 5` for:
   - simple-en, wide and narrow;
   - technical-en, wide and narrow;
   - simple-bn, narrow.

   Read every sheet, fix every collision, and list the sheets in your report.
5. Run `SMOKE_TOPICS=<slug> npm run smoke:learn`. All checks must PASS, including `teach-scaffold` and `mobile-fits`.
6. Commit: `feat(learn): teach <title> in plain words`.

### Task 3: FastAPI lifecycle (review §A; scored 2.8). Metaphor: the restaurant front of house.
### Task 4: The Python GIL (review §B; 3.1). Kitchen: cooks, burners, the stove, the chef's hat, a rice cooker, the delivery door.
### Task 5: Processes vs threads (review §B; 3.2). Kitchen: kitchens, fridges, cooks, the pass window, slips.
### Task 6: Multiprocessing pools (review §C; 3.2). Kitchen: head chef, kitchen setup, slips, side kitchens, the pickup window.
### Task 7: asyncio event loop (review §C; 3.3). Kitchen: one cook, dishes, the ready rack, the timer board, the delivery door, helper cooks.
### Task 8: Concurrency vs parallelism (review §B; 3.9). Kitchen: dishes, burners, the oven, cooks. This topic is the hub's first stop, so its stop 1 must also introduce the kitchen for the whole line.
### Task 9: Race conditions and locks (review §C; 3.8). Kitchen: cooks, the whiteboard tally, the marker pen, the pan and the knife.
### Task 10: Celery + Redis (review §A; 3.8). Metaphor: the restaurant, kitchen side.
### Task 11: Git basics (review §A; 3.8). Metaphor: the photo album. Also resolve: `orphan-commit` caption says "stage a fix" but the index shows "Nothing staged" (left by accuracy fix e40f234e).

---

### Task 12: Make the scaffold required and verify everything

- [ ] **Step 1: Types.**
  - `Topic.words`, `hook` and `takeaway` become required.
  - `AltRoute.whatIf` becomes required.
  - The integrity jargon lint runs for every topic (drop the `if (!t.words) return`).
  - Add `expect(t.view.wide[0]).toBeLessThanOrEqual(820)`.
  - Every `TOPIC_CASES` entry is `taught: true`.
- [ ] **Step 2: Full verification.**
  - Run `npm test && npm run typecheck:learn && npm run build && npm run smoke:learn` (all PASS).
  - Run `LEARN_SHOTS=all LEARN_SHOTS_MODES=simple,technical LEARN_SHOTS_LANGS=en npm run shots:learn` and spot-check one sheet per topic.
- [ ] **Step 3: Commit**: `test(learn): require the teaching scaffold on every topic`.
