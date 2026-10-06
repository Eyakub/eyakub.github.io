import type { Topic } from '../types'
import { UI } from '../ui'

export const httpJourney: Topic = {
  slug: 'http-journey',
  line: 'backend',
  title: { en: 'HTTP journey', bn: 'HTTP-র যাত্রা' },
  summary: {
    en: 'Everything between typing a web address and seeing the page: DNS, TCP, TLS, a load balancer, Nginx, the app and the database.',
    bn: 'ওয়েব ঠিকানা টাইপ করা থেকে পেজ দেখা পর্যন্ত মাঝের সবকিছু: DNS, TCP, TLS, load balancer, Nginx, app আর database।'
  },
  hook: {
    en: 'Opening a web page sends a letter on a long trip through a company, and knowing each stop helps you find where a problem hides.',
    bn: 'ওয়েব পেজ খোলা মানে একটা কোম্পানির ভেতর দিয়ে চিঠির লম্বা যাত্রা, আর প্রতিটি স্টপ জানলে সমস্যা কোথায় লুকিয়ে আছে খুঁজে পাওয়া সহজ।'
  },
  story: {
    cast: {
      en: 'Nabil writes a letter to a company, where Farhana staffs the front desk, Imran runs the mailroom and Tahmina answers letters in the department.',
      bn: 'নাবিল একটা কোম্পানিকে চিঠি লেখে, যেখানে ফারহানা রিসেপশন সামলায়, ইমরান মেইলরুম চালায় আর তাহমিনা বিভাগে চিঠির উত্তর ঠিক করে।'
    }
  },
  takeaway: {
    en: 'One click is a letter passed from hand to hand, so find the hand that dropped it.',
    bn: 'একটা ক্লিক মানে হাত থেকে হাতে ঘুরে চলা একটা চিঠি, তাই খুঁজে দেখুন কোন হাত চিঠিটা ফেলে দিল।'
  },
  words: [
    {
      term: { en: 'Letter and reply (request, response)', bn: 'চিঠি আর উত্তর (request, response)' },
      d: {
        en: 'Your question to a website, and the answer it sends back.',
        bn: 'ওয়েবসাইটের কাছে আপনার প্রশ্ন, আর সে যে উত্তর ফেরত পাঠায়।'
      }
    },
    {
      term: { en: 'Phone book (DNS)', bn: 'ফোন বুক (DNS)' },
      d: {
        en: 'Turns a website’s name into the number address of its computers.',
        bn: 'ওয়েবসাইটের নামকে তার কম্পিউটারের সংখ্যার ঠিকানায় বদলে দেয়।'
      }
    },
    {
      term: { en: 'Secret code (HTTPS)', bn: 'গোপন কোড (HTTPS)' },
      d: {
        en: 'A code you and the company agree on, so nobody else can read your letter.',
        bn: 'আপনি আর কোম্পানি যে কোড ঠিক করে নেয়, যাতে অন্য কেউ আপনার চিঠি পড়তে না পারে।'
      }
    },
    {
      term: { en: 'Front desk (load balancer)', bn: 'রিসেপশন (load balancer)' },
      d: {
        en: 'Sends each visitor to whichever identical mailroom is free, so none gets swamped.',
        bn: 'প্রতিটি দর্শনার্থীকে একই রকম মেইলরুমগুলোর মধ্যে যেটা ফাঁকা সেটায় পাঠায়, যাতে কোনোটা ভারে না পড়ে।'
      }
    },
    {
      term: { en: 'Mailroom (Nginx, reverse proxy)', bn: 'মেইলরুম (Nginx, reverse proxy)' },
      d: {
        en: 'Passes each letter to the right department, and handles simple mail itself.',
        bn: 'প্রতিটি চিঠি সঠিক বিভাগে পাঠায়, আর সহজ ডাক নিজেই সামলায়।'
      }
    },
    {
      term: { en: 'Department (app server)', bn: 'বিভাগ (app server)' },
      d: {
        en: 'Your own program, which reads each letter and works out the answer.',
        bn: 'আপনার নিজের প্রোগ্রাম, যে প্রতিটি চিঠি পড়ে আর উত্তর ঠিক করে।'
      }
    }
  ],
  legend: {
    request: { en: 'Your letter going in', bn: 'ভেতরে যাওয়া আপনার চিঠি' },
    queue: { en: 'Waiting in line', bn: 'লাইনে অপেক্ষা' },
    result: { en: 'A reply coming back', bn: 'ফিরে আসা উত্তর' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 1000, 340 ], narrow: [ 400, 540 ] },
  nodes: {
    browser: {
      icon: 'user',
      name: { en: 'Browser', bn: 'ব্রাউজার' },
      sub: { en: 'Starts the request', bn: 'রিকোয়েস্ট শুরু করে' },
      plain: {
        name: { en: 'You', bn: 'আপনি' },
        sub: { en: 'Sending a letter', bn: 'চিঠি পাঠাচ্ছেন' }
      },
      wide: [ 75, 215, 'down' ],
      narrow: [ 85, 125, 'right' ]
    },
    dns: {
      icon: 'bookmark',
      name: { en: 'DNS resolver', bn: 'DNS resolver' },
      sub: { en: 'Name to address', bn: 'নাম থেকে ঠিকানা' },
      plain: {
        name: { en: 'Phone book', bn: 'ফোন বুক' },
        sub: { en: 'Looks up addresses', bn: 'ঠিকানা খুঁজে দেয়' }
      },
      wide: [ 75, 70, 'right' ],
      narrow: [ 85, 40, 'right' ]
    },
    lb: {
      icon: 'route',
      name: { en: 'Load balancer', bn: 'Load balancer' },
      sub: { en: 'Picks a server', bn: 'সার্ভার বেছে নেয়' },
      plain: {
        name: { en: 'Front desk', bn: 'রিসেপশন' },
        sub: { en: 'Directs visitors', bn: 'দর্শনার্থীর পথ দেখায়' }
      },
      wide: [ 305, 215, 'down' ],
      narrow: [ 85, 245, 'right' ]
    },
    nginx: {
      icon: 'mail',
      name: { en: 'Nginx', bn: 'Nginx' },
      sub: { en: 'Reverse proxy', bn: 'Reverse proxy' },
      plain: {
        name: { en: 'Mailroom', bn: 'মেইলরুম' },
        sub: { en: 'Sorts the post', bn: 'ডাক বাছাই করে' }
      },
      wide: [ 500, 215, 'down' ],
      narrow: [ 85, 325, 'right' ]
    },
    app: {
      icon: 'worker',
      name: { en: 'App server', bn: 'App server' },
      sub: { en: 'Uvicorn + FastAPI', bn: 'Uvicorn + FastAPI' },
      plain: {
        name: { en: 'Department', bn: 'বিভাগ' },
        sub: { en: 'Reads each letter', bn: 'প্রতিটি চিঠি পড়ে' }
      },
      wide: [ 695, 215, 'down' ],
      narrow: [ 85, 405, 'right' ]
    },
    db: {
      icon: 'store',
      name: { en: 'Database', bn: 'ডেটাবেস' },
      sub: { en: 'Stores the rows', bn: 'row জমা রাখে' },
      plain: {
        name: { en: 'Filing cabinet', bn: 'ফাইল কেবিনেট' },
        sub: { en: 'Keeps the records', bn: 'সব রেকর্ড রাখে' }
      },
      wide: [ 890, 215, 'down' ],
      narrow: [ 85, 485, 'right' ]
    }
  },
  groups: [
    {
      id: 'site',
      label: { en: 'Inside the company’s servers', bn: 'কোম্পানির সার্ভারের ভেতরে' },
      plain: { en: 'Inside the company', bn: 'কোম্পানির ভেতরে' },
      wide: [ 225, 145, 750, 150 ],
      narrow: [ 45, 205, 345, 320 ]
    }
  ],
  corridors: {
    'browser-dns': { wide: [ [ 75, 215 ], [ 75, 70 ] ], narrow: [ [ 85, 125 ], [ 85, 40 ] ] },
    'browser-lb': { wide: [ [ 75, 215 ], [ 305, 215 ] ], narrow: [ [ 85, 125 ], [ 85, 245 ] ] },
    'lb-nginx': { wide: [ [ 305, 215 ], [ 500, 215 ] ], narrow: [ [ 85, 245 ], [ 85, 325 ] ] },
    'nginx-app': { wide: [ [ 500, 215 ], [ 695, 215 ] ], narrow: [ [ 85, 325 ], [ 85, 405 ] ] },
    'app-db': { wide: [ [ 695, 215 ], [ 890, 215 ] ], narrow: [ [ 85, 405 ], [ 85, 485 ] ] }
  },
  edges: {
    'browser-dns': { from: 'browser', to: 'dns', kind: 'request' },
    'dns-browser': { from: 'dns', to: 'browser', kind: 'result' },
    'browser-lb': { from: 'browser', to: 'lb', kind: 'request' },
    'lb-browser': { from: 'lb', to: 'browser', kind: 'result' },
    'lb-nginx': { from: 'lb', to: 'nginx', kind: 'request' },
    'nginx-lb': { from: 'nginx', to: 'lb', kind: 'result' },
    'nginx-app': { from: 'nginx', to: 'app', kind: 'request' },
    'app-nginx': { from: 'app', to: 'nginx', kind: 'result' },
    'app-db': { from: 'app', to: 'db', kind: 'request' },
    'db-app': { from: 'db', to: 'app', kind: 'result' },
    'nginx-lb-err': { from: 'nginx', to: 'lb', kind: 'error' },
    'lb-browser-err': { from: 'lb', to: 'browser', kind: 'error' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'dns-ask',
        moves: [ { edge: 'browser-dns', label: 'example.com?', plain: { en: 'Address, please?', bn: 'ঠিকানা দেবেন?' } } ],
        title: { en: 'You look up the address', bn: 'আপনি ঠিকানা খুঁজে নেন' },
        simple: {
          en: 'You want to send a letter to a company, but you only know its name. So you ask the phone book for its street address.',
          bn: 'আপনি একটা কোম্পানিকে চিঠি পাঠাতে চান, কিন্তু শুধু তার নামটা জানেন। তাই ফোন বুককে জিজ্ঞেস করেন তার রাস্তার ঠিকানা কী।'
        },
        story: {
          title: { en: 'Nabil looks up the address', bn: 'নাবিল ঠিকানা খোঁজে' },
          text: {
            en: 'Nabil wants to write to a company, but he only knows its name, not where it lives. So he opens the phone book and asks for the street address.',
            bn: 'নাবিল একটা কোম্পানিকে চিঠি লিখতে চায়, কিন্তু সে শুধু নামটা জানে, কোথায় থাকে জানে না। তাই সে ফোন বুক খুলে রাস্তার ঠিকানা জিজ্ঞেস করে।'
          }
        },
        tech: {
          en: 'The computer first checks its local DNS cache. On a miss it asks a recursive resolver, which follows referrals from the root name servers down to the domain’s authoritative server. Each answer is cached for its TTL.',
          bn: 'কম্পিউটার আগে নিজের local DNS cache দেখে। না পেলে একটা recursive resolver-কে জিজ্ঞেস করে, যে root name server থেকে referral ধরে নেমে ডোমেইনের authoritative server পর্যন্ত যায়। প্রতিটি উত্তর তার TTL পর্যন্ত cache হয়ে থাকে।'
        }
      },
      {
        id: 'dns-answer',
        moves: [ { edge: 'dns-browser', label: '203.0.113.10', plain: { en: 'The address', bn: 'ঠিকানাটা' } } ],
        title: { en: 'The phone book answers', bn: 'ফোন বুক উত্তর দেয়' },
        simple: {
          en: 'The phone book finds the company and sends back its address, a number that says exactly where to go. You may keep it for a while.',
          bn: 'ফোন বুক কোম্পানিকে খুঁজে তার ঠিকানা ফেরত পাঠায়, একটা সংখ্যা যা ঠিক বলে দেয় কোথায় যেতে হবে। কিছুক্ষণ সেটা মনে রাখা যায়।'
        },
        story: {
          title: { en: 'Nabil gets the address', bn: 'নাবিল ঠিকানা পায়' },
          text: {
            en: 'The phone book answers quickly with a long number, which is the company’s address. Nabil writes it on his envelope, and the book says he may reuse it for a while.',
            bn: 'ফোন বুক চটপট একটা লম্বা সংখ্যা জানায়, সেটাই কোম্পানির ঠিকানা। নাবিল সেটা খামে লিখে নেয়, আর বইটা বলে কিছুক্ষণ এটা আবার কাজে লাগানো যাবে।'
          }
        },
        tech: {
          en: 'The answer is an `A` record holding a 32-bit IPv4 address. `203.0.113.10` is a documentation address from RFC 5737, standing in for a real one. The record’s TTL tells every cache how long it may reuse the answer.',
          bn: 'উত্তর হলো একটা `A` record, যাতে একটা 32-bit IPv4 address থাকে। `203.0.113.10` হলো RFC 5737-এর ডকুমেন্টেশন address, আসল একটার বদলে এখানে বসানো। record-এর TTL প্রতিটি cache-কে বলে দেয় উত্তরটা কতক্ষণ আবার ব্যবহার করা যাবে।'
        }
      },
      {
        id: 'tcp-hello',
        moves: [ { edge: 'browser-lb', label: 'TCP SYN', plain: { en: 'Phoning ahead', bn: 'আগে ফোন করা' } } ],
        title: { en: 'You phone ahead', bn: 'আপনি আগে ফোন করেন' },
        simple: {
          en: 'Before posting anything, you phone the company’s front desk to check someone is there. They pick up, and you both agree the line is open.',
          bn: 'কিছু পোস্ট করার আগে আপনি কোম্পানির রিসেপশনে ফোন করে দেখেন কেউ আছে কি না। তারা ফোন ধরে, আর দুজনেই বোঝে লাইন খোলা।'
        },
        story: {
          title: { en: 'Nabil phones the front desk', bn: 'নাবিল রিসেপশনে ফোন করে' },
          text: {
            en: 'Before posting anything, Nabil phones the company. Farhana at the front desk picks up and says yes, we are here. Now they both know the line is open.',
            bn: 'কিছু পোস্ট করার আগে নাবিল কোম্পানিতে ফোন করে। রিসেপশনে ফারহানা ফোন ধরে বলে, হ্যাঁ, আমরা আছি। এখন দুজনেই জানে লাইন খোলা।'
          }
        },
        tech: {
          en: 'TCP’s three-way handshake: the client sends SYN, the server answers SYN-ACK, the client sends ACK, and the connection is open. HTTPS uses TCP port 443 by default. HTTP/3 skips TCP and runs over QUIC instead.',
          bn: 'TCP-র three-way handshake: client SYN পাঠায়, server SYN-ACK দেয়, client ACK পাঠায়, তারপর connection খুলে যায়। HTTPS ডিফল্টে TCP port 443 ব্যবহার করে। HTTP/3 TCP বাদ দিয়ে তার বদলে QUIC-এর ওপর চলে।'
        }
      },
      {
        id: 'tls',
        moves: [ { edge: 'lb-browser', label: 'TLS certificate', plain: { en: 'Secret code', bn: 'গোপন কোড' } } ],
        state: { browser: { en: 'TLS keys agreed', bn: 'TLS key ঠিক হয়েছে' } },
        plainState: { browser: { en: 'Code agreed', bn: 'কোড ঠিক হয়েছে' } },
        title: { en: 'You agree a secret code', bn: 'আপনারা গোপন কোড ঠিক করেন' },
        simple: {
          en: 'The front desk proves it is the real company, then you agree a secret code. Anything you send after that is scrambled, so nobody can read it on the way.',
          bn: 'রিসেপশন প্রমাণ করে যে তারাই আসল কোম্পানি, তারপর আপনারা একটা গোপন কোড ঠিক করেন। এরপর যা পাঠাবেন সব গুলিয়ে যায়, তাই পথে কেউ পড়তে পারে না।'
        },
        story: {
          title: { en: 'Nabil and Farhana agree a code', bn: 'নাবিল আর ফারহানা কোড ঠিক করে' },
          text: {
            en: 'Farhana shows her badge to prove this is the real company. Then she and Nabil agree a secret code, so anything Nabil writes from now on is scrambled.',
            bn: 'ফারহানা নিজের ব্যাজ দেখিয়ে প্রমাণ করে এটাই আসল কোম্পানি। তারপর সে আর নাবিল একটা গোপন কোড ঠিক করে, যাতে এখন থেকে নাবিলের লেখা সব গুলিয়ে যায়।'
          }
        },
        tech: {
          en: 'TLS 1.3 needs one round trip: ClientHello with a key share, then ServerHello plus the encrypted certificate and Finished. The certificate authenticates the server and a Diffie-Hellman exchange derives the session keys. The load balancer ends TLS here.',
          bn: 'TLS 1.3 লাগে একটা round trip: key share-সহ ClientHello, তারপর ServerHello আর encrypted certificate ও Finished। certificate server-কে authenticate করে, আর Diffie-Hellman exchange থেকে session key তৈরি হয়। এখানে load balancer-ই TLS শেষ করে।'
        }
      },
      {
        id: 'request',
        moves: [ { edge: 'browser-lb', label: 'GET /api/items', plain: { en: 'Your letter', bn: 'আপনার চিঠি' } } ],
        title: { en: 'You post your letter', bn: 'আপনি চিঠি পোস্ট করেন' },
        simple: {
          en: 'Now you send the real question, scrambled with your secret code: please send me the company’s list of items.',
          bn: 'এবার আপনি আসল প্রশ্নটা পাঠান, গোপন কোডে গুলিয়ে: কোম্পানির আইটেমের তালিকাটা পাঠিয়ে দিন।'
        },
        story: {
          title: { en: 'Nabil posts his letter', bn: 'নাবিল চিঠি পোস্ট করে' },
          text: {
            en: 'Nabil seals his letter in the secret code and hands it to Farhana. It asks one thing: please send me the company’s list of items.',
            bn: 'নাবিল গোপন কোডে চিঠি মুড়ে ফারহানার হাতে দেয়। চিঠিতে একটাই অনুরোধ: কোম্পানির আইটেমের তালিকাটা পাঠিয়ে দিন।'
          }
        },
        tech: {
          en: 'Over the encrypted connection the browser sends `GET /api/items` with headers such as `Host`, and an optional body. HTTP/1.1 reuses the connection, and HTTP/2 multiplexes many parallel requests on it.',
          bn: 'encrypted connection দিয়ে ব্রাউজার `GET /api/items` পাঠায়, সাথে `Host`-এর মতো header আর ইচ্ছেমতো body। HTTP/1.1 connection আবার ব্যবহার করে, আর HTTP/2 তার ওপর অনেক parallel request multiplex করে।'
        }
      },
      {
        id: 'to-nginx',
        moves: [ { edge: 'lb-nginx', label: 'GET /api/items', plain: { en: 'Your letter', bn: 'আপনার চিঠি' } } ],
        state: { lb: { en: 'Picked server B', bn: 'server B বেছেছে' } },
        plainState: { lb: { en: 'Chose mailroom B', bn: 'মেইলরুম B বেছেছে' } },
        title: { en: 'The front desk picks a mailroom', bn: 'রিসেপশন একটা মেইলরুম বেছে নেয়' },
        simple: {
          en: 'The front desk hands your letter to whichever mailroom is free. Sharing visitors out like this stops any one mailroom getting swamped.',
          bn: 'রিসেপশন আপনার চিঠি যে মেইলরুম ফাঁকা সেটায় দেয়। এভাবে দর্শনার্থী ভাগ করে দিলে কোনো একটা মেইলরুম ভারে পড়ে না।'
        },
        story: {
          title: { en: 'Farhana picks a mailroom', bn: 'ফারহানা মেইলরুম বেছে নেয়' },
          text: {
            en: 'Farhana looks at the mailrooms and picks the one with the shortest queue. She gives the letter to Imran, so the front desk is free for the next visitor.',
            bn: 'ফারহানা মেইলরুমগুলো দেখে যেটায় লাইন সবচেয়ে ছোট সেটা বেছে নেয়। সে চিঠিটা ইমরানকে দেয়, তাই রিসেপশন পরের দর্শনার্থীর জন্য ফাঁকা থাকে।'
          }
        },
        tech: {
          en: 'The load balancer picks a backend, for example round-robin or least-connections, and forwards the request. It can add `X-Forwarded-For` with your IP. An L7 balancer reads HTTP, while an L4 one only passes connections along.',
          bn: 'load balancer একটা backend বেছে নেয়, যেমন round-robin বা least-connections, আর request এগিয়ে দেয়। সে আপনার IP-সহ `X-Forwarded-For` যোগ করতে পারে। L7 balancer HTTP পড়ে, আর L4 শুধু connection এগিয়ে দেয়।'
        }
      },
      {
        id: 'to-app',
        moves: [ { edge: 'nginx-app', label: 'proxy_pass', plain: { en: 'Your letter', bn: 'আপনার চিঠি' } } ],
        title: { en: 'The mailroom hands it on', bn: 'মেইলরুম চিঠিটা এগিয়ে দেয়' },
        simple: {
          en: 'The mailroom sorts the post. Simple things like pictures it hands out itself, but a real question goes on to the department that can answer it.',
          bn: 'মেইলরুম ডাক বাছাই করে। ছবির মতো সহজ জিনিস সে নিজেই দিয়ে দেয়, কিন্তু আসল প্রশ্ন চলে যায় যে বিভাগ উত্তর দিতে পারে তার কাছে।'
        },
        story: {
          title: { en: 'Imran sorts the mail', bn: 'ইমরান ডাক বাছাই করে' },
          text: {
            en: 'Imran sorts the morning post. Pictures and flyers he hands out himself, but Nabil’s letter is a real question, so he walks it over to Tahmina in the department.',
            bn: 'ইমরান সকালের ডাক বাছাই করে। ছবি আর বিজ্ঞাপন সে নিজেই দিয়ে দেয়, কিন্তু নাবিলের চিঠি একটা আসল প্রশ্ন, তাই সে হেঁটে গিয়ে বিভাগে তাহমিনার হাতে দেয়।'
          }
        },
        tech: {
          en: 'Nginx serves static files from disk itself and forwards the rest with `proxy_pass`. By default it replaces `Host` and sets `Connection: close` upstream, so add `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` yourself.',
          bn: 'Nginx static file নিজেই disk থেকে দেয়, আর বাকি সব `proxy_pass` দিয়ে এগিয়ে দেয়। ডিফল্টে সে upstream-এ `Host` বদলে দেয় আর `Connection: close` বসায়, তাই `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` নিজে যোগ করুন।'
        }
      },
      {
        id: 'query',
        moves: [ { edge: 'app-db', label: 'SELECT items', plain: { en: 'Find the items', bn: 'আইটেম খুঁজুন' } } ],
        title: { en: 'The department checks the files', bn: 'বিভাগ ফাইল দেখে' },
        simple: {
          en: 'The department needs facts to answer, so it asks the filing cabinet, where the company keeps all its records, to find the items.',
          bn: 'উত্তর দিতে বিভাগের তথ্য লাগে, তাই সে ফাইল কেবিনেটকে, যেখানে কোম্পানি সব রেকর্ড রাখে, আইটেমগুলো খুঁজে দিতে বলে।'
        },
        story: {
          title: { en: 'Tahmina opens the cabinet', bn: 'তাহমিনা কেবিনেট খোলে' },
          text: {
            en: 'Tahmina reads Nabil’s letter and needs facts to answer it. She walks to the filing cabinet, where the company keeps every record, and asks for the list of items.',
            bn: 'তাহমিনা নাবিলের চিঠি পড়ে, উত্তর দিতে তার তথ্য লাগে। সে ফাইল কেবিনেটের কাছে যায়, যেখানে কোম্পানির সব রেকর্ড থাকে, আর আইটেমের তালিকাটা চায়।'
          }
        },
        tech: {
          en: 'The app takes a connection from its pool and runs a parameterized query such as `SELECT * FROM items`. Pools keep connections open for reuse, and passing values separately from the SQL text helps prevent injection.',
          bn: 'app তার pool থেকে একটা connection নেয় আর `SELECT * FROM items`-এর মতো parameterized query চালায়। pool connection খোলা রেখে আবার ব্যবহার করে, আর SQL text থেকে আলাদা করে value পাঠালে injection ঠেকাতে সুবিধা হয়।'
        }
      },
      {
        id: 'rows',
        moves: [ { edge: 'db-app', label: 'rows', plain: { en: 'The items', bn: 'আইটেমগুলো' } } ],
        title: { en: 'The cabinet hands over the items', bn: 'কেবিনেট আইটেমগুলো তুলে দেয়' },
        simple: {
          en: 'The filing cabinet hands back exactly the records asked for. The department now has everything it needs to write its reply.',
          bn: 'ফাইল কেবিনেট ঠিক যে রেকর্ডগুলো চাওয়া হয়েছিল সেগুলোই ফেরত দেয়। এখন উত্তর লিখতে বিভাগের যা লাগে সবই হাতে আছে।'
        },
        story: {
          title: { en: 'The cabinet gives up its files', bn: 'কেবিনেট ফাইলগুলো দেয়' },
          text: {
            en: 'The cabinet slides out exactly the records Nabil asked for. Tahmina checks them, nods, and starts writing a clear reply to put in the post.',
            bn: 'কেবিনেট নাবিলের চাওয়া রেকর্ডগুলোই বের করে দেয়। তাহমিনা দেখে নেয়, মাথা নাড়ে, আর ডাকে দেওয়ার জন্য পরিষ্কার একটা উত্তর লিখতে বসে।'
          }
        },
        tech: {
          en: 'The database returns the matching rows. The app turns them into JSON for the response body and sets the status, here 200 OK, meaning a resource was retrieved and included in the body.',
          bn: 'database মিলে যাওয়া row ফেরত দেয়। app সেগুলোকে response body-র জন্য JSON বানায় আর status বসায়, এখানে 200 OK, মানে একটা resource আনা হয়েছে আর body-তে দেওয়া হয়েছে।'
        }
      },
      {
        id: 'response',
        moves: [
          { edge: 'app-nginx', label: '200 + JSON', plain: { en: 'The reply', bn: 'উত্তর' } },
          { edge: 'nginx-lb', label: '200 + JSON', plain: { en: 'The reply', bn: 'উত্তর' } },
          { edge: 'lb-browser', label: '200 + JSON', plain: { en: 'The reply', bn: 'উত্তর' } }
        ],
        state: { lb: { en: 'Relaying the reply', bn: 'reply এগিয়ে দিচ্ছে' } },
        plainState: { lb: { en: 'Passing it on', bn: 'এগিয়ে দিচ্ছে' } },
        title: { en: 'The reply travels back', bn: 'উত্তর ফিরতি পথে রওনা দেয়' },
        simple: {
          en: 'The department’s reply goes back the way your letter came: through the mailroom and the front desk, then out to you. All is well.',
          bn: 'বিভাগের উত্তর আপনার চিঠির পথেই ফেরে: মেইলরুম আর রিসেপশন হয়ে তারপর আপনার কাছে। সব ঠিক আছে।'
        },
        story: {
          title: { en: 'The reply goes home', bn: 'উত্তর বাড়ি ফেরে' },
          text: {
            en: 'Tahmina’s reply goes back along the same road. Imran waves it through the mailroom, Farhana passes it along the front desk, and out it goes to Nabil.',
            bn: 'তাহমিনার উত্তর একই পথে ফেরে। ইমরান মেইলরুম দিয়ে হাত নেড়ে এগিয়ে দেয়, ফারহানা রিসেপশন থেকে পাঠিয়ে দেয়, আর উত্তর চলে যায় নাবিলের কাছে।'
          }
        },
        tech: {
          en: 'The `200 OK` response retraces the path: app, Nginx, load balancer, browser. HTTP/1.1 connections can be reused, so the browser can send its next request on the same connection.',
          bn: '`200 OK` response একই পথে ফেরে: app, Nginx, load balancer, ব্রাউজার। HTTP/1.1 connection আবার ব্যবহার করা যায়, তাই ব্রাউজার তার পরের request একই connection-এ পাঠাতে পারে।'
        }
      },
      {
        id: 'render',
        work: { node: 'browser', kind: 'result' },
        state: { browser: { en: 'Page rendered', bn: 'পেজ তৈরি' } },
        plainState: { browser: { en: 'Reading the reply', bn: 'উত্তর পড়ছেন' } },
        title: { en: 'You read the reply', bn: 'আপনি উত্তর পড়েন' },
        simple: {
          en: 'Your computer unscrambles the reply and shows the list as a page you can read. The whole trip took a blink.',
          bn: 'আপনার কম্পিউটার উত্তরটা খুলে তালিকাটাকে পড়ার মতো পেজ হিসেবে দেখায়। পুরো যাত্রা এক পলকে শেষ।'
        },
        story: {
          title: { en: 'Nabil reads the reply', bn: 'নাবিল উত্তর পড়ে' },
          text: {
            en: 'Nabil opens the reply and reads the list of items. The whole trip took a blink. He never saw the phone book, the front desk, the mailroom or the cabinet, but each one did its part.',
            bn: 'নাবিল উত্তর খুলে আইটেমের তালিকা পড়ে। পুরো যাত্রা এক পলকে শেষ। ফোন বুক, রিসেপশন, মেইলরুম বা কেবিনেট কাউকেই সে দেখেনি, কিন্তু প্রত্যেকে নিজের কাজটা করেছে।'
          }
        },
        tech: {
          en: 'The browser decrypts the response, parses it and renders the page. A page then triggers more requests for CSS, scripts and images. DevTools Timing splits a request into DNS lookup, initial connection, waiting (TTFB) and download.',
          bn: 'ব্রাউজার response decrypt করে, parse করে আর পেজ render করে। এরপর পেজ CSS, script আর ছবির জন্য আরও request চালায়। DevTools Timing একটা request-কে ভাগ করে দেখায়: DNS lookup, initial connection, waiting (TTFB) আর download।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'bad-gateway',
      label: { en: 'The department is closed', bn: 'বিভাগ বন্ধ' },
      whatIf: {
        en: 'What if the department is closed when the mailroom calls?',
        bn: 'মেইলরুম ডাকতে গেলে যদি বিভাগ বন্ধ থাকে?'
      },
      branchAfter: 'to-nginx',
      steps: [
        {
          id: 'app-down',
          work: { node: 'app', kind: 'error' },
          state: { app: { en: 'Not listening', bn: 'সাড়া নেই' } },
          plainState: { app: { en: 'Nobody inside', bn: 'ভেতরে কেউ নেই' } },
          title: { en: 'The department is closed', bn: 'বিভাগ বন্ধ' },
          simple: {
            en: 'The mailroom walks over to the department, but the lights are off. The department has stopped working, so nobody is there to read your letter.',
            bn: 'মেইলরুম বিভাগের দিকে যায়, কিন্তু আলো নেভানো। বিভাগ কাজ বন্ধ করে দিয়েছে, তাই আপনার চিঠি পড়ার মতো কেউ নেই।'
          },
          story: {
            title: { en: 'The department is dark', bn: 'বিভাগে আলো নেই' },
            text: {
              en: 'On another day Nabil posts the same letter. But when Imran walks over, the department’s lights are off. Tahmina’s desk is empty and nobody can answer letters.',
              bn: 'আরেকদিন নাবিল একই চিঠি পোস্ট করে। কিন্তু ইমরান বিভাগে গিয়ে দেখে আলো নেভানো। তাহমিনার ডেস্ক ফাঁকা, আর চিঠির উত্তর দেওয়ার মতো কেউ নেই।'
            }
          },
          tech: {
            en: 'The app process has crashed or is not listening. When nginx tries to connect, the connection is refused or fails, and nginx counts that as an upstream error.',
            bn: 'app প্রসেস ক্র্যাশ করেছে বা listen করছে না। nginx connect করতে গেলে connection refused হয় বা ব্যর্থ হয়, আর nginx এটাকে upstream error ধরে।'
          }
        },
        {
          id: 'gateway-502',
          moves: [
            { edge: 'nginx-lb-err', label: '502 Bad Gateway', plain: { en: 'Department closed', bn: 'বিভাগ বন্ধ' } },
            { edge: 'lb-browser-err', label: '502 Bad Gateway', plain: { en: 'Department closed', bn: 'বিভাগ বন্ধ' } }
          ],
          title: { en: 'The mailroom reports a problem', bn: 'মেইলরুম সমস্যার খবর দেয়' },
          simple: {
            en: 'The mailroom cannot reach the department, so it sends a note back through the front desk: we could not get an answer for you.',
            bn: 'মেইলরুম বিভাগের নাগাল পায় না, তাই রিসেপশন হয়ে একটা নোট ফেরত পাঠায়: আপনার জন্য উত্তর আনা গেল না।'
          },
          story: {
            title: { en: 'A note instead of a reply', bn: 'উত্তরের বদলে একটা নোট' },
            text: {
              en: 'Imran cannot get an answer, so he writes a note instead of a reply. It travels back through Farhana to Nabil: sorry, we could not reach the department today.',
              bn: 'ইমরান উত্তর আনতে পারে না, তাই উত্তরের বদলে একটা নোট লেখে। নোটটা ফারহানার হাত হয়ে নাবিলের কাছে যায়: দুঃখিত, আজ বিভাগের নাগাল পাওয়া গেল না।'
            }
          },
          tech: {
            en: 'With no valid reply from upstream, nginx answers `502 Bad Gateway` itself. RFC 9110 defines it as an invalid response from an inbound server. The load balancer passes it on, and the fault is on the server side.',
            bn: 'upstream থেকে কোনো valid reply না পেলে nginx নিজেই `502 Bad Gateway` দেয়। RFC 9110 এটাকে সংজ্ঞা দেয় inbound server থেকে পাওয়া invalid response হিসেবে। load balancer সেটা এগিয়ে দেয়, আর ভুলটা server-এর দিকে।'
          }
        }
      ]
    },
    {
      id: 'too-slow',
      label: { en: 'The data takes too long', bn: 'তথ্য আনতে অনেক দেরি' },
      whatIf: {
        en: 'What if the filing cabinet takes too long to find the items?',
        bn: 'ফাইল কেবিনেট আইটেম খুঁজে দিতে যদি অনেক দেরি করে?'
      },
      branchAfter: 'query',
      steps: [
        {
          id: 'slow-db',
          work: { node: 'db', kind: 'queue' },
          state: { db: { en: 'Slow query', bn: 'ধীর query' } },
          plainState: { db: { en: 'Still searching', bn: 'এখনো খুঁজছে' } },
          title: { en: 'The cabinet is slow', bn: 'কেবিনেট ধীর' },
          simple: {
            en: 'The filing cabinet has a huge pile to search, so the department just waits. The mailroom waits too, and the clock keeps ticking.',
            bn: 'ফাইল কেবিনেটে খোঁজার মতো বিশাল স্তূপ, তাই বিভাগ শুধু অপেক্ষা করে। মেইলরুমও অপেক্ষা করে, আর ঘড়ির কাঁটা চলতেই থাকে।'
          },
          story: {
            title: { en: 'The cabinet is slow', bn: 'কেবিনেট ধীর' },
            text: {
              en: 'Today the filing cabinet is jammed with a huge pile of papers. Tahmina waits, Imran waits, and a little clock in the mailroom keeps ticking louder.',
              bn: 'আজ ফাইল কেবিনেটে কাগজের বিশাল স্তূপ জমে আছে। তাহমিনা অপেক্ষা করে, ইমরান অপেক্ষা করে, আর মেইলরুমের ছোট ঘড়িটা ক্রমেই জোরে টিক টিক করে।'
            }
          },
          tech: {
            en: 'The query is slow, say a big table scan, so the app has no reply to send yet. Nginx keeps waiting, and `proxy_read_timeout` counts time between two reads: 60 seconds by default.',
            bn: 'query ধীর, ধরুন বড় table scan, তাই app-এর পাঠানোর মতো reply এখনো নেই। nginx অপেক্ষা করতে থাকে, আর `proxy_read_timeout` দুটো read-এর মাঝের সময় গোনে: ডিফল্ট 60 সেকেন্ড।'
          }
        },
        {
          id: 'gateway-504',
          moves: [
            { edge: 'nginx-lb-err', label: '504 Gateway Timeout', plain: { en: 'Took too long', bn: 'অনেক দেরি হলো' } },
            { edge: 'lb-browser-err', label: '504 Gateway Timeout', plain: { en: 'Took too long', bn: 'অনেক দেরি হলো' } }
          ],
          title: { en: 'The mailroom gives up waiting', bn: 'মেইলরুম অপেক্ষা ছেড়ে দেয়' },
          simple: {
            en: 'The mailroom waited as long as it is allowed to, then gave up and sent a note back through the front desk: sorry, that took too long.',
            bn: 'মেইলরুম যতক্ষণ অপেক্ষার অনুমতি ছিল ততক্ষণ অপেক্ষা করে, তারপর হাল ছেড়ে রিসেপশন হয়ে একটা নোট পাঠায়: দুঃখিত, অনেক দেরি হয়ে গেল।'
          },
          story: {
            title: { en: 'Imran runs out of patience', bn: 'ইমরানের ধৈর্য ফুরোয়' },
            text: {
              en: 'The clock runs out. Imran stops waiting and sends Nabil a note through Farhana: sorry, that took too long. Tahmina is still busy, and Nabil can try again later.',
              bn: 'ঘড়ির সময় শেষ। ইমরান অপেক্ষা থামিয়ে ফারহানার হাত দিয়ে নাবিলকে নোট পাঠায়: দুঃখিত, অনেক দেরি হয়ে গেল। তাহমিনা এখনো ব্যস্ত, নাবিল পরে আবার চেষ্টা করতে পারে।'
            }
          },
          tech: {
            en: 'When nothing arrives within `proxy_read_timeout`, nginx closes the connection and answers `504 Gateway Timeout`. RFC 9110 defines 504 as no timely response from an upstream server. Fix the slow query, or raise the timeout.',
            bn: '`proxy_read_timeout`-এর মধ্যে কিছু না এলে nginx connection বন্ধ করে `504 Gateway Timeout` দেয়। RFC 9110 অনুযায়ী 504 মানে upstream server থেকে সময়মতো কোনো response না পাওয়া। ধীর query ঠিক করুন, বা timeout বাড়ান।'
          }
        }
      ]
    },
    {
      id: 'redirect',
      label: { en: 'You skip the secret code', bn: 'আপনি গোপন কোড বাদ দেন' },
      whatIf: {
        en: 'What if you post the letter without agreeing a secret code?',
        bn: 'গোপন কোড ঠিক না করেই যদি আপনি চিঠি পোস্ট করেন?'
      },
      branchAfter: 'dns-answer',
      steps: [
        {
          id: 'plain-http',
          moves: [ { edge: 'browser-lb', label: 'GET http://', plain: { en: 'Unsealed letter', bn: 'খোলা চিঠি' } } ],
          title: { en: 'You post without a code', bn: 'আপনি কোড ছাড়াই পোস্ট করেন' },
          simple: {
            en: 'You skip the secret code and post your letter in a plain open envelope. Anyone along the road could read it, so the front desk will not take it.',
            bn: 'আপনি গোপন কোড বাদ দিয়ে খোলা খামে চিঠি পোস্ট করেন। পথে যে কেউ পড়ে ফেলতে পারে, তাই রিসেপশন সেটা নেবে না।'
          },
          story: {
            title: { en: 'Nabil forgets the secret code', bn: 'নাবিল গোপন কোড ভুলে যায়' },
            text: {
              en: 'In a hurry, Nabil skips the phone call and the secret code, and hands over his letter in a plain open envelope. Farhana frowns, because anyone passing by could read it.',
              bn: 'তাড়াহুড়োয় নাবিল ফোন করা আর গোপন কোড দুটোই বাদ দিয়ে খোলা খামে চিঠি দিয়ে দেয়। ফারহানা ভুরু কুঁচকায়, কারণ পাশ দিয়ে যে কেউ সেটা পড়ে ফেলতে পারে।'
            }
          },
          tech: {
            en: 'The browser asks for `http://example.com/` over plain TCP port 80, with no TLS, so anyone on the path could read or change the traffic. Well-run sites redirect to HTTPS straight away.',
            bn: 'ব্রাউজার TLS ছাড়া সাধারণ TCP port 80-তে `http://example.com/` চায়, তাই পথের যে কেউ traffic পড়তে বা বদলাতে পারে। ভালো সাইট সঙ্গে সঙ্গে HTTPS-এ redirect করে।'
          }
        },
        {
          id: 'moved',
          moves: [ { edge: 'lb-browser', label: '301 -> https', plain: { en: 'Use a secret code', bn: 'গোপন কোড লাগবে' } } ],
          title: { en: 'The front desk sends you back', bn: 'রিসেপশন আপনাকে ফেরত পাঠায়' },
          simple: {
            en: 'The front desk hands the letter back with a note: we have moved to a safe address, so please use the secret code. You try again the safe way.',
            bn: 'রিসেপশন চিঠিটা নোটসহ ফেরত দেয়: আমরা নিরাপদ ঠিকানায় চলে গেছি, তাই গোপন কোড ব্যবহার করুন। আপনি নিরাপদ উপায়ে আবার চেষ্টা করেন।'
          },
          story: {
            title: { en: 'Farhana sends him back', bn: 'ফারহানা তাকে ফেরত পাঠায়' },
            text: {
              en: 'Farhana hands the letter back with a friendly note: we have moved to a safe address, so please use the secret code. Nabil laughs and goes back to phone ahead properly.',
              bn: 'ফারহানা বন্ধুত্বপূর্ণ একটা নোটসহ চিঠি ফেরত দেয়: আমরা নিরাপদ ঠিকানায় চলে গেছি, তাই গোপন কোড ব্যবহার করুন। নাবিল হেসে ফেলে, আর ঠিকমতো ফোন করতে ফিরে যায়।'
            }
          },
          tech: {
            en: 'The reply is `301 Moved Permanently` with a `Location: https://example.com/` header, and the browser follows it by itself. A 301 may turn a POST into a GET; `308` keeps the method.',
            bn: 'উত্তর হলো `301 Moved Permanently`, সাথে `Location: https://example.com/` header, আর ব্রাউজার নিজে থেকেই সেটা follow করে। 301 কখনো POST-কে GET বানিয়ে দিতে পারে; `308` method ঠিক রাখে।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'Sending a letter to a company works the same way. Every stop has a twin in the building.',
      bn: 'কোম্পানিকে চিঠি পাঠানোও ঠিক এভাবেই চলে। প্রতিটি স্টপের একটা জোড়া আছে ওই ভবনে।'
    },
    twins: [
      {
        icon: 'user',
        node: 'browser',
        name: { en: 'You', bn: 'আপনি' },
        d: {
          en: 'Write the letter, post it, and wait for the reply.',
          bn: 'চিঠি লেখেন, পোস্ট করেন, আর উত্তরের অপেক্ষা করেন।'
        }
      },
      {
        icon: 'bookmark',
        node: 'dns',
        name: { en: 'The phone book', bn: 'ফোন বুক' },
        d: {
          en: 'Turns the company’s name into its street address.',
          bn: 'কোম্পানির নামকে তার রাস্তার ঠিকানায় বদলে দেয়।'
        }
      },
      {
        icon: 'route',
        node: 'lb',
        name: { en: 'The front desk', bn: 'রিসেপশন' },
        d: {
          en: 'Greets every visitor and sends each one to a free mailroom.',
          bn: 'প্রতিটি দর্শনার্থীকে স্বাগত জানায় আর একটা ফাঁকা মেইলরুমে পাঠায়।'
        }
      },
      {
        icon: 'mail',
        node: 'nginx',
        name: { en: 'The mailroom', bn: 'মেইলরুম' },
        d: {
          en: 'Hands out simple things itself and passes real questions to the department.',
          bn: 'সহজ জিনিস নিজেই দিয়ে দেয়, আর আসল প্রশ্ন বিভাগের কাছে পাঠায়।'
        }
      },
      {
        icon: 'worker',
        node: 'app',
        name: { en: 'The department', bn: 'বিভাগ' },
        d: {
          en: 'Reads the letter and works out the answer.',
          bn: 'চিঠি পড়ে আর উত্তর ঠিক করে।'
        }
      },
      {
        icon: 'store',
        node: 'db',
        name: { en: 'The filing cabinet', bn: 'ফাইল কেবিনেট' },
        d: {
          en: 'Keeps every record and finds the one you need.',
          bn: 'সব রেকর্ড রাখে আর আপনার দরকারি রেকর্ডটা খুঁজে দেয়।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'No answer', bn: 'কোনো উত্তর নেই' },
        is: { en: 'is a 502 or 504 error', bn: 'মানে 502 বা 504 error' },
        d: {
          en: 'The mailroom finds the department closed, or gets tired of waiting. Either way, you get a note instead of a reply.',
          bn: 'মেইলরুম বিভাগকে বন্ধ পায়, বা অপেক্ষা করতে করতে ক্লান্ত হয়ে যায়। যা-ই হোক, উত্তরের বদলে আপনি একটা নোট পান।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'What happens when you type a URL and press Enter?',
        bn: 'URL টাইপ করে Enter চাপলে কী ঘটে?'
      },
      short: {
        en: 'DNS finds the address, TCP and TLS open a secure connection, then HTTP sends the request and the server answers.',
        bn: 'DNS ঠিকানা খোঁজে, TCP আর TLS একটা নিরাপদ connection খোলে, তারপর HTTP request পাঠায় আর server উত্তর দেয়।'
      },
      deep: {
        en: 'Caches help at each layer, and a redirect can restart the trip. The browser then parses the HTML and requests more files. HTTP/2 multiplexes requests on one connection, and HTTP/3 uses QUIC instead of TCP.',
        bn: 'প্রতিটি স্তরেই cache কাজে লাগে, আর redirect হলে যাত্রা আবার শুরু হতে পারে। তারপর ব্রাউজার HTML parse করে আরও ফাইল চায়। HTTP/2 একটা connection-এ অনেক request multiplex করে, আর HTTP/3 TCP-র বদলে QUIC ব্যবহার করে।'
      },
      redFlag: {
        en: '“The browser connects straight to the database”, or skipping DNS and TLS.',
        bn: '“ব্রাউজার সরাসরি database-এ connect করে”, বা DNS আর TLS বাদ দিয়ে যাওয়া।'
      }
    },
    {
      q: {
        en: 'What is the difference between an L4 and an L7 load balancer?',
        bn: 'L4 আর L7 load balancer-এর পার্থক্য কী?'
      },
      short: {
        en: 'L4 balances connections (TCP, UDP). L7 understands HTTP.',
        bn: 'L4 connection (TCP, UDP) ভাগ করে। L7 HTTP বোঝে।'
      },
      deep: {
        en: 'An L7 balancer can route by path, host or header, and can end TLS. An L4 one works at the connection level. Both run health checks, so requests go only to healthy targets, and round-robin is a common default.',
        bn: 'L7 balancer path, host বা header দেখে route করতে পারে, আর TLS শেষ করতে পারে। L4 কাজ করে connection স্তরে। দুটোই health check চালায়, তাই request শুধু সুস্থ target-এ যায়, আর round-robin একটা প্রচলিত ডিফল্ট।'
      },
      redFlag: {
        en: '“A load balancer stores user sessions.”',
        bn: '“load balancer user session জমা রাখে।”'
      }
    },
    {
      q: { en: 'What does TLS give you?', bn: 'TLS আপনাকে কী দেয়?' },
      short: {
        en: 'Encryption, integrity and server authentication.',
        bn: 'Encryption, integrity আর server authentication।'
      },
      deep: {
        en: 'A certificate signed by a trusted authority proves who the server is. In TLS 1.3 a Diffie-Hellman exchange then gives both sides a shared key in one round trip, and the data is encrypted with that fast symmetric key.',
        bn: 'বিশ্বস্ত authority-র সই করা certificate প্রমাণ করে server কে। TLS 1.3-তে তারপর Diffie-Hellman exchange এক round trip-এ দুই পক্ষকে একটা shared key দেয়, আর ডেটা সেই দ্রুত symmetric key দিয়ে encrypt হয়।'
      },
      redFlag: {
        en: '“HTTPS encrypts everything with the server’s public key for the whole session.”',
        bn: '“HTTPS পুরো session জুড়ে server-এর public key দিয়ে সব encrypt করে।”'
      }
    },
    {
      q: { en: 'What is the difference between 502 and 504?', bn: '502 আর 504-এর পার্থক্য কী?' },
      short: {
        en: '502: the proxy got an invalid response or none it could use. 504: the upstream did not answer in time.',
        bn: '502: proxy invalid response পেয়েছে বা কাজে লাগার মতো কিছু পায়নি। 504: upstream সময়মতো উত্তর দেয়নি।'
      },
      deep: {
        en: 'RFC 9110 calls both gateway errors. In nginx, a refused or failed upstream connection gives 502, and a timeout gives 504 (`proxy_read_timeout` defaults to 60 seconds). Check whether the app is up for 502, and whether it is slow for 504.',
        bn: 'RFC 9110 দুটোকেই gateway error বলে। nginx-এ upstream connection refused বা ব্যর্থ হলে 502 হয়, আর timeout হলে 504 (`proxy_read_timeout`-এর ডিফল্ট 60 সেকেন্ড)। 502 হলে দেখুন app চালু আছে কি না, 504 হলে দেখুন সেটা ধীর কি না।'
      },
      redFlag: {
        en: '“502 means the client did something wrong.”',
        bn: '“502 মানে client ভুল করেছে।”'
      }
    },
    {
      q: {
        en: 'Why is the client IP wrong behind a proxy, and how do you fix it?',
        bn: 'proxy-র পেছনে client IP ভুল দেখায় কেন, আর কীভাবে ঠিক করবেন?'
      },
      short: {
        en: 'The app sees the proxy’s address. Read `X-Forwarded-For`, but only from a proxy you trust.',
        bn: 'app proxy-র address দেখে। `X-Forwarded-For` পড়ুন, কিন্তু শুধু বিশ্বস্ত proxy-র কাছ থেকে।'
      },
      deep: {
        en: 'Have nginx send `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`. Uvicorn’s `--proxy-headers` is on by default but trusts only `127.0.0.1` unless you set `--forwarded-allow-ips`. Anyone who can reach the app directly can spoof the header.',
        bn: 'nginx-কে দিয়ে `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` পাঠান। Uvicorn-এর `--proxy-headers` ডিফল্টে চালু, কিন্তু `--forwarded-allow-ips` না দিলে শুধু `127.0.0.1`-কে বিশ্বাস করে। যে app-এ সরাসরি পৌঁছাতে পারে, সে header জাল করতে পারে।'
      },
      redFlag: {
        en: '“Just read `X-Forwarded-For` directly.”',
        bn: '“সরাসরি `X-Forwarded-For` পড়ে নিন।”'
      }
    },
    {
      q: {
        en: 'What is a DNS TTL, and what happens when you change a record?',
        bn: 'DNS TTL কী, আর record বদলালে কী হয়?'
      },
      short: {
        en: 'The TTL says how long caches may keep an answer.',
        bn: 'TTL বলে cache কতক্ষণ একটা উত্তর রেখে দিতে পারে।'
      },
      deep: {
        en: 'A cache may reuse an answer until its TTL runs out, so a changed record spreads gradually. Zero means do not cache. Lower the TTL ahead of a planned move.',
        bn: 'TTL শেষ না হওয়া পর্যন্ত cache একটা উত্তর আবার ব্যবহার করতে পারে, তাই বদলানো record ধীরে ধীরে ছড়ায়। শূন্য মানে cache করবে না। পরিকল্পিত বদলের আগে TTL কমিয়ে নিন।'
      },
      redFlag: {
        en: '“DNS changes take effect instantly everywhere.”',
        bn: '“DNS-এর বদল সব জায়গায় সঙ্গে সঙ্গে কার্যকর হয়।”'
      }
    },
    {
      q: {
        en: 'Why put Nginx in front of the app?',
        bn: 'app-এর সামনে Nginx বসাই কেন?'
      },
      short: {
        en: 'It serves static files itself and forwards the rest to the app.',
        bn: 'সে static file নিজেই দেয়, আর বাকি সব app-এ এগিয়ে দেয়।'
      },
      deep: {
        en: 'Uvicorn’s docs say a proxy in front “may not be necessary, but is recommended for additional resilience”. Nginx can also spread requests over several app copies with an `upstream` group, round-robin by default.',
        bn: 'Uvicorn-এর ডকুমেন্টেশন বলে সামনে proxy “দরকার নাও হতে পারে, কিন্তু বাড়তি resilience-এর জন্য সুপারিশ করা হয়”। Nginx `upstream` group দিয়ে কয়েকটা app copy-তে request ভাগও করতে পারে, ডিফল্টে round-robin।'
      },
      redFlag: {
        en: '“Nginx runs my Python code.”',
        bn: '“Nginx আমার Python কোড চালায়।”'
      }
    }
  ],
  cheats: [
    {
      code: 'dig +trace example.com',
      d: {
        en: 'Follow DNS from the root name servers down to the answer.',
        bn: 'root name server থেকে নেমে উত্তর পর্যন্ত DNS অনুসরণ করুন।'
      }
    },
    {
      code: 'curl -v https://example.com',
      d: {
        en: 'Verbose output: connection details plus request and response headers.',
        bn: 'বিস্তারিত আউটপুট: connection-এর তথ্য, সাথে request আর response header।'
      }
    },
    {
      code: 'curl -I https://example.com',
      d: {
        en: 'Fetch the headers only.',
        bn: 'শুধু header আনুন।'
      }
    },
    {
      code: 'curl --resolve example.com:443:203.0.113.10 https://example.com',
      d: {
        en: 'Skip DNS and connect to this address. TLS still checks the name example.com.',
        bn: 'DNS বাদ দিয়ে এই address-এ connect করুন। TLS তবুও example.com নামটাই যাচাই করে।'
      }
    },
    {
      code: 'openssl s_client -connect example.com:443 -servername example.com',
      d: {
        en: 'Open a raw TLS connection and inspect the certificate.',
        bn: 'সরাসরি একটা TLS connection খুলে certificate দেখুন।'
      }
    },
    {
      code: 'nslookup example.com',
      d: {
        en: 'A quick DNS lookup.',
        bn: 'দ্রুত একটা DNS lookup।'
      }
    },
    {
      code: 'traceroute example.com',
      d: {
        en: 'Show each router on the path, using probes with a rising TTL.',
        bn: 'পথের প্রতিটি router দেখুন, বাড়তে থাকা TTL-এর probe দিয়ে।'
      }
    },
    {
      code: 'DevTools > Network > Timing',
      d: {
        en: 'Splits a request into DNS lookup, initial connection, waiting (TTFB) and download.',
        bn: 'একটা request-কে ভাগ করে দেখায়: DNS lookup, initial connection, waiting (TTFB) আর download।'
      }
    }
  ],
  sources: [
    { label: 'RFC 9110: HTTP semantics (301, 502, 504, ports)', url: 'https://www.rfc-editor.org/rfc/rfc9110.html' },
    { label: 'RFC 8446: TLS 1.3', url: 'https://www.rfc-editor.org/rfc/rfc8446.html' },
    { label: 'RFC 1034: DNS concepts and resolution', url: 'https://www.rfc-editor.org/rfc/rfc1034.html' },
    { label: 'RFC 1035: DNS records and TTL', url: 'https://www.rfc-editor.org/rfc/rfc1035.html' },
    { label: 'RFC 5737: documentation addresses', url: 'https://www.rfc-editor.org/rfc/rfc5737.html' },
    { label: 'RFC 9293: TCP', url: 'https://www.rfc-editor.org/rfc/rfc9293.html' },
    { label: 'MDN: Evolution of HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP' },
    { label: 'MDN: How browsers work', url: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work' },
    { label: 'MDN: X-Forwarded-For', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-For' },
    { label: 'nginx: ngx_http_proxy_module', url: 'https://nginx.org/en/docs/http/ngx_http_proxy_module.html' },
    { label: 'nginx: HTTP load balancing', url: 'https://nginx.org/en/docs/http/load_balancing.html' },
    { label: 'nginx source: upstream error statuses', url: 'https://raw.githubusercontent.com/nginx/nginx/master/src/http/ngx_http_upstream.c' },
    { label: 'Uvicorn: settings', url: 'https://uvicorn.dev/settings/' },
    { label: 'Uvicorn: deployment', url: 'https://uvicorn.dev/deployment/' },
    { label: 'AWS: Application Load Balancer (L7)', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html' },
    { label: 'AWS: Network Load Balancer (L4)', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html' },
    { label: 'SQLAlchemy: connection pooling', url: 'https://docs.sqlalchemy.org/en/20/core/pooling.html' },
    { label: 'psycopg: passing query parameters', url: 'https://www.psycopg.org/psycopg3/docs/basic/params.html' },
    { label: 'curl: manual (-v, -I, --resolve)', url: 'https://curl.se/docs/manpage.html' },
    { label: 'OpenSSL: s_client', url: 'https://docs.openssl.org/master/man1/openssl-s_client' },
    { label: 'BIND: dig manual (+trace)', url: 'https://bind9.readthedocs.io/en/latest/manpages.html' },
    { label: 'Chrome DevTools: network timing', url: 'https://developer.chrome.com/docs/devtools/network/reference' }
  ]
}
