import type { Topic } from '../types'
import { UI } from '../ui'

export const fastapiLifecycle: Topic = {
  slug: 'fastapi-lifecycle',
  line: 'backend',
  title: { en: 'FastAPI request lifecycle', bn: 'FastAPI রিকোয়েস্ট লাইফসাইকেল' },
  summary: {
    en: 'Every layer a request passes on its way into your function, and back out again as a response.',
    bn: 'একটা রিকোয়েস্ট আপনার ফাংশনে পৌঁছাতে আর রেসপন্স হয়ে ফিরে আসতে কোন কোন স্তর পার হয়, তার পুরো গল্প।'
  },
  hook: {
    en: 'Every click on a website follows one path, like an order through a restaurant, so you know where problems hide.',
    bn: 'ওয়েবসাইটের প্রতিটি ক্লিক রেস্টুরেন্টের অর্ডারের মতো একই পথে চলে, তাই আপনি জানেন সমস্যা কোথায় লুকোতে পারে।'
  },
  takeaway: {
    en: 'Slow extras, like a receipt email, wait until the customer has been served.',
    bn: 'রসিদ ইমেইলের মতো ধীর বাড়তি কাজ অপেক্ষা করে, কাস্টমার খাবার পাওয়ার পরে।'
  },
  words: [
    {
      term: { en: 'Server (Uvicorn)', bn: 'সার্ভার (Uvicorn)' },
      d: {
        en: 'A program that waits for visitors and answers their requests.',
        bn: 'যে প্রোগ্রাম দর্শকদের অপেক্ষায় থাকে আর তাদের অনুরোধের উত্তর দেয়।'
      }
    },
    {
      term: { en: 'Request', bn: 'অনুরোধ' },
      d: {
        en: 'A message asking a website for something, like an order slip.',
        bn: 'ওয়েবসাইটের কাছে কিছু চাওয়ার বার্তা, অনেকটা অর্ডার স্লিপের মতো।'
      }
    },
    {
      term: { en: 'App (FastAPI)', bn: 'অ্যাপ (FastAPI)' },
      d: {
        en: 'The program you wrote, which decides how to answer each request.',
        bn: 'আপনার লেখা প্রোগ্রাম, যে ঠিক করে প্রতিটি অনুরোধের উত্তর কী হবে।'
      }
    },
    {
      term: { en: 'Route', bn: 'রুট' },
      d: {
        en: 'An address your app answers, such as the page for item 42.',
        bn: 'আপনার অ্যাপ যে ঠিকানার উত্তর দেয়, যেমন ৪২ নম্বর আইটেমের পাতা।'
      }
    },
    {
      term: { en: 'Checkpoint (middleware)', bn: 'চেকপয়েন্ট (middleware)' },
      d: {
        en: 'A step every request and reply passes through, going in and out.',
        bn: 'এমন ধাপ, যা প্রতিটি অনুরোধ আর উত্তর ঢোকা-বেরোনোর পথে পার হয়।'
      }
    },
    {
      term: { en: 'Database', bn: 'ডেটাবেস' },
      d: {
        en: 'The organised store where an app keeps its information.',
        bn: 'যেখানে অ্যাপ তার তথ্য গুছিয়ে রাখে।'
      }
    }
  ],
  legend: {
    request: { en: 'Order going in', bn: 'ভেতরে যাওয়া অর্ডার' },
    queue: { en: 'Side note', bn: 'আলাদা বার্তা' },
    result: { en: 'Dish coming back', bn: 'ফেরত আসা খাবার' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 1000, 410 ], narrow: [ 400, 576 ] },
  nodeR: { narrow: 20 },
  nodes: {
    client: {
      icon: 'user',
      name: { en: 'Client', bn: 'ক্লায়েন্ট' },
      sub: { en: 'Browser or app', bn: 'ব্রাউজার বা অ্যাপ' },
      plain: {
        name: { en: 'Customer', bn: 'কাস্টমার' },
        sub: { en: 'Orders from the site', bn: 'সাইটে অর্ডার দেয়' }
      },
      wide: [ 76, 120, 'up' ],
      narrow: [ 150, 36, 'right' ]
    },
    uvicorn: {
      icon: 'server',
      name: { en: 'Uvicorn', bn: 'Uvicorn' },
      sub: { en: 'ASGI server', bn: 'ASGI সার্ভার' },
      plain: {
        name: { en: 'Host at the door', bn: 'দরজার হোস্ট' },
        sub: { en: 'Takes the slip', bn: 'স্লিপ নেয়' }
      },
      wide: [ 283, 120, 'up' ],
      narrow: [ 150, 100, 'right' ]
    },
    sem: {
      icon: 'shield',
      name: { en: 'ServerErrorMiddleware', bn: 'ServerErrorMiddleware' },
      sub: { en: 'Safety net', bn: 'সেফটি নেট' },
      plain: {
        name: { en: 'Manager', bn: 'ম্যানেজার' },
        sub: { en: 'Rescues big mishaps', bn: 'বড় গোলমাল সামলায়' }
      },
      wide: [ 490, 120, 'up' ],
      narrow: [ 150, 164, 'right' ]
    },
    mw: {
      icon: 'lock',
      name: { en: 'Your middleware', bn: 'আপনার middleware' },
      sub: { en: 'CORS, auth, timing', bn: 'CORS, auth, টাইমিং' },
      plain: {
        name: { en: 'Security desk', bn: 'সিকিউরিটি ডেস্ক' },
        sub: { en: 'Checks you in and out', bn: 'ঢোকা-বেরোনোয় যাচাই করে' }
      },
      wide: [ 697, 120, 'up' ],
      narrow: [ 150, 228, 'right' ]
    },
    exm: {
      icon: 'alert',
      name: { en: 'ExceptionMiddleware', bn: 'ExceptionMiddleware' },
      sub: { en: 'Errors to replies', bn: 'এরর থেকে রিপ্লাই' },
      plain: {
        name: { en: 'Guest relations', bn: 'গেস্ট সার্ভিস' },
        sub: { en: 'Explains errors politely', bn: 'ভদ্রভাবে ভুল বোঝায়' }
      },
      wide: [ 904, 120, 'up' ],
      narrow: [ 150, 292, 'right' ]
    },
    router: {
      icon: 'route',
      name: { en: 'Router', bn: 'Router' },
      sub: { en: 'Picks the function', bn: 'ফাংশন বেছে নেয়' },
      plain: {
        name: { en: 'Seating host', bn: 'সিট দেখানো হোস্ট' },
        sub: { en: 'Picks the right chef', bn: 'সঠিক শেফ বেছে দেয়' }
      },
      wide: [ 904, 330, 'down' ],
      narrow: [ 150, 356, 'right' ]
    },
    deps: {
      icon: 'check',
      name: { en: 'Dependencies', bn: 'Dependencies' },
      sub: { en: 'Inputs + validation', bn: 'ইনপুট + ভ্যালিডেশন' },
      plain: {
        name: { en: 'Order desk', bn: 'অর্ডার ডেস্ক' },
        sub: { en: 'Checks the form', bn: 'ফর্ম দেখে' }
      },
      wide: [ 697, 330, 'down' ],
      narrow: [ 150, 420, 'right' ]
    },
    op: {
      icon: 'code',
      name: { en: 'Your function', bn: 'আপনার ফাংশন' },
      sub: { en: 'def or async def', bn: 'def বা async def' },
      plain: {
        name: { en: 'Chef', bn: 'শেফ' },
        sub: { en: 'Cooks the dish', bn: 'খাবার রান্না করে' }
      },
      wide: [ 490, 330, 'down' ],
      narrow: [ 150, 484, 'right' ]
    },
    bg: {
      icon: 'mail',
      name: { en: 'BackgroundTasks', bn: 'BackgroundTasks' },
      sub: { en: 'After the reply', bn: 'রিপ্লাইয়ের পরে' },
      plain: {
        name: { en: 'Courier', bn: 'কুরিয়ার' },
        sub: { en: 'Slow extras afterwards', bn: 'ধীর বাড়তি কাজ, পরে' }
      },
      wide: [ 283, 330, 'down' ],
      narrow: [ 150, 548, 'right' ]
    }
  },
  groups: [
    {
      id: 'stack',
      label: { en: 'Middleware stack', bn: 'মিডলওয়্যার স্ট্যাক' },
      plain: { en: 'Front-desk team', bn: 'সামনের দল' },
      wide: [ 388, 44, 606, 124 ],
      narrow: [ 115, 134, 280, 188 ]
    }
  ],
  corridors: {
    'client-uvicorn': { wide: [ [ 76, 120 ], [ 283, 120 ] ], narrow: [ [ 150, 36 ], [ 150, 100 ] ] },
    'uvicorn-sem': { wide: [ [ 283, 120 ], [ 490, 120 ] ], narrow: [ [ 150, 100 ], [ 150, 164 ] ] },
    'sem-mw': { wide: [ [ 490, 120 ], [ 697, 120 ] ], narrow: [ [ 150, 164 ], [ 150, 228 ] ] },
    'mw-exm': { wide: [ [ 697, 120 ], [ 904, 120 ] ], narrow: [ [ 150, 228 ], [ 150, 292 ] ] },
    'exm-router': { wide: [ [ 904, 120 ], [ 904, 330 ] ], narrow: [ [ 150, 292 ], [ 150, 356 ] ] },
    'router-deps': { wide: [ [ 904, 330 ], [ 697, 330 ] ], narrow: [ [ 150, 356 ], [ 150, 420 ] ] },
    'deps-op': { wide: [ [ 697, 330 ], [ 490, 330 ] ], narrow: [ [ 150, 420 ], [ 150, 484 ] ] },
    'op-bg': { wide: [ [ 490, 330 ], [ 283, 330 ] ], narrow: [ [ 150, 484 ], [ 150, 548 ] ] },
    'deps-exm': { wide: [ [ 697, 330 ], [ 904, 120 ] ], narrow: [ [ 150, 420 ], [ 105, 420 ], [ 105, 292 ], [ 150, 292 ] ] },
    'op-sem': { wide: [ [ 490, 330 ], [ 490, 120 ] ], narrow: [ [ 150, 484 ], [ 70, 404 ], [ 70, 164 ], [ 150, 164 ] ] },
    'uvicorn-op': { wide: [ [ 283, 120 ], [ 490, 330 ] ], narrow: [ [ 150, 100 ], [ 35, 100 ], [ 35, 484 ], [ 150, 484 ] ] }
  },
  edges: {
    cu: { from: 'client', to: 'uvicorn', kind: 'request' },
    us: { from: 'uvicorn', to: 'sem', kind: 'request' },
    sm: { from: 'sem', to: 'mw', kind: 'request' },
    me: { from: 'mw', to: 'exm', kind: 'request' },
    er: { from: 'exm', to: 'router', kind: 'request' },
    rd: { from: 'router', to: 'deps', kind: 'request' },
    dop: { from: 'deps', to: 'op', kind: 'request' },
    opd: { from: 'op', to: 'deps', kind: 'result' },
    dr: { from: 'deps', to: 'router', kind: 'result' },
    re: { from: 'router', to: 'exm', kind: 'result' },
    em: { from: 'exm', to: 'mw', kind: 'result' },
    ms: { from: 'mw', to: 'sem', kind: 'result' },
    su: { from: 'sem', to: 'uvicorn', kind: 'result' },
    uc: { from: 'uvicorn', to: 'client', kind: 'result' },
    opbg: { from: 'op', to: 'bg', kind: 'queue' },
    de: { from: 'deps', to: 'exm', kind: 'error' },
    ops: { from: 'op', to: 'sem', kind: 'error' },
    uo: { from: 'uvicorn', to: 'op', kind: 'queue' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'request',
        moves: [ { edge: 'cu', label: 'GET /items/42', plain: { en: 'Order: item 42', bn: 'অর্ডার: ৪২ নম্বর' } } ],
        title: { en: 'A customer places an order', bn: 'একজন কাস্টমার অর্ডার দেয়' },
        simple: {
          en: 'The customer asks the website for item 42. The host at the door, a server, takes the order slip and reads it.',
          bn: 'কাস্টমার ওয়েবসাইটের কাছে ৪২ নম্বর আইটেম চায়। দরজার হোস্ট, মানে সার্ভার, অর্ডার স্লিপটা নিয়ে পড়ে।'
        },
        tech: {
          en: 'Uvicorn parses the HTTP bytes (h11 or httptools) and builds an ASGI `scope` dict. It then calls `await app(scope, receive, send)`. FastAPI never touches the socket itself.',
          bn: 'Uvicorn HTTP বাইট পার্স করে (h11 বা httptools) একটা ASGI `scope` dict বানায়, তারপর `await app(scope, receive, send)` ডাকে। সকেট FastAPI নিজে কখনো ছোঁয় না।'
        }
      },
      {
        id: 'asgi',
        moves: [ { edge: 'us', label: 'scope, receive, send', plain: { en: 'Order slip', bn: 'অর্ডার স্লিপ' } } ],
        title: { en: 'The host hands it to the manager', bn: 'হোস্ট ম্যানেজারের হাতে দেয়' },
        simple: {
          en: 'The host hands the order slip into the app, first to the manager, who steps in if anything goes badly wrong.',
          bn: 'হোস্ট অর্ডার স্লিপ অ্যাপের ভেতরে দেয়, প্রথমে ম্যানেজারের হাতে। কিছু বড় গোলমাল হলে ম্যানেজারই সামলান।'
        },
        tech: {
          en: 'FastAPI subclasses Starlette. `ServerErrorMiddleware` is always the outermost layer, so any unhandled exception ends up here and becomes a 500.',
          bn: 'FastAPI হলো Starlette-এর সাবক্লাস। `ServerErrorMiddleware` সবসময় সবচেয়ে বাইরের স্তর, তাই যেকোনো unhandled exception এখানে এসে 500 হয়ে যায়।'
        }
      },
      {
        id: 'your-mw',
        moves: [ { edge: 'sm', label: 'request', plain: { en: 'Order slip', bn: 'অর্ডার স্লিপ' } } ],
        title: { en: 'The security desk checks you in', bn: 'সিকিউরিটি ডেস্ক যাচাই করে' },
        simple: {
          en: 'The slip reaches the security desk, your checkpoints. One asks if this website is allowed in, one checks the login, one starts a stopwatch.',
          bn: 'স্লিপ সিকিউরিটি ডেস্কে, মানে আপনার চেকপয়েন্টে পৌঁছায়। একজন দেখে এই ওয়েবসাইটের ঢোকার অনুমতি আছে কি না, একজন লগইন দেখে, একজন স্টপওয়াচ চালায়।'
        },
        tech: {
          en: 'With `add_middleware`, the last one added is the outermost, so it runs first on the way in. The request goes top to bottom, and the response goes back bottom to top.',
          bn: '`add_middleware`-এ সবশেষে যোগ করাটাই সবচেয়ে বাইরের, তাই ঢোকার পথে সেটাই আগে চলে। রিকোয়েস্ট যায় উপর থেকে নিচে, রেসপন্স ফেরে নিচ থেকে উপরে।'
        }
      },
      {
        id: 'exception-layer',
        moves: [ { edge: 'me', label: 'request', plain: { en: 'Order slip', bn: 'অর্ডার স্লিপ' } } ],
        title: { en: 'Guest relations stands ready', bn: 'গেস্ট সার্ভিস তৈরি থাকে' },
        simple: {
          en: 'Next the slip reaches guest relations, who turn errors like “not found” or “not allowed” into polite, clear replies.',
          bn: 'এরপর স্লিপ পৌঁছায় গেস্ট সার্ভিসে। তারা “পাওয়া যায়নি” বা “অনুমতি নেই” ধরনের ভুলকে ভদ্র, পরিষ্কার উত্তরে বদলে দেয়।'
        },
        tech: {
          en: '`ExceptionMiddleware` sits innermost, right around the router. It turns `HTTPException` and your registered exception handlers into responses.',
          bn: '`ExceptionMiddleware` একদম ভেতরে, রাউটারের ঠিক চারপাশে বসে। `HTTPException` আর আপনার রেজিস্টার করা exception handler-কে এটা রেসপন্সে বদলায়।'
        }
      },
      {
        id: 'route-match',
        moves: [ { edge: 'er', label: 'request', plain: { en: 'Order slip', bn: 'অর্ডার স্লিপ' } } ],
        title: { en: 'The seating host picks a chef', bn: 'সিট দেখানো হোস্ট শেফ বেছে দেয়' },
        simple: {
          en: 'The seating host reads the order and finds its route, the address it matches. That decides which chef will cook it.',
          bn: 'সিট দেখানো হোস্ট অর্ডার পড়ে তার রুট, মানে যে ঠিকানার সাথে মেলে সেটা খুঁজে নেয়। তাতেই ঠিক হয় কোন শেফ রান্না করবে।'
        },
        tech: {
          en: 'Starlette’s `Router` matches path and method and extracts path params like `item_id`. A missing path becomes 404, a wrong method becomes 405, and mounted sub-apps are resolved here.',
          bn: 'Starlette-এর `Router` path আর method মেলায়, আর `item_id`-র মতো path param বের করে। path না মিললে 404, method ভুল হলে 405, আর mounted sub-app এখানেই ঠিক হয়।'
        }
      },
      {
        id: 'deps',
        moves: [ { edge: 'rd', label: 'path + body', plain: { en: 'Order + details', bn: 'অর্ডার + বিবরণ' } } ],
        title: { en: 'The order desk checks the form', bn: 'অর্ডার ডেস্ক ফর্ম দেখে' },
        simple: {
          en: 'Before any cooking, the order desk checks the form is filled in properly, such as the item number really being a number.',
          bn: 'রান্নার আগে অর্ডার ডেস্ক দেখে ফর্ম ঠিকমতো ভরা কি না, যেমন আইটেম নম্বরটা সত্যিই সংখ্যা কি না।'
        },
        tech: {
          en: '`solve_dependencies` runs each `Depends` (sub-dependencies first, cached per request) and the setup half of `yield` dependencies. Pydantic validates path, query and body here.',
          bn: '`solve_dependencies` প্রতিটি `Depends` চালায় (sub-dependency আগে, প্রতি রিকোয়েস্টে ক্যাশ করা) আর `yield` dependency-র সেটআপ অংশও চালায়। Pydantic এখানেই path, query আর body ভ্যালিডেট করে।'
        }
      },
      {
        id: 'handler',
        moves: [ { edge: 'dop', label: 'item_id=42', plain: { en: 'Checked order', bn: 'যাচাই করা অর্ডার' } } ],
        title: { en: 'The chef cooks the dish', bn: 'শেফ খাবার রান্না করে' },
        simple: {
          en: 'The chef gets a clean, checked order and does the real work, such as fetching item 42 from the database.',
          bn: 'শেফ পরিষ্কার, যাচাই করা অর্ডার হাতে পায় আর আসল কাজটা করে, যেমন ডেটাবেস থেকে ৪২ নম্বর আইটেম আনে।'
        },
        tech: {
          en: 'A `def` handler runs in a threadpool (AnyIO worker thread). An `async def` handler runs directly on the event loop, so a blocking call inside it freezes every request.',
          bn: '`def` হ্যান্ডলার চলে threadpool-এ (AnyIO worker thread)। `async def` হ্যান্ডলার সরাসরি event loop-এ চলে, তাই ভেতরে blocking কল থাকলে সব রিকোয়েস্ট আটকে যায়।'
        }
      },
      {
        id: 'response-model',
        moves: [ { edge: 'opd', label: 'return value', plain: { en: 'Cooked dish', bn: 'রান্না করা খাবার' } } ],
        title: { en: 'Only the right parts get plated', bn: 'শুধু ঠিক অংশটুকু প্লেটে ওঠে' },
        simple: {
          en: 'The chef plates the dish with only the parts you promised; secrets, like a stored password, stay in the kitchen. It starts back toward the door.',
          bn: 'শেফ শুধু আপনার প্রতিশ্রুত অংশ দিয়ে খাবার সাজায়; সংরক্ষিত পাসওয়ার্ডের মতো গোপন জিনিস রান্নাঘরেই থাকে। খাবার দরজার দিকে ফিরতি পথ ধরে।'
        },
        tech: {
          en: '`response_model` validation and filtering happen as the value leaves: Pydantic converts it, drops extra fields, then it is serialized into a `JSONResponse`. ORM objects need `from_attributes=True`.',
          bn: 'মান বেরোনোর সময়ই `response_model` ভ্যালিডেশন আর ফিল্টারিং হয়: Pydantic কনভার্ট করে, বাড়তি ফিল্ড বাদ দেয়, তারপর `JSONResponse`-এ সিরিয়ালাইজ হয়। ORM অবজেক্টে `from_attributes=True` লাগে।'
        }
      },
      {
        id: 'back-inside',
        moves: [
          { edge: 'dr', label: 'response', plain: { en: 'The dish', bn: 'খাবার' } },
          { edge: 're', label: 'response', plain: { en: 'The dish', bn: 'খাবার' } }
        ],
        title: { en: 'The dish heads back out', bn: 'খাবার ফিরতি পথে রওনা দেয়' },
        simple: {
          en: 'The plated dish retraces the slip’s path in reverse: past the seating host, then on to guest relations.',
          bn: 'সাজানো খাবার স্লিপের পথেই উল্টো দিকে ফেরে: সিট দেখানো হোস্ট পেরিয়ে গেস্ট সার্ভিসে।'
        },
        tech: {
          en: 'The response flows back out through the router and `ExceptionMiddleware`. That layer only steps in if an exception was raised; otherwise it passes the response along untouched.',
          bn: 'রেসপন্স router আর `ExceptionMiddleware`-এর ভেতর দিয়ে বেরিয়ে আসে। এই স্তর শুধু exception উঠলেই হস্তক্ষেপ করে; নইলে রেসপন্স যেমন আছে তেমনই এগিয়ে দেয়।'
        }
      },
      {
        id: 'outward',
        moves: [
          { edge: 'em', label: 'response', plain: { en: 'The dish', bn: 'খাবার' } },
          { edge: 'ms', label: 'response', plain: { en: 'The dish', bn: 'খাবার' } }
        ],
        title: { en: 'Back past the security desk', bn: 'সিকিউরিটি ডেস্ক পেরিয়ে ফেরা' },
        simple: {
          en: 'The dish passes the security desk, which can stamp it, pack it smaller or time the trip, then reaches the manager.',
          bn: 'খাবার সিকিউরিটি ডেস্ক পেরোয়, যারা সিল দিতে, ছোট করে মুড়তে বা সময় মাপতে পারে। তারপর ম্যানেজারের কাছে পৌঁছায়।'
        },
        tech: {
          en: 'The response then passes your middleware from bottom to top, then `ServerErrorMiddleware`. CORS and GZip add their headers or compression on this leg.',
          bn: 'রেসপন্স তারপর আপনার middleware নিচ থেকে উপরে পার হয়, শেষে `ServerErrorMiddleware`। CORS আর GZip এই ধাপেই হেডার বা কম্প্রেশন জোড়ে।'
        }
      },
      {
        id: 'delivered',
        moves: [
          { edge: 'su', label: 'response', plain: { en: 'The dish', bn: 'খাবার' } },
          { edge: 'uc', label: '200 OK', plain: { en: 'The dish', bn: 'খাবার' } }
        ],
        title: { en: 'The dish is served', bn: 'খাবার পরিবেশন হয়' },
        simple: {
          en: 'The host at the door carries the dish to the customer, who now has their answer: OK, here is item 42.',
          bn: 'দরজার হোস্ট খাবারটা কাস্টমারের কাছে পৌঁছে দেয়। কাস্টমার এখন উত্তর পেয়েছে: OK, এই নিন ৪২ নম্বর আইটেম।'
        },
        tech: {
          en: 'Uvicorn sends the ASGI messages `http.response.start` and `http.response.body`. Status, headers and body go on the wire. The client is done at this point.',
          bn: 'Uvicorn ASGI মেসেজ `http.response.start` আর `http.response.body` পাঠায়। স্ট্যাটাস, হেডার আর বডি তারে চলে যায়। ক্লায়েন্টের কাজ এখানেই শেষ।'
        }
      },
      {
        id: 'background',
        moves: [ { edge: 'opbg', label: 'send_email()', plain: { en: 'Send receipt', bn: 'রসিদ পাঠানো' } } ],
        title: { en: 'Slow extras come last', bn: 'ধীর বাড়তি কাজ শেষে' },
        simple: {
          en: 'Now the chef hands slow extras, like a receipt email, to the courier.',
          bn: 'পরিবেশনের পর শেফ রসিদ ইমেইলের মতো ধীর কাজ কুরিয়ারকে দেয়।'
        },
        tech: {
          en: '`BackgroundTasks` run after the response is sent, in the same process, with no retries. If the process dies, the task is lost. `yield` dependency teardown also runs after, by default in current FastAPI.',
          bn: '`BackgroundTasks` রেসপন্স পাঠানোর পরে, একই প্রসেসে চলে, রিট্রাই নেই। প্রসেস মারা গেলে টাস্ক হারায়। `yield` dependency-র টিয়ারডাউনও বর্তমান FastAPI-তে ডিফল্টে এর পরেই চলে।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'bad-input',
      label: { en: 'Bad input', bn: 'ভুল ইনপুট' },
      whatIf: {
        en: 'What if the customer fills in the order form wrongly?',
        bn: 'কাস্টমার যদি অর্ডার ফর্ম ভুলভাবে ভরে?'
      },
      branchAfter: 'deps',
      steps: [
        {
          id: 'validation-fails',
          work: { node: 'deps', kind: 'error' },
          title: { en: 'The form is filled in wrong', bn: 'ফর্ম ভুলভাবে ভরা' },
          simple: {
            en: 'The customer asked for item “abc”, but an item number must be a number. The order desk spots the mistake.',
            bn: 'কাস্টমার চেয়েছে “abc” আইটেম, কিন্তু আইটেম নম্বর তো সংখ্যা হওয়ার কথা। অর্ডার ডেস্ক ভুলটা ধরে ফেলে।'
          },
          tech: {
            en: 'Pydantic cannot parse `abc` as an `int`, so FastAPI raises `RequestValidationError` with a `loc`, `msg` and `type` for each bad field.',
            bn: 'Pydantic `abc`-কে `int` হিসেবে পার্স করতে পারে না, তাই FastAPI প্রতিটি ভুল ফিল্ডের জন্য `loc`, `msg` আর `type`-সহ `RequestValidationError` তোলে।'
          }
        },
        {
          id: 'handler-answers',
          moves: [ { edge: 'de', label: 'RequestValidationError', plain: { en: 'Form is wrong', bn: 'ফর্ম ভুল' } } ],
          title: { en: 'Guest relations steps in', bn: 'গেস্ট সার্ভিস এগিয়ে আসে' },
          simple: {
            en: 'The order desk sends the problem straight to guest relations. The chef never saw the order, so nothing was cooked.',
            bn: 'অর্ডার ডেস্ক সমস্যাটা সোজা গেস্ট সার্ভিসে পাঠায়। শেফ অর্ডারটা দেখেইনি, তাই কিছু রান্না হয়নি।'
          },
          tech: {
            en: 'FastAPI registers a handler for `RequestValidationError` in ExceptionMiddleware’s table. You can override it with `@app.exception_handler(RequestValidationError)`.',
            bn: 'FastAPI ExceptionMiddleware-এর টেবিলে `RequestValidationError`-এর জন্য একটা handler রেজিস্টার করে রাখে। `@app.exception_handler(RequestValidationError)` দিয়ে সেটা বদলানো যায়।'
          }
        },
        {
          id: '422-out',
          moves: [
            { edge: 'em', label: '422', plain: { en: 'Fix this', bn: 'সংশোধন' } },
            { edge: 'ms', label: '422', plain: { en: 'Fix this', bn: 'সংশোধন' } }
          ],
          title: { en: 'A clear note goes out', bn: 'পরিষ্কার একটা নোট বেরোয়' },
          simple: {
            en: 'Guest relations writes a clear note saying which part of the form was wrong and why. It heads out past the security desk.',
            bn: 'গেস্ট সার্ভিস পরিষ্কার একটা নোট লেখে, ফর্মের কোন অংশ কেন ভুল। নোটটা সিকিউরিটি ডেস্ক পেরিয়ে বেরিয়ে যায়।'
          },
          tech: {
            en: 'The body is `{"detail": [{"loc", "msg", "type"}]}` with status 422, not 400. It then goes out through your middleware like any normal response.',
            bn: 'বডি হলো `{"detail": [{"loc", "msg", "type"}]}`, স্ট্যাটাস 422, 400 নয়। তারপর অন্য যেকোনো স্বাভাবিক রেসপন্সের মতোই আপনার middleware পেরিয়ে যায়।'
          }
        },
        {
          id: '422-delivered',
          moves: [
            { edge: 'su', label: '422', plain: { en: 'Fix this', bn: 'সংশোধন' } },
            { edge: 'uc', label: '422', plain: { en: 'Fix this', bn: 'সংশোধন' } }
          ],
          title: { en: 'The customer learns what to fix', bn: 'কাস্টমার জানে কী ঠিক করতে হবে' },
          simple: {
            en: 'The host hands the customer the note, so they know what to fix. Nothing was cooked, so nothing changed.',
            bn: 'হোস্ট নোটটা কাস্টমারের হাতে দেয়, তাই সে জানে কী ঠিক করতে হবে। কিছু রান্না হয়নি, তাই কিছুই বদলায়নি।'
          },
          tech: {
            en: 'Validation runs during dependency solving, before the handler is entered. That is why a bad request can never reach your code with bad types.',
            bn: 'ভ্যালিডেশন dependency solve করার সময়ই হয়, হ্যান্ডলারে ঢোকার আগে। তাই ভুল টাইপের রিকোয়েস্ট কখনো আপনার কোডে পৌঁছাতে পারে না।'
          }
        }
      ]
    },
    {
      id: 'bug-500',
      label: { en: 'A crash', bn: 'একটা ক্র্যাশ' },
      whatIf: {
        en: 'What if the chef makes a mistake halfway through cooking?',
        bn: 'রান্নার মাঝপথে শেফ যদি ভুল করে বসে?'
      },
      branchAfter: 'handler',
      steps: [
        {
          id: 'crash',
          work: { node: 'op', kind: 'error' },
          title: { en: 'The chef drops the dish', bn: 'শেফ খাবার ফেলে দেয়' },
          simple: {
            en: 'A mistake in your own instructions sends the chef looking for an ingredient that does not exist. The dish is dropped halfway.',
            bn: 'আপনার নিজের নির্দেশে একটা ভুলের জন্য শেফ এমন উপকরণ খোঁজে যা নেই। খাবার মাঝপথেই পড়ে যায়।'
          },
          tech: {
            en: 'The handler raises `KeyError`, which is not an `HTTPException` and has no registered handler. Nothing between here and the outermost layer will catch it.',
            bn: 'হ্যান্ডলার `KeyError` তোলে, যা `HTTPException` নয়, আর এর কোনো রেজিস্টার করা handler-ও নেই। এখান থেকে সবচেয়ে বাইরের স্তর পর্যন্ত কেউ এটা ধরবে না।'
          }
        },
        {
          id: 'escapes',
          moves: [ { edge: 'ops', label: 'KeyError', plain: { en: 'Kitchen mishap', bn: 'রান্নাঘরের গোলমাল' } } ],
          title: { en: 'The mishap reaches the manager', bn: 'গোলমাল ম্যানেজারের কাছে যায়' },
          simple: {
            en: 'Guest relations and the security desk cannot fix this, so the mishap rushes past them, straight to the manager.',
            bn: 'গেস্ট সার্ভিস আর সিকিউরিটি ডেস্ক এটা সারাতে পারে না, তাই গোলমালটা তাদের পাশ কাটিয়ে সোজা ম্যানেজারের কাছে যায়।'
          },
          tech: {
            en: 'The exception passes through ExceptionMiddleware and your middleware unhandled. `ServerErrorMiddleware` returns a plain 500, then re-raises so the server can log the traceback.',
            bn: 'exception ExceptionMiddleware আর আপনার middleware-এর ভেতর দিয়ে অমীমাংসিত অবস্থায় চলে যায়। `ServerErrorMiddleware` সাধারণ একটা 500 ফেরত দেয়, তারপর আবার raise করে, যাতে সার্ভার traceback লগ করতে পারে।'
          }
        },
        {
          id: '500-out',
          moves: [
            { edge: 'su', label: '500', plain: { en: 'Sorry', bn: 'দুঃখিত' } },
            { edge: 'uc', label: '500', plain: { en: 'Sorry', bn: 'দুঃখিত' } }
          ],
          title: { en: 'A bare apology reaches the customer', bn: 'সাদামাটা দুঃখপ্রকাশ কাস্টমারে পৌঁছায়' },
          simple: {
            en: 'The customer only hears a plain “something went wrong”. The security desk never saw the reply, so it added nothing.',
            bn: 'কাস্টমার শুধু একটা সাদামাটা “কিছু একটা গোলমাল হয়েছে” শোনে। সিকিউরিটি ডেস্ক উত্তরটা দেখেইনি, তাই কিছু জুড়তে পারেনি।'
          },
          tech: {
            en: 'CORSMiddleware sees an exception, not a response, so it never adds its headers to the 500. The browser then reports a CORS error that hides the real 500. Check the server logs.',
            bn: 'CORSMiddleware রেসপন্স নয়, একটা exception দেখে, তাই 500-তে নিজের হেডার জুড়তে পারে না। ব্রাউজার তখন একটা CORS এরর দেখায়, যা আসল 500-কে আড়াল করে। সার্ভার লগ দেখুন।'
          }
        }
      ]
    },
    {
      id: 'startup',
      label: { en: 'Opening and closing', bn: 'খোলা আর বন্ধ' },
      whatIf: {
        en: 'What if we rewind to before the restaurant opens?',
        bn: 'রেস্টুরেন্ট খোলার আগের সময়ে ফিরে গেলে কেমন হয়?'
      },
      branchAfter: 'request',
      steps: [
        {
          id: 'lifespan-start',
          moves: [ { edge: 'uo', label: 'startup', plain: { en: 'Get ready', bn: 'তৈরি হও' } } ],
          title: { en: 'Rewind: before opening', bn: 'রিওয়াইন্ড: খোলার আগে' },
          simple: {
            en: 'Before any customer arrives, the host tells the chef to get ready. Setup runs once, such as opening the database.',
            bn: 'কোনো কাস্টমার আসার আগেই হোস্ট শেফকে তৈরি হতে বলে। সেটআপ একবার চলে, যেমন ডেটাবেস খোলা।'
          },
          tech: {
            en: 'Uvicorn sends `lifespan.startup`. Code before `yield` in your `lifespan` async context manager runs now, such as creating a DB pool or loading an ML model.',
            bn: 'Uvicorn `lifespan.startup` পাঠায়। আপনার `lifespan` async context manager-এর `yield`-এর আগের কোড এখন চলে, যেমন DB pool বানানো বা ML মডেল লোড করা।'
          }
        },
        {
          id: 'ready',
          work: { node: 'uvicorn', kind: 'result' },
          state: { uvicorn: { en: 'Accepting', bn: 'নিচ্ছে' } },
          plainState: { uvicorn: { en: 'Door open', bn: 'দরজা খোলা' } },
          title: { en: 'The doors open', bn: 'দরজা খুলে যায়' },
          simple: {
            en: 'Setup is done. The host unlocks the door and starts taking orders.',
            bn: 'সেটআপ শেষ। হোস্ট দরজা খুলে দেয় আর অর্ডার নেওয়া শুরু করে।'
          },
          tech: {
            en: 'The app now serves traffic. The pool and model live in the same scope as their cleanup. Do not mix `lifespan` with `on_event`; handlers are ignored once `lifespan` is set.',
            bn: 'অ্যাপ এখন ট্রাফিক সামলায়। pool আর মডেল তাদের ক্লিনআপের সাথে একই scope-এ থাকে। `lifespan`-এর সাথে `on_event` মেশাবেন না; `lifespan` দিলে ওই handler-গুলো উপেক্ষিত হয়।'
          }
        },
        {
          id: 'lifespan-stop',
          moves: [ { edge: 'uo', label: 'shutdown', plain: { en: 'Time to close', bn: 'বন্ধের সময়' } } ],
          state: { uvicorn: { en: 'Shutting down', bn: 'বন্ধ হচ্ছে' } },
          plainState: { uvicorn: { en: 'Closing up', bn: 'বন্ধ করছে' } },
          title: { en: 'Closing time', bn: 'বন্ধের সময়' },
          simple: {
            en: 'Much later, the restaurant is told to close. The host warns the chef first, so the kitchen can be tidied up.',
            bn: 'অনেক পরে রেস্টুরেন্টকে বন্ধ করতে বলা হয়। হোস্ট আগে শেফকে জানায়, যাতে রান্নাঘর গুছিয়ে নেওয়া যায়।'
          },
          tech: {
            en: 'Uvicorn sends `lifespan.shutdown`. Code after `yield` runs now. Lifespan does not run for mounted sub-apps, and `TestClient` only triggers it when used as a context manager.',
            bn: 'Uvicorn `lifespan.shutdown` পাঠায়। `yield`-এর পরের কোড এখন চলে। mounted sub-app-এর lifespan চলে না, আর `TestClient` শুধু context manager হিসেবে ব্যবহার করলেই এটা চালায়।'
          }
        },
        {
          id: 'closed',
          work: { node: [ 'op', 'uvicorn' ], kind: 'result' },
          state: { op: { en: 'Pool closed', bn: 'Pool বন্ধ' }, uvicorn: { en: 'Stopped', bn: 'বন্ধ' } },
          plainState: { op: { en: 'Tidied up', bn: 'গোছানো শেষ' }, uvicorn: { en: 'Door locked', bn: 'দরজায় তালা' } },
          title: { en: 'Everything is tidied up', bn: 'সব গুছিয়ে ফেলা হলো' },
          simple: {
            en: 'The chef closes the database connections neatly, and the host locks the door. Nothing is left hanging.',
            bn: 'শেফ ডেটাবেস কানেকশনগুলো ঠিকঠাক বন্ধ করে, আর হোস্ট দরজায় তালা দেয়। কিছু ঝুলে থাকে না।'
          },
          tech: {
            en: 'Code after `yield` closes the pool. Lifespan runs once in each worker process. Startup code at module top level would run at import and could not be awaited.',
            bn: '`yield`-এর পরের কোড pool বন্ধ করে। lifespan প্রতিটি worker প্রসেসে আলাদাভাবে চলে। স্টার্টআপ কোড মডিউলের টপ লেভেলে রাখলে সেটা import-এর সময় চলত, আর await করা যেত না।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'Think of the front of house at a busy restaurant. Every layer has a twin there.',
      bn: 'একটা ব্যস্ত রেস্টুরেন্টের সামনের দিকটা ভাবুন। প্রতিটি স্তরের একটা জোড়া আছে সেখানে।'
    },
    twins: [
      {
        icon: 'user',
        node: 'client',
        name: { en: 'The customer', bn: 'কাস্টমার' },
        d: {
          en: 'Walks in and asks for a dish.',
          bn: 'ঢুকে একটা পদ চান।'
        }
      },
      {
        icon: 'power',
        node: 'uvicorn',
        name: { en: 'The host at the door', bn: 'দরজার হোস্ট' },
        d: {
          en: 'Greets you, takes the order slip, and passes it inside.',
          bn: 'স্বাগত জানান, অর্ডার স্লিপ নেন, আর ভেতরে পৌঁছে দেন।'
        }
      },
      {
        icon: 'shield',
        node: 'sem',
        name: { en: 'The manager', bn: 'ম্যানেজার' },
        d: {
          en: 'Stays alert and handles any kitchen fire so the whole place does not stop.',
          bn: 'সজাগ থাকেন আর রান্নাঘরে আগুন লাগলে সামলান, যাতে পুরো রেস্টুরেন্ট বন্ধ না হয়।'
        }
      },
      {
        icon: 'route',
        node: 'mw',
        name: { en: 'The security desk', bn: 'সিকিউরিটি ডেস্ক' },
        d: {
          en: 'Checks you in on the way in, and hands your things back on the way out.',
          bn: 'ঢোকার সময় আপনাকে যাচাই করেন, বেরোনোর সময় জিনিসপত্র ফেরত দেন।'
        }
      },
      {
        icon: 'shield',
        node: 'exm',
        name: { en: 'Guest relations', bn: 'গেস্ট সার্ভিস' },
        d: {
          en: 'Says “sorry, we are out of that” instead of leaving you confused.',
          bn: 'আপনাকে ধোঁয়াশায় না রেখে বলেন “দুঃখিত, ওটা আজ শেষ”।'
        }
      },
      {
        icon: 'route',
        node: 'router',
        name: { en: 'The seating host', bn: 'সিট দেখানো হোস্ট' },
        d: {
          en: 'Reads your order and sends it to the right chef.',
          bn: 'আপনার অর্ডার পড়ে সঠিক শেফের কাছে পাঠিয়ে দেন।'
        }
      },
      {
        icon: 'check',
        node: 'deps',
        name: { en: 'The order desk', bn: 'অর্ডার ডেস্ক' },
        d: {
          en: 'Checks the order form is filled in properly before any cooking starts.',
          bn: 'রান্না শুরুর আগে অর্ডার ফর্ম ঠিকমতো ভরা কি না দেখেন।'
        }
      },
      {
        icon: 'code',
        node: 'op',
        name: { en: 'The chef', bn: 'শেফ' },
        d: {
          en: 'Receives a clean, checked order, cooks the dish, and plates only the promised parts.',
          bn: 'যাচাই করা পরিষ্কার অর্ডার হাতে পান, রান্না করেন, আর শুধু প্রতিশ্রুত অংশ প্লেটে সাজান।'
        }
      },
      {
        icon: 'mail',
        node: 'bg',
        name: { en: 'The courier', bn: 'কুরিয়ার' },
        d: {
          en: 'Delivers the receipt after you have already been served and left happy. It never makes you wait.',
          bn: 'আপনাকে খাবার দিয়ে খুশি করে বিদায় দেওয়ার পরে রসিদ পৌঁছে দেন। আপনাকে কখনো অপেক্ষা করান না।'
        }
      },
      {
        icon: 'power',
        node: null,
        name: { en: 'A kitchen fire', bn: 'রান্নাঘরে আগুন' },
        is: { en: 'is a server error', bn: 'মানে সার্ভারের ভুল' },
        d: {
          en: 'The chef cannot cope. The manager steps in, and the customer only hears “something went wrong”.',
          bn: 'শেফ সামলাতে পারেন না। ম্যানেজার এগিয়ে আসেন, আর কাস্টমার শুধু শোনে “কিছু একটা গোলমাল হয়েছে”।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'What is ASGI, and how does Uvicorn relate to FastAPI?',
        bn: 'ASGI কী, আর Uvicorn-এর সাথে FastAPI-র সম্পর্ক কী?'
      },
      short: {
        en: 'ASGI is the async interface between a server and a Python app. Uvicorn is a server that calls your app.',
        bn: 'ASGI হলো সার্ভার আর Python অ্যাপের মাঝের async ইন্টারফেস। Uvicorn হলো এমন একটা সার্ভার, যে আপনার অ্যাপকে ডাকে।'
      },
      deep: {
        en: 'Uvicorn turns HTTP bytes into an ASGI `scope` plus `receive`/`send` awaitables, then calls `await app(scope, receive, send)`. FastAPI, through Starlette, is that callable. WSGI is sync-only and cannot do WebSockets or lifespan.',
        bn: 'Uvicorn HTTP বাইটকে ASGI `scope` আর `receive`/`send` awaitable-এ বদলায়, তারপর `await app(scope, receive, send)` ডাকে। FastAPI (Starlette-এর মাধ্যমে) হলো সেই callable। WSGI শুধু sync, তাতে WebSocket বা lifespan হয় না।'
      },
      redFlag: {
        en: '“FastAPI is the web server” or “Uvicorn is a framework”.',
        bn: '“FastAPI-ই ওয়েব সার্ভার” বা “Uvicorn একটা ফ্রেমওয়ার্ক”।'
      }
    },
    {
      q: { en: 'In what order do middlewares run?', bn: 'middleware-গুলো কোন ক্রমে চলে?' },
      short: {
        en: 'The request goes outside-in in stack order, and the response goes inside-out.',
        bn: 'রিকোয়েস্ট স্ট্যাকের ক্রমে বাইরে থেকে ভেতরে যায়, আর রেসপন্স ভেতর থেকে বাইরে ফেরে।'
      },
      deep: {
        en: 'The stack is ServerErrorMiddleware, then your middleware, then ExceptionMiddleware, then the router. Among yours, the last `add_middleware` call becomes outermost, which surprises people. Adding CORS last makes it wrap auth failures too.',
        bn: 'স্ট্যাক হলো ServerErrorMiddleware, তারপর আপনার middleware, তারপর ExceptionMiddleware, তারপর router। আপনার নিজেরগুলোর মধ্যে সবশেষ `add_middleware` কলটাই সবচেয়ে বাইরের হয়, যা অনেককে অবাক করে। CORS সবশেষে যোগ করলে সেটা auth ব্যর্থতাকেও ঘিরে নেয়।'
      },
      redFlag: {
        en: '“Middleware runs in the order I added it, both ways” or forgetting the two built-in layers.',
        bn: '“যে ক্রমে যোগ করেছি, দুই দিকেই সেই ক্রমে চলে” বা বিল্ট-ইন দুটো স্তরের কথা ভুলে যাওয়া।'
      }
    },
    {
      q: { en: 'What does def vs async def change?', bn: 'def আর async def-এ কী পার্থক্য হয়?' },
      short: {
        en: '`def` runs in a threadpool. `async def` runs on the event loop.',
        bn: '`def` চলে threadpool-এ। `async def` চলে event loop-এ।'
      },
      deep: {
        en: 'Use `async def` only when everything inside is awaited without blocking. A blocking call there stalls every concurrent request. A `def` handler with blocking I/O is safe because the loop stays free, limited by the threadpool size. Dependencies follow the same rule on their own.',
        bn: '`async def` তখনই নিন যখন ভেতরের সবকিছু ব্লক না করে await হয়। সেখানে blocking কল থাকলে একসাথে চলা সব রিকোয়েস্ট আটকে যায়। blocking I/O-সহ `def` হ্যান্ডলার নিরাপদ, কারণ loop ফাঁকা থাকে, শুধু threadpool-এর সাইজ সীমা। Dependency-ও নিজে থেকে একই নিয়ম মানে।'
      },
      redFlag: {
        en: '“async def is always faster” or “FastAPI is multi-threaded, so blocking is fine”.',
        bn: '“async def সবসময় দ্রুত” বা “FastAPI মাল্টি-থ্রেডেড, তাই blocking চলে”।'
      }
    },
    {
      q: {
        en: 'Where does validation happen, and what happens when it fails?',
        bn: 'ভ্যালিডেশন কোথায় হয়, আর ব্যর্থ হলে কী ঘটে?'
      },
      short: {
        en: 'It happens before your function runs. A failure returns 422 automatically.',
        bn: 'আপনার ফাংশন চলার আগেই হয়। ব্যর্থ হলে আপনা-আপনি 422 ফেরত যায়।'
      },
      deep: {
        en: 'Pydantic validates params and body during dependency solving. Errors raise `RequestValidationError` with `loc`, `msg` and `type` per field. Override it with `@app.exception_handler(RequestValidationError)`. The handler runs without ever entering your function.',
        bn: 'dependency solve করার সময় Pydantic param আর body ভ্যালিডেট করে। এরর হলে প্রতিটি ফিল্ডের `loc`, `msg`, `type`-সহ `RequestValidationError` ওঠে। `@app.exception_handler(RequestValidationError)` দিয়ে বদলানো যায়। handler চলে, আপনার ফাংশনে ঢোকেই না।'
      },
      redFlag: {
        en: '“Validation happens inside my function” or “it returns 400”.',
        bn: '“ভ্যালিডেশন আমার ফাংশনের ভেতরে হয়” বা “এটা 400 ফেরত দেয়”।'
      }
    },
    {
      q: {
        en: 'How do yield dependencies work, and when does cleanup run?',
        bn: 'yield dependency কীভাবে কাজ করে, আর ক্লিনআপ কখন চলে?'
      },
      short: {
        en: 'Code before `yield` is setup and code after is teardown. By default in current FastAPI, teardown runs after the response is sent.',
        bn: '`yield`-এর আগের কোড সেটআপ, পরের কোড টিয়ারডাউন। বর্তমান FastAPI-তে ডিফল্টে টিয়ারডাউন রেসপন্স পাঠানোর পরে চলে।'
      },
      deep: {
        en: 'Current docs say exit code of default `scope="request"` dependencies runs after the response is sent, while `Depends(dep, scope="function")` runs it before. Behaviour changed across versions (0.106 to 0.117 ran it before), so check yours. Re-raise exceptions you catch.',
        bn: 'বর্তমান ডকুমেন্টেশন বলে, ডিফল্ট `scope="request"` dependency-র exit কোড রেসপন্স পাঠানোর পরে চলে, আর `Depends(dep, scope="function")` দিলে আগে চলে। ভার্সনভেদে আচরণ বদলেছে (0.106 থেকে 0.117 আগে চালাত), তাই নিজের ভার্সন দেখে নিন। যে exception ধরেন, সেটা আবার raise করুন।'
      },
      redFlag: {
        en: '“Teardown always happens before the client sees anything”, or swallowing exceptions in `except`.',
        bn: '“টিয়ারডাউন সবসময় ক্লায়েন্ট কিছু দেখার আগেই হয়”, বা `except`-এ exception গিলে ফেলা।'
      }
    },
    {
      q: { en: 'How do BackgroundTasks differ from Celery?', bn: 'BackgroundTasks আর Celery-র পার্থক্য কী?' },
      short: {
        en: 'BackgroundTasks run in-process after the response. Celery runs in separate workers behind a broker.',
        bn: 'BackgroundTasks রেসপন্সের পরে একই প্রসেসে চলে। Celery চলে ব্রোকারের পেছনে আলাদা ওয়ার্কারে।'
      },
      deep: {
        en: 'BackgroundTasks have no retries, persistence or queue. If the process dies, the task is lost, and a long sync task occupies a threadpool thread. Use them for tiny fire-and-forget work like an email, and Celery or ARQ for durable or heavy work.',
        bn: 'BackgroundTasks-এ রিট্রাই, persistence বা কিউ নেই। প্রসেস মারা গেলে টাস্ক হারায়, আর লম্বা sync টাস্ক একটা threadpool থ্রেড আটকে রাখে। ইমেইলের মতো ছোট fire-and-forget কাজে এটা, আর টেকসই বা ভারী কাজে Celery বা ARQ ব্যবহার করুন।'
      },
      redFlag: {
        en: '“They are the same thing” or “background tasks run in a separate process”.',
        bn: '“দুটো একই জিনিস” বা “background task আলাদা প্রসেসে চলে”।'
      }
    }
  ],
  cheats: [
    {
      code: 'uvicorn app.main:app --reload',
      d: {
        en: 'Dev server that restarts on every code change. Not for production.',
        bn: 'ডেভ সার্ভার, কোড বদলালেই রিস্টার্ট হয়। প্রোডাকশনের জন্য নয়।'
      }
    },
    {
      code: 'uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4',
      d: {
        en: 'Multi-process production run. Workers do not share memory.',
        bn: 'মাল্টি-প্রসেস প্রোডাকশন রান। ওয়ার্কাররা মেমরি শেয়ার করে না।'
      }
    },
    {
      code: 'fastapi dev app/main.py\nfastapi run',
      d: {
        en: 'The FastAPI CLI: dev mode with reload, then production mode.',
        bn: 'FastAPI CLI: রিলোডসহ ডেভ মোড, আর প্রোডাকশন মোড।'
      }
    },
    {
      code: '@asynccontextmanager\n' +
        'async def lifespan(app: FastAPI):\n' +
        '    pool = await create_pool()\n' +
        '    yield\n' +
        '    await pool.close()\n' +
        '\n' +
        'app = FastAPI(lifespan=lifespan)',
      d: {
        en: 'Startup before `yield`, shutdown after it.',
        bn: '`yield`-এর আগে স্টার্টআপ, পরে শাটডাউন।'
      }
    },
    {
      code: 'async def get_db():\n    async with Session() as s:\n        yield s',
      d: {
        en: 'A yield dependency: setup, hand over the resource, then teardown.',
        bn: 'yield dependency: সেটআপ, রিসোর্স হস্তান্তর, তারপর টিয়ারডাউন।'
      }
    },
    {
      code: 'background_tasks.add_task(send_email, to)',
      d: {
        en: 'Run this after the response is sent. No retries.',
        bn: 'রেসপন্স পাঠানোর পরে এটা চালান। রিট্রাই নেই।'
      }
    },
    {
      code: '@app.exception_handler(RequestValidationError)',
      d: {
        en: 'Customize the 422 response your clients see.',
        bn: 'ক্লায়েন্ট যে 422 রেসপন্স দেখে, সেটা নিজের মতো করুন।'
      }
    },
    {
      code: 'app.add_middleware(CORSMiddleware, allow_origins=[...])',
      d: {
        en: 'Adds CORS. The last middleware added is the outermost.',
        bn: 'CORS যোগ করে। সবশেষে যোগ করা middleware-ই সবচেয়ে বাইরের।'
      }
    }
  ],
  sources: [
    {
      label: 'FastAPI: Dependencies with yield',
      url: 'https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/'
    },
    { label: 'FastAPI: Concurrency and async / await', url: 'https://fastapi.tiangolo.com/async/' },
    { label: 'FastAPI: Lifespan Events', url: 'https://fastapi.tiangolo.com/advanced/events/' },
    { label: 'Starlette: Middleware', url: 'https://www.starlette.dev/middleware/' }
  ]
}
