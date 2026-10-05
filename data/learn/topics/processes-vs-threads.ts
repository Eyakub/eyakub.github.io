import type { Topic } from '../types'
import { UI } from '../ui'

export const processesVsThreads: Topic = {
  slug: 'processes-vs-threads',
  line: 'concurrency',
  title: { en: 'Processes vs threads', bn: 'process বনাম thread' },
  summary: {
    en: 'Threads share one memory and are cheap; processes keep memory apart and must send copies.',
    bn: 'thread একই memory ভাগ করে আর সস্তা; process-এর memory আলাদা, তাই কপি পাঠাতে হয়।'
  },
  view: { wide: [ 980, 420 ], narrow: [ 400, 570 ] },
  nodes: {
    a_t1: {
      icon: 'thread',
      name: { en: 'Thread 1', bn: 'Thread ১' },
      sub: { en: 'In process A', bn: 'process A-তে' },
      wide: [ 200, 120, 'left' ],
      narrow: [ 170, 210, 'right' ]
    },
    a_t2: {
      icon: 'thread',
      name: { en: 'Thread 2', bn: 'Thread ২' },
      sub: { en: 'In process A', bn: 'process A-তে' },
      wide: [ 200, 330, 'left' ],
      narrow: [ 170, 90, 'right' ]
    },
    a_mem: {
      icon: 'memory',
      name: { en: 'Memory A', bn: 'Memory A' },
      sub: { en: 'x = ?', bn: 'x = ?' },
      wide: [ 380, 225, 'up' ],
      narrow: [ 50, 150, 'right' ]
    },
    pipe: {
      icon: 'pipe',
      name: { en: 'Pipe / Queue', bn: 'Pipe / Queue' },
      sub: { en: 'Pickled bytes', bn: 'Pickle করা bytes' },
      wide: [ 640, 225, 'down' ],
      narrow: [ 170, 310, 'right' ]
    },
    b_main: {
      icon: 'thread',
      name: { en: 'Process B', bn: 'Process B' },
      sub: { en: 'Own interpreter', bn: 'নিজের interpreter' },
      wide: [ 790, 120, 'right' ],
      narrow: [ 170, 415, 'right' ]
    },
    b_mem: {
      icon: 'memory',
      name: { en: 'Memory B', bn: 'Memory B' },
      sub: { en: 'x = ?', bn: 'x = ?' },
      wide: [ 790, 330, 'right' ],
      narrow: [ 170, 495, 'right' ]
    }
  },
  groups: [
    {
      id: 'proc-a',
      label: { en: 'Process A', bn: 'Process A' },
      wide: [ 40, 70, 430, 310 ],
      narrow: [ 10, 40, 320, 210 ]
    },
    {
      id: 'proc-b',
      label: { en: 'Process B', bn: 'Process B' },
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
        moves: [ { edge: 'a_t1-a_mem', label: 'set x=1' } ],
        state: { a_mem: { en: 'x = 1', bn: 'x = 1' } },
        title: { en: 'One thread writes x', bn: 'একটা thread x লেখে' },
        simple: {
          en: 'One worker writes a note on the shared whiteboard.',
          bn: 'একজন worker শেয়ার করা হোয়াইটবোর্ডে একটা নোট লেখে।'
        },
        tech: {
          en: 'Thread 1 stores into a heap object. Threads in one process share one address space: globals, heap and open files.',
          bn: 'Thread ১ একটা heap object-এ মান রাখে। একই process-এর thread-গুলো একই address space ভাগ করে: globals, heap আর খোলা ফাইল।'
        }
      },
      {
        id: 't2-reads',
        moves: [ { edge: 'a_mem-a_t2', label: 'read x' } ],
        state: { a_t2: { en: 'Sees x = 1', bn: 'x = 1 দেখে' } },
        title: { en: 'The other thread reads it', bn: 'অন্য thread সেটা পড়ে' },
        simple: {
          en: 'The second worker reads it instantly. Nothing was copied or sent.',
          bn: 'দ্বিতীয় worker সেটা সাথে সাথে পড়ে। কিছু কপি বা পাঠাতে হয়নি।'
        },
        tech: {
          en: 'Thread 2 reads the same object directly: no copy, no serialization, no IPC. Cheap, but shared mutable state needs synchronization.',
          bn: 'Thread ২ একই object সরাসরি পড়ে: কপি নেই, serialization নেই, IPC নেই। সস্তা, কিন্তু shared mutable state-এ synchronization লাগে।'
        }
      },
      {
        id: 't2-writes',
        moves: [ { edge: 'a_t2-a_mem', label: 'set x=2' } ],
        state: {
          a_mem: { en: 'x = 2', bn: 'x = 2' },
          a_t2: { en: 'Wrote x = 2', bn: 'x = 2 লিখেছে' }
        },
        title: { en: 'Either thread can change it', bn: 'যেকোনো thread বদলাতে পারে' },
        simple: {
          en: 'Either worker can change the whiteboard, and everyone in the office sees it.',
          bn: 'যেকোনো worker হোয়াইটবোর্ড বদলাতে পারে, আর অফিসের সবাই তা দেখে।'
        },
        tech: {
          en: 'Writes are visible to every thread of A at once. That is both the power and the hazard of threads.',
          bn: 'A-র সব thread লেখাটা একসাথে দেখে। এটাই thread-এর শক্তি, আবার ঝুঁকিও।'
        }
      },
      {
        id: 'send',
        moves: [ { edge: 'a_t1-pipe', label: 'pickle(x)' } ],
        state: { pipe: { en: 'Bytes in flight', bn: 'bytes যাচ্ছে' } },
        title: { en: 'To reach B, send a copy', bn: 'B-তে পৌঁছাতে কপি পাঠাতে হয়' },
        simple: {
          en: 'To tell another office, you write a letter, a copy. You cannot hand over the whiteboard.',
          bn: 'অন্য অফিসকে জানাতে চিঠি লিখতে হয়, মানে একটা কপি। হোয়াইটবোর্ড তুলে দেওয়া যায় না।'
        },
        tech: {
          en: 'Processes have separate address spaces. A `multiprocessing` Queue or Pipe pickles the object into bytes and sends them over an OS pipe or socket.',
          bn: 'process-গুলোর address space আলাদা। `multiprocessing`-এর Queue বা Pipe object-কে pickle করে bytes বানায় আর OS pipe বা socket দিয়ে পাঠায়।'
        }
      },
      {
        id: 'arrive',
        moves: [ { edge: 'pipe-b_main', label: 'bytes' } ],
        state: {
          pipe: { en: 'Pickled bytes', bn: 'Pickle করা bytes' },
          b_main: { en: 'Receiving', bn: 'নিচ্ছে' }
        },
        title: { en: 'The bytes arrive', bn: 'bytes পৌঁছায়' },
        simple: {
          en: 'The letter arrives at the other office.',
          bn: 'চিঠিটা অন্য অফিসে পৌঁছায়।'
        },
        tech: {
          en: 'The receiving process reads the bytes. Cost grows with object size, and the object must be picklable.',
          bn: 'গ্রহণকারী process bytes পড়ে। object যত বড়, খরচ তত বেশি, আর object-টা picklable হতে হবে।'
        }
      },
      {
        id: 'unpickle',
        work: { node: 'b_main', kind: 'result' },
        state: {
          b_main: { en: 'Unpickled', bn: 'খোলা হয়েছে' },
          b_mem: { en: 'x = 2 (copy)', bn: 'x = 2 (কপি)' }
        },
        title: { en: 'B rebuilds its own copy', bn: 'B নিজের কপি বানায়' },
        simple: {
          en: 'The other office copies the number onto its own whiteboard.',
          bn: 'অন্য অফিস সংখ্যাটা নিজের হোয়াইটবোর্ডে টুকে নেয়।'
        },
        tech: {
          en: 'Unpickling builds a new object in B’s heap. It is a copy, not the same object. For real sharing, use `shared_memory` or `Value`/`Array`.',
          bn: 'unpickle করলে B-র heap-এ নতুন object তৈরি হয়। এটা কপি, একই object নয়। সত্যিকারের sharing-এ `shared_memory` বা `Value`/`Array` লাগে।'
        }
      },
      {
        id: 'b-writes',
        moves: [ { edge: 'b_main-b_mem', label: 'x=99' } ],
        state: {
          b_mem: { en: 'x = 99', bn: 'x = 99' },
          b_main: { en: 'Own interpreter', bn: 'নিজের interpreter' }
        },
        title: { en: 'B changes its copy', bn: 'B নিজের কপি বদলায়' },
        simple: {
          en: 'Office B changes its own copy.',
          bn: 'অফিস B নিজের কপিটা বদলায়।'
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
        title: { en: 'A is untouched', bn: 'A অক্ষত' },
        simple: {
          en: 'Office A’s whiteboard still says 2. That is isolation.',
          bn: 'অফিস A-র হোয়াইটবোর্ডে এখনও ২। এটাই isolation।'
        },
        tech: {
          en: 'Isolation is the main benefit of processes: no accidental sharing, no memory data races, and each process has its own GIL.',
          bn: 'process-এর প্রধান সুবিধা isolation: ভুলে sharing হয় না, memory-তে data race নেই, আর প্রতিটি process-এর নিজের GIL আছে।'
        }
      },
      {
        id: 'reply',
        moves: [ { edge: 'b_main-pipe', label: 'result' } ],
        state: { pipe: { en: 'Bytes in flight', bn: 'bytes যাচ্ছে' } },
        title: { en: 'B sends a reply', bn: 'B উত্তর পাঠায়' },
        simple: {
          en: 'Office B sends a reply letter back.',
          bn: 'অফিস B একটা উত্তরের চিঠি ফেরত পাঠায়।'
        },
        tech: {
          en: 'Results return the same way: pickled, then copied. This IPC cost is why chunking work into larger tasks matters.',
          bn: 'ফলাফলও একই পথে ফেরে: pickle করে, তারপর কপি হয়ে। এই IPC খরচের কারণেই কাজ বড় chunk-এ ভাগ করা জরুরি।'
        }
      },
      {
        id: 'reply-lands',
        moves: [ { edge: 'pipe-a_t1', label: 'copy of result' } ],
        state: {
          pipe: { en: 'Pickled bytes', bn: 'Pickle করা bytes' },
          a_t1: { en: 'Got a copy', bn: 'কপি পেয়েছে' }
        },
        title: { en: 'A receives a copy', bn: 'A একটা কপি পায়' },
        simple: {
          en: 'The reply arrives as a copy, never as B’s own whiteboard.',
          bn: 'উত্তর কপি হয়েই আসে, B-র নিজের হোয়াইটবোর্ড কখনও আসে না।'
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
      label: { en: 'A process crashes', bn: 'একটা process ক্র্যাশ করে' },
      branchAfter: 'b-writes',
      steps: [
        {
          id: 'b-dies',
          work: { node: [ 'b_main', 'b_mem' ], kind: 'error' },
          state: {
            b_main: { en: 'Dead (signal 9)', bn: 'মৃত (signal 9)' },
            b_mem: { en: 'Gone', bn: 'শেষ' }
          },
          title: { en: 'Process B dies', bn: 'Process B মারা যায়' },
          simple: {
            en: 'Office B burns down. Its notes are gone, but nothing outside it is touched.',
            bn: 'অফিস B পুড়ে যায়। তার নোট শেষ, কিন্তু বাইরের কিছুতে আঁচ লাগে না।'
          },
          tech: {
            en: 'A segfault or the OOM killer ends the process, and the OS reclaims its memory. A signal death shows in the parent as a negative `exitcode`: minus the signal number.',
            bn: 'segfault বা OOM killer process শেষ করে, আর OS তার memory ফেরত নেয়। signal-এ মারা গেলে parent ঋণাত্মক `exitcode` দেখে: মাইনাস signal নম্বর।'
          }
        },
        {
          id: 'a-survives',
          work: { node: 'a_t1', kind: 'result' },
          state: { a_t1: { en: 'Alive, sees EOF', bn: 'বেঁচে, EOF পায়' } },
          title: { en: 'Process A carries on', bn: 'Process A চলতে থাকে' },
          simple: {
            en: 'Office A is fine. It just notices that B stopped answering.',
            bn: 'অফিস A ঠিকই আছে। সে শুধু টের পায় B আর সাড়া দিচ্ছে না।'
          },
          tech: {
            en: 'The parent gets EOF or `BrokenPipeError`, or `BrokenProcessPool` from `ProcessPoolExecutor`, and can restart the worker. Process isolation is fault isolation.',
            bn: 'parent EOF বা `BrokenPipeError` পায়, অথবা `ProcessPoolExecutor` থেকে `BrokenProcessPool`, আর worker আবার চালু করতে পারে। process isolation মানেই fault isolation।'
          }
        }
      ]
    },
    {
      id: 'thread-crash',
      label: { en: 'A thread crashes', bn: 'একটা thread ক্র্যাশ করে' },
      branchAfter: 't2-writes',
      steps: [
        {
          id: 't2-segfault',
          work: { node: 'a_t2', kind: 'error' },
          state: { a_t2: { en: 'SIGSEGV', bn: 'SIGSEGV' } },
          title: { en: 'A thread hits a hard fault', bn: 'একটা thread ভয়ানক fault-এ পড়ে' },
          simple: {
            en: 'One worker in the shared office knocks over a pillar.',
            bn: 'শেয়ার করা অফিসে একজন worker একটা থাম ফেলে দেয়।'
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
          title: { en: 'The whole process goes', bn: 'পুরো process শেষ' },
          simple: {
            en: 'The whole office comes down, including everyone else’s work.',
            bn: 'পুরো অফিস ধসে পড়ে, সবার কাজসহ।'
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
      en: 'A process is a separate apartment with its own kitchen. Threads are roommates in one apartment sharing the fridge.',
      bn: 'process হলো নিজের রান্নাঘরসহ আলাদা একটা অ্যাপার্টমেন্ট। thread হলো একই অ্যাপার্টমেন্টে ফ্রিজ ভাগ করা রুমমেট।'
    },
    twins: [
      {
        icon: 'thread',
        node: 'a_t1',
        name: { en: 'The first roommate', bn: 'প্রথম রুমমেট' },
        d: {
          en: 'Lives in apartment A. Can use anything in the shared fridge.',
          bn: 'অ্যাপার্টমেন্ট A-তে থাকে। শেয়ার করা ফ্রিজের সবকিছু ব্যবহার করতে পারে।'
        }
      },
      {
        icon: 'thread',
        node: 'a_t2',
        name: { en: 'The second roommate', bn: 'দ্বিতীয় রুমমেট' },
        d: {
          en: 'Same apartment, same fridge. Sees the first roommate’s changes at once.',
          bn: 'একই অ্যাপার্টমেন্ট, একই ফ্রিজ। প্রথম রুমমেটের বদল সাথে সাথে দেখে।'
        }
      },
      {
        icon: 'memory',
        node: 'a_mem',
        name: { en: 'The shared fridge', bn: 'শেয়ার করা ফ্রিজ' },
        d: {
          en: 'Everything inside is open to every roommate. Handy, but they can also clash over it.',
          bn: 'ভেতরের সবকিছু সব রুমমেটের জন্য খোলা। সুবিধাজনক, কিন্তু নিয়ে ঝগড়াও হতে পারে।'
        }
      },
      {
        icon: 'pipe',
        node: 'pipe',
        name: { en: 'Notes under the door', bn: 'দরজার নিচ দিয়ে নোট' },
        d: {
          en: 'The only way to talk to the neighbour. You pass a copy of the note, never the fridge.',
          bn: 'প্রতিবেশীর সাথে কথা বলার একমাত্র উপায়। নোটের কপি দেওয়া যায়, ফ্রিজ নয়।'
        }
      },
      {
        icon: 'thread',
        node: 'b_main',
        name: { en: 'The neighbour', bn: 'প্রতিবেশী' },
        d: {
          en: 'Lives in apartment B with their own rules. Reads your note and writes their own.',
          bn: 'অ্যাপার্টমেন্ট B-তে নিজের নিয়মে থাকে। আপনার নোট পড়ে আর নিজেরটা লেখে।'
        }
      },
      {
        icon: 'memory',
        node: 'b_mem',
        name: { en: 'The neighbour’s fridge', bn: 'প্রতিবেশীর ফ্রিজ' },
        d: {
          en: 'Private to apartment B. Your roommates cannot reach it.',
          bn: 'শুধু অ্যাপার্টমেন্ট B-র। আপনার রুমমেটরা এতে হাত দিতে পারে না।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'The stove left on', bn: 'চুলা জ্বালানো থেকে যাওয়া' },
        is: { en: 'is a crash', bn: 'মানে ক্র্যাশ' },
        d: {
          en: 'If a roommate leaves the stove on, the whole apartment and everyone’s food burn. A neighbour’s fire stays in their apartment.',
          bn: 'এক রুমমেট চুলা জ্বালিয়ে রাখলে পুরো অ্যাপার্টমেন্ট আর সবার খাবার পোড়ে। প্রতিবেশীর আগুন তার অ্যাপার্টমেন্টেই থাকে।'
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
      code: 'import multiprocessing as mp\np = mp.get_context("spawn").Process(target=f)\np.start(); p.join()',
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
