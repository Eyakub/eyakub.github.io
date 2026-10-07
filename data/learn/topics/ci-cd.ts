import type { Topic } from '../types'
import { UI } from '../ui'

export const ciCd: Topic = {
  slug: 'ci-cd',
  line: 'devops',
  title: { en: 'CI/CD', bn: 'CI/CD' },
  summary: {
    en: 'From a push to a live release with GitHub Actions: a fresh runner, tests, an image tagged by commit, an approval gate and a deploy.',
    bn: 'একটা push থেকে চালু রিলিজ পর্যন্ত GitHub Actions-এর পথ: নতুন runner, test, commit দিয়ে tag করা image, অনুমোদনের gate আর deploy।'
  },
  hook: {
    en: 'Every change goes down an automatic assembly line that checks it, boxes it and ships it, so mistakes are caught before customers see them.',
    bn: 'প্রতিটি পরিবর্তন একটা স্বয়ংক্রিয় অ্যাসেম্বলি লাইনের ভেতর দিয়ে যায়, যা তাকে যাচাই করে, বাক্সে ভরে আর পাঠিয়ে দেয়, তাই গ্রাহক দেখার আগেই ভুল ধরা পড়ে।'
  },
  story: {
    cast: {
      en: 'Nasrin places an order at the order desk, Zahid inspects it on a fresh workstation and Rubel, the shipping manager, signs it off before it ships to the store.',
      bn: 'নাসরিন অর্ডার ডেস্কে অর্ডার দেয়, জাহিদ নতুন ওয়ার্কস্টেশনে সেটা যাচাই করে, আর শিপিং ম্যানেজার রুবেল দোকানে পাঠানোর আগে অনুমোদন দেয়।'
    }
  },
  takeaway: {
    en: 'Only a box that passed every check and got a yes ever reaches the store.',
    bn: 'যে বাক্স সব পরীক্ষায় পাস করেছে আর অনুমোদন পেয়েছে, শুধু সেটাই দোকানে পৌঁছায়।'
  },
  words: [
    {
      term: { en: 'Assembly line (CI/CD)', bn: 'অ্যাসেম্বলি লাইন (CI/CD)' },
      d: {
        en: 'Automatic steps that check, box and ship every change you make.',
        bn: 'প্রতিটি পরিবর্তন যাচাই করে, বাক্সে ভরে আর পাঠানোর স্বয়ংক্রিয় ধাপ।'
      }
    },
    {
      term: { en: 'Order (push)', bn: 'অর্ডার (push)' },
      d: {
        en: 'Handing your changes to the order desk, which starts the line.',
        bn: 'আপনার পরিবর্তন অর্ডার ডেস্কে জমা দেওয়া, যা লাইনটা চালু করে।'
      }
    },
    {
      term: { en: 'Fresh workstation (runner)', bn: 'নতুন ওয়ার্কস্টেশন (runner)' },
      d: {
        en: 'A clean computer lent for one job, then thrown away.',
        bn: 'একটা কাজের জন্য ধার দেওয়া পরিষ্কার কম্পিউটার, তারপর ফেলে দেওয়া হয়।'
      }
    },
    {
      term: { en: 'Inspectors (tests)', bn: 'পরিদর্শক (test)' },
      d: {
        en: 'Small programs that try your work and shout when something breaks.',
        bn: 'ছোট প্রোগ্রাম, যা আপনার কাজ পরখ করে আর কিছু ভাঙলে চেঁচিয়ে জানায়।'
      }
    },
    {
      term: { en: 'Boxed product (image)', bn: 'বাক্সবন্দী পণ্য (image)' },
      d: {
        en: 'Your finished app sealed in a box that runs the same anywhere.',
        bn: 'আপনার তৈরি অ্যাপ বাক্সে সিল করা, যা সব জায়গায় একইভাবে চলে।'
      }
    },
    {
      term: { en: 'Sign-off (approval)', bn: 'অনুমোদন (approval)' },
      d: {
        en: 'A person says yes before anything reaches real customers.',
        bn: 'আসল গ্রাহকের কাছে কিছু পৌঁছানোর আগে একজন মানুষ হ্যাঁ বলেন।'
      }
    }
  ],
  legend: {
    queue: { en: 'Waiting for a yes', bn: 'অনুমোদনের অপেক্ষা' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 1000, 400 ], narrow: [ 400, 540 ] },
  nodes: {
    dev: {
      icon: 'user',
      name: { en: 'Developer', bn: 'ডেভেলপার' },
      sub: { en: 'Pushes code', bn: 'code push করে' },
      plain: {
        name: { en: 'You', bn: 'আপনি' },
        sub: { en: 'Place an order', bn: 'অর্ডার দেন' }
      },
      wide: [ 100, 115, 'down' ],
      narrow: [ 70, 40, 'right' ]
    },
    repo: {
      icon: 'folder',
      name: { en: 'GitHub repo', bn: 'GitHub repo' },
      sub: { en: 'Code and workflows', bn: 'code আর workflow' },
      plain: {
        name: { en: 'Order desk', bn: 'অর্ডার ডেস্ক' },
        sub: { en: 'Takes your order', bn: 'অর্ডার নেয়' }
      },
      wide: [ 330, 115, 'up' ],
      narrow: [ 70, 150, 'right' ]
    },
    runner: {
      icon: 'worker',
      name: { en: 'Runner', bn: 'Runner' },
      sub: { en: 'Fresh VM per job', bn: 'প্রতি job-এ নতুন VM' },
      plain: {
        name: { en: 'Fresh workstation', bn: 'নতুন ওয়ার্কস্টেশন' },
        sub: { en: 'Builds and checks', bn: 'বানায় আর যাচাই করে' }
      },
      wide: [ 790, 115, 'up' ],
      narrow: [ 320, 215, 'up' ]
    },
    registry: {
      icon: 'box',
      name: { en: 'Registry', bn: 'Registry' },
      sub: { en: 'Stores the images', bn: 'image জমা রাখে' },
      plain: {
        name: { en: 'Warehouse', bn: 'গুদাম' },
        sub: { en: 'Keeps the boxes', bn: 'বাক্সগুলো রাখে' }
      },
      wide: [ 560, 210, 'down' ],
      narrow: [ 200, 290, 'left' ]
    },
    gate: {
      icon: 'shield',
      name: { en: 'Environment gate', bn: 'Environment gate' },
      sub: { en: 'Needs a reviewer', bn: 'reviewer লাগে' },
      plain: {
        name: { en: 'Shipping manager', bn: 'শিপিং ম্যানেজার' },
        sub: { en: 'Signs off first', bn: 'আগে অনুমোদন দেন' }
      },
      wide: [ 790, 305, 'down' ],
      narrow: [ 320, 450, 'down' ]
    },
    prod: {
      icon: 'server',
      name: { en: 'Production', bn: 'Production' },
      sub: { en: 'Live servers', bn: 'চালু server' },
      plain: {
        name: { en: 'The store', bn: 'দোকান' },
        sub: { en: 'Where people shop', bn: 'কেনাকাটার জায়গা' }
      },
      wide: [ 330, 305, 'down' ],
      narrow: [ 70, 450, 'down' ]
    }
  },
  corridors: {
    'dev-repo': { wide: [ [ 100, 115 ], [ 330, 115 ] ], narrow: [ [ 70, 40 ], [ 70, 150 ] ] },
    'repo-runner': { wide: [ [ 330, 115 ], [ 790, 115 ] ], narrow: [ [ 70, 150 ], [ 135, 215 ], [ 320, 215 ] ] },
    'runner-registry': { wide: [ [ 790, 115 ], [ 695, 210 ], [ 560, 210 ] ], narrow: [ [ 320, 215 ], [ 245, 290 ], [ 200, 290 ] ] },
    'runner-gate': { wide: [ [ 790, 115 ], [ 790, 305 ] ], narrow: [ [ 320, 215 ], [ 320, 450 ] ] },
    'gate-prod': { wide: [ [ 790, 305 ], [ 330, 305 ] ], narrow: [ [ 320, 450 ], [ 70, 450 ] ] },
    'registry-prod': { wide: [ [ 560, 210 ], [ 425, 210 ], [ 330, 305 ] ], narrow: [ [ 200, 290 ], [ 200, 320 ], [ 70, 450 ] ] },
    'prod-repo': { wide: [ [ 330, 305 ], [ 330, 115 ] ], narrow: [ [ 70, 450 ], [ 30, 410 ], [ 30, 190 ], [ 70, 150 ] ] }
  },
  edges: {
    'dev-repo': { from: 'dev', to: 'repo', kind: 'request' },
    'repo-dev': { from: 'repo', to: 'dev', kind: 'result' },
    'repo-runner': { from: 'repo', to: 'runner', kind: 'request' },
    'runner-registry': { from: 'runner', to: 'registry', kind: 'request' },
    'runner-gate': { from: 'runner', to: 'gate', kind: 'queue' },
    'gate-prod': { from: 'gate', to: 'prod', kind: 'request' },
    'registry-prod': { from: 'registry', to: 'prod', kind: 'result' },
    'prod-repo': { from: 'prod', to: 'repo', kind: 'result' },
    'runner-repo-err': { from: 'runner', to: 'repo', kind: 'error' },
    'repo-dev-err': { from: 'repo', to: 'dev', kind: 'error' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'push',
        moves: [ { edge: 'dev-repo', label: 'git push', plain: { en: 'Your order', bn: 'আপনার অর্ডার' } } ],
        state: { repo: { en: 'Commit received', bn: 'commit পেয়েছে' } },
        plainState: { repo: { en: 'Order noted', bn: 'অর্ডার লেখা হয়েছে' } },
        title: { en: 'You place an order', bn: 'আপনি অর্ডার দেন' },
        simple: {
          en: 'You finish a change and hand it in at the order desk, like placing an order. The desk writes it down and wakes up the assembly line.',
          bn: 'আপনি একটা পরিবর্তন শেষ করে অর্ডার ডেস্কে জমা দেন, ঠিক অর্ডার দেওয়ার মতো। ডেস্ক সেটা লিখে রাখে আর অ্যাসেম্বলি লাইনকে জাগিয়ে তোলে।'
        },
        story: {
          title: { en: 'Nasrin places an order', bn: 'নাসরিন অর্ডার দেয়' },
          text: {
            en: 'Nasrin finishes a small change and hands it in at the order desk, like placing an order. The desk writes it in the order book and rings the bell for the assembly line.',
            bn: 'নাসরিন ছোট একটা পরিবর্তন শেষ করে অর্ডার ডেস্কে জমা দেয়, ঠিক অর্ডার দেওয়ার মতো। ডেস্ক সেটা অর্ডার বইয়ে লিখে রাখে আর অ্যাসেম্বলি লাইনের জন্য ঘণ্টা বাজায়।'
          }
        },
        tech: {
          en: '`git push` uploads your commits to GitHub, and the push is an event. Any workflow file in `.github/workflows` that lists `on: push` is triggered by it, and `pull_request` can trigger one too.',
          bn: '`git push` আপনার commit GitHub-এ আপলোড করে, আর push-টা একটা event। `.github/workflows`-এর যে workflow ফাইলে `on: push` লেখা আছে, সেটা এই event-এ চালু হয়, আর `pull_request`-ও একটা workflow চালু করতে পারে।'
        }
      },
      {
        id: 'trigger',
        moves: [ { edge: 'repo-runner', label: 'on: push', plain: { en: 'Start working', bn: 'কাজ শুরু' } } ],
        state: { runner: { en: 'Fresh VM', bn: 'নতুন VM' } },
        plainState: { runner: { en: 'Brand new', bn: 'একদম নতুন' } },
        title: { en: 'The line gets a fresh workstation', bn: 'লাইন একটা নতুন ওয়ার্কস্টেশন পায়' },
        simple: {
          en: 'The order desk asks for a workstation. A brand-new, clean one is lent just for this order, so nothing left over from earlier jobs can interfere.',
          bn: 'অর্ডার ডেস্ক একটা ওয়ার্কস্টেশন চায়। শুধু এই অর্ডারের জন্য একদম নতুন, পরিষ্কার একটা ধার দেওয়া হয়, তাই আগের কোনো কাজের জঞ্জাল কিছু গোলমাল করতে পারে না।'
        },
        story: {
          title: { en: 'Zahid gets a clean workstation', bn: 'জাহিদ পরিষ্কার ওয়ার্কস্টেশন পায়' },
          text: {
            en: 'The bell rings and the order desk lends Zahid a brand-new workstation, bare and spotless. It is his for this order only, so no crumbs from earlier jobs can spoil the work.',
            bn: 'ঘণ্টা বাজে, আর অর্ডার ডেস্ক জাহিদকে একটা একদম নতুন ওয়ার্কস্টেশন ধার দেয়, ফাঁকা আর ঝকঝকে। এটা শুধু এই অর্ডারের জন্য তার, তাই আগের কাজের কোনো টুকরোটাকরা কাজ নষ্ট করতে পারে না।'
          }
        },
        tech: {
          en: 'GitHub queues the job and gives it a runner chosen by `runs-on`, such as `ubuntu-latest`. A GitHub-hosted runner is a fresh virtual machine, and each job gets its own. Jobs run in parallel unless `needs` orders them.',
          bn: 'GitHub job-টা queue-তে রাখে আর `runs-on` দিয়ে বাছা একটা runner দেয়, যেমন `ubuntu-latest`। GitHub-hosted runner একটা নতুন virtual machine, আর প্রতিটি job পায় নিজের একটা। `needs` ক্রম ঠিক না করলে job-গুলো parallel-এ চলে।'
        }
      },
      {
        id: 'install',
        work: { node: 'runner', kind: 'request' },
        state: { runner: { en: 'Installing dependencies', bn: 'dependency install হচ্ছে' } },
        plainState: { runner: { en: 'Unpacking parts', bn: 'যন্ত্রাংশ খোলা হচ্ছে' } },
        title: { en: 'The workstation unpacks the order', bn: 'ওয়ার্কস্টেশন অর্ডার খুলে সাজায়' },
        simple: {
          en: 'The workstation unpacks everything the order needs: your latest work and the tools to build it. Only then can it start checking anything.',
          bn: 'ওয়ার্কস্টেশন অর্ডারের যা দরকার সব খুলে সাজায়: আপনার সর্বশেষ কাজ আর সেটা বানানোর যন্ত্রপাতি। তারপরই সে কিছু যাচাই করতে পারে।'
        },
        story: {
          title: { en: 'Zahid unpacks the parts', bn: 'জাহিদ যন্ত্রাংশ খোলে' },
          text: {
            en: 'Zahid opens the box of parts from the order desk and lays out Nasrin’s latest work. Then he fetches the tools he needs to build it, ready to start inspecting.',
            bn: 'জাহিদ অর্ডার ডেস্কের পাঠানো যন্ত্রাংশের বাক্স খোলে আর নাসরিনের সর্বশেষ কাজটা সাজিয়ে রাখে। তারপর সেটা বানানোর যন্ত্রপাতি এনে যাচাই শুরুর জন্য তৈরি হয়।'
          }
        },
        tech: {
          en: 'The first step, `actions/checkout`, downloads the commit onto the empty runner. Then a setup step and your install command bring in the language and dependencies. A cache step can restore them so later runs skip the download.',
          bn: 'প্রথম step `actions/checkout` খালি runner-এ commit-টা নামায়। তারপর একটা setup step আর আপনার install command ভাষা আর dependency এনে দেয়। একটা cache step সেগুলো ফিরিয়ে আনতে পারে, তাই পরের run-এ আর নামাতে হয় না।'
        }
      },
      {
        id: 'tests',
        work: { node: 'runner', kind: 'result' },
        state: { runner: { en: 'Tests passed', bn: 'test পাস' } },
        plainState: { runner: { en: 'Checks passed', bn: 'পরীক্ষা পাস' } },
        title: { en: 'The inspectors check everything', bn: 'পরিদর্শকেরা সবকিছু যাচাই করে' },
        simple: {
          en: 'Inspectors try the work in many small ways and shout if anything is broken. This time nobody shouts: every check passes, so the line carries on.',
          bn: 'পরিদর্শকেরা কাজটা ছোট ছোট নানা উপায়ে পরখ করে, কিছু ভাঙলে চেঁচিয়ে ওঠে। এবার কেউ চেঁচায় না: প্রতিটি পরীক্ষা পাস, তাই লাইন এগিয়ে চলে।'
        },
        story: {
          title: { en: 'Zahid inspects the work', bn: 'জাহিদ কাজটা যাচাই করে' },
          text: {
            en: 'Zahid tries Nasrin’s work in dozens of small ways, pressing every button he can find. Nothing breaks. He puts a tick on his checklist and the line carries on.',
            bn: 'জাহিদ নাসরিনের কাজটা ডজনখানেক ছোট ছোট উপায়ে পরখ করে, হাতের কাছে যত বোতাম পায় সবই চাপে। কিছুই ভাঙে না। সে চেকলিস্টে একটা টিক দেয়, আর লাইন এগিয়ে চলে।'
          }
        },
        tech: {
          en: 'A test step such as `pytest` or `npm test` runs. A nonzero exit code fails the step, and later steps are skipped by default. Marking the job as a required check then blocks the merge until it passes.',
          bn: '`pytest` বা `npm test`-এর মতো একটা test step চলে। শূন্য ছাড়া অন্য exit code step-কে ব্যর্থ করে, আর ডিফল্টে পরের step-গুলো বাদ পড়ে। job-টাকে required check বানালে সেটা পাস না করা পর্যন্ত merge আটকে থাকে।'
        }
      },
      {
        id: 'image',
        moves: [ { edge: 'runner-registry', label: 'app:3f9c2a1', plain: { en: 'Boxed product', bn: 'বাক্সবন্দী পণ্য' } } ],
        state: { registry: { en: 'Tagged 3f9c2a1', bn: '3f9c2a1 tag' } },
        plainState: { registry: { en: 'Numbered box', bn: 'নম্বর দেওয়া বাক্স' } },
        title: { en: 'The finished app goes in a box', bn: 'তৈরি অ্যাপ বাক্সে ওঠে' },
        simple: {
          en: 'With every check passed, the workstation seals the finished app in a box and puts it on a warehouse shelf. The box is stamped with the order’s own number.',
          bn: 'সব পরীক্ষা পাস হওয়ায় ওয়ার্কস্টেশন তৈরি অ্যাপটা বাক্সে সিল করে গুদামের তাকে রাখে। বাক্সে অর্ডারের নিজস্ব নম্বর ছাপ দেওয়া থাকে।'
        },
        story: {
          title: { en: 'The box gets a number', bn: 'বাক্সে নম্বর পড়ে' },
          text: {
            en: 'Zahid seals the finished app in a sturdy box and stamps it with the order’s own number. A porter carries it to the warehouse and slides it onto a shelf, where it stays safe.',
            bn: 'জাহিদ তৈরি অ্যাপটা মজবুত বাক্সে সিল করে তাতে অর্ডারের নিজস্ব নম্বর ছাপ দেয়। একজন কুলি সেটা গুদামে নিয়ে তাকে তুলে রাখে, সেখানে সেটা নিরাপদে থাকে।'
          }
        },
        tech: {
          en: 'The job builds a Docker image and pushes it to GitHub Container Registry (`ghcr.io`), tagged with the commit SHA, such as `app:3f9c2a1`. Logging in with `GITHUB_TOKEN` needs `packages: write`. The SHA names exactly which commit is inside.',
          bn: 'job একটা Docker image বানিয়ে GitHub Container Registry-তে (`ghcr.io`) push করে, commit SHA দিয়ে tag করে, যেমন `app:3f9c2a1`। `GITHUB_TOKEN` দিয়ে login করতে `packages: write` লাগে। SHA ঠিক বলে দেয় ভেতরে কোন commit আছে।'
        }
      },
      {
        id: 'await-approval',
        moves: [ { edge: 'runner-gate', label: 'deploy waits', plain: { en: 'Please sign off', bn: 'অনুমোদন দিন' } } ],
        state: { gate: { en: 'Waiting for review', bn: 'review-র অপেক্ষা' } },
        plainState: { gate: { en: 'Waiting for a yes', bn: 'হ্যাঁ-র অপেক্ষা' } },
        title: { en: 'The box waits for sign-off', bn: 'বাক্স অনুমোদনের অপেক্ষায়' },
        simple: {
          en: 'The box is ready to ship, but real customers are at stake. So the shipping manager must look at it and say yes before anything leaves.',
          bn: 'বাক্স পাঠানোর জন্য তৈরি, কিন্তু আসল গ্রাহকদের ব্যাপার। তাই শিপিং ম্যানেজারকে দেখে হ্যাঁ বলতে হয়, তার আগে কিছুই বেরোয় না।'
        },
        story: {
          title: { en: 'Rubel is asked to sign off', bn: 'রুবেলকে অনুমোদন দিতে বলা হয়' },
          text: {
            en: 'Zahid sends a note to Rubel, the shipping manager: the box is ready, please approve it. Rubel is in a meeting, so the order waits in line. Nothing ships until he says yes.',
            bn: 'জাহিদ শিপিং ম্যানেজার রুবেলকে একটা নোট পাঠায়: বাক্স তৈরি, অনুমোদন দিন। রুবেল মিটিংয়ে, তাই অর্ডার লাইনে অপেক্ষা করে। সে হ্যাঁ না বলা পর্যন্ত কিছুই যায় না।'
          }
        },
        tech: {
          en: 'The deploy job lists `needs: build` and `environment: production`. Its protection rules must pass before it is sent to a runner, so it shows as Waiting until a required reviewer approves. One reviewer is enough.',
          bn: 'deploy job-এ `needs: build` আর `environment: production` লেখা থাকে। runner-এ পাঠানোর আগে তার protection rule পাস করতে হয়, তাই required reviewer অনুমোদন না দেওয়া পর্যন্ত সেটা Waiting দেখায়। একজন reviewer-ই যথেষ্ট।'
        }
      },
      {
        id: 'approved',
        work: { node: 'gate', kind: 'result' },
        state: { gate: { en: 'Approved', bn: 'অনুমোদিত' } },
        plainState: { gate: { en: 'Said yes', bn: 'হ্যাঁ বলেছেন' } },
        title: { en: 'The manager says yes', bn: 'ম্যানেজার হ্যাঁ বলেন' },
        simple: {
          en: 'The shipping manager checks the box and the inspectors’ ticks, then signs the form. Now the box is allowed to leave.',
          bn: 'শিপিং ম্যানেজার বাক্স আর পরিদর্শকদের টিক দেখে ফর্মে সই করেন। এবার বাক্সটা বেরোনোর অনুমতি পায়।'
        },
        story: {
          title: { en: 'Rubel signs the form', bn: 'রুবেল ফর্মে সই করে' },
          text: {
            en: 'Rubel comes out of his meeting, reads Zahid’s checklist and nods. He signs the shipping form with a flourish. Now the box is allowed to leave the building.',
            bn: 'রুবেল মিটিং থেকে বেরিয়ে জাহিদের চেকলিস্ট পড়ে মাথা নাড়ে। সে বেশ ঘটা করে শিপিং ফর্মে সই করে। এবার বাক্সটা ভবন ছেড়ে যাওয়ার অনুমতি পায়।'
          }
        },
        tech: {
          en: 'A required reviewer clicks Review deployments, then Approve and deploy; Reject fails the run instead. Environment secrets reach the job only after approval. Prevent self-review stops you approving your own run.',
          bn: 'required reviewer Review deployments-এ ক্লিক করে Approve and deploy বাছেন; Reject করলে run ব্যর্থ হয়। Environment secret অনুমোদনের পরেই job-এর হাতে আসে। Prevent self-review চালু থাকলে নিজের চালানো run নিজে অনুমোদন করা যায় না।'
        }
      },
      {
        id: 'deploy',
        moves: [ { edge: 'gate-prod', label: 'deploy 3f9c2a1', plain: { en: 'Ship this box', bn: 'এই বাক্স পাঠান' } } ],
        state: { prod: { en: 'Updating to 3f9c2a1', bn: '3f9c2a1-এ আপডেট হচ্ছে' } },
        plainState: { prod: { en: 'Getting the new box', bn: 'নতুন বাক্স আনছে' } },
        title: { en: 'The box is sent to the store', bn: 'বাক্স দোকানে পাঠানো হয়' },
        simple: {
          en: 'With the form signed, the manager tells the store to put this exact box on its shelves. The store starts getting ready.',
          bn: 'ফর্মে সই হলে ম্যানেজার দোকানকে বলেন ঠিক এই বাক্সটা তাকে তুলতে। দোকান তৈরি হতে শুরু করে।'
        },
        story: {
          title: { en: 'Rubel sends it to the store', bn: 'রুবেল দোকানে পাঠায়' },
          text: {
            en: 'Rubel phones the store: please put this exact numbered box on your shelves. The store clears some space and gets ready, and Rubel goes back to his desk.',
            bn: 'রুবেল দোকানে ফোন করে: ঠিক এই নম্বরের বাক্সটা আপনাদের তাকে তুলুন। দোকান জায়গা খালি করে তৈরি হয়, আর রুবেল নিজের ডেস্কে ফিরে যায়।'
          }
        },
        tech: {
          en: 'The deploy job now runs with the environment’s secrets and tells production which version to run: the exact tag `app:3f9c2a1`, never `latest`. With OIDC, it swaps a short-lived token for cloud access instead of storing a long-lived key.',
          bn: 'deploy job এখন environment-এর secret নিয়ে চলে আর production-কে বলে কোন version চালাতে হবে: ঠিক `app:3f9c2a1` tag, কখনো `latest` নয়। OIDC থাকলে long-lived key জমা না রেখে job একটা short-lived token দিয়ে cloud-এ ঢোকে।'
        }
      },
      {
        id: 'pull',
        moves: [ { edge: 'registry-prod', label: 'docker pull', plain: { en: 'The boxed product', bn: 'বাক্সবন্দী পণ্য' } } ],
        state: { prod: { en: 'Running 3f9c2a1', bn: '3f9c2a1 চলছে' } },
        plainState: { prod: { en: 'New box on shelves', bn: 'নতুন বাক্স তাকে' } },
        title: { en: 'The store collects the box', bn: 'দোকান বাক্সটা নিয়ে যায়' },
        simple: {
          en: 'The store fetches that exact box from the warehouse and unpacks it onto the shelves. Customers now see the new version.',
          bn: 'দোকান গুদাম থেকে ঠিক ওই বাক্সটা এনে তাকে সাজায়। গ্রাহকেরা এখন নতুন সংস্করণটা দেখতে পায়।'
        },
        story: {
          title: { en: 'The store unpacks the box', bn: 'দোকান বাক্স খোলে' },
          text: {
            en: 'A van brings the numbered box from the warehouse. The store opens it, puts the new goods on the shelves, and the first customers start browsing.',
            bn: 'একটা ভ্যান গুদাম থেকে নম্বর দেওয়া বাক্সটা নিয়ে আসে। দোকান সেটা খুলে নতুন মালপত্র তাকে সাজায়, আর প্রথম গ্রাহকেরা ঘুরে দেখতে শুরু করে।'
          }
        },
        tech: {
          en: 'Production pulls `app:3f9c2a1` from the registry and starts it in place of the old version. The image was built once, so the exact bytes that passed the tests are the bytes that run live.',
          bn: 'Production registry থেকে `app:3f9c2a1` pull করে পুরনো version-এর জায়গায় চালু করে। image একবারই বানানো, তাই test-এ যে bytes পাস করেছে ঠিক সেগুলোই live চলে।'
        }
      },
      {
        id: 'tick',
        moves: [
          { edge: 'prod-repo', label: 'green check', plain: { en: 'Green tick', bn: 'সবুজ টিক' } },
          { edge: 'repo-dev', label: 'green check', plain: { en: 'Green tick', bn: 'সবুজ টিক' } }
        ],
        state: { repo: { en: 'All checks green', bn: 'সব check সবুজ' } },
        plainState: { repo: { en: 'Green tick', bn: 'সবুজ টিক' } },
        title: { en: 'The green tick comes back', bn: 'সবুজ টিক ফিরে আসে' },
        simple: {
          en: 'The store reports back, the order desk marks your order with a green tick, and you see it. The change is live.',
          bn: 'দোকান খবর পাঠায়, অর্ডার ডেস্ক আপনার অর্ডারে সবুজ টিক বসায়, আর আপনি সেটা দেখেন। পরিবর্তনটা এখন চালু।'
        },
        story: {
          title: { en: 'Nasrin sees the green tick', bn: 'নাসরিন সবুজ টিক দেখে' },
          text: {
            en: 'The store reports back, and the order desk marks Nasrin’s order with a big green tick. She smiles. Her small change is now in front of real customers.',
            bn: 'দোকান খবর পাঠায়, আর অর্ডার ডেস্ক নাসরিনের অর্ডারে বড় একটা সবুজ টিক বসায়। সে হাসে। তার ছোট পরিবর্তনটা এখন আসল গ্রাহকদের সামনে।'
          }
        },
        tech: {
          en: 'When the deploy step succeeds the job ends green, and GitHub shows its result as a check, which a pull request lists. You can follow a run live with `gh run watch`. Tag by SHA, and the next rollback is one redeploy away.',
          bn: 'deploy step সফল হলে job সবুজ হয়ে শেষ হয়, আর GitHub তার ফল একটা check হিসেবে দেখায়, যা pull request-এ তালিকায় থাকে। `gh run watch` দিয়ে run লাইভ অনুসরণ করা যায়। SHA দিয়ে tag করলে পরের rollback মাত্র একটা redeploy দূরে।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'tests-fail',
      label: { en: 'A check fails', bn: 'একটা পরীক্ষা ব্যর্থ' },
      whatIf: {
        en: 'What if one of the inspectors finds a mistake?',
        bn: 'কোনো পরিদর্শক যদি একটা ভুল ধরে ফেলে?'
      },
      branchAfter: 'install',
      steps: [
        {
          id: 'test-fails',
          work: { node: 'runner', kind: 'error' },
          state: { runner: { en: 'Test failed', bn: 'test ব্যর্থ' } },
          plainState: { runner: { en: 'Found a mistake', bn: 'ভুল পাওয়া গেছে' } },
          title: { en: 'An inspector finds a mistake', bn: 'একজন পরিদর্শক ভুল পায়' },
          simple: {
            en: 'One inspector presses a button and something breaks. The workstation stops right there: the remaining steps are skipped and nothing gets boxed.',
            bn: 'একজন পরিদর্শক বোতাম চাপে আর কিছু একটা ভেঙে যায়। ওয়ার্কস্টেশন ঠিক সেখানেই থেমে যায়: বাকি ধাপ বাদ পড়ে আর কিছুই বাক্সে ওঠে না।'
          },
          story: {
            title: { en: 'Zahid finds a mistake', bn: 'জাহিদ একটা ভুল পায়' },
            text: {
              en: 'Zahid presses a button and something breaks. He frowns, circles the problem in red and stops the work on the spot. Nothing gets boxed, and nothing goes any further.',
              bn: 'জাহিদ একটা বোতাম চাপে আর কিছু একটা ভেঙে যায়। সে ভুরু কুঁচকে সমস্যাটা লাল কালিতে ঘিরে দেয় আর সেখানেই কাজ থামিয়ে দেয়। কিছুই বাক্সে ওঠে না, আর কিছুই এগোয় না।'
            }
          },
          tech: {
            en: 'A test exits with an error, so its step fails and the later steps are skipped. Jobs that list this one in `needs` are skipped too, so the image is never pushed and nothing is deployed.',
            bn: 'একটা test error নিয়ে বেরোয়, তাই তার step ব্যর্থ হয় আর পরের step-গুলো বাদ পড়ে। যে job-গুলোর `needs`-এ এটা আছে সেগুলোও বাদ পড়ে, তাই image কখনো push হয় না আর কিছুই deploy হয় না।'
          }
        },
        {
          id: 'red-cross',
          moves: [
            { edge: 'runner-repo-err', label: 'check failed', plain: { en: 'Red cross', bn: 'লাল ক্রস' } },
            { edge: 'repo-dev-err', label: 'check failed', plain: { en: 'Red cross', bn: 'লাল ক্রস' } }
          ],
          state: { repo: { en: 'Check failed', bn: 'check ব্যর্থ' } },
          plainState: { repo: { en: 'Red cross', bn: 'লাল ক্রস' } },
          title: { en: 'The red cross comes back', bn: 'লাল ক্রস ফিরে আসে' },
          simple: {
            en: 'The order desk marks your order with a red cross and tells you. Nothing was boxed or shipped, so customers never see the broken change.',
            bn: 'অর্ডার ডেস্ক আপনার অর্ডারে লাল ক্রস বসিয়ে আপনাকে জানায়। কিছুই বাক্সে ওঠেনি বা পাঠানো হয়নি, তাই গ্রাহকেরা ভাঙা পরিবর্তনটা কখনো দেখে না।'
          },
          story: {
            title: { en: 'Nasrin gets a red cross', bn: 'নাসরিন লাল ক্রস পায়' },
            text: {
              en: 'The order desk stamps a red cross on Nasrin’s order and tells her. She groans, reads Zahid’s note, fixes the mistake and sends a new order. No customer ever saw the broken one.',
              bn: 'অর্ডার ডেস্ক নাসরিনের অর্ডারে লাল ক্রস বসিয়ে তাকে জানায়। সে গুঙিয়ে ওঠে, জাহিদের নোট পড়ে, ভুলটা ঠিক করে নতুন অর্ডার পাঠায়। ভাঙা অর্ডারটা কোনো গ্রাহক কখনো দেখেনি।'
            }
          },
          tech: {
            en: 'The run ends failed. If this job is a required check, the pull request cannot merge until a new push passes. `gh run view --log-failed` prints only the failed steps’ logs.',
            bn: 'run ব্যর্থ হয়ে শেষ হয়। এই job required check হলে নতুন push পাস না করা পর্যন্ত pull request merge হয় না। `gh run view --log-failed` শুধু ব্যর্থ step-গুলোর log দেখায়।'
          }
        }
      ]
    },
    {
      id: 'rollback',
      label: { en: 'The new box breaks', bn: 'নতুন বাক্স ভেঙে পড়ে' },
      whatIf: {
        en: 'What if the new box breaks once it is in the store?',
        bn: 'নতুন বাক্স দোকানে ওঠার পর যদি ভেঙে পড়ে?'
      },
      branchAfter: 'pull',
      steps: [
        {
          id: 'prod-breaks',
          work: { node: 'prod', kind: 'error' },
          state: { prod: { en: 'Errors rising', bn: 'error বাড়ছে' } },
          plainState: { prod: { en: 'Customers complain', bn: 'গ্রাহকেরা অভিযোগ করছে' } },
          title: { en: 'The new version breaks', bn: 'নতুন সংস্করণ ভেঙে পড়ে' },
          simple: {
            en: 'Customers start complaining: the new box has a problem the inspectors never saw. The store needs the old, working box back, fast.',
            bn: 'গ্রাহকেরা অভিযোগ করতে শুরু করে: নতুন বাক্সে এমন সমস্যা, যা পরিদর্শকেরা কখনো দেখেনি। দোকানের এখন পুরনো, ঠিকমতো চলা বাক্সটা দ্রুত ফেরত দরকার।'
          },
          story: {
            title: { en: 'The store gets complaints', bn: 'দোকান অভিযোগ পায়' },
            text: {
              en: 'Within minutes customers complain to the store: something in the new box is broken, and the inspectors never saw it. Rubel hears about it and acts fast.',
              bn: 'কয়েক মিনিটের মধ্যে গ্রাহকেরা দোকানে অভিযোগ করে: নতুন বাক্সে কিছু একটা ভাঙা, আর পরিদর্শকেরা সেটা কখনো দেখেনি। রুবেল খবর পেয়ে দ্রুত নড়ে ওঠে।'
            }
          },
          tech: {
            en: 'The tests passed, but production broke, perhaps on real data or load the tests never had. Monitoring or a failed health check shows it. Restore the last good version first, then debug.',
            bn: 'test পাস করেছিল, কিন্তু production ভেঙে পড়ল, হয়তো এমন আসল data বা load-এ, যা test-এ ছিল না। monitoring বা ব্যর্থ health check সেটা দেখায়। আগে শেষ ভালো version ফিরিয়ে আনুন, তারপর debug করুন।'
          }
        },
        {
          id: 'redeploy-previous',
          moves: [ { edge: 'gate-prod', label: 'deploy 9d41e0b', plain: { en: 'Ship the old box', bn: 'পুরনো বাক্স পাঠান' } } ],
          state: { prod: { en: 'Back to 9d41e0b', bn: '9d41e0b-তে ফিরেছে' } },
          plainState: { prod: { en: 'Old box back', bn: 'পুরনো বাক্স ফিরেছে' } },
          title: { en: 'The manager ships the old box', bn: 'ম্যানেজার পুরনো বাক্স পাঠান' },
          simple: {
            en: 'The shipping manager signs off the previous box, still on the warehouse shelf, and sends it to the store. Customers get the working version again.',
            bn: 'শিপিং ম্যানেজার আগের বাক্সটা, যা এখনো গুদামের তাকে আছে, অনুমোদন করে দোকানে পাঠান। গ্রাহকেরা আবার চলমান সংস্করণটা পায়।'
          },
          story: {
            title: { en: 'Rubel ships the old box', bn: 'রুবেল পুরনো বাক্স পাঠায়' },
            text: {
              en: 'Rubel signs a new form for the previous numbered box, still on its warehouse shelf, and sends it to the store. The store swaps the boxes, and customers are happy again.',
              bn: 'রুবেল আগের নম্বরের বাক্সটার জন্য, যা এখনো গুদামের তাকে আছে, নতুন একটা ফর্মে সই করে দোকানে পাঠায়। দোকান বাক্স বদলে নেয়, আর গ্রাহকেরা আবার খুশি।'
            }
          },
          tech: {
            en: 'Roll back by deploying the previous image, `app:9d41e0b`, still in the registry. Re-running the old workflow run reuses its commit SHA, and the environment gate asks for approval again.',
            bn: 'আগের image, `app:9d41e0b`, যা এখনো registry-তে আছে, deploy করে rollback করুন। পুরনো workflow run আবার চালালে সেটা একই commit SHA ব্যবহার করে, আর environment gate আবার অনুমোদন চায়।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A factory assembly line works the same way. Every stop has a twin on the factory floor.',
      bn: 'একটা কারখানার অ্যাসেম্বলি লাইনও ঠিক এভাবেই চলে। প্রতিটি স্টপের একটা জোড়া আছে কারখানার মেঝেতে।'
    },
    twins: [
      {
        icon: 'user',
        node: 'dev',
        name: { en: 'You', bn: 'আপনি' },
        d: {
          en: 'Place the order by handing in a finished change.',
          bn: 'শেষ হওয়া একটা পরিবর্তন জমা দিয়ে অর্ডার দেন।'
        }
      },
      {
        icon: 'folder',
        node: 'repo',
        name: { en: 'The order desk', bn: 'অর্ডার ডেস্ক' },
        d: {
          en: 'Writes down each order and starts the assembly line.',
          bn: 'প্রতিটি অর্ডার লিখে রাখে আর অ্যাসেম্বলি লাইন চালু করে।'
        }
      },
      {
        icon: 'worker',
        node: 'runner',
        name: { en: 'The fresh workstation', bn: 'নতুন ওয়ার্কস্টেশন' },
        d: {
          en: 'A clean bench lent for one order, where the work is built and inspected.',
          bn: 'একটা অর্ডারের জন্য ধার দেওয়া পরিষ্কার বেঞ্চ, যেখানে কাজ তৈরি আর যাচাই হয়।'
        }
      },
      {
        icon: 'box',
        node: 'registry',
        name: { en: 'The warehouse', bn: 'গুদাম' },
        d: {
          en: 'Keeps every numbered box, new and old, on its own shelf.',
          bn: 'প্রতিটি নম্বর দেওয়া বাক্স, নতুন আর পুরনো, নিজের তাকে রাখে।'
        }
      },
      {
        icon: 'shield',
        node: 'gate',
        name: { en: 'The shipping manager', bn: 'শিপিং ম্যানেজার' },
        d: {
          en: 'Reads the checklist and signs before anything leaves the building.',
          bn: 'ভবন ছেড়ে কিছু বেরোনোর আগে চেকলিস্ট পড়ে সই করেন।'
        }
      },
      {
        icon: 'server',
        node: 'prod',
        name: { en: 'The store', bn: 'দোকান' },
        d: {
          en: 'Where customers meet the finished goods.',
          bn: 'যেখানে গ্রাহকেরা তৈরি পণ্যের দেখা পায়।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'A broken box', bn: 'ভাঙা বাক্স' },
        is: { en: 'is a failed test or a bad deploy', bn: 'মানে ব্যর্থ test বা খারাপ deploy' },
        d: {
          en: 'If an inspector finds a mistake, the line stops and nothing ships. If a bad box slips through, the store goes back to the old one.',
          bn: 'পরিদর্শক ভুল ধরলে লাইন থেমে যায় আর কিছুই পাঠানো হয় না। খারাপ বাক্স ফসকে গেলে দোকান পুরনোটায় ফিরে যায়।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'What is the difference between CI, continuous delivery and continuous deployment?',
        bn: 'CI, continuous delivery আর continuous deployment-এর পার্থক্য কী?'
      },
      short: {
        en: 'CI merges and tests every change often. Delivery keeps each build ready to release, and deployment releases it automatically.',
        bn: 'CI প্রতিটি পরিবর্তন ঘনঘন merge আর test করে। Delivery প্রতিটি build-কে release-এর জন্য তৈরি রাখে, আর deployment সেটা নিজে থেকেই release করে।'
      },
      deep: {
        en: 'In continuous delivery the final decision to go live is a person’s, such as a required reviewer on an environment. In continuous deployment it happens automatically, with no approval step. Both still need tests you trust.',
        bn: 'Continuous delivery-তে live যাওয়ার শেষ সিদ্ধান্ত একজন মানুষের, যেমন environment-এর required reviewer। Continuous deployment-এ সেটা স্বয়ংক্রিয়ভাবে হয়, কোনো অনুমোদনের ধাপ ছাড়াই। দুটোতেই এমন test লাগে, যাকে আপনি ভরসা করেন।'
      },
      redFlag: {
        en: '“CI/CD is just a deploy script.”',
        bn: '“CI/CD মানে শুধু একটা deploy script।”'
      }
    },
    {
      q: {
        en: 'What is the difference between a workflow, a job, a step and a runner?',
        bn: 'workflow, job, step আর runner-এর পার্থক্য কী?'
      },
      short: {
        en: 'A workflow runs jobs, a job is a list of steps, and each job runs on a runner.',
        bn: 'একটা workflow কয়েকটা job চালায়, job হলো step-এর তালিকা, আর প্রতিটি job একটা runner-এ চলে।'
      },
      deep: {
        en: 'Jobs run in parallel unless `needs` orders them, and each gets its own fresh runner, so they share no filesystem. Pass files between jobs with artifacts. Steps run in order on one runner and share its filesystem. Self-hosted runners are not guaranteed clean.',
        bn: '`needs` ক্রম ঠিক না করলে job-গুলো parallel-এ চলে, আর প্রতিটি পায় নিজের নতুন runner, তাই তারা filesystem ভাগ করে না। job-এর মধ্যে ফাইল পাঠাতে artifact ব্যবহার করুন। step-গুলো এক runner-এ পরপর চলে আর তার filesystem ভাগ করে। Self-hosted runner পরিষ্কার থাকার নিশ্চয়তা নেই।'
      },
      redFlag: {
        en: '“Steps run in parallel”, or “jobs share a filesystem”.',
        bn: '“step-গুলো parallel-এ চলে”, বা “job-গুলো filesystem ভাগ করে”।'
      }
    },
    {
      q: { en: 'How do you handle secrets in a pipeline?', bn: 'pipeline-এ secret কীভাবে সামলাবেন?' },
      short: {
        en: 'Store them as encrypted GitHub secrets, never in the repo, and read them with `${{ secrets.NAME }}`.',
        bn: 'এগুলো encrypted GitHub secret হিসেবে রাখুন, repo-তে কখনো নয়, আর `${{ secrets.NAME }}` দিয়ে পড়ুন।'
      },
      deep: {
        en: 'Secrets are redacted in logs and, except `GITHUB_TOKEN`, not passed to workflows triggered from forks. Environment secrets reach only jobs that pass the environment’s rules. Prefer OIDC, which swaps a short-lived token for cloud access, over a long-lived key.',
        bn: 'secret log-এ ঢাকা পড়ে, আর `GITHUB_TOKEN` ছাড়া fork থেকে চালু হওয়া workflow-তে পাঠানো হয় না। Environment secret শুধু সেই job-এর হাতে পৌঁছায়, যে environment-এর নিয়ম পার হয়েছে। Long-lived key-র বদলে OIDC বেছে নিন, যা cloud-এ ঢুকতে একটা short-lived token দেয়।'
      },
      redFlag: {
        en: '“Put the key in the workflow file, or commit a `.env`.”',
        bn: '“key-টা workflow ফাইলে রেখে দিন, বা `.env` commit করে দিন।”'
      }
    },
    {
      q: { en: 'How do you speed up a slow pipeline?', bn: 'ধীর pipeline কীভাবে দ্রুত করবেন?' },
      short: {
        en: 'Cache dependencies, run independent jobs in parallel and run only what changed.',
        bn: 'dependency cache করুন, স্বাধীন job-গুলো parallel-এ চালান আর শুধু যা বদলেছে তাই চালান।'
      },
      deep: {
        en: '`actions/cache` keys on a lock-file hash, and unused caches are evicted after 7 days, with a default 10 GB cap per repository. Docker builds can reuse layers with `cache-from: type=gha`. Use `paths` filters to skip irrelevant runs and a `matrix` to spread work.',
        bn: '`actions/cache` lock-ফাইলের hash দিয়ে key বানায়, আর ব্যবহার না হওয়া cache 7 দিন পর সরে যায়, ডিফল্টে প্রতি repository-তে 10 GB সীমা। Docker build `cache-from: type=gha` দিয়ে layer আবার ব্যবহার করতে পারে। অপ্রাসঙ্গিক run বাদ দিতে `paths` filter আর কাজ ভাগ করতে `matrix` ব্যবহার করুন।'
      },
      redFlag: {
        en: '“Buy bigger runners first.”',
        bn: '“আগে বড় runner কিনুন।”'
      }
    },
    {
      q: { en: 'How do you deploy safely?', bn: 'নিরাপদে deploy কীভাবে করবেন?' },
      short: {
        en: 'Deploy immutable images tagged with the commit SHA, gate production, and keep rollback easy.',
        bn: 'commit SHA দিয়ে tag করা অপরিবর্তনীয় image deploy করুন, production-এ gate রাখুন, আর rollback সহজ রাখুন।'
      },
      deep: {
        en: 'Tag with `github.sha`, not `latest`, so a rollback is just deploying an older tag. On `pull_request` that value is the merge commit, not the branch head. Use an environment with reviewers and a `concurrency` group so two deploys never overlap, and keep database migrations backward-compatible.',
        bn: '`latest` নয়, `github.sha` দিয়ে tag করুন, তাহলে rollback মানে শুধু পুরনো একটা tag deploy করা। `pull_request`-এ ওই মান merge commit, branch-এর মাথা নয়। reviewer-সহ environment আর `concurrency` group ব্যবহার করুন, যাতে দুটো deploy কখনো একসাথে না চলে, আর database migration পেছনের দিকে সামঞ্জস্যপূর্ণ রাখুন।'
      },
      redFlag: {
        en: '“Deploy `latest` straight to production.”',
        bn: '“সরাসরি production-এ `latest` deploy করুন।”'
      }
    },
    {
      q: { en: 'What can start a workflow?', bn: 'কী কী একটা workflow চালু করতে পারে?' },
      short: {
        en: 'Events listed under `on:`, such as `push`, `pull_request`, a `schedule` or a manual `workflow_dispatch`.',
        bn: '`on:`-এর নিচে লেখা event, যেমন `push`, `pull_request`, একটা `schedule` বা হাতে চালানো `workflow_dispatch`।'
      },
      deep: {
        en: '`schedule` uses POSIX cron, runs only on the default branch and at most every 5 minutes. `workflow_dispatch` works only if the workflow file is on the default branch, and `gh workflow run` fires it. Branch and `paths` filters narrow `push` and `pull_request`.',
        bn: '`schedule` POSIX cron ব্যবহার করে, শুধু default branch-এ চলে আর সর্বোচ্চ প্রতি 5 মিনিটে একবার। `workflow_dispatch` কাজ করে শুধু যদি workflow ফাইলটা default branch-এ থাকে, আর `gh workflow run` সেটা চালায়। Branch আর `paths` filter `push` ও `pull_request`-কে সীমিত করে।'
      },
      redFlag: {
        en: '“Workflows only run when you push.”',
        bn: '“workflow শুধু push করলেই চলে।”'
      }
    },
    {
      q: {
        en: 'Why pin a third-party action to a commit SHA?',
        bn: 'third-party action কেন commit SHA দিয়ে pin করবেন?'
      },
      short: {
        en: 'A tag like `@v7` can be moved. A full commit SHA cannot, so it is the safe pin.',
        bn: '`@v7`-এর মতো tag সরিয়ে নেওয়া যায়। পুরো commit SHA সরানো যায় না, তাই সেটাই নিরাপদ pin।'
      },
      deep: {
        en: 'GitHub says pinning to a full-length commit SHA is currently the only way to use an action as an immutable release. Also set the default `GITHUB_TOKEN` permission to read-only for contents, and raise it per job only where needed.',
        bn: 'GitHub বলে, পুরো দৈর্ঘ্যের commit SHA দিয়ে pin করাই বর্তমানে action-কে অপরিবর্তনীয় release হিসেবে ব্যবহারের একমাত্র উপায়। `GITHUB_TOKEN`-এর ডিফল্ট permission contents-এর জন্য read-only রাখুন, আর শুধু যেখানে দরকার সেই job-এ বাড়ান।'
      },
      redFlag: {
        en: '“Use `@main` so we always get the newest.”',
        bn: '“`@main` ব্যবহার করুন, তাহলে সবসময় নতুনটা পাব।”'
      }
    }
  ],
  cheats: [
    {
      code: 'on: { push: { branches: [main] }, pull_request: {} }',
      d: {
        en: 'Trigger on pushes to main and on pull requests.',
        bn: 'main-এ push আর pull request-এ workflow চালু করুন।'
      }
    },
    {
      code: 'uses: actions/checkout@v7',
      d: {
        en: 'Download your repository onto the runner. v7 is the current major version.',
        bn: 'আপনার repository runner-এ নামান। v7 এখনকার সর্বশেষ major version।'
      }
    },
    {
      code: 'needs: [test]',
      d: {
        en: 'Wait for the test job. If it fails, this job is skipped.',
        bn: 'test job-এর জন্য অপেক্ষা করুন। সেটা ব্যর্থ হলে এই job বাদ পড়ে।'
      }
    },
    {
      code: 'strategy: { matrix: { os: [ubuntu-latest, windows-latest] } }',
      d: {
        en: 'Run the job once for each value or combination.',
        bn: 'প্রতিটি মান বা সংমিশ্রণের জন্য job একবার করে চালান।'
      }
    },
    {
      code: 'uses: actions/cache@v6',
      d: {
        en: 'Restore and save files such as dependencies, keyed on a lock-file hash. v6 is current.',
        bn: 'dependency-র মতো ফাইল restore আর save করুন, lock-ফাইলের hash দিয়ে key বানিয়ে। v6 এখনকার সংস্করণ।'
      }
    },
    {
      code: 'environment: production',
      d: {
        en: 'Use this environment: its secrets and required reviewers apply before the job runs. Read a secret with `${{ secrets.TOKEN }}`.',
        bn: 'এই environment ব্যবহার করুন: job চলার আগে তার secret আর required reviewer প্রযোজ্য হয়। `${{ secrets.TOKEN }}` দিয়ে secret পড়ুন।'
      }
    },
    {
      code: 'gh run view --log-failed',
      d: {
        en: 'Print the logs of only the failed steps in a run.',
        bn: 'একটা run-এর শুধু ব্যর্থ step-গুলোর log দেখুন।'
      }
    },
    {
      code: 'gh run watch --exit-status',
      d: {
        en: 'Follow a run until it ends, exiting non-zero if it fails. `gh run list` shows recent runs.',
        bn: 'run শেষ না হওয়া পর্যন্ত অনুসরণ করুন, ব্যর্থ হলে non-zero exit code দেয়। `gh run list` সাম্প্রতিক run দেখায়।'
      }
    }
  ],
  sources: [
    { label: 'GitHub Docs: understand GitHub Actions', url: 'https://docs.github.com/en/actions/get-started/understand-github-actions' },
    { label: 'GitHub Docs: workflow syntax (needs, matrix, environment, steps)', url: 'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax' },
    { label: 'GitHub Docs: events that trigger workflows', url: 'https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows' },
    { label: 'GitHub Docs: choose the runner for a job', url: 'https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job' },
    { label: 'GitHub Docs: GitHub-hosted runners', url: 'https://docs.github.com/en/actions/concepts/runners/github-hosted-runners' },
    { label: 'GitHub Docs: self-hosted runners', url: 'https://docs.github.com/en/actions/concepts/runners/self-hosted-runners' },
    { label: 'GitHub Docs: exit codes for actions', url: 'https://docs.github.com/en/actions/how-tos/create-and-publish-actions/set-exit-codes' },
    { label: 'GitHub Docs: manage environments (required reviewers)', url: 'https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments' },
    { label: 'GitHub Docs: review deployments', url: 'https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/review-deployments' },
    { label: 'GitHub Docs: control deployments with environments', url: 'https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments' },
    { label: 'GitHub Docs: using secrets in GitHub Actions', url: 'https://docs.github.com/en/actions/how-tos/security-for-github-actions/security-guides/using-secrets-in-github-actions' },
    { label: 'GitHub Docs: OpenID Connect', url: 'https://docs.github.com/en/actions/concepts/security/openid-connect' },
    { label: 'GitHub Docs: OIDC in cloud providers (id-token: write)', url: 'https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-cloud-providers' },
    { label: 'GitHub Docs: secure use of Actions (pin to a SHA)', url: 'https://docs.github.com/en/actions/reference/security/secure-use' },
    { label: 'GitHub Docs: contexts (github.sha)', url: 'https://docs.github.com/en/actions/reference/workflows-and-actions/contexts' },
    { label: 'GitHub Docs: dependency caching reference', url: 'https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching' },
    { label: 'GitHub Docs: workflow artifacts', url: 'https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts' },
    { label: 'GitHub Docs: matrix strategy', url: 'https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations' },
    { label: 'GitHub Docs: concurrency', url: 'https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency' },
    { label: 'GitHub Docs: re-run workflows and jobs', url: 'https://docs.github.com/en/actions/how-tos/manage-workflow-runs/re-run-workflows-and-jobs' },
    { label: 'GitHub Docs: protected branches (required checks)', url: 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches' },
    { label: 'GitHub Docs: publishing Docker images to ghcr.io', url: 'https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images' },
    { label: 'GitHub Docs: continuous integration', url: 'https://docs.github.com/en/actions/get-started/continuous-integration' },
    { label: 'GitHub Docs: continuous deployment', url: 'https://docs.github.com/en/actions/get-started/continuous-deployment' },
    { label: 'AWS: continuous delivery vs continuous deployment', url: 'https://aws.amazon.com/devops/continuous-delivery/' },
    { label: 'Docker Docs: GitHub Actions cache backend', url: 'https://docs.docker.com/build/ci/github-actions/cache/' },
    { label: 'actions/checkout (v7)', url: 'https://github.com/actions/checkout' },
    { label: 'actions/cache (v6)', url: 'https://github.com/actions/cache' },
    { label: 'actions/upload-artifact (v7)', url: 'https://github.com/actions/upload-artifact' },
    { label: 'GitHub CLI: gh run view', url: 'https://cli.github.com/manual/gh_run_view' },
    { label: 'GitHub CLI: gh run watch', url: 'https://cli.github.com/manual/gh_run_watch' },
    { label: 'GitHub CLI: gh run list', url: 'https://cli.github.com/manual/gh_run_list' },
    { label: 'GitHub CLI: gh workflow run', url: 'https://cli.github.com/manual/gh_workflow_run' }
  ]
}
