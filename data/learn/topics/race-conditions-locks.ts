import type { Topic } from '../types'
import { UI } from '../ui'

export const raceConditionsLocks: Topic = {
  slug: 'race-conditions-locks',
  line: 'concurrency',
  title: { en: 'Race conditions and locks', bn: 'Race condition আর lock' },
  summary: {
    en: 'Two threads can overwrite each other’s update; a lock fixes that by taking turns, but two locks can deadlock.',
    bn: 'দুটো thread একে অপরের আপডেট মুছে দিতে পারে; lock পালা করে চালিয়ে তা ঠেকায়, কিন্তু দুটো lock থেকে deadlock হতে পারে।'
  },
  view: { wide: [ 1000, 440 ], narrow: [ 400, 580 ] },
  nodeR: { narrow: 20 },
  nodes: {
    t1: {
      icon: 'thread',
      name: { en: 'Thread 1', bn: 'Thread ১' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      wide: [ 450, 80, 'up' ],
      narrow: [ 60, 230, 'right' ]
    },
    t2: {
      icon: 'thread',
      name: { en: 'Thread 2', bn: 'Thread ২' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      wide: [ 450, 360, 'down' ],
      narrow: [ 340, 230, 'left' ]
    },
    counter: {
      icon: 'memory',
      name: { en: 'Shared counter', bn: 'Shared counter' },
      sub: { en: 'value = 0', bn: 'value = 0' },
      wide: [ 800, 220, 'right' ],
      narrow: [ 200, 500, 'down' ]
    },
    lockA: {
      icon: 'lock',
      name: { en: 'Lock A', bn: 'Lock A' },
      sub: { en: 'Free', bn: 'খালি' },
      wide: [ 350, 220, 'left' ],
      narrow: [ 200, 80, 'up' ]
    },
    lockB: {
      icon: 'lock',
      name: { en: 'Lock B', bn: 'Lock B' },
      sub: { en: 'Free', bn: 'খালি' },
      wide: [ 550, 220, 'right' ],
      narrow: [ 200, 380, 'down' ]
    }
  },
  corridors: {
    'counter-t1': {
      wide: [ [ 800, 220 ], [ 660, 80 ], [ 450, 80 ] ],
      narrow: [ [ 200, 500 ], [ 60, 360 ], [ 60, 230 ] ]
    },
    'counter-t2': {
      wide: [ [ 800, 220 ], [ 660, 360 ], [ 450, 360 ] ],
      narrow: [ [ 200, 500 ], [ 340, 360 ], [ 340, 230 ] ]
    },
    't1-lockA': {
      wide: [ [ 450, 80 ], [ 450, 120 ], [ 350, 220 ] ],
      narrow: [ [ 60, 230 ], [ 60, 220 ], [ 200, 80 ] ]
    },
    't1-lockB': {
      wide: [ [ 450, 80 ], [ 450, 120 ], [ 550, 220 ] ],
      narrow: [ [ 60, 230 ], [ 60, 240 ], [ 200, 380 ] ]
    },
    't2-lockA': {
      wide: [ [ 450, 360 ], [ 450, 320 ], [ 350, 220 ] ],
      narrow: [ [ 340, 230 ], [ 340, 220 ], [ 200, 80 ] ]
    },
    't2-lockB': {
      wide: [ [ 450, 360 ], [ 450, 320 ], [ 550, 220 ] ],
      narrow: [ [ 340, 230 ], [ 340, 240 ], [ 200, 380 ] ]
    }
  },
  edges: {
    'counter-t1': { from: 'counter', to: 't1', kind: 'result' },
    'counter-t2': { from: 'counter', to: 't2', kind: 'result' },
    't1-counter': { from: 't1', to: 'counter', kind: 'request' },
    't2-counter': { from: 't2', to: 'counter', kind: 'request' },
    't1-lockA': { from: 't1', to: 'lockA', kind: 'queue' },
    't2-lockA': { from: 't2', to: 'lockA', kind: 'queue' },
    'lockA-t2': { from: 'lockA', to: 't2', kind: 'result' },
    't1-lockB': { from: 't1', to: 'lockB', kind: 'queue' },
    't2-lockB': { from: 't2', to: 'lockB', kind: 'queue' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 't1-reads',
        moves: [ { edge: 'counter-t1', label: 'read 0' } ],
        state: { t1: { en: 'Has 0', bn: 'হাতে ০' } },
        title: { en: 'Thread 1 reads the counter', bn: 'Thread ১ counter পড়ে' },
        simple: {
          en: 'Thread 1 reads the shared counter and sees 0.',
          bn: 'Thread ১ shared counter পড়ে, দেখে ০।'
        },
        tech: {
          en: '`counter += 1` is load, add, store, not one step. Thread 1 loads 0 into its own private stack.',
          bn: '`counter += 1` মানে load, add, store, এক ধাপ নয়। Thread ১ ০ নিজের private stack-এ তোলে।'
        }
      },
      {
        id: 't2-reads',
        moves: [ { edge: 'counter-t2', label: 'read 0' } ],
        state: { t2: { en: 'Has 0', bn: 'হাতে ০' } },
        title: { en: 'Thread 2 reads the same 0', bn: 'Thread ২-ও একই ০ পড়ে' },
        simple: {
          en: 'Before Thread 1 writes back, Thread 2 reads the counter too. It is still 0.',
          bn: 'Thread ১ ফেরত লেখার আগেই Thread ২-ও counter পড়ে। তখনো ০।'
        },
        tech: {
          en: 'A thread switch between the load and the store is allowed at bytecode boundaries, even with the GIL.',
          bn: 'GIL থাকলেও load আর store-এর মাঝে bytecode-এর সীমানায় thread বদলানো যায়।'
        }
      },
      {
        id: 't1-adds',
        work: { node: 't1', kind: 'result' },
        state: { t1: { en: 'Has 1', bn: 'হাতে ১' } },
        title: { en: 'Thread 1 adds one', bn: 'Thread ১ এক যোগ করে' },
        simple: {
          en: 'Thread 1 adds one in its head.',
          bn: 'Thread ১ মনে মনে এক যোগ করে।'
        },
        tech: {
          en: 'The add happens on Thread 1’s private value. The shared counter is untouched.',
          bn: 'যোগটা Thread ১-এর নিজস্ব মানে হয়। shared counter ছোঁয়াই হয় না।'
        }
      },
      {
        id: 't1-writes',
        moves: [ { edge: 't1-counter', label: 'write 1' } ],
        state: {
          counter: { en: 'value = 1', bn: 'value = 1' },
          t1: { en: 'Wrote 1', bn: '১ লিখেছে' }
        },
        title: { en: 'Thread 1 writes 1', bn: 'Thread ১ ১ লেখে' },
        simple: {
          en: 'Thread 1 writes 1 back. So far so good.',
          bn: 'Thread ১ ১ ফেরত লেখে। এ পর্যন্ত ঠিক আছে।'
        },
        tech: {
          en: 'The store completes. Thread 2 does not know the counter has changed.',
          bn: 'store শেষ হয়। counter বদলেছে, Thread ২ তা জানে না।'
        }
      },
      {
        id: 't2-writes',
        moves: [ { edge: 't2-counter', label: 'write 1' } ],
        state: {
          counter: { en: 'value = 1, not 2!', bn: 'value = 1, ২ নয়!' },
          t2: { en: 'Wrote 1', bn: '১ লিখেছে' }
        },
        title: { en: 'Thread 2 overwrites it', bn: 'Thread ২ মুছে দেয়' },
        simple: {
          en: 'Thread 2 also writes 1, wiping out Thread 1’s update. Two increments, one result.',
          bn: 'Thread ২-ও ১ লেখে, Thread ১-এর আপডেট মুছে যায়। দুটো increment, ফল একটাই।'
        },
        tech: {
          en: 'Lost update from a non-atomic read-modify-write. On modern CPython it often needs many iterations to show, but it is a real bug.',
          bn: 'non-atomic read-modify-write থেকে lost update। আধুনিক CPython-এ দেখা যেতে প্রায়ই অনেক iteration লাগে, কিন্তু bug-টা সত্যি।'
        }
      },
      {
        id: 'take-lock',
        moves: [ { edge: 't1-lockA', label: 'acquire' } ],
        state: {
          counter: { en: 'value = 0 (rerun)', bn: 'value = 0 (আবার)' },
          lockA: { en: 'Held by T1', bn: 'T1-এর হাতে' },
          t1: { en: 'Has the lock', bn: 'lock আছে' },
          t2: { en: 'Idle', bn: 'বসে আছে' }
        },
        title: { en: 'Rerun with a lock', bn: 'Lock নিয়ে আবার চালানো' },
        simple: {
          en: 'We replay from the start, counter back at 0. This time Thread 1 takes the lock first.',
          bn: 'শুরু থেকে আবার চালাই, counter আবার ০। এবার Thread ১ আগে lock নেয়।'
        },
        tech: {
          en: '`with lock:` calls `acquire()` and guarantees `release()` in a `finally`, even if an exception is raised.',
          bn: '`with lock:` `acquire()` ডাকে আর `finally`-তে `release()` নিশ্চিত করে, exception হলেও।'
        }
      },
      {
        id: 't2-blocked',
        moves: [ { edge: 't2-lockA', label: 'acquire' } ],
        state: { t2: { en: 'Waiting on A', bn: 'A-র অপেক্ষায়' } },
        title: { en: 'Thread 2 has to wait', bn: 'Thread ২-কে অপেক্ষা করতে হয়' },
        simple: {
          en: 'Thread 2 asks for the same lock and must wait its turn.',
          bn: 'Thread ২ একই lock চায় আর পালার জন্য অপেক্ষা করে।'
        },
        tech: {
          en: '`Lock.acquire()` blocks until the lock is released. It also accepts `timeout=` or `blocking=False`.',
          bn: 'lock ছাড়া না পর্যন্ত `Lock.acquire()` আটকে থাকে। `timeout=` বা `blocking=False`-ও দেওয়া যায়।'
        }
      },
      {
        id: 't1-critical',
        moves: [ { edge: 't1-counter', label: '0+1, write 1' } ],
        state: {
          counter: { en: 'value = 1', bn: 'value = 1' },
          t1: { en: 'Updating alone', bn: 'একা আপডেট করছে' }
        },
        title: { en: 'Thread 1 updates alone', bn: 'Thread ১ একা আপডেট করে' },
        simple: {
          en: 'Thread 1 does its whole read, add and write in one go. Nobody can cut in.',
          bn: 'Thread ১ পড়া, যোগ আর লেখা এক টানে করে। মাঝখানে কেউ ঢুকতে পারে না।'
        },
        tech: {
          en: 'This is the critical section. No other thread that needs the same lock can interleave with it.',
          bn: 'এটাই critical section। একই lock চায় এমন অন্য কোনো thread এর মাঝে ঢুকতে পারে না।'
        }
      },
      {
        id: 'handover',
        moves: [ { edge: 'lockA-t2', label: 'your turn' } ],
        state: {
          lockA: { en: 'Held by T2', bn: 'T2-এর হাতে' },
          t1: { en: 'Done', bn: 'শেষ' },
          t2: { en: 'Has the lock', bn: 'lock আছে' }
        },
        title: { en: 'The lock passes to Thread 2', bn: 'Lock Thread ২-কে যায়' },
        simple: {
          en: 'Thread 1 lets go of the lock, and Thread 2 gets its turn.',
          bn: 'Thread ১ lock ছাড়ে, আর Thread ২ তার পালা পায়।'
        },
        tech: {
          en: 'Leaving the `with` block releases the lock. Thread 2’s blocked `acquire()` then returns.',
          bn: '`with` ব্লক ছাড়লে lock release হয়। তখন Thread ২-এর আটকে থাকা `acquire()` ফিরে আসে।'
        }
      },
      {
        id: 't2-critical',
        moves: [ { edge: 't2-counter', label: '1+1, write 2' } ],
        state: {
          counter: { en: 'value = 2', bn: 'value = 2' },
          lockA: { en: 'Free', bn: 'খালি' },
          t2: { en: 'Done', bn: 'শেষ' }
        },
        title: { en: 'The count is correct: 2', bn: 'গোনা ঠিক: ২' },
        simple: {
          en: 'Thread 2 reads 1, adds one and writes 2. Correct.',
          bn: 'Thread ২ ১ পড়ে, এক যোগ করে ২ লেখে। ঠিক।'
        },
        tech: {
          en: 'Serialised increments give the right result, but waiting costs throughput. Prefer designs that avoid shared state, such as queues.',
          bn: 'এক এক করে increment-এ ফল ঠিক হয়, কিন্তু অপেক্ষায় throughput কমে। shared state এড়ানো ডিজাইন ভালো, যেমন queue।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'deadlock',
      label: { en: 'Deadlock', bn: 'Deadlock' },
      branchAfter: 't2-writes',
      steps: [
        {
          id: 'take-both',
          moves: [
            { edge: 't1-lockA', label: 'take A' },
            { edge: 't2-lockB', label: 'take B' }
          ],
          state: {
            counter: { en: 'value = 1', bn: 'value = 1' },
            lockA: { en: 'Held by T1', bn: 'T1-এর হাতে' },
            lockB: { en: 'Held by T2', bn: 'T2-এর হাতে' },
            t1: { en: 'Has A', bn: 'A আছে' },
            t2: { en: 'Has B', bn: 'B আছে' }
          },
          title: { en: 'Each thread grabs a different lock', bn: 'প্রতিটা thread আলাদা lock ধরে' },
          simple: {
            en: 'A new job needs both locks. Thread 1 grabs A while Thread 2 grabs B.',
            bn: 'নতুন কাজে দুটো lock-ই লাগে। Thread ১ A ধরে, একই সময়ে Thread ২ B ধরে।'
          },
          tech: {
            en: 'Thread 1 takes A and will want B next. Thread 2 takes B and will want A next.',
            bn: 'Thread ১ A নেয় আর পরে B চাইবে। Thread ২ B নেয় আর পরে A চাইবে।'
          }
        },
        {
          id: 'cross-wait',
          moves: [
            { edge: 't1-lockB', label: 'wait for B' },
            { edge: 't2-lockA', label: 'wait for A' }
          ],
          state: {
            t1: { en: 'Waiting for B', bn: 'B-র অপেক্ষায়' },
            t2: { en: 'Waiting for A', bn: 'A-র অপেক্ষায়' }
          },
          title: { en: 'Each needs the other’s lock', bn: 'প্রত্যেকে অন্যজনের lock চায়' },
          simple: {
            en: 'Each thread now asks for the lock the other one holds.',
            bn: 'এখন প্রতিটা thread অন্যজনের হাতের lock চায়।'
          },
          tech: {
            en: 'Circular wait: Thread 1 holds A and requests B, while Thread 2 holds B and requests A.',
            bn: 'Circular wait: Thread ১ A ধরে B চায়, আর Thread ২ B ধরে A চায়।'
          }
        },
        {
          id: 'stuck',
          work: { node: [ 'lockA', 'lockB' ], kind: 'error' },
          state: {
            lockA: { en: 'Held by T1', bn: 'T1 ধরে আছে' },
            lockB: { en: 'Held by T2', bn: 'T2 ধরে আছে' },
            t1: { en: 'Stuck forever', bn: 'চিরকাল আটকে' },
            t2: { en: 'Stuck forever', bn: 'চিরকাল আটকে' }
          },
          title: { en: 'Nobody can move', bn: 'কেউ নড়তে পারে না' },
          simple: {
            en: 'Both wait forever. The program hangs and shows no error.',
            bn: 'দুজনেই চিরকাল অপেক্ষা করে। প্রোগ্রাম আটকে থাকে, কোনো error আসে না।'
          },
          tech: {
            en: 'Python does not detect deadlocks. To see where threads are stuck, use `faulthandler.dump_traceback_later`.',
            bn: 'Python deadlock ধরে না। thread কোথায় আটকে আছে দেখতে `faulthandler.dump_traceback_later` ব্যবহার করুন।'
          }
        },
        {
          id: 'fix-order',
          work: { node: [ 'lockA', 'lockB' ], kind: 'result' },
          state: {
            lockA: { en: 'Always A, then B', bn: 'সবসময় A, তারপর B' },
            lockB: { en: 'B comes second', bn: 'B আসে দ্বিতীয়' },
            t1: { en: 'A, then B', bn: 'A, তারপর B' },
            t2: { en: 'A, then B', bn: 'A, তারপর B' }
          },
          title: { en: 'Fix: one lock order', bn: 'সমাধান: lock-এর একটাই ক্রম' },
          simple: {
            en: 'Everyone takes the locks in the same order: A first, then B.',
            bn: 'সবাই একই ক্রমে lock নেয়: আগে A, তারপর B।'
          },
          tech: {
            en: 'A global lock order removes the circular wait. Other options: one lock, `acquire(timeout=...)`, or avoiding nested locks.',
            bn: 'global lock order circular wait সরিয়ে দেয়। অন্য উপায়: একটাই lock, `acquire(timeout=...)`, বা nested lock এড়ানো।'
          }
        }
      ]
    },
    {
      id: 'self-deadlock',
      label: { en: 'Same lock twice (RLock)', bn: 'একই lock দুবার (RLock)' },
      branchAfter: 'take-lock',
      steps: [
        {
          id: 'reenter',
          moves: [ { edge: 't1-lockA', label: 'acquire again' } ],
          state: { t1: { en: 'Asks A again', bn: 'আবার A চায়' } },
          title: { en: 'Thread 1 asks for A again', bn: 'Thread ১ আবার A চায়' },
          simple: {
            en: 'Thread 1 already holds Lock A, and some other code path asks for it again.',
            bn: 'Thread ১ ইতিমধ্যে Lock A ধরে আছে, আর কোডের অন্য এক জায়গা সেটা আবার চায়।'
          },
          tech: {
            en: 'A method that holds the lock calls another method that takes the same lock.',
            bn: 'যে method lock ধরে আছে, সে আরেকটা method ডাকে যেটাও একই lock নেয়।'
          }
        },
        {
          id: 'reacquire',
          work: { node: 't1', kind: 'error' },
          state: { t1: { en: 'Blocked by itself', bn: 'নিজেই আটকে' } },
          title: { en: 'It waits for itself', bn: 'নিজের জন্যই অপেক্ষা' },
          simple: {
            en: 'The lock is taken, so Thread 1 waits for itself. It will wait forever.',
            bn: 'lock নেওয়া, তাই Thread ১ নিজের জন্যই অপেক্ষা করে। সেটা কখনো শেষ হবে না।'
          },
          tech: {
            en: '`threading.Lock` is not reentrant. Acquiring it twice in one thread hangs.',
            bn: '`threading.Lock` reentrant নয়। একই thread-এ দুবার acquire করলে আটকে যায়।'
          }
        },
        {
          id: 'rlock',
          work: { node: 'lockA', kind: 'result' },
          state: {
            lockA: { en: 'RLock: T1 ×2', bn: 'RLock: T1 ×2' },
            t1: { en: 'Holds it twice', bn: 'দুবার ধরেছে' }
          },
          title: { en: 'Use an RLock instead', bn: 'বদলে RLock নিন' },
          simple: {
            en: 'A re-entrant lock remembers its owner and lets that owner in again.',
            bn: 're-entrant lock তার মালিককে মনে রাখে আর মালিককে আবার ঢুকতে দেয়।'
          },
          tech: {
            en: '`RLock` tracks owner and depth. Release it as many times as you acquired, and only the owner may release. A plain `Lock` has no owner.',
            bn: '`RLock` owner আর depth মনে রাখে। যতবার acquire, ততবার release করুন, আর শুধু owner release করতে পারে। সাধারণ `Lock`-এর owner নেই।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'Two people update a paper tally on the fridge. The number on the fridge is the shared counter, and a marker pen is the lock: you may change the number only while holding the pen.',
      bn: 'দুজন মানুষ ফ্রিজের গায়ে কাগজের হিসাব হালনাগাদ করে। ফ্রিজের সংখ্যাটা shared counter, আর মার্কার কলম হলো lock: কলম হাতে থাকলেই কেবল সংখ্যা বদলানো যায়।'
    },
    twins: [
      {
        icon: 'thread',
        node: 't1',
        name: { en: 'Person 1', bn: 'প্রথম মানুষ' },
        d: {
          en: 'Reads the tally, adds one in their head, writes it back.',
          bn: 'হিসাব পড়ে, মনে মনে এক যোগ করে, আবার লিখে রাখে।'
        }
      },
      {
        icon: 'thread',
        node: 't2',
        name: { en: 'Person 2', bn: 'দ্বিতীয় মানুষ' },
        d: {
          en: 'Does the same job at the same time, on the same fridge.',
          bn: 'একই সময়ে, একই ফ্রিজে একই কাজ করে।'
        }
      },
      {
        icon: 'memory',
        node: 'counter',
        name: { en: 'The number on the fridge', bn: 'ফ্রিজের গায়ের সংখ্যা' },
        d: {
          en: 'One shared value that both people read and change.',
          bn: 'একটাই ভাগ করা মান, যেটা দুজনেই পড়ে আর বদলায়।'
        }
      },
      {
        icon: 'lock',
        node: 'lockA',
        name: { en: 'The marker pen', bn: 'মার্কার কলম' },
        d: {
          en: 'Only the person holding it may change the number. Everyone else waits.',
          bn: 'যার হাতে কলম, শুধু সে-ই সংখ্যা বদলাতে পারে। বাকিরা অপেক্ষা করে।'
        }
      },
      {
        icon: 'lock',
        node: 'lockB',
        name: { en: 'The eraser', bn: 'ইরেজার' },
        d: {
          en: 'A second tool that some jobs also need.',
          bn: 'দ্বিতীয় একটা জিনিস, যেটা কিছু কাজে লাগে।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Both read 5, both write 6', bn: 'দুজনেই ৫ পড়ে, দুজনেই ৬ লেখে' },
        is: { en: 'is a lost update', bn: 'মানে lost update' },
        d: {
          en: 'Two people add one to the same 5. The fridge says 6, but it should say 7.',
          bn: 'দুজন একই ৫-এর সাথে এক যোগ করে। ফ্রিজে ৬ থাকে, অথচ হওয়ার কথা ৭।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Pen in one hand, eraser in the other', bn: 'একজনের হাতে কলম, আরেকজনের হাতে ইরেজার' },
        is: { en: 'is a deadlock', bn: 'মানে deadlock' },
        d: {
          en: 'Person 1 holds the pen and wants the eraser. Person 2 holds the eraser and wants the pen. Both wait forever. Fix: always take the pen first.',
          bn: 'প্রথমজনের হাতে কলম, সে ইরেজার চায়। দ্বিতীয়জনের হাতে ইরেজার, সে কলম চায়। দুজনেই চিরকাল অপেক্ষা করে। সমাধান: সবসময় আগে কলম নিন।'
        }
      }
    ]
  },
  qa: [
    {
      q: { en: 'What is a race condition?', bn: 'Race condition কী?' },
      short: {
        en: 'The result depends on the timing of concurrent operations on shared state.',
        bn: 'shared state-এ concurrent কাজের সময়ের ওপর ফল নির্ভর করে।'
      },
      deep: {
        en: 'The classic form is read-modify-write: two threads read the same value, and the second write overwrites the first (a lost update). Check-then-act and ordering bugs are variants.',
        bn: 'ক্লাসিক রূপ read-modify-write: দুটো thread একই মান পড়ে, আর দ্বিতীয় লেখা প্রথমটা মুছে দেয় (lost update)। check-then-act আর ordering bug এরই ধরন।'
      },
      redFlag: {
        en: '“A bug where the code runs too fast.”',
        bn: '“কোড খুব দ্রুত চললে যে bug হয়।”'
      }
    },
    {
      q: { en: 'Is `counter += 1` thread-safe in CPython with the GIL?', bn: 'GIL থাকলে CPython-এ `counter += 1` কি thread-safe?' },
      short: { en: 'No.', bn: 'না।' },
      deep: {
        en: 'It compiles to separate load, add and store bytecodes, and threads can switch between them. The docs FAQ lists `i = i+1` as not atomic, while `L.append(x)` and `D[x] = y` are atomic.',
        bn: 'এটা আলাদা load, add, store bytecode-এ কম্পাইল হয়, আর এর মাঝে thread বদলাতে পারে। docs FAQ-তে `i = i+1` non-atomic, আর `L.append(x)` ও `D[x] = y` atomic।'
      },
      redFlag: {
        en: '“Yes, the GIL makes it atomic.”',
        bn: '“হ্যাঁ, GIL একে atomic করে।”'
      }
    },
    {
      q: { en: 'How do you fix a race?', bn: 'Race কীভাবে ঠিক করেন?' },
      short: {
        en: 'Protect the update with a `threading.Lock`, or avoid sharing.',
        bn: 'আপডেটটা `threading.Lock` দিয়ে বাঁচান, অথবা ভাগাভাগিই এড়ান।'
      },
      deep: {
        en: '`with lock: counter += 1`. Or use a `queue.Queue`, per-thread counters summed at the end, or `multiprocessing.Value`. Across processes, use atomic operations in a database or Redis.',
        bn: '`with lock: counter += 1`। বা `queue.Queue`, প্রতি thread-এর আলাদা counter শেষে যোগ করা, বা `multiprocessing.Value`। process-এর মধ্যে database বা Redis-এর atomic operation ব্যবহার করুন।'
      },
      redFlag: {
        en: '“Add `time.sleep()` so they do not overlap.”',
        bn: '“`time.sleep()` দিন, যাতে overlap না হয়।”'
      }
    },
    {
      q: { en: 'What is a deadlock and how do you avoid it?', bn: 'Deadlock কী আর কীভাবে এড়ান?' },
      short: {
        en: 'Threads wait on each other’s locks in a cycle.',
        bn: 'thread-রা চক্রের মতো একে অপরের lock-এর জন্য অপেক্ষা করে।'
      },
      deep: {
        en: 'It needs hold-and-wait plus circular wait. Use one consistent lock order, hold fewer locks, use `acquire(timeout=)`, or one coarse lock. Python does not detect deadlocks.',
        bn: 'এর জন্য hold-and-wait আর circular wait লাগে। lock-এর একটাই ক্রম মানুন, কম lock ধরুন, `acquire(timeout=)` ব্যবহার করুন, বা একটাই বড় lock নিন। Python deadlock ধরে না।'
      },
      redFlag: {
        en: '“Python detects it and raises an error.”',
        bn: '“Python ধরে ফেলে আর error তোলে।”'
      }
    },
    {
      q: { en: 'Lock vs RLock?', bn: 'Lock আর RLock-এর পার্থক্য?' },
      short: {
        en: 'An RLock can be re-acquired by its owner. A Lock cannot.',
        bn: 'RLock-কে তার owner আবার acquire করতে পারে। Lock-কে পারে না।'
      },
      deep: {
        en: 'An RLock tracks its owner and depth, and only the owner may release it. A plain Lock has no owner, so any thread can release it. RLock costs a little more and can hide design problems.',
        bn: 'RLock owner আর depth মনে রাখে, আর শুধু owner release করতে পারে। সাধারণ Lock-এর owner নেই, তাই যেকোনো thread release করতে পারে। RLock-এর খরচ একটু বেশি, আর এটা ডিজাইনের সমস্যা লুকাতে পারে।'
      },
      redFlag: {
        en: '“RLock is just a faster Lock.”',
        bn: '“RLock মানে শুধু দ্রুততর Lock।”'
      }
    },
    {
      q: { en: 'Does asyncio need locks?', bn: 'asyncio-তে কি lock লাগে?' },
      short: {
        en: 'Sometimes: tasks interleave at `await`.',
        bn: 'মাঝে মাঝে: `await`-এ task-রা মিশে যায়।'
      },
      deep: {
        en: 'Code without an `await` is effectively atomic on one loop, but a read, `await`, write sequence is not. `asyncio.Lock` is FIFO, not thread-safe, and has no timeout argument.',
        bn: '`await` ছাড়া কোড একটা loop-এ কার্যত atomic, কিন্তু পড়া, `await`, লেখা ক্রম নয়। `asyncio.Lock` FIFO, thread-safe নয়, আর এতে timeout argument নেই।'
      },
      redFlag: {
        en: '“No locks are needed in asyncio, ever.”',
        bn: '“asyncio-তে কখনোই lock লাগে না।”'
      }
    },
    {
      q: { en: 'How do you reproduce a race in a test?', bn: 'টেস্টে race কীভাবে ঘটান?' },
      short: {
        en: 'Many iterations and a tiny switch interval.',
        bn: 'অনেক iteration আর খুব ছোট switch interval।'
      },
      deep: {
        en: 'Try `sys.setswitchinterval(1e-6)` and a loop of about 100k increments on several threads. With few iterations a race can stay hidden on modern CPython.',
        bn: '`sys.setswitchinterval(1e-6)` আর কয়েকটা thread-এ প্রায় ১ লাখ increment-এর loop চেষ্টা করুন। কম iteration-এ আধুনিক CPython-এ race লুকিয়ে থাকতে পারে।'
      },
      redFlag: {
        en: '“The test passed once, so it is safe.”',
        bn: '“টেস্ট একবার পাস করেছে, তাই নিরাপদ।”'
      }
    },
    {
      q: { en: 'What does `with lock:` guarantee on an exception?', bn: 'exception হলে `with lock:` কী নিশ্চিত করে?' },
      short: { en: 'The lock is released.', bn: 'lock release হয়।' },
      deep: {
        en: '`with lock:` is like `acquire()` then `try: ... finally: release()`. A bare `acquire()` without `finally` can leave the lock held forever.',
        bn: '`with lock:` মানে `acquire()`, তারপর `try: ... finally: release()`। `finally` ছাড়া শুধু `acquire()` lock চিরকালের জন্য ধরা রেখে দিতে পারে।'
      },
      redFlag: {
        en: '“A lock is released automatically when its thread dies.”',
        bn: '“thread মরে গেলে lock নিজে থেকে ছাড়া পায়।”'
      }
    }
  ],
  cheats: [
    {
      code: 'lock = threading.Lock()\nwith lock: counter += 1',
      d: {
        en: 'Make the read-modify-write one critical section.',
        bn: 'read-modify-write-কে একটা critical section বানান।'
      }
    },
    {
      code: 'if lock.acquire(timeout=2): ...; lock.release()\nelse: log("could not get lock")',
      d: {
        en: 'Use a timeout so you never hang forever.',
        bn: 'timeout দিন, যাতে চিরকাল আটকে না থাকেন।'
      }
    },
    {
      code: 'rlock = threading.RLock()\nwith rlock:\n    with rlock: ...      # same thread may re-enter',
      d: {
        en: 'A re-entrant lock for recursive call paths.',
        bn: 'recursive call path-এর জন্য re-entrant lock।'
      }
    },
    {
      code: 'for lk in sorted((a, b), key=id): lk.acquire()',
      d: {
        en: 'Enforce one global lock order with a stable key.',
        bn: 'স্থির key দিয়ে একটাই global lock order মানুন।'
      }
    },
    {
      code: 'import faulthandler; faulthandler.dump_traceback_later(10)',
      d: {
        en: 'Dump every thread’s stack after 10 s. Handy for a hang.',
        bn: '১০ সেকেন্ড পর সব thread-এর stack dump করে। hang ধরতে কাজের।'
      }
    },
    {
      code: 'import sys; sys.setswitchinterval(1e-6)    # amplify races in a repro',
      d: {
        en: 'A teaching and test aid only, not for production.',
        bn: 'শুধু শেখা আর টেস্টের জন্য, production-এর জন্য নয়।'
      }
    },
    {
      code: 'alock = asyncio.Lock()\nasync with alock: await update()',
      d: {
        en: 'Serialise tasks across `await` points. Not thread-safe.',
        bn: '`await`-এর ফাঁকে task-দের এক এক করে চালান। thread-safe নয়।'
      }
    },
    {
      code: 'import dis; dis.dis("counter += 1")',
      d: {
        en: 'Show that the statement is several bytecodes.',
        bn: 'দেখুন, স্টেটমেন্টটা কয়েকটা bytecode।'
      }
    }
  ],
  sources: [
    { label: 'Python docs: library FAQ (atomic operations)', url: 'https://docs.python.org/3/faq/library.html' },
    { label: 'Python docs: threading (Lock, RLock)', url: 'https://docs.python.org/3/library/threading.html' },
    { label: 'Python docs: asyncio synchronization primitives', url: 'https://docs.python.org/3/library/asyncio-sync.html' },
    { label: 'Python docs: free-threading HOWTO', url: 'https://docs.python.org/3/howto/free-threading-python.html' },
    { label: 'Python docs: sys.setswitchinterval', url: 'https://docs.python.org/3/library/sys.html' }
  ]
}
