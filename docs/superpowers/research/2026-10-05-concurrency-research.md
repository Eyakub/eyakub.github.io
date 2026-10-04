# Concurrency research for "Stop by Stop" (Python / CPython first)

Researched 2026-10-05. Python 3.14.x is current stable; docs fetched were the `docs.python.org/3` (latest) pages, which render as 3.14.

Conventions used below:
- Step format: `n. [kind] from -> to "pkt"` | state | Simply (<=25 words) | Tech (<=40 words). `kind` = MOVE, MULTI-MOVE (several packets at once), WORK, or WORK-FAIL.
- "state" lists station sub-label overrides that take effect at that step (`station: "text"`).
- (verified) = fetched and read at research time. (knowledge) = from prior knowledge / source familiarity, not re-fetched.

## 0. Version facts verified (read these first)

| Fact | Result | Source |
|---|---|---|
| Free-threaded CPython in 3.13 | **Experimental.** Separate executable (`python3.13t`), build flag `--disable-gil`; "bugs and performance hits in single-threaded scenarios"; C extensions must be built for it. | https://docs.python.org/3/whatsnew/3.13.html (verified) |
| Free-threaded CPython in 3.14 | **Officially supported, but optional** ("PEP 779: Free-threaded Python is officially supported"). Single-thread penalty "now roughly 5-10%". | https://docs.python.org/3/whatsnew/3.14.html (verified); https://peps.python.org/pep-0779/ (Final, accepted 2025-06-16) (verified) |
| Is the GIL still the default in 3.14? | **Yes.** PEP 779 Phase II: GIL-enabled build stays the default; free-threaded is an alternative build. Phase III (making it the default) needs a later decision. | https://peps.python.org/pep-0779/ (verified) |
| Check at runtime | `sys._is_gil_enabled()` (3.13+); `python -VV` shows "free-threading build"; `PYTHON_GIL=0/1` / `-X gil=0/1`. Importing a C extension not marked free-threading-safe can re-enable the GIL (with a warning). | https://docs.python.org/3/howto/free-threading-python.html (verified) |
| Default `multiprocessing` start method (3.14) | **Linux/other POSIX: `forkserver`** (was `fork` up to 3.13). **macOS: `spawn`** (since 3.8). **Windows: `spawn`**. `fork` is no longer the default anywhere. Also changes default for `ProcessPoolExecutor` (the "mp_context" default moved off fork). | https://docs.python.org/3/whatsnew/3.14.html (verified); https://docs.python.org/3/library/multiprocessing.html (verified); https://docs.python.org/3/library/concurrent.futures.html (verified) |
| `ThreadPoolExecutor` default `max_workers` | 3.8-3.12: `min(32, os.cpu_count() + 4)`. **3.13+: `min(32, (os.process_cpu_count() or 1) + 4)`.** Earlier (3.5-3.7): `cpus * 5`. | https://docs.python.org/3/library/concurrent.futures.html (verified) |
| `ProcessPoolExecutor` default | `os.process_cpu_count()` (3.13+), `os.cpu_count()` before; capped at 61 on Windows. | same (verified) |
| asyncio default executor | If no executor is set, `run_in_executor(None, ...)` lazily creates a `concurrent.futures.ThreadPoolExecutor` -> same default size as above (source: `ThreadPoolExecutor(thread_name_prefix='asyncio')`). `asyncio.to_thread` uses it. | https://docs.python.org/3/library/asyncio-eventloop.html (verified); https://github.com/python/cpython/blob/3.14/Lib/asyncio/base_events.py (verified) |
| FastAPI `def` endpoints | Run "in an external threadpool that is then awaited". Pool size not given in FastAPI docs. AnyIO's default limiter is **40 threads**. | https://fastapi.tiangolo.com/async/ (verified); https://anyio.readthedocs.io/en/stable/threads.html (verified) |
| Switch interval | `sys.getswitchinterval()` / `sys.setswitchinterval()` exist (3.2+). Docs call it the "ideal duration of the timeslices"; it can be longer; "which thread becomes scheduled ... is the operating system's decision. The interpreter doesn't have its own scheduler." **The 5 ms default is not stated on the sys page** (the C source default is 5000 us). | https://docs.python.org/3/library/sys.html (verified for semantics); https://github.com/python/cpython/blob/3.14/Python/ceval_gil.c (verified for 5000 us / mechanism) |
| Per-interpreter GIL | PEP 684, shipped in 3.12 (C-API only); Python-level `interpreters` module via PEP 734 in 3.14; 3.14 adds `concurrent.futures.InterpreterPoolExecutor`. | https://peps.python.org/pep-0684/ (verified); https://docs.python.org/3/whatsnew/3.14.html (verified) |
| `loop.slow_callback_duration` | 100 ms default; logged in debug mode. | https://docs.python.org/3/library/asyncio-eventloop.html, https://docs.python.org/3/library/asyncio-dev.html (verified) |

Caveat for the site owner: pages were read through a summarising fetcher; direct quotes above are what it returned from the docs. The "1-8% overhead" figure in the free-threading HOWTO and "5-10%" in What's New differ; say "roughly 5-10% (3.14 What's New)" or avoid the number.

## Cross-topic misconceptions / disagreements (headline list)

1. "The GIL makes Python thread-safe." False for user logic: the GIL protects interpreter internals (the object model, refcounts). `x = x + 1` / `counter += 1` is explicitly listed as NOT atomic in the docs FAQ (https://docs.python.org/3/faq/library.html (verified)).
2. "Free-threaded Python is the default in 3.14 / the GIL is gone." No. It is officially supported but optional; GIL build is default (PEP 779).
3. "Threads can't run in parallel in Python at all." Wrong: the GIL is "always released when doing I/O" and C extensions (hashing, compression, NumPy) may release it (glossary, verified).
4. "asyncio is multithreaded / uses threads." The loop is single-threaded; concurrency comes from cooperative `await`. Parallel only if you hand work to a thread/process.
5. "`await` always yields to the loop." Awaiting a coroutine that never suspends runs inline; only awaiting something that actually suspends (I/O future, `sleep`, even `sleep(0)`) returns control. (knowledge, consistent with asyncio-task docs)
6. "`asyncio.to_thread` speeds up CPU-bound code." The docs say that "due to the GIL" it "can typically only be used to make IO-bound functions non-blocking" (asyncio-task, verified).
7. "`fork` is the default multiprocessing start method on Linux." Not since 3.14 (forkserver). Many tutorials/StackOverflow answers still say fork; also macOS has been spawn since 3.8.
8. "Concurrency and parallelism are synonyms." They are not; concurrency = structure (many tasks in progress), parallelism = simultaneous execution. Rob Pike's framing, widely quoted. (knowledge)
9. "`ThreadPoolExecutor` default is cpu*5." Outdated (3.5-3.7). Now `min(32, cpus+4)`.
10. "`Lock` and `RLock` differ only in recursion." Also ownership: a plain `Lock` may be released by any thread; an `RLock` must be released by the owner (threading docs, verified).

---

# 1. Concurrency vs parallelism (`concurrency-vs-parallelism`)

## Stations
| id | label | sub-label | role |
|---|---|---|---|
| `queue` | Task queue | "dishes A, B, C, D" | Work waiting to start |
| `core1` | CPU core 1 | "idle" | A worker that executes one thing at a time |
| `core2` | CPU core 2 | "idle" | A second, independent worker |
| `wait` | Waiting area | "oven / disk / network" | Where a task sits when it needs something slow (not using CPU) |
| `done` | Finished | "0 results" | Completed results |

Groups: "One core: concurrency" = `core1` + `wait` (used in the first half); "Two cores: parallelism" = `core1` + `core2` (second half). Suggest a single optional group "Machine" around `core1`, `core2`.

## Main route (9 steps)
1. [MOVE] `queue -> core1` "A" | core1: "running A" | Simply: The cook starts dish A. | Tech: One core picks task A from the run queue and begins executing it. Only one task is ever *running* on a core at a given instant.
2. [MOVE] `core1 -> wait` "A zzz" | core1: "free"; wait: "A needs oven" | Simply: Dish A has to bake, so the cook sets it aside instead of staring at the oven. | Tech: Task A blocks on a slow operation (I/O). The core is released rather than spinning, which is what makes interleaving possible.
3. [MOVE] `queue -> core1` "B" | core1: "running B" | Simply: While A bakes, the same cook starts dish B. | Tech: The core runs B during A's wait. Two tasks are now *in progress* but only one executes: that is concurrency.
4. [MOVE] `wait -> core1` "A ready" | core1: "B paused, A resumes"; wait: "empty" | Simply: The oven pings; the cook pauses B and finishes A. | Tech: A's I/O completes; the scheduler preempts or B yields, and A resumes. This switch is a context switch (OS threads) or a resume at `await` (asyncio).
5. [MOVE] `core1 -> done` "A" | done: "1 result"; core1: "back to B" | Simply: Dish A is finished. | Tech: A completes; B continues on the same core. Total time is less than A+B run back to back because B used A's idle time.
6. [MOVE] `core1 -> done` "B" | done: "2 results"; core1: "idle" | Simply: Dish B finished too, with one cook. Two dishes in progress, never two being worked on at the same moment. | Tech: One core made progress on two tasks by interleaving. Concurrency does not require more than one core.
7. [MULTI-MOVE] `queue -> core1` "C" + `queue -> core2` "D" | core1: "running C"; core2: "running D" | Simply: Now two cooks start two dishes at the exact same moment. | Tech: Two cores execute two instruction streams at the same instant: parallelism. Needs hardware with more than one core and a runtime that lets code use both.
8. [MULTI-MOVE] `core1 -> done` "C" + `core2 -> done` "D" | done: "4 results" | Simply: Both finish together, in about half the time. | Tech: Wall-clock time for two equal CPU-bound jobs is about half of sequential (minus overhead). Parallelism speeds up CPU-bound work; interleaving only helps when tasks wait.
9. [WORK] `done` "tally" | done: "concurrency = juggling, parallelism = doing" | Simply: Juggling many things versus doing many things at once. You can have either, or both. | Tech: Concurrency is how work is structured/scheduled; parallelism is simultaneous execution. Concurrent programs may run on one core; parallel execution needs multiple execution units.

## Alt routes
**Alt A: "Threads in CPython, but no speed-up" (failure mode: assuming threads = parallelism)** branches after step 6.
1. [MULTI-MOVE] `queue -> core1` "T1 (loop)" + `queue -> core2` "T2 (loop)" | core1: "T1 running"; core2: "T2 running?" | Simply: Two Python threads each get their own core... or so you would hope. | Tech: Two CPU-bound `threading.Thread`s on a GIL build are scheduled on two cores by the OS.
2. [WORK-FAIL] `core2` "blocked: GIL" | core2: "waiting for GIL (held by T1)" | Simply: Only one of them is allowed to run Python code at a time. The other waits. | Tech: The GIL lets only one thread execute bytecode at once, so core2 idles despite a runnable thread. Docs advise `multiprocessing` / `ProcessPoolExecutor` for CPU use.
3. [MOVE] `core1 -> done` "T1 (t)" | done: "T1 at time t" | Simply: The first finishes after one full dish-time. | Tech: Threads alternate on the GIL roughly every switch interval; total time is about the sequential sum plus switching overhead.
4. [MOVE] `core2 -> done` "T2 (2t)" | done: "T2 at ~2t" | Simply: The second finishes much later, as if only one cook were present. | Tech: No speed-up for pure-Python CPU-bound threads. The fix: processes, GIL-releasing C extensions, subinterpreters (3.14 `InterpreterPoolExecutor`), or a free-threaded build.

**Alt B: "I/O concurrency is free" (the success twin)** branches after step 3. (optional teaching)
1. [WORK] `wait` "1000 sockets waiting" | wait: "1000 waiting, 0 CPU" | Simply: A thousand dishes can be baking and the cook is free. | Tech: Waiting tasks cost no CPU; that is why threads or asyncio scale to many I/O-bound connections on one core.
2. [MOVE] `wait -> core1` "ready one" | core1: "serves whichever is ready" | Simply: The cook handles whichever dish is ready next. | Tech: The runtime wakes only ready tasks, via the OS scheduler (threads) or a selector such as epoll (asyncio).

## Everyday analogy
One cook juggling two dishes vs two cooks. Mapping: queue = order tickets; core1/core2 = cooks (hands); wait = oven timer; done = pass-through window; task switch = cook stops chopping to check the oven.
**Failure twin:** two cooks but only one knife/stove (the GIL): the second cook stands idle although hired. (Or: the cook stares at the oven and the other dish burns, i.e. blocking.)

## Interview Q&A
1. **What is the difference between concurrency and parallelism?** Short: Concurrency is managing multiple tasks in progress; parallelism is executing multiple tasks at the same instant. Deeper: Concurrency is about structure and works on one core by interleaving; parallelism needs multiple cores. A system can be concurrent without parallel, parallel without being "concurrent" in design (SIMD), or both. Red flag: "They're the same thing" / "Parallel just means faster concurrent".
2. **Can you have concurrency on a single core?** Short: Yes, by interleaving tasks at waits or by time-slicing. Deeper: The OS schedules threads on a core with preemptive time slices; asyncio switches cooperatively at `await`. Progress on several tasks occurs, but never two instruction streams simultaneously. Red flag: "No, you need multiple cores."
3. **Which problems benefit from which?** Short: I/O-bound -> concurrency; CPU-bound -> parallelism. Deeper: Waiting tasks leave the CPU idle, so interleaving hides latency. CPU-bound tasks have no idle time; only more cores help. Red flag: "Add threads to speed up any slow code."
4. **Do Python threads run in parallel?** Short: Not for pure-Python bytecode on the default GIL build; yes for I/O waits and GIL-releasing C code. Deeper: Only one thread holds the GIL; blocking I/O releases it, so I/O threads overlap. 3.14 free-threaded builds allow true parallel bytecode. Red flag: "Python can't do threads/parallelism at all."
5. **How would you speed up a CPU-bound Python function across 8 cores?** Short: Use `ProcessPoolExecutor` / `multiprocessing`, or a library that releases the GIL. Deeper: Separate processes each have their own interpreter and GIL. Mind pickling overhead and chunk size. Alternatively use subinterpreters or free-threaded Python. Red flag: "Use ThreadPoolExecutor with 8 workers."
6. **How would you speed up 500 HTTP calls?** Short: asyncio (or a thread pool) - they are I/O-bound. Deeper: Latency dominates, so waiting overlaps; cap concurrency with a semaphore. Processes would be heavy overhead for little gain. Red flag: "Use multiprocessing because it is faster."
7. **Is asyncio parallel?** Short: No, single thread, concurrent only. Deeper: One event loop thread runs one callback at a time; tasks interleave at `await`. Parallelism only appears when you offload to threads/processes. Red flag: "asyncio runs tasks on multiple cores."
8. **Can more threads make things slower?** Short: Yes, from contention and context switching. Deeper: Beyond the point where cores or I/O are saturated, extra threads add switching overhead, memory (stack per thread), and lock contention, and (with the GIL) convoy effects. Red flag: "More threads is always faster."

## Cheat-sheet
```python
import os; print(os.process_cpu_count())   # 3.13+; cores usable by this process
```
Cores this process may use (respects affinity); `os.cpu_count()` is the machine total.
```python
from concurrent.futures import ThreadPoolExecutor
with ThreadPoolExecutor() as ex: list(ex.map(fetch, urls))   # I/O-bound
```
Threads for waiting-heavy work (default workers `min(32, cpus+4)` on 3.13+).
```python
from concurrent.futures import ProcessPoolExecutor
with ProcessPoolExecutor() as ex: list(ex.map(crunch, jobs, chunksize=50))   # CPU-bound
```
Processes for CPU-heavy work; see topic 4 for the `__main__` guard.
```python
import asyncio
await asyncio.gather(*(fetch(u) for u in urls))   # concurrent, one thread
```
Many I/O waits on one thread.
```python
import sys; sys._is_gil_enabled()   # 3.13+: is the GIL currently on?
```
Tells you whether threads can run bytecode in parallel right now.
```bash
python -c "import sys; print(sys.version)"; python -VV
```
`-VV` mentions "free-threading build" when applicable.
```python
import time; t=time.perf_counter(); work(); print(time.perf_counter()-t)
```
Always measure wall-clock before and after; do not assume speed-ups.

## Sources
- https://docs.python.org/3/library/threading.html (verified) - CPU-bound advice, I/O-bound threads fine
- https://docs.python.org/3/glossary.html (verified) - GIL released on I/O
- https://docs.python.org/3/library/concurrent.futures.html (verified)
- https://docs.python.org/3/howto/free-threading-python.html (verified)
- Rob Pike, "Concurrency is not Parallelism" talk (knowledge)

---

# 2. Processes vs threads (`processes-vs-threads`)

## Stations
| id | label | sub-label | role |
|---|---|---|---|
| `a_t1` | Thread 1 | "Process A" | A thread in process A |
| `a_t2` | Thread 2 | "Process A" | Second thread in same process |
| `a_mem` | Memory A | "x = ?" | Heap/globals of process A, shared by its threads |
| `pipe` | Pipe / Queue | "pickled bytes" | IPC channel crossing the process wall |
| `b_main` | Process B | "own interpreter" | A separate process |
| `b_mem` | Memory B | "x = ?" | Process B's private memory |

Groups: **"Process A"** = `a_t1`, `a_t2`, `a_mem`; **"Process B"** = `b_main`, `b_mem`. `pipe` sits between the groups.

## Main route (10 steps)
1. [MOVE] `a_t1 -> a_mem` "x=1" | a_mem: "x = 1" | Simply: One worker writes a note on the shared whiteboard. | Tech: Thread 1 stores into a heap object. Threads in one process share the same address space: globals, heap, open files.
2. [MOVE] `a_mem -> a_t2` "read x" | a_t2: "sees x = 1" | Simply: The second worker reads it instantly. | Tech: Thread 2 reads the same object directly: no copy, no serialization, no IPC. Cheap, but any shared mutable state needs synchronization (topic 6).
3. [MOVE] `a_t2 -> a_mem` "x=2" | a_mem: "x = 2" | Simply: Either worker can change the whiteboard. | Tech: Writes are visible to all threads of A. This is both the power and the hazard of threads.
4. [MOVE] `a_mem -> a_t1` "x==2" | a_t1: "sees x = 2" | Simply: The other worker sees the change straight away. | Tech: Shared memory means threads communicate by reading and writing the same objects. Context switching between threads of one process is cheaper than between processes (shared address space; no page-table switch).
5. [MOVE] `a_t1 -> pipe` "pickle(x)" | pipe: "bytes in flight" | Simply: To tell another office, you must write a letter, a copy, not hand over the whiteboard. | Tech: Processes have separate address spaces. `multiprocessing` Queue/Pipe serializes (pickles) objects into bytes sent over an OS pipe/socket.
6. [MOVE] `pipe -> b_main` "bytes" | b_main: "receiving" | Simply: The letter arrives at the other office. | Tech: The receiving process reads the bytes. Cost grows with object size; the objects must be picklable.
7. [WORK] `b_main` "unpickle" | b_mem: "x = 2 (a copy)" | Simply: The other office copies the number onto its own whiteboard. | Tech: Unpickling builds a new object in B's heap. It is a copy; identity is not shared. (Alternatives for true sharing: `shared_memory`, `Value/Array`, memory-mapped files.)
8. [MOVE] `b_main -> b_mem` "x=99" | b_mem: "x = 99" | Simply: Office B changes its own copy. | Tech: B mutates only its private heap.
9. [WORK] `a_mem` "still x = 2" | a_mem: "x = 2 (unchanged)" | Simply: Office A's whiteboard is untouched. That is the isolation. | Tech: Isolation is the main benefit of processes: no accidental sharing, no data races on memory, and each process has its own GIL.
10. [MOVE] `b_main -> pipe` "result" then `pipe -> a_t1` (shown as one hop) | a_t1: "got result (copy)" | Simply: B sends a reply letter back. | Tech: Results return the same way: pickled, copied. IPC overhead is why chunking work into larger tasks matters.

## Alt routes
**Alt A: "Process crash: small blast radius" (failure mode), branches after step 8.**
1. [WORK-FAIL] `b_main` "OOM-killed / segfault" | b_main: "dead (signal 9)"; b_mem: "gone" | Simply: Office B burns down. | Tech: A process dies from a segfault, `os._exit`, or the OOM killer; its memory is reclaimed by the OS. Parent sees `exitcode` negative (the signal number).
2. [WORK] `a_t1` "sees EOF / BrokenPipe" | a_t1: "alive; handles error" | Simply: Office A is fine and just notices B stopped answering. | Tech: Parent is unaffected; it gets EOF/`BrokenPipeError`, or `BrokenProcessPool` from `ProcessPoolExecutor`; it can restart the worker. Process isolation = fault isolation.

**Alt B: "Thread crash: whole process goes" (failure mode), branches after step 4.**
1. [WORK-FAIL] `a_t2` "segfault in C extension" | a_t2: "SIGSEGV" | Simply: One worker in the shared office knocks over a pillar. | Tech: A hard fault (segfault, abort, `os._exit`, OOM kill) in any thread terminates the entire process. (A plain unhandled Python exception only ends that one thread and prints a traceback.)
2. [WORK-FAIL] `a_mem` "all of Process A lost" | a_t1: "dead"; a_mem: "gone" | Simply: The whole office comes down, including everyone else's work. | Tech: All threads and all shared state die together. Larger blast radius is the price of cheap sharing.

## Everyday analogy
Process = a separate apartment with its own kitchen and fridge; thread = roommates in the same apartment sharing the fridge. Mapping: Memory A = shared fridge; Thread 1/2 = roommates; pipe = passing notes under the door (a copy of the note); Process B = neighbour's apartment.
**Failure twin:** Roommates: one leaves the stove on, the whole apartment (and everyone's food) burns. A neighbour's fire stays in their apartment.

## Interview Q&A
1. **Process vs thread: key differences?** Short: Processes have isolated memory; threads share their process's memory. Deeper: A process is an OS resource container (address space, file descriptors); threads are scheduling units inside it that share the heap, globals and descriptors but have their own stack and registers. Red flag: "Threads are just lightweight processes that don't share anything."
2. **Why is thread creation/context switch cheaper?** Short: No new address space to build or switch. Deeper: Creating a process allocates page tables, loads an interpreter (spawn) or copies mappings (fork); a switch between processes involves address-space switching (TLB effects). Python `spawn` pays full interpreter start-up (~tens of ms). Red flag: "They cost the same."
3. **How do processes communicate?** Short: IPC: pipes, sockets, queues, shared memory. Deeper: In Python, `multiprocessing.Queue`/`Pipe` pickle objects; `shared_memory` and `Value`/`Array` avoid copies; a `Manager` proxies objects over a server process (slower). Red flag: "They just share variables."
4. **What happens if one thread crashes?** Short: Depends: an exception kills just that thread; a segfault kills the process. Deeper: Python-level exceptions are contained to the thread. Fatal errors in C code, `os._exit`, or being OOM-killed take down every thread in that process. Red flag: "Other threads continue normally always."
5. **Why can't you just share a Python list between processes?** Short: Each process has its own copy of memory; changes are not visible. Deeper: With `fork`, children start with copy-on-write copies; with `spawn`/`forkserver` they rebuild from imports. Sharing needs `Manager`, shared memory, or message passing. Red flag: "Pass the list as an argument and mutate it."
6. **When would you pick processes over threads in Python?** Short: CPU-bound work, or when you need fault isolation. Deeper: Each process has its own GIL, so CPU-bound code scales across cores; a crash or leak is contained and can be recycled (`maxtasksperchild`). Cost: pickling and memory per process. Red flag: "Always processes since they are more 'real'."
7. **What does fork do to threads?** Short: Only the calling thread exists in the child. Deeper: Locks held by other threads at fork time stay locked forever in the child, a classic deadlock; this is why 3.12+ warns and 3.14 moved the default away from fork. Red flag: "fork copies everything including all threads."
8. **Does Python's 3.14 default change anything here?** Short: Linux's default start method is now `forkserver`. Deeper: forkserver starts a single-threaded server then forks clean children, avoiding the multithreaded-fork hazard; arguments and targets must be picklable and importable, as with spawn. Red flag: "Linux still defaults to fork."

## Cheat-sheet
```python
import threading; threading.Thread(target=f, args=(1,)).start()
```
Thread: shares memory, cheap.
```python
import multiprocessing as mp
p = mp.get_context("spawn").Process(target=f); p.start(); p.join()
```
Process with an explicit start method.
```python
q = mp.Queue(); q.put({"a": 1}); q.get()   # pickled copy
```
Message passing between processes.
```python
from multiprocessing import shared_memory
shm = shared_memory.SharedMemory(create=True, size=1024)
```
Zero-copy shared bytes across processes (remember `shm.close(); shm.unlink()`).
```python
p.exitcode  # None=running, 0=ok, -N=killed by signal N
```
Detect a crashed child.
```python
import os; os.getpid(), threading.get_ident()
```
Show identity: threads share pid, processes do not.
```bash
ps -M <pid>        # macOS: threads of a process;   ps -T -p <pid>  # Linux
```
Inspect threads in a process.

## Sources
- https://docs.python.org/3/library/multiprocessing.html (verified)
- https://docs.python.org/3/library/threading.html (verified)
- https://docs.python.org/3/whatsnew/3.14.html (verified) - start-method change
- https://docs.python.org/3/library/concurrent.futures.html (verified) - BrokenProcessPool context (knowledge for exact class behaviour)
- Fork + threads deadlock hazard: DeprecationWarning noted in multiprocessing docs (verified, via summary)

---

# 3. The Python GIL (`python-gil`)

## Stations
| id | label | sub-label | role |
|---|---|---|---|
| `t1` | Thread 1 | "idle" | A Python thread |
| `t2` | Thread 2 | "idle" | Another Python thread |
| `gil` | GIL | "free" | The single token that lets one thread run bytecode |
| `interp` | Interpreter | "bytecode loop" | Where Python code actually executes |
| `io` | Blocking I/O | "socket / disk" | Waiting on the outside world |
| `cext` | C extension | "hashlib / NumPy" | Native code that may release the GIL |

Group: **"One CPython process"** = `t1`, `t2`, `gil`, `interp`, `cext` (`io` is outside, belongs to the OS).

## Main route (11 steps)
1. [MOVE] `t1 -> gil` "take" | gil: "held by T1"; t1: "running" | Simply: Thread 1 grabs the one key to the room. | Tech: A thread must attach to the interpreter (hold the GIL) to run Python bytecode. Only one thread at a time can.
2. [MOVE] `gil -> interp` "T1 bytecode" | interp: "running T1's code" | Simply: With the key, Thread 1 does its work. | Tech: The eval loop executes T1's bytecode. The GIL protects interpreter internals, e.g. refcounts and built-in container invariants.
3. [WORK-FAIL] `t2` "wants GIL" | t2: "waiting" | Simply: Thread 2 wants in but the room is taken. | Tech: T2 blocks on the GIL condition variable; it is runnable but cannot execute Python code.
4. [WORK] `gil` "5 ms passed" | gil: "T2 asked T1 to drop it" | Simply: After a short wait, Thread 2 politely asks for the key. | Tech: After `sys.getswitchinterval()` (default 5 ms) a waiting thread sets a drop-request flag; the holder yields at its next eval-breaker check (between bytecodes, so not exactly every 5 ms).
5. [MOVE] `interp -> gil` "T1 releases" | gil: "free"; t1: "waiting" | Simply: Thread 1 hands the key back. | Tech: Holder detaches; with forced switching another waiter must actually take it, so the releaser cannot immediately re-grab it.
6. [MOVE] `gil -> t2` "T2 takes" | gil: "held by T2"; t2: "running" | Simply: Thread 2 gets the key. | Tech: Which waiter wins is up to the OS; the interpreter has no scheduler of its own.
7. [MULTI-MOVE] `t2 -> io` "recv()" + `t1 -> gil` "take" | gil: "held by T1"; t2: "blocked in recv" | Simply: Thread 2 waits on the network, so it drops the key. Thread 1 instantly takes it. | Tech: Blocking I/O calls release the GIL before blocking. T2 sits in the kernel (no GIL needed) while T1 runs: real overlap of a wait and a computation.
8. [MOVE] `io -> t2` "data!" | t2: "ready, wants GIL" | Simply: The data arrives; Thread 2 queues for the key again. | Tech: When I/O returns, T2 must re-acquire the GIL before touching Python objects.
9. [MOVE] `t1 -> cext` "sha256(big)" | gil: "free (released by C code)"; cext: "hashing" | Simply: Thread 1 calls fast native code that does not need the key while it works. | Tech: Some C extensions (hashlib on large data, zlib, NumPy operations) explicitly release the GIL around heavy work, enabling real parallelism. Many extensions do not.
10. [MOVE] `gil -> t2` "T2 runs" | gil: "held by T2"; t2: "running" | Simply: Meanwhile Thread 2 runs Python code. Both are working at once. | Tech: The C call and T2's bytecode execute truly in parallel on two cores.
11. [WORK] `cext` "done, re-acquire" | gil: "T1 re-acquires when free" | Simply: When the native code finishes, Thread 1 must wait for the key again. | Tech: Returning to Python code requires re-taking the GIL. Net: GIL limits parallel *Python bytecode*, not all parallel work.

## Alt routes
**Alt A: "CPU-bound threads: no speed-up" (failure mode interviewers ask about), branches after step 6.**
1. [WORK] `t1` "count(50M)" | t1: "CPU-bound loop" | Simply: Thread 1 does heavy arithmetic. | Tech: Pure-Python number crunching never blocks, so it only releases the GIL on forced switches.
2. [WORK] `t2` "count(50M)" | t2: "CPU-bound loop" | Simply: Thread 2 does the same. | Tech: Both are runnable but only one runs bytecode at a time.
3. [WORK-FAIL] `gil` "ping-pong every ~5 ms" | gil: "T1 / T2 alternating" | Simply: They take turns with the key; nobody works at the same time. | Tech: Two threads take about as long as running sequentially, plus switching overhead; sometimes slower. Beazley's talks show this (and pathological multi-core contention in older GILs).
4. [MOVE] `interp -> t1` "total ~ 2x" | interp: "wall time = sum" | Simply: Two threads take about as long as doing one job after the other. | Tech: Use `ProcessPoolExecutor`, a GIL-releasing library, subinterpreters, or free-threaded Python for CPU-bound parallelism.

**Alt B: "Free-threaded build (3.13t experimental, 3.14t supported)", branches after step 2.**
1. [WORK] `gil` "disabled (python3.14t)" | gil: "disabled" | Simply: The key is gone; nobody needs to wait for it. | Tech: In the free-threaded build, `sys._is_gil_enabled()` is False. Requires a separate `t` build; the GIL build stays the default in 3.14.
2. [MULTI-MOVE] `t1 -> interp` "T1 bytecode" + `t2 -> interp` "T2 bytecode" | interp: "two threads at once" | Simply: Both threads run Python code at the same time on different cores. | Tech: Per-object locking, biased reference counting and other changes keep built-ins safe; single-thread overhead is roughly 5-10% (3.14).
3. [WORK-FAIL] `interp` "unsafe extension re-enables GIL" | gil: "re-enabled (warning)" | Simply: Import an old native library and the key comes back. | Tech: Importing a C extension not marked free-threading-compatible can re-enable the GIL (with a warning); check wheel support.
4. [WORK] `t1` "still use locks" | t1: "needs Lock for shared state" | Simply: Even without the key, you still need your own locks. | Tech: Built-ins stay internally consistent, but compound operations (check-then-act, `+=`) still race; the docs recommend explicit synchronization.

## Everyday analogy
A single bathroom key at a coffee shop: only the person holding the key may go in (run Python code); others queue. People who leave the shop to wait for deliveries (I/O) hand the key back, so someone else uses it meanwhile. A manager (switch interval) taps the holder after about 5 ms if others are waiting.
**Failure twin:** Two staff both doing a long job that requires the room: they pass the key back and forth, so it takes twice as long, no matter how many staff you hire.

## Interview Q&A
1. **What is the GIL and what does it protect?** Short: A mutex in CPython so that only one thread executes Python bytecode at a time. Deeper: It makes the object model, including built-ins like `dict`, implicitly safe against concurrent access, and simplifies memory management (reference counts). It trades multi-core parallelism for simplicity (glossary, verified). Red flag: "It makes my code thread-safe."
2. **When is the GIL released?** Short: During blocking I/O and in C extensions that opt out. Deeper: The glossary says it is "always released when doing I/O"; extensions doing hashing, compression, or numeric work often release it. Also the periodic forced switch every `getswitchinterval()` (5 ms default). Red flag: "Never. Threads in Python are fake."
3. **Why don't CPU-bound threads speed up?** Short: Only one thread executes bytecode at a time. Deeper: Threads alternate on the GIL; total CPU time is unchanged and switching adds overhead. Use processes or native code that releases the GIL. Red flag: "Because Python threads are green threads / run on one core."
4. **What does `sys.setswitchinterval` do?** Short: It sets the ideal time slice (default 5 ms) before a waiting thread requests the GIL. Deeper: It is advisory: the switch happens at the next eval-breaker check and "which thread becomes scheduled ... is the operating system's decision". Lowering it increases responsiveness and overhead. Red flag: "It is how many bytecodes run before a switch" (that was the old, pre-3.2 `setcheckinterval`).
5. **Does the GIL make `counter += 1` atomic?** Short: No. Deeper: It compiles to several bytecodes (load, add, store); a switch between them loses an update. The docs FAQ lists `i = i+1` as non-atomic. Use a Lock. Red flag: "Yes, the GIL makes everything atomic."
6. **Is the GIL removed in Python 3.14?** Short: No: free-threaded builds are officially supported but optional; the GIL build remains default. Deeper: 3.13 introduced the experimental `t` build; PEP 779 (3.14) moved it to supported (Phase II) with ~5-10% single-thread overhead. Extensions must support it or the GIL is re-enabled. Red flag: "3.13/3.14 removed the GIL for everyone."
7. **What are the alternatives for CPU parallelism?** Short: Processes, native extensions, subinterpreters, free-threaded builds. Deeper: `multiprocessing`/`ProcessPoolExecutor` (own GIL per process); NumPy/Cython/Rust releasing the GIL; 3.12 per-interpreter GIL (PEP 684) exposed in 3.14 via `InterpreterPoolExecutor`; free-threaded build. Red flag: "Rewrite in Go" as the only answer, or "use asyncio."
8. **Does asyncio bypass the GIL?** Short: No; it is single-threaded and concurrent, not parallel. Deeper: Its win is cheap waiting, not parallel execution. CPU-heavy coroutines block the loop. Red flag: "asyncio gets around the GIL."

## Cheat-sheet
```python
import sys; sys.getswitchinterval()    # 0.005
```
Current switch interval in seconds.
```python
sys.setswitchinterval(1e-6)   # make races easier to reproduce in demos
```
Experiment/teaching only; not a fix.
```python
import sys; sys._is_gil_enabled()    # 3.13+
```
Is the GIL on right now?
```bash
python3.14t -X gil=0 script.py     # or PYTHON_GIL=0
```
Run a free-threaded build with the GIL off (`=1` forces it on).
```python
import sysconfig; sysconfig.get_config_var("Py_GIL_DISABLED")  # 1 on a t build
```
Does this build support free threading?
```python
import dis; dis.dis("counter += 1")
```
Shows several bytecodes (LOAD, BINARY_OP, STORE) that a switch can split.
```python
import hashlib, threading   # hashing big buffers can overlap on threads
```
Example of GIL-releasing C work.

## Sources
- https://docs.python.org/3/glossary.html (verified) - GIL / free threading entries
- https://docs.python.org/3/library/threading.html (verified)
- https://docs.python.org/3/library/sys.html (verified; 5 ms default not stated there)
- https://github.com/python/cpython/blob/3.14/Python/ceval_gil.c (verified) - switch interval mechanism
- https://docs.python.org/3/howto/free-threading-python.html (verified)
- https://docs.python.org/3/whatsnew/3.13.html, https://docs.python.org/3/whatsnew/3.14.html (verified)
- https://peps.python.org/pep-0779/ (verified); https://peps.python.org/pep-0684/ (verified)
- https://peps.python.org/pep-0703/ (knowledge)
- David Beazley, "Understanding the Python GIL" (PyCon 2010) and "Inside the Python GIL" (knowledge); note: describes the pre-3.2 GIL; the 3.2+ "new GIL" (Antoine Pitrou) uses the time-based interval.

---

# 4. Multiprocessing pools (`multiprocessing-pools`)

## Stations
| id | label | sub-label | role |
|---|---|---|---|
| `main` | Parent process | "if __name__ == '__main__'" | Creates the pool, submits work, collects results |
| `start` | Start method | "forkserver (Linux 3.14)" | How child processes come into being |
| `tasks` | Task queue | "pickled chunks" | Pipe carrying work to workers |
| `w1` | Worker 1 | "idle" | A child process |
| `w2` | Worker 2 | "idle" | A child process |
| `results` | Result queue | "pickled results" | Pipe carrying answers back |

Group: **"Pool"** = `start`, `tasks`, `w1`, `w2`, `results` (parent `main` outside).

## Main route (9 steps)
1. [WORK] `main` "Pool(2) in __main__ guard" | main: "creating pool" | Simply: The boss opens a small team of two helpers, inside a safe "only run me once" block. | Tech: `Pool(processes=N)` or `ProcessPoolExecutor(max_workers=N)`; default N = CPU count (`os.process_cpu_count()` on 3.13+). Guard required for spawn/forkserver.
2. [MOVE] `main -> start` "make 2 workers" | start: "forkserver / spawn" | Simply: The boss asks the OS to create helpers. | Tech: Method depends on platform: 3.14 default is `forkserver` on Linux, `spawn` on macOS/Windows. `fork` is no longer default anywhere.
3. [MULTI-MOVE] `start -> w1` "child" + `start -> w2` "child" | w1: "up"; w2: "up" | Simply: Both helpers start at once, each fresh, with their own memory. | Tech: Each child imports the main module (that is why the guard matters) and runs a worker loop reading tasks. Process start-up is the main fixed cost.
4. [MOVE] `main -> tasks` "pickle chunks" | tasks: "[0-3] [4-7]" | Simply: The boss splits the pile into bundles and puts them in a tray. | Tech: `map` splits the iterable into chunks (default about `ceil(n / (4*workers))` for `Pool.map`; `chunksize=1` for `imap` and for `Executor.map`) and pickles each chunk.
5. [MULTI-MOVE] `tasks -> w1` "chunk 0" + `tasks -> w2` "chunk 1" | w1: "working [0-3]"; w2: "working [4-7]" | Simply: Each helper grabs a bundle and works on it simultaneously. | Tech: Workers unpickle args, run the function in their own interpreter on separate cores: true parallelism, no shared GIL.
6. [MOVE] `w2 -> results` "r[4-7]" | results: "chunk 1 first" | Simply: Helper 2 happens to finish first. | Tech: Completion order depends on timing, not submission order. `imap_unordered` yields in this arrival order.
7. [MOVE] `w1 -> results` "r[0-3]" | results: "chunk 0 second" | Simply: Helper 1 finishes second. | Tech: Results are pickled in the worker and unpickled in the parent: overhead proportional to result size.
8. [MOVE] `results -> main` "reassemble" | main: "map(): [0..7] in order" | Simply: The boss puts the answers back in the original order. | Tech: `Pool.map` and `Executor.map` return results in input order, regardless of completion order, so a slow early item delays the earliest results.
9. [WORK] `main` "close / join" | main: "pool shut down" | Simply: When done, the boss sends the helpers home. | Tech: `Pool.__exit__` calls `terminate()` (not `join`), so call `close()`+`join()` or collect results first; `ProcessPoolExecutor` as a context manager calls `shutdown(wait=True)`.

## Alt routes
**Alt A: "Unpicklable argument (lambda)" (failure mode), branches after step 4.**
1. [WORK-FAIL] `main` "pickle(lambda)" | main: "PicklingError" | Simply: The boss can't put a recipe card made of thin air in the tray: the helpers have no way to read it. | Tech: Only functions importable by qualified name from a module can be pickled. Lambdas, nested functions, and REPL-defined functions fail (`PicklingError` / `AttributeError: Can't pickle local object`).
2. [WORK] `main` "use def at module top level" | main: "fix: def f(x)" | Simply: Write the recipe down in the shared cookbook instead. | Tech: Define target functions at module level; use `functools.partial` of a top-level function for extra args; sockets, locks, DB connections generally cannot be pickled either.

**Alt B: "Missing `__main__` guard under spawn/forkserver" (failure mode), branches after step 2.**
1. [WORK-FAIL] `start` "child re-imports script" | w1: "importing __main__ ..." | Simply: Each new helper reads the whole script from the top, including the line that makes more helpers. | Tech: spawn/forkserver children import the main module; unguarded top-level `Pool(...)` runs again in the child.
2. [WORK-FAIL] `w1` "RuntimeError: bootstrapping" | w1: "RuntimeError"; main: "pool broken" | Simply: Python stops the endless copying and shows an error. | Tech: "An attempt has been made to start a new process before the current process has finished its bootstrapping phase." Fix: wrap entry code in `if __name__ == "__main__":`. Under old default `fork` on Linux this bug stayed hidden, so it surfaced on macOS/Windows and again on Linux with 3.14.

**Alt C: "A worker dies" (failure mode), branches after step 5.**
1. [WORK-FAIL] `w1` "OOM-killed" | w1: "dead (-9)" | Simply: One helper vanishes mid-task. | Tech: A worker killed by a signal loses its in-flight chunk.
2. [WORK-FAIL] `main` "hang / BrokenProcessPool" | main: "waiting forever?" | Simply: The boss waits for an answer that will never come. | Tech: `ProcessPoolExecutor` marks the pool broken and raises `BrokenProcessPool` on pending futures; classic `multiprocessing.Pool` replaces the worker but the lost task's result never arrives, so `map(...)` can hang. Use timeouts, `maxtasksperchild`, or the executor.
(Celery link: `prefork` pool is Celery's default (verified, Celery docs); it uses `billiard`, a fork of `multiprocessing` (knowledge). Same model: parent process + child workers, tasks pickled to children (or serialised via the broker), `worker_max_tasks_per_child` recycles leaks, killed children are replaced.)

## Everyday analogy
A boss with a team of helpers in separate rooms, passing paperwork through slots in the door. Mapping: parent = boss; pool = team; task queue = inbox slot; chunk = a stack of forms; pickling = photocopying and sealing forms in envelopes; result queue = outbox slot.
**Failure twin:** The boss tries to send a living person (open DB connection / lambda) through the mail slot: impossible; only a photocopy of a document can pass.

## Interview Q&A
1. **Pool vs ProcessPoolExecutor?** Short: Both are process pools; the executor has the `Future` API and breaks loudly on a crashed worker. Deeper: `multiprocessing.Pool` has `map/imap/apply_async`, `maxtasksperchild`; `concurrent.futures.ProcessPoolExecutor` offers `submit`/`map`, futures, `BrokenProcessPool`, and interoperates with asyncio's `run_in_executor`. Red flag: "They are completely unrelated; Pool uses threads."
2. **Why must args and results be picklable?** Short: They cross a process boundary as bytes. Deeper: There is no shared memory; each task is pickled into a pipe and unpickled in the worker. Lambdas, local functions, open files, locks cannot be pickled by default. Red flag: "Python passes a reference."
3. **Why the `if __name__ == "__main__":` guard?** Short: spawn/forkserver children re-import the main module. Deeper: Without it, child startup re-executes your pool-creation code, causing a recursive-bootstrapping `RuntimeError`. Also required for the main module to be importable at all. Red flag: "It's just a style convention."
4. **What does `chunksize` do?** Short: Groups items per task to reduce IPC overhead. Deeper: Larger chunks mean fewer pickles/round trips but worse load balancing if item cost varies. `Pool.map` default is about n/(4*workers); `Executor.map` default is 1, which is slow for tiny items on a process pool. Red flag: "It's the number of workers."
5. **Does `map` preserve order?** Short: Yes, results are returned in input order. Deeper: `imap_unordered` / `as_completed` return in completion order, useful to stream results and avoid head-of-line blocking. Red flag: "Results come back in whatever order they finish."
6. **What is the default start method on Linux in 3.14?** Short: `forkserver`. Deeper: Was `fork` until 3.13; macOS and Windows use `spawn`. Fork in a multithreaded parent can deadlock (inherited locks), hence the change. Code relying on fork inheritance (globals, unpicklable objects) may break; use `get_context("fork")` explicitly if needed. Red flag: "fork" or "spawn on Linux".
7. **How does Celery's prefork pool relate?** Short: It is the same parent-plus-child-processes model. Deeper: Celery's default pool (verified) runs tasks in child processes (billiard, a multiprocessing fork), with concurrency about the CPU count, `max_tasks_per_child` recycling, and the same pickle/serialisation constraints; for I/O-bound tasks gevent/eventlet/threads pools exist. Red flag: "Celery workers are threads."
8. **How many workers should I use for CPU-bound work?** Short: About the number of cores. Deeper: More processes than cores just context-switch; memory per worker multiplies; watch `os.process_cpu_count()` in containers (affinity/cgroup limits may differ from `cpu_count`). Red flag: "As many as possible, 100 workers is faster."

## Cheat-sheet
```python
from multiprocessing import Pool
if __name__ == "__main__":
    with Pool(4) as p: print(p.map(f, range(100), chunksize=10))
```
Canonical pool; the guard is mandatory under spawn/forkserver.
```python
from concurrent.futures import ProcessPoolExecutor, as_completed
with ProcessPoolExecutor() as ex:
    futs = [ex.submit(f, i) for i in range(10)]
    for fu in as_completed(futs): print(fu.result())
```
Futures API, completion order.
```python
p.imap_unordered(f, items, chunksize=20)   # stream results as they finish
```
Avoids head-of-line blocking.
```python
import multiprocessing as mp; ctx = mp.get_context("spawn"); ctx.Pool(4)
```
Choose a start method per pool without changing the global default.
```python
mp.get_start_method()   # 'forkserver' on Linux 3.14, 'spawn' on macOS/Windows
```
What am I running?
```python
Pool(4, maxtasksperchild=100)   # recycle workers to cap memory growth
```
Mitigate leaks (Celery equivalent: `worker_max_tasks_per_child`).
```python
from functools import partial; p.map(partial(f, k=3), items)  # not lambda
```
Pickle-safe way to bind extra arguments.
```bash
celery -A app worker --pool=prefork --concurrency=4
```
Celery prefork pool.

## Sources
- https://docs.python.org/3/library/multiprocessing.html (verified)
- https://docs.python.org/3/library/concurrent.futures.html (verified)
- https://docs.python.org/3/whatsnew/3.14.html (verified)
- https://docs.celeryq.dev/en/stable/userguide/concurrency/index.html (verified; prefork default, no CPU-count default stated on that page)
- Pool `map` chunksize formula and billiard relationship; BrokenProcessPool / Pool-hang behaviour (knowledge)

---

# 5. asyncio event loop (`asyncio-event-loop`)

## Stations
| id | label | sub-label | role |
|---|---|---|---|
| `tasks` | Tasks / coroutines | "A, B" | Your `async def` code wrapped in Tasks |
| `ready` | Ready queue | "empty" | Callbacks/tasks that can run right now |
| `loop` | Event loop | "one thread" | Runs ready callbacks one at a time |
| `selector` | Selector | "epoll / kqueue" | OS readiness notifier ("which sockets are ready?") |
| `net` | Sockets | "network" | The outside world |
| `pool` | Thread pool | "default executor" | Escape hatch for blocking code |

Group: **"One thread"** = `tasks`, `ready`, `loop`, `selector` (selector call is made from the loop thread). `net` and `pool` outside.

## Main route (10 steps)
1. [MOVE] `tasks -> ready` "A, B" | ready: "A, B" | Simply: Two jobs are put in the to-do tray. | Tech: `create_task` / `gather` wraps coroutines in Tasks and schedules their first step as callbacks in the loop's `_ready` deque.
2. [MOVE] `ready -> loop` "run A" | loop: "running A" | Simply: The single worker picks up job A. | Tech: The loop pops a handle and runs it to its next suspension point; nothing else runs meanwhile (cooperative scheduling).
3. [MOVE] `loop -> selector` "A: await recv, register fd" | loop: "A suspended"; selector: "watching A's socket" | Simply: Job A has to wait for the network, so it steps aside and asks the OS to tell it when data arrives. | Tech: `await` on a pending future suspends the coroutine and yields to the loop; the socket fd is registered with the selector (epoll on Linux, kqueue on macOS/BSD).
4. [MOVE] `ready -> loop` "run B" | loop: "running B" | Simply: The worker moves straight to job B instead of waiting. | Tech: This is the whole benefit: while A waits, B uses the thread.
5. [MOVE] `loop -> selector` "B: await recv" | loop: "B suspended"; selector: "watching A, B" | Simply: B also has to wait, so it also steps aside. | Tech: B registers its fd. Both tasks are pending; the ready queue is empty.
6. [WORK] `selector` "select(timeout)" | loop: "idle: blocked in epoll_wait"; selector: "sleeping until ready" | Simply: With nothing to do, the loop sleeps until the OS says something is ready. | Tech: `_run_once` computes a timeout (0 if ready items exist, else time to next timer) and calls `selector.select(timeout)`; epoll tracks readiness in the kernel, scaling to many fds.
7. [MOVE] `net -> selector` "A's bytes arrive" | selector: "A ready" | Simply: Data for A shows up. | Tech: The kernel marks A's socket readable; `epoll_wait` returns it.
8. [MOVE] `selector -> ready` "wake A" | ready: "A" | Simply: A is put back in the to-do tray. | Tech: `_process_events` schedules the reader callback, which sets the future result and schedules the task's wake-up in `_ready`.
9. [MOVE] `ready -> loop` "resume A after await" | loop: "A running again" | Simply: The worker resumes job A exactly where it paused. | Tech: The Task's `__step` sends the result into the coroutine; execution continues after the `await`.
10. [MOVE] `loop -> tasks` "A done" | tasks: "A finished; B waiting" | Simply: Job A finishes; B continues when its data comes. | Tech: Task completes, done-callbacks scheduled. One thread served both tasks, concurrent but never parallel.

## Alt routes
**Alt A: "A blocking call freezes everything" (failure mode), branches after step 2.**
1. [WORK-FAIL] `loop` "time.sleep(3) / requests.get()" | loop: "BLOCKED 3 s"; ready: "B, C waiting" | Simply: Job A does something slow without stepping aside, so the single worker is stuck and everyone else waits. | Tech: A synchronous blocking call inside `async def` never yields. The loop cannot run other tasks, timers, or I/O callbacks. In debug mode, callbacks over `slow_callback_duration` (100 ms) are logged.
2. [WORK-FAIL] `net` "other clients time out" | net: "timeouts / 504s" | Simply: Everyone else's requests stall. | Tech: Latency for all concurrent requests becomes the blocker's duration; health checks and heartbeats can fail.
3. [WORK] `loop` "fix: await asyncio.sleep(3)" | loop: "A suspended properly" | Simply: Use the "wait politely" version so others can run. | Tech: Use async libraries (`httpx.AsyncClient`, `asyncpg`, `aiofiles` or equivalents) or offload (Alt B).

**Alt B: "Offload blocking code to a thread" (the fix), branches after step 2.**
1. [MOVE] `loop -> pool` "to_thread(blocking)" | pool: "running in worker thread"; loop: "A suspended" | Simply: Job A hands the slow task to a helper thread and steps aside. | Tech: `asyncio.to_thread(f)` / `loop.run_in_executor(None, f)` submits to the default `ThreadPoolExecutor` (lazily created; size `min(32, cpus+4)` on 3.13+) and propagates `contextvars`.
2. [MOVE] `ready -> loop` "run B" | loop: "running B" | Simply: Meanwhile the worker keeps serving others. | Tech: The loop continues; the helper thread blocks in I/O and releases the GIL.
3. [MOVE] `pool -> ready` "done (call_soon_threadsafe)" | ready: "A" | Simply: When the helper is done, it puts A back in the tray. | Tech: The executor's future is wrapped via `wrap_future` and completion is delivered thread-safely to the loop.
4. [WORK] `loop` "caveat: GIL" | loop: "I/O-bound ok; CPU-bound not" | Simply: Helper threads fix waiting, not heavy computing. | Tech: Docs: due to the GIL, `to_thread` "can typically only be used to make IO-bound functions non-blocking". For CPU-bound, use `ProcessPoolExecutor` (or a GIL-releasing library) via `run_in_executor`.

**Alt C: "FastAPI `def` vs `async def`" (not a failure, but a common probe), branches after step 1.**
1. [MOVE] `tasks -> ready` "request" | ready: "async def handler" | Simply: A request arrives for an async endpoint. | Tech: `async def` path operations are awaited directly on the loop thread.
2. [MOVE] `loop -> pool` "def handler" | pool: "AnyIO worker thread (limit 40)" | Simply: A plain `def` endpoint is automatically sent to a helper thread. | Tech: FastAPI/Starlette runs `def` endpoints in a threadpool (AnyIO default limiter 40 threads) so they do not block the loop. Calling blocking code inside `async def` does block it.

## Everyday analogy
One waiter serving many tables. Mapping: tasks = tables' orders; event loop = the waiter; ready queue = "tables needing attention"; selector = a bell panel that lights when a table is ready; net = the kitchen/outside; thread pool = an extra runner for slow errands.
**Failure twin:** The waiter stands at one table and waits for a guest to finish choosing (blocking call). All other tables wait; the extra runner (thread pool) takes slow errands instead.

## Interview Q&A
1. **How does asyncio achieve concurrency on one thread?** Short: Cooperative multitasking via `await` and an event loop. Deeper: A Task runs until it awaits something pending; the loop then runs another ready Task. A selector (epoll/kqueue) reports which fds are ready so waiting costs no CPU. Red flag: "It spawns a thread per coroutine."
2. **What does `await` do?** Short: Suspends the current coroutine until the awaited thing completes, letting the loop run others. Deeper: Awaiting a coroutine runs it inline; control returns to the loop only when something truly suspends (an unfinished Future, `sleep`, I/O). `await asyncio.sleep(0)` is an explicit yield. Red flag: "Every await switches tasks."
3. **What happens if you call `time.sleep()` or `requests.get()` in a coroutine?** Short: It blocks the whole loop. Deeper: No other task, timer or I/O callback runs until it returns; use `await asyncio.sleep`, an async client, or `asyncio.to_thread`. Debug mode logs callbacks over 100 ms. Red flag: "Only that task waits."
4. **How would you run blocking or CPU code from async code?** Short: `asyncio.to_thread` / `run_in_executor`. Deeper: Threads for blocking I/O; `ProcessPoolExecutor` for CPU-bound code (threads gain nothing due to the GIL, per docs). Mind the default executor's size. Red flag: "Just make the function `async def`" (this does not make it non-blocking).
5. **What does the selector do?** Short: Tells the loop which file descriptors are ready. Deeper: Wraps epoll (Linux) / kqueue (macOS/BSD) / select; kernel keeps an interest list and ready list so cost scales with ready fds, not total fds. Loop blocks in `select` when idle. Red flag: "It polls each socket in a busy loop."
6. **`gather` vs `create_task` vs `TaskGroup`?** Short: All run tasks concurrently; TaskGroup gives structured cancellation. Deeper: `create_task` schedules and you must keep a reference (the loop holds only weak references); `gather` collects results; `TaskGroup` awaits all, keeps strong references and raises `ExceptionGroup`, cancelling siblings on failure. Red flag: "Calling `coro()` without await starts it."
7. **How does FastAPI use this?** Short: `async def` endpoints run on the loop; `def` endpoints run in a threadpool. Deeper: Starlette/AnyIO runs sync endpoints in worker threads (default capacity 40), so a blocking DB call in `def` is fine but blocks the loop inside `async def`. Red flag: "FastAPI runs every endpoint in a new process."
8. **Does asyncio.Lock protect against data races across threads?** Short: No; it is for tasks on one loop and is not thread-safe. Deeper: Asyncio primitives are not thread-safe and have no `timeout` parameter; races across awaits are still possible between yields (check-then-await-act). Red flag: "asyncio code can't have race conditions at all."

## Cheat-sheet
```python
asyncio.run(main())
```
Create the loop, run, close.
```python
async with asyncio.TaskGroup() as tg:
    t1 = tg.create_task(a()); t2 = tg.create_task(b())
```
Structured concurrency (3.11+).
```python
res = await asyncio.to_thread(blocking_fn, arg)
```
Offload blocking I/O (context vars propagate).
```python
loop = asyncio.get_running_loop()
await loop.run_in_executor(ProcessPoolExecutor(), cpu_fn, arg)
```
Offload CPU-bound work to a process.
```python
await asyncio.sleep(0)    # explicit yield to the loop
```
Let others run during a long coroutine.
```python
asyncio.run(main(), debug=True)   # or PYTHONASYNCIODEBUG=1
```
Logs callbacks slower than 100 ms and never-awaited coroutines.
```python
sem = asyncio.Semaphore(10)
async with sem: await fetch(u)
```
Cap concurrency of outbound calls.
```python
async with asyncio.timeout(5): await slow()
```
Deadline (3.11+).

## Sources
- https://docs.python.org/3/library/asyncio-eventloop.html (verified)
- https://docs.python.org/3/library/asyncio-task.html (verified)
- https://docs.python.org/3/library/asyncio-dev.html (verified)
- https://docs.python.org/3/library/asyncio-sync.html (verified)
- https://github.com/python/cpython/blob/3.14/Lib/asyncio/base_events.py (verified `_run_once`)
- https://man7.org/linux/man-pages/man7/epoll.7.html (verified)
- https://fastapi.tiangolo.com/async/ (verified); https://anyio.readthedocs.io/en/stable/threads.html (verified)
- Task wake-up internals (`__step`, `wrap_future`, `call_soon_threadsafe`) (knowledge)

---

# 6. Race conditions and locks (`race-conditions-locks`)

## Stations
| id | label | sub-label | role |
|---|---|---|---|
| `t1` | Thread 1 | "idle" | Increments the counter |
| `t2` | Thread 2 | "idle" | Increments the counter |
| `counter` | Shared counter | "value = 0" | The shared variable |
| `lockA` | Lock A | "free" | First mutex |
| `lockB` | Lock B | "free" | Second mutex (used in deadlock demo) |

Group: **"One process"** = all stations. (Optionally a "Critical section" group around `counter`.)

## Main route (10 steps): the lost update, then the fix
1. [MOVE] `counter -> t1` "read 0" | t1: "has 0"; counter: "value = 0" | Simply: Thread 1 reads the counter: 0. | Tech: `counter += 1` is load, add, store, not one step. T1 loads 0 into its own stack.
2. [MOVE] `counter -> t2` "read 0" | t2: "has 0" | Simply: Before T1 writes back, Thread 2 also reads: still 0. | Tech: A thread switch between the load and the store is allowed at bytecode boundaries even with the GIL.
3. [WORK] `t1` "compute 0+1" | t1: "has 1" | Simply: Thread 1 adds one in its head. | Tech: The add happens on T1's private value; the shared object is untouched.
4. [MOVE] `t1 -> counter` "write 1" | counter: "value = 1" | Simply: Thread 1 writes 1. | Tech: Store completes.
5. [MOVE] `t2 -> counter` "write 1" | counter: "value = 1 (should be 2!)" | Simply: Thread 2 writes 1 as well, wiping out Thread 1's update. | Tech: Lost update: two increments, net +1. Non-atomic read-modify-write; the docs FAQ lists `i = i+1` as non-atomic. Typical in 3.10+ with a 5 ms interval only under many iterations.
6. [MULTI-MOVE] `t1 -> lockA` "acquire" + `lockA -> t1` "granted" (shown as one hop `t1 -> lockA`) | lockA: "held by T1" | Simply: The fix: Thread 1 takes the lock (a "my turn" token) before touching the counter. | Tech: `with lock:` acquires `threading.Lock` (context manager form of `acquire()`/`release()` in try/finally).
7. [MOVE] `t2 -> lockA` "acquire: BLOCKED" | t2: "waiting on Lock A" | Simply: Thread 2 must wait its turn. | Tech: `Lock.acquire()` blocks until released; optional `timeout=` or `blocking=False` available.
8. [MOVE] `t1 -> counter` "read, +1, write 1" | counter: "value = 1" | Simply: Thread 1 does its whole read-add-write in one go. | Tech: The critical section: no other thread holding the same lock can interleave.
9. [MOVE] `lockA -> t2` "released to T2" | lockA: "held by T2"; t2: "running" | Simply: Thread 1 hands the token over; Thread 2 now proceeds. | Tech: Release on exiting `with`. Even if an exception is raised the lock is released.
10. [MOVE] `t2 -> counter` "read 1, +1, write 2" | counter: "value = 2" | Simply: The count is correct: 2. | Tech: Serialised increments yield the correct result; contention costs throughput. Prefer designs that avoid shared state (queues, per-thread accumulators, atomic ops).

## Alt routes
**Alt A: "Deadlock: two locks in opposite order" (failure mode), branches after step 5.**
1. [MULTI-MOVE] `t1 -> lockA` "take A" + `t2 -> lockB` "take B" | lockA: "held by T1"; lockB: "held by T2" | Simply: Thread 1 grabs the red key; at the same moment Thread 2 grabs the blue key. | Tech: T1 acquires A then will want B; T2 acquires B then will want A.
2. [MULTI-MOVE] `t1 -> lockB` "wait for B" + `t2 -> lockA` "wait for A" | t1: "waiting for B"; t2: "waiting for A" | Simply: Each now needs the other's key. | Tech: Circular wait: T1 holds A and requests B; T2 holds B and requests A.
3. [WORK-FAIL] `lockA` "DEADLOCK" | lockA: "stuck"; lockB: "stuck" | Simply: Nobody can move, forever. The program hangs with no error. | Tech: The four deadlock conditions hold (mutual exclusion, hold-and-wait, no preemption, circular wait). Python does not detect it; the process just hangs (use `faulthandler.dump_traceback_later` to see stacks).
4. [WORK] `lockA` "fix: always A then B" | lockA: "ordered"; lockB: "ordered" | Simply: Everyone must take keys in the same order: red first, then blue. | Tech: Global lock ordering removes the circular-wait condition. Alternatives: single lock, `acquire(timeout=...)` with back-off, avoid nested locks.

**Alt B: "`Lock` re-acquired by the same thread: self-deadlock; RLock", branches after step 6.**
1. [WORK-FAIL] `t1` "acquire(A) again" | t1: "blocked by itself" | Simply: Thread 1 asks for a key it already holds, and waits on itself forever. | Tech: `threading.Lock` is not reentrant; a method that holds the lock and calls another method that takes the same lock hangs.
2. [WORK] `lockA` "RLock: owner T1, depth 2" | lockA: "RLock owner T1 x2" | Simply: A special lock remembers who owns it and lets the owner re-enter. | Tech: `RLock` tracks owner and recursion level; same thread may re-acquire; must `release()` as many times; only the owner may release. Plain `Lock` may be released by any thread.

**Alt C: "asyncio.Lock: races across `await`", branches after step 5.**
1. [WORK-FAIL] `t1` "await between read and write" | counter: "task A read 0, awaits; task B read 0" | Simply: Even with one thread, tasks can interleave at `await`. | Tech: In asyncio, a `read; await x; write` sequence is not atomic because other tasks run at the `await`. A plain `n += 1` with no await in between is safe on one loop thread.
2. [WORK] `lockA` "async with asyncio.Lock()" | lockA: "asyncio.Lock (FIFO)" | Simply: Use the async version of the lock. | Tech: `asyncio.Lock` is for tasks in one loop: FIFO fair, not thread-safe, no timeout argument; do not use it to synchronise OS threads.

## Everyday analogy
Two people updating a shared paper tally on a fridge. Mapping: counter = the number on the fridge; thread = person; lock = a single marker pen: you can only change the number while holding it.
**Failure twin (deadlock):** Person 1 holds the pen and wants the eraser; Person 2 holds the eraser and wants the pen. Both wait forever. Fix: always pick up the pen first, then the eraser. (Lost update twin: both read "5", both write "6".)

## Interview Q&A
1. **What is a race condition?** Short: The result depends on the unpredictable timing of concurrent operations on shared state. Deeper: The classic form is read-modify-write: two threads read the same value, both compute, and the second write overwrites the first (lost update). Data races, check-then-act, and ordering bugs are all variants. Red flag: "A bug where code runs too fast."
2. **Is `counter += 1` thread-safe in CPython with the GIL?** Short: No. Deeper: It compiles to separate load/add/store bytecodes; the interpreter can switch threads between them; the docs FAQ lists `i = i+1` and `D[x] = D[x] + 1` as not atomic (while `L.append(x)` and `D[x] = y` are). On free-threaded builds the risk is higher. Red flag: "Yes, the GIL makes it atomic."
3. **How do you fix it?** Short: Protect with `threading.Lock`, or avoid sharing. Deeper: `with lock: counter += 1`; or use a `queue.Queue`, per-thread counters summed at the end, `multiprocessing.Value` with its lock, or atomic primitives in a database or Redis for cross-process. Red flag: "Use `time.sleep()` to avoid overlap."
4. **What is a deadlock and how do you avoid it?** Short: Threads wait on each other's locks in a cycle. Deeper: Occurs with hold-and-wait and circular wait. Prevent by consistent lock ordering, holding fewer locks, using timeouts (`acquire(timeout=)`), or a single coarse lock. Red flag: "Python detects and raises on deadlock."
5. **Lock vs RLock?** Short: RLock can be re-acquired by its owner; Lock cannot. Deeper: RLock tracks owner and recursion count and must be released by its owner; Lock has no owner so any thread can release it. RLock suits re-entrant code paths, but may hide design problems and costs slightly more. Red flag: "RLock is just a faster Lock."
6. **Does asyncio need locks?** Short: Sometimes; tasks interleave at `await`. Deeper: Without an `await`, a code section on one loop is effectively atomic; across awaits it is not. `asyncio.Lock` serialises tasks (FIFO), is not thread-safe, and has no timeout parameter (use `asyncio.wait_for`). Red flag: "No locks needed in asyncio, ever."
7. **How do you reproduce a race in a test?** Short: Many iterations plus a tiny switch interval. Deeper: `sys.setswitchinterval(1e-6)` and a loop of ~100k increments on several threads usually shows lost updates; races in modern CPython can be rare with few iterations since a thread rarely hits a switch point exactly mid-update. Red flag: "If tests pass once, it is safe."
8. **What does the lock context manager guarantee on exceptions?** Short: The lock is released. Deeper: `with lock:` is equivalent to `acquire(); try: ... finally: release()`. Manual `acquire()` without `finally` risks leaving it locked forever. Red flag: "Locks release automatically when a thread dies." (They do not.)

## Cheat-sheet
```python
lock = threading.Lock()
with lock: counter += 1
```
Make the read-modify-write one critical section.
```python
if lock.acquire(timeout=2): ...; lock.release()
else: log("could not get lock")
```
Timeout to avoid hanging forever.
```python
rlock = threading.RLock()
with rlock:
    with rlock: ...      # same thread may re-enter
```
Re-entrant lock for recursive call paths.
```python
for lk in sorted((a, b), key=id): lk.acquire()
```
Enforce a global lock order by a stable key.
```python
import faulthandler; faulthandler.dump_traceback_later(10)
```
Dump all thread stacks after 10 s, handy for diagnosing a hang.
```python
import sys; sys.setswitchinterval(1e-6)    # amplify races in a repro
```
Teaching/test aid only.
```python
alock = asyncio.Lock()
async with alock: await update()
```
Serialise tasks across `await` points (not thread-safe).
```python
import dis; dis.dis("counter += 1")
```
Show that the statement is several bytecodes.

## Sources
- https://docs.python.org/3/faq/library.html (verified) - atomic vs non-atomic operations
- https://docs.python.org/3/library/threading.html (verified) - Lock, RLock, timeout, `with`
- https://docs.python.org/3/library/asyncio-sync.html (verified) - asyncio.Lock FIFO, not thread-safe, no timeout
- https://docs.python.org/3/howto/free-threading-python.html (verified) - built-ins' internal locks, use explicit locks
- https://docs.python.org/3/library/sys.html (verified) - setswitchinterval
- Observation that `+=` races are hard to trigger on 3.10+ without many iterations (knowledge; scientifically reasoned from eval-breaker behaviour, not re-fetched)
- Deadlock conditions (Coffman) (knowledge)
