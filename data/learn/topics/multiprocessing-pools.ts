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
  hook: {
    en: 'A head chef cannot cook every long dish alone, so it sets up side kitchens and passes each one a copied order.',
    bn: 'হেড শেফ একা সব লম্বা পদ রাঁধতে পারে না, তাই পাশের রান্নাঘর সাজায় আর প্রতিটায় অর্ডারের কপি পাঠায়।'
  },
  story: {
    cast: {
      en: 'Ruma is cooking a big feast for her street, and her neighbour Sohel lends her his spare kitchens.',
      bn: 'রুমা পাড়ার জন্য বিশাল এক ভোজ রাঁধছে, আর প্রতিবেশী সোহেল তাকে নিজের বাড়তি রান্নাঘর ধার দেয়।'
    }
  },
  takeaway: {
    en: 'Side kitchens share nothing, so everything is copied; that pays off only for long jobs.',
    bn: 'রান্নাঘরগুলো কিছু ভাগ করে না, সব কপি হয়; তাই পোষায় শুধু লম্বা কাজে।'
  },
  words: [
    {
      term: { en: 'Head chef', bn: 'হেড শেফ' },
      d: {
        en: 'The main program. It plans the dishes and hands them out.',
        bn: 'মূল প্রোগ্রাম। সে পদগুলো ঠিক করে আর বিলি করে।'
      }
    },
    {
      term: { en: 'Side kitchen', bn: 'পাশের রান্নাঘর' },
      d: {
        en: 'A separate kitchen with one cook and its own fridge.',
        bn: 'একজন রাঁধুনি আর নিজের ফ্রিজসহ আলাদা রান্নাঘর।'
      }
    },
    {
      term: { en: 'Fridge', bn: 'ফ্রিজ' },
      d: {
        en: 'Where a kitchen keeps what it knows. Other kitchens cannot open it.',
        bn: 'রান্নাঘর যা জানে তা যেখানে রাখে। অন্য রান্নাঘর এটা খুলতে পারে না।'
      }
    },
    {
      term: { en: 'Dish', bn: 'পদ' },
      d: {
        en: 'One piece of work to be cooked, here a heavy calculation.',
        bn: 'রাঁধার মতো একটা কাজ, এখানে একটা ভারী হিসাব।'
      }
    },
    {
      term: { en: 'Slip', bn: 'স্লিপ' },
      d: {
        en: 'A written copy of an order. Only copies can travel between kitchens.',
        bn: 'অর্ডারের লেখা কপি। রান্নাঘরের মধ্যে শুধু কপিই যেতে পারে।'
      }
    },
    {
      term: { en: 'Slip and pickup windows', bn: 'স্লিপ আর পিকআপ জানালা' },
      d: {
        en: 'The slip window takes orders in. The pickup window hands finished dishes back.',
        bn: 'স্লিপ-জানালা অর্ডার নেয়। পিকআপ-জানালা তৈরি পদ ফেরত দেয়।'
      }
    }
  ],
  legend: {
    request: { en: 'Setting up a kitchen', bn: 'রান্নাঘর সাজানো' },
    queue: { en: 'A slip passed along', bn: 'স্লিপ পাঠানো' },
    result: { en: 'Finished dishes', bn: 'তৈরি পদ' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 1000, 460 ], narrow: [ 400, 540 ] },
  nodeR: { narrow: 20 },
  nodes: {
    main: {
      icon: 'server',
      name: { en: 'Parent process', bn: 'Parent process' },
      sub: { en: '__main__ guard', bn: '__main__ guard' },
      plain: {
        name: { en: 'Head chef', bn: 'হেড শেফ' },
        sub: { en: 'Hands out the dishes', bn: 'পদ বিলি করে' }
      },
      wide: [ 100, 220, 'down' ],
      narrow: [ 80, 40, 'right' ]
    },
    start: {
      icon: 'power',
      name: { en: 'Start method', bn: 'Start method' },
      sub: { en: 'forkserver / spawn', bn: 'forkserver / spawn' },
      plain: {
        name: { en: 'Kitchen setup', bn: 'রান্নাঘর সাজানো' },
        sub: { en: 'Builds new kitchens', bn: 'নতুন রান্নাঘর বানায়' }
      },
      wide: [ 300, 110, 'up' ],
      narrow: [ 80, 128, 'right' ]
    },
    tasks: {
      icon: 'queue',
      name: { en: 'Task queue', bn: 'Task queue' },
      sub: { en: 'Pickled chunks', bn: 'Pickled chunk' },
      plain: {
        name: { en: 'Slip window', bn: 'স্লিপ-জানালা' },
        sub: { en: 'Slips go in here', bn: 'স্লিপ এখানে যায়' }
      },
      wide: [ 300, 330, 'down' ],
      narrow: [ 80, 304, 'right' ]
    },
    w1: {
      icon: 'worker',
      name: { en: 'Worker 1', bn: 'Worker ১' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      plain: {
        name: { en: 'Side kitchen 1', bn: 'পাশের রান্নাঘর ১' },
        sub: { en: 'Waiting for a slip', bn: 'স্লিপের অপেক্ষায়' }
      },
      wide: [ 560, 110, 'up' ],
      narrow: [ 80, 216, 'right' ]
    },
    w2: {
      icon: 'worker',
      name: { en: 'Worker 2', bn: 'Worker ২' },
      sub: { en: 'Idle', bn: 'বসে আছে' },
      plain: {
        name: { en: 'Side kitchen 2', bn: 'পাশের রান্নাঘর ২' },
        sub: { en: 'Waiting for a slip', bn: 'স্লিপের অপেক্ষায়' }
      },
      wide: [ 560, 330, 'down' ],
      narrow: [ 80, 392, 'right' ]
    },
    results: {
      icon: 'store',
      name: { en: 'Result queue', bn: 'Result queue' },
      sub: { en: 'Pickled results', bn: 'Pickled result' },
      plain: {
        name: { en: 'Pickup window', bn: 'পিকআপ-জানালা' },
        sub: { en: 'Dishes come back here', bn: 'পদ এখানে ফেরে' }
      },
      wide: [ 800, 220, 'right' ],
      narrow: [ 80, 480, 'right' ]
    }
  },
  groups: [
    {
      id: 'pool',
      label: { en: 'Pool', bn: 'Pool' },
      plain: { en: 'Side kitchens', bn: 'পাশের রান্নাঘর' },
      wide: [ 250, 22, 710, 388 ],
      narrow: [ 36, 95, 299, 415 ]
    }
  ],
  corridors: {
    'main-start': {
      wide: [ [ 100, 220 ], [ 210, 110 ], [ 300, 110 ] ],
      narrow: [ [ 80, 40 ], [ 80, 128 ] ]
    },
    'main-tasks': {
      wide: [ [ 100, 220 ], [ 210, 330 ], [ 300, 330 ] ],
      narrow: [ [ 80, 40 ], [ 50, 40 ], [ 50, 304 ], [ 80, 304 ] ]
    },
    'start-w1': {
      wide: [ [ 300, 110 ], [ 560, 110 ] ],
      narrow: [ [ 80, 128 ], [ 80, 216 ] ]
    },
    'start-w2': {
      wide: [ [ 300, 110 ], [ 520, 330 ], [ 560, 330 ] ],
      narrow: [ [ 80, 128 ], [ 125, 173 ], [ 320, 173 ], [ 320, 347 ], [ 125, 347 ], [ 80, 392 ] ]
    },
    'tasks-w1': {
      wide: [ [ 300, 330 ], [ 520, 110 ], [ 560, 110 ] ],
      narrow: [ [ 80, 304 ], [ 80, 216 ] ]
    },
    'tasks-w2': {
      wide: [ [ 300, 330 ], [ 560, 330 ] ],
      narrow: [ [ 80, 304 ], [ 80, 392 ] ]
    },
    'w1-results': {
      wide: [ [ 560, 110 ], [ 690, 110 ], [ 800, 220 ] ],
      narrow: [ [ 80, 216 ], [ 22, 216 ], [ 22, 480 ], [ 80, 480 ] ]
    },
    'w2-results': {
      wide: [ [ 560, 330 ], [ 690, 330 ], [ 800, 220 ] ],
      narrow: [ [ 80, 392 ], [ 80, 480 ] ]
    },
    'results-main': {
      wide: [ [ 800, 220 ], [ 100, 220 ] ],
      narrow: [ [ 80, 480 ], [ 80, 522 ], [ 360, 522 ], [ 360, 8 ], [ 80, 8 ], [ 80, 40 ] ]
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
        id: 'start',
        moves: [ { edge: 'main-start', label: 'make 2 workers', plain: { en: 'Build kitchens', bn: 'রান্নাঘর বানাও' } } ],
        state: { main: { en: 'Asked for workers', bn: 'worker চেয়েছে' } },
        plainState: { main: { en: 'Asked for kitchens', bn: 'রান্নাঘর চেয়েছে' } },
        story: {
          title: { en: 'Ruma has too much to cook', bn: 'রুমার রান্না অনেক বেশি' },
          text: {
            en: 'Ruma must cook eight slow dishes for a street feast. Alone, it would take all night, so she asks her neighbour Sohel to open two spare kitchens for her.',
            bn: 'রুমাকে পাড়ার ভোজের জন্য আটটা সময়সাপেক্ষ পদ রাঁধতে হবে। একা রাঁধলে সারা রাত লাগবে, তাই সে প্রতিবেশী সোহেলকে দুটো বাড়তি রান্নাঘর খুলে দিতে বলে।'
          }
        },
        title: { en: 'The head chef asks for side kitchens', bn: 'হেড শেফ পাশের রান্নাঘর চায়' },
        simple: {
          en: 'The head chef has eight heavy dishes, too slow to cook alone. It asks Kitchen setup to build two side kitchens.',
          bn: 'হেড শেফের আটটা ভারী পদ, একা রাঁধলে ধীর। সে রান্নাঘর সাজানোকে দুটো পাশের রান্নাঘর বানাতে বলে।'
        },
        tech: {
          en: '`Pool(2)` or `ProcessPoolExecutor(max_workers=2)` asks for two processes. In 3.14 the default start method is `forkserver` on Linux and `spawn` on macOS and Windows. Both need the `__main__` guard.',
          bn: '`Pool(2)` বা `ProcessPoolExecutor(max_workers=2)` দুটো process চায়। 3.14-এ ডিফল্ট start method Linux-এ `forkserver`, macOS আর Windows-এ `spawn`। দুটোতেই `__main__` guard লাগে।'
        }
      },
      {
        id: 'workers-up',
        moves: [
          { edge: 'start-w1', label: 'new worker', plain: { en: 'Kitchen 1', bn: 'রান্নাঘর ১' } },
          { edge: 'start-w2', label: 'new worker', plain: { en: 'Kitchen 2', bn: 'রান্নাঘর ২' } }
        ],
        state: {
          start: { en: 'Started 2 workers', bn: '২টা worker চালু' },
          w1: { en: 'Ready', bn: 'তৈরি' },
          w2: { en: 'Ready', bn: 'তৈরি' },
          main: { en: 'Waiting', bn: 'অপেক্ষায়' }
        },
        plainState: {
          start: { en: 'Built 2 kitchens', bn: '২টা রান্নাঘর বানিয়েছে' },
          w1: { en: 'Ready to cook', bn: 'রাঁধতে তৈরি' },
          w2: { en: 'Ready to cook', bn: 'রাঁধতে তৈরি' },
          main: { en: 'Waiting', bn: 'অপেক্ষায়' }
        },
        story: {
          title: { en: 'Sohel opens two kitchens', bn: 'সোহেল দুটো রান্নাঘর খোলে' },
          text: {
            en: 'Sohel opens both kitchens. They are clean and ready, but the fridges are empty. Nobody there knows what Ruma planned.',
            bn: 'সোহেল দুটো রান্নাঘরই খুলে দেয়। দুটোই পরিষ্কার আর তৈরি, কিন্তু ফ্রিজ খালি। রুমা কী ভেবেছে, সেখানে কেউ জানে না।'
          }
        },
        title: { en: 'Both side kitchens open', bn: 'দুটো পাশের রান্নাঘর খোলে' },
        simple: {
          en: 'Both side kitchens open at once. Each has its own empty fridge, so it knows nothing the head chef knows.',
          bn: 'দুটো পাশের রান্নাঘর একসাথে খোলে। প্রতিটার নিজের খালি ফ্রিজ, তাই হেড শেফের জানা কিছুই তারা জানে না।'
        },
        tech: {
          en: 'Each child imports the main module, which is why the guard matters, then runs a loop that reads tasks. Process start-up is the main fixed cost of a pool.',
          bn: 'প্রতিটা child main module import করে, তাই guard জরুরি, তারপর task পড়ার একটা loop চালায়। process চালু করাই pool-এর প্রধান নির্দিষ্ট খরচ।'
        }
      },
      {
        id: 'chunk',
        moves: [ { edge: 'main-tasks', label: 'pickle chunks', plain: { en: '2 slips', bn: '২ স্লিপ' } } ],
        state: {
          main: { en: 'Submitted map()', bn: 'map() দিয়েছে' },
          tasks: { en: '[0-3] [4-7]', bn: '[0-3] [4-7]' }
        },
        plainState: {
          main: { en: 'Wrote the slips', bn: 'স্লিপ লিখেছে' },
          tasks: { en: '2 slips waiting', bn: '২টা স্লিপ অপেক্ষায়' }
        },
        story: {
          title: { en: 'Ruma writes the orders down', bn: 'রুমা অর্ডার লিখে রাখে' },
          text: {
            en: 'Ruma cannot carry her recipes next door, so she copies her orders onto two slips, four dishes each, and leaves them at the slip window.',
            bn: 'রুমা তার রান্নার খাতা পাশের বাড়িতে নিয়ে যেতে পারে না। তাই দুটো স্লিপে চারটা করে পদের অর্ডার লিখে স্লিপ-জানালায় রেখে আসে।'
          }
        },
        title: { en: 'The head chef copies orders onto slips', bn: 'হেড শেফ অর্ডার স্লিপে লেখে' },
        simple: {
          en: 'The head chef splits the dishes into two batches and copies each order onto a slip. The slips wait at the slip window.',
          bn: 'হেড শেফ পদগুলো দুই ভাগ করে প্রতিটা অর্ডার স্লিপে লিখে দেয়। স্লিপগুলো স্লিপ-জানালায় অপেক্ষা করে।'
        },
        tech: {
          en: '`map` splits the input into chunks and pickles each one. `Pool.map` picks a chunk size from the input size and worker count. `Executor.map` uses 1 unless you set `chunksize`.',
          bn: '`map` input-কে chunk-এ ভাগ করে আর প্রতিটা pickle করে। `Pool.map` input আর worker সংখ্যা দেখে chunk size ঠিক করে। `Executor.map` ১ ধরে, `chunksize` না দিলে।'
        }
      },
      {
        id: 'compute',
        moves: [
          { edge: 'tasks-w1', label: 'chunk 0', plain: { en: 'Slip 1', bn: 'স্লিপ ১' } },
          { edge: 'tasks-w2', label: 'chunk 1', plain: { en: 'Slip 2', bn: 'স্লিপ ২' } }
        ],
        state: {
          tasks: { en: 'Chunks taken', bn: 'chunk নেওয়া হয়েছে' },
          w1: { en: 'Busy [0-3]', bn: 'ব্যস্ত [0-3]' },
          w2: { en: 'Busy [4-7]', bn: 'ব্যস্ত [4-7]' }
        },
        plainState: {
          tasks: { en: 'Slips taken', bn: 'স্লিপ নেওয়া হয়েছে' },
          w1: { en: 'Cooking 1-4', bn: '১-৪ রাঁধছে' },
          w2: { en: 'Cooking 5-8', bn: '৫-৮ রাঁধছে' }
        },
        story: {
          title: { en: 'Both kitchens start cooking', bn: 'দুই রান্নাঘরে রান্না শুরু' },
          text: {
            en: 'Sohel takes one slip and his cousin takes the other. Both kitchens cook their four dishes at the same time, and the smell drifts down the street.',
            bn: 'সোহেল একটা স্লিপ নেয়, তার কাজিন নেয় আরেকটা। দুই রান্নাঘরেই একসাথে চারটা করে পদ রান্না চলে, গন্ধ ছড়িয়ে পড়ে পুরো গলিতে।'
          }
        },
        title: { en: 'Each side kitchen takes a slip', bn: 'প্রতিটা পাশের রান্নাঘর একটা স্লিপ নেয়' },
        simple: {
          en: 'Each side kitchen takes one slip and cooks its four dishes. Both cook at the same time.',
          bn: 'প্রতিটা পাশের রান্নাঘর একটা স্লিপ নিয়ে নিজের চারটা পদ রাঁধে। দুটোই একই সময়ে রাঁধে।'
        },
        tech: {
          en: 'Workers unpickle the arguments and run your function in their own interpreter, on separate cores. That is true parallelism, with no shared GIL.',
          bn: 'worker argument unpickle করে নিজের interpreter-এ আলাদা core-এ ফাংশন চালায়। এটাই আসল parallelism, কোনো shared GIL নেই।'
        }
      },
      {
        id: 'w2-first',
        moves: [ { edge: 'w2-results', label: 'r[4-7]', plain: { en: 'Dishes 5-8', bn: '৫-৮ নম্বর পদ' } } ],
        state: {
          w2: { en: 'Idle', bn: 'বসে আছে' },
          w1: { en: 'Busy', bn: 'ব্যস্ত' },
          results: { en: 'Chunk 1 first', bn: 'আগে chunk ১' }
        },
        plainState: {
          w2: { en: 'Done, resting', bn: 'শেষ, বিশ্রামে' },
          w1: { en: 'Still cooking', bn: 'এখনও রাঁধছে' },
          results: { en: 'Dishes 5-8 first', bn: 'আগে ৫-৮ নম্বর পদ' }
        },
        story: {
          title: { en: 'The second kitchen finishes first', bn: 'দ্বিতীয় রান্নাঘর আগে শেষ করে' },
          text: {
            en: 'Sohel’s cousin finishes first. The cousin writes the dishes onto a slip and sends the plates back to Ruma through the pickup window.',
            bn: 'সোহেলের কাজিন আগে শেষ করে। সে পদগুলো স্লিপে লিখে পিকআপ-জানালা দিয়ে রুমার কাছে পাঠিয়ে দেয়।'
          }
        },
        title: { en: 'Side kitchen 2 finishes first', bn: 'পাশের রান্নাঘর ২ আগে শেষ করে' },
        simple: {
          en: 'Side kitchen 2 finishes first. It copies its finished dishes onto a slip and sends them back through the pickup window.',
          bn: 'পাশের রান্নাঘর ২ আগে শেষ করে। তৈরি পদ স্লিপে লিখে পিকআপ-জানালা দিয়ে ফেরত পাঠায়।'
        },
        tech: {
          en: 'Completion order depends on timing, not on submission order. `imap_unordered` and `as_completed` hand results over in this arrival order.',
          bn: 'শেষ হওয়ার ক্রম নির্ভর করে সময়ের ওপর, জমা দেওয়ার ক্রমের ওপর নয়। `imap_unordered` আর `as_completed` এই এসে পৌঁছানোর ক্রমেই result দেয়।'
        }
      },
      {
        id: 'w1-second',
        moves: [ { edge: 'w1-results', label: 'r[0-3]', plain: { en: 'Dishes 1-4', bn: '১-৪ নম্বর পদ' } } ],
        state: {
          w1: { en: 'Idle', bn: 'বসে আছে' },
          results: { en: 'Chunk 0 second', bn: 'পরে chunk ০' }
        },
        plainState: {
          w1: { en: 'Done, resting', bn: 'শেষ, বিশ্রামে' },
          results: { en: 'Dishes 1-4 second', bn: 'পরে ১-৪ নম্বর পদ' }
        },
        story: {
          title: { en: 'Sohel finishes next', bn: 'সোহেল এরপর শেষ করে' },
          text: {
            en: 'A little later Sohel finishes too. He sends his four dishes back the same way, as a slip through the pickup window.',
            bn: 'একটু পরে সোহেলও শেষ করে। সে নিজের চারটা পদ একইভাবে, স্লিপে করে পিকআপ-জানালা দিয়ে ফেরত পাঠায়।'
          }
        },
        title: { en: 'Side kitchen 1 finishes second', bn: 'পাশের রান্নাঘর ১ পরে শেষ করে' },
        simple: {
          en: 'Side kitchen 1 finishes second and sends its dishes back the same way, as a slip through the pickup window.',
          bn: 'পাশের রান্নাঘর ১ পরে শেষ করে আর একইভাবে, স্লিপে করে পিকআপ-জানালা দিয়ে, নিজের পদ ফেরত পাঠায়।'
        },
        tech: {
          en: 'Results are pickled in the worker and unpickled in the parent. The overhead grows with the size of the result.',
          bn: 'result worker-এ pickle হয়, parent-এ unpickle হয়। result যত বড়, খরচ তত বেশি।'
        }
      },
      {
        id: 'in-order',
        moves: [ { edge: 'results-main', label: 'reassemble', plain: { en: 'Sorted', bn: 'সাজানো' } } ],
        state: {
          main: { en: 'Got [0..7] in order', bn: '[0..7] ক্রমে পেয়েছে' },
          results: { en: 'Drained', bn: 'খালি' }
        },
        plainState: {
          main: { en: 'Has all 8 dishes', bn: '৮টা পদই পেয়েছে' },
          results: { en: 'Pickup empty', bn: 'পিকআপ খালি' }
        },
        story: {
          title: { en: 'Ruma lines up the feast', bn: 'রুমা ভোজ সাজায়' },
          text: {
            en: 'Ruma collects both batches and sets all eight dishes on the table in her planned order, no matter whose kitchen finished first.',
            bn: 'রুমা দুই ভাগই নেয় আর আটটা পদ নিজের ঠিক করা ক্রমে টেবিলে সাজায়, যার রান্নাঘর আগে শেষ করুক না কেন।'
          }
        },
        title: { en: 'The head chef puts them in order', bn: 'হেড শেফ ক্রমে সাজায়' },
        simple: {
          en: 'The head chef collects both batches and puts all eight dishes in the original order, whichever kitchen finished first.',
          bn: 'হেড শেফ দুই ভাগই নেয় আর আটটা পদ আসল ক্রমে সাজায়, যে রান্নাঘরই আগে শেষ করুক।'
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
        plainState: {
          main: { en: 'Closed the kitchens', bn: 'রান্নাঘর বন্ধ করেছে' },
          w1: { en: 'Closed', bn: 'বন্ধ' },
          w2: { en: 'Closed', bn: 'বন্ধ' },
          start: { en: 'Closed', bn: 'বন্ধ' },
          tasks: { en: 'Empty', bn: 'খালি' }
        },
        story: {
          title: { en: 'The kitchens go quiet', bn: 'রান্নাঘর শান্ত হয়ে যায়' },
          text: {
            en: 'The feast is ready. Ruma thanks Sohel, and the two spare kitchens are switched off and locked for the night.',
            bn: 'ভোজ তৈরি। রুমা সোহেলকে ধন্যবাদ জানায়, আর বাড়তি দুটো রান্নাঘর বন্ধ করে রাতের জন্য তালা দেওয়া হয়।'
          }
        },
        title: { en: 'The side kitchens close', bn: 'পাশের রান্নাঘর বন্ধ হয়' },
        simple: {
          en: 'The head chef closes the side kitchens.',
          bn: 'হেড শেফ পাশের রান্নাঘর বন্ধ করে।'
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
      label: { en: 'An order with no name', bn: 'নামহীন অর্ডার' },
      whatIf: {
        en: 'What if an order cannot be copied onto a slip?',
        bn: 'যদি কোনো অর্ডার স্লিপে লিখে দেওয়া না যায়?'
      },
      branchAfter: 'workers-up',
      steps: [
        {
          id: 'pickle-fails',
          work: { node: 'main', kind: 'error' },
          state: { main: { en: 'PicklingError', bn: 'PicklingError' } },
          plainState: { main: { en: 'Cannot copy order', bn: 'অর্ডার কপি করা যায় না' } },
          story: {
            title: { en: 'One order has no name', bn: 'একটা অর্ডারের নাম নেই' },
            text: {
              en: 'One of Ruma’s orders is just “do what I did last time”, with no name. There is nothing to write on a slip, so Ruma stops, stuck.',
              bn: 'রুমার একটা অর্ডার শুধু “আগেরবার যা করেছিলাম তাই করো”, কোনো নাম নেই। স্লিপে লেখার মতো কিছু নেই, তাই রুমা আটকে গিয়ে থেমে যায়।'
            }
          },
          title: { en: 'An order cannot be copied', bn: 'অর্ডার কপি করা যায় না' },
          simple: {
            en: 'This order has no name, so there is nothing to write on a slip. The head chef stops with an error.',
            bn: 'এই অর্ডারের কোনো নাম নেই, তাই স্লিপে লেখার কিছু নেই। হেড শেফ একটা error দিয়ে থেমে যায়।'
          },
          tech: {
            en: '`pickle` sends a function by its qualified name. A lambda’s `__qualname__` is `"<lambda>"`, which cannot be looked up by import. Nested and REPL-defined functions fail too, with `PicklingError` or `Can’t pickle local object`.',
            bn: '`pickle` ফাংশন পাঠায় তার qualified নাম দিয়ে, আর lambda-র `__qualname__` হলো `"<lambda>"`, যা import করে খুঁজে পাওয়া যায় না। nested আর REPL-এ বানানো ফাংশনও `PicklingError` বা `Can’t pickle local object`-এ ব্যর্থ হয়।'
          }
        },
        {
          id: 'fix-def',
          work: { node: 'main', kind: 'result' },
          state: { main: { en: 'Fix: top-level def', bn: 'সমাধান: top-level def' } },
          plainState: { main: { en: 'Fix: give it a name', bn: 'সমাধান: নাম দেওয়া' } },
          story: {
            title: { en: 'Ruma names the dish', bn: 'রুমা পদটার নাম দেয়' },
            text: {
              en: 'Ruma writes the dish down under a proper name, like “lamb stew”. Now Sohel can look it up in his own book, and the slip carries it fine.',
              bn: 'রুমা পদটা একটা ঠিক নামে লিখে রাখে, যেমন “মাংসের স্ট্যু”। এখন সোহেল নিজের খাতায় সেটা খুঁজে পায়, আর স্লিপে তা দিব্যি যায়।'
            }
          },
          title: { en: 'Give the order a name', bn: 'অর্ডারকে একটা নাম দিন' },
          simple: {
            en: 'Write the order down under a proper name. Then any kitchen can look it up, and a slip can carry it.',
            bn: 'অর্ডারটা একটা ঠিক নামে লিখে রাখুন। তাহলে যেকোনো রান্নাঘর সেটা খুঁজে পাবে, আর স্লিপে তা যেতে পারবে।'
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
      label: { en: 'Kitchens that multiply', bn: 'বেড়ে চলা রান্নাঘর' },
      whatIf: {
        en: 'What if the setup instructions never say “head chef only”?',
        bn: 'যদি সাজানোর নির্দেশে “শুধু হেড শেফের জন্য” লেখা না থাকে?'
      },
      branchAfter: 'start',
      steps: [
        {
          id: 'reimport',
          moves: [ { edge: 'start-w1', label: 'import __main__', plain: { en: 'Setup notes', bn: 'সাজানোর নোট' } } ],
          state: {
            start: { en: 'Spawning', bn: 'চালু করছে' },
            w1: { en: 'Importing', bn: 'import করছে' }
          },
          plainState: {
            start: { en: 'Building', bn: 'বানাচ্ছে' },
            w1: { en: 'Reading the notes', bn: 'নোট পড়ছে' }
          },
          story: {
            title: { en: 'Sohel reads Ruma’s notes', bn: 'সোহেল রুমার নোট পড়ে' },
            text: {
              en: 'Sohel starts by reading Ruma’s whole notebook from the top. Its first line says: ask the neighbour for two more kitchens.',
              bn: 'সোহেল রুমার পুরো নোটবই শুরু থেকে পড়তে শুরু করে। প্রথম লাইনেই লেখা: প্রতিবেশীর কাছে আরও দুটো রান্নাঘর চাও।'
            }
          },
          title: { en: 'A new kitchen reads the setup notes', bn: 'নতুন রান্নাঘর সাজানোর নোট পড়ে' },
          simple: {
            en: 'The new kitchen starts by reading the head chef’s setup notes from the top. The first line says: build two side kitchens.',
            bn: 'নতুন রান্নাঘর হেড শেফের সাজানোর নোট শুরু থেকে পড়ে। প্রথম লাইনেই লেখা: দুটো পাশের রান্নাঘর বানাও।'
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
          plainState: {
            w1: { en: 'Stopped by error', bn: 'error-এ থেমেছে' },
            main: { en: 'Kitchens broken', bn: 'রান্নাঘর ভেঙে গেছে' }
          },
          story: {
            title: { en: 'The kitchens keep multiplying', bn: 'রান্নাঘর বাড়তেই থাকে' },
            text: {
              en: 'So Sohel asks his own neighbour for kitchens too, and that neighbour reads the same notes, again and again. The street council spots it and stops everything.',
              bn: 'তাই সোহেলও নিজের প্রতিবেশীর কাছে রান্নাঘর চায়, সেই প্রতিবেশীও একই নোট পড়ে, বারবার। পাড়ার কমিটি ব্যাপারটা ধরে ফেলে আর সবকিছু থামিয়ে দেয়।'
            }
          },
          title: { en: 'The computer stops the loop', bn: 'কম্পিউটার চক্র থামিয়ে দেয়' },
          simple: {
            en: 'So the new kitchen tries to build kitchens of its own, again and again. The computer notices and stops it with an error.',
            bn: 'তাই নতুন রান্নাঘর নিজেও রান্নাঘর বানাতে চায়, বারবার। কম্পিউটার ধরে ফেলে আর error দিয়ে থামিয়ে দেয়।'
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
      label: { en: 'A kitchen shuts down', bn: 'একটা রান্নাঘর বন্ধ হয়' },
      whatIf: {
        en: 'What if a side kitchen shuts down while cooking?',
        bn: 'যদি রান্নার মাঝে একটা পাশের রান্নাঘর বন্ধ হয়ে যায়?'
      },
      branchAfter: 'compute',
      steps: [
        {
          id: 'oom',
          work: { node: 'w1', kind: 'error' },
          state: { w1: { en: 'Dead (-9)', bn: 'মৃত (-9)' } },
          plainState: { w1: { en: 'Shut down', bn: 'বন্ধ হয়ে গেছে' } },
          story: {
            title: { en: 'A kitchen goes dark', bn: 'একটা রান্নাঘর অন্ধকার হয়ে যায়' },
            text: {
              en: 'Halfway through cooking, the power cuts out in Sohel’s kitchen. The pots go cold, and his slip is lost with everything on it.',
              bn: 'রান্নার মাঝপথে সোহেলের রান্নাঘরে হঠাৎ কারেন্ট চলে যায়। হাঁড়ি ঠান্ডা হয়ে যায়, আর তার স্লিপও সবকিছুসহ হারিয়ে যায়।'
            }
          },
          title: { en: 'A side kitchen shuts down', bn: 'একটা পাশের রান্নাঘর বন্ধ হয়' },
          simple: {
            en: 'Side kitchen 1 suddenly shuts down in the middle of its dishes. Its slip is lost with it.',
            bn: 'পাশের রান্নাঘর ১ পদ রাঁধার মাঝখানে হঠাৎ বন্ধ হয়ে যায়। সাথে ওর স্লিপও হারায়।'
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
          plainState: { main: { en: 'Dishes are lost', bn: 'পদ হারিয়েছে' } },
          story: {
            title: { en: 'Ruma waits for dishes', bn: 'রুমা পদের অপেক্ষায় থাকে' },
            text: {
              en: 'Ruma stands at the pickup window, waiting for four dishes that will never come. Nobody has told her the lights went out.',
              bn: 'রুমা পিকআপ-জানালায় দাঁড়িয়ে চারটা পদের অপেক্ষা করে, যা আর আসবে না। কেউ তাকে বলেনি যে আলো চলে গেছে।'
            }
          },
          title: { en: 'The head chef loses its dishes', bn: 'হেড শেফ পদ হারায়' },
          simple: {
            en: 'The head chef may wait forever for dishes that never come back.',
            bn: 'হেড শেফ হয়তো এমন পদের জন্য অনন্তকাল অপেক্ষা করে, যা আর ফিরবে না।'
          },
          tech: {
            en: '`ProcessPoolExecutor` raises `BrokenProcessPool`. Classic `Pool` can hang on a lost task, so use timeouts or the executor.',
            bn: '`ProcessPoolExecutor` `BrokenProcessPool` তোলে। পুরনো `Pool` হারানো task-এ আটকে থাকতে পারে, তাই timeout বা executor ব্যবহার করুন।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'The head chef cannot cook everything alone, so it sets up side kitchens. Kitchens share nothing: orders and dishes travel as copied slips.',
      bn: 'হেড শেফ একা সব রাঁধতে পারে না, তাই পাশের রান্নাঘর সাজায়। রান্নাঘরগুলো কিছুই ভাগ করে না: অর্ডার আর পদ কপি করা স্লিপে যায়।'
    },
    twins: [
      {
        icon: 'server',
        node: 'main',
        name: { en: 'Head chef', bn: 'হেড শেফ' },
        d: {
          en: 'Plans the dishes, hands out the work and collects the finished dishes.',
          bn: 'পদ ঠিক করে, কাজ বিলি করে আর তৈরি পদ জড়ো করে।'
        }
      },
      {
        icon: 'power',
        node: 'start',
        name: { en: 'Kitchen setup', bn: 'রান্নাঘর সাজানো' },
        d: {
          en: 'Builds each side kitchen, empty and ready for orders.',
          bn: 'প্রতিটা পাশের রান্নাঘর বানায়, খালি আর অর্ডারের জন্য তৈরি।'
        }
      },
      {
        icon: 'queue',
        node: 'tasks',
        name: { en: 'Slip window', bn: 'স্লিপ-জানালা' },
        d: {
          en: 'Order slips wait here until a side kitchen takes one.',
          bn: 'পাশের রান্নাঘর না নেওয়া পর্যন্ত অর্ডারের স্লিপ এখানে অপেক্ষা করে।'
        }
      },
      {
        icon: 'worker',
        node: 'w1',
        name: { en: 'Side kitchen 1', bn: 'পাশের রান্নাঘর ১' },
        d: {
          en: 'One cook working alone, with its own fridge that nobody else can open.',
          bn: 'একজন রাঁধুনি একা কাজ করে, নিজের ফ্রিজ নিয়ে, যা অন্য কেউ খুলতে পারে না।'
        }
      },
      {
        icon: 'worker',
        node: 'w2',
        name: { en: 'Side kitchen 2', bn: 'পাশের রান্নাঘর ২' },
        d: {
          en: 'Cooks at the same time in another kitchen. Whoever finishes first sends first.',
          bn: 'একই সময়ে অন্য রান্নাঘরে রাঁধে। যে আগে শেষ করে, সে আগে পাঠায়।'
        }
      },
      {
        icon: 'store',
        node: 'results',
        name: { en: 'Pickup window', bn: 'পিকআপ-জানালা' },
        d: {
          en: 'Finished dishes arrive here, in the order they were done.',
          bn: 'তৈরি পদ এখানে পৌঁছায়, যে ক্রমে শেষ হয়েছে সেই ক্রমে।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'A live cook through the window', bn: 'জানালা দিয়ে জ্যান্ত রাঁধুনি' },
        is: { en: 'is an order that cannot be copied', bn: 'মানে এমন অর্ডার যা কপি করা যায় না' },
        d: {
          en: 'The head chef tries to pass an order that has no name, or a phone line that is still open. Only a written copy fits through.',
          bn: 'হেড শেফ এমন অর্ডার পাঠাতে চায় যার নাম নেই, বা এমন ফোন-লাইন যা এখনও খোলা। শুধু লেখা কপিই জানালা দিয়ে যায়।'
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
