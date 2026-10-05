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
  hook: {
    en: 'Python lets only one cook use the stove at a time, so hiring more cooks does not always make dinner faster.',
    bn: 'পাইথনে একসময়ে একজন রাঁধুনিই স্টোভ ব্যবহার করতে পারে, তাই বেশি রাঁধুনি নিলেই রান্না সবসময় দ্রুত হয় না।'
  },
  takeaway: {
    en: 'Only the cook wearing the hat can cook. Waiting at the door or using a rice cooker frees the hat.',
    bn: 'যার মাথায় টুপি, শুধু সে-ই রাঁধতে পারে। দরজায় অপেক্ষা বা রাইস কুকার ব্যবহার করলে টুপি খালি হয়।'
  },
  words: [
    {
      term: { en: 'Cook (thread)', bn: 'রাঁধুনি (thread)' },
      d: {
        en: 'One strand of work inside a program. Here, one cook.',
        bn: 'প্রোগ্রামের ভেতরের একটা কাজের ধারা। এখানে, একজন রাঁধুনি।'
      }
    },
    {
      term: { en: 'Burner (CPU core)', bn: 'চুলা (CPU core)' },
      d: {
        en: 'The part of a computer that does the work. Two burners can cook at once.',
        bn: 'কম্পিউটারের যে অংশ কাজ করে। দুটো চুলায় একসাথে রান্না হয়।'
      }
    },
    {
      term: { en: 'Stove (interpreter)', bn: 'স্টোভ (interpreter)' },
      d: {
        en: 'The program that reads and runs Python code. Cooks work on it.',
        bn: 'যে প্রোগ্রাম Python কোড পড়ে আর চালায়। রাঁধুনিরা এতে রাঁধে।'
      }
    },
    {
      term: { en: 'Chef’s hat (GIL)', bn: 'শেফের টুপি (GIL)' },
      d: {
        en: 'Python’s rule: only the cook wearing the one hat may cook.',
        bn: 'Python-এর নিয়ম: একমাত্র টুপিটা যে পরে আছে, শুধু সে-ই রাঁধতে পারে।'
      }
    },
    {
      term: { en: 'Rice cooker (C extension)', bn: 'রাইস কুকার (C extension)' },
      d: {
        en: 'Fast add-on code that cooks on its own, without needing the hat.',
        bn: 'দ্রুত অ্যাড-অন কোড, যে নিজে নিজে রাঁধে, টুপি লাগে না।'
      }
    },
    {
      term: { en: 'Delivery door (network)', bn: 'ডেলিভারির দরজা (network)' },
      d: {
        en: 'Where a cook waits for something from outside, like data from the internet.',
        bn: 'যেখানে রাঁধুনি বাইরের কিছুর জন্য অপেক্ষা করে, যেমন ইন্টারনেটের data।'
      }
    }
  ],
  legend: {
    request: { en: 'Cooking', bn: 'রান্না' },
    queue: { en: 'Waiting or asking', bn: 'অপেক্ষা বা চাওয়া' },
    result: { en: 'Handed over', bn: 'হাতবদল' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 980, 460 ], narrow: [ 400, 560 ] },
  nodes: {
    t1: {
      icon: 'thread',
      name: { en: 'Thread 1', bn: 'Thread ১' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      plain: {
        name: { en: 'Cook 1', bn: 'রাঁধুনি ১' },
        sub: { en: 'Ready to cook', bn: 'রাঁধতে তৈরি' }
      },
      wide: [ 280, 150, 'left' ],
      narrow: [ 70, 140, 'up' ]
    },
    t2: {
      icon: 'thread',
      name: { en: 'Thread 2', bn: 'Thread ২' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      plain: {
        name: { en: 'Cook 2', bn: 'রাঁধুনি ২' },
        sub: { en: 'Ready to cook', bn: 'রাঁধতে তৈরি' }
      },
      wide: [ 280, 380, 'left' ],
      narrow: [ 330, 140, 'up' ]
    },
    gil: {
      icon: 'lock',
      name: { en: 'The GIL', bn: 'GIL' },
      sub: { en: 'Free', bn: 'খালি' },
      plain: {
        name: { en: 'The chef’s hat', bn: 'শেফের টুপি' },
        sub: { en: 'On the hook', bn: 'হুকে ঝুলছে' }
      },
      wide: [ 280, 265, 'left' ],
      narrow: [ 200, 140, 'up' ]
    },
    interp: {
      icon: 'code',
      name: { en: 'Interpreter', bn: 'Interpreter' },
      sub: { en: 'Runs bytecode', bn: 'bytecode চালায়' },
      plain: {
        name: { en: 'The stove', bn: 'স্টোভ' },
        sub: { en: 'Where cooking happens', bn: 'যেখানে রান্না হয়' }
      },
      wide: [ 640, 265, 'down' ],
      narrow: [ 200, 270, 'down' ]
    },
    io: {
      icon: 'cloud',
      name: { en: 'Network / disk', bn: 'Network / disk' },
      sub: { en: 'Outside world', bn: 'বাইরের জগৎ' },
      plain: {
        name: { en: 'Delivery door', bn: 'ডেলিভারির দরজা' },
        sub: { en: 'Where parcels arrive', bn: 'যেখানে পার্সেল আসে' }
      },
      wide: [ 860, 380, 'down' ],
      narrow: [ 330, 470, 'down' ]
    },
    cext: {
      icon: 'box',
      name: { en: 'C extension', bn: 'C extension' },
      sub: { en: 'hashlib, NumPy', bn: 'hashlib, NumPy' },
      plain: {
        name: { en: 'Rice cooker', bn: 'রাইস কুকার' },
        sub: { en: 'Cooks without the hat', bn: 'টুপি ছাড়াই রাঁধে' }
      },
      wide: [ 680, 80, 'down' ],
      narrow: [ 70, 340, 'down' ]
    }
  },
  groups: [
    {
      id: 'proc',
      label: { en: 'One CPython process', bn: 'একটা CPython process' },
      plain: { en: 'One Python kitchen', bn: 'একটা Python রান্নাঘর' },
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
        moves: [ { edge: 'gil-t1', label: 'GIL', plain: { en: 'Chef’s hat', bn: 'শেফের টুপি' } } ],
        state: {
          gil: { en: 'Held by T1', bn: 'T1 ধরে আছে' },
          t1: { en: 'Has the GIL', bn: 'GIL আছে' }
        },
        plainState: {
          gil: { en: 'Cook 1 wears it', bn: 'রাঁধুনি ১ পরে আছে' },
          t1: { en: 'Has the hat', bn: 'টুপি আছে' }
        },
        title: { en: 'Cook 1 puts on the hat', bn: 'রাঁধুনি ১ টুপি পরে' },
        simple: {
          en: 'Python’s kitchen has one stove and one chef’s hat. Only the cook wearing the hat may cook. Cook 1 puts it on.',
          bn: 'Python-এর রান্নাঘরে একটাই স্টোভ আর একটাই শেফের টুপি। যে রাঁধুনির মাথায় টুপি, শুধু সে-ই রাঁধতে পারে। রাঁধুনি ১ টুপিটা পরে।'
        },
        tech: {
          en: 'A thread must hold the GIL to run Python bytecode. Only one thread can hold it at a time.',
          bn: 'Python bytecode চালাতে হলে thread-কে GIL ধরতে হয়। একসময়ে একটা thread-ই সেটা ধরতে পারে।'
        }
      },
      {
        id: 't1-runs',
        moves: [ { edge: 't1-interp', label: 'bytecode', plain: { en: 'Cooking steps', bn: 'রান্নার ধাপ' } } ],
        state: {
          t1: { en: 'Running', bn: 'চলছে' },
          interp: { en: 'Running T1', bn: 'T1 চলছে' }
        },
        plainState: {
          t1: { en: 'Cooking', bn: 'রাঁধছে' },
          interp: { en: 'Cook 1 cooking', bn: 'রাঁধুনি ১ রাঁধছে' }
        },
        title: { en: 'Cook 1 cooks on the stove', bn: 'রাঁধুনি ১ স্টোভে রাঁধে' },
        simple: {
          en: 'Wearing the hat, Cook 1 starts cooking on the stove.',
          bn: 'টুপি পরে রাঁধুনি ১ স্টোভে রান্না শুরু করে।'
        },
        tech: {
          en: 'The eval loop executes T1’s bytecode. The GIL protects interpreter internals such as reference counts and built-in containers.',
          bn: 'eval loop T1-এর bytecode চালায়। GIL interpreter-এর ভেতরের জিনিস বাঁচায়, যেমন reference count আর built-in container।'
        }
      },
      {
        id: 't2-waits',
        moves: [ { edge: 't2-gil', label: 'wants it', plain: { en: 'Wants it', bn: 'চায়' } } ],
        state: { t2: { en: 'Waiting', bn: 'অপেক্ষায়' } },
        title: { en: 'Cook 2 has to wait', bn: 'রাঁধুনি ২-কে অপেক্ষা করতে হয়' },
        simple: {
          en: 'Cook 2 wants to cook too, but the hat is taken. Cook 2 has to stand and wait.',
          bn: 'রাঁধুনি ২-ও রাঁধতে চায়, কিন্তু টুপি অন্যজনের মাথায়। তাকে দাঁড়িয়ে অপেক্ষা করতে হয়।'
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
        plainState: { gil: { en: 'Cook 2 asked', bn: 'রাঁধুনি ২ চেয়েছে' } },
        title: { en: 'Cook 2 asks for the hat', bn: 'রাঁধুনি ২ টুপি চায়' },
        simple: {
          en: 'After a short wait, Cook 2 politely asks for the hat.',
          bn: 'একটু অপেক্ষার পর রাঁধুনি ২ ভদ্রভাবে টুপিটা চায়।'
        },
        tech: {
          en: 'After the switch interval (default 5 ms) a waiter sets a drop request. The holder yields at its next check between bytecodes, so the timing is advisory.',
          bn: 'switch interval (ডিফল্ট ৫ ms) পরে অপেক্ষারত thread একটা drop request দেয়। holder bytecode-এর মাঝের পরের check-এ ছাড়ে, তাই সময়টা আনুমানিক।'
        }
      },
      {
        id: 't1-releases',
        moves: [ { edge: 't1-gil', label: 'release', plain: { en: 'Hat back', bn: 'টুপি ফেরত' } } ],
        state: {
          gil: { en: 'Free', bn: 'খালি' },
          t1: { en: 'Waiting', bn: 'অপেক্ষায়' },
          interp: { en: 'Paused', bn: 'থেমে আছে' }
        },
        plainState: {
          gil: { en: 'On the hook', bn: 'হুকে ঝুলছে' },
          interp: { en: 'Nobody cooking', bn: 'কেউ রাঁধছে না' }
        },
        title: { en: 'Cook 1 hangs the hat up', bn: 'রাঁধুনি ১ টুপি হুকে রাখে' },
        simple: {
          en: 'Cook 1 stops and hangs the hat back on its hook.',
          bn: 'রাঁধুনি ১ থামে আর টুপিটা হুকে ঝুলিয়ে রাখে।'
        },
        tech: {
          en: 'The holder releases the GIL. With a forced switch, another waiter must take it, so the releaser cannot instantly grab it again.',
          bn: 'holder GIL ছেড়ে দেয়। forced switch-এ অন্য অপেক্ষারতকে সেটা নিতে হয়, তাই যে ছেড়েছে সে সাথে সাথে আবার নিতে পারে না।'
        }
      },
      {
        id: 't2-takes',
        moves: [ { edge: 'gil-t2', label: 'GIL', plain: { en: 'Chef’s hat', bn: 'শেফের টুপি' } } ],
        state: {
          gil: { en: 'Held by T2', bn: 'T2 ধরে আছে' },
          t2: { en: 'Running', bn: 'চলছে' },
          interp: { en: 'Running T2', bn: 'T2 চলছে' }
        },
        plainState: {
          gil: { en: 'Cook 2 wears it', bn: 'রাঁধুনি ২ পরে আছে' },
          t2: { en: 'Cooking', bn: 'রাঁধছে' },
          interp: { en: 'Cook 2 cooking', bn: 'রাঁধুনি ২ রাঁধছে' }
        },
        title: { en: 'Cook 2 puts on the hat', bn: 'রাঁধুনি ২ টুপি পরে' },
        simple: {
          en: 'Cook 2 takes the hat from the hook and starts cooking on the stove.',
          bn: 'রাঁধুনি ২ হুক থেকে টুপি নিয়ে স্টোভে রান্না শুরু করে।'
        },
        tech: {
          en: 'Which waiting thread wins is the operating system’s decision. The interpreter has no scheduler of its own.',
          bn: 'কোন অপেক্ষারত thread জিতবে সেটা operating system ঠিক করে। interpreter-এর নিজের কোনো scheduler নেই।'
        }
      },
      {
        id: 'io-release',
        moves: [
          { edge: 't2-io', label: 'recv()', plain: { en: 'Waits at door', bn: 'দরজায় অপেক্ষা' } },
          { edge: 'gil-t1', label: 'GIL', plain: { en: 'Chef’s hat', bn: 'শেফের টুপি' } }
        ],
        state: {
          gil: { en: 'Held by T1', bn: 'T1 ধরে আছে' },
          t1: { en: 'Running', bn: 'চলছে' },
          t2: { en: 'Blocked in recv', bn: 'recv-এ আটকে' },
          interp: { en: 'Running T1', bn: 'T1 চলছে' },
          io: { en: 'Reading socket', bn: 'socket পড়ছে' }
        },
        plainState: {
          gil: { en: 'Cook 1 wears it', bn: 'রাঁধুনি ১ পরে আছে' },
          t1: { en: 'Cooking', bn: 'রাঁধছে' },
          t2: { en: 'At the door', bn: 'দরজায় দাঁড়িয়ে' },
          interp: { en: 'Cook 1 cooking', bn: 'রাঁধুনি ১ রাঁধছে' },
          io: { en: 'Parcel on its way', bn: 'পার্সেল আসছে' }
        },
        title: { en: 'Waiting at the door frees the hat', bn: 'দরজায় অপেক্ষা করলে টুপি খালি হয়' },
        simple: {
          en: 'Cook 2 waits at the delivery door for a parcel. That needs no hat, so Cook 2 hangs it up and Cook 1 takes it.',
          bn: 'রাঁধুনি ২ ডেলিভারির দরজায় পার্সেলের অপেক্ষা করে। তাতে টুপি লাগে না, তাই টুপি হুকে যায় আর রাঁধুনি ১ সেটা পরে।'
        },
        tech: {
          en: 'Blocking I/O calls release the GIL before they wait. T2 sits in the kernel while T1 runs Python code: a real overlap of waiting and computing.',
          bn: 'blocking I/O কল অপেক্ষার আগে GIL ছেড়ে দেয়। T2 kernel-এ বসে থাকে, আর T1 Python কোড চালায়: অপেক্ষা আর হিসাব সত্যিই একসাথে চলে।'
        }
      },
      {
        id: 'data-back',
        moves: [ { edge: 'io-t2', label: 'data', plain: { en: 'Parcel arrives', bn: 'পার্সেল আসে' } } ],
        state: {
          t2: { en: 'Ready, wants GIL', bn: 'তৈরি, GIL চায়' },
          io: { en: 'Outside world', bn: 'বাইরের জগৎ' }
        },
        plainState: {
          t2: { en: 'Wants the hat', bn: 'টুপি চায়' },
          io: { en: 'Where parcels arrive', bn: 'যেখানে পার্সেল আসে' }
        },
        title: { en: 'The parcel arrives', bn: 'পার্সেল পৌঁছায়' },
        simple: {
          en: 'The parcel arrives. Cook 2 wants to cook again, but Cook 1 has the hat, so Cook 2 queues for it.',
          bn: 'পার্সেল এসে যায়। রাঁধুনি ২ আবার রাঁধতে চায়, কিন্তু টুপি রাঁধুনি ১-এর মাথায়, তাই তাকে লাইনে দাঁড়াতে হয়।'
        },
        tech: {
          en: 'When the I/O call returns, T2 must re-acquire the GIL before it touches any Python object.',
          bn: 'I/O কল ফিরলে কোনো Python object ছোঁয়ার আগে T2-কে আবার GIL নিতে হয়।'
        }
      },
      {
        id: 'c-call',
        moves: [ { edge: 't1-cext', label: 'sha256(big)', plain: { en: 'Big job', bn: 'বড় কাজ' } } ],
        state: {
          gil: { en: 'Free (C released it)', bn: 'খালি (C ছেড়েছে)' },
          t1: { en: 'In C code', bn: 'C কোডে' },
          cext: { en: 'Hashing', bn: 'hash করছে' },
          interp: { en: 'Paused', bn: 'থেমে আছে' }
        },
        plainState: {
          gil: { en: 'On the hook', bn: 'হুকে ঝুলছে' },
          t1: { en: 'Using rice cooker', bn: 'রাইস কুকার চালাচ্ছে' },
          cext: { en: 'Cooking rice', bn: 'ভাত রাঁধছে' },
          interp: { en: 'Nobody cooking', bn: 'কেউ রাঁধছে না' }
        },
        title: { en: 'A rice cooker needs no hat', bn: 'রাইস কুকারের টুপি লাগে না' },
        simple: {
          en: 'Cook 1 starts the rice cooker. It cooks on its own without the hat, so the hat goes back on the hook.',
          bn: 'রাঁধুনি ১ রাইস কুকার চালু করে। ওটা টুপি ছাড়াই নিজে রাঁধে, তাই টুপি হুকে ফিরে যায়।'
        },
        tech: {
          en: 'Some C extensions, such as `hashlib` on big data, zlib and NumPy, release the GIL around heavy work. Many extensions do not.',
          bn: 'কিছু C extension, যেমন বড় data-য় `hashlib`, zlib আর NumPy, ভারী কাজের সময় GIL ছাড়ে। অনেক extension ছাড়ে না।'
        }
      },
      {
        id: 't2-runs',
        moves: [ { edge: 'gil-t2', label: 'GIL', plain: { en: 'Chef’s hat', bn: 'শেফের টুপি' } } ],
        state: {
          gil: { en: 'Held by T2', bn: 'T2 ধরে আছে' },
          t2: { en: 'Running', bn: 'চলছে' },
          interp: { en: 'Running T2', bn: 'T2 চলছে' }
        },
        plainState: {
          gil: { en: 'Cook 2 wears it', bn: 'রাঁধুনি ২ পরে আছে' },
          t2: { en: 'Cooking', bn: 'রাঁধছে' },
          interp: { en: 'Cook 2 cooking', bn: 'রাঁধুনি ২ রাঁধছে' }
        },
        title: { en: 'Cook 2 cooks meanwhile', bn: 'ততক্ষণে রাঁধুনি ২ রাঁধে' },
        simple: {
          en: 'While the rice cooker works, Cook 2 takes the hat and cooks. Both are busy at once.',
          bn: 'রাইস কুকার চলার সময় রাঁধুনি ২ টুপি নিয়ে রাঁধে। দুজনেই একসাথে ব্যস্ত।'
        },
        tech: {
          en: 'The C call and T2’s bytecode run truly in parallel, on two cores.',
          bn: 'C কল আর T2-এর bytecode সত্যিই parallel চলে, দুটো core-এ।'
        }
      },
      {
        id: 'c-returns',
        work: { node: 't1', kind: 'queue' },
        state: {
          gil: { en: 'Held by T2', bn: 'T2 ধরে আছে' },
          cext: { en: 'Done', bn: 'শেষ' },
          t1: { en: 'Wants the GIL', bn: 'GIL চায়' }
        },
        plainState: {
          gil: { en: 'Cook 2 wears it', bn: 'রাঁধুনি ২ পরে আছে' },
          cext: { en: 'Done', bn: 'শেষ' },
          t1: { en: 'Wants the hat', bn: 'টুপি চায়' }
        },
        title: { en: 'Cook 1 waits for the hat', bn: 'রাঁধুনি ১ টুপির জন্য অপেক্ষা করে' },
        simple: {
          en: 'The rice cooker finishes, but Cook 2 has the hat, so Cook 1 waits.',
          bn: 'রাইস কুকারের কাজ শেষ, কিন্তু টুপি রাঁধুনি ২-এর মাথায়, তাই রাঁধুনি ১ অপেক্ষা করে।'
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
      label: { en: 'Long jobs: no speed-up', bn: 'লম্বা কাজ: গতি বাড়ে না' },
      whatIf: {
        en: 'What if both cooks have a long dish that needs cooking non-stop?',
        bn: 'দুই রাঁধুনিরই যদি এমন লম্বা পদ থাকে যা একটানা রাঁধতে হয়?'
      },
      branchAfter: 't2-takes',
      steps: [
        {
          id: 'both-crunch',
          work: { node: [ 't1', 't2' ], kind: 'queue' },
          state: {
            t1: { en: 'CPU loop', bn: 'CPU loop' },
            t2: { en: 'CPU loop', bn: 'CPU loop' }
          },
          plainState: {
            t1: { en: 'Long dish', bn: 'লম্বা পদ' },
            t2: { en: 'Long dish', bn: 'লম্বা পদ' }
          },
          title: { en: 'Both cooks have a long dish', bn: 'দুজনেরই লম্বা পদ' },
          simple: {
            en: 'Both cooks have a long dish that needs cooking non-stop. Both want the stove all the time.',
            bn: 'দুজনেরই একটা লম্বা পদ, যা একটানা রাঁধতে হয়। দুজনেই সারাক্ষণ স্টোভ চায়।'
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
          plainState: { gil: { en: 'Passed around', bn: 'হাতে হাতে ঘোরে' } },
          title: { en: 'They take turns', bn: 'তারা পালা করে রাঁধে' },
          simple: {
            en: 'They pass the hat back and forth. Only the cook wearing it cooks, so nobody cooks at the same time.',
            bn: 'তারা টুপিটা হাতবদল করে। যে পরে আছে শুধু সে-ই রাঁধে, তাই একসাথে কেউ রাঁধে না।'
          },
          tech: {
            en: 'The GIL switches about every 5 ms. Two threads take about as long as running the jobs one after the other, plus switching overhead.',
            bn: 'GIL প্রায় প্রতি ৫ ms-এ বদলায়। দুটো thread-এ সময় লাগে কাজ দুটো একটার পর একটা চালানোর মতোই, সাথে switching-এর বাড়তি খরচ।'
          }
        },
        {
          id: 'ping',
          moves: [ { edge: 't2-gil', label: 'release', plain: { en: 'Hat back', bn: 'টুপি ফেরত' } } ],
          state: {
            gil: { en: 'Handed over', bn: 'হাতবদল' },
            t2: { en: 'Waiting', bn: 'অপেক্ষায়' }
          },
          plainState: { gil: { en: 'On the hook', bn: 'হুকে ঝুলছে' } },
          title: { en: 'Cook 2 hangs the hat up', bn: 'রাঁধুনি ২ টুপি হুকে রাখে' },
          simple: {
            en: 'Cook 2 hangs the hat up after a turn, even with cooking left to do.',
            bn: 'রান্না বাকি থাকলেও রাঁধুনি ২ নিজের পালা শেষে টুপি হুকে রাখে।'
          },
          tech: {
            en: 'A forced switch: T2 drops the GIL at its next eval-breaker check, even though it has more work to do.',
            bn: 'forced switch: T2 পরের eval-breaker check-এ GIL ছাড়ে, কাজ বাকি থাকলেও।'
          }
        },
        {
          id: 'pong',
          moves: [ { edge: 'gil-t1', label: 'GIL', plain: { en: 'Chef’s hat', bn: 'শেফের টুপি' } } ],
          state: {
            gil: { en: 'Held by T1', bn: 'T1 ধরে আছে' },
            t1: { en: 'CPU loop', bn: 'CPU loop' },
            interp: { en: 'Running T1', bn: 'T1 চলছে' }
          },
          plainState: {
            gil: { en: 'Cook 1 wears it', bn: 'রাঁধুনি ১ পরে আছে' },
            t1: { en: 'Long dish', bn: 'লম্বা পদ' },
            interp: { en: 'Cook 1 cooking', bn: 'রাঁধুনি ১ রাঁধছে' }
          },
          title: { en: 'Cook 1 takes a turn', bn: 'রাঁধুনি ১ নিজের পালা নেয়' },
          simple: {
            en: 'Cook 1 puts the hat on and cooks. Then it all repeats.',
            bn: 'রাঁধুনি ১ টুপি পরে রাঁধে। তারপর সবকিছু আবার ঘুরে আসে।'
          },
          tech: {
            en: 'The ping-pong repeats for the whole run. At any instant only one thread is making progress.',
            bn: 'পুরো চলার সময় এই ping-pong চলতেই থাকে। যেকোনো মুহূর্তে একটাই thread এগোয়।'
          }
        },
        {
          id: 'no-gain',
          work: { node: 'interp', kind: 'queue' },
          state: { interp: { en: 'Wall time = sum', bn: 'মোট সময় = যোগফল' } },
          plainState: { interp: { en: 'Times add up', bn: 'সময় যোগ হয়' } },
          title: { en: 'Two cooks, no faster dinner', bn: 'দুজন রাঁধুনি, তবু দ্রুত হয় না' },
          simple: {
            en: 'Two cooks take about as long as one cook doing both dishes, one after the other.',
            bn: 'দুজন রাঁধুনিতে সময় লাগে একজনের পরপর দুটো পদ রাঁধার মতোই।'
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
      label: { en: 'No hat (free-threaded)', bn: 'টুপি ছাড়া (free-threaded)' },
      whatIf: {
        en: 'What if the chef’s hat is put away and nobody needs it?',
        bn: 'শেফের টুপিটা যদি সরিয়ে রাখা হয় আর কারও লাগে না?'
      },
      branchAfter: 't1-runs',
      steps: [
        {
          id: 'gil-off',
          work: { node: 'gil', kind: 'result' },
          state: { gil: { en: 'Disabled (3.14t)', bn: 'বন্ধ (3.14t)' } },
          plainState: { gil: { en: 'Put away', bn: 'সরিয়ে রাখা' } },
          title: { en: 'The hat is put away', bn: 'টুপি সরিয়ে রাখা হয়' },
          simple: {
            en: 'In this special kitchen there is no hat to wait for. Any cook may cook.',
            bn: 'এই বিশেষ রান্নাঘরে অপেক্ষা করার মতো কোনো টুপি নেই। যে কেউ রাঁধতে পারে।'
          },
          tech: {
            en: 'It is a separate `t` build: experimental in 3.13, officially supported but optional in 3.14. The default build still has the GIL.',
            bn: 'এটা আলাদা `t` build: 3.13-এ experimental, 3.14-এ officially supported কিন্তু optional। ডিফল্ট build-এ এখনও GIL আছে।'
          }
        },
        {
          id: 'both-run',
          moves: [
            { edge: 't1-interp', label: 'T1 code', plain: { en: 'Cook 1 cooks', bn: 'রাঁধুনি ১' } },
            { edge: 't2-interp', label: 'T2 code', plain: { en: 'Cook 2 cooks', bn: 'রাঁধুনি ২' } }
          ],
          state: {
            t1: { en: 'Running', bn: 'চলছে' },
            t2: { en: 'Running', bn: 'চলছে' },
            interp: { en: 'T1 and T2 together', bn: 'T1 আর T2 একসাথে' }
          },
          plainState: {
            t1: { en: 'Cooking', bn: 'রাঁধছে' },
            t2: { en: 'Cooking', bn: 'রাঁধছে' },
            interp: { en: 'Both cooking', bn: 'দুজনেই রাঁধছে' }
          },
          title: { en: 'Both cooks cook together', bn: 'দুজনে একসাথে রাঁধে' },
          simple: {
            en: 'Both cooks cook at the same moment, each on their own burner.',
            bn: 'দুজন রাঁধুনি একই সময়ে রাঁধে, প্রত্যেকে নিজের চুলায়।'
          },
          tech: {
            en: 'Per-object locking and biased reference counting keep built-ins safe. Single-thread code pays roughly 5-10% in 3.14.',
            bn: 'per-object locking আর biased reference counting built-in-গুলোকে নিরাপদ রাখে। 3.14-এ single-thread কোডে খরচ প্রায় ৫-১০%।'
          }
        },
        {
          id: 'still-lock',
          work: { node: [ 't1', 't2' ], kind: 'queue' },
          state: {
            t1: { en: 'Still need Lock', bn: 'Lock এখনও লাগে' },
            t2: { en: 'Still need Lock', bn: 'Lock এখনও লাগে' }
          },
          plainState: {
            t1: { en: 'Needs own rule', bn: 'নিজের নিয়ম লাগে' },
            t2: { en: 'Needs own rule', bn: 'নিজের নিয়ম লাগে' }
          },
          title: { en: 'Cooks still need their own rules', bn: 'রাঁধুনিদের নিজের নিয়ম তবু লাগে' },
          simple: {
            en: 'Even with no hat, two cooks writing on the same whiteboard can clash. They still need a rule, like one marker pen.',
            bn: 'টুপি না থাকলেও একই হোয়াইটবোর্ডে দুজন লিখলে গোলমাল হতে পারে। তাদের নিজের নিয়ম লাগে, যেমন একটাই মার্কার কলম।'
          },
          tech: {
            en: 'Built-ins stay internally consistent, but compound operations such as check-then-act and `+=` can still race. Use explicit synchronization.',
            bn: 'built-in ভেতরে ঠিক থাকে, কিন্তু check-then-act আর `+=`-এর মতো যৌগিক কাজে race হতে পারে। স্পষ্ট synchronization ব্যবহার করুন।'
          }
        },
        {
          id: 'ext-reenables',
          work: { node: 'gil', kind: 'queue' },
          state: {
            gil: { en: 'Re-enabled', bn: 'আবার চালু' },
            interp: { en: 'One thread at a time', bn: 'একসময়ে একটা thread' }
          },
          plainState: {
            gil: { en: 'Hat is back', bn: 'টুপি ফিরেছে' },
            interp: { en: 'One cook at a time', bn: 'একসময়ে একজন রাঁধে' }
          },
          title: { en: 'An old tool brings the hat back', bn: 'পুরনো যন্ত্র টুপি ফিরিয়ে আনে' },
          simple: {
            en: 'Plug in an old tool not made for this kitchen, and the hat can come back.',
            bn: 'এই রান্নাঘরের জন্য বানানো নয় এমন পুরনো যন্ত্র লাগালে টুপিটা ফিরে আসতে পারে।'
          },
          tech: {
            en: 'Importing a C extension not marked free-threading safe can re-enable the GIL, with a warning. Check that your wheels support it.',
            bn: 'free-threading নিরাপদ বলে চিহ্নিত নয় এমন C extension import করলে GIL আবার চালু হতে পারে, সাথে warning। আপনার wheel সাপোর্ট করে কি না দেখুন।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A kitchen has one stove and one chef’s hat. Only the cook wearing the hat may cook. Everyone else waits. A cook who steps away to wait at the delivery door hangs the hat back up.',
      bn: 'একটা রান্নাঘরে একটাই স্টোভ আর একটাই শেফের টুপি। যে রাঁধুনির মাথায় টুপি, শুধু সে-ই রাঁধতে পারে। বাকিরা অপেক্ষা করে। যে রাঁধুনি ডেলিভারির দরজায় অপেক্ষা করতে যায়, সে টুপিটা হুকে ঝুলিয়ে যায়।'
    },
    twins: [
      {
        icon: 'thread',
        node: 't1',
        name: { en: 'The first cook', bn: 'প্রথম রাঁধুনি' },
        d: {
          en: 'Puts on the hat, cooks, and hangs it back up when asked.',
          bn: 'টুপি পরে, রাঁধে, আর বললে হুকে ঝুলিয়ে দেয়।'
        }
      },
      {
        icon: 'thread',
        node: 't2',
        name: { en: 'The second cook', bn: 'দ্বিতীয় রাঁধুনি' },
        d: {
          en: 'Waits for the hat. After a few moments, politely asks for it.',
          bn: 'টুপির জন্য অপেক্ষা করে। কিছুক্ষণ পর ভদ্রভাবে চায়।'
        }
      },
      {
        icon: 'lock',
        node: 'gil',
        name: { en: 'The chef’s hat', bn: 'শেফের টুপি' },
        d: {
          en: 'Only one exists. Whoever wears it is the only one allowed to cook.',
          bn: 'একটাই আছে। যে পরে আছে, শুধু সে-ই রাঁধতে পারে।'
        }
      },
      {
        icon: 'code',
        node: 'interp',
        name: { en: 'The stove', bn: 'স্টোভ' },
        d: {
          en: 'Where the cooking happens, with one cook at a time.',
          bn: 'যেখানে রান্না হয়, একসময়ে একজন রাঁধুনির।'
        }
      },
      {
        icon: 'cloud',
        node: 'io',
        name: { en: 'The delivery door', bn: 'ডেলিভারির দরজা' },
        d: {
          en: 'Waiting for a parcel needs no stove, so the hat goes back on the hook.',
          bn: 'পার্সেলের অপেক্ষায় স্টোভ লাগে না, তাই টুপি আবার হুকে ফেরে।'
        }
      },
      {
        icon: 'box',
        node: 'cext',
        name: { en: 'The rice cooker', bn: 'রাইস কুকার' },
        d: {
          en: 'Cooks on its own while the cook does something else. A good one needs no hat at all.',
          bn: 'রাঁধুনি অন্য কাজ করার সময় নিজে রাঁধে। ভালো একটার টুপি দরকারই হয় না।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Two long dishes, one hat', bn: 'দুটো লম্বা পদ, একটা টুপি' },
        is: { en: 'is CPU-bound threads', bn: 'মানে CPU-bound thread' },
        d: {
          en: 'Both cooks need the stove all the time. More cooks will not speed it up, because only one may wear the hat.',
          bn: 'দুই রাঁধুনিরই সারাক্ষণ স্টোভ লাগে। আরও রাঁধুনি নিলেও দ্রুত হয় না, কারণ টুপি পরতে পারে একজনই।'
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
        en: 'During blocking I/O, in C extensions that release it, and on forced switches.',
        bn: 'blocking I/O-র সময়, GIL ছেড়ে দেওয়া C extension-এ, আর forced switch-এ।'
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
