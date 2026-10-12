import type { Topic } from '../types'
import { UI } from '../ui'

export const multithreadingDeepDive: Topic = {
  slug: 'multithreading-deep-dive',
  line: 'concurrency',
  title: { en: 'Multithreading deep-dive', bn: 'মাল্টিথ্রেডিং গভীরে' },
  summary: {
    en: 'Threads in one process share the heap. A race is a timing bug. A data race is an unsynchronised native write. A pool reuses a few workers, and it can deadlock on itself.',
    bn: 'এক প্রসেসের thread-রা হিপ ভাগ করে। রেস একটা সময়ের বাগ। ডেটা রেস সিঙ্ক ছাড়া নেটিভ লেখা। পুল কয়েকজন worker ফেরত ব্যবহার করে, আর নিজেই আটকে যেতে পারে।'
  },
  hook: {
    en: 'Two cooks can see the same fridge, and a small crew works a rail of tickets instead of hiring a cook per ticket.',
    bn: 'দুই রাঁধুনি একই ফ্রিজ দেখতে পায়, আর ছোট এক ক্রু টিকিটের রেল সামলায়, প্রতি টিকিটে নতুন রাঁধুনি না নিয়ে।'
  },
  story: {
    cast: {
      en: 'Priya and Kamal share one fridge and one marker. A small crew works a rail of tickets.',
      bn: 'প্রিয়া আর কামাল এক ফ্রিজ আর এক মার্কার ভাগ করে। একটা ছোট ক্রু টিকিটের রেল সামলায়।'
    }
  },
  takeaway: {
    en: 'Sharing the fridge is the point and the hazard, and a lock or a queue is what makes an update safe.',
    bn: 'ফ্রিজ ভাগ করাই উদ্দেশ্য আর বিপদ, আর লক বা কিউ-ই একটা আপডেটকে নিরাপদ করে।'
  },
  words: [
    {
      term: { en: 'The fridge (shared heap)', bn: 'ফ্রিজ (shared heap)' },
      d: {
        en: 'Objects both cooks can see and change.',
        bn: 'যে জিনিস দুই রাঁধুনিই দেখে এবং বদলায়।'
      }
    },
    {
      term: { en: 'The marker (lock)', bn: 'মার্কার (lock)' },
      d: {
        en: 'Only the cook holding it may change the note.',
        bn: 'যে ধরে আছে, শুধু সে-ই নোট বদলাতে পারে।'
      }
    },
    {
      term: { en: 'A timing bug (race condition)', bn: 'সময়ের বাগ (race condition)' },
      d: {
        en: 'The answer changes with who goes first.',
        bn: 'কে আগে যায়, তার উপর উত্তর বদলায়।'
      }
    },
    {
      term: { en: 'A native fight (data race)', bn: 'নেটিভ লড়াই (data race)' },
      d: {
        en: 'Outside code, same memory, a write, and no taking of turns.',
        bn: 'বাইরের কোড, একই মেমরি, একটা লেখা, আর পালা নেই।'
      }
    },
    {
      term: { en: 'The crew (pool)', bn: 'ক্রু (pool)' },
      d: {
        en: 'A fixed set of cooks and a rail of tickets.',
        bn: 'নির্দিষ্ট কয়েকজন রাঁধুনি আর টিকিটের একটা রেল।'
      }
    }
  ],
  legend: {
    request: { en: 'Reading or handing a ticket', bn: 'পড়া বা টিকিট দেওয়া' },
    queue: { en: 'Waiting', bn: 'অপেক্ষা' },
    result: { en: 'A safe update', bn: 'একটা নিরাপদ আপডেট' },
    error: { en: 'Stuck or missing', bn: 'আটকে বা হারিয়ে' }
  },
  view: { wide: [1000, 480], narrow: [400, 660] },
  nodeR: { narrow: 20 },
  nodes: {
    a: {
      icon: 'thread',
      name: { en: 'Thread A', bn: 'Thread A' },
      sub: { en: 'Idle', bn: 'ফাঁকা' },
      plain: { name: { en: 'Cook A', bn: 'রাঁধুনি ক' }, sub: { en: 'Priya', bn: 'প্রিয়া' } },
      wide: [170, 130, 'up'],
      narrow: [90, 80, 'up']
    },
    b: {
      icon: 'thread',
      name: { en: 'Thread B', bn: 'Thread B' },
      sub: { en: 'Idle', bn: 'ফাঁকা' },
      plain: { name: { en: 'Cook B', bn: 'রাঁধুনি খ' }, sub: { en: 'Kamal', bn: 'কামাল' } },
      wide: [170, 340, 'down'],
      narrow: [310, 80, 'up']
    },
    heap: {
      icon: 'memory',
      name: { en: 'Shared heap', bn: 'শেয়ার্ড হিপ' },
      sub: { en: 'One object', bn: 'এক অবজেক্ট' },
      plain: { name: { en: 'The fridge', bn: 'ফ্রিজ' }, sub: { en: 'One note', bn: 'এক নোট' } },
      wide: [490, 230, 'up'],
      narrow: [200, 250, 'down']
    },
    lock: {
      icon: 'lock',
      name: { en: 'Lock', bn: 'লক' },
      sub: { en: 'Free', bn: 'খালি' },
      plain: { name: { en: 'The marker', bn: 'মার্কার' }, sub: { en: 'Free', bn: 'খালি' } },
      wide: [830, 130, 'right'],
      narrow: [90, 430, 'down']
    },
    pool: {
      icon: 'queue',
      name: { en: 'Pool', bn: 'পুল' },
      sub: { en: 'No jobs', bn: 'কাজ নেই' },
      plain: { name: { en: 'The crew', bn: 'ক্রু' }, sub: { en: 'No tickets', bn: 'টিকিট নেই' } },
      wide: [830, 340, 'down'],
      narrow: [300, 530, 'down']
    }
  },
  corridors: {
    'a-heap': { wide: [[170, 130], [490, 230]], narrow: [[90, 80], [200, 250]] },
    'b-heap': { wide: [[170, 340], [490, 230]], narrow: [[310, 80], [200, 250]] },
    'a-lock': { wide: [[170, 130], [830, 130]], narrow: [[90, 80], [90, 430]] },
    'lock-heap': { wide: [[830, 130], [490, 230]], narrow: [[90, 430], [200, 250]] },
    'a-pool': {
      wide: [[170, 130], [170, 430], [830, 430], [830, 340]],
      narrow: [[90, 80], [40, 80], [40, 600], [300, 600], [300, 530]]
    }
  },
  edges: {
    'a-heap': { from: 'a', to: 'heap', kind: 'request' },
    'b-heap': { from: 'b', to: 'heap', kind: 'request' },
    'a-lock': { from: 'a', to: 'lock', kind: 'queue' },
    'lock-heap': { from: 'lock', to: 'heap', kind: 'result' },
    'a-pool': { from: 'a', to: 'pool', kind: 'request' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'both-read',
        moves: [
          { edge: 'a-heap', label: 'A', plain: { en: 'A reads', bn: 'ক পড়ে' } },
          { edge: 'b-heap', label: 'B', plain: { en: 'B reads', bn: 'খ পড়ে' } }
        ],
        state: { heap: { en: 'Both reading', bn: 'দুজনেই পড়ছে' }, a: { en: 'Reading', bn: 'পড়ছে' }, b: { en: 'Reading', bn: 'পড়ছে' } },
        plainState: { heap: { en: 'Both reading', bn: 'দুজনেই পড়ছে' }, a: { en: 'Priya reads', bn: 'প্রিয়া পড়ে' }, b: { en: 'Kamal reads', bn: 'কামাল পড়ে' } },
        story: {
          title: { en: 'Both read the same note', bn: 'দুজনেই এক নোট পড়ে' },
          text: {
            en: 'Priya and Kamal both look at the same note on the fridge. That sharing is the point, and it is also the hazard.',
            bn: 'প্রিয়া আর কামাল দুজনেই ফ্রিজের একই নোট দেখে। এই ভাগ করাই উদ্দেশ্য, আর এটাই বিপদ।'
          }
        },
        title: { en: 'Both read the same fridge', bn: 'দুজনেই এক ফ্রিজ পড়ে' },
        simple: {
          en: 'Both cooks read the same note on the fridge at the same moment.',
          bn: 'দুই রাঁধুনি একই মুহূর্তে ফ্রিজের একই নোট পড়ে।'
        },
        tech: {
          en: 'Threads in one process share the heap. That is the point and the hazard. Separate processes do not share it. The phase 2 page already shows the fridge against the copied slip.',
          bn: 'এক প্রসেসের thread-রা হিপ ভাগ করে। এটাই উদ্দেশ্য আর বিপদ। আলাদা প্রসেস এটা ভাগ করে না। দ্বিতীয় ধাপের পাতায় ফ্রিজ বনাম কপি করা স্লিপ আগেই আছে।'
        }
      },
      {
        id: 'race',
        work: { node: 'heap', kind: 'request' },
        state: { heap: { en: 'Timing decides', bn: 'সময় ঠিক করে' } },
        plainState: { heap: { en: 'Who writes last', bn: 'কে শেষে লেখে' } },
        story: {
          title: { en: 'The last write wins', bn: 'শেষ লেখাই জেতে' },
          text: {
            en: 'The note ends as whoever wrote last left it. The locks page already plays the lost tally. This stop only names the bug.',
            bn: 'নোট শেষ হয় যেমন শেষ লেখক রেখে গেছে। লকের পাতায় হারানো হিসাব আগেই আছে। এই স্টপ শুধু বাগটির নাম বলে।'
          }
        },
        title: { en: 'The result depends on who writes last', bn: 'কে শেষে লেখে, ফল তার উপর' },
        simple: {
          en: 'Whose write lands last changes the note. The locks page shows the lost tally.',
          bn: 'কার লেখা শেষে পড়ে, নোট তাতে বদলায়। লকের পাতায় হারানো হিসাব দেখানো আছে।'
        },
        tech: {
          en: 'A race condition is an outcome that changes with timing. `x += 1` is several bytecode instructions and is not atomic. The GIL does not make that update safe.',
          bn: 'রেস কন্ডিশন এমন ফল যা সময়ের সাথে বদলায়। `x += 1` কয়েকটা bytecode নির্দেশ, আর সেটা অ্যাটমিক নয়। GIL সেই আপডেটকে নিরাপদ করে না।'
        }
      },
      {
        id: 'data-race',
        work: { node: 'heap', kind: 'queue' },
        state: { heap: { en: 'Native claim', bn: 'নেটিভ দাবি' } },
        plainState: { heap: { en: 'A stronger claim', bn: 'আরও কড়া দাবি' } },
        story: {
          title: { en: 'A stronger kind of fight', bn: 'আরও কড়া এক লড়াই' },
          text: {
            en: 'A timing bug in the recipe is one thing. A fight inside outside code, over the same memory, is a stronger claim and a different word.',
            bn: 'রেসিপির সময়ের বাগ এক জিনিস। বাইরের কোডের ভেতর একই মেমরি নিয়ে লড়াই আরও কড়া দাবি, আর আলাদা নাম।'
          }
        },
        title: { en: 'A data race is a stronger claim', bn: 'ডেটা রেস আরও কড়া দাবি' },
        simple: {
          en: 'A data race is outside code touching the same memory, with a write and no taking of turns.',
          bn: 'ডেটা রেস বাইরের কোডের একই মেমরি ছোঁয়া, একটা লেখা সহ, পালা ছাড়া।'
        },
        tech: {
          en: 'The glossary data race is several threads, the same memory, at least one write, and no synchronisation. It happens in native code, which a Python API may expose. A pure-Python timing bug is still a race condition. The names are not synonyms.',
          bn: 'গ্লসারির ডেটা রেস হলো কয়েকটা thread, একই মেমরি, অন্তত একটা লেখা, আর সিঙ্ক নেই। এটা হয় নেটিভ কোডে, যা একটা Python API বের করে দিতে পারে। খাঁটি Python-এর সময়ের বাগ তবু রেস কন্ডিশন। নাম দুটো সমার্থক নয়।'
        }
      },
      {
        id: 'acquire',
        moves: [{ edge: 'a-lock', label: 'lock', plain: { en: 'Priya takes it', bn: 'প্রিয়া নেয়' } }],
        state: { lock: { en: 'A holds it', bn: 'A ধরে আছে' }, b: { en: 'B waits', bn: 'B অপেক্ষা' } },
        plainState: { lock: { en: 'Priya holds it', bn: 'প্রিয়া ধরে' }, b: { en: 'Kamal waits', bn: 'কামাল অপেক্ষা' } },
        story: {
          title: { en: 'Priya takes the marker', bn: 'প্রিয়া মার্কার নেয়' },
          text: {
            en: 'Priya takes the marker. Kamal waits. While she holds it, he does not change the note.',
            bn: 'প্রিয়া মার্কার নেয়। কামাল অপেক্ষা করে। সে ধরে থাকলে কামাল নোট বদলায় না।'
          }
        },
        title: { en: 'Priya takes the marker', bn: 'প্রিয়া মার্কার নেয়' },
        simple: {
          en: 'Priya takes the marker. Kamal waits until she lets it go.',
          bn: 'প্রিয়া মার্কার নেয়। কামাল অপেক্ষা করে, যতক্ষণ না সে ছেড়ে দেয়।'
        },
        tech: {
          en: 'A `Lock` is not owned, so any thread may release it. An `RLock` is owned by the thread that took it, and that same thread may take it again. Two locks in opposite order is the deadlock on the locks page.',
          bn: '`Lock` কারো মালিকানাধীন নয়, তাই যেকোনো thread ছেড়ে দিতে পারে। `RLock` যে thread নিয়েছে তার মালিকানাধীন, আর সেই thread আবার নিতে পারে। উল্টো ক্রমে দুই লক হলো লকের পাতার ডেডলক।'
        }
      },
      {
        id: 'update',
        moves: [{ edge: 'lock-heap', label: 'update', plain: { en: 'Priya writes', bn: 'প্রিয়া লেখে' } }],
        state: { heap: { en: 'A wrote', bn: 'A লিখেছে' }, lock: { en: 'Released', bn: 'ছাড়া' } },
        plainState: { heap: { en: 'Priya wrote', bn: 'প্রিয়া লিখেছে' }, lock: { en: 'Marker free', bn: 'মার্কার খালি' } },
        story: {
          title: { en: 'Only Priya writes', bn: 'শুধু প্রিয়া লেখে' },
          text: {
            en: 'Only Priya changes the note, then she puts the marker back. Kamal’s later read sees the finished note.',
            bn: 'শুধু প্রিয়া নোট বদলায়, তারপর মার্কার ফিরিয়ে রাখে। কামালের পরের পড়া শেষ নোটটাই দেখে।'
          }
        },
        title: { en: 'Only Priya updates, then lets go', bn: 'শুধু প্রিয়া বদলায়, তারপর ছাড়ে' },
        simple: {
          en: 'Only the cook with the marker updates the note, then lets the marker go.',
          bn: 'মার্কার যার হাতে, শুধু সে নোট বদলায়, তারপর মার্কার ছেড়ে দেয়।'
        },
        tech: {
          en: 'The lock orders this update before the next thread’s read. Without it, the other thread can see a half-changed object. On a free-threaded build, `dict` and `list` use per-object locks, and a lock-free read can still see an in-between state.',
          bn: 'লক এই আপডেটকে পরের thread-এর পড়ার আগে সাজায়। এটা ছাড়া অন্য thread আধ-বদলানো অবজেক্ট দেখতে পারে। free-threaded বিল্ডে `dict` আর `list` প্রতি-অবজেক্ট লক ব্যবহার করে, আর লক-ফ্রি পড়া তবু মাঝের অবস্থা দেখতে পারে।'
        }
      },
      {
        id: 'submit',
        moves: [{ edge: 'a-pool', label: 'job', plain: { en: 'A ticket', bn: 'এক টিকিট' } }],
        state: { pool: { en: 'Job queued', bn: 'কাজ সারিতে' } },
        plainState: { pool: { en: 'Ticket on the rail', bn: 'রেলে টিকিট' } },
        story: {
          title: { en: 'Tickets on a rail', bn: 'রেলে টিকিট' },
          text: {
            en: 'Instead of hiring a new cook for every ticket, a small crew takes the next ticket off the rail.',
            bn: 'প্রতি টিকিটে নতুন রাঁধুনি না নিয়ে, ছোট এক ক্রু রেল থেকে পরের টিকিট নেয়।'
          }
        },
        title: { en: 'A crew takes tickets from a rail', bn: 'এক ক্রু রেল থেকে টিকিট নেয়' },
        simple: {
          en: 'A fixed crew and a rail of tickets, instead of a new cook for every ticket.',
          bn: 'নির্দিষ্ট এক ক্রু আর টিকিটের রেল, প্রতি টিকিটে নতুন রাঁধুনি নয়।'
        },
        tech: {
          en: 'Since 3.13, `ThreadPoolExecutor` defaults to `min(32, (os.process_cpu_count() or 1) + 4)`. It reuses idle workers. The pool joins them before the interpreter exits, so do not park a long task there. `queue.Queue` is the safe handoff if you build the crew yourself.',
          bn: '3.13 থেকে `ThreadPoolExecutor`-এর ডিফল্ট `min(32, (os.process_cpu_count() or 1) + 4)`। এটা ফাঁকা worker ফেরত ব্যবহার করে। ইন্টারপ্রেটার বেরোনোর আগে পুল তাদের join করে, তাই লম্বা কাজ সেখানে রেখে দেবেন না। নিজে ক্রু বানালে `queue.Queue` নিরাপদ হাতবদল।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'deadlock',
      label: { en: 'The crew waits on itself', bn: 'ক্রু নিজের জন্য অপেক্ষা' },
      branchAfter: 'submit',
      whatIf: {
        en: 'What if a cook waits on a ticket from the same crew?',
        bn: 'এক রাঁধুনি যদি একই ক্রুর টিকিটের জন্য অপেক্ষা করে?'
      },
      steps: [
        {
          id: 'waits-on-crew',
          work: { node: 'pool', kind: 'queue' },
          state: { pool: { en: 'Worker blocked', bn: 'worker আটকে' } },
          plainState: { pool: { en: 'Cook waits on the crew', bn: 'রাঁধুনি ক্রুর অপেক্ষায়' } },
          story: {
            title: { en: 'A cook waits on the crew', bn: 'রাঁধুনি ক্রুর অপেক্ষায়' },
            text: {
              en: 'Priya is the only cook on duty, and her ticket needs another cook from this same crew. Nobody is free.',
              bn: 'প্রিয়া একা ডিউটিতে, আর তার টিকিটে এই একই ক্রুর আরেক রাঁধুনি লাগে। কেউ ফাঁকা নেই।'
            }
          },
          title: { en: 'A cook waits on the same crew', bn: 'এক রাঁধুনি একই ক্রুর অপেক্ষায়' },
          simple: {
            en: 'One cook waits for a ticket that only a free cook from this same crew can run.',
            bn: 'এক রাঁধুনি এমন টিকিটের অপেক্ষায়, যা এই একই ক্রুর একজন ফাঁকা রাঁধুনিই চালাতে পারে।'
          },
          tech: {
            en: 'The docs show a deadlock with `max_workers` of 1: the only worker waits on a future that needs another worker from that same pool. Two workers can also each wait on the other.',
            bn: 'ডক্স ডেডলক দেখায় `max_workers` ১ হলে: একমাত্র worker এমন future-এর অপেক্ষায় থাকে যাতে সেই পুলের আরেক worker লাগে। দুই worker একে অপরের জন্যও অপেক্ষা করতে পারে।'
          }
        },
        {
          id: 'stuck',
          work: { node: 'pool', kind: 'error' },
          state: { pool: { en: 'Deadlocked', bn: 'ডেডলক' } },
          plainState: { pool: { en: 'Nobody is free', bn: 'কেউ ফাঁকা নেই' } },
          story: {
            title: { en: 'Nobody is free to cook', bn: 'রান্নায় কেউ ফাঁকা নেই' },
            text: {
              en: 'Every cook is waiting. The ticket they are waiting on never starts, because no cook is free to take it.',
              bn: 'প্রতিটি রাঁধুনি অপেক্ষা করছে। যে টিকিটের জন্য তারা অপেক্ষা করে সেটা শুরু হয় না, কারণ কেউ ফাঁকা নেই।'
            }
          },
          title: { en: 'The crew never finishes', bn: 'ক্রু কখনো শেষ করে না' },
          simple: {
            en: 'Every cook is waiting, and no cook is free to run the ticket they are waiting on.',
            bn: 'প্রতিটি রাঁধুনি অপেক্ষা করছে, আর যে টিকিটের জন্য অপেক্ষা, সেটা চালানোর মতো কেউ ফাঁকা নেই।'
          },
          tech: {
            en: 'The pool cannot make progress. A worker must not wait on work that needs a free worker from the same pool.',
            bn: 'পুল এগোতে পারে না। এক worker এমন কাজের অপেক্ষা করবে না, যাতে একই পুলের একজন ফাঁকা worker লাগে।'
          }
        }
      ]
    },
    {
      id: 'lbyl',
      label: { en: 'The note vanishes', bn: 'নোট উধাও' },
      branchAfter: 'both-read',
      whatIf: {
        en: 'What if Kamal removes the note between the check and the read?',
        bn: 'চেক আর পড়ার মাঝে কামাল যদি নোট সরিয়ে ফেলে?'
      },
      steps: [
        {
          id: 'check',
          work: { node: 'heap', kind: 'queue' },
          state: { heap: { en: 'Key seen', bn: 'কী দেখা' }, b: { en: 'Deleting', bn: 'মুছছে' } },
          plainState: { heap: { en: 'Priya saw it', bn: 'প্রিয়া দেখেছে' }, b: { en: 'Kamal removes it', bn: 'কামাল সরায়' } },
          story: {
            title: { en: 'Priya checks, Kamal removes', bn: 'প্রিয়া দেখে, কামাল সরায়' },
            text: {
              en: 'Priya sees the note is there. Before she reads it back, Kamal takes it off the fridge.',
              bn: 'প্রিয়া দেখে নোট আছে। সে আবার পড়ার আগে কামাল সেটা ফ্রিজ থেকে সরিয়ে নেয়।'
            }
          },
          title: { en: 'Priya checks, then Kamal removes it', bn: 'প্রিয়া দেখে, তারপর কামাল সরায়' },
          simple: {
            en: 'Priya sees the note, and Kamal removes it before she reads it back.',
            bn: 'প্রিয়া নোট দেখে, আর সে আবার পড়ার আগে কামাল সেটা সরিয়ে নেয়।'
          },
          tech: {
            en: 'The glossary example is `if key in mapping: return mapping[key]`. Another thread can delete the key between the check and the read.',
            bn: 'গ্লসারির উদাহরণ `if key in mapping: return mapping[key]`। চেক আর পড়ার মাঝে অন্য thread কী মুছে দিতে পারে।'
          }
        },
        {
          id: 'missing',
          work: { node: 'heap', kind: 'error' },
          state: { heap: { en: 'Key missing', bn: 'কী নেই' } },
          plainState: { heap: { en: 'The note is gone', bn: 'নোট নেই' } },
          story: {
            title: { en: 'The second look fails', bn: 'দ্বিতীয় দেখা ব্যর্থ' },
            text: {
              en: 'Priya reaches for the note and it is gone. Seeing it and reading it were not one action.',
              bn: 'প্রিয়া নোটের জন্য হাত বাড়ায় আর সেটা নেই। দেখা আর পড়া এক কাজ ছিল না।'
            }
          },
          title: { en: 'The note is already gone', bn: 'নোট আগেই নেই' },
          simple: {
            en: 'The second look fails. Seeing the note and reading it were not one action.',
            bn: 'দ্বিতীয় দেখা ব্যর্থ। নোট দেখা আর পড়া এক কাজ ছিল না।'
          },
          tech: {
            en: 'Hold a lock across both steps, or try the read and handle the miss. Do not check first and then assume the key is still there.',
            bn: 'দুই ধাপ জুড়ে একটা লক ধরুন, অথবা পড়া চেষ্টা করে মিস সামলান। আগে চেক করে তারপর ধরে নেবেন না যে কী এখনো আছে।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'One fridge, two cooks, one marker. The crew is a fixed team and a rail of tickets, not a new cook for every ticket.',
      bn: 'এক ফ্রিজ, দুই রাঁধুনি, এক মার্কার। ক্রু একটা নির্দিষ্ট দল আর টিকিটের রেল, প্রতি টিকিটে নতুন রাঁধুনি নয়।'
    },
    twins: [
      {
        icon: 'thread',
        node: 'a',
        name: { en: 'Cook A', bn: 'রাঁধুনি ক' },
        d: { en: 'Priya. She reads the fridge, takes the marker, and hands tickets to the crew.', bn: 'প্রিয়া। সে ফ্রিজ পড়ে, মার্কার নেয়, আর ক্রুকে টিকিট দেয়।' }
      },
      {
        icon: 'thread',
        node: 'b',
        name: { en: 'Cook B', bn: 'রাঁধুনি খ' },
        d: { en: 'Kamal. He sees the same fridge, and he waits while Priya holds the marker.', bn: 'কামাল। সে একই ফ্রিজ দেখে, আর প্রিয়া মার্কার ধরে থাকলে অপেক্ষা করে।' }
      },
      {
        icon: 'memory',
        node: 'heap',
        name: { en: 'The fridge', bn: 'ফ্রিজ' },
        d: { en: 'The shared note. Both cooks can see it, which is the point and the hazard.', bn: 'ভাগ করা নোট। দুই রাঁধুনিই দেখে, এটাই উদ্দেশ্য আর বিপদ।' }
      },
      {
        icon: 'lock',
        node: 'lock',
        name: { en: 'The marker', bn: 'মার্কার' },
        d: { en: 'One cook updates while holding it. Then they put it back.', bn: 'এক রাঁধুনি ধরে রেখে বদলায়। তারপর ফিরিয়ে রাখে।' }
      },
      {
        icon: 'queue',
        node: 'pool',
        name: { en: 'The crew', bn: 'ক্রু' },
        d: { en: 'A few cooks and a rail of tickets. They can all end up waiting on each other.', bn: 'কয়েকজন রাঁধুনি আর টিকিটের রেল। সবাই একে অপরের অপেক্ষায় পড়তে পারে।' }
      },
      {
        icon: 'user',
        node: null,
        name: { en: 'One cook', bn: 'এক রাঁধুনি' },
        is: { en: 'is the threading page', bn: 'মানে থ্রেডিংয়ের পাতা' },
        d: { en: 'A single shift, from the contract to the pass. This page adds the second cook.', bn: 'একটা শিফট, চুক্তি থেকে পাস পর্যন্ত। এই পাতা দ্বিতীয় রাঁধুনিকে যোগ করে।' }
      }
    ]
  },
  qa: [
    {
      q: { en: 'Does the GIL make Python threads safe?', bn: 'GIL কি Python thread-কে নিরাপদ করে?' },
      short: { en: 'It protects the interpreter, not your own updates.', bn: 'এটা ইন্টারপ্রেটারকে বাঁচায়, আপনার নিজের আপডেটকে নয়।' },
      deep: {
        en: '`x += 1` is not one bytecode instruction, so it is not atomic. The GIL does not make that update safe. You still need a lock, a queue, or no sharing. The locks page shows the lost tally.',
        bn: '`x += 1` একটা bytecode নির্দেশ নয়, তাই সেটা অ্যাটমিক নয়। GIL সেই আপডেটকে নিরাপদ করে না। তবু লক, কিউ, অথবা না-ভাগা দরকার। লকের পাতায় হারানো হিসাব আছে।'
      },
      redFlag: { en: '“The GIL means I can skip locks.”', bn: '“GIL মানে লক বাদ দিতে পারি।”' }
    },
    {
      q: { en: 'What is a race condition versus a data race?', bn: 'রেস কন্ডিশন আর ডেটা রেসের পার্থক্য কী?' },
      short: { en: 'A race condition is a timing bug. A data race is an unsynchronised native write.', bn: 'রেস কন্ডিশন সময়ের বাগ। ডেটা রেস সিঙ্ক ছাড়া নেটিভ লেখা।' },
      deep: {
        en: 'Pure Python can have a race condition without a data race, because the GIL serialises bytecode. A data race is several threads, the same memory, at least one write, and no synchronisation, and it happens in native code. The glossary draws that line. The two names are not synonyms.',
        bn: 'খাঁটি Python-এ ডেটা রেস ছাড়াই রেস কন্ডিশন হতে পারে, কারণ GIL bytecode সিরিয়াল করে। ডেটা রেস হলো কয়েকটা thread, একই মেমরি, অন্তত একটা লেখা, সিঙ্ক নেই, আর সেটা নেটিভ কোডে। গ্লসারি এই রেখা টানে। নাম দুটো সমার্থক নয়।'
      },
      redFlag: { en: '“They are synonyms.”', bn: '“দুটো সমার্থক।”' }
    },
    {
      q: { en: 'What is the default thread-pool size?', bn: 'ডিফল্ট thread-পুলের আকার কত?' },
      short: { en: 'Since 3.13, the smaller of 32 and the process CPU count plus 4.', bn: '3.13 থেকে, ৩২ আর প্রসেস CPU সংখ্যা যোগ ৪-এর ছোটটা।' },
      deep: {
        en: 'The 3.13 default is `min(32, (os.process_cpu_count() or 1) + 4)`. In 3.8 it was `min(32, os.cpu_count() + 4)`. In 3.5 it was five times the CPU count. The pool reuses idle workers and joins them before the interpreter exits. Do not park a server loop in it. The docs’ deadlock is a worker waiting on its own pool.',
        bn: '3.13-এর ডিফল্ট `min(32, (os.process_cpu_count() or 1) + 4)`। 3.8-এ ছিল `min(32, os.cpu_count() + 4)`। 3.5-এ ছিল CPU সংখ্যার পাঁচ গুণ। পুল ফাঁকা worker ফেরত ব্যবহার করে এবং ইন্টারপ্রেটার বেরোনোর আগে তাদের join করে। সার্ভার লুপ সেখানে রেখে দেবেন না। ডক্সের ডেডলক হলো এক worker নিজের পুলের অপেক্ষায়।'
      },
      redFlag: { en: '“It starts one thread per core, or one thread per task.”', bn: '“এটা প্রতি কোরে এক thread, বা প্রতি কাজে এক thread চালায়।”' }
    },
    {
      q: { en: 'What changes on a free-threaded build?', bn: 'free-threaded বিল্ডে কী বদলায়?' },
      short: { en: 'Several threads can run bytecode at once. Sharing still needs a plan.', bn: 'কয়েকটা thread একসাথে bytecode চালাতে পারে। ভাগ করতে তবু পরিকল্পনা লাগে।' },
      deep: {
        en: '`dict` and `list` use per-object locks, and a lock-free read can still see a half-updated container. The GIL build stays the default through 3.14. Free-threading does not remove the need for a lock around your own multi-step update.',
        bn: '`dict` আর `list` প্রতি-অবজেক্ট লক ব্যবহার করে, আর লক-ফ্রি পড়া তবু আধ-আপডেট হওয়া কন্টেইনার দেখতে পারে। GIL বিল্ড 3.14 পর্যন্ত ডিফল্ট থাকে। free-threading আপনার নিজের বহু-ধাপ আপডেটের লকের দরকার ঘোচায় না।'
      },
      redFlag: { en: '“Free-threading removes the need for locks.”', bn: '“Free-threading লকের দরকার ঘোচায়।”' }
    },
    {
      q: { en: 'Can two correct updates still slow each other down?', bn: 'দুই সঠিক আপডেট কি তবু একে অপরকে ধীর করতে পারে?' },
      short: { en: 'Yes. Writes that do not overlap can still bump on one shared line of cache.', bn: 'হ্যাঁ। না-মেশা লেখাও ক্যাশের এক ভাগ করা লাইনে ধাক্কা খেতে পারে।' },
      deep: {
        en: 'False sharing: two threads update different counters that sit on the same cache line, so each write makes the other core refresh that line. The result is correct, and it is still slow. Do not quote a line size from memory. This is not a race.',
        bn: 'ফলস শেয়ারিং: দুই thread আলাদা কাউন্টার বদলায় যেগুলো একই ক্যাশ লাইনে বসে, তাই প্রতিটা লেখা অন্য কোরকে সেই লাইন ফেরত আনতে বাধ্য করে। ফল সঠিক, তবু ধীর। মনে রাখা লাইনের আকার বলবেন না। এটা রেস নয়।'
      },
      redFlag: { en: '“Different variables never slow each other down.”', bn: '“আলাদা ভ্যারিয়েবল কখনো একে অপরকে ধীর করে না।”' }
    }
  ],
  cheats: [
    {
      code: 'tally += 1  # several bytecode steps, not atomic',
      d: { en: 'The GIL does not make this one update. Take a lock, or do not share the tally.', bn: 'GIL এটাকে এক আপডেট করে না। লক নিন, অথবা হিসাব ভাগ করবেন না।' }
    },
    {
      code: 'with lock:\n    tally += 1',
      d: { en: 'The read and the write stay together. A Lock may be released by any thread. An RLock may be taken again by its owner.', bn: 'পড়া আর লেখা একসাথে থাকে। Lock যেকোনো thread ছেড়ে দিতে পারে। RLock মালিক আবার নিতে পারে।' }
    },
    {
      code: 'ThreadPoolExecutor()  # 3.13: min(32, (os.process_cpu_count() or 1) + 4)',
      d: { en: 'The default crew. Idle workers are reused, and they are joined before exit.', bn: 'ডিফল্ট ক্রু। ফাঁকা worker ফেরত ব্যবহার হয়, আর বেরোনোর আগে তাদের join করা হয়।' }
    },
    {
      code: 'executor = ThreadPoolExecutor(max_workers=1)\nexecutor.submit(wait_on_future)  # the only worker waits on the same pool',
      d: { en: 'The docs’ deadlock. The worker calls result on a future that needs a free worker.', bn: 'ডক্সের ডেডলক। worker এমন future-এর result ডাকে যাতে একজন ফাঁকা worker লাগে।' }
    },
    {
      code: 'if key in mapping:       # the key can vanish here\n    return mapping[key]',
      d: { en: 'The glossary’s check-then-read race. Lock both steps, or try the read and handle the miss.', bn: 'গ্লসারির চেক-তারপর-পড়ার রেস। দুই ধাপ লক করুন, অথবা পড়া চেষ্টা করে মিস সামলান।' }
    }
  ],
  sources: [
    { label: 'Python glossary: race condition and data race', url: 'https://docs.python.org/3/glossary.html' },
    { label: 'ThreadPoolExecutor', url: 'https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor' },
    { label: 'threading.Lock and RLock', url: 'https://docs.python.org/3/library/threading.html' },
    { label: 'queue — thread-safe handoff', url: 'https://docs.python.org/3/library/queue.html' }
  ],
  film: {
    src: '/learn/multithreading-deep-dive.mp4',
    note: {
      en: 'A worker that waits on a future from the same pool can deadlock, including when max_workers is 1. if key in mapping then mapping[key] can miss, because another thread can delete the key between the check and the read.',
      bn: 'একই পুলের future-এর জন্য অপেক্ষা করা worker ডেডলক করতে পারে, max_workers 1 হলেও। if key in mapping তারপর mapping[key] মিস করতে পারে, কারণ চেক আর পড়ার মাঝে অন্য thread কী মুছে দিতে পারে।'
    }
  }
}
