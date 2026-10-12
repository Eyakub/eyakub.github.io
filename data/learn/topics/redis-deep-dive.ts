import type { Topic } from '../types'

export const redisDeepDive: Topic = {
  slug: 'redis-deep-dive',
  line: 'async',
  title: { en: 'Redis deep-dive', bn: 'Redis গভীরে' },
  summary: {
    en: 'Cache-aside checks Redis, and on a miss the app loads the database and stores a copy with a TTL. A memory cap follows maxmemory-policy, which defaults to noeviction. Snapshots are on by default. Pub/sub does not keep the message.',
    bn: 'ক্যাশ-অ্যাসাইড আগে Redis দেখে, মিস হলে অ্যাপ ডেটাবেস থেকে এনে TTL সহ কপি রাখে। মেমরির সীমা maxmemory-policy মেনে চলে, যার ডিফল্ট noeviction। স্ন্যাপশট ডিফল্টে চালু। পাব-সাব বার্তা রেখে দেয় না।'
  },
  hook: {
    en: 'Leela checks a small shelf before she walks back to the storeroom.',
    bn: 'লীলা গুদামে যাওয়ার আগে ছোট তাকটা দেখে নেয়।'
  },
  story: {
    cast: {
      en: 'Leela keeps a small shelf by the till and a storeroom in the back. A notebook can record the shelf, and someone nearby may be listening.',
      bn: 'লীলা কাউন্টারের পাশে একটা ছোট তাক রাখে, পেছনে গুদাম। একটা খাতা তাকের হিসাব রাখতে পারে, আর কাছে কেউ শুনতে পারে।'
    }
  },
  takeaway: {
    en: 'The shelf is a copy with a timer, not the storeroom, and a shout is gone if nobody is listening.',
    bn: 'তাকটা সময়সীমাসহ একটা কপি, গুদাম নয়, আর কেউ না শুনলে চিৎকার হারিয়ে যায়।'
  },
  words: [
    {
      term: { en: 'The shelf (Redis)', bn: 'তাক (Redis)' },
      d: { en: 'A fast memory copy in front of the real record.', bn: 'আসল রেকর্ডের সামনে একটা দ্রুত মেমরির কপি।' }
    },
    {
      term: { en: 'A use-by label (TTL)', bn: 'ব্যবহারের মেয়াদ (TTL)' },
      d: { en: 'How long that copy may stay before it is dropped.', bn: 'কপিটা কতক্ষণ থাকবে, তারপর ফেলে দেওয়া হবে।' }
    },
    {
      term: { en: 'A full shelf (eviction)', bn: 'ভরা তাক (eviction)' },
      d: { en: 'The rule for a write when memory is already full.', bn: 'মেমরি ভরা থাকলে লেখার সময় কী নিয়ম চলবে।' }
    },
    {
      term: { en: 'A photo (RDB)', bn: 'একটা ছবি (RDB)' },
      d: { en: 'A point-in-time picture that can miss later changes.', bn: 'এক মুহূর্তের ছবি, পরের বদল বাদ পড়তে পারে।' }
    },
    {
      term: { en: 'A shout (pub/sub)', bn: 'চিৎকার (pub/sub)' },
      d: { en: 'Whoever is here hears it, and then it is gone.', bn: 'যে এখানে আছে সে শোনে, তারপর সেটা থাকে না।' }
    }
  ],
  legend: {
    request: { en: 'Checking or copying', bn: 'দেখা বা কপি করা' },
    queue: { en: 'Waiting or empty', bn: 'অপেক্ষা বা খালি' },
    result: { en: 'Written down', bn: 'লেখা হলো' },
    error: { en: 'Stale or slammed', bn: 'পুরনো বা চাপে' }
  },
  view: { wide: [1000, 480], narrow: [400, 660] },
  nodeR: { narrow: 20 },
  nodes: {
    app: {
      icon: 'user',
      name: { en: 'App', bn: 'অ্যাপ' },
      sub: { en: 'Cache-aside', bn: 'ক্যাশ-অ্যাসাইড' },
      plain: { name: { en: 'Leela', bn: 'লীলা' }, sub: { en: 'At the till', bn: 'কাউন্টারে' } },
      wide: [170, 150, 'up'],
      narrow: [100, 100, 'up']
    },
    shelf: {
      icon: 'memory',
      name: { en: 'Redis', bn: 'Redis' },
      sub: { en: 'In memory', bn: 'মেমরিতে' },
      plain: { name: { en: 'The shelf', bn: 'তাক' }, sub: { en: 'In front', bn: 'সামনে' } },
      wide: [500, 150, 'up'],
      narrow: [200, 270, 'down']
    },
    room: {
      icon: 'archive',
      name: { en: 'Database', bn: 'ডেটাবেস' },
      sub: { en: 'Source of truth', bn: 'আসল রেকর্ড' },
      plain: { name: { en: 'The storeroom', bn: 'গুদাম' }, sub: { en: 'In the back', bn: 'পেছনে' } },
      wide: [170, 370, 'down'],
      narrow: [100, 480, 'down']
    },
    disk: {
      icon: 'folder',
      name: { en: 'Disk', bn: 'ডিস্ক' },
      sub: { en: 'Optional copy', bn: 'ঐচ্ছিক কপি' },
      plain: { name: { en: 'The notebook', bn: 'খাতা' }, sub: { en: 'Blank', bn: 'ফাঁকা' } },
      wide: [500, 370, 'down'],
      narrow: [280, 480, 'down']
    },
    ear: {
      icon: 'mail',
      name: { en: 'Subscriber', bn: 'সাবস্ক্রাইবার' },
      sub: { en: 'Optional', bn: 'ঐচ্ছিক' },
      plain: { name: { en: 'A listener', bn: 'শ্রোতা' }, sub: { en: 'Nearby', bn: 'কাছে' } },
      wide: [830, 150, 'up'],
      narrow: [290, 100, 'up']
    }
  },
  corridors: {
    'app-shelf': { wide: [[170, 150], [500, 150]], narrow: [[100, 100], [200, 270]] },
    'app-room': { wide: [[170, 150], [170, 370]], narrow: [[100, 100], [100, 480]] },
    'shelf-disk': { wide: [[500, 150], [500, 370]], narrow: [[200, 270], [280, 480]] },
    'shelf-ear': { wide: [[500, 150], [830, 150]], narrow: [[200, 270], [290, 100]] }
  },
  edges: {
    'app-shelf': { from: 'app', to: 'shelf', kind: 'request' },
    'shelf-app': { from: 'shelf', to: 'app', kind: 'queue' },
    'app-room': { from: 'app', to: 'room', kind: 'request' },
    'shelf-disk': { from: 'shelf', to: 'disk', kind: 'result' },
    'shelf-ear': { from: 'shelf', to: 'ear', kind: 'request' }
  },
  main: {
    label: { en: 'Fill the shelf', bn: 'তাক ভরা' },
    steps: [
      {
        id: 'look',
        moves: [{ edge: 'app-shelf', label: 'GET jar', plain: { en: 'On the shelf', bn: 'তাকে' } }],
        state: { shelf: { en: 'Lookup', bn: 'খোঁজ' } },
        plainState: { shelf: { en: 'Checking', bn: 'দেখছে' } },
        story: {
          title: { en: 'Check the shelf first', bn: 'আগে তাক দেখুন' },
          text: {
            en: 'Leela reaches for the jar on the shelf before she walks back to the storeroom.',
            bn: 'লীলা গুদামে যাওয়ার আগে তাকের বয়মের দিকে হাত বাড়ায়।'
          }
        },
        title: { en: 'Leela checks the shelf first', bn: 'লীলা আগে তাক দেখে' },
        simple: {
          en: 'She looks on the shelf before walking back to the storeroom.',
          bn: 'গুদামে যাওয়ার আগে সে তাকটা দেখে।'
        },
        tech: {
          en: 'The app does cache-aside. A plain `GET` is constant time. One thread runs commands, so a long command makes every other client wait. I/O threads can move socket work off that thread.',
          bn: 'অ্যাপ ক্যাশ-অ্যাসাইড করে। সাধারণ `GET` ধ্রুব সময়ে হয়। এক থ্রেড কমান্ড চালায়, তাই লম্বা কমান্ডে বাকি ক্লায়েন্ট অপেক্ষা করে। I/O থ্রেড সকেটের কাজ সেই থ্রেড থেকে সরাতে পারে।'
        }
      },
      {
        id: 'miss',
        moves: [{ edge: 'shelf-app', label: 'nil', plain: { en: 'Not there', bn: 'নেই' } }],
        state: { shelf: { en: 'nil', bn: 'nil' } },
        plainState: { shelf: { en: 'Empty', bn: 'খালি' } },
        story: {
          title: { en: 'The shelf is empty', bn: 'তাক খালি' },
          text: {
            en: 'Leela looks and the jar is not on the shelf. She still has to walk to the storeroom.',
            bn: 'লীলা দেখে বয়ম তাকে নেই। তাকে তবু গুদামে যেতে হয়।'
          }
        },
        title: { en: 'The shelf does not have it', bn: 'তাকে সেটা নেই' },
        simple: {
          en: 'The jar is not on the shelf, so the copy was never there.',
          bn: 'বয়ম তাকে নেই, মানে কপি কখনো রাখা হয়নি।'
        },
        tech: {
          en: 'A miss returns nil. The app, not Redis, decides to load the database. Redis does not stay in sync with it.',
          bn: 'মিস nil ফেরত দেয়। ডেটাবেস থেকে আনবে কি না, সেটা অ্যাপ ঠিক করে, Redis নয়। Redis সেটার সঙ্গে নিজে থেকে মিলে থাকে না।'
        }
      },
      {
        id: 'fetch',
        moves: [{ edge: 'app-room', label: 'SELECT', plain: { en: 'From the back', bn: 'পেছন থেকে' } }],
        state: { room: { en: 'Reading', bn: 'পড়ছে' } },
        plainState: { room: { en: 'Open', bn: 'খোলা' } },
        story: {
          title: { en: 'Walk to the storeroom', bn: 'গুদামে যান' },
          text: {
            en: 'Leela leaves the till and brings the jar from the storeroom. That room is the real record.',
            bn: 'লীলা কাউন্টার ছেড়ে গুদাম থেকে বয়ম আনে। সেই ঘরই আসল রেকর্ড।'
          }
        },
        title: { en: 'She walks back to the storeroom', bn: 'সে গুদামে যায়' },
        simple: {
          en: 'The storeroom is the real record. The shelf was only a copy.',
          bn: 'গুদামই আসল রেকর্ড। তাক শুধু একটা কপি ছিল।'
        },
        tech: {
          en: 'This is the source of truth. Cache-aside means the app owns the miss, the load, and the later copy. Read-through would hide that inside the cache.',
          bn: 'এটাই আসল উৎস। ক্যাশ-অ্যাসাইডে মিস, আনা, আর পরের কপি অ্যাপের দায়। রিড-থ্রু সেটা ক্যাশের ভেতরে লুকিয়ে রাখত।'
        }
      },
      {
        id: 'copy',
        moves: [{ edge: 'app-shelf', label: 'SET EX 300', plain: { en: 'With a timer', bn: 'সময়সীমাসহ' } }],
        state: { shelf: { en: 'TTL 300s', bn: 'TTL ৩০০সে' } },
        plainState: { shelf: { en: 'Copy with a timer', bn: 'সময়সীমাসহ কপি' } },
        story: {
          title: { en: 'Copy it, with a timer', bn: 'কপি, সময়সীমাসহ' },
          text: {
            en: 'Leela puts the jar on the shelf and sticks on a use-by label. After that the copy should go.',
            bn: 'লীলা বয়ম তাকে রাখে আর একটা মেয়াদের স্টিকার লাগায়। তারপর কপি সরে যাওয়া উচিত।'
          }
        },
        title: { en: 'She puts a copy back with a timer', bn: 'সে সময়সীমাসহ কপি রাখে' },
        simple: {
          en: 'A copy goes on the shelf with a use-by time, so it does not sit there forever.',
          bn: 'একটা কপি মেয়াদসহ তাকে ওঠে, যাতে চিরকাল বসে না থাকে।'
        },
        tech: {
          en: '`SET` with `EX` stores the copy and a TTL in seconds. On a later write, delete the key. A timer alone can still leave a stale copy until it ends.',
          bn: '`EX` সহ `SET` কপি আর সেকেন্ডে TTL রাখে। পরে লিখলে কী মুছে দিন। শুধু টাইমার থাকলে মেয়াদ শেষ হওয়া পর্যন্ত পুরনো কপি থাকতে পারে।'
        }
      },
      {
        id: 'again',
        moves: [{ edge: 'app-shelf', label: 'GET hit', plain: { en: 'Found it', bn: 'পেয়ে গেছে' } }],
        state: { shelf: { en: 'Hit', bn: 'হিট' } },
        plainState: { shelf: { en: 'Found', bn: 'পেয়েছে' } },
        story: {
          title: { en: 'The next look hits', bn: 'পরের দেখায় পায়' },
          text: {
            en: 'The next time, the jar is already on the shelf. Nobody walks to the storeroom.',
            bn: 'পরের বার বয়ম আগে থেকেই তাকে। কেউ গুদামে যায় না।'
          }
        },
        title: { en: 'The next look finds the jar', bn: 'পরের দেখায় বয়ম মেলে' },
        simple: {
          en: 'The next person finds the jar on the shelf and does not walk to the storeroom.',
          bn: 'পরের জন তাকেই বয়ম পায়, গুদামে যায় না।'
        },
        tech: {
          en: 'A hit skips the database. `INFO stats` counts keyspace hits and misses. The Celery page is the job queue, not this shelf.',
          bn: 'হিট ডেটাবেস এড়ায়। `INFO stats` কি-স্পেস হিট আর মিস গোনে। Celery-র পাতা কাজের কিউ, এই তাক নয়।'
        }
      },
      {
        id: 'full',
        work: { node: 'shelf', kind: 'queue' },
        state: { shelf: { en: 'At the cap', bn: 'সীমায়' } },
        plainState: { shelf: { en: 'Full', bn: 'ভরা' } },
        story: {
          title: { en: 'No room for a new jar', bn: 'নতুন বয়মের জায়গা নেই' },
          text: {
            en: 'The shelf is full. A new jar cannot just land on top unless something else is cleared or refused.',
            bn: 'তাক ভরা। নতুন বয়ম এমনি এমনি উঠতে পারে না, কিছু সরিয়ে দিতে হয় বা নিতে অস্বীকার করতে হয়।'
          }
        },
        title: { en: 'The shelf is full', bn: 'তাক ভরা' },
        simple: {
          en: 'When the shelf has a size limit, new jars need a rule for what gets thrown out.',
          bn: 'তাকের আকারের সীমা থাকলে নতুন বয়মের জন্য কী ফেলা হবে, তার নিয়ম লাগে।'
        },
        tech: {
          en: 'No `maxmemory` is the 64-bit default, so nothing is evicted. The default `noeviction` then rejects writes that need memory. Prefer `allkeys-lru` for a cache. TTL-only policies refuse writes when no key has a TTL. LRU and LFU sample keys.',
          bn: '`maxmemory` না থাকাই 64-বিটের ডিফল্ট, তাই কিছু ফেলা হয় না। ডিফল্ট `noeviction` তখন মেমরি লাগে এমন লেখা ফিরিয়ে দেয়। ক্যাশে `allkeys-lru` নিন। শুধু TTL-ওয়ালা নীতি তখন লেখা ফিরিয়ে দেয় যখন কোনো কি-র TTL নেই। LRU আর LFU কিছু কি নমুনা করে।'
        }
      },
      {
        id: 'save',
        moves: [{ edge: 'shelf-disk', label: 'BGSAVE', plain: { en: 'Write it down', bn: 'লিখে রাখুন' } }],
        state: { disk: { en: 'dump.rdb', bn: 'dump.rdb' } },
        plainState: { disk: { en: 'A photo', bn: 'একটা ছবি' } },
        story: {
          title: { en: 'Write the shelf down', bn: 'তাক লিখে রাখুন' },
          text: {
            en: 'A photo of the shelf misses whatever moved after the photo. A list of every move can miss about one second.',
            bn: 'তাকের ছবি তোলার পর যা বদলালো সেটা বাদ পড়ে। প্রতিটি চালার তালিকা প্রায় এক সেকেন্ড হারাতে পারে।'
          }
        },
        title: { en: 'Someone writes the shelf down', bn: 'কেউ তাক লিখে রাখে' },
        simple: {
          en: 'A photo of the shelf, or a list of every move, means a restart is not empty.',
          bn: 'তাকের একটা ছবি, বা প্রতিটি চালার তালিকা, মানে রিস্টার্টে সব ফাঁকা নয়।'
        },
        tech: {
          en: 'Snapshots to `dump.rdb` are on by default and can lose minutes. The log stays off until `appendonly yes`, and its default fsync can drop about one second. Use both for stronger safety. Since 7.0 the log is a base file, increments, and a manifest.',
          bn: '`dump.rdb`-তে স্ন্যাপশট ডিফল্টে চালু, আর মিনিট হারাতে পারে। লগ `appendonly yes` না করা পর্যন্ত বন্ধ, আর ডিফল্ট fsync প্রায় এক সেকেন্ড ফেলতে পারে। বেশি নিরাপত্তায় দুটোই ব্যবহার করুন। 7.0 থেকে লগ একটা বেস ফাইল, ইনক্রিমেন্ট, আর একটা ম্যানিফেস্ট।'
        }
      },
      {
        id: 'shout',
        moves: [
          { edge: 'app-shelf', label: 'PUBLISH', plain: { en: 'A shout', bn: 'চিৎকার' } },
          { edge: 'shelf-ear', label: 'PUBLISH', plain: { en: 'A shout', bn: 'চিৎকার' } }
        ],
        state: { ear: { en: 'Delivered', bn: 'পৌঁছেছে' } },
        plainState: { ear: { en: 'Heard it', bn: 'শুনেছে' } },
        story: {
          title: { en: 'A shout, then it is gone', bn: 'চিৎকার, তারপর নেই' },
          text: {
            en: 'Leela shouts toward the doorway. Only a person standing there hears it. The shout is not written down.',
            bn: 'লীলা দরজার দিকে চিৎকার করে। যে দাঁড়িয়ে আছে শুধু সে শোনে। চিৎকার লেখা হয় না।'
          }
        },
        title: { en: 'She shouts, and only listeners hear', bn: 'সে চিৎকার করে, শ্রোতারাই শোনে' },
        simple: {
          en: 'A shout reaches whoever is listening right then. Someone who stepped away misses it.',
          bn: 'চিৎকার সেই মুহূর্তে যে শুনছে তার কাছে যায়। যে সরে গেছে সে মিস করে।'
        },
        tech: {
          en: 'Pub/sub is at-most-once. An offline subscriber misses the message, and there is no ack. Streams keep history, ids, and consumer groups when you need a replay.',
          bn: 'পাব-সাব অ্যাট-মোস্ট-ওয়ানস। অফলাইন সাবস্ক্রাইবার বার্তা মিস করে, আর অ্যাক নেই। রিপ্লে লাগলে স্ট্রিম ইতিহাস, আইডি, আর কনজিউমার গ্রুপ রাখে।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'stampede',
      label: { en: 'A crowd hits an empty shelf', bn: 'খালি তাকে ভিড়' },
      branchAfter: 'miss',
      whatIf: {
        en: 'What if the shelf empties and a crowd all misses at once?',
        bn: 'তাক খালি হয়ে গেলে সবাই যদি একসঙ্গে মিস করে?'
      },
      steps: [
        {
          id: 'rush',
          work: { node: 'shelf', kind: 'queue' },
          state: { shelf: { en: 'Many misses', bn: 'অনেক মিস' } },
          plainState: { shelf: { en: 'A crowd', bn: 'এক ভিড়' } },
          story: {
            title: { en: 'A crowd hits an empty shelf', bn: 'খালি তাকে ভিড়' },
            text: {
              en: 'The use-by label ends, and a crowd finds the shelf empty. Every person walks to the storeroom at once.',
              bn: 'মেয়াদ শেষ হয়, আর এক ভিড় তাক খালি পায়। সবাই একসঙ্গে গুদামে যায়।'
            }
          },
          title: { en: 'Everyone arrives at the empty shelf', bn: 'সবাই খালি তাকে আসে' },
          simple: {
            en: 'Many people miss at once and all walk to the storeroom together.',
            bn: 'অনেকে একসঙ্গে মিস করে আর সবাই একসাথে গুদামে যায়।'
          },
          tech: {
            en: 'This is a stampede. Give copies slightly different timers, or let one caller restock while the others wait on that single refill.',
            bn: 'এটা স্ট্যাম্পিড। কপির সময় একটু আলাদা রাখুন, অথবা একজন ভরুক আর বাকিরা সেই এক রিফিলের জন্য অপেক্ষা করুক।'
          }
        },
        {
          id: 'slammed',
          work: { node: 'room', kind: 'error' },
          state: { room: { en: 'Overloaded', bn: 'চাপে' } },
          plainState: { room: { en: 'Slammed', bn: 'চাপে' } },
          story: {
            title: { en: 'The back cannot keep up', bn: 'পেছন সামলাতে পারে না' },
            text: {
              en: 'The storeroom was quiet until the shelf emptied. Then everyone arrived together and the back could not keep up.',
              bn: 'তাক খালি হওয়ার আগে গুদাম শান্ত ছিল। তারপর সবাই একসঙ্গে এল, আর পেছন সামলাতে পারল না।'
            }
          },
          title: { en: 'The storeroom is slammed', bn: 'গুদাম চাপে' },
          simple: {
            en: 'The shelf saved nobody, because every miss became a trip to the storeroom.',
            bn: 'তাক কাউকে বাঁচায়নি, কারণ প্রতিটি মিস গুদামে একটা যাত্রা হয়ে গেল।'
          },
          tech: {
            en: 'A lock around the refill, or one shared wait, stops the crowd from repeating the same load. Do not let every miss hit the database.',
            bn: 'রিফিলের চারপাশে একটা লক, বা একটা ভাগ করা অপেক্ষা, ভিড়কে একই লোড আবার করতে দেয় না। প্রতিটি মিসকে ডেটাবেসে যেতে দেবেন না।'
          }
        }
      ]
    },
    {
      id: 'stale',
      label: { en: 'The shelf keeps the old jar', bn: 'তাকে পুরনো বয়ম' },
      branchAfter: 'copy',
      whatIf: {
        en: 'What if the storeroom changes and the shelf keeps the old jar?',
        bn: 'গুদাম বদলালে তাক যদি পুরনো বয়ম রেখে দেয়?'
      },
      steps: [
        {
          id: 'changed',
          work: { node: 'room', kind: 'queue' },
          state: { room: { en: 'Row updated', bn: 'সারি বদলেছে' } },
          plainState: { room: { en: 'Changed', bn: 'বদলেছে' } },
          story: {
            title: { en: 'The back changes first', bn: 'পেছন আগে বদলায়' },
            text: {
              en: 'Someone replaces the jar in the storeroom. The shelf still holds this morning\'s copy.',
              bn: 'কেউ গুদামের বয়ম বদলে দেয়। তাকে এখনো সকালের কপি।'
            }
          },
          title: { en: 'The storeroom changes under the copy', bn: 'কপির নিচে গুদাম বদলায়' },
          simple: {
            en: 'The real jar changes in the storeroom while the shelf still shows the old one.',
            bn: 'আসল বয়ম গুদামে বদলায়, তাক তখনো পুরনোটা দেখায়।'
          },
          tech: {
            en: 'The database write does not touch Redis. The copy stays until you delete it or the TTL ends.',
            bn: 'ডেটাবেসের লেখা Redis-কে ছোঁয় না। কপি থাকে যতক্ষণ না আপনি মুছছেন বা TTL শেষ হচ্ছে।'
          }
        },
        {
          id: 'oldcopy',
          work: { node: 'shelf', kind: 'error' },
          state: { shelf: { en: 'Stale', bn: 'বাসি' } },
          plainState: { shelf: { en: 'Old copy', bn: 'পুরনো কপি' } },
          story: {
            title: { en: 'The shelf is now a lie', bn: 'তাক এখন মিথ্যা' },
            text: {
              en: 'Leela hands over the jar from the shelf. It is the old one, because nobody cleared it when the storeroom changed.',
              bn: 'লীলা তাক থেকে বয়ম দেয়। সেটা পুরনো, কারণ গুদাম বদলানোর সময় কেউ তাক পরিষ্কার করেনি।'
            }
          },
          title: { en: 'The shelf still shows the old jar', bn: 'তাক এখনো পুরনো বয়ম দেখায়' },
          simple: {
            en: 'People keep taking the old copy until someone clears the shelf or the timer ends.',
            bn: 'কেউ তাক না পরিষ্কার করা, বা মেয়াদ না শেষ হওয়া পর্যন্ত লোকে পুরনো কপি নেয়।'
          },
          tech: {
            en: 'Delete the key when the database row changes. A TTL only bounds how long the stale copy can live.',
            bn: 'ডেটাবেসের সারি বদলালে কী মুছে দিন। TTL শুধু বাসি কপি কতক্ষণ বাঁচতে পারে তার সীমা।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'The shelf is a quick copy. The storeroom is the real record. A timer, a full shelf, a notebook, and a shout are the ways that copy can mislead you.',
      bn: 'তাক একটা দ্রুত কপি। গুদাম আসল রেকর্ড। মেয়াদ, ভরা তাক, খাতা, আর চিৎকার, এই কপি যেভাবে বিভ্রান্ত করতে পারে।'
    },
    twins: [
      {
        icon: 'user',
        node: 'app',
        name: { en: 'Leela', bn: 'লীলা' },
        d: { en: 'She checks the shelf, restocks it, and shouts toward the door.', bn: 'সে তাক দেখে, ভরে, আর দরজার দিকে চিৎকার করে।' }
      },
      {
        icon: 'memory',
        node: 'shelf',
        name: { en: 'The shelf', bn: 'তাক' },
        d: { en: 'A copy in front. Fast to check, and wrong if nobody clears it.', bn: 'সামনের একটা কপি। দেখতে দ্রুত, আর না সরালে ভুল।' }
      },
      {
        icon: 'archive',
        node: 'room',
        name: { en: 'The storeroom', bn: 'গুদাম' },
        d: { en: 'The real jar. Every miss walks here unless the shelf already has a copy.', bn: 'আসল বয়ম। তাকে কপি না থাকলে প্রতিটি মিস এখানে আসে।' }
      },
      {
        icon: 'folder',
        node: 'disk',
        name: { en: 'The notebook', bn: 'খাতা' },
        d: { en: 'A photo, or a list of moves, so a restart is not a bare shelf.', bn: 'একটা ছবি, বা চালার তালিকা, যাতে রিস্টার্টে তাক একেবারে ফাঁকা না হয়।' }
      },
      {
        icon: 'mail',
        node: 'ear',
        name: { en: 'A listener', bn: 'শ্রোতা' },
        d: { en: 'Hears the shout only if they are here when it happens.', bn: 'চিৎকারের সময় এখানে থাকলে তবেই শোনে।' }
      },
      {
        icon: 'queue',
        node: null,
        name: { en: 'A kept shout', bn: 'রাখা চিৎকার' },
        is: { en: 'is a stream', bn: 'মানে একটা স্ট্রিম' },
        d: { en: 'History you can read later. This page\'s shout does not keep one.', bn: 'পরে পড়ার মতো ইতিহাস। এই পাতার চিৎকার সেটা রাখে না।' }
      }
    ]
  },
  qa: [
    {
      q: { en: 'What is cache-aside?', bn: 'ক্যাশ-অ্যাসাইড কী?' },
      short: { en: 'The app checks the cache, and on a miss loads the database and stores a copy.', bn: 'অ্যাপ ক্যাশ দেখে, মিস হলে ডেটাবেস থেকে এনে কপি রাখে।' },
      deep: {
        en: 'The app owns that logic. Read-through and write-through hide it in the cache layer. Update the copy with a TTL or by deleting the key, or you serve stale data. A timer that ends for a hot key can also stampede the database.',
        bn: 'এই লজিক অ্যাপের। রিড-থ্রু আর রাইট-থ্রু সেটা ক্যাশ লেয়ারে লুকোয়। কপি TTL দিয়ে বা কী মুছে আপডেট করুন, নইলে বাসি ডেটা দেবেন। গরম কি-র মেয়াদ শেষ হলে ডেটাবেসে স্ট্যাম্পিডও হতে পারে।'
      },
      redFlag: { en: '“Redis automatically syncs with the database.”', bn: '“Redis নিজে থেকে ডেটাবেসের সঙ্গে মিলে যায়।”' }
    },
    {
      q: { en: 'How do snapshots differ from the write log?', bn: 'স্ন্যাপশট আর লেখার লগের পার্থক্য কী?' },
      short: { en: 'A snapshot is a photo. The write log, once turned on, replays changes and can drop about one second.', bn: 'স্ন্যাপশট একটা ছবি। লেখার লগ চালু থাকলে বদল আবার চালায়, আর প্রায় এক সেকেন্ড ফেলতে পারে।' },
      deep: {
        en: 'Snapshots to `dump.rdb` are on by default. Redis forks a child to write the file, and a crash can lose the latest minutes. `appendonly yes` turns on the log. The default fsync is every second. Redis suggests both when you want safety closer to a database, and discourages the log alone. Since 7.0 the log is a base file, incremental files, and a manifest.',
        bn: '`dump.rdb`-তে স্ন্যাপশট ডিফল্টে চালু। Redis একটা চাইল্ড ফর্ক করে ফাইল লেখে, আর ক্র্যাশে শেষ কয়েক মিনিট যেতে পারে। `appendonly yes` লগ চালু করে। ডিফল্ট fsync প্রতি সেকেন্ডে। ডেটাবেসের কাছাকাছি নিরাপত্তা চাইলে Redis দুটোই বলছে, আর শুধু লগ নিরুৎসাহিত করে। 7.0 থেকে লগ বেস ফাইল, ইনক্রিমেন্টাল ফাইল, আর একটা ম্যানিফেস্ট।'
      },
      redFlag: { en: '“Redis never writes to disk” or “a snapshot loses nothing.”', bn: '“Redis কখনো ডিস্কে লেখে না” বা “স্ন্যাপশটে কিছু হারায় না।”' }
    },
    {
      q: { en: 'What happens when memory is full?', bn: 'মেমরি ভরা হলে কী হয়?' },
      short: { en: 'Open-source Redis defaults to noeviction, so writes that need memory fail.', bn: 'ওপেন-সোর্স Redis-এর ডিফল্ট noeviction, তাই মেমরি লাগে এমন লেখা ব্যর্থ হয়।' },
      deep: {
        en: 'On 64-bit builds `maxmemory` starts unset, so there is no cap. Once you set one, `noeviction` is the redis.conf default: reads still work, and writes that need memory return an error. `allkeys-lru` is the usual cache policy. Policies that only evict keys with a TTL behave like `noeviction` when no key has one. LRU and LFU sample keys rather than tracking a perfect order. Redis Software databases often default to `volatile-lru` instead.',
        bn: '64-বিটে `maxmemory` শুরুতে সেট থাকে না, তাই সীমা নেই। সীমা দিলে redis.conf-এর ডিফল্ট `noeviction`: পড়া চলে, মেমরি লাগে এমন লেখা এরর দেয়। ক্যাশে সাধারণত `allkeys-lru`। যে নীতি শুধু TTL-ওয়ালা কি ফেলে, কোনো কি-র TTL না থাকলে সেটা `noeviction`-এর মতো। LRU আর LFU নিখুঁত ক্রম না রেখে কি নমুনা করে। Redis Software-এর ডেটাবেসে প্রায়ই ডিফল্ট `volatile-lru`।'
      },
      redFlag: { en: '“Redis always throws out the oldest key.”', bn: '“Redis সবসময় সবচেয়ে পুরনো কি ফেলে দেয়।”' }
    },
    {
      q: { en: 'How is a shout different from a stream?', bn: 'চিৎকার আর স্ট্রিমের পার্থক্য কী?' },
      short: { en: 'A shout is gone after it is sent. A stream keeps history and can be acknowledged.', bn: 'চিৎকার পাঠানোর পর থাকে না। স্ট্রিম ইতিহাস রাখে এবং স্বীকার করা যায়।' },
      deep: {
        en: 'Pub/sub is at-most-once. A subscriber that is offline misses the message, and there is no ack. Streams append entries with ids. Consumer groups can read, acknowledge, and replay.',
        bn: 'পাব-সাব অ্যাট-মোস্ট-ওয়ানস। যে সাবস্ক্রাইবার অফলাইন সে বার্তা মিস করে, আর অ্যাক নেই। স্ট্রিম আইডিসহ এন্ট্রি জোড়ে। কনজিউমার গ্রুপ পড়তে, অ্যাক করতে, আর রিপ্লে করতে পারে।'
      },
      redFlag: { en: '“Pub/sub guarantees delivery.”', bn: '“পাব-সাব ডেলিভারির গ্যারান্টি দেয়।”' }
    },
    {
      q: { en: 'Why is a key lookup fast, and what still blocks?', bn: 'কি খোঁজা দ্রুত কেন, আর কী তবু আটকায়?' },
      short: { en: 'A plain key read is constant time, but one thread runs commands.', bn: 'সাধারণ কি-পড়া ধ্রুব সময়ে, কিন্তু এক থ্রেড কমান্ড চালায়।' },
      deep: {
        en: 'Redis serves commands on one thread, so `KEYS` walks the keyspace and everyone else waits. Use `SCAN` to walk in small steps. I/O threads can move socket reads and writes off that thread. They do not make a long command parallel. Replicas and Cluster are how you scale past one process.',
        bn: 'Redis এক থ্রেডে কমান্ড চালায়, তাই `KEYS` কি-স্পেস হেঁটে যায় আর বাকি সবাই অপেক্ষা করে। ছোট ধাপে হাঁটতে `SCAN` ব্যবহার করুন। I/O থ্রেড সকেটের পড়া-লেখা সরাতে পারে। লম্বা কমান্ডকে সমান্তরাল করে না। এক প্রসেসের বাইরে বাড়াতে রেপ্লিকা আর ক্লাস্টার।'
      },
      redFlag: { en: '“Use KEYS in production to list keys.”', bn: '“প্রোডাকশনে কি-র তালিকা পেতে KEYS ব্যবহার করুন।”' }
    }
  ],
  cheats: [
    {
      code: 'SET user:42 {"n":"Leela"} EX 300',
      d: { en: 'Store a copy that expires in 300 seconds.', bn: '৩০০ সেকেন্ডে মেয়াদ ফুরোয় এমন একটা কপি রাখুন।' }
    },
    {
      code: 'CONFIG SET maxmemory-policy noeviction',
      d: { en: 'Open-source default. Writes that need memory fail at the cap.', bn: 'ওপেন-সোর্স ডিফল্ট। সীমায় মেমরি লাগে এমন লেখা ব্যর্থ হয়।' }
    },
    {
      code: 'CONFIG SET maxmemory-policy allkeys-lru',
      d: { en: 'A cache policy. It samples keys. It is not an exact oldest-first list.', bn: 'একটা ক্যাশ নীতি। কি নমুনা করে। নিখুঁত পুরনো-আগে তালিকা নয়।' }
    },
    {
      code: 'SCAN 0 MATCH user:* COUNT 100',
      d: { en: 'Walk keys in steps. Do not use KEYS for this on a live server.', bn: 'ধাপে ধাপে কি হাঁটুন। লাইভ সার্ভারে এর জন্য KEYS ব্যবহার করবেন না।' }
    },
    {
      code: 'PUBLISH news hi',
      d: { en: 'At-most-once. Use XADD on a stream when you need the message later.', bn: 'অ্যাট-মোস্ট-ওয়ানস। বার্তা পরে লাগলে স্ট্রিমে XADD ব্যবহার করুন।' }
    }
  ],
  sources: [
    { label: 'Redis persistence', url: 'https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/' },
    { label: 'Redis key eviction', url: 'https://redis.io/docs/latest/develop/reference/eviction/' },
    { label: 'Redis Pub/Sub', url: 'https://redis.io/docs/latest/develop/pubsub/' },
    { label: 'Redis streams', url: 'https://redis.io/docs/latest/develop/use-cases/streaming/' },
    { label: 'Redis 8 redis.conf', url: 'https://github.com/redis/redis/blob/8.0/redis.conf' }
  ],
  film: {
    src: '/learn/redis-deep-dive.mp4',
    note: {
      en: 'A stampede is many misses at once. One caller restocks while the others wait, or the timers differ. Do not let every miss hit the database.',
      bn: 'স্ট্যাম্পিড মানে একসঙ্গে অনেক মিস। একজন রিফিল করুক, বাকিরা অপেক্ষা করুক, অথবা টাইমার আলাদা হোক। প্রতিটি মিসকে ডেটাবেসে যেতে দেবেন না।'
    }
  }
}
