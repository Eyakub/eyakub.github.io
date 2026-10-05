import type { Topic } from '../types'
import { UI } from '../ui'

export const processesVsThreads: Topic = {
  slug: 'processes-vs-threads',
  line: 'concurrency',
  title: { en: 'Processes vs threads', bn: 'প্রসেস বনাম থ্রেড' },
  summary: {
    en: 'Threads share one memory and are cheap; processes keep memory apart and must send copies.',
    bn: 'thread একই memory ভাগ করে আর সস্তা; process-এর memory আলাদা, তাই কপি পাঠাতে হয়।'
  },
  hook: {
    en: 'Cooks in one kitchen share a fridge, which is fast but risky. Separate kitchens are safer but must pass slips.',
    bn: 'এক রান্নাঘরের রাঁধুনিরা একই ফ্রিজ ভাগ করে, তাতে দ্রুত কিন্তু ঝুঁকি। আলাদা রান্নাঘর নিরাপদ, তবে স্লিপ পাঠাতে হয়।'
  },
  takeaway: {
    en: 'Shared fridge: fast but risky. Separate kitchens: safe, but they must pass slips.',
    bn: 'একই ফ্রিজ: দ্রুত কিন্তু ঝুঁকি। আলাদা রান্নাঘর: নিরাপদ, তবে স্লিপ পাঠাতে হয়।'
  },
  words: [
    {
      term: { en: 'Kitchen (process)', bn: 'রান্নাঘর (process)' },
      d: {
        en: 'A separate workplace with its own fridge. Nothing inside is shared with other kitchens.',
        bn: 'নিজের ফ্রিজসহ আলাদা কাজের জায়গা। ভেতরের কিছু অন্য রান্নাঘরের সাথে ভাগ হয় না।'
      }
    },
    {
      term: { en: 'Fridge (memory)', bn: 'ফ্রিজ (memory)' },
      d: {
        en: 'Where a kitchen keeps what it is working on. Every kitchen has its own.',
        bn: 'রান্নাঘর যা নিয়ে কাজ করছে তা যেখানে রাখে। প্রতিটি রান্নাঘরের নিজের ফ্রিজ।'
      }
    },
    {
      term: { en: 'Cook (thread)', bn: 'রাঁধুনি (thread)' },
      d: {
        en: 'One worker inside a kitchen. Cooks in the same kitchen share its fridge.',
        bn: 'রান্নাঘরের ভেতরের একজন কর্মী। একই রান্নাঘরের রাঁধুনিরা ফ্রিজ ভাগ করে।'
      }
    },
    {
      term: { en: 'Pass window', bn: 'পাস-জানালা' },
      d: {
        en: 'The only way for two kitchens to swap things, using written slips.',
        bn: 'দুই রান্নাঘরের জিনিস আদান-প্রদানের একমাত্র পথ, লেখা স্লিপের মাধ্যমে।'
      }
    },
    {
      term: { en: 'Slip', bn: 'স্লিপ' },
      d: {
        en: 'A written copy of an order. The other kitchen gets the copy only.',
        bn: 'অর্ডারের লেখা কপি। অন্য রান্নাঘর শুধু কপিটাই পায়।'
      }
    }
  ],
  legend: {
    request: { en: 'Writing a number', bn: 'সংখ্যা লেখা' },
    queue: { en: 'A slip sent over', bn: 'স্লিপ পাঠানো' },
    result: { en: 'Reading or a reply', bn: 'পড়া বা উত্তর' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 980, 420 ], narrow: [ 400, 570 ] },
  nodes: {
    a_t1: {
      icon: 'thread',
      name: { en: 'Thread 1', bn: 'Thread ১' },
      sub: { en: 'In process A', bn: 'process A-তে' },
      plain: {
        name: { en: 'Cook 1', bn: 'রাঁধুনি ১' },
        sub: { en: 'In Kitchen A', bn: 'রান্নাঘর A-তে' }
      },
      wide: [ 200, 120, 'left' ],
      narrow: [ 170, 210, 'right' ]
    },
    a_t2: {
      icon: 'thread',
      name: { en: 'Thread 2', bn: 'Thread ২' },
      sub: { en: 'In process A', bn: 'process A-তে' },
      plain: {
        name: { en: 'Cook 2', bn: 'রাঁধুনি ২' },
        sub: { en: 'In Kitchen A', bn: 'রান্নাঘর A-তে' }
      },
      wide: [ 200, 330, 'left' ],
      narrow: [ 170, 90, 'right' ]
    },
    a_mem: {
      icon: 'memory',
      name: { en: 'Memory A', bn: 'Memory A' },
      sub: { en: 'x = ?', bn: 'x = ?' },
      plain: {
        name: { en: 'Kitchen A’s fridge', bn: 'রান্নাঘর A-র ফ্রিজ' },
        sub: { en: 'Shared by both cooks', bn: 'দুজনেরই ফ্রিজ' }
      },
      wide: [ 380, 225, 'up' ],
      narrow: [ 50, 150, 'right' ]
    },
    pipe: {
      icon: 'pipe',
      name: { en: 'Pipe / Queue', bn: 'Pipe / Queue' },
      sub: { en: 'Pickled bytes', bn: 'Pickle করা bytes' },
      plain: {
        name: { en: 'Pass window', bn: 'পাস-জানালা' },
        sub: { en: 'Slips go through here', bn: 'স্লিপ এখান দিয়ে যায়' }
      },
      wide: [ 640, 225, 'down' ],
      narrow: [ 170, 310, 'right' ]
    },
    b_main: {
      icon: 'thread',
      name: { en: 'Process B', bn: 'Process B' },
      sub: { en: 'Own interpreter', bn: 'নিজের interpreter' },
      plain: {
        name: { en: 'Kitchen B’s cook', bn: 'রান্নাঘর B-র রাঁধুনি' },
        sub: { en: 'Cooks on its own', bn: 'নিজের মতো রাঁধে' }
      },
      wide: [ 790, 120, 'right' ],
      narrow: [ 170, 415, 'right' ]
    },
    b_mem: {
      icon: 'memory',
      name: { en: 'Memory B', bn: 'Memory B' },
      sub: { en: 'x = ?', bn: 'x = ?' },
      plain: {
        name: { en: 'Kitchen B’s fridge', bn: 'রান্নাঘর B-র ফ্রিজ' },
        sub: { en: 'Its own, private', bn: 'নিজস্ব, ব্যক্তিগত' }
      },
      wide: [ 790, 330, 'right' ],
      narrow: [ 170, 495, 'right' ]
    }
  },
  groups: [
    {
      id: 'proc-a',
      label: { en: 'Process A', bn: 'Process A' },
      plain: { en: 'Kitchen A', bn: 'রান্নাঘর A' },
      wide: [ 40, 70, 430, 310 ],
      narrow: [ 10, 40, 320, 210 ]
    },
    {
      id: 'proc-b',
      label: { en: 'Process B', bn: 'Process B' },
      plain: { en: 'Kitchen B', bn: 'রান্নাঘর B' },
      wide: [ 750, 70, 220, 310 ],
      narrow: [ 110, 365, 220, 180 ]
    }
  ],
  corridors: {
    'a_t1-a_mem': {
      wide: [ [ 200, 120 ], [ 305, 225 ], [ 380, 225 ] ],
      narrow: [ [ 170, 210 ], [ 50, 210 ], [ 50, 150 ] ]
    },
    'a_mem-a_t2': {
      wide: [ [ 380, 225 ], [ 305, 225 ], [ 200, 330 ] ],
      narrow: [ [ 50, 150 ], [ 50, 90 ], [ 170, 90 ] ]
    },
    'a_t1-pipe': {
      wide: [ [ 200, 120 ], [ 535, 120 ], [ 640, 225 ] ],
      narrow: [ [ 170, 210 ], [ 170, 310 ] ]
    },
    'pipe-b_main': {
      wide: [ [ 640, 225 ], [ 745, 120 ], [ 790, 120 ] ],
      narrow: [ [ 170, 310 ], [ 170, 415 ] ]
    },
    'b_main-b_mem': {
      wide: [ [ 790, 120 ], [ 790, 330 ] ],
      narrow: [ [ 170, 415 ], [ 170, 495 ] ]
    }
  },
  edges: {
    'a_t1-a_mem': { from: 'a_t1', to: 'a_mem', kind: 'request' },
    'a_mem-a_t2': { from: 'a_mem', to: 'a_t2', kind: 'result' },
    'a_t2-a_mem': { from: 'a_t2', to: 'a_mem', kind: 'request' },
    'a_t1-pipe': { from: 'a_t1', to: 'pipe', kind: 'queue' },
    'pipe-b_main': { from: 'pipe', to: 'b_main', kind: 'queue' },
    'b_main-b_mem': { from: 'b_main', to: 'b_mem', kind: 'request' },
    'b_main-pipe': { from: 'b_main', to: 'pipe', kind: 'result' },
    'pipe-a_t1': { from: 'pipe', to: 'a_t1', kind: 'result' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 't1-writes',
        moves: [ { edge: 'a_t1-a_mem', label: 'set x=1', plain: { en: 'Writes a number', bn: 'সংখ্যা লেখে' } } ],
        state: { a_mem: { en: 'x = 1', bn: 'x = 1' } },
        plainState: { a_mem: { en: 'Number is 1', bn: 'সংখ্যা ১' } },
        title: { en: 'Cook 1 puts a number in the fridge', bn: 'রাঁধুনি ১ ফ্রিজে একটা সংখ্যা রাখে' },
        simple: {
          en: 'Kitchen A has two cooks who share one fridge. Cook 1 puts a number in it.',
          bn: 'রান্নাঘর A-তে দুজন রাঁধুনি, ফ্রিজ একটাই। রাঁধুনি ১ তাতে একটা সংখ্যা রাখে।'
        },
        tech: {
          en: 'Thread 1 stores into a heap object. Threads in one process share one address space: globals, heap and open files.',
          bn: 'Thread ১ একটা heap object-এ মান রাখে। একই process-এর thread-গুলো একই address space ভাগ করে: globals, heap আর খোলা ফাইল।'
        }
      },
      {
        id: 't2-reads',
        moves: [ { edge: 'a_mem-a_t2', label: 'read x', plain: { en: 'Reads the number', bn: 'সংখ্যা পড়ে' } } ],
        state: { a_t2: { en: 'Sees x = 1', bn: 'x = 1 দেখে' } },
        plainState: { a_t2: { en: 'Sees the number 1', bn: 'সংখ্যা ১ দেখে' } },
        title: { en: 'Cook 2 reads it', bn: 'রাঁধুনি ২ সেটা পড়ে' },
        simple: {
          en: 'Cook 2 opens the same fridge and sees the number at once. Nothing was copied.',
          bn: 'রাঁধুনি ২ একই ফ্রিজ খুলে সাথে সাথে সংখ্যাটা দেখে। কিছু কপি করতে হয়নি।'
        },
        tech: {
          en: 'Thread 2 reads the same object directly: no copy, no serialization, no IPC. Cheap, but shared mutable state needs synchronization.',
          bn: 'Thread ২ একই object সরাসরি পড়ে: কপি নেই, serialization নেই, IPC নেই। সস্তা, কিন্তু shared mutable state-এ synchronization লাগে।'
        }
      },
      {
        id: 't2-writes',
        moves: [ { edge: 'a_t2-a_mem', label: 'set x=2', plain: { en: 'Changes number', bn: 'সংখ্যা বদলায়' } } ],
        state: {
          a_mem: { en: 'x = 2', bn: 'x = 2' },
          a_t2: { en: 'Wrote x = 2', bn: 'x = 2 লিখেছে' }
        },
        plainState: {
          a_mem: { en: 'Number is 2', bn: 'সংখ্যা ২' },
          a_t2: { en: 'Changed it to 2', bn: '২ করে দিয়েছে' }
        },
        title: { en: 'Either cook can change it', bn: 'যেকোনো রাঁধুনি বদলাতে পারে' },
        simple: {
          en: 'Cook 2 changes the number, and Cook 1 sees it too. Sharing is fast, but one cook’s mess spoils it for all.',
          bn: 'রাঁধুনি ২ সংখ্যা বদলায়, রাঁধুনি ১-ও তা দেখে। ভাগাভাগি দ্রুত, কিন্তু একজনের গোলমালে সবার ক্ষতি।'
        },
        tech: {
          en: 'Writes are visible to every thread of A at once. That is both the power and the hazard of threads.',
          bn: 'A-র সব thread লেখাটা একসাথে দেখে। এটাই thread-এর শক্তি, আবার ঝুঁকিও।'
        }
      },
      {
        id: 'send',
        moves: [ { edge: 'a_t1-pipe', label: 'pickle(x)', plain: { en: 'Writes a slip', bn: 'স্লিপ লেখে' } } ],
        state: { pipe: { en: 'Bytes in flight', bn: 'bytes যাচ্ছে' } },
        plainState: { pipe: { en: 'Slip in the window', bn: 'জানালায় স্লিপ' } },
        title: { en: 'To reach Kitchen B, send a slip', bn: 'রান্নাঘর B-তে পৌঁছাতে স্লিপ পাঠাতে হয়' },
        simple: {
          en: 'Kitchen B has its own fridge, so Cook 1 writes the number on a slip and puts it in the pass window.',
          bn: 'রান্নাঘর B-র নিজের ফ্রিজ আছে, তাই রাঁধুনি ১ সংখ্যাটা স্লিপে লিখে পাস-জানালায় রাখে।'
        },
        tech: {
          en: 'Processes have separate address spaces. A `multiprocessing` Queue or Pipe pickles the object into bytes and sends them over an OS pipe or socket.',
          bn: 'process-গুলোর address space আলাদা। `multiprocessing`-এর Queue বা Pipe object-কে pickle করে bytes বানায় আর OS pipe বা socket দিয়ে পাঠায়।'
        }
      },
      {
        id: 'arrive',
        moves: [ { edge: 'pipe-b_main', label: 'bytes', plain: { en: 'The slip', bn: 'স্লিপ' } } ],
        state: {
          pipe: { en: 'Pickled bytes', bn: 'Pickle করা bytes' },
          b_main: { en: 'Receiving', bn: 'নিচ্ছে' }
        },
        plainState: {
          pipe: { en: 'Slip delivered', bn: 'স্লিপ পৌঁছে গেছে' },
          b_main: { en: 'Receiving', bn: 'নিচ্ছে' }
        },
        title: { en: 'The slip arrives', bn: 'স্লিপ পৌঁছায়' },
        simple: {
          en: 'The slip comes through the pass window to Kitchen B’s cook.',
          bn: 'স্লিপটা পাস-জানালা দিয়ে রান্নাঘর B-র রাঁধুনির কাছে পৌঁছায়।'
        },
        tech: {
          en: 'The receiving process reads the bytes. Cost grows with object size, and the object must be picklable.',
          bn: 'গ্রহণকারী process bytes পড়ে। object যত বড়, খরচ তত বেশি, আর object-টা picklable হতে হবে।'
        }
      },
      {
        id: 'unpickle',
        work: { node: [ 'b_main', 'b_mem' ], kind: 'result' },
        state: {
          b_main: { en: 'Unpickled', bn: 'খোলা হয়েছে' },
          b_mem: { en: 'x = 2 (copy)', bn: 'x = 2 (কপি)' }
        },
        plainState: {
          b_main: { en: 'Read the slip', bn: 'স্লিপ পড়েছে' },
          b_mem: { en: 'Number is 2, a copy', bn: 'সংখ্যা ২, একটা কপি' }
        },
        title: { en: 'Kitchen B makes its own copy', bn: 'রান্নাঘর B নিজের কপি বানায়' },
        simple: {
          en: 'Kitchen B’s cook reads the slip and writes the number in Kitchen B’s own fridge. It is a copy.',
          bn: 'রান্নাঘর B-র রাঁধুনি স্লিপ পড়ে সংখ্যাটা নিজেদের ফ্রিজে লেখে। এটা একটা কপি।'
        },
        tech: {
          en: 'Unpickling builds a new object in B’s heap. It is a copy, not the same object. For real sharing, use `shared_memory` or `Value`/`Array`.',
          bn: 'unpickle করলে B-র heap-এ নতুন object তৈরি হয়। এটা কপি, একই object নয়। সত্যিকারের sharing-এ `shared_memory` বা `Value`/`Array` লাগে।'
        }
      },
      {
        id: 'b-writes',
        moves: [ { edge: 'b_main-b_mem', label: 'x=99', plain: { en: 'Changes to 99', bn: '৯৯ করে' } } ],
        state: {
          b_mem: { en: 'x = 99', bn: 'x = 99' },
          b_main: { en: 'Own interpreter', bn: 'নিজের interpreter' }
        },
        plainState: {
          b_mem: { en: 'Number is 99', bn: 'সংখ্যা ৯৯' },
          b_main: { en: 'Cooks on its own', bn: 'নিজের মতো রাঁধে' }
        },
        title: { en: 'Kitchen B changes its copy', bn: 'রান্নাঘর B নিজের কপি বদলায়' },
        simple: {
          en: 'Kitchen B’s cook changes the number in Kitchen B’s own fridge to 99.',
          bn: 'রান্নাঘর B-র রাঁধুনি নিজেদের ফ্রিজের সংখ্যাটা ৯৯ করে দেয়।'
        },
        tech: {
          en: 'B mutates only its private heap. Nothing in process A can see this write.',
          bn: 'B শুধু নিজের private heap বদলায়। process A এই লেখা দেখতেই পায় না।'
        }
      },
      {
        id: 'a-untouched',
        work: { node: 'a_mem', kind: 'result' },
        state: { a_mem: { en: 'x = 2, unchanged', bn: 'x = 2, অপরিবর্তিত' } },
        plainState: { a_mem: { en: 'Still 2, untouched', bn: 'এখনও ২, অক্ষত' } },
        title: { en: 'Kitchen A’s fridge is untouched', bn: 'রান্নাঘর A-র ফ্রিজ অক্ষত' },
        simple: {
          en: 'Kitchen A’s fridge still says 2. Separate fridges mean one kitchen cannot spoil another.',
          bn: 'রান্নাঘর A-র ফ্রিজে এখনও ২। ফ্রিজ আলাদা, তাই এক রান্নাঘর আরেকটাকে নষ্ট করতে পারে না।'
        },
        tech: {
          en: 'Isolation is the main benefit of processes: no accidental sharing, no memory data races, and each process has its own GIL.',
          bn: 'process-এর প্রধান সুবিধা isolation: ভুলে sharing হয় না, memory-তে data race নেই, আর প্রতিটি process-এর নিজের GIL আছে।'
        }
      },
      {
        id: 'reply',
        moves: [ { edge: 'b_main-pipe', label: 'result', plain: { en: 'Reply slip', bn: 'উত্তরের স্লিপ' } } ],
        state: { pipe: { en: 'Bytes in flight', bn: 'bytes যাচ্ছে' } },
        plainState: { pipe: { en: 'Reply in the window', bn: 'জানালায় উত্তর' } },
        title: { en: 'Kitchen B sends a reply', bn: 'রান্নাঘর B উত্তর পাঠায়' },
        simple: {
          en: 'Kitchen B’s cook writes a reply on a new slip and puts it in the pass window.',
          bn: 'রান্নাঘর B-র রাঁধুনি নতুন স্লিপে উত্তর লিখে পাস-জানালায় রাখে।'
        },
        tech: {
          en: 'Results return the same way: pickled, then copied. This IPC cost is why chunking work into larger tasks matters.',
          bn: 'ফলাফলও একই পথে ফেরে: pickle করে, তারপর কপি হয়ে। এই IPC খরচের কারণেই কাজ বড় chunk-এ ভাগ করা জরুরি।'
        }
      },
      {
        id: 'reply-lands',
        moves: [ { edge: 'pipe-a_t1', label: 'copy of result', plain: { en: 'Copy of reply', bn: 'উত্তরের কপি' } } ],
        state: {
          pipe: { en: 'Pickled bytes', bn: 'Pickle করা bytes' },
          a_t1: { en: 'Got a copy', bn: 'কপি পেয়েছে' }
        },
        plainState: {
          pipe: { en: 'Reply delivered', bn: 'উত্তর পৌঁছে গেছে' },
          a_t1: { en: 'Got a copy', bn: 'কপি পেয়েছে' }
        },
        title: { en: 'Cook 1 gets a copy', bn: 'রাঁধুনি ১ একটা কপি পায়' },
        simple: {
          en: 'The reply reaches Cook 1 as a copy. The fridge stays put.',
          bn: 'উত্তর রাঁধুনি ১-এর কাছে কপি হয়ে আসে। ফ্রিজ নিজের জায়গাতেই থাকে।'
        },
        tech: {
          en: 'Thread 1 unpickles a new object in A’s heap. Sharing in Python threads is free; across processes every hand-off is a copy.',
          bn: 'Thread ১ A-র heap-এ নতুন object unpickle করে। Python thread-এ sharing বিনামূল্যে; process-এর মধ্যে প্রতিটি হস্তান্তর একটা কপি।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'process-crash',
      label: { en: 'A kitchen catches fire', bn: 'রান্নাঘরে আগুন লাগে' },
      whatIf: { en: 'What if Kitchen B catches fire?', bn: 'যদি রান্নাঘর B-তে আগুন লাগে?' },
      branchAfter: 'b-writes',
      steps: [
        {
          id: 'b-dies',
          work: { node: [ 'b_main', 'b_mem' ], kind: 'error' },
          state: {
            b_main: { en: 'Killed by a signal', bn: 'signal-এ মৃত' },
            b_mem: { en: 'Gone', bn: 'শেষ' }
          },
          plainState: {
            b_main: { en: 'Kitchen on fire', bn: 'রান্নাঘরে আগুন' },
            b_mem: { en: 'Lost', bn: 'নষ্ট' }
          },
          title: { en: 'Kitchen B catches fire', bn: 'রান্নাঘর B-তে আগুন লাগে' },
          simple: {
            en: 'Kitchen B catches fire. Its fridge and everything in it are lost, but nothing outside is touched.',
            bn: 'রান্নাঘর B-তে আগুন লাগে। তার ফ্রিজ আর ভেতরের সব নষ্ট, কিন্তু বাইরের কিছুতে আঁচ লাগে না।'
          },
          tech: {
            en: 'The OOM killer (SIGKILL, 9) or a segfault (SIGSEGV, 11) ends the process, and the OS reclaims its memory. The parent sees a negative `exitcode`: -9 or -11.',
            bn: 'OOM killer (SIGKILL, 9) বা segfault (SIGSEGV, 11) process শেষ করে, আর OS তার memory ফেরত নেয়। parent ঋণাত্মক `exitcode` দেখে: -9 বা -11।'
          }
        },
        {
          id: 'a-survives',
          work: { node: 'a_t1', kind: 'result' },
          state: { a_t1: { en: 'Alive, unaffected', bn: 'বেঁচে, অক্ষত' } },
          title: { en: 'Kitchen A carries on', bn: 'রান্নাঘর A চলতে থাকে' },
          simple: {
            en: 'Kitchen A is fine. Cook 1 only notices that Kitchen B has stopped answering.',
            bn: 'রান্নাঘর A ঠিকই আছে। রাঁধুনি ১ শুধু টের পায় রান্নাঘর B আর সাড়া দিচ্ছে না।'
          },
          tech: {
            en: 'The parent is unaffected. A pipe read sees EOF, a `Queue.get()` without timeout can wait forever, and `ProcessPoolExecutor` raises `BrokenProcessPool`.',
            bn: 'parent অক্ষত থাকে। pipe read EOF পায়, timeout ছাড়া `Queue.get()` চিরকাল আটকে থাকতে পারে, আর `ProcessPoolExecutor` `BrokenProcessPool` তোলে।'
          }
        }
      ]
    },
    {
      id: 'thread-crash',
      label: { en: 'A cook starts a fire', bn: 'রাঁধুনি আগুন ধরায়' },
      whatIf: { en: 'What if Cook 2 starts a fire in Kitchen A?', bn: 'যদি রাঁধুনি ২ রান্নাঘর A-তে আগুন ধরিয়ে দেয়?' },
      branchAfter: 't2-writes',
      steps: [
        {
          id: 't2-segfault',
          work: { node: 'a_t2', kind: 'error' },
          state: { a_t2: { en: 'SIGSEGV', bn: 'SIGSEGV' } },
          plainState: { a_t2: { en: 'Started a fire', bn: 'আগুন ধরিয়েছে' } },
          title: { en: 'A cook starts a fire', bn: 'একজন রাঁধুনি আগুন ধরায়' },
          simple: {
            en: 'Cook 2 makes a bad mistake and starts a fire in Kitchen A.',
            bn: 'রাঁধুনি ২ বড় ভুল করে রান্নাঘর A-তে আগুন ধরিয়ে দেয়।'
          },
          tech: {
            en: 'A hard fault in any thread (segfault, abort, `os._exit`, OOM kill) ends the whole process. A plain Python exception only ends that one thread.',
            bn: 'যেকোনো thread-এ hard fault (segfault, abort, `os._exit`, OOM kill) পুরো process শেষ করে। সাধারণ Python exception শুধু ওই thread-টাকেই শেষ করে।'
          }
        },
        {
          id: 'all-gone',
          work: { node: [ 'a_t1', 'a_mem' ], kind: 'error' },
          state: {
            a_t1: { en: 'Dead', bn: 'মৃত' },
            a_mem: { en: 'Gone', bn: 'শেষ' }
          },
          plainState: {
            a_t1: { en: 'Kitchen shut down', bn: 'রান্নাঘর বন্ধ' },
            a_mem: { en: 'Food ruined', bn: 'খাবার নষ্ট' }
          },
          title: { en: 'The whole kitchen goes', bn: 'পুরো রান্নাঘর শেষ' },
          simple: {
            en: 'The fire spreads through the whole kitchen. Cook 1 stops, and the shared fridge is ruined.',
            bn: 'আগুন পুরো রান্নাঘরে ছড়ায়। রাঁধুনি ১ থেমে যায়, আর শেয়ার করা ফ্রিজ নষ্ট হয়।'
          },
          tech: {
            en: 'All threads and all shared state die together. A bigger blast radius is the price of cheap sharing.',
            bn: 'সব thread আর সব shared state একসাথে মরে। সস্তা sharing-এর দাম হলো বড় ক্ষতির পরিসর।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'Each kitchen has its own fridge. Cooks in one kitchen share it. Kitchens talk only through the pass window, using slips.',
      bn: 'প্রতিটি রান্নাঘরের নিজের ফ্রিজ। এক রান্নাঘরের রাঁধুনিরা সেটা ভাগ করে। রান্নাঘরগুলো শুধু পাস-জানালা দিয়ে স্লিপে কথা বলে।'
    },
    twins: [
      {
        icon: 'thread',
        node: 'a_t1',
        name: { en: 'Cook 1', bn: 'রাঁধুনি ১' },
        d: {
          en: 'Works in Kitchen A. Can use anything in the shared fridge.',
          bn: 'রান্নাঘর A-তে কাজ করে। শেয়ার করা ফ্রিজের সবকিছু ব্যবহার করতে পারে।'
        }
      },
      {
        icon: 'thread',
        node: 'a_t2',
        name: { en: 'Cook 2', bn: 'রাঁধুনি ২' },
        d: {
          en: 'Same kitchen, same fridge. Sees Cook 1’s changes at once.',
          bn: 'একই রান্নাঘর, একই ফ্রিজ। রাঁধুনি ১-এর বদল সাথে সাথে দেখে।'
        }
      },
      {
        icon: 'memory',
        node: 'a_mem',
        name: { en: 'Kitchen A’s fridge', bn: 'রান্নাঘর A-র ফ্রিজ' },
        d: {
          en: 'Open to every cook in Kitchen A. Handy, but one cook’s mess spoils it for all.',
          bn: 'রান্নাঘর A-র সব রাঁধুনির জন্য খোলা। সুবিধাজনক, কিন্তু একজনের গোলমালে সবার ক্ষতি।'
        }
      },
      {
        icon: 'pipe',
        node: 'pipe',
        name: { en: 'The pass window', bn: 'পাস-জানালা' },
        d: {
          en: 'The only way for the kitchens to talk. You pass a copy on a slip, never the fridge.',
          bn: 'রান্নাঘরগুলোর কথা বলার একমাত্র উপায়। স্লিপে কপি দেওয়া যায়, ফ্রিজ নয়।'
        }
      },
      {
        icon: 'thread',
        node: 'b_main',
        name: { en: 'Kitchen B’s cook', bn: 'রান্নাঘর B-র রাঁধুনি' },
        d: {
          en: 'Works in Kitchen B with its own rules. Reads your slip and writes its own.',
          bn: 'রান্নাঘর B-তে নিজের নিয়মে কাজ করে। আপনার স্লিপ পড়ে আর নিজেরটা লেখে।'
        }
      },
      {
        icon: 'memory',
        node: 'b_mem',
        name: { en: 'Kitchen B’s fridge', bn: 'রান্নাঘর B-র ফ্রিজ' },
        d: {
          en: 'Private to Kitchen B. Cooks from Kitchen A cannot reach it.',
          bn: 'শুধু রান্নাঘর B-র। রান্নাঘর A-র রাঁধুনিরা এতে হাত দিতে পারে না।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'A fire in the kitchen', bn: 'রান্নাঘরে আগুন' },
        is: { en: 'is a crash', bn: 'মানে ক্র্যাশ' },
        d: {
          en: 'If a cook starts a fire, the whole kitchen and everyone’s food are lost. A fire next door stays next door.',
          bn: 'এক রাঁধুনি আগুন ধরালে পুরো রান্নাঘর আর সবার খাবার নষ্ট হয়। পাশের রান্নাঘরের আগুন সেখানেই থাকে।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'What are the key differences between a process and a thread?',
        bn: 'process আর thread-এর মূল পার্থক্য কী?'
      },
      short: {
        en: 'Processes have isolated memory. Threads share the memory of their process.',
        bn: 'process-এর memory আলাদা। thread তার process-এর memory ভাগ করে।'
      },
      deep: {
        en: 'A process is an OS resource container (address space, file descriptors). Threads are scheduling units inside it: they share the heap, globals and descriptors, but each has its own stack and registers.',
        bn: 'process হলো OS-এর resource container (address space, file descriptor)। thread তার ভেতরের scheduling unit: heap, globals আর descriptor ভাগ করে, কিন্তু প্রতিটির নিজের stack ও register আছে।'
      },
      redFlag: {
        en: '“Threads are just lightweight processes that share nothing.”',
        bn: '“thread হলো হালকা process, যারা কিছুই ভাগ করে না।”'
      }
    },
    {
      q: {
        en: 'Why is creating or switching threads cheaper?',
        bn: 'thread বানানো বা বদলানো কেন সস্তা?'
      },
      short: {
        en: 'There is no new address space to build or switch.',
        bn: 'নতুন address space বানাতে বা বদলাতে হয় না।'
      },
      deep: {
        en: 'Creating a process allocates page tables and starts an interpreter (spawn) or copies mappings (fork). Switching between processes also switches the address space. Threads skip all of that.',
        bn: 'process বানাতে page table বরাদ্দ করতে হয় আর interpreter চালু (spawn) বা mapping কপি (fork) করতে হয়। process বদলানোয় address space-ও বদলায়। thread-এ এসব লাগে না।'
      },
      redFlag: {
        en: '“They cost the same.”',
        bn: '“দুটোর খরচ সমান।”'
      }
    },
    {
      q: {
        en: 'How do processes communicate?',
        bn: 'process-গুলো কীভাবে যোগাযোগ করে?'
      },
      short: {
        en: 'Through IPC: pipes, sockets, queues or shared memory.',
        bn: 'IPC দিয়ে: pipe, socket, queue বা shared memory।'
      },
      deep: {
        en: 'In Python, `multiprocessing.Queue` and `Pipe` pickle objects. `shared_memory` and `Value`/`Array` avoid the copy. A `Manager` proxies objects through a server process, which is slower.',
        bn: 'Python-এ `multiprocessing.Queue` আর `Pipe` object pickle করে। `shared_memory` আর `Value`/`Array` কপি এড়ায়। `Manager` server process দিয়ে object proxy করে, যা ধীর।'
      },
      redFlag: {
        en: '“They just share variables.”',
        bn: '“তারা শুধু variable ভাগ করে।”'
      }
    },
    {
      q: {
        en: 'What happens if one thread crashes?',
        bn: 'একটা thread ক্র্যাশ করলে কী হয়?'
      },
      short: {
        en: 'It depends. An exception kills only that thread. A segfault kills the whole process.',
        bn: 'নির্ভর করে। exception শুধু ওই thread-কে মারে। segfault পুরো process-কে মারে।'
      },
      deep: {
        en: 'Python exceptions stay inside their thread. Fatal errors in C code, `os._exit` or an OOM kill take down every thread of that process.',
        bn: 'Python exception নিজের thread-এর ভেতরেই থাকে। C কোডের fatal error, `os._exit` বা OOM kill ওই process-এর সব thread শেষ করে।'
      },
      redFlag: {
        en: '“The other threads always carry on normally.”',
        bn: '“অন্য thread-গুলো সবসময় ঠিকমতো চলে।”'
      }
    },
    {
      q: {
        en: 'Why can you not just share a Python list between processes?',
        bn: 'দুটো process-এর মধ্যে Python list সরাসরি শেয়ার করা যায় না কেন?'
      },
      short: {
        en: 'Each process has its own copy of memory, so changes are not visible.',
        bn: 'প্রতিটি process-এর memory আলাদা, তাই বদল অন্যজন দেখে না।'
      },
      deep: {
        en: 'With `fork`, a child starts with a copy-on-write copy. With `spawn` or `forkserver` it rebuilds from imports. Sharing needs a `Manager`, shared memory or message passing.',
        bn: '`fork`-এ child copy-on-write কপি নিয়ে শুরু করে। `spawn` বা `forkserver`-এ import থেকে নতুন করে গড়ে ওঠে। sharing-এ `Manager`, shared memory বা message passing লাগে।'
      },
      redFlag: {
        en: '“Pass the list as an argument and mutate it.”',
        bn: '“list-টা argument হিসেবে দিন আর বদলান।”'
      }
    },
    {
      q: {
        en: 'When would you pick processes over threads in Python?',
        bn: 'Python-এ কখন thread-এর বদলে process বেছে নেবেন?'
      },
      short: {
        en: 'For CPU-bound work, or when you need fault isolation.',
        bn: 'CPU-bound কাজে, অথবা fault isolation দরকার হলে।'
      },
      deep: {
        en: 'Each process has its own GIL, so CPU-bound code scales across cores. A crash or leak stays contained and the worker can be recycled (`maxtasksperchild`). The cost is pickling and memory per process.',
        bn: 'প্রতিটি process-এর নিজের GIL, তাই CPU-bound কোড সব core-এ বাড়ে। crash বা leak আটকে থাকে আর worker আবার চালু করা যায় (`maxtasksperchild`)। দাম হলো pickling আর প্রতি process-এর memory।'
      },
      redFlag: {
        en: '“Always processes, since they are more real.”',
        bn: '“সবসময় process, কারণ ওগুলো বেশি আসল।”'
      }
    },
    {
      q: {
        en: 'What does fork do to threads?',
        bn: '`fork` thread-গুলোর সাথে কী করে?'
      },
      short: {
        en: 'Only the calling thread exists in the child.',
        bn: 'child-এ শুধু যে thread কল করেছে সেটাই থাকে।'
      },
      deep: {
        en: 'A lock held by another thread at fork time stays locked forever in the child, a classic deadlock. That is why Python warns about fork with threads, and 3.14 moved the default away from it.',
        bn: 'fork-এর সময় অন্য thread যে lock ধরে ছিল, child-এ সেটা চিরকাল locked থাকে: ক্লাসিক deadlock। তাই Python thread-সহ fork নিয়ে সতর্ক করে, আর 3.14 ডিফল্ট সরিয়ে নিয়েছে।'
      },
      redFlag: {
        en: '“Fork copies everything, including all threads.”',
        bn: '“fork সব কপি করে, সব thread-সহ।”'
      }
    },
    {
      q: {
        en: 'Does Python 3.14 change the default start method?',
        bn: 'Python 3.14 কি ডিফল্ট start method বদলেছে?'
      },
      short: {
        en: 'Yes. On Linux the default is now `forkserver`.',
        bn: 'হ্যাঁ। Linux-এ ডিফল্ট এখন `forkserver`।'
      },
      deep: {
        en: '`forkserver` starts a single-threaded server and forks clean children from it, avoiding the multithreaded-fork hazard. Targets and arguments must be picklable and importable, as with `spawn`.',
        bn: '`forkserver` একটা single-thread server চালায় আর তার থেকে পরিষ্কার child fork করে, ফলে multithreaded-fork-এর ঝুঁকি এড়ায়। `spawn`-এর মতোই target ও argument picklable আর importable হতে হয়।'
      },
      redFlag: {
        en: '“Linux still defaults to fork.”',
        bn: '“Linux-এ এখনও ডিফল্ট fork।”'
      }
    }
  ],
  cheats: [
    {
      code: 'import threading\nthreading.Thread(target=f, args=(1,)).start()',
      d: {
        en: 'A thread: shares memory, cheap to start.',
        bn: 'একটা thread: memory ভাগ করে, শুরু করা সস্তা।'
      }
    },
    {
      code: 'import multiprocessing as mp\nif __name__ == "__main__":\n    ctx = mp.get_context("spawn")\n    p = ctx.Process(target=f)\n    p.start(); p.join()',
      d: {
        en: 'A process with an explicit start method.',
        bn: 'নির্দিষ্ট start method দিয়ে একটা process।'
      }
    },
    {
      code: 'q = mp.Queue()\nq.put({"a": 1})\nq.get()',
      d: {
        en: 'Message passing between processes. The object arrives as a pickled copy.',
        bn: 'process-দের মধ্যে message passing। object pickle করা কপি হয়ে পৌঁছায়।'
      }
    },
    {
      code: 'from multiprocessing import shared_memory\nshm = shared_memory.SharedMemory(create=True, size=1024)',
      d: {
        en: 'Zero-copy shared bytes across processes. Remember `shm.close()` and `shm.unlink()`.',
        bn: 'process-দের মধ্যে zero-copy shared bytes। `shm.close()` আর `shm.unlink()` ভুলবেন না।'
      }
    },
    {
      code: 'p.exitcode  # None=running, 0=ok, -N=killed by signal N',
      d: {
        en: 'Detect a crashed child process.',
        bn: 'ক্র্যাশ করা child process ধরার উপায়।'
      }
    },
    {
      code: 'import os, threading\nos.getpid(), threading.get_ident()',
      d: {
        en: 'Threads share a pid. Processes do not.',
        bn: 'thread-গুলোর pid এক। process-গুলোর আলাদা।'
      }
    },
    {
      code: 'ps -M <pid>      # macOS\nps -T -p <pid>   # Linux',
      d: {
        en: 'List the threads of a process.',
        bn: 'একটা process-এর thread-গুলো দেখুন।'
      }
    }
  ],
  sources: [
    { label: 'Python docs: multiprocessing', url: 'https://docs.python.org/3/library/multiprocessing.html' },
    { label: 'Python docs: threading', url: 'https://docs.python.org/3/library/threading.html' },
    { label: 'Python docs: What’s New in 3.14', url: 'https://docs.python.org/3/whatsnew/3.14.html' },
    { label: 'Python docs: concurrent.futures', url: 'https://docs.python.org/3/library/concurrent.futures.html' }
  ]
}
