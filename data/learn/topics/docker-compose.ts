import type { Topic } from '../types'
import { UI } from '../ui'

export const dockerCompose: Topic = {
  slug: 'docker-compose',
  line: 'devops',
  title: { en: 'Docker Compose', bn: 'Docker Compose' },
  summary: {
    en: 'How one compose file starts a whole stack: a healthy database first, service names as addresses on a shared network, and a named volume that keeps the data.',
    bn: 'একটা compose ফাইল কীভাবে পুরো stack চালু করে: আগে healthy database, shared network-এ service-এর নামই ঠিকানা, আর data ধরে রাখার জন্য একটা named volume।'
  },
  hook: {
    en: 'One call sheet starts a whole crew in the right order, and knowing how the crew finds each other stops most surprises.',
    bn: 'একটা কল শিট পুরো ক্রুকে ঠিক ক্রমে শুরু করায়, আর ক্রুরা একে অপরকে কীভাবে খুঁজে পায় জানলে বেশিরভাগ চমক এড়ানো যায়।'
  },
  story: {
    cast: {
      en: 'Lubna directs a short film, where Fahim runs the lights and Ayesha works the camera.',
      bn: 'লুবনা একটা ছোট ছবি পরিচালনা করে, যেখানে ফাহিম আলো সামলায় আর আয়েশা ক্যামেরা চালায়।'
    }
  },
  takeaway: {
    en: 'Crew names are addresses, and the footage drive survives going home but not a deliberate wipe.',
    bn: 'ক্রুদের নামই তাদের ঠিকানা, আর ফুটেজ ড্রাইভ বাড়ি ফেরা সহ্য করে, কিন্তু ইচ্ছে করে মুছলে আর থাকে না।'
  },
  words: [
    {
      term: { en: 'Call sheet (compose file)', bn: 'কল শিট (compose file)' },
      d: {
        en: 'One page that lists every crew member and the job each one does.',
        bn: 'একটা পাতা, যেখানে লেখা থাকে প্রতিটি ক্রু সদস্য আর তার কাজ।'
      }
    },
    {
      term: { en: 'Crew member (service)', bn: 'ক্রু সদস্য (service)' },
      d: {
        en: 'One part of your app, like the database or the website, running by itself.',
        bn: 'আপনার app-এর একটা অংশ, যেমন database বা ওয়েবসাইট, যা নিজের মতো করে চলে।'
      }
    },
    {
      term: { en: 'Call sign (service name)', bn: 'কল সাইন (service name)' },
      d: {
        en: 'A crew member’s name on the radio. Others use it to reach them.',
        bn: 'রেডিওতে ক্রু সদস্যের নাম। অন্যরা এই নাম দিয়েই তাকে ডাকে।'
      }
    },
    {
      term: { en: 'Ready check (healthcheck)', bn: 'রেডি চেক (healthcheck)' },
      d: {
        en: 'A quick test that shows a crew member is truly ready, not just present.',
        bn: 'ছোট একটা পরীক্ষা, যা দেখায় ক্রু সদস্য সত্যিই তৈরি, শুধু হাজির নয়।'
      }
    },
    {
      term: { en: 'Footage drive (volume)', bn: 'ফুটেজ ড্রাইভ (volume)' },
      d: {
        en: 'A drive kept outside the crew, so recordings survive when the crew goes home.',
        bn: 'ক্রুর বাইরে রাখা একটা ড্রাইভ, তাই ক্রু বাড়ি গেলেও রেকর্ডিং থেকে যায়।'
      }
    },
    {
      term: { en: 'The set (network)', bn: 'শুটিং সেট (network)' },
      d: {
        en: 'A private radio channel that only your crew can use.',
        bn: 'একটা ব্যক্তিগত রেডিও চ্যানেল, যেটা শুধু আপনার ক্রু ব্যবহার করতে পারে।'
      }
    }
  ],
  legend: {
    request: { en: 'An instruction going out', bn: 'বাইরে যাওয়া নির্দেশ' },
    queue: { en: 'A job waiting its turn', bn: 'পালার অপেক্ষায় থাকা কাজ' },
    result: { en: 'A check that passed', bn: 'পাস করা পরীক্ষা' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 1000, 430 ], narrow: [ 400, 540 ] },
  nodeR: { narrow: 20 },
  nodes: {
    dev: {
      icon: 'user',
      name: { en: 'Developer', bn: 'ডেভেলপার' },
      sub: { en: 'Runs the command', bn: 'কমান্ড চালায়' },
      plain: {
        name: { en: 'Director', bn: 'পরিচালক' },
        sub: { en: 'Calls the shots', bn: 'সবকিছুর ডাক দেয়' }
      },
      wide: [ 100, 320, 'down' ],
      narrow: [ 110, 121, 'right' ]
    },
    compose: {
      icon: 'task',
      name: { en: 'Docker Compose', bn: 'Docker Compose' },
      sub: { en: 'Reads compose.yaml', bn: 'compose.yaml পড়ে' },
      plain: {
        name: { en: 'Call sheet', bn: 'কল শিট' },
        sub: { en: 'Lists every job', bn: 'প্রতিটি কাজ লেখা' }
      },
      wide: [ 100, 130, 'up' ],
      narrow: [ 110, 45, 'right' ]
    },
    worker: {
      icon: 'worker',
      name: { en: 'worker', bn: 'worker' },
      sub: { en: 'Celery', bn: 'Celery' },
      plain: {
        name: { en: 'Back-room crew', bn: 'পেছনের ঘরের ক্রু' },
        sub: { en: 'Does slow jobs', bn: 'ধীর কাজ করে' }
      },
      wide: [ 640, 130, 'up' ],
      narrow: [ 110, 349, 'right' ]
    },
    redis: {
      icon: 'queue',
      name: { en: 'redis', bn: 'redis' },
      sub: { en: 'Redis', bn: 'Redis' },
      plain: {
        name: { en: 'Job board', bn: 'কাজের বোর্ড' },
        sub: { en: 'Jobs wait here', bn: 'কাজ এখানে অপেক্ষা করে' }
      },
      wide: [ 380, 130, 'up' ],
      narrow: [ 110, 273, 'right' ]
    },
    api: {
      icon: 'server',
      name: { en: 'api', bn: 'api' },
      sub: { en: 'Web app', bn: 'ওয়েব app' },
      plain: {
        name: { en: 'Camera crew', bn: 'ক্যামেরা ক্রু' },
        sub: { en: 'Faces outward', bn: 'বাইরের দিকে মুখ' }
      },
      wide: [ 380, 320, 'down' ],
      narrow: [ 110, 197, 'right' ]
    },
    db: {
      icon: 'store',
      name: { en: 'db', bn: 'db' },
      sub: { en: 'Postgres', bn: 'Postgres' },
      plain: {
        name: { en: 'Lighting crew', bn: 'আলোর ক্রু' },
        sub: { en: 'Ready first', bn: 'আগে তৈরি হয়' }
      },
      wide: [ 640, 320, 'down' ],
      narrow: [ 110, 425, 'right' ]
    },
    volume: {
      icon: 'archive',
      name: { en: 'pgdata', bn: 'pgdata' },
      sub: { en: 'Named volume', bn: 'Named volume' },
      plain: {
        name: { en: 'Footage drive', bn: 'ফুটেজ ড্রাইভ' },
        sub: { en: 'Keeps the records', bn: 'রেকর্ড ধরে রাখে' }
      },
      wide: [ 900, 320, 'down' ],
      narrow: [ 110, 501, 'right' ]
    }
  },
  groups: [
    {
      id: 'net',
      label: { en: 'Project network', bn: 'Project network' },
      plain: { en: 'The set', bn: 'শুটিং সেট' },
      wide: [ 310, 40, 416, 360 ],
      narrow: [ 30, 160, 355, 304 ]
    }
  ],
  corridors: {
    'dev-compose': { wide: [ [ 100, 320 ], [ 100, 130 ] ], narrow: [ [ 110, 121 ], [ 110, 45 ] ] },
    'dev-api': { wide: [ [ 100, 320 ], [ 380, 320 ] ], narrow: [ [ 110, 121 ], [ 110, 197 ] ] },
    'api-db': { wide: [ [ 380, 320 ], [ 640, 320 ] ], narrow: [ [ 110, 197 ], [ 60, 197 ], [ 60, 425 ], [ 110, 425 ] ] },
    'api-redis': { wide: [ [ 380, 320 ], [ 380, 130 ] ], narrow: [ [ 110, 197 ], [ 110, 273 ] ] },
    'redis-worker': { wide: [ [ 380, 130 ], [ 640, 130 ] ], narrow: [ [ 110, 273 ], [ 110, 349 ] ] },
    'db-volume': { wide: [ [ 640, 320 ], [ 900, 320 ] ], narrow: [ [ 110, 425 ], [ 110, 501 ] ] }
  },
  edges: {
    'dev-compose': { from: 'dev', to: 'compose', kind: 'request' },
    'dev-api': { from: 'dev', to: 'api', kind: 'request' },
    'api-db': { from: 'api', to: 'db', kind: 'request' },
    'api-redis': { from: 'api', to: 'redis', kind: 'queue' },
    'redis-worker': { from: 'redis', to: 'worker', kind: 'queue' },
    'db-volume': { from: 'db', to: 'volume', kind: 'request' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'up',
        moves: [ { edge: 'dev-compose', label: 'docker compose up', plain: { en: 'Start it all', bn: 'সব শুরু করুন' } } ],
        title: { en: 'You tell the call sheet to start', bn: 'আপনি কল শিটকে শুরু করতে বলেন' },
        simple: {
          en: 'You are the director, and you tell the call sheet to start. It lists every crew member and the job each one does. One command wakes them all.',
          bn: 'আপনি পরিচালক, আর আপনি কল শিটকে শুরু করতে বলেন। তাতে প্রতিটি ক্রু সদস্য আর তার কাজ লেখা আছে। একটা কমান্ডেই সবাই জেগে ওঠে।'
        },
        story: {
          title: { en: 'Lubna calls the start', bn: 'লুবনা শুরু বলে' },
          text: {
            en: 'Lubna, the director, taps the call sheet and says start. The sheet names every crew member and what each one must do, so a single word wakes the whole crew.',
            bn: 'পরিচালক লুবনা কল শিটে আঙুল ছুঁইয়ে বলে, শুরু। শিটে প্রতিটি ক্রু সদস্যের নাম আর তার কাজ লেখা, তাই একটা কথাতেই পুরো ক্রু জেগে ওঠে।'
          }
        },
        tech: {
          en: '`docker compose up` reads `compose.yaml`, the file name Compose prefers. It creates a network named `<project>_default`, creates named volumes that do not exist yet, then creates and starts the containers in dependency order.',
          bn: '`docker compose up` `compose.yaml` পড়ে, যে নামটা Compose পছন্দ করে। সে `<project>_default` নামে একটা network বানায়, যেসব named volume এখনো নেই সেগুলো বানায়, তারপর dependency order মেনে container তৈরি আর চালু করে।'
        }
      },
      {
        id: 'start-deps',
        work: { node: [ 'db', 'redis' ], kind: 'queue' },
        state: { db: { en: 'Starting…', bn: 'শুরু হচ্ছে…' } },
        title: { en: 'The lights and the board go first', bn: 'আলো আর বোর্ড আগে শুরু হয়' },
        simple: {
          en: 'Following the call sheet, the lighting crew and the job board start first, because the others will need them. Neither depends on the other, so they can begin together.',
          bn: 'কল শিট অনুযায়ী আগে আলোর ক্রু আর কাজের বোর্ড শুরু হয়, কারণ বাকিদের এদের দরকার হবে। একজন আরেকজনের ওপর নির্ভর করে না, তাই দুজন একসাথেই শুরু করতে পারে।'
        },
        story: {
          title: { en: 'Lights and board wake first', bn: 'আলো আর বোর্ড আগে জাগে' },
          text: {
            en: 'Lubna wants the lights and the job board ready before anyone else. Fahim switches the lights on, and the board goes up on the wall. The rest of the crew waits for them.',
            bn: 'লুবনা চায় আর সবার আগে আলো আর কাজের বোর্ড তৈরি থাকুক। ফাহিম আলো জ্বালায়, আর বোর্ডটা দেয়ালে টাঙানো হয়। বাকি ক্রু ওদের জন্য অপেক্ষা করে।'
          }
        },
        tech: {
          en: 'Compose creates `db` and `redis` first because `api` and `worker` list them under `depends_on`. The two have no dependency on each other, so they can start together. Plain `depends_on` fixes only startup order.',
          bn: 'Compose আগে `db` আর `redis` তৈরি করে, কারণ `api` আর `worker` তাদের `depends_on`-এ রেখেছে। এ দুটোর একে অপরের ওপর নির্ভরতা নেই, তাই একসাথে শুরু হতে পারে। সাধারণ `depends_on` শুধু startup order ঠিক করে।'
        }
      },
      {
        id: 'db-healthy',
        work: { node: 'db', kind: 'result' },
        state: { db: { en: 'Healthy', bn: 'healthy' } },
        plainState: { db: { en: 'Ready to go', bn: 'তৈরি' } },
        title: { en: 'The lights say they are ready', bn: 'আলোর ক্রু জানায় তারা তৈরি' },
        simple: {
          en: 'The lighting crew has arrived, but arriving is not enough. A quick check shows the lights really work, and only then do they say ready.',
          bn: 'আলোর ক্রু এসে গেছে, কিন্তু শুধু আসাটাই যথেষ্ট নয়। একটা ছোট পরীক্ষায় দেখা যায় আলো সত্যিই জ্বলে, আর তখনই তারা বলে তৈরি।'
        },
        story: {
          title: { en: 'Fahim gives a thumbs-up', bn: 'ফাহিম বুড়ো আঙুল তোলে' },
          text: {
            en: 'Fahim has arrived with his lights, but Lubna asks him to prove they work. He tests one lamp, nods, and gives a thumbs-up. Only now can the camera crew start.',
            bn: 'ফাহিম আলো নিয়ে হাজির, কিন্তু লুবনা বলে প্রমাণ করো যে আলো কাজ করে। সে একটা বাতি পরীক্ষা করে, মাথা নাড়ে, আর বুড়ো আঙুল তোলে। এবার ক্যামেরা ক্রু শুরু করতে পারে।'
          }
        },
        tech: {
          en: 'The `healthcheck` on `db` runs `pg_isready`. Exit code 0 means Postgres accepts connections, and exit code 1 means it is rejecting them, for example during startup. The container status goes from `starting` to `healthy` once a check passes.',
          bn: '`db`-এর `healthcheck` `pg_isready` চালায়। exit code 0 মানে Postgres connection নিচ্ছে, আর exit code 1 মানে সে connection ফিরিয়ে দিচ্ছে, যেমন startup-এর সময়। একটা check পাস করলে container-এর status `starting` থেকে `healthy` হয়।'
        }
      },
      {
        id: 'start-api',
        work: { node: 'api', kind: 'result' },
        title: { en: 'The camera crew starts', bn: 'ক্যামেরা ক্রু শুরু করে' },
        simple: {
          en: 'The lights are ready, so the camera crew can start now, as the call sheet says. This is the crew that will face the outside world.',
          bn: 'আলো তৈরি, তাই কল শিটের কথামতো ক্যামেরা ক্রু এবার শুরু করতে পারে। এই ক্রুই বাইরের দুনিয়ার মুখোমুখি হবে।'
        },
        story: {
          title: { en: 'Ayesha takes her position', bn: 'আয়েশা নিজের জায়গায় দাঁড়ায়' },
          text: {
            en: 'With the lights ready, it is the camera crew’s turn. Ayesha picks up her camera and takes her place. Hers is the only crew the outside world will meet.',
            bn: 'আলো তৈরি, তাই এবার ক্যামেরা ক্রুর পালা। আয়েশা ক্যামেরা তুলে নিজের জায়গায় দাঁড়ায়। বাইরের দুনিয়া শুধু তার ক্রুর সাথেই দেখা করবে।'
          }
        },
        tech: {
          en: 'With `condition: service_healthy`, Compose creates `api` only after `db` reports healthy. Without a condition, Compose waits until a container is running, not until it is ready. `redis` only needs `service_started`.',
          bn: '`condition: service_healthy` থাকলে `db` healthy জানানোর পরেই Compose `api` তৈরি করে। condition না থাকলে Compose শুধু container চালু হওয়া পর্যন্ত অপেক্ষা করে, ready হওয়া পর্যন্ত নয়। `redis`-এর শুধু `service_started` লাগে।'
        }
      },
      {
        id: 'start-worker',
        work: { node: 'worker', kind: 'result' },
        state: { worker: { en: 'Same code, own command', bn: 'একই code, নিজের command' } },
        plainState: { worker: { en: 'Same code, other job', bn: 'একই কোড, অন্য কাজ' } },
        title: { en: 'The back room starts too', bn: 'পেছনের ঘরও শুরু করে' },
        simple: {
          en: 'The back-room crew starts next. They work from the same script as the camera crew, but the call sheet gives them a different job to do.',
          bn: 'এরপর পেছনের ঘরের ক্রু শুরু করে। তারা ক্যামেরা ক্রুর মতো একই স্ক্রিপ্ট থেকে কাজ করে, কিন্তু কল শিট তাদের আলাদা একটা কাজ দেয়।'
        },
        story: {
          title: { en: 'The back room opens', bn: 'পেছনের ঘর খোলে' },
          text: {
            en: 'Next the back-room crew arrives. They carry the same script as Ayesha’s crew, but Lubna’s call sheet hands them a different job: handle anything slow, away from the camera.',
            bn: 'এরপর পেছনের ঘরের ক্রু আসে। তাদের হাতে আয়েশার ক্রুর মতোই একই স্ক্রিপ্ট, কিন্তু লুবনার কল শিট তাদের আলাদা কাজ দেয়: ধীর যা-কিছু আছে ক্যামেরার আড়ালে সামলানো।'
          }
        },
        tech: {
          en: '`worker` is built from the same code as `api`, but its `command` replaces the Dockerfile’s `CMD`, for example `celery -A app.worker worker`. One codebase, two roles, and both reach `db` and `redis` by name.',
          bn: '`worker` `api`-র মতো একই code থেকে বানানো, কিন্তু তার `command` Dockerfile-এর `CMD`-কে বদলে দেয়, যেমন `celery -A app.worker worker`। একটাই codebase, দুটো ভূমিকা, আর দুজনেই নাম ধরে `db` আর `redis`-এ পৌঁছায়।'
        }
      },
      {
        id: 'open-port',
        moves: [ { edge: 'dev-api', label: 'localhost:8000', plain: { en: 'You knock', bn: 'আপনি কড়া নাড়েন' } } ],
        state: { api: { en: 'Port 8000 open', bn: 'Port 8000 খোলা' } },
        plainState: { api: { en: 'Door is open', bn: 'দরজা খোলা' } },
        title: { en: 'You knock on the one open door', bn: 'আপনি একমাত্র খোলা দরজায় কড়া নাড়েন' },
        simple: {
          en: 'You open your browser and knock on the camera crew’s door. It is the only door to the outside. The other crew members stay behind it, out of reach.',
          bn: 'আপনি ব্রাউজার খুলে ক্যামেরা ক্রুর দরজায় কড়া নাড়েন। বাইরে যাওয়ার এটাই একমাত্র দরজা। বাকি ক্রু সদস্যরা এর পেছনে থাকে, নাগালের বাইরে।'
        },
        story: {
          title: { en: 'Lubna knocks on Ayesha’s door', bn: 'লুবনা আয়েশার দরজায় কড়া নাড়ে' },
          text: {
            en: 'Lubna opens her browser and knocks on the camera crew’s door. It is the only door to the outside, so Ayesha answers, while everyone else stays safely behind it.',
            bn: 'লুবনা ব্রাউজার খুলে ক্যামেরা ক্রুর দরজায় কড়া নাড়ে। বাইরে যাওয়ার এটাই একমাত্র দরজা, তাই আয়েশা সাড়া দেয়, আর বাকি সবাই নিরাপদে এর পেছনে থাকে।'
          }
        },
        tech: {
          en: '`ports: "8000:8000"` publishes the container’s port 8000 on the host, so `localhost:8000` reaches `api`. Without a host IP, Docker binds all interfaces. `db` and `redis` publish nothing, so machines outside the host cannot reach them.',
          bn: '`ports: "8000:8000"` container-এর port 8000 host-এ publish করে, তাই `localhost:8000` দিয়ে `api`-তে পৌঁছানো যায়। host IP না দিলে Docker সব interface-এ bind করে। `db` আর `redis` কিছুই publish করে না, তাই host-এর বাইরের machine তাদের নাগাল পায় না।'
        }
      },
      {
        id: 'find-db',
        moves: [ { edge: 'api-db', label: 'db:5432', plain: { en: 'Call by name', bn: 'নাম ধরে ডাক' } } ],
        title: { en: 'The camera crew calls by name', bn: 'ক্যামেরা ক্রু নাম ধরে ডাকে' },
        simple: {
          en: 'The camera crew needs something from the lighting crew, so it calls them on the radio. It only has to say their call sign. No address is needed.',
          bn: 'ক্যামেরা ক্রুর আলোর ক্রুর কাছে কিছু দরকার, তাই সে রেডিওতে তাদের ডাকে। শুধু তাদের কল সাইন বললেই হয়। কোনো ঠিকানা লাগে না।'
        },
        story: {
          title: { en: 'Ayesha radios the lights', bn: 'আয়েশা আলোর ক্রুকে রেডিও করে' },
          text: {
            en: 'Ayesha needs something from the lighting crew. She does not hunt for an address. She just says Fahim’s call sign into her radio, and Fahim answers straight away.',
            bn: 'আয়েশার আলোর ক্রুর কাছে কিছু দরকার। সে ঠিকানা খুঁজতে বসে না। শুধু রেডিওতে ফাহিমের কল সাইন বলে, আর ফাহিম সঙ্গে সঙ্গে সাড়া দেয়।'
          }
        },
        tech: {
          en: 'Compose registers each service name in an internal DNS server, so `api` reaches Postgres at `db:5432`. Use the container port, never the published host port, for traffic between services. A typical URL is `postgresql://app:pw@db:5432/app`.',
          bn: 'Compose প্রতিটি service-এর নাম একটা internal DNS server-এ রেজিস্টার করে, তাই `api` Postgres-এ `db:5432` দিয়ে পৌঁছায়। service-এর মধ্যে যোগাযোগে container port ব্যবহার করুন, কখনো published host port নয়। একটা সাধারণ URL: `postgresql://app:pw@db:5432/app`।'
        }
      },
      {
        id: 'queue-job',
        moves: [ { edge: 'api-redis', label: 'enqueue job', plain: { en: 'A slow job', bn: 'একটা ধীর কাজ' } } ],
        title: { en: 'A slow job goes on the board', bn: 'ধীর কাজ বোর্ডে ওঠে' },
        simple: {
          en: 'Someone asks for something slow. The camera crew does not wait around. It pins the job on the job board and gets back to filming.',
          bn: 'কেউ একটা ধীর কাজ চায়। ক্যামেরা ক্রু বসে অপেক্ষা করে না। সে কাজটা কাজের বোর্ডে গেঁথে দিয়ে আবার শুটিংয়ে ফিরে যায়।'
        },
        story: {
          title: { en: 'Ayesha pins a job to the board', bn: 'আয়েশা বোর্ডে একটা কাজ গাঁথে' },
          text: {
            en: 'A visitor asks for something slow. Ayesha does not make them wait. She pins the job on the job board and goes straight back to filming.',
            bn: 'এক দর্শক একটা ধীর কাজ চায়। আয়েশা তাকে অপেক্ষা করিয়ে রাখে না। সে কাজটা কাজের বোর্ডে গেঁথে দিয়ে সোজা শুটিংয়ে ফিরে যায়।'
          }
        },
        tech: {
          en: '`api` pushes the job onto Redis at `redis://redis:6379`. The host name is again a service name, and 6379 is the default Redis port. Celery calls this store its broker: the go-between that carries jobs from the app to the worker.',
          bn: '`api` কাজটা Redis-এ `redis://redis:6379` ঠিকানায় ঢুকিয়ে দেয়। host name আবারও একটা service-এর নাম, আর 6379 হলো Redis-এর ডিফল্ট port। Celery এই store-কে বলে broker: যে মাঝখানে থেকে app থেকে worker-এর কাছে কাজ পৌঁছে দেয়।'
        }
      },
      {
        id: 'pick-up',
        moves: [ { edge: 'redis-worker', label: 'dequeue job', plain: { en: 'Picked up', bn: 'কাজ তুলে নেয়' } } ],
        title: { en: 'The back room picks up the job', bn: 'পেছনের ঘর কাজটা তুলে নেয়' },
        simple: {
          en: 'The back-room crew checks the job board, spots the new job and takes it down. Now they can work on it slowly, while the camera crew keeps filming.',
          bn: 'পেছনের ঘরের ক্রু কাজের বোর্ড দেখে, নতুন কাজটা খুঁজে পায় আর নামিয়ে নেয়। এখন তারা ধীরে ধীরে কাজটা করতে পারে, আর ক্যামেরা ক্রু শুটিং চালিয়ে যায়।'
        },
        story: {
          title: { en: 'The back room takes the job', bn: 'পেছনের ঘর কাজটা নেয়' },
          text: {
            en: 'Down in the back room, the crew checks the board and spots the new job. They take it down and begin the slow work, while Ayesha and her camera stay free.',
            bn: 'পেছনের ঘরে ক্রু বোর্ড দেখে নতুন কাজটা খুঁজে পায়। তারা সেটা নামিয়ে ধীরে ধীরে কাজ শুরু করে, আর আয়েশা ও তার ক্যামেরা ফাঁকা থাকে।'
          }
        },
        tech: {
          en: 'The worker reads the job off Redis, again by the name `redis`, and runs it. Redis only holds jobs; the slow work happens in `worker`, so `api` stays free to answer other requests. Scale workers with `--scale worker=3`.',
          bn: 'worker `redis` নামটা ধরেই Redis থেকে কাজটা পড়ে আর চালায়। Redis শুধু কাজ ধরে রাখে; ধীর কাজটা `worker`-এ হয়, তাই `api` অন্য request-এর উত্তর দিতে ফাঁকা থাকে। `--scale worker=3` দিয়ে worker বাড়ানো যায়।'
        }
      },
      {
        id: 'persist',
        moves: [ { edge: 'db-volume', label: 'write data', plain: { en: 'Records saved', bn: 'রেকর্ড জমা' } } ],
        state: { volume: { en: 'Data kept', bn: 'data জমা আছে' } },
        plainState: { volume: { en: 'Records safe', bn: 'রেকর্ড নিরাপদ' } },
        title: { en: 'The records are saved outside', bn: 'রেকর্ড বাইরে জমা থাকে' },
        simple: {
          en: 'The crew’s records are saved on a footage drive that sits outside the crew. When the crew goes home, the drive stays.',
          bn: 'ক্রুর রেকর্ড একটা ফুটেজ ড্রাইভে জমা হয়, যেটা ক্রুর বাইরে থাকে। ক্রু বাড়ি গেলেও ড্রাইভটা থেকে যায়।'
        },
        story: {
          title: { en: 'The footage drive keeps it all', bn: 'ফুটেজ ড্রাইভ সব ধরে রাখে' },
          text: {
            en: 'At the end of the day, the records go onto a footage drive kept outside. The crew can go home and the drive stays. Only Lubna can choose to wipe it clean.',
            bn: 'দিনের শেষে রেকর্ডগুলো বাইরে রাখা ফুটেজ ড্রাইভে যায়। ক্রু বাড়ি যেতে পারে, ড্রাইভ থেকে যায়। মুছে ফেলার সিদ্ধান্ত শুধু লুবনাই নিতে পারে।'
          }
        },
        tech: {
          en: '`db` writes into a named volume, such as `pgdata`, which lives outside the container. `docker compose down` removes containers and networks but keeps named volumes. `docker compose down -v` deletes them too, so use it on purpose.',
          bn: '`db` একটা named volume-এ লেখে, যেমন `pgdata`, যেটা container-এর বাইরে থাকে। `docker compose down` container আর network সরায় কিন্তু named volume রেখে দেয়। `docker compose down -v` সেগুলোও মুছে ফেলে, তাই ইচ্ছে করেই ব্যবহার করুন।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'localhost-bug',
      label: { en: 'It looks in its own room', bn: 'সে নিজের ঘরেই খোঁজে' },
      whatIf: {
        en: 'What if the camera crew looks for the lights in its own room?',
        bn: 'ক্যামেরা ক্রু যদি আলোর ক্রুকে নিজের ঘরেই খোঁজে?'
      },
      branchAfter: 'open-port',
      steps: [
        {
          id: 'try-localhost',
          work: { node: 'api', kind: 'queue' },
          state: { api: { en: 'Tries localhost', bn: 'localhost-এ খোঁজে' } },
          plainState: { api: { en: 'Checks its own room', bn: 'নিজের ঘর দেখে' } },
          title: { en: 'It looks in its own room', bn: 'সে নিজের ঘরে খোঁজে' },
          simple: {
            en: 'The camera crew was told to find the lighting crew at here, which means its own room. It looks around, but only its own crew is in there.',
            bn: 'ক্যামেরা ক্রুকে বলা হয়েছে আলোর ক্রুকে খুঁজতে “এখানে”, মানে তার নিজের ঘরে। সে চারপাশে তাকায়, কিন্তু ভেতরে শুধু তার নিজের ক্রুই আছে।'
          },
          story: {
            title: { en: 'Ayesha looks in her own room', bn: 'আয়েশা নিজের ঘরে খোঁজে' },
            text: {
              en: 'Someone set Ayesha up to find the lighting crew at here. So she searches her own room, and the only people in it are her own camera crew. Nobody has any lights.',
              bn: 'কেউ আয়েশাকে বলে রেখেছে আলোর ক্রুকে খুঁজতে “এখানে”। তাই সে নিজের ঘরেই খোঁজে, আর সেখানে আছে শুধু তার নিজের ক্যামেরা ক্রু। কারও কাছেই আলো নেই।'
            }
          },
          tech: {
            en: 'The app connects to `localhost:5432`. Inside a container, `localhost` is the container’s own loopback, because each container has its own network namespace. Nothing listens on 5432 there, since Postgres runs in the `db` container.',
            bn: 'app `localhost:5432`-এ connect করে। container-এর ভেতরে `localhost` মানে container-এর নিজস্ব loopback, কারণ প্রতিটি container-এর নিজের network namespace আছে। সেখানে 5432-তে কেউ শোনে না, কারণ Postgres চলছে `db` container-এ।'
          }
        },
        {
          id: 'refused',
          work: { node: 'api', kind: 'error' },
          state: { api: { en: 'Connection refused', bn: 'connection refused' } },
          plainState: { api: { en: 'Nobody answers', bn: 'কেউ সাড়া দেয় না' } },
          title: { en: 'Nobody answers', bn: 'কেউ সাড়া দেয় না' },
          simple: {
            en: 'Nothing in that room provides lights, so nothing answers and the camera crew gives up with an error. The lights were next door all along, under their own call sign.',
            bn: 'ওই ঘরে আলো দেওয়ার মতো কিছু নেই, তাই কেউ সাড়া দেয় না আর ক্যামেরা ক্রু একটা error নিয়ে হাল ছেড়ে দেয়। আলো ছিল পাশের ঘরেই, নিজেদের কল সাইনে।'
          },
          story: {
            title: { en: 'Ayesha hits a wall of silence', bn: 'আয়েশা নীরবতার দেয়ালে ঠেকে' },
            text: {
              en: 'Nobody answers. Ayesha’s crew shrugs and gives up with an error. Lubna reads the call sheet and laughs: the lights were next door, and Ayesha only had to say Fahim’s call sign.',
              bn: 'কেউ সাড়া দেয় না। আয়েশার ক্রু কাঁধ ঝাঁকিয়ে একটা error নিয়ে হাল ছেড়ে দেয়। লুবনা কল শিট পড়ে হেসে ফেলে: আলো ছিল পাশের ঘরেই, আয়েশাকে শুধু ফাহিমের কল সাইনটা বলতে হতো।'
            }
          },
          tech: {
            en: 'Nothing listens on port 5432 inside the `api` container, so the connection is refused. The fix is the service name: `db:5432`. `localhost` works from your host through a published port, or between processes in the same container.',
            bn: '`api` container-এর ভেতরে port 5432-এ কেউ শোনে না, তাই connection refused হয়। সমাধান হলো service-এর নাম: `db:5432`। `localhost` কাজ করে host থেকে, published port দিয়ে, অথবা একই container-এর process-দের মধ্যে।'
          }
        }
      ]
    },
    {
      id: 'too-early',
      label: { en: 'The lights are not ready', bn: 'আলো তৈরি নয়' },
      whatIf: {
        en: 'What if the camera crew starts before the lights are ready?',
        bn: 'আলো তৈরি হওয়ার আগেই যদি ক্যামেরা ক্রু শুরু করে?'
      },
      branchAfter: 'start-deps',
      steps: [
        {
          id: 'api-early',
          work: { node: 'api', kind: 'queue' },
          state: { db: { en: 'Still starting', bn: 'এখনো শুরু হচ্ছে' } },
          plainState: { db: { en: 'Still setting up', bn: 'এখনো সাজানো চলছে' } },
          title: { en: 'The camera crew starts too soon', bn: 'ক্যামেরা ক্রু বড্ড আগে শুরু করে' },
          simple: {
            en: 'The call sheet only waits until the lighting crew has arrived, not until the lights work. So the camera crew starts while the lights are still being set up.',
            bn: 'কল শিট শুধু আলোর ক্রু আসা পর্যন্ত অপেক্ষা করে, আলো কাজ করা পর্যন্ত নয়। তাই ক্যামেরা ক্রু শুরু করে ফেলে, অথচ আলো তখনো সাজানো হচ্ছে।'
          },
          story: {
            title: { en: 'Ayesha starts too soon', bn: 'আয়েশা বড্ড আগে শুরু করে' },
            text: {
              en: 'This time Lubna’s call sheet forgets the rule. It only waits until Fahim has arrived, not until his lights work, so Ayesha starts filming while Fahim is still fixing the lamps.',
              bn: 'এবার লুবনার কল শিটে নিয়মটা লেখা নেই। সে শুধু ফাহিম আসা পর্যন্ত অপেক্ষা করে, আলো কাজ করা পর্যন্ত নয়, তাই ফাহিম যখন বাতি ঠিক করছে তখনই আয়েশা শুটিং শুরু করে দেয়।'
            }
          },
          tech: {
            en: 'Without a `condition`, `depends_on` waits only until the `db` container is running, not until Postgres is ready. `pg_isready` would still report exit code 1 (rejecting connections) or 2 (no response).',
            bn: '`condition` ছাড়া `depends_on` শুধু `db` container চালু হওয়া পর্যন্ত অপেক্ষা করে, Postgres ready হওয়া পর্যন্ত নয়। `pg_isready` তখনো exit code 1 (connection ফিরিয়ে দিচ্ছে) বা 2 (সাড়া নেই) জানাত।'
          }
        },
        {
          id: 'api-crash',
          work: { node: 'api', kind: 'error' },
          state: { api: { en: 'db not ready', bn: 'db তৈরি নয়' } },
          plainState: { api: { en: 'Lights not ready', bn: 'আলো তৈরি নয়' } },
          title: { en: 'The first call fails', bn: 'প্রথম ডাকেই গোলমাল' },
          simple: {
            en: 'The camera crew tries to use the lights, but they are not ready yet, so the first call fails. Unless it knows how to try again, it gives up.',
            bn: 'ক্যামেরা ক্রু আলো ব্যবহার করতে চায়, কিন্তু আলো এখনো তৈরি নয়, তাই প্রথম ডাকেই গোলমাল হয়। আবার চেষ্টা করতে না জানলে সে হাল ছেড়ে দেয়।'
          },
          story: {
            title: { en: 'The first call fails', bn: 'প্রথম ডাকেই গোলমাল' },
            text: {
              en: 'Ayesha asks for light, but Fahim’s lamps are not ready, so her first call fails. Unless she knows to try again, she packs up. Lubna sighs and adds a ready check to the call sheet.',
              bn: 'আয়েশা আলো চায়, কিন্তু ফাহিমের বাতি এখনো তৈরি নয়, তাই তার প্রথম ডাকেই গোলমাল হয়। আবার চেষ্টা করতে না জানলে সে গুটিয়ে নেয়। লুবনা দীর্ঘশ্বাস ফেলে কল শিটে একটা রেডি চেক যোগ করে।'
            }
          },
          tech: {
            en: 'The first connection to `db:5432` fails because Postgres is not accepting connections yet, so the app raises an error and may exit. Add `condition: service_healthy`, and many teams also make the app retry on startup.',
            bn: '`db:5432`-এ প্রথম connection ব্যর্থ হয়, কারণ Postgres এখনো connection নিচ্ছে না, তাই app error তোলে আর বন্ধ হয়ে যেতে পারে। `condition: service_healthy` যোগ করুন, আর অনেক দল startup-এ app-কে retry করানোর ব্যবস্থাও রাখে।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A film set runs from one call sheet. Every crew member has a role and a call sign, so the director never has to run around giving orders.',
      bn: 'একটা ফিল্ম সেট চলে একটা কল শিট দিয়ে। প্রতিটি ক্রু সদস্যের একটা ভূমিকা আর একটা কল সাইন আছে, তাই পরিচালককে দৌড়ে দৌড়ে নির্দেশ দিতে হয় না।'
    },
    twins: [
      {
        icon: 'user',
        node: 'dev',
        name: { en: 'The director', bn: 'পরিচালক' },
        d: {
          en: 'Says start, and owns the call sheet.',
          bn: 'শুরু বলে, আর কল শিটের মালিক।'
        }
      },
      {
        icon: 'task',
        node: 'compose',
        name: { en: 'The call sheet', bn: 'কল শিট' },
        d: {
          en: 'Lists every crew member, what each one does, and who must be ready first.',
          bn: 'প্রতিটি ক্রু সদস্য, তার কাজ, আর কে আগে তৈরি হবে, সব লেখা থাকে।'
        }
      },
      {
        icon: 'store',
        node: 'db',
        name: { en: 'The lighting crew', bn: 'আলোর ক্রু' },
        d: {
          en: 'Must be ready before the camera rolls, and keeps the set’s records.',
          bn: 'ক্যামেরা চলার আগে তৈরি থাকতে হয়, আর সেটের রেকর্ড রাখে।'
        }
      },
      {
        icon: 'queue',
        node: 'redis',
        name: { en: 'The job board', bn: 'কাজের বোর্ড' },
        d: {
          en: 'Slow jobs are pinned here until someone has time for them.',
          bn: 'ধীর কাজগুলো এখানে গাঁথা থাকে, যতক্ষণ না কেউ সময় পায়।'
        }
      },
      {
        icon: 'server',
        node: 'api',
        name: { en: 'The camera crew', bn: 'ক্যামেরা ক্রু' },
        d: {
          en: 'The only crew the outside world meets.',
          bn: 'বাইরের দুনিয়া শুধু এই ক্রুর সাথেই দেখা করে।'
        }
      },
      {
        icon: 'worker',
        node: 'worker',
        name: { en: 'The back-room crew', bn: 'পেছনের ঘরের ক্রু' },
        d: {
          en: 'Takes jobs off the board and does the slow work out of sight.',
          bn: 'বোর্ড থেকে কাজ নামিয়ে আড়ালে ধীর কাজটা করে।'
        }
      },
      {
        icon: 'archive',
        node: 'volume',
        name: { en: 'The footage drive', bn: 'ফুটেজ ড্রাইভ' },
        d: {
          en: 'Keeps everything safe even after the crew goes home.',
          bn: 'ক্রু বাড়ি গেলেও সবকিছু নিরাপদে রাখে।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Wrong call sign', bn: 'ভুল কল সাইন' },
        is: { en: 'is a connection refused error', bn: 'মানে connection refused error' },
        d: {
          en: 'The camera crew looks for the lights in its own room and finds nobody, because the lights are next door under their own call sign.',
          bn: 'ক্যামেরা ক্রু আলোর ক্রুকে নিজের ঘরে খোঁজে আর কাউকে পায় না, কারণ আলো আছে পাশের ঘরে, নিজেদের কল সাইনে।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'How do services find each other?',
        bn: 'service-গুলো একে অপরকে কীভাবে খুঁজে পায়?'
      },
      short: {
        en: 'By service name: Compose puts every service on one project network with built-in DNS.',
        bn: 'service-এর নাম দিয়ে: Compose সব service-কে একটা project network-এ রাখে, যেখানে DNS আগে থেকেই আছে।'
      },
      deep: {
        en: 'Compose creates a network called `<project>_default`, and each service registers its name as a host name. Use the container port, as in `db:5432`, never the published host port. Traffic between services ignores `ports`.',
        bn: 'Compose `<project>_default` নামে একটা network বানায়, আর প্রতিটি service তার নামটা host name হিসেবে রেজিস্টার করে। `db:5432`-এর মতো container port ব্যবহার করুন, কখনো published host port নয়। service-এর মধ্যে যোগাযোগ `ports` গ্রাহ্য করে না।'
      },
      redFlag: {
        en: '“Use `localhost`”, or hardcoding container IP addresses.',
        bn: '“`localhost` ব্যবহার করুন”, বা container-এর IP address হাতে লিখে বসিয়ে দেওয়া।'
      }
    },
    {
      q: {
        en: 'Does `depends_on` wait for the database to be ready?',
        bn: '`depends_on` কি database ready হওয়া পর্যন্ত অপেক্ষা করে?'
      },
      short: {
        en: 'Not by default. It only controls start order, and Compose waits until the container is running.',
        bn: 'ডিফল্টে না। সে শুধু start order ঠিক করে, আর Compose container চালু হওয়া পর্যন্ত অপেক্ষা করে।'
      },
      deep: {
        en: 'Add `condition: service_healthy` and a `healthcheck` such as `pg_isready`, so Compose waits for a passing check. Many teams also make the app retry its connection, because a dependency can restart later.',
        bn: 'Compose যাতে একটা পাস করা check পর্যন্ত অপেক্ষা করে, সেজন্য `condition: service_healthy` আর `pg_isready`-র মতো একটা `healthcheck` যোগ করুন। অনেক দল app-কে connection retry করানোর ব্যবস্থাও রাখে, কারণ dependency পরে আবার restart হতে পারে।'
      },
      redFlag: {
        en: '“`depends_on` guarantees the database accepts connections.”',
        bn: '“`depends_on` নিশ্চিত করে database connection নেবে।”'
      }
    },
    {
      q: {
        en: 'What is the difference between `ports` and `expose`?',
        bn: '`ports` আর `expose`-এর পার্থক্য কী?'
      },
      short: {
        en: '`ports` publishes a port on the host. `expose` only records a port for other containers and publishes nothing.',
        bn: '`ports` host-এ একটা port publish করে। `expose` শুধু অন্য container-এর জন্য একটা port লিখে রাখে, কিছুই publish করে না।'
      },
      deep: {
        en: 'Containers on one network reach each other’s ports without either setting. Publishing binds all interfaces unless you add `127.0.0.1:`, and `db` and `redis` usually need no `ports` at all.',
        bn: 'একই network-এর container-রা কোনোটা ছাড়াই একে অপরের port-এ পৌঁছায়। `127.0.0.1:` না দিলে publish সব interface-এ bind হয়, আর `db` ও `redis`-এর সাধারণত কোনো `ports`-ই লাগে না।'
      },
      redFlag: {
        en: '“Services need `ports` to talk to each other.”',
        bn: '“service-দের কথা বলতে `ports` লাগে।”'
      }
    },
    {
      q: {
        en: 'Where does the data live, and how do you reset it?',
        bn: 'data কোথায় থাকে, আর কীভাবে reset করবেন?'
      },
      short: {
        en: 'In a named volume. `docker compose down` keeps it, and `docker compose down -v` deletes it.',
        bn: 'named volume-এ। `docker compose down` সেটা রেখে দেয়, আর `docker compose down -v` মুছে ফেলে।'
      },
      deep: {
        en: '`down` removes containers and the project network, not named volumes. `-v` also removes the named volumes in the file and anonymous ones; external volumes are never removed. For Postgres 18 and newer mount at `/var/lib/postgresql`, for older versions `/var/lib/postgresql/data`.',
        bn: '`down` container আর project network সরায়, named volume নয়। `-v` ফাইলে ঘোষণা করা named volume আর anonymous volume-ও সরায়; external volume কখনো সরানো হয় না। Postgres 18 আর তার পরের version-এ `/var/lib/postgresql`-এ mount করুন, পুরোনো version-এ `/var/lib/postgresql/data`-এ।'
      },
      redFlag: {
        en: '“`down` deletes my database.”',
        bn: '“`down` আমার database মুছে দেয়।”'
      }
    },
    {
      q: {
        en: 'What does `localhost` mean inside a container?',
        bn: 'container-এর ভেতরে `localhost` মানে কী?'
      },
      short: {
        en: 'The container itself, not your laptop and not another service.',
        bn: 'container নিজেই, আপনার ল্যাপটপ নয়, অন্য কোনো service-ও নয়।'
      },
      deep: {
        en: 'Each container has its own network namespace, so its loopback is private. Reach another service by its name, such as `db`. On Docker Desktop, `host.docker.internal` resolves to the host. A published port is how the host reaches a container.',
        bn: 'প্রতিটি container-এর নিজের network namespace আছে, তাই তার loopback একান্ত নিজের। অন্য service-এ তার নাম দিয়ে পৌঁছান, যেমন `db`। Docker Desktop-এ `host.docker.internal` host-কে চেনায়। host যে container-এ পৌঁছায় তা published port দিয়ে।'
      },
      redFlag: {
        en: '“`localhost` is always my machine.”',
        bn: '“`localhost` মানে সবসময় আমার machine।”'
      }
    },
    {
      q: {
        en: 'How do you change the setup for another environment?',
        bn: 'আরেকটা environment-এর জন্য setup কীভাবে বদলাবেন?'
      },
      short: {
        en: 'Keep `compose.yaml` as the base and layer `compose.override.yaml` on top. Compose reads both by default.',
        bn: '`compose.yaml` ভিত্তি হিসেবে রাখুন, আর তার ওপর `compose.override.yaml` বসান। Compose ডিফল্টে দুটোই পড়ে।'
      },
      deep: {
        en: 'With `-f` you list files and they merge in order. Single-value fields such as `command` are replaced, while multi-value fields such as `ports` are concatenated. `docker compose config` prints the merged result.',
        bn: '`-f` দিয়ে ফাইলের তালিকা দিলে সেগুলো ক্রম মেনে merge হয়। `command`-এর মতো single-value field বদলে যায়, আর `ports`-এর মতো multi-value field জুড়ে যায়। `docker compose config` merge-করা ফলাফল দেখায়।'
      },
      redFlag: {
        en: '“Keep a full copy of the file for each environment.”',
        bn: '“প্রতিটি environment-এর জন্য ফাইলের পুরো একটা করে কপি রাখুন।”'
      }
    },
    {
      q: {
        en: 'How do you run several copies of a service?',
        bn: 'একটা service-এর কয়েকটা কপি কীভাবে চালাবেন?'
      },
      short: {
        en: 'Use `docker compose up -d --scale worker=3`, or set `scale` in the file.',
        bn: '`docker compose up -d --scale worker=3` ব্যবহার করুন, বা ফাইলে `scale` দিন।'
      },
      deep: {
        en: 'The flag overrides `scale` in the file. A service with a `container_name` cannot go beyond one container, so leave naming to Compose.',
        bn: 'flag ফাইলের `scale`-কে বদলে দেয়। যে service-এ `container_name` আছে সে একটার বেশি container-এ যেতে পারে না, তাই নাম দেওয়ার কাজটা Compose-কে করতে দিন।'
      },
      redFlag: {
        en: '“Set `container_name` on every service, then scale.”',
        bn: '“প্রতিটি service-এ `container_name` দিন, তারপর scale করুন।”'
      }
    },
    {
      q: {
        en: 'Compose or Kubernetes?',
        bn: 'Compose নাকি Kubernetes?'
      },
      short: {
        en: 'Compose is the simple way to describe and run a stack on one server. Kubernetes manages containers across a cluster of nodes.',
        bn: 'Compose একটা server-এ stack বর্ণনা করা আর চালানোর সহজ উপায়। Kubernetes একটা node-এর cluster জুড়ে container সামলায়।'
      },
      deep: {
        en: 'Docker says Compose works in development, testing, CI, staging and production, and its production guide starts with a single server. Kubernetes adds cluster features: it restarts failed containers, rolls out and rolls back changes, and scales horizontally.',
        bn: 'Docker বলে Compose development, testing, CI, staging আর production-এ কাজ করে, আর তার production guide শুরু হয় একটা server দিয়ে। Kubernetes cluster-এর সুবিধা যোগ করে: ব্যর্থ container আবার চালায়, বদলের rollout ও rollback করে, আর horizontally scale করে।'
      },
      redFlag: {
        en: '“Compose is just Kubernetes on a laptop.”',
        bn: '“Compose মানে ল্যাপটপে Kubernetes।”'
      }
    }
  ],
  cheats: [
    {
      code: 'docker compose up -d --build',
      d: {
        en: 'Build images, then create and start every service in the background.',
        bn: 'image build করে, তারপর সব service তৈরি করে ব্যাকগ্রাউন্ডে চালু করে।'
      }
    },
    {
      code: 'docker compose logs -f api worker',
      d: {
        en: 'Follow the logs of the services you name.',
        bn: 'নাম দেওয়া service-গুলোর log অনুসরণ করুন।'
      }
    },
    {
      code: 'docker compose exec db psql -U app',
      d: {
        en: 'Run psql inside the running db container, as user app.',
        bn: 'চলমান db container-এর ভেতরে user app হিসেবে psql চালান।'
      }
    },
    {
      code: 'docker compose run --rm api pytest',
      d: {
        en: 'Run a one-off command in a new container, removed afterwards. It publishes no ports by default.',
        bn: 'নতুন একটা container-এ একবারের কমান্ড চালান, শেষে container মুছে যায়। ডিফল্টে কোনো port publish হয় না।'
      }
    },
    {
      code: 'docker compose down -v',
      d: {
        en: 'Remove containers and the network. Plain down keeps named volumes, and -v deletes them too.',
        bn: 'container আর network সরান। সাধারণ down named volume রেখে দেয়, আর -v সেগুলোও মুছে ফেলে।'
      }
    },
    {
      code: 'docker compose config',
      d: {
        en: 'Print the merged, resolved configuration, including compose.override.yaml.',
        bn: 'merge আর resolve করা configuration দেখান, compose.override.yaml-সহ।'
      }
    },
    {
      code: 'docker compose up -d --scale worker=3',
      d: {
        en: 'Run three worker containers. The flag overrides scale in the file.',
        bn: 'তিনটা worker container চালান। flag ফাইলের scale-কে বদলে দেয়।'
      }
    },
    {
      code: 'depends_on: { db: { condition: service_healthy } }',
      d: {
        en: 'Wait for the db healthcheck to pass. Pair it with `test: ["CMD-SHELL", "pg_isready -U app"]` on db.',
        bn: 'db-র healthcheck পাস করা পর্যন্ত অপেক্ষা করুন। db-তে `test: ["CMD-SHELL", "pg_isready -U app"]` জুড়ে দিন।'
      }
    }
  ],
  sources: [
    { label: 'Compose: networking', url: 'https://docs.docker.com/compose/how-tos/networking/' },
    { label: 'Compose: startup order and depends_on', url: 'https://docs.docker.com/compose/how-tos/startup-order/' },
    { label: 'Compose file: services (ports, expose, healthcheck, scale)', url: 'https://docs.docker.com/reference/compose-file/services/' },
    { label: 'Compose file: networks', url: 'https://docs.docker.com/reference/compose-file/networks/' },
    { label: 'Compose file: volumes', url: 'https://docs.docker.com/reference/compose-file/volumes/' },
    { label: 'Compose: merge and override files', url: 'https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/' },
    { label: 'Compose: project name', url: 'https://docs.docker.com/compose/how-tos/project-name/' },
    { label: 'Compose: application model (compose.yaml)', url: 'https://docs.docker.com/compose/intro/compose-application-model/' },
    { label: 'Compose: getting started (down and down -v)', url: 'https://docs.docker.com/compose/gettingstarted/' },
    { label: 'Compose: overview', url: 'https://docs.docker.com/compose/' },
    { label: 'Compose: in production', url: 'https://docs.docker.com/compose/how-tos/production/' },
    { label: 'CLI: docker compose up', url: 'https://docs.docker.com/reference/cli/docker/compose/up/' },
    { label: 'CLI: docker compose down', url: 'https://docs.docker.com/reference/cli/docker/compose/down/' },
    { label: 'CLI: docker compose run', url: 'https://docs.docker.com/reference/cli/docker/compose/run/' },
    { label: 'CLI: docker compose exec', url: 'https://docs.docker.com/reference/cli/docker/compose/exec/' },
    { label: 'CLI: docker compose logs', url: 'https://docs.docker.com/reference/cli/docker/compose/logs/' },
    { label: 'CLI: docker compose config', url: 'https://docs.docker.com/reference/cli/docker/compose/config/' },
    { label: 'Docker Engine: networking overview', url: 'https://docs.docker.com/engine/network/' },
    { label: 'Docker Engine: host network driver', url: 'https://docs.docker.com/engine/network/drivers/host/' },
    { label: 'Docker Engine: port publishing', url: 'https://docs.docker.com/engine/network/port-publishing/' },
    { label: 'Dockerfile reference (HEALTHCHECK, EXPOSE)', url: 'https://docs.docker.com/reference/dockerfile/' },
    { label: 'Docker Desktop: networking how-tos (host.docker.internal)', url: 'https://docs.docker.com/desktop/features/networking/networking-how-tos/' },
    { label: 'Docker Hub: Postgres image', url: 'https://hub.docker.com/_/postgres' },
    { label: 'PostgreSQL: pg_isready', url: 'https://www.postgresql.org/docs/current/app-pg-isready.html' },
    { label: 'PostgreSQL: psql', url: 'https://www.postgresql.org/docs/current/app-psql.html' },
    { label: 'Celery: first steps (worker, broker)', url: 'https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html' },
    { label: 'Redis: redis-cli (default port 6379, URI)', url: 'https://redis.io/docs/latest/develop/tools/cli/' },
    { label: 'Linux: network_namespaces(7)', url: 'https://man7.org/linux/man-pages/man7/network_namespaces.7.html' },
    { label: 'Kubernetes: overview', url: 'https://kubernetes.io/docs/concepts/overview/' }
  ]
}
