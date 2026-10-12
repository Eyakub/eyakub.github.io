import type { Topic } from '../types'

export const kubernetes: Topic = {
  slug: 'kubernetes',
  line: 'devops',
  title: { en: 'Kubernetes', bn: 'Kubernetes' },
  summary: {
    en: 'Sadia files a card that says keep three trays. The office places them, one window number finds a ready tray, and the street door needs a watcher.',
    bn: 'সাদিয়া একটা কার্ড ফাইল করে, যেখানে লেখা থাকে তিনটা ট্রে রাখতে। অফিস সেগুলো বসায়, একটা জানালার নম্বর তৈরি ট্রে খুঁজে পায়, আর রাস্তার দরজায় একজন পাহারাদার লাগে।'
  },
  hook: {
    en: 'Sadia files a card for three trays, the office keeps them up, and one window number meets the street door.',
    bn: 'সাদিয়া তিনটা ট্রের কার্ড ফাইল করে, অফিস সেগুলো জাগিয়ে রাখে, আর একটা জানালার নম্বর রাস্তার দরজায় মেশে।'
  },
  story: {
    cast: {
      en: 'Sadia writes how many trays to keep. Harun runs the office that holds the card. Chhaya sets one tray on her shelf. Irfan watches the street door.',
      bn: 'সাদিয়া লেখে কতগুলো ট্রে রাখতে হবে। হারুন অফিস চালায়, যেখানে কার্ড থাকে। ছায়া তার তাকে একটা ট্রে বসায়। ইরফান রাস্তার দরজা পাহারা দেয়।'
    }
  },
  takeaway: {
    en: 'The office keeps the written count, one number reaches a ready tray, and the street door needs a watcher.',
    bn: 'অফিস লেখা সংখ্যা ধরে রাখে, একটা নম্বর তৈরি ট্রেতে পৌঁছায়, আর রাস্তার দরজায় একজন পাহারাদার লাগে।'
  },
  words: [
    {
      term: { en: 'The card (desired count)', bn: 'কার্ড (কাঙ্ক্ষিত সংখ্যা)' },
      d: { en: 'The written number of trays the office must keep standing.', bn: 'অফিসকে যতগুলো ট্রে দাঁড় করিয়ে রাখতে হবে, সেই লেখা সংখ্যা।' }
    },
    {
      term: { en: 'The shelf (Node)', bn: 'তাক (Node)' },
      d: { en: 'The table where Chhaya sets a tray and starts its pots.', bn: 'যে টেবিলে ছায়া একটা ট্রে বসায় এবং তার টব চালু করে।' }
    },
    {
      term: { en: 'The tray (Pod)', bn: 'ট্রে (Pod)' },
      d: { en: 'Pots that share one water line and sit on one shelf.', bn: 'টবগুলো একই পানির লাইন ভাগ করে এবং একই তাকে বসে।' }
    },
    {
      term: { en: 'The window (Service)', bn: 'জানালা (Service)' },
      d: { en: 'One pickup number that calls whichever tray is ready.', bn: 'একটা তোলার নম্বর, যা যে ট্রে তৈরি সেটাকে ডাকে।' }
    },
    {
      term: { en: 'The door (Ingress)', bn: 'দরজা (Ingress)' },
      d: { en: 'The street gate. It stays shut until someone is hired to watch it.', bn: 'রাস্তার ফটক। কেউ পাহারা দিতে না বসা পর্যন্ত এটা বন্ধ থাকে।' }
    },
    {
      term: { en: 'The office (control plane)', bn: 'অফিস (control plane)' },
      d: { en: 'Harun files the card and replaces a tray when one falls.', bn: 'হারুন কার্ড ফাইল করে, আর একটা ট্রে পড়লে সেটা বদলে দেয়।' }
    }
  ],
  legend: {
    request: { en: 'Filing', bn: 'ফাইল' },
    queue: { en: 'Waiting', bn: 'অপেক্ষা' },
    result: { en: 'Ready', bn: 'তৈরি' },
    error: { en: 'Fallen', bn: 'পড়ে গেছে' }
  },
  view: { wide: [1000, 440], narrow: [400, 480] },
  nodeR: { narrow: 20 },
  nodes: {
    sadia: {
      icon: 'user',
      name: { en: 'Planner', bn: 'পরিকল্পক' },
      sub: { en: 'Writes the card', bn: 'কার্ড লেখে' },
      plain: { name: { en: 'Sadia', bn: 'সাদিয়া' }, sub: { en: 'The planner', bn: 'পরিকল্পক' } },
      wide: [160, 100, 'up'],
      narrow: [220, 48, 'left']
    },
    office: {
      icon: 'server',
      name: { en: 'Control plane', bn: 'কন্ট্রোল প্লেন' },
      sub: { en: 'Stores the card', bn: 'কার্ড রাখে' },
      plain: { name: { en: 'The office', bn: 'অফিস' }, sub: { en: 'Harun', bn: 'হারুন' } },
      wide: [380, 100, 'up'],
      narrow: [220, 122, 'left']
    },
    shelf: {
      icon: 'cpu',
      name: { en: 'Node', bn: 'নোড' },
      sub: { en: 'One machine', bn: 'এক মেশিন' },
      plain: { name: { en: 'Chhaya', bn: 'ছায়া' }, sub: { en: 'Her shelf', bn: 'তার তাক' } },
      wide: [600, 100, 'up'],
      narrow: [220, 196, 'left']
    },
    tray: {
      icon: 'box',
      name: { en: 'Pod', bn: 'পড' },
      sub: { en: 'Shared pots', bn: 'ভাগ করা টব' },
      plain: { name: { en: 'The tray', bn: 'ট্রে' }, sub: { en: 'The pots', bn: 'টব' } },
      wide: [840, 100, 'up'],
      narrow: [220, 270, 'left']
    },
    window: {
      icon: 'route',
      name: { en: 'Service', bn: 'সার্ভিস' },
      sub: { en: 'One address', bn: 'এক ঠিকানা' },
      plain: { name: { en: 'The window', bn: 'জানালা' }, sub: { en: 'One number', bn: 'এক নম্বর' } },
      wide: [480, 310, 'down'],
      narrow: [220, 344, 'left']
    },
    door: {
      icon: 'shield',
      name: { en: 'Ingress', bn: 'ইনগ্রেস' },
      sub: { en: 'Street gate', bn: 'রাস্তার ফটক' },
      plain: { name: { en: 'Irfan', bn: 'ইরফান' }, sub: { en: 'The door', bn: 'দরজা' } },
      wide: [760, 310, 'down'],
      narrow: [220, 418, 'left']
    }
  },
  corridors: {
    'sadia-office': {
      wide: [[160, 100], [380, 100]],
      narrow: [[220, 48], [350, 48], [350, 122], [220, 122]]
    },
    'office-shelf': {
      wide: [[380, 100], [600, 100]],
      narrow: [[220, 122], [350, 122], [350, 196], [220, 196]]
    },
    'shelf-tray': {
      wide: [[600, 100], [840, 100]],
      narrow: [[220, 196], [350, 196], [350, 270], [220, 270]]
    },
    'tray-window': {
      wide: [[840, 100], [840, 200], [480, 200], [480, 310]],
      narrow: [[220, 270], [350, 270], [350, 344], [220, 344]]
    },
    'door-window': {
      wide: [[760, 310], [480, 310]],
      narrow: [[220, 418], [350, 418], [350, 344], [220, 344]]
    }
  },
  edges: {
    'sadia-office': { from: 'sadia', to: 'office', kind: 'request' },
    'office-shelf': { from: 'office', to: 'shelf', kind: 'request' },
    'shelf-tray': { from: 'shelf', to: 'tray', kind: 'request' },
    'tray-window': { from: 'tray', to: 'window', kind: 'result' },
    'door-window': { from: 'door', to: 'window', kind: 'request' }
  },
  main: {
    label: { en: 'Keep three trays', bn: 'তিনটা ট্রে রাখুন' },
    steps: [
      {
        id: 'file',
        moves: [{ edge: 'sadia-office', label: 'The card', plain: { en: 'She files', bn: 'ফাইল' } }],
        state: { office: { en: 'Stored', bn: 'রাখা হয়েছে' } },
        plainState: { office: { en: 'Filed', bn: 'ফাইল হয়েছে' } },
        story: {
          title: { en: 'She files the card', bn: 'সে কার্ড ফাইল করে' },
          text: {
            en: 'Sadia hands Harun a card that says keep three trays. He files it. Nothing is growing yet.',
            bn: 'সাদিয়া হারুনকে একটা কার্ড দেয়, যেখানে লেখা তিনটা ট্রে রাখতে। সে সেটা ফাইল করে। এখনো কিছু গজাচ্ছে না।'
          }
        },
        title: { en: 'She files the card', bn: 'সে কার্ড ফাইল করে' },
        simple: {
          en: 'Sadia files a card that says keep three trays. The office stores the card, and no tray is standing yet.',
          bn: 'সাদিয়া একটা কার্ড ফাইল করে, যেখানে লেখা তিনটা ট্রে রাখতে। অফিস কার্ড রাখে, আর এখনো কোনো ট্রে দাঁড়ায়নি।'
        },
        tech: {
          en: 'A `kubectl apply` stores the desired count through the API server into etcd. The card names three copies and does not start them by itself.',
          bn: 'একটা `kubectl apply` কাঙ্ক্ষিত সংখ্যা এপিআই সার্ভারের মধ্য দিয়ে etcd-তে রাখে। কার্ড তিনটা কপির নাম বলে, এবং নিজে সেগুলো চালু করে না।'
        }
      },
      {
        id: 'count',
        work: { node: 'office', kind: 'result' },
        state: { office: { en: '3 replicas', bn: '৩টি রেপ্লিকা' } },
        plainState: { office: { en: 'Three trays', bn: 'তিনটা ট্রে' } },
        story: {
          title: { en: 'The office writes three', bn: 'অফিস তিন লেখে' },
          text: {
            en: 'Harun writes the number three and keeps checking the shelves. When a tray is missing, he asks for another.',
            bn: 'হারুন তিন সংখ্যাটা লেখে এবং তাকগুলো দেখে যায়। একটা ট্রে না থাকলে সে আরেকটার কথা বলে।'
          }
        },
        title: { en: 'The office writes three', bn: 'অফিস তিন লেখে' },
        simple: {
          en: 'Harun writes that three trays must stay standing. He watches the card and makes the real count match it.',
          bn: 'হারুন লেখে তিনটা ট্রে দাঁড়িয়ে থাকতে হবে। সে কার্ড দেখে এবং আসল সংখ্যাকে তার সাথে মিলায়।'
        },
        tech: {
          en: 'The Deployment controller creates a ReplicaSet, and the ReplicaSet creates Pods up to the replica count. You do not create that ReplicaSet yourself. Changing the count does not start a rollout.',
          bn: 'ডিপ্লয়মেন্ট কন্ট্রোলার একটা রেপ্লিকাসেট বানায়, আর রেপ্লিকাসেট রেপ্লিকা সংখ্যা পর্যন্ত পড বানায়। সেই রেপ্লিকাসেট আপনি নিজে বানান না। সংখ্যা বদলালে রোলআউট শুরু হয় না।'
        }
      },
      {
        id: 'place',
        moves: [{ edge: 'office-shelf', label: 'One shelf', plain: { en: 'She places', bn: 'বসায়' } }],
        state: { shelf: { en: 'Bound', bn: 'বাঁধা' } },
        plainState: { shelf: { en: 'Picked', bn: 'বেছেছে' } },
        story: {
          title: { en: 'A shelf is chosen', bn: 'একটা তাক বেছে নেওয়া হয়' },
          text: {
            en: 'Harun chooses Chhaya’s shelf because it has room. That tray stays on her shelf.',
            bn: 'হারুন ছায়ার তাক বেছে নেয়, কারণ সেখানে জায়গা আছে। সেই ট্রে তার তাকেই থাকে।'
          }
        },
        title: { en: 'A shelf is chosen', bn: 'একটা তাক বেছে নেওয়া হয়' },
        simple: {
          en: 'The office picks a shelf that has room. Each tray is placed once, on one shelf.',
          bn: 'অফিস এমন একটা তাক বেছে নেয় যেখানে জায়গা আছে। প্রতিটা ট্রে একবার বসে, একটা তাকে।'
        },
        tech: {
          en: 'The scheduler binds each Pod that has no node yet to a suitable node. A Pod is scheduled once. If it cannot start there, that Pod never runs, and a replacement is a new Pod.',
          bn: 'শিডিউলার এমন প্রতিটি পডকে একটা উপযুক্ত নোডে বাঁধে, যার এখনো কোনো নোড নেই। একটা পড একবারই শিডিউল হয়। সেখানে চালু না হলে সেই পড আর চলে না, আর বদলি একটা নতুন পড।'
        }
      },
      {
        id: 'start',
        moves: [{ edge: 'shelf-tray', label: 'The pots', plain: { en: 'She starts', bn: 'চালু' } }],
        state: { tray: { en: 'Containers up', bn: 'কন্টেইনার চালু' } },
        plainState: { tray: { en: 'Started', bn: 'চালু হয়েছে' } },
        story: {
          title: { en: 'Chhaya starts the tray', bn: 'ছায়া ট্রে চালু করে' },
          text: {
            en: 'Chhaya sets the pots on one tray and starts them. They share the water line on her shelf.',
            bn: 'ছায়া একটা ট্রেতে টব বসায় এবং চালু করে। তারা তার তাকের পানির লাইন ভাগ করে।'
          }
        },
        title: { en: 'Chhaya starts the tray', bn: 'ছায়া ট্রে চালু করে' },
        simple: {
          en: 'Chhaya starts the pots on that tray. The pots share one water line, and she reports that they are up.',
          bn: 'ছায়া সেই ট্রের টব চালু করে। টবগুলো একটা পানির লাইন ভাগ করে, আর সে জানায় যে সেগুলো উঠেছে।'
        },
        tech: {
          en: 'The kubelet makes sure the Pod’s containers are running and asks the container runtime to start them, then reports status. The runtime is not one fixed program, and kube-proxy is optional.',
          bn: 'কিউবলেট নিশ্চিত করে পডের কন্টেইনার চলছে এবং কন্টেইনার রানটাইমকে সেগুলো চালু করতে বলে, তারপর স্ট্যাটাস জানায়। রানটাইম একটা নির্দিষ্ট প্রোগ্রাম নয়, আর কিউব-প্রক্সি ঐচ্ছিক।'
        }
      },
      {
        id: 'number',
        moves: [{ edge: 'tray-window', label: 'Ready set', plain: { en: 'One number', bn: 'নম্বর' } }],
        state: { window: { en: 'ClusterIP', bn: 'ক্লাস্টার আইপি' } },
        plainState: { window: { en: 'Listed', bn: 'তালিকায়' } },
        story: {
          title: { en: 'One number at the window', bn: 'জানালায় একটা নম্বর' },
          text: {
            en: 'The window has one number. It calls only a tray that is ready to hand pots over.',
            bn: 'জানালায় একটা নম্বর আছে। সে শুধু সেই ট্রেকে ডাকে, যে টব তুলে দিতে তৈরি।'
          }
        },
        title: { en: 'One number at the window', bn: 'জানালায় একটা নম্বর' },
        simple: {
          en: 'The window gets one number, and it calls a tray that is ready. People use the number, not a tray that might be gone tomorrow.',
          bn: 'জানালা একটা নম্বর পায়, আর সে তৈরি ট্রেকে ডাকে। মানুষ নম্বর ব্যবহার করে, এমন ট্রে নয় যা কাল নাও থাকতে পারে।'
        },
        tech: {
          en: 'A Service gives one stable address and selects Pods by labels. Ready addresses are listed on EndpointSlices. The default type is ClusterIP, used inside the cluster. A failing readiness probe removes that Pod from the slices and does not restart it.',
          bn: 'একটা সার্ভিস একটা স্থির ঠিকানা দেয় এবং লেবেল দিয়ে পড বাছে। তৈরি ঠিকানা এন্ডপয়েন্টস্লাইসে থাকে। ডিফল্ট টাইপ ক্লাস্টারআইপি, ক্লাস্টারের ভেতরে। ফেল করা রেডিনেস প্রোব সেই পডকে স্লাইস থেকে সরায় এবং রিস্টার্ট করে না।'
        }
      },
      {
        id: 'gate',
        moves: [{ edge: 'door-window', label: 'The door', plain: { en: 'They enter', bn: 'দরজা' } }],
        state: { door: { en: 'Controller on', bn: 'কন্ট্রোলার চালু' } },
        plainState: { door: { en: 'Watched', bn: 'পাহারায়' } },
        story: {
          title: { en: 'Irfan opens the street door', bn: 'ইরফান রাস্তার দরজা খোলে' },
          text: {
            en: 'Irfan stands at the street door and points people to the window. Without him, the door stays shut.',
            bn: 'ইরফান রাস্তার দরজায় দাঁড়ায় এবং মানুষকে জানালা দেখিয়ে দেয়। সে না থাকলে দরজা বন্ধ থাকে।'
          }
        },
        title: { en: 'Irfan opens the street door', bn: 'ইরফান রাস্তার দরজা খোলে' },
        simple: {
          en: 'Irfan watches the street door and sends people to the window. A painted sign alone does not let anyone in.',
          bn: 'ইরফান রাস্তার দরজা পাহারা দেয় এবং মানুষকে জানালায় পাঠায়। আঁকা সাইনবোর্ড একা কাউকে ঢুকতে দেয় না।'
        },
        tech: {
          en: 'An Ingress exposes HTTP and HTTPS routes from outside the cluster to Services. The object does nothing until an Ingress controller is installed. The Ingress API is frozen and still available, and Gateway API is what the project recommends for new work.',
          bn: 'একটা ইনগ্রেস ক্লাস্টারের বাইরে থেকে সার্ভিসে HTTP এবং HTTPS রুট খোলে। ইনগ্রেস কন্ট্রোলার বসানো না থাকলে অবজেক্টটা কিছু করে না। ইনগ্রেস এপিআই জমে আছে এবং এখনো আছে, আর নতুন কাজের জন্য প্রকল্প গেটওয়ে এপিআই সুপারিশ করে।'
        }
      },
      {
        id: 'heal',
        work: { node: 'tray', kind: 'result' },
        state: { tray: { en: 'Replaced', bn: 'বদলানো' } },
        plainState: { tray: { en: 'New tray', bn: 'নতুন ট্রে' } },
        story: {
          title: { en: 'A fallen tray is replaced', bn: 'পড়া ট্রে বদলানো হয়' },
          text: {
            en: 'A tray tips over. Harun does not change the card. He has a new tray started so three are standing.',
            bn: 'একটা ট্রে উল্টে যায়। হারুন কার্ড বদলায় না। সে একটা নতুন ট্রে চালু করায়, যাতে তিনটা দাঁড়ায়।'
          }
        },
        title: { en: 'A fallen tray is replaced', bn: 'পড়া ট্রে বদলানো হয়' },
        simple: {
          en: 'One tray falls. The office starts a new tray so three are standing again. The card still says three.',
          bn: 'একটা ট্রে পড়ে। অফিস একটা নতুন ট্রে চালু করে, যাতে আবার তিনটা দাঁড়ায়। কার্ডে তখনও তিন লেখা।'
        },
        tech: {
          en: 'Controllers move the real count toward the written count. A gone Pod is replaced by a new one, not moved. A rollout starts only when the Pod template changes, and undo returns the previous template.',
          bn: 'কন্ট্রোলার আসল সংখ্যাকে লেখা সংখ্যার দিকে নিয়ে যায়। হারিয়ে যাওয়া পড একটা নতুন পড দিয়ে বদলায়, সরে না। রোলআউট শুরু হয় শুধু পড টেমপ্লেট বদলালে, আর আন্ডু আগের টেমপ্লেট ফেরায়।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'falling',
      label: { en: 'It keeps falling', bn: 'বারবার পড়ে' },
      branchAfter: 'number',
      whatIf: { en: 'What if a tray is up, but it keeps falling over?', bn: 'একটা ট্রে উঠলেও বারবার উল্টে গেলে কী হয়?' },
      steps: [
        {
          id: 'skipped',
          work: { node: 'window', kind: 'queue' },
          state: { window: { en: 'Unready', bn: 'অপ্রস্তুত' } },
          plainState: { window: { en: 'Not listed', bn: 'তালিকায় নেই' } },
          story: {
            title: { en: 'The window skips this tray', bn: 'জানালা এই ট্রে এড়ায়' },
            text: {
              en: 'The pots are up, but this tray is not ready to hand anything over, so the window skips it.',
              bn: 'টব উঠেছে, কিন্তু এই ট্রে কিছু তুলে দিতে তৈরি নয়, তাই জানালা এটাকে এড়ায়।'
            }
          },
          title: { en: 'The window skips this tray', bn: 'জানালা এই ট্রে এড়ায়' },
          simple: {
            en: 'This tray is up, but it is not ready, so the window does not call it. The pots stay running.',
            bn: 'এই ট্রে উঠেছে, কিন্তু তৈরি নয়, তাই জানালা একে ডাকে না। টব চলতে থাকে।'
          },
          tech: {
            en: 'A failing readiness probe drops the Pod from the Service EndpointSlices and does not restart the container. Liveness is the probe that restarts it. A startup probe holds both until the app has started.',
            bn: 'ফেল করা রেডিনেস প্রোব পডকে সার্ভিসের এন্ডপয়েন্টস্লাইস থেকে নামায় এবং কন্টেইনার রিস্টার্ট করে না। লাইভনেস সেই প্রোব যা রিস্টার্ট করে। স্টার্টআপ প্রোব অ্যাপ চালু না হওয়া পর্যন্ত দুটিকে আটকে রাখে।'
          }
        },
        {
          id: 'waiting',
          work: { node: 'tray', kind: 'error' },
          state: { tray: { en: 'CrashLoopBackOff', bn: 'ক্র্যাশ লুপ অপেক্ষা' } },
          plainState: { tray: { en: 'Waiting', bn: 'অপেক্ষা' } },
          story: {
            title: { en: 'The tray keeps falling', bn: 'ট্রে বারবার পড়ে' },
            text: {
              en: 'The tray keeps tipping. Chhaya waits longer each time before she tries again.',
              bn: 'ট্রে বারবার উল্টে যায়। ছায়া প্রতিবার আগের চেয়ে বেশি অপেক্ষা করে, তারপর আবার চেষ্টা করে।'
            }
          },
          title: { en: 'The tray keeps falling', bn: 'ট্রে বারবার পড়ে' },
          simple: {
            en: 'The tray falls again and again, and Chhaya waits longer before the next try. The card still says three.',
            bn: 'ট্রে বারবার পড়ে, আর ছায়া পরের চেষ্টার আগে আরও অপেক্ষা করে। কার্ডে তখনও তিন লেখা।'
          },
          tech: {
            en: 'CrashLoopBackOff is a waiting status while the next restart is delayed, not a restart policy. The delay grows from 10 seconds and is capped at 300 seconds. A Deployment only allows Always.',
            bn: 'ক্র্যাশলুপব্যাকঅফ একটা অপেক্ষার স্ট্যাটাস, যখন পরের রিস্টার্ট দেরি হয়, কোনো রিস্টার্ট পলিসি নয়। দেরি ১০ সেকেন্ড থেকে বাড়ে এবং ৩০০ সেকেন্ডে আটকে। একটা ডিপ্লয়মেন্ট শুধু অলওয়েজ চালু রাখে।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A greenhouse. The card is the written count, the tray is the pots that share a water line, the window is one pickup number, and the street door needs a watcher.',
      bn: 'একটা গ্রিনহাউস। কার্ড হলো লেখা সংখ্যা, ট্রে হলো টব যেগুলো এক পানির লাইন ভাগ করে, জানালা একটা তোলার নম্বর, আর রাস্তার দরজায় একজন পাহারাদার লাগে।'
    },
    twins: [
      { node: 'sadia', icon: 'user', name: { en: 'Sadia', bn: 'সাদিয়া' }, d: { en: 'She writes the card that says how many trays to keep.', bn: 'সে কার্ড লেখে, যেখানে থাকে কতগুলো ট্রে রাখতে হবে।' } },
      { node: 'office', icon: 'server', name: { en: 'The office', bn: 'অফিস' }, d: { en: 'Harun files the card and keeps the real count matched to it.', bn: 'হারুন কার্ড ফাইল করে এবং আসল সংখ্যাকে তার সাথে মিলিয়ে রাখে।' } },
      { node: 'shelf', icon: 'cpu', name: { en: 'Chhaya', bn: 'ছায়া' }, d: { en: 'She runs one shelf and starts the pots on the tray placed there.', bn: 'সে একটা তাক চালায় এবং সেখানে বসানো ট্রের টব চালু করে।' } },
      { node: 'tray', icon: 'box', name: { en: 'The tray', bn: 'ট্রে' }, d: { en: 'Pots that share one water line. A fallen tray is replaced, not carried to another shelf.', bn: 'টব যেগুলো এক পানির লাইন ভাগ করে। পড়া ট্রে বদলানো হয়, অন্য তাকে বয়ে নিয়ে যাওয়া হয় না।' } },
      { node: 'window', icon: 'route', name: { en: 'The window', bn: 'জানালা' }, d: { en: 'One number that calls a ready tray. People do not chase a tray that may be gone.', bn: 'একটা নম্বর যা তৈরি ট্রেকে ডাকে। মানুষ এমন ট্রের পেছনে ছোটে না যা নাও থাকতে পারে।' } },
      { node: 'door', icon: 'shield', name: { en: 'Irfan', bn: 'ইরফান' }, d: { en: 'He watches the street door and sends people to the window. A sign alone stays shut.', bn: 'সে রাস্তার দরজা পাহারা দেয় এবং মানুষকে জানালায় পাঠায়। সাইন একা বন্ধই থাকে।' } }
    ]
  },
  qa: [
    {
      q: { en: 'What is a Pod, a ReplicaSet, and a Deployment?', bn: 'পড, রেপ্লিকাসেট, এবং ডিপ্লয়মেন্ট কী?' },
      short: { en: 'A Pod runs one or more containers that share a network and storage. A ReplicaSet keeps a count of Pods. A Deployment owns the ReplicaSet and the rollout.', bn: 'একটা পড এক বা একাধিক কন্টেইনার চালায়, যারা নেটওয়ার্ক ও স্টোরেজ ভাগ করে। রেপ্লিকাসেট পডের সংখ্যা ধরে রাখে। ডিপ্লয়মেন্ট রেপ্লিকাসেট এবং রোলআউটের মালিক।' },
      deep: { en: 'You rarely create a bare Pod. Creating a Deployment creates a ReplicaSet, and that ReplicaSet creates the Pods. Do not manage a ReplicaSet that a Deployment owns. A rollout starts only when the Pod template changes. Scaling changes the count and does not create a revision. The rolling update defaults are maxUnavailable 25% and maxSurge 25%. Undo restores the previous Pod template, and revisionHistoryLimit keeps 10 old ReplicaSets by default. Once an old ReplicaSet is deleted, that revision cannot be rolled back. The label selector is immutable after creation.', bn: 'খালি পড প্রায় বানানো হয় না। ডিপ্লয়মেন্ট বানালে একটা রেপ্লিকাসেট বনে, আর সেই রেপ্লিকাসেট পড বানায়। ডিপ্লয়মেন্টের রেপ্লিকাসেট নিজে ম্যানেজ করবেন না। রোলআউট শুরু হয় শুধু পড টেমপ্লেট বদলালে। স্কেল সংখ্যা বদলায় এবং কোনো রিভিশন বানায় না। রোলিং আপডেটের ডিফল্ট maxUnavailable ২৫% এবং maxSurge ২৫%। আন্ডু আগের পড টেমপ্লেট ফেরায়, আর revisionHistoryLimit ডিফল্টে ১০টা পুরনো রেপ্লিকাসেট রাখে। একটা পুরনো রেপ্লিকাসেট মুছে গেলে সেই রিভিশনে আর রোলব্যাক হয় না। লেবেল সিলেক্টর তৈরির পর অপরিবর্তনীয়।' },
      redFlag: { en: '“A Pod is a container.”', bn: '“একটা পড মানে একটা কন্টেইনার।”' }
    },
    {
      q: { en: 'What is the control plane, and what is a node?', bn: 'কন্ট্রোল প্লেন কী, আর নোড কী?' },
      short: { en: 'The control plane decides and stores the card. A node runs the trays. The kubelet on the node starts containers.', bn: 'কন্ট্রোল প্লেন ঠিক করে এবং কার্ড রাখে। নোড ট্রে চালায়। নোডের কিউবলেট কন্টেইনার চালু করে।' },
      deep: { en: 'The control plane is the API server, etcd, the scheduler, and the controller manager. The cloud controller manager is optional. etcd stores the cluster data. It does not run containers. On a node, the kubelet starts containers through a container runtime, which is not one fixed program. kube-proxy is optional. DNS is an addon, not a control-plane component.', bn: 'কন্ট্রোল প্লেন হলো এপিআই সার্ভার, etcd, শিডিউলার, এবং কন্ট্রোলার ম্যানেজার। ক্লাউড কন্ট্রোলার ম্যানেজার ঐচ্ছিক। etcd ক্লাস্টারের ডেটা রাখে। সে কন্টেইনার চালায় না। নোডে কিউবলেট একটা কন্টেইনার রানটাইমের মাধ্যমে কন্টেইনার চালু করে, যা একটা নির্দিষ্ট প্রোগ্রাম নয়। কিউব-প্রক্সি ঐচ্ছিক। ডিএনএস একটা অ্যাডঅন, কন্ট্রোল প্লেনের অংশ নয়।' },
      redFlag: { en: '“etcd runs the containers.”', bn: '“etcd কন্টেইনার চালায়।”' }
    },
    {
      q: { en: 'Why have a Service if the Pod already has an address?', bn: 'পডের নিজের ঠিকানা থাকলে সার্ভিস কেন?' },
      short: { en: 'A Pod address dies with that Pod. A Service is one stable address that selects Pods by labels and lists the ready ones.', bn: 'একটা পডের ঠিকানা সেই পডের সাথেই শেষ। সার্ভিস একটা স্থির ঠিকানা, যা লেবেল দিয়ে পড বাছে এবং তৈরিগুলো তালিকাভুক্ত করে।' },
      deep: { en: 'The default type is ClusterIP, reachable inside the cluster. NodePort uses a port on each node, by default in the range 30000 to 32767. LoadBalancer needs a cloud provider or another integration. Kubernetes does not itself provide that balancer. ExternalName is a DNS alias and does not proxy. A headless Service uses ClusterIP None. The EndpointSlice controller keeps the ready addresses. The older Endpoints API is deprecated. Clients inside the cluster use the Service, not a Pod address.', bn: 'ডিফল্ট টাইপ ক্লাস্টারআইপি, ক্লাস্টারের ভেতর থেকে পৌঁছানো যায়। নোডপোর্ট প্রতিটি নোডে একটা পোর্ট ব্যবহার করে, ডিফল্টে ৩০০০০ থেকে ৩২৭৬৭। লোডব্যালেন্সারের জন্য ক্লাউড প্রোভাইডার বা অন্য ইন্টিগ্রেশন লাগে। কুবারনেটিস নিজে সেই ব্যালেন্সার দেয় না। এক্সটার্নালনেম একটা ডিএনএস এলিয়াস এবং প্রক্সি করে না। হেডলেস সার্ভিস ক্লাস্টারআইপি নান ব্যবহার করে। এন্ডপয়েন্টস্লাইস কন্ট্রোলার তৈরি ঠিকানা রাখে। পুরনো এন্ডপয়েন্টস এপিআই অবচিত। ক্লাস্টারের ভেতরের ক্লায়েন্ট সার্ভিস ব্যবহার করে, পডের ঠিকানা নয়।' },
      redFlag: { en: '“Connect straight to the Pod address.”', bn: '“সোজা পডের ঠিকানায় যুক্ত হোন।”' }
    },
    {
      q: { en: 'How is an Ingress different from a Service?', bn: 'ইনগ্রেস সার্ভিস থেকে আলাদা কীভাবে?' },
      short: { en: 'A Service exposes Pods. An Ingress is the outside web gate onto Services, and it does nothing until a controller is installed.', bn: 'সার্ভিস পড খোলে। ইনগ্রেস সার্ভিসের উপর বাইরের ওয়েব ফটক, আর কন্ট্রোলার না বসালে সে কিছু করে না।' },
      deep: { en: 'Ingress is not a type of Service. It has been stable since 1.19, the API is frozen, and there is no plan to remove it. Rules match a host and a path to a Service and a port. pathType is required. Kubernetes recommends the Gateway API for new work. That API is an extension, not a requirement for this ride. A Service can also be published with a LoadBalancer where a provider supplies one. Ingress does not expose arbitrary protocols.', bn: 'ইনগ্রেস সার্ভিসের কোনো টাইপ নয়। এটা ১.১৯ থেকে স্থিতিশীল, এপিআই জমে আছে, এবং সরানোর কোনো পরিকল্পনা নেই। নিয়ম একটা হোস্ট এবং পাথকে একটা সার্ভিস ও পোর্টের সাথে মিলায়। pathType বাধ্যতামূলক। নতুন কাজের জন্য কুবারনেটিস গেটওয়ে এপিআই সুপারিশ করে। সেই এপিআই একটা এক্সটেনশন, এই রাইডের শর্ত নয়। প্রোভাইডার দিলে লোডব্যালেন্সার দিয়েও সার্ভিস প্রকাশ করা যায়। ইনগ্রেস যেকোনো প্রোটোকল খোলে না।' },
      redFlag: { en: '“Ingress is a type of Service, and the object works with no controller.”', bn: '“ইনগ্রেস সার্ভিসের একটা টাইপ, আর অবজেক্ট কন্ট্রোলার ছাড়াই কাজ করে।”' }
    },
    {
      q: { en: 'What do liveness, readiness, and a startup probe do?', bn: 'লাইভনেস, রেডিনেস, এবং স্টার্টআপ প্রোব কী করে?' },
      short: { en: 'Liveness restarts a stuck container. Readiness takes a Pod off the Service list without a restart. A startup probe holds the other two until the app has started.', bn: 'লাইভনেস আটকে যাওয়া কন্টেইনার রিস্টার্ট করে। রেডিনেস রিস্টার্ট না করে পডকে সার্ভিসের তালিকা থেকে নামিয়ে দেয়। স্টার্টআপ প্রোব অ্যাপ চালু না হওয়া পর্যন্ত বাকি দুটিকে আটকে রাখে।' },
      deep: { en: 'The kubelet runs the probes. A failed readiness probe makes the EndpointSlice controller remove that Pod address from matching Services. A failed liveness probe restarts the container after its failure tolerance. A failed startup probe kills the container, and the restart policy applies. Pod restartPolicy defaults to Always. A Deployment allows only Always. CrashLoopBackOff is the waiting status while restarts back off from 10 seconds to a cap of 300 seconds. It is not a restart policy. A busy line that changes the written count is a different stop.', bn: 'কিউবলেট প্রোব চালায়। ফেল করা রেডিনেস প্রোবে এন্ডপয়েন্টস্লাইস কন্ট্রোলার সেই পডের ঠিকানা মিলে যাওয়া সার্ভিস থেকে সরায়। ফেল করা লাইভনেস প্রোব সহ্যসীমার পর কন্টেইনার রিস্টার্ট করে। ফেল করা স্টার্টআপ প্রোব কন্টেইনারকে মারে, এবং রিস্টার্ট পলিসি খাটে। পডের restartPolicy-র ডিফল্ট অলওয়েজ। ডিপ্লয়মেন্ট শুধু অলওয়েজ চালু রাখে। ক্র্যাশলুপব্যাকঅফ অপেক্ষার স্ট্যাটাস, যখন রিস্টার্ট ১০ সেকেন্ড থেকে ৩০০ সেকেন্ডের ছাদ পর্যন্ত পিছিয়ে যায়। এটা কোনো রিস্টার্ট পলিসি নয়। ব্যস্ত লাইন যে লেখা সংখ্যা বদলায়, সেটা আলাদা একটা স্টপ।' },
      redFlag: { en: '“Liveness and readiness are the same check.”', bn: '“লাইভনেস আর রেডিনেস একই চেক।”' }
    }
  ],
  cheats: [
    { code: 'kubectl apply -f deploy.yaml', d: { en: 'Send the card. The cluster stores the desired count.', bn: 'কার্ড পাঠান। ক্লাস্টার কাঙ্ক্ষিত সংখ্যা রাখে।' } },
    { code: 'kubectl get pods -o wide', d: { en: 'List the trays and which shelf each one is on.', bn: 'ট্রেগুলো এবং কোন তাকে কোনটা আছে, তার তালিকা দেখুন।' } },
    { code: 'kubectl describe pod web', d: { en: 'Show events for one tray when it will not start.', bn: 'একটা ট্রে চালু না হলে তার ইভেন্ট দেখুন।' } },
    { code: 'kubectl logs web', d: { en: 'Read what that tray printed.', bn: 'সেই ট্রে কী ছাপিয়েছে, তা পড়ুন।' } },
    { code: 'kubectl rollout undo deployment/web', d: { en: 'Return the previous tray template. Scaling is not a rollout.', bn: 'আগের ট্রে টেমপ্লেট ফেরান। স্কেল কোনো রোলআউট নয়।' } },
    { code: 'kubectl scale deployment/web --replicas=5', d: { en: 'Change the written count. This does not start a rollout.', bn: 'লেখা সংখ্যা বদলান। এতে রোলআউট শুরু হয় না।' } }
  ],
  sources: [
    { label: 'Kubernetes components', url: 'https://kubernetes.io/docs/concepts/overview/components/' },
    { label: 'Deployments', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/' },
    { label: 'Service', url: 'https://kubernetes.io/docs/concepts/services-networking/service/' },
    { label: 'Ingress', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress/' },
    { label: 'Pod lifecycle', url: 'https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/' }
  ],
  film: {
    src: '/learn/kubernetes.mp4',
    note: {
      en: 'A failed readiness probe removes the Pod from the Service. Liveness restarts it. CrashLoopBackOff is the wait.',
      bn: 'ফেল করা রেডিনেস প্রোব পডকে সার্ভিস থেকে সরায়। লাইভনেস রিস্টার্ট করে। CrashLoopBackOff হলো অপেক্ষা।'
    }
  }
}
