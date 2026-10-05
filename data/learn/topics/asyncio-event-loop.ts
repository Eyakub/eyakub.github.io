import type { Topic } from '../types'
import { UI } from '../ui'

export const asyncioEventLoop: Topic = {
  slug: 'asyncio-event-loop',
  line: 'concurrency',
  title: { en: 'The asyncio event loop', bn: 'asyncio event loop' },
  summary: {
    en: 'One thread runs many tasks. Each task steps aside at an await, and a selector wakes it when its I/O is ready.',
    bn: 'একটা thread অনেক task চালায়। প্রতিটা task `await`-এ সরে দাঁড়ায়, আর I/O তৈরি হলে selector তাকে জাগায়।'
  },
  hook: {
    en: 'One cook can handle many dishes because most of the time a dish is just waiting, and a waiting dish needs no cook.',
    bn: 'এক রাঁধুনি অনেক পদ সামলাতে পারে, কারণ বেশিরভাগ সময় পদ শুধু অপেক্ষা করে, আর অপেক্ষার পদে রাঁধুনি লাগে না।'
  },
  takeaway: {
    en: 'The cook never stands idle: waiting dishes step aside, slow jobs go to helpers.',
    bn: 'রাঁধুনি বসে থাকে না: অপেক্ষার পদ সরে দাঁড়ায়, ধীর কাজ যায় সহকারীদের কাছে।'
  },
  words: [
    {
      term: { en: 'Dish', bn: 'পদ' },
      d: {
        en: 'One job to cook. It can pause while it waits for something slow.',
        bn: 'রাঁধার মতো একটা কাজ। ধীর কিছুর অপেক্ষায় সেটা থামতে পারে।'
      }
    },
    {
      term: { en: 'Cook', bn: 'রাঁধুনি' },
      d: {
        en: 'The one worker. It cooks one dish at a time and never stands around.',
        bn: 'একমাত্র কর্মী। একবারে একটা পদ রাঁধে আর কখনো বসে থাকে না।'
      }
    },
    {
      term: { en: 'Ready rack', bn: 'তৈরি তাক' },
      d: {
        en: 'Where dishes wait that are ready to be cooked right now.',
        bn: 'যেখানে এখনই রাঁধার জন্য তৈরি পদগুলো অপেক্ষা করে।'
      }
    },
    {
      term: { en: 'Timer board', bn: 'টাইমার বোর্ড' },
      d: {
        en: 'Dings when a dish that was set aside can carry on.',
        bn: 'সরিয়ে রাখা পদ আবার চলার মতো হলে ডিং করে।'
      }
    },
    {
      term: { en: 'Delivery door', bn: 'ডেলিভারির দরজা' },
      d: {
        en: 'Where slow things arrive from outside, like data from the internet.',
        bn: 'যেখানে বাইরে থেকে ধীর জিনিস আসে, যেমন ইন্টারনেটের data।'
      }
    },
    {
      term: { en: 'Helper cooks', bn: 'সহকারী রাঁধুনি' },
      d: {
        en: 'A small team out back. They take slow jobs so the cook stays free.',
        bn: 'পেছনের ছোট দল। তারা ধীর কাজ নেয়, যাতে রাঁধুনি ফাঁকা থাকে।'
      }
    }
  ],
  legend: {
    request: { en: 'Cook takes a dish', bn: 'রাঁধুনি পদ নেয়' },
    queue: { en: 'A dish set aside', bn: 'সরিয়ে রাখা পদ' },
    result: { en: 'Delivery or finished dish', bn: 'ডেলিভারি বা তৈরি পদ' },
    error: { en: 'The cook is stuck', bn: 'রাঁধুনি আটকে গেছে' }
  },
  view: { wide: [ 1000, 400 ], narrow: [ 400, 550 ] },
  nodeR: { narrow: 20 },
  nodes: {
    tasks: {
      icon: 'task',
      name: { en: 'Your tasks', bn: 'আপনার task' },
      sub: { en: 'Coroutines A, B', bn: 'Coroutine A, B' },
      plain: {
        name: { en: 'The dishes', bn: 'পদগুলো' },
        sub: { en: 'Dish A and dish B', bn: 'পদ A আর পদ B' }
      },
      wide: [ 130, 210, 'up' ],
      narrow: [ 80, 70, 'right' ]
    },
    ready: {
      icon: 'queue',
      name: { en: 'Ready queue', bn: 'Ready queue' },
      sub: { en: 'Empty', bn: 'খালি' },
      plain: {
        name: { en: 'Ready rack', bn: 'তৈরি তাক' },
        sub: { en: 'Dishes ready to cook', bn: 'রাঁধার জন্য তৈরি পদ' }
      },
      wide: [ 330, 210, 'up' ],
      narrow: [ 80, 158, 'right' ]
    },
    loop: {
      icon: 'loop',
      name: { en: 'Event loop', bn: 'Event loop' },
      sub: { en: 'One thread', bn: 'একটা thread' },
      plain: {
        name: { en: 'The cook', bn: 'রাঁধুনি' },
        sub: { en: 'One cook, many dishes', bn: 'এক রাঁধুনি, অনেক পদ' }
      },
      wide: [ 530, 210, 'up' ],
      narrow: [ 80, 246, 'right' ]
    },
    selector: {
      icon: 'hourglass',
      name: { en: 'Selector', bn: 'Selector' },
      sub: { en: 'epoll / kqueue', bn: 'epoll / kqueue' },
      plain: {
        name: { en: 'Timer board', bn: 'টাইমার বোর্ড' },
        sub: { en: 'Dings when ready', bn: 'তৈরি হলে ডিং করে' }
      },
      wide: [ 730, 210, 'down' ],
      narrow: [ 80, 334, 'right' ]
    },
    net: {
      icon: 'cloud',
      name: { en: 'Sockets', bn: 'Socket' },
      sub: { en: 'Network', bn: 'network' },
      plain: {
        name: { en: 'Delivery door', bn: 'ডেলিভারির দরজা' },
        sub: { en: 'Slow things arrive', bn: 'ধীর জিনিস আসে' }
      },
      wide: [ 910, 210, 'down' ],
      narrow: [ 80, 422, 'right' ]
    },
    pool: {
      icon: 'worker',
      name: { en: 'Thread pool', bn: 'Thread pool' },
      sub: { en: 'Default executor', bn: 'Default executor' },
      plain: {
        name: { en: 'Helper cooks', bn: 'সহকারী রাঁধুনি' },
        sub: { en: 'Take the slow jobs', bn: 'ধীর কাজ নেয়' }
      },
      wide: [ 530, 350, 'right' ],
      narrow: [ 80, 510, 'right' ]
    }
  },
  groups: [
    {
      id: 'thread',
      label: { en: 'One thread', bn: 'একটা thread' },
      plain: { en: 'One cook', bn: 'এক রাঁধুনি' },
      wide: [ 50, 50, 760, 265 ],
      narrow: [ 30, 40, 305, 330 ]
    }
  ],
  corridors: {
    'tasks-ready': {
      wide: [ [ 130, 210 ], [ 330, 210 ] ],
      narrow: [ [ 80, 70 ], [ 80, 158 ] ]
    },
    'ready-loop': {
      wide: [ [ 330, 210 ], [ 530, 210 ] ],
      narrow: [ [ 80, 158 ], [ 80, 246 ] ]
    },
    'loop-selector': {
      wide: [ [ 530, 210 ], [ 730, 210 ] ],
      narrow: [ [ 80, 246 ], [ 80, 334 ] ]
    },
    'net-selector': {
      wide: [ [ 910, 210 ], [ 730, 210 ] ],
      narrow: [ [ 80, 422 ], [ 80, 334 ] ]
    },
    'selector-ready': {
      wide: [ [ 730, 210 ], [ 730, 90 ], [ 450, 90 ], [ 330, 210 ] ],
      narrow: [ [ 80, 334 ], [ 125, 289 ], [ 320, 289 ], [ 320, 203 ], [ 125, 203 ], [ 80, 158 ] ]
    },
    'loop-tasks': {
      wide: [ [ 530, 210 ], [ 450, 290 ], [ 130, 290 ], [ 130, 210 ] ],
      narrow: [ [ 80, 246 ], [ 50, 216 ], [ 50, 70 ], [ 80, 70 ] ]
    },
    'loop-pool': {
      wide: [ [ 530, 210 ], [ 530, 350 ] ],
      narrow: [ [ 80, 246 ], [ 50, 276 ], [ 50, 510 ], [ 80, 510 ] ]
    },
    'pool-ready': {
      wide: [ [ 530, 350 ], [ 470, 350 ], [ 330, 210 ] ],
      narrow: [ [ 80, 510 ], [ 125, 465 ], [ 360, 465 ], [ 360, 113 ], [ 125, 113 ], [ 80, 158 ] ]
    }
  },
  edges: {
    'tasks-ready': { from: 'tasks', to: 'ready', kind: 'queue' },
    'ready-loop': { from: 'ready', to: 'loop', kind: 'request' },
    'loop-selector': { from: 'loop', to: 'selector', kind: 'queue' },
    'net-selector': { from: 'net', to: 'selector', kind: 'result' },
    'selector-ready': { from: 'selector', to: 'ready', kind: 'result' },
    'loop-tasks': { from: 'loop', to: 'tasks', kind: 'result' },
    'loop-pool': { from: 'loop', to: 'pool', kind: 'request' },
    'pool-ready': { from: 'pool', to: 'ready', kind: 'result' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'schedule',
        moves: [ { edge: 'tasks-ready', label: 'A, B', plain: { en: 'Dishes A, B', bn: 'পদ A, B' } } ],
        state: {
          ready: { en: 'A, B', bn: 'A, B' },
          tasks: { en: 'A, B queued', bn: 'A, B queue-এ' }
        },
        plainState: {
          tasks: { en: 'A, B on the rack', bn: 'A, B তাকে' }
        },
        title: { en: 'Two dishes go on the rack', bn: 'দুটো পদ তাকে ওঠে' },
        simple: {
          en: 'Meet our one cook. Two dishes, A and B, go on the ready rack. A dish that must wait will step aside, so the cook never stands around.',
          bn: 'এই হলো আমাদের একমাত্র রাঁধুনি। দুটো পদ, A আর B, তৈরি তাকে ওঠে। যে পদকে অপেক্ষা করতে হবে সে সরে দাঁড়াবে, তাই রাঁধুনি বসে থাকে না।'
        },
        tech: {
          en: '`create_task` or `gather` wraps each coroutine in a Task and schedules its first step in the loop’s ready queue.',
          bn: '`create_task` বা `gather` প্রতিটা coroutine-কে Task-এ মোড়ে আর তার প্রথম ধাপ loop-এর ready queue-তে বসায়।'
        }
      },
      {
        id: 'run-a',
        moves: [ { edge: 'ready-loop', label: 'run A', plain: { en: 'Cook takes A', bn: 'রাঁধুনি A নেয়' } } ],
        state: {
          loop: { en: 'Running A', bn: 'A চালাচ্ছে' },
          ready: { en: 'B', bn: 'B' },
          tasks: { en: 'A runs, B queued', bn: 'A চলছে, B queue-এ' }
        },
        plainState: {
          loop: { en: 'Cooking A', bn: 'A রাঁধছে' },
          tasks: { en: 'A cooking, B on rack', bn: 'A রান্নায়, B তাকে' }
        },
        title: { en: 'The cook takes dish A', bn: 'রাঁধুনি পদ A নেয়' },
        simple: {
          en: 'The cook takes dish A off the ready rack and starts cooking it.',
          bn: 'রাঁধুনি তৈরি তাক থেকে পদ A নিয়ে রাঁধতে শুরু করে।'
        },
        tech: {
          en: 'The loop takes one callback from the ready queue and runs it until the coroutine awaits. Nothing else runs meanwhile: scheduling is cooperative.',
          bn: 'loop ready queue থেকে একটা callback নিয়ে coroutine `await` না করা পর্যন্ত চালায়। এর মধ্যে আর কিছু চলে না: scheduling cooperative।'
        }
      },
      {
        id: 'a-awaits',
        moves: [ { edge: 'loop-selector', label: 'await recv()', plain: { en: 'Ding me later', bn: 'পরে জানাও' } } ],
        state: {
          loop: { en: 'A suspended', bn: 'A থেমে আছে' },
          selector: { en: 'Watching A', bn: 'A-কে দেখছে' },
          tasks: { en: 'A waits, B queued', bn: 'A অপেক্ষায়, B queue-এ' }
        },
        plainState: {
          loop: { en: 'A set aside', bn: 'A সরানো' },
          selector: { en: 'Timing A', bn: 'A-র সময় দেখছে' },
          tasks: { en: 'A waits, B on rack', bn: 'A অপেক্ষায়, B তাকে' }
        },
        title: { en: 'Dish A steps aside to wait', bn: 'পদ A অপেক্ষায় সরে দাঁড়ায়' },
        simple: {
          en: 'Dish A needs something slow from the delivery door. The cook sets A aside and asks the timer board to ding when it arrives.',
          bn: 'পদ A-র ডেলিভারির দরজা থেকে ধীর কিছু দরকার। রাঁধুনি A-কে সরিয়ে রাখে আর এলে টাইমার বোর্ডকে ডিং করতে বলে।'
        },
        tech: {
          en: '`await` on an unfinished future suspends the coroutine and returns control to the loop. The socket is registered with the selector: epoll on Linux, kqueue on macOS and BSD.',
          bn: 'অসমাপ্ত future-এ `await` করলে coroutine থেমে যায় আর control loop-এ ফেরে। socket selector-এ register হয়: Linux-এ epoll, macOS আর BSD-তে kqueue।'
        }
      },
      {
        id: 'run-b',
        moves: [ { edge: 'ready-loop', label: 'run B', plain: { en: 'Cook takes B', bn: 'রাঁধুনি B নেয়' } } ],
        state: {
          loop: { en: 'Running B', bn: 'B চালাচ্ছে' },
          ready: { en: 'Empty', bn: 'খালি' },
          tasks: { en: 'B runs, A waits', bn: 'B চলছে, A অপেক্ষায়' }
        },
        plainState: {
          loop: { en: 'Cooking B', bn: 'B রাঁধছে' },
          tasks: { en: 'B cooking, A waits', bn: 'B রান্নায়, A অপেক্ষায়' }
        },
        title: { en: 'The cook moves on to B', bn: 'রাঁধুনি B-তে যায়' },
        simple: {
          en: 'The cook does not wait for A. Dish B comes off the ready rack and is cooked right away.',
          bn: 'রাঁধুনি A-র জন্য বসে থাকে না। তৈরি তাক থেকে পদ B নিয়ে সাথে সাথে রাঁধে।'
        },
        tech: {
          en: 'This is the whole benefit. While A waits for I/O, B uses the thread, and waiting costs no CPU.',
          bn: 'পুরো লাভটাই এখানে। A যখন I/O-র জন্য অপেক্ষা করে, B তখন thread ব্যবহার করে, আর অপেক্ষায় CPU খরচ হয় না।'
        }
      },
      {
        id: 'b-awaits',
        moves: [ { edge: 'loop-selector', label: 'await recv()', plain: { en: 'Ding me later', bn: 'পরে জানাও' } } ],
        state: {
          loop: { en: 'B suspended', bn: 'B থেমে আছে' },
          selector: { en: 'Watching A, B', bn: 'A, B-কে দেখছে' },
          tasks: { en: 'A, B waiting', bn: 'A, B অপেক্ষায়' }
        },
        plainState: {
          loop: { en: 'B set aside', bn: 'B সরানো' },
          selector: { en: 'Timing A and B', bn: 'A আর B-র সময় দেখছে' }
        },
        title: { en: 'Dish B steps aside too', bn: 'পদ B-ও সরে দাঁড়ায়' },
        simple: {
          en: 'Dish B needs something slow too, so it also steps aside. The timer board now keeps time for both dishes.',
          bn: 'পদ B-রও ধীর কিছু দরকার, তাই সেও সরে দাঁড়ায়। টাইমার বোর্ড এখন দুটো পদেরই সময় দেখে।'
        },
        tech: {
          en: 'B registers its socket with the selector as well. Both tasks are now pending, and the ready queue is empty.',
          bn: 'B-ও নিজের socket selector-এ register করে। এখন দুটো task-ই pending, আর ready queue খালি।'
        }
      },
      {
        id: 'idle',
        work: { node: 'selector', kind: 'queue' },
        state: {
          loop: { en: 'Idle in select', bn: 'select-এ বসে আছে' },
          selector: { en: 'Sleeping', bn: 'ঘুমিয়ে আছে' }
        },
        plainState: {
          loop: { en: 'Resting', bn: 'বিশ্রামে' },
          selector: { en: 'Waiting to ding', bn: 'ডিংয়ের অপেক্ষায়' }
        },
        title: { en: 'The cook rests', bn: 'রাঁধুনি বিশ্রাম নেয়' },
        simple: {
          en: 'Nothing is ready to cook. The timer board keeps watch, and the cook rests until it dings.',
          bn: 'রাঁধার মতো কিছু তৈরি নেই। টাইমার বোর্ড নজর রাখে, আর ডিং না হওয়া পর্যন্ত রাঁধুনি বিশ্রাম নেয়।'
        },
        tech: {
          en: 'When idle, the loop blocks in `select(timeout)`, where the timeout is the time to the next timer. The kernel tracks readiness, so many sockets cost little.',
          bn: 'কাজ না থাকলে loop `select(timeout)`-এ আটকে থাকে, timeout মানে পরের timer পর্যন্ত সময়। readiness kernel দেখে, তাই অনেক socket-এও খরচ কম।'
        }
      },
      {
        id: 'bytes-arrive',
        moves: [ { edge: 'net-selector', label: "A's bytes", plain: { en: 'A’s delivery', bn: 'A-র ডেলিভারি' } } ],
        state: {
          net: { en: 'A’s data in', bn: 'A-র data এসেছে' },
          selector: { en: 'A ready', bn: 'A তৈরি' },
          loop: { en: 'Waking', bn: 'জাগছে' }
        },
        plainState: {
          net: { en: 'A’s delivery in', bn: 'A-র ডেলিভারি এসেছে' },
          selector: { en: 'Dings for A', bn: 'A-র জন্য ডিং' },
          loop: { en: 'Waking up', bn: 'জাগছে' }
        },
        title: { en: 'Delivery for A arrives', bn: 'A-র ডেলিভারি আসে' },
        simple: {
          en: 'What dish A was waiting for arrives at the delivery door, and the timer board notices.',
          bn: 'পদ A যার অপেক্ষায় ছিল তা ডেলিভারির দরজায় আসে, আর টাইমার বোর্ড টের পায়।'
        },
        tech: {
          en: 'The kernel marks A’s socket readable, so the blocked `select` call returns.',
          bn: 'kernel A-র socket-কে readable চিহ্নিত করে, তাই আটকে থাকা `select` call ফিরে আসে।'
        }
      },
      {
        id: 'wake-a',
        moves: [ { edge: 'selector-ready', label: 'wake A', plain: { en: 'A is ready', bn: 'A তৈরি' } } ],
        state: {
          ready: { en: 'A', bn: 'A' },
          loop: { en: 'Awake', bn: 'জেগেছে' },
          selector: { en: 'Watching B', bn: 'B-কে দেখছে' },
          net: { en: 'Network', bn: 'network' }
        },
        plainState: {
          selector: { en: 'Timing B', bn: 'B-র সময় দেখছে' },
          net: { en: 'Waiting for B', bn: 'B-র অপেক্ষায়' }
        },
        title: { en: 'The board calls A back', bn: 'বোর্ড A-কে ডাকে' },
        simple: {
          en: 'The timer board dings, and dish A goes back on the ready rack.',
          bn: 'টাইমার বোর্ড ডিং করে, আর পদ A আবার তৈরি তাকে ফিরে যায়।'
        },
        tech: {
          en: 'The loop learns that A’s socket is ready and marks A ready to resume. Nothing has resumed A yet.',
          bn: 'loop জানতে পারে A-র socket তৈরি, আর A-কে আবার চলার জন্য ready করে। A এখনও চলা শুরু করেনি।'
        }
      },
      {
        id: 'resume-a',
        moves: [ { edge: 'ready-loop', label: 'resume A', plain: { en: 'Cook resumes A', bn: 'রাঁধুনি A ধরে' } } ],
        state: {
          loop: { en: 'Running A', bn: 'A চালাচ্ছে' },
          ready: { en: 'Empty', bn: 'খালি' },
          tasks: { en: 'A runs, B waits', bn: 'A চলছে, B অপেক্ষায়' }
        },
        plainState: {
          loop: { en: 'Cooking A', bn: 'A রাঁধছে' },
          tasks: { en: 'A cooking, B waits', bn: 'A রান্নায়, B অপেক্ষায়' }
        },
        title: { en: 'The cook picks A back up', bn: 'রাঁধুনি A আবার ধরে' },
        simple: {
          en: 'The cook takes A off the rack and carries on from the exact spot where it stepped aside.',
          bn: 'রাঁধুনি তাক থেকে A নিয়ে ঠিক যেখানে থেমেছিল সেখান থেকে আবার রাঁধে।'
        },
        tech: {
          en: 'The Task continues the coroutine right after its `await`, with the received bytes as the result. A runs until it finishes or awaits again.',
          bn: 'Task coroutine-কে ঠিক `await`-এর পর থেকে চালায়, পাওয়া bytes ফলাফল হিসেবে। A শেষ না হওয়া বা আবার `await` না করা পর্যন্ত চলে।'
        }
      },
      {
        id: 'a-done',
        moves: [ { edge: 'loop-tasks', label: 'A done', plain: { en: 'A done', bn: 'A শেষ' } } ],
        state: {
          tasks: { en: 'A done, B waits', bn: 'A শেষ, B অপেক্ষায়' },
          loop: { en: 'Idle again', bn: 'আবার অলস' }
        },
        plainState: {
          loop: { en: 'Resting', bn: 'বিশ্রামে' }
        },
        title: { en: 'Dish A is done', bn: 'পদ A শেষ' },
        simple: {
          en: 'Dish A is done. B carries on when its delivery arrives.',
          bn: 'পদ A শেষ। B-র ডেলিভারি এলে B এগোবে।'
        },
        tech: {
          en: 'The Task completes and its done-callbacks are scheduled. One thread served both tasks: concurrent, but never parallel.',
          bn: 'Task শেষ হয় আর তার done-callback schedule হয়। একটা thread দুটো task-ই সামলেছে: concurrent, কিন্তু কখনো parallel নয়।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'blocking',
      label: { en: 'Cook stands and waits', bn: 'রাঁধুনি দাঁড়িয়ে অপেক্ষা করে' },
      whatIf: { en: 'What if a dish makes the cook stand and wait instead of stepping aside?', bn: 'যদি কোনো পদ সরে না দাঁড়িয়ে রাঁধুনিকে দাঁড় করিয়ে রাখে?' },
      branchAfter: 'run-a',
      steps: [
        {
          id: 'sleep-blocks',
          work: { node: 'loop', kind: 'error' },
          state: {
            loop: { en: 'Blocked 3 s', bn: '৩ সেকেন্ড আটকা' },
            tasks: { en: 'A blocks, B waits', bn: 'A আটকে, B অপেক্ষায়' }
          },
          plainState: {
            loop: { en: 'Stuck waiting', bn: 'আটকে অপেক্ষায়' },
            tasks: { en: 'A stuck, B waits', bn: 'A আটকে, B অপেক্ষায়' }
          },
          title: { en: 'The cook gets stuck', bn: 'রাঁধুনি আটকে যায়' },
          simple: {
            en: 'Dish A makes the cook stand and wait instead of stepping aside. The cook is stuck, and nothing else gets cooked.',
            bn: 'পদ A সরে না দাঁড়িয়ে রাঁধুনিকে দাঁড় করিয়ে রাখে। রাঁধুনি আটকে যায়, আর অন্য কিছু রাঁধা হয় না।'
          },
          tech: {
            en: '`time.sleep(3)` or `requests.get()` inside `async def` never yields. No other task, timer or I/O callback can run. Debug mode logs callbacks slower than `slow_callback_duration`, 100 ms by default.',
            bn: '`async def`-এর ভেতরে `time.sleep(3)` বা `requests.get()` কখনো control ছাড়ে না। অন্য কোনো task, timer বা I/O callback চলতে পারে না। debug mode `slow_callback_duration`-এর বেশি ধীর callback log করে, ডিফল্ট ১০০ ms।'
          }
        },
        {
          id: 'everyone-waits',
          work: { node: [ 'ready', 'net' ], kind: 'error' },
          state: {
            ready: { en: 'B stuck', bn: 'B আটকা' },
            net: { en: 'Timeouts', bn: 'Timeout' }
          },
          plainState: {
            ready: { en: 'B stuck on rack', bn: 'B তাকে আটকা' },
            net: { en: 'Orders pile up', bn: 'অর্ডার জমছে' }
          },
          title: { en: 'Everything else waits', bn: 'বাকি সব অপেক্ষা করে' },
          simple: {
            en: 'Dish B sits on the rack and orders pile up at the delivery door, all waiting for the stuck cook.',
            bn: 'পদ B তাকে পড়ে থাকে আর ডেলিভারির দরজায় অর্ডার জমে, সবাই আটকে থাকা রাঁধুনির অপেক্ষায়।'
          },
          tech: {
            en: 'Latency for every concurrent request becomes the blocker’s duration. Clients time out, and health checks can fail.',
            bn: 'প্রতিটা concurrent request-এর latency হয়ে যায় blocker-এর সময়ের সমান। client timeout পায়, আর health check ব্যর্থ হতে পারে।'
          }
        },
        {
          id: 'fix-await',
          work: { node: 'loop', kind: 'result' },
          state: {
            loop: { en: 'Fix: await sleep', bn: 'সমাধান: await sleep' },
            ready: { en: 'B can run', bn: 'B চলতে পারে' },
            net: { en: 'Network', bn: 'network' },
            tasks: { en: 'A awaits, B runs', bn: 'A await করে, B চলে' }
          },
          plainState: {
            loop: { en: 'A steps aside', bn: 'A সরে দাঁড়ায়' },
            ready: { en: 'B can be cooked', bn: 'B রাঁধা যায়' },
            net: { en: 'Delivery door', bn: 'ডেলিভারির দরজা' },
            tasks: { en: 'A waits, B cooking', bn: 'A অপেক্ষায়, B রান্নায়' }
          },
          title: { en: 'Step aside instead of standing', bn: 'দাঁড়িয়ে না থেকে সরে দাঁড়ান' },
          simple: {
            en: 'The fix: dish A steps aside while it waits, so the cook is free to cook dish B.',
            bn: 'সমাধান: পদ A অপেক্ষার সময় সরে দাঁড়ায়, তাই রাঁধুনি ফাঁকা থাকে আর পদ B রাঁধতে পারে।'
          },
          tech: {
            en: 'Use `await asyncio.sleep(3)`, an async library such as `httpx.AsyncClient`, or offload the call to a thread.',
            bn: '`await asyncio.sleep(3)`, `httpx.AsyncClient`-এর মতো async library, বা call-টা thread-এ পাঠিয়ে দিন।'
          }
        }
      ]
    },
    {
      id: 'offload',
      label: { en: 'Send to helper cooks', bn: 'সহকারী রাঁধুনিদের দেওয়া' },
      whatIf: { en: 'What if the slow job is handed to the helper cooks?', bn: 'যদি ধীর কাজটা সহকারী রাঁধুনিদের দেওয়া হয়?' },
      branchAfter: 'run-a',
      steps: [
        {
          id: 'to-thread',
          moves: [ { edge: 'loop-pool', label: 'to_thread(f)', plain: { en: 'Slow job out back', bn: 'ধীর কাজ পেছনে' } } ],
          state: {
            pool: { en: 'Running f()', bn: 'f() চালাচ্ছে' },
            loop: { en: 'A suspended', bn: 'A থেমে আছে' },
            tasks: { en: 'A waits, B queued', bn: 'A অপেক্ষায়, B queue-এ' }
          },
          plainState: {
            pool: { en: 'Doing the slow job', bn: 'ধীর কাজ করছে' },
            loop: { en: 'A set aside', bn: 'A সরানো' },
            tasks: { en: 'A waits, B on rack', bn: 'A অপেক্ষায়, B তাকে' }
          },
          title: { en: 'A’s slow job goes out back', bn: 'A-র ধীর কাজ পেছনে যায়' },
          simple: {
            en: 'Dish A has a slow job. The cook hands it to the helper cooks out back and sets A aside.',
            bn: 'পদ A-র একটা ধীর কাজ আছে। রাঁধুনি সেটা পেছনের সহকারী রাঁধুনিদের দেয় আর A-কে সরিয়ে রাখে।'
          },
          tech: {
            en: '`asyncio.to_thread(f)` submits `f` to the default executor, a `ThreadPoolExecutor` created lazily. On 3.13+ its size is `min(32, (os.process_cpu_count() or 1) + 4)`.',
            bn: '`asyncio.to_thread(f)` `f`-কে default executor-এ দেয়, যা lazily তৈরি হওয়া একটা `ThreadPoolExecutor`। 3.13+-এ তার আকার `min(32, (os.process_cpu_count() or 1) + 4)`।'
          }
        },
        {
          id: 'serve-b',
          moves: [ { edge: 'ready-loop', label: 'run B', plain: { en: 'Cook takes B', bn: 'রাঁধুনি B নেয়' } } ],
          state: {
            loop: { en: 'Running B', bn: 'B চালাচ্ছে' },
            ready: { en: 'Empty', bn: 'খালি' },
            tasks: { en: 'B runs, A waits', bn: 'B চলছে, A অপেক্ষায়' }
          },
          plainState: {
            loop: { en: 'Cooking B', bn: 'B রাঁধছে' },
            tasks: { en: 'B cooking, A waits', bn: 'B রান্নায়, A অপেক্ষায়' }
          },
          title: { en: 'The cook keeps cooking B', bn: 'রাঁধুনি B রাঁধতে থাকে' },
          simple: {
            en: 'Meanwhile the cook is free and keeps cooking other dishes, like B.',
            bn: 'এর মধ্যে রাঁধুনি ফাঁকা থাকে আর B-র মতো অন্য পদ রাঁধতে থাকে।'
          },
          tech: {
            en: 'The loop carries on. The helper thread blocks in I/O and releases the GIL, so the loop thread can still run.',
            bn: 'loop চলতে থাকে। helper thread I/O-তে আটকে থাকে আর GIL ছেড়ে দেয়, তাই loop thread চলতে পারে।'
          }
        },
        {
          id: 'pool-done',
          moves: [ { edge: 'pool-ready', label: 'done', plain: { en: 'Job done', bn: 'কাজ শেষ' } } ],
          state: {
            pool: { en: 'Idle', bn: 'বসে আছে' },
            ready: { en: 'A', bn: 'A' }
          },
          title: { en: 'The helper cooks finish', bn: 'সহকারী রাঁধুনিরা শেষ করে' },
          simple: {
            en: 'When the helper cooks finish, dish A goes back on the ready rack.',
            bn: 'সহকারী রাঁধুনিরা শেষ করলে পদ A আবার তৈরি তাকে ফেরে।'
          },
          tech: {
            en: 'The helper’s result reaches the loop, and A is marked ready to resume after its `await`.',
            bn: 'helper-এর ফলাফল loop-এ পৌঁছায়, আর A তার `await`-এর পর চলার জন্য ready হয়।'
          }
        },
        {
          id: 'gil-caveat',
          work: { node: 'pool', kind: 'queue' },
          state: {
            pool: { en: 'I/O yes, CPU no', bn: 'I/O হ্যাঁ, CPU না' },
            loop: { en: 'Free', bn: 'ফাঁকা' }
          },
          plainState: {
            pool: { en: 'Good at waiting', bn: 'অপেক্ষায় ভালো' },
            loop: { en: 'Free', bn: 'ফাঁকা' }
          },
          title: { en: 'Helpers fix waiting, not sums', bn: 'সহকারীরা অপেক্ষা মেটায়, হিসাব নয়' },
          simple: {
            en: 'Helper cooks are great at waiting for slow things, but heavy calculating still takes turns. Heavy work needs a whole separate kitchen.',
            bn: 'সহকারী রাঁধুনিরা ধীর জিনিসের অপেক্ষায় দারুণ, কিন্তু ভারী হিসাব তবু পালা করে হয়। ভারী কাজে আলাদা পুরো রান্নাঘর লাগে।'
          },
          tech: {
            en: 'Because of the GIL, `to_thread` can typically only make I/O-bound functions non-blocking. For CPU-bound work, use a `ProcessPoolExecutor` through `run_in_executor`.',
            bn: 'GIL-এর কারণে `to_thread` সাধারণত শুধু I/O-bound ফাংশনকে non-blocking করতে পারে। CPU-bound কাজে `run_in_executor`-এর মাধ্যমে `ProcessPoolExecutor` ব্যবহার করুন।'
          }
        }
      ]
    },
    {
      id: 'fastapi',
      label: { en: 'Two kinds of web page', bn: 'দুই ধরনের ওয়েব পাতা' },
      whatIf: { en: 'What if each dish is a web page that a visitor asked for?', bn: 'যদি প্রতিটা পদ হয় দর্শকের চাওয়া একটা ওয়েব পাতা?' },
      branchAfter: 'schedule',
      steps: [
        {
          id: 'async-route',
          moves: [ { edge: 'ready-loop', label: 'async def route', plain: { en: 'Waiting-style page', bn: 'অপেক্ষা-ধরনের পাতা' } } ],
          state: {
            loop: { en: 'Awaited on loop', bn: 'loop-এই await হয়' },
            ready: { en: 'Next in line', bn: 'পরেরজন লাইনে' },
            tasks: { en: 'Request task', bn: 'Request-এর task' }
          },
          plainState: {
            loop: { en: 'Cooking it itself', bn: 'নিজেই রাঁধছে' },
            tasks: { en: 'A visitor’s dish', bn: 'দর্শকের পদ' }
          },
          title: { en: 'A polite page runs on the cook', bn: 'ভদ্র পাতা রাঁধুনিই চালায়' },
          simple: {
            en: 'A page written to step aside is cooked by the cook itself. Anything slow inside it would stall every other dish.',
            bn: 'যে পাতা সরে দাঁড়াতে জানে তা রাঁধুনি নিজেই রাঁধে। তার ভেতরে ধীর কিছু থাকলে বাকি সব পদ আটকে যাবে।'
          },
          tech: {
            en: 'FastAPI awaits `async def` path operations on the event loop thread. Blocking code inside one blocks every other request.',
            bn: 'FastAPI `async def` path operation event loop thread-এই await করে। ভেতরে blocking কোড থাকলে বাকি সব request আটকে যায়।'
          }
        },
        {
          id: 'def-route',
          moves: [ { edge: 'loop-pool', label: 'def route', plain: { en: 'Plain page', bn: 'সাধারণ পাতা' } } ],
          state: {
            pool: { en: 'AnyIO thread, 40 max', bn: 'AnyIO thread, সর্বোচ্চ ৪০' },
            loop: { en: 'Stays free', bn: 'ফাঁকা থাকে' }
          },
          plainState: {
            pool: { en: 'Helper cooks busy', bn: 'সহকারীরা ব্যস্ত' }
          },
          title: { en: 'A plain page goes to helpers', bn: 'সাধারণ পাতা সহকারীদের কাছে যায়' },
          simple: {
            en: 'A plainly written page is handed to the helper cooks automatically, so the cook stays free.',
            bn: 'সাধারণভাবে লেখা পাতা নিজে থেকেই সহকারী রাঁধুনিদের কাছে যায়, তাই রাঁধুনি ফাঁকা থাকে।'
          },
          tech: {
            en: 'FastAPI runs `def` routes in AnyIO’s threadpool, whose default limiter is 40 threads, so they do not block the loop.',
            bn: 'FastAPI `def` route AnyIO-র threadpool-এ চালায়, যার ডিফল্ট limiter ৪০ thread, তাই loop আটকায় না।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'One cook, many dishes. The cook never stands around: when a dish has to wait, it steps aside and the cook takes another, coming back when the timer board dings.',
      bn: 'এক রাঁধুনি, অনেক পদ। রাঁধুনি কখনো বসে থাকে না: কোনো পদকে অপেক্ষা করতে হলে সে সরে দাঁড়ায়, রাঁধুনি অন্য পদ ধরে, আর টাইমার বোর্ড ডিং করলে ফিরে আসে।'
    },
    twins: [
      {
        icon: 'task',
        node: 'tasks',
        name: { en: 'The dishes', bn: 'পদগুলো' },
        d: {
          en: 'Each dish is a job in progress. It pauses whenever it has to wait.',
          bn: 'প্রতিটা পদ চলতে থাকা একটা কাজ। অপেক্ষা করতে হলেই সেটা থেমে যায়।'
        }
      },
      {
        icon: 'queue',
        node: 'ready',
        name: { en: 'The ready rack', bn: 'তৈরি তাক' },
        d: {
          en: 'A short row of dishes that can be cooked right now.',
          bn: 'এখনই রাঁধা যায় এমন পদের একটা ছোট সারি।'
        }
      },
      {
        icon: 'loop',
        node: 'loop',
        name: { en: 'The cook', bn: 'রাঁধুনি' },
        d: {
          en: 'One person, one dish at a time. A quick turn at each, then straight on to the next.',
          bn: 'একজন মানুষ, একবারে একটা পদ। প্রতিটায় ছোট্ট একটা পালা, তারপর সোজা পরেরটায়।'
        }
      },
      {
        icon: 'hourglass',
        node: 'selector',
        name: { en: 'The timer board', bn: 'টাইমার বোর্ড' },
        d: {
          en: 'Lights up when a waiting dish is ready, so the cook never checks each one.',
          bn: 'অপেক্ষার পদ তৈরি হলে জ্বলে ওঠে, তাই রাঁধুনিকে প্রতিটা দেখতে হয় না।'
        }
      },
      {
        icon: 'cloud',
        node: 'net',
        name: { en: 'The delivery door', bn: 'ডেলিভারির দরজা' },
        d: {
          en: 'Everything slow that comes from outside the kitchen.',
          bn: 'রান্নাঘরের বাইরে থেকে আসা সব ধীর জিনিস।'
        }
      },
      {
        icon: 'worker',
        node: 'pool',
        name: { en: 'The helper cooks', bn: 'সহকারী রাঁধুনি' },
        d: {
          en: 'Take slow jobs out back, so the cook can keep cooking.',
          bn: 'ধীর কাজগুলো পেছনে নিয়ে যায়, যাতে রাঁধুনি রাঁধতে থাকে।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Standing and waiting', bn: 'দাঁড়িয়ে অপেক্ষা করা' },
        is: { en: 'is a slow job that holds up the whole kitchen', bn: 'মানে এমন ধীর কাজ যা পুরো রান্নাঘর আটকে রাখে' },
        d: {
          en: 'The cook stands and waits for one dish to finish. Every other dish is ignored until then. Helper cooks should take such jobs.',
          bn: 'রাঁধুনি একটা পদ শেষ হওয়ার অপেক্ষায় দাঁড়িয়ে থাকে। তত সময় বাকি সব পদ অবহেলিত। এমন কাজ সহকারী রাঁধুনিদের নেওয়া উচিত।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'How does asyncio get concurrency on one thread?',
        bn: 'asyncio একটা thread-এ কীভাবে concurrency পায়?'
      },
      short: {
        en: 'Cooperative multitasking: `await` plus an event loop.',
        bn: 'Cooperative multitasking: `await` আর একটা event loop।'
      },
      deep: {
        en: 'A Task runs until it awaits something pending, then the loop runs another ready Task. A selector (epoll or kqueue) reports which sockets are ready, so waiting costs no CPU.',
        bn: 'একটা Task pending কিছুতে `await` না করা পর্যন্ত চলে, তারপর loop আরেকটা ready Task চালায়। selector (epoll বা kqueue) জানায় কোন socket তৈরি, তাই অপেক্ষায় CPU খরচ হয় না।'
      },
      redFlag: {
        en: '“It spawns a thread per coroutine.”',
        bn: '“এটা প্রতি coroutine-এ একটা thread বানায়।”'
      }
    },
    {
      q: {
        en: 'What does `await` actually do?',
        bn: '`await` আসলে কী করে?'
      },
      short: {
        en: 'It suspends the current coroutine until the awaited thing completes.',
        bn: 'যেটার জন্য `await`, সেটা শেষ না হওয়া পর্যন্ত বর্তমান coroutine-কে থামিয়ে রাখে।'
      },
      deep: {
        en: 'Awaiting a coroutine runs it inline. Control returns to the loop only when something truly suspends: an unfinished future, I/O or `sleep`. `await asyncio.sleep(0)` is an explicit yield.',
        bn: 'coroutine-এ `await` করলে সেটা সেখানেই চলে। loop-এ control ফেরে কেবল যখন সত্যিই কিছু থামে: অসমাপ্ত future, I/O বা `sleep`। `await asyncio.sleep(0)` একটা স্পষ্ট yield।'
      },
      redFlag: {
        en: '“Every await switches tasks.”',
        bn: '“প্রতিটা `await`-এ task বদলায়।”'
      }
    },
    {
      q: {
        en: 'What happens if a coroutine calls `time.sleep()` or `requests.get()`?',
        bn: 'coroutine-এ `time.sleep()` বা `requests.get()` ডাকলে কী হয়?'
      },
      short: {
        en: 'It blocks the whole loop.',
        bn: 'পুরো loop আটকে যায়।'
      },
      deep: {
        en: 'No other task, timer or I/O callback runs until it returns. Use `await asyncio.sleep`, an async client or `asyncio.to_thread`. Debug mode logs callbacks over 100 ms.',
        bn: 'ফিরে না আসা পর্যন্ত অন্য কোনো task, timer বা I/O callback চলে না। `await asyncio.sleep`, async client বা `asyncio.to_thread` ব্যবহার করুন। debug mode ১০০ ms-এর বেশি callback log করে।'
      },
      redFlag: {
        en: '“Only that task waits.”',
        bn: '“শুধু ওই task-ই অপেক্ষা করে।”'
      }
    },
    {
      q: {
        en: 'How do you run blocking or CPU-heavy code from async code?',
        bn: 'async কোড থেকে blocking বা ভারী CPU কোড কীভাবে চালান?'
      },
      short: {
        en: '`asyncio.to_thread` or `run_in_executor`.',
        bn: '`asyncio.to_thread` বা `run_in_executor`।'
      },
      deep: {
        en: 'Threads suit blocking I/O. For CPU-bound code use a `ProcessPoolExecutor`, because threads gain nothing under the GIL. Mind the default executor’s size.',
        bn: 'blocking I/O-র জন্য thread। CPU-bound কোডে `ProcessPoolExecutor`, কারণ GIL-এর কারণে thread-এ লাভ নেই। default executor-এর আকারের দিকে খেয়াল রাখুন।'
      },
      redFlag: {
        en: '“Just make the function `async def`.” That does not make it non-blocking.',
        bn: '“ফাংশনটা `async def` করে দিন।” এতে সেটা non-blocking হয় না।'
      }
    },
    {
      q: {
        en: 'What does the selector do?',
        bn: 'Selector কী করে?'
      },
      short: {
        en: 'It tells the loop which file descriptors are ready.',
        bn: 'কোন file descriptor তৈরি, সেটা loop-কে জানায়।'
      },
      deep: {
        en: 'It wraps epoll on Linux, kqueue on macOS and BSD, or `select`. With epoll, the kernel keeps an interest list and a ready list, so cost follows ready sockets, not total sockets. An idle loop blocks in `select`.',
        bn: 'এটা Linux-এ epoll, macOS আর BSD-তে kqueue, বা `select` মোড়ে। epoll-এ kernel একটা interest list আর একটা ready list রাখে, তাই খরচ ready socket-এর সংখ্যায়, মোট socket-এ নয়। অলস loop `select`-এ আটকে থাকে।'
      },
      redFlag: {
        en: '“It polls each socket in a busy loop.”',
        bn: '“এটা busy loop-এ প্রতিটা socket পোল করে।”'
      }
    },
    {
      q: {
        en: '`gather` vs `create_task` vs `TaskGroup`?',
        bn: '`gather`, `create_task` আর `TaskGroup`-এর পার্থক্য কী?'
      },
      short: {
        en: 'All run tasks concurrently. `TaskGroup` adds structured cancellation.',
        bn: 'তিনটাই task concurrent চালায়। `TaskGroup` যোগ করে structured cancellation।'
      },
      deep: {
        en: '`create_task` schedules a Task, and you must keep a reference because the loop holds only a weak one. `gather` collects results. `TaskGroup` awaits all, raises `ExceptionGroup` and cancels siblings on failure.',
        bn: '`create_task` Task schedule করে, আর আপনাকে reference ধরে রাখতে হবে কারণ loop শুধু weak reference রাখে। `gather` ফলাফল জড়ো করে। `TaskGroup` সবাইকে await করে, `ExceptionGroup` তোলে আর ব্যর্থ হলে বাকিদের cancel করে।'
      },
      redFlag: {
        en: '“Calling `coro()` without await starts it.”',
        bn: '“`await` ছাড়া `coro()` ডাকলেই সেটা শুরু হয়।”'
      }
    },
    {
      q: {
        en: 'How does FastAPI use this?',
        bn: 'FastAPI এটা কীভাবে ব্যবহার করে?'
      },
      short: {
        en: '`async def` routes run on the loop. `def` routes run in a threadpool.',
        bn: '`async def` route loop-এ চলে। `def` route threadpool-এ চলে।'
      },
      deep: {
        en: 'Sync routes run in AnyIO worker threads, whose default limiter is 40. A blocking DB call in a `def` route is fine, but the same call inside `async def` blocks the loop.',
        bn: 'sync route AnyIO worker thread-এ চলে, যার ডিফল্ট limiter ৪০। `def` route-এ blocking DB call ঠিক আছে, কিন্তু `async def`-এর ভেতরে একই call loop আটকে দেয়।'
      },
      redFlag: {
        en: '“FastAPI runs every route in a new process.”',
        bn: '“FastAPI প্রতিটা route নতুন process-এ চালায়।”'
      }
    },
    {
      q: {
        en: 'Does `asyncio.Lock` protect data across threads?',
        bn: '`asyncio.Lock` কি thread-এর মধ্যে data বাঁচায়?'
      },
      short: {
        en: 'No. It is for tasks on one loop and is not thread-safe.',
        bn: 'না। এটা এক loop-এর task-দের জন্য, আর thread-safe নয়।'
      },
      deep: {
        en: 'asyncio primitives are not thread-safe. Races across awaits are still possible: check, await, then act on a stale check.',
        bn: 'asyncio primitive thread-safe নয়। `await`-এর ফাঁকে race এখনও সম্ভব: একটা task check করে, await করে, তারপর পুরনো check-এর ভরসায় কাজ করে।'
      },
      redFlag: {
        en: '“asyncio code cannot have race conditions.”',
        bn: '“asyncio কোডে race condition হতেই পারে না।”'
      }
    }
  ],
  cheats: [
    {
      code: 'asyncio.run(main())',
      d: {
        en: 'Create the loop, run the coroutine, close the loop.',
        bn: 'loop বানায়, coroutine চালায়, তারপর loop বন্ধ করে।'
      }
    },
    {
      code: 'async with asyncio.TaskGroup() as tg:\n    t1 = tg.create_task(a()); t2 = tg.create_task(b())',
      d: {
        en: 'Structured concurrency (3.11+).',
        bn: 'Structured concurrency (3.11+)।'
      }
    },
    {
      code: 'res = await asyncio.to_thread(blocking_fn, arg)',
      d: {
        en: 'Offload blocking I/O to a thread. Context variables carry over.',
        bn: 'blocking I/O thread-এ পাঠান। context variable সাথে যায়।'
      }
    },
    {
      code: 'loop = asyncio.get_running_loop()\nawait loop.run_in_executor(ProcessPoolExecutor(), cpu_fn, arg)',
      d: {
        en: 'Offload CPU-bound work to a process.',
        bn: 'CPU-bound কাজ process-এ পাঠান।'
      }
    },
    {
      code: 'await asyncio.sleep(0)    # explicit yield to the loop',
      d: {
        en: 'Let others run during a long coroutine.',
        bn: 'লম্বা coroutine চলার মাঝে অন্যদের চলতে দিন।'
      }
    },
    {
      code: 'asyncio.run(main(), debug=True)   # or PYTHONASYNCIODEBUG=1',
      d: {
        en: 'Logs callbacks slower than 100 ms and shows where un-awaited coroutines were created.',
        bn: '১০০ ms-এর বেশি ধীর callback log করে, আর await না করা coroutine কোথায় তৈরি হয়েছিল তা দেখায়।'
      }
    },
    {
      code: 'sem = asyncio.Semaphore(10)\nasync with sem: await fetch(u)',
      d: {
        en: 'Cap how many outbound calls run at once.',
        bn: 'একসাথে কতগুলো outbound call চলবে তার সীমা দিন।'
      }
    },
    {
      code: 'async with asyncio.timeout(5): await slow()',
      d: {
        en: 'Set a deadline (3.11+).',
        bn: 'একটা deadline দিন (3.11+)।'
      }
    }
  ],
  sources: [
    { label: 'Python docs: event loop', url: 'https://docs.python.org/3/library/asyncio-eventloop.html' },
    { label: 'Python docs: coroutines and tasks', url: 'https://docs.python.org/3/library/asyncio-task.html' },
    { label: 'Python docs: developing with asyncio', url: 'https://docs.python.org/3/library/asyncio-dev.html' },
    { label: 'Python docs: synchronization primitives', url: 'https://docs.python.org/3/library/asyncio-sync.html' },
    { label: 'CPython source: base_events.py', url: 'https://github.com/python/cpython/blob/3.14/Lib/asyncio/base_events.py' },
    { label: 'Linux man page: epoll(7)', url: 'https://man7.org/linux/man-pages/man7/epoll.7.html' },
    { label: 'FastAPI docs: async', url: 'https://fastapi.tiangolo.com/async/' },
    { label: 'AnyIO docs: threads', url: 'https://anyio.readthedocs.io/en/stable/threads.html' }
  ]
}
