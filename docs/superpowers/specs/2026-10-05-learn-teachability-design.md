# Stop by Stop: teachability pass (Phase 2.5)

**Goal:** someone who has never programmed can understand every topic from the **Simply** mode alone. **Technically** mode stays interview-grade.

**Inputs:**
- review findings: `docs/superpowers/research/2026-10-05-teachability-review.md`, which scored 9 topics on Mayer's multimedia principles (average about 3.4/5);
- the base spec: `docs/superpowers/specs/2026-10-04-learn-stop-by-stop-design.md`.

## 1. Decisions (from the user, 2026-10-05)

| Question | Decision |
|---|---|
| Scope | Player changes, then rewrite the Simply layer of all 9 topics, worst first |
| Simply diagram labels | **Plain names in Simply.** Every station name and sub, packet label and status label has a plain variant shown in Simply. Technically shows the real names. |
| Hub | Add a **Start here** beginner path. Each open topic gets a plain one-line description and a level tag. |
| Metaphors | **One kitchen for the whole Concurrency line** (§4). Phase 1 keeps its metaphors: the restaurant for Celery and FastAPI, the photo album for Git. |

## 2. What the review found (problems this pass fixes)

1. **No words first.** Terms such as thread, process, core, server, request and commit are used and never defined.
2. **Code in Simply.** Station names, packet labels and status labels are the same in both modes, so Simply shows `pickle(x)`, `POST /reports`, `ServerErrorMiddleware`.
3. **The analogy is hidden** below the player, while captions use its words ("the cook") with no legend. Some topics mix metaphors.
4. **No hook and no takeaway.** Stop 1 does not say why to care, the last stop does not say what to remember, and alts do not open with "What if…".
5. **Chrome:**
   - some summaries are technical;
   - diagrams wider than about 820 units render text at about 7–9px on desktop;
   - route names are jargon;
   - the legend's web words do not fit the concurrency topics;
   - the hub has no beginner path.
6. **Highlight and tone mismatches.** A caption sometimes talks about one station while another is lit, and red (`error`) is used for normal behaviour.

## 3. Player and data changes

All new fields are optional while topics migrate; the final task makes them required.

```ts
interface FlowNode { /* … */ plain?: { name: L10n; sub: L10n } }   // Simply-mode name and sub
interface Move { edge: string; label: string; plain?: L10n }        // Simply-mode packet label
interface Step { /* … */ plainState?: Record<string, L10n> }        // Simply-mode state overrides
interface AltRoute { /* … */ whatIf?: L10n }                        // "What if …?" banner text
interface Topic {
  /* … */
  hook?: L10n                         // Simply lede: why this matters, ≤ 25 words, one sentence
  takeaway?: L10n                     // shown at the last stop of the main route, ≤ 25 words
  words?: { term: L10n; d: L10n }[]   // "Words to know": 3–6 entries, d ≤ 15 words
  legend?: Partial<Record<Kind, L10n>> // topic-specific legend wording for the 4 edge kinds
}
```

**Resolution rules in Simply mode:**
- Node name and sub come from `plain` if present, otherwise the real ones.
- A packet label comes from `plain[lang]` if present, otherwise `label`.
- A state label comes from the latest step at or before the current one that sets that node in `plainState` or `state`. Within one step, `plainState` wins.

Technically mode always shows the real values.

**Rendering:**
- **Topic header.** The lede shows `hook` in Simply and `summary` in Technically.
- **Words to know.** A new card between the header and the player, a `<details open>` list of term and definition, shown in both modes.
- **What if… banner.** At the first alt-only stop, the Now panel shows the alt's `whatIf` above the step title.
- **Remember box.** At the last stop of the main route, the Now panel shows a "Remember" box with `takeaway`.
- **Legend.** Each kind's label comes from `topic.legend[kind]`, falling back to the current UI string.
- **Diagram legibility.** `view.wide` width is at most **820**, so desktop text stays at least about 11px. Topics wider than that are re-laid out in their rewrite task.

**Tests:**
- **Integrity** validates the new fields when present:
  - `words` has 3–6 entries;
  - `hook` and `takeaway` each have at most 25 words;
  - `whatIf` starts with "What if";
  - a plain packet label is at most 18 characters in EN;
  - the parallel-overlap test uses the longest label across modes and languages.
- **Jargon lint** for migrated topics (topics with `words`). Simply-visible EN strings must not contain:
  - backticks, `()`, `__`, `->`, `=`;
  - a dotted identifier (`a.b`);
  - an all-caps acronym of 2 or more letters, unless it appears as a `words` term or is on a tiny allowlist (`OK`).

  Simply-visible strings are: plain or real node names and subs, plain or real packet labels, plain or real states, `simple` captions, `hook`, `takeaway`, `whatIf`, `words.d`, alt labels, and the analogy `d` text.
- **Smoke.** The `step-shots` mode can shoot by mode and language. A `teach-scaffold` check runs on each migrated topic and verifies:
  - the words card is shown;
  - the Simply lede equals the hook;
  - the What-if banner appears at the first alt stop;
  - the Remember box appears at the last main stop;
  - at least one station name differs between modes.

## 4. Kitchen for the Concurrency line (canonical mapping)

| Real thing | Kitchen twin (EN) | Bangla |
|---|---|---|
| Thread | a cook | রাঁধুনি |
| CPU core | a burner (where cooking actually happens) | চুলা |
| Task / job | a dish | পদ |
| Process | a kitchen | রান্নাঘর |
| Memory (of a process) | that kitchen's fridge | ফ্রিজ |
| Pipe / queue between processes, IPC | the pass window with order slips | পাস-জানালা, স্লিপ |
| Pickling | copying the order onto a slip | স্লিপে লিখে দেওয়া |
| Waiting on I/O | a dish in the oven, or waiting at the delivery door | ওভেনে রাখা, ডেলিভারির অপেক্ষা |
| GIL | the one chef's hat: only the cook wearing it may cook (Python kitchens) | শেফের টুপি |
| Interpreter | the stove | চুলা-ঘর / স্টোভ |
| C extension that releases the GIL | a rice cooker: cooks without the hat | রাইস কুকার |
| Parent process | the head chef | হেড শেফ |
| Pool of worker processes | a row of side kitchens, one cook each | পাশের রান্নাঘর |
| Start method (spawn / forkserver) | how a new kitchen is set up | রান্নাঘর সাজানো |
| Event loop (asyncio) | one cook juggling many dishes | এক রাঁধুনি, অনেক পদ |
| Ready queue | the "ready to cook" rack | তৈরি তাক |
| Selector (epoll / kqueue) | the timer board that dings when a dish is ready | টাইমার বোর্ড |
| Socket / network | the delivery door | ডেলিভারির দরজা |
| Thread pool / executor | helper cooks in the back | সহকারী রাঁধুনি |
| Shared counter | the tally on the whiteboard | হোয়াইটবোর্ডের হিসাব |
| Lock | the one marker pen | মার্কার কলম |
| Deadlock | cook 1 holds the pan and wants the knife; cook 2 holds the knife and wants the pan | — |

**Rule:** each topic introduces only the kitchen pieces it needs, and states its cast at stop 1 or in "Words to know". It never uses a twin from another topic without introducing it.

## 5. Simply writing rules (every topic)

1. **Stop 1 orients.** Say what we are looking at and why it matters (the hook), using the Simply names on screen.
2. **One idea per stop.** Each caption names what moves or lights up, using the Simply names: "The slip goes through the pass window to Kitchen B."
3. **Define every new word** at or before first use, either in "Words to know" or inline. Never rely on a term from a later topic.
4. **No code in Simply:** no function names, status codes, version numbers or acronyms (unless they are a defined word). Those belong in Technically.
5. **The highlight matches the caption.** The lit station is the one the caption talks about. Use `error` only for real failures.
6. **The last main stop lands the takeaway.** Each alt opens with its "What if…" question, and the route button label is plain words.
7. **Bangla Simply** is as plain as the English. Technical terms stay in English only where Technically needs them; Simply uses everyday Bangla words from the mapping.
8. **Technically mode content** stays as it is, except where the review flagged an error.

## 6. Hub

- The hero button becomes **"Start with the basics"**, linking to `/learn/concurrency-vs-parallelism`.
- **A new "Start here" strip** below the hero shows the beginner path in order: Concurrency vs parallelism → Processes vs threads → Git basics → Celery + Redis. Each entry has its blurb.
- **Each open station** in the line strips shows a one-line plain `blurb` and a level chip (Beginner / Intermediate). These are new optional `Station` fields, `blurb?: L10n` and `level?`. Stations that are not open keep their phase chip.

## 7. Out of scope

- Phases 3–4 topics.
- Restyling the visual design.
- A Bangla native review. That is still pending with the site owner, and this pass makes new Bangla that also needs it.
