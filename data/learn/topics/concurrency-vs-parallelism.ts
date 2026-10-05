import type { Topic } from '../types'
import { UI } from '../ui'

export const concurrencyVsParallelism: Topic = {
  slug: 'concurrency-vs-parallelism',
  line: 'concurrency',
  title: { en: 'Concurrency vs parallelism', bn: 'কনকারেন্সি বনাম প্যারালেলিজম' },
  summary: {
    en: 'Juggling many tasks versus doing many at the same instant, and why Python threads blur the two.',
    bn: 'অনেক কাজ পালা করে সামলানো আর একই মুহূর্তে অনেক কাজ করার পার্থক্য, আর Python thread কেন এ দুটোকে গুলিয়ে দেয়।'
  },
  view: { wide: [ 900, 420 ], narrow: [ 400, 460 ] },
  nodes: {
    queue: {
      icon: 'task',
      name: { en: 'Task queue', bn: 'টাস্ক কিউ' },
      sub: { en: 'Dishes A–D', bn: 'পদ A–D' },
      wide: [ 80, 245, 'down' ],
      narrow: [ 45, 225, 'down' ]
    },
    core1: {
      icon: 'cpu',
      name: { en: 'CPU core 1', bn: 'CPU core ১' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      wide: [ 400, 170, 'down' ],
      narrow: [ 215, 150, 'down' ]
    },
    core2: {
      icon: 'cpu',
      name: { en: 'CPU core 2', bn: 'CPU core ২' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      wide: [ 400, 320, 'down' ],
      narrow: [ 215, 300, 'down' ]
    },
    wait: {
      icon: 'hourglass',
      name: { en: 'Waiting area', bn: 'অপেক্ষার জায়গা' },
      sub: { en: 'Oven, disk, network', bn: 'ওভেন, ডিস্ক, নেটওয়ার্ক' },
      wide: [ 400, 50, 'right' ],
      narrow: [ 345, 40, 'left' ]
    },
    done: {
      icon: 'check',
      name: { en: 'Finished', bn: 'শেষ' },
      sub: { en: '0 results', bn: '০টা ফলাফল' },
      wide: [ 720, 245, 'down' ],
      narrow: [ 310, 375, 'down' ]
    }
  },
  groups: [
    {
      id: 'cpu',
      label: { en: 'One machine, two cores', bn: 'একটা মেশিন, দুটো core' },
      wide: [ 200, 120, 400, 270 ],
      narrow: [ 160, 82, 105, 298 ]
    }
  ],
  corridors: {
    'queue-core1': {
      wide: [ [ 80, 245 ], [ 130, 245 ], [ 205, 170 ], [ 400, 170 ] ],
      narrow: [ [ 45, 225 ], [ 95, 225 ], [ 170, 150 ], [ 215, 150 ] ]
    },
    'queue-core2': {
      wide: [ [ 80, 245 ], [ 130, 245 ], [ 205, 320 ], [ 400, 320 ] ],
      narrow: [ [ 45, 225 ], [ 95, 225 ], [ 170, 300 ], [ 215, 300 ] ]
    },
    'core1-wait': {
      wide: [ [ 400, 170 ], [ 400, 50 ] ],
      narrow: [ [ 215, 150 ], [ 235, 150 ], [ 345, 40 ] ]
    },
    'core1-done': {
      wide: [ [ 400, 170 ], [ 570, 170 ], [ 645, 245 ], [ 720, 245 ] ],
      narrow: [ [ 215, 150 ], [ 235, 150 ], [ 310, 225 ], [ 310, 375 ] ]
    },
    'core2-done': {
      wide: [ [ 400, 320 ], [ 570, 320 ], [ 645, 245 ], [ 720, 245 ] ],
      narrow: [ [ 215, 300 ], [ 310, 300 ], [ 310, 375 ] ]
    }
  },
  edges: {
    'queue-core1': { from: 'queue', to: 'core1', kind: 'request' },
    'queue-core2': { from: 'queue', to: 'core2', kind: 'request' },
    'core1-wait': { from: 'core1', to: 'wait', kind: 'queue' },
    'wait-core1': { from: 'wait', to: 'core1', kind: 'result' },
    'core1-done': { from: 'core1', to: 'done', kind: 'result' },
    'core2-done': { from: 'core2', to: 'done', kind: 'result' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'start-a',
        moves: [ { edge: 'queue-core1', label: 'dish A' } ],
        state: { core1: { en: 'Running A', bn: 'A চালাচ্ছে' } },
        title: { en: 'One cook starts dish A', bn: 'একজন কুক A শুরু করে' },
        simple: {
          en: 'The cook picks up dish A and starts. A single cook can only work on one thing at a time.',
          bn: 'কুক A পদটা হাতে নিয়ে শুরু করে। একজন কুক একসময়ে একটা জিনিসেই হাত দিতে পারে।'
        },
        tech: {
          en: 'One core takes task A from the run queue and executes it. At any single instant a core runs only one thing.',
          bn: 'একটা core রান কিউ থেকে task A নিয়ে চালায়। যেকোনো একটা মুহূর্তে একটা core শুধু একটা জিনিসই চালায়।'
        }
      },
      {
        id: 'a-waits',
        moves: [ { edge: 'core1-wait', label: 'A zzz' } ],
        state: {
          core1: { en: 'Free', bn: 'ফাঁকা' },
          wait: { en: 'A needs oven', bn: 'A ওভেনে' }
        },
        title: { en: 'A has to bake', bn: 'A-কে বেক হতে হবে' },
        simple: {
          en: 'Dish A needs the oven. The cook sets it aside instead of staring at the oven.',
          bn: 'A পদটার ওভেন লাগে। কুক ওভেনের দিকে তাকিয়ে না থেকে সেটা একপাশে রেখে দেয়।'
        },
        tech: {
          en: 'Task A blocks on slow I/O. The core is released instead of spinning, and that is what makes interleaving possible.',
          bn: 'Task A ধীর I/O-তে আটকে যায়। core ঘুরতে না থেকে ছাড়া পায়, আর এতেই interleaving সম্ভব হয়।'
        }
      },
      {
        id: 'start-b',
        moves: [ { edge: 'queue-core1', label: 'dish B' } ],
        state: { core1: { en: 'Running B', bn: 'B চালাচ্ছে' } },
        title: { en: 'The same cook starts B', bn: 'একই কুক B শুরু করে' },
        simple: {
          en: 'While A bakes, the same cook starts dish B. Two dishes are now in progress.',
          bn: 'A যখন বেক হচ্ছে, একই কুক B শুরু করে। এখন দুটো পদ চলমান।'
        },
        tech: {
          en: 'The core runs B during A’s wait. Two tasks are in progress but only one executes at a time: that is concurrency.',
          bn: 'A-র অপেক্ষার সময় core B চালায়। দুটো task চলমান, কিন্তু একসময়ে একটাই চলে: এটাই concurrency।'
        }
      },
      {
        id: 'a-resumes',
        moves: [ { edge: 'wait-core1', label: 'ready' } ],
        state: {
          core1: { en: 'Resumes A', bn: 'A ধরে' },
          wait: { en: 'Empty', bn: 'ফাঁকা' }
        },
        title: { en: 'The oven pings', bn: 'ওভেন বেজে ওঠে' },
        simple: {
          en: 'The oven pings. The cook pauses B and goes back to finish A.',
          bn: 'ওভেন বেজে ওঠে। কুক B থামিয়ে A শেষ করতে ফিরে আসে।'
        },
        tech: {
          en: 'A’s I/O completes, so A can resume. The switch is a context switch for OS threads, or a resume at `await` in asyncio.',
          bn: 'A-র I/O শেষ, তাই A আবার চলতে পারে। OS thread-এ এটা context switch, আর asyncio-তে `await`-এ resume।'
        }
      },
      {
        id: 'a-done',
        moves: [ { edge: 'core1-done', label: 'dish A' } ],
        state: {
          done: { en: '1 result', bn: '১টা ফলাফল' },
          core1: { en: 'Back to B', bn: 'আবার B' }
        },
        title: { en: 'Dish A is finished', bn: 'A তৈরি' },
        simple: {
          en: 'Dish A goes out. The cook returns to B.',
          bn: 'A পদটা বেরিয়ে যায়। কুক আবার B-তে ফেরে।'
        },
        tech: {
          en: 'A completes and B continues on the same core. Total time beats running A then B, because B used A’s idle time.',
          bn: 'A শেষ হয় আর B একই core-এ চলতে থাকে। A-র পর B চালানোর চেয়ে মোট সময় কম, কারণ B, A-র ফাঁকা সময়টা কাজে লাগিয়েছে।'
        }
      },
      {
        id: 'b-done',
        moves: [ { edge: 'core1-done', label: 'dish B' } ],
        state: {
          done: { en: '2 results', bn: '২টা ফলাফল' },
          core1: { en: 'Idle', bn: 'বসে আছে' }
        },
        title: { en: 'B is finished too', bn: 'B-ও তৈরি' },
        simple: {
          en: 'One cook made both dishes. Two were in progress, but never two being worked on at once.',
          bn: 'একজন কুকই দুটো পদ বানাল। দুটো চলমান ছিল, কিন্তু একই মুহূর্তে দুটোতে হাত পড়েনি।'
        },
        tech: {
          en: 'One core progressed two tasks by interleaving. Concurrency does not need more than one core.',
          bn: 'একটা core interleaving করে দুটো task এগিয়েছে। concurrency-র জন্য একের বেশি core লাগে না।'
        }
      },
      {
        id: 'two-start',
        moves: [ { edge: 'queue-core1', label: 'dish C' }, { edge: 'queue-core2', label: 'dish D' } ],
        state: {
          core1: { en: 'Running C', bn: 'C চালাচ্ছে' },
          core2: { en: 'Running D', bn: 'D চালাচ্ছে' }
        },
        title: { en: 'Two cooks start together', bn: 'দুই কুক একসাথে শুরু করে' },
        simple: {
          en: 'Now two cooks start two dishes at the exact same moment.',
          bn: 'এবার দুই কুক ঠিক একই মুহূর্তে দুটো পদ শুরু করে।'
        },
        tech: {
          en: 'Two cores execute two instruction streams at the same instant: parallelism. It needs more than one core and a runtime that can use them.',
          bn: 'দুটো core একই মুহূর্তে দুটো instruction stream চালায়: এটাই parallelism। এর জন্য একের বেশি core আর সেগুলো কাজে লাগানোর runtime লাগে।'
        }
      },
      {
        id: 'two-done',
        moves: [ { edge: 'core1-done', label: 'dish C' }, { edge: 'core2-done', label: 'dish D' } ],
        state: {
          done: { en: '4 results', bn: '৪টা ফলাফল' },
          core1: { en: 'Idle', bn: 'বসে আছে' },
          core2: { en: 'Idle', bn: 'বসে আছে' }
        },
        title: { en: 'Both finish together', bn: 'দুটোই একসাথে শেষ' },
        simple: {
          en: 'Both dishes finish together, in about half the time one cook would need.',
          bn: 'দুটো পদই একসাথে শেষ, একজন কুকের লাগা সময়ের প্রায় অর্ধেকে।'
        },
        tech: {
          en: 'Two equal CPU-bound jobs take about half the wall-clock time, minus overhead. Interleaving alone only helps when tasks wait.',
          bn: 'সমান দুটো CPU-bound কাজে wall-clock সময় প্রায় অর্ধেক, overhead বাদে। শুধু interleaving তখনই কাজে লাগে যখন task অপেক্ষা করে।'
        }
      },
      {
        id: 'tally',
        work: { node: 'done', kind: 'result' },
        state: { done: { en: 'Juggle vs do at once', bn: 'পালা করা বনাম একসাথে করা' } },
        title: { en: 'Juggling is not doing at once', bn: 'পালা করা আর একসাথে করা এক নয়' },
        simple: {
          en: 'Concurrency is juggling many things. Parallelism is doing many things at once. You can have either, or both.',
          bn: 'concurrency হলো অনেক কাজ পালা করে সামলানো। parallelism হলো একসাথে অনেক কাজ করা। যেকোনো একটা থাকতে পারে, বা দুটোই।'
        },
        tech: {
          en: 'Concurrency is how work is structured and scheduled. Parallelism is simultaneous execution, which needs several execution units.',
          bn: 'concurrency হলো কাজ কীভাবে সাজানো ও schedule করা হয়। parallelism হলো একসাথে চালানো, যার জন্য একাধিক execution unit লাগে।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'gil-threads',
      label: { en: 'Python threads, no speed-up', bn: 'Python thread, গতি বাড়ে না' },
      branchAfter: 'b-done',
      steps: [
        {
          id: 't-start',
          moves: [ { edge: 'queue-core1', label: 'T1' }, { edge: 'queue-core2', label: 'T2' } ],
          state: {
            done: { en: '2 so far', bn: '২টা আছে' },
            core1: { en: 'T1 running', bn: 'T1 চলছে' },
            core2: { en: 'T2 running?', bn: 'T2 চলছে?' }
          },
          title: { en: 'Two threads, two cores', bn: 'দুটো thread, দুটো core' },
          simple: {
            en: 'Two Python threads each land on their own core. You would hope both run at full speed.',
            bn: 'দুটো Python thread আলাদা আলাদা core-এ বসে। আশা করা যায় দুটোই পুরো গতিতে চলবে।'
          },
          tech: {
            en: 'Two CPU-bound `threading.Thread`s on a GIL build are placed on two cores by the OS.',
            bn: 'GIL build-এ দুটো CPU-bound `threading.Thread`-কে OS দুটো core-এ বসায়।'
          }
        },
        {
          id: 't-blocked',
          work: { node: 'core2', kind: 'error' },
          state: { core2: { en: 'Waits for GIL', bn: 'GIL-এর অপেক্ষায়' } },
          title: { en: 'Only one may run Python', bn: 'একজনই Python চালাতে পারে' },
          simple: {
            en: 'Only one of them may run Python code at a time. The other waits, even though it has its own core.',
            bn: 'একসময়ে একজনই Python কোড চালাতে পারে। অন্যজন নিজের core থাকা সত্ত্বেও বসে থাকে।'
          },
          tech: {
            en: 'The GIL lets one thread execute bytecode at a time, so core 2 idles. For CPU work, the docs point to `multiprocessing` or `ProcessPoolExecutor`.',
            bn: 'GIL একসময়ে একটা thread-কেই bytecode চালাতে দেয়, তাই core ২ বসে থাকে। CPU-র কাজে ডকস `multiprocessing` বা `ProcessPoolExecutor` বলে।'
          }
        },
        {
          id: 't1-done',
          moves: [ { edge: 'core1-done', label: 'T1 (~2t)' } ],
          state: { done: { en: 'T1 at ~2t', bn: 'T1, সময় ~2t' } },
          title: { en: 'T1 finishes late', bn: 'T1 দেরিতে শেষ' },
          simple: {
            en: 'The two threads took turns the whole way, so the first one finishes only after about two dish-times.',
            bn: 'দুটো thread পুরো সময় পালা করে চলেছে, তাই প্রথমটা শেষ হয় প্রায় দুই পদের সময় পরে।'
          },
          tech: {
            en: 'Threads take turns on the GIL, switching about every switch interval. The alternation repeats for the whole run, so T1 ends near 2t, not t.',
            bn: 'thread-গুলো GIL-এ পালা করে চলে, প্রায় প্রতি switch interval-এ বদলায়। এই পালাবদল পুরো সময় চলে, তাই T1 শেষ হয় প্রায় 2t-তে, t-তে নয়।'
          }
        },
        {
          id: 't2-done',
          moves: [ { edge: 'core2-done', label: 'T2 (~2t)' } ],
          state: {
            done: { en: 'Both at ~2t', bn: 'দুজনই ~2t' },
            core2: { en: 'Idle', bn: 'বসে আছে' }
          },
          title: { en: 'T2 finishes together', bn: 'T2 প্রায় একসাথে শেষ' },
          simple: {
            en: 'The second thread ends about then too. Both took twice as long, as if there were only one cook.',
            bn: 'দ্বিতীয় thread-ও প্রায় তখনই শেষ হয়। দুজনেরই দ্বিগুণ সময় লেগেছে, যেন কুক একজনই ছিল।'
          },
          tech: {
            en: 'No speed-up for pure-Python CPU work. Use processes, GIL-releasing C extensions, 3.14 `InterpreterPoolExecutor`, or a free-threaded build.',
            bn: 'খাঁটি Python CPU-র কাজে গতি বাড়ে না। process, GIL ছেড়ে দেওয়া C extension, 3.14-এর `InterpreterPoolExecutor` বা free-threaded build ব্যবহার করুন।'
          }
        }
      ]
    },
    {
      id: 'io-free',
      label: { en: 'Waiting costs nothing', bn: 'অপেক্ষার খরচ নেই' },
      branchAfter: 'start-b',
      steps: [
        {
          id: 'many-wait',
          work: { node: 'wait', kind: 'queue' },
          state: {
            wait: { en: '1000 waiting', bn: '১০০০টা অপেক্ষায়' }
          },
          title: { en: 'A thousand dishes baking', bn: 'হাজারটা পদ বেক হচ্ছে' },
          simple: {
            en: 'A thousand dishes can bake at once while the cook keeps working on B.',
            bn: 'হাজারটা পদ একসাথে বেক হতে পারে, আর কুক তখনও B-তে কাজ করে যায়।'
          },
          tech: {
            en: 'Waiting tasks cost no CPU. That is why threads or asyncio scale to many I/O-bound connections on one core.',
            bn: 'অপেক্ষারত task-এ CPU খরচ হয় না। তাই thread বা asyncio একটা core-এই অনেক I/O-bound কানেকশন সামলাতে পারে।'
          }
        },
        {
          id: 'ready-one',
          moves: [ { edge: 'wait-core1', label: 'ready' } ],
          state: { core1: { en: 'Runs one ready', bn: 'তৈরিটা ধরে' } },
          title: { en: 'Serve whichever is ready', bn: 'যেটা তৈরি সেটাই' },
          simple: {
            en: 'The cook handles whichever dish is ready next.',
            bn: 'কুক যে পদটা পরের তৈরি, সেটাই সামলায়।'
          },
          tech: {
            en: 'The runtime wakes only ready tasks, via the OS scheduler for threads or a selector such as epoll for asyncio.',
            bn: 'runtime শুধু তৈরি task-কেই জাগায়: thread-এর ক্ষেত্রে OS scheduler দিয়ে, asyncio-তে epoll-এর মতো selector দিয়ে।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'Think of a kitchen. One cook juggling two dishes is concurrency; two cooks working side by side is parallelism.',
      bn: 'একটা রান্নাঘর ভাবুন। একজন কুক দুটো পদ পালা করে সামলালে সেটা concurrency; দুজন কুক পাশাপাশি রান্না করলে সেটা parallelism।'
    },
    twins: [
      {
        icon: 'task',
        node: 'queue',
        name: { en: 'Order tickets', bn: 'অর্ডার টিকিট' },
        d: {
          en: 'The pile of dishes waiting to be started.',
          bn: 'শুরু হওয়ার অপেক্ষায় থাকা পদের স্তূপ।'
        }
      },
      {
        icon: 'cpu',
        node: 'core1',
        name: { en: 'The first cook', bn: 'প্রথম কুক' },
        d: {
          en: 'Has hands for one thing at a time, but can switch dishes when one is waiting.',
          bn: 'একসময়ে এক কাজেই হাত দিতে পারে, তবে একটা পদ অপেক্ষায় থাকলে অন্যটায় যেতে পারে।'
        }
      },
      {
        icon: 'cpu',
        node: 'core2',
        name: { en: 'The second cook', bn: 'দ্বিতীয় কুক' },
        d: {
          en: 'An independent pair of hands. Together the two can really work at the same instant.',
          bn: 'আলাদা আরেক জোড়া হাত। দুজনে মিলে সত্যিই একই মুহূর্তে কাজ করতে পারে।'
        }
      },
      {
        icon: 'hourglass',
        node: 'wait',
        name: { en: 'The oven timer', bn: 'ওভেনের টাইমার' },
        d: {
          en: 'A dish sits here while it bakes. Waiting needs no cook at all.',
          bn: 'বেক হওয়ার সময় পদটা এখানে থাকে। অপেক্ষা করতে কুকের দরকারই হয় না।'
        }
      },
      {
        icon: 'check',
        node: 'done',
        name: { en: 'The pass window', bn: 'পাস উইন্ডো' },
        d: {
          en: 'Where finished dishes are handed out.',
          bn: 'যেখানে তৈরি পদ তুলে দেওয়া হয়।'
        }
      },
      {
        icon: 'lock',
        node: null,
        name: { en: 'One knife, one stove', bn: 'একটা ছুরি, একটা চুলা' },
        is: { en: 'is the GIL', bn: 'মানে GIL' },
        d: {
          en: 'You hired two cooks, but they share one knife and one stove. The second cook stands idle.',
          bn: 'দুজন কুক রেখেছেন, কিন্তু তাদের একটাই ছুরি আর একটাই চুলা। দ্বিতীয় কুক বসে থাকে।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'What is the difference between concurrency and parallelism?',
        bn: 'concurrency আর parallelism-এর পার্থক্য কী?'
      },
      short: {
        en: 'Concurrency is managing many tasks in progress. Parallelism is executing many at the same instant.',
        bn: 'concurrency হলো অনেক task চলমান রাখা। parallelism হলো একই মুহূর্তে অনেক task চালানো।'
      },
      deep: {
        en: 'Concurrency is about structure and works on one core by interleaving. Parallelism needs several cores. A system can be either, or both.',
        bn: 'concurrency হলো কাজের কাঠামো, আর interleaving করে এক core-এই চলে। parallelism-এ একাধিক core লাগে। একটা সিস্টেম যেকোনো একটা হতে পারে, বা দুটোই।'
      },
      redFlag: {
        en: '“They are the same thing” or “parallel just means faster concurrent”.',
        bn: '“দুটো একই জিনিস” বা “parallel মানে শুধু দ্রুত concurrent”।'
      }
    },
    {
      q: {
        en: 'Can you have concurrency on a single core?',
        bn: 'এক core-এ কি concurrency সম্ভব?'
      },
      short: {
        en: 'Yes, by interleaving tasks at waits or by time-slicing.',
        bn: 'হ্যাঁ, অপেক্ষার সময় বা time-slicing করে task পালা করে চালিয়ে।'
      },
      deep: {
        en: 'The OS schedules threads on a core in preemptive time slices. asyncio switches cooperatively at `await`. Several tasks progress, but never two instruction streams at once.',
        bn: 'OS preemptive time slice-এ thread-কে core-এ schedule করে। asyncio `await`-এ নিজে থেকে ছেড়ে দিয়ে বদলায়। কয়েকটা task এগোয়, কিন্তু একসাথে দুটো instruction stream চলে না।'
      },
      redFlag: {
        en: '“No, you need multiple cores.”',
        bn: '“না, একাধিক core লাগবেই।”'
      }
    },
    {
      q: {
        en: 'Which problems benefit from concurrency, and which from parallelism?',
        bn: 'কোন সমস্যায় concurrency কাজে লাগে, আর কোনটায় parallelism?'
      },
      short: {
        en: 'I/O-bound work benefits from concurrency. CPU-bound work benefits from parallelism.',
        bn: 'I/O-bound কাজে concurrency, CPU-bound কাজে parallelism।'
      },
      deep: {
        en: 'Waiting tasks leave the CPU idle, so interleaving hides latency. CPU-bound tasks have no idle time, so only more cores help.',
        bn: 'অপেক্ষারত task CPU ফাঁকা রাখে, তাই interleaving latency আড়াল করে। CPU-bound task-এ ফাঁকা সময় নেই, তাই শুধু বেশি core-ই কাজে লাগে।'
      },
      redFlag: {
        en: '“Add threads to speed up any slow code.”',
        bn: '“যেকোনো ধীর কোড দ্রুত করতে thread যোগ করুন।”'
      }
    },
    {
      q: {
        en: 'Do Python threads run in parallel?',
        bn: 'Python thread কি parallel চলে?'
      },
      short: {
        en: 'Not for pure-Python bytecode on the default GIL build. Yes for I/O waits and GIL-releasing C code.',
        bn: 'ডিফল্ট GIL build-এ খাঁটি Python bytecode-এ না। I/O অপেক্ষা আর GIL ছাড়া C কোডে হ্যাঁ।'
      },
      deep: {
        en: 'Only one thread holds the GIL, but blocking I/O releases it, so I/O threads overlap. Free-threaded builds, officially supported in 3.14 but optional, allow parallel bytecode.',
        bn: 'GIL একটা thread-ই ধরে, কিন্তু blocking I/O সেটা ছেড়ে দেয়, তাই I/O thread-গুলো overlap করে। free-threaded build (3.14-এ অফিসিয়াল সাপোর্ট, তবে ঐচ্ছিক) parallel bytecode চালাতে দেয়।'
      },
      redFlag: {
        en: '“Python cannot do threads or parallelism at all.”',
        bn: '“Python-এ thread বা parallelism একদমই হয় না।”'
      }
    },
    {
      q: {
        en: 'How would you speed up a CPU-bound Python function across 8 cores?',
        bn: '৮ core জুড়ে একটা CPU-bound Python ফাংশন কীভাবে দ্রুত করবেন?'
      },
      short: {
        en: 'Use `ProcessPoolExecutor` or `multiprocessing`, or a library that releases the GIL.',
        bn: '`ProcessPoolExecutor` বা `multiprocessing` ব্যবহার করুন, অথবা GIL ছাড়ে এমন লাইব্রেরি।'
      },
      deep: {
        en: 'Each process has its own interpreter and GIL. Mind pickling cost and chunk size. Subinterpreters or a free-threaded build are alternatives.',
        bn: 'প্রতিটি process-এর নিজের interpreter আর GIL আছে। pickling খরচ আর chunk size খেয়াল রাখুন। subinterpreter বা free-threaded build বিকল্প।'
      },
      redFlag: {
        en: '“Use ThreadPoolExecutor with 8 workers.”',
        bn: '“৮ worker-সহ ThreadPoolExecutor ব্যবহার করুন।”'
      }
    },
    {
      q: {
        en: 'How would you speed up 500 HTTP calls?',
        bn: '৫০০টা HTTP কল কীভাবে দ্রুত করবেন?'
      },
      short: {
        en: 'Use asyncio or a thread pool, because the calls are I/O-bound.',
        bn: 'asyncio বা thread pool ব্যবহার করুন, কারণ কলগুলো I/O-bound।'
      },
      deep: {
        en: 'Latency dominates, so the waits overlap. Cap concurrency with a semaphore. Processes add heavy overhead for little gain.',
        bn: 'latency-ই মূল খরচ, তাই অপেক্ষাগুলো overlap করে। semaphore দিয়ে concurrency সীমিত রাখুন। process-এ overhead ভারী, লাভ সামান্য।'
      },
      redFlag: {
        en: '“Use multiprocessing because it is faster.”',
        bn: '“multiprocessing ব্যবহার করুন, কারণ ওটা দ্রুত।”'
      }
    },
    {
      q: {
        en: 'Is asyncio parallel?',
        bn: 'asyncio কি parallel?'
      },
      short: {
        en: 'No. It runs on one thread and is concurrent only.',
        bn: 'না। এটা এক thread-এ চলে, শুধু concurrent।'
      },
      deep: {
        en: 'The event loop runs one callback at a time and tasks interleave at `await`. Parallelism appears only if you offload work to threads or processes.',
        bn: 'event loop একসময়ে একটা callback চালায়, আর task-গুলো `await`-এ পালা বদলায়। thread বা process-এ কাজ পাঠালেই শুধু parallelism আসে।'
      },
      redFlag: {
        en: '“asyncio runs tasks on multiple cores.”',
        bn: '“asyncio একাধিক core-এ task চালায়।”'
      }
    },
    {
      q: {
        en: 'Can more threads make things slower?',
        bn: 'বেশি thread কি কাজ ধীর করে দিতে পারে?'
      },
      short: {
        en: 'Yes, from contention and context switching.',
        bn: 'হ্যাঁ, contention আর context switching-এর কারণে।'
      },
      deep: {
        en: 'Once cores or I/O are saturated, extra threads add switching cost, stack memory and lock contention. With the GIL they also add convoy effects.',
        bn: 'core বা I/O ভরে গেলে বাড়তি thread switching খরচ, stack memory আর lock contention বাড়ায়। GIL থাকলে convoy effect-ও যোগ হয়।'
      },
      redFlag: {
        en: '“More threads is always faster.”',
        bn: '“বেশি thread মানেই বেশি দ্রুত।”'
      }
    }
  ],
  cheats: [
    {
      code: 'import os; print(os.process_cpu_count())',
      d: {
        en: 'Cores this process may use (3.13+). `os.cpu_count()` is the machine total.',
        bn: 'এই process যতগুলো core ব্যবহার করতে পারে (3.13+)। `os.cpu_count()` মেশিনের মোট।'
      }
    },
    {
      code: 'from concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor() as ex:\n    list(ex.map(fetch, urls))',
      d: {
        en: 'Threads for waiting-heavy work. Default workers: `min(32, cpus + 4)` on 3.13+.',
        bn: 'অপেক্ষা-ভারী কাজে thread। 3.13+ এ ডিফল্ট worker `min(32, cpus + 4)`।'
      }
    },
    {
      code: 'from concurrent.futures import ProcessPoolExecutor\nwith ProcessPoolExecutor() as ex:\n    list(ex.map(crunch, jobs, chunksize=50))',
      d: {
        en: 'Processes for CPU-heavy work.',
        bn: 'CPU-ভারী কাজে process।'
      }
    },
    {
      code: 'import asyncio\nawait asyncio.gather(*(fetch(u) for u in urls))',
      d: {
        en: 'Many I/O waits on one thread. Concurrent, not parallel.',
        bn: 'এক thread-এ অনেক I/O অপেক্ষা। concurrent, parallel নয়।'
      }
    },
    {
      code: 'import sys; sys._is_gil_enabled()',
      d: {
        en: '3.13+: is the GIL on right now? Tells you if threads can run bytecode in parallel.',
        bn: '3.13+: GIL এখন চালু কি না? thread parallel bytecode চালাতে পারবে কি না তা বোঝায়।'
      }
    },
    {
      code: 'python -VV',
      d: {
        en: 'Mentions “free-threading build” when you run one.',
        bn: 'free-threaded build চালালে “free-threading build” লেখা দেখায়।'
      }
    },
    {
      code: 'import time\nt = time.perf_counter()\nwork()\nprint(time.perf_counter() - t)',
      d: {
        en: 'Measure wall-clock before and after. Never assume a speed-up.',
        bn: 'আগে-পরে wall-clock মাপুন। গতি বাড়বে ধরে নেবেন না।'
      }
    }
  ],
  sources: [
    { label: 'Python docs: threading', url: 'https://docs.python.org/3/library/threading.html' },
    { label: 'Python docs: glossary (GIL)', url: 'https://docs.python.org/3/glossary.html' },
    { label: 'Python docs: concurrent.futures', url: 'https://docs.python.org/3/library/concurrent.futures.html' },
    { label: 'Python docs: free-threading HOWTO', url: 'https://docs.python.org/3/howto/free-threading-python.html' }
  ]
}
