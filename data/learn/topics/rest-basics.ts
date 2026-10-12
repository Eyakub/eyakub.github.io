import type { Topic } from '../types'

export const restBasics: Topic = {
  slug: 'rest-basics',
  line: 'backend',
  title: { en: 'REST basics', bn: 'REST-এর মূল কথা' },
  summary: {
    en: 'Diya names one parcel by its slip. The verb tells the clerk to read, accept, replace, or remove it, and the reply says what happened.',
    bn: 'দিয়া একটা স্লিপ দিয়ে একটা পার্সেলের নাম বলে। ক্রিয়া ক্লার্ককে বলে পড়তে, নিতে, বদলাতে, না কি সরিয়ে ফেলতে, আর উত্তর বলে কী হলো।'
  },
  hook: {
    en: 'Diya asks for one parcel by its slip, and the clerk’s reply says what happened.',
    bn: 'দিয়া একটা স্লিপ দিয়ে একটা পার্সেল চায়, আর ক্লার্কের উত্তর বলে কী হলো।'
  },
  story: {
    cast: {
      en: 'Diya wants one parcel from the counter. The slip names it, and the clerk’s answer says what happened.',
      bn: 'দিয়া কাউন্টার থেকে একটা পার্সেল চায়। স্লিপ তার নাম বলে, আর ক্লার্কের উত্তর বলে কী হলো।'
    }
  },
  takeaway: {
    en: 'The slip names the parcel, the verb says what to do, and a swap twice still leaves one parcel.',
    bn: 'স্লিপ পার্সেলের নাম, ক্রিয়া বলে কী করতে হবে, আর দুবার বদলালেও একটাই পার্সেল থাকে।'
  },
  words: [
    {
      term: { en: 'The slip (URL)', bn: 'স্লিপ (URL)' },
      d: { en: 'The address of one parcel. The verb is separate from the address.', bn: 'একটা পার্সেলের ঠিকানা। ক্রিয়া ঠিকানা থেকে আলাদা।' }
    },
    {
      term: { en: 'A look (GET)', bn: 'এক নজর (GET)' },
      d: { en: 'Read one parcel. Doing it twice does not change the shelf.', bn: 'একটা পার্সেল পড়া। দুবার করলেও তাক বদলায় না।' }
    },
    {
      term: { en: 'Handing in (POST)', bn: 'জমা দেওয়া (POST)' },
      d: { en: 'Give the counter a parcel. The counter picks the new number.', bn: 'কাউন্টারে একটা পার্সেল দেওয়া। নতুন নম্বর কাউন্টার ঠিক করে।' }
    },
    {
      term: { en: 'A full swap (PUT)', bn: 'পুরো বদল (PUT)' },
      d: { en: 'Replace the whole parcel. Doing it twice still leaves that one parcel.', bn: 'পুরো পার্সেল বদলানো। দুবার করলেও সেই একটাই থাকে।' }
    },
    {
      term: { en: 'A small fix (PATCH)', bn: 'ছোট মেরামত (PATCH)' },
      d: { en: 'Change part of the label. All of the fix lands, or none of it.', bn: 'লেবেলের এক অংশ বদলানো। মেরামত পুরোটা হয়, নয়তো একটুও না।' }
    },
    {
      term: { en: 'Taking it off (DELETE)', bn: 'নামিয়ে নেওয়া (DELETE)' },
      d: { en: 'Remove that slip. A second time leaves the shelf as it already is.', bn: 'সেই স্লিপ সরিয়ে ফেলা। দ্বিতীয় বার তাক আগের মতোই থাকে।' }
    }
  ],
  legend: {
    request: { en: 'Asking', bn: 'জিজ্ঞেস' },
    queue: { en: 'Waiting', bn: 'অপেক্ষা' },
    result: { en: 'The reply', bn: 'উত্তর' },
    error: { en: 'Refused', bn: 'প্রত্যাখ্যান' }
  },
  view: { wide: [1000, 280], narrow: [400, 460] },
  nodeR: { narrow: 20 },
  nodes: {
    diya: {
      icon: 'user',
      name: { en: 'Client', bn: 'ক্লায়েন্ট' },
      sub: { en: 'User agent', bn: 'ব্যবহারকারী' },
      plain: { name: { en: 'Diya', bn: 'দিয়া' }, sub: { en: 'The sender', bn: 'প্রেরক' } },
      wide: [200, 140, 'up'],
      narrow: [230, 64, 'left']
    },
    counter: {
      icon: 'server',
      name: { en: 'Server', bn: 'সার্ভার' },
      sub: { en: 'Origin server', bn: 'মূল সার্ভার' },
      plain: { name: { en: 'The counter', bn: 'কাউন্টার' }, sub: { en: 'The clerk', bn: 'ক্লার্ক' } },
      wide: [500, 140, 'up'],
      narrow: [230, 200, 'left']
    },
    shelf: {
      icon: 'archive',
      name: { en: 'Store', bn: 'স্টোর' },
      sub: { en: 'The resource', bn: 'সম্পদ' },
      plain: { name: { en: 'The shelf', bn: 'তাক' }, sub: { en: 'The parcels', bn: 'পার্সেল' } },
      wide: [800, 140, 'up'],
      narrow: [230, 350, 'left']
    }
  },
  corridors: {
    'diya-counter': { wide: [[200, 140], [500, 140]], narrow: [[230, 64], [230, 200]] },
    'counter-shelf': {
      wide: [[500, 140], [800, 140]],
      narrow: [[230, 200], [340, 200], [340, 350], [230, 350]]
    }
  },
  edges: {
    'diya-counter': { from: 'diya', to: 'counter', kind: 'request' },
    'counter-diya': { from: 'counter', to: 'diya', kind: 'result' },
    'counter-shelf': { from: 'counter', to: 'shelf', kind: 'request' },
    'shelf-counter': { from: 'shelf', to: 'counter', kind: 'result' }
  },
  main: {
    label: { en: 'Collect a parcel', bn: 'একটা পার্সেল নিন' },
    steps: [
      {
        id: 'ask',
        moves: [{ edge: 'diya-counter', label: 'One slip', plain: { en: 'She asks', bn: 'সে চায়' } }],
        state: { diya: { en: 'Asking', bn: 'চাইছে' } },
        plainState: { diya: { en: 'Asking', bn: 'চাইছে' } },
        story: {
          title: { en: 'She asks for one parcel', bn: 'সে একটা পার্সেল চায়' },
          text: {
            en: 'Diya shows a slip for one parcel. Asking again does not put anything new on the shelf.',
            bn: 'দিয়া একটা পার্সেলের স্লিপ দেখায়। আবার চাইলেও তাকে নতুন কিছু ওঠে না।'
          }
        },
        title: { en: 'She asks for one parcel', bn: 'সে একটা পার্সেল চায়' },
        simple: {
          en: 'Diya shows a slip for one parcel. Asking twice does not change the shelf.',
          bn: 'দিয়া একটা পার্সেলের স্লিপ দেখায়। দুবার চাইলেও তাক বদলায় না।'
        },
        tech: {
          en: 'GET reads one resource. It is safe and idempotent, so a repeat does not request a change, and the response is cacheable. Do not send a body. A missing resource is 404, which may also hide that one exists.',
          bn: 'GET একটা রিসোর্স পড়ে। সেটা নিরাপদ এবং আইডেমপোটেন্ট, তাই আবার করলে কোনো বদল চায় না, আর উত্তর ক্যাশে রাখা যায়। বডি পাঠাবেন না। না থাকলে 404, যা এটাও লুকোতে পারে যে একটা আছে।'
        }
      },
      {
        id: 'look',
        moves: [{ edge: 'counter-shelf', label: 'On the shelf', plain: { en: 'Looks up', bn: 'খুঁজে দেখে' } }],
        state: { counter: { en: 'Looking', bn: 'খুঁজছে' } },
        plainState: { counter: { en: 'Looking', bn: 'খুঁজছে' } },
        story: {
          title: { en: 'The clerk checks the shelf', bn: 'ক্লার্ক তাক দেখে' },
          text: {
            en: 'The clerk takes the slip to the shelf. Only the counter knows which slot that number means.',
            bn: 'ক্লার্ক স্লিপ নিয়ে তাকে যায়। কোন ঘর মানে কোন নম্বর, সেটা শুধু কাউন্টার জানে।'
          }
        },
        title: { en: 'The clerk checks the shelf', bn: 'ক্লার্ক তাক দেখে' },
        simple: {
          en: 'The counter looks the slip up on the shelf. Diya waits.',
          bn: 'কাউন্টার স্লিপ তাকে খোঁজে। দিয়া অপেক্ষা করে।'
        },
        tech: {
          en: 'Only the origin server knows how the target URI maps to stored state. The uniform interface is the method plus the resource, not the shelf behind the counter.',
          bn: 'শুধু অরিজিন সার্ভার জানে টার্গেট ইউআরআই জমানো অবস্থায় কীভাবে মিলে। ইউনিফর্ম ইন্টারফেস হলো মেথড আর রিসোর্স, কাউন্টারের পেছনের তাক নয়।'
        }
      },
      {
        id: 'back',
        moves: [
          { edge: 'shelf-counter', label: 'The parcel', plain: { en: 'Here it is', bn: 'এই নিন' } },
          { edge: 'counter-diya', label: 'The parcel', plain: { en: 'Here it is', bn: 'এই নিন' } }
        ],
        state: { diya: { en: 'Has it', bn: 'পেয়েছে' } },
        plainState: { diya: { en: 'Has it', bn: 'পেয়েছে' } },
        story: {
          title: { en: 'The parcel comes back', bn: 'পার্সেল ফিরে আসে' },
          text: {
            en: 'The clerk hands the parcel back, or says that slip is not on the shelf.',
            bn: 'ক্লার্ক পার্সেল ফেরত দেয়, অথবা বলে সেই স্লিপ তাকে নেই।'
          }
        },
        title: { en: 'The parcel comes back', bn: 'পার্সেল ফিরে আসে' },
        simple: {
          en: 'The clerk hands the parcel back, or says it is not on the shelf.',
          bn: 'ক্লার্ক পার্সেল ফেরত দেয়, অথবা বলে সেটা তাকে নেই।'
        },
        tech: {
          en: 'A found representation comes back as 200. 404 means no current representation, or the server will not disclose that one exists.',
          bn: 'পাওয়া গেলে রিপ্রেজেন্টেশন 200 হয়ে ফেরে। 404 মানে এখন কোনো রিপ্রেজেন্টেশন নেই, অথবা সার্ভার বলবে না যে একটা আছে।'
        }
      },
      {
        id: 'hand',
        moves: [{ edge: 'diya-counter', label: 'A new parcel', plain: { en: 'Hands it in', bn: 'জমা দেয়' } }],
        state: { diya: { en: 'Handing in', bn: 'জমা দিচ্ছে' } },
        plainState: { diya: { en: 'Handing in', bn: 'জমা দিচ্ছে' } },
        story: {
          title: { en: 'She hands in a new parcel', bn: 'সে নতুন পার্সেল দেয়' },
          text: {
            en: 'Diya hands a parcel to the clerk and does not choose its number. The same hand-in twice can leave two parcels.',
            bn: 'দিয়া ক্লার্ককে একটা পার্সেল দেয় এবং নম্বর নিজে বাছে না। একই জিনিস দুবার দিলে দুটো পার্সেল থাকতে পারে।'
          }
        },
        title: { en: 'She hands in a new parcel', bn: 'সে নতুন পার্সেল দেয়' },
        simple: {
          en: 'Diya hands in a parcel and does not pick the number. The same hand-in twice can leave two parcels.',
          bn: 'দিয়া একটা পার্সেল দেয় এবং নম্বর বাছে না। একই জিনিস দুবার দিলে দুটো পার্সেল থাকতে পারে।'
        },
        tech: {
          en: 'POST lets the target resource process the body by its own rules, including creating a resource the server names. A repeat is not idempotent. On creation the server should send 201 and a Location for the primary resource.',
          bn: 'POST টার্গেট রিসোর্সকে তার নিজের নিয়মে বডি প্রসেস করতে দেয়, যার মধ্যে সার্ভারের দেওয়া নামে নতুন রিসোর্সও আছে। আবার করা আইডেমপোটেন্ট নয়। তৈরি হলে সার্ভারের 201 পাঠানো উচিত এবং মূল রিসোর্সের Location।'
        }
      },
      {
        id: 'slip',
        moves: [{ edge: 'counter-diya', label: 'New slip', plain: { en: 'New number', bn: 'নতুন নম্বর' } }],
        state: { counter: { en: 'Slip written', bn: 'স্লিপ লেখা' } },
        plainState: { counter: { en: 'New slip', bn: 'নতুন স্লিপ' } },
        story: {
          title: { en: 'The counter writes a new slip', bn: 'কাউন্টার নতুন স্লিপ লেখে' },
          text: {
            en: 'The clerk writes a new slip and tells Diya the slot where that parcel now lives.',
            bn: 'ক্লার্ক একটা নতুন স্লিপ লেখে এবং দিয়াকে বলে পার্সেল এখন কোন ঘরে আছে।'
          }
        },
        title: { en: 'The counter writes a new slip', bn: 'কাউন্টার নতুন স্লিপ লেখে' },
        simple: {
          en: 'The clerk writes a new slip and tells Diya where the parcel now lives.',
          bn: 'ক্লার্ক একটা নতুন স্লিপ লেখে এবং দিয়াকে বলে পার্সেল এখন কোথায়।'
        },
        tech: {
          en: '201 means at least one resource was created, and Location names the primary one. A later read of that address should see the new parcel.',
          bn: '201 মানে অন্তত একটা রিসোর্স তৈরি হয়েছে, আর Location মূলটার নাম বলে। পরে সেই ঠিকানা পড়লে নতুন পার্সেল দেখা উচিত।'
        }
      },
      {
        id: 'change',
        moves: [
          { edge: 'diya-counter', label: 'The edit', plain: { en: 'She edits', bn: 'সে বদলায়' } },
          { edge: 'counter-shelf', label: 'The edit', plain: { en: 'She edits', bn: 'সে বদলায়' } }
        ],
        state: { shelf: { en: 'Replaced', bn: 'বদলানো' } },
        plainState: { shelf: { en: 'Changed', bn: 'বদলানো' } },
        story: {
          title: { en: 'She swaps it or fixes the label', bn: 'সে বদলায় বা লেবেল ঠিক করে' },
          text: {
            en: 'A full swap puts a whole new parcel in that slot. A small fix changes only the label, and the shelf never shows half a fix.',
            bn: 'পুরো বদল সেই ঘরে একটা নতুন পার্সেল রাখে। ছোট মেরামত শুধু লেবেল বদলায়, আর তাক কখনো আধা মেরামত দেখায় না।'
          }
        },
        title: { en: 'She swaps it or fixes the label', bn: 'সে বদলায় বা লেবেল ঠিক করে' },
        simple: {
          en: 'A full swap replaces the whole parcel. A small fix changes only the label, and the shelf never shows half a fix.',
          bn: 'পুরো বদল পুরো পার্সেল বদলায়। ছোট মেরামত শুধু লেবেল বদলায়, আর তাক কখনো আধা মেরামত দেখায় না।'
        },
        tech: {
          en: 'PUT replaces the target resource and is idempotent. A replacement answers 200 or 204. PATCH sends instructions, is not guaranteed idempotent, and the server must apply every change or none.',
          bn: 'PUT টার্গেট রিসোর্স বদলায় এবং আইডেমপোটেন্ট। বদলের উত্তর 200 বা 204। PATCH নির্দেশ পাঠায়, আইডেমপোটেন্ট হওয়ার নিশ্চয়তা নেই, আর সার্ভারকে সব বদল করতে হয় অথবা একটিও না।'
        }
      },
      {
        id: 'take',
        moves: [{ edge: 'counter-shelf', label: 'Off the shelf', plain: { en: 'Take it off', bn: 'নামিয়ে নিন' } }],
        state: { shelf: { en: 'Empty', bn: 'খালি' } },
        plainState: { shelf: { en: 'Empty', bn: 'খালি' } },
        story: {
          title: { en: 'She takes the parcel off', bn: 'সে পার্সেল নামায়' },
          text: {
            en: 'The clerk clears that slip. Clearing it again leaves the shelf the same, even if the words of the reply change.',
            bn: 'ক্লার্ক সেই স্লিপ খালি করে। আবার খালি করলেও তাক একই থাকে, উত্তরের কথা বদলালেও।'
          }
        },
        title: { en: 'She takes the parcel off', bn: 'সে পার্সেল নামায়' },
        simple: {
          en: 'Taking it off once empties that slip. Taking it off again leaves the shelf the same.',
          bn: 'একবার নামালে সেই স্লিপ খালি হয়। আবার নামালেও তাক একই থাকে।'
        },
        tech: {
          en: 'DELETE removes the association between the URI and its current function. It is idempotent, so a second call leaves the same state even when the status differs. A finished delete should answer 202, 204, or 200.',
          bn: 'DELETE ইউআরআই আর তার বর্তমান কাজের যোগ সরায়। সেটা আইডেমপোটেন্ট, তাই দ্বিতীয় বার অবস্থা একই থাকে, স্ট্যাটাস আলাদা হলেও। শেষ হওয়া ডিলিটের উত্তর 202, 204, বা 200 হওয়া উচিত।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'noname',
      label: { en: 'No name', bn: 'নাম নেই' },
      branchAfter: 'back',
      whatIf: { en: 'What if she asks and gives no name?', bn: 'সে যদি চায় এবং কোনো নাম না দেয়?' },
      steps: [
        {
          id: 'blank',
          work: { node: 'counter', kind: 'queue' },
          state: { counter: { en: 'No name', bn: 'নাম নেই' } },
          plainState: { counter: { en: 'No name', bn: 'নাম নেই' } },
          story: {
            title: { en: 'She gives no name', bn: 'সে নাম দেয় না' },
            text: {
              en: 'Diya asks for a parcel and does not say who she is. The clerk has not opened the shelf.',
              bn: 'দিয়া একটা পার্সেল চায় এবং বলে না সে কে। ক্লার্ক তাক খোলেনি।'
            }
          },
          title: { en: 'She gives no name', bn: 'সে নাম দেয় না' },
          simple: {
            en: 'Diya asks for a parcel and does not say who she is. The clerk has not looked yet.',
            bn: 'দিয়া একটা পার্সেল চায় এবং বলে না সে কে। ক্লার্ক এখনো দেখেনি।'
          },
          tech: {
            en: 'The request has no valid credentials for this resource, so it has not been applied. That is different from a known sender who is not allowed.',
            bn: 'এই রিসোর্সের জন্য অনুরোধে বৈধ পরিচয় নেই, তাই সেটা প্রয়োগ হয়নি। এটা সেই পরিচিত প্রেরক থেকে আলাদা যাকে অনুমতি নেই।'
          }
        },
        {
          id: 'refuse',
          work: { node: 'counter', kind: 'error' },
          state: { counter: { en: 'Refused', bn: 'প্রত্যাখ্যান' } },
          plainState: { counter: { en: 'Refused', bn: 'প্রত্যাখ্যান' } },
          story: {
            title: { en: 'The clerk asks who she is', bn: 'ক্লার্ক জিজ্ঞেস করে সে কে' },
            text: {
              en: 'The clerk will not look until Diya says who she is. Knowing her, and still saying no, is a different reply.',
              bn: 'দিয়া কে সেটা না বলা পর্যন্ত ক্লার্ক দেখবে না। তাকে চিনেও না বলা আলাদা উত্তর।'
            }
          },
          title: { en: 'The clerk asks who she is', bn: 'ক্লার্ক জিজ্ঞেস করে সে কে' },
          simple: {
            en: 'The clerk refuses until Diya says who she is. Knowing her and still saying no is a different answer.',
            bn: 'দিয়া কে সেটা না বলা পর্যন্ত ক্লার্ক না করে। তাকে চিনেও না বলা আলাদা উত্তর।'
          },
          tech: {
            en: '401 means missing valid credentials, and the server must send WWW-Authenticate. 403 means the server understood and refuses, including valid credentials that are not enough. It may send 404 instead of 403 to hide the resource.',
            bn: '401 মানে বৈধ পরিচয় নেই, আর সার্ভারকে WWW-Authenticate পাঠাতেই হবে। 403 মানে সার্ভার বুঝেছে এবং না করছে, বৈধ কিন্তু অপর্যাপ্ত পরিচয়সহ। রিসোর্স লুকোতে 403-এর বদলে 404 পাঠাতে পারে।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A parcel counter. The slip is the address, the verb is what Diya asks, and the clerk’s reply is the status.',
      bn: 'একটা পার্সেল কাউন্টার। স্লিপ হলো ঠিকানা, ক্রিয়া হলো দিয়া কী চায়, আর ক্লার্কের উত্তর হলো স্ট্যাটাস।'
    },
    twins: [
      { node: 'diya', icon: 'user', name: { en: 'Diya', bn: 'দিয়া' }, d: { en: 'The sender who names a parcel and asks for one thing to happen.', bn: 'প্রেরক যে একটা পার্সেলের নাম বলে এবং একটা কাজ চায়।' } },
      { node: 'counter', icon: 'server', name: { en: 'The counter', bn: 'কাউন্টার' }, d: { en: 'The clerk who reads the verb and writes the reply.', bn: 'ক্লার্ক যে ক্রিয়া পড়ে এবং উত্তর লেখে।' } },
      { node: 'shelf', icon: 'archive', name: { en: 'The shelf', bn: 'তাক' }, d: { en: 'Where the parcels sit. Only the clerk decides which slip means which slot.', bn: 'পার্সেল যেখানে থাকে। কোন স্লিপ কোন ঘর, সেটা শুধু ক্লার্ক ঠিক করে।' } }
    ]
  },
  qa: [
    {
      q: { en: 'What does it mean that a verb can be repeated safely?', bn: 'একটা ক্রিয়া নিরাপদে আবার করা যায় মানে কী?' },
      short: { en: 'The shelf ends the same whether she does it once or many times. The words of the reply may still change.', bn: 'একবার করুক বা অনেকবার, তাক একই থাকে। উত্তরের কথা তবু বদলাতে পারে।' },
      deep: { en: 'RFC 9110 calls a method idempotent when the intended effect of identical requests equals one request. GET, HEAD, OPTIONS, TRACE, PUT, and DELETE are idempotent. POST is not. Safe methods (GET, HEAD, OPTIONS, TRACE) do not request a change. A repeat of DELETE can leave the same empty shelf while the status changes. A client should not automatically retry a method that is not idempotent.', bn: 'RFC 9110 বলে একটা মেথড আইডেমপোটেন্ট যখন একই অনুরোধের উদ্দেশ্য একবারের সমান। GET, HEAD, OPTIONS, TRACE, PUT, এবং DELETE আইডেমপোটেন্ট। POST নয়। নিরাপদ মেথড (GET, HEAD, OPTIONS, TRACE) কোনো বদল চায় না। DELETE আবার করলে তাক খালিই থাকে, স্ট্যাটাস বদলাতে পারে। যে মেথড আইডেমপোটেন্ট নয়, ক্লায়েন্টের সেটা নিজে থেকে আবার করা উচিত নয়।' },
      redFlag: { en: '“Idempotent means the reply is the same every time.”', bn: '“আইডেমপোটেন্ট মানে উত্তর প্রতিবার একই।”' }
    },
    {
      q: { en: 'When does she hand a parcel in, swap it, or fix the label?', bn: 'সে কখন পার্সেল জমা দেয়, বদলায়, না কি লেবেল ঠিক করে?' },
      short: { en: 'Hand-in when the counter picks the number. A full swap replaces a known slot. A small fix changes part of it.', bn: 'জমা দেওয়া যখন কাউন্টার নম্বর বাছে। পুরো বদল একটা জানা ঘর বদলায়। ছোট মেরামত তার এক অংশ বদলায়।' },
      deep: { en: 'POST targets a resource that processes the body, including creation of a resource the server identifies. PUT replaces the state at a URI the client already knows, and if that URI had no representation the server must answer 201. A successful replacement must answer 200 or 204. PATCH carries a set of changes. It is not guaranteed idempotent, though one patch document can be written so that it is, and the server must apply the whole set or none of it.', bn: 'POST এমন রিসোর্সকে টার্গেট করে যে বডি প্রসেস করে, যার মধ্যে সার্ভারের চিহ্নিত নতুন রিসোর্সও আছে। PUT ক্লায়েন্টের জানা ইউআরআই-এর অবস্থা বদলায়, আর সেই ইউআরআই-এ কোনো রিপ্রেজেন্টেশন না থাকলে সার্ভারকে 201 দিতেই হবে। সফল বদলে 200 বা 204 দিতেই হবে। PATCH এক সেট বদল বহন করে। সেটা আইডেমপোটেন্ট হওয়ার নিশ্চয়তা নেই, যদিও একটা প্যাচ ডকুমেন্ট এমন করে লেখা যায়, আর সার্ভারকে পুরো সেট করতে হয় অথবা কিছুই না।' },
      redFlag: { en: '“A full swap and a hand-in are the same request.”', bn: '“পুরো বদল আর জমা দেওয়া একই অনুরোধ।”' }
    },
    {
      q: { en: 'What if she gives no name, or the clerk knows her and still says no?', bn: 'সে যদি নাম না দেয়, অথবা ক্লার্ক তাকে চিনেও না বলে?' },
      short: { en: 'No name means the clerk asks who she is. Knowing her and saying no is a refusal.', bn: 'নাম না দিলে ক্লার্ক জিজ্ঞেস করে সে কে। চিনেও না বলা একটা প্রত্যাখ্যান।' },
      deep: { en: '401 means the request was not applied because it lacks valid credentials, and the server must send WWW-Authenticate with at least one challenge. 403 means the server understood the request and refuses it. Valid credentials that are not enough ought to be 403, and a 403 can also be unrelated to credentials. A server may answer 404 instead of 403 when it wants to hide that the resource exists.', bn: '401 মানে অনুরোধ প্রয়োগ হয়নি কারণ বৈধ পরিচয় নেই, আর সার্ভারকে অন্তত একটা চ্যালেঞ্জসহ WWW-Authenticate পাঠাতেই হবে। 403 মানে সার্ভার অনুরোধ বুঝেছে এবং না করছে। বৈধ কিন্তু অপর্যাপ্ত পরিচয় 403 হওয়া উচিত, আর 403 পরিচয় ছাড়া অন্য কারণেও হতে পারে। রিসোর্স লুকোতে চাইলে সার্ভার 403-এর বদলে 404 দিতে পারে।' },
      redFlag: { en: '“No name and not allowed are the same refusal.”', bn: '“নাম না দেওয়া আর অনুমতি না পাওয়া একই প্রত্যাখ্যান।”' }
    },
    {
      q: { en: 'What makes the counter this kind of counter?', bn: 'কাউন্টারকে এই রকম কাউন্টার কী বানায়?' },
      short: { en: 'Slips name parcels, verbs say what to do, and each ask stands on its own.', bn: 'স্লিপ পার্সেলের নাম বলে, ক্রিয়া বলে কী করতে হবে, আর প্রতিটি চাওয়া নিজে দাঁড়ায়।' },
      deep: { en: 'HTTP is stateless: each request is understood on its own, so the counter does not remember Diya from the connection. A resource is anything identified by a URI, and the method carries the intent. Nouns in the path and plural collections are a common convention, not a rule of the spec. Hypermedia, where each reply tells her the next legal asks, is the level almost nobody ships. A body of text over the wire, with no slips and no verbs, is not this counter.', bn: 'HTTP স্টেটলেস: প্রতিটি অনুরোধ নিজে বোঝা যায়, তাই কানেকশন থেকে কাউন্টার দিয়াকে মনে রাখে না। রিসোর্স হলো ইউআরআই দিয়ে চেনা যেকোনো কিছু, আর মেথড উদ্দেশ্য বহন করে। পাথে বিশেষ্য আর বহুবচন কালেকশন একটা চলতি রীতি, স্পেকের নিয়ম নয়। হাইপারমিডিয়া, যেখানে প্রতিটি উত্তর পরের বৈধ চাওয়া বলে, প্রায় কেউ বানায় না। তার ছাড়া স্লিপ ছাড়া শুধু লেখা পাঠানো এই কাউন্টার নয়।' },
      redFlag: { en: '“Any reply with a written note is this kind of counter.”', bn: '“লেখা নোটসহ যেকোনো উত্তর এই রকম কাউন্টার।”' }
    },
    {
      q: { en: 'The label is nonsense, but the parcel is wrapped properly. What does the clerk say?', bn: 'লেবেল অর্থহীন, কিন্তু পার্সেল ঠিকমতো মোড়ানো। ক্লার্ক কী বলে?' },
      short: { en: 'A broken wrap is one answer. A proper wrap with a nonsense label is another. FastAPI uses the second for invalid input.', bn: 'ভাঙা মোড়ক এক উত্তর। ঠিক মোড়কে অর্থহীন লেবেল আরেক উত্তর। অবৈধ ইনপুটে FastAPI দ্বিতীয়টা ব্যবহার করে।' },
      deep: { en: '400 means the server will not process the request because it looks like a client mistake, such as malformed syntax. 422 Unprocessable Content means the content type is understood and the syntax is valid, but the instructions cannot be carried out. RFC 5789 uses 400 for a malformed patch document and 422 when the patch is understood but cannot be applied. FastAPI’s handler for RequestValidationError answers 422.', bn: '400 মানে সার্ভার অনুরোধ প্রসেস করবে না কারণ সেটা ক্লায়েন্টের ভুল মনে হয়, যেমন ভাঙা সিনট্যাক্স। 422 Unprocessable Content মানে কনটেন্ট টাইপ বোঝা গেছে এবং সিনট্যাক্স সঠিক, কিন্তু নির্দেশ কার্যকর হয় না। RFC 5789 ভাঙা প্যাচ ডকুমেন্টে 400 বলে, আর প্যাচ বোঝা গেলেও প্রয়োগ না হলে 422। FastAPI-র RequestValidationError হ্যান্ডলার 422 দেয়।' },
      redFlag: { en: '“Always say everything is fine, and hide the problem in a note.”', bn: '“সব সময় বলুন সব ঠিক, আর সমস্যাটা একটা নোটে লুকান।”' }
    }
  ],
  cheats: [
    { code: 'curl -i http://localhost:8000/parcels/42', d: { en: 'Read one parcel and show the status line.', bn: 'একটা পার্সেল পড়ুন এবং স্ট্যাটাস লাইন দেখান।' } },
    { code: 'curl -i -X POST http://localhost:8000/parcels -H \'Content-Type: application/json\' -d \'{"label":"A"}\'', d: { en: 'Hand in a parcel and let the counter pick the number.', bn: 'একটা পার্সেল জমা দিন এবং নম্বর কাউন্টারকে বাছতে দিন।' } },
    { code: 'curl -i -X PUT http://localhost:8000/parcels/42 -H \'Content-Type: application/json\' -d \'{"label":"B","note":"n"}\'', d: { en: 'Replace the whole parcel in a known slot.', bn: 'জানা একটা ঘরে পুরো পার্সেল বদলান।' } },
    { code: 'curl -i -X PATCH http://localhost:8000/parcels/42 -H \'Content-Type: application/json\' -d \'{"label":"C"}\'', d: { en: 'Change only the label.', bn: 'শুধু লেবেল বদলান।' } },
    { code: 'curl -i -X DELETE http://localhost:8000/parcels/42', d: { en: 'Take that slip off the shelf.', bn: 'সেই স্লিপ তাক থেকে নামান।' } }
  ],
  sources: [
    { label: 'RFC 9110: HTTP Semantics', url: 'https://www.rfc-editor.org/rfc/rfc9110' },
    { label: 'RFC 5789: PATCH method', url: 'https://www.rfc-editor.org/rfc/rfc5789' },
    { label: 'MDN: HTTP request methods', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods' },
    { label: 'FastAPI: handling errors', url: 'https://fastapi.tiangolo.com/tutorial/handling-errors/' }
  ],
  film: {
    src: '/learn/rest-basics.mp4',
    note: {
      en: '401 means no valid credentials, and the server sends WWW-Authenticate. 403 means the server understood and refuses.',
      bn: '401 মানে বৈধ পরিচয় নেই, আর সার্ভার WWW-Authenticate পাঠায়। 403 মানে সার্ভার বুঝেছে এবং না করছে।'
    }
  }
}
