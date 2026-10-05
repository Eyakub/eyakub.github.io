# Teachability review of all /learn topics (2026-10-05)

Three reviewers scored each topic on a 9-point rubric based on Mayer's multimedia principles, plus plain-language practice. The rubric is in §0; the per-topic findings follow.

## 0. Rubric
### Teachability review rubric ("Stop by Stop", /learn)

**Who it's for:** the primary user is a complete non-programmer. The site owner's spouse is the stated test reader: "a very very newbie". She should understand each topic from the **Simply** mode diagram plus captions alone. The secondary user is an engineer preparing for interviews, who reads the **Technically** mode.

**What a topic is:**
- An animated metro-map diagram. Stations are system parts. A labelled "packet" travels along a line at each stop.
- Captions come in two modes: `simple` (Simply) and `tech` (Technically).
- Station names and sub-labels, and packet labels, are the SAME in both modes. Only the captions change.
- Alt routes show failure modes.
- Below the player: an analogy section (station ↔ everyday twin), interview Q&A (short / deep / red flag), a cheat sheet of code snippets, and sources.

The principles come from Mayer's multimedia learning research, plus plain-language writing practice.

## Score each topic 1–5 on

1. **Pre-training (words first).** Is every term a non-programmer would not know explained at or before its first appearance in what Simply-mode readers see? That means simple captions, station names and subs, packet labels, and analogy text. Examples of such terms: thread, process, server, queue, request, commit, socket, GIL, bytecode, pickle, coroutine, middleware.
2. **Segmenting.** Is there one idea per stop? Flag stops that cram two ideas, or that jump without a bridge.
3. **Signalling.** Does each simple caption point at what moves or lights up on the diagram ("the packet goes from X to Y")? Does the caption match the highlighted station or packet?
4. **Coherence.** Is there detail in Simply mode that a beginner does not need: version numbers, function names, code, status codes, acronyms?
5. **Story arc.**
   - Does stop 1 orient the reader (what are we looking at, and why should I care)?
   - Does the last stop land the takeaway?
   - Does each alt route's first stop say what is different ("What if…")?
6. **Analogy.** Is it familiar to a non-technical adult in Bangladesh or anywhere? Is it mapped consistently, station by station? Does the failure twin make the failure obvious?
7. **Visual legibility for a beginner.** Would she understand the station names, sub-labels and packet labels without knowing code? Examples of labels that may be opaque: "scope, receive, send", "pickle(x)", "await recv()", "GET /items/42", "forkserver / spawn", "Selector", "Interpreter".
8. **Technical accuracy and interview value** (Technically mode, Q&A, cheats). Is each statement correct and crisp? Flag anything doubtful, and say why. If you are unsure, check docs.python.org, git-scm.com, fastapi.tiangolo.com, docs.celeryq.dev or redis.io with WebSearch/WebFetch, and cite what you verified.
9. **Bangla.** Is the Bangla `simple` text as plain as the English, not harder or more literal?

## For each topic, deliver

- Scores 1–5 for items 1–9, each with a one-line reason.
- The **5 highest-impact problems**, each with:
  - where it is (step id or field, and file:line);
  - why a beginner would stumble;
  - a concrete fix, i.e. a rewritten EN caption or label, or a structural suggestion.
- A **glossary list**: every beginner-unknown term the topic relies on, each with a one-line plain-English definition (≤ 15 words). An everyday comparison is welcome.
- **Factual doubts**: the claim, why you doubt it, and what you verified (URL) or what still needs checking.
- **Cross-cutting observations** that likely apply to other topics too: things the engine or UI would need to fix, not the data. For example, "station names can't change between Simply and Technically", or "packet labels are code".

## A. Phase 1 topics (celery-redis, fastapi-lifecycle, git-basics)
### Teachability review A: celery-redis, fastapi-lifecycle, git-basics

Line refs are to /Users/eyakubsorkar/Desktop/eyakub.github.io/data/learn/topics/<slug>.ts. Contact sheets reviewed: wide and narrow for all three (in scratchpad).

---------------------------------------------------------------------
### 1. celery-redis  (average 3.4)

## Scores
| # | Item | Score | Reason |
|---|------|-------|--------|
| 1 | Pre-training | 3 | "Redis", "broker", "worker", "queue", "FastAPI" are on the map and never explained in plain words before use. "Ticket" and "waiting line" are explained well. |
| 2 | Segmenting | 4 | One idea per stop. `pickup` and `work` both reuse the same "task message" packet (stops 4/5 look near-identical). |
| 3 | Signalling | 4 | Most captions match the lit edge. `work` and `lookup` have weak pointers ("the worker builds", "the app looks in the results box" never says "arrow goes down to the box"). |
| 4 | Coherence | 4 | Simple text is clean. Leaks: the packet labels "POST /reports", "202 + task id", "GET /tasks/{id}", "SUCCESS + file url". |
| 5 | Story arc | 3 | Stop 1 does not say why we care ("something slow is coming"). The alt's first stop says "Halfway through...", not "What if...". The last stop lands well. |
| 6 | Analogy | 5 | Restaurant (waiter, order rail, cook, pickup counter, burnt dish) is universal and consistent. The twins list is the best teaching text on the page. |
| 7 | Visual legibility | 3 | "Redis queue / The broker" and "Result store / Redis again" are opaque. The "FastAPI app" name is jargon. Packets are code strings. |
| 8 | Tech accuracy | 4 | Checked, see Factual doubts. Dense, but correct. |
| 9 | Bangla | 4 | Natural and plain. Mixes Latin terms (FastAPI, Redis) as expected. "ব্রোকার" is transliterated and unexplained. |

## Top 5 problems
1. **The analogy arrives too late.** `analogy` (L272) sits below the player, but Simply captions never use the restaurant. A beginner meets "Redis queue / The broker" at stop 2 with no anchor.
   - Fix: change the Simply captions to the twin words, or put the twin in the sub.
   - Station subs: `You / Browser` → `You / the customer`; `FastAPI app / Takes requests` → `Web app / the waiter`; `Redis queue / The broker` → `Waiting line / ticket rail`; `Celery worker / Does slow jobs` → `Worker / the cook`; `Result store / Redis again` → `Results box / pickup counter`.
   - Subs cannot differ between modes, but they can be dual: put the plain role first, the tool name second.
2. **`request` (L83) does not orient.** It says "You tap Make my report" but not that building a report is slow, which is the whole point.
   - Fix: "You tap “Make my report”. Building it takes about half a minute. Watch how the app handles that wait."
3. **`crash` (L217) is not a "What if…" and introduces an off-map thing.** "The file storage does not answer" is not a station on the map.
   - Fix: "What if something goes wrong? Halfway through, the worker cannot reach the place where it saves files, so the job fails."
   - Or add a "File storage" node.
4. **`work` (L134) and `pickup` (L121) are easy to confuse visually.** Both show the worker lit orange with the same "task message" arrow; `work` has no packet at all.
   - Fix for `pickup`: "A separate helper program, the worker, keeps watching the line. It takes the next ticket and carries it off."
   - Fix for `work`: add a caption cue, "Look: the worker lights up. Nothing is moving, because it is busy." Also give the `work` step a packet like "building report…".
5. **Opaque packet labels.** "202 + task id" (L110), "GET /tasks/{id}" (the wide render shows `{id}` as `(id)`), "SUCCESS + file url" (L149), "lookup id", "retry in 60 s".
   - Fix: "OK, ticket #42", "Is #42 ready?", "Done + report link", "Look up ticket #42", "Try again in a minute".
   - The "202" and "GET" belong in the Technically captions, which already carry them.

Smaller: `saved` caption says "results box" but the station is "Result store". Use the same word everywhere. `poll` (L160) packet travels the User↔API corridor in the wrong direction: the arrow shows `ua` (you → app), which is correct for asking, and the caption matches. OK.

## Glossary (beginner-unknown terms the topic relies on)
- Web app / app: the program behind a website that answers your taps and clicks.
- Request: a message from your phone or browser asking a website to do something.
- Server: a computer that is always on, answering other computers.
- Queue: a waiting line where jobs stand until someone is free.
- Broker: the middleman that holds the waiting line. Like the order rail.
- Redis: a very fast program that keeps small bits of data in memory.
- Worker: a program that sits waiting for jobs and does them.
- Background job: work done out of sight while you keep using the page.
- Task / ticket id: a number that names one job so you can ask about it later.
- Result backend / store: the box where finished work is left for pickup.
- Retry: trying the same job again after it failed.
- Poll: asking again and again "is it ready yet?".
- Spinner: the little turning circle that means "wait".
- Browser: the app you use to open websites.
- Idempotent (Q&A only): safe to run twice, with the same outcome as once.

## Factual doubts
- None found. Verified against https://docs.celeryq.dev/en/stable/userguide/configuration.html:
  - `worker_prefetch_multiplier` default is 4.
  - `result_expires` default is 1 day.
  - `task_reject_on_worker_lost` re-queues the message when a worker process dies, so `acks_late` alone is not enough, as the deep answer says.
- Not re-verified, but well known and consistent with Celery docs: `visibility_timeout` default 1 hour (the fetched config page does not state it; it is on the Redis broker page cited in `sources`); early-ack default; JSON default since Celery 4; `max_retries` 3; prefork default concurrency = CPU count.
- Minor wording: `pickup` tech says "reserves up to 4 messages per process ahead of time". With `acks_late` off, the message is acked at start; the sentence is correct but the sequence "fetch → reserve → unacked copy" mixes two ideas (prefetch and visibility). Consider two sentences.
- `instant-reply` says "202 + task id" while the cheat sheet never shows how the route returns it. Fine for interviews, but a one-line `return {"task_id": r.id}` snippet would close the loop.

---------------------------------------------------------------------
### 2. fastapi-lifecycle  (average 2.8)

## Scores
| # | Item | Score | Reason |
|---|------|-------|--------|
| 1 | Pre-training | 2 | Uvicorn, ASGI, middleware (named in the station), CORS, router, dependencies, validation, response, header, compress, database connection, lifespan are not taught first. Captions do explain some inline (Uvicorn, safety net). |
| 2 | Segmenting | 3 | Mostly one idea per stop, but `deps` crams "gather the user + DB connection + check the shape" (three ideas), and `response-model` mixes returning plain data with filtering secrets. |
| 3 | Signalling | 2 | Station names on the map are code names (`ServerErrorMiddleware`, `ExceptionMiddleware`) while captions say "safety net" and "error translator". Nothing links the two. `outward` says "back out through the same checkpoints" but the picture jumps over several stations. |
| 4 | Coherence | 3 | Simple text is largely clean, but it quotes "GET", "/items/42", "200 OK", "422", "Internal Server Error", "headers". |
| 5 | Story arc | 3 | Stop 1 orients ("your browser asks for item 42"), but not why we care. Last main stop lands a side topic (BackgroundTasks), not the takeaway. Alts: `startup` says "Rewind", good. Others start with the failure itself, not "What if…". |
| 6 | Analogy | 3 | Restaurant is fine, but the map is muddy: two different "hosts" (door, seating), a "manager" for ServerErrorMiddleware, the "polite waiter" for ExceptionMiddleware, "dishwasher" for BackgroundTasks (it washes dishes, but background tasks send an email, so the twin does not map). The deps twin crams two jobs. |
| 7 | Visual legibility | 2 | Station names (ServerErrorMiddleware, ExceptionMiddleware, Uvicorn, "ASGI server") and packets ("scope, receive, send", "path + body", "item_id=42", "JSONResponse", "send_email()", "lifespan.startup") are all code. |
| 8 | Tech accuracy | 4 | Accurate and nuanced, with one stale-label bug (below) and one version-sensitive claim that is now correct. |
| 9 | Bangla | 3 | Readable, but heavy with untranslated terms (middleware, handler, Dependencies, Router). Simple lines like "ভয়ংকর ভুল", "ন্যাড়া একটা 500" are colourful but odd. |

## Top 5 problems
1. **Station names are code and cannot change between modes.** `sem` (L29) and `exm` (L43) are named after Starlette classes, while all Simply captions use "safety net" and "error translator".
   - A beginner reading "the safety net catches it" cannot find it on the map.
   - Fix: make the plain role the display name and the class the sub: `Safety net / ServerErrorMiddleware`, `Error translator / ExceptionMiddleware`, `Your checkpoints / middleware (CORS, login, timer)`.
   - The sub is the existing 2nd text line, so names stay mode-independent.
2. **Pre-training: too many jargon words before one is taught.** `request` (L132) is the only caption that explains its term (Uvicorn); by stop 3 "checkpoints" quietly means "middleware", and "CORS" appears raw in the station sub (L39) and in the `your-mw` caption.
   - Fix `your-mw`: "The request passes your checkpoints. One asks “is this website allowed to call me?”, one checks you are logged in, one starts a stopwatch."
   - Fix sub for `mw`: `CORS, auth, timing` → `Allowed? Logged in? Timer`.
   - Also fix `uvicorn` sub `ASGI server` → `The front door program`.
3. **`startup` alt leaves stale state labels (visual bug) and clips on narrow.** In `closed` (L428) the Uvicorn sub still reads "Accepting requests" (the `ready` state at L403 persists), and it should read "Stopped". `Your function` is relabelled "Pool closed" instead of a DB/setup node. On phones the packets "lifespan.startup" / "lifespan.shutdown" are clipped ("span.startup", "pan.shutdown") and "Accepting requests" overlaps "Middleware stack".
   - Fix: add `state: { uvicorn: { en: 'Stopped', ... } }` to `closed` and `lifespan-stop`.
   - Make labels `get ready` / `shut down`.
   - Move the group label away from Uvicorn's sub on narrow.
4. **`outward` (L235) skips most of the return trip; the picture and caption disagree.** The caption says the reply goes "back out through the same checkpoints in reverse", but the only highlighted hop is `em` (error translator → your checkpoints). Router/deps/safety net hops are not shown. A beginner counts stations and finds the picture does not match.
   - Fix: split into two stops ("Back through the translator and your checkpoints" / "past the safety net to the door"), or animate multiple `moves` (`re`, `em`, `ms`, `su`) in one step.
   - Also, `response-model` (L222) already moves `opd`, then `outward` moves `em` with no `re` hop, so the packet teleports from Dependencies to the translator.
5. **Analogy is overloaded and partly wrong, and `deps` is split in two.** Two hosts (L460, L498); `bg` as "dishwasher" (L522) does not match "send a confirmation email"; `deps` twin crams validation and "plating hides secret ingredients", but the output filtering belongs to the `response-model` stop, not the Dependencies station.
   - Fix: make Uvicorn "the door host" and Router "the seating host" explicit, or rename Router "the table assigner".
   - Make `bg` "the courier who delivers the receipt after you have left".
   - Move "plating hides secret ingredients" to its own (note: analogy twins are per node, so use the `exm`/`op` twin, or add a null-node twin "Plating = response filter").

Also: stop `request` should tell why to care, e.g. "Every web request walks the same path. Knowing it tells you where each kind of bug can hide."

## Glossary
- Browser / client: the app that asks a website for things.
- Request / response: a question sent to a website / the answer it sends back.
- Web server (Uvicorn): the program that listens for visitors and hands each one to your app.
- ASGI: the agreed plug shape between a web server and a Python app.
- Framework (FastAPI): a toolkit that handles the boring parts of building a web service.
- API: a menu of things a program lets other programs ask for.
- Route / router: an address on the menu and the clerk who matches addresses to code.
- Middleware: a checkpoint every request and reply passes through, on the way in and out.
- CORS: a browser rule about which other websites may call your API.
- Header: a small label attached to a message ("this is JSON", "this expires").
- Dependency: something your function needs handed to it first, like a logged-in user.
- Validation: checking that input has the right shape before using it.
- HTTP status 200 / 422 / 500: the number that says "OK" / "your input is bad" / "we broke".
- Exception: the program's way of shouting "something went wrong".
- Event loop / async: one worker juggling many waiting jobs. A blocking call freezes the juggling.
- Thread pool: a small crew of helpers for jobs that would otherwise freeze the juggler.
- Database connection pool: a set of open phone lines to the database, reused by everyone.
- Lifespan: code that runs once when the server starts and once when it stops.
- Background task: slow work done after the reply is already sent.
- Compress (GZip): shrinking a reply so it travels faster.

## Factual doubts
- `dependencies-with-yield` claim (L270, Q&A "yield dependencies") is correct for current docs. Verified at https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/: default `scope="request"` exits after the response is sent, `scope="function"` before. The page does not state the version history; the Q&A's "0.106 to 0.117 ran it before" is from release notes and was not re-verified here. Suggest adding a link to the FastAPI release notes if it must stay.
- Cheat sheet: `fastapi run` has no path argument shown; fine.
- `route-match` tech: "A missing path becomes 404". Starlette's Router returns a 404 response (`not_found`) directly, and `ExceptionMiddleware` handles `HTTPException` raised elsewhere. Not wrong at this level, but `exm` sits "right around the router" and 404 is raised through it for FastAPI routes. Low priority.
- `response-model` tech: "Pydantic converts it, drops extra fields" is correct for `response_model`. The `from_attributes=True` note is fine.
- `exception-layer` simple says "not found/forbidden"; a "forbidden" 403 comes from your code raising `HTTPException(403)`, fine.
- Q&A "def vs async def" says "dependencies follow the same rule on their own". Correct (sync deps in threadpool, async on loop).

---------------------------------------------------------------------
### 3. git-basics  (average 3.7)

## Scores
| # | Item | Score | Reason |
|---|------|-------|--------|
| 1 | Pre-training | 3 | Strong "box" and "snapshot" analogies in the captions, but "commit", "repository", "branch", "push", "fetch", "merge", "origin", "HEAD" are used as names before being plainly defined; "GitHub" is not explained. |
| 2 | Segmenting | 4 | One idea per stop, with a deliberate extra stop for the branch marker. `merge` cramps "combine" plus "two lines of history". |
| 3 | Signalling | 4 | Edges and station highlights usually match; state labels change visibly (best of the three topics). Gaps: `pull` alt, `branch-moves`, `teammate` have no packet. |
| 4 | Coherence | 3 | Simple text includes `app.py`, backticked `git merge origin/main` (L265), "the clash", and the packet `<<<<<<< ======= >>>>>>>`. Hashes (9f8e7d, a1b2c3, ...) appear in station subs, which is noise for beginners. |
| 5 | Story arc | 4 | Stop 1 shows the file change; the main route reads as a story. Alts: "What if" is implied; `clash` is the best. The last main stop (merge) is the takeaway of the loop. |
| 6 | Analogy | 4 | Photo album is good and consistent (desk/tray/album/note/cloud). "Sticky note marks where you are" = HEAD is quiet. Conflict twin is clear. The twin for `rtrack` ("Your note about the cloud album") is good; and there is no twin for push/fetch actions. |
| 7 | Visual legibility | 3 | "Working directory", "Staging area", "origin/main" are opaque. `HEAD → main → 9f8e7d` sub is code. Packets are real commands. |
| 8 | Tech accuracy | 5 | Careful and correct (details below). |
| 9 | Bangla | 4 | Plain, with consistent loan words (commit, push, merge). "ইতিহাসের দুটো ধারা", "গল্পের দুটো ধারাই" are charming but slightly literary. |

## Top 5 problems
1. **Station names and subs are Git-internal.** `Working directory` (L15), `Staging area`, `Local repository` with sub `HEAD → main → 9f8e7d` (L31), `origin/main` with sub `Last seen: 9f8e7d` (L37).
   - The sub on `repo` and `rtrack` is code a beginner cannot read.
   - Fix subs: `wd`: `Your files (desk)`; `idx`: `Picked for next save (tray)`; `repo`: `Saved history (album)`; `rtrack`: `Your note of GitHub`; `remote`: `Shared copy online`. Keep hashes only in the `state` strings, e.g. `Latest: snapshot a1b2c3`.
   - The names can stay as the real terms, which is useful for interviews.
2. **Pre-training of core verbs.** `commit` (stop 3) is explained as "seal the box and label it", which is good, but `push`, `fetch`, `merge`, `GitHub` and `branch` are only explained by context. `branch-moves` (L129) says "you are here marker" before "branch" has been defined; the station sub says HEAD → main.
   - Fix: add one dictionary-style line in the first stop: "Git is a save-history tool for files. GitHub is a website that keeps a shared copy."
   - `branch-moves` fix: "A branch is just a bookmark in your history. The bookmark named main slides forward to your new snapshot."
3. **Alt `pull` has a path that contradicts the caption.** Edge `pull` (L77) goes GitHub → Working directory around the top, skipping Local repository and origin/main; the caption says it "downloads and immediately combines", and `pulled` lights the repo.
   - A beginner sees the packet land on "Working directory" and then the highlight jump to "Local repository".
   - Fix: route `pull` as two moves (`fetch` then `merge`) in one step, so it visibly equals "fetch + merge", which is the very lesson. Also, the first `pull` caption says "straight into your project folder", which is only half true (files updated after the merge).
4. **Detached HEAD alt starts with a weird state and a dense first stop.** `checkout-sha` (L329) sets `idx: fix.py staged`, which the caption never mentions (it appears in the next caption: "You edit and stage a fix"). The caption says "jump back by its ID" but nobody has said what an ID is. The repo sub reads `HEAD → 9f8e7d (no branch)`, which a beginner cannot parse.
   - Fix: remove the `idx` override from `checkout-sha` and move it to `orphan-commit`.
   - Caption: "What if you go back in time? You jump to an old snapshot using its ID (a short code like 9f8e7d). The “you are here” marker now sits on no branch."
5. **Conflict alt: command and marker characters in Simply, and no resolution picture.** `clash` simple (L265) includes `git merge origin/main`; the packet `<<<<<<< ======= >>>>>>>` is shown on the map with no explanation of what it is; a beginner cannot picture "both versions in the file".
   - Fix caption: "You try to combine their work with yours. But you and your teammate both changed the same lines, so Git stops and asks you."
   - Fix packet: `both versions in one file`. Keep the markers in the Technically caption, where they already are.
   - Also add a tiny example of the marker block in the `markers` tech or cheats, e.g. a code cheat showing the three-line block.

Minor: `merge` main step shows the packet from `origin/main` to Local repository. But beginners may expect the packet to come from GitHub. The sub "Last seen" helps; the analogy twin for `rtrack` is the right fix, so make sure the caption for `fetch` says "into your note of GitHub (origin/main)" so the packet has a place to land.

## Glossary
- Git: a tool that remembers every saved version of your files.
- Repository: a project folder plus its full saved history.
- Working directory: the folder where you edit files. Like your messy desk.
- Stage / staging area: pick which edits go into the next save. Like a tray.
- Commit: a permanent saved snapshot with a label. A page in the album.
- Snapshot: how a file set looked at one moment.
- SHA / hash: a short code that names one snapshot, like a fingerprint.
- Branch: a movable bookmark pointing at one snapshot.
- HEAD: the “you are here” marker for where you are working.
- GitHub / remote / origin: a website holding a shared online copy; "origin" is its nickname.
- origin/main: your local note of what GitHub's main looked like last time you checked.
- Push: upload your new snapshots to the shared copy.
- Fetch: download others' snapshots without changing your files.
- Pull: fetch and merge in one go.
- Merge: combine two lines of work into one history.
- Merge conflict: both people changed the same lines; a human must choose.
- Detached HEAD: your marker is on a snapshot, not on any branch.
- Fast-forward (tech only): just sliding a bookmark forward because nothing diverged.
- Rebase (tech only): replaying your commits on top of newer ones.
- Teammate / collaborator: another person working on the same project.

## Factual doubts
- All checked against well-known git behaviour and the cited pages (https://git-scm.com/docs/git-pull, https://git-scm.com/book/en/v2/Git-Internals-Git-References, https://git-scm.com/book/en/v2/Git-Branching-Rebasing); nothing found wrong:
  - `.git/HEAD` holding `ref: refs/heads/main`; detached HEAD holds a raw SHA.
  - `git add` writes a blob and updates the index. `fetch` updates `refs/remotes/origin/*` only. `<<<<<<<` is your side (HEAD), `>>>>>>>` theirs.
  - `git pull` is fetch + merge, or rebase with `--rebase` / `pull.rebase`.
  - `--force-with-lease` compares with your remote-tracking ref. "Refuses if the remote moved since you last fetched" is accurate.
- Imprecise but acceptable: "`git revert` ... safe on shared branches" (L526). Reverting a merge commit needs `-m 1`; worth a deep-answer clause if interview-focused.
- "eventually garbage collected" for orphan commits (L359): true, after reflog expiry (30/90 days) and `git gc`. Could say "after a few weeks".
- `commit` tech: "Commits store snapshots, not diffs" is the correct conceptual model (packfiles use deltas for storage only).

---------------------------------------------------------------------
### Cross-cutting

1. **Station names and subs are shown in both modes, so the Simply reader sees code vocabulary.** Examples: `ServerErrorMiddleware`, `Redis queue / The broker`, `HEAD → main → 9f8e7d`.
   - Engine fix: allow a per-mode station label, or a required `plain` sub shown in Simply (e.g. "the waiter"), with the real name shown in Technically.
   - Data fix if the engine cannot change: convention of `<plain role> / <real tool>`.
2. **Packet labels are code strings and cannot be re-written for Simply.** Examples: "GET /items/42", "202 + task id", "scope, receive, send", "<<<<<<< ======= >>>>>>>", "lifespan.startup".
   - Engine fix: let a step carry `label: { simple, tech }`, or let `moves[].label` be a bilingual-by-mode pair. Without it, authors must pick one reader.
3. **The analogy lives below the player, so Simply captions cannot lean on it.** Beginners need the twin at stop 1.
   - Engine fix: show the analogy twin name on hover/tap of a station, or as a persistent legend in Simply mode.
   - A "What is this?" popover per station would also solve the glossary problem (see below).
4. **No glossary or tap-to-define for jargon.** All three topics rely on 10 to 20 beginner-unknown words (queue, broker, middleware, commit...).
   - Engine fix: a `terms` map per topic. Highlight first use in Simply captions with a tooltip, and add a "Words first" card before stop 1.
5. **Steps with `work` and no packet are visually weak.** `work` (celery), `branch-moves`, `you-commit`, `teammate` (git) show only a ring colour.
   - Engine fix: render a status chip beside the lit station (e.g. "busy…", "waiting"), or let `work` carry a `label`.
6. **`state` overrides persist and can go stale.** fastapi `closed` still shows Uvicorn "Accepting requests" after shutdown. Engine fix: auto-clear a topic's overrides at alt branch start and end, plus lint for the last state per node.
   - Related: alt branches inherit overrides from the branch point. In git, `checkout-sha` shows `fix.py staged` from its own state. A lint rule "override must be mentioned in the same caption" would catch this.
7. **Alt first stops should be "What if…" by convention.** None of the nine alts open with that framing. Engine fix: render the alt's label as a "What if…" banner at the first stop of each alt (e.g. "What if: Bad input (422)"), so data does not have to repeat it.
8. **Multi-hop captions vs one-edge steps.** fastapi `outward` and git `pull` describe several hops but animate one edge. Engine fix: support a `moves` array that plays in sequence within a step (the schema already uses an array), and lint that a caption naming N stations animates N-1 edges.
9. **Narrow layout clips long packet labels and overlaps group labels.** fastapi narrow: `lifespan.startup/shutdown` clipped at the left edge; "Accepting requests" collides with the "Middleware stack" label. Engine fix: clamp packet pills inside the viewBox, and keep group labels clear of station subs.
10. **Simply captions quote inline code and numbers.** Backticked `git merge origin/main`, "422", "200 OK". Lint rule: no backticks or status codes in `simple`.

## B. Concurrency 1–3 (concurrency-vs-parallelism, processes-vs-threads, python-gil)
### Teachability review B: concurrency-vs-parallelism, processes-vs-threads, python-gil

Reviewed against the rubric: simple captions read in route order, wide and narrow contact sheets, analogy/qa/cheats read in the data files. Line refs are to /Users/eyakubsorkar/Desktop/eyakub.github.io/data/learn/topics/.

Averages (9 items each):
- concurrency-vs-parallelism: 3.9
- processes-vs-threads: 3.2
- python-gil: 3.1

---------------------------------------------------------------------
## 1. concurrency-vs-parallelism.ts

### Scores
1. Pre-training: 3. Main route is very friendly (cook, dish, oven). But "CPU core", "Task queue", "thread", "GIL" are never defined in any Simply text before use. The reader is never told "a core is one cook". The only mapping is in the analogy section below the player.
2. Segmenting: 5. One idea per stop. The oven/ping/resume rhythm is clean.
3. Signalling: 4. Most captions match the highlight (A goes to Waiting area, B goes to core 1). Weak: `tally` (l.223) highlights only Finished and the sub says "Juggle vs do at once", which is not a station state. `two-start` shows two packets but does not say which cook is which core.
4. Coherence: 4. Simply is clean. Visible-in-Simply leaks: state `Waits for GIL` (l.265), `T1 (~2t)`, `T2 running?`, `~2t`.
5. Story arc: 4. Stop 1 jumps straight into "The cook picks up dish A" with no "imagine a kitchen = your computer". The last stop lands the takeaway well. Alt `gil-threads` opens with "Two Python threads..." and does not say "What if the cooks are Python threads?". Alt `io-free` opens fine ("A thousand dishes...") but has no "what if".
6. Analogy: 4. Kitchen is universal and mapped station by station. Two doubts: "pass window" (l.392) is restaurant jargon, odd for Bangladesh. The "one knife, one stove = the GIL" twin is good but uses a GIL concept the topic never introduces.
7. Visual legibility: 4. Names are plain ("Task queue", "Waiting area", "Finished"). Subs "Dishes A-D", "Oven, disk, network" help. Mixed metaphor: station names are tech ("CPU core 1") while subs and packets are kitchen ("dish A"). "CPU" itself is unexplained. Packet "A zzz" is charming and clear. "Juggle vs do at once" under Finished is confusing.
8. Technical accuracy: 4. All verified or consistent (see doubts). `T1 finishes ~2t` is a simplification.
9. Bangla: 4. Plain and natural. "পদ" for dish and "চলমান" are slightly formal. "পাস উইন্ডো" is opaque. Core/CPU/concurrency stay English transliterated, which is fine.

### Top 5 problems
1. Core is never defined; cook = core is implied only. `start-a` (l.96). Beginner sees "CPU core 1" and "cook" and cannot connect them. Fix: `start-a` simple: "Picture a kitchen. Each CPU core in the diagram is one cook. Cook 1 picks up dish A. One cook can only work on one thing at a time." Also rename sub for core1 from "Idle" to "Cook 1: idle" (subs are shared across modes, so this is OK).
2. `gil-threads` alt introduces "Python threads" and "GIL" cold (l.246-275, state l.265). Thread is only defined in topic 2, GIL in topic 3. Fix: first alt caption: "What if the two cooks are Python threads? (A thread is one strand of work inside a program.) Each lands on its own core. You would hope both run at full speed." State: change `Waits for GIL` to `Told to wait` and put "GIL" only in the tech caption, or add "the GIL, Python's one-at-a-time rule" in the simple text of `t-blocked`.
3. `tally` last stop (l.223-234): the packet-less highlight on Finished plus the label "Juggle vs do at once" under Finished is meaningless. Also "You can have either, or both" is abstract with no picture. Fix: set the Finished sub back to "4 results" and make the caption concrete: "One cook juggling A and B was concurrent. Two cooks working at the same instant (C and D) was parallel. A kitchen can do both."
4. Alt `io-free` has no "what if" and uses a thousand-dishes number that the picture cannot show (l.321). Fix: "What if a thousand dishes are all in the oven? One cook can still look after them, because waiting needs no cook." Move `many-wait` to show the oven icon only (it does).
5. Jargon in simple: "CPU" and "Task queue" (never glossed), and the "dishes" vs "tasks" double vocabulary (node says Task queue, sub says Dishes). Fix: station name "Order queue" with sub "Dishes A-D waiting" in Simply is not possible (names are shared), so rename in both modes to "Task queue" with sub "Tasks = dishes A-D" so the metaphor is stated once.

### Glossary (beginner-unknown)
- CPU core: one worker inside the computer that does one instruction at a time. Like one cook.
- Task: one job the computer has to finish. Like one dish.
- Thread: one strand of work inside a program. Like one cook's to-do list.
- GIL: Python's rule that only one thread may run Python code at a time. Like one shared stove.
- I/O (disk, network): waiting for data from outside the CPU. Like waiting on the oven.
- CPU-bound / I/O-bound (Q&A): work limited by computing vs work limited by waiting.
- Concurrency / parallelism: juggling many jobs vs doing many at the exact same moment.
- Queue: a line of jobs waiting to start.

### Factual doubts
- "Default workers min(32, cpus+4) on 3.13+" (cheat l.567): correct, 3.13 uses `os.process_cpu_count()`. Verified at https://docs.python.org/3/library/concurrent.futures.html.
- "T1 ends near 2t" (l.286): a simplification. It is true only when both threads alternate evenly for the whole run. Acceptable, but "about 2t" is already hedged.
- "convoy effects" (l.548): real, but jargon with no explanation. Worth one sentence (an I/O thread waits behind a CPU thread for each GIL release) or cut.
- `sys._is_gil_enabled()` and `python -VV` (cheats): correct, per free-threading HOWTO https://docs.python.org/3/howto/free-threading-python.html.
- "Free-threaded officially supported in 3.14, optional" (l.475): correct, PEP 779 https://peps.python.org/pep-0779/.

---------------------------------------------------------------------
## 2. processes-vs-threads.ts

### Scores
1. Pre-training: 2. "Thread" and "process" are never defined, yet they are the whole topic. Simply invents "worker" (thread), "office" (process), "whiteboard" (memory), "letter" (pipe), but the diagram says Thread 1, Process B, Memory A, Pipe / Queue. Terms like `pickle`, `bytes`, `interpreter`, `EOF`, `signal 9`, `SIGSEGV`, `isolation` appear in station subs, packets or states.
2. Segmenting: 3. Stops 1-3 are one idea each. Stop 4 `send` jumps from "threads share" to "another office" with no bridge. Process B was drawn from stop 1 but is never introduced, and there is no reason given for talking to it.
3. Signalling: 3. Good on thread stops (packet goes Thread 1 to Memory A). Weak: `arrive` and `unpickle` ("Process B" lights up but the caption is about "the other office"). `reply` says "reply letter" but the reply content is never shown (what result?). `a-untouched` highlights Memory A, matching the caption. Alt `t2-segfault` says "knocks over a pillar" while the lit node is Thread 2 labelled SIGSEGV.
4. Coherence: 2. Visible in Simply: `pickle(x)`, `set x=1`, `x=99`, `Pickled bytes`, `Own interpreter`, `Dead (signal 9)`, `SIGSEGV`, `Alive, sees EOF`, `Pipe / Queue`. All code or acronyms.
5. Story arc: 3. Stop 1 never says "two programs, here is the question: who can see whose data?". The ending (`reply-lands`) is a mechanism, not a takeaway. The "A is untouched / isolation" stop (l.217) is the real climax but sits in the middle. Alt openers ("Office B burns down") do not say "What if...". Both alts do land the fault-isolation point well.
6. Analogy: 3. The page analogy (apartment, roommates, shared fridge, notes under the door) differs from the captions (office, whiteboard, letter). Two metaphors for one thing. Good ideas individually. For Bangladesh, "roommate" and "apartment" are less common than a shared "mess" and separate flats (use those). The "stove left on = crash" twin is a strong failure analogy.
7. Visual legibility: 3. Picture is clear: two boxed groups, shared memory in A, a pipe between. But the node called "Process B" sits inside a group also called "Process B" and has the thread icon, so a beginner reads it as a thread named "Process B". "x = ?" and "Pickled bytes" are opaque. Thread 2 has no connection to the pipe, which is fine, but nothing shows why Thread 1 is the sender.
8. Technical accuracy: 4. Mostly correct. Two items to check or fix (see doubts): EOF claim and signal 9 vs segfault.
9. Bangla: 3. "হোয়াইটবোর্ড", "অফিস" fine. "অক্ষত", "ঝুঁকিও" are formal. "থাম ফেলে দেয়" is a metaphor a beginner may not tie to a crash. Heavy loanwords (address space, pickle) only in tech, fine.

### Top 5 problems
1. No definitions of thread or process (stop 1, l.111). Fix `t1-writes` simple: "A program running on your computer is a process. Inside it, workers called threads share one whiteboard (memory). Thread 1 writes x = 1 on it." Also add this to the title of the first group: "Process A: one program".
2. Two metaphors (office/whiteboard/letter in captions vs apartment/fridge/notes in the analogy). Pick one and use it in both. Recommend office, since whiteboard is already on screen, and rename analogy twins: "The first worker", "The shared whiteboard", "A letter through the mail slot", "The other office". Update the stove twin to "A fire in the shared office".
3. Station and packet labels are code (`pickle(x)`, `set x=1`, `x=99`, `Pickled bytes`, `Own interpreter`, `signal 9`, `SIGSEGV`, `EOF`). Fix: `pickle(x)` to "copy x"; `Pickled bytes` to "Copies in transit"; `Own interpreter` to "Own memory and rules" or "Runs its own Python"; `Dead (signal 9)` to "Killed"; `SIGSEGV` to "Crashed"; `Alive, sees EOF` to "Alive, B went quiet". Keep the technical term in `tech` captions only.
4. `send` stop has no bridge and Process B has no introduction (l.152-163, nodes l.42). Fix a new simple caption for `send`: "Now Thread 1 needs to tell another program, Process B, the number. Process B is in a different office and cannot see our whiteboard. So Thread 1 must write a copy and send it." Rename node `b_main` to "Process B's worker" (sub "Own memory") so it does not look like a duplicate of the group.
5. Ending does not land the takeaway, and `a-untouched` is mid-route. Fix: end with a new last stop or edit `reply-lands`: "Sharing inside one office is quick but risky. Between offices, everything is a copy: slower, but one office's trouble never reaches the other." Also alt `t2-segfault` simple: replace the pillar with "One worker makes a mistake so serious it brings down the whole building."

### Glossary
- Process: one running program with its own private memory. Like one office.
- Thread: one worker inside a process, sharing its memory. Like a colleague at the same whiteboard.
- Memory: where a program keeps its data while running. Like a whiteboard.
- Pipe / Queue: a channel that carries messages between two programs. Like a letter slot.
- Pickle / unpickle: turn data into a package of bytes to send, then rebuild it.
- Bytes: raw package form of data, just a stream of numbers.
- Interpreter: the program that reads and runs Python code.
- Isolation: one program cannot touch another's memory. Like separate locked offices.
- Crash / segfault: a program stops suddenly after a serious error.
- Signal 9 / SIGSEGV / EOF: system notices that a program was killed, crashed or went quiet.
- IPC: ways programs send each other data.
- Heap, address space, race (tech and Q&A): where data lives; the addresses a process may use; two workers clashing on the same data.

### Factual doubts
- "A signal death shows ... exitcode negative" (l.282-283): correct per https://docs.python.org/3/library/multiprocessing.html (`exitcode` is -N for signal N). BUT the state label says `Dead (signal 9)` while the text says "A segfault or the OOM killer". A segfault is signal 11 (exitcode -11); only the OOM killer sends 9. Fix: label `Killed (signal 9)` and text "the OOM killer (signal 9) or a segfault (signal 11)".
- "The parent gets EOF or BrokenPipeError" (l.296): doubtful as stated. Verified in the multiprocessing docs that `Connection.recv()` raises `EOFError` only when the other end is closed, and `Queue.get()` with a dead producer blocks indefinitely unless a timeout is given. In real code with `Queue`, A does not "see EOF". Only `ProcessPoolExecutor` gives a reliable `BrokenProcessPool`. Fix: "With a raw `Pipe` the parent may get `EOFError` (if all copies of the other end are closed); with `Queue`, `get()` can hang, so use timeouts or `ProcessPoolExecutor`." Also the red-flag-worthy fact: queue data can corrupt when a process is killed mid-use (same docs).
- "3.14 default on Linux forkserver" (Q&A l.546): correct. Verified "Changed in version 3.14: On POSIX platforms the default start method was changed from fork to forkserver" (macOS and Windows already used spawn). Q wording says "On Linux"; docs say POSIX other than macOS. Fine.
- fork + threads child deadlock (l.532): correct and widely documented.
- Cheat `mp.get_context("spawn").Process(target=f)` (l.568): missing the `if __name__ == "__main__":` guard that spawn requires; a beginner will hit a RuntimeError or recursive spawn. Add it.
- `ps -M <pid>` (macOS) and `ps -T -p <pid>` (Linux): both list threads. OK.

---------------------------------------------------------------------
## 3. python-gil.ts

### Scores
1. Pre-training: 2. "The GIL" is the title and a station but the name is never expanded or explained in Simply before use. The first simple caption says "the one key to the room" without saying the key is called the GIL or what the room is (the Interpreter station). Also undefined: thread, bytecode (packet and sub), interpreter, native code, C extension, `recv()`, `sha256(big)`, `3.14t`, Lock, shared state, CPU loop.
2. Segmenting: 4. Stops are small. Exceptions: `c-call` introduces both "native code" and "no key needed" at once; `still-lock` introduces Lock and shared state in one go; `io-release` has two moves (T2 drops, T1 takes) in one stop.
3. Signalling: 3. Key = GIL packet moves between stations well. Mismatches: `ext-reenables` caption is about the GIL coming back but the red highlight is on Interpreter and GIL changes only in its sub-label (visible in wide-2-03 and narrow-2-03). `no-gain` is also highlighted on Interpreter with sub `Wall time = sum`, which is not a thing a beginner can read. `taking-turns` highlights the GIL red as an error for what is normal behavior. `c-returns` highlights the C extension as "result" while the caption is about Thread 1 waiting.
4. Coherence: 3. Visible leaks: `sha256(big)`, `recv()`, `hashlib, NumPy`, `Blocked in recv`, `Disabled (3.14t)`, `Re-enabled`, `CPU loop`, `Wall time = sum`, `T1 code`. Captions themselves are lean.
5. Story arc: 3. Stop 1 does not orient: "grabs the one key to the room" lacks "Python lets only one thread run its code at a time. This key is how." The main route ends on `c-returns`, a small mechanic, not the takeaway. The best takeaway (`no-gain`) is in an alt. The `free-threaded` alt has no "What if the lock is removed?". Alt order is contradictory: `ext-reenables` (GIL back) is followed by `still-lock` ("Even with no GIL...") while the diagram still shows the GIL as Re-enabled and Interpreter as `T1 and T2 together`.
6. Analogy: 3. The one key is a clean metaphor and consistent through the route. But "bathroom" as "the only place where the real work happens" (l.495-503) is awkward: the Interpreter is the thing doing work, and a bathroom is not work. A coffee shop bathroom key is also less familiar in Bangladesh. Topic 1 already uses "one knife, one stove" for the same GIL, so the two topics use different metaphors for the same idea. Free-threaded alt breaks it: two people in one bathroom. The CPU-bound twin ("two staff, one key") is good.
7. Visual legibility: 3. Layout is neat (threads left, GIL between, interpreter on the right). "Interpreter", "C extension", "bytecode", "Network / disk" are opaque. The GIL station with a lock icon helps. In narrow the GIL sits between the two threads on one row, which actually reads well.
8. Technical accuracy: 5. Tight and well sourced. All verified (see below). Minor nitpicks only.
9. Bangla: 3. Plain where it uses চাবি, লাইনে দাঁড়ায়, হাতবদল. Loanword-heavy simple text: "native কোড", "interpreter", "bytecode", "Lock", "build". "Free-threaded Python" as a label is untranslated and opaque.

### Top 5 problems
1. GIL is never explained in Simply; stop 1 does not orient (l.113). Fix `t1-takes` simple: "Python has a rule: only one thread may run Python code at a time. The rule is enforced by one key, called the GIL (Global Interpreter Lock). Thread 1 grabs the key." And rename the Interpreter sub from "Runs bytecode" to "Runs your code".
2. Main route never lands a takeaway; it ends with a small mechanic (`c-returns`, l.280). Fix: add a last stop or replace the caption: "Only one thread runs Python code at a time. Waiting for the network or using fast native code frees the key. Heavy Python work does not." and consider ordering the CPU-bound alt as the second main section.
3. Opaque packets and states in Simply: `bytecode`, `recv()`, `sha256(big)`, `T1 code`, `CPU loop`, `Blocked in recv`, `Wall time = sum`, `Disabled (3.14t)`. Fix: `recv()` to "waiting for data"; `sha256(big)` to "big job"; `bytecode` to "Python code"; `CPU loop` to "Busy computing"; `Blocked in recv` to "Waiting for network"; `Wall time = sum` to "Total time = A + B"; `Disabled (3.14t)` to "Switched off". C extension sub `hashlib, NumPy` to "Fast built-in tools".
4. Free-threaded alt contradictions and focus mismatch (l.388-460). `ext-reenables` highlights Interpreter instead of the GIL station; `still-lock` follows it while the GIL is shown as Re-enabled; Lock and "shared state" are undefined. Fix: reorder to `gil-off`, `both-run`, `still-lock`, `ext-reenables` (end on the caveat), highlight the GIL node in `ext-reenables`, and add "What if the key is removed? (Python's newer free-threaded version)" to `gil-off`. `still-lock` simple: "With no key, two workers can still scribble over the same data. You must still use your own lock, a small do-not-disturb sign."
5. Analogy: bathroom key is awkward and inconsistent with topic 1 (stove). Fix: use the kitchen stove from topic 1: "A kitchen has one stove key. Only the cook holding it may cook. A cook who leaves to wait for a delivery hangs the key back." Map Interpreter to "the stove", C extension to "the back-room mixer, which needs no stove". That also reuses the concurrency kitchen and keeps topic 3 in the story.

### Glossary
- GIL: Python's one-key rule: only one thread runs Python code at a time.
- Thread: one worker strand inside a program (defined in topic 2).
- Interpreter: the program that reads and runs your Python code.
- Bytecode: Python's small step-by-step instructions that the interpreter runs.
- C extension / native code: fast code written in another language, called from Python.
- Blocking I/O / recv(): a thread stops and waits for data from network or disk.
- CPU-bound: a job limited by computing speed, with no waiting.
- Mutex / Lock: a key or sign so only one worker touches something at once.
- Free-threaded build: a special Python version with the one-key rule switched off.
- Race (tech): two workers clashing on the same data so results are wrong.
- Switch interval (tech): how long a waiting thread waits before asking for the key.

### Factual doubts
All verified against the sources the topic cites unless noted.
- "Switch interval default 5 ms; waiter sets drop request; holder yields at next eval-breaker check; forced switch makes another waiter take it" (l.163, 181): matches CPython's ceval_gil.c (https://github.com/python/cpython/blob/3.14/Python/ceval_gil.c) and `sys.setswitchinterval` docs (https://docs.python.org/3/library/sys.html).
- "The glossary says it is always released when doing I/O" (Q&A l.563): docs glossary wording is that the GIL is always released when doing I/O (https://docs.python.org/3/glossary.html). OK.
- Free-threaded: experimental in 3.13, supported but optional in 3.14, about 5-10% single-thread overhead (l.403, 424): consistent with PEP 779 and the 3.14 What's New (https://docs.python.org/3/whatsnew/3.14.html). Importing a non-declaring extension re-enables the GIL with a warning (https://docs.python.org/3/howto/free-threading-python.html). OK.
- `python3.14t -X gil=0` / `PYTHON_GIL=0`, `Py_GIL_DISABLED`: documented in the free-threading HOWTO. OK.
- "InterpreterPoolExecutor on per-interpreter GIL, PEP 684" (l.653): correct (3.14 `concurrent.futures.InterpreterPoolExecutor`; per-interpreter GIL is 3.12).
- `counter += 1` not atomic, docs FAQ lists `i = i+1`: correct per the Python FAQ. A nuance for interviews: whether a switch lands between load and store is timing-dependent, so "can lose an update" is the right hedge.
- Cheat l.724 `import hashlib, threading   # ...` is a comment, not a snippet; low value.
- `hashlib` releases the GIL only above a size threshold (data larger than about 2 KB); the topic says "on big data", which is right.

---------------------------------------------------------------------
## Cross-cutting

Read in line order (concurrency, then processes/threads, then GIL):

1. Terms are not defined before they are relied on, in any order.
   - "Core" is never defined (topic 1 uses it from stop 1 via station names; topics 2 and 3 assume it).
   - "Thread" is used in topic 1's alt and analogy before topic 2 defines it. Topic 2 itself never defines thread or process in Simply. Topic 3 assumes both.
   - "GIL" is a state label and an analogy twin in topic 1 (l.265, l.399-406), before topic 3. Topic 3 itself does not expand it.
   - Fix at the design level: a one-line "words first" panel (or a first-stop caption) per topic that defines its 2-3 key words, and a forward-reference rule: do not name a concept from a later topic in Simply. Suggested definitions are in each glossary above.

2. Station subs, packet labels and state overrides are visible in Simply but are code, acronyms or version strings (`pickle(x)`, `recv()`, `sha256(big)`, `SIGSEGV`, `signal 9`, `EOF`, `3.14t`, `x = ?`, `CPU loop`, `Wall time = sum`). The "names/subs/packets same in both modes" rule makes this the biggest legibility problem. Engine fix: allow `state` overrides and packet labels to have a `simple` and `tech` variant (even if station names stay shared), or enforce a plain-English lint on them.

3. Mixed metaphor between the diagram, the captions and the analogy section. Topic 1 mixes literal tech station names with kitchen subs and packets. Topic 2 uses office/whiteboard in captions and apartment/fridge in the analogy. Topic 3 uses a bathroom key, while topic 1 used a stove for the same thing. Fix: pick one metaphor per topic, state it in stop 1, and reuse the kitchen across the line (cook = core, stove = GIL, separate kitchens/offices = processes).

4. Analogies are only below the player, so Simply readers meet metaphor words ("the cook", "the key", "the office") without being told what they stand for. Engine idea: show a small legend (metaphor word = station) next to the diagram in Simply mode, or let station subs carry the twin ("CPU core 1 - a cook").

5. Highlight does not always match the caption. Examples: free-threaded `ext-reenables` (highlight on Interpreter, text about the GIL), `tally` (highlight on Finished with a non-state sub), `c-returns` (highlight on the C extension, text about Thread 1), `t2-segfault`. Also red "error" colour is used for normal behavior (GIL `taking-turns`, `no-gain`), which tells a beginner something is broken when it is the lesson. Engine fix: let a step declare a `focus` node and a `tone` (neutral, warning, error) separately from the work kind.

6. Alt routes start without a "What if..." beat and their branch point is easy to miss. Engine/UI: render a "What if..." banner using the alt label plus an optional `question` string as the first caption prefix, and show the branch stop visually.

7. Bangla relies on English loanwords for the exact terms a beginner lacks (thread, process, core, GIL, interpreter, bytecode). The plain Bangla is good where it uses real words (চাবি, লাইনে দাঁড়ায়, হাতবদল, বসে আছে, ফাঁকা). Prefer everyday Bangla for the metaphor layer (মেস/ফ্ল্যাট, চায়ের দোকান or রান্নাঘর), avoid "পাস উইন্ডো", and give a one-line Bangla gloss at first use of each English term.

8. Takeaway placement: in topics 2 and 3 the sharpest takeaway (isolation; no gain from threads for CPU work) is mid-route or in an alt, while the main route ends on a mechanical step. Engine/data: add an optional `takeaway` line shown on the last stop of the main route, and end every main route on a "so what" stop.

9. Accuracy hygiene worth fixing across topics: crash/EOF claims need the "Pipe vs Queue" distinction (Queue.get can hang on a dead producer); `signal 9` is not a segfault; `spawn` examples need the `__main__` guard; cheat entries should be runnable snippets, not comments.

## C. Concurrency 4–6 (multiprocessing-pools, asyncio-event-loop, race-conditions-locks)
### Teachability review C: multiprocessing-pools, asyncio-event-loop, race-conditions-locks

Basis: full read of the three data files, plus wide contact sheets of every stop (narrow shots not viewed). Technical claims were checked against my knowledge of the Python docs. I did NOT run WebSearch or WebFetch, so every "verified" below means "matches my recollection of the docs", with the URL to confirm.

Assumption: the beginner has NOT read earlier topics. None of the three defines thread, process, memory, operating system, or "shared". Each needs a short "words first" card (see per-topic glossaries).

---------------------------------------------------------------------
## 1. multiprocessing-pools (average 3.2)

### Scores
1. Pre-training: 2. Simple captions use "operating system", "memory", and an odd "safe 'run me only once' block". "Pickled" is on the Task queue and Result queue subs from stop 1, and pickle is never explained. The topic never says what the work is (a pile of what?).
2. Segmenting: 4. Mostly one idea per stop. The `create` stop crams two (a team of two, and the guard).
3. Signalling: 3. `start`, `chunk` and `compute` point at the packets well. `w2-first` ("Helper 2 happens to finish first") and `shutdown` never say where to look. Captions say "boss", "helper" and "tray", but the diagram says "Parent process", "Worker" and "Task queue", so she has to translate.
4. Coherence: 3. Simple stays code-free. But the visible labels are heavy: `Pool(2)`, `map()`, `PicklingError`, `RuntimeError`, `BrokenProcessPool`, `Dead (-9)`, and `forkserver / spawn`.
5. Story arc: 3. Stop 1 never says why a pool exists (use all the cores for heavy work). The last stop is "send helpers home", which is housekeeping, not the takeaway (separate rooms, so everything is copied). The alts have no "What if..." lead-in. "A worker dies" is the clearest.
6. Analogy: 4. Boss, helpers in separate rooms, slots in the doors and photocopies in envelopes are good and consistent. But the simple captions say "tray" and "cookbook" while the analogy says "inbox slot" and "photocopy", so the words do not match. The failure twin ("mailing a living person") is clever but abstract.
7. Visual legibility: 2. "Start method / forkserver / spawn" is opaque. "Pickled chunks/results", "pickle chunks" and "r[4-7]" are code-like. "import __main__" is code. The six corridors cross in an X in the middle (start-w2 against tasks-w1), which is visually noisy. The "Pool" box does not contain the Parent, which is correct but unexplained.
8. Technical accuracy: 4. See Factual doubts. Interview value is high.
9. Bangla: 4. It is plain and natural (বস, বান্ডিল, ট্রে). Station labels stay in English, which is fine. "অন্তহীন কপি করা" is okay.

### Top 5 problems
1. **Pickle is never explained.** Where: station subs at lines 32 and 53 (shown from stop 1); packet `pickle chunks` (line 170); `unpicklable` alt simple (lines 291-294); analogy twin (line 456). Why: she sees "Pickled chunks" and "PicklingError" with no meaning. Fix: say it once in `chunk` simple: "The boss splits the pile of numbers into bundles and seals each one in an envelope (this is called pickling). Only sealed copies can travel to the helpers." Rename subs to "Sealed bundles" and "Sealed answers". Rename the packet to "seal bundles".
2. **Stop 1 gives no purpose and no work.** Where: `create` (lines 119-131). Why: "opens a team of two helpers inside a safe block" has no why and no what. Fix: "One program has a big pile of calculations. The boss (the parent process) hires two helpers so the pile gets done twice as fast. Each helper works in its own private room." Move the `__main__` guard idea to the guard alt only.
3. **Opaque station and sub labels: "Start method / forkserver / spawn".** Where: lines 24-28. Why: it is a Python-internals choice a beginner can never decode. Fix: name it "Hiring office" (the analogy already does) with sub "Creates helpers". Keep forkserver and spawn for Technically captions and Q&A.
4. **The two guard stops use jargon and an unexplained mechanism.** Where: `reimport` (329-331), `bootstrap-error` (346-348), `create` (125), `fix-def` (306). Why: "reads the whole script from the top" and "the line that makes more helpers" mean nothing without knowing a script has a first line. "Shared cookbook" is never set up. Fix: `reimport`: "Each new helper starts by reading the boss's entire instruction sheet from the top. That sheet begins with 'hire two helpers'. So every helper tries to hire two more helpers." Add a "What if the boss forgot the do-this-only-once note?" lead-in. For `fix-def`: "Write the recipe on a numbered page of the shared cookbook, so a helper can look it up by name."
5. **No takeaway that the helpers share nothing.** Where: `shutdown` (269-271) and the analogy intro. Why: the key interview idea (no shared memory, so everything is copied, so copies cost time) is never landed. Fix: final stop: "Every bundle and answer was a copy sent through a slot. That is why sending huge things back and forth makes the team slower." Also give `w2-first` a point: "Helper 2 finished first, but the boss will hand the answers over in the original order anyway." Say the sorting happens at the boss, as the next stop shows.

### Glossary
- process / "helper": a running program with its own private memory.
- parent process: the main program that creates the other processes.
- operating system: the software that runs the computer and starts programs.
- memory: the working space a running program keeps its data in.
- core: one of the computer's independent calculators.
- parallel: truly working at the same moment, on different cores.
- pickle / pickling: turning data into a sealed package of bytes to send.
- byte: a tiny unit of stored data.
- queue: a line of items waiting to be picked up in order.
- chunk: a bundle of several items handled together.
- worker: a process whose only job is to take tasks and do them.
- function / lambda: a named recipe / an unnamed throwaway recipe.
- module / `__main__`: a script file / the file you started.
- start method (fork, spawn, forkserver): the way a new process is created.
- import: reading another file's code so it can be used.
- exception: an error message that stops the program.
- signal / OOM killer: the system forcibly ending a program that used too much memory.
- timeout: a maximum wait, after which you give up.
- GIL (Technically only): Python's one-at-a-time rule inside a single process.

### Factual doubts
- 3.14 default start method on Linux is `forkserver`; macOS and Windows use `spawn`. Matches my recollection of the docs. Confirm at https://docs.python.org/3/library/multiprocessing.html#contexts-and-start-methods and https://docs.python.org/3/whatsnew/3.14.html.
- Deep answer "It was `fork` until 3.13": correct for Linux. Mixing "Linux" and "macOS" in one sentence is clear enough.
- `Pool.__exit__` calls `terminate()`: correct, and it is a good interview point.
- `Executor.map` chunksize defaults to 1 and `Pool.map` computes one: correct. Doc: https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.Executor.map.
- `os.process_cpu_count()` is new in 3.13: correct.
- Red flag "Pool uses threads": fine, since `multiprocessing.pool.ThreadPool` exists but is not `Pool`.
- Bootstrapping RuntimeError text: matches CPython. Under `forkserver` the same re-import applies, so the claim is fine.
- "A worker killed... loses the chunk. Classic Pool can hang": correct and a known gotcha. `maxtasksperchild` does not fix a hang from SIGKILL. It only recycles workers, so listing it as a remedy is a stretch. Suggest "timeouts or the executor".
- "Pool(2) default size is process_cpu_count" is stated in a Pool(2) stop where the size is explicit, so it is a slight non sequitur.

---------------------------------------------------------------------
## 2. asyncio-event-loop (average 3.3)

### Scores
1. Pre-training: 2. Task, coroutine, thread, socket, selector, epoll/kqueue, I/O, await, queue, request and OS are all used. The simple captions rarely define them. "Single worker" is a different word from the station "Event loop". The first stop never says what a task or an await is.
2. Segmenting: 4. The 10-stop main route moves one beat at a time (run A, A awaits, run B, B awaits, sleep, wake, resume, done). `fastapi` is the only crammed alt (FastAPI, route, AnyIO, threadpool, 40 limiter).
3. Signalling: 3. Captions do not point at lit stations. `a-awaits` talks about "asks the OS" while the packet goes to Selector, whose name never appears in simple. `wake-a` says "A goes back in the tray" while the picture shows a long green packet from the Selector. The tasks station state ("A waits, B queued") helps a lot.
4. Coherence: 3. Simple is code-free, but the diagram shows `await recv()`, `to_thread(f)`, `async def route`, `def route`, "AnyIO thread, 40 max", "epoll / kqueue", "Idle in select", "Fix: await sleep" and "Timeouts".
5. Story arc: 3. Stop 1 ("Two jobs are put in the to-do tray") does not say why anyone cares (one worker handling many slow jobs). The `a-done` closing line is weak ("B continues when its data comes"). The best takeaway is in Technically ("concurrent, but never parallel"). Alt leads: the blocking alt opens well; the FastAPI alt is very out of scope.
6. Analogy: 4. One waiter with many tables, a bell panel and an extra runner is excellent for Bangladesh (a restaurant is universal) and consistent. The failure twin (waiter stands at one table) is exactly right. But the simple captions never use waiter/table words, so the analogy is a sidebar rather than the story.
7. Visual legibility: 2. "Your tasks / Coroutines A, B", "Selector / epoll / kqueue" and "Sockets / Network" are opaque. "Thread pool / Default executor" is jargon. "One thread" box is fine and useful. The hourglass icon for Selector helps. The loop-to-tasks and selector-to-ready corridors overlap other lines on wide (see wide-0-08 and wide-0-10), which is busy.
8. Technical accuracy: 4. Mostly right. See Factual doubts. Q&A is excellent interview material.
9. Bangla: 4. Fine and plain. "সরে দাঁড়ায়" is a good rendering of "steps aside". "করণীয়-ট্রেতে" is okay. Several English terms stay (Selector, Coroutine) with no gloss.

### Top 5 problems
1. **Simple vocabulary does not match the station names.** Where: simple captions in `run-a`, `run-b`, `idle`, `wake-a`, lines 141, 176, 211, 248. "Worker", "job" and "tray" versus "Event loop", "Task" and "Ready queue". Why: she has to guess that "single worker" = Event loop. Fix: rename the stations for both modes (Event loop to "Event loop (the one worker)"), or write simple as "The event loop (our one worker) takes job A from the Ready queue (the to-do tray)". Do this at first mention in `schedule`.
2. **No orientation at stop 1.** Where: `schedule` (lines 121-123). Fix: "One worker has to handle many jobs, and most jobs spend their time waiting (for a website, a file). This diagram shows how the worker never stands around waiting. Jobs A and B are placed in the to-do tray. Neither has started."
3. **Selector and sockets are never named in simple.** Where: `a-awaits` (158-160), `idle`, `bytes-arrive`, `wake-a`. Fix: `a-awaits`: "Job A has to wait for the internet. It steps aside and leaves a note with the selector (the computer's waiting-room watcher): 'tell me when my data comes.'" `bytes-arrive`: "Data for job A comes in over the network connection (a socket) and the selector notices."
4. **The GIL and "I/O versus CPU" are asserted, not explained.** Where: `gil-caveat` simple (418-420), title line 416. Why: "fix waiting, not computing" lands as a slogan. Fix: "A helper thread is good at waiting for someone slow (the internet). It is not good at doing heavy sums, because in Python only one thread can calculate at a time. For heavy sums, hire a whole separate helper, as in the previous topic." This also needs a pointer to multiprocessing-pools.
5. **FastAPI alt is a different topic with unexplained terms.** Where: `fastapi` alt (lines 428-469), sub "AnyIO thread, 40 max" (line 455). Why: "route" and "FastAPI" are never defined and she gets nothing from "40 max". Fix: move it to a Technically-only note or to the FastAPI topic. If kept: "A website page that waits (async def) runs right on the one worker. A plain page (def) is automatically handed to a helper thread." Drop "40 max" from the visible state and use "helper thread".

### Glossary
- thread: one line of work inside a program.
- task / coroutine: a job that can pause and resume where it left off.
- await: the pause marker: "I am waiting, someone else can go".
- event loop: the one worker that runs ready jobs and watches for finished waits.
- queue: a waiting line.
- I/O: input and output: waiting on files, disks or the network.
- blocking: holding the worker while waiting, so nobody else can proceed.
- socket / network connection: one open line between two computers.
- selector (epoll/kqueue): the OS tool that watches many connections and reports which are ready.
- kernel / OS: the core of the operating system that manages connections.
- concurrent versus parallel: taking turns versus really working at the same moment.
- thread pool / executor: a small standing team of helper threads.
- CPU-bound: slow because of heavy calculation, not waiting.
- request / route / latency: a call to a web page / a web page's address / the wait before an answer.
- timeout / health check: giving up after a wait / a "still alive?" ping.
- GIL: Python's rule that only one thread calculates at a time.

### Factual doubts
- Default `ThreadPoolExecutor` size `min(32, (os.process_cpu_count() or 1) + 4)` on 3.13+: correct. Confirm at https://docs.python.org/3/library/concurrent.futures.html.
- `slow_callback_duration` 100 ms: correct, https://docs.python.org/3/library/asyncio-dev.html.
- Cheat: debug mode "logs ... coroutines that were never awaited". This is slightly off. The never-awaited RuntimeWarning is emitted regardless of debug mode; debug mode adds the traceback of where the coroutine was created. UNVERIFIED, please check asyncio-dev.
- "Loop holds only a weak reference to Tasks": correct per the `create_task` docs.
- `asyncio.Lock` FIFO, not thread-safe, no timeout argument: correct; `asyncio.timeout()` is the workaround. Confirm at https://docs.python.org/3/library/asyncio-sync.html.
- FastAPI sync routes in AnyIO threadpool, limiter 40: correct, https://fastapi.tiangolo.com/async/ and https://anyio.readthedocs.io/en/stable/threads.html.
- "Awaiting a coroutine runs it inline": correct. This is a useful correction of the red flag "every await switches tasks".
- The `to_thread` cheat note "Context variables carry over": correct.
- `wake-a` tech: "Nothing has resumed A yet" is accurate and a good nuance.
- Fix text "offload the call to a thread" in the blocking alt: fine.

---------------------------------------------------------------------
## 3. race-conditions-locks (average 3.8)

### Scores
1. Pre-training: 3. "Thread", "shared counter", "lock", "critical section", "deadlock" and "RLock" are mostly explained by context or the analogy. "Thread" is never defined, and "re-entrant" is not either. The analogy is placed at the bottom, not before the diagram.
2. Segmenting: 4. Read, read, add, write, overwrite is one beat per stop. The `take-lock` stop does three things at once: replay, reset to 0, and take the lock.
3. Signalling: 4. Packets are named plainly ("read 0", "write 1", "wait for B") and each caption names the thread that moves. The per-thread "Has 0" and "Has 1" states are great. Weak: `handover` says the lock "lets go", but the packet runs from Lock A to Thread 2 as "your turn", which is not literally what happened.
4. Coherence: 4. Simple is clean. Visible labels are mostly plain English ("Held by T1", "Stuck forever"). "RLock: T1 x2" and "value = 0 (rerun)" are the only odd ones.
5. Story arc: 4. A clear problem, failure, then fix, with deadlock and RLock as "what if" alts. The `t1-reads` start has no orientation line. The final stop lands the right result but not the lesson (shared things need turns).
6. Analogy: 3. Fridge tally plus a marker pen is simple and familiar. Gaps: (a) it says the pen is needed only to change the number, but the race happens when both READ before either writes, so reading must also need the pen; (b) the eraser as "Lock B" is arbitrary, and a Bangladeshi reader may use whiteboards or notebooks more than a fridge note, but this is a minor cultural point; (c) Lock B appears in the diagram from stop 1 with no reason.
7. Visual legibility: 4. The best of the three. Station names are plain. The failure beat is visible (wide-0-05 shows "value = 1, not 2!"). Lock stations sit between the threads, but nothing visibly links a lock to the counter, so what a lock protects is implied. Lock B is dead weight on the main route.
8. Technical accuracy: 4. One misleading fix. See Factual doubts.
9. Bangla: 4. Plain ("মনে মনে এক যোগ করে" is very good). "Re-entrant lock" is left in English with a tiny gloss. "Critical section" stays English.

### Top 5 problems
1. **Thread, shared and counter are never defined.** Where: `t1-reads` simple (line 97), summary, and the node subs. Fix: "Imagine a program doing two jobs at once. Each job is called a thread. Both can see one number, a shared counter, that counts something (say, visitors). We watch what goes wrong when both add one at the same time."
2. **The analogy under-describes the lock.** Where: analogy intro (line 399) and lockA twin (lines 434-436). Why: a reader who thinks "reading needs no pen" will think the bug can still happen. Fix: "you may read or change the number only while holding the pen".
3. **Lock B on the main route is unexplained, and no link shows what a lock protects.** Where: nodes lockB (lines 43-49) and the analogy twin (lines 439-446). Fix: in `take-lock` simple, "Lock A is the only pen for this counter". Dim Lock B and show it only on the deadlock alt (engine feature), or label it "Lock B (not used yet)". Draw a thin lock-to-counter relation or add a caption phrase "Whoever holds Lock A may touch the counter".
4. **The replay jump in `take-lock` is abrupt.** Where: simple at lines 178-180 and the alt-start labels. Why: the counter silently resets to 0 and Thread 2 goes Idle, while the packet is `acquire`. Fix: "Now a replay. Same two threads, counter reset to 0, but this time a lock is added. A lock is a pen only one thread can hold at a time. Thread 1 picks it up first." Rename the packet "grab the pen/lock". Also add a "What if..." lead to the two alts: "What if a job needs two locks?" and "What if a thread asks for a lock it already holds?"
5. **The cheat sheet and Q&A contradict their own advice.** Where: cheat 2 (line 595: `acquire(timeout=2): ...; lock.release()` with no try/finally), cheat 4 (line 609: acquire in a loop, no release shown), Q&A `multiprocessing.Value` (line 505). Fix: wrap in try/finally and state `with lock:` is the default. For Value, say `with v.get_lock(): v.value += 1`.

### Glossary
- thread: one of several jobs a program runs at the same time.
- shared: visible to and changeable by more than one thread.
- counter: a number that goes up by one for each event.
- read / write: look at the stored number / replace the stored number.
- race condition: wrong result because the timing of two threads decided the outcome.
- lost update: one thread's change is erased by another's overwrite.
- lock: a "one at a time" pass: whoever holds it goes, others wait.
- acquire / release: pick up the pass / hand it back.
- critical section: the stretch of code only one thread may run at once.
- deadlock: two threads each hold what the other needs, so both wait forever.
- RLock (re-entrant lock): a lock its own holder may take again without freezing.
- atomic: happens as one unbreakable step.
- bytecode (Technically only): Python's tiny internal steps for each line.
- GIL (Technically only): Python's one-thread-calculates-at-a-time rule.
- exception: an error that interrupts the program.
- throughput: how much work is finished per second.

### Factual doubts
- `counter += 1` is not atomic; docs FAQ lists `i = i+1` as non-atomic and `L.append(x)` and `D[x] = y` as atomic: matches. Confirm at https://docs.python.org/3/faq/library.html#what-kinds-of-global-value-mutation-are-thread-safe.
- "On modern CPython it often needs many iterations": correct (3.10+ switches only at specific points). `sys.setswitchinterval(1e-6)`: correct, https://docs.python.org/3/library/sys.html#sys.setswitchinterval.
- **Misleading: "`multiprocessing.Value`" as a race fix (line 505).** `Value.value += 1` is itself a read-modify-write; it is safe only inside `with v.get_lock():`. A beginner reading the list will assume Value is atomic. Doc: https://docs.python.org/3/library/multiprocessing.html#multiprocessing.Value.
- "A plain Lock has no owner, so any thread can release it": correct for `threading.Lock` (releasing an unlocked one raises RuntimeError). Confirm at https://docs.python.org/3/library/threading.html#lock-objects.
- Free-threaded 3.13t/3.14t is in sources but never discussed. There races are more visible and `counter += 1` bugs show up faster. A one-line Technically note would help.
- `asyncio.Lock` "FIFO, no timeout argument": correct. "Code without await effectively atomic on one loop": correct.
- Red flag "A lock is released automatically when its thread dies": correct that it is not released.
- `sorted((a, b), key=id)` as a global order: OK in CPython within one process; `id` is only stable per object lifetime, so say "a fixed rank" instead for clarity.
- Deadlock detection: Python does not detect lock deadlocks; `faulthandler.dump_traceback_later` is a valid way to see stuck threads. https://docs.python.org/3/library/faulthandler.html.

---------------------------------------------------------------------
## Cross-cutting

1. **Words-first is the biggest gap on this line.** Thread, process, memory, OS, I/O and request are used everywhere and defined nowhere. The engine needs a "Before you start" glossary card (3-6 terms, from the glossary above) shown above the player in Simply mode, with the terms linked to it.
2. **Station names, subs and states are shared between modes, so they carry code.** Examples: "forkserver / spawn", "epoll / kqueue", "Default executor", "PicklingError", "BrokenProcessPool", "RLock: T1 x2", "AnyIO thread, 40 max". The engine should allow `simple` variants of `sub`, `state` and packet label (as the rubric says only captions change, this is a data-model change) or at least let sub-labels be hidden in Simply.
3. **Packet labels are often code** (`await recv()`, `to_thread(f)`, `import __main__`, `r[4-7]`, `pickle chunks`). Race-conditions-locks is the model: "read 0", "write 1", "wait for B". The line should adopt that style.
4. **Simple captions use a different cast from the diagram.** Boss, helper, tray and worker versus Parent, Worker, Task queue and Event loop. Either name the stations in the analogy vocabulary, or put "(the boss)" next to the real name at first mention. The analogy section sits below the player, so most readers will never connect the two. Consider showing the analogy twin as a hover or caption chip on the station.
5. **No "why should I care" at stop 1 and no takeaway at the last stop**, on all three. The engine could add two fixed fields, `hook` and `takeaway`, shown above the first and below the last stop. Alt routes need an auto-rendered "What if..." heading from the alt label (currently labels are nouns like "Deadlock").
6. **Alts with long corridors that cross the diagram** (pools: the X across Start/Tasks; asyncio: loop-to-tasks and selector-to-ready arcs overlapping) make it hard to see which edge a packet is on. A highlight-only-active-edge-and-fade-others rule would help.
7. **Cheats must model the advice they give**: always `with`/try-finally for locks, and no half-correct fixes like `Value` alone. Worth a lint pass over the whole line.
8. **Branch topics that are really other topics** (the FastAPI alt in asyncio) dilute the arc. The engine could mark alts as "Technically-only" so Simply readers skip them.
