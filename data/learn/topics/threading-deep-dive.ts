import type { Topic } from '../types'
import { UI } from '../ui'

export const threadingDeepDive: Topic = {
  slug: 'threading-deep-dive',
  line: 'concurrency',
  title: { en: 'Threading deep-dive', bn: 'থ্রেডিং গভীরে' },
  summary: {
    en: 'A Thread object is only a contract until start. run then lives on an OS thread with its own stack. A blocking call releases the GIL. join waits until run returns.',
    bn: 'Thread অবজেক্ট start-এর আগে শুধু একটা চুক্তি। run তারপর নিজের স্ট্যাকসহ একটা OS thread-এ বাঁচে। ব্লকিং কল GIL ছাড়ে। join অপেক্ষা করে যতক্ষণ না run ফেরে।'
  },
  hook: {
    en: 'A cook can be hired on paper before he walks in, and you wait at the pass until his shift ends.',
    bn: 'এক রাঁধুনিকে কাগজে নিয়োগ দেওয়া যায় ঢোকার আগেই, আর আপনি পাসে অপেক্ষা করেন শিফট শেষ হওয়া পর্যন্ত।'
  },
  story: {
    cast: {
      en: 'Nabil is hired as one cook. Mina waits at the pass until his shift ends.',
      bn: 'নাবিলকে একজন রাঁধুনি হিসেবে নিয়োগ দেওয়া হয়। মিনা পাসে অপেক্ষা করে, তার শিফট শেষ না হওয়া পর্যন্ত।'
    }
  },
  takeaway: {
    en: 'The paper contract is not the cook in the kitchen, and a wait at the door lets someone else use the stove.',
    bn: 'কাগজের চুক্তি রান্নাঘরের রাঁধুনি নয়, আর দরজায় অপেক্ষা চুলা অন্যজনকে ব্যবহার করতে দেয়।'
  },
  words: [
    {
      term: { en: 'The contract (Thread object)', bn: 'চুক্তি (Thread object)' },
      d: {
        en: 'The hire on paper. Nothing is cooking until he walks in.',
        bn: 'কাগজের নিয়োগ। সে ঢোকার আগে কিছু রান্না হয় না।'
      }
    },
    {
      term: { en: 'His counter (stack)', bn: 'তার কাউন্টার (stack)' },
      d: {
        en: 'His own bench for calls and local notes. Not shared.',
        bn: 'কল আর নিজের নোটের জন্য তার নিজের বেঞ্চ। ভাগ হয় না।'
      }
    },
    {
      term: { en: 'The stove (interpreter)', bn: 'চুলা (interpreter)' },
      d: {
        en: 'Where the recipe actually runs, one cook at a time on a normal setup.',
        bn: 'যেখানে রেসিপি আসলে চলে। সাধারণ সাজানোয় একসময়ে এক রাঁধুনি।'
      }
    },
    {
      term: { en: 'The door (blocked call)', bn: 'দরজা (blocked call)' },
      d: {
        en: 'Waiting on a delivery. The stove is free while he stands there.',
        bn: 'ডেলিভারির অপেক্ষা। সে দাঁড়িয়ে থাকলে চুলা ফাঁকা।'
      }
    },
    {
      term: { en: 'The pass (join)', bn: 'পাস (join)' },
      d: {
        en: 'Where you wait until his shift ends, then you are free.',
        bn: 'যেখানে আপনি তার শিফট শেষের অপেক্ষায় থাকেন, তারপর ফাঁকা।'
      }
    }
  ],
  legend: {
    request: { en: 'Walking in or cooking', bn: 'ঢোকা বা রান্না' },
    queue: { en: 'Waiting', bn: 'অপেক্ষা' },
    result: { en: 'Coming back or finishing', bn: 'ফেরা বা শেষ' },
    error: { en: 'Cut off', bn: 'কেটে দেওয়া' }
  },
  view: { wide: [1000, 460], narrow: [400, 660] },
  nodeR: { narrow: 20 },
  nodes: {
    obj: {
      icon: 'bookmark',
      name: { en: 'Thread object', bn: 'Thread অবজেক্ট' },
      sub: { en: 'Not started', bn: 'শুরু হয়নি' },
      plain: { name: { en: 'The contract', bn: 'চুক্তি' }, sub: { en: 'Paper only', bn: 'শুধু কাগজ' } },
      wide: [160, 200, 'down'],
      narrow: [200, 70, 'up']
    },
    os: {
      icon: 'thread',
      name: { en: 'OS thread', bn: 'OS thread' },
      sub: { en: 'Own stack', bn: 'নিজের স্ট্যাক' },
      plain: { name: { en: 'His counter', bn: 'তার কাউন্টার' }, sub: { en: 'His own bench', bn: 'নিজের বেঞ্চ' } },
      wide: [380, 200, 'down'],
      narrow: [200, 200, 'right']
    },
    gil: {
      icon: 'cpu',
      name: { en: 'Interpreter', bn: 'ইন্টারপ্রেটার' },
      sub: { en: 'Bytecode', bn: 'Bytecode' },
      plain: { name: { en: 'The stove', bn: 'চুলা' }, sub: { en: 'The recipe', bn: 'রেসিপি' } },
      wide: [600, 200, 'down'],
      narrow: [200, 340, 'right']
    },
    blocked: {
      icon: 'hourglass',
      name: { en: 'Blocked call', bn: 'ব্লকড কল' },
      sub: { en: 'Waiting', bn: 'অপেক্ষায়' },
      plain: { name: { en: 'The door', bn: 'দরজা' }, sub: { en: 'A delivery', bn: 'এক ডেলিভারি' } },
      wide: [850, 200, 'right'],
      narrow: [200, 490, 'down']
    },
    waiter: {
      icon: 'user',
      name: { en: 'join', bn: 'join' },
      sub: { en: 'Caller waits', bn: 'কলার অপেক্ষা' },
      plain: { name: { en: 'The pass', bn: 'পাস' }, sub: { en: 'Mina waits', bn: 'মিনা অপেক্ষা' } },
      wide: [600, 380, 'down'],
      narrow: [270, 540, 'down']
    }
  },
  corridors: {
    'obj-os': { wide: [[160, 200], [380, 200]], narrow: [[200, 70], [200, 200]] },
    'os-gil': { wide: [[380, 200], [600, 200]], narrow: [[200, 200], [200, 340]] },
    'gil-blocked': { wide: [[600, 200], [850, 200]], narrow: [[200, 340], [200, 490]] },
    'blocked-gil': {
      wide: [[850, 200], [850, 70], [600, 70], [600, 200]],
      narrow: [[200, 490], [40, 490], [40, 340], [200, 340]]
    },
    'gil-waiter': { wide: [[600, 200], [600, 380]], narrow: [[200, 340], [270, 470], [270, 540]] }
  },
  edges: {
    'obj-os': { from: 'obj', to: 'os', kind: 'request' },
    'os-gil': { from: 'os', to: 'gil', kind: 'request' },
    'gil-blocked': { from: 'gil', to: 'blocked', kind: 'queue' },
    'blocked-gil': { from: 'blocked', to: 'gil', kind: 'result' },
    'gil-waiter': { from: 'gil', to: 'waiter', kind: 'result' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'paper',
        work: { node: 'obj', kind: 'request' },
        state: {
          obj: { en: 'Constructed', bn: 'তৈরি' },
          os: { en: 'No thread yet', bn: 'এখনো thread নেই' },
          waiter: { en: 'Not waiting', bn: 'অপেক্ষা নয়' }
        },
        plainState: {
          obj: { en: 'Paper only', bn: 'শুধু কাগজ' },
          os: { en: 'Kitchen empty', bn: 'রান্নাঘর খালি' },
          waiter: { en: 'Pass is quiet', bn: 'পাস শান্ত' }
        },
        story: {
          title: { en: 'Nabil is hired on paper', bn: 'নাবিল কাগজে নিযুক্ত' },
          text: {
            en: 'The contract exists. Nabil has not walked into the kitchen, and nothing of his is cooking.',
            bn: 'চুক্তি আছে। নাবিল রান্নাঘরে ঢোকেনি, আর তার কিছু রান্না হচ্ছে না।'
          }
        },
        title: { en: 'The contract is only paper', bn: 'চুক্তি শুধু কাগজ' },
        simple: {
          en: 'The cook is hired on paper. Nothing is running, and he is not in the kitchen yet.',
          bn: 'রাঁধুনি কাগজে নিযুক্ত। কিছু চলছে না, আর সে এখনো রান্নাঘরে নেই।'
        },
        tech: {
          en: 'The `Thread` object exists before any kernel thread. `ident` is `None` until `start`, and `is_alive` is false. `daemon` must be set before `start`, or you get `RuntimeError`. The main thread is not a daemon, so a thread it creates starts non-daemon.',
          bn: '`Thread` অবজেক্ট কোনো কার্নেল thread-এর আগেই থাকে। `ident` `start` পর্যন্ত `None`, আর `is_alive` মিথ্যা। `daemon` `start`-এর আগেই সেট করতে হয়, নইলে `RuntimeError`। মেইন thread ডেমন নয়, তাই তার বানানো thread নন-ডেমন হয়ে শুরু হয়।'
        }
      },
      {
        id: 'walks-in',
        moves: [{ edge: 'obj-os', label: 'start', plain: { en: 'Walks in', bn: 'ঢোকে' } }],
        state: { obj: { en: 'Started', bn: 'শুরু' }, os: { en: 'run begins', bn: 'run শুরু' } },
        plainState: { obj: { en: 'He is hired', bn: 'তিনি নিযুক্ত' }, os: { en: 'Nabil walks in', bn: 'নাবিল ঢোকে' } },
        story: {
          title: { en: 'Nabil walks in', bn: 'নাবিল ভেতরে ঢোকে' },
          text: {
            en: 'Starting the job puts Nabil at his own counter. His shift begins there, and it can begin only once.',
            bn: 'কাজ শুরু করলে নাবিল নিজের কাউন্টারে যায়। শিফট সেখানে শুরু হয়, আর একবারই শুরু হতে পারে।'
          }
        },
        title: { en: 'He walks into the kitchen', bn: 'সে রান্নাঘরে ঢোকে' },
        simple: {
          en: 'Starting the job asks for a real cook, and his shift begins at his own counter.',
          bn: 'কাজ শুরু করলে একজন সত্যিকারের রাঁধুনি লাগে, আর শিফট শুরু হয় তার নিজের কাউন্টারে।'
        },
        tech: {
          en: '`start` runs at most once and calls `run` on the new thread. `is_alive` is true from just before `run` until just after it returns. `native_id` is the kernel id, and it stays unique only until the thread ends.',
          bn: '`start` বড়জোর একবার চলে এবং নতুন thread-এ `run` ডাকে। `is_alive` সত্য `run`-এর ঠিক আগে থেকে ফেরার ঠিক পর পর্যন্ত। `native_id` কার্নেলের আইডি, আর thread শেষ হওয়া পর্যন্তই সেটা অনন্য থাকে।'
        }
      },
      {
        id: 'stove',
        moves: [{ edge: 'os-gil', label: 'bytecode', plain: { en: 'At the stove', bn: 'চুলায়' } }],
        state: { gil: { en: 'Running bytecode', bn: 'bytecode চলছে' }, os: { en: 'Holds the GIL', bn: 'GIL ধরে' } },
        plainState: { gil: { en: 'Nabil cooks', bn: 'নাবিল রাঁধে' }, os: { en: 'At his counter', bn: 'কাউন্টারে' } },
        story: {
          title: { en: 'Nabil cooks at the stove', bn: 'নাবিল চুলায় রাঁধে' },
          text: {
            en: 'He runs the recipe at the stove. On a normal setup, only one cook uses that stove at a time.',
            bn: 'সে চুলায় রেসিপি চালায়। সাধারণ সাজানোয় একসময়ে একজনই সেই চুলা ব্যবহার করে।'
          }
        },
        title: { en: 'He cooks at the stove', bn: 'সে চুলায় রাঁধে' },
        simple: {
          en: 'He runs the recipe at the stove. On a normal setup only one cook uses that stove at a time.',
          bn: 'সে চুলায় রেসিপি চালায়। সাধারণ সাজানোয় একসময়ে এক রাঁধুনিই সেই চুলা ব্যবহার করে।'
        },
        tech: {
          en: 'On a default build, bytecode runs while this thread holds the GIL, so only one thread runs it. `stack_size(0)` keeps the platform default. The smallest size you may ask for is 32 KiB. The docs never state an 8 MB default.',
          bn: 'ডিফল্ট বিল্ডে bytecode চলে যখন এই thread GIL ধরে, তাই একসময়ে এক thread-ই সেটা চালায়। `stack_size(0)` প্ল্যাটফর্মের ডিফল্ট রাখে। আপনি অন্তত 32 KiB চাইতে পারেন। ডক্স কোথাও 8 MB ডিফল্ট বলে না।'
        }
      },
      {
        id: 'door',
        moves: [{ edge: 'gil-blocked', label: 'waiting', plain: { en: 'At the door', bn: 'দরজায়' } }],
        state: { blocked: { en: 'Blocked', bn: 'ব্লকড' }, gil: { en: 'GIL released', bn: 'GIL ছাড়া' } },
        plainState: { blocked: { en: 'Waiting outside', bn: 'বাইরে অপেক্ষা' }, gil: { en: 'Stove is free', bn: 'চুলা ফাঁকা' } },
        story: {
          title: { en: 'Nabil waits on a delivery', bn: 'নাবিল ডেলিভারির অপেক্ষায়' },
          text: {
            en: 'He steps to the door for a delivery. While he waits, someone else may use the stove.',
            bn: 'সে ডেলিভারির জন্য দরজায় যায়। অপেক্ষার সময় অন্য কেউ চুলা ব্যবহার করতে পারে।'
          }
        },
        title: { en: 'He waits at the door', bn: 'সে দরজায় অপেক্ষা করে' },
        simple: {
          en: 'He waits on a delivery. While he waits, someone else may use the stove.',
          bn: 'সে এক ডেলিভারির অপেক্ষায় থাকে। অপেক্ষার সময় অন্য কেউ চুলা ব্যবহার করতে পারে।'
        },
        tech: {
          en: 'A real blocking call releases the GIL, and the kernel marks the thread blocked. Another Python thread can run. Threads help waiting. They do not speed up pure-Python number work.',
          bn: 'সত্যিকারের ব্লকিং কল GIL ছাড়ে, আর কার্নেল thread-কে ব্লকড দাগ দেয়। অন্য Python thread চলতে পারে। Thread অপেক্ষায় কাজে লাগে। খাঁটি Python সংখ্যার কাজ দ্রুত করে না।'
        }
      },
      {
        id: 'back',
        moves: [{ edge: 'blocked-gil', label: 'resumed', plain: { en: 'Back inside', bn: 'ফিরে এল' } }],
        state: { blocked: { en: 'Delivery here', bn: 'ডেলিভারি এল' }, gil: { en: 'Needs the GIL', bn: 'GIL লাগে' } },
        plainState: { blocked: { en: 'Delivery here', bn: 'ডেলিভারি এল' }, gil: { en: 'Needs the stove', bn: 'চুলা লাগে' } },
        story: {
          title: { en: 'The delivery arrives', bn: 'ডেলিভারি এসে যায়' },
          text: {
            en: 'The wait ends. Nabil still needs the stove again before the next step of the recipe.',
            bn: 'অপেক্ষা শেষ। রেসিপির পরের ধাপের আগে নাবিলের আবার চুলা দরকার।'
          }
        },
        title: { en: 'The delivery arrives', bn: 'ডেলিভারি এসে যায়' },
        simple: {
          en: 'The wait ends. He still needs the stove again before the next step of the recipe.',
          bn: 'অপেক্ষা শেষ। রেসিপির পরের ধাপের আগে তার আবার চুলা দরকার।'
        },
        tech: {
          en: 'The kernel makes the thread runnable again. The next Python instruction still waits until this thread holds the GIL.',
          bn: 'কার্নেল thread-কে আবার চলনযোগ্য করে। পরের Python নির্দেশ তবু অপেক্ষা করে, যতক্ষণ না এই thread GIL ধরে।'
        }
      },
      {
        id: 'pass',
        moves: [{ edge: 'gil-waiter', label: 'done', plain: { en: 'Shift ends', bn: 'শিফট শেষ' } }],
        state: { gil: { en: 'run returned', bn: 'run ফিরেছে' }, waiter: { en: 'join returns', bn: 'join ফেরে' } },
        plainState: { gil: { en: 'Recipe done', bn: 'রেসিপি শেষ' }, waiter: { en: 'Mina is free', bn: 'মিনা ফাঁকা' } },
        story: {
          title: { en: 'Mina leaves the pass', bn: 'মিনা পাস ছাড়ে' },
          text: {
            en: 'Nabil’s recipe ends. Mina, who was waiting at the pass, is free to go on.',
            bn: 'নাবিলের রেসিপি শেষ। পাসে অপেক্ষা করা মিনা এবার এগোতে পারে।'
          }
        },
        title: { en: 'You wait until the shift ends', bn: 'শিফট শেষ পর্যন্ত অপেক্ষা' },
        simple: {
          en: 'His recipe ends, and the person waiting at the pass is free to go.',
          bn: 'তার রেসিপি শেষ হয়, আর পাসে অপেক্ষা করা মানুষ এগোতে পারে।'
        },
        tech: {
          en: 'When `run` returns, `is_alive` becomes false. An exception there goes to `threading.excepthook`, which ignores `SystemExit`. `join` blocks the caller and returns `None`. After a timeout, call `is_alive`.',
          bn: '`run` ফিরলে `is_alive` মিথ্যা হয়। সেখানকার এক্সেপশন যায় `threading.excepthook`-এ, যা `SystemExit` উপেক্ষা করে। `join` কলারকে আটকে রাখে এবং `None` ফেরায়। টাইমআউটের পর `is_alive` ডাকুন।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'daemon',
      label: { en: 'Sent home mid-chop', bn: 'মাঝপথে বাড়ি' },
      branchAfter: 'stove',
      whatIf: {
        en: 'What if the restaurant closes while he is still cooking?',
        bn: 'রেস্তোরাঁ বন্ধ হলে কী হবে, যখন সে এখনো রাঁধছে?'
      },
      steps: [
        {
          id: 'closing',
          work: { node: 'waiter', kind: 'queue' },
          state: { waiter: { en: 'Shutdown', bn: 'বন্ধ' }, os: { en: 'Daemon', bn: 'ডেমন' } },
          plainState: { waiter: { en: 'Closing time', bn: 'বন্ধের সময়' }, os: { en: 'Will not keep it open', bn: 'খোলা রাখবে না' } },
          story: {
            title: { en: 'Closing time arrives', bn: 'বন্ধের সময় আসে' },
            text: {
              en: 'Nabil was marked as a cook you will not keep the restaurant open for. Closing does not wait for his plate.',
              bn: 'নাবিলকে এমন রাঁধুনি দাগ দেওয়া হয়েছিল, যার জন্য রেস্তোরাঁ খোলা রাখা হবে না। বন্ধ হওয়া তার প্লেটের অপেক্ষা করে না।'
            }
          },
          title: { en: 'The restaurant starts closing', bn: 'রেস্তোরাঁ বন্ধ হতে শুরু করে' },
          simple: {
            en: 'This cook was marked as someone you will not keep the restaurant open for.',
            bn: 'এই রাঁধুনিকে এমন দাগ দেওয়া হয়েছিল, যার জন্য রেস্তোরাঁ খোলা রাখা হবে না।'
          },
          tech: {
            en: 'With `daemon` true, the process exits when no non-daemon thread is alive. The flag must be set before `start`. Shutdown does not wait for this thread.',
            bn: '`daemon` সত্য হলে প্রসেস বেরিয়ে যায় যখন কোনো নন-ডেমন thread জীবিত থাকে না। ফ্ল্যাগ `start`-এর আগে সেট করতে হয়। শাটডাউন এই thread-এর অপেক্ষা করে না।'
          }
        },
        {
          id: 'sent-home',
          work: { node: 'os', kind: 'error' },
          state: { os: { en: 'Stopped abruptly', bn: 'হঠাৎ থেমেছে' } },
          plainState: { os: { en: 'Sent home mid-chop', bn: 'মাঝপথে বাড়ি' } },
          story: {
            title: { en: 'Sent home mid-chop', bn: 'মাঝপথে বাড়ি পাঠানো' },
            text: {
              en: 'The restaurant closes and Nabil is cut off. A half-chopped plate can be left as it is.',
              bn: 'রেস্তোরাঁ বন্ধ হয় এবং নাবিলকে কেটে দেওয়া হয়। আধ-কাটা প্লেট যেমন আছে থাকতে পারে।'
            }
          },
          title: { en: 'He is sent home mid-chop', bn: 'তাকে মাঝপথে বাড়ি পাঠানো হয়' },
          simple: {
            en: 'The restaurant closes and his shift is cut off. Open work may be left unfinished.',
            bn: 'রেস্তোরাঁ বন্ধ হয় এবং তার শিফট কেটে যায়। খোলা কাজ অসমাপ্ত থাকতে পারে।'
          },
          tech: {
            en: 'Daemon threads are stopped abruptly, so open files and transactions may not be cleaned up. For a clean stop, use a non-daemon thread and an `Event`.',
            bn: 'ডেমন thread হঠাৎ থামে, তাই খোলা ফাইল আর ট্রানজ্যাকশন পরিষ্কার নাও হতে পারে। পরিষ্কার থামতে নন-ডেমন thread আর একটা `Event` ব্যবহার করুন।'
          }
        }
      ]
    },
    {
      id: 'too-early',
      label: { en: 'Waited too early', bn: 'খুব তাড়াতাড়ি অপেক্ষা' },
      branchAfter: 'paper',
      whatIf: {
        en: 'What if you wait at the pass before he walks in?',
        bn: 'সে ঢোকার আগেই যদি আপনি পাসে অপেক্ষা করেন?'
      },
      steps: [
        {
          id: 'early-wait',
          work: { node: 'waiter', kind: 'queue' },
          state: { waiter: { en: 'join called', bn: 'join ডাকা' } },
          plainState: { waiter: { en: 'Mina waits early', bn: 'মিনা আগেই অপেক্ষা' } },
          story: {
            title: { en: 'Mina waits too early', bn: 'মিনা খুব আগে অপেক্ষা করে' },
            text: {
              en: 'Mina goes to the pass before Nabil has walked in. There is no shift to wait for yet.',
              bn: 'নাবিল ঢোকার আগেই মিনা পাসে যায়। এখনো এমন কোনো শিফট নেই, যার জন্য অপেক্ষা করা যায়।'
            }
          },
          title: { en: 'Someone waits before he starts', bn: 'সে শুরুর আগেই কেউ অপেক্ষা করে' },
          simple: {
            en: 'Someone waits at the pass before the cook has walked into the kitchen.',
            bn: 'রাঁধুনি রান্নাঘরে ঢোকার আগেই কেউ পাসে অপেক্ষা করে।'
          },
          tech: {
            en: 'Calling `join` before `start` is not a wait. The same error is raised if a thread tries to join itself.',
            bn: '`start`-এর আগে `join` ডাকা অপেক্ষা নয়। একই ভুল হয় যদি একটা thread নিজেকে join করতে চায়।'
          }
        },
        {
          id: 'join-fails',
          work: { node: 'waiter', kind: 'error' },
          state: { waiter: { en: 'RuntimeError', bn: 'RuntimeError' } },
          plainState: { waiter: { en: 'Nothing to wait for', bn: 'অপেক্ষার কিছু নেই' } },
          story: {
            title: { en: 'There is no shift yet', bn: 'এখনো কোনো শিফট নেই' },
            text: {
              en: 'The pass cannot take that wait. Nabil is still only a name on the contract.',
              bn: 'পাস সেই অপেক্ষা নিতে পারে না। নাবিল এখনো শুধু চুক্তির একটা নাম।'
            }
          },
          title: { en: 'The wait is refused', bn: 'অপেক্ষা প্রত্যাখ্যাত' },
          simple: {
            en: 'The wait is refused. He is still only a name on the contract.',
            bn: 'অপেক্ষা প্রত্যাখ্যাত। সে এখনো শুধু চুক্তির একটা নাম।'
          },
          tech: {
            en: 'Joining before `start`, or joining the current thread, raises `RuntimeError`. `join` itself returns `None` only after a real wait.',
            bn: '`start`-এর আগে join, বা বর্তমান thread-কে join, `RuntimeError` তোলে। `join` নিজে `None` ফেরায় শুধু একটা সত্যিকারের অপেক্ষার পর।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'One cook. The contract is the hire. Walking in starts the shift at his own counter. The door is a delivery. The pass is you, waiting until he is done.',
      bn: 'এক রাঁধুনি। চুক্তি হলো নিয়োগ। ঢোকা শিফট শুরু করে তার নিজের কাউন্টারে। দরজা এক ডেলিভারি। পাস আপনি, শেষ হওয়া পর্যন্ত অপেক্ষা।'
    },
    twins: [
      {
        icon: 'bookmark',
        node: 'obj',
        name: { en: 'The contract', bn: 'চুক্তি' },
        d: {
          en: 'The hire on paper. He is not cooking yet.',
          bn: 'কাগজের নিয়োগ। সে এখনো রাঁধছে না।'
        }
      },
      {
        icon: 'thread',
        node: 'os',
        name: { en: 'His counter', bn: 'তার কাউন্টার' },
        d: {
          en: 'His own bench. Calls and local notes stay here, not on a shared pile.',
          bn: 'তার নিজের বেঞ্চ। কল আর নিজের নোট এখানে থাকে, ভাগের স্তূপে নয়।'
        }
      },
      {
        icon: 'cpu',
        node: 'gil',
        name: { en: 'The stove', bn: 'চুলা' },
        d: {
          en: 'Where the recipe runs. On a normal setup, one cook at a time.',
          bn: 'যেখানে রেসিপি চলে। সাধারণ সাজানোয় একসময়ে এক রাঁধুনি।'
        }
      },
      {
        icon: 'hourglass',
        node: 'blocked',
        name: { en: 'The door', bn: 'দরজা' },
        d: {
          en: 'A delivery. He is not cooking, so someone else may take the stove.',
          bn: 'এক ডেলিভারি। সে রাঁধছে না, তাই অন্য কেউ চুলা নিতে পারে।'
        }
      },
      {
        icon: 'user',
        node: 'waiter',
        name: { en: 'The pass', bn: 'পাস' },
        d: {
          en: 'You, waiting until the shift ends.',
          bn: 'আপনি, শিফট শেষ হওয়া পর্যন্ত অপেক্ষা।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'A second cook', bn: 'দ্বিতীয় রাঁধুনি' },
        is: { en: 'is the next page', bn: 'মানে পরের পাতা' },
        d: {
          en: 'Two cooks and one tally. That fight is not this page.',
          bn: 'দুই রাঁধুনি আর এক হিসাব। সেই লড়াই এই পাতা নয়।'
        }
      }
    ]
  },
  qa: [
    {
      q: { en: 'What is the difference between the Thread object and the OS thread?', bn: 'Thread অবজেক্ট আর OS thread-এর পার্থক্য কী?' },
      short: {
        en: 'The object can exist before the cook walks in. The real thread begins then.',
        bn: 'অবজেক্ট থাকতে পারে রাঁধুনি ঢোকার আগে। আসল thread তখন শুরু হয়।'
      },
      deep: {
        en: '`ident` is `None` until `start`. `is_alive` tracks `run`, from just before it until just after it returns, not the lifetime of the object. Creating a bare `Thread` does not start it. Submitting to a `ThreadPoolExecutor` does start work.',
        bn: '`ident` `start` পর্যন্ত `None`। `is_alive` `run`-কে অনুসরণ করে, তার ঠিক আগে থেকে ফেরার ঠিক পর পর্যন্ত, অবজেক্টের আয়ু নয়। খালি `Thread` বানালে সেটা শুরু হয় না। `ThreadPoolExecutor`-এ জমা দিলে কাজ শুরু হয়।'
      },
      redFlag: { en: '“Creating the Thread starts it.”', bn: '“Thread বানালেই সেটা শুরু হয়।”' }
    },
    {
      q: { en: 'What does daemon mean?', bn: 'daemon মানে কী?' },
      short: {
        en: 'The process will not stay up just for that thread.',
        bn: 'প্রসেস শুধু সেই thread-এর জন্য খোলা থাকবে না।'
      },
      deep: {
        en: 'The process exits when no non-daemon thread is alive, and daemon threads are stopped abruptly. Set the flag before `start`. A clean stop is a non-daemon thread plus an `Event`. Joining a daemon during late finalization can raise `PythonFinalizationError` in 3.14.',
        bn: 'কোনো নন-ডেমন thread জীবিত না থাকলে প্রসেস বেরিয়ে যায়, আর ডেমন thread হঠাৎ থামে। ফ্ল্যাগ `start`-এর আগে সেট করুন। পরিষ্কার থামা নন-ডেমন thread যোগ একটা `Event`। 3.14-এ দেরিতে ফাইনালাইজের সময় ডেমনকে join করলে `PythonFinalizationError` উঠতে পারে।'
      },
      redFlag: { en: '“Daemon means low priority.”', bn: '“Daemon মানে কম অগ্রাধিকার।”' }
    },
    {
      q: { en: 'Why does each thread have a stack?', bn: 'প্রতিটি thread-এর স্ট্যাক কেন থাকে?' },
      short: {
        en: 'So its calls and local notes are not mixed with another cook’s.',
        bn: 'যাতে তার কল আর নিজের নোট অন্য রাঁধুনির সাথে মেশে না।'
      },
      deep: {
        en: 'Threads share the heap. The stack is private. `stack_size(0)` keeps the platform default for threads created afterward, and the smallest size you may set is 32 KiB. The docs do not state an 8 MB default.',
        bn: 'Thread-রা হিপ ভাগ করে। স্ট্যাক ব্যক্তিগত। `stack_size(0)` পরে বানানো thread-এর জন্য প্ল্যাটফর্মের ডিফল্ট রাখে, আর আপনি অন্তত 32 KiB সেট করতে পারেন। ডক্স 8 MB ডিফল্ট বলে না।'
      },
      redFlag: { en: '“Threads share one stack.”', bn: '“Thread-রা এক স্ট্যাক ভাগ করে।”' }
    },
    {
      q: { en: 'What does join actually tell you?', bn: 'join আসলে কী জানায়?' },
      short: {
        en: 'It waits until the shift ends, and it returns nothing.',
        bn: 'এটা শিফট শেষ পর্যন্ত অপেক্ষা করে, আর কিছু ফেরায় না।'
      },
      deep: {
        en: '`join` returns `None`. A timeout does not mean the thread finished: call `is_alive` afterward. Joining yourself, or joining before `start`, raises `RuntimeError`. An exception inside `run` is handed to `threading.excepthook`, which ignores `SystemExit`.',
        bn: '`join` `None` ফেরায়। টাইমআউট মানে thread শেষ নয়: পরে `is_alive` ডাকুন। নিজেকে join, বা `start`-এর আগে join, `RuntimeError` তোলে। `run`-এর ভেতরের এক্সেপশন যায় `threading.excepthook`-এ, যা `SystemExit` উপেক্ষা করে।'
      },
      redFlag: { en: '“join returns the thread’s result.”', bn: '“join thread-এর ফল ফেরায়।”' }
    },
    {
      q: { en: 'What is a thread that Python did not start?', bn: 'Python যা শুরু করেনি, সেই thread কী?' },
      short: {
        en: 'It shows up as a dummy. You cannot wait for it at the pass.',
        bn: 'সেটা ডামি হয়ে দেখায়। পাসে তার জন্য অপেক্ষা করা যায় না।'
      },
      deep: {
        en: 'A thread started outside the `threading` module becomes a dummy when Python notices it. Dummies are always alive, always daemonic, and cannot be joined. Mention them once. Do not build a design around joining one.',
        bn: '`threading` মডিউলের বাইরে শুরু হওয়া thread-কে Python দেখলে সেটা ডামি হয়। ডামি সবসময় জীবিত, সবসময় ডেমন, আর join করা যায় না। একবার উল্লেখ করুন। একটাকে join করে নকশা বানাবেন না।'
      },
      redFlag: { en: '“Every thread you can see can be joined.”', bn: '“যে thread দেখা যায়, সব join করা যায়।”' }
    }
  ],
  cheats: [
    {
      code: 't = threading.Thread(target=work)\nprint(t.ident, t.is_alive())  # None False',
      d: {
        en: 'The object exists. No kernel thread yet, and it is not alive.',
        bn: 'অবজেক্ট আছে। এখনো কোনো কার্নেল thread নেই, আর সে জীবিত নয়।'
      }
    },
    {
      code: 't.daemon = True  # before start, or RuntimeError\nt.start()',
      d: {
        en: 'The flag is inherited, and the main thread is not a daemon.',
        bn: 'ফ্ল্যাগ উত্তরাধিকারসূত্রে আসে, আর মেইন thread ডেমন নয়।'
      }
    },
    {
      code: 't.join(1.0)  # returns None\nstill = t.is_alive()',
      d: {
        en: 'A timeout does not say the thread finished. Ask is_alive after it.',
        bn: 'টাইমআউট বলে না যে thread শেষ। পরে is_alive জিজ্ঞেস করুন।'
      }
    },
    {
      code: 'threading.stack_size(0)  # platform default\n# smallest settable size is 32 KiB',
      d: {
        en: 'Zero keeps the platform default. Do not assume 8 MB.',
        bn: 'শূন্য প্ল্যাটফর্মের ডিফল্ট রাখে। 8 MB ধরে নেবেন না।'
      }
    },
    {
      code: 'stop = threading.Event()\n# non-daemon thread: stop.wait() until stop.set()',
      d: {
        en: 'A clean stop. A daemon is cut off when the process exits.',
        bn: 'একটা পরিষ্কার থামা। ডেমন কেটে যায় যখন প্রসেস বেরিয়ে যায়।'
      }
    }
  ],
  sources: [
    { label: 'threading — Thread objects, daemon, join, stack_size', url: 'https://docs.python.org/3/library/threading.html' },
    { label: 'threading.excepthook', url: 'https://docs.python.org/3/library/threading.html#threading.excepthook' },
    { label: 'Python glossary: global interpreter lock', url: 'https://docs.python.org/3/glossary.html' }
  ]
}
