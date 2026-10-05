import type { Topic } from '../types'
import { UI } from '../ui'

export const asyncioEventLoop: Topic = {
  slug: 'asyncio-event-loop',
  line: 'concurrency',
  title: { en: 'The asyncio event loop', bn: 'asyncio event loop' },
  summary: {
    en: 'One thread runs many tasks. Each task steps aside at an await, and a selector wakes it when its I/O is ready.',
    bn: 'একটা thread অনেক task চালায়। প্রতিটা task `await`-এ সরে দাঁড়ায়, আর I/O তৈরি হলে selector তাকে জাগায়।'
  },
  view: { wide: [ 1000, 460 ], narrow: [ 400, 580 ] },
  nodeR: { narrow: 20 },
  nodes: {
    tasks: {
      icon: 'task',
      name: { en: 'Your tasks', bn: 'আপনার task' },
      sub: { en: 'Coroutines A, B', bn: 'Coroutine A, B' },
      wide: [ 130, 270, 'up' ],
      narrow: [ 110, 80, 'right' ]
    },
    ready: {
      icon: 'queue',
      name: { en: 'Ready queue', bn: 'Ready queue' },
      sub: { en: 'Empty', bn: 'খালি' },
      wide: [ 330, 270, 'up' ],
      narrow: [ 110, 175, 'right' ]
    },
    loop: {
      icon: 'loop',
      name: { en: 'Event loop', bn: 'Event loop' },
      sub: { en: 'One thread', bn: 'একটা thread' },
      wide: [ 530, 270, 'up' ],
      narrow: [ 110, 270, 'right' ]
    },
    selector: {
      icon: 'hourglass',
      name: { en: 'Selector', bn: 'Selector' },
      sub: { en: 'epoll / kqueue', bn: 'epoll / kqueue' },
      wide: [ 730, 270, 'down' ],
      narrow: [ 110, 365, 'right' ]
    },
    net: {
      icon: 'cloud',
      name: { en: 'Sockets', bn: 'Socket' },
      sub: { en: 'Network', bn: 'নেটওয়ার্ক' },
      wide: [ 910, 270, 'down' ],
      narrow: [ 110, 490, 'right' ]
    },
    pool: {
      icon: 'worker',
      name: { en: 'Thread pool', bn: 'Thread pool' },
      sub: { en: 'Default executor', bn: 'Default executor' },
      wide: [ 530, 410, 'right' ],
      narrow: [ 310, 490, 'down' ]
    }
  },
  groups: [
    {
      id: 'thread',
      label: { en: 'One thread', bn: 'একটা thread' },
      wide: [ 50, 110, 810, 375 ],
      narrow: [ 10, 20, 285, 410 ]
    }
  ],
  corridors: {
    'tasks-ready': {
      wide: [ [ 130, 270 ], [ 330, 270 ] ],
      narrow: [ [ 110, 80 ], [ 110, 175 ] ]
    },
    'ready-loop': {
      wide: [ [ 330, 270 ], [ 530, 270 ] ],
      narrow: [ [ 110, 175 ], [ 110, 270 ] ]
    },
    'loop-selector': {
      wide: [ [ 530, 270 ], [ 730, 270 ] ],
      narrow: [ [ 110, 270 ], [ 110, 365 ] ]
    },
    'net-selector': {
      wide: [ [ 910, 270 ], [ 730, 270 ] ],
      narrow: [ [ 110, 490 ], [ 110, 365 ] ]
    },
    'selector-ready': {
      wide: [ [ 730, 270 ], [ 730, 150 ], [ 450, 150 ], [ 330, 270 ] ],
      narrow: [ [ 110, 365 ], [ 48, 303 ], [ 48, 237 ], [ 110, 175 ] ]
    },
    'loop-tasks': {
      wide: [ [ 530, 270 ], [ 450, 350 ], [ 130, 350 ], [ 130, 270 ] ],
      narrow: [ [ 110, 270 ], [ 48, 208 ], [ 48, 142 ], [ 110, 80 ] ]
    },
    'loop-pool': {
      wide: [ [ 530, 270 ], [ 530, 410 ] ],
      narrow: [ [ 110, 270 ], [ 157, 317 ], [ 310, 317 ], [ 310, 490 ] ]
    },
    'pool-ready': {
      wide: [ [ 530, 410 ], [ 470, 410 ], [ 330, 270 ] ],
      narrow: [ [ 310, 490 ], [ 355, 445 ], [ 355, 225 ], [ 160, 225 ], [ 110, 175 ] ]
    }
  },
  edges: {
    'tasks-ready': { from: 'tasks', to: 'ready', kind: 'queue' },
    'ready-loop': { from: 'ready', to: 'loop', kind: 'request' },
    'loop-selector': { from: 'loop', to: 'selector', kind: 'queue' },
    'net-selector': { from: 'net', to: 'selector', kind: 'result' },
    'selector-ready': { from: 'selector', to: 'ready', kind: 'result' },
    'loop-tasks': { from: 'loop', to: 'tasks', kind: 'result' },
    'loop-pool': { from: 'loop', to: 'pool', kind: 'request' },
    'pool-ready': { from: 'pool', to: 'ready', kind: 'result' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'schedule',
        moves: [ { edge: 'tasks-ready', label: 'A, B' } ],
        state: {
          ready: { en: 'A, B', bn: 'A, B' },
          tasks: { en: 'A, B queued', bn: 'A, B queue-এ' }
        },
        title: { en: 'Two tasks join the queue', bn: 'দুটো task queue-তে ঢোকে' },
        simple: {
          en: 'Two jobs are put in the to-do tray. Neither has started yet.',
          bn: 'দুটো কাজ করণীয়-ট্রেতে রাখা হয়। কোনোটাই এখনো শুরু হয়নি।'
        },
        tech: {
          en: '`create_task` or `gather` wraps each coroutine in a Task and schedules its first step in the loop’s ready queue.',
          bn: '`create_task` বা `gather` প্রতিটা coroutine-কে Task-এ মোড়ে আর তার প্রথম ধাপ loop-এর ready queue-তে বসায়।'
        }
      },
      {
        id: 'run-a',
        moves: [ { edge: 'ready-loop', label: 'run A' } ],
        state: {
          loop: { en: 'Running A', bn: 'A চালাচ্ছে' },
          ready: { en: 'B', bn: 'B' },
          tasks: { en: 'A runs, B queued', bn: 'A চলছে, B queue-এ' }
        },
        title: { en: 'The loop runs task A', bn: 'Loop task A চালায়' },
        simple: {
          en: 'The single worker picks up job A and runs it.',
          bn: 'একমাত্র worker কাজ A তুলে নিয়ে চালায়।'
        },
        tech: {
          en: 'The loop takes one callback from the ready queue and runs it until the coroutine awaits. Nothing else runs meanwhile: scheduling is cooperative.',
          bn: 'loop ready queue থেকে একটা callback নিয়ে coroutine `await` না করা পর্যন্ত চালায়। এর মধ্যে আর কিছু চলে না: scheduling cooperative।'
        }
      },
      {
        id: 'a-awaits',
        moves: [ { edge: 'loop-selector', label: 'await recv()' } ],
        state: {
          loop: { en: 'A suspended', bn: 'A থেমে আছে' },
          selector: { en: 'Watching A', bn: 'A-কে দেখছে' },
          tasks: { en: 'A waits, B queued', bn: 'A অপেক্ষায়, B queue-এ' }
        },
        title: { en: 'A awaits the network', bn: 'A নেটওয়ার্কের জন্য await করে' },
        simple: {
          en: 'Job A must wait for the network, so it steps aside and asks the OS to tell it when data arrives.',
          bn: 'কাজ A-কে নেটওয়ার্কের জন্য অপেক্ষা করতে হয়, তাই সে সরে দাঁড়ায় আর OS-কে বলে ডেটা এলে জানাতে।'
        },
        tech: {
          en: '`await` on an unfinished future suspends the coroutine and returns control to the loop. The socket is registered with the selector: epoll on Linux, kqueue on macOS and BSD.',
          bn: 'অসমাপ্ত future-এ `await` করলে coroutine থেমে যায় আর control loop-এ ফেরে। socket selector-এ register হয়: Linux-এ epoll, macOS আর BSD-তে kqueue।'
        }
      },
      {
        id: 'run-b',
        moves: [ { edge: 'ready-loop', label: 'run B' } ],
        state: {
          loop: { en: 'Running B', bn: 'B চালাচ্ছে' },
          ready: { en: 'Empty', bn: 'খালি' },
          tasks: { en: 'B runs, A waits', bn: 'B চলছে, A অপেক্ষায়' }
        },
        title: { en: 'B uses the free thread', bn: 'B ফাঁকা thread পায়' },
        simple: {
          en: 'The worker moves straight to job B instead of waiting for A.',
          bn: 'worker A-র জন্য বসে না থেকে সোজা কাজ B ধরে।'
        },
        tech: {
          en: 'This is the whole benefit. While A waits for I/O, B uses the thread, and waiting costs no CPU.',
          bn: 'পুরো লাভটাই এখানে। A যখন I/O-র জন্য অপেক্ষা করে, B তখন thread ব্যবহার করে, আর অপেক্ষায় CPU খরচ হয় না।'
        }
      },
      {
        id: 'b-awaits',
        moves: [ { edge: 'loop-selector', label: 'await recv()' } ],
        state: {
          loop: { en: 'B suspended', bn: 'B থেমে আছে' },
          selector: { en: 'Watching A, B', bn: 'A, B-কে দেখছে' },
          tasks: { en: 'A, B waiting', bn: 'A, B অপেক্ষায়' }
        },
        title: { en: 'B awaits too', bn: 'B-ও await করে' },
        simple: {
          en: 'B has to wait for the network too, so it also steps aside.',
          bn: 'B-কেও নেটওয়ার্কের জন্য অপেক্ষা করতে হয়, তাই সেও সরে দাঁড়ায়।'
        },
        tech: {
          en: 'B registers its socket with the selector as well. Both tasks are now pending, and the ready queue is empty.',
          bn: 'B-ও নিজের socket selector-এ register করে। এখন দুটো task-ই pending, আর ready queue খালি।'
        }
      },
      {
        id: 'idle',
        work: { node: 'selector', kind: 'queue' },
        state: {
          loop: { en: 'Idle in select', bn: 'select-এ বসে আছে' },
          selector: { en: 'Sleeping', bn: 'ঘুমিয়ে আছে' }
        },
        title: { en: 'The loop sleeps', bn: 'Loop ঘুমায়' },
        simple: {
          en: 'With nothing to run, the loop sleeps until the OS says a socket is ready.',
          bn: 'চালানোর মতো কিছু না থাকলে loop ঘুমায়, যতক্ষণ না OS বলে কোনো socket তৈরি।'
        },
        tech: {
          en: 'When idle, the loop blocks in `select(timeout)`, where the timeout is the time to the next timer. The kernel tracks readiness, so many sockets cost little.',
          bn: 'কাজ না থাকলে loop `select(timeout)`-এ আটকে থাকে, timeout মানে পরের timer পর্যন্ত সময়। readiness kernel দেখে, তাই অনেক socket-এও খরচ কম।'
        }
      },
      {
        id: 'bytes-arrive',
        moves: [ { edge: 'net-selector', label: "A's bytes" } ],
        state: {
          net: { en: 'A’s data in', bn: 'A-র ডেটা এসেছে' },
          selector: { en: 'A ready', bn: 'A তৈরি' }
        },
        title: { en: 'Data for A arrives', bn: 'A-র ডেটা আসে' },
        simple: {
          en: 'Data for job A shows up from the network.',
          bn: 'কাজ A-র ডেটা নেটওয়ার্ক থেকে চলে আসে।'
        },
        tech: {
          en: 'The kernel marks A’s socket readable, so the blocked `select` call returns.',
          bn: 'kernel A-র socket-কে readable চিহ্নিত করে, তাই আটকে থাকা `select` call ফিরে আসে।'
        }
      },
      {
        id: 'wake-a',
        moves: [ { edge: 'selector-ready', label: 'wake A' } ],
        state: {
          ready: { en: 'A', bn: 'A' },
          loop: { en: 'Awake', bn: 'জেগেছে' },
          selector: { en: 'Watching B', bn: 'B-কে দেখছে' },
          net: { en: 'Network', bn: 'নেটওয়ার্ক' }
        },
        title: { en: 'The selector wakes A', bn: 'Selector A-কে জাগায়' },
        simple: {
          en: 'A is put back in the to-do tray.',
          bn: 'A আবার করণীয়-ট্রেতে ফিরে যায়।'
        },
        tech: {
          en: 'The loop turns the ready socket into a callback that completes A’s future and schedules A’s Task to continue. Nothing has resumed A yet.',
          bn: 'loop তৈরি socket-কে একটা callback বানায়, যা A-র future শেষ করে আর A-র Task চালিয়ে যেতে schedule করে। A এখনো চলা শুরু করেনি।'
        }
      },
      {
        id: 'resume-a',
        moves: [ { edge: 'ready-loop', label: 'resume A' } ],
        state: {
          loop: { en: 'Running A', bn: 'A চালাচ্ছে' },
          ready: { en: 'Empty', bn: 'খালি' },
          tasks: { en: 'A runs, B waits', bn: 'A চলছে, B অপেক্ষায়' }
        },
        title: { en: 'A resumes after its await', bn: 'A `await`-এর পর আবার চলে' },
        simple: {
          en: 'The worker resumes job A exactly where it paused.',
          bn: 'worker কাজ A ঠিক যেখানে থেমেছিল সেখান থেকেই আবার ধরে।'
        },
        tech: {
          en: 'The Task continues the coroutine right after its `await`, with the received bytes as the result. A runs until it finishes or awaits again.',
          bn: 'Task coroutine-কে ঠিক `await`-এর পর থেকে চালায়, পাওয়া bytes ফলাফল হিসেবে। A শেষ না হওয়া বা আবার `await` না করা পর্যন্ত চলে।'
        }
      },
      {
        id: 'a-done',
        moves: [ { edge: 'loop-tasks', label: 'A done' } ],
        state: {
          tasks: { en: 'A done, B waits', bn: 'A শেষ, B অপেক্ষায়' },
          loop: { en: 'Idle again', bn: 'আবার অলস' }
        },
        title: { en: 'A finishes, B still waits', bn: 'A শেষ করে, B তখনো অপেক্ষায়' },
        simple: {
          en: 'Job A finishes. B continues when its data comes.',
          bn: 'কাজ A শেষ হয়। B-র ডেটা এলে B এগোবে।'
        },
        tech: {
          en: 'The Task completes and its done-callbacks are scheduled. One thread served both tasks: concurrent, but never parallel.',
          bn: 'Task শেষ হয় আর তার done-callback schedule হয়। একটা thread দুটো task-ই সামলেছে: concurrent, কিন্তু কখনো parallel নয়।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'blocking',
      label: { en: 'Blocking call in `async def`', bn: '`async def`-এ blocking call' },
      branchAfter: 'run-a',
      steps: [
        {
          id: 'sleep-blocks',
          work: { node: 'loop', kind: 'error' },
          state: {
            loop: { en: 'Blocked 3 s', bn: '৩ সেকেন্ড আটকা' },
            tasks: { en: 'A blocks, B waits', bn: 'A আটকে, B অপেক্ষায়' }
          },
          title: { en: 'A blocking call freezes the loop', bn: 'Blocking call পুরো loop আটকে দেয়' },
          simple: {
            en: 'Job A does something slow without stepping aside, so the single worker is stuck.',
            bn: 'কাজ A সরে না দাঁড়িয়ে ধীর কিছু করে, তাই একমাত্র worker আটকে যায়।'
          },
          tech: {
            en: '`time.sleep(3)` or `requests.get()` inside `async def` never yields. No other task, timer or I/O callback can run. Debug mode logs callbacks slower than `slow_callback_duration`, 100 ms by default.',
            bn: '`async def`-এর ভেতরে `time.sleep(3)` বা `requests.get()` কখনো control ছাড়ে না। অন্য কোনো task, timer বা I/O callback চলতে পারে না। debug mode `slow_callback_duration`-এর বেশি ধীর callback log করে, ডিফল্ট ১০০ ms।'
          }
        },
        {
          id: 'everyone-waits',
          work: { node: [ 'ready', 'net' ], kind: 'error' },
          state: {
            ready: { en: 'B, C stuck', bn: 'B, C আটকা' },
            net: { en: 'Timeouts', bn: 'Timeout' }
          },
          title: { en: 'Everyone else waits', bn: 'বাকি সবাই অপেক্ষা করে' },
          simple: {
            en: 'Every other request stalls behind A.',
            bn: 'বাকি সব request A-র পেছনে আটকে যায়।'
          },
          tech: {
            en: 'Latency for every concurrent request becomes the blocker’s duration. Clients time out, and health checks can fail.',
            bn: 'প্রতিটা concurrent request-এর latency হয়ে যায় blocker-এর সময়ের সমান। client timeout পায়, আর health check ব্যর্থ হতে পারে।'
          }
        },
        {
          id: 'fix-await',
          work: { node: 'loop', kind: 'result' },
          state: {
            loop: { en: 'Fix: await sleep', bn: 'সমাধান: await sleep' },
            ready: { en: 'B, C can run', bn: 'B, C চলতে পারে' },
            net: { en: 'Network', bn: 'নেটওয়ার্ক' },
            tasks: { en: 'A awaits, B runs', bn: 'A await করে, B চলে' }
          },
          title: { en: 'Await instead of blocking', bn: 'Block না করে await করুন' },
          simple: {
            en: 'Use the polite “wait” version, so others can run.',
            bn: 'ভদ্র “অপেক্ষা”-র ধরনটা ব্যবহার করুন, যাতে বাকিরা চলতে পারে।'
          },
          tech: {
            en: 'Use `await asyncio.sleep(3)`, an async library such as `httpx.AsyncClient`, or offload the call to a thread.',
            bn: '`await asyncio.sleep(3)`, `httpx.AsyncClient`-এর মতো async library, বা call-টা thread-এ পাঠিয়ে দিন।'
          }
        }
      ]
    },
    {
      id: 'offload',
      label: { en: 'Offload to a thread', bn: 'Thread-এ পাঠানো' },
      branchAfter: 'run-a',
      steps: [
        {
          id: 'to-thread',
          moves: [ { edge: 'loop-pool', label: 'to_thread(f)' } ],
          state: {
            pool: { en: 'Running f()', bn: 'f() চালাচ্ছে' },
            loop: { en: 'A suspended', bn: 'A থেমে আছে' },
            tasks: { en: 'A waits, B queued', bn: 'A অপেক্ষায়, B queue-এ' }
          },
          title: { en: 'A hands the slow call to a thread', bn: 'A ধীর call thread-এ দেয়' },
          simple: {
            en: 'Job A hands the slow task to a helper thread and steps aside.',
            bn: 'কাজ A ধীর কাজটা একটা helper thread-কে দিয়ে সরে দাঁড়ায়।'
          },
          tech: {
            en: '`asyncio.to_thread(f)` submits `f` to the default executor, a `ThreadPoolExecutor` created lazily. On 3.13+ its size is `min(32, (os.process_cpu_count() or 1) + 4)`.',
            bn: '`asyncio.to_thread(f)` `f`-কে default executor-এ দেয়, যা lazily তৈরি হওয়া একটা `ThreadPoolExecutor`। 3.13+-এ তার আকার `min(32, (os.process_cpu_count() or 1) + 4)`।'
          }
        },
        {
          id: 'serve-b',
          moves: [ { edge: 'ready-loop', label: 'run B' } ],
          state: {
            loop: { en: 'Running B', bn: 'B চালাচ্ছে' },
            ready: { en: 'Empty', bn: 'খালি' },
            tasks: { en: 'B runs, A waits', bn: 'B চলছে, A অপেক্ষায়' }
          },
          title: { en: 'The loop keeps serving B', bn: 'Loop B-কে চালিয়ে যায়' },
          simple: {
            en: 'Meanwhile the worker keeps serving other jobs.',
            bn: 'এর মধ্যে worker অন্য কাজগুলো সামলে যায়।'
          },
          tech: {
            en: 'The loop carries on. The helper thread blocks in I/O and releases the GIL, so the loop thread can still run.',
            bn: 'loop চলতে থাকে। helper thread I/O-তে আটকে থাকে আর GIL ছেড়ে দেয়, তাই loop thread চলতে পারে।'
          }
        },
        {
          id: 'pool-done',
          moves: [ { edge: 'pool-ready', label: 'done' } ],
          state: {
            pool: { en: 'Idle', bn: 'বসে আছে' },
            ready: { en: 'A', bn: 'A' }
          },
          title: { en: 'The thread finishes', bn: 'Thread শেষ করে' },
          simple: {
            en: 'When the helper finishes, A goes back in the to-do tray.',
            bn: 'helper শেষ করলে A আবার করণীয়-ট্রেতে ফেরে।'
          },
          tech: {
            en: 'The result is handed back to the loop thread-safely, and A is scheduled to resume after its `await`.',
            bn: 'ফলাফল thread-safe ভাবে loop-এ ফেরত আসে, আর A তার `await`-এর পর চলতে schedule হয়।'
          }
        },
        {
          id: 'gil-caveat',
          work: { node: 'loop', kind: 'queue' },
          state: { loop: { en: 'I/O yes, CPU no', bn: 'I/O হ্যাঁ, CPU না' } },
          title: { en: 'Threads fix waiting, not computing', bn: 'Thread অপেক্ষা সারায়, হিসাব নয়' },
          simple: {
            en: 'Helper threads fix waiting, not heavy computing.',
            bn: 'helper thread অপেক্ষার সমস্যা মেটায়, ভারী হিসাবের নয়।'
          },
          tech: {
            en: 'Because of the GIL, `to_thread` can typically only make I/O-bound functions non-blocking. For CPU-bound work, use a `ProcessPoolExecutor` through `run_in_executor`.',
            bn: 'GIL-এর কারণে `to_thread` সাধারণত শুধু I/O-bound ফাংশনকে non-blocking করতে পারে। CPU-bound কাজে `run_in_executor`-এর মাধ্যমে `ProcessPoolExecutor` ব্যবহার করুন।'
          }
        }
      ]
    },
    {
      id: 'fastapi',
      label: { en: 'FastAPI def vs async def', bn: 'FastAPI-তে def বনাম async def' },
      branchAfter: 'schedule',
      steps: [
        {
          id: 'async-route',
          moves: [ { edge: 'ready-loop', label: 'async def route' } ],
          state: {
            loop: { en: 'Awaited on loop', bn: 'loop-এই await হয়' },
            ready: { en: 'Next in line', bn: 'পরেরজন লাইনে' }
          },
          title: { en: 'An async def route runs on the loop', bn: '`async def` route loop-এই চলে' },
          simple: {
            en: 'A request for an `async def` route runs straight on the event loop.',
            bn: '`async def` route-এর request সোজা event loop-এ চলে।'
          },
          tech: {
            en: 'FastAPI awaits `async def` path operations on the event loop thread. Blocking code inside one blocks every other request.',
            bn: 'FastAPI `async def` path operation event loop thread-এই await করে। ভেতরে blocking কোড থাকলে বাকি সব request আটকে যায়।'
          }
        },
        {
          id: 'def-route',
          moves: [ { edge: 'loop-pool', label: 'def route' } ],
          state: {
            pool: { en: 'AnyIO thread, 40 max', bn: 'AnyIO thread, সর্বোচ্চ ৪০' },
            loop: { en: 'Stays free', bn: 'ফাঁকা থাকে' }
          },
          title: { en: 'A def route goes to a thread', bn: '`def` route thread-এ যায়' },
          simple: {
            en: 'A plain `def` route is sent to a helper thread automatically.',
            bn: 'সাধারণ `def` route নিজে থেকেই helper thread-এ চলে যায়।'
          },
          tech: {
            en: 'FastAPI runs `def` routes in AnyIO’s threadpool, whose default limiter is 40 threads, so they do not block the loop.',
            bn: 'FastAPI `def` route AnyIO-র threadpool-এ চালায়, যার ডিফল্ট limiter ৪০ thread, তাই loop আটকায় না।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'One waiter serves many tables. The waiter never stands still: when a guest is still choosing, the waiter moves on and returns when the bell rings.',
      bn: 'একজন ওয়েটার অনেক টেবিল সামলায়। ওয়েটার কখনো দাঁড়িয়ে থাকে না: অতিথি এখনো বেছে না থাকলে সে অন্যদিকে যায়, আর ঘণ্টা বাজলে ফিরে আসে।'
    },
    twins: [
      {
        icon: 'task',
        node: 'tasks',
        name: { en: 'The tables’ orders', bn: 'টেবিলের অর্ডার' },
        d: {
          en: 'Each table has an order in progress. It pauses whenever it has to wait.',
          bn: 'প্রতিটা টেবিলের একটা অর্ডার চলছে। অপেক্ষা করতে হলেই সেটা থেমে যায়।'
        }
      },
      {
        icon: 'queue',
        node: 'ready',
        name: { en: 'Tables needing attention', bn: 'যে টেবিলে নজর দরকার' },
        d: {
          en: 'A short list of tables that can be served right now.',
          bn: 'এখনই সামলানো যায় এমন টেবিলের একটা ছোট তালিকা।'
        }
      },
      {
        icon: 'loop',
        node: 'loop',
        name: { en: 'The waiter', bn: 'ওয়েটার' },
        d: {
          en: 'One person, one table at a time. Quick visits, then straight on to the next.',
          bn: 'একজন মানুষ, একবারে একটা টেবিল। ছোট্ট একটা ভিজিট, তারপর সোজা পরেরটায়।'
        }
      },
      {
        icon: 'hourglass',
        node: 'selector',
        name: { en: 'The bell panel', bn: 'ঘণ্টার প্যানেল' },
        d: {
          en: 'A panel that lights up when a table is ready, so the waiter does not have to check each one.',
          bn: 'টেবিল তৈরি হলে প্যানেলে আলো জ্বলে, তাই ওয়েটারকে প্রতিটা টেবিল গিয়ে দেখতে হয় না।'
        }
      },
      {
        icon: 'cloud',
        node: 'net',
        name: { en: 'The kitchen and the street', bn: 'রান্নাঘর আর বাইরের দুনিয়া' },
        d: {
          en: 'Everything slow and outside the room: food coming, guests deciding.',
          bn: 'ঘরের বাইরের সব ধীর জিনিস: খাবার আসা, অতিথির সিদ্ধান্ত নেওয়া।'
        }
      },
      {
        icon: 'worker',
        node: 'pool',
        name: { en: 'The extra runner', bn: 'বাড়তি runner' },
        d: {
          en: 'Takes slow errands outside, so the waiter can keep serving tables.',
          bn: 'বাইরের ধীর কাজগুলো সামলায়, যাতে ওয়েটার টেবিল সামলে যেতে পারে।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Standing at one table', bn: 'এক টেবিলে দাঁড়িয়ে থাকা' },
        is: { en: 'is a blocking call', bn: 'মানে blocking call' },
        d: {
          en: 'The waiter waits for a guest to finish choosing. Every other table is ignored until then. The runner should take such errands.',
          bn: 'ওয়েটার একজন অতিথির বেছে নেওয়া শেষ হওয়ার অপেক্ষায় দাঁড়িয়ে থাকে। তত সময় বাকি সব টেবিল অবহেলিত। এমন কাজ runner-এর নেওয়া উচিত।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'How does asyncio get concurrency on one thread?',
        bn: 'asyncio একটা thread-এ কীভাবে concurrency পায়?'
      },
      short: {
        en: 'Cooperative multitasking: `await` plus an event loop.',
        bn: 'Cooperative multitasking: `await` আর একটা event loop।'
      },
      deep: {
        en: 'A Task runs until it awaits something pending, then the loop runs another ready Task. A selector (epoll or kqueue) reports which sockets are ready, so waiting costs no CPU.',
        bn: 'একটা Task pending কিছুতে `await` না করা পর্যন্ত চলে, তারপর loop আরেকটা ready Task চালায়। selector (epoll বা kqueue) জানায় কোন socket তৈরি, তাই অপেক্ষায় CPU খরচ হয় না।'
      },
      redFlag: {
        en: '“It spawns a thread per coroutine.”',
        bn: '“এটা প্রতি coroutine-এ একটা thread বানায়।”'
      }
    },
    {
      q: {
        en: 'What does `await` actually do?',
        bn: '`await` আসলে কী করে?'
      },
      short: {
        en: 'It suspends the current coroutine until the awaited thing completes.',
        bn: 'যেটার জন্য `await`, সেটা শেষ না হওয়া পর্যন্ত বর্তমান coroutine-কে থামিয়ে রাখে।'
      },
      deep: {
        en: 'Awaiting a coroutine runs it inline. Control returns to the loop only when something truly suspends: an unfinished future, I/O or `sleep`. `await asyncio.sleep(0)` is an explicit yield.',
        bn: 'coroutine-এ `await` করলে সেটা সেখানেই চলে। loop-এ control ফেরে কেবল যখন সত্যিই কিছু থামে: অসমাপ্ত future, I/O বা `sleep`। `await asyncio.sleep(0)` একটা স্পষ্ট yield।'
      },
      redFlag: {
        en: '“Every await switches tasks.”',
        bn: '“প্রতিটা `await`-এ task বদলায়।”'
      }
    },
    {
      q: {
        en: 'What happens if a coroutine calls `time.sleep()` or `requests.get()`?',
        bn: 'coroutine-এ `time.sleep()` বা `requests.get()` ডাকলে কী হয়?'
      },
      short: {
        en: 'It blocks the whole loop.',
        bn: 'পুরো loop আটকে যায়।'
      },
      deep: {
        en: 'No other task, timer or I/O callback runs until it returns. Use `await asyncio.sleep`, an async client or `asyncio.to_thread`. Debug mode logs callbacks over 100 ms.',
        bn: 'ফিরে না আসা পর্যন্ত অন্য কোনো task, timer বা I/O callback চলে না। `await asyncio.sleep`, async client বা `asyncio.to_thread` ব্যবহার করুন। debug mode ১০০ ms-এর বেশি callback log করে।'
      },
      redFlag: {
        en: '“Only that task waits.”',
        bn: '“শুধু ওই task-ই অপেক্ষা করে।”'
      }
    },
    {
      q: {
        en: 'How do you run blocking or CPU-heavy code from async code?',
        bn: 'async কোড থেকে blocking বা ভারী CPU কোড কীভাবে চালান?'
      },
      short: {
        en: '`asyncio.to_thread` or `run_in_executor`.',
        bn: '`asyncio.to_thread` বা `run_in_executor`।'
      },
      deep: {
        en: 'Threads suit blocking I/O. For CPU-bound code use a `ProcessPoolExecutor`, because threads gain nothing under the GIL. Mind the default executor’s size.',
        bn: 'blocking I/O-র জন্য thread। CPU-bound কোডে `ProcessPoolExecutor`, কারণ GIL-এর কারণে thread-এ লাভ নেই। default executor-এর আকারের দিকে খেয়াল রাখুন।'
      },
      redFlag: {
        en: '“Just make the function `async def`.” That does not make it non-blocking.',
        bn: '“ফাংশনটা `async def` করে দিন।” এতে সেটা non-blocking হয় না।'
      }
    },
    {
      q: {
        en: 'What does the selector do?',
        bn: 'Selector কী করে?'
      },
      short: {
        en: 'It tells the loop which file descriptors are ready.',
        bn: 'কোন file descriptor তৈরি, সেটা loop-কে জানায়।'
      },
      deep: {
        en: 'It wraps epoll on Linux, kqueue on macOS and BSD, or `select`. The kernel keeps an interest list and a ready list, so cost follows ready sockets, not total sockets. An idle loop blocks in `select`.',
        bn: 'এটা Linux-এ epoll, macOS আর BSD-তে kqueue, বা `select` মোড়ে। kernel একটা interest list আর একটা ready list রাখে, তাই খরচ ready socket-এর সংখ্যায়, মোট socket-এ নয়। অলস loop `select`-এ আটকে থাকে।'
      },
      redFlag: {
        en: '“It polls each socket in a busy loop.”',
        bn: '“এটা busy loop-এ প্রতিটা socket পোল করে।”'
      }
    },
    {
      q: {
        en: '`gather` vs `create_task` vs `TaskGroup`?',
        bn: '`gather`, `create_task` আর `TaskGroup`-এর পার্থক্য কী?'
      },
      short: {
        en: 'All run tasks concurrently. `TaskGroup` adds structured cancellation.',
        bn: 'তিনটাই task concurrent চালায়। `TaskGroup` যোগ করে structured cancellation।'
      },
      deep: {
        en: '`create_task` schedules a Task, and you must keep a reference because the loop holds only a weak one. `gather` collects results. `TaskGroup` awaits all, raises `ExceptionGroup` and cancels siblings on failure.',
        bn: '`create_task` Task schedule করে, আর আপনাকে reference ধরে রাখতে হবে কারণ loop শুধু weak reference রাখে। `gather` ফলাফল জড়ো করে। `TaskGroup` সবাইকে await করে, `ExceptionGroup` তোলে আর ব্যর্থ হলে বাকিদের cancel করে।'
      },
      redFlag: {
        en: '“Calling `coro()` without await starts it.”',
        bn: '“`await` ছাড়া `coro()` ডাকলেই সেটা শুরু হয়।”'
      }
    },
    {
      q: {
        en: 'How does FastAPI use this?',
        bn: 'FastAPI এটা কীভাবে ব্যবহার করে?'
      },
      short: {
        en: '`async def` routes run on the loop. `def` routes run in a threadpool.',
        bn: '`async def` route loop-এ চলে। `def` route threadpool-এ চলে।'
      },
      deep: {
        en: 'Sync routes run in AnyIO worker threads, whose default limiter is 40. A blocking DB call in a `def` route is fine, but the same call inside `async def` blocks the loop.',
        bn: 'sync route AnyIO worker thread-এ চলে, যার ডিফল্ট limiter ৪০। `def` route-এ blocking DB call ঠিক আছে, কিন্তু `async def`-এর ভেতরে একই call loop আটকে দেয়।'
      },
      redFlag: {
        en: '“FastAPI runs every route in a new process.”',
        bn: '“FastAPI প্রতিটা route নতুন process-এ চালায়।”'
      }
    },
    {
      q: {
        en: 'Does `asyncio.Lock` protect data across threads?',
        bn: '`asyncio.Lock` কি thread-এর মধ্যে ডেটা বাঁচায়?'
      },
      short: {
        en: 'No. It is for tasks on one loop and is not thread-safe.',
        bn: 'না। এটা এক loop-এর task-দের জন্য, আর thread-safe নয়।'
      },
      deep: {
        en: 'asyncio primitives are not thread-safe. Races across awaits are still possible: check, await, then act on a stale check.',
        bn: 'asyncio primitive thread-safe নয়। `await`-এর ফাঁকে race এখনো সম্ভব: check করুন, await করুন, তারপর পুরনো check-এর ওপর কাজ করুন।'
      },
      redFlag: {
        en: '“asyncio code cannot have race conditions.”',
        bn: '“asyncio কোডে race condition হতেই পারে না।”'
      }
    }
  ],
  cheats: [
    {
      code: 'asyncio.run(main())',
      d: {
        en: 'Create the loop, run the coroutine, close the loop.',
        bn: 'loop বানায়, coroutine চালায়, তারপর loop বন্ধ করে।'
      }
    },
    {
      code: 'async with asyncio.TaskGroup() as tg:\n    t1 = tg.create_task(a()); t2 = tg.create_task(b())',
      d: {
        en: 'Structured concurrency (3.11+).',
        bn: 'Structured concurrency (3.11+)।'
      }
    },
    {
      code: 'res = await asyncio.to_thread(blocking_fn, arg)',
      d: {
        en: 'Offload blocking I/O to a thread. Context variables carry over.',
        bn: 'blocking I/O thread-এ পাঠান। context variable সাথে যায়।'
      }
    },
    {
      code: 'loop = asyncio.get_running_loop()\nawait loop.run_in_executor(ProcessPoolExecutor(), cpu_fn, arg)',
      d: {
        en: 'Offload CPU-bound work to a process.',
        bn: 'CPU-bound কাজ process-এ পাঠান।'
      }
    },
    {
      code: 'await asyncio.sleep(0)    # explicit yield to the loop',
      d: {
        en: 'Let others run during a long coroutine.',
        bn: 'লম্বা coroutine চলার মাঝে অন্যদের চলতে দিন।'
      }
    },
    {
      code: 'asyncio.run(main(), debug=True)   # or PYTHONASYNCIODEBUG=1',
      d: {
        en: 'Logs callbacks slower than 100 ms and coroutines that were never awaited.',
        bn: '১০০ ms-এর বেশি ধীর callback আর কখনো await না করা coroutine log করে।'
      }
    },
    {
      code: 'sem = asyncio.Semaphore(10)\nasync with sem: await fetch(u)',
      d: {
        en: 'Cap how many outbound calls run at once.',
        bn: 'একসাথে কতগুলো outbound call চলবে তার সীমা দিন।'
      }
    },
    {
      code: 'async with asyncio.timeout(5): await slow()',
      d: {
        en: 'Set a deadline (3.11+).',
        bn: 'একটা deadline দিন (3.11+)।'
      }
    }
  ],
  sources: [
    { label: 'Python docs: event loop', url: 'https://docs.python.org/3/library/asyncio-eventloop.html' },
    { label: 'Python docs: coroutines and tasks', url: 'https://docs.python.org/3/library/asyncio-task.html' },
    { label: 'Python docs: developing with asyncio', url: 'https://docs.python.org/3/library/asyncio-dev.html' },
    { label: 'Python docs: synchronization primitives', url: 'https://docs.python.org/3/library/asyncio-sync.html' },
    { label: 'CPython source: base_events.py', url: 'https://github.com/python/cpython/blob/3.14/Lib/asyncio/base_events.py' },
    { label: 'Linux man page: epoll(7)', url: 'https://man7.org/linux/man-pages/man7/epoll.7.html' },
    { label: 'FastAPI docs: async', url: 'https://fastapi.tiangolo.com/async/' },
    { label: 'AnyIO docs: threads', url: 'https://anyio.readthedocs.io/en/stable/threads.html' }
  ]
}
