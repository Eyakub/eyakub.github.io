import type { Topic } from '../types'
import { UI } from '../ui'

export const nginx: Topic = {
  slug: 'nginx',
  line: 'devops',
  title: { en: 'Nginx reverse proxy', bn: 'Nginx reverse proxy' },
  summary: {
    en: 'How Nginx sits in front of your app: it ends HTTPS, hands out static files, and shares requests between app servers.',
    bn: 'Nginx কীভাবে আপনার app-এর সামনে বসে: HTTPS শেষ করে, static file নিজে দেয়, আর request ভাগ করে দেয় app server-গুলোর মধ্যে।'
  },
  hook: {
    en: 'Every visitor meets one mailroom first, so it can open the envelopes, hand out brochures and share letters between desks.',
    bn: 'প্রত্যেক দর্শনার্থী আগে একটা মেইলরুমের সামনে পড়ে, তাই সে খাম খুলতে, ব্রোশিওর দিতে আর চিঠি ডেস্কগুলোর মধ্যে ভাগ করে দিতে পারে।'
  },
  story: {
    cast: {
      en: 'Shirin sends letters to a company, where Imran runs the mailroom and the brochure rack, and Mahir and Rokeya answer letters at the two department desks.',
      bn: 'শিরিন একটা কোম্পানিকে চিঠি পাঠায়, যেখানে ইমরান মেইলরুম আর ব্রোশিওরের তাক চালায়, আর মাহির ও রোকেয়া দুটো বিভাগীয় ডেস্কে চিঠির উত্তর দেয়।'
    }
  },
  takeaway: {
    en: 'One mailroom can hand out brochures itself and share the letters, so desks can come and go behind it.',
    bn: 'একটা মেইলরুম ব্রোশিওর নিজেই দিতে পারে আর চিঠি ভাগ করে দিতে পারে, তাই ডেস্কগুলো পেছনে আসা-যাওয়া করতে পারে।'
  },
  words: [
    {
      term: { en: 'Mailroom (Nginx, reverse proxy)', bn: 'মেইলরুম (Nginx, reverse proxy)' },
      d: {
        en: 'The site’s front door: it hands out simple mail itself and passes the rest inward.',
        bn: 'সাইটের সদর দরজা: সহজ ডাক নিজে দেয়, বাকিটা ভেতরে পাঠায়।'
      }
    },
    {
      term: { en: 'Department desks (app servers)', bn: 'বিভাগীয় ডেস্ক (app server)' },
      d: {
        en: 'Identical copies of your program, each able to answer any letter.',
        bn: 'আপনার প্রোগ্রামের একই রকম কপি, প্রতিটিই যেকোনো চিঠির উত্তর দিতে পারে।'
      }
    },
    {
      term: { en: 'Brochure rack (static files)', bn: 'ব্রোশিওরের তাক (static file)' },
      d: {
        en: 'Pictures and pages that never change, so the mailroom hands them out itself.',
        bn: 'যে ছবি আর পাতা বদলায় না, তাই মেইলরুম নিজেই সেগুলো দিয়ে দেয়।'
      }
    },
    {
      term: { en: 'Sealed envelope (HTTPS)', bn: 'সিল করা খাম (HTTPS)' },
      d: {
        en: 'A letter scrambled so nobody on the road can read it.',
        bn: 'গুলিয়ে মুড়ে দেওয়া চিঠি, যাতে পথে কেউ পড়তে না পারে।'
      }
    },
    {
      term: { en: 'Taking turns (round-robin)', bn: 'পালা করে দেওয়া (round-robin)' },
      d: {
        en: 'Each new letter goes to the next desk in line, then back to the first.',
        bn: 'প্রতিটি নতুন চিঠি লাইনের পরের ডেস্কে যায়, শেষে আবার প্রথমটায় ফেরে।'
      }
    }
  ],
  legend: {
    request: { en: 'A letter going in', bn: 'ভেতরে যাওয়া চিঠি' },
    queue: { en: 'Stuck waiting', bn: 'আটকে থাকা অপেক্ষা' },
    result: { en: 'A reply coming back', bn: 'ফিরে আসা উত্তর' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 900, 400 ], narrow: [ 400, 440 ] },
  nodeR: { narrow: 20 },
  nodes: {
    client: {
      icon: 'user',
      name: { en: 'Browser', bn: 'ব্রাউজার' },
      sub: { en: 'Sends requests', bn: 'রিকোয়েস্ট পাঠায়' },
      plain: {
        name: { en: 'You', bn: 'আপনি' },
        sub: { en: 'Posting letters', bn: 'চিঠি পোস্ট করছেন' }
      },
      wide: [ 80, 215, 'down' ],
      narrow: [ 150, 45, 'left' ]
    },
    nginx: {
      icon: 'mail',
      name: { en: 'Nginx', bn: 'Nginx' },
      sub: { en: 'Reverse proxy', bn: 'Reverse proxy' },
      plain: {
        name: { en: 'Mailroom', bn: 'মেইলরুম' },
        sub: { en: 'Sorts the post', bn: 'ডাক বাছাই করে' }
      },
      wide: [ 320, 215, 'down' ],
      narrow: [ 150, 150, 'right' ]
    },
    static: {
      icon: 'folder',
      name: { en: 'Static files', bn: 'Static file' },
      sub: { en: 'Read from disk', bn: 'disk থেকে পড়ে' },
      plain: {
        name: { en: 'Brochure rack', bn: 'ব্রোশিওরের তাক' },
        sub: { en: 'Pictures, pages', bn: 'ছবি, পাতা' }
      },
      wide: [ 320, 75, 'right' ],
      narrow: [ 240, 60, 'right' ]
    },
    app1: {
      icon: 'worker',
      name: { en: 'App server 1', bn: 'App server 1' },
      sub: { en: 'Uvicorn :8001', bn: 'Uvicorn :8001' },
      plain: {
        name: { en: 'Desk 1', bn: 'ডেস্ক ১' },
        sub: { en: 'Answers letters', bn: 'চিঠির উত্তর দেয়' }
      },
      wide: [ 670, 120, 'right' ],
      narrow: [ 60, 315, 'down' ]
    },
    app2: {
      icon: 'worker',
      name: { en: 'App server 2', bn: 'App server 2' },
      sub: { en: 'Uvicorn :8002', bn: 'Uvicorn :8002' },
      plain: {
        name: { en: 'Desk 2', bn: 'ডেস্ক ২' },
        sub: { en: 'Answers letters', bn: 'চিঠির উত্তর দেয়' }
      },
      wide: [ 670, 310, 'right' ],
      narrow: [ 240, 315, 'down' ]
    }
  },
  groups: [
    {
      id: 'upstream',
      label: { en: 'Upstream pool', bn: 'Upstream pool' },
      plain: { en: 'Two department desks', bn: 'দুটো বিভাগীয় ডেস্ক' },
      wide: [ 575, 50, 305, 320 ],
      narrow: [ 15, 270, 355, 150 ]
    }
  ],
  corridors: {
    'client-nginx': { wide: [ [ 80, 215 ], [ 320, 215 ] ], narrow: [ [ 150, 45 ], [ 150, 150 ] ] },
    'nginx-static': { wide: [ [ 320, 215 ], [ 320, 75 ] ], narrow: [ [ 150, 150 ], [ 240, 60 ] ] },
    'nginx-app1': {
      wide: [ [ 320, 215 ], [ 430, 215 ], [ 525, 120 ], [ 670, 120 ] ],
      narrow: [ [ 150, 150 ], [ 150, 225 ], [ 60, 315 ] ]
    },
    'nginx-app2': {
      wide: [ [ 320, 215 ], [ 430, 215 ], [ 525, 310 ], [ 670, 310 ] ],
      narrow: [ [ 150, 150 ], [ 150, 225 ], [ 240, 315 ] ]
    }
  },
  edges: {
    'client-nginx': { from: 'client', to: 'nginx', kind: 'request' },
    'nginx-client': { from: 'nginx', to: 'client', kind: 'result' },
    'nginx-static': { from: 'nginx', to: 'static', kind: 'request' },
    'static-nginx': { from: 'static', to: 'nginx', kind: 'result' },
    'nginx-app1': { from: 'nginx', to: 'app1', kind: 'request' },
    'app1-nginx': { from: 'app1', to: 'nginx', kind: 'result' },
    'nginx-app2': { from: 'nginx', to: 'app2', kind: 'request' },
    'app2-nginx': { from: 'app2', to: 'nginx', kind: 'result' },
    'nginx-client-err': { from: 'nginx', to: 'client', kind: 'error' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'https-in',
        moves: [ { edge: 'client-nginx', label: 'GET /static/logo.png', plain: { en: 'Asking for a logo', bn: 'লোগো চাওয়া' } } ],
        title: { en: 'A letter reaches the mailroom', bn: 'চিঠি মেইলরুমে পৌঁছায়' },
        simple: {
          en: 'You post a letter asking for the company logo. Every letter reaches one place first, the mailroom, so that is where we start.',
          bn: 'আপনি কোম্পানির লোগো চেয়ে একটা চিঠি পোস্ট করেন। প্রতিটি চিঠি আগে একটাই জায়গায় পৌঁছায়, মেইলরুমে, তাই আমরা এখান থেকেই শুরু করি।'
        },
        story: {
          title: { en: 'Shirin posts a letter', bn: 'শিরিন চিঠি পোস্ট করে' },
          text: {
            en: 'Shirin wants to see the company logo, so she posts a letter asking for it. Every letter in this company goes to one place first, the mailroom, where Imran is waiting.',
            bn: 'শিরিন কোম্পানির লোগো দেখতে চায়, তাই সে সেটা চেয়ে একটা চিঠি পোস্ট করে। এই কোম্পানির প্রতিটি চিঠি আগে একটাই জায়গায় যায়, মেইলরুমে, যেখানে ইমরান অপেক্ষা করছে।'
          }
        },
        tech: {
          en: 'The browser sends `GET /static/logo.png` over HTTPS to port 443. Nginx picks a `server` block by its `listen` port and `server_name`, then picks a `location` by longest matching prefix, here `/static/`.',
          bn: 'ব্রাউজার HTTPS দিয়ে port 443-এ `GET /static/logo.png` পাঠায়। Nginx `listen` port আর `server_name` দেখে একটা `server` block বেছে নেয়, তারপর সবচেয়ে লম্বা মিলে যাওয়া prefix ধরে একটা `location` বাছে, এখানে `/static/`।'
        }
      },
      {
        id: 'tls',
        work: { node: 'nginx', kind: 'result' },
        state: { nginx: { en: 'TLS ended here', bn: 'এখানে TLS শেষ' } },
        plainState: { nginx: { en: 'Envelope opened', bn: 'খাম খোলা হয়েছে' } },
        title: { en: 'The mailroom opens the envelope', bn: 'মেইলরুম খাম খোলে' },
        simple: {
          en: 'Your letter came sealed in a secret code. The mailroom opens the envelope itself, so the desks behind it only ever see a plain letter.',
          bn: 'আপনার চিঠি গোপন কোডে মোড়া অবস্থায় এসেছে। মেইলরুম নিজেই খাম খোলে, তাই পেছনের ডেস্কগুলো শুধু সাদামাটা চিঠিই দেখে।'
        },
        story: {
          title: { en: 'Imran opens the envelope', bn: 'ইমরান খাম খোলে' },
          text: {
            en: 'Shirin’s letter arrives sealed in a secret code. Imran opens the envelope at the mailroom door, so Mahir and Rokeya never have to deal with codes. They only ever get plain letters.',
            bn: 'শিরিনের চিঠি গোপন কোডে মোড়া অবস্থায় আসে। ইমরান মেইলরুমের দরজাতেই খাম খোলে, তাই মাহির আর রোকেয়াকে কোড নিয়ে মাথা ঘামাতে হয় না। তারা শুধু সাদামাটা চিঠিই পায়।'
          }
        },
        tech: {
          en: 'This is TLS termination: the `server` block has `listen 443 ssl;` plus `ssl_certificate` and `ssl_certificate_key`. Nginx decrypts here, then `proxy_pass http://backend` talks plain HTTP to the pool. The private key must be readable by the master process.',
          bn: 'এটাই TLS termination: `server` block-এ থাকে `listen 443 ssl;` আর `ssl_certificate` ও `ssl_certificate_key`। Nginx এখানেই decrypt করে, তারপর `proxy_pass http://backend` pool-এর সাথে সাধারণ HTTP-তে কথা বলে। private key master process-কে পড়তে পারতে হবে।'
        }
      },
      {
        id: 'static-in',
        moves: [ { edge: 'nginx-static', label: '/static/logo.png', plain: { en: 'Fetch the logo', bn: 'লোগো আনুন' } } ],
        title: { en: 'The mailroom checks its rack', bn: 'মেইলরুম নিজের তাক দেখে' },
        simple: {
          en: 'The letter only wants the logo, a picture that never changes. So the mailroom reaches for its own brochure rack instead of bothering a desk.',
          bn: 'চিঠিটা শুধু লোগো চায়, যে ছবি কখনো বদলায় না। তাই মেইলরুম কোনো ডেস্ককে বিরক্ত না করে নিজের ব্রোশিওরের তাকে হাত বাড়ায়।'
        },
        story: {
          title: { en: 'Imran checks the rack', bn: 'ইমরান তাক দেখে' },
          text: {
            en: 'Imran reads the letter: Shirin only wants the logo, and that never changes. He does not bother Mahir or Rokeya. He just steps over to his own brochure rack.',
            bn: 'ইমরান চিঠি পড়ে: শিরিন শুধু লোগো চায়, আর সেটা কখনো বদলায় না। সে মাহির বা রোকেয়াকে বিরক্ত করে না। সে শুধু নিজের ব্রোশিওরের তাকের কাছে যায়।'
          }
        },
        tech: {
          en: 'The `/static/` location serves the file straight from disk with `root /var/www;`, so `/static/logo.png` becomes `/var/www/static/logo.png`. No app code runs. `expires 30d;` can add cache headers to such responses.',
          bn: '`/static/` location ফাইলটা সরাসরি disk থেকে দেয় `root /var/www;` দিয়ে, তাই `/static/logo.png` হয়ে যায় `/var/www/static/logo.png`। কোনো app কোড চলে না। `expires 30d;` এমন response-এ cache header যোগ করতে পারে।'
        }
      },
      {
        id: 'static-out',
        moves: [
          { edge: 'static-nginx', label: 'logo.png', plain: { en: 'The logo', bn: 'লোগোটা' } },
          { edge: 'nginx-client', label: 'logo.png', plain: { en: 'The logo', bn: 'লোগোটা' } }
        ],
        title: { en: 'The logo goes straight back', bn: 'লোগো সরাসরি ফেরত যায়' },
        simple: {
          en: 'The mailroom picks the logo off the rack and sends it straight back to you. No desk had to lift a finger.',
          bn: 'মেইলরুম তাক থেকে লোগোটা তুলে সরাসরি আপনার কাছে পাঠিয়ে দেয়। কোনো ডেস্ককে একটা আঙুলও নাড়াতে হয়নি।'
        },
        story: {
          title: { en: 'Shirin gets her logo', bn: 'শিরিন লোগো পায়' },
          text: {
            en: 'Imran slips the logo into an envelope and sends it straight back to Shirin. The whole thing took a moment, and both department desks stayed quiet.',
            bn: 'ইমরান লোগোটা খামে ভরে সরাসরি শিরিনের কাছে ফেরত পাঠায়। পুরো ব্যাপারটা এক মুহূর্তেই শেষ, আর দুটো বিভাগীয় ডেস্কই চুপচাপ থাকে।'
          }
        },
        tech: {
          en: 'Nginx reads the file from disk and answers `200 OK` with the file as the body. The app is never involved, so a busy app server cannot slow this path down.',
          bn: 'Nginx ফাইলটা disk থেকে পড়ে `200 OK` দিয়ে উত্তর দেয়, ফাইলটাই body। app এখানে কখনো জড়ায় না, তাই ব্যস্ত app server এই পথ ধীর করতে পারে না।'
        }
      },
      {
        id: 'api-in',
        moves: [ { edge: 'client-nginx', label: 'GET /api/items', plain: { en: 'Your letter', bn: 'আপনার চিঠি' } } ],
        title: { en: 'A real question arrives', bn: 'একটা আসল প্রশ্ন আসে' },
        simple: {
          en: 'Now you post a second letter, this time asking for the list of items. The mailroom has no brochure for that, so a desk will have to answer.',
          bn: 'এবার আপনি দ্বিতীয় একটা চিঠি পোস্ট করেন, আইটেমের তালিকা চেয়ে। এর জন্য মেইলরুমের কাছে কোনো ব্রোশিওর নেই, তাই কোনো একটা ডেস্ককে উত্তর দিতে হবে।'
        },
        story: {
          title: { en: 'Shirin sends a second letter', bn: 'শিরিনের দ্বিতীয় চিঠি' },
          text: {
            en: 'Shirin posts a second letter, asking for the company’s list of items. There is no brochure for that, so Imran knows one of the desks must answer it.',
            bn: 'শিরিন দ্বিতীয় একটা চিঠি পোস্ট করে, কোম্পানির আইটেমের তালিকা চেয়ে। এর জন্য কোনো ব্রোশিওর নেই, তাই ইমরান বোঝে একটা ডেস্ককেই উত্তর দিতে হবে।'
          }
        },
        tech: {
          en: 'The browser sends `GET /api/items`. No static `location` matches, so the request lands in `location /`, whose `proxy_pass http://backend;` names an `upstream` group, a pool of servers.',
          bn: 'ব্রাউজার `GET /api/items` পাঠায়। কোনো static `location` মেলে না, তাই request গিয়ে পড়ে `location /`-এ, যার `proxy_pass http://backend;` একটা `upstream` group-কে, মানে server-এর একটা pool-কে, দেখায়।'
        }
      },
      {
        id: 'to-app1',
        moves: [ { edge: 'nginx-app1', label: 'proxy_pass', plain: { en: 'Your letter', bn: 'আপনার চিঠি' } } ],
        state: { nginx: { en: 'Round-robin: app1', bn: 'Round-robin: app1' } },
        plainState: { nginx: { en: 'Picked desk 1', bn: 'ডেস্ক ১ বেছেছে' } },
        title: { en: 'The mailroom picks desk 1', bn: 'মেইলরুম ডেস্ক ১ বেছে নেয়' },
        simple: {
          en: 'The mailroom hands your letter to a desk. With two desks, it simply takes turns, and this time it is desk 1.',
          bn: 'মেইলরুম আপনার চিঠি একটা ডেস্কে দেয়। দুটো ডেস্ক থাকলে সে শুধু পালা করে, আর এবার ডেস্ক ১।'
        },
        story: {
          title: { en: 'Imran picks Mahir’s desk', bn: 'ইমরান মাহিরের ডেস্ক বেছে নেয়' },
          text: {
            en: 'Imran has two desks to choose from, so he takes turns. This letter goes to Mahir at desk 1, and he makes a note that Rokeya is next.',
            bn: 'ইমরানের সামনে দুটো ডেস্ক, তাই সে পালা করে দেয়। এই চিঠি যায় ১ নম্বর ডেস্কে মাহিরের কাছে, আর সে খাতায় লিখে রাখে যে এরপর রোকেয়ার পালা।'
          }
        },
        tech: {
          en: 'Nginx picks a server from the `upstream` group, by default with weighted round-robin and `weight=1` each. It also rewrites `Host` to the `proxy_pass` name and sends `Connection: close`; override both with `proxy_set_header`.',
          bn: 'Nginx `upstream` group থেকে একটা server বেছে নেয়, ডিফল্টে weighted round-robin দিয়ে, প্রতিটির `weight=1`। সে `Host`-ও বদলে `proxy_pass`-এর নাম করে দেয় আর `Connection: close` পাঠায়; দুটোই `proxy_set_header` দিয়ে বদলানো যায়।'
        }
      },
      {
        id: 'reply-1',
        moves: [
          { edge: 'app1-nginx', label: '200 + JSON', plain: { en: 'The reply', bn: 'উত্তর' } },
          { edge: 'nginx-client', label: '200 + JSON', plain: { en: 'The reply', bn: 'উত্তর' } }
        ],
        title: { en: 'Desk 1 sends the reply back', bn: 'ডেস্ক ১ উত্তর ফেরত পাঠায়' },
        simple: {
          en: 'Desk 1 writes its reply and sends it back through the mailroom, which passes it on to you. All is well.',
          bn: 'ডেস্ক ১ উত্তর লিখে মেইলরুমের মধ্য দিয়ে ফেরত পাঠায়, আর মেইলরুম সেটা আপনার কাছে এগিয়ে দেয়। সব ঠিক আছে।'
        },
        story: {
          title: { en: 'Mahir answers the letter', bn: 'মাহির চিঠির উত্তর দেয়' },
          text: {
            en: 'Mahir writes the list of items into a reply and sends it back. Imran passes it on to Shirin, and nobody outside ever learns which desk wrote it.',
            bn: 'মাহির আইটেমের তালিকা উত্তরে লিখে ফেরত পাঠায়। ইমরান সেটা শিরিনের কাছে এগিয়ে দেয়, আর বাইরের কেউ কখনো জানে না কোন ডেস্ক এটা লিখেছে।'
          }
        },
        tech: {
          en: 'The app answers `200 OK` with JSON. Nginx buffers the response by default (`proxy_buffering on`), so a slow browser does not hold the app up. Then it sends the reply on to the client.',
          bn: 'app JSON-সহ `200 OK` দিয়ে উত্তর দেয়। Nginx ডিফল্টে response buffer করে (`proxy_buffering on`), তাই ধীর browser app-কে আটকে রাখে না। তারপর সে উত্তরটা client-এর কাছে পাঠায়।'
        }
      },
      {
        id: 'to-app2',
        moves: [
          { edge: 'client-nginx', label: 'GET /api/items', plain: { en: 'Your letter', bn: 'আপনার চিঠি' } },
          { edge: 'nginx-app2', label: 'GET /api/items', plain: { en: 'Your letter', bn: 'আপনার চিঠি' } }
        ],
        state: { nginx: { en: 'Round-robin: app2', bn: 'Round-robin: app2' } },
        plainState: { nginx: { en: 'Picked desk 2', bn: 'ডেস্ক ২ বেছেছে' } },
        title: { en: 'The next letter goes to desk 2', bn: 'পরের চিঠি যায় ডেস্ক ২-এ' },
        simple: {
          en: 'You post another letter. It reaches the mailroom and moves straight on to desk 2, because it is desk 2’s turn.',
          bn: 'আপনি আরেকটা চিঠি পোস্ট করেন। সেটা মেইলরুমে পৌঁছে সরাসরি ডেস্ক ২-এ চলে যায়, কারণ এবার ডেস্ক ২-এর পালা।'
        },
        story: {
          title: { en: 'Rokeya gets the next letter', bn: 'রোকেয়া পরের চিঠি পায়' },
          text: {
            en: 'Shirin posts another letter. Imran checks his notes, sees that it is Rokeya’s turn, and sends the letter straight to desk 2.',
            bn: 'শিরিন আরেকটা চিঠি পোস্ট করে। ইমরান খাতা দেখে বোঝে এবার রোকেয়ার পালা, আর চিঠিটা সোজা ২ নম্বর ডেস্কে পাঠিয়ে দেয়।'
          }
        },
        tech: {
          en: 'Round-robin moves on to the next server in the group. Each request is picked on its own, so successive requests from the same browser can land on different servers. `ip_hash` keeps a client on one server while it is available.',
          bn: 'Round-robin group-এর পরের server-এ এগিয়ে যায়। প্রতিটি request আলাদাভাবে বাছা হয়, তাই একই browser-এর পরপর request ভিন্ন server-এ পড়তে পারে। `ip_hash` একজন client-কে একটা server-এ ধরে রাখে, যতক্ষণ সেটা চালু থাকে।'
        }
      },
      {
        id: 'reply-2',
        moves: [
          { edge: 'app2-nginx', label: '200 + JSON', plain: { en: 'The reply', bn: 'উত্তর' } },
          { edge: 'nginx-client', label: '200 + JSON', plain: { en: 'The reply', bn: 'উত্তর' } }
        ],
        title: { en: 'Desk 2 answers too', bn: 'ডেস্ক ২-ও উত্তর দেয়' },
        simple: {
          en: 'Desk 2 answers, and the reply comes back to you the same way. The two desks now share the work.',
          bn: 'ডেস্ক ২ উত্তর দেয়, আর উত্তর একই পথে আপনার কাছে ফেরে। দুটো ডেস্ক এখন কাজ ভাগ করে নিচ্ছে।'
        },
        story: {
          title: { en: 'The desks share the work', bn: 'ডেস্কগুলো কাজ ভাগ করে' },
          text: {
            en: 'Rokeya answers, and the reply goes back to Shirin. All morning Imran hands out brochures himself and shares the real questions between his two desks.',
            bn: 'রোকেয়া উত্তর দেয়, আর সেটা ফিরে যায় শিরিনের কাছে। সারা সকাল ইমরান ব্রোশিওর নিজে দেয় আর আসল প্রশ্নগুলো দুই ডেস্কে ভাগ করে দেয়।'
          }
        },
        tech: {
          en: 'App server 2 replies and the answer returns through Nginx. Adding a third server means one more `server` line in the `upstream` block, then `nginx -t` and `nginx -s reload`.',
          bn: 'App server 2 উত্তর দেয় আর উত্তরটা Nginx হয়ে ফেরে। তৃতীয় server যোগ করতে `upstream` block-এ আরেকটা `server` লাইন লাগে, তারপর `nginx -t` আর `nginx -s reload`।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'all-down',
      label: { en: 'Every desk is closed', bn: 'সব ডেস্ক বন্ধ' },
      whatIf: {
        en: 'What if every desk is closed when the mailroom calls?',
        bn: 'মেইলরুম ডাকতে গেলে যদি সব ডেস্ক বন্ধ থাকে?'
      },
      branchAfter: 'api-in',
      steps: [
        {
          id: 'desks-closed',
          work: { node: [ 'app1', 'app2' ], kind: 'error' },
          state: { app1: { en: 'Not listening', bn: 'সাড়া নেই' }, app2: { en: 'Not listening', bn: 'সাড়া নেই' } },
          plainState: { app1: { en: 'Lights off', bn: 'আলো নেভানো' }, app2: { en: 'Lights off', bn: 'আলো নেভানো' } },
          title: { en: 'Both desks are closed', bn: 'দুটো ডেস্কই বন্ধ' },
          simple: {
            en: 'The mailroom tries desk 1, then desk 2, but both have their lights off. Nobody is there to read your letter.',
            bn: 'মেইলরুম ডেস্ক ১ চেষ্টা করে, তারপর ডেস্ক ২, কিন্তু দুটোরই আলো নেভানো। আপনার চিঠি পড়ার মতো কেউ নেই।'
          },
          story: {
            title: { en: 'Both desks are dark', bn: 'দুটো ডেস্কই অন্ধকার' },
            text: {
              en: 'Imran walks to Mahir’s desk, and the lights are off. He tries Rokeya’s desk, and it is dark too. Today there is nobody who can answer Shirin’s letter.',
              bn: 'ইমরান মাহিরের ডেস্কে যায়, আলো নেভানো। সে রোকেয়ার ডেস্কেও চেষ্টা করে, সেটাও অন্ধকার। আজ শিরিনের চিঠির উত্তর দেওয়ার মতো কেউ নেই।'
            }
          },
          tech: {
            en: 'Each connection is refused, which counts as an `error` under the default `proxy_next_upstream error timeout`. Nginx tries the next server, finds it down too, and runs out of servers. Each failure also counts toward `max_fails`.',
            bn: 'প্রতিটি connection refused হয়, আর ডিফল্ট `proxy_next_upstream error timeout`-এ সেটা `error` ধরা হয়। Nginx পরের server-এ চেষ্টা করে, সেটাও বন্ধ পায়, আর server ফুরিয়ে যায়। প্রতিটি ব্যর্থতা `max_fails`-এও গোনা হয়।'
          }
        },
        {
          id: 'bad-gateway',
          moves: [ { edge: 'nginx-client-err', label: '502 Bad Gateway', plain: { en: 'Every desk closed', bn: 'সব ডেস্ক বন্ধ' } } ],
          title: { en: 'The mailroom sends a note', bn: 'মেইলরুম একটা নোট পাঠায়' },
          simple: {
            en: 'With no desk to ask, the mailroom sends you a short note instead: sorry, nobody could answer your letter today.',
            bn: 'জিজ্ঞেস করার মতো কোনো ডেস্ক নেই, তাই মেইলরুম উত্তরের বদলে আপনাকে ছোট একটা নোট পাঠায়: দুঃখিত, আজ কেউ আপনার চিঠির উত্তর দিতে পারল না।'
          },
          story: {
            title: { en: 'Imran writes Shirin a note', bn: 'ইমরান শিরিনকে নোট লেখে' },
            text: {
              en: 'With both desks dark, Imran writes Shirin a short note: sorry, nobody could answer today. The brochure rack still works, so the logo letter would have been fine.',
              bn: 'দুটো ডেস্কই অন্ধকার, তাই ইমরান শিরিনকে ছোট একটা নোট লেখে: দুঃখিত, আজ কেউ উত্তর দিতে পারল না। ব্রোশিওরের তাক তবু চালু, তাই লোগোর চিঠি ঠিকই চলত।'
            }
          },
          tech: {
            en: 'With every server failed, nginx itself answers `502 Bad Gateway`, its default status for an upstream failure. RFC 9110 defines 502 as a gateway getting an invalid response from an inbound server. Static files still work, since they skip the app.',
            bn: 'সব server ব্যর্থ হলে nginx নিজেই `502 Bad Gateway` দেয়, upstream ব্যর্থতার জন্য এটাই তার ডিফল্ট status। RFC 9110 অনুযায়ী 502 মানে gateway কোনো inbound server থেকে invalid response পেয়েছে। static file তবু চলে, কারণ সেগুলো app-কে এড়িয়ে যায়।'
          }
        }
      ]
    },
    {
      id: 'one-down',
      label: { en: 'One desk is closed', bn: 'একটা ডেস্ক বন্ধ' },
      whatIf: {
        en: 'What if desk 1 is closed when the mailroom calls?',
        bn: 'মেইলরুম ডাকতে গেলে যদি ডেস্ক ১ বন্ধ থাকে?'
      },
      branchAfter: 'api-in',
      steps: [
        {
          id: 'desk1-closed',
          work: { node: 'app1', kind: 'error' },
          state: { app1: { en: 'Not listening', bn: 'সাড়া নেই' } },
          plainState: { app1: { en: 'Lights off', bn: 'আলো নেভানো' } },
          title: { en: 'Desk 1 is closed', bn: 'ডেস্ক ১ বন্ধ' },
          simple: {
            en: 'The mailroom walks to desk 1, but its lights are off. Nobody is there, so the letter cannot be handed over.',
            bn: 'মেইলরুম ডেস্ক ১-এর কাছে যায়, কিন্তু আলো নেভানো। কেউ নেই, তাই চিঠিটা দেওয়া যায় না।'
          },
          story: {
            title: { en: 'Mahir’s desk is dark', bn: 'মাহিরের ডেস্ক অন্ধকার' },
            text: {
              en: 'This time Imran finds Mahir’s desk dark, and there is nobody to hand the letter to. Imran does not panic: he still has Rokeya’s desk.',
              bn: 'এবার ইমরান মাহিরের ডেস্ক অন্ধকার পায়, চিঠি দেওয়ার মতো কেউ নেই। ইমরান ঘাবড়ায় না: তার কাছে এখনো রোকেয়ার ডেস্ক আছে।'
            }
          },
          tech: {
            en: 'The connection to app 1 is refused. That is an `error`, so it counts as an unsuccessful attempt toward `max_fails` (1 by default). With the default `fail_timeout=10s`, nginx now avoids app 1 for 10 seconds.',
            bn: 'app 1-এ connection refused হয়। সেটা একটা `error`, তাই `max_fails`-এর হিসাবে একটা ব্যর্থ চেষ্টা (ডিফল্ট 1)। ডিফল্ট `fail_timeout=10s`-এ nginx এখন 10 সেকেন্ড app 1 এড়িয়ে চলে।'
          }
        },
        {
          id: 'retry-app2',
          moves: [ { edge: 'nginx-app2', label: 'next upstream', plain: { en: 'Try the next desk', bn: 'পরের ডেস্কে চেষ্টা' } } ],
          state: { nginx: { en: 'Retrying app2', bn: 'app2-তে retry' } },
          plainState: { nginx: { en: 'Trying desk 2', bn: 'ডেস্ক ২ চেষ্টা করছে' } },
          title: { en: 'The mailroom tries desk 2', bn: 'মেইলরুম ডেস্ক ২ চেষ্টা করে' },
          simple: {
            en: 'Desk 1 is shut, so the mailroom does not give up. It passes the same letter to desk 2, and you notice nothing.',
            bn: 'ডেস্ক ১ বন্ধ, তাই মেইলরুম হাল ছাড়ে না। সে একই চিঠি ডেস্ক ২-কে দেয়, আর আপনি কিছুই টের পান না।'
          },
          story: {
            title: { en: 'Imran tries Rokeya’s desk', bn: 'ইমরান রোকেয়ার ডেস্কে চেষ্টা করে' },
            text: {
              en: 'Imran turns around and hands the same letter to Rokeya. Shirin never finds out that Mahir’s desk was dark, because the mailroom quietly covered for it.',
              bn: 'ইমরান ঘুরে একই চিঠি রোকেয়ার হাতে দেয়। শিরিন কখনো জানতে পারে না যে মাহিরের ডেস্ক অন্ধকার ছিল, কারণ মেইলরুম চুপচাপ সেটা সামলে নিয়েছে।'
            }
          },
          tech: {
            en: 'The default `proxy_next_upstream error timeout` lets nginx pass the request to the next server, but only while nothing has been sent to the client. Requests like POST are not retried once sent upstream, unless `non_idempotent` is set.',
            bn: 'ডিফল্ট `proxy_next_upstream error timeout` nginx-কে request পরের server-এ পাঠাতে দেয়, কিন্তু শুধু যতক্ষণ client-কে কিছু পাঠানো হয়নি। POST-এর মতো request upstream-এ পাঠানো হয়ে গেলে আর retry হয় না, যদি না `non_idempotent` দেওয়া থাকে।'
          }
        },
        {
          id: 'reply-via-2',
          moves: [
            { edge: 'app2-nginx', label: '200 + JSON', plain: { en: 'The reply', bn: 'উত্তর' } },
            { edge: 'nginx-client', label: '200 + JSON', plain: { en: 'The reply', bn: 'উত্তর' } }
          ],
          title: { en: 'Desk 2 saves the day', bn: 'ডেস্ক ২ পরিস্থিতি সামলায়' },
          simple: {
            en: 'Desk 2 answers as usual and the reply reaches you. One closed desk cost you a moment, and nothing more.',
            bn: 'ডেস্ক ২ যথারীতি উত্তর দেয় আর উত্তর আপনার কাছে পৌঁছায়। একটা বন্ধ ডেস্কের দাম এক মুহূর্ত, তার বেশি কিছু না।'
          },
          story: {
            title: { en: 'Rokeya answers', bn: 'রোকেয়া উত্তর দেয়' },
            text: {
              en: 'Rokeya reads the letter and writes back. Shirin gets her list of items, and Mahir’s dark desk costs her only a moment. Good thing the company has two desks.',
              bn: 'রোকেয়া চিঠি পড়ে উত্তর লেখে। শিরিন তার আইটেমের তালিকা পায়, আর মাহিরের অন্ধকার ডেস্কের জন্য তার শুধু এক মুহূর্ত লাগে। ভালো যে কোম্পানির দুটো ডেস্ক আছে।'
            }
          },
          tech: {
            en: 'App 2 answers `200 OK`. This is why a pool helps: open-source nginx only has passive health checks, so it finds a dead server by trying it. Active checks, which probe in the background, need NGINX Plus.',
            bn: 'App 2 `200 OK` দিয়ে উত্তর দেয়। pool তাই কাজে লাগে: open-source nginx-এ শুধু passive health check আছে, তাই সে ব্যর্থ server খুঁজে পায় সেটাকে চেষ্টা করেই। Active check, যা পেছনে আগেই probe করে, NGINX Plus-এ লাগে।'
          }
        }
      ]
    },
    {
      id: 'slow-desk',
      label: { en: 'The desks take too long', bn: 'ডেস্কগুলো অনেক দেরি করে' },
      whatIf: {
        en: 'What if both desks take too long to answer?',
        bn: 'দুটো ডেস্কই উত্তর দিতে যদি অনেক দেরি করে?'
      },
      branchAfter: 'to-app1',
      steps: [
        {
          id: 'desks-slow',
          work: { node: [ 'app1', 'app2' ], kind: 'queue' },
          state: { app1: { en: 'Swamped', bn: 'কাজে ডুবে' }, app2: { en: 'Swamped', bn: 'কাজে ডুবে' } },
          plainState: { app1: { en: 'Buried in work', bn: 'কাজে ডুবে আছে' }, app2: { en: 'Buried in work', bn: 'কাজে ডুবে আছে' } },
          title: { en: 'Both desks are swamped', bn: 'দুটো ডেস্কই কাজে ডুবে' },
          simple: {
            en: 'A huge pile of letters has buried both desks. Desk 1 has your letter, but it cannot get to it, and the mailroom waits.',
            bn: 'চিঠির বিশাল স্তূপ দুটো ডেস্কই ডুবিয়ে দিয়েছে। ডেস্ক ১-এর হাতে আপনার চিঠি আছে, কিন্তু সে সেটা ধরতে পারছে না, আর মেইলরুম অপেক্ষা করে।'
          },
          story: {
            title: { en: 'The desks are buried', bn: 'ডেস্কগুলো কাজে ডুবে' },
            text: {
              en: 'A huge pile of letters lands on both desks. Mahir has Shirin’s letter but cannot reach it, and Rokeya is just as busy. Imran waits, watching the clock.',
              bn: 'চিঠির বিশাল স্তূপ দুটো ডেস্কেই এসে পড়ে। মাহিরের হাতে শিরিনের চিঠি আছে কিন্তু সে সেটা ধরতে পারে না, আর রোকেয়াও সমান ব্যস্ত। ইমরান ঘড়ির দিকে তাকিয়ে অপেক্ষা করে।'
            }
          },
          tech: {
            en: 'Nginx waits on app 1. `proxy_read_timeout` is 60 seconds by default and counts the time between two reads, not the whole response. Since `timeout` is in the default `proxy_next_upstream`, nginx then retries a GET on app 2, which is slow too.',
            bn: 'Nginx app 1-এর জন্য অপেক্ষা করে। `proxy_read_timeout`-এর ডিফল্ট 60 সেকেন্ড, আর সেটা দুটো read-এর মাঝের সময় গোনে, পুরো response-এর নয়। ডিফল্ট `proxy_next_upstream`-এ `timeout` আছে বলে nginx তারপর GET-টা app 2-তে retry করে, যেটাও ধীর।'
          }
        },
        {
          id: 'gateway-504',
          moves: [ { edge: 'nginx-client-err', label: '504 Gateway Timeout', plain: { en: 'Took too long', bn: 'অনেক দেরি হলো' } } ],
          title: { en: 'The mailroom gives up', bn: 'মেইলরুম হাল ছাড়ে' },
          simple: {
            en: 'The mailroom has waited as long as it is allowed to, so it sends you a note: sorry, that took too long.',
            bn: 'মেইলরুম যতক্ষণ অপেক্ষার অনুমতি ছিল ততক্ষণ অপেক্ষা করেছে, তাই সে আপনাকে একটা নোট পাঠায়: দুঃখিত, অনেক দেরি হয়ে গেল।'
          },
          story: {
            title: { en: 'Imran stops waiting', bn: 'ইমরান আর অপেক্ষা করে না' },
            text: {
              en: 'Both desks stay buried, and Imran’s clock runs out. He stops waiting and sends Shirin a note: sorry, that took too long, please try again later.',
              bn: 'দুটো ডেস্কই ডুবে থাকে, আর ইমরানের ঘড়ির সময় শেষ হয়। সে অপেক্ষা থামিয়ে শিরিনকে নোট পাঠায়: দুঃখিত, অনেক দেরি হয়ে গেল, পরে আবার চেষ্টা করুন।'
            }
          },
          tech: {
            en: 'When the tries end with timeouts, nginx closes the upstream connection and answers `504 Gateway Timeout`. RFC 9110 defines 504 as no timely response from an upstream server. Fix the slow code, or raise `proxy_read_timeout` if the work is legitimately slow.',
            bn: 'try-গুলো timeout-এ শেষ হলে nginx upstream connection বন্ধ করে `504 Gateway Timeout` দেয়। RFC 9110 অনুযায়ী 504 মানে upstream server থেকে সময়মতো কোনো response না পাওয়া। ধীর কোড ঠিক করুন, বা কাজটা সত্যিই ধীর হলে `proxy_read_timeout` বাড়ান।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A company mailroom works the same way. Every part of Nginx has a twin in the building.',
      bn: 'কোম্পানির মেইলরুমও ঠিক এভাবেই চলে। Nginx-এর প্রতিটি অংশের একটা জোড়া আছে ভবনে।'
    },
    twins: [
      {
        icon: 'user',
        node: 'client',
        name: { en: 'You', bn: 'আপনি' },
        d: {
          en: 'Post letters and wait for the replies.',
          bn: 'চিঠি পোস্ট করেন আর উত্তরের অপেক্ষা করেন।'
        }
      },
      {
        icon: 'mail',
        node: 'nginx',
        name: { en: 'The mailroom', bn: 'মেইলরুম' },
        d: {
          en: 'Opens the envelopes, hands out brochures itself and shares real questions between the desks.',
          bn: 'খাম খোলে, ব্রোশিওর নিজে দেয়, আর আসল প্রশ্নগুলো ডেস্কগুলোর মধ্যে ভাগ করে দেয়।'
        }
      },
      {
        icon: 'folder',
        node: 'static',
        name: { en: 'The brochure rack', bn: 'ব্রোশিওরের তাক' },
        d: {
          en: 'Holds pictures and pages that never change, ready to hand out.',
          bn: 'যে ছবি আর পাতা বদলায় না সেগুলো রাখে, দেওয়ার জন্য তৈরি।'
        }
      },
      {
        icon: 'worker',
        node: 'app1',
        name: { en: 'Desk 1', bn: 'ডেস্ক ১' },
        d: {
          en: 'Reads each letter it is given and writes the answer.',
          bn: 'যে চিঠি পায় সেটা পড়ে আর উত্তর লেখে।'
        }
      },
      {
        icon: 'worker',
        node: 'app2',
        name: { en: 'Desk 2', bn: 'ডেস্ক ২' },
        d: {
          en: 'An identical desk, so the mailroom always has a spare.',
          bn: 'একই রকম আরেকটা ডেস্ক, তাই মেইলরুমের হাতে সবসময় একটা বাড়তি থাকে।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'A closed desk', bn: 'বন্ধ ডেস্ক' },
        is: { en: 'is a 502 or 504 error', bn: 'মানে 502 বা 504 error' },
        d: {
          en: 'The mailroom finds every desk dark, or gets tired of waiting. Either way, you get a note instead of a reply.',
          bn: 'মেইলরুম সব ডেস্ক অন্ধকার পায়, বা অপেক্ষা করতে করতে ক্লান্ত হয়ে যায়। যা-ই হোক, উত্তরের বদলে আপনি একটা নোট পান।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'What is a reverse proxy, and how is it different from a forward proxy?',
        bn: 'reverse proxy কী, আর forward proxy থেকে তার পার্থক্য কী?'
      },
      short: {
        en: 'A forward proxy acts for clients. A reverse proxy acts for servers.',
        bn: 'forward proxy client-এর হয়ে কাজ করে। reverse proxy server-এর হয়ে কাজ করে।'
      },
      deep: {
        en: 'RFC 9110 calls a reverse proxy a gateway: it acts as the origin server for the outbound connection and forwards requests inward. Clients only ever talk to it, so TLS, load balancing and static files can live in one place.',
        bn: 'RFC 9110 reverse proxy-কে বলে gateway: সে বাইরের connection-এর জন্য origin server-এর মতো কাজ করে আর request ভেতরে এগিয়ে দেয়। client শুধু তার সাথেই কথা বলে, তাই TLS, load balancing আর static file এক জায়গায় থাকতে পারে।'
      },
      redFlag: {
        en: '“A reverse proxy and a forward proxy are the same thing.”',
        bn: '“reverse proxy আর forward proxy একই জিনিস।”'
      }
    },
    {
      q: { en: 'Why put Nginx in front of Uvicorn?', bn: 'Uvicorn-এর সামনে Nginx বসাই কেন?' },
      short: {
        en: 'It ends TLS, serves static files, buffers slow clients and shares the load.',
        bn: 'সে TLS শেষ করে, static file দেয়, ধীর client-কে buffer করে আর load ভাগ করে।'
      },
      deep: {
        en: 'Uvicorn’s docs say a proxy in front “may not be necessary, but is recommended for additional resilience”. Nginx buffers requests and responses by default (`proxy_request_buffering` and `proxy_buffering` are on), so slow clients do not tie up an app worker.',
        bn: 'Uvicorn-এর ডকুমেন্টেশন বলে সামনে proxy “দরকার নাও হতে পারে, কিন্তু বাড়তি resilience-এর জন্য সুপারিশ করা হয়”। Nginx ডিফল্টে request আর response buffer করে (`proxy_request_buffering` ও `proxy_buffering` চালু), তাই ধীর client কোনো app worker আটকে রাখে না।'
      },
      redFlag: {
        en: '“Because Uvicorn cannot serve HTTP.”',
        bn: '“কারণ Uvicorn HTTP serve করতে পারে না।”'
      }
    },
    {
      q: {
        en: 'How does Nginx choose between app servers?',
        bn: 'Nginx app server-গুলোর মধ্যে কীভাবে বাছে?'
      },
      short: {
        en: 'Round-robin by default: each request goes to the next server in turn.',
        bn: 'ডিফল্টে round-robin: প্রতিটি request পালা করে পরের server-এ যায়।'
      },
      deep: {
        en: 'The default is weighted round-robin (`weight=1` each). `least_conn` picks the server with the fewest active connections, `ip_hash` keeps a client on one server, and `weight` favours bigger machines. Plain round-robin ignores how busy a server is.',
        bn: 'ডিফল্ট weighted round-robin (প্রতিটির `weight=1`)। `least_conn` সবচেয়ে কম active connection-এর server বাছে, `ip_hash` একজন client-কে একটা server-এ ধরে রাখে, আর `weight` বড় মেশিনকে বেশি কাজ দেয়। সাধারণ round-robin server কতটা ব্যস্ত তা দেখে না।'
      },
      redFlag: {
        en: '“Round-robin sends traffic to the least busy server.”',
        bn: '“round-robin সবচেয়ে কম ব্যস্ত server-এ traffic পাঠায়।”'
      }
    },
    {
      q: {
        en: 'How does the app learn the real client IP and scheme?',
        bn: 'app আসল client IP আর scheme জানে কীভাবে?'
      },
      short: {
        en: 'Nginx has to pass them in headers such as `X-Forwarded-For` and `X-Forwarded-Proto`.',
        bn: 'Nginx-কে সেগুলো header-এ পাঠাতে হয়, যেমন `X-Forwarded-For` আর `X-Forwarded-Proto`।'
      },
      deep: {
        en: 'Nginx adds neither by default. Set `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` and `proxy_set_header X-Forwarded-Proto $scheme;`. Uvicorn only trusts them from IPs in `--forwarded-allow-ips` (default `127.0.0.1` and `::1`), so trust just your proxy.',
        bn: 'Nginx ডিফল্টে কোনোটাই যোগ করে না। `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` আর `proxy_set_header X-Forwarded-Proto $scheme;` দিন। Uvicorn শুধু `--forwarded-allow-ips`-এর IP থেকে আসা header বিশ্বাস করে (ডিফল্ট `127.0.0.1` ও `::1`), তাই শুধু নিজের proxy-কে বিশ্বাস করুন।'
      },
      redFlag: {
        en: '“`request.client.host` is always the user.”',
        bn: '“`request.client.host` সবসময় user-এর address।”'
      }
    },
    {
      q: {
        en: 'What do `nginx -t` and `nginx -s reload` do?',
        bn: '`nginx -t` আর `nginx -s reload` কী করে?'
      },
      short: {
        en: '`nginx -t` checks the config. `nginx -s reload` applies it without a restart.',
        bn: '`nginx -t` config পরীক্ষা করে। `nginx -s reload` restart ছাড়াই সেটা প্রয়োগ করে।'
      },
      deep: {
        en: 'On reload the master process checks the new config and tries to apply it. If that fails, nginx keeps running with the old config. If it works, nginx starts new workers and asks the old ones to shut down gracefully. Run `nginx -t` first.',
        bn: 'reload-এ master process নতুন config পরীক্ষা করে সেটা প্রয়োগ করতে চেষ্টা করে। ব্যর্থ হলে nginx পুরোনো config নিয়েই চলতে থাকে। সফল হলে নতুন worker চালু করে আর পুরোনোগুলোকে gracefully বন্ধ হতে বলে। আগে `nginx -t` চালান।'
      },
      redFlag: {
        en: '“Edit the file and it applies automatically.”',
        bn: '“ফাইল বদলালেই নিজে নিজে প্রয়োগ হয়ে যায়।”'
      }
    },
    {
      q: {
        en: 'What happens when an app server fails or is slow?',
        bn: 'app server বন্ধ বা ধীর হলে কী হয়?'
      },
      short: {
        en: 'By default nginx tries the next server on an error or a timeout.',
        bn: 'ডিফল্টে error বা timeout হলে nginx পরের server-এ চেষ্টা করে।'
      },
      deep: {
        en: 'The default is `proxy_next_upstream error timeout`. Failures count toward `max_fails` (1) within `fail_timeout` (10s), and a failed server is skipped meanwhile. If no server answers, you get 502 or 504. Open-source nginx has passive checks only; active health checks need NGINX Plus.',
        bn: 'ডিফল্ট `proxy_next_upstream error timeout`। ব্যর্থতা `fail_timeout` (10s)-এর মধ্যে `max_fails` (1)-এ গোনা হয়, আর ব্যর্থ server তখন এড়ানো হয়। কোনো server উত্তর না দিলে 502 বা 504 পাওয়া যায়। open-source nginx-এ শুধু passive check আছে; active health check-এর জন্য NGINX Plus লাগে।'
      },
      redFlag: {
        en: '“Nginx probes every app server in the background.”',
        bn: '“Nginx পেছনে সব app server-কে probe করতে থাকে।”'
      }
    },
    {
      q: { en: 'What must you add to proxy WebSockets?', bn: 'WebSocket proxy করতে কী যোগ করতে হয়?' },
      short: {
        en: 'Pass the `Upgrade` and `Connection` headers explicitly.',
        bn: '`Upgrade` আর `Connection` header নিজে থেকে পাঠাতে হয়।'
      },
      deep: {
        en: 'They are hop-by-hop headers, so nginx does not forward them unless told: `proxy_set_header Upgrade $http_upgrade;` and `proxy_set_header Connection "upgrade";`. Before 1.29.7 you also needed `proxy_http_version 1.1;`. An idle WebSocket closes after 60 seconds unless you raise `proxy_read_timeout` or send pings.',
        bn: 'এগুলো hop-by-hop header, তাই বলে না দিলে nginx এগুলো এগিয়ে দেয় না: `proxy_set_header Upgrade $http_upgrade;` আর `proxy_set_header Connection "upgrade";`। 1.29.7-এর আগে `proxy_http_version 1.1;`-ও লাগত। অলস WebSocket 60 সেকেন্ড পরে বন্ধ হয়, যদি না `proxy_read_timeout` বাড়ান বা ping পাঠান।'
      },
      redFlag: {
        en: '“WebSockets work through nginx with no extra config.”',
        bn: '“কোনো বাড়তি config ছাড়াই nginx দিয়ে WebSocket চলে।”'
      }
    }
  ],
  cheats: [
    {
      code: 'nginx -t && nginx -s reload',
      d: {
        en: 'Check the config first, then reload it gracefully.',
        bn: 'আগে config পরীক্ষা করুন, তারপর gracefully reload করুন।'
      }
    },
    {
      code: 'upstream backend { server 127.0.0.1:8001; server 127.0.0.1:8002; }',
      d: {
        en: 'A pool of two app servers, shared round-robin by default.',
        bn: 'দুটো app server-এর একটা pool, ডিফল্টে round-robin-এ ভাগ হয়।'
      }
    },
    {
      code: 'location / { proxy_pass http://backend; proxy_set_header Host $host; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; }',
      d: {
        en: 'Forward to the pool, keep the original host, and pass the client IP along.',
        bn: 'pool-এ এগিয়ে দিন, আসল host রাখুন, আর client IP সাথে পাঠান।'
      }
    },
    {
      code: 'listen 443 ssl; ssl_certificate /etc/ssl/site.crt; ssl_certificate_key /etc/ssl/site.key;',
      d: {
        en: 'Terminate TLS: decrypt HTTPS here and talk plain HTTP to the pool.',
        bn: 'TLS termination: এখানে HTTPS decrypt করুন আর pool-এর সাথে সাধারণ HTTP-তে কথা বলুন।'
      }
    },
    {
      code: 'return 301 https://$host$request_uri;',
      d: {
        en: 'In the port 80 server block: redirect plain HTTP to HTTPS.',
        bn: 'port 80-এর server block-এ: সাধারণ HTTP থেকে HTTPS-এ redirect করুন।'
      }
    },
    {
      code: 'location /static/ { root /var/www; expires 30d; }',
      d: {
        en: 'Serve /var/www/static/... straight from disk, with a 30 day cache lifetime.',
        bn: '/var/www/static/... সরাসরি disk থেকে দিন, 30 দিনের cache সময়সহ।'
      }
    },
    {
      code: 'proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade";',
      d: {
        en: 'Let WebSockets through (before nginx 1.29.7, also add proxy_http_version 1.1;).',
        bn: 'WebSocket যেতে দিন (nginx 1.29.7-এর আগে proxy_http_version 1.1;-ও যোগ করুন)।'
      }
    },
    {
      code: 'tail -f /var/log/nginx/error.log',
      d: {
        en: 'Watch errors live. A 502 or 504 usually leaves a clue here.',
        bn: 'error সরাসরি দেখুন। 502 বা 504-এর সূত্র সাধারণত এখানেই থাকে।'
      }
    }
  ],
  sources: [
    { label: 'RFC 9110: HTTP semantics (gateway, 502, 504)', url: 'https://www.rfc-editor.org/rfc/rfc9110.html' },
    { label: 'nginx: HTTP load balancing', url: 'https://nginx.org/en/docs/http/load_balancing.html' },
    { label: 'nginx: ngx_http_upstream_module', url: 'https://nginx.org/en/docs/http/ngx_http_upstream_module.html' },
    { label: 'nginx: ngx_http_upstream_hc_module (active checks)', url: 'https://nginx.org/en/docs/http/ngx_http_upstream_hc_module.html' },
    { label: 'nginx: ngx_http_proxy_module', url: 'https://nginx.org/en/docs/http/ngx_http_proxy_module.html' },
    { label: 'nginx: ngx_http_core_module', url: 'https://nginx.org/en/docs/http/ngx_http_core_module.html' },
    { label: 'nginx: ngx_http_headers_module (expires)', url: 'https://nginx.org/en/docs/http/ngx_http_headers_module.html' },
    { label: 'nginx: ngx_http_rewrite_module (return)', url: 'https://nginx.org/en/docs/http/ngx_http_rewrite_module.html' },
    { label: 'nginx: beginner’s guide', url: 'https://nginx.org/en/docs/beginners_guide.html' },
    { label: 'nginx: controlling nginx', url: 'https://nginx.org/en/docs/control.html' },
    { label: 'nginx: command-line parameters', url: 'https://nginx.org/en/docs/switches.html' },
    { label: 'nginx: configuring HTTPS servers', url: 'https://nginx.org/en/docs/http/configuring_https_servers.html' },
    { label: 'nginx: WebSocket proxying', url: 'https://nginx.org/en/docs/http/websocket.html' },
    { label: 'nginx source: upstream error statuses', url: 'https://raw.githubusercontent.com/nginx/nginx/master/src/http/ngx_http_upstream.c' },
    { label: 'NGINX docs: reverse proxy', url: 'https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/' },
    { label: 'NGINX docs: terminating SSL/TLS', url: 'https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/' },
    { label: 'Uvicorn: deployment', url: 'https://uvicorn.dev/deployment/' },
    { label: 'Uvicorn: settings', url: 'https://uvicorn.dev/settings/' }
  ]
}
