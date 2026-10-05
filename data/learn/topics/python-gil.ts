import type { Topic } from '../types'
import { UI } from '../ui'

export const pythonGil: Topic = {
  slug: 'python-gil',
  line: 'concurrency',
  title: { en: 'The Python GIL', bn: 'Python GIL' },
  summary: {
    en: 'The GIL lets one thread run Python bytecode at a time. Waiting on I/O or some C code frees it for others.',
    bn: 'GIL একসময়ে একটাই thread-কে Python bytecode চালাতে দেয়। I/O-তে অপেক্ষা বা কিছু C কোডের সময় সেটা অন্যদের জন্য ছাড়া হয়।'
  },
  view: { wide: [ 980, 460 ], narrow: [ 400, 560 ] },
  nodes: {
    t1: {
      icon: 'thread',
      name: { en: 'Thread 1', bn: 'Thread ১' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      wide: [ 280, 150, 'left' ],
      narrow: [ 70, 140, 'up' ]
    },
    t2: {
      icon: 'thread',
      name: { en: 'Thread 2', bn: 'Thread ২' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      wide: [ 280, 380, 'left' ],
      narrow: [ 330, 140, 'up' ]
    },
    gil: {
      icon: 'lock',
      name: { en: 'The GIL', bn: 'The GIL' },
      sub: { en: 'Free', bn: 'খালি' },
      wide: [ 280, 265, 'left' ],
      narrow: [ 200, 140, 'up' ]
    },
    interp: {
      icon: 'code',
      name: { en: 'Interpreter', bn: 'Interpreter' },
      sub: { en: 'Runs bytecode', bn: 'bytecode চালায়' },
      wide: [ 640, 265, 'down' ],
      narrow: [ 200, 270, 'down' ]
    },
    io: {
      icon: 'cloud',
      name: { en: 'Network / disk', bn: 'Network / disk' },
      sub: { en: 'Outside world', bn: 'বাইরের জগৎ' },
      wide: [ 860, 380, 'down' ],
      narrow: [ 330, 470, 'down' ]
    },
    cext: {
      icon: 'box',
      name: { en: 'C extension', bn: 'C extension' },
      sub: { en: 'hashlib, NumPy', bn: 'hashlib, NumPy' },
      wide: [ 680, 80, 'down' ],
      narrow: [ 70, 340, 'down' ]
    }
  },
  groups: [
    {
      id: 'proc',
      label: { en: 'One CPython process', bn: 'একটা CPython process' },
      wide: [ 40, 40, 690, 380 ],
      narrow: [ 30, 40, 340, 390 ]
    }
  ],
  corridors: {
    'gil-t1': {
      wide: [ [ 280, 265 ], [ 280, 150 ] ],
      narrow: [ [ 200, 140 ], [ 70, 140 ] ]
    },
    'gil-t2': {
      wide: [ [ 280, 265 ], [ 280, 380 ] ],
      narrow: [ [ 200, 140 ], [ 330, 140 ] ]
    },
    't1-interp': {
      wide: [ [ 280, 150 ], [ 525, 150 ], [ 640, 265 ] ],
      narrow: [ [ 70, 140 ], [ 200, 270 ] ]
    },
    't2-interp': {
      wide: [ [ 280, 380 ], [ 395, 265 ], [ 640, 265 ] ],
      narrow: [ [ 330, 140 ], [ 200, 270 ] ]
    },
    't2-io': {
      wide: [ [ 280, 380 ], [ 860, 380 ] ],
      narrow: [ [ 330, 140 ], [ 330, 470 ] ]
    },
    't1-cext': {
      wide: [ [ 280, 150 ], [ 350, 80 ], [ 680, 80 ] ],
      narrow: [ [ 70, 140 ], [ 70, 340 ] ]
    }
  },
  edges: {
    'gil-t1': { from: 'gil', to: 't1', kind: 'result' },
    'gil-t2': { from: 'gil', to: 't2', kind: 'result' },
    't1-gil': { from: 't1', to: 'gil', kind: 'queue' },
    't2-gil': { from: 't2', to: 'gil', kind: 'queue' },
    't1-interp': { from: 't1', to: 'interp', kind: 'request' },
    't2-interp': { from: 't2', to: 'interp', kind: 'request' },
    't2-io': { from: 't2', to: 'io', kind: 'queue' },
    'io-t2': { from: 'io', to: 't2', kind: 'result' },
    't1-cext': { from: 't1', to: 'cext', kind: 'request' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 't1-takes',
        moves: [ { edge: 'gil-t1', label: 'GIL' } ],
        state: {
          gil: { en: 'Held by T1', bn: 'T1 ধরে আছে' },
          t1: { en: 'Has the GIL', bn: 'GIL আছে' }
        },
        title: { en: 'Thread 1 takes the GIL', bn: 'Thread ১ GIL নেয়' },
        simple: {
          en: 'Thread 1 grabs the one key to the room.',
          bn: 'Thread ১ ঘরের একমাত্র চাবিটা নেয়।'
        },
        tech: {
          en: 'A thread must hold the GIL to run Python bytecode. Only one thread can hold it at a time.',
          bn: 'Python bytecode চালাতে হলে thread-কে GIL ধরতে হয়। একসময়ে একটা thread-ই সেটা ধরতে পারে।'
        }
      },
      {
        id: 't1-runs',
        moves: [ { edge: 't1-interp', label: 'bytecode' } ],
        state: {
          t1: { en: 'Running', bn: 'চলছে' },
          interp: { en: 'Running T1', bn: 'T1 চলছে' }
        },
        title: { en: 'Thread 1 runs its code', bn: 'Thread ১ নিজের কোড চালায়' },
        simple: {
          en: 'With the key in hand, Thread 1 does its work.',
          bn: 'চাবি হাতে পেয়ে Thread ১ নিজের কাজ করে।'
        },
        tech: {
          en: 'The eval loop executes T1’s bytecode. The GIL protects interpreter internals such as reference counts and built-in containers.',
          bn: 'eval loop T1-এর bytecode চালায়। GIL interpreter-এর ভেতরের জিনিস বাঁচায়, যেমন reference count আর built-in container।'
        }
      },
      {
        id: 't2-waits',
        moves: [ { edge: 't2-gil', label: 'wants it' } ],
        state: { t2: { en: 'Waiting', bn: 'অপেক্ষায়' } },
        title: { en: 'Thread 2 has to wait', bn: 'Thread ২-কে অপেক্ষা করতে হয়' },
        simple: {
          en: 'Thread 2 wants in, but the room is taken.',
          bn: 'Thread ২ ঢুকতে চায়, কিন্তু ঘর দখল হয়ে আছে।'
        },
        tech: {
          en: 'T2 is runnable but blocks on the GIL’s condition variable. It cannot execute any Python code until it gets the GIL.',
          bn: 'T2 চলার জন্য তৈরি, কিন্তু GIL-এর condition variable-এ আটকে আছে। GIL না পাওয়া পর্যন্ত Python কোড চালাতে পারে না।'
        }
      },
      {
        id: 'switch-request',
        work: { node: 'gil', kind: 'queue' },
        state: { gil: { en: 'T2 asked for it', bn: 'T2 চেয়েছে' } },
        title: { en: 'Thread 2 asks for the GIL', bn: 'Thread ২ GIL চায়' },
        simple: {
          en: 'After a short wait, Thread 2 politely asks for the key.',
          bn: 'একটু অপেক্ষার পর Thread ২ ভদ্রভাবে চাবিটা চায়।'
        },
        tech: {
          en: 'After the switch interval (default 5 ms) a waiter sets a drop request. The holder yields at its next check between bytecodes, so the timing is advisory.',
          bn: 'switch interval (ডিফল্ট ৫ ms) পরে অপেক্ষারত thread একটা drop request দেয়। holder bytecode-এর মাঝের পরের check-এ ছাড়ে, তাই সময়টা আনুমানিক।'
        }
      },
      {
        id: 't1-releases',
        moves: [ { edge: 't1-gil', label: 'release' } ],
        state: {
          gil: { en: 'Free', bn: 'খালি' },
          t1: { en: 'Waiting', bn: 'অপেক্ষায়' },
          interp: { en: 'Paused', bn: 'থেমে আছে' }
        },
        title: { en: 'Thread 1 lets go', bn: 'Thread ১ ছেড়ে দেয়' },
        simple: {
          en: 'Thread 1 hands the key back.',
          bn: 'Thread ১ চাবিটা ফেরত দেয়।'
        },
        tech: {
          en: 'The holder releases the GIL. With a forced switch, another waiter must take it, so the releaser cannot instantly grab it again.',
          bn: 'holder GIL ছেড়ে দেয়। forced switch-এ অন্য অপেক্ষারতকে সেটা নিতে হয়, তাই যে ছেড়েছে সে সাথে সাথে আবার নিতে পারে না।'
        }
      },
      {
        id: 't2-takes',
        moves: [ { edge: 'gil-t2', label: 'GIL' } ],
        state: {
          gil: { en: 'Held by T2', bn: 'T2 ধরে আছে' },
          t2: { en: 'Running', bn: 'চলছে' },
          interp: { en: 'Running T2', bn: 'T2 চলছে' }
        },
        title: { en: 'Thread 2 takes over', bn: 'Thread ২ নিয়ে নেয়' },
        simple: {
          en: 'Thread 2 gets the key and starts running.',
          bn: 'Thread ২ চাবিটা পেয়ে চলতে শুরু করে।'
        },
        tech: {
          en: 'Which waiting thread wins is the operating system’s decision. The interpreter has no scheduler of its own.',
          bn: 'কোন অপেক্ষারত thread জিতবে সেটা operating system ঠিক করে। interpreter-এর নিজের কোনো scheduler নেই।'
        }
      },
      {
        id: 'io-release',
        moves: [
          { edge: 't2-io', label: 'recv()' },
          { edge: 'gil-t1', label: 'GIL' }
        ],
        state: {
          gil: { en: 'Held by T1', bn: 'T1 ধরে আছে' },
          t1: { en: 'Running', bn: 'চলছে' },
          t2: { en: 'Blocked in recv', bn: 'recv-এ আটকে' },
          interp: { en: 'Running T1', bn: 'T1 চলছে' },
          io: { en: 'Reading socket', bn: 'socket পড়ছে' }
        },
        title: { en: 'Blocking I/O frees the GIL', bn: 'blocking I/O GIL ছেড়ে দেয়' },
        simple: {
          en: 'Thread 2 waits on the network, so it drops the key. Thread 1 takes it at once.',
          bn: 'Thread ২ network-এর জন্য অপেক্ষা করে, তাই চাবি ছাড়ে। Thread ১ সাথে সাথে নেয়।'
        },
        tech: {
          en: 'Blocking I/O calls release the GIL before they wait. T2 sits in the kernel while T1 runs Python code: a real overlap of waiting and computing.',
          bn: 'blocking I/O কল অপেক্ষার আগে GIL ছেড়ে দেয়। T2 kernel-এ বসে থাকে, আর T1 Python কোড চালায়: অপেক্ষা আর হিসাব সত্যিই একসাথে চলে।'
        }
      },
      {
        id: 'data-back',
        moves: [ { edge: 'io-t2', label: 'data' } ],
        state: {
          t2: { en: 'Ready, wants GIL', bn: 'তৈরি, GIL চায়' },
          io: { en: 'Outside world', bn: 'বাইরের জগৎ' }
        },
        title: { en: 'The data arrives', bn: 'data পৌঁছায়' },
        simple: {
          en: 'The data comes in. Thread 2 must queue for the key again.',
          bn: 'data এসে যায়। Thread ২-কে আবার চাবির লাইনে দাঁড়াতে হয়।'
        },
        tech: {
          en: 'When the I/O call returns, T2 must re-acquire the GIL before it touches any Python object.',
          bn: 'I/O কল ফিরলে কোনো Python object ছোঁয়ার আগে T2-কে আবার GIL নিতে হয়।'
        }
      },
      {
        id: 'c-call',
        moves: [ { edge: 't1-cext', label: 'sha256(big)' } ],
        state: {
          gil: { en: 'Free (C released it)', bn: 'খালি (C ছেড়েছে)' },
          t1: { en: 'In C code', bn: 'C কোডে' },
          cext: { en: 'Hashing', bn: 'hash করছে' },
          interp: { en: 'Runs bytecode', bn: 'bytecode চালায়' }
        },
        title: { en: 'C code can release it too', bn: 'C কোডও GIL ছাড়তে পারে' },
        simple: {
          en: 'Thread 1 calls fast native code that does not need the key while it works.',
          bn: 'Thread ১ দ্রুত native কোড ডাকে, যেটা কাজের সময় চাবি লাগে না।'
        },
        tech: {
          en: 'Some C extensions, such as `hashlib` on big data, zlib and NumPy, release the GIL around heavy work. Many extensions do not.',
          bn: 'কিছু C extension, যেমন বড় data-য় `hashlib`, zlib আর NumPy, ভারী কাজের সময় GIL ছাড়ে। অনেক extension ছাড়ে না।'
        }
      },
      {
        id: 't2-runs',
        moves: [ { edge: 'gil-t2', label: 'GIL' } ],
        state: {
          gil: { en: 'Held by T2', bn: 'T2 ধরে আছে' },
          t2: { en: 'Running', bn: 'চলছে' },
          interp: { en: 'Running T2', bn: 'T2 চলছে' }
        },
        title: { en: 'Thread 2 runs meanwhile', bn: 'ততক্ষণে Thread ২ চলে' },
        simple: {
          en: 'Thread 2 runs Python code while the C call works. Both are busy at once.',
          bn: 'C কল চলার সময় Thread ২ Python কোড চালায়। দুজনেই একসাথে ব্যস্ত।'
        },
        tech: {
          en: 'The C call and T2’s bytecode run truly in parallel, on two cores.',
          bn: 'C কল আর T2-এর bytecode সত্যিই parallel চলে, দুটো core-এ।'
        }
      },
      {
        id: 'c-returns',
        work: { node: 'cext', kind: 'result' },
        state: {
          gil: { en: 'Held by T2', bn: 'T2 ধরে আছে' },
          cext: { en: 'Done', bn: 'শেষ' },
          t1: { en: 'Wants the GIL', bn: 'GIL চায়' }
        },
        title: { en: 'C returns, T1 must wait', bn: 'C ফেরে, T1-কে অপেক্ষা করতে হয়' },
        simple: {
          en: 'When the native code finishes, Thread 1 must wait for the key again.',
          bn: 'native কোড শেষ হলে Thread ১-কে আবার চাবির জন্য অপেক্ষা করতে হয়।'
        },
        tech: {
          en: 'Returning to Python code means re-taking the GIL. The GIL limits parallel Python bytecode, not every kind of parallel work.',
          bn: 'Python কোডে ফিরতে হলে আবার GIL নিতে হয়। GIL আটকায় parallel Python bytecode, সব ধরনের parallel কাজ নয়।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'cpu-bound',
      label: { en: 'CPU-bound: no speed-up', bn: 'CPU-bound: গতি বাড়ে না' },
      branchAfter: 't2-takes',
      steps: [
        {
          id: 'both-crunch',
          work: { node: [ 't1', 't2' ], kind: 'queue' },
          state: {
            t1: { en: 'CPU loop', bn: 'CPU loop' },
            t2: { en: 'CPU loop', bn: 'CPU loop' }
          },
          title: { en: 'Both threads crunch numbers', bn: 'দুটো thread-ই হিসাব কষে' },
          simple: {
            en: 'Both threads start a long pure-Python calculation.',
            bn: 'দুটো thread-ই খাঁটি Python-এ লম্বা হিসাব শুরু করে।'
          },
          tech: {
            en: 'Pure-Python number crunching never blocks, so the GIL only changes hands on forced switches. Both threads are runnable, but only one runs bytecode.',
            bn: 'খাঁটি Python-এর হিসাব কখনও block হয় না, তাই GIL শুধু forced switch-এ হাত বদলায়। দুটো thread-ই চলার জন্য তৈরি, কিন্তু bytecode চালায় একটাই।'
          }
        },
        {
          id: 'taking-turns',
          work: { node: 'gil', kind: 'error' },
          state: { gil: { en: 'T1 / T2 alternating', bn: 'T1 / T2 পালা করে' } },
          title: { en: 'They take turns', bn: 'তারা পালা করে চলে' },
          simple: {
            en: 'They pass the key back and forth. Nobody works at the same time.',
            bn: 'তারা চাবিটা হাতবদল করে। একসাথে কেউ কাজ করে না।'
          },
          tech: {
            en: 'The GIL switches about every 5 ms. Two threads take about as long as running the jobs one after the other, plus switching overhead.',
            bn: 'GIL প্রায় প্রতি ৫ ms-এ বদলায়। দুটো thread-এ সময় লাগে কাজ দুটো একটার পর একটা চালানোর মতোই, সাথে switching-এর বাড়তি খরচ।'
          }
        },
        {
          id: 'ping',
          moves: [ { edge: 't2-gil', label: 'release' } ],
          state: {
            gil: { en: 'Handed over', bn: 'হাতবদল' },
            t2: { en: 'Waiting', bn: 'অপেক্ষায়' }
          },
          title: { en: 'Thread 2 hands it over', bn: 'Thread ২ ছেড়ে দেয়' },
          simple: {
            en: 'Thread 2 gives the key up after its turn.',
            bn: 'Thread ২ নিজের পালা শেষে চাবি ছেড়ে দেয়।'
          },
          tech: {
            en: 'A forced switch: T2 drops the GIL at its next eval-breaker check, even though it has more work to do.',
            bn: 'forced switch: T2 পরের eval-breaker check-এ GIL ছাড়ে, কাজ বাকি থাকলেও।'
          }
        },
        {
          id: 'pong',
          moves: [ { edge: 'gil-t1', label: 'GIL' } ],
          state: {
            gil: { en: 'Held by T1', bn: 'T1 ধরে আছে' },
            t1: { en: 'CPU loop', bn: 'CPU loop' },
            interp: { en: 'Running T1', bn: 'T1 চলছে' }
          },
          title: { en: 'Thread 1 takes its turn', bn: 'Thread ১ নিজের পালা নেয়' },
          simple: {
            en: 'Thread 1 takes the key and continues. Then it all repeats.',
            bn: 'Thread ১ চাবি নিয়ে চলতে থাকে। তারপর সবকিছু আবার ঘুরে আসে।'
          },
          tech: {
            en: 'The ping-pong repeats for the whole run. At any instant only one thread is making progress.',
            bn: 'পুরো চলার সময় এই ping-pong চলতেই থাকে। যেকোনো মুহূর্তে একটাই thread এগোয়।'
          }
        },
        {
          id: 'no-gain',
          work: { node: 'interp', kind: 'error' },
          state: { interp: { en: 'Wall time = sum', bn: 'মোট সময় = যোগফল' } },
          title: { en: 'Two threads, no gain', bn: 'দুটো thread, লাভ নেই' },
          simple: {
            en: 'Two threads take about as long as doing one job after the other.',
            bn: 'দুটো thread-এ সময় লাগে একটার পর একটা কাজ করার মতোই।'
          },
          tech: {
            en: 'For CPU-bound parallelism use `ProcessPoolExecutor`, a library that releases the GIL, subinterpreters, or a free-threaded build.',
            bn: 'CPU-bound parallelism-এ `ProcessPoolExecutor`, GIL-ছাড়া library, subinterpreter বা free-threaded build ব্যবহার করুন।'
          }
        }
      ]
    },
    {
      id: 'free-threaded',
      label: { en: 'Free-threaded Python', bn: 'Free-threaded Python' },
      branchAfter: 't1-runs',
      steps: [
        {
          id: 'gil-off',
          work: { node: 'gil', kind: 'result' },
          state: { gil: { en: 'Disabled (3.14t)', bn: 'বন্ধ (3.14t)' } },
          title: { en: 'The GIL is switched off', bn: 'GIL বন্ধ করা হয়' },
          simple: {
            en: 'In a free-threaded build there is no key to wait for.',
            bn: 'free-threaded build-এ অপেক্ষা করার মতো কোনো চাবি নেই।'
          },
          tech: {
            en: 'It is a separate `t` build: experimental in 3.13, officially supported but optional in 3.14. The default build still has the GIL.',
            bn: 'এটা আলাদা `t` build: 3.13-এ experimental, 3.14-এ officially supported কিন্তু optional। ডিফল্ট build-এ এখনও GIL আছে।'
          }
        },
        {
          id: 'both-run',
          moves: [
            { edge: 't1-interp', label: 'T1 code' },
            { edge: 't2-interp', label: 'T2 code' }
          ],
          state: {
            t1: { en: 'Running', bn: 'চলছে' },
            t2: { en: 'Running', bn: 'চলছে' },
            interp: { en: 'T1 and T2 together', bn: 'T1 আর T2 একসাথে' }
          },
          title: { en: 'Both threads run at once', bn: 'দুটো thread একসাথে চলে' },
          simple: {
            en: 'Both threads run Python code at the same time on different cores.',
            bn: 'দুটো thread আলাদা core-এ একই সময়ে Python কোড চালায়।'
          },
          tech: {
            en: 'Per-object locking and biased reference counting keep built-ins safe. Single-thread code pays roughly 5-10% in 3.14.',
            bn: 'per-object locking আর biased reference counting built-in-গুলোকে নিরাপদ রাখে। 3.14-এ single-thread কোডে খরচ প্রায় ৫-১০%।'
          }
        },
        {
          id: 'ext-reenables',
          work: { node: 'interp', kind: 'error' },
          state: { gil: { en: 'Re-enabled', bn: 'আবার চালু' } },
          title: { en: 'An old extension brings it back', bn: 'পুরনো extension GIL ফিরিয়ে আনে' },
          simple: {
            en: 'Import an old native library and the key can come back.',
            bn: 'পুরনো native library import করলে চাবিটা ফিরে আসতে পারে।'
          },
          tech: {
            en: 'Importing a C extension not marked free-threading safe can re-enable the GIL, with a warning. Check that your wheels support it.',
            bn: 'free-threading নিরাপদ বলে চিহ্নিত নয় এমন C extension import করলে GIL আবার চালু হতে পারে, সাথে warning। আপনার wheel সাপোর্ট করে কি না দেখুন।'
          }
        },
        {
          id: 'still-lock',
          work: { node: [ 't1', 't2' ], kind: 'queue' },
          state: {
            t1: { en: 'Still need Lock', bn: 'Lock এখনও লাগে' },
            t2: { en: 'Still need Lock', bn: 'Lock এখনও লাগে' }
          },
          title: { en: 'You still need your own locks', bn: 'নিজের Lock তবু লাগে' },
          simple: {
            en: 'Even with no GIL, you still need your own locks for shared state.',
            bn: 'GIL না থাকলেও shared state-এর জন্য নিজের Lock লাগে।'
          },
          tech: {
            en: 'Built-ins stay internally consistent, but compound operations such as check-then-act and `+=` can still race. Use explicit synchronization.',
            bn: 'built-in ভেতরে ঠিক থাকে, কিন্তু check-then-act আর `+=`-এর মতো যৌগিক কাজে race হতে পারে। স্পষ্ট synchronization ব্যবহার করুন।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A coffee shop has one bathroom key. Only the person holding it can go in. Everyone else queues. People who step out to wait for a delivery hand the key back.',
      bn: 'একটা কফি শপে বাথরুমের চাবি মাত্র একটা। যার হাতে চাবি, শুধু সে-ই ঢুকতে পারে। বাকিরা লাইনে দাঁড়ায়। যে ডেলিভারির অপেক্ষায় বাইরে যায়, সে চাবি ফেরত দিয়ে যায়।'
    },
    twins: [
      {
        icon: 'thread',
        node: 't1',
        name: { en: 'The first customer', bn: 'প্রথম ক্রেতা' },
        d: {
          en: 'Takes the key, uses the room, hands it back when asked.',
          bn: 'চাবি নেয়, ঘর ব্যবহার করে, বললে ফেরত দেয়।'
        }
      },
      {
        icon: 'thread',
        node: 't2',
        name: { en: 'The second customer', bn: 'দ্বিতীয় ক্রেতা' },
        d: {
          en: 'Waits in line. Taps the first customer on the shoulder after a few moments.',
          bn: 'লাইনে দাঁড়ায়। কিছুক্ষণ পর প্রথম ক্রেতার কাঁধে টোকা দেয়।'
        }
      },
      {
        icon: 'lock',
        node: 'gil',
        name: { en: 'The single key', bn: 'একমাত্র চাবি' },
        d: {
          en: 'Only one exists. Whoever holds it is the only one allowed in.',
          bn: 'একটাই আছে। যার হাতে, শুধু সে-ই ঢুকতে পারে।'
        }
      },
      {
        icon: 'code',
        node: 'interp',
        name: { en: 'The bathroom', bn: 'বাথরুম' },
        d: {
          en: 'The only place where the real work happens, one person at a time.',
          bn: 'আসল কাজ হয় শুধু এখানে, একসময়ে একজনের।'
        }
      },
      {
        icon: 'cloud',
        node: 'io',
        name: { en: 'The delivery outside', bn: 'বাইরের ডেলিভারি' },
        d: {
          en: 'Waiting for a parcel does not need the room, so the key goes back on the hook.',
          bn: 'পার্সেলের অপেক্ষায় ঘর লাগে না, তাই চাবি আবার হুকে ফেরে।'
        }
      },
      {
        icon: 'box',
        node: 'cext',
        name: { en: 'The back-room machine', bn: 'পেছনের ঘরের মেশিন' },
        d: {
          en: 'Heavy work done in another room. A good machine does not need the key at all.',
          bn: 'ভারী কাজ অন্য ঘরে হয়। ভালো মেশিনের চাবি দরকারই হয় না।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Two long jobs, one key', bn: 'দুটো লম্বা কাজ, একটা চাবি' },
        is: { en: 'is CPU-bound threads', bn: 'মানে CPU-bound thread' },
        d: {
          en: 'Two staff both need the room for a long job. They pass the key back and forth, so it takes twice as long, however many staff you hire.',
          bn: 'দুজন কর্মীরই লম্বা কাজের জন্য ঘর লাগে। তারা চাবি হাতবদল করে, তাই কর্মী যত বাড়ান, সময় লাগে দ্বিগুণ।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'What is the GIL and what does it protect?',
        bn: 'GIL কী আর এটা কী রক্ষা করে?'
      },
      short: {
        en: 'A mutex in CPython so only one thread executes Python bytecode at a time.',
        bn: 'CPython-এর একটা mutex, যাতে একসময়ে একটাই thread Python bytecode চালায়।'
      },
      deep: {
        en: 'It keeps the object model, including built-ins like `dict`, safe against concurrent access, and simplifies reference counting. It trades multi-core parallelism for simplicity.',
        bn: 'এটা object model আর `dict`-এর মতো built-in-কে একসাথে ব্যবহার থেকে নিরাপদ রাখে, আর reference counting সহজ করে। সরলতার বদলে multi-core parallelism ছাড়তে হয়।'
      },
      redFlag: {
        en: '“It makes my code thread-safe.”',
        bn: '“এটা আমার কোডকে thread-safe করে।”'
      }
    },
    {
      q: {
        en: 'When is the GIL released?',
        bn: 'GIL কখন ছাড়া হয়?'
      },
      short: {
        en: 'During blocking I/O, in C extensions that opt out, and on forced switches.',
        bn: 'blocking I/O-র সময়, opt-out করা C extension-এ, আর forced switch-এ।'
      },
      deep: {
        en: 'The glossary says it is always released when doing I/O. Hashing, compression and numeric extensions often release it. A waiting thread also forces a switch after `getswitchinterval()`, default 5 ms.',
        bn: 'glossary বলে I/O-র সময় এটা সবসময় ছাড়া হয়। hashing, compression আর numeric extension প্রায়ই ছাড়ে। অপেক্ষারত thread `getswitchinterval()` পরে, ডিফল্ট ৫ ms, switch জোর করে।'
      },
      redFlag: {
        en: '“Never. Threads in Python are fake.”',
        bn: '“কখনও না। Python-এর thread ভুয়া।”'
      }
    },
    {
      q: {
        en: 'Why do CPU-bound threads not speed up?',
        bn: 'CPU-bound thread-এ গতি বাড়ে না কেন?'
      },
      short: {
        en: 'Only one thread executes bytecode at a time.',
        bn: 'একসময়ে একটাই thread bytecode চালায়।'
      },
      deep: {
        en: 'Threads alternate on the GIL, so total CPU time is unchanged and switching adds overhead. Use processes, or native code that releases the GIL.',
        bn: 'thread-গুলো GIL-এ পালা করে, তাই মোট CPU সময় একই থাকে আর switching বাড়তি খরচ যোগ করে। process বা GIL ছাড়ে এমন native কোড ব্যবহার করুন।'
      },
      redFlag: {
        en: '“Python threads are green threads on one core.”',
        bn: '“Python thread হলো এক core-এর green thread।”'
      }
    },
    {
      q: {
        en: 'What does `sys.setswitchinterval` do?',
        bn: '`sys.setswitchinterval` কী করে?'
      },
      short: {
        en: 'It sets the ideal time slice, 5 ms by default, before a waiting thread requests the GIL.',
        bn: 'এটা ideal time slice ঠিক করে, ডিফল্ট ৫ ms, যার পর অপেক্ষারত thread GIL চায়।'
      },
      deep: {
        en: 'It is advisory: the switch happens at the next eval-breaker check, and which thread runs next is the OS’s decision. Lower values add responsiveness and overhead.',
        bn: 'এটা আনুমানিক: switch হয় পরের eval-breaker check-এ, আর পরে কোন thread চলবে তা OS ঠিক করে। কম মান responsiveness বাড়ায়, সাথে overhead-ও।'
      },
      redFlag: {
        en: '“It is how many bytecodes run before a switch.”',
        bn: '“এটা switch-এর আগে কয়টা bytecode চলবে তার সংখ্যা।”'
      }
    },
    {
      q: {
        en: 'Does the GIL make `counter += 1` atomic?',
        bn: 'GIL কি `counter += 1`-কে atomic করে?'
      },
      short: {
        en: 'No.',
        bn: 'না।'
      },
      deep: {
        en: 'It compiles to several bytecodes: load, add, store. A switch between them loses an update. The docs FAQ lists `i = i+1` as not atomic. Use a Lock.',
        bn: 'এটা কয়েকটা bytecode হয়: load, add, store। এর মাঝে switch হলে একটা update হারায়। docs FAQ-তে `i = i+1` atomic নয় বলা আছে। Lock ব্যবহার করুন।'
      },
      redFlag: {
        en: '“Yes, the GIL makes everything atomic.”',
        bn: '“হ্যাঁ, GIL সবকিছু atomic করে।”'
      }
    },
    {
      q: {
        en: 'Is the GIL removed in Python 3.14?',
        bn: 'Python 3.14-এ কি GIL সরানো হয়েছে?'
      },
      short: {
        en: 'No. Free-threaded builds are officially supported but optional. The GIL build is still the default.',
        bn: 'না। free-threaded build officially supported কিন্তু optional। GIL build-ই এখনও ডিফল্ট।'
      },
      deep: {
        en: '3.13 introduced the experimental `t` build. PEP 779 made it supported in 3.14, with roughly 5-10% single-thread overhead. Extensions must support it, or the GIL is re-enabled.',
        bn: '3.13 experimental `t` build এনেছে। PEP 779 3.14-এ সেটাকে supported করেছে, single-thread overhead প্রায় ৫-১০%। extension-কে সাপোর্ট করতে হয়, নইলে GIL আবার চালু হয়।'
      },
      redFlag: {
        en: '“3.13 and 3.14 removed the GIL for everyone.”',
        bn: '“3.13 আর 3.14 সবার জন্য GIL সরিয়ে দিয়েছে।”'
      }
    },
    {
      q: {
        en: 'What are the alternatives for CPU parallelism?',
        bn: 'CPU parallelism-এর বিকল্প কী?'
      },
      short: {
        en: 'Processes, native extensions, subinterpreters and free-threaded builds.',
        bn: 'process, native extension, subinterpreter আর free-threaded build।'
      },
      deep: {
        en: '`multiprocessing` and `ProcessPoolExecutor` give each process its own GIL. NumPy, Cython or Rust can release it. 3.14 adds `InterpreterPoolExecutor`, built on the per-interpreter GIL of PEP 684.',
        bn: '`multiprocessing` আর `ProcessPoolExecutor` প্রতি process-কে নিজের GIL দেয়। NumPy, Cython বা Rust সেটা ছাড়তে পারে। 3.14-এ `InterpreterPoolExecutor` এসেছে, যা PEP 684-এর per-interpreter GIL-এর ওপর দাঁড়িয়ে।'
      },
      redFlag: {
        en: '“Rewrite it in Go” as the only answer, or “use asyncio.”',
        bn: '“Go-তে আবার লিখুন” একমাত্র উত্তর হিসেবে, বা “asyncio ব্যবহার করুন।”'
      }
    },
    {
      q: {
        en: 'Does asyncio bypass the GIL?',
        bn: 'asyncio কি GIL এড়িয়ে যায়?'
      },
      short: {
        en: 'No. It is single-threaded and concurrent, not parallel.',
        bn: 'না। এটা এক thread-এ concurrent, parallel নয়।'
      },
      deep: {
        en: 'Its win is cheap waiting on many sockets, not running Python on several cores. A CPU-heavy coroutine blocks the whole event loop.',
        bn: 'এর সুবিধা অনেক socket-এ সস্তায় অপেক্ষা করা, কয়েকটা core-এ Python চালানো নয়। CPU-ভারী coroutine পুরো event loop আটকে দেয়।'
      },
      redFlag: {
        en: '“asyncio gets around the GIL.”',
        bn: '“asyncio GIL এড়িয়ে যায়।”'
      }
    }
  ],
  cheats: [
    {
      code: 'import sys; sys.getswitchinterval()    # 0.005',
      d: {
        en: 'Current switch interval in seconds.',
        bn: 'এখনকার switch interval, সেকেন্ডে।'
      }
    },
    {
      code: 'sys.setswitchinterval(1e-6)',
      d: {
        en: 'Teaching only: makes races easier to reproduce. Not a fix.',
        bn: 'শুধু শেখার জন্য: race সহজে দেখানো যায়। সমাধান নয়।'
      }
    },
    {
      code: 'import sys; sys._is_gil_enabled()    # 3.13+',
      d: {
        en: 'Is the GIL on right now?',
        bn: 'GIL কি এখন চালু?'
      }
    },
    {
      code: 'python3.14t -X gil=0 script.py     # or PYTHON_GIL=0',
      d: {
        en: 'Run a free-threaded build with the GIL off. `=1` forces it on.',
        bn: 'free-threaded build GIL বন্ধ করে চালান। `=1` দিলে জোর করে চালু হয়।'
      }
    },
    {
      code: 'import sysconfig; sysconfig.get_config_var("Py_GIL_DISABLED")  # 1 on a t build',
      d: {
        en: 'Does this build support free threading?',
        bn: 'এই build কি free threading সাপোর্ট করে?'
      }
    },
    {
      code: 'import dis; dis.dis("counter += 1")',
      d: {
        en: 'Shows several bytecodes that a switch can split.',
        bn: 'কয়েকটা bytecode দেখায়, যার মাঝে switch হতে পারে।'
      }
    },
    {
      code: 'import hashlib, threading   # hashing big buffers can overlap on threads',
      d: {
        en: 'An example of C work that releases the GIL.',
        bn: 'GIL ছাড়ে এমন C কাজের উদাহরণ।'
      }
    }
  ],
  sources: [
    { label: 'Python docs: glossary (GIL)', url: 'https://docs.python.org/3/glossary.html' },
    { label: 'Python docs: threading', url: 'https://docs.python.org/3/library/threading.html' },
    { label: 'Python docs: sys', url: 'https://docs.python.org/3/library/sys.html' },
    { label: 'CPython source: ceval_gil.c', url: 'https://github.com/python/cpython/blob/3.14/Python/ceval_gil.c' },
    { label: 'Python docs: free-threading HOWTO', url: 'https://docs.python.org/3/howto/free-threading-python.html' },
    { label: 'Python docs: What’s New in 3.13', url: 'https://docs.python.org/3/whatsnew/3.13.html' },
    { label: 'Python docs: What’s New in 3.14', url: 'https://docs.python.org/3/whatsnew/3.14.html' },
    { label: 'PEP 779: free-threaded Python supported', url: 'https://peps.python.org/pep-0779/' },
    { label: 'PEP 684: per-interpreter GIL', url: 'https://peps.python.org/pep-0684/' }
  ]
}
