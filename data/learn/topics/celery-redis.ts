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
  hook: {
    en: 'Slow jobs go to a back kitchen, so nobody waits at the counter.',
    bn: 'ধীর কাজ পেছনের রান্নাঘরে যায়, তাই কাউন্টারে কাউকে অপেক্ষা করতে হয় না।'
  },
  story: {
    cast: {
      en: 'Nila orders a birthday cake at a small bakery, where Sami takes orders at the counter and Babul bakes in the back.',
      bn: 'নিলা একটা ছোট বেকারিতে জন্মদিনের কেক চায়, যেখানে সামি কাউন্টারে অর্ডার নেয় আর বাবুল পেছনে কেক বানায়।'
    }
  },
  takeaway: {
    en: 'Take orders fast, cook elsewhere, collect when ready.',
    bn: 'দ্রুত অর্ডার নিন, অন্যখানে রান্না হোক, তৈরি হলে নিন।'
  },
  words: [
    {
      term: { en: 'Queue (Redis)', bn: 'কিউ (Redis)' },
      d: {
        en: 'A waiting line where jobs stand until someone is free.',
        bn: 'অপেক্ষার লাইন, যেখানে কাজ দাঁড়িয়ে থাকে যতক্ষণ না কেউ ফ্রি হয়।'
      }
    },
    {
      term: { en: 'Worker (Celery)', bn: 'ওয়ার্কার (Celery)' },
      d: {
        en: 'A helper program that waits for jobs and does them.',
        bn: 'সাহায্যকারী প্রোগ্রাম, যে কাজের অপেক্ষায় থেকে কাজগুলো করে দেয়।'
      }
    },
    {
      term: { en: 'Ticket', bn: 'টিকিট' },
      d: {
        en: 'A job’s number, so you can ask about it later.',
        bn: 'একটা কাজের নম্বর, যাতে পরে তার খোঁজ নেওয়া যায়।'
      }
    }
  ],
  legend: {
    request: { en: 'Order going in', bn: 'ভেতরে যাওয়া অর্ডার' },
    queue: { en: 'Ticket on the rail', bn: 'রেলের টিকিট' },
    result: { en: 'Dish or answer back', bn: 'ফেরত আসা খাবার বা উত্তর' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 760, 400 ], narrow: [ 400, 530 ] },
  nodes: {
    user: {
      icon: 'user',
      name: { en: 'You', bn: 'আপনি' },
      sub: { en: 'Browser', bn: 'ব্রাউজার' },
      plain: {
        name: { en: 'Customer', bn: 'কাস্টমার' },
        sub: { en: 'Orders a report', bn: 'রিপোর্ট চায়' }
      },
      wide: [ 70, 200, 'down' ],
      narrow: [ 200, 45, 'right' ]
    },
    api: {
      icon: 'server',
      name: { en: 'FastAPI app', bn: 'FastAPI অ্যাপ' },
      sub: { en: 'Takes requests', bn: 'রিকোয়েস্ট নেয়' },
      plain: {
        name: { en: 'Waiter', bn: 'ওয়েটার' },
        sub: { en: 'Takes the order', bn: 'অর্ডার নেয়' }
      },
      wide: [ 250, 200, 'down' ],
      narrow: [ 200, 170, 'right' ]
    },
    broker: {
      icon: 'queue',
      name: { en: 'Redis queue', bn: 'Redis কিউ' },
      sub: { en: 'The broker', bn: 'ব্রোকার' },
      plain: {
        name: { en: 'Order rail', bn: 'অর্ডার রেল' },
        sub: { en: 'Tickets wait here', bn: 'টিকিট অপেক্ষা করে' }
      },
      wide: [ 450, 90, 'up' ],
      narrow: [ 80, 300, 'right' ]
    },
    worker: {
      icon: 'worker',
      name: { en: 'Celery worker', bn: 'Celery ওয়ার্কার' },
      sub: { en: 'Does slow jobs', bn: 'ধীর কাজ করে' },
      plain: {
        name: { en: 'Cook', bn: 'রাঁধুনি' },
        sub: { en: 'Does the slow job', bn: 'ধীর কাজটা করে' }
      },
      wide: [ 620, 200, 'right' ],
      narrow: [ 200, 480, 'right' ]
    },
    result: {
      icon: 'store',
      name: { en: 'Result store', bn: 'রেজাল্ট স্টোর' },
      sub: { en: 'Redis again', bn: 'আবারও Redis' },
      plain: {
        name: { en: 'Pickup counter', bn: 'পিকআপ কাউন্টার' },
        sub: { en: 'Finished work waits', bn: 'তৈরি কাজ অপেক্ষা করে' }
      },
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
        moves: [ { edge: 'ua', label: 'POST /reports', plain: { en: 'Report order', bn: 'রিপোর্টের অর্ডার' } } ],
        story: {
          title: { en: 'Nila orders a cake', bn: 'নিলা একটা কেক চায়' },
          text: {
            en: 'Nila walks into the bakery and asks Sami at the counter for a big birthday cake. It takes half an hour to bake, so Nila should not stand there waiting.',
            bn: 'নিলা বেকারিতে ঢুকে কাউন্টারে সামিকে একটা বড় জন্মদিনের কেক চায়। বানাতে আধ ঘণ্টা লাগে, তাই নিলার দাঁড়িয়ে থাকা ঠিক নয়।'
          }
        },
        title: { en: 'You order a report', bn: 'আপনি একটা রিপোর্ট চান' },
        simple: {
          en: 'You tap “Make my report”. The order reaches the waiter, the web app. Building it takes half a minute.',
          bn: 'আপনি “রিপোর্ট বানাও” চাপলেন। অর্ডার পৌঁছাল ওয়েটারের কাছে, মানে ওয়েব অ্যাপে। বানাতে আধ মিনিট লাগে।'
        },
        tech: {
          en: 'An HTTP POST reaches a FastAPI route. Building the PDF takes about 30 s, far too long to keep this request open.',
          bn: 'একটা HTTP POST, FastAPI রুটে পৌঁছায়। PDF বানাতে প্রায় ৩০ সেকেন্ড লাগে, এতক্ষণ রিকোয়েস্ট খোলা রাখা যায় না।'
        }
      },
      {
        id: 'enqueue',
        moves: [ { edge: 'ab', label: 'task message', plain: { en: 'Order ticket', bn: 'অর্ডার টিকিট' } } ],
        story: {
          title: { en: 'Sami writes a slip', bn: 'সামি একটা চিরকুট লেখে' },
          text: {
            en: 'Sami does not bake. Sami writes the cake order on a small slip and clips it onto the hanging rail in the back of the shop.',
            bn: 'সামি কেক বানায় না। সে কেকের অর্ডার একটা ছোট চিরকুটে লিখে দোকানের পেছনের ঝোলানো রেলে আটকে দেয়।'
          }
        },
        title: { en: 'The waiter writes a ticket', bn: 'ওয়েটার একটা টিকিট লেখে' },
        simple: {
          en: 'The waiter does not cook. They write a small ticket saying what to make and clip it onto the order rail, a waiting line called a queue.',
          bn: 'ওয়েটার রান্না করেন না। কী বানাতে হবে তা ছোট টিকিটে লিখে অর্ডার রেলে আটকে দেন। এই অপেক্ষার লাইনের নাম কিউ।'
        },
        tech: {
          en: '`generate_report.delay(user_id=42)` serializes the task name and arguments to JSON and pushes the message onto the `celery` list in Redis, the broker.',
          bn: '`generate_report.delay(user_id=42)` টাস্কের নাম আর আর্গুমেন্ট JSON-এ সিরিয়ালাইজ করে Redis-এর `celery` লিস্টে পুশ করে। এখানে Redis হলো ব্রোকার।'
        }
      },
      {
        id: 'instant-reply',
        moves: [ { edge: 'au', label: '202 + task id', plain: { en: 'OK, ticket #42', bn: 'ঠিক আছে, টিকিট #৪২' } } ],
        story: {
          title: { en: 'Nila gets a number', bn: 'নিলা একটা নম্বর পায়' },
          text: {
            en: 'Sami smiles at once and says, “Your slip number is 42.” Nila is free to sit by the window and read while the cake is made.',
            bn: 'সামি সাথে সাথে হেসে বলে, “আপনার চিরকুট নম্বর ৪২।” কেক বানানোর সময় নিলা জানালার পাশে বসে বই পড়তে পারে।'
          }
        },
        title: { en: 'You get an instant reply', bn: 'আপনি সাথে সাথে উত্তর পেলেন' },
        simple: {
          en: 'The waiter answers at once: “Got it, your ticket number is 42.” You can keep using the page while the kitchen works.',
          bn: 'ওয়েটার সাথে সাথে বলেন: “পেয়েছি, আপনার টিকিট নম্বর ৪২।” রান্নাঘর কাজ করার সময় আপনি পেজটা ব্যবহার করতে পারেন।'
        },
        tech: {
          en: 'The route returns `202 Accepted` with the task id. Response time stays in milliseconds no matter how slow the job is.',
          bn: 'রুট টাস্ক id-সহ `202 Accepted` ফেরত দেয়। কাজ যত ধীরই হোক, রেসপন্স আসে মিলিসেকেন্ডে।'
        }
      },
      {
        id: 'pickup',
        moves: [ { edge: 'bw', label: 'task message', plain: { en: 'Order ticket', bn: 'অর্ডার টিকিট' } } ],
        story: {
          title: { en: 'Babul takes the slip', bn: 'বাবুল চিরকুটটা নেয়' },
          text: {
            en: 'Babul the baker keeps an eye on the rail. As soon as his hands are free, he takes the next slip and carries it to his table.',
            bn: 'বাবুল কারিগর রেলের দিকে নজর রাখে। হাত খালি হতেই সে পরের চিরকুটটা নিয়ে নিজের টেবিলে যায়।'
          }
        },
        title: { en: 'A cook takes the ticket', bn: 'একজন রাঁধুনি টিকিটটা নেন' },
        simple: {
          en: 'A cook, the worker, keeps watching the order rail. As soon as they are free, they take the next ticket and carry it off.',
          bn: 'রাঁধুনি, মানে ওয়ার্কার, সবসময় অর্ডার রেলের দিকে নজর রাখেন। ফ্রি হলেই পরের টিকিটটা নিয়ে চলে যান।'
        },
        tech: {
          en: 'The worker fetches with `BRPOP` and reserves up to 4 messages per process ahead of time (`worker_prefetch_multiplier`). Redis has no real acks, so Celery keeps an unacked copy and hands it out again after `visibility_timeout` (1 hour by default).',
          bn: 'ওয়ার্কার `BRPOP` দিয়ে মেসেজ আনে, আর প্রতি প্রসেসে আগেভাগে ৪টা পর্যন্ত মেসেজ রিজার্ভ করে রাখে (`worker_prefetch_multiplier`)। Redis-এ আসল ack নেই, তাই Celery একটা unacked কপি রাখে, আর `visibility_timeout` (ডিফল্ট ১ ঘণ্টা) পার হলে সেটা আবার বিলি করে।'
        }
      },
      {
        id: 'work',
        work: { node: 'worker', kind: 'queue' },
        story: {
          title: { en: 'Babul bakes the cake', bn: 'বাবুল কেক বানায়' },
          text: {
            en: 'Babul is busy mixing and baking Nila’s cake in the back. From the front you see nothing moving. Sami is free to serve other customers.',
            bn: 'বাবুল পেছনে নিলার কেক মেখে আর সেঁকে ব্যস্ত। সামনে থেকে কিছুই নড়তে দেখা যায় না। সামি ততক্ষণে অন্য ক্রেতাদের সামলায়।'
          }
        },
        title: { en: 'The cook makes the slow dish', bn: 'রাঁধুনি ধীর কাজটা করেন' },
        simple: {
          en: 'The cook lights up but nothing moves, because they are busy building your report. Meanwhile the waiter is free to serve other customers.',
          bn: 'রাঁধুনি জ্বলে ওঠেন, কিন্তু কিছু নড়ে না, কারণ তিনি আপনার রিপোর্ট বানাতে ব্যস্ত। এই ফাঁকে ওয়েটার অন্য কাস্টমারদের সেবা দিতে পারেন।'
        },
        tech: {
          en: 'The task runs in a prefork child process (one per CPU core by default). The message is acknowledged just before the task starts; `acks_late=True` moves that to after it finishes.',
          bn: 'টাস্ক চলে একটা prefork চাইল্ড প্রসেসে (ডিফল্টে প্রতি CPU কোরে একটা)। টাস্ক শুরুর ঠিক আগে মেসেজ acknowledge হয়; `acks_late=True` দিলে শেষ হওয়ার পরে হয়।'
        }
      },
      {
        id: 'saved',
        moves: [ { edge: 'wr', label: 'SUCCESS + file url', plain: { en: 'Done + link', bn: 'শেষ + লিংক' } } ],
        story: {
          title: { en: 'The cake waits for Nila', bn: 'কেকটা নিলার জন্য অপেক্ষা করে' },
          text: {
            en: 'The cake is ready. Babul puts it on the pickup shelf with a “ready” card and slip number 42 next to it.',
            bn: 'কেক তৈরি। বাবুল সেটা পিকআপ তাকে রাখে, পাশে একটা “তৈরি” কার্ড আর চিরকুট নম্বর ৪২।'
          }
        },
        title: { en: 'The result goes to the counter', bn: 'ফলাফল কাউন্টারে যায়' },
        simple: {
          en: 'When it is done, the cook puts the finished report and a “done” mark on the pickup counter, under your ticket number.',
          bn: 'কাজ শেষে রাঁধুনি তৈরি রিপোর্ট আর একটা “শেষ” চিহ্ন পিকআপ কাউন্টারে রাখেন, আপনার টিকিট নম্বরের নিচে।'
        },
        tech: {
          en: 'State and return value are written to the result backend under `celery-task-meta-<id>`. They expire after `result_expires` (1 day by default).',
          bn: 'স্টেট আর রিটার্ন ভ্যালু রেজাল্ট ব্যাকএন্ডে `celery-task-meta-<id>` নামে লেখা হয়। `result_expires` (ডিফল্ট ১ দিন) পরে মুছে যায়।'
        }
      },
      {
        id: 'poll',
        moves: [ { edge: 'ua', label: 'GET /tasks/{id}', plain: { en: 'Is #42 ready?', bn: '#৪২ কি তৈরি?' } } ],
        story: {
          title: { en: 'Nila asks again', bn: 'নিলা আবার জিজ্ঞেস করে' },
          text: {
            en: 'After a little while Nila walks up to the counter and asks Sami, “Is number 42 ready yet?” Nila does this every few minutes.',
            bn: 'একটু পরে নিলা কাউন্টারে গিয়ে সামিকে জিজ্ঞেস করে, “৪২ নম্বর কি তৈরি?” নিলা কয়েক মিনিট পরপর এটা করে।'
          }
        },
        title: { en: 'Your page checks back', bn: 'আপনার পেজ আবার খোঁজ নেয়' },
        simple: {
          en: 'Every few seconds your page asks the waiter: “Is ticket 42 ready yet?”',
          bn: 'কয়েক সেকেন্ড পরপর আপনার পেজ ওয়েটারকে জিজ্ঞেস করে: “টিকিট ৪২ কি তৈরি?”'
        },
        tech: {
          en: 'The client polls a status endpoint. WebSockets or server-sent events can push the update instead.',
          bn: 'ক্লায়েন্ট একটা স্ট্যাটাস এন্ডপয়েন্ট বারবার পোল করে। এর বদলে WebSocket বা server-sent events দিয়ে আপডেট পুশ করা যায়।'
        }
      },
      {
        id: 'lookup',
        moves: [ { edge: 'ar', label: 'lookup id', plain: { en: 'Look up #42', bn: '#৪২ খোঁজা' } } ],
        story: {
          title: { en: 'Sami checks the shelf', bn: 'সামি তাকে দেখে' },
          text: {
            en: 'Sami walks over to the pickup shelf and looks for the cake with number 42.',
            bn: 'সামি পিকআপ তাকের কাছে গিয়ে ৪২ নম্বরের কেকটা খোঁজে।'
          }
        },
        title: { en: 'The waiter checks the counter', bn: 'ওয়েটার কাউন্টারে দেখেন' },
        simple: {
          en: 'The waiter walks over to the pickup counter and looks for ticket 42.',
          bn: 'ওয়েটার পিকআপ কাউন্টারে গিয়ে টিকিট ৪২ খোঁজেন।'
        },
        tech: {
          en: '`AsyncResult(task_id).state` reads the backend. An unknown or expired id also comes back as `PENDING`, so `PENDING` does not prove the task exists. Never call `.get()` here; it blocks.',
          bn: '`AsyncResult(task_id).state` ব্যাকএন্ড পড়ে। অচেনা বা মেয়াদোত্তীর্ণ id-ও `PENDING` দেখায়, তাই `PENDING` মানেই টাস্ক আছে এমন নয়। এখানে কখনো `.get()` ডাকবেন না; এটা আটকে রাখে।'
        }
      },
      {
        id: 'answer',
        moves: [ { edge: 'ra', label: 'SUCCESS', plain: { en: 'Done + link', bn: 'শেষ + লিংক' } } ],
        story: {
          title: { en: 'The shelf has the cake', bn: 'তাকে কেকটা আছে' },
          text: {
            en: 'Sami finds the cake with its “ready” card. It is all done, and Sami heads back to the counter.',
            bn: 'সামি “তৈরি” কার্ডসহ কেকটা খুঁজে পায়। সব কাজ শেষ, আর সামি কাউন্টারে ফিরে আসে।'
          }
        },
        title: { en: 'The counter has your dish', bn: 'কাউন্টারে আপনার খাবার আছে' },
        simple: {
          en: 'The counter answers: done, and here is the link. The answer goes back to the waiter.',
          bn: 'কাউন্টার জানায়: কাজ শেষ, এই যে লিংক। উত্তরটা ওয়েটারের কাছে ফিরে আসে।'
        },
        tech: {
          en: 'The backend returns state `SUCCESS` and the task’s return value, deserialized from JSON.',
          bn: 'ব্যাকএন্ড `SUCCESS` স্টেট আর টাস্কের রিটার্ন ভ্যালু ফেরত দেয়, JSON থেকে ডিসিরিয়ালাইজ করে।'
        }
      },
      {
        id: 'download',
        moves: [ { edge: 'au', label: 'report link', plain: { en: 'Report link', bn: 'রিপোর্টের লিংক' } } ],
        story: {
          title: { en: 'Nila takes the cake home', bn: 'নিলা কেক নিয়ে বাড়ি যায়' },
          text: {
            en: 'Sami hands Nila the box. Nila never stood in a long wait, because Babul did the baking out of sight. Happy birthday!',
            bn: 'সামি নিলার হাতে বাক্সটা তুলে দেয়। নিলাকে লম্বা সময় দাঁড়িয়ে থাকতে হয়নি, কারণ বাবুল আড়ালে কেক বানিয়েছে। শুভ জন্মদিন!'
          }
        },
        title: { en: 'You download the report', bn: 'আপনি রিপোর্ট ডাউনলোড করেন' },
        simple: {
          en: 'The waiter brings your download button. No frozen screen, because the cook worked out of sight.',
          bn: 'ওয়েটার ডাউনলোড বাটন এনে দেন। স্ক্রিন আটকে থাকেনি, কারণ রাঁধুনি আড়ালে কাজ সেরেছেন।'
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
      label: { en: 'A dish goes wrong', bn: 'একটা খাবার নষ্ট হলে' },
      whatIf: {
        en: 'What if the cook hits a problem halfway through the dish?',
        bn: 'রান্নার মাঝপথে রাঁধুনি যদি সমস্যায় পড়েন?'
      },
      branchAfter: 'pickup',
      steps: [
        {
          id: 'crash',
          work: { node: 'worker', kind: 'error' },
          story: {
            title: { en: 'The oven goes cold', bn: 'ওভেন ঠান্ডা হয়ে যায়' },
            text: {
              en: 'Halfway through, Babul’s oven goes cold and he cannot finish Nila’s cake. This batch is spoiled.',
              bn: 'মাঝপথে বাবুলের ওভেন ঠান্ডা হয়ে যায়, আর সে নিলার কেক শেষ করতে পারে না। এই দফাটা নষ্ট।'
            }
          },
          title: { en: 'The job goes wrong', bn: 'কাজটা ভুল হয়ে যায়' },
          simple: {
            en: 'Halfway through, the cook cannot reach the place where files are saved. The dish fails.',
            bn: 'মাঝপথে রাঁধুনি যেখানে ফাইল জমা থাকে সেখানে পৌঁছাতে পারেন না। কাজটা ব্যর্থ হয়।'
          },
          tech: {
            en: 'The task raises `TimeoutError`. It is declared with `autoretry_for=(TimeoutError,)` and `retry_kwargs={\'countdown\': 60}`, so Celery schedules another attempt 60 s later instead of giving up.',
            bn: 'টাস্ক `TimeoutError` তোলে। টাস্কে `autoretry_for=(TimeoutError,)` আর `retry_kwargs={\'countdown\': 60}` দেওয়া আছে, তাই Celery হাল না ছেড়ে ৬০ সেকেন্ড পরে আবার চেষ্টার ব্যবস্থা করে।'
          }
        },
        {
          id: 'requeue',
          moves: [ { edge: 'wb', label: 'retry in 60 s', plain: { en: 'Try again soon', bn: 'একটু পরে আবার' } } ],
          story: {
            title: { en: 'The slip goes back', bn: 'চিরকুট আবার ফেরে' },
            text: {
              en: 'Babul clips Nila’s slip back onto the rail with a note: “try again in a minute”. Nila’s cake is not forgotten.',
              bn: 'বাবুল নিলার চিরকুটটা একটা নোটসহ আবার রেলে আটকে দেয়: “এক মিনিট পরে আবার চেষ্টা করো”। নিলার কেক ভোলা হয়নি।'
            }
          },
          title: { en: 'The ticket goes back in line', bn: 'টিকিট আবার লাইনে ফেরে' },
          simple: {
            en: 'The cook clips the ticket back onto the order rail with a note: “try again in a minute”.',
            bn: 'রাঁধুনি টিকিটটা একটা নোটসহ অর্ডার রেলে আবার আটকে দেন: “এক মিনিট পরে আবার চেষ্টা করো”।'
          },
          tech: {
            en: 'A retry publishes the task again with an ETA and `retries=1`, and the state becomes `RETRY`. After `max_retries` (3 by default) it stops with `FAILURE`.',
            bn: 'রিট্রাই টাস্কটাকে ETA আর `retries=1` দিয়ে আবার পাবলিশ করে, স্টেট হয় `RETRY`। `max_retries` (ডিফল্ট ৩) পার হলে থামে, স্টেট হয় `FAILURE`।'
          }
        },
        {
          id: 'second-try',
          moves: [ { edge: 'bw', label: 'task message, try 2', plain: { en: 'Ticket, try 2', bn: 'টিকিট, ২য় বার' } } ],
          story: {
            title: { en: 'Babul tries again', bn: 'বাবুল আবার চেষ্টা করে' },
            text: {
              en: 'A minute later Babul takes Nila’s slip from the rail again and starts over, this time with the oven warm.',
              bn: 'এক মিনিট পরে বাবুল রেল থেকে নিলার চিরকুটটা আবার নেয় আর নতুন করে শুরু করে, এবার ওভেন গরম।'
            }
          },
          title: { en: 'Second try', bn: 'দ্বিতীয় চেষ্টা' },
          simple: {
            en: 'A minute later a cook takes the ticket again.',
            bn: 'এক মিনিট পরে একজন রাঁধুনি টিকিটটা আবার নেন।'
          },
          tech: {
            en: 'Workers fetch ETA tasks early and hold them in memory until due. A countdown longer than `visibility_timeout` gets the task delivered twice, which is why tasks must be idempotent.',
            bn: 'ওয়ার্কাররা ETA টাস্ক আগেই এনে মেমরিতে রেখে দেয়, সময় হলে চালায়। countdown যদি `visibility_timeout`-এর চেয়ে লম্বা হয়, টাস্কটা দুবার ডেলিভার হয়; এজন্যই টাস্ক idempotent হতে হবে।'
          }
        },
        {
          id: 'works',
          moves: [ { edge: 'wr', label: 'SUCCESS', plain: { en: 'Done + link', bn: 'শেষ + লিংক' } } ],
          story: {
            title: { en: 'This time the cake is done', bn: 'এবার কেক তৈরি হয়' },
            text: {
              en: 'The cake comes out perfect and goes on the pickup shelf. Nila asks Sami like before, and gets the box. Nila only noticed a slightly longer wait.',
              bn: 'কেকটা নিখুঁত হয়ে পিকআপ তাকে যায়। নিলা আগের মতোই সামিকে জিজ্ঞেস করে আর বাক্সটা পায়। নিলা শুধু একটু বেশি অপেক্ষা টের পেয়েছে।'
            }
          },
          title: { en: 'This time it works', bn: 'এবার কাজ হয়ে যায়' },
          simple: {
            en: 'This time it works. The report is built and put on the pickup counter, and checking back goes exactly as before.',
            bn: 'এবার কাজ হয়ে যায়। রিপোর্ট তৈরি হয়ে পিকআপ কাউন্টারে যায়, আর খোঁজ নেওয়া হয় আগের মতোই।'
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
      en: 'A busy restaurant works the same way. This is the kitchen side, and every station has a twin there.',
      bn: 'একটা ব্যস্ত রেস্টুরেন্টও ঠিক এভাবেই চলে। এটা রান্নাঘরের দিক, আর প্রতিটি স্টেশনের একটা জোড়া আছে সেখানে।'
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
          en: 'Takes the order, hands you a ticket number, and never cooks.',
          bn: 'অর্ডার নেন, টিকিট নম্বর দেন, নিজে কখনো রান্না করেন না।'
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
          en: 'Finished dishes wait here under your ticket number.',
          bn: 'তৈরি খাবার এখানে আপনার টিকিট নম্বরে অপেক্ষা করে।'
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
        "          retry_kwargs={'max_retries': 5, 'countdown': 60},\n" +
        '          acks_late=True)\n' +
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
