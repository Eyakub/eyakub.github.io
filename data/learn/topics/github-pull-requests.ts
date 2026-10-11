import type { Topic } from '../types'

export const githubPullRequests: Topic = {
  slug: 'github-pull-requests',
  line: 'git',
  title: { en: 'Pull requests', bn: 'পুল রিকোয়েস্ট' },
  summary: {
    en: 'Lamia’s draft stays off the book until the checks pass and Yusuf agrees. The repository chooses how the draft joins.',
    bn: 'চেক পাস এবং ইউসুফ রাজি না হওয়া পর্যন্ত লামিয়ার খসড়া বইয়ের বাইরে থাকে। খসড়া কীভাবে যোগ দেবে, সেটা রিপোজিটরি ঠিক করে।'
  },
  hook: {
    en: 'Lamia keeps a draft, asks an editor to publish it, and the book changes only when the checks pass.',
    bn: 'লামিয়া একটা খসড়া রাখে, সম্পাদককে ছাপতে বলে, আর চেক পাস করলেই বই বদলায়।'
  },
  story: {
    cast: {
      en: 'Lamia keeps her own draft of a shared book. Yusuf reads the cover note before any page is published.',
      bn: 'লামিয়া একটা শেয়ার করা বইয়ের নিজের খসড়া রাখে। কোনো পাতা ছাপার আগে ইউসুফ কভার নোট পড়ে।'
    }
  },
  takeaway: {
    en: 'A draft stays off the book until robots pass and an editor agrees, and a clash is resolved before it joins.',
    bn: 'খসড়া বইয়ের বাইরে থাকে যতক্ষণ রোবট পাস করে এবং সম্পাদক রাজি হয়, আর সংঘর্ষ মিটলে তবেই সে যোগ দেয়।'
  },
  words: [
    {
      term: { en: 'Her draft (branch)', bn: 'তার খসড়া (branch)' },
      d: { en: 'A copy of the book that stays off the published pages.', bn: 'বইয়ের একটা কপি, যা ছাপা পাতার বাইরে থাকে।' }
    },
    {
      term: { en: 'The desk (pull request)', bn: 'ডেস্ক (pull request)' },
      d: { en: 'The cover note that asks to put her draft into the book.', bn: 'কভার নোট, যা বলে তার খসড়া বইতে রাখতে।' }
    },
    {
      term: { en: 'The spell-check (CI)', bn: 'বানান পরীক্ষা (CI)' },
      d: { en: 'Robots that read the draft and mark it before a person does.', bn: 'রোবট যে খসড়া পড়ে এবং মানুষের আগে দাগ দেয়।' }
    },
    {
      term: { en: 'The editor (review)', bn: 'সম্পাদক (review)' },
      d: { en: 'Yusuf can approve, comment, or ask for a change.', bn: 'ইউসুফ অনুমোদন করতে, মন্তব্য রাখতে, বা বদল চাইতে পারে।' }
    },
    {
      term: { en: 'The book (base)', bn: 'বই (base)' },
      d: { en: 'The published pages. The draft joins them only when the checks pass.', bn: 'ছাপা পাতা। চেক পাস করলে তবেই খসড়া সেখানে যোগ দেয়।' }
    },
    {
      term: { en: 'One clean page (squash)', bn: 'একটা পরিষ্কার পাতা (squash)' },
      d: { en: 'Every draft page folded into one new page in the book.', bn: 'খসড়ার প্রতিটি পাতা বইয়ের একটা নতুন পাতায় ভাঁজ।' }
    }
  ],
  legend: {
    request: { en: 'Asking', bn: 'জিজ্ঞেস' },
    queue: { en: 'Waiting', bn: 'অপেক্ষা' },
    result: { en: 'Published', bn: 'প্রকাশ' },
    error: { en: 'Clash', bn: 'সংঘর্ষ' }
  },
  view: { wide: [1000, 440], narrow: [400, 480] },
  nodeR: { narrow: 20 },
  nodes: {
    lamia: {
      icon: 'user',
      name: { en: 'Author', bn: 'লেখক' },
      sub: { en: 'Writes the draft', bn: 'খসড়া লেখে' },
      plain: { name: { en: 'Lamia', bn: 'লামিয়া' }, sub: { en: 'The writer', bn: 'লেখিকা' } },
      wide: [170, 100, 'up'],
      narrow: [160, 48, 'left']
    },
    draft: {
      icon: 'folder',
      name: { en: 'Head branch', bn: 'হেড ব্রাঞ্চ' },
      sub: { en: 'Her commits', bn: 'তার কমিট' },
      plain: { name: { en: 'Her draft', bn: 'তার খসড়া' }, sub: { en: 'A copy', bn: 'এক কপি' } },
      wide: [440, 100, 'up'],
      narrow: [160, 140, 'left']
    },
    desk: {
      icon: 'mail',
      name: { en: 'Pull request', bn: 'পুল রিকোয়েস্ট' },
      sub: { en: 'Head into base', bn: 'হেড থেকে বেস' },
      plain: { name: { en: 'The desk', bn: 'ডেস্ক' }, sub: { en: 'The note', bn: 'নোট' } },
      wide: [720, 100, 'up'],
      narrow: [160, 232, 'left']
    },
    editor: {
      icon: 'user',
      name: { en: 'Reviewer', bn: 'রিভিউয়ার' },
      sub: { en: 'Approve or ask', bn: 'অনুমোদন বা প্রশ্ন' },
      plain: { name: { en: 'Yusuf', bn: 'ইউসুফ' }, sub: { en: 'The editor', bn: 'সম্পাদক' } },
      wide: [440, 270, 'down'],
      narrow: [160, 324, 'left']
    },
    book: {
      icon: 'archive',
      name: { en: 'Base branch', bn: 'বেস ব্রাঞ্চ' },
      sub: { en: 'Published', bn: 'প্রকাশিত' },
      plain: { name: { en: 'The book', bn: 'বই' }, sub: { en: 'The pages', bn: 'পাতা' } },
      wide: [840, 270, 'down'],
      narrow: [160, 416, 'left']
    }
  },
  corridors: {
    'lamia-draft': {
      wide: [[170, 100], [440, 100]],
      narrow: [[160, 48], [330, 48], [330, 140], [160, 140]]
    },
    'draft-desk': {
      wide: [[440, 100], [720, 100]],
      narrow: [[160, 140], [330, 140], [330, 232], [160, 232]]
    },
    'editor-desk': {
      wide: [[440, 270], [440, 185], [720, 185], [720, 100]],
      narrow: [[160, 324], [330, 324], [330, 232], [160, 232]]
    },
    'desk-book': {
      wide: [[720, 100], [800, 100], [800, 270], [840, 270]],
      narrow: [[160, 232], [330, 232], [330, 416], [160, 416]]
    },
    'book-lamia': {
      wide: [[840, 270], [960, 270], [960, 400], [170, 400], [170, 100]],
      narrow: [[160, 416], [300, 416], [300, 48], [160, 48]]
    }
  },
  edges: {
    'lamia-draft': { from: 'lamia', to: 'draft', kind: 'request' },
    'draft-desk': { from: 'draft', to: 'desk', kind: 'request' },
    'editor-desk': { from: 'editor', to: 'desk', kind: 'request' },
    'desk-book': { from: 'desk', to: 'book', kind: 'result' },
    'book-lamia': { from: 'book', to: 'lamia', kind: 'result' }
  },
  main: {
    label: { en: 'Publish a draft', bn: 'একটা খসড়া ছাপুন' },
    steps: [
      {
        id: 'copy',
        moves: [{ edge: 'lamia-draft', label: 'Own draft', plain: { en: 'She copies', bn: 'সে কপি করে' } }],
        state: { draft: { en: 'Branch', bn: 'ব্রাঞ্চ' } },
        plainState: { draft: { en: 'Her copy', bn: 'তার কপি' } },
        story: {
          title: { en: 'She copies the book', bn: 'সে বই কপি করে' },
          text: {
            en: 'Lamia copies the published book into her own draft. The pages already in the book stay as they are.',
            bn: 'লামিয়া ছাপা বইটার একটা নিজের খসড়া বানায়। বইয়ে যা আছে, তা আগের মতোই থাকে।'
          }
        },
        title: { en: 'She copies the book', bn: 'সে বই কপি করে' },
        simple: {
          en: 'Lamia copies the book into her own draft so the published pages stay as they are.',
          bn: 'লামিয়া বইটার একটা নিজের খসড়া বানায়, যাতে ছাপা পাতা আগের মতোই থাকে।'
        },
        tech: {
          en: 'A feature branch starts from an up-to-date base. A fork is a separate repository under her account when she cannot write the book. A branch stays inside one repository.',
          bn: 'একটা ফিচার ব্রাঞ্চ আপ-টু-ডেট বেস থেকে শুরু হয়। লেখার অনুমতি না থাকলে ফর্ক তার অ্যাকাউন্টের আলাদা রিপোজিটরি। ব্রাঞ্চ একটা রিপোজিটরির ভেতরেই থাকে।'
        }
      },
      {
        id: 'send',
        moves: [{ edge: 'draft-desk', label: 'The pages', plain: { en: 'She sends', bn: 'সে পাঠায়' } }],
        state: { desk: { en: 'Pushed', bn: 'পাঠানো' } },
        plainState: { desk: { en: 'Pages in', bn: 'পাতা এসেছে' } },
        story: {
          title: { en: 'She sends the draft', bn: 'সে খসড়া পাঠায়' },
          text: {
            en: 'Lamia sends the pages of her draft to the desk. Nothing in the published book changes yet.',
            bn: 'লামিয়া খসড়ার পাতা ডেস্কে পাঠায়। ছাপা বইয়ে এখনো কিছু বদলায় না।'
          }
        },
        title: { en: 'She sends the draft', bn: 'সে খসড়া পাঠায়' },
        simple: {
          en: 'She sends her draft to the desk. The book still shows the published pages.',
          bn: 'সে খসড়া ডেস্কে পাঠায়। বই এখনো ছাপা পাতাই দেখায়।'
        },
        tech: {
          en: 'The first push of the branch sets its upstream. After the branch is on GitHub, she can open a pull request from it.',
          bn: 'ব্রাঞ্চের প্রথম পুশ তার আপস্ট্রিম ঠিক করে। ব্রাঞ্চ GitHub-এ উঠলে সেখান থেকে একটা পুল রিকোয়েস্ট খোলা যায়।'
        }
      },
      {
        id: 'ask',
        work: { node: 'desk', kind: 'queue' },
        state: { desk: { en: 'Open', bn: 'খোলা' } },
        plainState: { desk: { en: 'Note pinned', bn: 'নোট আটকানো' } },
        story: {
          title: { en: 'She asks to publish', bn: 'সে ছাপতে চায়' },
          text: {
            en: 'The cover note asks Yusuf to publish this draft in the book. The book stays unchanged until he agrees.',
            bn: 'কভার নোট ইউসুফকে বলে এই খসড়া বইতে ছাপতে। সে রাজি না হওয়া পর্যন্ত বই বদলায় না।'
          }
        },
        title: { en: 'She asks to publish', bn: 'সে ছাপতে চায়' },
        simple: {
          en: 'She pins a cover note that asks the editor to put this draft into the book.',
          bn: 'সে একটা কভার নোট আটকায়, যেখানে সম্পাদককে বলে এই খসড়া বইতে রাখতে।'
        },
        tech: {
          en: 'A pull request asks to merge the head branch into the base. It carries a title, a description, and the diff. A closing keyword such as Fixes ties an issue only when this lands on the default branch.',
          bn: 'একটা পুল রিকোয়েস্ট হেড ব্রাঞ্চকে বেসে মার্জ করতে চায়। সেখানে টাইটেল, বিবরণ, এবং ডিফ থাকে। Fixes-এর মতো বন্ধ করার শব্দ তখনই ইস্যু বাঁধে, যখন এটা ডিফল্ট ব্রাঞ্চে নামে।'
        }
      },
      {
        id: 'check',
        work: { node: 'desk', kind: 'queue' },
        state: { desk: { en: 'Checks', bn: 'চেক' } },
        plainState: { desk: { en: 'Robots reading', bn: 'রোবট পড়ছে' } },
        story: {
          title: { en: 'Robots read the draft', bn: 'রোবট খসড়া পড়ে' },
          text: {
            en: 'Robots read the draft and leave a mark. Yusuf can wait for that mark before he reads.',
            bn: 'রোবট খসড়া পড়ে একটা দাগ রাখে। ইউসুফ পড়ার আগে সেই দাগের জন্য অপেক্ষা করতে পারে।'
          }
        },
        title: { en: 'Robots read the draft', bn: 'রোবট খসড়া পড়ে' },
        simple: {
          en: 'Robots read the draft and mark it before Yusuf opens the note.',
          bn: 'ইউসুফ নোট খোলার আগে রোবট খসড়া পড়ে দাগ দেয়।'
        },
        tech: {
          en: 'Workflows triggered by pull_request report a status. A protected branch can require checks to be successful, skipped, or neutral. Requiring the branch to be up to date is a separate option.',
          bn: 'pull_request-এ চলা ওয়ার্কফ্লো একটা স্ট্যাটাস জানায়। প্রোটেক্টেড ব্রাঞ্চ চেককে সফল, স্কিপড, বা নিউট্রাল হতে বলতে পারে। ব্রাঞ্চ আপ টু ডেট থাকা আলাদা একটা অপশন।'
        }
      },
      {
        id: 'read',
        moves: [{ edge: 'editor-desk', label: 'His notes', plain: { en: 'He reads', bn: 'সে পড়ে' } }],
        state: { editor: { en: 'Reviewing', bn: 'পড়ছে' } },
        plainState: { editor: { en: 'Reading', bn: 'পড়ছে' } },
        story: {
          title: { en: 'The editor reads it', bn: 'সম্পাদক পড়ে' },
          text: {
            en: 'Yusuf reads the draft. He can approve it, leave a note, or ask Lamia to change a page.',
            bn: 'ইউসুফ খসড়া পড়ে। সে অনুমোদন করতে পারে, একটা নোট রাখতে পারে, অথবা লামিয়াকে একটা পাতা বদলাতে বলতে পারে।'
          }
        },
        title: { en: 'The editor reads it', bn: 'সম্পাদক পড়ে' },
        simple: {
          en: 'Yusuf can approve the draft, leave a comment, or ask Lamia to change it.',
          bn: 'ইউসুফ খসড়া অনুমোদন করতে, মন্তব্য রাখতে, অথবা লামিয়াকে বদলাতে বলতে পারে।'
        },
        tech: {
          en: 'A review can comment, approve, or request changes. Protection can require a set number of approvals and a code owner. Dismissing an old approval after a new push is a setting, not the default.',
          bn: 'একটা রিভিউ মন্তব্য, অনুমোদন, বা বদল চাইতে পারে। প্রোটেকশন নির্দিষ্ট সংখ্যক অনুমোদন এবং একজন কোড ওনার চাইতে পারে। নতুন পুশের পর পুরনো অনুমোদন বাতিল করা একটা সেটিং, ডিফল্ট নয়।'
        }
      },
      {
        id: 'join',
        moves: [{ edge: 'desk-book', label: 'Published', plain: { en: 'Into the book', bn: 'বইয়ের ভেতরে' } }],
        state: { book: { en: 'Merged', bn: 'মার্জ' } },
        plainState: { book: { en: 'Joined', bn: 'যোগ দিয়েছে' } },
        story: {
          title: { en: 'The draft joins the book', bn: 'খসড়া বইতে যোগ দেয়' },
          text: {
            en: 'The draft joins the book after the robots pass and Yusuf agrees. The desk can keep every page or fold them into one.',
            bn: 'রোবট পাস করলে এবং ইউসুফ রাজি হলে খসড়া বইতে যোগ দেয়। ডেস্ক প্রতিটি পাতা রাখতে পারে, অথবা এক পাতায় ভাঁজ করতে পারে।'
          }
        },
        title: { en: 'The draft joins the book', bn: 'খসড়া বইতে যোগ দেয়' },
        simple: {
          en: 'The draft joins the book only after the robots pass and Yusuf agrees.',
          bn: 'রোবট পাস করলে এবং ইউসুফ রাজি হলে তবেই খসড়া বইতে যোগ দেয়।'
        },
        tech: {
          en: 'A merge commit keeps the branch commits and adds a merge point, and GitHub uses no fast-forward for it. Squash folds them into one commit. Rebase and merge replays each commit as a new identity with no merge commit. The repository chooses which are allowed.',
          bn: 'একটা মার্জ কমিট ব্রাঞ্চের কমিট রাখে এবং একটা মার্জ পয়েন্ট যোগ করে, আর GitHub সেটায় ফাস্ট-ফরওয়ার্ড ব্যবহার করে না। স্কোয়াশ সেগুলোকে এক কমিটে ভাঁজ করে। রিবেস অ্যান্ড মার্জ প্রতিটি কমিটকে নতুন পরিচয়ে আবার বসায়, মার্জ কমিট ছাড়া। কোনগুলো চালু, সেটা রিপোজিটরি ঠিক করে।'
        }
      },
      {
        id: 'tidy',
        moves: [{ edge: 'book-lamia', label: 'Update', plain: { en: 'She updates', bn: 'আপডেট' } }],
        state: { lamia: { en: 'Synced', bn: 'মিলেছে' } },
        plainState: { lamia: { en: 'Updated', bn: 'আপডেট' } },
        story: {
          title: { en: 'She updates her own copy', bn: 'সে নিজের কপি আপডেট করে' },
          text: {
            en: 'Lamia brings the published pages into her own copy. The draft can stay or go.',
            bn: 'লামিয়া ছাপা পাতা নিজের কপিতে আনে। খসড়া থাকতে পারে, যেতেও পারে।'
          }
        },
        title: { en: 'She updates her own copy', bn: 'সে নিজের কপি আপডেট করে' },
        simple: {
          en: 'Lamia updates her own copy from the book. Throwing the draft away is her choice.',
          bn: 'লামিয়া নিজের কপি বই থেকে আপডেট করে। খসড়া ফেলে দেওয়া তার ইচ্ছে।'
        },
        tech: {
          en: 'Deleting the head branch after the merge is optional. She switches to the base and pulls. She does not force-push the shared book.',
          bn: 'মার্জের পর হেড ব্রাঞ্চ মুছে ফেলা ঐচ্ছিক। সে বেসে গিয়ে পুল করে। শেয়ার করা বইয়ে সে ফোর্স-পুশ করে না।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'clash',
      label: { en: 'Same lines', bn: 'একই লাইন' },
      branchAfter: 'ask',
      whatIf: { en: 'What if the book changed the same lines as her draft?', bn: 'বই যদি তার খসড়ার একই লাইন বদলায়?' },
      steps: [
        {
          id: 'behind',
          work: { node: 'desk', kind: 'queue' },
          state: { desk: { en: 'Behind', bn: 'পেছনে' } },
          plainState: { desk: { en: 'Book moved', bn: 'বই এগিয়েছে' } },
          story: {
            title: { en: 'The book moved', bn: 'বই এগিয়েছে' },
            text: {
              en: 'The book gained new pages while her draft sat at the desk. She has to catch up before it can join.',
              bn: 'খসড়া ডেস্কে থাকতে থাকতে বইয়ে নতুন পাতা যোগ হয়েছে। যোগ দেওয়ার আগে তাকে ধরে উঠতে হবে।'
            }
          },
          title: { en: 'The book moved', bn: 'বই এগিয়েছে' },
          simple: {
            en: 'The book gained new pages while her draft sat at the desk.',
            bn: 'খসড়া ডেস্কে থাকতে থাকতে বইয়ে নতুন পাতা যোগ হয়েছে।'
          },
          tech: {
            en: 'The base moved, so the pull request is behind. She can merge the base into the head, or rebase onto the base. A rebase rewrites commits, so the next push of a shared draft uses a lease, not a blind force.',
            bn: 'বেস এগিয়েছে, তাই পুল রিকোয়েস্ট পেছনে। সে বেসকে হেডে মার্জ করতে পারে, অথবা বেসের উপর রিবেস করতে পারে। রিবেস কমিট নতুন করে লেখে, তাই শেয়ার করা খসড়ার পরের পুশে লিজ লাগে, অন্ধ ফোর্স নয়।'
          }
        },
        {
          id: 'overlap',
          work: { node: 'desk', kind: 'error' },
          state: { desk: { en: 'Conflict', bn: 'সংঘর্ষ' } },
          plainState: { desk: { en: 'Same lines', bn: 'একই লাইন' } },
          story: {
            title: { en: 'The same lines clash', bn: 'একই লাইনে সংঘর্ষ' },
            text: {
              en: 'Both sides edited the same lines. Lamia chooses the words, then the robots read the draft again.',
              bn: 'দুই দিক একই লাইন বদলেছে। লামিয়া কথা বেছে নেয়, তারপর রোবট খসড়া আবার পড়ে।'
            }
          },
          title: { en: 'The same lines clash', bn: 'একই লাইনে সংঘর্ষ' },
          simple: {
            en: 'Both sides edited the same lines. She must choose the words before the draft can join.',
            bn: 'দুই দিক একই লাইন বদলেছে। যোগ দেওয়ার আগে তাকে কথা বেছে নিতে হবে।'
          },
          tech: {
            en: 'Git stops when both sides edited the same lines. She resolves the clash, commits, and pushes. Checks run again. A protected branch can refuse the merge until required checks are successful, skipped, or neutral.',
            bn: 'দুই দিক একই লাইন বদলালে Git থেমে যায়। সে সংঘর্ষ মেটায়, কমিট করে, এবং পুশ করে। চেক আবার চলে। প্রোটেক্টেড ব্রাঞ্চ মার্জ আটকাতে পারে, যতক্ষণ দরকারি চেক সফল, স্কিপড, বা নিউট্রাল না হয়।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A shared book. Her draft is a copy, the desk is the cover note, and the book changes only when the checks pass and the editor agrees.',
      bn: 'একটা শেয়ার করা বই। তার খসড়া একটা কপি, ডেস্ক হলো কভার নোট, আর চেক পাস এবং সম্পাদক রাজি হলে তবেই বই বদলায়।'
    },
    twins: [
      { node: 'lamia', icon: 'user', name: { en: 'Lamia', bn: 'লামিয়া' }, d: { en: 'The writer who keeps a draft and asks for it to be published.', bn: 'লেখিকা যে একটা খসড়া রাখে এবং সেটা ছাপতে চায়।' } },
      { node: 'draft', icon: 'folder', name: { en: 'Her draft', bn: 'তার খসড়া' }, d: { en: 'A copy of the book. The published pages stay put while she writes.', bn: 'বইয়ের একটা কপি। সে লিখতে থাকলেও ছাপা পাতা স্থির থাকে।' } },
      { node: 'desk', icon: 'mail', name: { en: 'The desk', bn: 'ডেস্ক' }, d: { en: 'The cover note that asks the editor to put this draft into the book.', bn: 'কভার নোট, যা সম্পাদককে বলে এই খসড়া বইতে রাখতে।' } },
      { node: 'editor', icon: 'user', name: { en: 'Yusuf', bn: 'ইউসুফ' }, d: { en: 'The editor who approves, comments, or asks for a change.', bn: 'সম্পাদক যে অনুমোদন করে, মন্তব্য রাখে, অথবা বদল চায়।' } },
      { node: 'book', icon: 'archive', name: { en: 'The book', bn: 'বই' }, d: { en: 'The published pages. The draft joins them only after the checks pass.', bn: 'ছাপা পাতা। চেক পাস করলে তবেই খসড়া সেখানে যোগ দেয়।' } }
    ]
  },
  qa: [
    {
      q: { en: 'What is the difference between a merge commit, squash, and rebase and merge?', bn: 'মার্জ কমিট, স্কোয়াশ, এবং রিবেস অ্যান্ড মার্জের পার্থক্য কী?' },
      short: { en: 'A merge commit keeps the commits and adds a merge point. Squash makes one commit. Rebase and merge replays each commit with a new identity and no merge commit.', bn: 'মার্জ কমিট কমিটগুলো রাখে এবং একটা মার্জ পয়েন্ট যোগ করে। স্কোয়াশ একটা কমিট বানায়। রিবেস অ্যান্ড মার্জ প্রতিটি কমিটকে নতুন পরিচয়ে আবার বসায়, মার্জ কমিট ছাড়া।' },
      deep: { en: 'GitHub can allow any mix of the three, and the person merging chooses when more than one is on. A merge commit uses no fast-forward, so the branch commits stay and a merge commit joins them. Squash folds every commit on the pull request into one new commit and fast-forwards. Rebase and merge adds each commit onto the base with no merge commit, and GitHub always writes a new committer and new commit identities. A local rebase does not always change the committer. A merge queue removes the choice.', bn: 'GitHub তিনটার যেকোনো মিশ্রণ চালু রাখতে পারে, আর একাধিক চালু থাকলে যে মার্জ করে সে বাছে। মার্জ কমিট ফাস্ট-ফরওয়ার্ড ব্যবহার করে না, তাই ব্রাঞ্চের কমিট থাকে এবং একটা মার্জ কমিট তাদের যোগ করে। স্কোয়াশ পুল রিকোয়েস্টের প্রতিটি কমিটকে একটা নতুন কমিটে ভাঁজ করে এবং ফাস্ট-ফরওয়ার্ড করে। রিবেস অ্যান্ড মার্জ প্রতিটি কমিটকে বেসের উপর বসায়, মার্জ কমিট ছাড়া, আর GitHub সবসময় নতুন কমিটার এবং নতুন কমিট পরিচয় লেখে। লোকাল রিবেস সবসময় কমিটার বদলায় না। একটা মার্জ কিউ বাছাইটা সরিয়ে দেয়।' },
      redFlag: { en: '“The three methods leave the same history.”', bn: '“তিনটি পদ্ধতি একই ইতিহাস রাখে।”' }
    },
    {
      q: { en: 'What is a fork, a branch, and a clone?', bn: 'ফর্ক, ব্রাঞ্চ, এবং ক্লোন কী?' },
      short: { en: 'A branch lives inside one repository. A fork is a separate repository. A clone is a copy on her computer.', bn: 'একটা ব্রাঞ্চ একটা রিপোজিটরির ভেতরে থাকে। ফর্ক আলাদা একটা রিপোজিটরি। ক্লোন তার কম্পিউটারের একটা কপি।' },
      deep: { en: 'People without write access use a fork. A team with write access uses a branch in the same repository. With the exception of GITHUB_TOKEN, secrets are not passed to a workflow that a fork pull request triggers, and that token is read-only on pull_request from a fork. pull_request_target runs from the base repository and does receive secrets, so checking out the fork’s code there is the risk.', bn: 'লেখার অনুমতি না থাকলে মানুষ ফর্ক ব্যবহার করে। লেখার অনুমতি থাকলে দল একই রিপোজিটরিতে ব্রাঞ্চ ব্যবহার করে। GITHUB_TOKEN ছাড়া সিক্রেট সেই ওয়ার্কফ্লোতে যায় না যা একটা ফর্ক পুল রিকোয়েস্ট চালায়, আর ফর্ক থেকে pull_request-এ সেই টোকেন রিড-অনলি। pull_request_target বেস রিপোজিটরি থেকে চলে এবং সিক্রেট পায়, তাই সেখানে ফর্কের কোড চেক আউট করাই ঝুঁকি।' },
      redFlag: { en: '“A fork, a branch, and a clone are the same thing.”', bn: '“ফর্ক, ব্রাঞ্চ, এবং ক্লোন একই জিনিস।”' }
    },
    {
      q: { en: 'What can a protected branch require?', bn: 'একটা প্রোটেক্টেড ব্রাঞ্চ কী চাইতে পারে?' },
      short: { en: 'A set number of approvals, a code owner, and checks that are successful, skipped, or neutral. Requiring a pull request does not by itself require an approval.', bn: 'নির্দিষ্ট সংখ্যক অনুমোদন, একজন কোড ওনার, এবং সফল, স্কিপড, বা নিউট্রাল চেক। পুল রিকোয়েস্ট বাধ্য করলেই অনুমোদন বাধ্য হয় না।' },
      deep: { en: 'Requiring a pull request before merging does not by itself require an approval. The required count is a setting, from zero to six in the API, or a review from a code owner. Request changes from an admin blocks until that person approves or someone with write or admin dismisses it. Dismissing stale approvals when the diff changes is optional, not the default. Requiring approval of the latest reviewable push is a separate option and is off unless set. Requiring the branch to be up to date is an extra checkbox. Admins can be included or exempt.', bn: 'মার্জের আগে পুল রিকোয়েস্ট বাধ্য করলেই অনুমোদন বাধ্য হয় না। দরকারি সংখ্যা একটা সেটিং, এপিআই-তে শূন্য থেকে ছয়, অথবা একজন কোড ওনারের রিভিউ। একজন অ্যাডমিনের বদল চাওয়া আটকে রাখে, যতক্ষণ সে অনুমোদন না করে অথবা রাইট বা অ্যাডমিন কেউ সেটা বাতিল না করে। ডিফ বদলালে পুরনো অনুমোদন বাতিল করা ঐচ্ছিক, ডিফল্ট নয়। সাম্প্রতিক রিভিউযোগ্য পুশের অনুমোদন চাওয়া আলাদা অপশন এবং সেট না করলে বন্ধ। ব্রাঞ্চ আপ টু ডেট থাকা অতিরিক্ত একটা চেকবক্স। অ্যাডমিনকে ধরা যায়, ছাড়ও দেওয়া যায়।' },
      redFlag: { en: '“Trust people not to write in the book.”', bn: '“বিশ্বাস করুন মানুষ বইয়ে লিখবে না।”' }
    },
    {
      q: { en: 'How do you keep a review small?', bn: 'একটা রিভিউ ছোট রাখবেন কীভাবে?' },
      short: { en: 'One concern, the tests that prove it, and a title that says what changed. That is practice, not a rule of the site.', bn: 'একটা বিষয়, যে টেস্ট সেটা প্রমাণ করে, আর একটা টাইটেল যা বলে কী বদলাল। এটা চর্চা, সাইটের নিয়ম নয়।' },
      deep: { en: 'Draft pull requests are for early feedback. Stacked pull requests are a convention for a large change. Mixing a rename with a behaviour change makes the diff hard to read. None of this is required by GitHub.', bn: 'ড্রাফট পুল রিকোয়েস্ট আগের মতামতের জন্য। স্তূপ করা পুল রিকোয়েস্ট বড় বদলের একটা রীতি। নাম বদল আর আচরণ বদল একসাথে মেশালে ডিফ পড়া কঠিন। GitHub এগুলোর কোনোটাই বাধ্য করে না।' },
      redFlag: { en: '“One huge request means fewer reviews.”', bn: '“একটা বিশাল অনুরোধ মানে কম রিভিউ।”' }
    },
    {
      q: { en: 'How does she update when the book gains pages?', bn: 'বইয়ে নতুন পাতা এলে সে কীভাবে আপডেট করে?' },
      short: { en: 'Merge the book into the draft, or rebase the draft onto the book and push with a lease.', bn: 'বইকে খসড়ায় মার্জ করুন, অথবা খসড়াকে বইয়ের উপর রিবেস করে লিজসহ পুশ করুন।' },
      deep: { en: 'Merging the base into the head adds a merge commit on the draft and is the safer update when other people share that draft. Rebase rewrites the draft’s commits. The next push then needs --force-with-lease, which refuses if the remote moved since the last fetch. It is not safe against every race. A blind --force can throw away someone else’s push.', bn: 'বেসকে হেডে মার্জ করলে খসড়ায় একটা মার্জ কমিট যোগ হয়, আর অন্য মানুষ সেই খসড়া শেয়ার করলে এটাই নিরাপদ আপডেট। রিবেস খসড়ার কমিট নতুন করে লেখে। পরের পুশে তখন --force-with-lease লাগে, যা শেষ ফেচের পর রিমোট সরে গেলে না করে। প্রতিটি রেসের বিরুদ্ধে এটা নিরাপদ নয়। অন্ধ --force অন্য কারো পুশ ফেলে দিতে পারে।' },
      redFlag: { en: '“Push with a blind force and hope.”', bn: '“অন্ধ ফোর্স দিয়ে পুশ করুন এবং আশা করুন।”' }
    }
  ],
  cheats: [
    { code: 'git switch -c feat/x', d: { en: 'Start a draft branch from the current pages.', bn: 'বর্তমান পাতা থেকে একটা খসড়া ব্রাঞ্চ শুরু করুন।' } },
    { code: 'git push -u origin feat/x', d: { en: 'Send the draft and remember its upstream.', bn: 'খসড়া পাঠান এবং তার আপস্ট্রিম মনে রাখুন।' } },
    { code: 'gh pr create --title "New page" --body "Adds the ending."', d: { en: 'Open the request with a title and a note.', bn: 'একটা টাইটেল এবং একটা নোট দিয়ে অনুরোধ খুলুন।' } },
    { code: 'gh pr merge --squash --delete-branch', d: { en: 'Fold it into one commit. Deleting the branch is this flag, not the default.', bn: 'একটা কমিটে ভাঁজ করুন। ব্রাঞ্চ মোছা এই ফ্ল্যাগ, ডিফল্ট নয়।' } },
    { code: 'git fetch origin && git rebase origin/main && git push --force-with-lease', d: { en: 'Replay onto the book, then push only if nobody else moved the draft.', bn: 'বইয়ের উপর আবার বসান, তারপর পুশ করুন শুধু যদি অন্য কেউ খসড়া না সরিয়ে থাকে।' } }
  ],
  sources: [
    { label: 'About pull request merges', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges' },
    { label: 'About protected branches', url: 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches' },
    { label: 'Using secrets in GitHub Actions', url: 'https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions' },
    { label: 'Linking a pull request to an issue', url: 'https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue' }
  ],
  film: {
    src: '/learn/github-pull-requests.mp4',
    note: {
      en: 'git pull updates local main after the merge. It does not merge the pull request.',
      bn: 'git pull মার্জের পরে লোকাল main আপডেট করে। এটা পুল রিকোয়েস্ট মার্জ করে না।'
    }
  }
}
