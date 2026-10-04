# Learn-site research: 14 topics

Notes: "Verified" = fetched during this research (see Sources per topic). Items marked (knowledge) come from standard docs knowledge and were not re-fetched; double-check before shipping if a senior reviewer is strict. Topic list in the brief said 13 but enumerated 14; all 14 are covered.

---------------------------------------------------------------------

# 1. FastAPI request lifecycle (FULL)

## Nodes
| id | label | role |
|---|---|---|
| client | Client | Browser/app sending an HTTP request |
| server | Uvicorn (ASGI server) | Speaks HTTP on the socket, turns bytes into an ASGI `scope` + `receive`/`send` calls |
| sem | ServerErrorMiddleware | Outermost layer; catches any unhandled exception and returns a 500 |
| mw | Your middleware | CORS, auth, timing, GZip etc., in the order you added them |
| exm | ExceptionMiddleware | Turns HTTPException / registered handlers into responses |
| router | Router | Matches path + method to a path operation |
| deps | Dependencies + Pydantic | Resolves `Depends()`, parses and validates path/query/body |
| op | Path operation function | Your code (`def` in a threadpool, or `async def` on the event loop) |
| bg | BackgroundTasks | Work that runs after the response is sent |

(Lifespan is a separate side-lane: Uvicorn -> app at start/stop.)

## Steps (happy path)
1. client -> server | HTTP request | "You knock on the front door. Uvicorn reads the raw message and understands it." | Uvicorn parses HTTP (h11/httptools), builds an ASGI scope dict, and calls `await app(scope, receive, send)`.
2. server -> sem | ASGI call | "The request enters the building through the safety net that catches any disaster." | `FastAPI` is a Starlette subclass; `ServerErrorMiddleware` is outermost and wraps everything so any unhandled exception becomes a 500.
3. sem -> mw | request | "It passes through your checkpoints (CORS, logging, auth) in the order you listed them." | `app.add_middleware` / `middleware=[...]`: the LAST added is outermost among user middleware. Request goes top to bottom, response bottom to top.
4. mw -> exm | request | "Next is the layer that knows how to turn 'not found' or 'forbidden' errors into proper replies." | `ExceptionMiddleware` sits innermost, around the router. Handles `HTTPException` and handlers registered by exception class/status code.
5. exm -> router | request | "The router reads the address and picks which function should handle it." | Starlette `Router` matches path + method, extracting path params; mounted sub-apps and 404/405 are decided here.
6. router -> deps | solve dependencies | "Before your function runs, FastAPI gathers everything it needs: the logged-in user, a DB session, and checks the data you sent is the right shape." | `solve_dependencies` runs `Depends` (sub-dependencies first, cached per request), runs the setup half of `yield` deps, and validates params/body with Pydantic.
7. deps -> op | validated arguments | "Your function receives clean, trusted values and does the real work." | `def` handlers run via `run_in_threadpool` (AnyIO worker thread); `async def` runs directly on the event loop.
8. op -> router | return value | "Your function hands back plain data." | Return value is validated/filtered/serialized through `response_model` (Pydantic), then wrapped in a `JSONResponse` (or your `response_class`).
9. router -> mw (outwards) | response | "The reply travels back out through the same checkpoints in reverse (add headers, compress, log time)." | Response passes ExceptionMiddleware, then user middleware bottom-to-top, then ServerErrorMiddleware.
10. mw -> client | HTTP response | "The reply is delivered. The client now has its answer." | Uvicorn sends `http.response.start` and `http.response.body` ASGI messages. Status/headers/body go on the wire.
11. bg -> (internal) | after-response work | "Only after the answer is sent does the app do slow extras like sending an email." | `BackgroundTasks` run after the response is sent, in the same process. `yield`-dependency exit code also runs after (default `scope="request"`).

## Alternate paths (mini-sequences)
A. Validation error (422): step 6 Pydantic fails -> `RequestValidationError` raised -> handled by FastAPI's registered handler (it lives in ExceptionMiddleware's handler table) -> JSON body `{"detail":[{"loc","msg","type"}]}` with status 422 -> back out through middleware. Your path operation never runs.
B. HTTPException (e.g. 404): raised in dependency or path operation -> ExceptionMiddleware converts to a response -> normal exit path. Middleware outside it sees a normal response.
C. Unhandled exception (bug): bubbles past ExceptionMiddleware and user middleware -> ServerErrorMiddleware returns plain 500 (and re-raises so the server logs the traceback). Note: because ServerErrorMiddleware is outermost, middleware like CORS sees an exception, not the 500 response, so a 500 may lack CORS headers (classic "CORS error hides the real 500" confusion).
D. Lifespan: on server start Uvicorn sends `lifespan.startup`; code before `yield` in your `lifespan` async context manager runs (create DB pool, load ML model); app then accepts requests. On shutdown, code after `yield` runs. Lifespan does not run for mounted sub-apps; if `lifespan=` is set, `on_event` handlers are ignored. `TestClient` only runs lifespan when used as a context manager (`with TestClient(app)`).
E. `def` vs `async def`: `def` handlers/dependencies are offloaded to a worker thread (AnyIO default limiter 40 threads (knowledge)) so blocking code does not stall the loop. A blocking call (`time.sleep`, `requests.get`, sync DB driver) inside `async def` freezes the entire event loop for all requests.

## Beginner analogy: restaurant
- Client = customer. Uvicorn = front-of-house door/host who takes the order slip. ServerErrorMiddleware = the manager who handles any kitchen fire. Your middleware = security guard / coat check / timer at the entrance. ExceptionMiddleware = waiter who politely says "sorry, we're out of that" (404). Router = host who sends you to the right section. Dependencies+Pydantic = waiter checking the order form is filled correctly and ID checked. Path operation = chef. response_model = plating (only the dishes on the menu leave, secret ingredients like password hash are filtered). BackgroundTasks = washing dishes after you've already been served.

## Interview Q&A
1. Q: What is ASGI and how does Uvicorn relate to FastAPI?
 Short: ASGI is the async interface between a server and a Python app; Uvicorn is a server that calls the app.
 Deep: Uvicorn translates HTTP bytes into an ASGI `scope` dict and `receive`/`send` awaitables, then calls `await app(scope, receive, send)`. FastAPI (via Starlette) is that callable. FastAPI does no socket handling itself; WSGI by contrast is sync-only and cannot do WebSockets/lifespan.
 Red flag: "FastAPI is the web server" or "Uvicorn is a framework".
2. Q: In what order do middlewares run?
 Short: Request goes outside-in in stack order; response goes inside-out.
 Deep: Stack is ServerErrorMiddleware -> your middleware -> ExceptionMiddleware -> router. Among user middleware, the last one added with `add_middleware` becomes the outermost, which surprises people. Registering CORS last is a common fix so CORS wraps auth failures.
 Red flag: "Middleware runs in the order I added them for both request and response" or ignoring the two built-in ones.
3. Q: What does `def` vs `async def` change?
 Short: `def` runs in a threadpool; `async def` runs on the event loop.
 Deep: Use `async def` only when everything inside is awaited non-blocking. A blocking call inside `async def` blocks all concurrent requests. A `def` handler with blocking I/O is safe because the loop stays free, limited by the threadpool size. Dependencies follow the same rule independently of the handler.
 Red flag: "async def is always faster" or "FastAPI is multi-threaded, so blocking is fine".
4. Q: Where does validation happen and what happens on failure?
 Short: Before your function runs; failure returns 422 automatically.
 Deep: Params/body are validated by Pydantic during dependency solving; errors raise `RequestValidationError` with `loc`/`msg`/`type` per field. You can override with `@app.exception_handler(RequestValidationError)`. The handler is called without ever entering your function.
 Red flag: "Validation happens inside my function" or "returns 400".
5. Q: How do `yield` dependencies work and when does cleanup run?
 Short: Code before `yield` is setup, after `yield` is teardown, run after the response is sent by default.
 Deep: Current FastAPI docs say exit code of default-scope (`scope="request"`) yield dependencies runs after the response is sent; `Depends(dep, scope="function")` runs exit before the response is sent. Behaviour changed across versions (0.106 to 0.117 ran exit before the response was sent, which broke using the resource in BackgroundTasks); check your version. Always re-raise exceptions you catch, unless converting to HTTPException.
 Red flag: "Teardown happens before the client sees anything" (version-dependent) or swallowing exceptions in the `except` block.
6. Q: How do BackgroundTasks differ from Celery?
 Short: BackgroundTasks run in-process after the response; Celery runs in separate workers with a broker.
 Deep: BackgroundTasks have no retries, persistence, or queue; if the process dies the task is lost, and a long sync task occupies a threadpool thread (async ones run on the loop). Use for tiny fire-and-forget (send email), Celery/ARQ for durable or heavy work.
 Red flag: "They're the same thing" or "background tasks run in a separate process".
7. Q: What is lifespan and why replace `on_event`?
 Short: One async context manager for startup+shutdown; `on_event` is deprecated.
 Deep: Code before `yield` runs at startup, after `yield` at shutdown, so state like a DB pool shares scope with its cleanup. Do not mix with `on_event` (those are ignored when `lifespan` is set). Sub-app lifespans are not run when mounted.
 Red flag: "Startup code goes at module top-level" (runs at import, in every worker, can't be awaited).
8. Q: Why does a 500 sometimes lack CORS headers?
 Short: ServerErrorMiddleware is outside CORS middleware.
 Deep: Unhandled exceptions escape user middleware (including CORSMiddleware) and are turned into a 500 by the outermost layer, so CORS headers are never added. Fix by handling exceptions explicitly or wrapping CORS outermost via handler design.
 Red flag: "It's a browser bug; just add allow_origins=['*']".
9. Q: What does `response_model` do?
 Short: Validates and filters the return value into the declared schema.
 Deep: The returned object is converted via Pydantic to the model, dropping extra fields (e.g. `hashed_password`), then JSON-encoded. It also drives OpenAPI docs. Returning ORM objects needs `from_attributes=True`.
 Red flag: "It only affects docs" or "it validates the request".
10. Q: How many requests can one Uvicorn worker handle concurrently?
 Short: Many, as long as handlers `await`; blocking code serializes them.
 Deep: One process = one event loop = one thread for async code; scale CPU/parallelism with `--workers N` or gunicorn with Uvicorn workers, or multiple containers. Workers do not share memory.
 Red flag: "One request at a time" or "workers share in-memory state".

## Cheat-sheet
- `uvicorn app.main:app --reload` : dev server with auto-reload (not for prod).
- `uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4` : multi-process prod run.
- `fastapi dev app/main.py` / `fastapi run` : FastAPI CLI (dev reload / production mode).
- `gunicorn -k uvicorn.workers.UvicornWorker app.main:app -w 4` : process manager + Uvicorn workers (newer Uvicorn also has built-in `--workers`).
- `app = FastAPI(lifespan=lifespan)` with `@asynccontextmanager` : startup/shutdown.
- `async def get_db(): async with Session() as s: yield s` : yield dependency.
- `Depends(get_db, scope="function")` : exit before response is sent.
- `background_tasks.add_task(send_email, to)` : post-response work.
- `@app.exception_handler(RequestValidationError)` : customize 422.
- `app.add_middleware(CORSMiddleware, allow_origins=[...])` : CORS (last added = outermost).
- `curl -i localhost:8000/items/abc` : trigger/inspect 422.

## Sources
- https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/ (verified)
- https://fastapi.tiangolo.com/async/ (verified)
- https://fastapi.tiangolo.com/advanced/events/ (verified)
- https://www.starlette.dev/middleware/ (verified; www.starlette.io did not resolve)
- https://fastapi.tiangolo.com/tutorial/background-tasks/ , https://www.uvicorn.org/ , https://asgi.readthedocs.io/ (knowledge)

---------------------------------------------------------------------

# 2. Celery + Redis (FULL)

## Nodes
| id | label | role |
|---|---|---|
| app | Producer app (FastAPI) | Calls `.delay()` / `apply_async()` |
| broker | Redis (broker) | Holds queued task messages |
| worker | Celery worker | Main process + pool of child processes/threads that execute tasks |
| result | Redis (result backend) | Stores state + return value, keyed by task id |
| beat | Celery Beat | Scheduler that enqueues periodic tasks |
| client2 | Poller (client/API) | Checks `AsyncResult(id)` |

## Steps
1. app -> app | `.delay(args)` | "Your app writes a job ticket instead of doing the slow job itself." | `task.delay()` is shorthand for `apply_async(args, kwargs)`; creates a task id (UUID) and a message with headers (name, id, retries, eta).
2. app -> broker | serialized message | "The ticket is written in a plain format everyone can read and dropped in the queue." | Body serialized with `task_serializer` (JSON default since 4.0; pickle is opt-in and unsafe), LPUSHed onto a Redis list named after the queue (default `celery`).
3. app -> client2 | task id | "You immediately get a receipt number; the job isn't done yet." | `AsyncResult` returned instantly; HTTP handler typically returns 202 + task id.
4. broker -> worker | message | "A free worker picks the next ticket from the queue." | Worker's consumer prefetches messages (`worker_prefetch_multiplier` default 4 per process) via BRPOP; message is "unacked" in Redis until acknowledged.
5. worker -> worker | execute | "The worker does the job in one of its helper slots." | Pool types: `prefork` (default, multiprocessing, CPU-bound), `threads`, `gevent`/`eventlet` (I/O-bound, many tasks), `solo` (inline). `--concurrency` sets pool size (default = CPU count).
6. worker -> broker | ack | "The worker tells the queue 'I got it' so it won't be handed to someone else." | Default: ack right BEFORE execution (at-most-once-ish). With `acks_late=True`: ack AFTER execution (at-least-once).
7. worker -> result | state + return value | "The worker writes the outcome on a noticeboard under your receipt number." | Stored as a `celery-task-meta-<id>` key (state PENDING/STARTED/RETRY/SUCCESS/FAILURE); expires after `result_expires` (default 1 day).
8. client2 -> result | poll `AsyncResult(id).status` | "Later you show your receipt and ask 'is it done?'" | `.get()` blocks and should not be called inside a task; prefer polling or webhooks. Unknown ids also show PENDING.
9. beat -> broker | scheduled message | "A clock on the wall drops recurring tickets (nightly report) into the queue." | Beat is a separate single process that only enqueues messages per `beat_schedule`; run exactly one, else duplicates.

## Alternate paths
A. Failure + retry: task raises -> `self.retry(exc=e, countdown=60)` or `autoretry_for=(X,), retry_backoff=True, max_retries=5` -> republished with `ETA` -> state RETRY -> after max retries FAILURE stored.
B. Worker crash mid-task: with default early ack the task is lost. With `acks_late=True` plus `task_reject_on_worker_lost=True` the message is requeued/redelivered. Tasks must then be idempotent.
C. Visibility timeout (Redis-specific): Redis has no native ack, so Celery tracks unacked messages; if not acked within `visibility_timeout` (default 1 hour) the message is redelivered to another worker. Tasks with long ETA/countdown or runtime longer than this get duplicated.
D. Redis roles: broker (queue, lists), result backend (key/value with expiry), cache (your app's `cache-aside` keys). Same server can do all three, but use separate DB numbers or instances so eviction (`maxmemory-policy allkeys-lru`) never deletes queued tasks.

## Analogy: restaurant ticket rail / post office
Producer app = waiter writing a ticket; `.delay()` = clipping ticket to rail; Redis broker = the ticket rail; workers = cooks; acks = cook shouts "I've got order 12"; result backend = pickup shelf with numbered trays; AsyncResult = customer holding number 12; Beat = manager's alarm clock putting daily prep tickets on the rail; visibility timeout = "if nobody says they have it within an hour, assume the cook left and re-post the ticket".

## Interview Q&A
1. Q: What's the difference between broker and result backend?
 Short: Broker carries tasks to workers; result backend stores outcomes for the caller.
 Deep: They are independently configurable (`broker_url`, `result_backend`); e.g. RabbitMQ broker + Redis/DB result backend. Results are optional: `ignore_result=True` saves memory when nobody reads them.
 Red flag: "The broker stores results" / "Celery needs both".
2. Q: What does `acks_late` do and what's the trade-off?
 Short: Ack after running instead of before, giving at-least-once delivery.
 Deep: Default early ack loses the task if the worker dies mid-run. Late ack redelivers, so tasks can run twice and must be idempotent. Pair with `task_reject_on_worker_lost` (default off) because docs note workers ack on abrupt exit otherwise.
 Red flag: "Late ack gives exactly-once".
3. Q: What is visibility timeout?
 Short: Redis/SQS-only redelivery timer for unacked messages (default 1 hour).
 Deep: If a task (or ETA wait) outlives it, another worker will receive the same message, causing duplicate execution loops. Fix by raising it above the longest runtime/ETA, or avoid long ETAs and use Beat/DB schedule; value is global across apps sharing the broker (shortest wins).
 Red flag: "It's the task timeout" (that's `time_limit`).
4. Q: Which worker pool should I pick?
 Short: prefork for CPU-bound, gevent/threads for I/O-bound, solo for debugging.
 Deep: Prefork uses processes, bypassing the GIL, with memory per child (use `worker_max_tasks_per_child` to mitigate leaks). Gevent/eventlet give thousands of concurrent I/O tasks but need monkey-patch-friendly libs. Threads suit I/O with thread-safe libs.
 Red flag: "concurrency=1000 on prefork".
5. Q: How do you make a task safe to retry?
 Short: Make it idempotent.
 Deep: Use idempotency keys or "upsert" semantics, check state before side effects, and use `autoretry_for` with `retry_backoff` and `retry_jitter`. Pass IDs, not whole objects, so the task reads fresh data.
 Red flag: "Just set max_retries high".
6. Q: Why not use pickle serializer or pass ORM objects?
 Short: Security and staleness.
 Deep: Pickle deserialization executes arbitrary code if the broker is compromised; JSON default (since 4.0) is safe. ORM objects/sessions are not JSON-serializable and would be stale; pass primary keys.
 Red flag: "pickle is fine, it's internal".
7. Q: Does Celery Beat run the tasks?
 Short: No, it only enqueues them; workers execute.
 Deep: Beat is a single scheduler process; running two causes duplicate schedules. Schedules are cron/interval entries or stored in DB via django-celery-beat. Missed runs while down are not backfilled for interval schedules.
 Red flag: "Beat is a worker type" / "run beat on every node".
8. Q: Redis broker vs RabbitMQ?
 Short: Redis is simpler/faster to set up; RabbitMQ gives real acks and routing guarantees.
 Deep: Redis broker emulates acks via visibility timeout and can lose messages on crash if persistence is lax; RabbitMQ has native acknowledgments, durable queues, and richer routing. Redis is fine for many workloads if tasks are idempotent.
 Red flag: "Redis can't be a broker".
9. Q: How do you check a task's status in an API?
 Short: Return task id, then query `AsyncResult(id)`.
 Deep: Expose `GET /tasks/{id}` reading `.status`/`.result`; do not call `.get()` in request handlers (blocks workers/loop). Results expire (default 1 day) and unknown ids report PENDING, so PENDING does not prove the task exists.
 Red flag: "PENDING means it's queued".
10. Q: Why prefetch matters?
 Short: Workers reserve multiple messages ahead, causing unfair distribution for long tasks.
 Deep: Default multiplier 4 means each process reserves 4 messages; for long tasks set `worker_prefetch_multiplier=1` (and `acks_late`) so idle workers get work.
 Red flag: "Prefetch is a cache of results".

## Cheat-sheet
- `celery -A proj worker -l INFO` : start worker.
- `celery -A proj worker -P gevent -c 100` : gevent pool, 100 greenlets.
- `celery -A proj beat -l INFO` : start scheduler.
- `celery -A proj inspect active` / `inspect reserved` : see running / prefetched tasks.
- `celery -A proj status` : ping workers.
- `celery -A proj purge` : drop all queued messages (destructive).
- `add.delay(2, 3)` / `add.apply_async((2,3), countdown=10, queue="high")` : enqueue.
- `r = add.delay(2,3); r.status; r.get(timeout=5)` : result polling.
- `@app.task(bind=True, acks_late=True, autoretry_for=(IOError,), retry_backoff=True, max_retries=5)` : robust task.
- `redis-cli LLEN celery` : queue depth for the default queue.
- `redis-cli --scan --pattern 'celery-task-meta-*'` : result keys.
- `app.conf.broker_transport_options = {"visibility_timeout": 43200}` : raise visibility timeout.

## Sources
- https://docs.celeryq.dev/en/stable/getting-started/backends-and-brokers/redis.html (verified)
- https://docs.celeryq.dev/en/stable/userguide/configuration.html (verified)
- https://docs.celeryq.dev/en/stable/userguide/tasks.html , .../workers.html , .../periodic-tasks.html (knowledge)
- https://redis.io/docs/latest/develop/data-types/lists/ (knowledge)

---------------------------------------------------------------------

# 3. Git basics (FULL)

## Nodes
| id | label | role |
|---|---|---|
| wd | Working directory | Files you edit |
| idx | Staging area (index) | Snapshot you're preparing for the next commit |
| repo | Local repository (.git) | Object database: commits, trees, blobs; plus refs |
| head | HEAD + branch ref | HEAD -> branch name -> commit |
| remote | Remote (origin) | Shared repo on GitHub etc. |
| rtrack | origin/main (remote-tracking ref) | Your local bookmark of where remote's branch was last seen |

## Steps
1. wd -> wd | edit files | "You change files in your project folder. Git notices but isn't saving anything yet." | `git status` shows modified/untracked; nothing recorded.
2. wd -> idx | `git add file` | "You choose which changes go in the next save, like putting items in a box." | Writes blob objects for file contents and updates `.git/index` to the new snapshot.
3. idx -> repo | `git commit -m` | "You seal the box and label it. Now it's a permanent snapshot." | Creates a tree object from the index, then a commit object (tree + parent + author + message), identified by SHA hash.
4. repo -> head | branch moves | "The 'you are here' marker advances to the new snapshot." | HEAD is a symbolic ref (`ref: refs/heads/main`); the branch file under refs/heads gets the new commit SHA.
5. repo -> remote | `git push` | "You upload your new snapshots to the shared copy." | Sends missing objects, then asks the remote to fast-forward `refs/heads/main`; rejected if remote has commits you lack.
6. remote -> rtrack | `git fetch` | "You download what teammates did, without touching your own files." | Fetches objects and updates `refs/remotes/origin/*`; working dir and your branches untouched.
7. rtrack -> repo | `git merge origin/main` | "You combine their work into yours." | Creates a merge commit (two parents) or fast-forwards the branch pointer if there's no divergence.
8. rtrack -> repo | `git rebase origin/main` | "Alternative: replay your work on top of theirs for a straight line of history." | Re-creates your commits with new parents/SHAs; history is rewritten, so don't rebase shared/published commits.
9. remote -> wd | `git pull` | "Pull is fetch + merge in one move." | `git pull` = `git fetch` + `git merge` (or rebase with `--rebase` / `pull.rebase=true`); updates working dir.

## Alternate paths
A. Detached HEAD: `git checkout <sha|tag|origin/main>` -> HEAD holds a SHA directly, new commits aren't on any branch; save with `git switch -c newbranch` or they become unreachable and are eventually GC'd (reflog keeps them ~90 days default for reachable-by-reflog entries).
B. Merge conflict: both sides changed same lines -> conflict markers `<<<<<<<`; edit, `git add`, `git commit` (or `git rebase --continue`).
C. Push rejected (non-fast-forward): fetch + integrate, then push. `--force-with-lease` if you intentionally rewrote history.
D. Undo ladder: `restore` (working file), `restore --staged` (unstage), `commit --amend`, `revert` (safe, new commit), `reset` (move branch; --hard discards), `reflog` (rescue).

## Analogy: writing a book with an editor / photo album
Working directory = your messy desk; staging = the tray where you arrange items to photograph; commit = taking the photo and adding it to the album (each with a caption and a reference to the previous photo); branch = a sticky note on a photo; HEAD = your finger on "the photo I'm adding to next"; remote = the shared family album in the cloud; origin/main = your note of what the cloud album looked like last time you checked; fetch = look at cloud album's latest pages; pull = look and immediately glue them in.

## Interview Q&A
1. Q: What does HEAD actually point to?
 Short: Usually to a branch name, which points to a commit.
 Deep: `.git/HEAD` contains `ref: refs/heads/main` (symbolic ref). A branch file holds a commit SHA. Checking out a commit/tag leaves HEAD holding a raw SHA (detached). Committing moves the branch HEAD refers to, not HEAD itself.
 Red flag: "HEAD is the latest commit on the remote" or "HEAD is a copy of the code".
2. Q: fetch vs pull?
 Short: fetch downloads; pull downloads and integrates.
 Deep: Fetch updates remote-tracking refs (`origin/main`) only and is always safe. Pull = fetch + merge (or rebase), which can alter your branch and working tree and cause conflicts. Many seniors prefer fetch then inspect (`git log main..origin/main`).
 Red flag: "They are the same" or "fetch deletes local changes".
3. Q: What is a branch?
 Short: A movable pointer to a commit.
 Deep: A 41-byte file in `.git/refs/heads/`. That's why branching is cheap. History is a DAG of immutable commits.
 Red flag: "A branch is a copy of all files".
4. Q: Staging area: why does it exist?
 Short: Lets you compose commits from part of your changes.
 Deep: The index is the proposed next snapshot. `git add -p` stages hunks so unrelated edits can be separate commits. `git diff` compares working vs index; `git diff --staged` index vs HEAD.
 Red flag: "It's just a temporary backup".
5. Q: Merge vs rebase?
 Short: Merge preserves history with a merge commit; rebase rewrites it linear.
 Deep: Rebase creates new commits with new SHAs, so never rebase commits others have based work on (golden rule in Pro Git). Merge is non-destructive; rebase gives a cleaner log. Squash merge collapses a branch into one commit.
 Red flag: "Rebase is just a faster merge" or "rebase is always safe".
6. Q: What is a commit physically?
 Short: An immutable object with a tree, parent(s), author, message.
 Deep: Content-addressed by SHA hash (SHA-1, SHA-256 optional) of its contents. Changing anything (including parent) changes the hash, which is why rebase/amend produce new commits.
 Red flag: "A commit stores a diff". (Git stores snapshots; diffs are computed. Packfiles use deltas as storage optimization.)
7. Q: How do you undo a pushed bad commit?
 Short: `git revert`.
 Deep: Revert adds a new commit inverting the change, safe on shared branches. Reset+force-push rewrites shared history and breaks teammates.
 Red flag: "reset --hard and force push to main".
8. Q: What does `git reset --soft/--mixed/--hard` do?
 Short: Moves the branch; soft keeps index+files, mixed resets index, hard resets files too.
 Deep: All three move the current branch to the target; they differ in how far the change propagates to index and working tree. `--hard` discards uncommitted work, recoverable only for committed states via reflog.
 Red flag: "reset deletes commits permanently".
9. Q: What is `origin/main`?
 Short: Your local snapshot of the remote's main branch.
 Deep: A remote-tracking ref, updated only on fetch/pull/push; it can be stale. You can't commit onto it directly.
 Red flag: "It is live on GitHub".
10. Q: What's `git reflog`?
 Short: Local log of where HEAD/branches have been.
 Deep: Lets you recover from bad resets/rebases by finding old SHAs. Local only, not pushed, entries expire.
 Red flag: "git log shows the same".

## Cheat-sheet
- `git status -sb` : short status with branch.
- `git add -p` : stage hunks interactively.
- `git commit -m "feat(x): ..."` : commit staged snapshot.
- `git switch -c feature/x` : create+switch branch.
- `git fetch --prune` : update remote refs, drop deleted ones.
- `git pull --rebase` : fetch and replay local commits on top.
- `git log --oneline --graph --decorate --all` : see the DAG.
- `git diff --staged` : what will be committed.
- `git restore --staged <file>` : unstage.
- `git revert <sha>` : safe undo.
- `git reflog` : find lost commits.
- `git push --force-with-lease` : safer forced push after rebase.
- `cat .git/HEAD` : see what HEAD points to.

## Sources
- https://git-scm.com/book/en/v2/Git-Internals-Git-References (verified)
- https://git-scm.com/book/en/v2/Git-Branching-Rebasing , https://git-scm.com/docs/git-pull , https://git-scm.com/docs/git-fetch (knowledge)

---------------------------------------------------------------------

# 4. HTTP request journey (OUTLINE)

## Nodes
Browser; DNS resolver; Load balancer; Nginx; App server (Uvicorn/FastAPI); Database.

## Steps
1. Browser -> DNS | "example.com?" | "Browser asks the internet's phone book for the building's address." | Checks caches (browser, OS), then recursive resolver -> root -> TLD -> authoritative NS; returns A/AAAA record with TTL.
2. Browser -> LB | TCP SYN / SYN-ACK / ACK | "A three-way hello opens a line to the server." | TCP 3-way handshake to IP:443 (HTTP/3 uses QUIC over UDP instead).
3. Browser <-> LB | TLS handshake | "They agree on a secret code so nobody can eavesdrop." | TLS 1.3: ClientHello (SNI), ServerHello + certificate, key exchange, then encrypted application data; cert chain validated against trust store.
4. Browser -> LB | HTTP request (GET /api/items) | "Now the actual question is sent." | HTTP/1.1, /2 or /3 request: method, path, headers, optional body.
5. LB -> Nginx | forwarded request | "A receptionist routes to a free branch." | L4 or L7 LB picks a backend (round-robin/least-conn); may terminate TLS and add `X-Forwarded-For`.
6. Nginx -> App | proxied request | "Nginx serves simple files itself and passes real questions to the app." | `proxy_pass` to upstream; static files from disk; sets Host/X-Forwarded-* headers.
7. App -> DB | SQL query | "The app asks the database for the data." | Pooled connection, parameterized query, result rows returned.
8. App -> Browser | response (200 + JSON) | "The answer travels back the same road." | App -> Nginx -> LB -> browser; status, headers (Cache-Control), body; browser may reuse the TCP/TLS connection (keep-alive).

## Alternate: DNS/cache hit skips steps 1-3 partly; 502/504 when upstream is down/slow; HTTP redirect 301 http->https.

## Analogy: mailing a letter to a company
Browser = you; DNS = directory assistance giving the street address; TCP/TLS = phoning ahead and agreeing a code; LB = building's reception desk; Nginx = mailroom (handles flyers itself, forwards real requests); app server = the department; DB = filing cabinet.

## Interview Q&A
1. Q: What happens when you type a URL and press Enter?
 Short: DNS -> TCP -> TLS -> HTTP -> server processing -> render.
 Deep: Include caches at each layer, redirects, and that the browser then parses HTML and issues more requests for assets. Mention HTTP/2 multiplexing and HTTP/3 over QUIC.
 Red flag: Skipping DNS/TLS or saying "the browser connects straight to the database".
2. Q: Difference between L4 and L7 load balancer?
 Short: L4 balances TCP connections; L7 understands HTTP.
 Deep: L7 can route by path/host/header, terminate TLS, and retry; L4 is faster and protocol-agnostic. Health checks remove dead backends.
 Red flag: "A load balancer stores user sessions".
3. Q: What does TLS provide?
 Short: Encryption, integrity, and server authentication.
 Deep: Certificate chain proves domain ownership via a CA; asymmetric crypto sets up a shared session key, then fast symmetric encryption is used.
 Red flag: "HTTPS encrypts data with the server's public key for the whole session".
4. Q: 502 vs 504?
 Short: 502 bad response from upstream; 504 upstream timed out.
 Deep: Both are gateway/proxy errors: 502 often means the app crashed/refused connection, 504 means it was too slow (raise `proxy_read_timeout` or fix the slowness).
 Red flag: "502 means the client's fault".
5. Q: Why is the client IP wrong in my app behind a proxy?
 Short: Proxy's IP is seen; read `X-Forwarded-For` from a trusted proxy.
 Deep: Configure Uvicorn `--proxy-headers`/`--forwarded-allow-ips` or middleware; never trust the header from the open internet (spoofable).
 Red flag: "Just read X-Forwarded-For directly".

## Cheat-sheet
- `dig +trace example.com` : follow DNS resolution.
- `curl -v https://example.com` : see TCP/TLS/HTTP details.
- `curl -I https://example.com` : headers only.
- `curl --resolve example.com:443:1.2.3.4 https://example.com` : bypass DNS.
- `openssl s_client -connect example.com:443 -servername example.com` : inspect cert.
- `nslookup example.com` : quick DNS.
- `traceroute example.com` : path.
- Browser DevTools -> Network -> Timing : DNS/connect/TLS/TTFB breakdown.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview , https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work (knowledge)
- RFC 9110 (HTTP semantics), RFC 8446 (TLS 1.3), RFC 1035 (DNS) (knowledge)
- https://nginx.org/en/docs/ (knowledge)

---------------------------------------------------------------------

# 5. REST basics (OUTLINE)

## Nodes
Client; Resource URL; Server/API; Data store; Status code response.

## Steps
1. Client -> API | `GET /users/42` | "Ask for one user by their address." | Safe, idempotent read; no body; cacheable.
2. API -> DB | read | "Server looks the user up." | Query by id.
3. API -> Client | 200 + JSON (or 404) | "Returns the user, or says 'doesn't exist'." | 200 OK; 404 Not Found if missing.
4. Client -> API | `POST /users` + JSON | "Create a new user." | Non-idempotent create; server assigns id.
5. API -> Client | 201 Created + `Location: /users/43` | "Confirms creation and tells you where it lives." | 201 with Location header; 422/400 on invalid body; 409 on conflict.
6. Client -> API | `PUT /users/43` / `PATCH` | "Replace everything, or change just a few fields." | PUT = full replacement (idempotent); PATCH = partial (not guaranteed idempotent).
7. Client -> API | `DELETE /users/43` | "Remove it." | Idempotent; 204 No Content (second call may return 404 but state is the same).

## Alternate: auth failure 401 (not authenticated) vs 403 (authenticated but forbidden); server bug 500; rate limit 429.

## Analogy: library
Resources = books with call numbers (URLs); GET = read at the desk; POST = donate a new book; PUT = replace the book with a new edition; PATCH = fix a typo; DELETE = remove from the shelf; status codes = librarian's reply.

## Interview Q&A
1. Q: What is idempotency and which methods have it?
 Short: Repeating the request has the same effect as once; GET, PUT, DELETE, HEAD, OPTIONS are idempotent.
 Deep: POST and PATCH are not guaranteed idempotent. Idempotency keys (`Idempotency-Key` header) make POST retry-safe (payments). Per RFC 9110 idempotency is about intended server state, not identical responses.
 Red flag: "Idempotent means same response every time" or "DELETE must always return 200".
2. Q: PUT vs PATCH vs POST?
 Short: PUT replaces at a known URL, PATCH partially updates, POST creates/acts on a collection.
 Deep: PUT on a missing resource may create. Use POST for non-CRUD actions or when the server assigns the id.
 Red flag: "PUT and POST are interchangeable".
3. Q: 401 vs 403?
 Short: 401 = who are you? 403 = you're not allowed.
 Deep: 401 should include `WWW-Authenticate`. Return 404 instead of 403 to avoid leaking existence if needed.
 Red flag: "401 means forbidden".
4. Q: What makes an API RESTful?
 Short: Resource-oriented URLs, uniform interface via HTTP verbs, stateless requests.
 Deep: Statelessness means each request carries what the server needs (token); hypermedia (HATEOAS) is the rarely-implemented top level. Nouns in URLs, plural collections, proper status codes, pagination, versioning.
 Red flag: "REST = JSON over HTTP" or verbs in URL (`/getUser`).
5. Q: Which status code for validation failure?
 Short: 400 or 422; FastAPI uses 422.
 Deep: 422 Unprocessable Content = syntactically valid but semantically invalid; 400 for malformed syntax. Be consistent and return field-level errors.
 Red flag: "Always return 200 with an error field".

## Cheat-sheet
- `curl -X POST localhost:8000/users -H 'Content-Type: application/json' -d '{"name":"A"}'` : create.
- `curl -i localhost:8000/users/42` : see status + headers.
- `curl -X PATCH .../users/42 -d '{"name":"B"}'` : partial update.
- `curl -X DELETE -i .../users/42` : delete.
- `curl -H "Authorization: Bearer $TOKEN" ...` : authenticated call.
- Status groups: 2xx ok, 3xx redirect, 4xx client error, 5xx server error.
- `GET /items?limit=20&cursor=abc` : pagination pattern.
- `HEAD`/`OPTIONS` : metadata / CORS preflight.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods , .../Status , .../Glossary/Idempotent ; RFC 9110 (knowledge)

---------------------------------------------------------------------

# 6. Auth: JWT and OAuth 2.0 Authorization Code (+PKCE) (OUTLINE)

## Nodes
User (resource owner); Client app; Authorization server; Resource server (API); Browser.

## Steps (Auth Code + PKCE)
1. Client -> Client | generate `code_verifier`, `code_challenge = BASE64URL(SHA256(verifier))` | "App makes a secret and a fingerprint of it." | RFC 7636: verifier 43-128 chars, random per request; S256 method.
2. Client -> AuthZ (via browser redirect) | `/authorize?response_type=code&client_id&redirect_uri&scope&state&code_challenge&code_challenge_method=S256` | "The app sends you to the login page of the identity provider." | `state` prevents CSRF; redirect_uri must exactly match a registered one.
3. User -> AuthZ | login + consent | "You log in and agree to share specific things." | Credentials only go to the AuthZ server, never to the client app.
4. AuthZ -> Client (redirect) | `?code=...&state=...` | "You're sent back to the app with a one-time ticket." | Short-lived, single-use authorization code in the front channel.
5. Client -> AuthZ (back channel) | `POST /token` with code + `code_verifier` | "App swaps the ticket for real keys, proving it's the same app by revealing the secret." | AuthZ hashes verifier and compares to challenge; stolen code is useless without it.
6. AuthZ -> Client | access token (+ refresh token, id_token if OIDC) | "App receives a short-lived pass." | Access token often a JWT, 5-60 min; refresh token longer-lived, rotate it.
7. Client -> API | `Authorization: Bearer <JWT>` | "App shows the pass at each request." | API validates signature (JWKS), `exp`, `iss`, `aud`, scopes; no session lookup needed.

## JWT structure: header.payload.signature (Base64URL, dot-separated). Signed (JWS), not encrypted: anyone can read the payload.
## Alternate: expired access token -> 401 -> client uses refresh token at /token (grant_type=refresh_token); invalid state/redirect -> error redirect; revoked/blacklisted tokens need a denylist or short TTL.

## Analogy: hotel key card
You (user) vouch at the front desk (authZ server) with ID; desk gives a key card (access token) to the valet app (client) without sharing your passport; each door (API) reads the card's stripe and expiry. PKCE = the valet writes a secret code on a sealed note first, so a thief who snatches the claim ticket can't collect the card.

## Interview Q&A
1. Q: Is a JWT encrypted?
 Short: No, normally only signed.
 Deep: Header and payload are Base64URL-encoded JSON; integrity comes from the signature (HS256 shared secret or RS256/ES256 key pair). Never put secrets in it. JWE exists for encrypted tokens.
 Red flag: "JWT is encrypted so I can store the password".
2. Q: Why PKCE if I have a client secret?
 Short: Public clients (SPA/mobile) can't keep secrets; PKCE binds the code to the client that started the flow.
 Deep: It blocks authorization-code interception. OAuth 2.1 and current best practice recommend PKCE for all clients including confidential ones.
 Red flag: "PKCE encrypts the code".
3. Q: OAuth 2.0 vs OIDC?
 Short: OAuth = delegated authorization; OIDC adds authentication/identity (id_token).
 Deep: OAuth access tokens say what the bearer may do; ID token says who logged in. Don't use an access token as proof of identity for your own login.
 Red flag: "OAuth is a login protocol".
4. Q: Where to store tokens in a browser?
 Short: Prefer HttpOnly, Secure, SameSite cookies (or in-memory) over localStorage.
 Deep: localStorage is readable by any XSS. Cookies need CSRF protection (SameSite, CSRF token). Refresh tokens: rotate and bind where possible.
 Red flag: "localStorage is fine, it's convenient".
5. Q: How do you invalidate a JWT?
 Short: You mostly can't; use short expiry plus refresh and a denylist for emergencies.
 Deep: Stateless validation trades revocation for scalability. Use `jti` denylist, short TTL, key rotation, or opaque tokens with introspection when instant revocation matters. Also pin accepted algorithms (reject `alg: none`).
 Red flag: "Delete it on the server and it's gone".

## Cheat-sheet
- `echo $JWT | cut -d. -f2 | base64 -d` : peek at payload (may need padding).
- jwt.io debugger : decode (never paste prod tokens).
- `curl -H "Authorization: Bearer $T" https://api/..` : call with token.
- `curl -X POST $TOKEN_URL -d grant_type=authorization_code -d code=... -d code_verifier=... -d client_id=... -d redirect_uri=...` : token exchange.
- `openssl rand -base64 64 | tr -d '=+/' | cut -c1-64` : generate code_verifier.
- `printf %s "$V" | openssl dgst -sha256 -binary | basenc --base64url | tr -d '='` : S256 challenge.
- FastAPI: `OAuth2PasswordBearer(tokenUrl="token")` + `jwt.decode(token, key, algorithms=["HS256"])` : verify.
- Claims to check: `exp`, `nbf`, `iss`, `aud`, `sub`, scopes.

## Sources
- https://www.rfc-editor.org/rfc/rfc7636 (verified)
- https://datatracker.ietf.org/doc/html/rfc6749 , https://datatracker.ietf.org/doc/html/rfc7519 , https://jwt.io/introduction , https://oauth.net/2/pkce/ (knowledge)

---------------------------------------------------------------------

# 7. Redis deep-dive (OUTLINE)

## Nodes
App; Redis (in-memory); Database (source of truth); Disk (RDB/AOF); Subscriber(s).

## Steps (cache-aside + extras)
1. App -> Redis | `GET user:42` | "Check the quick-access shelf first." | O(1) key lookup in memory, single-threaded command execution.
2. Redis -> App | miss (nil) | "Not there." | Cache miss.
3. App -> DB | SELECT | "Go to the slow archive." | Source of truth query.
4. App -> Redis | `SET user:42 <json> EX 300` | "Put a copy on the shelf with a 5-minute expiry." | TTL enforces freshness; invalidate (DEL) on writes.
5. App -> Redis | next `GET` hit | "Next time it's instant." | Hit avoids DB; track `keyspace_hits/misses`.
6. Redis -> Redis | eviction | "If the shelf is full, throw out the least-used item." | `maxmemory` + `maxmemory-policy` (e.g. `allkeys-lru`); default `noeviction` returns errors on writes at limit.
7. Redis -> Disk | RDB snapshot / AOF append | "Optionally write a backup so a restart doesn't lose everything." | RDB: fork + point-in-time dump.rdb; AOF: log of writes, fsync everysec default.
8. App -> Redis -> Subscribers | `PUBLISH chan msg` | "Shout a message; whoever is listening hears it." | Pub/sub is fire-and-forget (no persistence/replay); use Streams for durable messaging.

## Data structures: String, List, Hash, Set, Sorted Set, Stream, Bitmap, HyperLogLog, Geo; JSON/search via Redis modules/Stack.

## Alternate: stampede (many misses at once on expiry) -> locking/request coalescing/jittered TTL; stale cache after DB write -> delete-on-write; Redis restart with no persistence -> cold cache.

## Analogy: kitchen counter vs pantry
Redis = the counter where frequently used ingredients sit; DB = the pantry; cache-aside = cook checks counter first and restocks from pantry; TTL = "use by" label; eviction = clearing counter space for newer items; AOF/RDB = taking a photo of the counter vs writing a log of every move; pub/sub = intercom announcement.

## Interview Q&A
1. Q: Explain cache-aside.
 Short: App checks cache, on miss loads from DB and populates the cache.
 Deep: App owns the logic (vs read-through/write-through where cache layer does). Invalidate or TTL on updates; risk of stale data and stampedes.
 Red flag: "Redis automatically syncs with the database".
2. Q: RDB vs AOF?
 Short: RDB = periodic snapshots; AOF = write log with fsync policy.
 Deep: RDB is compact and fast to restart but can lose minutes. AOF `everysec` (default) loses at most about 1 second; Redis docs suggest using both for PostgreSQL-like safety. Since 7.0 AOF is multi-part (base+incr+manifest). If both enabled, AOF is used at restart.
 Red flag: "Redis is purely in-memory, no persistence" (outdated) or "RDB is lossless".
3. Q: What happens at maxmemory?
 Short: Depends on `maxmemory-policy`; default noeviction errors on writes.
 Deep: LRU/LFU are approximated by sampling (`maxmemory-samples`). `volatile-*` policies only evict keys with TTL and act like noeviction if none have one. For a pure cache use `allkeys-lru`/`allkeys-lfu`.
 Red flag: "Redis always evicts the oldest key".
4. Q: Pub/sub vs Streams?
 Short: Pub/sub is transient; Streams persist with consumer groups.
 Deep: Subscribers that are offline miss messages; no acks. Streams provide IDs, history, acks and consumer groups.
 Red flag: "Pub/sub guarantees delivery".
5. Q: Why is Redis fast, and is it single-threaded?
 Short: In-memory, efficient structures, single-threaded command execution (I/O threads optional).
 Deep: One long command (`KEYS *`, big `SMEMBERS`) blocks everyone; use `SCAN`. Scale via replicas, Cluster sharding.
 Red flag: "Use KEYS in production to list keys".

## Cheat-sheet
- `redis-cli ping` : health.
- `SET k v EX 60` / `GET k` / `TTL k` : basic + expiry.
- `HSET user:1 name A` / `HGETALL user:1` : hash.
- `ZADD lb 100 alice` / `ZRANGE lb 0 -1 WITHSCORES` : sorted set.
- `SCAN 0 MATCH user:* COUNT 100` : safe key iteration.
- `INFO memory` / `INFO stats` : memory, hits/misses.
- `CONFIG SET maxmemory 256mb` + `CONFIG SET maxmemory-policy allkeys-lru` : cap + eviction.
- `SUBSCRIBE news` / `PUBLISH news hi` : pub/sub.
- `BGSAVE` / `BGREWRITEAOF` : manual persistence.
- `redis-cli --latency` / `MONITOR` : diagnose (MONITOR is heavy).

## Sources
- https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/ (verified)
- https://redis.io/docs/latest/develop/reference/eviction/ (verified)
- https://redis.io/docs/latest/develop/data-types/ , .../pubsub/ (knowledge)

---------------------------------------------------------------------

# 8. Databases: indexes, transactions, N+1 (OUTLINE)

## Nodes
App/ORM; Query planner; Index (B-tree); Table (heap); Transaction/WAL.

## Steps
1. App -> Planner | `SELECT ... WHERE email='a@b.c'` | "App asks a question." | Parser -> planner chooses seq scan vs index scan via statistics (`EXPLAIN`).
2. Planner -> Table | no index: full scan | "Without an index the database reads every row, like flipping every page of a book." | Seq scan, O(n).
3. Planner -> Index | with index | "With an index it jumps straight to the right spot like a book's index." | B-tree lookup O(log n), then fetch heap row (or index-only scan).
4. App -> DB | `BEGIN` ... `UPDATE`s ... `COMMIT` | "Several changes are grouped so they all succeed or none do." | Atomicity via WAL: changes are logged before applying; COMMIT flushes WAL; ROLLBACK discards.
5. DB <-> DB | isolation | "Concurrent users don't see each other's half-finished work." | PostgreSQL MVCC: snapshots; default READ COMMITTED; also REPEATABLE READ, SERIALIZABLE.
6. App -> DB | N+1 pattern | "App asks 1 question for the list, then 1 more question per item: 101 trips instead of 1 or 2." | ORM lazy loads in a loop; fix with JOIN or `selectinload`/`joinedload` (SQLAlchemy), `select_related/prefetch_related` (Django).
7. DB -> App | result | "Rows return." | Use pooling and pagination.

## Alternate: deadlock -> one transaction aborted; write-heavy tables suffer from too many indexes; low-selectivity column index ignored by planner; leading-column rule for composite indexes.

## Analogy: library
Table = shelves of books; B-tree index = card catalog; transaction = checking out a stack of books at once or none; isolation = separate readers not seeing half-finished returns; N+1 = walking to the shelf 100 times for 100 books instead of carrying a trolley.

## Interview Q&A
1. Q: How does a B-tree index speed up queries and what's the cost?
 Short: Sorted balanced tree gives O(log n) lookups/range scans; costs write time and space.
 Deep: Every INSERT/UPDATE/DELETE must maintain indexes. Composite index `(a,b)` helps queries on `a` or `a,b`, not `b` alone. Functions on the column (`lower(email)`) bypass a plain index unless an expression index exists.
 Red flag: "Index every column".
2. Q: Explain ACID.
 Short: Atomicity, Consistency, Isolation, Durability.
 Deep: Atomic all-or-nothing; consistent = constraints preserved; isolated = concurrent txns behave as if serial (to a chosen level); durable = committed data survives crash (WAL fsync).
 Red flag: "Consistency means all replicas agree" (that's CAP/replication).
3. Q: Isolation levels and anomalies?
 Short: Higher levels prevent dirty reads, non-repeatable reads, phantoms at more cost.
 Deep: PostgreSQL never allows dirty reads (READ UNCOMMITTED behaves as READ COMMITTED); REPEATABLE READ uses a snapshot per transaction; SERIALIZABLE (SSI) may abort with serialization failure, so apps must retry.
 Red flag: "Postgres READ UNCOMMITTED shows uncommitted rows".
4. Q: What's the N+1 problem and fix?
 Short: One query for parents plus one per child.
 Deep: Spot via query logs/APM; fix with eager loading (`selectinload` issues one extra `IN` query, `joinedload` one JOIN) or batching. In async SQLAlchemy lazy loading even raises errors, so eager load explicitly.
 Red flag: "Just add an index".
5. Q: How to read EXPLAIN?
 Short: Shows the chosen plan and costs; `EXPLAIN ANALYZE` runs it for real timing.
 Deep: Look for Seq Scan on large tables, row estimate vs actual mismatches (stale stats -> `ANALYZE`), and nested loops with high loops count.
 Red flag: "EXPLAIN just shows the SQL".

## Cheat-sheet
- `EXPLAIN (ANALYZE, BUFFERS) SELECT ...;` : real plan + timings.
- `CREATE INDEX CONCURRENTLY idx_users_email ON users(email);` : build without blocking writes.
- `CREATE UNIQUE INDEX ... ON users (lower(email));` : expression unique index.
- `BEGIN; ... COMMIT; / ROLLBACK;` : transaction.
- `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;` : isolation.
- `SELECT ... FOR UPDATE;` : row lock.
- `\d+ tablename` (psql) : schema + indexes.
- `SELECT * FROM pg_stat_activity;` : running queries/locks.
- SQLAlchemy: `select(User).options(selectinload(User.orders))` : avoid N+1.
- `ANALYZE tablename;` : refresh planner stats.

## Sources
- https://www.postgresql.org/docs/current/indexes-types.html , .../transaction-iso.html , .../using-explain.html (knowledge)
- https://docs.sqlalchemy.org/en/20/orm/queryguide/relationships.html (knowledge)

---------------------------------------------------------------------

# 9. Docker (OUTLINE)

## Nodes
Dockerfile; Docker daemon/CLI; Image (layers); Registry; Container; Volume/Network.

## Steps
1. Dev -> Dockerfile | write recipe | "You write a recipe: start from Python, copy my code, install packages, run the app." | `FROM`, `COPY`, `RUN`, `CMD`.
2. Dockerfile -> Image | `docker build -t app .` | "Docker follows the recipe and freezes the result into a reusable package." | Each instruction makes a read-only layer; unchanged layers are cached, so order for cache (deps before code).
3. Image -> Registry | `docker push` | "Upload the package to a shared shelf (Docker Hub, GHCR)." | Tag `repo:tag`, content digest `sha256:...`; layers deduplicated.
4. Registry -> Host | `docker pull` | "Another machine downloads it." | Only missing layers fetched.
5. Image -> Container | `docker run` | "Start a running copy of the package." | Adds a thin writable layer, namespaces + cgroups isolation; shares the host kernel (not a VM).
6. Container <-> Volume | `-v data:/var/lib/...` | "Important files live outside the box so they survive deleting it." | Container's writable layer is deleted with the container; named volumes/bind mounts persist.
7. Container <-> Network | `-p 8000:8000`, user-defined network | "Doors to the outside world and to neighbouring containers." | Port publishing maps host:container; containers on same user-defined bridge resolve each other by name.

## Alternate: build failure at a layer; image is "Image vs Container" confusion (image = class, container = instance); multi-stage builds shrink final images.

## Analogy: shipping container / meal kit
Dockerfile = recipe card; image = sealed meal kit; registry = supermarket; container = the meal being cooked; volume = fridge/ leftovers box outside the kitchen; network = the pass-through window between kitchens.

## Interview Q&A
1. Q: Image vs container?
 Short: Image is the read-only template, container is a running instance.
 Deep: Many containers can share one image; each gets its own writable layer. Deleting a container deletes that layer.
 Red flag: "Container is a lightweight VM with its own kernel".
2. Q: How do layers and caching work?
 Short: Each instruction creates a layer; unchanged prefix layers are reused.
 Deep: Copy `requirements.txt` and install before copying source so code edits don't invalidate dependency layers. Changing an early layer invalidates all later ones.
 Red flag: "COPY . . first then pip install".
3. Q: CMD vs ENTRYPOINT?
 Short: ENTRYPOINT is the fixed executable; CMD is default args.
 Deep: Use exec form (`["uvicorn", ...]`) so the app is PID 1 and receives SIGTERM for graceful shutdown; shell form wraps in `/bin/sh -c`.
 Red flag: "They're identical".
4. Q: Where does data persist?
 Short: In volumes or bind mounts, not the container layer.
 Deep: Named volumes managed by Docker; bind mounts map host paths (great for dev). `docker rm` doesn't remove named volumes unless `-v`.
 Red flag: "Data stays in the container forever".
5. Q: How do containers differ from VMs?
 Short: They share the host kernel; VMs run a full guest OS.
 Deep: Containers use Linux namespaces (isolation) and cgroups (resource limits); start in milliseconds, smaller, weaker isolation boundary.
 Red flag: "Docker virtualizes hardware".

## Cheat-sheet
- `docker build -t myapp:1.0 .` : build.
- `docker run -d --name api -p 8000:8000 --env-file .env myapp:1.0` : run detached.
- `docker ps -a` : list containers.
- `docker logs -f api` : follow logs.
- `docker exec -it api sh` : shell inside.
- `docker images` / `docker image prune` : manage images.
- `docker volume create data` / `docker run -v data:/data ...` : volume.
- `docker network create net` / `--network net` : custom network.
- `docker push ghcr.io/user/myapp:1.0` : publish.
- `docker system df` : disk usage.
- `docker stop api && docker rm api` : stop+remove.

## Sources
- https://docs.docker.com/get-started/docker-concepts/ , https://docs.docker.com/build/cache/ , https://docs.docker.com/engine/storage/volumes/ , https://docs.docker.com/engine/network/ (knowledge)

---------------------------------------------------------------------

# 10. Docker Compose (OUTLINE)

## Nodes
compose.yaml; api; db (Postgres); redis; worker (Celery); (volumes/network).

## Steps
1. Dev -> compose | `docker compose up` | "One command starts the whole team of services." | Reads `compose.yaml`, creates a default project network and volumes.
2. compose -> db, redis | start first | "The database and Redis start first because others need them." | `depends_on` with `condition: service_healthy` waits for healthchecks (`pg_isready`).
3. compose -> api | start api | "Then the API starts and finds the database simply by the name `db`." | Service name = DNS hostname on the project network: `postgresql://user:pw@db:5432/app`, `redis://redis:6379`.
4. compose -> worker | start worker | "The worker uses the same code but a different command." | Same image, `command: celery -A app.worker worker`.
5. User -> api | browser to `localhost:8000` | "Only the API is exposed to your laptop." | `ports: "8000:8000"` publishes; db/redis stay internal (no ports).
6. api -> redis -> worker | enqueue and process | "The API drops jobs in Redis; the worker picks them up." | Container-to-container traffic uses container port, not the published port.
7. db -> volume | `pgdata:/var/lib/postgresql/data` | "Database files live in a named volume, so `down` doesn't erase them." | `docker compose down -v` deletes volumes.

## Alternate: `localhost` inside a container means itself, not the host/other services (classic bug); plain `depends_on` only waits for container start, not readiness; env-specific overrides with `compose.override.yaml`.

## Analogy: film set call sheet
compose file = call sheet; each service = a crew member with a role; service names = everyone's walkie-talkie callsign; depends_on+healthcheck = "don't start filming until lighting says ready"; volume = the footage drive that survives wrap.

## Interview Q&A
1. Q: How do services find each other?
 Short: By service name via Compose's DNS on a shared network.
 Deep: Compose creates one network per project and registers each service name (and aliases) as a hostname. Use container port (5432), not published host port.
 Red flag: "Use localhost" or "hardcode container IPs".
2. Q: Does `depends_on` wait for the DB to be ready?
 Short: Not by default; only start order.
 Deep: Docs say Compose waits until a container is running, not "ready". Use `condition: service_healthy` with a `healthcheck`, and still make the app retry connections on startup.
 Red flag: "depends_on guarantees the DB accepts connections".
3. Q: `ports` vs `expose`?
 Short: `ports` publishes to the host; `expose` only documents the port to other containers.
 Deep: Containers on the same network can reach each other's ports without either. Don't publish db/redis in prod.
 Red flag: "Need `ports` for services to talk".
4. Q: How does data persist and how to reset?
 Short: Named volumes; `docker compose down -v` wipes them.
 Deep: `down` removes containers/networks but keeps volumes by default. Bind mounts in dev give live-reload.
 Red flag: "`down` deletes my database".
5. Q: Compose vs Kubernetes?
 Short: Compose = single-host dev/small deploys; Kubernetes = multi-node orchestration.
 Deep: Compose lacks self-healing across nodes, rolling updates, autoscaling.
 Red flag: "Compose is Kubernetes-lite that scales across servers".

## Cheat-sheet
- `docker compose up -d --build` : build and start in background.
- `docker compose ps` : service status.
- `docker compose logs -f api worker` : follow logs.
- `docker compose exec db psql -U app` : shell into a service.
- `docker compose run --rm api pytest` : one-off command.
- `docker compose down` / `down -v` : stop (and delete volumes).
- `docker compose config` : render merged config.
- `docker compose up -d --scale worker=3` : scale workers.
- Healthcheck: `test: ["CMD-SHELL","pg_isready -U app"]` : readiness.
- `depends_on: db: {condition: service_healthy}` : wait for health.

## Sources
- https://docs.docker.com/compose/how-tos/startup-order/ (verified)
- https://docs.docker.com/compose/how-tos/networking/ , https://docs.docker.com/reference/compose-file/ (knowledge)

---------------------------------------------------------------------

# 11. CI/CD pipeline (OUTLINE)

## Nodes
Developer; Git host (GitHub); Runner; Artifact/registry; Deploy target (staging/prod).

## Steps
1. Dev -> GitHub | `git push` / open PR | "You upload changes." | Triggers events (`push`, `pull_request`, `schedule`, `workflow_dispatch`) matching `on:` in `.github/workflows/*.yml`.
2. GitHub -> Runner | job queued | "GitHub rents a fresh computer for the job." | Each job runs on its own runner (`runs-on: ubuntu-latest`), a clean VM; jobs run in parallel unless `needs:`.
3. Runner | checkout + build | "It downloads your code and builds it." | Steps: `actions/checkout`, setup language, install deps (with cache).
4. Runner | test + lint | "It runs the tests to catch mistakes." | Failing step fails the job and blocks merge if it's a required check.
5. Runner -> Artifact store | upload | "The built package is saved." | `actions/upload-artifact`, or push Docker image to GHCR with commit SHA tag.
6. Runner -> Deploy target | deploy (after approval) | "If everything is green on main, the new version goes live." | Job with `needs: build`, `environment: production` (required reviewers, secrets), via SSH/kubectl/cloud CLI/OIDC.
7. Deploy target -> Dev | status | "You get a green tick or red cross." | Checks shown on commit/PR; notifications.

## Alternate: matrix builds across versions; failing tests -> pipeline stops, no deploy; rollback by redeploying previous image tag; CD = Continuous Delivery (manual gate) vs Deployment (automatic).

## Analogy: factory assembly line
Push = order placed; runner = fresh workstation; build = assembling; tests = quality inspectors; artifact = boxed product; deploy = shipping to the store.

## Interview Q&A
1. Q: CI vs CD (delivery vs deployment)?
 Short: CI merges/tests often; delivery keeps artifacts releasable; deployment auto-releases to prod.
 Deep: Continuous Delivery has a manual approval before prod; Continuous Deployment has none.
 Red flag: "CI/CD is just a deploy script".
2. Q: Workflow vs job vs step vs runner?
 Short: A workflow has jobs; jobs have steps; jobs run on runners.
 Deep: Jobs are isolated (own runner, parallel by default); share data via artifacts/outputs; steps share the job's filesystem. Self-hosted runners for private networks/GPUs.
 Red flag: "Steps run in parallel" / "jobs share a filesystem".
3. Q: How do you handle secrets?
 Short: Store in GitHub encrypted secrets/environments; never in the repo.
 Deep: Secrets are masked in logs and not passed to forks' PR workflows by default; prefer OIDC federation to cloud for short-lived credentials over long-lived keys.
 Red flag: "Put them in the workflow file / .env committed".
4. Q: How to speed up pipelines?
 Short: Cache dependencies, parallelize jobs, build only what changed.
 Deep: `actions/cache` or setup-* caching, Docker layer cache, matrix + `needs` graph, path filters.
 Red flag: "Buy bigger runners first".
5. Q: How to deploy safely?
 Short: Immutable image tags, staged envs, health checks, easy rollback.
 Deep: Blue/green, canary or rolling updates; DB migrations must be backward-compatible; tag images with commit SHA so rollback = redeploy previous SHA.
 Red flag: "Deploy `latest` to prod".

## Cheat-sheet
- `on: { push: { branches: [main] }, pull_request: {} }` : triggers.
- `runs-on: ubuntu-latest` : runner.
- `uses: actions/checkout@v4` : fetch code.
- `needs: [test]` : job dependency.
- `strategy: { matrix: { python: ["3.11","3.12"] } }` : matrix.
- `uses: actions/cache@v4` : cache.
- `env: / ${{ secrets.TOKEN }}` : secrets.
- `environment: production` : approval gates.
- `gh run list` / `gh run watch` / `gh run view --log-failed` : CLI.
- `act` : run workflows locally (third-party).

## Sources
- https://docs.github.com/en/actions/get-started/understand-github-actions , https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions (knowledge)

---------------------------------------------------------------------

# 12. Nginx reverse proxy (OUTLINE)

## Nodes
Client; Nginx; Static files (disk); Upstream app servers (app1, app2).

## Steps
1. Client -> Nginx | HTTPS request :443 | "Everyone visits one front desk, Nginx." | Nginx listens, matches `server_name` and `location`.
2. Nginx | TLS termination | "Nginx handles the secret-code encryption so apps don't have to." | `ssl_certificate`/`ssl_certificate_key`; traffic to upstream often plain HTTP on a private network.
3. Nginx -> disk | static file | "Pictures and CSS are served directly, very fast." | `location /static/ { root/alias }`, `sendfile`, caching headers.
4. Nginx -> upstream | `proxy_pass http://app` | "Dynamic requests are forwarded to an app server." | Adds `Host`, `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto` via `proxy_set_header`.
5. Nginx | load balance | "If there are several app servers, Nginx spreads the work." | `upstream app { server a:8000; server b:8000; }`: round-robin default, `least_conn`, `ip_hash`, weights, passive health (`max_fails`).
6. App -> Nginx -> Client | response | "Answer goes back through the front desk." | Nginx buffers response, can gzip, cache.

## Alternate: upstream down -> 502; timeout -> 504; HTTP->HTTPS 301 redirect server block; WebSocket needs `Upgrade`/`Connection` headers; open-source Nginx only does passive health checks (active are NGINX Plus).

## Analogy: hotel front desk / receptionist
Nginx = receptionist who also hands out brochures (static) herself; app servers = specialists in back offices; load balancing = routing to the least busy specialist; TLS termination = security check at the entrance.

## Interview Q&A
1. Q: Forward vs reverse proxy?
 Short: Forward proxy acts for clients; reverse proxy acts for servers.
 Deep: Reverse proxy hides backends, centralizes TLS, caching, compression, rate limiting, load balancing.
 Red flag: "Same thing".
2. Q: Why put Nginx in front of Uvicorn/Gunicorn?
 Short: TLS, static files, buffering slow clients, load balancing, security.
 Deep: Nginx handles thousands of slow connections cheaply and buffers request/response so app workers aren't tied up by slow clients.
 Red flag: "Because Uvicorn can't serve HTTP".
3. Q: Load-balancing algorithms?
 Short: Round-robin (default), least_conn, ip_hash, hash.
 Deep: `ip_hash` gives crude stickiness; stateless apps are preferable. Weighted servers for uneven capacity.
 Red flag: "Round-robin accounts for server load".
4. Q: How do apps know the real client IP/scheme?
 Short: Via `X-Forwarded-*` headers set by Nginx.
 Deep: Configure `proxy_set_header` and make the app trust only the proxy (`--forwarded-allow-ips`); otherwise redirects generate `http://` URLs.
 Red flag: "request.client.host is always the user".
5. Q: What does `nginx -t` do and why reload not restart?
 Short: Validates config; reload applies it gracefully.
 Deep: `nginx -s reload` spawns new workers and drains old ones, no dropped connections.
 Red flag: "Edit the file and it applies automatically".

## Cheat-sheet
- `nginx -t` : test config.
- `nginx -s reload` : graceful reload.
- `upstream api { server 10.0.0.1:8000; server 10.0.0.2:8000; }` : pool.
- `location / { proxy_pass http://api; }` : forward.
- `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` : preserve client IP.
- `proxy_set_header Host $host;` : keep host.
- `listen 443 ssl; ssl_certificate ...; ssl_certificate_key ...;` : TLS.
- `return 301 https://$host$request_uri;` : redirect to HTTPS.
- `location /static/ { alias /var/www/static/; expires 30d; }` : static caching.
- `proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade";` : WebSockets.
- `tail -f /var/log/nginx/error.log` : debug.

## Sources
- https://nginx.org/en/docs/http/ngx_http_proxy_module.html , https://nginx.org/en/docs/http/load_balancing.html , https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/ (knowledge)

---------------------------------------------------------------------

# 13. Kubernetes basics (OUTLINE)

## Nodes
kubectl/User; Control plane (API server, etcd, scheduler, controller-manager); Deployment -> ReplicaSet -> Pods; Node (kubelet, kube-proxy, runtime); Service; Ingress.

## Steps
1. User -> API server | `kubectl apply -f deploy.yaml` | "You tell the cluster what you want: 'run 3 copies of my app'." | Declarative desired state stored in etcd via kube-apiserver.
2. Controller manager -> ReplicaSet | Deployment creates a ReplicaSet | "A manager watches to keep exactly 3 copies alive." | Deployment controller creates ReplicaSet; RS controller creates Pods up to `replicas`.
3. Scheduler -> Node | place Pods | "Each copy is assigned to a computer with room." | kube-scheduler binds unscheduled Pods to Nodes by resources/affinity/taints.
4. Kubelet -> runtime | start containers | "That computer's agent starts the containers." | kubelet watches API, tells container runtime (containerd) to run Pod containers, reports status, runs probes.
5. Service -> Pods | stable address | "Pods come and go, so a Service gives one permanent address that spreads traffic." | Service selects Pods by labels; ClusterIP virtual IP; kube-proxy programs rules; DNS `svc.namespace.svc.cluster.local`.
6. Ingress -> Service | external HTTP route | "Outside traffic enters via one gate that routes by hostname/path." | Ingress rules handled by an Ingress controller (e.g. ingress-nginx); newer Gateway API is the successor direction.
7. Controllers | self-healing | "If a copy crashes, a new one is started automatically." | Control loops reconcile actual vs desired state; rolling update replaces Pods gradually.

## Alternate: Pod crashes -> restart policy/CrashLoopBackOff; rolling update with new ReplicaSet scaling up while old scales down; `kubectl rollout undo`; failing readiness probe removes Pod from Service endpoints.

## Analogy: restaurant chain HQ
Control plane = head office (API server = reception, etcd = records, scheduler = assigns staff to branches, controllers = supervisors); nodes = branches; kubelet = branch manager; Pod = a table-team; Deployment = "always keep 3 teams"; Service = the phone number that rings whichever team is free; Ingress = street-front sign routing by menu.

## Interview Q&A
1. Q: Pod vs Deployment vs ReplicaSet?
 Short: Pod runs containers; ReplicaSet keeps N Pods; Deployment manages ReplicaSets and rollouts.
 Deep: You rarely create bare Pods. Deployment adds rolling updates/rollbacks by creating a new ReplicaSet per revision.
 Red flag: "A Pod is a container".
2. Q: Control plane vs node components?
 Short: Control plane decides; nodes run workloads.
 Deep: Control plane: kube-apiserver, etcd, kube-scheduler, kube-controller-manager (+cloud-controller-manager). Node: kubelet, kube-proxy (optional), container runtime.
 Red flag: "etcd runs the containers".
3. Q: Why do we need a Service?
 Short: Pod IPs are ephemeral; a Service gives a stable virtual IP/DNS name and load balancing.
 Deep: Types: ClusterIP (internal), NodePort, LoadBalancer. Endpoints updated based on readiness.
 Red flag: "Connect directly to Pod IP".
4. Q: Service vs Ingress?
 Short: Service exposes Pods (L4); Ingress routes external HTTP(S) to Services (L7).
 Deep: Ingress needs an Ingress controller installed; Ingress resource alone does nothing.
 Red flag: "Ingress is a type of Service" / "works without a controller".
5. Q: What do liveness and readiness probes do?
 Short: Liveness restarts unhealthy containers; readiness gates traffic.
 Deep: A failing readiness probe removes the Pod from Service endpoints without restarting; a startup probe protects slow starters.
 Red flag: "They're the same check".

## Cheat-sheet
- `kubectl apply -f deploy.yaml` : declarative apply.
- `kubectl get pods -o wide` : Pods and nodes.
- `kubectl describe pod <name>` : events/debug.
- `kubectl logs -f <pod> [-c container]` : logs.
- `kubectl exec -it <pod> -- sh` : shell.
- `kubectl scale deploy/api --replicas=5` : scale.
- `kubectl rollout status|history|undo deploy/api` : rollout control.
- `kubectl port-forward svc/api 8000:80` : local access.
- `kubectl get svc,ingress` : networking.
- `kubectl config get-contexts` / `use-context` : switch clusters.
- `kubectl get events --sort-by=.lastTimestamp` : what just happened.

## Sources
- https://kubernetes.io/docs/concepts/overview/components/ (verified)
- https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ , .../services-networking/service/ , .../ingress/ (knowledge)

---------------------------------------------------------------------

# 14. GitHub PR flow (OUTLINE)

## Nodes
Your fork/branch (local); GitHub remote; Pull Request; CI checks; Reviewer; main branch.

## Steps
1. Dev -> local | `git switch -c feature/x` (fork first if no write access) | "You make your own copy of the work area so main stays clean." | Feature branch off up-to-date main; forks give contributors a copy under their account.
2. Dev -> GitHub | `git push -u origin feature/x` | "You upload the branch." | Sets upstream tracking; GitHub offers "Compare & pull request".
3. Dev -> PR | open Pull Request | "You ask the team to review and merge your work." | PR = request to merge head branch into base branch; has description, diff, discussion; link issues (`Fixes #12`).
4. GitHub -> CI | checks run | "Robots run tests automatically on your change." | Workflows triggered on `pull_request`; status checks shown; branch protection can require them.
5. Reviewer -> PR | review (comment/approve/request changes) | "A teammate reads your change and leaves feedback." | Required approvals, CODEOWNERS; push fixup commits and re-request review.
6. PR -> main | merge | "When approved and green, it's merged." | Merge commit, squash and merge, or rebase and merge.
7. GitHub -> Dev | delete branch, sync | "Clean up and update your local main." | Auto-delete head branch; `git switch main && git pull`.

## Alternate: merge conflicts with base -> rebase/merge main into branch, resolve, push (`--force-with-lease` after rebase); CI red -> fix and push, checks rerun; changes requested -> loop to step 5; stale approvals can be dismissed on new pushes.

## Analogy: submitting an essay to an editor
Branch = your draft copy; PR = submission with a cover note; CI = automatic spell-check; reviewer = editor's comments; merge = publication into the main book; squash = publishing the final polished version without every draft.

## Interview Q&A
1. Q: Merge commit vs squash vs rebase merge?
 Short: Merge keeps all commits plus a merge commit; squash makes one commit; rebase replays commits linearly.
 Deep: Squash gives tidy main but loses granular history and changes SHAs; rebase-merge keeps commits but rewrites SHAs (no merge commit); merge commit preserves exact history/branch topology.
 Red flag: "They all produce identical history".
2. Q: Fork vs branch?
 Short: Branch lives in the same repo; fork is your own repo copy.
 Deep: Use forks for open source without write access (add `upstream` remote and sync); in teams, use branches directly. Secrets aren't exposed to workflows from fork PRs by default.
 Red flag: "Fork and clone are the same".
3. Q: What are branch protection rules?
 Short: Rules on main like required reviews, status checks, no force push.
 Deep: Enforce CI pass, up-to-date branches, signed commits, CODEOWNERS review, linear history; admins may be included or exempt depending on settings.
 Red flag: "Trust people not to push to main".
4. Q: How do you keep a PR small and reviewable?
 Short: One concern per PR, tests included, descriptive title/body.
 Deep: Stack PRs for big features, use draft PRs for early feedback, avoid mixing refactor and behaviour change.
 Red flag: "One giant PR is fewer reviews".
5. Q: How to update your PR branch when main moves?
 Short: Merge main in, or rebase onto main and force-push with lease.
 Deep: Rebase keeps history linear but rewrites commits (coordinate if others share the branch); merge is safer for shared branches.
 Red flag: "`git push --force` to fix it blindly".

## Cheat-sheet
- `git switch -c feat/x` : new branch.
- `git push -u origin feat/x` : first push.
- `gh pr create --fill` : open PR from CLI.
- `gh pr checkout 123` : check out someone's PR.
- `gh pr checks` / `gh pr status` : CI status.
- `gh pr review --approve` : approve.
- `gh pr merge --squash --delete-branch` : merge.
- `git remote add upstream <url> && git fetch upstream` : sync a fork.
- `git rebase origin/main` then `git push --force-with-lease` : update branch.
- `gh pr view --web` : open in browser.

## Sources
- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges , https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches (knowledge)

---------------------------------------------------------------------

# Cross-topic misconceptions / disagreements (red-flag material)
1. FastAPI yield-dependency exit timing changed across versions (before 0.106 after response; 0.106-0.117 before response is sent; current docs: after response by default, `scope="function"` for early exit). Blogs from 2023-24 contradict each other. Verified against current docs.
2. Middleware order: last `add_middleware` call is outermost; people assume first-added runs first. ServerErrorMiddleware sits OUTSIDE user middleware (incl. CORS), so 500s can lack CORS headers.
3. "async def is always faster": FastAPI docs say `def` in a threadpool is right for blocking libs, and plain `def` for compute-only work is slower than `async def` because of threadpool overhead; blocking inside `async def` stalls everything.
4. Celery default JSON serializer since 4.0 (older blogs say pickle). Pickle is opt-in and a security risk.
5. Celery default acks early (before execution); `acks_late` alone does not cover worker crashes unless `task_reject_on_worker_lost` is also set (docs: abrupt exits are acked anyway).
6. Redis broker has no native ack: Celery emulates with visibility timeout (default 1 hour). Long ETA/countdown tasks get re-delivered and duplicated; docs advise against raising it a lot.
7. Redis docs: AOF `everysec` is default; RDB+AOF recommended together for PostgreSQL-like safety; if both enabled AOF is used at restart. "Redis has no persistence" is a misconception. Redis >= 7 uses multi-part AOF.
8. Redis eviction default policy is `noeviction` (memory limit unset by default on 64-bit); blogs often assume LRU by default. LRU/LFU are approximations by sampling.
9. Git: HEAD points to a branch ref (symbolic), not directly to a commit, except in detached HEAD; `git pull` is fetch + merge (not rebase unless configured); git stores snapshots, not diffs.
10. Docker Compose `depends_on` waits only for "started", not "ready"; even `service_healthy` depends on the quality of your healthcheck, so apps must still retry. Also "Docker is a lightweight VM" is wrong (shared kernel).
11. JWT is signed, not encrypted; PKCE is not encryption but a code-binding proof; OAuth 2.0 alone is authorization, not authentication (OIDC adds identity).
12. Doc-site note: starlette.io no longer resolves; Starlette docs now at starlette.dev.
