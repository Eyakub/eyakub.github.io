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
  hook: {
    en: 'Two cooks updating one whiteboard number can erase each other’s work. One marker pen, held by one cook at a time, fixes it.',
    bn: 'দুই রাঁধুনি একই বোর্ডের সংখ্যা বদলালে একজনের কাজ মুছে যেতে পারে। একবারে একজনের হাতে থাকা একটা মার্কার কলম তা ঠেকায়।'
  },
  takeaway: {
    en: 'Shared things need turns: only the cook holding the pen may touch the tally.',
    bn: 'ভাগ করা জিনিসে পালা লাগে: কলম যার হাতে, শুধু সে-ই হিসাব ছুঁতে পারে।'
  },
  words: [
    {
      term: { en: 'Cook (thread)', bn: 'রাঁধুনি (thread)' },
      d: {
        en: 'One job running inside a program. Here, one cook.',
        bn: 'প্রোগ্রামের ভেতরে চলা একটা কাজ। এখানে, একজন রাঁধুনি।'
      }
    },
    {
      term: { en: 'Whiteboard tally (shared counter)', bn: 'হোয়াইটবোর্ডের হিসাব (shared counter)' },
      d: {
        en: 'One number on the whiteboard that every cook can read and change.',
        bn: 'হোয়াইটবোর্ডের একটা সংখ্যা, যেটা প্রতিটা রাঁধুনি পড়তে আর বদলাতে পারে।'
      }
    },
    {
      term: { en: 'Marker pen (lock)', bn: 'মার্কার কলম (lock)' },
      d: {
        en: 'Only the cook holding it may touch the tally. Everyone else waits.',
        bn: 'যার হাতে কলম, শুধু সে-ই হিসাব ছুঁতে পারে। বাকিরা অপেক্ষা করে।'
      }
    },
    {
      term: { en: 'Lost update (race condition)', bn: 'হারানো আপডেট (race condition)' },
      d: {
        en: 'Two cooks change the tally at once, and one change gets wiped out.',
        bn: 'দুই রাঁধুনি একসাথে হিসাব বদলায়, আর একজনের বদল মুছে যায়।'
      }
    },
    {
      term: { en: 'Stuck for good (deadlock)', bn: 'চিরকাল আটকে (deadlock)' },
      d: {
        en: 'Two cooks each hold what the other needs, so both wait forever.',
        bn: 'দুজনেই এমন জিনিস ধরে আছে যা অন্যজনের লাগে, তাই দুজনেই চিরকাল অপেক্ষা করে।'
      }
    }
  ],
  legend: {
    request: { en: 'Writing the tally', bn: 'হিসাবে লেখা' },
    queue: { en: 'Asking for a tool', bn: 'জিনিস চাওয়া' },
    result: { en: 'Reading or handing over', bn: 'পড়া বা হাতবদল' },
    error: { en: 'Stuck for good', bn: 'চিরকাল আটকে' }
  },
  view: { wide: [ 1000, 440 ], narrow: [ 400, 580 ] },
  nodeR: { narrow: 20 },
  nodes: {
    t1: {
      icon: 'thread',
      name: { en: 'Thread 1', bn: 'Thread ১' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      plain: {
        name: { en: 'Cook 1', bn: 'রাঁধুনি ১' },
        sub: { en: 'Ready to cook', bn: 'রাঁধতে তৈরি' }
      },
      wide: [ 450, 80, 'up' ],
      narrow: [ 60, 230, 'right' ]
    },
    t2: {
      icon: 'thread',
      name: { en: 'Thread 2', bn: 'Thread ২' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      plain: {
        name: { en: 'Cook 2', bn: 'রাঁধুনি ২' },
        sub: { en: 'Ready to cook', bn: 'রাঁধতে তৈরি' }
      },
      wide: [ 450, 360, 'down' ],
      narrow: [ 340, 230, 'left' ]
    },
    counter: {
      icon: 'memory',
      name: { en: 'Shared counter', bn: 'Shared counter' },
      sub: { en: 'value = 0', bn: 'value = 0' },
      plain: {
        name: { en: 'Whiteboard tally', bn: 'হোয়াইটবোর্ডের হিসাব' },
        sub: { en: 'Shows 0', bn: '০ লেখা আছে' }
      },
      wide: [ 800, 220, 'right' ],
      narrow: [ 200, 500, 'down' ]
    },
    lockA: {
      icon: 'lock',
      name: { en: 'Lock A', bn: 'Lock A' },
      sub: { en: 'Free', bn: 'খালি' },
      plain: {
        name: { en: 'The marker pen', bn: 'মার্কার কলম' },
        sub: { en: 'On the table', bn: 'টেবিলে রাখা' }
      },
      wide: [ 350, 220, 'left' ],
      narrow: [ 200, 80, 'up' ]
    },
    lockB: {
      icon: 'lock',
      name: { en: 'Lock B', bn: 'Lock B' },
      sub: { en: 'Free', bn: 'খালি' },
      plain: {
        name: { en: 'The knife', bn: 'ছুরি' },
        sub: { en: 'Not used yet', bn: 'এখনো লাগছে না' }
      },
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
        moves: [ { edge: 'counter-t1', label: 'read 0', plain: { en: 'Reads 0', bn: 'পড়ে ০' } } ],
        state: { t1: { en: 'Has 0', bn: 'হাতে ০' } },
        plainState: { t1: { en: 'Remembers 0', bn: '০ মনে আছে' } },
        title: { en: 'Cook 1 reads the tally', bn: 'রাঁধুনি ১ হিসাব পড়ে' },
        simple: {
          en: 'Two cooks share one whiteboard tally, now at 0. Cook 1 reads it and remembers 0.',
          bn: 'দুই রাঁধুনি একটা হোয়াইটবোর্ডের হিসাব ভাগ করে, এখন ০। রাঁধুনি ১ সেটা পড়ে ০ মনে রাখে।'
        },
        tech: {
          en: '`counter += 1` is load, add, store, not one step. Thread 1 loads 0 into its own private stack.',
          bn: '`counter += 1` মানে load, add, store, এক ধাপ নয়। Thread ১ ০ নিজের private stack-এ তোলে।'
        }
      },
      {
        id: 't2-reads',
        moves: [ { edge: 'counter-t2', label: 'read 0', plain: { en: 'Reads 0', bn: 'পড়ে ০' } } ],
        state: { t2: { en: 'Has 0', bn: 'হাতে ০' } },
        plainState: { t2: { en: 'Remembers 0', bn: '০ মনে আছে' } },
        title: { en: 'Cook 2 reads the same 0', bn: 'রাঁধুনি ২-ও একই ০ পড়ে' },
        simple: {
          en: 'Before Cook 1 writes back, Cook 2 reads the tally too. It still says 0.',
          bn: 'রাঁধুনি ১ ফেরত লেখার আগেই রাঁধুনি ২-ও হিসাব পড়ে। তখনো ০।'
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
        plainState: { t1: { en: 'Remembers 1', bn: '১ মনে আছে' } },
        title: { en: 'Cook 1 adds one', bn: 'রাঁধুনি ১ এক যোগ করে' },
        simple: {
          en: 'Cook 1 adds one in their head. The tally on the board has not changed yet.',
          bn: 'রাঁধুনি ১ মনে মনে এক যোগ করে। বোর্ডের হিসাব এখনো বদলায়নি।'
        },
        tech: {
          en: 'The add happens on Thread 1’s private value. The shared counter is untouched.',
          bn: 'যোগটা Thread ১-এর নিজস্ব মানে হয়। shared counter ছোঁয়াই হয় না।'
        }
      },
      {
        id: 't1-writes',
        moves: [ { edge: 't1-counter', label: 'write 1', plain: { en: 'Writes 1', bn: 'লেখে ১' } } ],
        state: {
          counter: { en: 'value = 1', bn: 'value = 1' },
          t1: { en: 'Wrote 1', bn: '১ লিখেছে' }
        },
        plainState: { counter: { en: 'Shows 1', bn: '১ লেখা আছে' } },
        title: { en: 'Cook 1 writes 1', bn: 'রাঁধুনি ১ ১ লেখে' },
        simple: {
          en: 'Cook 1 writes 1 on the board. So far so good.',
          bn: 'রাঁধুনি ১ বোর্ডে ১ লেখে। এ পর্যন্ত ঠিক আছে।'
        },
        tech: {
          en: 'The store completes. Thread 2 does not know the counter has changed.',
          bn: 'store শেষ হয়। counter বদলেছে, Thread ২ তা জানে না।'
        }
      },
      {
        id: 't2-writes',
        moves: [ { edge: 't2-counter', label: 'write 1', plain: { en: 'Writes 1', bn: 'লেখে ১' } } ],
        state: {
          counter: { en: 'value = 1, not 2!', bn: 'value = 1, ২ নয়!' },
          t2: { en: 'Wrote 1', bn: '১ লিখেছে' }
        },
        plainState: { counter: { en: 'Shows 1, not 2!', bn: '১ লেখা, ২ নয়!' } },
        title: { en: 'Cook 2 wipes it out', bn: 'রাঁধুনি ২ মুছে দেয়' },
        simple: {
          en: 'Cook 2 also writes 1, erasing Cook 1’s work. Two adds, one result: a lost update.',
          bn: 'রাঁধুনি ২-ও ১ লেখে, রাঁধুনি ১-এর কাজ মুছে যায়। দুটো যোগ, ফল একটাই: হারানো আপডেট।'
        },
        tech: {
          en: 'Lost update from a non-atomic read-modify-write. On modern CPython it often needs many iterations to show, but it is a real bug.',
          bn: 'non-atomic read-modify-write থেকে lost update। আধুনিক CPython-এ দেখা যেতে প্রায়ই অনেক iteration লাগে, কিন্তু bug-টা সত্যি।'
        }
      },
      {
        id: 'take-lock',
        moves: [ { edge: 't1-lockA', label: 'acquire', plain: { en: 'Grabs the pen', bn: 'কলম নেয়' } } ],
        state: {
          counter: { en: 'value = 0 (rerun)', bn: 'value = 0 (আবার)' },
          lockA: { en: 'Held by T1', bn: 'T1-এর হাতে' },
          t1: { en: 'Has the lock', bn: 'lock আছে' },
          t2: { en: 'Idle', bn: 'বসে আছে' }
        },
        plainState: {
          counter: { en: 'Wiped back to 0', bn: 'আবার ০ করা' },
          lockA: { en: 'Cook 1 has it', bn: 'রাঁধুনি ১-এর হাতে' },
          t1: { en: 'Has the pen', bn: 'কলম আছে' },
          t2: { en: 'Ready to cook', bn: 'রাঁধতে তৈরি' }
        },
        title: { en: 'Replay with a marker pen', bn: 'মার্কার কলম নিয়ে আবার চালানো' },
        simple: {
          en: 'Replay: same cooks, tally wiped back to 0. Now one marker pen guards the tally, and Cook 1 grabs it first.',
          bn: 'আবার চালাই: একই রাঁধুনি, হিসাব আবার ০। এবার একটা মার্কার কলম হিসাব পাহারা দেয়, আর রাঁধুনি ১ আগে সেটা নেয়।'
        },
        tech: {
          en: '`with lock:` calls `acquire()` and guarantees `release()` in a `finally`, even if an exception is raised.',
          bn: '`with lock:` `acquire()` ডাকে আর `finally`-তে `release()` নিশ্চিত করে, exception হলেও।'
        }
      },
      {
        id: 't2-blocked',
        moves: [ { edge: 't2-lockA', label: 'acquire', plain: { en: 'Asks for the pen', bn: 'কলম চায়' } } ],
        state: { t2: { en: 'Waiting on A', bn: 'A-র অপেক্ষায়' } },
        plainState: { t2: { en: 'Waits for the pen', bn: 'কলমের অপেক্ষায়' } },
        title: { en: 'Cook 2 has to wait', bn: 'রাঁধুনি ২-কে অপেক্ষা করতে হয়' },
        simple: {
          en: 'Cook 2 asks for the pen too, but Cook 1 has it. Cook 2 must wait its turn.',
          bn: 'রাঁধুনি ২-ও কলম চায়, কিন্তু সেটা রাঁধুনি ১-এর হাতে। তাকে পালার জন্য অপেক্ষা করতে হয়।'
        },
        tech: {
          en: '`Lock.acquire()` blocks until the lock is released. It also accepts `timeout=` or `blocking=False`.',
          bn: 'lock ছাড়া না পর্যন্ত `Lock.acquire()` আটকে থাকে। `timeout=` বা `blocking=False`-ও দেওয়া যায়।'
        }
      },
      {
        id: 't1-critical',
        moves: [ { edge: 't1-counter', label: '0+1, write 1', plain: { en: 'Updates to 1', bn: '১ করে দেয়' } } ],
        state: {
          counter: { en: 'value = 1', bn: 'value = 1' },
          t1: { en: 'Updating alone', bn: 'একা আপডেট করছে' }
        },
        plainState: { counter: { en: 'Shows 1', bn: '১ লেখা আছে' } },
        title: { en: 'Cook 1 updates alone', bn: 'রাঁধুনি ১ একা আপডেট করে' },
        simple: {
          en: 'Holding the pen, Cook 1 reads, adds and writes in one go. Nobody can cut in.',
          bn: 'কলম হাতে রাঁধুনি ১ পড়া, যোগ আর লেখা এক টানে করে। মাঝখানে কেউ ঢুকতে পারে না।'
        },
        tech: {
          en: 'This is the critical section. No other thread that needs the same lock can interleave with it.',
          bn: 'এটাই critical section। একই lock চায় এমন অন্য কোনো thread এর মাঝে ঢুকতে পারে না।'
        }
      },
      {
        id: 'handover',
        moves: [ { edge: 'lockA-t2', label: 'your turn', plain: { en: 'Passes the pen', bn: 'কলম দেয়' } } ],
        state: {
          lockA: { en: 'Held by T2', bn: 'T2-এর হাতে' },
          t1: { en: 'Done', bn: 'শেষ' },
          t2: { en: 'Has the lock', bn: 'lock আছে' }
        },
        plainState: {
          lockA: { en: 'Cook 2 has it', bn: 'রাঁধুনি ২-এর হাতে' },
          t2: { en: 'Has the pen', bn: 'কলম আছে' }
        },
        title: { en: 'The pen passes to Cook 2', bn: 'কলম রাঁধুনি ২-এর কাছে যায়' },
        simple: {
          en: 'Cook 1 puts the pen down, and Cook 2 picks it up.',
          bn: 'রাঁধুনি ১ কলম নামিয়ে রাখে, আর রাঁধুনি ২ সেটা তোলে।'
        },
        tech: {
          en: 'Leaving the `with` block releases the lock. Thread 2’s blocked `acquire()` then returns.',
          bn: '`with` ব্লক ছাড়লে lock release হয়। তখন Thread ২-এর আটকে থাকা `acquire()` ফিরে আসে।'
        }
      },
      {
        id: 't2-critical',
        moves: [ { edge: 't2-counter', label: '1+1, write 2', plain: { en: 'Updates to 2', bn: '২ করে দেয়' } } ],
        state: {
          counter: { en: 'value = 2', bn: 'value = 2' },
          lockA: { en: 'Free', bn: 'খালি' },
          t2: { en: 'Done', bn: 'শেষ' }
        },
        plainState: {
          counter: { en: 'Shows 2', bn: '২ লেখা আছে' },
          lockA: { en: 'On the table', bn: 'টেবিলে রাখা' }
        },
        title: { en: 'The tally is right: 2', bn: 'হিসাব ঠিক: ২' },
        simple: {
          en: 'Cook 2 reads 1, adds one and writes 2. Correct.',
          bn: 'রাঁধুনি ২ ১ পড়ে, এক যোগ করে ২ লেখে। ঠিক।'
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
      label: { en: 'Two tools, both stuck', bn: 'দুটো জিনিস, দুজনেই আটকে' },
      whatIf: {
        en: 'What if a job needs both the pen and the knife?',
        bn: 'যদি কোনো কাজে কলম আর ছুরি দুটোই লাগে?'
      },
      branchAfter: 't2-writes',
      steps: [
        {
          id: 'take-both',
          moves: [
            { edge: 't1-lockA', label: 'take A', plain: { en: 'Grabs the pen', bn: 'কলম নেয়' } },
            { edge: 't2-lockB', label: 'take B', plain: { en: 'Grabs the knife', bn: 'ছুরি নেয়' } }
          ],
          state: {
            counter: { en: 'value = 1', bn: 'value = 1' },
            lockA: { en: 'Held by T1', bn: 'T1-এর হাতে' },
            lockB: { en: 'Held by T2', bn: 'T2-এর হাতে' },
            t1: { en: 'Has A', bn: 'A আছে' },
            t2: { en: 'Has B', bn: 'B আছে' }
          },
          plainState: {
            counter: { en: 'Shows 1', bn: '১ লেখা আছে' },
            lockA: { en: 'Cook 1 has it', bn: 'রাঁধুনি ১-এর হাতে' },
            lockB: { en: 'Cook 2 has it', bn: 'রাঁধুনি ২-এর হাতে' },
            t1: { en: 'Has the pen', bn: 'কলম আছে' },
            t2: { en: 'Has the knife', bn: 'ছুরি আছে' }
          },
          title: { en: 'Each cook grabs a different tool', bn: 'প্রতিটা রাঁধুনি আলাদা জিনিস ধরে' },
          simple: {
            en: 'A new job needs the pen and the knife. Cook 1 grabs the pen while Cook 2 grabs the knife.',
            bn: 'নতুন কাজে কলম আর ছুরি দুটোই লাগে। রাঁধুনি ১ কলম ধরে, একই সময়ে রাঁধুনি ২ ছুরি ধরে।'
          },
          tech: {
            en: 'Thread 1 takes A and will want B next. Thread 2 takes B and will want A next.',
            bn: 'Thread ১ A নেয় আর পরে B চাইবে। Thread ২ B নেয় আর পরে A চাইবে।'
          }
        },
        {
          id: 'cross-wait',
          moves: [
            { edge: 't1-lockB', label: 'wait for B', plain: { en: 'Wants the knife', bn: 'ছুরি চায়' } },
            { edge: 't2-lockA', label: 'wait for A', plain: { en: 'Wants the pen', bn: 'কলম চায়' } }
          ],
          state: {
            t1: { en: 'Waiting for B', bn: 'B-র অপেক্ষায়' },
            t2: { en: 'Waiting for A', bn: 'A-র অপেক্ষায়' }
          },
          plainState: {
            t1: { en: 'Wants the knife', bn: 'ছুরি চায়' },
            t2: { en: 'Wants the pen', bn: 'কলম চায়' }
          },
          title: { en: 'Each wants the other’s tool', bn: 'প্রত্যেকে অন্যজনের জিনিস চায়' },
          simple: {
            en: 'Each cook now asks for the tool the other one is holding.',
            bn: 'এখন প্রতিটা রাঁধুনি অন্যজনের হাতের জিনিসটা চায়।'
          },
          tech: {
            en: 'Circular wait: Thread 1 holds A and requests B, while Thread 2 holds B and requests A.',
            bn: 'Circular wait: Thread ১ A ধরে B চায়, আর Thread ২ B ধরে A চায়।'
          }
        },
        {
          id: 'stuck',
          work: { node: [ 't1', 't2' ], kind: 'error' },
          state: {
            lockA: { en: 'Held by T1', bn: 'T1 ধরে আছে' },
            lockB: { en: 'Held by T2', bn: 'T2 ধরে আছে' },
            t1: { en: 'Stuck forever', bn: 'চিরকাল আটকে' },
            t2: { en: 'Stuck forever', bn: 'চিরকাল আটকে' }
          },
          plainState: {
            lockA: { en: 'Cook 1 has it', bn: 'রাঁধুনি ১ ধরে আছে' },
            lockB: { en: 'Cook 2 has it', bn: 'রাঁধুনি ২ ধরে আছে' }
          },
          title: { en: 'Nobody can move', bn: 'কেউ নড়তে পারে না' },
          simple: {
            en: 'Both cooks wait forever: a deadlock. The kitchen freezes and no error appears.',
            bn: 'দুজনেই চিরকাল অপেক্ষা করে: ডেডলক। রান্নাঘর থেমে যায়, কোনো ভুলের বার্তাও আসে না।'
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
          plainState: {
            lockA: { en: 'Always taken first', bn: 'সবসময় আগে নেওয়া' },
            lockB: { en: 'Always taken second', bn: 'সবসময় পরে নেওয়া' },
            t1: { en: 'Pen, then knife', bn: 'কলম, পরে ছুরি' },
            t2: { en: 'Pen, then knife', bn: 'কলম, পরে ছুরি' }
          },
          title: { en: 'Fix: one order for tools', bn: 'সমাধান: জিনিস নেওয়ার একটাই ক্রম' },
          simple: {
            en: 'Every cook takes the pen first, then the knife. Nobody holds one and waits for the other.',
            bn: 'সবাই আগে কলম নেয়, তারপর ছুরি। কেউ একটা ধরে অন্যটার জন্য আটকে থাকে না।'
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
      label: { en: 'Asking for the pen twice', bn: 'কলম দুবার চাওয়া' },
      whatIf: {
        en: 'What if a cook asks for a pen they already hold?',
        bn: 'যদি কোনো রাঁধুনি এমন কলম চায় যেটা ইতিমধ্যে তার হাতে?'
      },
      branchAfter: 'take-lock',
      steps: [
        {
          id: 'reenter',
          moves: [ { edge: 't1-lockA', label: 'acquire again', plain: { en: 'Wants pen again', bn: 'আবার কলম চায়' } } ],
          state: { t1: { en: 'Asks A again', bn: 'আবার A চায়' } },
          plainState: { t1: { en: 'Wants pen again', bn: 'আবার কলম চায়' } },
          title: { en: 'Cook 1 asks for the pen again', bn: 'রাঁধুনি ১ আবার কলম চায়' },
          simple: {
            en: 'Cook 1 already holds the pen, but another step of the same job asks for it again.',
            bn: 'রাঁধুনি ১ ইতিমধ্যে কলম ধরে আছে, কিন্তু একই কাজের আরেক ধাপ সেটা আবার চায়।'
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
          plainState: { t1: { en: 'Waits for itself', bn: 'নিজের জন্য অপেক্ষা' } },
          title: { en: 'It waits for itself', bn: 'নিজের জন্যই অপেক্ষা' },
          simple: {
            en: 'The pen is taken, so Cook 1 waits for the pen it is holding. That wait never ends.',
            bn: 'কলম নেওয়া, তাই রাঁধুনি ১ নিজের হাতের কলমের জন্যই অপেক্ষা করে। সেই অপেক্ষা কখনো শেষ হবে না।'
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
          plainState: { lockA: { en: 'Cook 1 holds it twice', bn: 'রাঁধুনি ১ দুবার ধরেছে' } },
          title: { en: 'Use a pen that remembers', bn: 'যে কলম মনে রাখে সেটা নিন' },
          simple: {
            en: 'A special pen remembers who holds it and lets that same cook take it again.',
            bn: 'একটা বিশেষ কলম মনে রাখে কে ধরে আছে, আর সেই রাঁধুনিকেই আবার ধরতে দেয়।'
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
      en: 'Two cooks share one whiteboard tally. The marker pen is the lock: a cook may read or change the number only while holding the pen. Everyone else waits.',
      bn: 'দুই রাঁধুনি একটা হোয়াইটবোর্ডের হিসাব ভাগ করে। মার্কার কলমই lock: কলম হাতে থাকলেই কেবল সংখ্যা পড়া বা বদলানো যায়। বাকিরা অপেক্ষা করে।'
    },
    twins: [
      {
        icon: 'thread',
        node: 't1',
        name: { en: 'Cook 1', bn: 'রাঁধুনি ১' },
        d: {
          en: 'Reads the tally, adds one in their head, writes it back.',
          bn: 'হিসাব পড়ে, মনে মনে এক যোগ করে, আবার লিখে রাখে।'
        }
      },
      {
        icon: 'thread',
        node: 't2',
        name: { en: 'Cook 2', bn: 'রাঁধুনি ২' },
        d: {
          en: 'Does the same job at the same time, on the same whiteboard.',
          bn: 'একই সময়ে, একই হোয়াইটবোর্ডে একই কাজ করে।'
        }
      },
      {
        icon: 'memory',
        node: 'counter',
        name: { en: 'The whiteboard tally', bn: 'হোয়াইটবোর্ডের হিসাব' },
        d: {
          en: 'One shared number that both cooks read and change.',
          bn: 'একটাই ভাগ করা সংখ্যা, যেটা দুই রাঁধুনিই পড়ে আর বদলায়।'
        }
      },
      {
        icon: 'lock',
        node: 'lockA',
        name: { en: 'The marker pen', bn: 'মার্কার কলম' },
        d: {
          en: 'Only the cook holding it may read or change the tally. Everyone else waits.',
          bn: 'যার হাতে কলম, শুধু সে-ই হিসাব পড়তে বা বদলাতে পারে। বাকিরা অপেক্ষা করে।'
        }
      },
      {
        icon: 'lock',
        node: 'lockB',
        name: { en: 'The knife', bn: 'ছুরি' },
        d: {
          en: 'A second tool that some jobs need as well as the pen.',
          bn: 'দ্বিতীয় একটা জিনিস, যেটা কলমের পাশাপাশি কিছু কাজে লাগে।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Cook 1 has the pen, Cook 2 the knife', bn: 'রাঁধুনি ১-এর কলম, রাঁধুনি ২-এর ছুরি' },
        is: { en: 'is a deadlock', bn: 'মানে deadlock' },
        d: {
          en: 'Cook 1 holds the pen and wants the knife. Cook 2 holds the knife and wants the pen. Both wait forever. Fix: always take the pen first.',
          bn: 'রাঁধুনি ১-এর হাতে কলম, সে ছুরি চায়। রাঁধুনি ২-এর হাতে ছুরি, সে কলম চায়। দুজনেই চিরকাল অপেক্ষা করে। সমাধান: সবসময় আগে কলম নিন।'
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
        en: '`with lock: counter += 1`. Or use a `queue.Queue`, per-thread counters summed at the end, or `multiprocessing.Value` (only as `with v.get_lock(): v.value += 1`). Across processes, use atomic operations in a database or Redis.',
        bn: '`with lock: counter += 1`। বা `queue.Queue`, প্রতি thread-এর আলাদা counter শেষে যোগ করা, বা `multiprocessing.Value` (শুধু `with v.get_lock(): v.value += 1` হিসেবে)। process-এর মধ্যে database বা Redis-এর atomic operation ব্যবহার করুন।'
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
      code: 'if lock.acquire(timeout=2):\n    try: ...\n    finally: lock.release()\nelse: log("could not get lock")',
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
      code: 'with ExitStack() as st:\n    for lk in sorted((a, b), key=id):\n        st.enter_context(lk)',
      d: {
        en: 'Enforce one global lock order with a fixed rank (here, each lock’s id).',
        bn: 'নির্দিষ্ট ক্রম (এখানে lock-এর id) দিয়ে একটাই global lock order মানুন।'
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
