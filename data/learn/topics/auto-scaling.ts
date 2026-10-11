import type { Topic } from '../types'

export const autoScaling: Topic = {
  slug: 'auto-scaling',
  line: 'devops',
  title: { en: 'Auto scaling', bn: 'অটো স্কেলিং' },
  summary: {
    en: 'A rule can ask for more servers the moment the line is too busy. The new ones are wanted before they are serving.',
    bn: 'লাইন বেশি ব্যস্ত হলেই একটা নিয়ম আরও সার্ভার চাইতে পারে। নতুনগুলো সার্ভ করার আগেই চাওয়া হয়ে যায়।'
  },
  hook: {
    en: 'Two cooks stay on the line until a rule calls two more, and the new two cannot serve until they pass a check.',
    bn: 'একটা নিয়ম আরও দুজন না ডাকা পর্যন্ত দুই রাঁধুনি লাইনে থাকে, আর নতুন দুজন চেক পাস না করা পর্যন্ত সার্ভ করতে পারে না।'
  },
  story: {
    cast: {
      en: 'Nabila sends orders to Farid at the gate. Rumi and Tania are already on the line, and Lima and Borhan are the new cooks who cannot serve until they pass the check.',
      bn: 'নাবিলা ফরিদের গেটে অর্ডার পাঠায়। রুমি আর তানিয়া আগে থেকেই লাইনে আছে, আর লিমা আর বোরহান নতুন রাঁধুনি, চেক পাস না করা পর্যন্ত তারা সার্ভ করতে পারে না।'
    }
  },
  takeaway: {
    en: 'Wanted is only a number on the rule, and serving starts after the new cooks pass the check.',
    bn: 'চাওয়া শুধু নিয়মের একটা সংখ্যা, আর সার্ভ শুরু হয় নতুন রাঁধুনিরা চেক পাস করার পরে।'
  },
  words: [
    {
      term: { en: 'Line load (CPU)', bn: 'লাইনের চাপ (CPU)' },
      d: {
        en: 'How busy the cooks are, as a share of what the line can carry.',
        bn: 'রাঁধুনিরা কত ব্যস্ত, লাইন যতটা বইতে পারে তার কত অংশ।'
      }
    },
    {
      term: { en: 'The rule (step scaling)', bn: 'নিয়ম (step scaling)' },
      d: {
        en: 'Adds a fixed number of cooks when the line crosses a set mark.',
        bn: 'লাইন একটা নির্দিষ্ট দাগ পেরোলে নির্দিষ্ট সংখ্যক রাঁধুনি যোগ করে।'
      }
    },
    {
      term: { en: 'Wanted (desired capacity)', bn: 'চাওয়া (desired capacity)' },
      d: {
        en: 'How many cooks the rule says should be on the shift.',
        bn: 'নিয়ম বলছে শিফটে কতজন রাঁধুনি থাকা উচিত।'
      }
    },
    {
      term: { en: 'Serving (in service)', bn: 'সার্ভ করছে (in service)' },
      d: {
        en: 'Cooks who passed the check and are taking orders.',
        bn: 'যে রাঁধুনিরা চেক পাস করে অর্ডার নিচ্ছে।'
      }
    },
    {
      term: { en: 'Warm pool', bn: 'ওয়ার্ম পুল' },
      d: {
        en: 'Cooks already dressed, waiting off the line until the rule calls.',
        bn: 'রাঁধুনিরা তৈরি হয়ে লাইনের বাইরে অপেক্ষা করে, নিয়ম ডাকলে আসে।'
      }
    },
    {
      term: { en: 'Target tracking', bn: 'টার্গেট ট্র্যাকিং' },
      d: {
        en: 'A rule that holds the line near one level, not a fixed extra number.',
        bn: 'একটা নিয়ম যা লাইনকে একটা স্তরের কাছে রাখে, নির্দিষ্ট বাড়তি সংখ্যা নয়।'
      }
    }
  ],
  legend: {
    request: { en: 'An order, or a call for help', bn: 'একটা অর্ডার, বা সাহায্যের ডাক' },
    result: { en: 'Cooks joining the line', bn: 'রাঁধুনিরা লাইনে যোগ দিচ্ছে' },
    error: { en: 'Too busy, or sent back', bn: 'বেশি ব্যস্ত, বা ফেরত পাঠানো' }
  },
  view: { wide: [960, 480], narrow: [400, 560] },
  nodeR: { narrow: 20 },
  nodes: {
    door: {
      icon: 'user',
      name: { en: 'Requests', bn: 'রিকোয়েস্ট' },
      sub: { en: 'Arriving orders', bn: 'আসা অর্ডার' },
      plain: { name: { en: 'Nabila', bn: 'নাবিলা' }, sub: { en: 'Sends orders', bn: 'অর্ডার পাঠায়' } },
      wide: [150, 250, 'up'],
      narrow: [200, 48, 'left']
    },
    gate: {
      icon: 'route',
      name: { en: 'Load balancer', bn: 'লোড ব্যালেন্সার' },
      sub: { en: 'Shares the orders', bn: 'অর্ডার ভাগ করে' },
      plain: { name: { en: 'Farid', bn: 'ফরিদ' }, sub: { en: 'The gate', bn: 'গেট' } },
      wide: [300, 250, 'up'],
      narrow: [200, 150, 'right']
    },
    line: {
      icon: 'server',
      name: { en: 'In service', bn: 'ইন সার্ভিস' },
      sub: { en: 'Cooks taking orders', bn: 'অর্ডার নেওয়া রাঁধুনি' },
      plain: { name: { en: 'The line', bn: 'লাইন' }, sub: { en: 'Rumi and Tania', bn: 'রুমি আর তানিয়া' } },
      wide: [560, 250, 'down'],
      narrow: [200, 260, 'left']
    },
    rule: {
      icon: 'alert',
      name: { en: 'Scaling policy', bn: 'স্কেলিং পলিসি' },
      sub: { en: 'Adds a fixed number', bn: 'নির্দিষ্ট সংখ্যা যোগ করে' },
      plain: { name: { en: 'The rule', bn: 'নিয়ম' }, sub: { en: 'How many to call', bn: 'কতজন ডাকতে হবে' } },
      wide: [560, 78, 'left'],
      narrow: [120, 370, 'up']
    },
    bench: {
      icon: 'hourglass',
      name: { en: 'Launching', bn: 'চালু হচ্ছে' },
      sub: { en: 'Not taking orders', bn: 'অর্ডার নিচ্ছে না' },
      plain: { name: { en: 'The bench', bn: 'বেঞ্চ' }, sub: { en: 'Getting ready', bn: 'তৈরি হচ্ছে' } },
      wide: [830, 150, 'right'],
      narrow: [280, 370, 'down']
    },
    check: {
      icon: 'check',
      name: { en: 'Health check', bn: 'হেলথ চেক' },
      sub: { en: 'Fit to take orders', bn: 'অর্ডার নেওয়ার যোগ্য' },
      plain: { name: { en: 'The check', bn: 'চেক' }, sub: { en: 'Fit to serve', bn: 'সার্ভের যোগ্য' } },
      wide: [830, 360, 'right'],
      narrow: [200, 490, 'down']
    }
  },
  corridors: {
    'door-gate': { wide: [[150, 250], [300, 250]], narrow: [[200, 48], [200, 150]] },
    'gate-line': { wide: [[300, 250], [560, 250]], narrow: [[200, 150], [200, 260]] },
    'line-rule': { wide: [[560, 250], [560, 78]], narrow: [[200, 260], [200, 330], [120, 370]] },
    'rule-bench': { wide: [[560, 78], [830, 78], [830, 150]], narrow: [[120, 370], [280, 370]] },
    'bench-check': { wide: [[830, 150], [830, 360]], narrow: [[280, 370], [280, 440], [200, 490]] },
    'check-line': { wide: [[830, 360], [830, 430], [560, 430], [560, 250]], narrow: [[200, 490], [350, 490], [350, 260], [200, 260]] }
  },
  edges: {
    'door-gate': { from: 'door', to: 'gate', kind: 'request' },
    'gate-line': { from: 'gate', to: 'line', kind: 'request' },
    'line-rule': { from: 'line', to: 'rule', kind: 'request' },
    'rule-bench': { from: 'rule', to: 'bench', kind: 'request' },
    'bench-check': { from: 'bench', to: 'check', kind: 'request' },
    'check-line': { from: 'check', to: 'line', kind: 'result' },
    'check-bench': { from: 'check', to: 'bench', kind: 'error' }
  },
  main: {
    label: { en: 'They join the line', bn: 'তারা লাইনে যোগ দেয়' },
    steps: [
      {
        id: 'arrive',
        moves: [
          { edge: 'door-gate', label: 'an order', plain: { en: 'An order', bn: 'একটা অর্ডার' } },
          { edge: 'gate-line', label: 'an order', plain: { en: 'An order', bn: 'একটা অর্ডার' } }
        ],
        state: { line: { en: '2 InService', bn: '২ জন InService' } },
        plainState: { line: { en: '2 serving', bn: '২ জন সার্ভ করছে' } },
        title: { en: 'Two cooks take the order', bn: 'দুই রাঁধুনি অর্ডার নেয়' },
        simple: {
          en: 'Your order reaches the gate, then the two cooks already on the line. Both are under the mark, so nothing new is called.',
          bn: 'আপনার অর্ডার গেটে পৌঁছায়, তারপর লাইনে থাকা দুই রাঁধুনির কাছে যায়। দুজনেই দাগের নিচে, তাই নতুন কাউকে ডাকা হয় না।'
        },
        story: {
          title: { en: 'Nabila reaches two cooks', bn: 'নাবিলা দুই রাঁধুনির কাছে পৌঁছায়' },
          text: {
            en: 'Nabila sends an order to Farid. He passes it to Rumi and Tania, who are both under the mark, so nobody calls for help.',
            bn: 'নাবিলা ফরিদকে একটা অর্ডার পাঠায়। সে সেটা রুমি আর তানিয়ার কাছে দেয়, দুজনেই দাগের নিচে, তাই কেউ সাহায্য ডাকে না।'
          }
        },
        tech: {
          en: 'The load balancer sends the request to one of two `InService` instances. Desired capacity is 2. Average CPU is under the policy mark, so no scaling policy runs.',
          bn: 'লোড ব্যালেন্সার রিকোয়েস্ট পাঠায় দুটো `InService` ইনস্ট্যান্সের একটিতে। Desired capacity ২। গড় CPU পলিসির দাগের নিচে, তাই কোনো স্কেলিং পলিসি চলে না।'
        }
      },
      {
        id: 'crossed',
        work: { node: 'line', kind: 'error' },
        state: { line: { en: 'CPU over the mark', bn: 'CPU দাগের উপরে' } },
        plainState: { line: { en: 'Over the mark', bn: 'দাগের উপরে' } },
        title: { en: 'The line crosses the mark', bn: 'লাইন দাগ পেরোয়' },
        simple: {
          en: 'The two cooks are now too busy. The line has crossed the mark, and orders are still arriving for only those two.',
          bn: 'দুই রাঁধুনি এখন বেশি ব্যস্ত। লাইন দাগ পেরিয়ে গেছে, আর অর্ডার তখনও শুধু এই দুজনের জন্যই আসছে।'
        },
        story: {
          title: { en: 'The line gets too busy', bn: 'লাইন বেশি ব্যস্ত হয়ে যায়' },
          text: {
            en: 'Orders keep coming. Rumi and Tania are past the mark, but Lima and Borhan are not on the line, so the two of them still take every order.',
            bn: 'অর্ডার আসতেই থাকে। রুমি আর তানিয়া দাগ পেরিয়ে গেছে, কিন্তু লিমা আর বোরহান লাইনে নেই, তাই এই দুজনই তখনও প্রতিটি অর্ডার নেয়।'
          }
        },
        tech: {
          en: 'A CloudWatch alarm watches average CPU. This ride uses a step policy: cross the mark and add two. The alarm period and how many periods must breach are yours to set. They are not a fixed clock.',
          bn: 'একটা CloudWatch অ্যালার্ম গড় CPU দেখে। এই যাত্রায় একটা স্টেপ পলিসি: দাগ পেরোলে দুজন যোগ হয়। অ্যালার্মের পিরিয়ড আর কয়টা পিরিয়ড ভাঙতে হবে, সেটা আপনার সেট করা। এটা কোনো স্থির ঘড়ি নয়।'
        }
      },
      {
        id: 'ask',
        moves: [{ edge: 'line-rule', label: 'add two', plain: { en: 'Add two', bn: 'দুজন যোগ' } }],
        state: { rule: { en: 'desired 4', bn: 'desired ৪' } },
        plainState: { rule: { en: '4 wanted', bn: '৪ জন চাওয়া' } },
        title: { en: 'The rule asks for two more', bn: 'নিয়ম আরও দুজন চায়' },
        simple: {
          en: 'The rule does not put the new cooks on the line. It only raises how many are wanted, from two to four.',
          bn: 'নিয়ম নতুন রাঁধুনিদের লাইনে বসায় না। সে শুধু চাওয়ার সংখ্যা বাড়ায়, দুই থেকে চার।'
        },
        story: {
          title: { en: 'The rule asks for two more', bn: 'নিয়ম আরও দুজন চায়' },
          text: {
            en: 'The rule raises the wanted number from two to four. Lima and Borhan are wanted now, and they are still not serving.',
            bn: 'নিয়ম চাওয়ার সংখ্যা দুই থেকে চার করে। লিমা আর বোরহান এখন চাওয়া, আর তারা তখনও সার্ভ করছে না।'
          }
        },
        tech: {
          en: 'The alarm invokes the step policy, which changes desired capacity by two, up to the group maximum. Desired capacity is not the number of instances registered and taking traffic.',
          bn: 'অ্যালার্ম স্টেপ পলিসিকে ডাকে, যা desired capacity দুই বাড়ায়, গ্রুপের সর্বোচ্চ পর্যন্ত। Desired capacity মানে রেজিস্টার্ড হয়ে ট্রাফিক নেওয়া ইনস্ট্যান্সের সংখ্যা নয়।'
        }
      },
      {
        id: 'launch',
        moves: [{ edge: 'rule-bench', label: 'two new', plain: { en: 'Two new', bn: 'দুজন নতুন' } }],
        state: { bench: { en: 'Pending', bn: 'Pending' } },
        plainState: { bench: { en: 'Not serving', bn: 'সার্ভ করছে না' } },
        title: { en: 'Two new cooks start getting ready', bn: 'দুই নতুন রাঁধুনি তৈরি হতে শুরু করে' },
        simple: {
          en: 'Two new cooks are called to the bench. They are wanted, but they are not serving, so every order still lands on the first two.',
          bn: 'দুই নতুন রাঁধুনিকে বেঞ্চে ডাকা হয়। তারা চাওয়া, কিন্তু সার্ভ করছে না, তাই প্রতিটি অর্ডার তখনও প্রথম দুজনের কাছেই পড়ে।'
        },
        story: {
          title: { en: 'Lima and Borhan get ready', bn: 'লিমা আর বোরহান তৈরি হয়' },
          text: {
            en: 'Lima and Borhan start getting ready on the bench. Farid can still hand orders only to Rumi and Tania.',
            bn: 'লিমা আর বোরহান বেঞ্চে তৈরি হতে শুরু করে। ফরিদ তখনও অর্ডার শুধু রুমি আর তানিয়ার হাতেই দিতে পারে।'
          }
        },
        tech: {
          en: 'The group launches the gap between desired capacity and the instances it already has. A new instance is Pending while it boots. It is not `InService`, and the load balancer is not sending it traffic yet.',
          bn: 'গ্রুপ desired capacity আর তার কাছে থাকা ইনস্ট্যান্সের ফারাকটা লঞ্চ করে। নতুন ইনস্ট্যান্স বুট করার সময় Pending। সে `InService` নয়, আর লোড ব্যালেন্সার তখনও তাকে ট্রাফিক পাঠাচ্ছে না।'
        }
      },
      {
        id: 'health',
        moves: [{ edge: 'bench-check', label: 'a check', plain: { en: 'A health check', bn: 'একটা চেক' } }],
        state: { check: { en: 'Health check', bn: 'হেলথ চেক' } },
        plainState: { check: { en: 'Still waiting', bn: 'তখনও অপেক্ষা' } },
        title: { en: 'Someone checks they can serve', bn: 'কেউ দেখে তারা সার্ভ করতে পারে কিনা' },
        simple: {
          en: 'A check looks at the new cooks before they join the line. Until they pass, the gate still has only two cooks to share orders with.',
          bn: 'লাইনে যোগ দেওয়ার আগে একটা চেক নতুন রাঁধুনিদের দেখে। তারা পাস না করা পর্যন্ত গেটের কাছে অর্ডার ভাগ করার মতো রাঁধুনি শুধু দুজন।'
        },
        story: {
          title: { en: 'The check comes before the line', bn: 'চেক আসে লাইনের আগে' },
          text: {
            en: 'Someone checks Lima and Borhan before they may join. Until they pass, the line is still two cooks.',
            bn: 'যোগ দেওয়ার আগে কেউ লিমা আর বোরহানকে চেক করে। তারা পাস না করা পর্যন্ত লাইনে দুজনই থাকে।'
          }
        },
        tech: {
          en: 'The group registers a new instance with the load balancer before `InService`. EC2 status checks are the default. Load balancer checks count only if you enable them. Console grace starts at 300 seconds. The CLI default is 0.',
          bn: '`InService`-এর আগে গ্রুপ নতুন ইনস্ট্যান্সকে লোড ব্যালেন্সারে রেজিস্টার করে। EC2 স্ট্যাটাস চেকই ডিফল্ট। লোড ব্যালেন্সারের চেক গোনা হয় শুধু আপনি সেটা চালু করলে। কনসোল গ্রেস শুরু ৩০০ সেকেন্ডে। CLI ডিফল্ট ০।'
        }
      },
      {
        id: 'join',
        moves: [{ edge: 'check-line', label: 'join line', plain: { en: 'Now serving', bn: 'এখন সার্ভ' } }],
        state: {
          line: { en: '4 InService', bn: '৪ জন InService' },
          bench: { en: 'Launched', bn: 'লঞ্চ হয়েছে' },
          check: { en: 'Healthy', bn: 'সুস্থ' }
        },
        plainState: {
          line: { en: '4 serving', bn: '৪ জন সার্ভ করছে' },
          bench: { en: 'Left the bench', bn: 'বেঞ্চ ছেড়েছে' },
          check: { en: 'Passed', bn: 'পাস' }
        },
        title: { en: 'Four cooks are serving', bn: 'চার রাঁধুনি সার্ভ করছে' },
        simple: {
          en: 'The new cooks pass and join the line. Four are serving now, and the wait while they got ready is why the rush felt late.',
          bn: 'নতুন রাঁধুনিরা পাস করে লাইনে যোগ দেয়। এখন চারজন সার্ভ করছে, আর তৈরি হওয়ার অপেক্ষাটাই রাশকে দেরিতে মনে করায়।'
        },
        story: {
          title: { en: 'Four cooks take orders', bn: 'চার রাঁধুনি অর্ডার নেয়' },
          text: {
            en: 'Lima and Borhan pass and step onto the line. Four cooks are serving, later than the moment the rule fired.',
            bn: 'লিমা আর বোরহান পাস করে লাইনে ওঠে। চার রাঁধুনি সার্ভ করছে, নিয়ম চালু হওয়ার মুহূর্তের চেয়ে পরে।'
          }
        },
        tech: {
          en: 'Once the instance is `InService` and the load balancer calls it healthy, it receives traffic. Step scaling can scale out again without the simple-policy cooldown. The 300 second default cooldown belongs to simple scaling, and this ride is not that policy.',
          bn: 'ইনস্ট্যান্স `InService` হলে এবং লোড ব্যালেন্সার তাকে সুস্থ বললে সে ট্রাফিক পায়। স্টেপ স্কেলিং আবার স্কেল আউট করতে পারে সিম্পল পলিসির কুলডাউন ছাড়াই। ৩০০ সেকেন্ডের ডিফল্ট কুলডাউন সিম্পল স্কেলিংয়ের, আর এই যাত্রা সেই পলিসি নয়।'
        }
      },
      {
        id: 'shared',
        moves: [
          { edge: 'door-gate', label: 'an order', plain: { en: 'An order', bn: 'একটা অর্ডার' } },
          { edge: 'gate-line', label: 'an order', plain: { en: 'An order', bn: 'একটা অর্ডার' } }
        ],
        title: { en: 'The next order is shared by four', bn: 'পরের অর্ডার চারজনে ভাগ হয়' },
        simple: {
          en: 'A new order comes through the gate, and the four cooks share it. The line can sit back under the mark.',
          bn: 'নতুন একটা অর্ডার গেট দিয়ে আসে, আর চার রাঁধুনি সেটা ভাগ করে নেয়। লাইন আবার দাগের নিচে বসতে পারে।'
        },
        story: {
          title: { en: 'Farid shares the next order', bn: 'ফরিদ পরের অর্ডার ভাগ করে' },
          text: {
            en: 'Nabila sends another order. Farid shares it across four cooks, and the line can drop back under the mark.',
            bn: 'নাবিলা আরেকটা অর্ডার পাঠায়। ফরিদ সেটা চার রাঁধুনিতে ভাগ করে, আর লাইন আবার দাগের নিচে নামতে পারে।'
          }
        },
        tech: {
          en: 'Four `InService` instances now share requests. Landing near half the CPU afterwards is just the after state of adding two. It does not, by itself, mean the policy was target tracking.',
          bn: 'চারটা `InService` ইনস্ট্যান্স এখন রিকোয়েস্ট ভাগ করে। পরে CPU অর্ধেকের কাছে থাকাটা শুধু দুজন যোগ হওয়ার পরের অবস্থা। এটা নিজে থেকে বোঝায় না যে পলিসিটা টার্গেট ট্র্যাকিং ছিল।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'failed-check',
      label: { en: 'The check fails', bn: 'চেক ফেল করে' },
      branchAfter: 'health',
      whatIf: {
        en: 'What if the new cooks fail the check and never join the line?',
        bn: 'নতুন রাঁধুনিরা চেক ফেল করলে এবং লাইনে না যোগ দিলে কী হয়?'
      },
      steps: [
        {
          id: 'sent-back',
          moves: [{ edge: 'check-bench', label: 'sent back', plain: { en: 'Sent back', bn: 'ফেরত' } }],
          title: { en: 'The new cooks are sent back', bn: 'নতুন রাঁধুনিদের ফেরত পাঠানো হয়' },
          simple: {
            en: 'The new cooks fail the check. They are sent back, and they never reach the cooks who are already serving.',
            bn: 'নতুন রাঁধুনিরা চেক ফেল করে। তাদের ফেরত পাঠানো হয়, আর তারা কখনো সেই রাঁধুনিদের কাছে পৌঁছায় না যারা আগে থেকেই সার্ভ করছে।'
          },
          story: {
            title: { en: 'The new cooks are sent back', bn: 'নতুন রাঁধুনিদের ফেরত পাঠানো হয়' },
            text: {
              en: 'Lima and Borhan fail the check. They are sent back and never stand next to Rumi and Tania.',
              bn: 'লিমা আর বোরহান চেক ফেল করে। তাদের ফেরত পাঠানো হয়, আর তারা কখনো রুমি আর তানিয়ার পাশে দাঁড়ায় না।'
            }
          },
          tech: {
            en: 'A failed health check marks the instance unhealthy. The group terminates it and launches a replacement so desired capacity still has a healthy instance. Replacement does not wait out a cooldown.',
            bn: 'ফেল হওয়া হেলথ চেক ইনস্ট্যান্সকে অস্বাস্থ্যকর চিহ্নিত করে। গ্রুপ সেটা বন্ধ করে একটা বদলি লঞ্চ করে, যাতে desired capacity-র একটা সুস্থ ইনস্ট্যান্স থাকে। বদলি কুলডাউনের জন্য অপেক্ষা করে না।'
          }
        },
        {
          id: 'still-two',
          work: { node: 'line', kind: 'error' },
          state: { line: { en: 'desired 4, 2 InService', bn: 'desired ৪, ২ জন InService' } },
          plainState: { line: { en: '2 serving', bn: '২ জন সার্ভ করছে' } },
          title: { en: 'The line is still two cooks', bn: 'লাইনে তখনও দুই রাঁধুনি' },
          simple: {
            en: 'The rule may still say four are wanted. Only the first two are serving, so the gate keeps handing every order to them.',
            bn: 'নিয়ম তখনও বলতে পারে চারজন চাওয়া। সার্ভ করছে শুধু প্রথম দুজন, তাই গেট প্রতিটি অর্ডার তাদের হাতেই দিতে থাকে।'
          },
          story: {
            title: { en: 'The line stays two cooks', bn: 'লাইনে দুই রাঁধুনিই থাকে' },
            text: {
              en: 'The rule can still say four are wanted. Only Rumi and Tania are serving, so Farid keeps giving them every order.',
              bn: 'নিয়ম তখনও বলতে পারে চারজন চাওয়া। সার্ভ করছে শুধু রুমি আর তানিয়া, তাই ফরিদ প্রতিটি অর্ডার তাদেরই দিতে থাকে।'
            }
          },
          tech: {
            en: 'Desired capacity can read 4 while only two instances are `InService`. The load balancer keeps using the healthy ones. A warm pool shortens the next boot, and those instances still do not serve until they join.',
            bn: 'Desired capacity ৪ দেখাতে পারে যখন `InService` ইনস্ট্যান্স মাত্র দুটো। লোড ব্যালেন্সার সুস্থগুলোই ব্যবহার করতে থাকে। ওয়ার্ম পুল পরের বুট ছোট করে, আর সেই ইনস্ট্যান্স যোগ না দেওয়া পর্যন্ত সার্ভ করে না।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A lunch counter works the same way. The rule can write a bigger number before the new cooks are allowed to take an order.',
      bn: 'একটা লাঞ্চ কাউন্টারও এভাবেই চলে। নতুন রাঁধুনিরা অর্ডার নেওয়ার অনুমতি পাওয়ার আগেই নিয়ম বড় একটা সংখ্যা লিখে ফেলতে পারে।'
    },
    twins: [
      { node: 'door', icon: 'user', name: { en: 'Nabila', bn: 'নাবিলা' }, d: { en: 'The orders that keep arriving, busy line or not.', bn: 'যে অর্ডার আসতেই থাকে, লাইন ব্যস্ত হোক বা না হোক।' } },
      { node: 'gate', icon: 'route', name: { en: 'Farid', bn: 'ফরিদ' }, d: { en: 'The gate that shares each order with cooks who are serving.', bn: 'গেট, যে প্রতিটি অর্ডার সার্ভ করা রাঁধুনিদের মধ্যে ভাগ করে।' } },
      { node: 'line', icon: 'server', name: { en: 'Rumi and Tania', bn: 'রুমি আর তানিয়া' }, d: { en: 'The cooks already on the line, taking orders before anyone new arrives.', bn: 'লাইনে থাকা রাঁধুনি, নতুন কেউ আসার আগেই অর্ডার নিচ্ছে।' } },
      { node: 'rule', icon: 'alert', name: { en: 'The rule', bn: 'নিয়ম' }, d: { en: 'A written mark. Cross it, and two more names go on the shift list.', bn: 'লেখা একটা দাগ। পেরোলে শিফটের তালিকায় আরও দুটি নাম ওঠে।' } },
      { node: 'bench', icon: 'hourglass', name: { en: 'Lima and Borhan', bn: 'লিমা আর বোরহান' }, d: { en: 'New cooks getting ready. Wanted is not the same as serving.', bn: 'নতুন রাঁধুনি তৈরি হচ্ছে। চাওয়া আর সার্ভ করা এক জিনিস নয়।' } },
      { node: 'check', icon: 'check', name: { en: 'The check', bn: 'চেক' }, d: { en: 'The look that decides whether a new cook may step up and take an order.', bn: 'যে দেখা ঠিক করে নতুন রাঁধুনি এগিয়ে এসে অর্ডার নিতে পারবে কিনা।' } }
    ]
  },
  qa: [
    {
      q: { en: 'What is the difference between desired capacity and in service?', bn: 'Desired capacity আর in service-এর পার্থক্য কী?' },
      short: { en: 'Desired is how many you want. In service is how many have joined and can take traffic.', bn: 'Desired হলো আপনি কতজন চান। In service হলো কতজন যোগ দিয়ে ট্রাফিক নিতে পারে।' },
      deep: {
        en: 'A scaling policy changes desired capacity. The group then launches or terminates instances until the running set matches. A new instance stays out of service while it boots, registers with the load balancer, and passes health checks. The load balancer keeps sending work to the ones already in service.',
        bn: 'স্কেলিং পলিসি desired capacity বদলায়। তারপর গ্রুপ ইনস্ট্যান্স লঞ্চ বা বন্ধ করে যতক্ষণ না চলমান সেট মিলে যায়। নতুন ইনস্ট্যান্স বুট, লোড ব্যালেন্সারে রেজিস্টার, আর হেলথ চেক পাস করার সময় সার্ভিসের বাইরে থাকে। লোড ব্যালেন্সার কাজ পাঠাতে থাকে যারা আগে থেকেই সার্ভিসে আছে তাদের কাছে।'
      },
      redFlag: { en: 'Saying the fleet tile “4 running” means four servers are already taking traffic.', bn: 'বলা যে ফ্লিট টাইলের “৪ রানিং” মানে চার সার্ভার আগে থেকেই ট্রাফিক নিচ্ছে।' }
    },
    {
      q: { en: 'What does a step scaling policy actually do?', bn: 'একটা স্টেপ স্কেলিং পলিসি আসলে কী করে?' },
      short: { en: 'A CloudWatch alarm fires it, and it adds or removes a number that depends on how far the metric crossed the mark.', bn: 'একটা CloudWatch অ্যালার্ম সেটা চালায়, আর মেট্রিক দাগ কতটা পেরিয়েছে তার উপর নির্ভর করে একটা সংখ্যা যোগ বা বাদ দেয়।' },
      deep: {
        en: 'You own the alarm and the step adjustments. “CPU over 70, add two” is one step. A bigger breach can be a bigger step. Step policies can scale out again without waiting for the simple-policy cooldown. New instances have a warmup, and while warmup is in progress a scale-in from step or target tracking waits.',
        bn: 'অ্যালার্ম আর স্টেপ অ্যাডজাস্টমেন্ট আপনার। “CPU ৭০-এর উপরে, দুজন যোগ” একটা স্টেপ। আরও বড় ভাঙন আরও বড় স্টেপ হতে পারে। স্টেপ পলিসি সিম্পল পলিসির কুলডাউন না অপেক্ষা করেই আবার স্কেল আউট করতে পারে। নতুন ইনস্ট্যান্সের ওয়ার্মআপ থাকে, আর ওয়ার্মআপ চলাকালীন স্টেপ বা টার্গেট ট্র্যাকিংয়ের স্কেল-ইন অপেক্ষা করে।'
      },
      redFlag: { en: 'Treating the reel’s 66, 66, 75 and 45 second chips, or its 4:00, as AWS defaults.', bn: 'রিলের ৬৬, ৬৬, ৭৫ আর ৪৫ সেকেন্ডের চিপ, বা তার ৪:০০-কে AWS ডিফল্ট ভাবা।' }
    },
    {
      q: { en: 'How is that different from target tracking, predictive scaling, and a warm pool?', bn: 'টার্গেট ট্র্যাকিং, প্রেডিকটিভ স্কেলিং, আর ওয়ার্ম পুল থেকে এটা কীভাবে আলাদা?' },
      short: { en: 'Target tracking chases a metric. Predictive schedules ahead from past load. A warm pool boots less because instances are already prepared.', bn: 'টার্গেট ট্র্যাকিং একটা মেট্রিক তাড়া করে। প্রেডিকটিভ আগের লোড দেখে আগে থেকে সময় করে। ওয়ার্ম পুলে ইনস্ট্যান্স আগে থেকে তৈরি থাকায় বুট কম লাগে।' },
      deep: {
        en: 'Target tracking sets desired capacity to hold a metric, such as average CPU, near a target you choose. AWS recommends it when the metric moves opposite to capacity. Predictive scaling uses history to change capacity before the spike. A warm pool keeps initialized instances outside the serving count. None of them make a new instance serve before it joins and passes health checks. Ending near 50% CPU after a step of “add two” is the after picture, not proof of target tracking.',
        bn: 'টার্গেট ট্র্যাকিং desired capacity এমনভাবে সেট করে যাতে একটা মেট্রিক, যেমন গড় CPU, আপনার বেছে নেওয়া লক্ষ্যের কাছে থাকে। মেট্রিক যখন ক্যাপাসিটির উল্টো দিকে নড়ে, AWS সেটাই সাজেস্ট করে। প্রেডিকটিভ স্কেলিং ইতিহাস দেখে স্পাইকের আগে ক্যাপাসিটি বদলায়। ওয়ার্ম পুল ইনিশিয়ালাইজড ইনস্ট্যান্স সার্ভিং কাউন্টের বাইরে রাখে। কেউই নতুন ইনস্ট্যান্সকে যোগ দেওয়া আর হেলথ চেকের আগে সার্ভ করায় না। “দুজন যোগ”-এর পর CPU ৫০%-এর কাছে থাকাটা পরের ছবি, টার্গেট ট্র্যাকিংয়ের প্রমাণ নয়।'
      },
      redFlag: { en: 'Calling the second frame target tracking because CPU settled near 50%.', bn: 'দ্বিতীয় ফ্রেমকে টার্গেট ট্র্যাকিং বলা কারণ CPU ৫০%-এর কাছে স্থির হয়েছে।' }
    },
    {
      q: { en: 'Why can users still see failures while the new instances exist?', bn: 'নতুন ইনস্ট্যান্স থাকতেও ব্যবহারকারীরা ব্যর্থতা দেখে কেন?' },
      short: { en: 'Because existence is not in service. Only healthy instances behind the load balancer take requests.', bn: 'কারণ থাকা মানে সার্ভিসে থাকা নয়। লোড ব্যালেন্সারের পেছনে শুধু সুস্থ ইনস্ট্যান্সই রিকোয়েস্ট নেয়।' },
      deep: {
        en: 'Until the new instances register and pass checks, every request still goes to the original ones. If those are saturated, the load balancer can fail requests even while the group is launching capacity. The count of those failures in the reel is a story prop, not a formula.',
        bn: 'নতুন ইনস্ট্যান্স রেজিস্টার করে চেক পাস না করা পর্যন্ত প্রতিটি রিকোয়েস্ট আগেরগুলোর কাছেই যায়। সেগুলো স্যাচুরেটেড হলে গ্রুপ ক্যাপাসিটি লঞ্চ করার সময়ও লোড ব্যালেন্সার রিকোয়েস্ট ফেল করতে পারে। রিলে সেই ব্যর্থতার সংখ্যা একটা গল্পের প্রপ, কোনো সূত্র নয়।'
      },
      redFlag: { en: 'Saying a launched instance is helping as soon as the policy fires.', bn: 'বলা যে পলিসি চালু হওয়ার সাথে সাথেই লঞ্চ হওয়া ইনস্ট্যান্স সাহায্য করছে।' }
    },
    {
      q: { en: 'What is the 300 second cooldown, and when does it apply?', bn: '৩০০ সেকেন্ডের কুলডাউন কী, আর সেটা কখন লাগে?' },
      short: { en: 'It is the default cooldown for simple scaling. Step and target tracking scale out without waiting for it.', bn: 'এটা সিম্পল স্কেলিংয়ের ডিফল্ট কুলডাউন। স্টেপ আর টার্গেট ট্র্যাকিং সেটার জন্য না অপেক্ষা করেই স্কেল আউট করে।' },
      deep: {
        en: 'The console and the CLI both default the group cooldown to 300 seconds. Simple scaling uses it between activities. Step and target tracking use instance warmup instead, and they may start another scale-out immediately. Replacing an unhealthy instance does not wait for cooldown. A manual desired-capacity change also does not wait, unless you ask it to honor cooldown.',
        bn: 'কনসোল আর CLI দুটোই গ্রুপ কুলডাউনের ডিফল্ট রাখে ৩০০ সেকেন্ড। সিম্পল স্কেলিং অ্যাক্টিভিটির মাঝে সেটা ব্যবহার করে। স্টেপ আর টার্গেট ট্র্যাকিং বদলে ইনস্ট্যান্স ওয়ার্মআপ ব্যবহার করে, আর তারা সাথে সাথেই আরেকটা স্কেল-আউট শুরু করতে পারে। অস্বাস্থ্যকর ইনস্ট্যান্স বদলানো কুলডাউনের জন্য অপেক্ষা করে না। হাতে desired capacity বদলও অপেক্ষা করে না, যদি না আপনি কুলডাউন মানতে বলেন।'
      },
      redFlag: { en: 'Quoting 300 seconds, or the reel’s 4:00, as the wait for every scaling policy.', bn: '৩০০ সেকেন্ড, বা রিলের ৪:০০, প্রতিটি স্কেলিং পলিসির অপেক্ষা হিসেবে বলা।' }
    }
  ],
  cheats: [
    {
      code: "aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names web --query 'AutoScalingGroups[0].{wanted:DesiredCapacity,min:MinSize,max:MaxSize}'",
      d: { en: 'Read the wanted number, and the minimum and maximum around it.', bn: 'চাওয়ার সংখ্যা পড়ুন, আর তার চারপাশের সর্বনিম্ন ও সর্বোচ্চ।' }
    },
    {
      code: "aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names web --query 'AutoScalingGroups[0].Instances[].{id:InstanceId,state:LifecycleState,health:HealthStatus}'",
      d: { en: 'See who is InService and who is still launching.', bn: 'দেখুন কে InService, আর কে তখনও লঞ্চ হচ্ছে।' }
    },
    {
      code: 'aws autoscaling set-desired-capacity --auto-scaling-group-name web --desired-capacity 4',
      d: { en: 'Set the wanted number yourself. A manual change does not wait for cooldown.', bn: 'চাওয়ার সংখ্যা নিজে সেট করুন। হাতের বদল কুলডাউনের জন্য অপেক্ষা করে না।' }
    },
    {
      code: 'aws autoscaling update-auto-scaling-group --auto-scaling-group-name web --health-check-type ELB --health-check-grace-period 300',
      d: { en: 'Also trust the load balancer check. The CLI grace default is 0, not 300.', bn: 'লোড ব্যালেন্সারের চেকও বিশ্বাস করুন। CLI-এর গ্রেস ডিফল্ট ০, ৩০০ নয়।' }
    },
    {
      code: "aws autoscaling describe-policies --auto-scaling-group-name web --query 'ScalingPolicies[].{name:PolicyName,type:PolicyType}'",
      d: { en: 'See if a policy is StepScaling, TargetTrackingScaling, or SimpleScaling.', bn: 'দেখুন পলিসি StepScaling, TargetTrackingScaling, নাকি SimpleScaling।' }
    },
    {
      code: "aws cloudwatch describe-alarms --alarm-names web-cpu-high --query 'MetricAlarms[0].{period:Period,eval:EvaluationPeriods,threshold:Threshold}'",
      d: { en: 'Read the alarm you attached. Its period is not a fixed 66 seconds.', bn: 'যে অ্যালার্ম লাগিয়েছেন সেটা পড়ুন। তার পিরিয়ড স্থির ৬৬ সেকেন্ড নয়।' }
    }
  ],
  sources: [
    { label: 'Step and simple scaling', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html' },
    { label: 'Instance lifecycle', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-lifecycle.html' },
    { label: 'Scaling cooldowns', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scaling-cooldowns.html' },
    { label: 'Target tracking', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html' },
    { label: 'Health check grace period', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-check-grace-period.html' },
    { label: 'Warm pools', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html' }
  ],
  film: { src: '/learn/auto-scaling.mp4' }
}
