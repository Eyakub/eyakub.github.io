import type { Topic } from '../types'
import { UI } from '../ui'

export const parallelismDeepDive: Topic = {
  slug: 'parallelism-deep-dive',
  line: 'concurrency',
  title: { en: 'Parallelism deep-dive', bn: 'প্যারালেলিজম গভীরে' },
  summary: {
    en: 'Two cores help only the part that can split. Amdahl caps a fixed job. Gustafson is the bigger job. A default CPython build will not run bytecode on both cores.',
    bn: 'দুই কোর শুধু যে অংশ ভাগ হয় সেটাই সাহায্য করে। Amdahl স্থির কাজের ছাদ। Gustafson বড় কাজ। ডিফল্ট CPython বিল্ড দুই কোরে bytecode চালায় না।'
  },
  hook: {
    en: 'Two cashiers pack at the same moment, but one person still counts the cart first and checks it at the end.',
    bn: 'দুই ক্যাশিয়ার একই মুহূর্তে প্যাক করে, কিন্তু একজন আগে সব বাক্স গোনে আর শেষে মিলিয়ে দেখে।'
  },
  story: {
    cast: {
      en: 'Farah counts the boxes and checks them at the end. Hana and Riad pack at the same time.',
      bn: 'ফারাহ বাক্স গোনে আর শেষে মিলিয়ে দেখে। হানা আর রিয়াদ একই সময়ে প্যাক করে।'
    }
  },
  takeaway: {
    en: 'Extra cashiers only speed up the part that can split, and the unsplit count still sets the ceiling.',
    bn: 'বাড়তি ক্যাশিয়ার শুধু ভাগ-হওয়া অংশটাকেই দ্রুত করে, আর না-ভাগা গোনাই ছাদ ঠিক করে।'
  },
  words: [
    {
      term: { en: 'The count (serial stretch)', bn: 'গোনা (serial stretch)' },
      d: {
        en: 'Work one person must finish before the split, or after the halves meet.',
        bn: 'যা একজনকেই শেষ করতে হয়, ভাগের আগে বা দুই অংশ মিলের পর।'
      }
    },
    {
      term: { en: 'A cashier (core)', bn: 'ক্যাশিয়ার (core)' },
      d: {
        en: 'One person packing at the same moment as the other cashier.',
        bn: 'একজন প্যাক করছে, ঠিক যখন অন্য ক্যাশিয়ারও প্যাক করছে।'
      }
    },
    {
      term: { en: 'The check (join)', bn: 'মিলিয়ে দেখা (join)' },
      d: {
        en: 'Where the halves meet and one person finishes the cart.',
        bn: 'যেখানে দুই অংশ মেলে, আর একজন কার্ট শেষ করে।'
      }
    },
    {
      term: { en: 'The ceiling (Amdahl)', bn: 'ছাদ (Amdahl)' },
      d: {
        en: 'How fast a fixed cart can get when part of it cannot split.',
        bn: 'একটা স্থির কার্ট কত দ্রুত হতে পারে, যখন এক অংশ ভাগ হয় না।'
      }
    },
    {
      term: { en: 'A bigger cart (Gustafson)', bn: 'বড় কার্ট (Gustafson)' },
      d: {
        en: 'Growing the job as you add cashiers, which moves the ceiling.',
        bn: 'ক্যাশিয়ার বাড়ার সাথে কাজও বাড়ে, তাই ছাদ সরে যায়।'
      }
    }
  ],
  legend: {
    request: { en: 'Handing out a half', bn: 'এক অংশ দেওয়া' },
    queue: { en: 'Waiting on a copy', bn: 'কপির অপেক্ষা' },
    result: { en: 'Bringing a half back', bn: 'এক অংশ ফিরিয়ে আনা' },
    error: { en: 'Slower, or stuck on one', bn: 'ধীর, বা একজনে আটকে' }
  },
  view: { wide: [1000, 430], narrow: [400, 620] },
  nodeR: { narrow: 20 },
  nodes: {
    serial: {
      icon: 'task',
      name: { en: 'Serial stretch', bn: 'সিরিয়াল অংশ' },
      sub: { en: 'One core', bn: 'এক কোর' },
      plain: { name: { en: 'The count', bn: 'গোনা' }, sub: { en: 'One person', bn: 'একজন' } },
      wide: [170, 215, 'left'],
      narrow: [200, 70, 'up']
    },
    core1: {
      icon: 'cpu',
      name: { en: 'Core 1', bn: 'কোর ১' },
      sub: { en: 'Idle', bn: 'ফাঁকা' },
      plain: { name: { en: 'Cashier 1', bn: 'ক্যাশিয়ার ১' }, sub: { en: 'Waiting', bn: 'অপেক্ষায়' } },
      wide: [500, 110, 'up'],
      narrow: [80, 240, 'down']
    },
    core2: {
      icon: 'cpu',
      name: { en: 'Core 2', bn: 'কোর ২' },
      sub: { en: 'Idle', bn: 'ফাঁকা' },
      plain: { name: { en: 'Cashier 2', bn: 'ক্যাশিয়ার ২' }, sub: { en: 'Waiting', bn: 'অপেক্ষায়' } },
      wide: [500, 320, 'down'],
      narrow: [320, 240, 'up']
    },
    join: {
      icon: 'check',
      name: { en: 'Join', bn: 'জয়েন' },
      sub: { en: 'Not yet', bn: 'এখনো নয়' },
      plain: { name: { en: 'The check', bn: 'মিলিয়ে দেখা' }, sub: { en: 'Not yet', bn: 'এখনো নয়' } },
      wide: [840, 215, 'right'],
      narrow: [200, 520, 'down']
    }
  },
  corridors: {
    'serial-core1': { wide: [[170, 215], [500, 110]], narrow: [[200, 70], [80, 240]] },
    'serial-core2': { wide: [[170, 215], [500, 320]], narrow: [[200, 70], [320, 240]] },
    'core1-join': { wide: [[500, 110], [840, 215]], narrow: [[80, 240], [200, 520]] },
    'core2-join': { wide: [[500, 320], [840, 215]], narrow: [[320, 240], [200, 520]] }
  },
  edges: {
    'serial-core1': { from: 'serial', to: 'core1', kind: 'request' },
    'serial-core2': { from: 'serial', to: 'core2', kind: 'request' },
    'core1-join': { from: 'core1', to: 'join', kind: 'result' },
    'core2-join': { from: 'core2', to: 'join', kind: 'result' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'count',
        work: { node: 'serial', kind: 'request' },
        state: {
          serial: { en: 'Counting', bn: 'গুনছে' },
          core1: { en: 'Idle', bn: 'ফাঁকা' },
          core2: { en: 'Idle', bn: 'ফাঁকা' },
          join: { en: 'Not yet', bn: 'এখনো নয়' }
        },
        plainState: {
          serial: { en: 'Farah counts', bn: 'ফারাহ গুনছে' },
          core1: { en: 'Hana waits', bn: 'হানা অপেক্ষা' },
          core2: { en: 'Riad waits', bn: 'রিয়াদ অপেক্ষা' },
          join: { en: 'No check yet', bn: 'এখনো মিল নয়' }
        },
        story: {
          title: { en: 'Farah counts the cart', bn: 'ফারাহ কার্ট গোনে' },
          text: {
            en: 'Farah counts every box before anyone packs. Hana and Riad are free, and they still have nothing to do.',
            bn: 'কেউ প্যাক করার আগে ফারাহ প্রতিটা বাক্স গোনে। হানা আর রিয়াদ ফাঁকা, তাদের হাতে এখনো কিছু নেই।'
          }
        },
        title: { en: 'One person counts the cart', bn: 'একজন কার্ট গোনে' },
        simple: {
          en: 'One person counts the whole cart before anyone can pack. The extra cashiers wait.',
          bn: 'কেউ প্যাক করার আগে একজন পুরো কার্ট গোনে। বাড়তি ক্যাশিয়াররা অপেক্ষা করে।'
        },
        tech: {
          en: 'Startup, reading the input, and the final merge are serial. Extra cores sit idle while one core does that stretch.',
          bn: 'শুরু, ইনপুট পড়া, আর শেষের মিল সিরিয়াল। এক কোর সেই অংশ করলে বাড়তি কোর ফাঁকা বসে থাকে।'
        }
      },
      {
        id: 'handoff',
        moves: [{ edge: 'serial-core1', label: 'setup', plain: { en: 'Setup', bn: 'প্রস্তুতি' } }],
        state: { serial: { en: 'Handing off', bn: 'দিচ্ছে' }, core1: { en: 'Preparing', bn: 'প্রস্তুত' } },
        plainState: { serial: { en: 'Count done', bn: 'গোনা শেষ' }, core1: { en: 'Hana sets up', bn: 'হানা সাজাচ্ছে' } },
        story: {
          title: { en: 'Only Hana gets work', bn: 'শুধু হানা কাজ পায়' },
          text: {
            en: 'Farah hands the setup to Hana. Riad is still waiting, because this part cannot be split yet.',
            bn: 'ফারাহ প্রস্তুতি হানার হাতে দেয়। রিয়াদ এখনো অপেক্ষা করে, কারণ এই অংশ এখনো ভাগ হয় না।'
          }
        },
        title: { en: 'Only one cashier starts', bn: 'একজন ক্যাশিয়ার শুরু করে' },
        simple: {
          en: 'One cashier prepares the job. The other cashier still has nothing to pack.',
          bn: 'এক ক্যাশিয়ার কাজ প্রস্তুত করে। অন্য ক্যাশিয়ারের প্যাক করার মতো এখনো কিছু নেই।'
        },
        tech: {
          en: 'One core takes the setup. The second core stays idle until a piece can run on its own.',
          bn: 'এক কোর প্রস্তুতি নেয়। দ্বিতীয় কোর ফাঁকা থাকে, যতক্ষণ না একটা টুকরো একা চলতে পারে।'
        }
      },
      {
        id: 'split',
        moves: [
          { edge: 'serial-core1', label: 'left', plain: { en: 'Left', bn: 'বাম' } },
          { edge: 'serial-core2', label: 'right', plain: { en: 'Right', bn: 'ডান' } }
        ],
        state: { core1: { en: 'Running left', bn: 'বাম চলছে' }, core2: { en: 'Running right', bn: 'ডান চলছে' } },
        plainState: { core1: { en: 'Hana packs', bn: 'হানা প্যাক' }, core2: { en: 'Riad packs', bn: 'রিয়াদ প্যাক' } },
        story: {
          title: { en: 'Both pack at once', bn: 'দুজনেই একসাথে প্যাক' },
          text: {
            en: 'Hana packs the left half and Riad packs the right half at the same moment. This is the only stretch two cashiers can shrink.',
            bn: 'হানা বাম অংশ প্যাক করে, রিয়াদ ডান অংশ, একই মুহূর্তে। দুই ক্যাশিয়ার শুধু এই অংশটাই কমাতে পারে।'
          }
        },
        title: { en: 'Both cashiers pack at once', bn: 'দুই ক্যাশিয়ার একসাথে প্যাক' },
        simple: {
          en: 'The part that can split runs on both cashiers at the same moment.',
          bn: 'যে অংশ ভাগ হয়, সেটা দুই ক্যাশিয়ারে একই মুহূর্তে চলে।'
        },
        tech: {
          en: 'Two instruction streams, one instant. That needs more than one core, and a runtime that is allowed to use both.',
          bn: 'দুই নির্দেশের ধারা, এক মুহূর্ত। এর জন্য একাধিক কোর লাগে, আর এমন রানটাইম যা দুটোই ব্যবহার করতে পারে।'
        }
      },
      {
        id: 'meet',
        moves: [
          { edge: 'core1-join', label: 'left in', plain: { en: 'Left in', bn: 'বাম এল' } },
          { edge: 'core2-join', label: 'right in', plain: { en: 'Right in', bn: 'ডান এল' } }
        ],
        state: {
          core1: { en: 'Left done', bn: 'বাম শেষ' },
          core2: { en: 'Right done', bn: 'ডান শেষ' },
          join: { en: 'Merging', bn: 'মিলছে' }
        },
        plainState: {
          core1: { en: 'Hana done', bn: 'হানা শেষ' },
          core2: { en: 'Riad done', bn: 'রিয়াদ শেষ' },
          join: { en: 'Farah checks', bn: 'ফারাহ মিলায়' }
        },
        story: {
          title: { en: 'The halves come back', bn: 'দুই অংশ ফিরে আসে' },
          text: {
            en: 'Both halves reach Farah. She checks the cart alone. The wait is whichever packer finished later.',
            bn: 'দুই অংশই ফারাহর কাছে আসে। সে একা কার্ট মিলায়। অপেক্ষা সেই প্যাকারের, যে পরে শেষ করে।'
          }
        },
        title: { en: 'The halves meet for a check', bn: 'দুই অংশ মিলিয়ে দেখায় আসে' },
        simple: {
          en: 'They meet, and one person finishes the job. The wait is the slower half.',
          bn: 'তারা মিলে, আর একজন কাজ শেষ করে। অপেক্ষা ধীর অংশটার জন্য।'
        },
        tech: {
          en: 'Wall-clock time is the serial stretches plus the longer parallel part, plus what the split itself cost.',
          bn: 'দেয়ালঘড়ি সময় হলো সিরিয়াল অংশ, যোগ তার চেয়ে লম্বা প্যারালেল অংশ, যোগ ভাগটার নিজের খরচ।'
        }
      },
      {
        id: 'amdahl',
        work: { node: 'join', kind: 'request' },
        state: { join: { en: 'Ceiling set', bn: 'ছাদ ঠিক' } },
        plainState: { join: { en: 'Ceiling set', bn: 'ছাদ ঠিক' } },
        story: {
          title: { en: 'The count sets a ceiling', bn: 'গোনাই ছাদ ঠিক করে' },
          text: {
            en: 'Hiring a third cashier does not shrink Farah’s count or her check. A fixed cart has a fastest time, however many packers you add.',
            bn: 'তৃতীয় ক্যাশিয়ার ফারাহর গোনা বা মিল কমায় না। কার্ট স্থির থাকলে প্যাকার যতই বাড়ুক, একটা দ্রুততম সময় থাকে।'
          }
        },
        title: { en: 'The unsplit part sets a ceiling', bn: 'না-ভাগা অংশ ছাদ ঠিক করে' },
        simple: {
          en: 'The part you did not split puts a ceiling on how much faster extra cashiers help.',
          bn: 'যে অংশ ভাগ করেননি, সেটাই ঠিক করে বাড়তি ক্যাশিয়ার কতটা দ্রুত করবে।'
        },
        tech: {
          en: 'Amdahl fixes the job size. Speedup is `1 / ((1 - p) + p / n)`, with p the fraction that splits. At p of 0.95 the ceiling is 20 times. At p of 0.5 it is 2 times.',
          bn: 'Amdahl কাজের আকার স্থির রাখে। স্পিডআপ `1 / ((1 - p) + p / n)`, যেখানে p ভাগ-হওয়া ভগ্নাংশ। p 0.95 হলে ছাদ ২০ গুণ। p 0.5 হলে ২ গুণ।'
        }
      },
      {
        id: 'gustafson',
        work: { node: 'join', kind: 'result' },
        state: { join: { en: 'Bigger job', bn: 'বড় কাজ' } },
        plainState: { join: { en: 'Bigger cart', bn: 'বড় কার্ট' } },
        story: {
          title: { en: 'A bigger cart moves it', bn: 'বড় কার্টে ছাদ সরে' },
          text: {
            en: 'Give Hana and Riad a bigger cart as you hire them. The counting stays, but it is a smaller share of a larger job.',
            bn: 'হানা আর রিয়াদকে নিয়োগের সাথে বড় কার্ট দিন। গোনা থাকে, কিন্তু বড় কাজের ছোট অংশ হয়ে যায়।'
          }
        },
        title: { en: 'A bigger job moves the ceiling', bn: 'বড় কাজ ছাদ সরিয়ে দেয়' },
        simple: {
          en: 'Give the cashiers a bigger cart, and the ceiling moves with the cart.',
          bn: 'ক্যাশিয়ারদের বড় কার্ট দিন, ছাদও কার্টের সাথে সরে যায়।'
        },
        tech: {
          en: 'Gustafson–Barsis, 1988, grows the job with the machine. Scaled speedup is about `n - s(n - 1)`, where s is the serial share of the parallel run. Amdahl is the fixed cart. Gustafson is the bigger one.',
          bn: 'Gustafson–Barsis, ১৯৮৮, মেশিনের সাথে কাজ বাড়ায়। স্কেলড স্পিডআপ মোটামুটি `n - s(n - 1)`, যেখানে s প্যারালেল রানের সিরিয়াল অংশ। Amdahl স্থির কার্ট। Gustafson বড় কার্ট।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'overhead',
      label: { en: 'Copying costs more', bn: 'কপি বেশি খরচ' },
      branchAfter: 'meet',
      whatIf: {
        en: 'What if copying the halves costs more than the split saves?',
        bn: 'যদি দুই অংশ কপি করতে ভাগের সাশ্রয়ের চেয়ে বেশি সময় লাগে?'
      },
      steps: [
        {
          id: 'copy-out',
          work: { node: 'join', kind: 'queue' },
          state: { join: { en: 'Copying', bn: 'কপি হচ্ছে' } },
          plainState: { join: { en: 'Copying halves', bn: 'অংশ কপি' } },
          story: {
            title: { en: 'Copying takes a while', bn: 'কপিতে সময় লাগে' },
            text: {
              en: 'Farah copies each half out and merges the answers. That copying is not in the packing time.',
              bn: 'ফারাহ প্রতিটা অংশ কপি করে বের করে আর উত্তর মিলায়। এই কপি প্যাকের সময়ের মধ্যে নেই।'
            }
          },
          title: { en: 'Copying the halves takes time', bn: 'অংশ কপিতে সময় লাগে' },
          simple: {
            en: 'Copying the work out and merging the answers can take longer than the split saved.',
            bn: 'কাজ কপি করে বের করা আর উত্তর মেলাতে ভাগের সাশ্রয়ের চেয়ে বেশি সময় লাগতে পারে।'
          },
          tech: {
            en: 'The formulas ignore split and merge overhead. Say that before quoting a ceiling. Two cores can finish later than one.',
            bn: 'সূত্র ভাগ আর মিলের খরচ ধরে না। ছাদ বলার আগে এটা বলুন। দুই কোর এক কোরের চেয়ে পরে শেষ করতে পারে।'
          }
        },
        {
          id: 'slower',
          work: { node: 'join', kind: 'error' },
          state: { join: { en: 'Slower than one', bn: 'একটার চেয়ে ধীর' } },
          plainState: { join: { en: 'Slower than one', bn: 'একজনের চেয়ে ধীর' } },
          story: {
            title: { en: 'Two cashiers, slower', bn: 'দুই ক্যাশিয়ার, ধীর' },
            text: {
              en: 'The copy cost more than the packing saved. Two cashiers finish the cart later than Farah would have alone.',
              bn: 'কপির খরচ প্যাকের সাশ্রয়ের চেয়ে বেশি। দুই ক্যাশিয়ার কার্ট শেষ করে ফারাহ একা যতক্ষণে করত, তার পরে।'
            }
          },
          title: { en: 'Two cashiers finish later', bn: 'দুই ক্যাশিয়ার পরে শেষ করে' },
          simple: {
            en: 'Two cashiers finish later, because the copying cost more than the packing saved.',
            bn: 'দুই ক্যাশিয়ার পরে শেষ করে, কারণ কপির খরচ প্যাকের সাশ্রয়ের চেয়ে বেশি।'
          },
          tech: {
            en: 'If the copy and the merge dominate, adding a core makes the wall clock worse. Neither law includes that cost.',
            bn: 'কপি আর মিল যদি বড় হয়, কোর বাড়ালে দেয়ালঘড়ি আরও খারাপ হয়। কোনো সূত্রই এই খরচ ধরে না।'
          }
        }
      ]
    },
    {
      id: 'one-bytecode',
      label: { en: 'Python stays on one', bn: 'Python একজনে থাকে' },
      branchAfter: 'split',
      whatIf: {
        en: 'What if Python work cannot run on both cashiers at once?',
        bn: 'যদি Python-এর কাজ দুই ক্যাশিয়ারে একসাথে না চলে?'
      },
      steps: [
        {
          id: 'core2-waits',
          work: { node: 'core2', kind: 'queue' },
          state: { core2: { en: 'Waiting for the lock', bn: 'লকের অপেক্ষায়' } },
          plainState: { core2: { en: 'Riad still waits', bn: 'রিয়াদ এখনো অপেক্ষা' } },
          story: {
            title: { en: 'Riad cannot pack yet', bn: 'রিয়াদ এখনো প্যাক পারে না' },
            text: {
              en: 'On an ordinary Python setup, Riad cannot pack Python work while Hana is packing. He waits.',
              bn: 'সাধারণ Python সাজানোয় হানা প্যাক করার সময় রিয়াদ Python-এর কাজ প্যাক করতে পারে না। সে অপেক্ষা করে।'
            }
          },
          title: { en: 'The second cashier waits', bn: 'দ্বিতীয় ক্যাশিয়ার অপেক্ষা করে' },
          simple: {
            en: 'On a normal Python setup, the second cashier cannot pack Python work at the same time.',
            bn: 'সাধারণ Python সাজানোয় দ্বিতীয় ক্যাশিয়ার একই সময়ে Python-এর কাজ প্যাক করতে পারে না।'
          },
          tech: {
            en: 'A default build lets one thread run Python bytecode at a time. The second core does not get that bytecode.',
            bn: 'ডিফল্ট বিল্ড একবারে একটা thread-কে Python bytecode চালাতে দেয়। দ্বিতীয় কোর সেই bytecode পায় না।'
          }
        },
        {
          id: 'core2-idle',
          work: { node: 'core2', kind: 'error' },
          state: { core2: { en: 'Never ran bytecode', bn: 'bytecode চালায়নি' } },
          plainState: { core2: { en: 'Riad never packed', bn: 'রিয়াদ প্যাক করেনি' } },
          story: {
            title: { en: 'Only Hana packed', bn: 'শুধু হানা প্যাক করল' },
            text: {
              en: 'Riad never packed. Two cashiers did not make this Python job faster. Another door is needed for the second one.',
              bn: 'রিয়াদ প্যাকই করল না। দুই ক্যাশিয়ার এই Python কাজ দ্রুত করেনি। দ্বিতীয়জনের জন্য অন্য দরজা লাগে।'
            }
          },
          title: { en: 'Only one cashier packed', bn: 'একজন ক্যাশিয়ার প্যাক করল' },
          simple: {
            en: 'The second cashier never packed. Two cashiers did not make this Python job faster.',
            bn: 'দ্বিতীয় ক্যাশিয়ার প্যাকই করল না। দুই ক্যাশিয়ার এই Python কাজ দ্রুত করেনি।'
          },
          tech: {
            en: 'Both cores need processes, native code that releases the lock, a free-threaded build, or 3.14 separate interpreters. Threads still win when the work is waiting.',
            bn: 'দুই কোর পেতে প্রসেস লাগে, লক ছাড়া নেটিভ কোড, free-threaded বিল্ড, অথবা 3.14-এর আলাদা ইন্টারপ্রেটার। অপেক্ষার কাজে thread-ই জেতে।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'Two cashiers, one cart. Farah counts it before the split and checks it after. Hiring another packer does not shrink that counting.',
      bn: 'দুই ক্যাশিয়ার, এক কার্ট। ফারাহ ভাগের আগে গোনে আর পরে মিলায়। আরেক প্যাকার সেই গোনা কমায় না।'
    },
    twins: [
      {
        icon: 'task',
        node: 'serial',
        name: { en: 'The count', bn: 'গোনা' },
        d: {
          en: 'The stretch one person must do, before the split and after the halves meet.',
          bn: 'যে অংশ একজনকেই করতে হয়, ভাগের আগে আর দুই অংশ মিলের পর।'
        }
      },
      {
        icon: 'cpu',
        node: 'core1',
        name: { en: 'Cashier 1', bn: 'ক্যাশিয়ার ১' },
        d: {
          en: 'Packs the left half at the same moment as the other cashier.',
          bn: 'অন্য ক্যাশিয়ারের সাথে একই মুহূর্তে বাম অংশ প্যাক করে।'
        }
      },
      {
        icon: 'cpu',
        node: 'core2',
        name: { en: 'Cashier 2', bn: 'ক্যাশিয়ার ২' },
        d: {
          en: 'Packs the right half. Idle during the count and the check.',
          bn: 'ডান অংশ প্যাক করে। গোনা আর মিলের সময় ফাঁকা।'
        }
      },
      {
        icon: 'check',
        node: 'join',
        name: { en: 'The check', bn: 'মিলিয়ে দেখা' },
        d: {
          en: 'Where the halves meet. One person finishes, and the slower half sets the wait.',
          bn: 'যেখানে দুই অংশ মেলে। একজন শেষ করে, ধীর অংশ অপেক্ষা ঠিক করে।'
        }
      },
      {
        icon: 'loop',
        node: null,
        name: { en: 'One cashier', bn: 'এক ক্যাশিয়ার' },
        is: { en: 'is the concurrency page', bn: 'মানে কনকারেন্সির পাতা' },
        d: {
          en: 'Many carts in progress, and only one basket open. That is not this page.',
          bn: 'অনেক কার্ট চলমান, একটাই ঝুড়ি খোলা। সেটা এই পাতা নয়।'
        }
      }
    ]
  },
  qa: [
    {
      q: { en: 'What does Amdahl’s law say?', bn: 'Amdahl-এর সূত্র কী বলে?' },
      short: {
        en: 'Speedup is capped by the fraction you cannot split.',
        bn: 'স্পিডআপের ছাদ সেই ভগ্নাংশ, যা ভাগ করা যায় না।'
      },
      deep: {
        en: 'For a fixed job, speedup with n cores is `1 / ((1 - p) + p / n)`, where p is the fraction that parallelises. At p of 0.95, even infinite cores top out at 20 times. At p of 0.5, the ceiling is 2 times. Quote a ceiling, not a vague diminishing return.',
        bn: 'স্থির কাজে n কোরে স্পিডআপ `1 / ((1 - p) + p / n)`, যেখানে p ভাগ-হওয়া ভগ্নাংশ। p 0.95 হলে অসীম কোরেও ছাদ ২০ গুণ। p 0.5 হলে ছাদ ২ গুণ। ছাদের সংখ্যা বলুন, অস্পষ্ট কমতি নয়।'
      },
      redFlag: { en: '“Twice the cores, twice as fast.”', bn: '“কোর দ্বিগুণ, গতি দ্বিগুণ।”' }
    },
    {
      q: { en: 'When is Amdahl the wrong picture?', bn: 'কখন Amdahl ভুল ছবি?' },
      short: {
        en: 'When the job grows with the machine, or when copying costs more than the split.',
        bn: 'যখন কাজ মেশিনের সাথে বাড়ে, বা কপি ভাগের চেয়ে বেশি খরচ করে।'
      },
      deep: {
        en: 'Gustafson–Barsis 1988 grows the problem as the machine grows. Scaled speedup is about `n - s(n - 1)`. Split and merge overhead is the other miss: neither law includes it, and it can make two cores slower than one.',
        bn: 'Gustafson–Barsis ১৯৮৮ মেশিন বাড়লে সমস্যাও বাড়ায়। স্কেলড স্পিডআপ মোটামুটি `n - s(n - 1)`। অন্য ভুল হলো ভাগ আর মিলের খরচ: কোনো সূত্রই সেটা ধরে না, আর তাতে দুই কোর এক কোরের চেয়ে ধীর হতে পারে।'
      },
      redFlag: { en: '“Amdahl says parallel programming is pointless.”', bn: '“Amdahl বলে প্যারালেল প্রোগ্রামিং বৃথা।”' }
    },
    {
      q: { en: 'How do you get real multicore speedup in CPython?', bn: 'CPython-এ আসল মাল্টিকোর স্পিডআপ কীভাবে পাবেন?' },
      short: {
        en: 'Not with pure Python threads on the default build.',
        bn: 'ডিফল্ট বিল্ডে শুধু Python thread দিয়ে নয়।'
      },
      deep: {
        en: 'A default build runs one thread’s bytecode at a time. Both cores need processes, a C extension that releases the GIL, a free-threaded build, or 3.14 `InterpreterPoolExecutor`, where each worker has its own interpreter and its own GIL. Threads still win for waiting, because waiting releases the core.',
        bn: 'ডিফল্ট বিল্ড একবারে এক thread-এর bytecode চালায়। দুই কোর পেতে প্রসেস লাগে, GIL ছাড়া C এক্সটেনশন, free-threaded বিল্ড, অথবা 3.14-এর `InterpreterPoolExecutor`, যেখানে প্রতি worker-এর নিজের ইন্টারপ্রেটার আর নিজের GIL। অপেক্ষায় thread-ই জেতে, কারণ অপেক্ষা কোর ছাড়ে।'
      },
      redFlag: { en: '“Threads always use all the cores.”', bn: '“Thread সবসময় সব কোর ব্যবহার করে।”' }
    },
    {
      q: { en: 'What is the wall-clock time of a split job?', bn: 'ভাগ-করা কাজের দেয়ালঘড়ি সময় কী?' },
      short: {
        en: 'The serial parts, plus the slower half, plus the cost of the split.',
        bn: 'সিরিয়াল অংশ, যোগ ধীর অর্ধেক, যোগ ভাগের খরচ।'
      },
      deep: {
        en: 'You wait for the longer parallel part, not the average of the two. A lopsided split leaves one core idle at the join. The formulas still omit the time spent copying the work out and merging the answers.',
        bn: 'আপনি দুই অংশের গড়ের জন্য নয়, লম্বা প্যারালেল অংশের জন্য অপেক্ষা করেন। বেঁকে ভাগ করলে এক কোর জয়েনে ফাঁকা বসে। সূত্র তবু কাজ কপি আর উত্তর মিলের সময় বাদ দেয়।'
      },
      redFlag: { en: '“Add the two halves and divide by two.”', bn: '“দুই অংশ যোগ করে দুই দিয়ে ভাগ করুন।”' }
    },
    {
      q: { en: 'Does the speedup formula include the cost of splitting?', bn: 'স্পিডআপের সূত্র কি ভাগের খরচ ধরে?' },
      short: {
        en: 'No. Copying and merging can erase the speedup.',
        bn: 'না। কপি আর মিল স্পিডআপ মুছে দিতে পারে।'
      },
      deep: {
        en: 'Say the overhead before the ceiling. Amdahl and Gustafson both assume the split is free. If copying the work out and merging the answers dominates, two cores finish later than one.',
        bn: 'ছাদের আগে খরচের কথা বলুন। Amdahl আর Gustafson দুজনেই ধরে নেয় ভাগ বিনামূল্যে। কাজ কপি আর উত্তর মিল যদি বড় হয়, দুই কোর এক কোরের চেয়ে পরে শেষ করে।'
      },
      redFlag: { en: '“The formula already includes the copy.”', bn: '“সূত্রে কপি আগে থেকেই আছে।”' }
    }
  ],
  cheats: [
    {
      code: 'def amdahl(p, n):\n    return 1 / ((1 - p) + p / n)',
      d: {
        en: 'Fixed-size speedup. p is the fraction that splits, n is the core count.',
        bn: 'স্থির আকারের স্পিডআপ। p ভাগ-হওয়া ভগ্নাংশ, n কোরের সংখ্যা।'
      }
    },
    {
      code: 'amdahl(0.95, 1_000_000_000)  # about 20',
      d: {
        en: 'A job that is 95 percent parallel tops out near 20 times, even with a huge n.',
        bn: '৯৫ শতাংশ প্যারালেল কাজ বিশাল n-এও প্রায় ২০ গুণে থেমে যায়।'
      }
    },
    {
      code: 'def gustafson(n, s):\n    return n - s * (n - 1)',
      d: {
        en: 'Scaled speedup when the job grows. s is the serial share of the parallel run.',
        bn: 'কাজ বাড়লে স্কেলড স্পিডআপ। s প্যারালেল রানের সিরিয়াল অংশ।'
      }
    },
    {
      code: 'from concurrent.futures import ProcessPoolExecutor',
      d: {
        en: 'Separate processes, so Python bytecode can run on more than one core.',
        bn: 'আলাদা প্রসেস, তাই Python bytecode একাধিক কোরে চলতে পারে।'
      }
    },
    {
      code: 'from concurrent.futures import InterpreterPoolExecutor  # 3.14',
      d: {
        en: 'Each worker has its own interpreter and its own lock, so bytecode can use two cores.',
        bn: 'প্রতি worker-এর নিজের ইন্টারপ্রেটার আর নিজের লক, তাই bytecode দুই কোর ব্যবহার করতে পারে।'
      }
    }
  ],
  sources: [
    { label: "Amdahl's law", url: 'https://en.wikipedia.org/wiki/Amdahl%27s_law' },
    { label: "Gustafson's law", url: 'https://en.wikipedia.org/wiki/Gustafson%27s_law' },
    { label: 'Python glossary: concurrency and parallelism', url: 'https://docs.python.org/3/glossary.html' },
    { label: 'InterpreterPoolExecutor', url: 'https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.InterpreterPoolExecutor' }
  ]
}
