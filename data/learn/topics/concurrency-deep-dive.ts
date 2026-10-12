import type { Topic } from '../types'
import { UI } from '../ui'

export const concurrencyDeepDive: Topic = {
  slug: 'concurrency-deep-dive',
  line: 'concurrency',
  title: { en: 'Concurrency deep-dive', bn: 'কনকারেন্সি গভীরে' },
  summary: {
    en: 'One core interleaves tasks by parking a waiter and switching. The operating system picks the next thread. CPython only asks for a switch, on an ideal slice.',
    bn: 'একটা কোর অপেক্ষমাণকে সরিয়ে আর পালা বদলে কাজ মেশায়। পরের thread বেছে দেয় অপারেটিং সিস্টেম। CPython শুধু পালা চায়, একটা আদর্শ ফাঁকে।'
  },
  hook: {
    en: 'One cashier keeps a whole line moving by serving one basket, pausing for a phone call, then swapping to the next.',
    bn: 'এক ক্যাশিয়ার সারা সারি সামলায়, একটা ঝুড়ি সার্ভ করে, ফোনের জন্য থেমে, তারপর পরের জনকে নেয়।'
  },
  story: {
    cast: {
      en: 'Lina is the only cashier. Rafi and Nila wait in line, each with a basket.',
      bn: 'লিনা একাই ক্যাশিয়ার। রাফি আর নিলা সারিতে, দুজনের হাতেই একটা ঝুড়ি।'
    }
  },
  takeaway: {
    en: 'Many customers can be in progress at one cashier, and only one basket is open at a time.',
    bn: 'এক ক্যাশিয়ারে অনেক ক্রেতা একসাথে চলতে পারে, কিন্তু একবারে একটাই ঝুড়ি খোলা থাকে।'
  },
  words: [
    {
      term: { en: 'The line (ready queue)', bn: 'সারি (ready queue)' },
      d: {
        en: 'People waiting who could be served right now.',
        bn: 'যারা অপেক্ষা করছে, আর এখনই সার্ভ করা যায়।'
      }
    },
    {
      term: { en: 'The cashier (core)', bn: 'ক্যাশিয়ার (core)' },
      d: {
        en: 'The one place a basket is actually being served.',
        bn: 'যে এক জায়গায় আসলে ঝুড়ি সার্ভ হচ্ছে।'
      }
    },
    {
      term: { en: 'A phone call (blocked)', bn: 'ফোনকল (blocked)' },
      d: {
        en: 'Stepping aside for a slow wait, so the cashier is free.',
        bn: 'ধীর অপেক্ষায় সরে দাঁড়ানো, যাতে ক্যাশিয়ার ফাঁকা হয়।'
      }
    },
    {
      term: { en: 'Swapping baskets (context switch)', bn: 'ঝুড়ি বদল (context switch)' },
      d: {
        en: 'Closing one basket and opening another, which takes time.',
        bn: 'একটা ঝুড়ি বন্ধ করে আরেকটা খোলা, যাতে সময় লাগে।'
      }
    },
    {
      term: { en: 'A boss (scheduler)', bn: 'পালা যিনি দেন (scheduler)' },
      d: {
        en: 'Whoever picks the next customer. It is not the cashier.',
        bn: 'যিনি পরের ক্রেতা বাছেন। ক্যাশিয়ার নিজে নন।'
      }
    }
  ],
  legend: {
    request: { en: 'Serving a basket', bn: 'ঝুড়ি সার্ভ' },
    queue: { en: 'Stepping aside', bn: 'সরে দাঁড়ানো' },
    result: { en: 'Coming back to the line', bn: 'সারিতে ফেরা' },
    error: { en: 'Someone never gets a turn', bn: 'কারও পালা আসে না' }
  },
  view: { wide: [1000, 420], narrow: [400, 640] },
  nodeR: { narrow: 20 },
  nodes: {
    ready: {
      icon: 'queue',
      name: { en: 'Ready queue', bn: 'রেডি সারি' },
      sub: { en: 'Waiting', bn: 'অপেক্ষায়' },
      plain: { name: { en: 'The line', bn: 'সারি' }, sub: { en: 'People waiting', bn: 'লোক অপেক্ষায়' } },
      wide: [180, 160, 'left'],
      narrow: [200, 80, 'up']
    },
    core: {
      icon: 'cpu',
      name: { en: 'Core', bn: 'কোর' },
      sub: { en: 'Free', bn: 'ফাঁকা' },
      plain: { name: { en: 'The cashier', bn: 'ক্যাশিয়ার' }, sub: { en: 'Free', bn: 'ফাঁকা' } },
      wide: [500, 160, 'up'],
      narrow: [200, 280, 'right']
    },
    blocked: {
      icon: 'hourglass',
      name: { en: 'Blocked', bn: 'অপেক্ষায় আটকে' },
      sub: { en: 'Empty', bn: 'খালি' },
      plain: { name: { en: 'Phone call', bn: 'ফোনকল' }, sub: { en: 'Nobody aside', bn: 'কেউ সরে নেই' } },
      wide: [820, 160, 'right'],
      narrow: [200, 500, 'down']
    }
  },
  corridors: {
    'ready-core': { wide: [[180, 160], [500, 160]], narrow: [[200, 80], [200, 280]] },
    'core-blocked': { wide: [[500, 160], [820, 160]], narrow: [[200, 280], [200, 500]] },
    'blocked-ready': {
      wide: [[820, 160], [820, 320], [180, 320], [180, 160]],
      narrow: [[200, 500], [60, 500], [60, 80], [200, 80]]
    }
  },
  edges: {
    'ready-core': { from: 'ready', to: 'core', kind: 'request' },
    'core-blocked': { from: 'core', to: 'blocked', kind: 'queue' },
    'blocked-ready': { from: 'blocked', to: 'ready', kind: 'result' },
    'core-ready': { from: 'core', to: 'ready', kind: 'result' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'a-runs',
        moves: [{ edge: 'ready-core', label: 'task A', plain: { en: 'Rafi starts', bn: 'রাফি শুরু' } }],
        state: { core: { en: 'Running A', bn: 'A চলছে' }, ready: { en: 'B waiting', bn: 'B অপেক্ষায়' } },
        plainState: { core: { en: 'Serving Rafi', bn: 'রাফিকে দিচ্ছে' }, ready: { en: 'Nila in line', bn: 'নিলা সারিতে' } },
        story: {
          title: { en: 'Rafi reaches the counter', bn: 'রাফি কাউন্টারে আসে' },
          text: {
            en: 'Lina is the only cashier. Rafi steps up with his basket, and she starts on it. Nila is still in line.',
            bn: 'লিনা একাই ক্যাশিয়ার। রাফি ঝুড়ি নিয়ে এগিয়ে আসে, আর লিনা সেটা শুরু করে। নিলা তখনো সারিতে।'
          }
        },
        title: { en: 'Rafi gets the cashier', bn: 'রাফি ক্যাশিয়ার পায়' },
        simple: {
          en: 'The only cashier starts Rafi’s basket. Nila is still waiting in line.',
          bn: 'একমাত্র ক্যাশিয়ার রাফির ঝুড়ি শুরু করে। নিলা তখনো সারিতে অপেক্ষা করছে।'
        },
        tech: {
          en: 'One core takes task A from the ready queue and runs it. Other ready tasks are in progress, not running. Only one task executes on a core at a given instant.',
          bn: 'একটা কোর রেডি সারি থেকে A নেয় আর চালায়। বাকি রেডি কাজ চলমান, কিন্তু চলছে না। এক মুহূর্তে এক কোরে একটাই কাজ চলে।'
        }
      },
      {
        id: 'a-waits',
        moves: [{ edge: 'core-blocked', label: 'A waits', plain: { en: 'Rafi steps aside', bn: 'রাফি সরে দাঁড়ায়' } }],
        state: { core: { en: 'Free', bn: 'ফাঁকা' }, blocked: { en: 'A waiting', bn: 'A অপেক্ষায়' } },
        plainState: { core: { en: 'Free', bn: 'ফাঁকা' }, blocked: { en: 'Rafi on the phone', bn: 'রাফি ফোনে' } },
        story: {
          title: { en: 'Rafi takes a phone call', bn: 'রাফি ফোন ধরে' },
          text: {
            en: 'Rafi’s payment needs a slow check, so he steps aside to take the call. Lina is free instead of staring at the phone.',
            bn: 'রাফির পেমেন্টে একটা ধীর যাচাই লাগে, তাই সে ফোন ধরতে সরে দাঁড়ায়। লিনা ফোনের দিকে তাকিয়ে থাকে না, ফাঁকা হয়।'
          }
        },
        title: { en: 'Rafi steps aside', bn: 'রাফি সরে দাঁড়ায়' },
        simple: {
          en: 'Rafi has to wait on something slow, so he steps aside and the cashier is free.',
          bn: 'রাফিকে একটা ধীর জিনিসের জন্য অপেক্ষা করতে হয়, তাই সে সরে দাঁড়ায় আর ক্যাশিয়ার ফাঁকা হয়।'
        },
        tech: {
          en: 'A blocking call parks A. The core is released instead of spinning, which is the gap interleaving uses. Waiting on a disk, a socket, or a lock all look like this.',
          bn: 'একটা blocking call A-কে আটকে রাখে। কোর ঘুরতে থাকে না, ছাড়া পায়। এই ফাঁকটাই interleaving ব্যবহার করে। ডিস্ক, সকেট, বা lock-এর অপেক্ষা একই রকম।'
        }
      },
      {
        id: 'b-runs',
        moves: [{ edge: 'ready-core', label: 'task B', plain: { en: 'Nila takes over', bn: 'নিলা পালা নেয়' } }],
        state: { core: { en: 'Running B', bn: 'B চলছে' } },
        plainState: { core: { en: 'Serving Nila', bn: 'নিলাকে দিচ্ছে' } },
        story: {
          title: { en: 'Nila gets her turn', bn: 'নিলা পালা পায়' },
          text: {
            en: 'While Rafi is on the phone, Lina starts Nila’s basket. Two people are in progress, and only one is being served.',
            bn: 'রাফি ফোনে থাকতেই লিনা নিলার ঝুড়ি শুরু করে। দুজনের কাজ চলছে, সার্ভ হচ্ছে একজনকে।'
          }
        },
        title: { en: 'Nila takes the gap', bn: 'নিলা ফাঁকটা নেয়' },
        simple: {
          en: 'While Rafi waits, the same cashier starts Nila. Two customers are in progress, and only one is served.',
          bn: 'রাফি অপেক্ষা করতে থাকলে একই ক্যাশিয়ার নিলা শুরু করে। দুই ক্রেতার কাজ চলছে, সার্ভ হচ্ছে একজন।'
        },
        tech: {
          en: 'The core runs B during A’s wait. Two tasks are in progress and only one executes. That is concurrency. Parallelism would be both executing at the same instant, which needs another core.',
          bn: 'A-র অপেক্ষায় কোর B চালায়। দুটো কাজ চলমান, চলছে একটা। এটাই concurrency। Parallelism হলো একই মুহূর্তে দুটোই চলা, যাতে আরেকটা কোর লাগে।'
        }
      },
      {
        id: 'a-ready',
        moves: [{ edge: 'blocked-ready', label: 'A ready', plain: { en: 'Rafi lines up', bn: 'রাফি সারিতে' } }],
        state: { blocked: { en: 'Empty', bn: 'খালি' }, ready: { en: 'A is back', bn: 'A ফিরেছে' } },
        plainState: { blocked: { en: 'Nobody aside', bn: 'কেউ সরে নেই' }, ready: { en: 'Rafi is back', bn: 'রাফি ফিরেছে' } },
        story: {
          title: { en: 'Rafi’s call ends', bn: 'রাফির ফোন শেষ' },
          text: {
            en: 'The phone check finishes. Rafi walks back to the line. He does not shove Nila off the counter.',
            bn: 'ফোনের যাচাই শেষ। রাফি সারিতে ফিরে যায়। সে নিলাকে কাউন্টার থেকে সরিয়ে দেয় না।'
          }
        },
        title: { en: 'Rafi lines up again', bn: 'রাফি আবার সারিতে' },
        simple: {
          en: 'Rafi’s wait is over, so he joins the line again. He does not jump the counter.',
          bn: 'রাফির অপেক্ষা শেষ, তাই সে আবার সারিতে দাঁড়ায়। কাউন্টারে ঢুকে পড়ে না।'
        },
        tech: {
          en: 'The wait ends and the scheduler puts A back on the ready queue. A does not seize the core. Something still has to pick A.',
          bn: 'অপেক্ষা শেষ, আর scheduler A-কে রেডি সারিতে ফেরায়। A নিজে কোর কেড়ে নেয় না। কাউকে এখনো A-কে বেছে নিতে হয়।'
        }
      },
      {
        id: 'b-paused',
        moves: [{ edge: 'core-ready', label: 'B paused', plain: { en: 'Nila steps back', bn: 'নিলা সরে আসে' } }],
        state: { core: { en: 'Saving B', bn: 'B সেভ হচ্ছে' }, ready: { en: 'B paused, A waiting', bn: 'B থেমেছে, A অপেক্ষায়' } },
        plainState: { core: { en: 'Closing the basket', bn: 'ঝুড়ি বন্ধ করছে' }, ready: { en: 'Both in line', bn: 'দুজনই সারিতে' } },
        story: {
          title: { en: 'Lina closes Nila’s basket', bn: 'লিনা নিলার ঝুড়ি বন্ধ করে' },
          text: {
            en: 'Lina sets Nila’s half-done basket aside and remembers where she stopped. That swap is the cost of changing customers.',
            bn: 'লিনা নিলার আধা-করা ঝুড়ি সরিয়ে রাখে আর থামার জায়গা মনে রাখে। ক্রেতা বদলের খরচ এই বদলটাই।'
          }
        },
        title: { en: 'Nila’s basket is set aside', bn: 'নিলার ঝুড়ি সরিয়ে রাখা হয়' },
        simple: {
          en: 'The cashier closes Nila’s basket and keeps her place, so someone else can be served.',
          bn: 'ক্যাশিয়ার নিলার ঝুড়ি বন্ধ করে জায়গা মনে রাখে, যাতে অন্যজনকে দেওয়া যায়।'
        },
        tech: {
          en: 'A context switch saves B’s program counter, registers, and stack pointer, then can restore another task. That save is why tiny slices can cost more than they save.',
          bn: 'Context switch B-র program counter, register, আর stack pointer সেভ করে, তারপর অন্য কাজ ফেরাতে পারে। এই সেভের জন্যই খুব ছোট পালা সেভের চেয়ে বেশি খরচ করতে পারে।'
        }
      },
      {
        id: 'a-resumes',
        moves: [{ edge: 'ready-core', label: 'A resumes', plain: { en: 'Rafi comes back', bn: 'রাফি ফিরে আসে' } }],
        state: { core: { en: 'Running A', bn: 'A চলছে' }, ready: { en: 'B waiting', bn: 'B অপেক্ষায়' } },
        plainState: { core: { en: 'Serving Rafi', bn: 'রাফিকে দিচ্ছে' }, ready: { en: 'Nila in line', bn: 'নিলা সারিতে' } },
        story: {
          title: { en: 'Rafi’s basket opens again', bn: 'রাফির ঝুড়ি আবার খোলে' },
          text: {
            en: 'Lina opens Rafi’s basket at the spot she saved. Nila waits in line with her own spot saved too.',
            bn: 'লিনা যেখানে রেখেছিল, সেখান থেকে রাফির ঝুড়ি খোলে। নিলাও নিজের জায়গা মনে রেখে সারিতে থাকে।'
          }
        },
        title: { en: 'Rafi’s basket opens again', bn: 'রাফির ঝুড়ি আবার খোলে' },
        simple: {
          en: 'The cashier opens Rafi’s basket again, right where it was left.',
          bn: 'ক্যাশিয়ার রাফির ঝুড়ি আবার খোলে, ঠিক যেখানে রেখেছিল।'
        },
        tech: {
          en: 'A is restored and runs again. B is ready, not gone. One core made progress on two tasks by interleaving. It never ran both at once.',
          bn: 'A ফিরে এসে আবার চলে। B রেডি, হারিয়ে যায়নি। এক কোর পালা করে দুটো কাজে এগোল। একসাথে দুটো চালায়নি।'
        }
      },
      {
        id: 'who-decides',
        work: { node: 'core', kind: 'request' },
        state: { core: { en: 'Switch requested', bn: 'পালা চাওয়া হয়েছে' } },
        plainState: { core: { en: 'Time to swap', bn: 'বদলের সময়' } },
        story: {
          title: { en: 'Who picks the next basket', bn: 'পরের ঝুড়ি কে বাছে' },
          text: {
            en: 'Sometimes a customer pauses on their own, like a phone call. Sometimes a timer tells Lina to swap even if nobody paused.',
            bn: 'কখনো ক্রেতা নিজে থামে, যেমন ফোনকল। কখনো একটা টাইমার লিনাকে বদলাতে বলে, কেউ না থামলেও।'
          }
        },
        title: { en: 'Two bosses pick the next turn', bn: 'দুই বস পরের পালা বাছে' },
        simple: {
          en: 'One boss is the customer who chooses to pause. The other is a timer that cuts the turn short.',
          bn: 'এক বস সেই ক্রেতা, যে নিজে থামতে চায়। অন্য বস একটা টাইমার, যে পালা কেটে দেয়।'
        },
        tech: {
          en: 'Cooperative tasks run until an `await` that suspends. Preemptive: the OS interrupts a thread. A GIL build asks to switch between bytecodes. `setswitchinterval` sets the ideal slice, 5000 µs in CPython 3.14, often longer. The OS, not Python, picks who runs next.',
          bn: 'Cooperative কাজ চলে যতক্ষণ না এমন `await` আসে যা থামে। Preemptive: OS thread-কে থামাতে পারে। GIL বিল্ড bytecode-এর মাঝে পালা চায়। `setswitchinterval` আদর্শ ফাঁক দেয়, CPython 3.14-এ 5000 µs, প্রায়ই তার চেয়ে লম্বা। পরের জন বাছে OS, Python নয়।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'starvation',
      label: { en: 'Nila always gets picked', bn: 'সবসময় নিলা বেছে যায়' },
      branchAfter: 'a-ready',
      whatIf: {
        en: 'What if the picker always calls Nila?',
        bn: 'যদি যিনি পালা দেন তিনি সবসময় নিলাকে ডাকেন?'
      },
      steps: [
        {
          id: 'starve-b',
          work: { node: 'core', kind: 'request' },
          state: { core: { en: 'Running B again', bn: 'আবার B' } },
          plainState: { core: { en: 'Serving Nila again', bn: 'আবার নিলাকে' } },
          story: {
            title: { en: 'Nila stays at the counter', bn: 'নিলা কাউন্টারেই থাকে' },
            text: {
              en: 'The picker calls Nila again. Rafi is in line, ready, and still not chosen.',
              bn: 'যিনি পালা দেন তিনি আবার নিলাকে ডাকেন। রাফি সারিতে, তৈরি, তবু বেছে যায় না।'
            }
          },
          title: { en: 'Nila is called again', bn: 'নিলাকে আবার ডাকা হয়' },
          simple: {
            en: 'The picker calls Nila again. Rafi is ready in line and still not chosen.',
            bn: 'পালা যিনি দেন তিনি আবার নিলাকে ডাকেন। রাফি সারিতে তৈরি, তবু বেছে যায় না।'
          },
          tech: {
            en: 'The picker chooses B again. A policy can prefer the task that just ran. Fairness is that policy, not something the hardware promises.',
            bn: 'পালাদাতা আবার B বাছে। নিয়ম এমন হতে পারে যে এইমাত্র যে চলল তাকেই আবার নেয়। ন্যায্যতা সেই নিয়ম, হার্ডওয়্যারের প্রতিশ্রুতি নয়।'
          }
        },
        {
          id: 'starve-a',
          work: { node: 'ready', kind: 'error' },
          state: { ready: { en: 'A still waiting', bn: 'A এখনো অপেক্ষায়' } },
          plainState: { ready: { en: 'Rafi still waiting', bn: 'রাফি এখনো অপেক্ষায়' } },
          story: {
            title: { en: 'Rafi never gets called', bn: 'রাফিকে আর ডাকা হয় না' },
            text: {
              en: 'Rafi stays in line while Nila is served over and over. Fairness is a choice the picker makes, not a law.',
              bn: 'নিলাকে বারবার দেওয়া হয়, রাফি সারিতেই থাকে। ন্যায্যতা পালাদাতার পছন্দ, কোনো আইন নয়।'
            }
          },
          title: { en: 'Rafi never gets a turn', bn: 'রাফির পালা আর আসে না' },
          simple: {
            en: 'Rafi stays in line while Nila is served again and again. Nothing forces the picker to be fair.',
            bn: 'নিলাকে বারবার দেওয়া হয়, রাফি সারিতেই থাকে। পালাদাতাকে ন্যায্য হতে কিছু বাধ্য করে না।'
          },
          tech: {
            en: 'A stays runnable and is never selected. Starvation is a liveness failure: a ready task makes no progress because the scheduler keeps picking someone else.',
            bn: 'A চলতে পারে, তবু কখনো বেছে যায় না। Starvation একটা liveness ব্যর্থতা: রেডি কাজ এগোয় না, কারণ scheduler অন্যজনকেই নিতে থাকে।'
          }
        }
      ]
    },
    {
      id: 'never-pauses',
      label: { en: 'Rafi never pauses', bn: 'রাফি কখনো থামে না' },
      branchAfter: 'a-runs',
      whatIf: {
        en: 'What if Rafi never pauses for anyone?',
        bn: 'যদি রাফি কারও জন্য না থামে?'
      },
      steps: [
        {
          id: 'never-yields',
          work: { node: 'core', kind: 'error' },
          state: { core: { en: 'A never pauses', bn: 'A থামে না' } },
          plainState: { core: { en: 'Rafi will not pause', bn: 'রাফি থামবে না' } },
          story: {
            title: { en: 'Rafi never looks up', bn: 'রাফি মুখ তোলে না' },
            text: {
              en: 'Rafi’s basket has no phone call and no pause. Lina never becomes free, so Nila’s line does not move.',
              bn: 'রাফির ঝুড়িতে ফোন নেই, থামা নেই। লিনা ফাঁকা হয় না, তাই নিলার সারি এগোয় না।'
            }
          },
          title: { en: 'Rafi never looks up', bn: 'রাফি মুখ তোলে না' },
          simple: {
            en: 'Rafi never pauses, so the cashier never becomes free and Nila’s line does not move.',
            bn: 'রাফি কখনো থামে না, তাই ক্যাশিয়ার ফাঁকা হয় না আর নিলার সারি এগোয় না।'
          },
          tech: {
            en: 'A CPU-bound asyncio task that never awaits never returns to the loop, so every other task waits. `await asyncio.sleep(0)` is enough to suspend.',
            bn: 'CPU-bound asyncio কাজ যদি কখনো `await` না করে, লুপে ফেরে না, তাই বাকি সব কাজ অপেক্ষা করে। থামতে `await asyncio.sleep(0)`-ই যথেষ্ট।'
          }
        },
        {
          id: 'b-stuck',
          work: { node: 'ready', kind: 'error' },
          state: { ready: { en: 'B never started', bn: 'B শুরুই হয়নি' } },
          plainState: { ready: { en: 'Nila still in line', bn: 'নিলা এখনো সারিতে' } },
          story: {
            title: { en: 'Nila’s line does not move', bn: 'নিলার সারি এগোয় না' },
            text: {
              en: 'Nila is ready and never gets the counter. A timer would have cut Rafi’s turn. A customer who never pauses does not.',
              bn: 'নিলা তৈরি, কাউন্টার পায় না। একটা টাইমার রাফির পালা কাটত। যে ক্রেতা থামে না, সে কাটে না।'
            }
          },
          title: { en: 'Nila never reaches the counter', bn: 'নিলা কাউন্টারে পৌঁছায় না' },
          simple: {
            en: 'Nila is ready and never gets the counter, because Rafi never chooses to pause.',
            bn: 'নিলা তৈরি, তবু কাউন্টার পায় না, কারণ রাফি নিজে থেকে থামে না।'
          },
          tech: {
            en: 'B is ready and never starts. A preemptive thread still gets switched about every ideal slice, but only one thread runs Python bytecode on a GIL build.',
            bn: 'B রেডি, শুরুই হয় না। Preemptive thread প্রায় প্রতি আদর্শ ফাঁকে বদলায়, কিন্তু GIL বিল্ডে Python bytecode একটাই thread চালায়।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'One checkout lane. The line is whoever could be served now. A phone call is stepping aside. Swapping baskets is the cost of changing customers. A second cashier would be a second core, which is the parallelism page.',
      bn: 'একটাই কাউন্টার। সারি মানে যাদের এখনই দেওয়া যায়। ফোনকল মানে সরে দাঁড়ানো। ঝুড়ি বদল মানে ক্রেতা বদলের খরচ। দ্বিতীয় ক্যাশিয়ার হতো দ্বিতীয় কোর, সেটা প্যারালেলিজমের পাতা।'
    },
    twins: [
      {
        icon: 'queue',
        node: 'ready',
        name: { en: 'The line', bn: 'সারি' },
        d: {
          en: 'Customers who could be served right now, waiting for the picker.',
          bn: 'যাদের এখনই দেওয়া যায়, তারা পালাদাতার অপেক্ষায়।'
        }
      },
      {
        icon: 'cpu',
        node: 'core',
        name: { en: 'The cashier', bn: 'ক্যাশিয়ার' },
        d: {
          en: 'The only person who can have a basket open. One at a time.',
          bn: 'একমাত্র জন যার হাতে ঝুড়ি খোলা থাকতে পারে। একবারে একটা।'
        }
      },
      {
        icon: 'hourglass',
        node: 'blocked',
        name: { en: 'The phone call', bn: 'ফোনকল' },
        d: {
          en: 'A slow wait off to the side. The cashier does not stand and watch.',
          bn: 'পাশে সরে একটা ধীর অপেক্ষা। ক্যাশিয়ার দাঁড়িয়ে তাকিয়ে থাকে না।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'A second cashier', bn: 'দ্বিতীয় ক্যাশিয়ার' },
        is: { en: 'is another core', bn: 'মানে আরেকটা কোর' },
        d: {
          en: 'Two baskets open at the same moment. That is parallelism, not this page.',
          bn: 'একই মুহূর্তে দুটো ঝুড়ি খোলা। সেটা parallelism, এই পাতা নয়।'
        }
      }
    ]
  },
  qa: [
    {
      q: { en: 'What is the difference between concurrency and parallelism?', bn: 'Concurrency আর parallelism-এর পার্থক্য কী?' },
      short: {
        en: 'Concurrency is many tasks in progress. Parallelism is more than one executing at the same instant.',
        bn: 'Concurrency মানে অনেক কাজ চলমান। Parallelism মানে একই মুহূর্তে একাধিক চলা।'
      },
      deep: {
        en: 'One core can be concurrent by interleaving. Parallel needs several cores and a runtime that may use them. Python’s glossary says concurrency is tasks “at the same time”, then defines parallelism as several cores. Keep the interview split, and mention the glossary’s wording.',
        bn: 'এক কোর পালা করে concurrent হতে পারে। Parallel-এ কয়েকটা কোর লাগে, আর এমন runtime যা সেগুলো ব্যবহার করতে পারে। Python-এর glossary concurrency-কে বলে “একই সময়ে” কাজ, তারপর parallelism-কে কয়েকটা কোর বলে। ইন্টারভিউয়ের ভাগ রাখুন, আর glossary-র কথাও বলুন।'
      },
      redFlag: { en: '“They are two words for the same thing.”', bn: '“দুটো শব্দ একই জিনিসের।”' }
    },
    {
      q: { en: 'Who schedules Python threads?', bn: 'Python thread-দের পালা কে দেয়?' },
      short: {
        en: 'The operating system. The interpreter only asks for a switch.',
        bn: 'অপারেটিং সিস্টেম। ইন্টারপ্রেটার শুধু পালা চায়।'
      },
      deep: {
        en: '`sys.setswitchinterval` sets an ideal timeslice. The docs say the real gap can be longer, especially across a long C call, and that the interpreter has no scheduler of its own. CPython 3.14’s GIL runtime defaults that ideal to 5000 µs in `Python/ceval_gil.c`. The sys page does not state the number.',
        bn: '`sys.setswitchinterval` একটা আদর্শ timeslice দেয়। ডক্স বলে আসল ফাঁক লম্বা হতে পারে, বিশেষ করে লম্বা C কলের সময়, আর ইন্টারপ্রেটারের নিজের কোনো scheduler নেই। CPython 3.14-এর GIL রানটাইমে সেই আদর্শ ডিফল্ট 5000 µs, `Python/ceval_gil.c`-তে। sys পাতায় সংখ্যাটা লেখা নেই।'
      },
      redFlag: { en: '“Python has its own thread scheduler.”', bn: '“Python-এর নিজের thread scheduler আছে।”' }
    },
    {
      q: { en: 'What does a context switch cost?', bn: 'Context switch-এর খরচ কী?' },
      short: {
        en: 'The core saves one task’s place and loads another’s.',
        bn: 'কোর এক কাজের জায়গা সেভ করে, অন্যটার জায়গা তোলে।'
      },
      deep: {
        en: 'It saves and restores the program counter, registers, and stack pointer. Caches and the TLB then hold the wrong working set. Do not quote a microsecond figure unless you measured that machine. A slice shorter than the save can make the program slower.',
        bn: 'এটা program counter, register, আর stack pointer সেভ ও ফেরায়। তারপর cache আর TLB-তে ভুল কাজের সেট থাকে। নিজের মেশিনে না মাপলে মাইক্রোসেকেন্ডের সংখ্যা বলবেন না। সেভের চেয়ে ছোট পালা প্রোগ্রামকে ধীর করতে পারে।'
      },
      redFlag: { en: '“Switching is free.”', bn: '“বদলানোর কোনো খরচ নেই।”' }
    },
    {
      q: { en: 'What happens if an asyncio task never awaits?', bn: 'asyncio কাজ যদি কখনো await না করে?' },
      short: {
        en: 'It keeps the loop. Every other task waits.',
        bn: 'সে লুপ ধরে রাখে। বাকি সব কাজ অপেক্ষা করে।'
      },
      deep: {
        en: 'Cooperative scheduling only switches at a point that suspends. A tight loop with no `await` never returns to the loop. `await asyncio.sleep(0)` suspends and lets ready tasks run. A thread is different: the OS can preempt it, and a GIL build still switches bytecode on the ideal slice.',
        bn: 'Cooperative পালা শুধু সেখানে বদলায় যেখানে কাজ থামে। `await` ছাড়া টানা লুপ কখনো লুপে ফেরে না। `await asyncio.sleep(0)` থামিয়ে রেডি কাজ চালায়। Thread আলাদা: OS তাকে থামাতে পারে, আর GIL বিল্ড আদর্শ ফাঁকে bytecode বদলায়।'
      },
      redFlag: { en: '“The event loop will interrupt it anyway.”', bn: '“ইভেন্ট লুপ তাকে যেভাবেই হোক থামাবে।”' }
    },
    {
      q: { en: 'What is starvation?', bn: 'Starvation কী?' },
      short: {
        en: 'A ready task never gets picked, so it makes no progress.',
        bn: 'একটা রেডি কাজ কখনো বেছে যায় না, তাই এগোয় না।'
      },
      deep: {
        en: 'It is a liveness failure, not a wrong answer. The task is runnable the whole time. A scheduler that always prefers the task that just ran, or that ranks priorities badly, can starve the others. Fairness is a policy. The hardware does not promise it.',
        bn: 'এটা liveness-এর ব্যর্থতা, ভুল উত্তর নয়। কাজটা সারা সময় চলতে পারত। যে scheduler সবসময় এইমাত্র চলা কাজকেই নেয়, বা অগ্রাধিকার খারাপ সাজায়, সে অন্যদের না খাইয়ে রাখতে পারে। ন্যায্যতা একটা নিয়ম। হার্ডওয়্যার সেটা প্রতিশ্রুতি দেয় না।'
      },
      redFlag: { en: '“If it is ready, it will run soon.”', bn: '“রেডি হলেই সে শিগগির চলবে।”' }
    }
  ],
  cheats: [
    {
      code: 'import sys\nprint(sys.getswitchinterval())',
      d: {
        en: 'Print the ideal gap between Python thread switches, in seconds.',
        bn: 'Python thread পালার আদর্শ ফাঁক সেকেন্ডে ছাপে।'
      }
    },
    {
      code: 'sys.setswitchinterval(0.001)',
      d: {
        en: 'Ask for a shorter ideal slice. The real gap can still be longer.',
        bn: 'আরও ছোট আদর্শ পালা চান। আসল ফাঁক তবু লম্বা হতে পারে।'
      }
    },
    {
      code: 'async def spin():\n    while True:\n        pass  # never awaits, so the loop freezes',
      d: {
        en: 'A task that never suspends keeps the event loop to itself.',
        bn: 'যে কাজ কখনো থামে না, ইভেন্ট লুপ নিজের কাছে ধরে রাখে।'
      }
    },
    {
      code: 'await asyncio.sleep(0)',
      d: {
        en: 'Suspend so the loop can run whoever else is ready.',
        bn: 'থামুন, যাতে লুপ অন্য রেডি কাজ চালাতে পারে।'
      }
    },
    {
      code: '# CPython 3.14, Python/ceval_gil.c\n#define DEFAULT_INTERVAL 5000  /* microseconds */',
      d: {
        en: 'The source default is 5000 µs. The sys docs do not print that number.',
        bn: 'সোর্সের ডিফল্ট 5000 µs। sys ডক্সে সংখ্যাটা ছাপা নেই।'
      }
    }
  ],
  sources: [
    { label: 'Python glossary: concurrency and parallelism', url: 'https://docs.python.org/3/glossary.html' },
    { label: 'sys.setswitchinterval', url: 'https://docs.python.org/3/library/sys.html#sys.setswitchinterval' },
    { label: 'CPython 3.14 GIL interval', url: 'https://github.com/python/cpython/blob/3.14/Python/ceval_gil.c' },
    { label: 'asyncio tasks', url: 'https://docs.python.org/3/library/asyncio-task.html' }
  ],
  film: {
    src: '/learn/concurrency-deep-dive.mp4',
    note: {
      en: 'A scheduler can keep picking the same task, so a ready task starves. An asyncio task that never awaits never returns to the loop. await asyncio.sleep(0) is enough to suspend.',
      bn: 'Scheduler একই কাজ বারবার নিতে পারে, তাই একটা ready task starve হয়। যে asyncio task কখনো await করে না, সে loop-এ ফেরে না। থামতে await asyncio.sleep(0) যথেষ্ট।'
    }
  }
}
