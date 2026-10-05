import type { Topic } from '../types'
import { UI } from '../ui'

export const multiprocessingPools: Topic = {
  slug: 'multiprocessing-pools',
  line: 'concurrency',
  title: { en: 'Multiprocessing pools', bn: 'Multiprocessing pool' },
  summary: {
    en: 'A pool starts a few worker processes once, pickles tasks to them, and returns the results in order.',
    bn: 'pool কয়েকটা worker process একবার চালু করে, task pickle করে তাদের কাছে পাঠায়, আর result ক্রম মেনে ফেরত দেয়।'
  },
  view: { wide: [ 1000, 460 ], narrow: [ 400, 580 ] },
  nodeR: { narrow: 20 },
  nodes: {
    main: {
      icon: 'server',
      name: { en: 'Parent process', bn: 'Parent process' },
      sub: { en: '__main__ guard', bn: '__main__ guard' },
      wide: [ 100, 220, 'down' ],
      narrow: [ 90, 60, 'up' ]
    },
    start: {
      icon: 'power',
      name: { en: 'Start method', bn: 'Start method' },
      sub: { en: 'forkserver / spawn', bn: 'forkserver / spawn' },
      wide: [ 300, 110, 'up' ],
      narrow: [ 90, 150, 'right' ]
    },
    tasks: {
      icon: 'queue',
      name: { en: 'Task queue', bn: 'Task queue' },
      sub: { en: 'Pickled chunks', bn: 'Pickled chunk' },
      wide: [ 300, 330, 'down' ],
      narrow: [ 320, 230, 'left' ]
    },
    w1: {
      icon: 'worker',
      name: { en: 'Worker 1', bn: 'Worker ১' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      wide: [ 560, 110, 'up' ],
      narrow: [ 180, 400, 'left' ]
    },
    w2: {
      icon: 'worker',
      name: { en: 'Worker 2', bn: 'Worker ২' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      wide: [ 560, 330, 'down' ],
      narrow: [ 260, 440, 'right' ]
    },
    results: {
      icon: 'store',
      name: { en: 'Result queue', bn: 'Result queue' },
      sub: { en: 'Pickled results', bn: 'Pickled result' },
      wide: [ 800, 220, 'right' ],
      narrow: [ 220, 530, 'right' ]
    }
  },
  groups: [
    {
      id: 'pool',
      label: { en: 'Pool', bn: 'Pool' },
      wide: [ 250, 20, 710, 390 ],
      narrow: [ 50, 110, 330, 460 ]
    }
  ],
  corridors: {
    'main-start': {
      wide: [ [ 100, 220 ], [ 210, 110 ], [ 300, 110 ] ],
      narrow: [ [ 90, 60 ], [ 90, 150 ] ]
    },
    'main-tasks': {
      wide: [ [ 100, 220 ], [ 210, 330 ], [ 300, 330 ] ],
      narrow: [ [ 90, 60 ], [ 320, 60 ], [ 320, 230 ] ]
    },
    'start-w1': {
      wide: [ [ 300, 110 ], [ 560, 110 ] ],
      narrow: [ [ 90, 150 ], [ 90, 310 ], [ 180, 400 ] ]
    },
    'start-w2': {
      wide: [ [ 300, 110 ], [ 520, 330 ], [ 560, 330 ] ],
      narrow: [ [ 90, 150 ], [ 90, 170 ], [ 260, 340 ], [ 260, 440 ] ]
    },
    'tasks-w1': {
      wide: [ [ 300, 330 ], [ 520, 110 ], [ 560, 110 ] ],
      narrow: [ [ 320, 230 ], [ 180, 370 ], [ 180, 400 ] ]
    },
    'tasks-w2': {
      wide: [ [ 300, 330 ], [ 560, 330 ] ],
      narrow: [ [ 320, 230 ], [ 320, 380 ], [ 260, 440 ] ]
    },
    'w1-results': {
      wide: [ [ 560, 110 ], [ 690, 110 ], [ 800, 220 ] ],
      narrow: [ [ 180, 400 ], [ 180, 490 ], [ 220, 530 ] ]
    },
    'w2-results': {
      wide: [ [ 560, 330 ], [ 690, 330 ], [ 800, 220 ] ],
      narrow: [ [ 260, 440 ], [ 260, 490 ], [ 220, 530 ] ]
    },
    'results-main': {
      wide: [ [ 800, 220 ], [ 100, 220 ] ],
      narrow: [ [ 220, 530 ], [ 40, 530 ], [ 40, 110 ], [ 90, 60 ] ]
    }
  },
  edges: {
    'main-start': { from: 'main', to: 'start', kind: 'request' },
    'start-w1': { from: 'start', to: 'w1', kind: 'request' },
    'start-w2': { from: 'start', to: 'w2', kind: 'request' },
    'main-tasks': { from: 'main', to: 'tasks', kind: 'queue' },
    'tasks-w1': { from: 'tasks', to: 'w1', kind: 'queue' },
    'tasks-w2': { from: 'tasks', to: 'w2', kind: 'queue' },
    'w1-results': { from: 'w1', to: 'results', kind: 'result' },
    'w2-results': { from: 'w2', to: 'results', kind: 'result' },
    'results-main': { from: 'results', to: 'main', kind: 'result' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'create',
        work: { node: 'main', kind: 'result' },
        state: { main: { en: 'Creating Pool(2)', bn: 'Pool(2) বানাচ্ছে' } },
        title: { en: 'The parent creates a pool', bn: 'Parent একটা pool বানায়' },
        simple: {
          en: 'The boss opens a team of two helpers, inside a safe “run me only once” block.',
          bn: 'বস দুজন helper-এর একটা দল খোলে, একটা নিরাপদ “আমাকে একবারই চালাও” block-এর ভেতরে।'
        },
        tech: {
          en: '`Pool(2)` or `ProcessPoolExecutor(max_workers=2)`. The default size is `os.process_cpu_count()` on 3.13+. Spawn and forkserver need the `__main__` guard.',
          bn: '`Pool(2)` বা `ProcessPoolExecutor(max_workers=2)`। ডিফল্ট সংখ্যা 3.13+-এ `os.process_cpu_count()`। spawn আর forkserver-এ `__main__` guard লাগে।'
        }
      },
      {
        id: 'start',
        moves: [ { edge: 'main-start', label: 'make 2 workers' } ],
        state: { main: { en: 'Asked for workers', bn: 'worker চেয়েছে' } },
        title: { en: 'It asks for new processes', bn: 'নতুন process চায়' },
        simple: {
          en: 'The boss asks the operating system to create the helpers.',
          bn: 'বস operating system-কে helper বানাতে বলে।'
        },
        tech: {
          en: 'The start method depends on the platform. In 3.14 the default is `forkserver` on Linux and `spawn` on macOS and Windows. `fork` is no longer the default anywhere.',
          bn: 'start method platform-ভেদে আলাদা। 3.14-এ ডিফল্ট Linux-এ `forkserver`, macOS আর Windows-এ `spawn`। `fork` আর কোথাও ডিফল্ট নয়।'
        }
      },
      {
        id: 'workers-up',
        moves: [
          { edge: 'start-w1', label: 'spawn' },
          { edge: 'start-w2', label: 'spawn' }
        ],
        state: {
          start: { en: 'Started 2 workers', bn: '২টা worker চালু' },
          w1: { en: 'Ready', bn: 'তৈরি' },
          w2: { en: 'Ready', bn: 'তৈরি' },
          main: { en: 'Waiting', bn: 'অপেক্ষায়' }
        },
        title: { en: 'Both workers start', bn: 'দুটো worker চালু হয়' },
        simple: {
          en: 'Both helpers start at once. Each is brand new, with its own memory.',
          bn: 'দুজন helper একসাথে চালু হয়। দুজনই একদম নতুন, নিজের নিজের memory নিয়ে।'
        },
        tech: {
          en: 'Each child imports the main module, which is why the guard matters, then runs a loop that reads tasks. Process start-up is the main fixed cost of a pool.',
          bn: 'প্রতিটা child main module import করে, তাই guard জরুরি, তারপর task পড়ার একটা loop চালায়। process চালু করাই pool-এর প্রধান নির্দিষ্ট খরচ।'
        }
      },
      {
        id: 'chunk',
        moves: [ { edge: 'main-tasks', label: 'pickle chunks' } ],
        state: {
          main: { en: 'Submitted map()', bn: 'map() দিয়েছে' },
          tasks: { en: '[0-3] [4-7]', bn: '[0-3] [4-7]' }
        },
        title: { en: 'The parent splits and queues work', bn: 'Parent কাজ ভাগ করে queue-তে দেয়' },
        simple: {
          en: 'The boss splits the pile into bundles and drops them in a tray.',
          bn: 'বস কাজের স্তূপ ভাগ করে বান্ডিল বানায় আর ট্রেতে রাখে।'
        },
        tech: {
          en: '`map` splits the input into chunks and pickles each one. `Pool.map` picks a chunk size from the input size and worker count. `Executor.map` uses 1 unless you set `chunksize`.',
          bn: '`map` input-কে chunk-এ ভাগ করে আর প্রতিটা pickle করে। `Pool.map` input আর worker সংখ্যা দেখে chunk size ঠিক করে। `Executor.map` ১ ধরে, `chunksize` না দিলে।'
        }
      },
      {
        id: 'compute',
        moves: [
          { edge: 'tasks-w1', label: 'chunk 0' },
          { edge: 'tasks-w2', label: 'chunk 1' }
        ],
        state: {
          tasks: { en: 'Chunks taken', bn: 'chunk নেওয়া হয়েছে' },
          w1: { en: 'Busy [0-3]', bn: 'ব্যস্ত [0-3]' },
          w2: { en: 'Busy [4-7]', bn: 'ব্যস্ত [4-7]' }
        },
        title: { en: 'Each worker grabs a chunk', bn: 'প্রতিটা worker একটা chunk নেয়' },
        simple: {
          en: 'Each helper takes a bundle and works on it. Both work at the same time.',
          bn: 'প্রতিটা helper একটা বান্ডিল নিয়ে কাজ করে। দুজনই একই সময়ে।'
        },
        tech: {
          en: 'Workers unpickle the arguments and run your function in their own interpreter, on separate cores. That is true parallelism, with no shared GIL.',
          bn: 'worker argument unpickle করে নিজের interpreter-এ আলাদা core-এ ফাংশন চালায়। এটাই আসল parallelism, কোনো shared GIL নেই।'
        }
      },
      {
        id: 'w2-first',
        moves: [ { edge: 'w2-results', label: 'r[4-7]' } ],
        state: {
          w2: { en: 'Idle', bn: 'বসে আছে' },
          w1: { en: 'Busy', bn: 'ব্যস্ত' },
          results: { en: 'Chunk 1 first', bn: 'আগে chunk ১' }
        },
        title: { en: 'Worker 2 finishes first', bn: 'Worker ২ আগে শেষ করে' },
        simple: {
          en: 'Helper 2 happens to finish first.',
          bn: 'Helper ২ আগে শেষ করে ফেলে।'
        },
        tech: {
          en: 'Completion order depends on timing, not on submission order. `imap_unordered` and `as_completed` hand results over in this arrival order.',
          bn: 'শেষ হওয়ার ক্রম নির্ভর করে সময়ের ওপর, জমা দেওয়ার ক্রমের ওপর নয়। `imap_unordered` আর `as_completed` এই এসে পৌঁছানোর ক্রমেই result দেয়।'
        }
      },
      {
        id: 'w1-second',
        moves: [ { edge: 'w1-results', label: 'r[0-3]' } ],
        state: {
          w1: { en: 'Idle', bn: 'বসে আছে' },
          results: { en: 'Chunk 0 second', bn: 'পরে chunk ০' }
        },
        title: { en: 'Worker 1 finishes second', bn: 'Worker ১ পরে শেষ করে' },
        simple: {
          en: 'Helper 1 finishes second and sends its answers too.',
          bn: 'Helper ১ পরে শেষ করে নিজের উত্তরও পাঠায়।'
        },
        tech: {
          en: 'Results are pickled in the worker and unpickled in the parent. The overhead grows with the size of the result.',
          bn: 'result worker-এ pickle হয়, parent-এ unpickle হয়। result যত বড়, খরচ তত বেশি।'
        }
      },
      {
        id: 'in-order',
        moves: [ { edge: 'results-main', label: 'reassemble' } ],
        state: {
          main: { en: 'Got [0..7] in order', bn: '[0..7] ক্রমে পেয়েছে' },
          results: { en: 'Drained', bn: 'খালি' }
        },
        title: { en: 'The parent puts them in order', bn: 'Parent ক্রমে সাজায়' },
        simple: {
          en: 'The boss puts the answers back in the original order.',
          bn: 'বস উত্তরগুলো আবার আসল ক্রমে সাজায়।'
        },
        tech: {
          en: '`Pool.map` and `Executor.map` return results in input order, whatever the finishing order. A slow early item can delay the first results.',
          bn: '`Pool.map` আর `Executor.map` শেষ হওয়ার ক্রম যা-ই হোক, input-এর ক্রমে result দেয়। শুরুর দিকের একটা ধীর item প্রথম result-গুলো দেরি করাতে পারে।'
        }
      },
      {
        id: 'shutdown',
        work: { node: 'main', kind: 'result' },
        state: {
          main: { en: 'Pool shut down', bn: 'pool বন্ধ' },
          w1: { en: 'Stopped', bn: 'বন্ধ' },
          w2: { en: 'Stopped', bn: 'বন্ধ' },
          start: { en: 'Closed', bn: 'বন্ধ' },
          tasks: { en: 'Empty', bn: 'খালি' }
        },
        title: { en: 'The pool shuts down', bn: 'pool বন্ধ হয়' },
        simple: {
          en: 'When the work is done, the boss sends the helpers home.',
          bn: 'কাজ শেষ হলে বস helper-দের ছুটি দেয়।'
        },
        tech: {
          en: '`Pool.__exit__` calls `terminate()`, not `join()`, so collect results first or call `close()` and `join()`. `ProcessPoolExecutor` as a context manager calls `shutdown(wait=True)`.',
          bn: '`Pool.__exit__` `terminate()` ডাকে, `join()` নয়, তাই আগে result নিন বা `close()` আর `join()` ডাকুন। context manager হিসেবে `ProcessPoolExecutor` `shutdown(wait=True)` ডাকে।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'unpicklable',
      label: { en: 'Unpicklable argument', bn: 'Pickle করা যায় না এমন argument' },
      branchAfter: 'workers-up',
      steps: [
        {
          id: 'pickle-fails',
          work: { node: 'main', kind: 'error' },
          state: { main: { en: 'PicklingError', bn: 'PicklingError' } },
          title: { en: 'A lambda cannot be pickled', bn: 'lambda pickle করা যায় না' },
          simple: {
            en: 'The boss cannot put a recipe made of thin air in the tray. The helpers cannot read it.',
            bn: 'বস হাওয়ায় তৈরি রেসিপি ট্রেতে রাখতে পারে না। helper-রা সেটা পড়তে পারে না।'
          },
          tech: {
            en: '`pickle` sends a function by its qualified name, and a lambda has none. Nested and REPL-defined functions fail too, with `PicklingError` or `Can’t pickle local object`.',
            bn: '`pickle` ফাংশন পাঠায় তার qualified নাম দিয়ে, আর lambda-র কোনো নাম নেই। nested আর REPL-এ বানানো ফাংশনও `PicklingError` বা `Can’t pickle local object`-এ ব্যর্থ হয়।'
          }
        },
        {
          id: 'fix-def',
          work: { node: 'main', kind: 'result' },
          state: { main: { en: 'Fix: top-level def', bn: 'সমাধান: top-level def' } },
          title: { en: 'Define it at module level', bn: 'module level-এ লিখুন' },
          simple: {
            en: 'Write the recipe in the shared cookbook instead.',
            bn: 'রেসিপিটা বরং সবার কুকবুকে লিখে রাখুন।'
          },
          tech: {
            en: 'Define the target at module level. Use `functools.partial` of a top-level function for extra arguments. Sockets, locks and DB connections generally cannot be pickled either.',
            bn: 'target ফাংশন module level-এ লিখুন। বাড়তি argument-এর জন্য top-level ফাংশনের `functools.partial` ব্যবহার করুন। socket, lock আর DB connection-ও সাধারণত pickle হয় না।'
          }
        }
      ]
    },
    {
      id: 'no-guard',
      label: { en: 'Missing `__main__` guard', bn: '`__main__` guard নেই' },
      branchAfter: 'start',
      steps: [
        {
          id: 'reimport',
          moves: [ { edge: 'start-w1', label: 'import __main__' } ],
          state: {
            start: { en: 'Spawning', bn: 'চালু করছে' },
            w1: { en: 'Importing', bn: 'import করছে' }
          },
          title: { en: 'The child re-imports the script', bn: 'Child পুরো script আবার import করে' },
          simple: {
            en: 'The new helper reads the whole script from the top, including the line that makes more helpers.',
            bn: 'নতুন helper পুরো script শুরু থেকে পড়ে, যে লাইন আরও helper বানায় সেটাসহ।'
          },
          tech: {
            en: 'Spawn and forkserver children import the main module. An unguarded top-level `Pool(...)` runs again inside the child.',
            bn: 'spawn আর forkserver-এর child main module import করে। guard ছাড়া top-level `Pool(...)` child-এর ভেতরেও আবার চলে।'
          }
        },
        {
          id: 'bootstrap-error',
          work: { node: 'w1', kind: 'error' },
          state: {
            w1: { en: 'RuntimeError', bn: 'RuntimeError' },
            main: { en: 'Pool broken', bn: 'pool ভাঙা' }
          },
          title: { en: 'Python stops the loop', bn: 'Python loop থামিয়ে দেয়' },
          simple: {
            en: 'Python stops the endless copying and shows an error.',
            bn: 'Python অন্তহীন কপি করা থামিয়ে error দেখায়।'
          },
          tech: {
            en: 'It raises “An attempt has been made to start a new process before the current process has finished its bootstrapping phase.” Fix: wrap the entry code in `if __name__ == "__main__":`.',
            bn: 'এটা “An attempt has been made to start a new process before the current process has finished its bootstrapping phase.” error দেয়। সমাধান: entry কোড `if __name__ == "__main__":`-এর ভেতরে রাখুন।'
          }
        }
      ]
    },
    {
      id: 'worker-dies',
      label: { en: 'A worker dies', bn: 'একটা worker মরে যায়' },
      branchAfter: 'compute',
      steps: [
        {
          id: 'oom',
          work: { node: 'w1', kind: 'error' },
          state: { w1: { en: 'Dead (-9)', bn: 'মৃত (-9)' } },
          title: { en: 'A worker is killed', bn: 'একটা worker মারা পড়ে' },
          simple: {
            en: 'One helper vanishes in the middle of its task.',
            bn: 'একজন helper কাজের মাঝখানে হঠাৎ উধাও হয়ে যায়।'
          },
          tech: {
            en: 'A worker killed by a signal, such as the OOM killer sending SIGKILL, loses the chunk it was working on.',
            bn: 'signal-এ মারা যাওয়া worker, যেমন OOM killer-এর SIGKILL, যে chunk নিয়ে কাজ করছিল সেটা হারিয়ে ফেলে।'
          }
        },
        {
          id: 'broken',
          work: { node: 'main', kind: 'error' },
          state: { main: { en: 'BrokenProcessPool', bn: 'BrokenProcessPool' } },
          title: { en: 'The parent loses its answer', bn: 'Parent উত্তর হারায়' },
          simple: {
            en: 'The boss may wait for an answer that never comes.',
            bn: 'বস হয়তো এমন উত্তরের অপেক্ষায় থাকে, যেটা আর আসবে না।'
          },
          tech: {
            en: '`ProcessPoolExecutor` raises `BrokenProcessPool`. Classic `Pool` can hang on a lost task, so use timeouts, `maxtasksperchild` or the executor.',
            bn: '`ProcessPoolExecutor` `BrokenProcessPool` তোলে। পুরনো `Pool` হারানো task-এ আটকে থাকতে পারে, তাই timeout, `maxtasksperchild` বা executor ব্যবহার করুন।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A boss runs a team of helpers in separate rooms. Paperwork passes through slots in the doors. Nothing is shared except photocopies sealed in envelopes.',
      bn: 'এক বস আলাদা আলাদা ঘরে একদল helper চালায়। কাগজপত্র যায় দরজার ফাঁক দিয়ে। খামে ভরা ফটোকপি ছাড়া কিছুই ভাগ করা হয় না।'
    },
    twins: [
      {
        icon: 'server',
        node: 'main',
        name: { en: 'The boss', bn: 'বস' },
        d: {
          en: 'Opens the team, hands out the work and collects the answers.',
          bn: 'দল খোলে, কাজ বিলি করে আর উত্তর জড়ো করে।'
        }
      },
      {
        icon: 'power',
        node: 'start',
        name: { en: 'The hiring office', bn: 'নিয়োগ অফিস' },
        d: {
          en: 'Creates each helper, either from a template or from scratch.',
          bn: 'প্রতিটা helper তৈরি করে, হয় একটা ছাঁচ থেকে, নয়তো একদম নতুন করে।'
        }
      },
      {
        icon: 'queue',
        node: 'tasks',
        name: { en: 'The inbox slot', bn: 'ইনবক্সের ফাঁক' },
        d: {
          en: 'Stacks of forms wait here in sealed envelopes.',
          bn: 'খামে ভরা ফর্মের স্তূপ এখানে অপেক্ষা করে।'
        }
      },
      {
        icon: 'worker',
        node: 'w1',
        name: { en: 'The first helper', bn: 'প্রথম helper' },
        d: {
          en: 'Works alone in a private room, with its own desk and its own memory.',
          bn: 'নিজের আলাদা ঘরে একা কাজ করে, নিজের ডেস্ক আর নিজের memory নিয়ে।'
        }
      },
      {
        icon: 'worker',
        node: 'w2',
        name: { en: 'The second helper', bn: 'দ্বিতীয় helper' },
        d: {
          en: 'Works at the same time in another room. Whoever finishes first posts first.',
          bn: 'একই সময়ে অন্য ঘরে কাজ করে। যে আগে শেষ করে, সে আগে পাঠায়।'
        }
      },
      {
        icon: 'store',
        node: 'results',
        name: { en: 'The outbox slot', bn: 'আউটবক্সের ফাঁক' },
        d: {
          en: 'Finished answers drop here, in the order they were done.',
          bn: 'শেষ হওয়া উত্তরগুলো এখানে পড়ে, যে ক্রমে শেষ হয়েছে সেই ক্রমে।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Mailing a living person', bn: 'জীবন্ত মানুষকে ডাকে পাঠানো' },
        is: { en: 'is an unpicklable argument', bn: 'মানে pickle-অযোগ্য argument' },
        d: {
          en: 'The boss tries to push an open database connection, or a lambda, through the slot. Only a photocopy of a document can pass.',
          bn: 'বস একটা খোলা database connection বা lambda ফাঁক দিয়ে ঢোকাতে চায়। শুধু কাগজের ফটোকপিই যেতে পারে।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'Pool vs ProcessPoolExecutor?',
        bn: 'Pool আর ProcessPoolExecutor-এর পার্থক্য কী?'
      },
      short: {
        en: 'Both are process pools. The executor has the `Future` API and fails loudly when a worker crashes.',
        bn: 'দুটোই process pool। executor-এ `Future` API আছে, আর worker crash করলে সে স্পষ্টভাবে ব্যর্থ হয়।'
      },
      deep: {
        en: '`multiprocessing.Pool` has `map`, `imap`, `apply_async` and `maxtasksperchild`. `ProcessPoolExecutor` offers `submit`, `map`, futures, `BrokenProcessPool` and works with asyncio’s `run_in_executor`.',
        bn: '`multiprocessing.Pool`-এ `map`, `imap`, `apply_async` আর `maxtasksperchild` আছে। `ProcessPoolExecutor` দেয় `submit`, `map`, future, `BrokenProcessPool`, আর asyncio-র `run_in_executor`-এর সাথে কাজ করে।'
      },
      redFlag: {
        en: '“They are unrelated; Pool uses threads.”',
        bn: '“দুটো সম্পর্কহীন; Pool thread ব্যবহার করে।”'
      }
    },
    {
      q: {
        en: 'Why must arguments and results be picklable?',
        bn: 'argument আর result কেন picklable হতে হয়?'
      },
      short: {
        en: 'They cross a process boundary as bytes.',
        bn: 'এগুলো bytes হয়ে process-এর সীমানা পার হয়।'
      },
      deep: {
        en: 'There is no shared memory. Each task is pickled into a pipe and unpickled in the worker. Lambdas, local functions, open files and locks cannot be pickled by default.',
        bn: 'shared memory নেই। প্রতিটা task pipe-এ pickle হয়ে যায় আর worker-এ unpickle হয়। lambda, local function, খোলা file আর lock ডিফল্টভাবে pickle হয় না।'
      },
      redFlag: {
        en: '“Python just passes a reference.”',
        bn: '“Python তো শুধু reference পাঠায়।”'
      }
    },
    {
      q: {
        en: 'Why the `if __name__ == "__main__":` guard?',
        bn: '`if __name__ == "__main__":` guard কেন?'
      },
      short: {
        en: 'Spawn and forkserver children re-import the main module.',
        bn: 'spawn আর forkserver-এর child main module আবার import করে।'
      },
      deep: {
        en: 'Without it, child start-up re-runs your pool-creation code and raises a bootstrapping `RuntimeError`. The main module must also be safely importable.',
        bn: 'এটা না থাকলে child চালু হতেই আপনার pool বানানোর কোড আবার চলে আর bootstrapping `RuntimeError` আসে। main module-কে নিরাপদে import করা যেতে হয়।'
      },
      redFlag: {
        en: '“It is just a style convention.”',
        bn: '“এটা শুধু একটা style রীতি।”'
      }
    },
    {
      q: {
        en: 'What does `chunksize` do?',
        bn: '`chunksize` কী করে?'
      },
      short: {
        en: 'It groups items per task to cut communication overhead.',
        bn: 'এটা প্রতি task-এ কয়েকটা item একসাথে করে যোগাযোগের খরচ কমায়।'
      },
      deep: {
        en: 'Bigger chunks mean fewer pickles and round trips but worse load balancing when item cost varies. `Executor.map` defaults to 1, which is slow for tiny items on a process pool.',
        bn: 'বড় chunk মানে কম pickle আর কম আসা-যাওয়া, কিন্তু item-এর খরচ আলাদা হলে ভাগ খারাপ হয়। `Executor.map`-এর ডিফল্ট ১, যা ছোট item-এ process pool-এ ধীর।'
      },
      redFlag: {
        en: '“It is the number of workers.”',
        bn: '“এটা worker-এর সংখ্যা।”'
      }
    },
    {
      q: {
        en: 'Does `map` preserve order?',
        bn: '`map` কি ক্রম ধরে রাখে?'
      },
      short: {
        en: 'Yes. Results come back in input order.',
        bn: 'হ্যাঁ। result input-এর ক্রমে ফেরে।'
      },
      deep: {
        en: '`imap_unordered` and `as_completed` return in completion order. That streams results and avoids head-of-line blocking behind one slow item.',
        bn: '`imap_unordered` আর `as_completed` শেষ হওয়ার ক্রমে দেয়। এতে result স্ট্রিম হয় আর একটা ধীর item-এর পেছনে আটকে থাকতে হয় না।'
      },
      redFlag: {
        en: '“Results come back in whatever order they finish.”',
        bn: '“যেভাবে শেষ হয় সেভাবেই result আসে।”'
      }
    },
    {
      q: {
        en: 'What is the default start method on Linux in 3.14?',
        bn: '3.14-এ Linux-এ ডিফল্ট start method কী?'
      },
      short: {
        en: '`forkserver`.',
        bn: '`forkserver`।'
      },
      deep: {
        en: 'It was `fork` until 3.13. macOS and Windows use `spawn`. Forking a multithreaded parent can deadlock on inherited locks. Use `get_context("fork")` explicitly if you really need it.',
        bn: '3.13 পর্যন্ত ছিল `fork`। macOS আর Windows-এ `spawn`। multithreaded parent fork করলে child-এ কপি হওয়া lock-এ deadlock হতে পারে। সত্যিই দরকার হলে `get_context("fork")` স্পষ্ট করে দিন।'
      },
      redFlag: {
        en: '“fork”, or “spawn on Linux”.',
        bn: '“fork”, বা “Linux-এ spawn”।'
      }
    },
    {
      q: {
        en: 'How does Celery’s prefork pool relate?',
        bn: 'Celery-র prefork pool-এর সাথে এর সম্পর্ক কী?'
      },
      short: {
        en: 'It is the same model: a parent plus child worker processes.',
        bn: 'মডেল একই: একটা parent আর কয়েকটা child worker process।'
      },
      deep: {
        en: 'Prefork is Celery’s default pool. It runs tasks in child processes, built on billiard, a `multiprocessing` fork, and `worker_max_tasks_per_child` recycles them. For I/O-bound tasks there are gevent, eventlet and thread pools.',
        bn: 'prefork Celery-র ডিফল্ট pool। এটা child process-এ task চালায়, billiard-এর ওপর ভিত্তি করে, যা `multiprocessing`-এর fork, আর `worker_max_tasks_per_child` সেগুলো নতুন করে চালু করে। I/O-bound task-এর জন্য gevent, eventlet আর thread pool আছে।'
      },
      redFlag: {
        en: '“Celery workers are threads.”',
        bn: '“Celery worker মানে thread।”'
      }
    },
    {
      q: {
        en: 'How many workers for CPU-bound work?',
        bn: 'CPU-bound কাজে কয়টা worker?'
      },
      short: {
        en: 'About the number of cores.',
        bn: 'প্রায় core-এর সংখ্যার সমান।'
      },
      deep: {
        en: 'More processes than cores just context-switch, and memory per worker multiplies. In containers, `os.process_cpu_count()` can differ from `os.cpu_count()` because of affinity.',
        bn: 'core-এর চেয়ে বেশি process শুধু context switch করে, আর worker প্রতি memory গুণ হয়ে যায়। container-এ affinity-র কারণে `os.process_cpu_count()` আর `os.cpu_count()` আলাদা হতে পারে।'
      },
      redFlag: {
        en: '“As many as possible; 100 workers is faster.”',
        bn: '“যত বেশি তত ভালো; ১০০ worker মানে দ্রুত।”'
      }
    }
  ],
  cheats: [
    {
      code: 'with Pool(4) as p: print(p.map(f, range(100), chunksize=10))',
      d: {
        en: 'The canonical pool. Put it under `if __name__ == "__main__":`.',
        bn: 'আদর্শ pool। এটা `if __name__ == "__main__":`-এর ভেতরে রাখুন।'
      }
    },
    {
      code: 'with ProcessPoolExecutor() as ex: futs = [ex.submit(f, i) for i in range(10)]',
      d: {
        en: 'The `Future` API. Read them with `as_completed(futs)`, in completion order.',
        bn: '`Future` API। `as_completed(futs)` দিয়ে পড়ুন, শেষ হওয়ার ক্রমে।'
      }
    },
    {
      code: 'p.imap_unordered(f, items, chunksize=20)',
      d: {
        en: 'Stream results as they finish. Avoids head-of-line blocking.',
        bn: 'result শেষ হওয়ামাত্র পান। একটা ধীর item-এর পেছনে আটকাতে হয় না।'
      }
    },
    {
      code: 'ctx = mp.get_context("spawn"); ctx.Pool(4)',
      d: {
        en: 'Choose a start method per pool without changing the global default.',
        bn: 'global ডিফল্ট না বদলে প্রতি pool-এ start method বেছে নিন।'
      }
    },
    {
      code: 'mp.get_start_method()   # forkserver on Linux 3.14',
      d: {
        en: 'What am I running? `spawn` on macOS and Windows.',
        bn: 'আমি কোনটা চালাচ্ছি? macOS আর Windows-এ `spawn`।'
      }
    },
    {
      code: 'Pool(4, maxtasksperchild=100)',
      d: {
        en: 'Recycle workers to cap memory growth. Celery calls it `worker_max_tasks_per_child`.',
        bn: 'worker নতুন করে চালু করে memory বাড়া ঠেকান। Celery-তে নাম `worker_max_tasks_per_child`।'
      }
    },
    {
      code: 'p.map(partial(f, k=3), items)   # not a lambda',
      d: {
        en: 'The pickle-safe way to bind extra arguments.',
        bn: 'বাড়তি argument বাঁধার pickle-নিরাপদ উপায়।'
      }
    },
    {
      code: 'celery -A app worker --pool=prefork --concurrency=4',
      d: {
        en: 'Celery’s prefork pool: 4 child processes.',
        bn: 'Celery-র prefork pool: ৪টা child process।'
      }
    }
  ],
  sources: [
    { label: 'Python docs: multiprocessing', url: 'https://docs.python.org/3/library/multiprocessing.html' },
    { label: 'Python docs: concurrent.futures', url: 'https://docs.python.org/3/library/concurrent.futures.html' },
    { label: 'Python docs: What’s New in 3.14', url: 'https://docs.python.org/3/whatsnew/3.14.html' },
    { label: 'Celery docs: concurrency', url: 'https://docs.celeryq.dev/en/stable/userguide/concurrency/index.html' }
  ]
}
