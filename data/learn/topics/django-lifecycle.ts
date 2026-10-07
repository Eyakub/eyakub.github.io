import type { Topic } from '../types'
import { UI } from '../ui'

export const djangoLifecycle: Topic = {
  slug: 'django-lifecycle',
  line: 'backend',
  title: { en: 'Django lifecycle', bn: 'Django-র জীবনচক্র' },
  summary: {
    en: 'Everything a POST passes on its way into a Django view and back out again: middleware, URL routing, the CSRF check, the ORM and templates.',
    bn: 'একটা POST রিকোয়েস্ট Django view-তে পৌঁছাতে আর ফিরে আসতে যা যা পার হয়: middleware, URL routing, CSRF check, ORM আর template।'
  },
  hook: {
    en: 'Every Django page follows one fixed path, like an order in a restaurant, so you can tell which step is to blame when something fails.',
    bn: 'প্রতিটি Django পেজ রেস্টুরেন্টের অর্ডারের মতো একই নির্দিষ্ট পথে চলে, তাই কিছু ভেঙে পড়লে কোন ধাপ দায়ী তা বোঝা যায়।'
  },
  story: {
    cast: {
      en: 'Sadia sends in an order form at a restaurant, where Parvez checks every form’s pass stamp at the desk and Tareq is the chef.',
      bn: 'সাদিয়া একটা রেস্টুরেন্টে অর্ডার ফর্ম পাঠায়, যেখানে পারভেজ ডেস্কে প্রতিটি ফর্মের পাসের সিল দেখে নেয় আর তারেক শেফ।'
    }
  },
  takeaway: {
    en: 'Checkpoints run in order going in and in reverse coming out, so an error shows where it stopped.',
    bn: 'চেকপয়েন্ট ঢোকার সময় ক্রমে, বেরোনোর সময় উল্টো ক্রমে চলে, তাই error বলে দেয় কোথায় আটকাল।'
  },
  words: [
    {
      term: { en: 'Order form (request)', bn: 'অর্ডার ফর্ম (request)' },
      d: {
        en: 'What the customer sends: the page wanted, plus any details filled in.',
        bn: 'কাস্টমার যা পাঠায়: কোন পাতা চায়, সাথে ভরা বিবরণ।'
      }
    },
    {
      term: { en: 'Front-desk team (middleware)', bn: 'সামনের দল (middleware)' },
      d: {
        en: 'Checkpoints every order passes going in, and every reply passes coming out.',
        bn: 'যে চেকপয়েন্টগুলো প্রতিটি অর্ডার ঢোকার পথে আর প্রতিটি উত্তর বেরোনোর পথে পার হয়।'
      }
    },
    {
      term: { en: 'Pass checker (CSRF check)', bn: 'পাস পরীক্ষক (CSRF check)' },
      d: {
        en: 'Makes sure a form really came from the restaurant’s own page.',
        bn: 'দেখে ফর্মটা সত্যিই রেস্টুরেন্টের নিজের পাতা থেকে এসেছে কি না।'
      }
    },
    {
      term: { en: 'Seating host (URL routing)', bn: 'সিট দেখানো হোস্ট (URL routing)' },
      d: {
        en: 'Reads the address and decides which chef handles the order.',
        bn: 'ঠিকানা পড়ে ঠিক করে কোন শেফ অর্ডারটা সামলাবে।'
      }
    },
    {
      term: { en: 'Chef (view)', bn: 'শেফ (view)' },
      d: {
        en: 'Your own code, which does the real work and prepares the answer.',
        bn: 'আপনার নিজের কোড, যে আসল কাজটা করে আর উত্তর তৈরি করে।'
      }
    },
    {
      term: { en: 'Plating station (template)', bn: 'সাজানোর টেবিল (template)' },
      d: {
        en: 'Fills a ready-made page layout with today’s details.',
        bn: 'তৈরি পাতার ছকে আজকের বিবরণ বসিয়ে দেয়।'
      }
    }
  ],
  legend: {
    request: { en: 'Order going in', bn: 'ভেতরে যাওয়া অর্ডার' },
    queue: { en: 'Side note', bn: 'আলাদা বার্তা' },
    result: { en: 'Dish coming back', bn: 'ফেরত আসা খাবার' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 1000, 410 ], narrow: [ 400, 540 ] },
  nodeR: { narrow: 20 },
  nodes: {
    client: {
      icon: 'user',
      name: { en: 'Browser', bn: 'ব্রাউজার' },
      sub: { en: 'Posts the form', bn: 'ফর্ম পোস্ট করে' },
      plain: {
        name: { en: 'Customer', bn: 'কাস্টমার' },
        sub: { en: 'Fills in a form', bn: 'ফর্ম ভরে' }
      },
      wide: [ 76, 120, 'up' ],
      narrow: [ 150, 36, 'right' ]
    },
    wsgi: {
      icon: 'server',
      name: { en: 'WSGIHandler', bn: 'WSGIHandler' },
      sub: { en: 'Builds HttpRequest', bn: 'HttpRequest বানায়' },
      plain: {
        name: { en: 'Host at the door', bn: 'দরজার হোস্ট' },
        sub: { en: 'Takes the slip', bn: 'স্লিপ নেয়' }
      },
      wide: [ 283, 120, 'up' ],
      narrow: [ 150, 100, 'right' ]
    },
    session: {
      icon: 'shield',
      name: { en: 'Session + auth', bn: 'Session + auth' },
      sub: { en: 'Finds the user', bn: 'user খুঁজে নেয়' },
      plain: {
        name: { en: 'Security desk', bn: 'সিকিউরিটি ডেস্ক' },
        sub: { en: 'Knows the customer', bn: 'কাস্টমারকে চেনে' }
      },
      wide: [ 490, 120, 'up' ],
      narrow: [ 150, 164, 'right' ]
    },
    csrf: {
      icon: 'lock',
      name: { en: 'CsrfViewMiddleware', bn: 'CsrfViewMiddleware' },
      sub: { en: 'Checks the token', bn: 'token যাচাই করে' },
      plain: {
        name: { en: 'Pass checker', bn: 'পাস পরীক্ষক' },
        sub: { en: 'Looks for the stamp', bn: 'সিল খোঁজে' }
      },
      wide: [ 697, 120, 'up' ],
      narrow: [ 150, 228, 'right' ]
    },
    urls: {
      icon: 'route',
      name: { en: 'URL resolver', bn: 'URL resolver' },
      sub: { en: 'Matches the path', bn: 'path মেলায়' },
      plain: {
        name: { en: 'Seating host', bn: 'সিট দেখানো হোস্ট' },
        sub: { en: 'Picks the right chef', bn: 'সঠিক শেফ বেছে দেয়' }
      },
      wide: [ 904, 120, 'up' ],
      narrow: [ 150, 292, 'right' ]
    },
    view: {
      icon: 'code',
      name: { en: 'View', bn: 'View' },
      sub: { en: 'Your function', bn: 'আপনার ফাংশন' },
      plain: {
        name: { en: 'Chef', bn: 'শেফ' },
        sub: { en: 'Cooks the dish', bn: 'খাবার রান্না করে' }
      },
      wide: [ 697, 330, 'down' ],
      narrow: [ 150, 356, 'right' ]
    },
    db: {
      icon: 'store',
      name: { en: 'Database', bn: 'ডেটাবেস' },
      sub: { en: 'ORM + SQL', bn: 'ORM + SQL' },
      plain: {
        name: { en: 'Pantry', bn: 'ভাঁড়ার' },
        sub: { en: 'Keeps the ingredients', bn: 'উপকরণ জমা রাখে' }
      },
      wide: [ 904, 330, 'down' ],
      narrow: [ 150, 420, 'right' ]
    },
    template: {
      icon: 'folder',
      name: { en: 'Template', bn: 'Template' },
      sub: { en: 'Fills in the HTML', bn: 'HTML ভরে' },
      plain: {
        name: { en: 'Plating station', bn: 'সাজানোর টেবিল' },
        sub: { en: 'Lays out the page', bn: 'পাতা সাজায়' }
      },
      wide: [ 490, 330, 'down' ],
      narrow: [ 150, 484, 'right' ]
    }
  },
  groups: [
    {
      id: 'middleware',
      label: { en: 'Middleware', bn: 'মিডলওয়্যার' },
      plain: { en: 'Front-desk team', bn: 'সামনের দল' },
      wide: [ 400, 44, 390, 124 ],
      narrow: [ 105, 134, 285, 134 ]
    }
  ],
  corridors: {
    'client-wsgi': { wide: [ [ 76, 120 ], [ 283, 120 ] ], narrow: [ [ 150, 36 ], [ 150, 100 ] ] },
    'wsgi-session': { wide: [ [ 283, 120 ], [ 490, 120 ] ], narrow: [ [ 150, 100 ], [ 150, 164 ] ] },
    'session-csrf': { wide: [ [ 490, 120 ], [ 697, 120 ] ], narrow: [ [ 150, 164 ], [ 150, 228 ] ] },
    'csrf-urls': { wide: [ [ 697, 120 ], [ 904, 120 ] ], narrow: [ [ 150, 228 ], [ 150, 292 ] ] },
    'csrf-view': { wide: [ [ 697, 120 ], [ 697, 330 ] ], narrow: [ [ 150, 228 ], [ 110, 268 ], [ 110, 316 ], [ 150, 356 ] ] },
    'view-db': { wide: [ [ 697, 330 ], [ 904, 330 ] ], narrow: [ [ 150, 356 ], [ 150, 420 ] ] },
    'view-template': { wide: [ [ 697, 330 ], [ 490, 330 ] ], narrow: [ [ 150, 356 ], [ 110, 396 ], [ 110, 444 ], [ 150, 484 ] ] }
  },
  edges: {
    'client-wsgi': { from: 'client', to: 'wsgi', kind: 'request' },
    'wsgi-session': { from: 'wsgi', to: 'session', kind: 'request' },
    'session-csrf': { from: 'session', to: 'csrf', kind: 'request' },
    'csrf-urls': { from: 'csrf', to: 'urls', kind: 'request' },
    'urls-csrf': { from: 'urls', to: 'csrf', kind: 'request' },
    'csrf-view': { from: 'csrf', to: 'view', kind: 'request' },
    'view-db': { from: 'view', to: 'db', kind: 'request' },
    'db-view': { from: 'db', to: 'view', kind: 'result' },
    'view-template': { from: 'view', to: 'template', kind: 'request' },
    'template-view': { from: 'template', to: 'view', kind: 'result' },
    'view-csrf': { from: 'view', to: 'csrf', kind: 'result' },
    'csrf-session': { from: 'csrf', to: 'session', kind: 'result' },
    'session-wsgi': { from: 'session', to: 'wsgi', kind: 'result' },
    'wsgi-client': { from: 'wsgi', to: 'client', kind: 'result' },
    'urls-csrf-err': { from: 'urls', to: 'csrf', kind: 'error' },
    'view-csrf-err': { from: 'view', to: 'csrf', kind: 'error' },
    'csrf-session-err': { from: 'csrf', to: 'session', kind: 'error' },
    'session-wsgi-err': { from: 'session', to: 'wsgi', kind: 'error' },
    'wsgi-client-err': { from: 'wsgi', to: 'client', kind: 'error' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'request',
        moves: [ { edge: 'client-wsgi', label: 'POST /orders/', plain: { en: 'Order form', bn: 'অর্ডার ফর্ম' } } ],
        title: { en: 'A customer sends an order form', bn: 'একজন কাস্টমার অর্ডার ফর্ম পাঠায়' },
        simple: {
          en: 'A customer fills in an order form and hands it to the host at the door. This form changes something in the kitchen, so it will be checked carefully.',
          bn: 'কাস্টমার একটা অর্ডার ফর্ম ভরে দরজার হোস্টের হাতে দেয়। এই ফর্ম রান্নাঘরে কিছু বদলে দেয়, তাই এটা খুব সাবধানে যাচাই হবে।'
        },
        story: {
          title: { en: 'Sadia sends her order form', bn: 'সাদিয়া অর্ডার ফর্ম পাঠায়' },
          text: {
            en: 'Sadia fills in an order form for her favourite dish and hands it to the host at the door. Because it asks the kitchen to do something, it will be checked carefully later.',
            bn: 'সাদিয়া তার প্রিয় পদের জন্য একটা অর্ডার ফর্ম ভরে দরজার হোস্টের হাতে দেয়। ফর্মটা রান্নাঘরকে দিয়ে কিছু করাতে চায়, তাই পরে এটা সাবধানে যাচাই হবে।'
          }
        },
        tech: {
          en: 'The browser sends `POST /orders/` with a form body. A WSGI server such as Gunicorn calls Django’s `WSGIHandler`, which builds a `WSGIRequest`: an `HttpRequest` with `method`, `POST` and `META`.',
          bn: 'ব্রাউজার ফর্ম বডিসহ `POST /orders/` পাঠায়। Gunicorn-এর মতো একটা WSGI server Django-র `WSGIHandler` ডাকে, যে একটা `WSGIRequest` বানায়: `method`, `POST` আর `META`-সহ একটা `HttpRequest`।'
        }
      },
      {
        id: 'middleware-in',
        moves: [
          { edge: 'wsgi-session', label: 'HttpRequest', plain: { en: 'Order form', bn: 'অর্ডার ফর্ম' } },
          { edge: 'session-csrf', label: 'HttpRequest', plain: { en: 'Order form', bn: 'অর্ডার ফর্ম' } }
        ],
        state: { session: { en: 'User attached (lazy)', bn: 'user বসানো (lazy)' } },
        plainState: { session: { en: 'Card ready to check', bn: 'কার্ড দেখার জন্য তৈরি' } },
        title: { en: 'The form goes past the front-desk team', bn: 'ফর্ম সামনের দলের পাশ দিয়ে যায়' },
        simple: {
          en: 'The host passes the form to the front-desk team. The security desk gets the customer’s card ready, and the pass checker just notes the form for later.',
          bn: 'হোস্ট ফর্মটা সামনের দলের কাছে দেয়। সিকিউরিটি ডেস্ক কাস্টমারের কার্ড দেখার জন্য তৈরি রাখে, আর পাস পরীক্ষক শুধু ফর্মটা পরের জন্য নোট করে।'
        },
        story: {
          title: { en: 'The form passes the front desk', bn: 'ফর্ম সামনের ডেস্ক পেরোয়' },
          text: {
            en: 'The host passes the form down the front-desk team. At the security desk, Sadia’s member card is ready to be looked up, but only if someone asks. Parvez, the pass checker, just notes the form for later.',
            bn: 'হোস্ট ফর্মটা সামনের দলের হাতে দেয়। সিকিউরিটি ডেস্কে সাদিয়ার মেম্বার কার্ড দেখার জন্য তৈরি, কিন্তু কেউ চাইলে তবেই খোঁজা হবে। পাস পরীক্ষক পারভেজ শুধু ফর্মটা পরের জন্য নোট করে রাখে।'
          }
        },
        tech: {
          en: 'Middleware runs top-down through `MIDDLEWARE`. `SessionMiddleware` sets `request.session`, and `AuthenticationMiddleware` adds `request.user`, a lazy object that loads the user only on first use. `CsrfViewMiddleware` only reads its secret for now.',
          bn: 'Middleware `MIDDLEWARE`-এর ওপর থেকে নিচে চলে। `SessionMiddleware` `request.session` বসায়, আর `AuthenticationMiddleware` যোগ করে `request.user`, একটা lazy object যে প্রথম ব্যবহারেই ইউজার লোড করে। `CsrfViewMiddleware` আপাতত শুধু তার secret পড়ে।'
        }
      },
      {
        id: 'resolve',
        moves: [ { edge: 'csrf-urls', label: '/orders/', plain: { en: 'Which page?', bn: 'কোন পাতা?' } } ],
        state: { urls: { en: 'Matched: orders', bn: 'মিলেছে: orders' } },
        plainState: { urls: { en: 'Found the chef', bn: 'শেফ পাওয়া গেছে' } },
        title: { en: 'The seating host reads the address', bn: 'সিট দেখানো হোস্ট ঠিকানা পড়ে' },
        simple: {
          en: 'The seating host reads which page was asked for and goes down the list, line by line. The first line that fits shows which chef takes the order.',
          bn: 'সিট দেখানো হোস্ট পড়ে কোন পাতা চাওয়া হয়েছে, তারপর তালিকায় এক লাইন করে নিচে নামে। প্রথম যে লাইন মেলে, সেটাই বলে দেয় কোন শেফ অর্ডার নেবে।'
        },
        story: {
          title: { en: 'The seating host finds Tareq', bn: 'সিট দেখানো হোস্ট তারেককে খোঁজে' },
          text: {
            en: 'The seating host reads which page Sadia asked for and runs a finger down the list, one line at a time. The first line that fits wins, and it points to Tareq.',
            bn: 'সিট দেখানো হোস্ট পড়ে সাদিয়া কোন পাতা চেয়েছে, তারপর আঙুল বুলিয়ে তালিকায় এক এক করে নামে। প্রথম যে লাইন মেলে সেটাই জেতে, আর সেটা দেখায় তারেককে।'
          }
        },
        tech: {
          en: 'Starting from `ROOT_URLCONF`, Django tries each entry of `urlpatterns` in order against `path_info` and stops at the first match. The match gives a view plus any captured arguments.',
          bn: '`ROOT_URLCONF` থেকে শুরু করে Django `urlpatterns`-এর প্রতিটি entry `path_info`-এর সাথে ক্রমানুসারে মেলায় আর প্রথম মিলেই থামে। মিলে গেলে একটা view আর ধরা পড়া argument পাওয়া যায়।'
        }
      },
      {
        id: 'process-view',
        moves: [ { edge: 'urls-csrf', label: 'process_view', plain: { en: 'Show the stamp', bn: 'সিল দেখানো' } } ],
        state: { csrf: { en: 'Token matches', bn: 'token মিলেছে' } },
        plainState: { csrf: { en: 'Stamp is real', bn: 'সিল আসল' } },
        title: { en: 'The pass checker looks for the stamp', bn: 'পাস পরীক্ষক সিল খোঁজে' },
        simple: {
          en: 'Just before the chef starts, the pass checker looks at the form. Every form the restaurant hands out carries its pass stamp, and this one does, so it goes through.',
          bn: 'শেফ শুরু করার ঠিক আগে পাস পরীক্ষক ফর্মটা দেখে। রেস্টুরেন্টের দেওয়া প্রতিটি ফর্মে তার পাসের সিল থাকে, আর এটাতেও আছে, তাই ফর্মটা এগিয়ে যায়।'
        },
        story: {
          title: { en: 'Parvez checks the stamp', bn: 'পারভেজ সিল দেখে' },
          text: {
            en: 'Just before Tareq starts, the seating host shows the form to Parvez. He finds the restaurant’s own stamp, so he knows Sadia really made this order on the restaurant’s page, and he lets it through.',
            bn: 'তারেক শুরু করার ঠিক আগে সিট দেখানো হোস্ট ফর্মটা পারভেজকে দেখায়। সে রেস্টুরেন্টের নিজের সিল খুঁজে পায়, তাই বোঝে সাদিয়া সত্যিই রেস্টুরেন্টের পাতায় এই অর্ডার দিয়েছে, আর ফর্মটা ছেড়ে দেয়।'
          }
        },
        tech: {
          en: 'Next Django calls every middleware’s `process_view`, top-down, just before the view. `CsrfViewMiddleware` runs here, after URL resolution, so it can see whether the view is `csrf_exempt`. A POST needs a token matching the secret.',
          bn: 'এরপর Django প্রতিটি middleware-এর `process_view` ডাকে, ওপর থেকে নিচে, view চলার ঠিক আগে। `CsrfViewMiddleware` এখানেই চলে, URL resolution-এর পরে, তাই দেখতে পারে view `csrf_exempt` কি না। POST-এ secret-এর সাথে মেলে এমন token লাগে।'
        }
      },
      {
        id: 'to-view',
        moves: [ { edge: 'csrf-view', label: 'request + args', plain: { en: 'Checked form', bn: 'যাচাই করা ফর্ম' } } ],
        state: {
          db: { en: 'No SQL yet', bn: 'এখনো SQL নেই' },
          view: { en: 'QuerySet built', bn: 'QuerySet তৈরি' }
        },
        plainState: {
          db: { en: 'Not asked yet', bn: 'এখনো বলা হয়নি' },
          view: { en: 'List written', bn: 'তালিকা লেখা' }
        },
        title: { en: 'The chef gets the checked form', bn: 'শেফ যাচাই করা ফর্ম পায়' },
        simple: {
          en: 'The chef takes the checked form and writes a list of what is needed from the pantry. A list costs nothing, so nobody has gone to the pantry yet.',
          bn: 'শেফ যাচাই করা ফর্ম হাতে নিয়ে ভাঁড়ার থেকে কী কী লাগবে তার একটা তালিকা লেখে। তালিকা লিখতে কিছু খরচ হয় না, তাই এখনো কেউ ভাঁড়ারে যায়নি।'
        },
        story: {
          title: { en: 'Tareq writes his pantry list', bn: 'তারেক ভাঁড়ারের তালিকা লেখে' },
          text: {
            en: 'Tareq gets the checked form. He writes down what he needs from the pantry, but he does not walk over yet. A list costs nothing until he actually goes to fetch things.',
            bn: 'তারেক যাচাই করা ফর্ম পায়। ভাঁড়ার থেকে কী লাগবে সে লিখে রাখে, কিন্তু এখনো হেঁটে যায় না। জিনিস আনতে সত্যিই না যাওয়া পর্যন্ত তালিকা লিখতে কিছু খরচ হয় না।'
          }
        },
        tech: {
          en: 'No `process_view` returned a response, so Django calls the view with the `HttpRequest` plus the URL arguments. A line like `Dish.objects.filter(...)` only builds a lazy `QuerySet`. No SQL has run yet.',
          bn: 'কোনো `process_view` response ফেরত দেয়নি, তাই Django `HttpRequest` আর URL argument দিয়ে view ডাকে। `Dish.objects.filter(...)`-এর মতো একটা লাইন শুধু একটা lazy `QuerySet` বানায়। এখনো কোনো SQL চলেনি।'
        }
      },
      {
        id: 'query',
        moves: [ { edge: 'view-db', label: 'SELECT dish', plain: { en: 'Fetch ingredients', bn: 'উপকরণ আনা' } } ],
        state: {
          view: { en: 'Evaluating it', bn: 'evaluate করছে' },
          db: { en: 'Running SELECT', bn: 'SELECT চলছে' }
        },
        plainState: {
          view: { en: 'Needs them now', bn: 'এখন লাগছে' },
          db: { en: 'Fetching items', bn: 'জিনিস আনছে' }
        },
        title: { en: 'The chef goes to the pantry', bn: 'শেফ ভাঁড়ারে যায়' },
        simple: {
          en: 'Now the chef needs the ingredients in hand, so the chef goes to the pantry and asks. Only at this moment does the pantry hear about the order.',
          bn: 'এবার শেফের হাতে উপকরণ লাগবে, তাই শেফ ভাঁড়ারে গিয়ে চায়। ঠিক এই মুহূর্তেই ভাঁড়ার প্রথম অর্ডারের কথা শোনে।'
        },
        story: {
          title: { en: 'Tareq goes to the pantry', bn: 'তারেক ভাঁড়ারে যায়' },
          text: {
            en: 'Now Tareq needs the ingredients in his hands, so he walks to the pantry and asks. Only at this moment does the pantry hear about Sadia’s order.',
            bn: 'এবার তারেকের হাতে উপকরণ লাগবে, তাই সে হেঁটে ভাঁড়ারে গিয়ে চায়। ঠিক এই মুহূর্তেই ভাঁড়ার সাদিয়ার অর্ডারের কথা শোনে।'
          }
        },
        tech: {
          en: 'Evaluating the `QuerySet` finally runs the `SELECT`. Iterating, `list()`, `len()`, `bool()` and slicing with a step all evaluate it. Here the view does it, so the query runs now.',
          bn: '`QuerySet` শেষ পর্যন্ত evaluate হলে `SELECT` চলে। iteration, `list()`, `len()`, `bool()` আর step দিয়ে slicing সবই এটা evaluate করে। এখানে view নিজেই এটা করে, তাই query এখনই চলে।'
        }
      },
      {
        id: 'rows',
        moves: [ { edge: 'db-view', label: 'rows', plain: { en: 'The ingredients', bn: 'উপকরণগুলো' } } ],
        state: {
          view: { en: 'Rows cached', bn: 'row cache হয়েছে' },
          db: { en: 'Rows returned', bn: 'row ফেরত দিয়েছে' }
        },
        plainState: {
          view: { en: 'Has the items', bn: 'জিনিস হাতে আছে' },
          db: { en: 'Items handed over', bn: 'জিনিস তুলে দিয়েছে' }
        },
        title: { en: 'The pantry hands over the items', bn: 'ভাঁড়ার জিনিসগুলো তুলে দেয়' },
        simple: {
          en: 'The pantry gives exactly what was asked for. The chef keeps it close, so asking for the same list again would not need another trip.',
          bn: 'ভাঁড়ার ঠিক যা চাওয়া হয়েছিল তা-ই দেয়। শেফ সেটা হাতের কাছে রাখে, তাই একই তালিকা আবার চাইলে আরেকবার যেতে হবে না।'
        },
        story: {
          title: { en: 'The pantry gives up its items', bn: 'ভাঁড়ার জিনিস তুলে দেয়' },
          text: {
            en: 'The pantry slides out exactly what Tareq asked for. He keeps a copy by his stove, so if he needs the same list again he will not walk back.',
            bn: 'ভাঁড়ার তারেকের চাওয়া জিনিসগুলোই বের করে দেয়। সে একটা কপি চুলার পাশে রাখে, তাই একই তালিকা আবার লাগলে তাকে হেঁটে ফিরতে হবে না।'
          }
        },
        tech: {
          en: 'The database returns the matching rows. The `QuerySet` now caches its results, so reusing the same variable costs no new query, but a fresh `Dish.objects.all()` would query again.',
          bn: 'database মিলে যাওয়া row ফেরত দেয়। `QuerySet` এখন তার ফলাফল cache করে রাখে, তাই একই variable আবার ব্যবহার করলে নতুন query লাগে না, কিন্তু নতুন `Dish.objects.all()` আবার query চালাবে।'
        }
      },
      {
        id: 'render',
        moves: [ { edge: 'view-template', label: 'context', plain: { en: 'The details', bn: 'বিবরণগুলো' } } ],
        title: { en: 'The chef sends it to be plated', bn: 'শেফ সাজানোর জন্য পাঠায়' },
        simple: {
          en: 'The chef passes the details to the plating station. Its cooks fill a ready-made layout with today’s details, so every page looks tidy.',
          bn: 'শেফ বিবরণগুলো সাজানোর টেবিলে দেয়। সেখানকার রাঁধুনিরা তৈরি ছকে আজকের বিবরণ বসিয়ে দেয়, তাই প্রতিটি পাতা গোছানো দেখায়।'
        },
        story: {
          title: { en: 'Tareq sends it to be plated', bn: 'তারেক সাজাতে পাঠায়' },
          text: {
            en: 'Tareq passes the details to the plating station. There, the cooks fill a ready-made layout with today’s details, so every customer’s page looks the same and tidy.',
            bn: 'তারেক বিবরণগুলো সাজানোর টেবিলে দেয়। সেখানে রাঁধুনিরা তৈরি ছকে আজকের বিবরণ বসায়, তাই প্রতিটি কাস্টমারের পাতা একই রকম আর গোছানো দেখায়।'
          }
        },
        tech: {
          en: '`render()` combines the template with the context dictionary and returns an `HttpResponse` holding the rendered text. Variables are HTML-escaped by default. An unevaluated `QuerySet` in the context would run its query in a `{% for %}` loop here.',
          bn: '`render()` template-কে context dictionary-র সাথে মিলিয়ে rendered text-সহ একটা `HttpResponse` ফেরত দেয়। ডিফল্টে variable-গুলো HTML-escape হয়। context-এ evaluate না হওয়া `QuerySet` থাকলে এখানে `{% for %}` loop-ই তার query চালাত।'
        }
      },
      {
        id: 'html',
        moves: [ { edge: 'template-view', label: 'HTML', plain: { en: 'The page', bn: 'পাতাটা' } } ],
        title: { en: 'The finished page comes back', bn: 'তৈরি পাতা ফিরে আসে' },
        simple: {
          en: 'The plating station hands the finished page back to the chef, who sets it on a tray as the answer.',
          bn: 'সাজানোর টেবিল তৈরি পাতাটা শেফের হাতে ফেরত দেয়, আর শেফ সেটা উত্তর হিসেবে ট্রেতে রাখে।'
        },
        story: {
          title: { en: 'The finished page returns', bn: 'তৈরি পাতা ফিরে আসে' },
          text: {
            en: 'The plating station hands the finished page back to Tareq. He sets it on a tray with a note that everything went fine. His part is done.',
            bn: 'সাজানোর টেবিল তৈরি পাতাটা তারেকের হাতে ফেরত দেয়। সে সেটা একটা ট্রেতে রাখে, সাথে নোট: সব ঠিকঠাক হয়েছে। তার কাজ শেষ।'
          }
        },
        tech: {
          en: 'The rendered page returns to the view as an `HttpResponse` with status 200. A `TemplateResponse` renders later instead, after `process_template_response` hooks, which run only if the response has a `render()` method.',
          bn: 'render হওয়া পাতা `HttpResponse` হিসেবে, status 200-সহ, view-তে ফেরে। `TemplateResponse` বরং পরে render হয়, `process_template_response` hook-গুলোর পরে, যেগুলো শুধু তখনই চলে যখন response-এ `render()` method থাকে।'
        }
      },
      {
        id: 'back-out',
        moves: [
          { edge: 'view-csrf', label: 'HttpResponse', plain: { en: 'The dish', bn: 'খাবার' } },
          { edge: 'csrf-session', label: 'HttpResponse', plain: { en: 'The dish', bn: 'খাবার' } }
        ],
        title: { en: 'The tray goes back in reverse', bn: 'ট্রে উল্টো পথে ফেরে' },
        simple: {
          en: 'The tray goes back out through the front-desk team in the opposite order: the pass checker first, then the security desk.',
          bn: 'ট্রে সামনের দলের ভেতর দিয়ে উল্টো ক্রমে ফিরে যায়: আগে পাস পরীক্ষক, তারপর সিকিউরিটি ডেস্ক।'
        },
        story: {
          title: { en: 'The tray goes back in reverse', bn: 'ট্রে উল্টো ক্রমে ফেরে' },
          text: {
            en: 'The tray goes back the way it came, but in the opposite order. Parvez sees it first and can hand out a stamp for the next form. Then the security desk notes any change to the visit.',
            bn: 'ট্রে যে পথে এসেছিল সেই পথেই ফেরে, কিন্তু উল্টো ক্রমে। পারভেজ আগে দেখে আর পরের ফর্মের জন্য একটা সিল দিতে পারে। তারপর সিকিউরিটি ডেস্ক ভিজিটে যা বদলেছে তা নোট করে।'
          }
        },
        tech: {
          en: 'The response passes back through the layers in reverse `MIDDLEWARE` order. `CsrfViewMiddleware` sets the CSRF cookie if one is needed, and `SessionMiddleware` saves the session if it changed and sets its cookie.',
          bn: 'response স্তরগুলোর ভেতর দিয়ে `MIDDLEWARE`-এর উল্টো ক্রমে ফেরে। দরকার হলে `CsrfViewMiddleware` CSRF cookie বসায়, আর `SessionMiddleware` session বদলে থাকলে সেটা save করে ও নিজের cookie বসায়।'
        }
      },
      {
        id: 'delivered',
        moves: [
          { edge: 'session-wsgi', label: '200 OK', plain: { en: 'The dish', bn: 'খাবার' } },
          { edge: 'wsgi-client', label: '200 OK', plain: { en: 'The dish', bn: 'খাবার' } }
        ],
        title: { en: 'The customer gets the page', bn: 'কাস্টমার পাতাটা পায়' },
        simple: {
          en: 'The host at the door carries the tray to the customer, who reads the confirmed order.',
          bn: 'দরজার হোস্ট ট্রেটা কাস্টমারকে দেয়, আর সে নিশ্চিত হওয়া অর্ডারটা পড়ে।'
        },
        story: {
          title: { en: 'Sadia gets her page', bn: 'সাদিয়া তার পাতা পায়' },
          text: {
            en: 'The host at the door carries the tray to Sadia, and she reads her confirmed order. It took a blink, and every checkpoint did its part.',
            bn: 'দরজার হোস্ট ট্রেটা সাদিয়ার কাছে পৌঁছে দেয়, আর সে তার নিশ্চিত হওয়া অর্ডার পড়ে। এক পলকে সব শেষ, আর প্রতিটি চেকপয়েন্ট নিজের কাজটা করেছে।'
          }
        },
        tech: {
          en: '`WSGIHandler` calls `start_response` with the status line and headers, then returns the body to the WSGI server, which sends it to the browser. Under ASGI, `ASGIHandler` does this job.',
          bn: '`WSGIHandler` status line আর header দিয়ে `start_response` ডাকে, তারপর body WSGI server-কে ফেরত দেয়, আর সে সেটা ব্রাউজারে পাঠায়। ASGI-তে এই কাজটা করে `ASGIHandler`।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'csrf-fail',
      label: { en: 'The form has no pass', bn: 'ফর্মে পাস নেই' },
      whatIf: { en: 'What if the form has no pass stamp?', bn: 'ফর্মে যদি পাসের সিল না থাকে?' },
      branchAfter: 'resolve',
      steps: [
        {
          id: 'no-stamp',
          moves: [ { edge: 'urls-csrf', label: 'process_view', plain: { en: 'Show the stamp', bn: 'সিল দেখানো' } } ],
          title: { en: 'The form goes to the pass checker', bn: 'ফর্ম পাস পরীক্ষকের কাছে যায়' },
          simple: {
            en: 'This time the form was never made on the restaurant’s page, so it has no pass stamp. The seating host still hands it to the pass checker.',
            bn: 'এবার ফর্মটা রেস্টুরেন্টের পাতায় বানানোই হয়নি, তাই তাতে পাসের সিল নেই। তবুও সিট দেখানো হোস্ট সেটা পাস পরীক্ষকের হাতে দেয়।'
          },
          story: {
            title: { en: 'A form with no stamp', bn: 'সিল ছাড়া একটা ফর্ম' },
            text: {
              en: 'One day a stranger’s flyer secretly fills in an order form and sends it with Sadia’s card. The seating host passes it to Parvez as usual, but this form was never made on the restaurant’s page.',
              bn: 'একদিন এক অচেনা লোকের ফ্লায়ার লুকিয়ে একটা অর্ডার ফর্ম ভরে সাদিয়ার কার্ডসহ পাঠিয়ে দেয়। সিট দেখানো হোস্ট যথারীতি সেটা পারভেজকে দেয়, কিন্তু ফর্মটা রেস্টুরেন্টের পাতায় বানানোই হয়নি।'
            }
          },
          tech: {
            en: '`process_view` runs as usual. It lets safe methods through, checks `Origin` (or `Referer` on HTTPS), then compares the form’s `csrfmiddlewaretoken` with the secret.',
            bn: '`process_view` যথারীতি চলে। সে safe method-গুলো ছেড়ে দেয়, `Origin` (বা HTTPS-এ `Referer`) দেখে, তারপর ফর্মের `csrfmiddlewaretoken`-কে secret-এর সাথে মেলায়।'
          }
        },
        {
          id: 'stamp-missing',
          work: { node: 'csrf', kind: 'error' },
          state: { csrf: { en: 'Token missing', bn: 'token নেই' } },
          plainState: { csrf: { en: 'No pass stamp', bn: 'পাসের সিল নেই' } },
          title: { en: 'There is no pass stamp', bn: 'পাসের সিল নেই' },
          simple: {
            en: 'The pass checker looks for the pass stamp and finds none. Anyone could have made this form, so it is stopped here, before the chef ever sees it.',
            bn: 'পাস পরীক্ষক পাসের সিল খোঁজে, কিন্তু পায় না। যে কেউ এই ফর্ম বানাতে পারত, তাই শেফ কখনো দেখার আগেই এটা এখানেই থামে।'
          },
          story: {
            title: { en: 'Parvez finds no stamp', bn: 'পারভেজ সিল পায় না' },
            text: {
              en: 'Parvez holds the form up and looks for the restaurant’s stamp. There is none, so anybody could have made it. He stops it right here, and Tareq never hears about it.',
              bn: 'পারভেজ ফর্মটা তুলে ধরে রেস্টুরেন্টের সিল খোঁজে। সিল নেই, তাই যে কেউ এটা বানাতে পারত। সে ঠিক এখানেই এটা থামিয়ে দেয়, আর তারেক কিছুই জানতে পারে না।'
            }
          },
          tech: {
            en: 'The token is missing or wrong, so `CsrfViewMiddleware` calls the failure view, `django.views.csrf.csrf_failure` by default. The check fails before the view runs, and a warning goes to the `django.security.csrf` logger.',
            bn: 'token নেই বা ভুল, তাই `CsrfViewMiddleware` failure view ডাকে, ডিফল্টে `django.views.csrf.csrf_failure`। view চলার আগেই check ব্যর্থ হয়, আর `django.security.csrf` logger-এ একটা warning যায়।'
          }
        },
        {
          id: 'forbidden',
          moves: [
            { edge: 'csrf-session-err', label: '403 Forbidden', plain: { en: 'Not allowed', bn: 'অনুমতি নেই' } },
            { edge: 'session-wsgi-err', label: '403 Forbidden', plain: { en: 'Not allowed', bn: 'অনুমতি নেই' } },
            { edge: 'wsgi-client-err', label: '403 Forbidden', plain: { en: 'Not allowed', bn: 'অনুমতি নেই' } }
          ],
          title: { en: 'A firm no goes back out', bn: 'একটা পরিষ্কার না ফিরে যায়' },
          simple: {
            en: 'The pass checker sends back a firm no. It goes out past the security desk and the host at the door to the customer. The chef never knew.',
            bn: 'পাস পরীক্ষক একটা পরিষ্কার না ফেরত পাঠায়। সেটা সিকিউরিটি ডেস্ক আর দরজার হোস্টের পাশ দিয়ে কাস্টমারের কাছে যায়। শেফ কিছুই জানেনি।'
          },
          story: {
            title: { en: 'Parvez sends back a firm no', bn: 'পারভেজ পরিষ্কার না বলে দেয়' },
            text: {
              en: 'Parvez writes a firm no and sends it back out past the security desk and the host. Sadia gets a note that the form was refused, and nothing was cooked.',
              bn: 'পারভেজ একটা পরিষ্কার না লিখে সিকিউরিটি ডেস্ক আর হোস্টের পাশ দিয়ে ফেরত পাঠায়। সাদিয়া নোট পায় যে ফর্মটা ফিরিয়ে দেওয়া হয়েছে, আর কিছুই রান্না হয়নি।'
            }
          },
          tech: {
            en: '`csrf_failure` returns an `HttpResponseForbidden`, status 403, rendering `403_csrf.html` if that template exists. The response still passes back through the layers. Fix it with `{% csrf_token %}` in the form, or an `X-CSRFToken` header for AJAX.',
            bn: '`csrf_failure` একটা `HttpResponseForbidden` ফেরত দেয়, status 403, আর `403_csrf.html` template থাকলে সেটা render করে। response তবুও স্তরগুলোর ভেতর দিয়ে ফেরে। ঠিক করুন ফর্মে `{% csrf_token %}` দিয়ে, বা AJAX-এর জন্য `X-CSRFToken` header দিয়ে।'
          }
        }
      ]
    },
    {
      id: 'no-route',
      label: { en: 'No such page', bn: 'এমন কোনো পাতা নেই' },
      whatIf: {
        en: 'What if the customer asks for a page that does not exist?',
        bn: 'কাস্টমার যদি এমন একটা পাতা চায় যা নেই?'
      },
      branchAfter: 'middleware-in',
      steps: [
        {
          id: 'typo',
          moves: [ { edge: 'csrf-urls', label: '/oders/', plain: { en: 'Wrong address', bn: 'ভুল ঠিকানা' } } ],
          title: { en: 'The address is not on the list', bn: 'ঠিকানাটা তালিকায় নেই' },
          simple: {
            en: 'This time the form asks for a page the restaurant does not have. The seating host goes down the list, line by line, looking for it.',
            bn: 'এবার ফর্মটা এমন একটা পাতা চায় যা রেস্টুরেন্টে নেই। সিট দেখানো হোস্ট তালিকায় এক এক লাইন করে নেমে সেটা খোঁজে।'
          },
          story: {
            title: { en: 'Sadia asks for a missing page', bn: 'সাদিয়া এমন পাতা চায় যা নেই' },
            text: {
              en: 'Another day Sadia mistypes the address and asks for a page the restaurant does not have. The seating host runs a finger down the list, line by line.',
              bn: 'আরেকদিন সাদিয়া ঠিকানা ভুল লিখে এমন একটা পাতা চায় যা রেস্টুরেন্টে নেই। সিট দেখানো হোস্ট আঙুল বুলিয়ে তালিকায় এক এক লাইন করে নামে।'
            }
          },
          tech: {
            en: 'The browser asks for `/oders/`. The resolver compares `path_info` with each `urlpatterns` entry in order, ignoring the domain and query string, and none of them fits.',
            bn: 'ব্রাউজার `/oders/` চায়। resolver `path_info`-কে প্রতিটি `urlpatterns` entry-র সাথে ক্রমানুসারে মেলায়, domain আর query string বাদ দিয়ে, আর একটাও মেলে না।'
          }
        },
        {
          id: 'no-match',
          work: { node: 'urls', kind: 'error' },
          state: { urls: { en: 'No match', bn: 'মিল নেই' } },
          plainState: { urls: { en: 'No such table', bn: 'এমন কিছু নেই' } },
          title: { en: 'The seating host finds nothing', bn: 'সিট দেখানো হোস্ট কিছুই পায় না' },
          simple: {
            en: 'The seating host reaches the end of the list and nothing fits. There is no chef for this page, so the order cannot go any further.',
            bn: 'সিট দেখানো হোস্ট তালিকার শেষে পৌঁছায়, কিন্তু কিছুই মেলে না। এই পাতার জন্য কোনো শেফ নেই, তাই অর্ডার আর এগোতে পারে না।'
          },
          story: {
            title: { en: 'Nothing on the list fits', bn: 'তালিকায় কিছুই মেলে না' },
            text: {
              en: 'The seating host reaches the end of the list. No line fits, so there is no chef for this page. Parvez never gets to check the form, and Tareq never hears about it.',
              bn: 'সিট দেখানো হোস্ট তালিকার শেষে পৌঁছায়। কোনো লাইন মেলে না, তাই এই পাতার জন্য কোনো শেফ নেই। পারভেজ ফর্মটা যাচাই করার সুযোগই পায় না, আর তারেক কিছুই জানতে পারে না।'
            }
          },
          tech: {
            en: 'No pattern matches, so the resolver raises `Resolver404`, a subclass of `Http404`. This happens before `process_view` and the view, so `process_exception` is not involved. The outer wrapper turns the exception into a 404 response.',
            bn: 'কোনো pattern মেলে না, তাই resolver `Http404`-এর subclass `Resolver404` তোলে। এটা `process_view` আর view-এর আগেই ঘটে, তাই `process_exception` এতে জড়ায় না। বাইরের wrapper exception-টাকে 404 response বানিয়ে দেয়।'
          }
        },
        {
          id: '404-out',
          moves: [
            { edge: 'urls-csrf-err', label: '404 Not Found', plain: { en: 'No such page', bn: 'এমন পাতা নেই' } },
            { edge: 'csrf-session-err', label: '404 Not Found', plain: { en: 'No such page', bn: 'এমন পাতা নেই' } }
          ],
          title: { en: 'A polite note is written', bn: 'ভদ্র একটা নোট লেখা হয়' },
          simple: {
            en: 'The seating host writes a polite note: there is no such page. The note goes back out through the front-desk team, in reverse.',
            bn: 'সিট দেখানো হোস্ট ভদ্র একটা নোট লেখে: এমন কোনো পাতা নেই। নোটটা সামনের দলের ভেতর দিয়ে উল্টো ক্রমে ফিরে যায়।'
          },
          story: {
            title: { en: 'A polite note is written', bn: 'ভদ্র একটা নোট লেখা হয়' },
            text: {
              en: 'The seating host writes a polite note: there is no such page here. It goes back out through the front-desk team in reverse, past Parvez and the security desk.',
              bn: 'সিট দেখানো হোস্ট ভদ্র একটা নোট লেখে: এখানে এমন কোনো পাতা নেই। নোটটা সামনের দলের ভেতর দিয়ে উল্টো ক্রমে, পারভেজ আর সিকিউরিটি ডেস্ক পেরিয়ে ফিরে যায়।'
            }
          },
          tech: {
            en: 'The 404 view, `page_not_found` by default (`handler404`), renders `404.html` when `DEBUG` is `False`. The 404 response then travels back through the middleware like any normal response.',
            bn: '404 view, ডিফল্টে `page_not_found` (`handler404`), `DEBUG` `False` হলে `404.html` render করে। 404 response তারপর অন্য যেকোনো স্বাভাবিক response-এর মতোই middleware-এর ভেতর দিয়ে ফেরে।'
          }
        },
        {
          id: '404-delivered',
          moves: [
            { edge: 'session-wsgi-err', label: '404 Not Found', plain: { en: 'No such page', bn: 'এমন পাতা নেই' } },
            { edge: 'wsgi-client-err', label: '404 Not Found', plain: { en: 'No such page', bn: 'এমন পাতা নেই' } }
          ],
          title: { en: 'The customer reads the note', bn: 'কাস্টমার নোটটা পড়ে' },
          simple: {
            en: 'The host at the door hands over the note: no such page. Nothing was cooked, so nothing changed, and the customer can try again.',
            bn: 'দরজার হোস্ট নোটটা দেয়: এমন কোনো পাতা নেই। কিছু রান্না হয়নি, তাই কিছুই বদলায়নি, আর কাস্টমার আবার চেষ্টা করতে পারে।'
          },
          story: {
            title: { en: 'Sadia reads the note', bn: 'সাদিয়া নোটটা পড়ে' },
            text: {
              en: 'The host at the door gives Sadia the note. She laughs at her typo and tries again. Nothing was cooked, so nothing needs throwing away.',
              bn: 'দরজার হোস্ট সাদিয়াকে নোটটা দেয়। সে নিজের ভুলে হেসে ফেলে আর আবার চেষ্টা করে। কিছু রান্না হয়নি, তাই ফেলে দেওয়ার মতোও কিছু নেই।'
            }
          },
          tech: {
            en: 'The client receives `404 Not Found`. With `DEBUG` on, Django shows a debug page with the URLconf instead of `404.html`. `APPEND_SLASH` may redirect a slash-less URL instead, and that redirect can lose POST data.',
            bn: 'client `404 Not Found` পায়। `DEBUG` চালু থাকলে Django `404.html`-এর বদলে URLconf-সহ একটা debug page দেখায়। `APPEND_SLASH` কখনো slash ছাড়া URL-কে আগেই redirect করতে পারে, আর সেই redirect-এ POST data হারাতে পারে।'
          }
        }
      ]
    },
    {
      id: 'view-crash',
      label: { en: 'The chef drops the dish', bn: 'শেফ খাবার ফেলে দেয়' },
      whatIf: { en: 'What if the chef drops the dish halfway?', bn: 'রান্নার মাঝপথে শেফ যদি খাবার ফেলে দেয়?' },
      branchAfter: 'to-view',
      steps: [
        {
          id: 'crash',
          work: { node: 'view', kind: 'error' },
          state: { view: { en: 'Exception raised', bn: 'exception উঠেছে' } },
          plainState: { view: { en: 'Dropped the dish', bn: 'খাবার পড়ে গেছে' } },
          title: { en: 'The chef drops the dish', bn: 'শেফ খাবার ফেলে দেয়' },
          simple: {
            en: 'A slip in the chef’s own instructions makes the dish fall halfway. The front-desk team is asked, one by one, if anyone can rescue it. Nobody can.',
            bn: 'শেফের নিজের নির্দেশে একটা ভুলের জন্য খাবার মাঝপথে পড়ে যায়। সামনের দলকে একে একে জিজ্ঞেস করা হয় কেউ সামলাতে পারে কি না। কেউ পারে না।'
          },
          story: {
            title: { en: 'Tareq drops the dish', bn: 'তারেক খাবার ফেলে দেয়' },
            text: {
              en: 'One day Tareq slips and drops the dish halfway through cooking. The front-desk team is asked, one by one, whether anyone can rescue it. None of them has a fix.',
              bn: 'একদিন রান্নার মাঝপথে তারেকের পা পিছলে খাবার পড়ে যায়। সামনের দলকে একে একে জিজ্ঞেস করা হয় কেউ সামলাতে পারে কি না। কারও কাছেই সমাধান নেই।'
            }
          },
          tech: {
            en: 'The view raises an uncaught exception, say a `KeyError`. Django offers it to each middleware’s `process_exception`, bottom-up. If none returns a response, the exception goes on to the default handling.',
            bn: 'view একটা uncaught exception তোলে, ধরুন `KeyError`। Django সেটা প্রতিটি middleware-এর `process_exception`-কে দেয়, নিচ থেকে ওপরে। কেউ response না দিলে exception ডিফল্ট handling-এ যায়।'
          }
        },
        {
          id: 'sorry-page',
          moves: [
            { edge: 'view-csrf-err', label: '500 Server Error', plain: { en: 'Sorry, a mishap', bn: 'দুঃখিত, গোলমাল' } },
            { edge: 'csrf-session-err', label: '500 Server Error', plain: { en: 'Sorry, a mishap', bn: 'দুঃখিত, গোলমাল' } }
          ],
          title: { en: 'A sorry note is written', bn: 'দুঃখপ্রকাশের নোট লেখা হয়' },
          simple: {
            en: 'With no rescue, the restaurant prints its standard sorry note. The note goes back out through the front-desk team like any other reply.',
            bn: 'কেউ সামলাতে না পারায় রেস্টুরেন্ট তার সাধারণ দুঃখপ্রকাশের নোট ছাপে। নোটটা অন্য যেকোনো উত্তরের মতোই সামনের দলের ভেতর দিয়ে ফেরে।'
          },
          story: {
            title: { en: 'A sorry note is written', bn: 'দুঃখপ্রকাশের নোট লেখা হয়' },
            text: {
              en: 'With no rescue, the restaurant prints its standard sorry note. It travels back out through Parvez and the security desk just like any other reply.',
              bn: 'কেউ সামলাতে না পারায় রেস্টুরেন্ট তার সাধারণ দুঃখপ্রকাশের নোট ছাপে। অন্য যেকোনো উত্তরের মতোই সেটা পারভেজ আর সিকিউরিটি ডেস্কের ভেতর দিয়ে ফেরে।'
            }
          },
          tech: {
            en: 'Django logs the 500 on `django.request` at ERROR level, and `handler500` (`server_error`) renders `500.html` with an empty context. With `DEBUG` on you get a traceback page instead.',
            bn: 'Django 500-কে `django.request`-এ ERROR level-এ log করে, আর `handler500` (`server_error`) খালি context দিয়ে `500.html` render করে। `DEBUG` চালু থাকলে তার বদলে traceback page আসে।'
          }
        },
        {
          id: '500-delivered',
          moves: [
            { edge: 'session-wsgi-err', label: '500 Server Error', plain: { en: 'Sorry, a mishap', bn: 'দুঃখিত, গোলমাল' } },
            { edge: 'wsgi-client-err', label: '500 Server Error', plain: { en: 'Sorry, a mishap', bn: 'দুঃখিত, গোলমাল' } }
          ],
          title: { en: 'The customer gets a sorry note', bn: 'কাস্টমার দুঃখপ্রকাশের নোট পায়' },
          simple: {
            en: 'The customer gets only a plain sorry note. The front-desk team still did its usual work on the way out, and the real cause stays in the kitchen’s logbook.',
            bn: 'কাস্টমার শুধু একটা সাদামাটা দুঃখপ্রকাশের নোট পায়। বেরোনোর পথে সামনের দল তবুও নিজের নিয়মিত কাজ করে, আর আসল কারণ থাকে রান্নাঘরের লগবইয়ে।'
          },
          story: {
            title: { en: 'Sadia gets a sorry note', bn: 'সাদিয়া দুঃখপ্রকাশের নোট পায়' },
            text: {
              en: 'The host hands Sadia the sorry note. She sighs and waits while Tareq cleans up. The kitchen’s logbook records what happened, so the owners can find the cause.',
              bn: 'হোস্ট সাদিয়াকে দুঃখপ্রকাশের নোটটা দেয়। তারেক যখন পরিষ্কার করে, সাদিয়া দীর্ঘশ্বাস ফেলে অপেক্ষা করে। রান্নাঘরের লগবইয়ে সব লেখা থাকে, তাই মালিকরা কারণ খুঁজে পেতে পারে।'
            }
          },
          tech: {
            en: 'Every middleware still gets a response back, because Django converts exceptions between layers, so response-phase code runs on a 500 too. The client sees status 500, and the traceback is in your logs.',
            bn: 'প্রতিটি middleware তবুও একটা response ফেরত পায়, কারণ Django স্তরগুলোর মাঝে exception-কে response বানায়, তাই 500-এও response-phase-এর কোড চলে। client status 500 দেখে, আর traceback থাকে আপনার log-এ।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A busy restaurant works the same way. Every stop has a twin there.',
      bn: 'একটা ব্যস্ত রেস্টুরেন্টও ঠিক এভাবেই চলে। প্রতিটি স্টপের একটা জোড়া আছে সেখানে।'
    },
    twins: [
      {
        icon: 'user',
        node: 'client',
        name: { en: 'The customer', bn: 'কাস্টমার' },
        d: {
          en: 'Fills in the form and waits for the dish.',
          bn: 'ফর্ম ভরে দেয় আর খাবারের অপেক্ষা করে।'
        }
      },
      {
        icon: 'server',
        node: 'wsgi',
        name: { en: 'The host at the door', bn: 'দরজার হোস্ট' },
        d: {
          en: 'Takes the form, tidies it into a slip, and later carries the tray back.',
          bn: 'ফর্মটা নেয়, গুছিয়ে একটা স্লিপ বানায়, আর পরে ট্রে ফিরিয়ে আনে।'
        }
      },
      {
        icon: 'shield',
        node: 'session',
        name: { en: 'The security desk', bn: 'সিকিউরিটি ডেস্ক' },
        d: {
          en: 'Knows the customer, and looks up the member card only when someone asks.',
          bn: 'কাস্টমারকে চেনে, আর কার্ড খোঁজে কেবল কেউ চাইলে।'
        }
      },
      {
        icon: 'lock',
        node: 'csrf',
        name: { en: 'The pass checker', bn: 'পাস পরীক্ষক' },
        d: {
          en: 'Looks for the restaurant’s own stamp on the form before the chef sees it.',
          bn: 'শেফ দেখার আগে ফর্মে রেস্টুরেন্টের নিজের সিল আছে কি না দেখে।'
        }
      },
      {
        icon: 'route',
        node: 'urls',
        name: { en: 'The seating host', bn: 'সিট দেখানো হোস্ট' },
        d: {
          en: 'Reads the address and sends the order to the right chef.',
          bn: 'ঠিকানা পড়ে অর্ডার সঠিক শেফের কাছে পাঠায়।'
        }
      },
      {
        icon: 'code',
        node: 'view',
        name: { en: 'The chef', bn: 'শেফ' },
        d: {
          en: 'Does the real work: cooks, and decides what the answer is.',
          bn: 'আসল কাজটা করে: রান্না করে আর উত্তর কী হবে ঠিক করে।'
        }
      },
      {
        icon: 'store',
        node: 'db',
        name: { en: 'The pantry', bn: 'ভাঁড়ার' },
        d: {
          en: 'Keeps every ingredient and hands over only what is asked for.',
          bn: 'সব উপকরণ রাখে, আর যা চাওয়া হয় শুধু তা-ই তুলে দেয়।'
        }
      },
      {
        icon: 'folder',
        node: 'template',
        name: { en: 'The plating station', bn: 'সাজানোর টেবিল' },
        d: {
          en: 'Fills a ready-made layout with today’s details to make the finished page.',
          bn: 'তৈরি ছকে আজকের বিবরণ বসিয়ে তৈরি পাতাটা বানায়।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'A turned-away order', bn: 'ফিরিয়ে দেওয়া অর্ডার' },
        is: { en: 'is a 403, 404 or 500 error', bn: 'মানে 403, 404 বা 500 error' },
        d: {
          en: 'Sometimes the form is stopped at the desk, sometimes no page fits, and sometimes the chef drops the dish. Each time the customer gets a short note instead.',
          bn: 'কখনো ডেস্কেই ফর্ম আটকে যায়, কখনো মেলার মতো পাতা থাকে না, কখনো শেফ খাবার ফেলে দেয়। প্রতিবার কাস্টমার খাবারের বদলে ছোট একটা নোট পায়।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'What happens between the server and your view?',
        bn: 'server আর আপনার view-এর মাঝে কী ঘটে?'
      },
      short: {
        en: 'The server builds an `HttpRequest`, middleware wraps it, the URL resolver picks a view, and the view returns an `HttpResponse` that travels back out.',
        bn: 'server একটা `HttpRequest` বানায়, middleware সেটাকে ঘিরে রাখে, URL resolver একটা view বেছে নেয়, আর view একটা `HttpResponse` ফেরত দেয় যা উল্টো পথে বেরিয়ে যায়।'
      },
      deep: {
        en: 'A WSGI server calls the `application` callable, which is a `WSGIHandler` that builds a `WSGIRequest`. Middleware runs top-down, then Django resolves the URL, calls each `process_view`, and runs the view. The response returns through the same layers in reverse, and `WSGIHandler` passes it to `start_response`.',
        bn: 'WSGI server `application` callable ডাকে, যেটা আসলে একটা `WSGIHandler` আর সে একটা `WSGIRequest` বানায়। middleware ওপর থেকে নিচে চলে, তারপর Django URL resolve করে, প্রতিটি `process_view` ডাকে, আর view চালায়। response একই স্তরগুলোর ভেতর দিয়ে উল্টো ক্রমে ফেরে, আর `WSGIHandler` সেটা `start_response`-এ দেয়।'
      },
      redFlag: {
        en: '“Middleware only runs after the view”, or forgetting that URL resolution comes before `process_view`.',
        bn: '“middleware শুধু view-এর পরে চলে”, বা ভুলে যাওয়া যে URL resolution `process_view`-এর আগে হয়।'
      }
    },
    {
      q: { en: 'In what order does middleware run?', bn: 'middleware কোন ক্রমে চলে?' },
      short: {
        en: 'Top-down through `MIDDLEWARE` on the way in, and in reverse on the way out.',
        bn: 'ঢোকার পথে `MIDDLEWARE`-এর ওপর থেকে নিচে, আর বেরোনোর পথে উল্টো ক্রমে।'
      },
      deep: {
        en: 'It is an onion: each layer wraps the next. `process_view` also runs top-down, but `process_exception` and `process_template_response` run bottom-up. A layer that returns early skips everything inside it. A new project lists Security, Session, Common, Csrf, Authentication, Messages and XFrameOptions.',
        bn: 'এটা একটা পেঁয়াজের মতো: প্রতিটি স্তর পরেরটাকে ঘিরে থাকে। `process_view`-ও ওপর থেকে নিচে চলে, কিন্তু `process_exception` আর `process_template_response` চলে নিচ থেকে ওপরে। যে স্তর আগেই response ফেরত দেয়, তার ভেতরের সবকিছু বাদ পড়ে। নতুন প্রজেক্টে ক্রম Security, Session, Common, Csrf, Authentication, Messages, XFrameOptions।'
      },
      redFlag: {
        en: '“Every hook runs in the order I listed it”, or putting `AuthenticationMiddleware` before `SessionMiddleware`.',
        bn: '“সব hook আমার লেখা ক্রমেই চলে”, বা `AuthenticationMiddleware`-কে `SessionMiddleware`-এর আগে বসানো।'
      }
    },
    {
      q: {
        en: 'Why does the CSRF check run in `process_view`?',
        bn: 'CSRF check `process_view`-এ চলে কেন?'
      },
      short: {
        en: 'It runs after URL resolution, so it can see whether the matched view is `csrf_exempt`, and before the view does anything.',
        bn: 'এটা URL resolution-এর পরে চলে, যাতে মিলে যাওয়া view `csrf_exempt` কি না দেখতে পারে, আর view কিছু করার আগেই চলে।'
      },
      deep: {
        en: 'GET, HEAD, OPTIONS and TRACE are not checked. A POST needs a `csrfmiddlewaretoken` form field (from `{% csrf_token %}`) or an `X-CSRFToken` header. It also checks `Origin`, or `Referer` on HTTPS when `Origin` is missing, and `CSRF_TRUSTED_ORIGINS` lists extra allowed origins. Failure returns 403, and the test client skips the check unless `enforce_csrf_checks=True`.',
        bn: 'GET, HEAD, OPTIONS আর TRACE যাচাই হয় না। POST-এ `csrfmiddlewaretoken` form field (`{% csrf_token %}` থেকে) বা `X-CSRFToken` header লাগে। সে `Origin`-ও দেখে, আর `Origin` না থাকলে HTTPS-এ `Referer`, আর `CSRF_TRUSTED_ORIGINS` বাড়তি অনুমোদিত origin যোগ করে। ব্যর্থ হলে 403 আসে, আর test client `enforce_csrf_checks=True` না দিলে check বাদ দেয়।'
      },
      redFlag: {
        en: '“Add `@csrf_exempt` to make the 403 go away.”',
        bn: '“403 সরাতে `@csrf_exempt` বসিয়ে দিন।”'
      }
    },
    {
      q: { en: 'When does a QuerySet hit the database?', bn: 'QuerySet কখন database-এ যায়?' },
      short: {
        en: 'Not when you build it. Only when something evaluates it: iterating, `list()`, `len()`, `bool()`, slicing with a step, or pickling.',
        bn: 'বানানোর সময় নয়। শুধু যখন কিছু সেটাকে evaluate করে: iteration, `list()`, `len()`, `bool()`, step দিয়ে slicing বা pickling।'
      },
      deep: {
        en: 'Each `filter()` returns a new lazy `QuerySet`. Once evaluated, a `QuerySet` caches its rows, so reuse the variable instead of calling `Dish.objects.all()` again. Prefer `exists()` and `count()` over `bool()` and `len()`, and `select_related` or `prefetch_related` to fetch related rows up front instead of one query per row.',
        bn: 'প্রতিটি `filter()` একটা নতুন lazy `QuerySet` ফেরত দেয়। evaluate হলে `QuerySet` তার row cache করে রাখে, তাই আবার `Dish.objects.all()` না ডেকে variable-টাই ব্যবহার করুন। `bool()` আর `len()`-এর বদলে `exists()` ও `count()` নিন, আর প্রতি row-তে একটা করে query না চালিয়ে সম্পর্কিত row আগেই আনতে `select_related` বা `prefetch_related` নিন।'
      },
      redFlag: {
        en: '“`filter()` runs the query”, or “calling `Dish.objects.all()` twice is free”.',
        bn: '“`filter()`-ই query চালায়”, বা “`Dish.objects.all()` দুবার ডাকা বিনা খরচে”।'
      }
    },
    {
      q: { en: 'How does `request.user` get set?', bn: '`request.user` কীভাবে বসে?' },
      short: {
        en: '`AuthenticationMiddleware` sets it as a lazy object that reads the session only when you first use it.',
        bn: '`AuthenticationMiddleware` সেটা একটা lazy object হিসেবে বসায়, যে প্রথম ব্যবহারেই session পড়ে।'
      },
      deep: {
        en: 'It needs `SessionMiddleware` listed before it, or Django raises an error. `request.user` is a `SimpleLazyObject` that calls `get_user(request)` on first access and caches the result. A visitor who is not logged in gets `AnonymousUser`. In async views use `await request.auser()`.',
        bn: 'এর আগে `SessionMiddleware` লিস্টে থাকা লাগে, নইলে Django error তোলে। `request.user` একটা `SimpleLazyObject`, যে প্রথম access-এ `get_user(request)` ডাকে আর ফলাফল cache করে। লগইন না করা ভিজিটর `AnonymousUser` পায়। async view-তে `await request.auser()` ব্যবহার করুন।'
      },
      redFlag: {
        en: '“`request.user` is always loaded before the view runs”, or listing the auth middleware without sessions.',
        bn: '“view চলার আগেই `request.user` সবসময় লোড হয়ে থাকে”, বা sessions ছাড়াই auth middleware বসানো।'
      }
    },
    {
      q: {
        en: 'What is the difference between WSGI and ASGI in Django?',
        bn: 'Django-তে WSGI আর ASGI-র পার্থক্য কী?'
      },
      short: {
        en: '`startproject` creates both `wsgi.py` and `asgi.py`, each exposing an `application` callable. WSGI servers call the first, ASGI servers the second.',
        bn: '`startproject` `wsgi.py` আর `asgi.py` দুটোই বানায়, দুটোতেই একটা `application` callable থাকে। WSGI server প্রথমটা ডাকে, ASGI server দ্বিতীয়টা।'
      },
      deep: {
        en: 'WSGI servers such as Gunicorn, uWSGI and Granian call `WSGIHandler`, and ASGI servers such as Daphne, Hypercorn, Uvicorn and Granian call `ASGIHandler`. Both build the `HttpRequest`, load the same `MIDDLEWARE` and return a response. Django’s default ASGI handler runs your code in a synchronous thread.',
        bn: 'Gunicorn, uWSGI আর Granian-এর মতো WSGI server `WSGIHandler` ডাকে, আর Daphne, Hypercorn, Uvicorn ও Granian-এর মতো ASGI server `ASGIHandler` ডাকে। দুটোই `HttpRequest` বানায়, একই `MIDDLEWARE` লোড করে আর response ফেরত দেয়। Django-র ডিফল্ট ASGI handler আপনার কোড একটা synchronous thread-এ চালায়।'
      },
      redFlag: {
        en: '“`runserver` is fine for production.”',
        bn: '“production-এর জন্য `runserver`-ই যথেষ্ট।”'
      }
    },
    {
      q: {
        en: 'How do 403, 404 and 500 pages come about?',
        bn: '403, 404 আর 500 পেজ কীভাবে আসে?'
      },
      short: {
        en: 'Django turns exceptions into responses: `PermissionDenied` gives 403, `Http404` (including `Resolver404`) gives 404, and any other uncaught exception gives 500.',
        bn: 'Django exception-কে response বানায়: `PermissionDenied` থেকে 403, `Http404` (`Resolver404`-সহ) থেকে 404, আর অন্য যেকোনো uncaught exception থেকে 500।'
      },
      deep: {
        en: 'Built-in views render `403.html`, `404.html` and `500.html`, and `handler403`, `handler404` and `handler500` replace them. A failed CSRF check has its own view, `CSRF_FAILURE_VIEW`. With `DEBUG` on you get debug pages instead. The `django.request` logger records 5xx as ERROR and 4xx as WARNING.',
        bn: 'built-in view `403.html`, `404.html` আর `500.html` render করে, আর `handler403`, `handler404`, `handler500` সেগুলো বদলে দেয়। CSRF check ব্যর্থ হলে আলাদা view চলে, `CSRF_FAILURE_VIEW`। `DEBUG` চালু থাকলে তার বদলে debug page আসে। `django.request` logger 5xx-কে ERROR আর 4xx-কে WARNING হিসেবে লেখে।'
      },
      redFlag: {
        en: '“Leave `DEBUG=True` in production to see errors.”',
        bn: '“error দেখতে production-এ `DEBUG=True` রেখে দিন।”'
      }
    }
  ],
  cheats: [
    {
      code: 'python manage.py runserver',
      d: {
        en: 'Start the development server on 127.0.0.1:8000. It reloads on code changes. Never use it in production.',
        bn: 'development server চালু করে 127.0.0.1:8000-এ। কোড বদলালে নিজে reload হয়। production-এ কখনো নয়।'
      }
    },
    {
      code: 'gunicorn myproject.wsgi\npython -m uvicorn myproject.asgi:application',
      d: {
        en: 'Serve over WSGI or ASGI. Run from the folder that holds manage.py.',
        bn: 'WSGI বা ASGI দিয়ে চালান। manage.py যে ফোল্ডারে আছে সেখান থেকে চালান।'
      }
    },
    {
      code: 'python manage.py check --deploy',
      d: {
        en: 'Run the extra checks meant for a production deployment.',
        bn: 'production deployment-এর জন্য বাড়তি check চালায়।'
      }
    },
    {
      code: 'def timing(get_response):\n' +
        '    def middleware(request):\n' +
        '        # before the view\n' +
        '        response = get_response(request)\n' +
        '        # after the view\n' +
        '        return response\n' +
        '    return middleware',
      d: {
        en: 'A middleware factory. Code before `get_response` runs on the way in, and code after it on the way out.',
        bn: 'একটা middleware factory। `get_response`-এর আগের কোড ঢোকার পথে চলে, আর পরের কোড বেরোনোর পথে।'
      }
    },
    {
      code: '<form method="post">{% csrf_token %}',
      d: {
        en: 'Every POST form that targets your own site needs the token. For AJAX, send the `X-CSRFToken` header.',
        bn: 'নিজের সাইটে POST করা প্রতিটি ফর্মে token লাগে। AJAX-এ `X-CSRFToken` header পাঠান।'
      }
    },
    {
      code: 'from django.db import connection\nconnection.queries',
      d: {
        en: 'List the SQL run so far, with timings. Only recorded when `DEBUG` is `True`.',
        bn: 'এ পর্যন্ত চলা SQL সময়সহ দেখায়। শুধু `DEBUG` `True` থাকলেই রেকর্ড হয়।'
      }
    },
    {
      code: 'with self.assertNumQueries(1):\n    list(Dish.objects.filter(name="biryani"))',
      d: {
        en: 'Fail a test if the block runs a different number of queries.',
        bn: 'ব্লকটা অন্য সংখ্যক query চালালে test ব্যর্থ করে।'
      }
    },
    {
      code: 'handler404 = "mysite.views.my_custom_page_not_found_view"',
      d: {
        en: 'Set in your URLconf to replace the default 404 view. 403, 500 and 400 have matching handlers.',
        bn: 'URLconf-এ বসিয়ে ডিফল্ট 404 view বদলান। 403, 500 আর 400-এরও একই রকম handler আছে।'
      }
    }
  ],
  sources: [
    { label: 'Django: Middleware', url: 'https://docs.djangoproject.com/en/stable/topics/http/middleware/' },
    { label: 'Django: Built-in middleware reference', url: 'https://docs.djangoproject.com/en/stable/ref/middleware/' },
    { label: 'Django: URL dispatcher', url: 'https://docs.djangoproject.com/en/stable/topics/http/urls/' },
    { label: 'Django: Request and response objects', url: 'https://docs.djangoproject.com/en/stable/ref/request-response/' },
    { label: 'Django: Writing views', url: 'https://docs.djangoproject.com/en/stable/topics/http/views/' },
    { label: 'Django: Built-in error views', url: 'https://docs.djangoproject.com/en/stable/ref/views/' },
    { label: 'Django: Shortcut functions (render)', url: 'https://docs.djangoproject.com/en/stable/topics/http/shortcuts/' },
    { label: 'Django: Cross Site Request Forgery protection', url: 'https://docs.djangoproject.com/en/stable/ref/csrf/' },
    { label: 'Django: How to use Django’s CSRF protection', url: 'https://docs.djangoproject.com/en/stable/howto/csrf/' },
    { label: 'Django: QuerySet API reference', url: 'https://docs.djangoproject.com/en/stable/ref/models/querysets/' },
    { label: 'Django: Making queries', url: 'https://docs.djangoproject.com/en/stable/topics/db/queries/' },
    { label: 'Django: The Django template language', url: 'https://docs.djangoproject.com/en/stable/ref/templates/language/' },
    { label: 'Django: TemplateResponse', url: 'https://docs.djangoproject.com/en/stable/ref/template-response/' },
    { label: 'Django: Exceptions', url: 'https://docs.djangoproject.com/en/stable/ref/exceptions/' },
    { label: 'Django: Settings', url: 'https://docs.djangoproject.com/en/stable/ref/settings/' },
    { label: 'Django: Logging reference', url: 'https://docs.djangoproject.com/en/stable/ref/logging/' },
    { label: 'Django: django-admin and manage.py', url: 'https://docs.djangoproject.com/en/stable/ref/django-admin/' },
    { label: 'Django: Deploying with WSGI', url: 'https://docs.djangoproject.com/en/stable/howto/deployment/wsgi/' },
    { label: 'Django: How to use Django with Gunicorn', url: 'https://docs.djangoproject.com/en/stable/howto/deployment/wsgi/gunicorn/' },
    { label: 'Django: Deploying with ASGI', url: 'https://docs.djangoproject.com/en/stable/howto/deployment/asgi/' },
    { label: 'Django: How to use Django with Uvicorn', url: 'https://docs.djangoproject.com/en/stable/howto/deployment/asgi/uvicorn/' },
    { label: 'Django: Testing tools', url: 'https://docs.djangoproject.com/en/stable/topics/testing/tools/' },
    { label: 'Django FAQ: seeing the raw SQL', url: 'https://docs.djangoproject.com/en/stable/faq/models/' },
    { label: 'Django: URL utilities (handler404 and friends)', url: 'https://docs.djangoproject.com/en/stable/ref/urls/' },
    { label: 'Django source: core/wsgi.py', url: 'https://raw.githubusercontent.com/django/django/main/django/core/wsgi.py' },
    { label: 'Django source: core/handlers/base.py', url: 'https://raw.githubusercontent.com/django/django/main/django/core/handlers/base.py' },
    { label: 'Django source: core/handlers/wsgi.py', url: 'https://raw.githubusercontent.com/django/django/main/django/core/handlers/wsgi.py' },
    { label: 'Django source: core/handlers/asgi.py', url: 'https://raw.githubusercontent.com/django/django/main/django/core/handlers/asgi.py' },
    { label: 'Django source: core/handlers/exception.py', url: 'https://raw.githubusercontent.com/django/django/main/django/core/handlers/exception.py' },
    { label: 'Django source: views/csrf.py', url: 'https://raw.githubusercontent.com/django/django/main/django/views/csrf.py' },
    { label: 'Django source: middleware/csrf.py', url: 'https://raw.githubusercontent.com/django/django/main/django/middleware/csrf.py' },
    { label: 'Django source: contrib/auth/middleware.py', url: 'https://raw.githubusercontent.com/django/django/main/django/contrib/auth/middleware.py' },
    { label: 'Django source: contrib/sessions/middleware.py', url: 'https://raw.githubusercontent.com/django/django/main/django/contrib/sessions/middleware.py' },
    { label: 'Django source: project template settings', url: 'https://raw.githubusercontent.com/django/django/main/django/conf/project_template/project_name/settings.py-tpl' }
  ]
}
