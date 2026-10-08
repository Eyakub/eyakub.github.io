import type { Topic } from '../types'
import { UI } from '../ui'

const onNet = { en: 'On the network', bn: 'network-এ আছে' }
const inHall = { en: 'In the hallway', bn: 'হলঘরে' }

export const dockerCompose: Topic = {
  slug: 'docker-compose',
  line: 'devops',
  title: { en: 'Docker Compose', bn: 'Docker Compose' },
  summary: {
    en: 'How one compose file builds a private network, starts the containers in order, publishes a single port to your machine, and keeps the data in a volume outside them.',
    bn: 'একটা compose ফাইল কীভাবে একটা private network বানায়, container ক্রমে চালু করে, আপনার machine-এ একটাই port খোলে, আর data রাখে container-এর বাইরে একটা volume-এ।'
  },
  hook: {
    en: 'One page draws a private hallway of rooms, and only one door opens onto the street.',
    bn: 'একটা পাতা একটা ব্যক্তিগত হলঘরে কয়েকটা ঘর আঁকে, আর রাস্তায় খোলে মাত্র একটা দরজা।'
  },
  story: {
    cast: {
      en: 'Lubna runs a small office, Ayesha sits at the front desk, and Fahim keeps the records.',
      bn: 'লুবনা একটা ছোট অফিস চালায়, আয়েশা ফ্রন্ট ডেস্কে বসে, আর ফাহিম রেকর্ড সামলায়।'
    }
  },
  takeaway: {
    en: 'Rooms call each other by name, the street has one door, and the cabinet stays when the rooms close.',
    bn: 'ঘরগুলো একে অপরকে নাম ধরে ডাকে, রাস্তায় দরজা একটাই, আর ঘর বন্ধ হলেও আলমারি থেকে যায়।'
  },
  words: [
    {
      term: { en: 'The plan (compose file)', bn: 'পরিকল্পনা (compose file)' },
      d: {
        en: 'One page that names every room, who starts first, and where records are kept.',
        bn: 'একটা পাতা, যেখানে লেখা থাকে প্রতিটি ঘর, কে আগে শুরু করে, আর রেকর্ড কোথায় থাকে।'
      }
    },
    {
      term: { en: 'Private hallway (network)', bn: 'ব্যক্তিগত হলঘর (network)' },
      d: {
        en: 'The only place these rooms can call each other by the name on the door.',
        bn: 'একমাত্র জায়গা যেখানে এই ঘরগুলো দরজায় লেখা নাম ধরে একে অপরকে ডাকতে পারে।'
      }
    },
    {
      term: { en: 'Room name (service name)', bn: 'ঘরের নাম (service name)' },
      d: {
        en: 'The name on a door. Other rooms use it, and no street address is needed.',
        bn: 'দরজায় লেখা নাম। অন্য ঘরগুলো এই নামই ব্যবহার করে, রাস্তার ঠিকানা লাগে না।'
      }
    },
    {
      term: { en: 'Street door (published port)', bn: 'রাস্তার দরজা (published port)' },
      d: {
        en: 'The one opening from the street into a single room. The other rooms have none.',
        bn: 'রাস্তা থেকে একটা ঘরে ঢোকার একমাত্র খোলা দরজা। বাকি ঘরগুলোর এমন দরজা নেই।'
      }
    },
    {
      term: { en: 'Filing cabinet (volume)', bn: 'ফাইলের আলমারি (volume)' },
      d: {
        en: 'A cabinet fixed outside every room, so the files stay when the rooms are locked.',
        bn: 'প্রতিটি ঘরের বাইরে আটকানো একটা আলমারি, তাই ঘর তালাবন্ধ হলেও ফাইল থেকে যায়।'
      }
    },
    {
      term: { en: 'Ready light (healthcheck)', bn: 'রেডি লাইট (healthcheck)' },
      d: {
        en: 'A check that the room can do its job, not just that someone is inside.',
        bn: 'একটা পরীক্ষা যে ঘরটা কাজ করতে পারে, শুধু কেউ ভেতরে আছে কিনা তা নয়।'
      }
    }
  ],
  legend: {
    request: { en: 'Starting, or a call', bn: 'শুরু, বা একটা ডাক' },
    queue: { en: 'A note on its way', bn: 'পথে থাকা একটা নোট' },
    result: { en: 'Ready', bn: 'তৈরি' },
    error: { en: 'A call that failed', bn: 'একটা ডাক ব্যর্থ' }
  },
  view: { wide: [ 1000, 600 ], narrow: [ 400, 494 ] },
  nodeR: { narrow: 20 },
  nodes: {
    compose: {
      icon: 'task',
      name: { en: 'Docker Compose', bn: 'Docker Compose' },
      sub: { en: 'Reads compose.yaml', bn: 'compose.yaml পড়ে' },
      plain: {
        name: { en: 'The plan', bn: 'পরিকল্পনা' },
        sub: { en: 'Names every room', bn: 'প্রতিটি ঘরের নাম' }
      },
      wide: [ 720, 72, 'up' ],
      narrow: [ 188, 26, 'right' ]
    },
    dev: {
      icon: 'user',
      name: { en: 'You', bn: 'আপনি' },
      sub: { en: 'On the host', bn: 'host-এ আছেন' },
      plain: {
        name: { en: 'You', bn: 'আপনি' },
        sub: { en: 'On the street', bn: 'রাস্তায় আছেন' }
      },
      wide: [ 260, 72, 'up' ],
      narrow: [ 188, 98, 'right' ]
    },
    redis: {
      icon: 'queue',
      name: { en: 'redis', bn: 'redis' },
      sub: { en: 'Redis', bn: 'Redis' },
      plain: {
        name: { en: 'Notice board', bn: 'নোটিশ বোর্ড' },
        sub: { en: 'Notes wait here', bn: 'নোট এখানে অপেক্ষা করে' }
      },
      wide: [ 260, 490, 'down' ],
      narrow: [ 188, 238, 'right' ]
    },
    worker: {
      icon: 'worker',
      name: { en: 'worker', bn: 'worker' },
      sub: { en: 'Celery', bn: 'Celery' },
      plain: {
        name: { en: 'Back room', bn: 'পেছনের ঘর' },
        sub: { en: 'Does slow jobs', bn: 'ধীর কাজ করে' }
      },
      wide: [ 540, 490, 'down' ],
      narrow: [ 188, 318, 'right' ]
    },
    api: {
      icon: 'server',
      name: { en: 'api', bn: 'api' },
      sub: { en: 'Web app', bn: 'ওয়েব app' },
      plain: {
        name: { en: 'Front desk', bn: 'ফ্রন্ট ডেস্ক' },
        sub: { en: 'The street door', bn: 'রাস্তার দরজা' }
      },
      wide: [ 260, 330, 'left' ],
      narrow: [ 188, 170, 'right' ]
    },
    db: {
      icon: 'store',
      name: { en: 'db', bn: 'db' },
      sub: { en: 'Postgres', bn: 'Postgres' },
      plain: {
        name: { en: 'Records room', bn: 'রেকর্ডের ঘর' },
        sub: { en: 'Keeps the records', bn: 'রেকর্ড রাখে' }
      },
      wide: [ 540, 330, 'down' ],
      narrow: [ 188, 386, 'right' ]
    },
    volume: {
      icon: 'archive',
      name: { en: 'pgdata', bn: 'pgdata' },
      sub: { en: 'Named volume', bn: 'Named volume' },
      plain: {
        name: { en: 'Filing cabinet', bn: 'ফাইলের আলমারি' },
        sub: { en: 'Outside the rooms', bn: 'ঘরগুলোর বাইরে' }
      },
      wide: [ 880, 330, 'down' ],
      narrow: [ 188, 458, 'right' ]
    }
  },
  groups: [
    {
      id: 'net',
      label: { en: 'Project network', bn: 'Project network' },
      plain: { en: 'Private hallway', bn: 'ব্যক্তিগত হলঘর' },
      wide: [ 120, 250, 540, 320 ],
      narrow: [ 24, 148, 356, 276 ]
    }
  ],
  corridors: {
    'dev-compose': { wide: [ [ 260, 72 ], [ 720, 72 ] ], narrow: [ [ 188, 98 ], [ 188, 26 ] ] },
    'dev-api': { wide: [ [ 260, 72 ], [ 260, 330 ] ], narrow: [ [ 188, 98 ], [ 188, 170 ] ] },
    'api-db': { wide: [ [ 260, 330 ], [ 540, 330 ] ], narrow: [ [ 188, 170 ], [ 78, 170 ], [ 78, 386 ], [ 188, 386 ] ] },
    'api-redis': { wide: [ [ 260, 330 ], [ 260, 490 ] ], narrow: [ [ 188, 170 ], [ 78, 170 ], [ 78, 238 ], [ 188, 238 ] ] },
    'redis-worker': { wide: [ [ 260, 490 ], [ 540, 490 ] ], narrow: [ [ 188, 238 ], [ 188, 318 ] ] },
    'db-volume': { wide: [ [ 540, 330 ], [ 880, 330 ] ], narrow: [ [ 188, 386 ], [ 188, 458 ] ] }
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
        moves: [ { edge: 'dev-compose', label: 'docker compose up', plain: { en: 'Open the plan', bn: 'পরিকল্পনা খুলুন' } } ],
        title: { en: 'You open the plan', bn: 'আপনি পরিকল্পনা খোলেন' },
        simple: {
          en: 'This one page names every room, the private hallway they share, and the cabinet outside. One word from you starts the whole floor.',
          bn: 'এই একটা পাতায় লেখা আছে প্রতিটি ঘর, তাদের ভাগাভাগি করা ব্যক্তিগত হলঘর, আর বাইরের আলমারি। আপনার একটা কথায় পুরো ফ্লোর শুরু হয়।'
        },
        story: {
          title: { en: 'Lubna opens the plan', bn: 'লুবনা পরিকল্পনা খোলে' },
          text: {
            en: 'Lubna taps the one-page plan. It names every room, the hallway they share, and the cabinet outside. One word from her and the whole floor starts.',
            bn: 'লুবনা এক পাতার পরিকল্পনায় আঙুল ছোঁয়ায়। তাতে প্রতিটি ঘর, তাদের হলঘর, আর বাইরের আলমারির নাম লেখা। তার একটা কথায় পুরো ফ্লোর শুরু হয়।'
          }
        },
        tech: {
          en: '`docker compose up` reads `compose.yaml`. It creates a network named `<project>_default`, creates any named volume that is missing, then creates and starts the containers in dependency order.',
          bn: '`docker compose up` `compose.yaml` পড়ে। সে `<project>_default` নামে একটা network বানায়, যে named volume নেই সেটা বানায়, তারপর dependency order মেনে container তৈরি করে চালু করে।'
        }
      },
      {
        id: 'hallway',
        work: { node: [ 'db', 'redis', 'api', 'worker' ], kind: 'request' },
        state: { db: onNet, redis: onNet, api: onNet, worker: onNet },
        plainState: { db: inHall, redis: inHall, api: inHall, worker: inHall },
        title: { en: 'One private hallway', bn: 'একটা ব্যক্তিগত হলঘর' },
        simple: {
          en: 'The rooms are placed on one private hallway. A room there can call another by the name on the door. The street cannot hear those calls.',
          bn: 'ঘরগুলো একটা ব্যক্তিগত হলঘরে বসানো হয়। সেখানকার একটা ঘর আরেকটাকে দরজায় লেখা নাম ধরে ডাকতে পারে। রাস্তা থেকে সেই ডাক শোনা যায় না।'
        },
        story: {
          title: { en: 'One hallway for every room', bn: 'প্রতিটি ঘরের জন্য এক হলঘর' },
          text: {
            en: 'The plan builds one private hallway and puts every room on it. Ayesha can call Fahim by the name on his door. Someone out on the street cannot hear that call.',
            bn: 'পরিকল্পনা একটা ব্যক্তিগত হলঘর বানিয়ে প্রতিটি ঘরকে সেখানে বসায়। আয়েশা ফাহিমকে তার দরজার নাম ধরে ডাকতে পারে। রাস্তায় দাঁড়ানো কেউ সেই ডাক শুনতে পায় না।'
          }
        },
        tech: {
          en: 'Compose attaches every service to that one network. Its DNS answers each service name with that container’s address. From the host, no service answers unless its port is published.',
          bn: 'Compose প্রতিটি service-কে সেই একটা network-এ জোড়ে। তার DNS প্রতিটি service-এর নামের উত্তরে সেই container-এর ঠিকানা দেয়। host থেকে কোনো service সাড়া দেয় না, যতক্ষণ না তার port publish করা হয়।'
        }
      },
      {
        id: 'start-deps',
        work: { node: [ 'db', 'redis' ], kind: 'request' },
        state: {
          db: { en: 'Starting…', bn: 'শুরু হচ্ছে…' },
          redis: { en: 'Starting…', bn: 'শুরু হচ্ছে…' }
        },
        plainState: {
          db: { en: 'Waking up', bn: 'জেগে উঠছে' },
          redis: { en: 'Waking up', bn: 'জেগে উঠছে' }
        },
        title: { en: 'Records and the board wake first', bn: 'রেকর্ড আর বোর্ড আগে জাগে' },
        simple: {
          en: 'The records room and the notice board start first, because the other rooms will call them. Neither waits for the other, so they wake together.',
          bn: 'রেকর্ডের ঘর আর নোটিশ বোর্ড আগে শুরু করে, কারণ অন্য ঘরগুলো তাদের ডাকবে। একজন আরেকজনের জন্য অপেক্ষা করে না, তাই দুজনে একসাথে জাগে।'
        },
        story: {
          title: { en: 'Fahim and the board wake', bn: 'ফাহিম আর বোর্ড জাগে' },
          text: {
            en: 'Fahim steps into the records room and the notice board goes up beside him. The other rooms will need both, and neither of these two waits for the other.',
            bn: 'ফাহিম রেকর্ডের ঘরে ঢোকে, আর নোটিশ বোর্ড তার পাশে উঠে যায়। অন্য ঘরগুলোর দুটোরই দরকার, আর এ দুজনের কেউ কাউকে অপেক্ষা করায় না।'
          }
        },
        tech: {
          en: '`api` and `worker` list `db` and `redis` under `depends_on`, so those two start first. They do not depend on each other, so they start together. With no condition, Compose waits only until the container process has started.',
          bn: '`api` আর `worker` `depends_on`-এ `db` আর `redis`-কে রেখেছে, তাই এ দুটো আগে শুরু করে। একে অপরের ওপর নির্ভর করে না, তাই একসাথে শুরু হয়। condition না থাকলে Compose শুধু container-এর process চালু হওয়া পর্যন্ত অপেক্ষা করে।'
        }
      },
      {
        id: 'db-healthy',
        work: { node: 'db', kind: 'result' },
        state: {
          db: { en: 'Healthy', bn: 'healthy' },
          redis: { en: 'Running', bn: 'চলছে' }
        },
        plainState: {
          db: { en: 'Ready', bn: 'তৈরি' },
          redis: { en: 'Open', bn: 'খোলা' }
        },
        title: { en: 'The records room switches its light on', bn: 'রেকর্ডের ঘর আলো জ্বালায়' },
        simple: {
          en: 'Someone is in the records room, but that is not enough. A ready light proves the room can take a record. Only then may the front desk open.',
          bn: 'রেকর্ডের ঘরে কেউ আছে, কিন্তু সেটাই যথেষ্ট নয়। একটা রেডি লাইট প্রমাণ করে ঘরটা রেকর্ড নিতে পারে। তারপরই ফ্রন্ট ডেস্ক খুলতে পারে।'
        },
        story: {
          title: { en: 'Fahim switches the light on', bn: 'ফাহিম আলো জ্বালায়' },
          text: {
            en: 'Fahim is in the room, but Lubna waits for his ready light. He checks that a record can be taken, then switches the light on. Only now may Ayesha open the front desk.',
            bn: 'ফাহিম ঘরে আছে, কিন্তু লুবনা তার রেডি লাইটের জন্য অপেক্ষা করে। সে দেখে একটা রেকর্ড নেওয়া যায়, তারপর আলো জ্বালায়। এবার আয়েশা ফ্রন্ট ডেস্ক খুলতে পারে।'
          }
        },
        tech: {
          en: 'The `db` healthcheck runs `pg_isready`. Exit 0 means Postgres accepts connections. Exit 1 means it is refusing them, which is normal while it starts. Status moves from `starting` to `healthy` after a pass. `redis` has no healthcheck, so `service_started` is enough.',
          bn: '`db`-এর healthcheck `pg_isready` চালায়। exit 0 মানে Postgres connection নিচ্ছে। exit 1 মানে সে ফিরিয়ে দিচ্ছে, যা শুরুর সময় স্বাভাবিক। একটা check পাস করলে status `starting` থেকে `healthy` হয়। `redis`-এর healthcheck নেই, তাই `service_started`-ই যথেষ্ট।'
        }
      },
      {
        id: 'start-api',
        work: { node: 'api', kind: 'result' },
        state: { api: { en: 'Port 8000 published', bn: 'Port 8000 খোলা' } },
        plainState: { api: { en: 'Door is open', bn: 'দরজা খোলা' } },
        title: { en: 'The front desk opens the street door', bn: 'ফ্রন্ট ডেস্ক রাস্তার দরজা খোলে' },
        simple: {
          en: 'The records room is ready, so the front desk may open. It is the only room with a door onto the street. The other rooms stay off the street.',
          bn: 'রেকর্ডের ঘর তৈরি, তাই ফ্রন্ট ডেস্ক খুলতে পারে। রাস্তায় দরজা আছে শুধু এই ঘরের। বাকি ঘরগুলো রাস্তা থেকে আড়ালে থাকে।'
        },
        story: {
          title: { en: 'Ayesha opens the street door', bn: 'আয়েশা রাস্তার দরজা খোলে' },
          text: {
            en: 'The light is on, so Ayesha opens the front desk. Hers is the only door onto the street. Fahim’s room and the others stay off the street, down the hallway.',
            bn: 'আলো জ্বলছে, তাই আয়েশা ফ্রন্ট ডেস্ক খোলে। রাস্তায় দরজা শুধু তারটাই। ফাহিমের ঘর আর বাকিরা হলঘরের ভেতরে থাকে, রাস্তা থেকে আড়ালে।'
          }
        },
        tech: {
          en: 'With `condition: service_healthy`, Compose starts `api` only after `db` is healthy. The service sets `ports: "8000:8000"`, so host port 8000 reaches container port 8000. `db` and `redis` publish nothing.',
          bn: '`condition: service_healthy` থাকলে `db` healthy হওয়ার পরেই Compose `api` চালু করে। service-এ `ports: "8000:8000"` আছে, তাই host-এর port 8000 container-এর port 8000-এ পৌঁছায়। `db` আর `redis` কিছুই publish করে না।'
        }
      },
      {
        id: 'start-worker',
        work: { node: 'worker', kind: 'result' },
        state: { worker: { en: 'Same image, own command', bn: 'একই image, নিজের command' } },
        plainState: { worker: { en: 'Same plan, other job', bn: 'একই পরিকল্পনা, অন্য কাজ' } },
        title: { en: 'The back room opens too', bn: 'পেছনের ঘরও খোলে' },
        simple: {
          en: 'The back room opens next. It was drawn from the same plan as the front desk, but the plan gives it a different job, out of sight of the street.',
          bn: 'এরপর পেছনের ঘর খোলে। সে ফ্রন্ট ডেস্কের মতো একই পরিকল্পনা থেকে আঁকা, কিন্তু পরিকল্পনা তাকে আলাদা একটা কাজ দেয়, রাস্তার আড়ালে।'
        },
        story: {
          title: { en: 'The back room opens', bn: 'পেছনের ঘর খোলে' },
          text: {
            en: 'The back room opens next. It was set up from the same plan as Ayesha’s desk, but Lubna gave it a different job, hidden from the street.',
            bn: 'এরপর পেছনের ঘর খোলে। সে আয়েশার ডেস্কের মতো একই পরিকল্পনা থেকে সাজানো, কিন্তু লুবনা তাকে আলাদা কাজ দিয়েছে, রাস্তা থেকে লুকানো।'
          }
        },
        tech: {
          en: '`worker` uses the same image as `api`. Its `command` replaces the image `CMD`, for example `celery -A app.worker worker`. Both reach `db` and `redis` by name on the project network.',
          bn: '`worker` `api`-র মতো একই image ব্যবহার করে। তার `command` image-এর `CMD` বদলে দেয়, যেমন `celery -A app.worker worker`। দুজনেই project network-এ নাম ধরে `db` আর `redis`-এ পৌঁছায়।'
        }
      },
      {
        id: 'open-port',
        moves: [ { edge: 'dev-api', label: 'localhost:8000', plain: { en: 'The street door', bn: 'রাস্তার দরজা' } } ],
        title: { en: 'You use the one street door', bn: 'আপনি একমাত্র রাস্তার দরজা ব্যবহার করেন' },
        simple: {
          en: 'You walk in off the street and reach only the front desk. There is no street door on the records room, the notice board, or the back room.',
          bn: 'আপনি রাস্তা থেকে ঢুকে শুধু ফ্রন্ট ডেস্কে পৌঁছান। রেকর্ডের ঘরে, নোটিশ বোর্ডে, বা পেছনের ঘরে রাস্তার কোনো দরজা নেই।'
        },
        story: {
          title: { en: 'Lubna walks in off the street', bn: 'লুবনা রাস্তা থেকে ঢোকে' },
          text: {
            en: 'Lubna walks in off the street. The only door she can use leads to Ayesha. There is no street door on Fahim’s room, the board, or the back room.',
            bn: 'লুবনা রাস্তা থেকে হেঁটে ঢোকে। যে একটা দরজা সে ব্যবহার করতে পারে, সেটা আয়েশার কাছে যায়। ফাহিমের ঘরে, বোর্ডে, বা পেছনের ঘরে রাস্তার দরজা নেই।'
          }
        },
        tech: {
          en: '`ports: "8000:8000"` publishes container port 8000 on the host, so `localhost:8000` reaches `api`. With no host IP, Docker publishes on every interface. The host has no route to `db` or `redis`.',
          bn: '`ports: "8000:8000"` container-এর port 8000 host-এ publish করে, তাই `localhost:8000` দিয়ে `api`-তে পৌঁছানো যায়। host IP না দিলে Docker সব interface-এ publish করে। host-এর `db` বা `redis`-এ কোনো রাস্তা নেই।'
        }
      },
      {
        id: 'find-db',
        moves: [ { edge: 'api-db', label: 'db:5432', plain: { en: 'By room name', bn: 'ঘরের নাম ধরে' } } ],
        title: { en: 'The front desk calls by name', bn: 'ফ্রন্ট ডেস্ক নাম ধরে ডাকে' },
        simple: {
          en: 'The front desk needs the records, so it calls the records room by the name on the door. The call stays inside the hallway. No street address is used.',
          bn: 'ফ্রন্ট ডেস্কের রেকর্ড দরকার, তাই সে রেকর্ডের ঘরকে দরজায় লেখা নাম ধরে ডাকে। ডাকটা হলঘরের ভেতরেই থাকে। রাস্তার কোনো ঠিকানা লাগে না।'
        },
        story: {
          title: { en: 'Ayesha calls Fahim by name', bn: 'আয়েশা ফাহিমকে নাম ধরে ডাকে' },
          text: {
            en: 'Ayesha needs a record, so she calls Fahim by the name on his door. The call stays in the hallway. She never uses a street address.',
            bn: 'আয়েশার একটা রেকর্ড দরকার, তাই সে ফাহিমকে তার দরজার নাম ধরে ডাকে। ডাকটা হলঘরেই থাকে। সে কখনো রাস্তার ঠিকানা ব্যবহার করে না।'
          }
        },
        tech: {
          en: 'DNS on the project network resolves `db` to that container, so `api` connects to `db:5432`. Use the container port, not a published host port. `ports` plays no part in this call. A typical URL is `postgresql://app:pw@db:5432/app`.',
          bn: 'project network-এর DNS `db` নামটা সেই container-এর সাথে মিলায়, তাই `api` `db:5432`-এ connect করে। container port ব্যবহার করুন, published host port নয়। এই ডাকে `ports`-এর কোনো ভূমিকা নেই। একটা সাধারণ URL: `postgresql://app:pw@db:5432/app`।'
        }
      },
      {
        id: 'queue-job',
        moves: [ { edge: 'api-redis', label: 'enqueue job', plain: { en: 'A slow note', bn: 'একটা ধীর নোট' } } ],
        title: { en: 'A slow note goes on the board', bn: 'ধীর একটা নোট বোর্ডে ওঠে' },
        simple: {
          en: 'A visitor asks for something slow. The front desk does not do it. It pins a note on the notice board and turns back to the street door.',
          bn: 'এক দর্শক একটা ধীর কাজ চায়। ফ্রন্ট ডেস্ক সেটা নিজে করে না। সে নোটিশ বোর্ডে একটা নোট গেঁথে আবার রাস্তার দরজার দিকে ফেরে।'
        },
        story: {
          title: { en: 'Ayesha pins a note', bn: 'আয়েশা একটা নোট গাঁথে' },
          text: {
            en: 'A visitor asks for something slow. Ayesha does not do it herself. She pins a note on the board and turns back to the person at the street door.',
            bn: 'এক দর্শক একটা ধীর কাজ চায়। আয়েশা সেটা নিজে করে না। সে বোর্ডে একটা নোট গেঁথে আবার রাস্তার দরজায় দাঁড়ানো মানুষটার দিকে ফেরে।'
          }
        },
        tech: {
          en: '`api` pushes the job to Redis at `redis://redis:6379`. The host is the service name, and 6379 is the default Redis port. Celery calls this store the broker, the go-between from the app to the worker.',
          bn: '`api` কাজটা Redis-এ `redis://redis:6379` ঠিকানায় ঢোকায়। host হলো service-এর নাম, আর 6379 Redis-এর ডিফল্ট port। Celery এই store-কে বলে broker, app থেকে worker-এর মাঝের সেতু।'
        }
      },
      {
        id: 'pick-up',
        moves: [ { edge: 'redis-worker', label: 'dequeue job', plain: { en: 'Note taken', bn: 'নোট নেওয়া হলো' } } ],
        title: { en: 'The back room takes the note', bn: 'পেছনের ঘর নোটটা নেয়' },
        simple: {
          en: 'The back room reads the notice board, takes the note down, and does the slow work. The front desk stays free for the next person at the street door.',
          bn: 'পেছনের ঘর নোটিশ বোর্ড পড়ে, নোটটা নামায়, আর ধীর কাজটা করে। ফ্রন্ট ডেস্ক রাস্তার দরজায় পরের মানুষটার জন্য ফাঁকা থাকে।'
        },
        story: {
          title: { en: 'The back room takes the note', bn: 'পেছনের ঘর নোটটা নেয়' },
          text: {
            en: 'The back room reads the board, takes the note, and does the slow work. Ayesha stays free for the next person who walks in off the street.',
            bn: 'পেছনের ঘর বোর্ড পড়ে, নোট নেয়, আর ধীর কাজটা করে। রাস্তা থেকে যে পরের মানুষ ঢুকবে, আয়েশা তার জন্য ফাঁকা থাকে।'
          }
        },
        tech: {
          en: 'The worker reads Redis by the name `redis` and runs the job. Redis only holds it. The slow work happens in `worker`, so `api` stays free. Add copies with `--scale worker=3`.',
          bn: 'worker `redis` নাম ধরে Redis থেকে কাজটা পড়ে আর চালায়। Redis শুধু কাজটা ধরে রাখে। ধীর কাজ হয় `worker`-এ, তাই `api` ফাঁকা থাকে। `--scale worker=3` দিয়ে কপি বাড়ানো যায়।'
        }
      },
      {
        id: 'persist',
        moves: [ { edge: 'db-volume', label: 'write data', plain: { en: 'File it outside', bn: 'বাইরে জমা করুন' } } ],
        state: { volume: { en: 'Kept after down', bn: 'down-এর পরেও থাকে' } },
        plainState: { volume: { en: 'Files stay', bn: 'ফাইল থেকে যায়' } },
        title: { en: 'The records leave the room', bn: 'রেকর্ড ঘরের বাইরে যায়' },
        simple: {
          en: 'The records are filed in a cabinet fixed outside the room. Lock the rooms for the night and the cabinet stays. Only a deliberate clear throws it out.',
          bn: 'রেকর্ড জমা হয় ঘরের বাইরে আটকানো একটা আলমারিতে। রাতের জন্য ঘর তালাবন্ধ করলেও আলমারি থাকে। ইচ্ছে করে মুছলে তবেই সেটা যায়।'
        },
        story: {
          title: { en: 'The cabinet keeps the files', bn: 'আলমারি ফাইল ধরে রাখে' },
          text: {
            en: 'At the end of the day the records go into a cabinet fixed outside Fahim’s room. The rooms can be locked. The cabinet stays, unless Lubna chooses to clear it.',
            bn: 'দিনের শেষে রেকর্ড যায় ফাহিমের ঘরের বাইরে আটকানো আলমারিতে। ঘর তালাবন্ধ করা যায়। আলমারি থেকে যায়, যদি না লুবনা ইচ্ছে করে সেটা মুছে ফেলে।'
          }
        },
        tech: {
          en: '`db` writes to a named volume such as `pgdata`, stored outside the container. `docker compose down` removes containers and the network but keeps named volumes. `docker compose down -v` deletes them too.',
          bn: '`db` একটা named volume-এ লেখে, যেমন `pgdata`, যেটা container-এর বাইরে থাকে। `docker compose down` container আর network সরায়, named volume রাখে। `docker compose down -v` সেগুলোও মুছে ফেলে।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'localhost-bug',
      label: { en: 'It looks in its own room', bn: 'সে নিজের ঘরেই খোঁজে' },
      whatIf: {
        en: 'What if the front desk looks for the records in its own room?',
        bn: 'ফ্রন্ট ডেস্ক যদি রেকর্ড নিজের ঘরেই খোঁজে?'
      },
      branchAfter: 'open-port',
      steps: [
        {
          id: 'try-localhost',
          work: { node: 'api', kind: 'request' },
          state: { api: { en: 'Tries localhost', bn: 'localhost-এ খোঁজে' } },
          plainState: { api: { en: 'Checks own room', bn: 'নিজের ঘর দেখে' } },
          title: { en: 'It looks inside its own room', bn: 'সে নিজের ঘরের ভেতরে খোঁজে' },
          simple: {
            en: 'The front desk was told the records are right here, which means its own room. It looks around. The only thing in that room is itself.',
            bn: 'ফ্রন্ট ডেস্ককে বলা হয়েছে রেকর্ড আছে ঠিক এখানে, মানে তার নিজের ঘরে। সে চারপাশে তাকায়। ওই ঘরে আছে শুধু সে নিজে।'
          },
          story: {
            title: { en: 'Ayesha searches her own room', bn: 'আয়েশা নিজের ঘরে খোঁজে' },
            text: {
              en: 'Someone told Ayesha the records were in here. She searches her own room. The only person in it is her, and she keeps no records.',
              bn: 'কেউ আয়েশাকে বলেছে রেকর্ড আছে এখানে। সে নিজের ঘরে খোঁজে। ভেতরে একমাত্র মানুষ সে নিজে, আর তার কাছে কোনো রেকর্ড নেই।'
            }
          },
          tech: {
            en: 'The app dials `localhost:5432`. Inside a container, `localhost` is that container’s own loopback: each container has its own network namespace. Postgres runs in `db`, so nothing listens on 5432 inside `api`.',
            bn: 'app `localhost:5432`-এ ডায়াল করে। container-এর ভেতরে `localhost` মানে সেই container-এর নিজের loopback: প্রতিটি container-এর নিজের network namespace আছে। Postgres চলে `db`-তে, তাই `api`-এর ভেতরে 5432-তে কেউ শোনে না।'
          }
        },
        {
          id: 'refused',
          work: { node: 'api', kind: 'error' },
          state: { api: { en: 'Connection refused', bn: 'connection refused' } },
          plainState: { api: { en: 'Nobody answers', bn: 'কেউ সাড়া দেয় না' } },
          title: { en: 'No wire leaves the room', bn: 'ঘর থেকে কোনো তার বেরোয় না' },
          simple: {
            en: 'Nothing in that room keeps records, so nobody answers and the front desk stops with an error. The records were down the hallway, under their own room name.',
            bn: 'ওই ঘরে রেকর্ড রাখে এমন কিছু নেই, তাই কেউ সাড়া দেয় না আর ফ্রন্ট ডেস্ক একটা error নিয়ে থেমে যায়। রেকর্ড ছিল হলঘরের শেষে, নিজের ঘরের নামে।'
          },
          story: {
            title: { en: 'Nobody in the room answers', bn: 'ঘরে কেউ সাড়া দেয় না' },
            text: {
              en: 'Nobody answers. Ayesha stops, stuck. Lubna looks at the plan and sighs: Fahim is down the hallway, and Ayesha only had to say his room’s name.',
              bn: 'কেউ সাড়া দেয় না। আয়েশা আটকে থেমে যায়। লুবনা পরিকল্পনা দেখে দীর্ঘশ্বাস ফেলে: ফাহিম হলঘরের শেষে, আয়েশাকে শুধু তার ঘরের নাম বলতে হতো।'
            }
          },
          tech: {
            en: 'The connection is refused because port 5432 is closed inside `api`. The fix is the service name, `db:5432`. `localhost` reaches a published port from the host, or another process in the same container.',
            bn: 'connection refused হয় কারণ `api`-এর ভেতরে port 5432 বন্ধ। সমাধান হলো service-এর নাম, `db:5432`। `localhost` কাজ করে host থেকে একটা published port-এ, অথবা একই container-এর অন্য process-এ।'
          }
        }
      ]
    },
    {
      id: 'too-early',
      label: { en: 'The records are not ready', bn: 'রেকর্ড তৈরি নয়' },
      whatIf: {
        en: 'What if the front desk opens before the records room is ready?',
        bn: 'রেকর্ডের ঘর তৈরি হওয়ার আগেই যদি ফ্রন্ট ডেস্ক খোলে?'
      },
      branchAfter: 'start-deps',
      steps: [
        {
          id: 'api-early',
          work: { node: 'api', kind: 'request' },
          state: { db: { en: 'Still starting', bn: 'এখনো শুরু হচ্ছে' } },
          plainState: { db: { en: 'Still waking', bn: 'এখনো জাগছে' } },
          title: { en: 'The front desk opens too soon', bn: 'ফ্রন্ট ডেস্ক বড্ড আগে খোলে' },
          simple: {
            en: 'The plan waits only until someone is inside, not until the ready light is on. The front desk opens while the records are still being set out.',
            bn: 'পরিকল্পনা শুধু কেউ ভেতরে আসা পর্যন্ত অপেক্ষা করে, রেডি লাইট জ্বলা পর্যন্ত নয়। রেকর্ড তখনো সাজানো হচ্ছে, অথচ ফ্রন্ট ডেস্ক খুলে যায়।'
          },
          story: {
            title: { en: 'Ayesha opens too soon', bn: 'আয়েশা বড্ড আগে খোলে' },
            text: {
              en: 'This time the plan forgets the ready light. It only waits until Fahim is in the room, so Ayesha opens the front desk while he is still setting the records out.',
              bn: 'এবার পরিকল্পনায় রেডি লাইটের কথা নেই। সে শুধু ফাহিম ঘরে আসা পর্যন্ত অপেক্ষা করে, তাই ফাহিম যখন রেকর্ড সাজাচ্ছে তখনই আয়েশা ফ্রন্ট ডেস্ক খুলে ফেলে।'
            }
          },
          tech: {
            en: 'With no `condition`, `depends_on` waits only until the `db` container is running, not until Postgres accepts connections. `pg_isready` would still exit 1 (refusing) or 2 (no response).',
            bn: '`condition` ছাড়া `depends_on` শুধু `db` container চালু হওয়া পর্যন্ত অপেক্ষা করে, Postgres connection নেওয়া পর্যন্ত নয়। `pg_isready` তখনো exit 1 (ফিরিয়ে দিচ্ছে) বা 2 (সাড়া নেই) দিত।'
          }
        },
        {
          id: 'api-crash',
          work: { node: 'api', kind: 'error' },
          state: { api: { en: 'db not ready', bn: 'db তৈরি নয়' } },
          plainState: { api: { en: 'Records not ready', bn: 'রেকর্ড তৈরি নয়' } },
          title: { en: 'The first call fails', bn: 'প্রথম ডাকেই গোলমাল' },
          simple: {
            en: 'The front desk calls the records room, but it is not ready, so the first call fails. Unless the desk knows to try again, it closes.',
            bn: 'ফ্রন্ট ডেস্ক রেকর্ডের ঘরকে ডাকে, কিন্তু সে তৈরি নয়, তাই প্রথম ডাকেই গোলমাল হয়। আবার চেষ্টা করতে না জানলে ডেস্ক বন্ধ হয়ে যায়।'
          },
          story: {
            title: { en: 'The first call fails', bn: 'প্রথম ডাকেই গোলমাল' },
            text: {
              en: 'Ayesha calls for a record, but Fahim is not ready, so the first call fails. Unless she knows to try again, she closes the desk. Lubna adds the ready light to the plan.',
              bn: 'আয়েশা একটা রেকর্ড চায়, কিন্তু ফাহিম তৈরি নয়, তাই প্রথম ডাকেই গোলমাল হয়। আবার চেষ্টা করতে না জানলে সে ডেস্ক বন্ধ করে। লুবনা পরিকল্পনায় রেডি লাইট যোগ করে।'
            }
          },
          tech: {
            en: 'The first connection to `db:5432` fails because Postgres is not accepting connections yet, so the app errors and may exit. Add `condition: service_healthy`, and let the app retry in case `db` restarts later.',
            bn: '`db:5432`-এ প্রথম connection ব্যর্থ হয়, কারণ Postgres এখনো connection নিচ্ছে না, তাই app error তোলে আর বন্ধ হয়ে যেতে পারে। `condition: service_healthy` যোগ করুন, আর `db` পরে restart হলে app যেন আবার চেষ্টা করে।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'An office floor runs from one plan. The rooms share a private hallway, only the front desk opens onto the street, and the filing cabinet is fixed outside.',
      bn: 'একটা অফিস ফ্লোর চলে একটা পরিকল্পনা দিয়ে। ঘরগুলো একটা ব্যক্তিগত হলঘর ভাগ করে, রাস্তায় খোলে শুধু ফ্রন্ট ডেস্ক, আর ফাইলের আলমারি বাইরে আটকানো।'
    },
    twins: [
      {
        icon: 'user',
        node: 'dev',
        name: { en: 'You', bn: 'আপনি' },
        d: {
          en: 'Stands on the street and says start.',
          bn: 'রাস্তায় দাঁড়িয়ে শুরু বলে।'
        }
      },
      {
        icon: 'task',
        node: 'compose',
        name: { en: 'The plan', bn: 'পরিকল্পনা' },
        d: {
          en: 'Names every room, the hallway, and the cabinet.',
          bn: 'প্রতিটি ঘর, হলঘর, আর আলমারির নাম লেখে।'
        }
      },
      {
        icon: 'server',
        node: 'api',
        name: { en: 'The front desk', bn: 'ফ্রন্ট ডেস্ক' },
        d: {
          en: 'The only room with a door onto the street.',
          bn: 'রাস্তায় দরজা আছে এমন একমাত্র ঘর।'
        }
      },
      {
        icon: 'store',
        node: 'db',
        name: { en: 'The records room', bn: 'রেকর্ডের ঘর' },
        d: {
          en: 'Must show a ready light before the front desk opens.',
          bn: 'ফ্রন্ট ডেস্ক খোলার আগে রেডি লাইট জ্বালাতে হয়।'
        }
      },
      {
        icon: 'queue',
        node: 'redis',
        name: { en: 'The notice board', bn: 'নোটিশ বোর্ড' },
        d: {
          en: 'Slow notes wait here until the back room has time.',
          bn: 'ধীর নোট এখানে অপেক্ষা করে, যতক্ষণ না পেছনের ঘর সময় পায়।'
        }
      },
      {
        icon: 'worker',
        node: 'worker',
        name: { en: 'The back room', bn: 'পেছনের ঘর' },
        d: {
          en: 'Takes notes off the board and does the slow work out of sight.',
          bn: 'বোর্ড থেকে নোট নেয় আর আড়ালে ধীর কাজটা করে।'
        }
      },
      {
        icon: 'archive',
        node: 'volume',
        name: { en: 'The filing cabinet', bn: 'ফাইলের আলমারি' },
        d: {
          en: 'Stays put when the rooms are locked for the night.',
          bn: 'রাতের জন্য ঘর তালাবন্ধ হলেও নিজের জায়গায় থাকে।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Wrong room', bn: 'ভুল ঘর' },
        is: { en: 'a connection refused error', bn: 'একটা connection refused error' },
        d: {
          en: 'The front desk looks for the records in its own room and finds nobody, because the records are down the hallway under their own name.',
          bn: 'ফ্রন্ট ডেস্ক রেকর্ড নিজের ঘরে খোঁজে আর কাউকে পায় না, কারণ রেকর্ড আছে হলঘরের শেষে, নিজের নামে।'
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
