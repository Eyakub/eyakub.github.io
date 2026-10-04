import type { Topic } from '../types'
import { UI } from '../ui'

export const celeryRedis: Topic = {
  slug: 'celery-redis',
  line: 'async',
  title: { en: 'Celery + Redis', bn: 'Celery + Redis' },
  summary: {
    en: 'How a web app hands slow jobs to a background worker, so nobody sits watching a spinner.',
    bn: 'ওয়েব অ্যাপ কীভাবে ধীর কাজগুলো ব্যাকগ্রাউন্ড ওয়ার্কারের হাতে দিয়ে দেয়, যাতে কাউকে লোডিং দেখে বসে থাকতে না হয়।'
  },
  view: { wide: [ 760, 400 ], narrow: [ 400, 530 ] },
  nodes: {
    user: {
      icon: 'user',
      name: { en: 'You', bn: 'আপনি' },
      sub: { en: 'Browser', bn: 'ব্রাউজার' },
      wide: [ 70, 200, 'down' ],
      narrow: [ 200, 45, 'right' ]
    },
    api: {
      icon: 'server',
      name: { en: 'FastAPI app', bn: 'FastAPI অ্যাপ' },
      sub: { en: 'Takes requests', bn: 'রিকোয়েস্ট নেয়' },
      wide: [ 250, 200, 'down' ],
      narrow: [ 200, 170, 'right' ]
    },
    broker: {
      icon: 'queue',
      name: { en: 'Redis queue', bn: 'Redis কিউ' },
      sub: { en: 'The broker', bn: 'ব্রোকার' },
      wide: [ 450, 90, 'up' ],
      narrow: [ 80, 300, 'right' ]
    },
    worker: {
      icon: 'worker',
      name: { en: 'Celery worker', bn: 'Celery ওয়ার্কার' },
      sub: { en: 'Does slow jobs', bn: 'ধীর কাজ করে' },
      wide: [ 620, 200, 'right' ],
      narrow: [ 200, 480, 'right' ]
    },
    result: {
      icon: 'store',
      name: { en: 'Result store', bn: 'রেজাল্ট স্টোর' },
      sub: { en: 'Redis again', bn: 'আবারও Redis' },
      wide: [ 450, 310, 'down' ],
      narrow: [ 300, 360, 'left' ]
    }
  },
  corridors: {
    'user-api': { wide: [ [ 70, 200 ], [ 250, 200 ] ], narrow: [ [ 200, 45 ], [ 200, 170 ] ] },
    'api-broker': {
      wide: [ [ 250, 200 ], [ 280, 200 ], [ 390, 90 ], [ 450, 90 ] ],
      narrow: [ [ 200, 170 ], [ 80, 290 ], [ 80, 300 ] ]
    },
    'broker-worker': {
      wide: [ [ 450, 90 ], [ 510, 90 ], [ 620, 200 ] ],
      narrow: [ [ 80, 300 ], [ 80, 360 ], [ 200, 480 ] ]
    },
    'worker-result': {
      wide: [ [ 620, 200 ], [ 510, 310 ], [ 450, 310 ] ],
      narrow: [ [ 200, 480 ], [ 300, 380 ], [ 300, 360 ] ]
    },
    'api-result': {
      wide: [ [ 250, 200 ], [ 280, 200 ], [ 390, 310 ], [ 450, 310 ] ],
      narrow: [ [ 200, 170 ], [ 300, 270 ], [ 300, 360 ] ]
    }
  },
  edges: {
    ua: { from: 'user', to: 'api', kind: 'request' },
    au: { from: 'api', to: 'user', kind: 'result' },
    ab: { from: 'api', to: 'broker', kind: 'queue' },
    bw: { from: 'broker', to: 'worker', kind: 'queue' },
    wb: { from: 'worker', to: 'broker', kind: 'error' },
    wr: { from: 'worker', to: 'result', kind: 'result' },
    ar: { from: 'api', to: 'result', kind: 'request' },
    ra: { from: 'result', to: 'api', kind: 'result' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'request',
        moves: [ { edge: 'ua', label: 'POST /reports' } ],
        title: { en: 'You ask for a report', bn: 'আপনি একটা রিপোর্ট চাইলেন' },
        simple: {
          en: 'You tap “Make my report”. Your request travels to the web app.',
          bn: 'আপনি “রিপোর্ট বানাও” বাটনে চাপ দিলেন। আপনার রিকোয়েস্ট ওয়েব অ্যাপের কাছে গেল।'
        },
        tech: {
          en: 'An HTTP POST reaches a FastAPI route. Building the PDF takes about 30 s, far too long to keep this request open.',
          bn: 'একটা HTTP POST, FastAPI রুটে পৌঁছায়। PDF বানাতে প্রায় ৩০ সেকেন্ড লাগে, এতক্ষণ রিকোয়েস্ট খোলা রাখা যায় না।'
        }
      },
      {
        id: 'enqueue',
        moves: [ { edge: 'ab', label: 'task message' } ],
        title: { en: 'The app writes a ticket', bn: 'অ্যাপ একটা টিকিট লেখে' },
        simple: {
          en: 'The app does not do the slow work itself. It writes a small ticket that says what to do and drops it into a waiting line.',
          bn: 'অ্যাপ নিজে ধীর কাজটা করে না। কী করতে হবে তা একটা ছোট টিকিটে লিখে অপেক্ষার লাইনে রেখে দেয়।'
        },
        tech: {
          en: '`generate_report.delay(user_id=42)` serializes the task name and arguments to JSON and pushes the message onto the `celery` list in Redis, the broker.',
          bn: '`generate_report.delay(user_id=42)` টাস্কের নাম আর আর্গুমেন্ট JSON-এ সিরিয়ালাইজ করে Redis-এর `celery` লিস্টে পুশ করে। এখানে Redis হলো ব্রোকার।'
        }
      },
      {
        id: 'instant-reply',
        moves: [ { edge: 'au', label: '202 + task id' } ],
        title: { en: 'You get an instant reply', bn: 'আপনি সাথে সাথে উত্তর পেলেন' },
        simple: {
          en: 'The app answers right away: “Got it. Here is your ticket number.” You can keep using the page.',
          bn: 'অ্যাপ সাথে সাথে জানায়: “পেয়েছি, এই নিন আপনার টিকিট নম্বর।” আপনি পেজটা ব্যবহার করতে থাকতে পারেন।'
        },
        tech: {
          en: 'The route returns `202 Accepted` with the task id. Response time stays in milliseconds no matter how slow the job is.',
          bn: 'রুট টাস্ক id-সহ `202 Accepted` ফেরত দেয়। কাজ যত ধীরই হোক, রেসপন্স আসে মিলিসেকেন্ডে।'
        }
      },
      {
        id: 'pickup',
        moves: [ { edge: 'bw', label: 'task message' } ],
        title: { en: 'A worker picks up the ticket', bn: 'একজন ওয়ার্কার টিকিটটা তুলে নেয়' },
        simple: {
          en: 'A separate helper program, the Celery worker, keeps watching the line. It takes the next ticket.',
          bn: 'Celery ওয়ার্কার নামে আলাদা একটা প্রোগ্রাম সবসময় লাইনের দিকে নজর রাখে। সে পরের টিকিটটা তুলে নেয়।'
        },
        tech: {
          en: 'The worker fetches with `BRPOP` and reserves up to 4 messages per process ahead of time (`worker_prefetch_multiplier`). Redis has no real acks, so Celery keeps an unacked copy and hands it out again after `visibility_timeout` (1 hour by default).',
          bn: 'ওয়ার্কার `BRPOP` দিয়ে মেসেজ আনে, আর প্রতি প্রসেসে আগেভাগে ৪টা পর্যন্ত মেসেজ রিজার্ভ করে রাখে (`worker_prefetch_multiplier`)। Redis-এ আসল ack নেই, তাই Celery একটা unacked কপি রাখে, আর `visibility_timeout` (ডিফল্ট ১ ঘণ্টা) পার হলে সেটা আবার বিলি করে।'
        }
      },
      {
        id: 'work',
        work: { node: 'worker', kind: 'queue' },
        title: { en: 'The worker does the slow job', bn: 'ওয়ার্কার ধীর কাজটা করে' },
        simple: {
          en: 'The worker builds your report. It can take as long as it needs, and the web app stays free to serve other people.',
          bn: 'ওয়ার্কার আপনার রিপোর্ট বানায়। যত সময়ই লাগুক, ওয়েব অ্যাপ ততক্ষণ অন্যদের সেবা দিতে পারে।'
        },
        tech: {
          en: 'The task runs in a prefork child process (one per CPU core by default). The message is acknowledged just before the task starts; `acks_late=True` moves that to after it finishes.',
          bn: 'টাস্ক চলে একটা prefork চাইল্ড প্রসেসে (ডিফল্টে প্রতি CPU কোরে একটা)। টাস্ক শুরুর ঠিক আগে মেসেজ acknowledge হয়; `acks_late=True` দিলে শেষ হওয়ার পরে হয়।'
        }
      },
      {
        id: 'saved',
        moves: [ { edge: 'wr', label: 'SUCCESS + file url' } ],
        title: { en: 'The result is saved', bn: 'ফলাফল জমা হয়' },
        simple: {
          en: 'When it is done, the worker puts the report link and a “done” mark in the results box.',
          bn: 'কাজ শেষে ওয়ার্কার রিপোর্টের লিংক আর “শেষ” চিহ্ন রেজাল্ট বক্সে রেখে দেয়।'
        },
        tech: {
          en: 'State and return value are written to the result backend under `celery-task-meta-<id>`. They expire after `result_expires` (1 day by default).',
          bn: 'স্টেট আর রিটার্ন ভ্যালু রেজাল্ট ব্যাকএন্ডে `celery-task-meta-<id>` নামে লেখা হয়। `result_expires` (ডিফল্ট ১ দিন) পরে মুছে যায়।'
        }
      },
      {
        id: 'poll',
        moves: [ { edge: 'ua', label: 'GET /tasks/{id}' } ],
        title: { en: 'Your page checks back', bn: 'আপনার পেজ আবার খোঁজ নেয়' },
        simple: {
          en: 'Every few seconds your page asks: “Is ticket 42 ready yet?”',
          bn: 'কয়েক সেকেন্ড পরপর আপনার পেজ জিজ্ঞেস করে: “টিকিট ৪২ কি তৈরি?”'
        },
        tech: {
          en: 'The client polls a status endpoint. WebSockets or server-sent events can push the update instead.',
          bn: 'ক্লায়েন্ট একটা স্ট্যাটাস এন্ডপয়েন্ট বারবার পোল করে। এর বদলে WebSocket বা server-sent events দিয়ে আপডেট পুশ করা যায়।'
        }
      },
      {
        id: 'lookup',
        moves: [ { edge: 'ar', label: 'lookup id' } ],
        title: { en: 'The app looks up your ticket', bn: 'অ্যাপ আপনার টিকিট খোঁজে' },
        simple: {
          en: 'The app looks in the results box using your ticket number.',
          bn: 'অ্যাপ আপনার টিকিট নম্বর দিয়ে রেজাল্ট বক্সে খোঁজে।'
        },
        tech: {
          en: '`AsyncResult(task_id).state` reads the backend. An unknown or expired id also comes back as `PENDING`, so `PENDING` does not prove the task exists. Never call `.get()` here; it blocks.',
          bn: '`AsyncResult(task_id).state` ব্যাকএন্ড পড়ে। অচেনা বা মেয়াদোত্তীর্ণ id-ও `PENDING` দেখায়, তাই `PENDING` মানেই টাস্ক আছে এমন নয়। এখানে কখনো `.get()` ডাকবেন না; এটা আটকে রাখে।'
        }
      },
      {
        id: 'answer',
        moves: [ { edge: 'ra', label: 'SUCCESS' } ],
        title: { en: 'The answer comes back', bn: 'উত্তর ফিরে আসে' },
        simple: { en: 'The box says: done, here is the link.', bn: 'বক্স জানায়: কাজ শেষ, এই যে লিংক।' },
        tech: {
          en: 'The backend returns state `SUCCESS` and the task’s return value, deserialized from JSON.',
          bn: 'ব্যাকএন্ড `SUCCESS` স্টেট আর টাস্কের রিটার্ন ভ্যালু ফেরত দেয়, JSON থেকে ডিসিরিয়ালাইজ করে।'
        }
      },
      {
        id: 'download',
        moves: [ { edge: 'au', label: 'report link' } ],
        title: { en: 'You download the report', bn: 'আপনি রিপোর্ট ডাউনলোড করেন' },
        simple: {
          en: 'Your page shows the download button. You never had to stare at a frozen screen.',
          bn: 'আপনার পেজে ডাউনলোড বাটন চলে আসে। একবারও আটকে থাকা স্ক্রিনের দিকে তাকিয়ে থাকতে হয়নি।'
        },
        tech: {
          en: 'The status endpoint returns 200 with the result. The API spent only milliseconds on this user the whole time.',
          bn: 'স্ট্যাটাস এন্ডপয়েন্ট ফলাফলসহ 200 ফেরত দেয়। পুরো সময়ে API এই ইউজারের পেছনে খরচ করেছে মাত্র কয়েক মিলিসেকেন্ড।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'failure',
      label: UI.routeFail,
      branchAfter: 'pickup',
      steps: [
        {
          id: 'crash',
          work: { node: 'worker', kind: 'error' },
          title: { en: 'The job crashes', bn: 'কাজটা মাঝপথে ব্যর্থ হয়' },
          simple: {
            en: 'Halfway through, the file storage does not answer. The worker hits an error.',
            bn: 'মাঝপথে ফাইল স্টোরেজ সাড়া দেয় না। ওয়ার্কার একটা এররে পড়ে।'
          },
          tech: {
            en: 'The task raises `TimeoutError`. It is declared with `autoretry_for=(TimeoutError,)`, so Celery schedules another attempt instead of giving up.',
            bn: 'টাস্ক `TimeoutError` তোলে। টাস্কে `autoretry_for=(TimeoutError,)` দেওয়া আছে, তাই Celery হাল না ছেড়ে আবার চেষ্টার ব্যবস্থা করে।'
          }
        },
        {
          id: 'requeue',
          moves: [ { edge: 'wb', label: 'retry in 60 s' } ],
          title: { en: 'The ticket goes back in line', bn: 'টিকিট আবার লাইনে ফেরে' },
          simple: {
            en: 'The worker puts the ticket back with a note: “try again in a minute”.',
            bn: 'ওয়ার্কার টিকিটটা একটা নোটসহ ফেরত রাখে: “এক মিনিট পরে আবার চেষ্টা করো”।'
          },
          tech: {
            en: 'A retry publishes the task again with an ETA and `retries=1`, and the state becomes `RETRY`. After `max_retries` (3 by default) it stops with `FAILURE`.',
            bn: 'রিট্রাই টাস্কটাকে ETA আর `retries=1` দিয়ে আবার পাবলিশ করে, স্টেট হয় `RETRY`। `max_retries` (ডিফল্ট ৩) পার হলে থামে, স্টেট হয় `FAILURE`।'
          }
        },
        {
          id: 'second-try',
          moves: [ { edge: 'bw', label: 'task message, try 2' } ],
          title: { en: 'Second try', bn: 'দ্বিতীয় চেষ্টা' },
          simple: {
            en: 'A minute later a worker picks the ticket up again.',
            bn: 'এক মিনিট পরে একজন ওয়ার্কার টিকিটটা আবার তুলে নেয়।'
          },
          tech: {
            en: 'Workers fetch ETA tasks early and hold them in memory until due. A countdown longer than `visibility_timeout` gets the task delivered twice, which is why tasks must be idempotent.',
            bn: 'ওয়ার্কাররা ETA টাস্ক আগেই এনে মেমরিতে রেখে দেয়, সময় হলে চালায়। countdown যদি `visibility_timeout`-এর চেয়ে লম্বা হয়, টাস্কটা দুবার ডেলিভার হয়; এজন্যই টাস্ক idempotent হতে হবে।'
          }
        },
        {
          id: 'works',
          moves: [ { edge: 'wr', label: 'SUCCESS' } ],
          title: { en: 'This time it works', bn: 'এবার কাজ হয়ে যায়' },
          simple: {
            en: 'The storage answers, the report is built, and the result is saved. From here, checking back works exactly like before.',
            bn: 'এবার স্টোরেজ সাড়া দেয়, রিপোর্ট তৈরি হয়, ফলাফল জমা হয়। এরপর খোঁজ নেওয়ার ধাপগুলো আগের মতোই।'
          },
          tech: {
            en: 'The client saw `RETRY` for about a minute, then `SUCCESS`. It never had to handle the crash itself.',
            bn: 'ক্লায়েন্ট প্রায় এক মিনিট `RETRY` দেখেছে, তারপর `SUCCESS`। ক্র্যাশটা তাকে নিজে সামলাতে হয়নি।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A busy restaurant runs the same way. Every station has a twin in the kitchen.',
      bn: 'একটা ব্যস্ত রেস্টুরেন্টও ঠিক এভাবেই চলে। প্রতিটি স্টেশনের একটা জোড়া আছে রান্নাঘরে।'
    },
    twins: [
      {
        icon: 'user',
        node: 'user',
        name: { en: 'The customer', bn: 'কাস্টমার' },
        d: {
          en: 'Orders food, then chats with friends instead of standing at the kitchen door.',
          bn: 'খাবার অর্ডার দিয়ে বন্ধুদের সাথে গল্প করেন, রান্নাঘরের দরজায় দাঁড়িয়ে থাকেন না।'
        }
      },
      {
        icon: 'server',
        node: 'api',
        name: { en: 'The waiter', bn: 'ওয়েটার' },
        d: {
          en: 'Takes the order, hands you a token, and never cooks.',
          bn: 'অর্ডার নেন, টোকেন দেন, নিজে কখনো রান্না করেন না।'
        }
      },
      {
        icon: 'queue',
        node: 'broker',
        name: { en: 'The order rail', bn: 'অর্ডার রেল' },
        d: {
          en: 'Tickets clip onto the rail and wait their turn.',
          bn: 'টিকিটগুলো রেলে ঝোলানো থাকে, পালা আসার অপেক্ষায়।'
        }
      },
      {
        icon: 'worker',
        node: 'worker',
        name: { en: 'The cook', bn: 'রাঁধুনি' },
        d: {
          en: 'Takes the next ticket and cooks. On a busy night you hire more cooks, not more waiters.',
          bn: 'পরের টিকিট নিয়ে রান্না করেন। ভিড়ের রাতে আরও রাঁধুনি রাখেন, ওয়েটার নয়।'
        }
      },
      {
        icon: 'store',
        node: 'result',
        name: { en: 'The pickup counter', bn: 'পিকআপ কাউন্টার' },
        d: {
          en: 'Finished dishes wait here under your token number.',
          bn: 'তৈরি খাবার এখানে আপনার টোকেন নম্বরে অপেক্ষা করে।'
        }
      },
      {
        icon: 'retry',
        node: null,
        name: { en: 'A burnt dish', bn: 'পুড়ে যাওয়া খাবার' },
        is: { en: 'is a retry', bn: 'মানে রিট্রাই' },
        d: {
          en: 'The cook clips the ticket back on the rail and makes it again.',
          bn: 'রাঁধুনি টিকিটটা আবার রেলে ঝুলিয়ে দেন, আবার রান্না করেন।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'Why not do the slow work inside the API request?',
        bn: 'API রিকোয়েস্টের ভেতরেই ধীর কাজটা করলে সমস্যা কী?'
      },
      short: {
        en: 'It holds the request open and ties up a server worker, so a few slow jobs can stall everyone. Celery moves the work out and the API replies in milliseconds.',
        bn: 'রিকোয়েস্ট খোলা থাকে, সার্ভারের একটা ওয়ার্কারও আটকে যায়; কয়েকটা ধীর কাজেই সবার জন্য সাইট আটকে যেতে পারে। Celery কাজটা বাইরে সরিয়ে দেয়, API মিলিসেকেন্ডে উত্তর দেয়।'
      },
      deep: {
        en: 'Web servers have a limited number of workers. A 30-second PDF holds one for 30 seconds, and a proxy may time out before it finishes. A queue also gives you retries and lets you scale workers separately from web servers.',
        bn: 'ওয়েব সার্ভারের ওয়ার্কার সীমিত। ৩০ সেকেন্ডের একটা PDF পুরো ৩০ সেকেন্ড একটা ওয়ার্কার আটকে রাখে, আর প্রক্সি হয়তো তার আগেই টাইমআউট দেয়। কিউ থাকলে রিট্রাই পাওয়া যায়, আর ওয়েব সার্ভার থেকে আলাদা করে ওয়ার্কার বাড়ানো যায়।'
      },
      redFlag: {
        en: '“Celery makes the code run faster.” It runs the same code, just somewhere else.',
        bn: '“Celery কোড দ্রুত চালায়।” একই কোড চলে, শুধু অন্য জায়গায়।'
      }
    },
    {
      q: {
        en: 'What is the difference between the broker and the result backend?',
        bn: 'ব্রোকার আর রেজাল্ট ব্যাকএন্ডের পার্থক্য কী?'
      },
      short: {
        en: 'The broker carries task messages to workers. The result backend stores what happened afterwards. Redis can do both, but they are separate jobs.',
        bn: 'ব্রোকার টাস্কের মেসেজ ওয়ার্কারের কাছে পৌঁছায়। রেজাল্ট ব্যাকএন্ড পরে কী হলো তা জমা রাখে। Redis দুটোই করতে পারে, কিন্তু কাজ দুটো আলাদা।'
      },
      deep: {
        en: 'They are configured separately (`broker_url`, `result_backend`). Many teams pick RabbitMQ as the broker for native acks and keep Redis for results. If Redis also serves as your cache, use a separate instance or DB so cache eviction can never delete queued tasks. If nothing reads results, set `ignore_result=True`.',
        bn: 'দুটো আলাদাভাবে কনফিগার হয় (`broker_url`, `result_backend`)। অনেকে আসল ack-এর জন্য RabbitMQ-কে ব্রোকার আর Redis-কে রেজাল্টের জন্য রাখে। Redis যদি ক্যাশ হিসেবেও চলে, আলাদা ইনস্ট্যান্স বা DB দিন, যাতে ক্যাশ eviction কখনো কিউ-এর টাস্ক মুছে না ফেলে। ফলাফল কেউ না পড়লে `ignore_result=True` দিন।'
      },
      redFlag: {
        en: '“They are the same thing, both are just Redis.”',
        bn: '“দুটো একই জিনিস, দুটোই তো Redis।”'
      }
    },
    {
      q: {
        en: 'A worker crashes halfway through a task. What happens?',
        bn: 'কাজের মাঝখানে ওয়ার্কার ক্র্যাশ করলে কী হয়?'
      },
      short: {
        en: 'With default settings the message was already acknowledged, so the task is lost. Set `acks_late=True` and `task_reject_on_worker_lost=True` and it is delivered again.',
        bn: 'ডিফল্ট সেটিংসে মেসেজ আগেই acknowledge হয়ে গেছে, তাই টাস্কটা হারিয়ে যায়। `acks_late=True` আর `task_reject_on_worker_lost=True` দিলে আবার ডেলিভার হয়।'
      },
      deep: {
        en: '`acks_late` alone is not enough: a worker that dies abruptly still acks on exit unless `task_reject_on_worker_lost` is on. Together they swap “maybe lost” for “maybe runs twice”, so tasks must be idempotent. On Redis, keep `visibility_timeout` longer than your slowest task or a second worker gets the same task.',
        bn: 'শুধু `acks_late` যথেষ্ট নয়: `task_reject_on_worker_lost` বন্ধ থাকলে হঠাৎ মারা যাওয়া ওয়ার্কারও বের হওয়ার সময় ack করে দেয়। দুটো একসাথে “হয়তো হারাবে”-র বদলে “হয়তো দুবার চলবে” দেয়, তাই টাস্ক idempotent হতে হবে। Redis-এ `visibility_timeout` সবচেয়ে ধীর টাস্কের চেয়ে বেশি রাখুন, নইলে দ্বিতীয় ওয়ার্কার একই টাস্ক পেয়ে যাবে।'
      },
      redFlag: {
        en: '“`acks_late` gives exactly-once delivery.” It gives at-least-once.',
        bn: '“`acks_late` দিলে ঠিক একবার ডেলিভারি হয়।” আসলে হয় অন্তত একবার।'
      }
    },
    {
      q: { en: 'Why should tasks be idempotent?', bn: 'টাস্ক idempotent হওয়া কেন জরুরি?' },
      short: {
        en: 'A task can run more than once because of retries or redelivery, so running it twice must end the same way as running it once.',
        bn: 'রিট্রাই বা রিডেলিভারির কারণে একই টাস্ক একাধিকবার চলতে পারে, তাই দুবার চললেও ফল একবার চলার মতোই হতে হবে।'
      },
      deep: {
        en: 'Charging a card twice or sending the same email twice is the classic bug. Guard it with a unique key: record “payment 42 done” and skip if it is already there, or pass the payment provider’s idempotency key.',
        bn: 'কার্ড থেকে দুবার টাকা কাটা বা একই ইমেইল দুবার যাওয়া হলো ক্লাসিক বাগ। একটা ইউনিক কী দিয়ে আটকান: “payment 42 done” লিখে রাখুন, আগে থেকে থাকলে বাদ দিন, বা পেমেন্ট প্রোভাইডারের idempotency key পাঠান।'
      },
      redFlag: { en: '“Each task runs exactly once.”', bn: '“প্রতিটি টাস্ক ঠিক একবারই চলে।”' }
    },
    {
      q: { en: 'What should you pass to .delay()?', bn: '.delay()-তে কী পাঠানো উচিত?' },
      short: {
        en: 'Small, JSON-friendly values such as IDs. Let the task load fresh data itself.',
        bn: 'ছোট, JSON-বান্ধব মান, যেমন id। টাস্ক নিজেই নতুন করে ডেটা লোড করুক।'
      },
      deep: {
        en: 'Arguments are serialized into the message (JSON by default since Celery 4). An ORM object will not serialize, bloats the queue, and is stale by the time the worker runs. Pass `user_id=42` and query inside the task. Pickle is unsafe: anyone who can write to the broker can run code on your workers.',
        bn: 'আর্গুমেন্ট মেসেজের ভেতরে সিরিয়ালাইজ হয় (Celery 4 থেকে ডিফল্ট JSON)। ORM অবজেক্ট সিরিয়ালাইজ হবে না, কিউ ভারী করবে, আর ওয়ার্কার চালানোর সময় তা পুরনো হয়ে যাবে। `user_id=42` পাঠান, টাস্কের ভেতরে কোয়েরি করুন। pickle অনিরাপদ: ব্রোকারে লিখতে পারলেই যে কেউ আপনার ওয়ার্কারে কোড চালাতে পারবে।'
      },
      redFlag: {
        en: '“Pass the user object and switch the serializer to pickle.”',
        bn: '“পুরো user অবজেক্ট পাঠান, আর serializer pickle করে দিন।”'
      }
    }
  ],
  cheats: [
    {
      code: 'celery -A app worker --loglevel=INFO',
      d: {
        en: 'Start a worker that reads the default queue.',
        bn: 'ডিফল্ট কিউ পড়া একটা ওয়ার্কার চালু করুন।'
      }
    },
    {
      code: 'celery -A app worker -Q reports --concurrency=4',
      d: {
        en: 'Four processes that only take jobs from the “reports” queue.',
        bn: 'চারটি প্রসেস, শুধু “reports” কিউ থেকে কাজ নেয়।'
      }
    },
    {
      code: 'celery -A app beat',
      d: {
        en: 'The scheduler for periodic tasks. Run exactly one.',
        bn: 'পিরিয়ডিক টাস্কের শিডিউলার। ঠিক একটাই চালাবেন।'
      }
    },
    {
      code: 'celery -A app inspect active',
      d: {
        en: 'See what every worker is running right now.',
        bn: 'এই মুহূর্তে প্রতিটি ওয়ার্কার কী চালাচ্ছে দেখুন।'
      }
    },
    {
      code: 'redis-cli LLEN celery',
      d: {
        en: 'How many tasks are waiting in the default queue.',
        bn: 'ডিফল্ট কিউতে কতগুলো টাস্ক অপেক্ষা করছে।'
      }
    },
    {
      code: '@app.task(bind=True, autoretry_for=(TimeoutError,),\n' +
        '          retry_backoff=True, max_retries=5, acks_late=True)\n' +
        'def generate_report(self, user_id: int) -> str:\n' +
        '    ...\n' +
        '\n' +
        'result = generate_report.delay(user_id=42)\n' +
        'AsyncResult(result.id).state   # PENDING → SUCCESS',
      d: {
        en: 'Define a retrying task, queue it, check its state.',
        bn: 'রিট্রাই-সহ টাস্ক বানান, কিউতে দিন, স্টেট দেখুন।'
      }
    }
  ],
  sources: [
    {
      label: 'Celery: Using Redis',
      url: 'https://docs.celeryq.dev/en/stable/getting-started/backends-and-brokers/redis.html'
    },
    {
      label: 'Celery: Configuration',
      url: 'https://docs.celeryq.dev/en/stable/userguide/configuration.html'
    },
    { label: 'Celery: Tasks', url: 'https://docs.celeryq.dev/en/stable/userguide/tasks.html' }
  ]
}
