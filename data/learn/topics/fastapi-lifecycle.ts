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
  view: { wide: [ 900, 360 ], narrow: [ 400, 572 ] },
  nodeR: { narrow: 20 },
  nodes: {
    client: {
      icon: 'user',
      name: { en: 'Client', bn: 'ক্লায়েন্ট' },
      sub: { en: 'Browser or app', bn: 'ব্রাউজার বা অ্যাপ' },
      wide: [ 60, 150, 'up' ],
      narrow: [ 150, 36, 'right' ]
    },
    uvicorn: {
      icon: 'power',
      name: { en: 'Uvicorn', bn: 'Uvicorn' },
      sub: { en: 'ASGI server', bn: 'ASGI সার্ভার' },
      wide: [ 164, 150, 'down' ],
      narrow: [ 150, 100, 'right' ]
    },
    sem: {
      icon: 'shield',
      name: { en: 'ServerErrorMiddleware', bn: 'ServerErrorMiddleware' },
      sub: { en: 'Safety net', bn: 'সেফটি নেট' },
      wide: [ 267, 150, 'up' ],
      narrow: [ 150, 164, 'right' ]
    },
    mw: {
      icon: 'route',
      name: { en: 'Your middleware', bn: 'আপনার middleware' },
      sub: { en: 'CORS, auth, timing', bn: 'CORS, auth, টাইমিং' },
      wide: [ 370, 150, 'down' ],
      narrow: [ 150, 228, 'right' ]
    },
    exm: {
      icon: 'shield',
      name: { en: 'ExceptionMiddleware', bn: 'ExceptionMiddleware' },
      sub: { en: 'Errors to replies', bn: 'এরর থেকে রিপ্লাই' },
      wide: [ 474, 150, 'up' ],
      narrow: [ 150, 292, 'right' ]
    },
    router: {
      icon: 'route',
      name: { en: 'Router', bn: 'Router' },
      sub: { en: 'Picks the function', bn: 'ফাংশন বেছে নেয়' },
      wide: [ 578, 150, 'down' ],
      narrow: [ 150, 356, 'right' ]
    },
    deps: {
      icon: 'check',
      name: { en: 'Dependencies', bn: 'Dependencies' },
      sub: { en: 'Inputs + validation', bn: 'ইনপুট + ভ্যালিডেশন' },
      wide: [ 681, 150, 'up' ],
      narrow: [ 150, 420, 'right' ]
    },
    op: {
      icon: 'code',
      name: { en: 'Your function', bn: 'আপনার ফাংশন' },
      sub: { en: 'def or async def', bn: 'def বা async def' },
      wide: [ 784, 150, 'up' ],
      narrow: [ 150, 484, 'right' ]
    },
    bg: {
      icon: 'mail',
      name: { en: 'BackgroundTasks', bn: 'BackgroundTasks' },
      sub: { en: 'After the reply', bn: 'রিপ্লাইয়ের পরে' },
      wide: [ 866, 240, 'left' ],
      narrow: [ 150, 548, 'right' ]
    }
  },
  groups: [
    {
      id: 'stack',
      label: { en: 'Middleware stack', bn: 'মিডলওয়্যার স্ট্যাক' },
      wide: [ 190, 78, 360, 150 ],
      narrow: [ 112, 130, 280, 196 ]
    }
  ],
  corridors: {
    'client-uvicorn': { wide: [ [ 60, 150 ], [ 164, 150 ] ], narrow: [ [ 150, 36 ], [ 150, 100 ] ] },
    'uvicorn-sem': { wide: [ [ 164, 150 ], [ 267, 150 ] ], narrow: [ [ 150, 100 ], [ 150, 164 ] ] },
    'sem-mw': { wide: [ [ 267, 150 ], [ 370, 150 ] ], narrow: [ [ 150, 164 ], [ 150, 228 ] ] },
    'mw-exm': { wide: [ [ 370, 150 ], [ 474, 150 ] ], narrow: [ [ 150, 228 ], [ 150, 292 ] ] },
    'exm-router': { wide: [ [ 474, 150 ], [ 578, 150 ] ], narrow: [ [ 150, 292 ], [ 150, 356 ] ] },
    'router-deps': { wide: [ [ 578, 150 ], [ 681, 150 ] ], narrow: [ [ 150, 356 ], [ 150, 420 ] ] },
    'deps-op': { wide: [ [ 681, 150 ], [ 784, 150 ] ], narrow: [ [ 150, 420 ], [ 150, 484 ] ] },
    'op-bg': { wide: [ [ 784, 150 ], [ 866, 240 ] ], narrow: [ [ 150, 484 ], [ 150, 548 ] ] },
    'exm-deps': {
      wide: [ [ 474, 150 ], [ 474, 250 ], [ 681, 250 ], [ 681, 150 ] ],
      narrow: [ [ 150, 292 ], [ 94, 292 ], [ 94, 420 ], [ 150, 420 ] ]
    },
    'sem-op': {
      wide: [ [ 267, 150 ], [ 267, 330 ], [ 784, 330 ], [ 784, 150 ] ],
      narrow: [ [ 150, 164 ], [ 62, 164 ], [ 62, 470 ], [ 150, 470 ] ]
    },
    'uvicorn-op': {
      wide: [ [ 164, 150 ], [ 164, 50 ], [ 870, 50 ], [ 870, 150 ], [ 784, 150 ] ],
      narrow: [ [ 150, 100 ], [ 30, 100 ], [ 30, 484 ], [ 150, 484 ] ]
    }
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
        moves: [ { edge: 'cu', label: 'GET /items/42' } ],
        title: { en: 'A request knocks on the door', bn: 'একটা রিকোয়েস্ট দরজায় কড়া নাড়ে' },
        simple: {
          en: 'Your browser asks for item 42. Uvicorn, the program listening on the network, reads the raw message and understands it.',
          bn: 'আপনার ব্রাউজার ৪২ নম্বর আইটেমটা চায়। নেটওয়ার্কে কান পেতে থাকা প্রোগ্রাম Uvicorn কাঁচা মেসেজটা পড়ে বুঝে নেয়।'
        },
        tech: {
          en: 'Uvicorn parses the HTTP bytes (h11 or httptools) and builds an ASGI `scope` dict. It then calls `await app(scope, receive, send)`. FastAPI never touches the socket itself.',
          bn: 'Uvicorn HTTP বাইট পার্স করে (h11 বা httptools) একটা ASGI `scope` dict বানায়, তারপর `await app(scope, receive, send)` ডাকে। সকেট FastAPI নিজে কখনো ছোঁয় না।'
        }
      },
      {
        id: 'asgi',
        moves: [ { edge: 'us', label: 'scope, receive, send' } ],
        title: { en: 'It enters through the safety net', bn: 'সেফটি নেটের ভেতর দিয়ে ঢোকে' },
        simple: {
          en: 'The request walks into the app through a safety net. If anything goes badly wrong later, this net catches it.',
          bn: 'রিকোয়েস্ট অ্যাপে ঢোকে একটা সেফটি নেটের ভেতর দিয়ে। পরে কিছু ভয়ংকর ভুল হলে এই নেটই সেটা ধরে ফেলে।'
        },
        tech: {
          en: 'FastAPI subclasses Starlette. `ServerErrorMiddleware` is always the outermost layer, so any unhandled exception ends up here and becomes a 500.',
          bn: 'FastAPI হলো Starlette-এর সাবক্লাস। `ServerErrorMiddleware` সবসময় সবচেয়ে বাইরের স্তর, তাই যেকোনো unhandled exception এখানে এসে 500 হয়ে যায়।'
        }
      },
      {
        id: 'your-mw',
        moves: [ { edge: 'sm', label: 'request' } ],
        title: { en: 'Your checkpoints', bn: 'আপনার চেকপয়েন্ট' },
        simple: {
          en: 'The request passes your checkpoints: a check that this site may call the API, a login check, a timer. They stack like layers; the last one added is met first.',
          bn: 'রিকোয়েস্ট আপনার চেকপয়েন্টগুলো পার হয়, যেমন এই ওয়েবসাইট API ডাকতে পারবে কি না তার চেক, লগইন চেক বা টাইমার। এগুলো স্তরে স্তরে সাজানো; সবশেষে যোগ করাটাই রিকোয়েস্ট আগে পায়।'
        },
        tech: {
          en: 'With `add_middleware`, the last one added is the outermost, so it runs first on the way in. The request goes top to bottom, and the response goes back bottom to top.',
          bn: '`add_middleware`-এ সবশেষে যোগ করাটাই সবচেয়ে বাইরের, তাই ঢোকার পথে সেটাই আগে চলে। রিকোয়েস্ট যায় উপর থেকে নিচে, রেসপন্স ফেরে নিচ থেকে উপরে।'
        }
      },
      {
        id: 'exception-layer',
        moves: [ { edge: 'me', label: 'request' } ],
        title: { en: 'The error translator', bn: 'এরর অনুবাদক' },
        simple: {
          en: 'Next comes a layer that knows how to turn errors like “not found” or “forbidden” into polite, proper replies.',
          bn: 'এরপর আসে একটা স্তর, যে “পাওয়া যায়নি” বা “অনুমতি নেই” ধরনের এরর ভদ্র, ঠিকঠাক উত্তরে বদলে দিতে জানে।'
        },
        tech: {
          en: '`ExceptionMiddleware` sits innermost, right around the router. It turns `HTTPException` and your registered exception handlers into responses.',
          bn: '`ExceptionMiddleware` একদম ভেতরে, রাউটারের ঠিক চারপাশে বসে। `HTTPException` আর আপনার রেজিস্টার করা exception handler-কে এটা রেসপন্সে বদলায়।'
        }
      },
      {
        id: 'route-match',
        moves: [ { edge: 'er', label: 'request' } ],
        title: { en: 'The router picks a function', bn: 'Router একটা ফাংশন বেছে নেয়' },
        simple: {
          en: 'The router reads the address, /items/42, and the verb, GET. Then it picks which of your functions should answer.',
          bn: 'Router ঠিকানা /items/42 আর GET ক্রিয়াটা পড়ে, তারপর বেছে নেয় আপনার কোন ফাংশন উত্তর দেবে।'
        },
        tech: {
          en: 'Starlette’s `Router` matches path and method and extracts path params like `item_id`. A missing path becomes 404, a wrong method becomes 405, and mounted sub-apps are resolved here.',
          bn: 'Starlette-এর `Router` path আর method মেলায়, আর `item_id`-র মতো path param বের করে। path না মিললে 404, method ভুল হলে 405, আর mounted sub-app এখানেই ঠিক হয়।'
        }
      },
      {
        id: 'deps',
        moves: [ { edge: 'rd', label: 'path + body' } ],
        title: { en: 'Gathering the inputs', bn: 'ইনপুট জোগাড়' },
        simple: {
          en: 'Before your function runs, FastAPI gathers what it needs: the logged-in user, a database connection. It also checks your data is the right shape.',
          bn: 'আপনার ফাংশন চলার আগে FastAPI দরকারি জিনিস জোগাড় করে: লগইন করা ইউজার, ডেটাবেস কানেকশন। ডেটা ঠিক ছাঁচে আছে কি না, সেটাও দেখে।'
        },
        tech: {
          en: '`solve_dependencies` runs each `Depends` (sub-dependencies first, cached per request) and the setup half of `yield` dependencies. Pydantic validates path, query and body here.',
          bn: '`solve_dependencies` প্রতিটি `Depends` চালায় (sub-dependency আগে, প্রতি রিকোয়েস্টে ক্যাশ করা) আর `yield` dependency-র সেটআপ অংশও চালায়। Pydantic এখানেই path, query আর body ভ্যালিডেট করে।'
        }
      },
      {
        id: 'handler',
        moves: [ { edge: 'dop', label: 'item_id=42' } ],
        title: { en: 'Your function runs', bn: 'আপনার ফাংশন চলে' },
        simple: {
          en: 'Your function receives clean, trusted values and does the real work, such as looking up item 42.',
          bn: 'আপনার ফাংশন পরিষ্কার, ভরসাযোগ্য মান হাতে পায় আর আসল কাজটা করে, যেমন ৪২ নম্বর আইটেম খুঁজে আনে।'
        },
        tech: {
          en: 'A `def` handler runs in a threadpool (AnyIO worker thread). An `async def` handler runs directly on the event loop, so a blocking call inside it freezes every request.',
          bn: '`def` হ্যান্ডলার চলে threadpool-এ (AnyIO worker thread)। `async def` হ্যান্ডলার সরাসরি event loop-এ চলে, তাই ভেতরে blocking কল থাকলে সব রিকোয়েস্ট আটকে যায়।'
        }
      },
      {
        id: 'response-model',
        moves: [ { edge: 'opd', label: 'return value' } ],
        title: { en: 'Your answer is checked on the way out', bn: 'বেরোনোর পথে উত্তর যাচাই হয়' },
        simple: {
          en: 'Your function hands back plain data. Only the fields you promised leave the building; secrets like a password hash are filtered out.',
          bn: 'আপনার ফাংশন সাধারণ ডেটা ফেরত দেয়। শুধু আপনার প্রতিশ্রুত ফিল্ডগুলোই বেরোয়; পাসওয়ার্ড হ্যাশের মতো গোপন জিনিস ছাঁটাই হয়ে যায়।'
        },
        tech: {
          en: '`response_model` validation and filtering happen as the value leaves: Pydantic converts it, drops extra fields, then it is serialized into a `JSONResponse`. ORM objects need `from_attributes=True`.',
          bn: 'মান বেরোনোর সময়ই `response_model` ভ্যালিডেশন আর ফিল্টারিং হয়: Pydantic কনভার্ট করে, বাড়তি ফিল্ড বাদ দেয়, তারপর `JSONResponse`-এ সিরিয়ালাইজ হয়। ORM অবজেক্টে `from_attributes=True` লাগে।'
        }
      },
      {
        id: 'outward',
        moves: [ { edge: 'em', label: 'JSONResponse' } ],
        title: { en: 'Back out through the checkpoints', bn: 'চেকপয়েন্ট পেরিয়ে ফেরা' },
        simple: {
          en: 'The reply travels back out through the same checkpoints in reverse. They can add headers, compress it, or log how long it took.',
          bn: 'রেসপন্স একই চেকপয়েন্টগুলোর ভেতর দিয়ে উল্টো পথে ফেরে। হেডার জুড়তে, কম্প্রেস করতে বা কতক্ষণ লাগল তা লগ করতে পারে।'
        },
        tech: {
          en: 'The response passes ExceptionMiddleware, then your middleware from bottom to top, then ServerErrorMiddleware. CORS and GZip add their headers or compression on this leg.',
          bn: 'রেসপন্স ExceptionMiddleware পার হয়, তারপর আপনার middleware নিচ থেকে উপরে, শেষে ServerErrorMiddleware। CORS আর GZip এই ধাপেই হেডার বা কম্প্রেশন জোড়ে।'
        }
      },
      {
        id: 'delivered',
        moves: [ { edge: 'uc', label: '200 OK' } ],
        title: { en: 'The reply is delivered', bn: 'রিপ্লাই পৌঁছে যায়' },
        simple: {
          en: 'Uvicorn sends the reply back over the network. The client now has its answer: 200 OK.',
          bn: 'Uvicorn রিপ্লাইটা নেটওয়ার্কে ফেরত পাঠায়। ক্লায়েন্ট এখন তার উত্তর পেয়ে গেছে: 200 OK।'
        },
        tech: {
          en: 'Uvicorn sends the ASGI messages `http.response.start` and `http.response.body`. Status, headers and body go on the wire. The client is done at this point.',
          bn: 'Uvicorn ASGI মেসেজ `http.response.start` আর `http.response.body` পাঠায়। স্ট্যাটাস, হেডার আর বডি তারে চলে যায়। ক্লায়েন্টের কাজ এখানেই শেষ।'
        }
      },
      {
        id: 'background',
        moves: [ { edge: 'opbg', label: 'send_email()' } ],
        title: { en: 'Slow extras come last', bn: 'ধীর বাড়তি কাজ শেষে' },
        simple: {
          en: 'Only after the answer is sent does the app do slow extras, like sending a confirmation email. The client is not kept waiting.',
          bn: 'উত্তর পাঠানোর পরেই অ্যাপ ধীর বাড়তি কাজ করে, যেমন কনফার্মেশন ইমেইল পাঠানো। ক্লায়েন্টকে অপেক্ষা করতে হয় না।'
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
      label: { en: 'Bad input (422)', bn: 'ভুল ইনপুট (422)' },
      branchAfter: 'deps',
      steps: [
        {
          id: 'validation-fails',
          work: { node: 'deps', kind: 'error' },
          title: { en: 'The data is the wrong shape', bn: 'ডেটার ছাঁচ ভুল' },
          simple: {
            en: 'The request was GET /items/abc, but an item number must be a number. The input check fails.',
            bn: 'রিকোয়েস্টটা ছিল GET /items/abc, কিন্তু আইটেম নম্বর তো সংখ্যা হওয়ার কথা। ইনপুট যাচাইয়ে আটকে যায়।'
          },
          tech: {
            en: 'Pydantic cannot parse `abc` as an `int`, so FastAPI raises `RequestValidationError` with a `loc`, `msg` and `type` for each bad field.',
            bn: 'Pydantic `abc`-কে `int` হিসেবে পার্স করতে পারে না, তাই FastAPI প্রতিটি ভুল ফিল্ডের জন্য `loc`, `msg` আর `type`-সহ `RequestValidationError` তোলে।'
          }
        },
        {
          id: 'handler-answers',
          moves: [ { edge: 'de', label: 'RequestValidationError' } ],
          title: { en: 'The error translator steps in', bn: 'এরর অনুবাদক এগিয়ে আসে' },
          simple: {
            en: 'The error goes straight to the translator layer. Your function never ran at all.',
            bn: 'এররটা সোজা অনুবাদক স্তরে চলে যায়। আপনার ফাংশন একবারও চলেনি।'
          },
          tech: {
            en: 'FastAPI registers a handler for `RequestValidationError` in ExceptionMiddleware’s table. You can override it with `@app.exception_handler(RequestValidationError)`.',
            bn: 'FastAPI ExceptionMiddleware-এর টেবিলে `RequestValidationError`-এর জন্য একটা handler রেজিস্টার করে রাখে। `@app.exception_handler(RequestValidationError)` দিয়ে সেটা বদলানো যায়।'
          }
        },
        {
          id: '422-out',
          moves: [ { edge: 'em', label: '422 + detail[]' } ],
          title: { en: 'A clear 422 goes out', bn: 'পরিষ্কার একটা 422 বেরোয়' },
          simple: {
            en: 'The reply says exactly which field was wrong and why, then travels back out through your checkpoints.',
            bn: 'রিপ্লাইতে লেখা থাকে ঠিক কোন ফিল্ড কেন ভুল। তারপর সেটা আপনার চেকপয়েন্টগুলো পেরিয়ে ফেরে।'
          },
          tech: {
            en: 'The body is `{"detail": [{"loc", "msg", "type"}]}` with status 422, not 400. It then goes out through your middleware like any normal response.',
            bn: 'বডি হলো `{"detail": [{"loc", "msg", "type"}]}`, স্ট্যাটাস 422, 400 নয়। তারপর অন্য যেকোনো স্বাভাবিক রেসপন্সের মতোই আপনার middleware পেরিয়ে যায়।'
          }
        },
        {
          id: '422-delivered',
          moves: [ { edge: 'uc', label: '422' } ],
          title: { en: 'The client learns what to fix', bn: 'ক্লায়েন্ট জানে কী ঠিক করতে হবে' },
          simple: {
            en: 'The client gets the 422 and can show a helpful message. Your function never ran, so nothing was touched.',
            bn: 'ক্লায়েন্ট 422 পায় আর কাজের একটা মেসেজ দেখাতে পারে। আপনার ফাংশন চলেইনি, তাই কিছুই বদলায়নি।'
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
      label: { en: 'A bug (500)', bn: 'বাগ (500)' },
      branchAfter: 'handler',
      steps: [
        {
          id: 'crash',
          work: { node: 'op', kind: 'error' },
          title: { en: 'Your function crashes', bn: 'আপনার ফাংশন ক্র্যাশ করে' },
          simple: {
            en: 'A bug in your code looks up a key that does not exist. The function crashes halfway.',
            bn: 'আপনার কোডের একটা বাগ এমন একটা কী খোঁজে যা নেই। ফাংশন মাঝপথে ক্র্যাশ করে।'
          },
          tech: {
            en: 'The handler raises `KeyError`, which is not an `HTTPException` and has no registered handler. Nothing between here and the outermost layer will catch it.',
            bn: 'হ্যান্ডলার `KeyError` তোলে, যা `HTTPException` নয়, আর এর কোনো রেজিস্টার করা handler-ও নেই। এখান থেকে সবচেয়ে বাইরের স্তর পর্যন্ত কেউ এটা ধরবে না।'
          }
        },
        {
          id: 'escapes',
          moves: [ { edge: 'ops', label: 'KeyError' } ],
          title: { en: 'The error escapes to the safety net', bn: 'এরর ছিটকে সেফটি নেটে যায়' },
          simple: {
            en: 'The error rushes past the error translator and your checkpoints without being handled. It lands in the safety net at the very edge.',
            bn: 'এরর অনুবাদক আর আপনার চেকপয়েন্টের ভেতর দিয়ে কোনো সমাধান ছাড়াই ছুটে যায়। একদম বাইরের সেফটি নেটে গিয়ে পড়ে।'
          },
          tech: {
            en: 'The exception passes through ExceptionMiddleware and your middleware unhandled. `ServerErrorMiddleware` returns a plain 500, then re-raises so the server can log the traceback.',
            bn: 'exception ExceptionMiddleware আর আপনার middleware-এর ভেতর দিয়ে অমীমাংসিত অবস্থায় চলে যায়। `ServerErrorMiddleware` সাধারণ একটা 500 ফেরত দেয়, তারপর আবার raise করে, যাতে সার্ভার traceback লগ করতে পারে।'
          }
        },
        {
          id: '500-out',
          moves: [ { edge: 'uc', label: '500' } ],
          title: { en: 'A bare 500 reaches the client', bn: 'ন্যাড়া একটা 500 ক্লায়েন্টে পৌঁছায়' },
          simple: {
            en: 'The client gets a plain “Internal Server Error”. The checkpoints never saw the reply, so they added nothing to it.',
            bn: 'ক্লায়েন্ট শুধু একটা সাদামাটা “Internal Server Error” পায়। চেকপয়েন্টগুলো রিপ্লাইটা দেখেইনি, তাই কিছু জুড়তে পারেনি।'
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
      label: { en: 'Server starts up', bn: 'সার্ভার চালু হয়' },
      branchAfter: 'request',
      steps: [
        {
          id: 'lifespan-start',
          moves: [ { edge: 'uo', label: 'lifespan.startup' } ],
          title: { en: 'Rewind: before the first request', bn: 'রিওয়াইন্ড: প্রথম রিকোয়েস্টের আগে' },
          simple: {
            en: 'Before any visitor arrives, Uvicorn tells your app to get ready. Your setup code runs once: open the database, load the model.',
            bn: 'কোনো ভিজিটর আসার আগেই Uvicorn আপনার অ্যাপকে তৈরি হতে বলে। আপনার সেটআপ কোড একবার চলে: ডেটাবেস খোলা, মডেল লোড করা।'
          },
          tech: {
            en: 'Uvicorn sends `lifespan.startup`. Code before `yield` in your `lifespan` async context manager runs now, such as creating a DB pool or loading an ML model.',
            bn: 'Uvicorn `lifespan.startup` পাঠায়। আপনার `lifespan` async context manager-এর `yield`-এর আগের কোড এখন চলে, যেমন DB pool বানানো বা ML মডেল লোড করা।'
          }
        },
        {
          id: 'ready',
          work: { node: 'uvicorn', kind: 'result' },
          state: { uvicorn: { en: 'Accepting requests', bn: 'রিকোয়েস্ট নিচ্ছে' } },
          title: { en: 'The doors open', bn: 'দরজা খুলে যায়' },
          simple: {
            en: 'Setup is done. The server opens its doors and starts accepting requests.',
            bn: 'সেটআপ শেষ। সার্ভার দরজা খুলে দেয় আর রিকোয়েস্ট নেওয়া শুরু করে।'
          },
          tech: {
            en: 'The app now serves traffic. The pool and model live in the same scope as their cleanup. Do not mix `lifespan` with `on_event`; handlers are ignored once `lifespan` is set.',
            bn: 'অ্যাপ এখন ট্রাফিক সামলায়। pool আর মডেল তাদের ক্লিনআপের সাথে একই scope-এ থাকে। `lifespan`-এর সাথে `on_event` মেশাবেন না; `lifespan` দিলে ওই handler-গুলো উপেক্ষিত হয়।'
          }
        },
        {
          id: 'lifespan-stop',
          moves: [ { edge: 'uo', label: 'lifespan.shutdown' } ],
          title: { en: 'Closing time', bn: 'বন্ধের সময়' },
          simple: {
            en: 'Much later, the server is told to stop. Uvicorn warns the app first, so it can tidy up.',
            bn: 'অনেক পরে সার্ভারকে থামতে বলা হয়। Uvicorn আগে অ্যাপকে জানায়, যাতে সে গুছিয়ে নিতে পারে।'
          },
          tech: {
            en: 'Uvicorn sends `lifespan.shutdown`. Code after `yield` runs now. Lifespan does not run for mounted sub-apps, and `TestClient` only triggers it when used as a context manager.',
            bn: 'Uvicorn `lifespan.shutdown` পাঠায়। `yield`-এর পরের কোড এখন চলে। mounted sub-app-এর lifespan চলে না, আর `TestClient` শুধু context manager হিসেবে ব্যবহার করলেই এটা চালায়।'
          }
        },
        {
          id: 'closed',
          work: { node: 'op', kind: 'result' },
          state: { op: { en: 'Pool closed', bn: 'Pool বন্ধ' } },
          title: { en: 'Everything is tidied up', bn: 'সব গুছিয়ে ফেলা হলো' },
          simple: {
            en: 'The database connections are closed neatly and the app exits cleanly. Nothing is left hanging.',
            bn: 'ডেটাবেস কানেকশনগুলো ঠিকঠাক বন্ধ হয়, অ্যাপও পরিষ্কারভাবে বেরিয়ে যায়। কিছু ঝুলে থাকে না।'
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
        name: { en: 'Coat check and security', bn: 'কোট চেক আর সিকিউরিটি' },
        d: {
          en: 'Checks you in on the way in, and hands your things back on the way out.',
          bn: 'ঢোকার সময় আপনাকে যাচাই করেন, বেরোনোর সময় জিনিসপত্র ফেরত দেন।'
        }
      },
      {
        icon: 'shield',
        node: 'exm',
        name: { en: 'The polite waiter', bn: 'ভদ্র ওয়েটার' },
        d: {
          en: 'Says “sorry, we are out of that” instead of leaving you confused.',
          bn: 'আপনাকে ধোঁয়াশায় না রেখে বলেন “দুঃখিত, ওটা আজ শেষ”।'
        }
      },
      {
        icon: 'route',
        node: 'router',
        name: { en: 'The host seating you', bn: 'সিট দেখানো হোস্ট' },
        d: {
          en: 'Reads your request and sends you to the right section.',
          bn: 'আপনার চাওয়া পড়ে সঠিক সেকশনে পাঠিয়ে দেন।'
        }
      },
      {
        icon: 'check',
        node: 'deps',
        name: { en: 'The waiter checking the form', bn: 'অর্ডার ফর্ম দেখা ওয়েটার' },
        d: {
          en: 'Checks the order form is filled in properly and your ID is fine. Plating hides the secret ingredients.',
          bn: 'অর্ডার ফর্ম ঠিকমতো ভরা কি না আর আপনার আইডি ঠিক আছে কি না দেখেন। প্লেটিংয়ে গোপন উপকরণ আড়ালে থাকে।'
        }
      },
      {
        icon: 'code',
        node: 'op',
        name: { en: 'The chef', bn: 'শেফ' },
        d: {
          en: 'Receives a clean, checked order and cooks the dish.',
          bn: 'যাচাই করা পরিষ্কার অর্ডার হাতে পান আর খাবারটা রান্না করেন।'
        }
      },
      {
        icon: 'mail',
        node: 'bg',
        name: { en: 'The dishwasher', bn: 'বাসন ধোয়ার লোক' },
        d: {
          en: 'Washes the dishes after you have already been served and left happy. It never makes you wait.',
          bn: 'আপনাকে খাবার দিয়ে খুশি করে বিদায় দেওয়ার পরে বাসন ধোন। আপনাকে কখনো অপেক্ষা করান না।'
        }
      },
      {
        icon: 'power',
        node: null,
        name: { en: 'A kitchen fire', bn: 'রান্নাঘরে আগুন' },
        is: { en: 'is a 500', bn: 'মানে 500' },
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
