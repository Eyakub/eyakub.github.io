# Concurrency internals — Phase 4 outlines

Dated 2026-10-11. Four stations on the second row of the concurrency line. `concurrency-deep-dive`, `parallelism-deep-dive`, and `threading-deep-dive` are pages. Multithreading is still a Phase 4 station with no page yet.

These sit under the Phase 2 kitchen pages. Do not retell those rides. Phase 2 already shows juggling versus two cooks (`concurrency-vs-parallelism`), shared fridge versus a slip next door (`processes-vs-threads`), the GIL hat (`python-gil`), pools (`multiprocessing-pools`), and the lost tally (`race-conditions-locks`). These outlines are the interview layer underneath: who decides the next turn, why extra cores stop helping, what one thread is, and what goes wrong when several share memory.

Facts marked (verified) were read on 2026-10-11 from the cited page. (knowledge) was not re-fetched; check it before the page is written. Python docs below are the 3.14/3.15 "latest" pages.

## Sources used for all four

- Glossary: concurrency, parallelism, atomic operation, data race, race condition, GIL, free threading, per-object lock, lock-free. https://docs.python.org/3/glossary.html (verified)
- `sys.setswitchinterval`: ideal timeslice; the actual gap can be longer; the OS picks the next thread; the interpreter has no scheduler. https://docs.python.org/3/library/sys.html#sys.setswitchinterval (verified)
- CPython 3.14 `Python/ceval_gil.c`: `DEFAULT_INTERVAL` is 5000 microseconds. The sys page does not state that default. https://github.com/python/cpython/blob/3.14/Python/ceval_gil.c (verified)
- `threading`: `start`, `join`, `is_alive`, `daemon`, `ident`, `native_id`, `stack_size` (0 = platform default, minimum 32 KiB), `excepthook`. https://docs.python.org/3/library/threading.html (verified)
- `concurrent.futures`: `ThreadPoolExecutor` default `max_workers` is `min(32, (os.process_cpu_count() or 1) + 4)` since 3.13. Pool workers are joined before interpreter exit. Deadlock examples are in the docs. `InterpreterPoolExecutor` (3.14) gives each worker its own interpreter and its own GIL. https://docs.python.org/3/library/concurrent.futures.html (verified)
- Amdahl 1967 and Gustafson–Barsis 1988, as summarised at https://en.wikipedia.org/wiki/Amdahl%27s_law and https://en.wikipedia.org/wiki/Gustafson%27s_law (verified for the formulas below)

---

# 1. Concurrency deep-dive (`concurrency-deep-dive`)

Scheduling and interleaving. One core. The question is who runs next, and what is saved when the turn changes.

## Nodes

| id | label | role |
|---|---|---|
| ready | Ready queue | Tasks that could run now |
| core | Core | The one place work actually happens |
| blocked | Blocked | Waiting on I/O, a lock, or a sleep. Not using the core |
| task | Task | The thing whose turn it is |

## Steps

1. ready -> core | task A | "A gets the core." | A is running. Everyone else in the ready queue is only in progress.
2. core -> blocked | A waits | "A has to wait for the oven, the disk, or a lock, so it leaves the core." | A blocking call parks the task. The core is free. This is the gap interleaving uses.
3. ready -> core | task B | "B takes the gap." | Two tasks are in progress. Only one runs. That is the interview split: concurrency is structure, parallelism is simultaneous execution. Python's glossary uses "at the same time" for concurrency and then points at parallelism for several cores (verified). Say both, and keep the split.
4. blocked -> ready | A ready | "The wait is over. A lines up again." | The OS or the event loop moves A back to ready. It does not jump the core by magic.
5. core -> core | switch | "The core swaps notebooks." | A context switch saves the program counter, registers, and stack pointer, then restores the other task's. (knowledge) That cost is why thrashing a tiny slice is slower, not faster.
6. WORK core | who decides | "Two different bosses." | Cooperative: an asyncio task runs until it hits `await` on something that actually suspends. Preemptive: the OS can interrupt a thread. On a GIL build, CPython also asks to switch between bytecode instructions. `sys.setswitchinterval` sets the ideal slice. The default in CPython 3.14's GIL runtime is 5000 µs (verified in source). The docs say the real gap can be longer, and the OS, not the interpreter, chooses which thread runs next (verified).

## Alternate

**Starvation.** B is always ready and the picker keeps choosing B. A stays in the ready queue. Fairness is a scheduler policy, not a law. (knowledge)

**Voluntary versus forced.** Same diagram. Cooperative slice ends at `await`. Preemptive slice ends at a timer. A CPU-bound asyncio task that never awaits freezes every other task. A CPU-bound Python thread on a GIL build still gets switched, about every ideal slice, but only one runs bytecode.

## Analogy

One checkout lane. Ready queue is the line. Blocked is stepping aside to take a phone call. The switch is the cashier closing one basket and opening the next. Two people are "being served" only if a second cashier opens. That second cashier is the parallelism page.

## Interview Q&A

1. Q: Concurrency versus parallelism?
   Short: Concurrency is many tasks in progress. Parallelism is more than one executing at the same instant.
   Deep: You can be concurrent on one core by interleaving. Parallel needs several cores and a runtime that lets the work use them. Python's glossary is looser ("at the same time") and then defines parallelism as several cores (verified).
   Red flag: "They are the same word."
2. Q: Who schedules Python threads?
   Short: The operating system. The interpreter only asks for a switch.
   Deep: `setswitchinterval` is an ideal timeslice. Long C calls can stretch it. The interpreter has no scheduler (verified).
   Red flag: "Python has its own thread scheduler."
3. Q: What does a context switch cost?
   Short: The core saves one task's place and loads another's.
   Deep: Registers, program counter, stack pointer. Caches and the TLB go cold. (knowledge) Do not quote a microsecond number unless you measured that machine.
   Red flag: "Switching is free."

## Page notes

Skip the two-cook dinner. That page exists. This one is the lane, the queue, and the two bosses.

---

# 2. Parallelism deep-dive (`parallelism-deep-dive`)

Cores and speedup. The question is how much of the job can actually run at the same moment, and what refuses to.

## Nodes

| id | label | role |
|---|---|---|
| serial | Serial stretch | Work that must happen on one core, before or after the split |
| core1 | Core 1 | Half of the parallel stretch |
| core2 | Core 2 | The other half |
| join | Join | Where the cores meet again |

## Steps

1. serial -> core1 | setup | "One core prepares the job. The other has nothing to do yet." | Startup, reading input, and the final merge are serial. Extra cores sit idle here.
2. MULTI-MOVE serial -> core1 "left" + serial -> core2 "right" | "The part that can split runs on both cores at once." | Parallelism. Two instruction streams, one instant. Needs more than one core and a runtime that is allowed to use both.
3. MULTI-MOVE core1 -> join + core2 -> join | "They meet, and one core finishes the job." | Wall-clock time is the serial stretches plus the longer of the parallel parts, plus the cost of the split.
4. WORK join | Amdahl | "The part you did not split puts a ceiling on the speedup." | Amdahl, fixed problem size: speedup with n cores is `1 / ((1 - p) + p / n)`, where p is the fraction that parallelises. If p is 0.95, even infinite cores top out at 20×. If p is 0.5, the ceiling is 2×. (verified via the Wikipedia statement of the law)
5. WORK join | Gustafson | "Give the cores a bigger job, and the ceiling moves." | Gustafson–Barsis 1988: people grow the problem as machines grow. Scaled speedup is about `n - s (n - 1)`, where s is the serial fraction of the parallel run's time. (verified via Wikipedia) Amdahl is the fixed job. Gustafson is the bigger job.

## Alternate

**Overhead wins.** Copying the work out and merging the answers takes longer than the split saved. Two cores, slower dinner. Say this before quoting Amdahl. The formula ignores that cost.

**Python cannot use the second core for bytecode** on a default build. The GIL lets one thread run Python bytecode at a time (glossary, verified). Ways that do use both cores: processes, a C extension that releases the GIL, a free-threaded build, or 3.14 `InterpreterPoolExecutor` (each worker has its own GIL, verified). Phase 2's GIL page shows the hat. This page only names which door you take when you need the second core.

## Analogy

Two cashiers, one queue that has to be counted by a single person at the start and checked by a single person at the end. Hiring a third cashier does not shrink that counting.

## Interview Q&A

1. Q: State Amdahl's law.
   Short: Speedup is capped by the fraction you cannot parallelise.
   Deep: `1 / ((1 - p) + p / n)`. Quote a ceiling (95% → 20×) rather than a vague "diminishing returns".
   Red flag: "Twice the cores, twice as fast."
2. Q: When is Amdahl the wrong picture?
   Short: When the job grows with the machine.
   Deep: That is Gustafson's point. Also when split/merge overhead dominates, which neither law includes.
   Red flag: "Amdahl says parallel programming is pointless."
3. Q: How do you get real multicore speedup in CPython?
   Short: Not with pure-Python threads on the default build.
   Deep: Processes, GIL-releasing native code, free-threading, or separate interpreters. Threads still win for I/O, because waiting releases the core.
   Red flag: "Threads always use all the cores."

## Page notes

Do not restage dishes C and D. Start from the serial stretch and the formula.

---

# 3. Threading deep-dive (`threading-deep-dive`)

One thread's life. Create, run, block, finish, join. Not two threads fighting over a counter. That is the next station.

## Nodes

| id | label | role |
|---|---|---|
| obj | Thread object | The Python object. Exists before any OS thread |
| os | OS thread | The kernel's thread, with its own stack |
| gil | Interpreter | Where bytecode runs, while this thread holds the GIL on a default build |
| blocked | Blocked call | I/O, sleep, or a lock wait. GIL released for real blocking calls |
| waiter | join | Another thread waiting for this one to end |

## Steps

1. WORK obj | constructed | "The object exists. Nothing is running." | `ident` is `None` until `start()`. `is_alive()` is false. `daemon` must be set before `start()`, or `RuntimeError`. Default is inherited. The main thread is not a daemon, so threads it creates default to non-daemon (verified).
2. obj -> os | start | "start asks the OS for a thread, and run begins there." | `start()` at most once. It calls `run()` on the new thread. `is_alive()` is true from just before `run()` until just after it returns (verified). `native_id` is the kernel id and is only unique until the thread terminates, then the OS may reuse it (verified).
3. os -> gil | bytecode | "It runs Python on the interpreter." | On a default build, an attached thread state implies holding the GIL, so only one OS thread runs bytecode (glossary, verified). `stack_size(0)` means the platform default. The smallest you may request is 32 KiB. Do not quote an 8 MB default; the docs do not state one (verified).
4. gil -> blocked | blocking call | "It waits. While it waits, someone else may hold the interpreter." | I/O releases the GIL. The OS marks the thread blocked. Another Python thread can run. This is why threads help I/O and not pure-Python CPU work. The GIL page already shows the hat. Keep this step to the state change.
5. blocked -> gil | resumed | "The wait ends. It needs the interpreter again before the next Python instruction." | The OS makes it runnable. It still cannot run bytecode until it holds the GIL.
6. gil -> waiter | run returns | "run ends. join unblocks." | Alive stops. An exception in `run()` goes to `threading.excepthook`, which ignores `SystemExit` (verified). `join()` blocks the caller until then. `join()` returns `None`. On a timeout, call `is_alive()` to see if it is still going. Joining yourself, or joining before `start()`, raises `RuntimeError` (verified).

## Alternate

**Daemon.** `daemon=True`. The process exits when no non-daemon thread is alive. Daemon threads are stopped abruptly. Open files and transactions may not be cleaned up. The docs say to use a non-daemon plus an `Event` if you need a clean stop (verified).

**Alien thread.** A thread started outside the `threading` module becomes a dummy. Always alive, always daemonic, cannot be joined (verified). Mention once. Do not build a stop around it.

## Analogy

Hiring one cook. The object is the contract. `start` is the cook walking into the kitchen. The stack is their own counter. Blocking is them at the door, waiting for a delivery, while someone else may use the stove. `join` is you waiting at the pass until their shift ends. A daemon is a cook you are willing to send home mid-chop when the restaurant closes.

## Interview Q&A

1. Q: What is the difference between the Thread object and the OS thread?
   Short: The object can exist before `start`. The OS thread begins at `start`.
   Deep: `ident` is `None` until then. `is_alive` tracks `run()`, not the object's lifetime.
   Red flag: "Creating the Thread starts it." (`ThreadPoolExecutor` submits do start work. A bare `Thread` does not.)
2. Q: What does daemon mean?
   Short: The process will not stay up just for that thread.
   Deep: Shutdown is abrupt. Non-daemon plus an `Event` is the clean stop. `join` on a daemon during late finalization can raise `PythonFinalizationError` (3.14, verified).
   Red flag: "Daemon means low priority."
3. Q: Why does each thread have a stack?
   Short: So its calls and local variables are not mixed with another's.
   Deep: `stack_size` changes later threads. 0 keeps the platform default. Minimum settable size is 32 KiB (verified).
   Red flag: "Threads share one stack." They share the heap. The stack is private.

## Page notes

One thread. The next station adds the second.

---

# 4. Multithreading deep-dive (`multithreading-deep-dive`)

Shared memory, pools, and races. Two or more threads, one heap.

## Nodes

| id | label | role |
|---|---|---|
| a | Thread A | First worker |
| b | Thread B | Second worker |
| heap | Shared heap | Objects both can see |
| lock | Lock | One thread in the critical section |
| pool | Pool | A fixed set of workers and a queue of calls |

## Steps

1. MULTI-MOVE a -> heap + b -> heap | both read | "Both read the same object." | Threads in one process share the heap. That is the whole point, and the whole hazard. Processes do not. Phase 2 already shows the fridge versus the slip. Start here from the hazard.
2. WORK heap | race | "The result depends on whose write lands last." | A race condition is an outcome that changes with timing. `x += 1` is several bytecode instructions and is not atomic (glossary, verified). The GIL does not make that safe. The locks page shows the lost update with cooks. This stop names the word and the bytecode.
3. WORK heap | data race | "A data race is a stronger, native claim." | Glossary: several threads, same memory, at least one write, no synchronisation. Data races happen in native code, which a Python API may expose. A logic race in pure Python is still a race condition (verified). Do not use the two terms as synonyms.
4. a -> lock | acquire | "A takes the lock. B waits." | `Lock` is not owned. Any thread may release it. `RLock` is owned and reentrant. The locks page covers deadlock and the pen. This stop only separates `Lock` from `RLock` if the Q&A needs it.
5. lock -> heap | critical section | "Only A updates. Then it lets go." | The lock is the happens-before edge. Without it, another thread can observe a half-updated object. On free-threaded builds, `dict` and `list` use per-object locks, and lock-free reads can still see an intermediate state during a multi-step change (glossary, verified).
6. a -> pool | submit | "A pool keeps a few threads and a queue of jobs, instead of a thread per job." | `ThreadPoolExecutor` since 3.13 defaults to `min(32, (os.process_cpu_count() or 1) + 4)` (verified). Workers are joined before interpreter exit, so a long-running task in the pool is the wrong tool (verified). `queue.Queue` is the thread-safe handoff if you build the pool yourself.

## Alternate

**Pool deadlock.** A worker blocks on a `Future` that needs a free worker from the same pool. The docs show it with `max_workers=1` and with two workers each waiting on the other (verified). The pool is the station. No new nodes.

**False sharing.** Two threads update different counters that sit on the same cache line, so the cores keep invalidating each other's cache. Correct, and still slow. (knowledge) Confirm the "often 64 bytes on x86" figure before putting it on the page.

**LBYL race.** `if key in mapping: return mapping[key]` can fail if another thread deletes the key in between. Glossary's own example (verified). Fix with a lock, or with EAFP.

## Analogy

One fridge, two cooks, one marker. The pool is a fixed crew and a rail of order tickets, not a new cook for every ticket. False sharing is two cooks writing on opposite ends of the same whiteboard, bumping each other even though the words do not overlap.

## Interview Q&A

1. Q: Does the GIL make Python thread-safe?
   Short: It protects the interpreter, not your updates.
   Deep: `x += 1` is not atomic (verified). You still need a lock, a queue, or no sharing.
   Red flag: "The GIL means I can skip locks."
2. Q: Race condition versus data race?
   Short: A race condition is a timing-dependent bug. A data race is an unsynchronised native access with a write.
   Deep: Pure Python can have race conditions without a data race, because the GIL serialises bytecode. Native code can have a data race. Glossary draws that line (verified).
   Red flag: "They are synonyms."
3. Q: What is the default thread-pool size?
   Short: Since 3.13, `min(32, process_cpu_count + 4)`.
   Deep: It used to be `cpu_count + 4` (3.8) and, long before that, `cpu * 5` (3.5). The pool reuses idle workers. Do not park a server loop in it. The docs' deadlock is a worker waiting on its own pool.
   Red flag: "It starts one thread per core" or "one thread per task."
4. Q: What changes on a free-threaded build?
   Short: Several threads can run bytecode at once. Sharing still needs a plan.
   Deep: Per-object locks on `dict` and `list`. Lock-free reads may see a half-updated container (verified). The GIL build remains the default through 3.14 (PEP 779, verified in the 2026-10-05 notes).
   Red flag: "Free-threading removes the need for locks."

## Page notes

The lost-update animation already exists on `race-conditions-locks`. Use one step to point at it, then spend the ride on the glossary split, the pool, and the deadlock.
