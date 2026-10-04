# Stop by Stop (`/learn`) — Design Spec

- **Date:** 2026-10-04
- **Status:** Draft, awaiting review
- **Approved mockup:** https://claude.ai/artifact/QX3cAEKYDSnqgF1CLMD743 (source: `docs/superpowers/specs/assets/2026-10-04-learn-mockup.html`)
- **Research notes:** `docs/superpowers/research/2026-10-04-learn-topic-research.md` (nodes, steps, Q&A, cheat-sheets, sources for 14 topics)

---

## 1. Intent

**What Eyakub asked for**

- A new section on the portfolio for interview preparation that a complete beginner can follow by watching the visuals.
- Every topic shows an animated wireframe of the system: which part talks to which, in what order, and what travels between them.
- Each topic page has four blocks: animated flow diagram, plain-English explainer (analogy), interview Q&A, cheat-sheet.
- Topics: backend core (FastAPI lifecycle, HTTP journey, REST, auth), async and data (Celery, Redis, databases), DevOps (Docker, Compose, CI/CD, Nginx, Kubernetes), Git and GitHub, and concurrency (threads, processes, GIL, multiprocessing, asyncio, race conditions).
- English and Bangla, switchable.
- Modern, friendly, easy design.

**Audience**

1. Eyakub, revising for interviews (wants the precise technical layer).
2. His wife, an absolute beginner (needs the visual + plain-language layer, likely on a phone, Bangla helps).
3. The public (shareable URLs, doubles as a portfolio piece).

**Assumptions (confirmed by approving the mockup)**

- Fully static: GitHub Pages, `output: 'export'`, no backend, no accounts.
- Progress ("learned"), language and explain-mode live in `localStorage` only.
- Own visual identity, independent of the Chakra-styled portfolio, the same way `/eyasir` is.
- Mobile-first.

**Success criteria**

- A beginner watches the Celery + Redis line once, in Bangla, in "Simply" mode, and can explain back: the app does not do the slow job itself, it leaves a ticket, a worker picks it up, the result is stored, the page checks back.
- Eyakub can switch to "Technically" and get interview-grade notes on every stop, plus a Q&A list that names the common wrong answers.
- Adding a new topic in a later phase means adding one data file. No component changes.

## 2. Scope and phasing

| Phase | Ships | Topics |
|---|---|---|
| **1** | Engine, hub, topic template, EN/BN, progress | FastAPI request lifecycle, Celery + Redis, Git basics |
| **2** | Engine additions: groups, parallel moves (see §7.9) | **Concurrency line:** concurrency vs parallelism, processes vs threads, the Python GIL, multiprocessing pools, asyncio event loop, race conditions and locks |
| **3** | Data only | HTTP request journey, Docker, Docker Compose, Nginx reverse proxy, CI/CD pipeline |
| **4** | Data only | Redis deep-dive, databases (indexes, transactions, N+1), auth (JWT, OAuth 2.0 + PKCE), REST basics, GitHub pull requests, Kubernetes basics |

Concurrency is Phase 2 because it is high-value for backend interviews and it explains two Phase 1 stops: FastAPI's `def` vs `async def` threadpool behaviour and Celery's prefork pool.

**This spec covers Phase 1 in full.** Phases 2–4 are outlined (§11, §12) so the engine and data model are built to fit them; each later phase gets its own short plan.

**Non-goals for all phases:** accounts or server-side progress, search, quizzes or spaced repetition, comments, a manual theme toggle (the page follows the system theme), language in the URL, MDX content, analytics beyond the site's existing GA.

## 3. Routes and information architecture

| Route | Page | Notes |
|---|---|---|
| `/learn` | Hub: network map + line strips | `pages/learn/index.tsx` |
| `/learn/[slug]` | Topic page | `pages/learn/[slug].tsx`, `getStaticPaths` from the topic registry, `fallback: false` |

Phase 1 slugs: `fastapi-lifecycle`, `celery-redis`, `git-basics`.

Later slugs (reserved, used as station ids on the map): `concurrency-vs-parallelism`, `processes-vs-threads`, `python-gil`, `multiprocessing-pools`, `asyncio-event-loop`, `race-conditions-locks`, `http-journey`, `docker`, `docker-compose`, `nginx`, `ci-cd`, `redis-deep-dive`, `databases`, `auth-jwt-oauth`, `rest-basics`, `github-pull-requests`, `kubernetes`.

**Prerequisite fix: `assetPrefix: './'` in `next.config.js` must go.** With a relative asset prefix, `/learn/celery-redis` resolves `./_next/...` to `/learn/_next/...` and every script 404s. Today only single-segment routes exist (`/projects`), which is why it has not bitten yet. The site is the root user site `eyakub.github.io`, so no prefix is needed. Verify by serving `out/` locally and loading a nested route.

**Entry points:** add a "Learn" item to `components/Navbar.js` (desktop and mobile menus). `next-sitemap` picks up the new pages automatically.

## 4. Visual design system

**Concept:** a transit map. Each topic is a line, each part of the system is a station, and data rides between stations as a labelled tag (the "packet"). The hub is the network map of all topics; lines meet at interchange stations where topics genuinely connect.

**Tokens** (CSS custom properties scoped under `.learn-root`; values exactly as in the mockup):

| Role | Light | Dark |
|---|---|---|
| `--paper` page | `#F2F4F8` | `#0C121E` |
| `--surface` cards | `#FFFFFF` | `#131B2B` |
| `--ink` / `--ink-2` / `--ink-3` text | `#131B2C` / `#435069` / `#66718A` | `#E8EDF6` / `#B1BBD0` / `#8792AA` |
| `--rule`, `--track` | `#D6DCE6`, `#D9DEE7` | `#26314A`, `#29344D` |
| `--k-request` (solid line) | `#1A5FC4` | `#6AA5F7` |
| `--k-queue` (dashed) | `#CC6E00` | `#F3A54A` |
| `--k-result` (dotted) | `#0B7A4B` | `#43C88E` |
| `--k-error` (short dash) | `#C4302F` | `#F27474` |
| `--l-backend`, `--l-async`, `--l-devops`, `--l-git` | as `--k-*` blue, orange, green, plus violet `#7347B5` | brightened, violet `#AE8CF2` |
| `--l-concurrency` (new) | teal `#0E7C86` | `#4CC9D3` |

Each `--k-*` has a matching `--k-*-on` for text on a filled packet (contrast ≥ 4.5:1). Edge kinds are never told apart by colour alone: request is solid, queued message is long-dash, result is dotted, error is short-dash, and every packet carries a text label.

**Type:** Anek Latin + Anek Bangla (same Ek Type family, so both scripts share proportions) via `next/font/google` with the `wdth` axis. Headings use width 75–87.5% and weight 650–700, like transit signage. Body uses width 100% and weight 400 at 17px, with line-height 1.55 for English and 1.72 for Bangla. JetBrains Mono is used only inside code. Scale: 13 / 15 / 17 / 21 / 27 / 34 px, plus a fluid display size for h1.

**Motion:** the packet's travel is the only ambient motion. It slides from the origin to the midpoint of the edge and rests there with its label, a small comet continues to the destination, and the destination station flashes once. A "working" station pulses its halo. Controls get a 120ms press scale. `prefers-reduced-motion` turns all of this into instant state changes, with the packet placed at the midpoint.

**Accessibility floor:** 44px minimum touch targets; visible focus rings; `aria-live="polite"` on the caption panel; the SVG is labelled by the current stop title; the stop list is real buttons; ← / → step through stops while focus is inside the player; no information carried by colour alone.

**Shell:** `/learn` pages render inside their own `LearnLayout`: top bar with the brand mark and the EN / বাংলা switch, page body, and a footer that links back to the portfolio. The Chakra provider stays in `_app` untouched; the learn root sets its own background and `min-height: 100dvh` so the global black body never shows through.

## 5. Architecture

```
pages/learn/
  index.tsx                 hub page
  [slug].tsx                topic page (getStaticPaths/getStaticProps from registry)
components/learn/
  shell/LearnLayout.tsx     top bar, language switch, footer, font + token scope
  shell/SegmentedControl.tsx
  hub/NetworkMap.tsx        SVG map (desktop ≥ 640px)
  hub/LineStrips.tsx        per-line vertical strips (all widths)
  player/FlowPlayer.tsx     composes the parts below, owns layout choice
  player/FlowDiagram.tsx    pure SVG render of nodes/tracks/edges/packets for a step
  player/NowPanel.tsx       stop number, pips, title, caption, tech note, next stop
  player/PlayerControls.tsx prev / play-pause-again / next
  player/StopList.tsx       collapsible list of stops
  player/KindLegend.tsx
  player/useStepPlayer.ts   state machine: route, step, playing, timers
  player/geometry.ts        pure: offsetPolyline, trimStart/End, edge resolution, BIDIR set
  sections/AnalogyTwins.tsx
  sections/InterviewQA.tsx
  sections/CheatSheet.tsx
  sections/Sources.tsx
contexts/LearnPrefsContext.tsx   lang, mode, learned set; localStorage persistence
data/learn/
  types.ts                  all types below
  ui.ts                     UI strings (L10n)
  network.ts                lines, stations, map coordinates, phases
  topics/fastapi-lifecycle.ts
  topics/celery-redis.ts
  topics/git-basics.ts
  index.ts                  topic registry keyed by slug
lib/learn/
  l10n.ts                   tr(), fmt(), Bangla digits
styles/learn.css            tokens + the few rules Tailwind cannot express (SVG edge kinds, keyframes)
```

**Boundaries**

- `geometry.ts` and `l10n.ts` are pure and unit-tested.
- `FlowDiagram` receives `{ topic, layout, step, route }` and renders; it owns no timers. The packet animation runs in a small effect inside `FlowDiagram` keyed on the step, driven by `requestAnimationFrame`. React re-renders only on step change, never per frame (the rAF loop writes `transform` attributes directly through refs).
- `useStepPlayer` owns all timing (autoplay dwell, pause on manual input, reset on route change). Nothing else sets timeouts.
- Station status on the hub is derived: a station is open if its slug exists in the topic registry; otherwise it shows its phase from `network.ts`. Shipping a topic is adding its file to the registry.
- Bundles stay per-page. `[slug].tsx` calls the registry only inside `getStaticPaths`/`getStaticProps` and receives one `Topic` as props, so a topic page ships only its own text. The hub's `getStaticProps` passes `openSlugs: string[]`, and the hub imports `network.ts` only. No client component imports `data/learn/index.ts`.

**Styling approach:** Tailwind (already installed, `preflight: false`) for layout and spacing in learn components; extend `tailwind.config.js` `content` with `./pages/learn/**/*.tsx` and `./components/learn/**/*.{ts,tsx}`. Tokens stay CSS variables in `styles/learn.css`, imported from `_app` (global CSS rule of the Pages Router) and fully scoped under `.learn-root`.

**TypeScript:** the repo `tsconfig.json` has `strict: false` and an explicit `include` list. Add the learn globs to `include`, and add `tsconfig.learn.json` (extends the base, `strict: true`, includes only learn files) checked by `npm run typecheck:learn`. Existing files are not touched.

**Tests:** add `vitest` as a dev dependency with `npm test`. No test runner exists today.

## 6. Data model

```ts
export type Lang = 'en' | 'bn';
export type L10n = { en: string; bn: string };          // inline `code` allowed via backticks
export type Kind = 'request' | 'queue' | 'result' | 'error';
export type Side = 'up' | 'down' | 'left' | 'right';
export type Pt = [number, number];
export type LayoutKey = 'wide' | 'narrow';

export interface FlowNode {
  icon: IconName;                                       // from a fixed lucide-style set
  name: L10n;
  sub: L10n;
  wide: [number, number, Side];                         // x, y, label side
  narrow: [number, number, Side];
}

export interface Corridor { wide: Pt[]; narrow: Pt[] }   // octilinear polyline, authored

export interface Edge { from: string; to: string; kind: Kind }

export interface Move { edge: string; label: string }    // packet label is not translated (it is the data itself)

export interface Step {
  id: string;
  moves?: Move[];                                       // Phase 1: exactly one; Phase 2: one or more (parallel)
  work?: { node: string; kind: Kind };                  // a station working, no travel
  state?: Record<string, L10n>;                         // override a node's sub-label from this stop on (e.g. HEAD → c3a1f, counter = 1)
  title: L10n;
  simple: L10n;                                         // ≤ 30 words, no unexplained jargon
  tech: L10n;                                           // ≤ 45 words, precise, may use `code`
}

export interface AltRoute {
  id: string;
  label: L10n;
  branchAfter: string;                                  // main-route step id; alt = main[0..branchAfter] + steps
  steps: Step[];
}

export interface Group {                                // Phase 2; type exists from Phase 1
  id: string; label: L10n;
  wide: [number, number, number, number];               // x, y, w, h
  narrow: [number, number, number, number];
}

export interface Twin { node: string | null; icon: IconName; name: L10n; is?: L10n; d: L10n }
export interface QA { q: L10n; short: L10n; deep: L10n; redFlag: L10n }
export interface Cheat { code: string; d: L10n }

export interface Topic {
  slug: string;
  line: LineId;
  title: L10n;
  summary: L10n;
  view: Record<LayoutKey, [number, number]>;            // viewBox sizes
  nodes: Record<string, FlowNode>;
  groups?: Group[];
  corridors: Record<`${string}-${string}`, Corridor>;
  edges: Record<string, Edge>;
  main: { label: L10n; steps: Step[] };
  alts: AltRoute[];
  analogy: { intro: L10n; twins: Twin[] };
  qa: QA[];                                             // 5–8
  cheats: Cheat[];                                      // 5–8
  sources: { label: string; url: string }[];
}
```

**Integrity rules (enforced by a vitest data test over every registered topic):**

- every edge's `from`/`to` exists in `nodes`, and a corridor exists for the pair in either direction;
- every `move.edge` and `work.node` exists; every step has exactly one of `moves` or `work`;
- `branchAfter` names a main step; step ids are unique per route;
- every `L10n` has non-empty `en` and `bn`;
- every node position and corridor point lies inside its layout's viewBox;
- `simple` ≤ 30 words (English), `tech` ≤ 45 words (English);
- every station id in `network.ts` is unique, and every registered topic slug has a station.

## 7. Flow player behaviour

The mockup is the reference implementation for everything in this section.

**7.1 Layout choice.** `FlowPlayer` measures the stage with a `ResizeObserver`: width ≥ 600px renders the `wide` layout, otherwise `narrow`. Each topic authors both. Narrow layouts are vertical and keep station labels to one side; no labels may overlap (checked in the screenshot pass, §13).

**7.2 Render layers** (bottom to top): group boxes → grey tracks (every corridor, 16px, so a beginner sees the whole route up front) → coloured edges → comet → stations (halo, disc, icon, name, sub) → packet tags.

**7.3 Geometry.**

- A corridor used in both directions is "bidirectional", and each direction is offset 7.5px to its own right-hand side (like two-way rails).
- Edges are trimmed 28px at the start and 33px at the end along the polyline, so arrowheads sit outside the station discs.
- All of this lives in `geometry.ts`.

**7.4 Edge states.** Hidden until reached; visited edges at 42% opacity with an arrowhead; the active edge at full opacity, 6px wide, with an arrowhead.

**7.5 Stations.**

- **Focused:** the endpoints of the active move, or the `work` node. The ring and icon take the step's kind colour and the halo shows.
- **Working:** a `work` step pulses the halo.
- **`state` overrides:** they change the sub-label from that stop onward.

**7.6 Routes.**

- Every topic has a main route ("Everything works") and zero or more alt routes (e.g. "A job fails").
- An alt route is the main route's steps up to and including `branchAfter`, followed by its own steps.
- Switching route pauses playback and jumps to the first alt-only step. Switching back goes to stop 1.
- Two or three routes render as a segmented control. More than three render as a wrapping row of chips.

**7.7 Playback.**

- Play advances every 4.3s in "Simply" mode and every 6.5s in "Technically" mode.
- Prev, next, a stop click or an arrow key pauses playback.
- At the last stop the button becomes "Ride again", which restarts from stop 1.

**7.8 Responsive player.**

- **Desktop (≥ 980px):** two columns. The diagram is sticky on the left. The now-panel, controls and the open stop list sit on the right.
- **Below 980px:** one column in the order now-panel → diagram → controls → collapsed stop list. The controls stick to the bottom of the viewport while the player is on screen, so caption, diagram and buttons fit on one phone screen.

**7.9 Phase 2 engine additions** (types exist in Phase 1, rendering ships in Phase 2):

- **Groups:** a labelled, rounded container drawn behind stations, for "Process A" holding two threads and shared memory, or "Event loop" holding tasks.
- **Parallel moves:** a step with several `moves` animates all packets at once. This shows true parallelism (multiprocessing) against interleaving (threads taking turns holding the GIL).

## 8. Hub behaviour

- **Hero:** display headline, one-paragraph lede, one primary button ("Ride the Celery + Redis line") pointing at the recommended first topic.
- **Network map (≥ 640px):** five lines with stations at fixed coordinates from `network.ts`. Station styles:
  - **open:** white disc, line-coloured ring;
  - **later phase:** dashed grey ring, muted label;
  - **interchange:** larger disc with an ink ring;
  - **learned:** filled disc with a check.

  Stations are keyboard-focusable links.
- **Interchanges** (they encode real relationships):

  | Interchange | Lines | Why |
  |---|---|---|
  | FastAPI lifecycle ↔ Celery + Redis | Backend, Async | the API hands work to Celery |
  | CI/CD | DevOps, Git | PRs trigger CI |
  | asyncio event loop ↔ FastAPI lifecycle | Concurrency, Backend | `async def` runs on the loop |
  | multiprocessing pools ↔ Celery + Redis | Concurrency, Async | Celery's prefork pool |

  Final coordinates are authored during implementation, starting from the mockup's layout.
- **Line strips (all widths):** one card per line, listing its stations vertically with an Open / Phase N / Learned chip. An interchange row says "Change for the X line".
- **Clicking a station** that is not open yet shows a toast naming its phase. No browser dialogs.

## 9. Preferences and i18n

- `LearnPrefsContext` holds `lang` (default `en`), `mode` (`simple` | `technical`, default `simple`) and `learned: Set<slug>`.
- Persistence keys: `learn:lang`, `learn:mode`, `learn:learned`. Every storage access is wrapped in try/catch.
- Static pages render with the defaults. After mount, the provider reads storage and re-renders. Each page's props already hold both languages, so switching is instant with no fetch. The SEO title and description stay English.
- The provider sets `document.documentElement.lang` so the Bangla font stack and line height apply.
- Numerals in UI chrome (stop counter, step numbers) use Bangla digits in Bangla mode, via `lib/learn/l10n.ts`.
- Translation rule: technical terms stay in English inside Bangla text (`Redis`, `task`, `acks_late`), matching how Bangladeshi engineers speak.
- Eyakub does a native-speaker review of all Bangla copy before each phase ships.

## 10. Content rules and Phase 1 topics

**Rules for every topic**

- 6–12 main stops. Every stop has a title, a simple caption and a technical note.
- The simple caption never uses an unexplained term. The technical note is interview-grade and matches the official docs, as cited in `sources`.
- At least one alt route, and it must teach a failure mode interviewers ask about.
- One everyday analogy that maps onto every station, plus one twin for the failure mode.
- 5–8 Q&A, each with a short answer, a deeper answer, and the "answer that loses points" (a real, common misconception from the research notes).
- 5–8 cheat-sheet entries of commands people actually type.
- A sources list, rendered at the bottom of the page.

### 10.1 Celery + Redis (`celery-redis`, Async line)

Final content is in the approved mockup (`TOPIC`, `FLOW`, `MAIN`, `FAIL`, `TWINS`, `QA`, `CHEATS`), corrected against the research notes.

- **Stations:** You, FastAPI app, Redis queue (broker), Celery worker, Result store.
- **Main route, 10 stops:**
  1. request
  2. `.delay()` → broker
  3. 202 + task id
  4. BRPOP + prefetch
  5. worker runs (prefork, ack timing)
  6. result stored
  7. poll
  8. `AsyncResult` lookup (PENDING caveat)
  9. SUCCESS back
  10. download
- **Alt route "A job fails"**, branching after stop 4:
  1. crash
  2. retry with ETA, state RETRY
  3. second try (visibility-timeout caveat)
  4. SUCCESS
- **Analogy:** a restaurant (customer, waiter, order rail, cook, pickup counter, a burnt dish as the retry).
- **Q&A, 5:**
  - Why not do the slow work inside the request?
  - Broker vs result backend?
  - A worker crashes mid-task (`acks_late` + `task_reject_on_worker_lost`)?
  - Why idempotent?
  - What to pass to `.delay()` (and why pickle is unsafe)?

### 10.2 FastAPI request lifecycle (`fastapi-lifecycle`, Backend line, interchange with Async)

- **Stations, 9, on one straight line:** Client → Uvicorn → ServerErrorMiddleware → Your middleware → ExceptionMiddleware → Router → Dependencies + validation → Your function, with BackgroundTasks on a short branch.
- **The three middleware stations sit in a "Middleware stack" group.** Render the group as a plain label bracket in Phase 1, and as a full group box once Phase 2 ships.
- **Every corridor is bidirectional:** the request rides the top track inward and the response rides the bottom track outward. That shows "the response passes the middleware in reverse" without a word of text.
- **Main route, 11 stops:** research steps 1–11.
  - Stop 7 notes `def` (threadpool) vs `async def` (event loop).
  - Stop 11 shows BackgroundTasks running after the response.
- **Alt routes:**
  - **"Bad input (422)":** validation fails at the dependencies station, ExceptionMiddleware's handler table answers, and your function never runs.
  - **"A bug (500)":** the exception escapes to ServerErrorMiddleware, and the 500 has no CORS headers.
  - **"Server starts up":** lifespan startup, then requests, then shutdown.
- **Analogy:** the restaurant front of house (research §1).
- **Q&A (6 of the 10 in research):**
  - ASGI and Uvicorn
  - middleware order (last added is outermost)
  - `def` vs `async def`
  - where validation happens (422, not 400)
  - `yield` dependency cleanup timing (version note)
  - BackgroundTasks vs Celery
- **Cheats:** uvicorn dev/prod commands, `fastapi dev`, lifespan, yield dependency, `add_task`, the 422 handler, CORS.

### 10.3 Git basics (`git-basics`, Git line)

- **Stations:** Working directory, Staging area, Local repository, `origin/main` (your bookmark), Remote (GitHub).
- **`state` shows what the pointers hold:**
  - Local repository sub-label: `HEAD → main → a1b2c3`, updated on commit and on merge.
  - `origin/main`: shows the last-seen commit.
- **Main route, 8 stops:**
  1. edit
  2. `git add`
  3. `git commit`
  4. branch moves
  5. `git push`
  6. teammate pushes (remote changes)
  7. `git fetch`
  8. `git merge origin/main`
- **Alt routes:**
  - **"`git pull`":** fetch + merge in one move.
  - **"Merge conflict":** markers, edit, add, commit.
  - **"Detached HEAD":** a commit lands on no branch; rescue it with `git switch -c`.
- **Analogy:** a photo album (desk, arranging tray, album, sticky note as the branch, your finger as HEAD, the cloud album, your note of the cloud album).
- **Q&A (6 of 10):**
  - What HEAD points to
  - fetch vs pull
  - What a branch is
  - Why the staging area exists
  - merge vs rebase (golden rule)
  - Undo a pushed commit (`revert`)
- **Cheats:** research §3 list, with `push --force-with-lease` explained.

## 11. Phase 2 outline: Concurrency line

Each topic below is one data file plus the §7.9 engine additions. Interview framing is Python-first (the stack Eyakub works in).

**Concurrency vs parallelism** (`concurrency-vs-parallelism`)

- **Picture:** one cook juggling two dishes (concurrency) vs two cooks (parallelism).
- **Stations:** Task A, Task B, CPU core 1, CPU core 2.
- **Routes:**
  - **"One core":** the packets alternate.
  - **"Two cores":** parallel moves, both at once.
- **Key interview line:** concurrency is about structure (dealing with many things); parallelism is about execution (doing many things at the same instant).

**Processes vs threads** (`processes-vs-threads`)

- **Groups:** Process A { Thread 1, Thread 2, Memory A } and Process B { Thread 1, Memory B }.
- **Main route:**
  1. threads in A both read and write Memory A (shared);
  2. Process B cannot touch Memory A;
  3. A sends data to B through a pipe or queue (IPC, pickled).
- **Alt route "A thread crashes":** the whole process dies. Compare a crashed process, where its sibling survives.
- **Analogy:** houses (processes) and roommates sharing one kitchen (threads).

**The Python GIL** (`python-gil`)

- **Stations:** Thread 1, Thread 2, Thread 3, the interpreter, and the OS (I/O).
- **The packet is the GIL itself:** a single "GIL" tag passes from thread to thread, and only the holder runs Python bytecode.
- **Routes:**
  - **"CPU-bound":** the tag hops, and no speed-up.
  - **"I/O-bound":** a thread releases the GIL while waiting on the network, others run, real speed-up.
  - **"Free-threaded Python":** CPython 3.13 added an experimental build without the GIL (PEP 703), and 3.14 made it officially supported but still optional (PEP 779). Verify the version facts against python.org at authoring time.
- **Red flag:** "Python threads are useless."

**Multiprocessing pools** (`multiprocessing-pools`)

- **Stations:** Main process, Pool, Worker 1, Worker 2, Worker 3, Results.
- **Main route:** arguments are pickled and sent through pipes, the workers compute in parallel (parallel moves), the results come back in order with `map`.
- **Alt route "Unpicklable argument":** a lambda or open socket fails before any work starts.
- **Ties to Celery's prefork pool:** an interchange on the map.
- **Cheats:** `ProcessPoolExecutor`, `Pool.map`, `chunksize`, the `if __name__ == "__main__":` guard.

**asyncio event loop** (`asyncio-event-loop`)

- **Group:** Event loop (one thread) { Ready queue, Running task }, plus stations for the OS selector (epoll/kqueue) and the network.
- **Main route:**
  1. a task runs until `await`;
  2. it registers interest in a socket;
  3. the loop runs the next ready task;
  4. the OS signals data ready;
  5. the first task resumes.
- **Alt route "Blocking call inside `async def`":** `time.sleep` holds the loop, and every task freezes.
- **Ties to FastAPI:** `async def` handlers run here; `def` handlers go to AnyIO's threadpool. An interchange on the map.

**Race conditions and locks** (`race-conditions-locks`)

- **Stations:** Thread 1, Thread 2, Shared counter. `state` shows the counter's value.
- **Main route, the lost update:** both threads read 0, both write 1, and the counter ends at 1 instead of 2.
- **Alt routes:**
  - **"With a lock":** the counter ends at 2.
  - **"Deadlock":** two locks taken in opposite order, and both threads wait forever.
- **Red flag:** "The GIL makes my code thread-safe." (`+=` is not atomic.)

**Phase 2 needs a research pass** (same format as the existing notes) before writing these files.

## 12. Phases 3–4 outline

The research notes already hold nodes, steps, analogies, Q&A, cheats and sources for:

- **Phase 3:**
  - HTTP request journey
  - Docker
  - Docker Compose
  - Nginx reverse proxy
  - CI/CD (GitHub Actions)
- **Phase 4:**
  - Redis deep-dive
  - Databases
  - Auth (JWT, OAuth 2.0 + PKCE)
  - REST
  - GitHub pull requests
  - Kubernetes

Items the research marked "(knowledge)" are re-verified against primary docs when each file is written. Each phase is data-only and gets its own plan.

## 13. Testing and verification

- **Unit (vitest):** `geometry.ts` (offset, trims, corridor direction, the bidirectional set), `l10n.ts` (lookup fallback, format, Bangla digits), `useStepPlayer` (route branching, bounds, play/pause transitions, timers via fake timers), and the data-integrity test (§6) over every registered topic.
- **Types:** `npm run typecheck:learn` passes under strict mode.
- **Build:** `npm run build` exports `/learn.html` and `/learn/<slug>.html` for every registered topic. Then serve `out/` locally and load a nested route with no failing asset requests (this is the check for the `assetPrefix` fix).
- **Browser pass (Playwright, run locally, not in CI), golden path per topic:**
  1. open the hub;
  2. click the station;
  3. play through the main route;
  4. switch to Technically and to Bangla;
  5. play an alt route;
  6. mark the topic as learned;
  7. check that the hub shows the check.

  Run at 390×844 and 1280×860 in light and dark. Assert: no page errors, no horizontal overflow, the packet tag is visible on a move step. Take screenshots and check them for label collisions.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, stepping still updates edges and packet positions with no animation.

## 14. Risks and open points

- **Bangla copy quality:** written by the assistant, so it needs Eyakub's native review per phase (§9).
- **Map layout with five lines:** fitting 20 stations at readable size needs care. Fallback: the desktop map shows lines only with station dots, and the names live in the strips. Decide during implementation with screenshots.
- **The FastAPI 9-station line in the narrow layout:** a vertical spine at about 58px spacing fits in a 400×600 viewBox. Confirm in the screenshot pass.
- **Version-sensitive facts:** the FastAPI yield-dependency timing, CPython free-threading status and Celery defaults are version-dependent. The technical note names the version where it matters.
- **Chakra global styles** (`resetCSS`, black body) leaking into `/learn`: mitigated by the scoped root background and tokens. Verify in the browser pass.
