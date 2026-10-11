import type { Topic } from '../types'

export const databases: Topic = {
  slug: 'databases',
  line: 'async',
  title: { en: 'Databases', bn: 'ডেটাবেস' },
  summary: {
    en: 'An index jumps to the matching row, a transaction lands as a whole or not at all, and one extra query per child is a hundred walks.',
    bn: 'একটা ইনডেক্স মিলে যাওয়া সারিতে লাফ দেয়, একটা ট্রানজ্যাকশন পুরোটা নামে নয়তো একদমই না, আর প্রতিটি সন্তানের জন্য আলাদা প্রশ্ন মানে শতবার হাঁটা।'
  },
  hook: {
    en: 'Keya checks the card catalog before she walks every shelf.',
    bn: 'কেয়া প্রতিটি তাক ঘোরার আগে কার্ড ক্যাটালগ দেখে।'
  },
  story: {
    cast: {
      en: 'Keya wants one book. A card catalog stands in front of the shelves, and the checkout desk takes a stack together. Omar may be checking books out too.',
      bn: 'কেয়া একটা বই চায়। তাকের সামনে একটা কার্ড ক্যাটালগ, আর চেকআউট ডেস্ক একগাদা বই একসাথে নেয়। ওমারও বই চেক আউট করতে পারে।'
    }
  },
  takeaway: {
    en: 'The catalog finds one book, a checkout is all or none, and one trolley beats a hundred walks.',
    bn: 'ক্যাটালগ একটা বই খুঁজে দেয়, চেকআউট সব অথবা কিছুই না, আর একটা ট্রলি শতবার হাঁটাকে হারায়।'
  },
  words: [
    {
      term: { en: 'Card catalog (B-tree)', bn: 'কার্ড ক্যাটালগ (B-tree)' },
      d: { en: 'A sorted set of cards that finds one book fast.', bn: 'সাজানো কার্ড, যা একটা বই দ্রুত খুঁজে দেয়।' }
    },
    {
      term: { en: 'The shelves (heap)', bn: 'তাক (heap)' },
      d: { en: 'The books themselves, in the order they were put there.', bn: 'বইগুলো নিজেরা, যে ক্রমে রাখা হয়েছিল।' }
    },
    {
      term: { en: 'One checkout (transaction)', bn: 'এক চেকআউট (transaction)' },
      d: { en: 'Several books leave together, or none of them do.', bn: 'কয়েকটা বই একসাথে বেরোয়, নয়তো একটাও না।' }
    },
    {
      term: { en: 'The log (WAL)', bn: 'খাতা (WAL)' },
      d: { en: 'A note written before the checkout counts as done.', bn: 'চেকআউট শেষ বলার আগে লেখা একটা নোট।' }
    },
    {
      term: { en: 'A snapshot (isolation)', bn: 'এক ঝলক (isolation)' },
      d: { en: 'What one reader is allowed to see of other work.', bn: 'অন্যের কাজের মধ্যে একজন পাঠক কতটুকু দেখতে পায়।' }
    },
    {
      term: { en: 'One trolley (eager load)', bn: 'এক ট্রলি (eager load)' },
      d: { en: 'Bring the related books in one trip, not one by one.', bn: 'জড়িত বই একবারে আনুন, একটা একটা করে নয়।' }
    }
  ],
  legend: {
    request: { en: 'Asking', bn: 'জিজ্ঞেস' },
    queue: { en: 'Still looking', bn: 'এখনো খুঁজছে' },
    result: { en: 'Handed over', bn: 'দেওয়া হলো' },
    error: { en: 'Sent back', bn: 'ফেরত' }
  },
  view: { wide: [1000, 500], narrow: [400, 480] },
  nodeR: { narrow: 20 },
  nodes: {
    keya: {
      icon: 'user',
      name: { en: 'Keya', bn: 'কেয়া' },
      sub: { en: 'The reader', bn: 'পাঠক' },
      plain: { name: { en: 'Keya', bn: 'কেয়া' }, sub: { en: 'Asks', bn: 'জিজ্ঞেস' } },
      wide: [160, 160, 'up'],
      narrow: [200, 72, 'up']
    },
    planner: {
      icon: 'route',
      name: { en: 'Librarian', bn: 'গ্রন্থাগারিক' },
      sub: { en: 'Picks a path', bn: 'পথ বেছে নেয়' },
      plain: { name: { en: 'Librarian', bn: 'গ্রন্থাগারিক' }, sub: { en: 'Picks', bn: 'বাছে' } },
      wide: [490, 160, 'up'],
      narrow: [200, 158, 'down']
    },
    catalog: {
      icon: 'bookmark',
      name: { en: 'Card catalog', bn: 'কার্ড ক্যাটালগ' },
      sub: { en: 'Sorted cards', bn: 'সাজানো কার্ড' },
      plain: { name: { en: 'The catalog', bn: 'ক্যাটালগ' }, sub: { en: 'Sorted', bn: 'সাজানো' } },
      wide: [820, 160, 'up'],
      narrow: [115, 289, 'down']
    },
    shelves: {
      icon: 'archive',
      name: { en: 'The shelves', bn: 'তাক' },
      sub: { en: 'Every book', bn: 'প্রতিটি বই' },
      plain: { name: { en: 'The shelves', bn: 'তাক' }, sub: { en: 'The books', bn: 'বইগুলো' } },
      wide: [250, 370, 'up'],
      narrow: [295, 289, 'up']
    },
    desk: {
      icon: 'check',
      name: { en: 'Checkout', bn: 'চেকআউট' },
      sub: { en: 'All or none', bn: 'সব অথবা কিছুই না' },
      plain: { name: { en: 'The desk', bn: 'ডেস্ক' }, sub: { en: 'All or none', bn: 'সব না কিছুই' } },
      wide: [700, 370, 'up'],
      narrow: [200, 390, 'down']
    }
  },
  corridors: {
    'keya-planner': { wide: [[160, 160], [490, 160]], narrow: [[200, 72], [200, 158]] },
    'planner-shelves': { wide: [[490, 160], [250, 370]], narrow: [[200, 158], [295, 289]] },
    'planner-catalog': { wide: [[490, 160], [820, 160]], narrow: [[200, 158], [115, 289]] },
    'catalog-shelves': { wide: [[820, 160], [250, 370]], narrow: [[115, 289], [295, 289]] },
    'keya-desk': { wide: [[160, 160], [160, 450], [700, 450], [700, 370]], narrow: [[200, 72], [28, 72], [28, 390], [200, 390]] },
    'keya-shelves': { wide: [[160, 160], [160, 260], [250, 260], [250, 370]], narrow: [[200, 72], [372, 72], [372, 289], [295, 289]] }
  },
  edges: {
    'keya-planner': { from: 'keya', to: 'planner', kind: 'request' },
    'planner-shelves': { from: 'planner', to: 'shelves', kind: 'queue' },
    'planner-catalog': { from: 'planner', to: 'catalog', kind: 'request' },
    'catalog-shelves': { from: 'catalog', to: 'shelves', kind: 'request' },
    'keya-desk': { from: 'keya', to: 'desk', kind: 'result' },
    'keya-shelves': { from: 'keya', to: 'shelves', kind: 'request' },
    'shelves-keya': { from: 'shelves', to: 'keya', kind: 'result' }
  },
  main: {
    label: { en: 'Find the book', bn: 'বইটা খুঁজুন' },
    steps: [
      {
        id: 'ask',
        moves: [{ edge: 'keya-planner', label: 'One question', plain: { en: 'She asks', bn: 'সে জিজ্ঞেস করে' } }],
        state: { planner: { en: 'Choosing', bn: 'বাছছে' } },
        plainState: { planner: { en: 'Picking', bn: 'বাছছে' } },
        story: {
          title: { en: 'She asks for one book', bn: 'সে একটা বই চায়' },
          text: {
            en: 'Keya names the book. The librarian decides whether to walk the shelves or open the catalog.',
            bn: 'কেয়া বইয়ের নাম বলে। গ্রন্থাগারিক ঠিক করে তাক ঘুরবে নাকি ক্যাটালগ খুলবে।'
          }
        },
        title: { en: 'She asks for one book', bn: 'সে একটা বই চায়' },
        simple: {
          en: 'Keya names one book, and the librarian chooses how to look for it.',
          bn: 'কেয়া একটা বইয়ের নাম বলে, আর গ্রন্থাগারিক ঠিক করে কীভাবে খুঁজবে।'
        },
        tech: {
          en: 'The planner reads the question and the table statistics, then picks a sequential scan or an index scan. `EXPLAIN` shows the plan and its cost. It does not run the query.',
          bn: 'প্ল্যানার প্রশ্ন আর টেবিলের পরিসংখ্যান পড়ে, তারপর সিকোয়েন্সিয়াল স্ক্যান বা ইনডেক্স স্ক্যান বেছে নেয়। `EXPLAIN` পরিকল্পনা আর তার খরচ দেখায়। সেটা কোয়েরি চালায় না।'
        }
      },
      {
        id: 'flip',
        moves: [{ edge: 'planner-shelves', label: 'Every shelf', plain: { en: 'Every shelf', bn: 'প্রতিটি তাক' } }],
        state: { shelves: { en: 'Full scan', bn: 'পুরো স্ক্যান' } },
        plainState: { shelves: { en: 'Every book', bn: 'প্রতিটি বই' } },
        story: {
          title: { en: 'She walks every shelf', bn: 'সে প্রতিটি তাক ঘোরে' },
          text: {
            en: 'There is no catalog for this title, so Keya opens every book until the right one shows up.',
            bn: 'এই নামের কোনো ক্যাটালগ নেই, তাই কেয়া ঠিক বইটা পাওয়া পর্যন্ত প্রতিটি বই খোলে।'
          }
        },
        title: { en: 'She walks every shelf', bn: 'সে প্রতিটি তাক ঘোরে' },
        simple: {
          en: 'Without a catalog she looks through every book, and a bigger library makes that slower.',
          bn: 'ক্যাটালগ না থাকলে সে প্রতিটি বই দেখে, আর লাইব্রেরি বড় হলে সেটা ধীর হয়।'
        },
        tech: {
          en: 'With no usable index the plan is a sequential scan. It reads every row, so the cost grows with the whole table, not with the number of matches.',
          bn: 'কাজের ইনডেক্স না থাকলে পরিকল্পনা সিকোয়েন্সিয়াল স্ক্যান। সেটা প্রতিটি সারি পড়ে, তাই খরচ বাড়ে পুরো টেবিলের সঙ্গে, মেলার সংখ্যার সঙ্গে নয়।'
        }
      },
      {
        id: 'jump',
        moves: [
          { edge: 'planner-catalog', label: 'One card', plain: { en: 'The catalog', bn: 'ক্যাটালগ' } },
          { edge: 'catalog-shelves', label: 'One card', plain: { en: 'The catalog', bn: 'ক্যাটালগ' } }
        ],
        state: { catalog: { en: 'One card', bn: 'একটা কার্ড' }, shelves: { en: 'One row', bn: 'এক সারি' } },
        plainState: { catalog: { en: 'Found', bn: 'পেয়েছে' }, shelves: { en: 'One book', bn: 'একটা বই' } },
        story: {
          title: { en: 'The catalog points', bn: 'ক্যাটালগ দেখিয়ে দেয়' },
          text: {
            en: 'The card names the shelf. Keya walks straight to that book instead of opening the rest.',
            bn: 'কার্ড তাকের নাম বলে। কেয়া বাকি বই না খুলে সোজা সেই বইয়ের কাছে যায়।'
          }
        },
        title: { en: 'The catalog points at the shelf', bn: 'ক্যাটালগ তাক দেখায়' },
        simple: {
          en: 'The catalog sends her to one book. The cards are sorted, so she does not open the rest.',
          bn: 'ক্যাটালগ তাকে একটা বইয়ের কাছে পাঠায়। কার্ড সাজানো, তাই বাকিগুলো খুলতে হয় না।'
        },
        tech: {
          en: 'A B-tree is the default index. It serves equality and range checks, then the row is read from the table. On columns a, b the index is most useful when the query constrains a. A query on only b usually will not limit the scan.',
          bn: 'B-tree-ই ডিফল্ট ইনডেক্স। সেটা সমতা আর রেঞ্জ মেলায়, তারপর সারিটা টেবিল থেকে পড়া হয়। a, b কলামে ইনডেক্স সবচেয়ে কাজে লাগে যখন প্রশ্ন a-কে বেঁধে দেয়। শুধু b-এর প্রশ্ন সাধারণত স্ক্যানকে সীমাবদ্ধ করে না।'
        }
      },
      {
        id: 'checkout',
        moves: [{ edge: 'keya-desk', label: 'The whole stack', plain: { en: 'All together', bn: 'একসাথে' } }],
        state: { desk: { en: 'Open', bn: 'খোলা' } },
        plainState: { desk: { en: 'In progress', bn: 'চলছে' } },
        story: {
          title: { en: 'The stack leaves together', bn: 'গাদাটা একসাথে যায়' },
          text: {
            en: 'Keya takes several books in one checkout. Either the whole stack is hers, or she puts every book back.',
            bn: 'কেয়া এক চেকআউটে কয়েকটা বই নেয়। হয় পুরো গাদা তার, নয়তো প্রতিটি বই ফিরিয়ে দেয়।'
          }
        },
        title: { en: 'The books leave together', bn: 'বইগুলো একসাথে যায়' },
        simple: {
          en: 'Several books are one checkout. They all leave, or every one of them stays.',
          bn: 'কয়েকটা বই এক চেকআউট। সব বেরোয়, নয়তো প্রতিটি থেকে যায়।'
        },
        tech: {
          en: '`BEGIN` groups the writes. The log of those writes is flushed before the data pages must be, and that flush is what makes `COMMIT` durable by default. `ROLLBACK` drops the group. `synchronous_commit` off reports success before the flush.',
          bn: '`BEGIN` লেখাগুলোকে এক দলে রাখে। ডেটা পাতা লেখার আগে সেই লেখার লগ ফ্লাশ হয়, আর ডিফল্টে সেই ফ্লাশই `COMMIT`-কে টেকসই করে। `ROLLBACK` দলটা ফেলে দেয়। `synchronous_commit` বন্ধ থাকলে ফ্লাশের আগেই সফল বলা হয়।'
        }
      },
      {
        id: 'readers',
        work: { node: 'desk', kind: 'result' },
        state: { desk: { en: 'Snapshot', bn: 'স্ন্যাপশট' } },
        plainState: { desk: { en: 'Her view', bn: 'তার দৃশ্য' } },
        story: {
          title: { en: 'Others do not see half', bn: 'অন্যরা অর্ধেক দেখে না' },
          text: {
            en: 'Omar cannot see a checkout Keya has not finished. His view is the library as it stood when he looked.',
            bn: 'কেয়ার শেষ না হওয়া চেকআউট ওমার দেখতে পায় না। তার দৃশ্য সেই লাইব্রেরি, যখন সে তাকিয়েছিল।'
          }
        },
        title: { en: 'Other readers do not see half', bn: 'অন্য পাঠক অর্ধেক দেখে না' },
        simple: {
          en: 'Another reader does not see a checkout that has not finished. Each look gets its own view.',
          bn: 'আরেকজন পাঠক শেষ না হওয়া চেকআউট দেখে না। প্রতিটি দেখা পায় নিজের দৃশ্য।'
        },
        tech: {
          en: 'Read Committed is the default. Each statement sees only rows committed before that statement, and Read Uncommitted does the same, so dirty reads do not happen. Repeatable Read uses one snapshot for the whole transaction.',
          bn: 'Read Committed-ই ডিফল্ট। প্রতিটি স্টেটমেন্ট শুধু সেই স্টেটমেন্টের আগে কমিট হওয়া সারি দেখে, আর Read Uncommitted-ও তাই করে, তাই ডার্টি রিড হয় না। Repeatable Read পুরো ট্রানজ্যাকশনে এক স্ন্যাপশট ব্যবহার করে।'
        }
      },
      {
        id: 'trips',
        moves: [{ edge: 'keya-shelves', label: 'One per book', plain: { en: 'One per book', bn: 'প্রতি বইয়ে' } }],
        state: { shelves: { en: 'Many trips', bn: 'অনেক যাত্রা' } },
        plainState: { shelves: { en: 'Many walks', bn: 'অনেক হাঁটা' } },
        story: {
          title: { en: 'One walk per book', bn: 'প্রতি বইয়ে এক হাঁটা' },
          text: {
            en: 'The list says which books. Keya then walks back once for each book, instead of taking a trolley.',
            bn: 'তালিকা বলে কোন বই। কেয়া তারপর প্রতিটি বইয়ের জন্য আলাদা করে হাঁটে, ট্রলি না নিয়ে।'
          }
        },
        title: { en: 'One trip for every book', bn: 'প্রতি বইয়ে এক যাত্রা' },
        simple: {
          en: 'She fetches the list, then walks back once for every book on it. A trolley would be one trip.',
          bn: 'সে তালিকা আনে, তারপর তালিকার প্রতিটি বইয়ের জন্য আলাদা হাঁটে। একটা ট্রলি হতো এক যাত্রা।'
        },
        tech: {
          en: 'Lazy loading runs one query for the parent rows and another query per child. `selectinload` gathers those children with one `IN` query. `joinedload` uses one join, and a collection then needs `unique()`. Async sessions cannot do the lazy load, because implicit IO is not allowed.',
          bn: 'লেজি লোডিং অভিভাবক সারির জন্য এক প্রশ্ন চালায়, আর প্রতিটি সন্তানের জন্য আরেকটা। `selectinload` সেই সন্তানদের একটা `IN` প্রশ্নে আনে। `joinedload` এক জয়েন ব্যবহার করে, আর একটা কালেকশনে তখন `unique()` লাগে। অ্যাসিঙ্ক সেশন লেজি লোড করতে পারে না, কারণ চুপচাপ আইও চলতে দেওয়া হয় না।'
        }
      },
      {
        id: 'back',
        moves: [{ edge: 'shelves-keya', label: 'Hand them over', plain: { en: 'The books', bn: 'বইগুলো' } }],
        state: { keya: { en: 'Got them', bn: 'পেয়েছে' } },
        plainState: { keya: { en: 'In hand', bn: 'হাতে' } },
        story: {
          title: { en: 'The books come back', bn: 'বইগুলো ফিরে আসে' },
          text: {
            en: 'Keya leaves with the books she asked for. Next time she can ask for a handful, not the whole library.',
            bn: 'কেয়া যে বই চেয়েছিল সেগুলো নিয়ে যায়। পরের বার পুরো লাইব্রেরি নয়, এক মুঠো চাইতে পারে।'
          }
        },
        title: { en: 'The books come back', bn: 'বইগুলো ফিরে আসে' },
        simple: {
          en: 'The books she asked for come back. Next time, ask for a page of them, not every book.',
          bn: 'যে বই সে চেয়েছিল সেগুলো ফিরে আসে। পরের বার প্রতিটি বই নয়, এক পাতা চান।'
        },
        tech: {
          en: 'The rows come back. A pool reuses connections instead of opening one per question. Ask for a page of rows, not the whole table. `ANALYZE` refreshes the statistics the planner used on the first step.',
          bn: 'সারিগুলো ফিরে আসে। একটা পুল প্রতি প্রশ্নে নতুন সংযোগ না খুলে পুরনোগুলো আবার ব্যবহার করে। পুরো টেবিল নয়, এক পাতা সারি চান। `ANALYZE` প্রথম ধাপে প্ল্যানার যে পরিসংখ্যান ব্যবহার করেছে সেটা রিফ্রেশ করে।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'deadlock',
      label: { en: 'Two readers', bn: 'দুই পাঠক' },
      branchAfter: 'checkout',
      whatIf: { en: 'What if two readers each hold the book the other needs?', bn: 'দুই পাঠক যদি একে অপরের দরকারি বই ধরে থাকে?' },
      steps: [
        {
          id: 'both',
          work: { node: 'desk', kind: 'queue' },
          state: { desk: { en: 'Both waiting', bn: 'দুজনেই অপেক্ষা' } },
          plainState: { desk: { en: 'Both wait', bn: 'দুজনেই অপেক্ষা' } },
          story: {
            title: { en: 'Each holds the other book', bn: 'প্রত্যেকে অন্যের বই ধরে' },
            text: {
              en: 'Keya holds book A and waits for book B. Omar holds book B and waits for book A. Neither desk can finish.',
              bn: 'কেয়া বই এ ধরে বই বি-এর জন্য অপেক্ষা করে। ওমার বই বি ধরে বই এ-এর জন্য অপেক্ষা করে। কোনো ডেস্ক শেষ করতে পারে না।'
            }
          },
          title: { en: 'Each holds the book the other needs', bn: 'প্রত্যেকে অন্যের দরকারি বই ধরে' },
          simple: {
            en: 'Keya holds one book and waits for Omar’s. Omar holds the other and waits for hers.',
            bn: 'কেয়া একটা বই ধরে ওমারেরটার জন্য অপেক্ষা করে। ওমার অন্যটা ধরে কেয়ারটার জন্য অপেক্ষা করে।'
          },
          tech: {
            en: 'Each checkout locked a row the other checkout needs next. The locks were taken in opposite orders, so each side waits. Row locks can form this cycle even without an explicit lock statement.',
            bn: 'প্রতিটি চেকআউট এমন এক সারি লক করেছে যা অন্য চেকআউটের পরের দরকার। লক নেওয়া হয়েছে উল্টো ক্রমে, তাই দুই দিকই অপেক্ষা করে। স্পষ্ট লক স্টেটমেন্ট ছাড়াও সারি লক এই চক্র বানাতে পারে।'
          }
        },
        {
          id: 'cancel',
          work: { node: 'desk', kind: 'error' },
          state: { desk: { en: 'One aborted', bn: 'একটা বাতিল' } },
          plainState: { desk: { en: 'Sent back', bn: 'ফেরত' } },
          story: {
            title: { en: 'One checkout is cancelled', bn: 'এক চেকআউট বাতিল' },
            text: {
              en: 'The library cancels one of the two checkouts. The other reader finishes, and the cancelled reader starts the stack again.',
              bn: 'লাইব্রেরি দুই চেকআউটের একটা বাতিল করে। অন্য পাঠক শেষ করে, আর বাতিল হওয়া পাঠক গাদাটা আবার শুরু করে।'
            }
          },
          title: { en: 'One checkout is sent back', bn: 'এক চেকআউট ফেরত যায়' },
          simple: {
            en: 'One checkout is cancelled so the other can finish. The cancelled reader starts that stack again.',
            bn: 'এক চেকআউট বাতিল হয় যাতে অন্যটা শেষ করতে পারে। বাতিল হওয়া পাঠক সেই গাদা আবার শুরু করে।'
          },
          tech: {
            en: 'PostgreSQL detects the lock cycle and aborts one transaction so the other can finish. Which one is aborted is not predictable. The aborted checkout must be retried. Taking the books in the same order avoids the cycle.',
            bn: 'PostgreSQL লক চক্র ধরে ফেলে এবং একটা ট্রানজ্যাকশন বাতিল করে যাতে অন্যটা শেষ করতে পারে। কোনটা বাতিল হবে সেটা আগে থেকে বলা যায় না। বাতিল চেকআউট আবার চেষ্টা করতে হয়। বই একই ক্রমে নিলে চক্র হয় না।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A library. The shelves are the table, the card catalog is the index, and one checkout is a transaction.',
      bn: 'একটা লাইব্রেরি। তাক হলো টেবিল, কার্ড ক্যাটালগ হলো ইনডেক্স, আর এক চেকআউট হলো একটা ট্রানজ্যাকশন।'
    },
    twins: [
      { node: 'keya', icon: 'user', name: { en: 'Keya', bn: 'কেয়া' }, d: { en: 'The person asking for a book.', bn: 'যে বই চেয়ে জিজ্ঞেস করছে।' } },
      { node: 'planner', icon: 'route', name: { en: 'Librarian', bn: 'গ্রন্থাগারিক' }, d: { en: 'The person who picks a path to the book.', bn: 'যে বইয়ের পথ বেছে নেয়।' } },
      { node: 'catalog', icon: 'bookmark', name: { en: 'Card catalog', bn: 'কার্ড ক্যাটালগ' }, d: { en: 'Sorted cards that point at one shelf.', bn: 'সাজানো কার্ড, যা একটা তাক দেখায়।' } },
      { node: 'shelves', icon: 'archive', name: { en: 'The shelves', bn: 'তাক' }, d: { en: 'The books, sitting in the order they arrived.', bn: 'বইগুলো, যে ক্রমে এসেছিল সেই ক্রমে।' } },
      { node: 'desk', icon: 'check', name: { en: 'Checkout', bn: 'চেকআউট' }, d: { en: 'A stack that leaves together, or not at all.', bn: 'একগাদা যা একসাথে বেরোয়, নয়তো একদমই না।' } }
    ]
  },
  qa: [
    {
      q: { en: 'How does a B-tree index help, and what does it cost?', bn: 'B-tree ইনডেক্স কীভাবে সাহায্য করে, আর তার দাম কী?' },
      short: { en: 'Sorted cards give a fast lookup and a range. Every write has to update those cards too.', bn: 'সাজানো কার্ড দ্রুত খোঁজ আর রেঞ্জ দেয়। প্রতিটি লেখায় সেই কার্ডও বদলাতে হয়।' },
      deep: {
        en: 'PostgreSQL creates a B-tree unless you write `USING` another type. It serves equality and range, including `BETWEEN` and `IN`. A multicolumn B-tree on (a, b) is most efficient when the query constrains the leading column. A predicate on only b does not by itself limit the scan, though skip scan can help when a has few distinct values. `lower(email)` does not use a plain index on email. Every insert, update, and delete maintains each index.',
        bn: 'PostgreSQL অন্য টাইপ `USING` না লিখলে B-tree বানায়। সেটা সমতা আর রেঞ্জ দেয়, `BETWEEN` আর `IN` সহ। (a, b)-এর মাল্টিকলাম B-tree সবচেয়ে কার্যকর যখন প্রশ্ন প্রথম কলামকে বাঁধে। শুধু b-এর শর্ত নিজে থেকে স্ক্যান সীমাবদ্ধ করে না, যদিও a-এর আলাদা মান কম হলে স্কিপ স্ক্যান সাহায্য করতে পারে। `lower(email)` ইমেইলের সাদা ইনডেক্স ব্যবহার করে না। প্রতিটি ইনসার্ট, আপডেট আর ডিলিট প্রতিটি ইনডেক্স বজায় রাখে।'
      },
      redFlag: { en: '“Index every column.”', bn: '“প্রতিটি কলামে ইনডেক্স দিন।”' }
    },
    {
      q: { en: 'What does ACID mean?', bn: 'ACID মানে কী?' },
      short: { en: 'All or nothing, rules kept, readers separated, and a finished checkout survives a crash.', bn: 'সব অথবা কিছুই না, নিয়ম থাকে, পাঠক আলাদা, আর শেষ হওয়া চেকআউট ক্র্যাশের পরেও থাকে।' },
      deep: {
        en: 'Atomicity is the group. Consistency here means constraints still hold, not that replicas agree. Isolation is how much concurrent checkouts can see, at a chosen level. Durability is the flushed log: by default `synchronous_commit` is on, so commit waits for the local WAL flush. The table pages can be written later.',
        bn: 'অ্যাটমিসিটি হলো দলটা। এখানে কনসিসটেন্সি মানে কনস্ট্রেইন্ট এখনো টিকে আছে, রেপ্লিকা মিলে গেছে তা নয়। আইসোলেশন হলো সমসাময়িক চেকআউট কতটুকু দেখতে পায়, বেছে নেওয়া স্তরে। ডিউরাবিলিটি হলো ফ্লাশ হওয়া লগ: ডিফল্টে `synchronous_commit` চালু, তাই কমিট লোকাল WAL ফ্লাশের জন্য অপেক্ষা করে। টেবিলের পাতা পরে লেখা যেতে পারে।'
      },
      redFlag: { en: '“Consistency means every replica agrees.”', bn: '“কনসিসটেন্সি মানে প্রতিটি রেপ্লিকা একমত।”' }
    },
    {
      q: { en: 'What do the isolation levels actually do in PostgreSQL?', bn: 'PostgreSQL-এ আইসোলেশন স্তর আসলে কী করে?' },
      short: { en: 'Dirty reads never happen. Higher levels hold a view longer and may cancel a conflicting write.', bn: 'ডার্টি রিড কখনো হয় না। উঁচু স্তর দৃশ্য বেশিক্ষণ ধরে রাখে এবং সাংঘর্ষিক লেখা বাতিল করতে পারে।' },
      deep: {
        en: 'Read Committed is the default: each statement sees rows committed before it started. Requesting Read Uncommitted still behaves as Read Committed. Repeatable Read is snapshot isolation for the whole transaction, and it also refuses phantom reads. Both Repeatable Read and Serializable can abort a conflicting transaction, which the app must retry. Serializable adds checks for serialization anomalies. A read-only Repeatable Read transaction does not hit those update conflicts.',
        bn: 'Read Committed-ই ডিফল্ট: প্রতিটি স্টেটমেন্ট তার শুরুর আগে কমিট হওয়া সারি দেখে। Read Uncommitted চাইলেও আচরণ Read Committed-এর মতো। Repeatable Read পুরো ট্রানজ্যাকশনের স্ন্যাপশট আইসোলেশন, আর ফ্যান্টম রিডও দেয় না। Repeatable Read আর Serializable দুটোই সাংঘর্ষিক ট্রানজ্যাকশন বাতিল করতে পারে, অ্যাপকে আবার চেষ্টা করতে হয়। Serializable সিরিয়ালাইজেশন অ্যানোমালি পরীক্ষা যোগ করে। শুধু পড়া Repeatable Read ট্রানজ্যাকশন সেই আপডেট সংঘাতে পড়ে না।'
      },
      redFlag: { en: '“Read Uncommitted shows rows that are not committed yet.”', bn: '“Read Uncommitted এখনো কমিট হয়নি এমন সারি দেখায়।”' }
    },
    {
      q: { en: 'What is the many-trips problem, and how do you stop it?', bn: 'অনেক-যাত্রার সমস্যা কী, আর কীভাবে থামানো যায়?' },
      short: { en: 'One query for the list, then one more query for each item. Bring the related rows with the list.', bn: 'তালিকার জন্য এক প্রশ্ন, তারপর প্রতিটি আইটেমের জন্য আর এক প্রশ্ন। জড়িত সারি তালিকার সঙ্গে আনুন।' },
      deep: {
        en: 'Lazy load is the default relationship style: access emits a query per parent. `selectinload` emits one more query with an `IN` list and is the usual fix for a collection. `joinedload` adds a join, and in the 2.0 style a collection result must call `unique()`. An async session is not allowed to do that implicit IO, so load the relationship before you touch it. Django’s `select_related` is the join and `prefetch_related` is the second query. An index does not remove the extra trips.',
        bn: 'লেজি লোডই ডিফল্ট রিলেশন স্টাইল: ছোঁয়া লাগলে প্রতি অভিভাবকের জন্য এক প্রশ্ন যায়। `selectinload` একটা বাড়তি প্রশ্ন দেয় `IN` তালিকা সহ, কালেকশনের স্বাভাবিক সমাধান এটাই। `joinedload` এক জয়েন যোগ করে, আর 2.0 স্টাইলে কালেকশন ফলাফলে `unique()` কল করতে হয়। অ্যাসিঙ্ক সেশন সেই চুপচাপ আইও করতে পারে না, তাই ছোঁয়ার আগে রিলেশন লোড করুন। Django-র `select_related` জয়েন, আর `prefetch_related` দ্বিতীয় প্রশ্ন। ইনডেক্স বাড়তি যাত্রা সরায় না।'
      },
      redFlag: { en: '“Add an index and the extra trips go away.”', bn: '“একটা ইনডেক্স দিলে বাড়তি যাত্রা চলে যায়।”' }
    },
    {
      q: { en: 'How do you read EXPLAIN?', bn: 'EXPLAIN কীভাবে পড়বেন?' },
      short: { en: 'It shows the chosen plan and its estimated cost. ANALYZE runs the query and adds real time.', bn: 'সেটা বেছে নেওয়া পরিকল্পনা আর আনুমানিক খরচ দেখায়। ANALYZE কোয়েরি চালিয়ে আসল সময় যোগ করে।' },
      deep: {
        en: 'Plain `EXPLAIN` does not run the statement. `EXPLAIN ANALYZE` does, so a writing statement still writes. Compare estimated rows with actual rows. A large gap often means stale statistics, and `ANALYZE` on the table refreshes them. A high loops count on a nested index scan is the many-trips shape inside one statement. `BUFFERS` adds the cache and read counts.',
        bn: 'সাদা `EXPLAIN` স্টেটমেন্ট চালায় না। `EXPLAIN ANALYZE` চালায়, তাই লেখার স্টেটমেন্ট তখনো লেখে। আনুমানিক সারি আর আসল সারি মেলান। বড় ফারাক প্রায়ই পুরনো পরিসংখ্যান, আর টেবিলে `ANALYZE` সেটা রিফ্রেশ করে। নেস্টেড ইনডেক্স স্ক্যানে বড় loops সংখ্যা এক স্টেটমেন্টের ভেতরের অনেক-যাত্রা। `BUFFERS` ক্যাশ আর পড়ার সংখ্যা যোগ করে।'
      },
      redFlag: { en: '“EXPLAIN only prints the query text.”', bn: '“EXPLAIN শুধু কোয়েরির লেখা ছাপে।”' }
    }
  ],
  cheats: [
    { code: 'EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM users WHERE email = \'a@b.c\';', d: { en: 'Run the plan and show real time plus buffer use.', bn: 'পরিকল্পনা চালিয়ে আসল সময় আর বাফার ব্যবহার দেখান।' } },
    { code: 'CREATE INDEX CONCURRENTLY idx_users_email ON users (email);', d: { en: 'Build the index without locking out writes. It cannot run inside a transaction, and a failure leaves an invalid index.', bn: 'লেখা আটকে না রেখে ইনডেক্স বানান। ট্রানজ্যাকশনের ভেতরে চলে না, আর ব্যর্থ হলে একটা অবৈধ ইনডেক্স থেকে যায়।' } },
    { code: 'CREATE UNIQUE INDEX ON users (lower(email));', d: { en: 'A unique catalog on the lowered form of the address.', bn: 'ঠিকানার ছোট হাতের রূপের ওপর একটা অনন্য ক্যাটালগ।' } },
    { code: 'BEGIN; UPDATE books SET out = true WHERE id = 1; COMMIT;', d: { en: 'Group the writes. ROLLBACK throws the group away.', bn: 'লেখাগুলোকে এক দলে রাখুন। ROLLBACK দলটা ফেলে দেয়।' } },
    { code: 'SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;', d: { en: 'One snapshot for the whole transaction. A conflicting write can be aborted.', bn: 'পুরো ট্রানজ্যাকশনে এক স্ন্যাপশট। সাংঘর্ষিক লেখা বাতিল হতে পারে।' } },
    { code: 'SELECT * FROM books WHERE id = 1 FOR UPDATE;', d: { en: 'Lock the row so the next writer waits.', bn: 'সারিটা লক করুন যাতে পরের লেখক অপেক্ষা করে।' } },
    { code: 'select(User).options(selectinload(User.orders))', d: { en: 'One extra IN query for the related rows, instead of one query per parent.', bn: 'প্রতি অভিভাবকের এক প্রশ্নের বদলে জড়িত সারির জন্য একটা বাড়তি IN প্রশ্ন।' } },
    { code: 'ANALYZE users;', d: { en: 'Refresh the statistics the planner uses.', bn: 'প্ল্যানার যে পরিসংখ্যান ব্যবহার করে সেটা রিফ্রেশ করুন।' } }
  ],
  sources: [
    { label: 'PostgreSQL: index types', url: 'https://www.postgresql.org/docs/current/indexes-types.html' },
    { label: 'PostgreSQL: multicolumn indexes', url: 'https://www.postgresql.org/docs/current/indexes-multicolumn.html' },
    { label: 'PostgreSQL: transaction isolation', url: 'https://www.postgresql.org/docs/current/transaction-iso.html' },
    { label: 'PostgreSQL: explicit locking and deadlocks', url: 'https://www.postgresql.org/docs/current/explicit-locking.html' },
    { label: 'PostgreSQL: write-ahead log', url: 'https://www.postgresql.org/docs/current/wal-intro.html' },
    { label: 'PostgreSQL: EXPLAIN', url: 'https://www.postgresql.org/docs/current/using-explain.html' },
    { label: 'PostgreSQL: CREATE INDEX', url: 'https://www.postgresql.org/docs/current/sql-createindex.html' },
    { label: 'SQLAlchemy: relationship loading', url: 'https://docs.sqlalchemy.org/en/20/orm/queryguide/relationships.html' },
    { label: 'SQLAlchemy: asyncio', url: 'https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html' }
  ]
}
