import type { Topic } from '../types'
import { UI } from '../ui'

export const gitBasics: Topic = {
  slug: 'git-basics',
  line: 'git',
  title: { en: 'Git basics', bn: 'Git-এর শুরু' },
  summary: {
    en: 'How a change travels from your editor into a commit, up to GitHub, and back down to your teammates.',
    bn: 'একটা পরিবর্তন কীভাবে আপনার এডিটর থেকে commit হয়ে GitHub-এ যায়, আর সেখান থেকে সহকর্মীদের কাছে ফিরে আসে।'
  },
  hook: {
    en: 'Git is a photo album for your files. It remembers every version, so you can undo mistakes and work with others.',
    bn: 'Git হলো আপনার ফাইলের ফটো অ্যালবাম। এটা প্রতিটি ভার্সন মনে রাখে, তাই ভুল ফেরানো আর অন্যের সাথে কাজ করা সহজ হয়।'
  },
  takeaway: {
    en: 'Save in your own album, share when ready, and fetch before you merge.',
    bn: 'নিজের অ্যালবামে সেভ করুন, তৈরি হলে শেয়ার করুন, আর মেলানোর আগে ডাউনলোড করে দেখুন।'
  },
  words: [
    {
      term: { en: 'Git', bn: 'Git' },
      d: {
        en: 'A tool that remembers every saved version of your files.',
        bn: 'যে টুল আপনার ফাইলের প্রতিটি সেভ করা ভার্সন মনে রাখে।'
      }
    },
    {
      term: { en: 'Commit', bn: 'সেভ করা পাতা (commit)' },
      d: {
        en: 'A saved page in your album: a permanent snapshot of your files.',
        bn: 'অ্যালবামে আটকানো একটা পাতা: আপনার ফাইলের স্থায়ী স্ন্যাপশট।'
      }
    },
    {
      term: { en: 'GitHub', bn: 'GitHub' },
      d: {
        en: 'A website that keeps a shared copy of your project online.',
        bn: 'যে ওয়েবসাইটে আপনার প্রজেক্টের একটা শেয়ার করা কপি অনলাইনে থাকে।'
      }
    },
    {
      term: { en: 'Branch', bn: 'ব্রাঞ্চ' },
      d: {
        en: 'A sticky note marking one saved page, so you can find your place.',
        bn: 'একটা সেভ করা পাতায় লাগানো স্টিকি নোট, যাতে নিজের জায়গা খুঁজে পান।'
      }
    },
    {
      term: { en: 'Fetch', bn: 'ডাউনলোড (fetch)' },
      d: {
        en: 'Downloading what others did, without changing your own files.',
        bn: 'অন্যরা যা করেছে তা নামিয়ে আনা, আপনার নিজের ফাইল না বদলে।'
      }
    },
    {
      term: { en: 'Merge', bn: 'মেলানো (merge)' },
      d: {
        en: 'Combining two people’s work into one shared history.',
        bn: 'দুজনের কাজ জুড়ে এক ইতিহাস বানানো।'
      }
    }
  ],
  legend: {
    request: { en: 'Your work moving on', bn: 'এগিয়ে যাওয়া আপনার কাজ' },
    queue: { en: 'Something to notice', bn: 'লক্ষ করার মতো কিছু' },
    result: { en: 'News arriving', bn: 'আসা খবর' },
    error: { en: 'A clash', bn: 'একটা সংঘাত' }
  },
  view: { wide: [ 820, 380 ], narrow: [ 400, 540 ] },
  nodes: {
    wd: {
      icon: 'folder',
      name: { en: 'Working directory', bn: 'Working directory' },
      sub: { en: 'Files you edit', bn: 'যে ফাইল আপনি বদলান' },
      plain: {
        name: { en: 'Messy desk', bn: 'এলোমেলো ডেস্ক' },
        sub: { en: 'Where you edit', bn: 'যেখানে বদলান' }
      },
      wide: [ 80, 110, 'up' ],
      narrow: [ 80, 60, 'right' ]
    },
    idx: {
      icon: 'box',
      name: { en: 'Staging area', bn: 'স্টেজিং এরিয়া' },
      sub: { en: 'Next snapshot', bn: 'পরের স্ন্যাপশট' },
      plain: {
        name: { en: 'Arranging tray', bn: 'সাজানোর ট্রে' },
        sub: { en: 'Photos for next page', bn: 'পরের পাতার ছবি' }
      },
      wide: [ 290, 110, 'up' ],
      narrow: [ 80, 170, 'right' ]
    },
    repo: {
      icon: 'archive',
      name: { en: 'Local repository', bn: 'লোকাল রিপোজিটরি' },
      sub: { en: 'HEAD → main → 9f8e7d', bn: 'HEAD → main → 9f8e7d' },
      plain: {
        name: { en: 'Photo album', bn: 'ফটো অ্যালবাম' },
        sub: { en: 'Pages you have saved', bn: 'সেভ করা পাতাগুলো' }
      },
      wide: [ 500, 110, 'up' ],
      narrow: [ 80, 280, 'right' ]
    },
    rtrack: {
      icon: 'bookmark',
      name: { en: 'origin/main', bn: 'origin/main' },
      sub: { en: 'Last seen: 9f8e7d', bn: 'শেষ দেখা: 9f8e7d' },
      plain: {
        name: { en: 'Cloud note', bn: 'ক্লাউড নোট' },
        sub: { en: 'What you last saw', bn: 'শেষবার যা দেখেছেন' }
      },
      wide: [ 620, 280, 'right' ],
      narrow: [ 190, 390, 'right' ]
    },
    remote: {
      icon: 'cloud',
      name: { en: 'GitHub (origin)', bn: 'GitHub (origin)' },
      sub: { en: 'main → 9f8e7d', bn: 'main → 9f8e7d' },
      plain: {
        name: { en: 'Cloud album', bn: 'ক্লাউড অ্যালবাম' },
        sub: { en: 'Shared with family', bn: 'পরিবারের সাথে শেয়ার' }
      },
      wide: [ 740, 110, 'down' ],
      narrow: [ 80, 500, 'right' ]
    }
  },
  corridors: {
    'wd-idx': { wide: [ [ 80, 110 ], [ 290, 110 ] ], narrow: [ [ 80, 60 ], [ 80, 170 ] ] },
    'idx-repo': { wide: [ [ 290, 110 ], [ 500, 110 ] ], narrow: [ [ 80, 170 ], [ 80, 280 ] ] },
    'repo-remote': { wide: [ [ 500, 110 ], [ 740, 110 ] ], narrow: [ [ 80, 280 ], [ 80, 500 ] ] },
    'remote-rtrack': {
      wide: [ [ 740, 110 ], [ 660, 160 ], [ 630, 280 ], [ 620, 280 ] ],
      narrow: [ [ 80, 500 ], [ 190, 390 ] ]
    },
    'rtrack-repo': {
      wide: [ [ 620, 280 ], [ 500, 280 ], [ 500, 110 ] ],
      narrow: [ [ 190, 390 ], [ 80, 280 ] ]
    },
    'wd-repo': {
      wide: [ [ 80, 110 ], [ 80, 200 ], [ 410, 200 ], [ 500, 110 ] ],
      narrow: [ [ 80, 60 ], [ 46, 60 ], [ 46, 280 ], [ 80, 280 ] ]
    }
  },
  edges: {
    add: { from: 'wd', to: 'idx', kind: 'request' },
    commit: { from: 'idx', to: 'repo', kind: 'request' },
    push: { from: 'repo', to: 'remote', kind: 'request' },
    fetch: { from: 'remote', to: 'rtrack', kind: 'result' },
    merge: { from: 'rtrack', to: 'repo', kind: 'result' },
    conflict: { from: 'repo', to: 'wd', kind: 'error' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'add',
        moves: [ { edge: 'add', label: 'git add app.py', plain: { en: 'Photo to tray', bn: 'ট্রেতে ছবি' } } ],
        state: {
          wd: { en: 'app.py modified', bn: 'app.py বদলেছে' },
          idx: { en: 'app.py staged', bn: 'app.py স্টেজ করা' }
        },
        plainState: {
          wd: { en: 'One file changed', bn: 'একটা ফাইল বদলেছে' },
          idx: { en: 'Photo on tray', bn: 'ট্রেতে ছবি আছে' }
        },
        title: { en: 'You change a file and pick it', bn: 'আপনি ফাইল বদলান আর বাছেন' },
        simple: {
          en: 'This is your messy desk, where you edit files. You change one file, then move it onto the arranging tray. Nothing is saved yet.',
          bn: 'এটা আপনার এলোমেলো ডেস্ক, যেখানে ফাইল বদলান। আপনি একটা ফাইল বদলে সাজানোর ট্রেতে রাখেন। এখনো কিছু সেভ হয়নি।'
        },
        tech: {
          en: '`git status` lists app.py as modified. `git add` then writes its content as a blob object and updates `.git/index` for the next snapshot. Staging lets you commit only part of your edits.',
          bn: '`git status` app.py-কে modified দেখায়। তারপর `git add` কনটেন্ট blob object হিসেবে লেখে আর পরের স্ন্যাপশটের জন্য `.git/index` আপডেট করে। স্টেজিংয়ের কারণে পরিবর্তনের শুধু একটা অংশও commit করা যায়।'
        }
      },
      {
        id: 'commit',
        moves: [ { edge: 'commit', label: 'git commit', plain: { en: 'Glue to album', bn: 'অ্যালবামে আটকান' } } ],
        state: {
          repo: { en: 'HEAD → main → a1b2c3', bn: 'HEAD → main → a1b2c3' },
          idx: { en: 'Nothing staged', bn: 'কিছু স্টেজ করা নেই' },
          wd: { en: 'No changes', bn: 'কোনো পরিবর্তন নেই' }
        },
        plainState: {
          repo: { en: 'Latest: a1b2c3', bn: 'সর্বশেষ: a1b2c3' },
          idx: { en: 'Tray empty', bn: 'ট্রে খালি' },
          wd: { en: 'All tidy', bn: 'সব গোছানো' }
        },
        title: { en: 'You save a page', bn: 'আপনি একটা পাতা সেভ করেন' },
        simple: {
          en: 'You glue the tray’s photos into the album as a new page. That page is a commit, a permanent snapshot with a short code: a1b2c3.',
          bn: 'আপনি ট্রের ছবিগুলো অ্যালবামে নতুন পাতা হিসেবে আটকান। এই পাতাই commit, ছোট কোডসহ স্থায়ী স্ন্যাপশট: a1b2c3।'
        },
        tech: {
          en: 'Git builds a tree object from the index, then a commit object holding that tree, the parent, author and message. The SHA hash `a1b2c3` identifies it. Commits store snapshots, not diffs.',
          bn: 'Git index থেকে একটা tree object বানায়, তারপর একটা commit object, যাতে থাকে সেই tree, parent, author আর মেসেজ। SHA hash `a1b2c3` সেটাকে চেনায়। commit snapshot রাখে, diff নয়।'
        }
      },
      {
        id: 'branch-moves',
        work: { node: 'repo', kind: 'result' },
        title: { en: 'The sticky note moves', bn: 'স্টিকি নোট এগোয়' },
        simple: {
          en: 'A branch is a sticky note that marks where you are in the album. The note named main slides onto your new page.',
          bn: 'ব্রাঞ্চ হলো অ্যালবামে আপনার জায়গা চিহ্নিত করা স্টিকি নোট। main নামের নোটটা আপনার নতুন পাতায় সরে যায়।'
        },
        tech: {
          en: 'HEAD is a symbolic ref: `.git/HEAD` holds `ref: refs/heads/main`. Committing moves the `main` file to the new SHA `a1b2c3`; HEAD itself does not change.',
          bn: 'HEAD একটা symbolic ref: `.git/HEAD`-এ আছে `ref: refs/heads/main`। commit করলে `main` ফাইলটা নতুন SHA `a1b2c3`-তে সরে যায়; HEAD নিজে বদলায় না।'
        }
      },
      {
        id: 'push',
        moves: [ { edge: 'push', label: 'git push', plain: { en: 'Upload page', bn: 'পাতা আপলোড' } } ],
        state: { remote: { en: 'main → a1b2c3', bn: 'main → a1b2c3' } },
        plainState: { remote: { en: 'Has a1b2c3', bn: 'a1b2c3 আছে' } },
        title: { en: 'You upload to the cloud', bn: 'আপনি ক্লাউডে আপলোড করেন' },
        simple: {
          en: 'You push, which means upload. Your new page goes to the shared cloud album on GitHub, where teammates can see it.',
          bn: 'আপনি push করেন, মানে আপলোড। নতুন পাতাটা GitHub-এর শেয়ার করা ক্লাউড অ্যালবামে যায়, সহকর্মীরা দেখতে পায়।'
        },
        tech: {
          en: 'Git sends the missing objects, then asks the remote to fast-forward `refs/heads/main`. The remote rejects the push if it has commits you lack. Your `origin/main` updates on success.',
          bn: 'Git যে অবজেক্টগুলো নেই সেগুলো পাঠায়, তারপর remote-কে `refs/heads/main` fast-forward করতে বলে। remote-এ আপনার কাছে নেই এমন commit থাকলে push রিজেক্ট হয়। সফল হলে আপনার `origin/main` আপডেট হয়।'
        }
      },
      {
        id: 'cloud-note',
        work: { node: 'rtrack', kind: 'result' },
        state: { rtrack: { en: 'Last seen: a1b2c3', bn: 'শেষ দেখা: a1b2c3' } },
        plainState: { rtrack: { en: 'Saw a1b2c3', bn: 'a1b2c3 দেখেছে' } },
        title: { en: 'Your cloud note updates', bn: 'ক্লাউড নোট হালনাগাদ হয়' },
        simple: {
          en: 'After a successful upload, your cloud note updates to match. It now remembers the cloud album has your new page.',
          bn: 'আপলোড সফল হলে আপনার ক্লাউড নোট মিলিয়ে হালনাগাদ হয়। এখন সেটা মনে রাখে ক্লাউড অ্যালবামে আপনার নতুন পাতা আছে।'
        },
        tech: {
          en: 'After a successful push, Git also moves your local `origin/main` to `a1b2c3`, without a fetch. It is still only a bookmark of what the remote had when last contacted.',
          bn: 'push সফল হলে Git আপনার লোকাল `origin/main`-ও `a1b2c3`-তে সরায়, fetch ছাড়াই। এটা তখনও শুধু একটা বুকমার্ক, শেষ যোগাযোগের সময় remote-এ যা ছিল তার।'
        }
      },
      {
        id: 'you-commit',
        work: { node: 'repo', kind: 'request' },
        state: { repo: { en: 'HEAD → main → d4e5f6', bn: 'HEAD → main → d4e5f6' } },
        plainState: { repo: { en: 'Latest: d4e5f6', bn: 'সর্বশেষ: d4e5f6' } },
        title: { en: 'You keep working', bn: 'আপনি কাজ চালিয়ে যান' },
        simple: {
          en: 'You save another page in your own album. The cloud album does not have it yet.',
          bn: 'আপনি নিজের অ্যালবামে আরেকটা পাতা সেভ করেন। ক্লাউড অ্যালবামে সেটা এখনো নেই।'
        },
        tech: {
          en: 'Your local `main` moves to `d4e5f6`, one commit ahead of `origin/main` (`a1b2c3`). Nothing is pushed, so the remote and your bookmark do not change.',
          bn: 'আপনার লোকাল `main` সরে `d4e5f6`-এ যায়, `origin/main` (`a1b2c3`) থেকে এক commit এগিয়ে। কিছু push হয়নি, তাই remote আর আপনার বুকমার্ক বদলায় না।'
        }
      },
      {
        id: 'teammate',
        work: { node: 'remote', kind: 'queue' },
        state: { remote: { en: 'main → 77d4e1', bn: 'main → 77d4e1' } },
        plainState: { remote: { en: 'Teammate added a page', bn: 'সহকর্মী পাতা যোগ করেছে' } },
        title: { en: 'A teammate adds a page', bn: 'সহকর্মী একটা পাতা যোগ করেন' },
        simple: {
          en: 'A teammate adds a page to the cloud album. Your cloud note still shows the old version, because it only changes when you check.',
          bn: 'এক সহকর্মী ক্লাউড অ্যালবামে একটা পাতা যোগ করেছেন। আপনার ক্লাউড নোট এখনো পুরোনো, কারণ আপনি দেখলে তবেই সেটা বদলায়।'
        },
        tech: {
          en: 'The remote `main` moved to `77d4e1`. Your `origin/main` is only a local bookmark, updated on fetch, pull or push, so it stays stale until you ask.',
          bn: 'remote-এর `main` সরে `77d4e1`-এ গেছে। আপনার `origin/main` শুধু একটা লোকাল বুকমার্ক, fetch, pull বা push-এ আপডেট হয়, তাই আপনি না চাইলে পুরোনোই থাকে।'
        }
      },
      {
        id: 'fetch',
        moves: [ { edge: 'fetch', label: 'git fetch', plain: { en: 'Their new page', bn: 'তাদের নতুন পাতা' } } ],
        state: { rtrack: { en: 'Last seen: 77d4e1', bn: 'শেষ দেখা: 77d4e1' } },
        plainState: { rtrack: { en: 'Saw teammate’s page', bn: 'সহকর্মীর পাতা দেখেছে' } },
        title: { en: 'You fetch their page', bn: 'আপনি তাদের পাতা ডাউনলোড করেন' },
        simple: {
          en: 'Fetch means download. Their page lands on your cloud note. Your own album and desk stay untouched, so fetching is always safe.',
          bn: 'ডাউনলোড মানে fetch। তাদের পাতা আপনার ক্লাউড নোটে আসে। আপনার অ্যালবাম আর ডেস্ক ছোঁয়াই হয় না, তাই এটা সবসময় নিরাপদ।'
        },
        tech: {
          en: '`git fetch` downloads objects and updates `refs/remotes/origin/*`. It never touches your working directory, your index or your local branches.',
          bn: '`git fetch` অবজেক্ট ডাউনলোড করে আর `refs/remotes/origin/*` আপডেট করে। আপনার working directory, index বা লোকাল ব্রাঞ্চ এটা কখনো ছোঁয় না।'
        }
      },
      {
        id: 'merge',
        moves: [ { edge: 'merge', label: 'git merge origin/main', plain: { en: 'Join their page', bn: 'তাদের পাতা জোড়া' } } ],
        state: { repo: { en: 'HEAD → main → 5c6d7e', bn: 'HEAD → main → 5c6d7e' } },
        plainState: { repo: { en: 'Both lines joined', bn: 'দুই ধারা জোড়া' } },
        title: { en: 'You merge their work in', bn: 'আপনি তাদের কাজ মিলিয়ে নেন' },
        simple: {
          en: 'Merge means combining. You each added pages, so Git joins your story and theirs into one.',
          bn: 'মেলানো মানে merge। দুজনেই পাতা যোগ করেছেন, তাই Git আপনার আর তাদের গল্প এক করে।'
        },
        tech: {
          en: 'Both sides have new commits, so Git creates a merge commit with two parents: yours `d4e5f6` and theirs `77d4e1`. This is `5c6d7e`. With no divergence, it would only fast-forward.',
          bn: 'দুই দিকেই নতুন commit আছে, তাই Git দুই parent-সহ একটা merge commit বানায়: আপনার `d4e5f6` আর তাদের `77d4e1`। এটাই `5c6d7e`। divergence না থাকলে শুধু fast-forward হতো।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'pull',
      label: { en: 'Update in one go', bn: 'এক ধাপে হালনাগাদ' },
      whatIf: {
        en: 'What if you want their work in a single step?',
        bn: 'তাদের কাজ যদি এক ধাপেই চান?'
      },
      branchAfter: 'teammate',
      steps: [
        {
          id: 'pull',
          moves: [
            { edge: 'fetch', label: 'git fetch', plain: { en: 'Their new page', bn: 'তাদের নতুন পাতা' } },
            { edge: 'merge', label: 'git pull', plain: { en: 'Their work, joined', bn: 'তাদের কাজ, জোড়া' } }
          ],
          state: { rtrack: { en: 'Last seen: 77d4e1', bn: 'শেষ দেখা: 77d4e1' } },
          plainState: { rtrack: { en: 'Saw teammate’s page', bn: 'সহকর্মীর পাতা দেখেছে' } },
          title: { en: 'Pull: download and join at once', bn: 'Pull: নামানো আর জোড়া এক ধাপে' },
          simple: {
            en: 'Pull does both jobs at once. It downloads your teammate’s page, then joins it into your album. Because it joins right away, your files can change.',
            bn: 'Pull দুটো কাজ একসাথে করে। সহকর্মীর পাতা নামায়, তারপর সাথে সাথে আপনার অ্যালবামে জোড়ে। তাই আপনার ফাইল বদলে যেতে পারে।'
          },
          tech: {
            en: '`git pull` is `git fetch` plus `git merge`. It rebases instead only with `--rebase` or `pull.rebase=true`. It can change your branch and files, and can cause conflicts.',
            bn: '`git pull` মানে `git fetch` আর `git merge`। শুধু `--rebase` বা `pull.rebase=true` দিলে এটা merge-এর বদলে rebase করে। এটা আপনার ব্রাঞ্চ আর ফাইল বদলাতে পারে, কনফ্লিক্টও হতে পারে।'
          }
        },
        {
          id: 'pulled',
          work: { node: 'repo', kind: 'result' },
          state: { repo: { en: 'HEAD → main → 5c6d7e', bn: 'HEAD → main → 5c6d7e' } },
          plainState: { repo: { en: 'Both lines joined', bn: 'দুই ধারা জোড়া' } },
          title: { en: 'You are caught up', bn: 'আপনি হালনাগাদ' },
          simple: {
            en: 'Your album now holds their pages and yours together, and your cloud note is up to date.',
            bn: 'এখন আপনার অ্যালবামে তাদের আর আপনার পাতা একসাথে আছে, আর ক্লাউড নোটও হালনাগাদ।'
          },
          tech: {
            en: 'Merge commit `5c6d7e` (parents `d4e5f6`, `77d4e1`) is on `main`; `origin/main` is `77d4e1`. GitHub lacks `5c6d7e` until you push. Fetching first and inspecting with `git log main..origin/main` gives you more control.',
            bn: 'merge commit `5c6d7e` (parent `d4e5f6`, `77d4e1`) এখন `main`-এ, আর `origin/main` `77d4e1`-এ। push না করা পর্যন্ত GitHub-এ `5c6d7e` নেই। আগে fetch করে `git log main..origin/main` দিয়ে দেখে নিলে নিয়ন্ত্রণ বেশি থাকে।'
          }
        }
      ]
    },
    {
      id: 'rebase',
      label: { en: 'Rebase instead', bn: 'বদলে rebase' },
      whatIf: {
        en: 'What if you want one straight line instead of a join page?',
        bn: 'জোড়া পাতার বদলে একটাই সোজা লাইন চাইলে?'
      },
      branchAfter: 'fetch',
      steps: [
        {
          id: 'rebase',
          moves: [ { edge: 'merge', label: 'git rebase origin/main', plain: { en: 'Replay my pages', bn: 'আমার পাতা নতুন করে' } } ],
          state: { repo: { en: 'HEAD → main → 9a8b7c', bn: 'HEAD → main → 9a8b7c' } },
          plainState: { repo: { en: 'Your page, on top', bn: 'আপনার পাতা ওপরে' } },
          title: { en: 'You replay your page on theirs', bn: 'আপনার পাতা তাদের ওপরে বসান' },
          simple: {
            en: 'Rebase means replay. Git lifts your page off, sets their page down first, then lays yours back on top. One straight line, no join page.',
            bn: 'Rebase মানে নতুন করে বসানো। Git আপনার পাতা তুলে নেয়, আগে তাদের পাতা রাখে, তারপর আপনারটা ওপরে বসায়। একটাই সোজা লাইন, জোড়া পাতা নেই।'
          },
          tech: {
            en: '`git rebase origin/main` re-applies `d4e5f6` on top of `77d4e1` as a NEW commit, `9a8b7c`, with a new hash. History stays linear, with no merge commit.',
            bn: '`git rebase origin/main` `d4e5f6`-কে `77d4e1`-এর ওপরে নতুন commit `9a8b7c` হিসেবে (নতুন hash-সহ) আবার প্রয়োগ করে। ইতিহাস সোজা থাকে, merge commit হয় না।'
          }
        },
        {
          id: 'rebased',
          work: { node: 'repo', kind: 'result' },
          title: { en: 'Your page has a new code', bn: 'আপনার পাতার নতুন কোড' },
          simple: {
            en: 'Your page now has a new code, 9a8b7c, because it is a fresh copy. Never replay pages you already shared: teammates still hold the old code.',
            bn: 'আপনার পাতার এখন নতুন কোড 9a8b7c, কারণ এটা নতুন কপি। শেয়ার করা পাতা কখনো নতুন করে বসাবেন না: সহকর্মীদের কাছে এখনো পুরোনো কোড।'
          },
          tech: {
            en: 'Rewriting published commits forces everyone who has the old ones to reconcile. Rebase only local work. Here `d4e5f6` was never pushed, so it is safe to rewrite.',
            bn: 'প্রকাশিত commit নতুন করে লিখলে যাদের কাছে পুরোনোগুলো আছে সবাইকে মেলাতে হয়। শুধু লোকাল কাজ rebase করুন। এখানে `d4e5f6` কখনো push হয়নি, তাই বদলানো নিরাপদ।'
          }
        },
        {
          id: 'push-straight',
          moves: [ { edge: 'push', label: 'git push', plain: { en: 'Upload page', bn: 'পাতা আপলোড' } } ],
          state: { remote: { en: 'main → 9a8b7c', bn: 'main → 9a8b7c' } },
          plainState: { remote: { en: 'Has your new page', bn: 'আপনার নতুন পাতা আছে' } },
          title: { en: 'You upload the straight line', bn: 'আপনি সোজা লাইন আপলোড করেন' },
          simple: {
            en: 'You upload, and it just works. Your line is straight, so the cloud album only adds your page on the end.',
            bn: 'আপনি আপলোড করেন, আর সেটা সহজেই হয়ে যায়। আপনার লাইন সোজা, তাই ক্লাউড অ্যালবাম শুধু শেষে আপনার পাতা জোড়ে।'
          },
          tech: {
            en: 'The remote `main` moves from `77d4e1` to `9a8b7c`. This is a fast-forward push, so the remote accepts it without force.',
            bn: 'remote-এর `main` `77d4e1` থেকে `9a8b7c`-এ যায়। এটা fast-forward push, তাই remote force ছাড়াই মেনে নেয়।'
          }
        }
      ]
    },
    {
      id: 'conflict',
      label: { en: 'Clashing edits', bn: 'সংঘাতপূর্ণ বদল' },
      whatIf: {
        en: 'What if you and a teammate changed the very same line?',
        bn: 'আপনি আর সহকর্মী যদি ঠিক একই লাইন বদলান?'
      },
      branchAfter: 'fetch',
      steps: [
        {
          id: 'clash',
          work: { node: 'repo', kind: 'error' },
          title: { en: 'Both of you changed the same line', bn: 'দুজনেই একই লাইন বদলেছেন' },
          simple: {
            en: 'You try to join their work with yours, but you both changed the very same line. Git cannot guess whose is right, so it stops.',
            bn: 'আপনি তাদের কাজ নিজের সাথে জোড়ার চেষ্টা করেন, কিন্তু দুজনেই ঠিক একই লাইন বদলেছেন। কারটা ঠিক Git আন্দাজ করতে পারে না, তাই থামে।'
          },
          tech: {
            en: 'Git can merge changes to different lines on its own. When both sides changed the same lines, the merge pauses with the conflicting files marked as unmerged.',
            bn: 'আলাদা লাইনের পরিবর্তন Git নিজেই merge করতে পারে। দুই পক্ষ একই লাইন বদলালে merge থেমে যায়, আর কনফ্লিক্ট হওয়া ফাইলগুলো unmerged হিসেবে চিহ্নিত থাকে।'
          }
        },
        {
          id: 'markers',
          moves: [ { edge: 'conflict', label: '<<<<<<< ======= >>>>>>>', plain: { en: 'Both versions', bn: 'দুটো ভার্সন' } } ],
          state: { wd: { en: 'app.py: conflict', bn: 'app.py: কনফ্লিক্ট' } },
          plainState: { wd: { en: 'Clash to fix', bn: 'মেটানোর সংঘাত' } },
          title: { en: 'Git marks the clash in your file', bn: 'Git ফাইলে সংঘাত চিহ্নিত করে' },
          simple: {
            en: 'Git writes both versions into your file, with marker lines around them. Now it is your job to choose.',
            bn: 'Git আপনার ফাইলে দুটো ভার্সনই লিখে দেয়, চারপাশে মার্কার লাইন দিয়ে। এখন বেছে নেওয়া আপনার কাজ।'
          },
          tech: {
            en: 'The file gets `<<<<<<<` (your side), `=======` and `>>>>>>>` (theirs). Edit the file to the final text and delete all three marker lines before continuing.',
            bn: 'ফাইলে `<<<<<<<` (আপনার দিক), `=======` আর `>>>>>>>` (তাদের দিক) বসে। এগোনোর আগে ফাইলটা চূড়ান্ত লেখায় এনে তিনটা মার্কার লাইনই মুছে ফেলুন।'
          }
        },
        {
          id: 'resolve',
          moves: [ { edge: 'add', label: 'git add app.py', plain: { en: 'Fixed file', bn: 'ঠিক করা ফাইল' } } ],
          state: {
            wd: { en: 'app.py resolved', bn: 'app.py ঠিক করা হয়েছে' },
            idx: { en: 'app.py staged', bn: 'app.py স্টেজ করা' }
          },
          plainState: {
            wd: { en: 'Clash fixed', bn: 'সংঘাত মিটেছে' },
            idx: { en: 'Fixed file on tray', bn: 'ঠিক ফাইল ট্রেতে' }
          },
          title: { en: 'You fix it and tray it', bn: 'আপনি ঠিক করে ট্রেতে রাখেন' },
          simple: {
            en: 'After fixing the file by hand, you put it on the arranging tray. That tells Git the clash is settled.',
            bn: 'ফাইলটা হাতে ঠিক করে আপনি সাজানোর ট্রেতে রাখেন। এতে Git বোঝে সংঘাত মিটে গেছে।'
          },
          tech: {
            en: 'Running `git add app.py` after editing marks the conflict as resolved in the index. `git status` then shows the merge as ready to commit.',
            bn: 'এডিট করার পর `git add app.py` চালালে index-এ কনফ্লিক্টটা resolved হিসেবে চিহ্নিত হয়। তখন `git status` দেখায় merge commit করার জন্য তৈরি।'
          }
        },
        {
          id: 'finish',
          moves: [ { edge: 'commit', label: 'git commit', plain: { en: 'Glue to album', bn: 'অ্যালবামে আটকান' } } ],
          state: {
            repo: { en: 'HEAD → main → 8b9c0d', bn: 'HEAD → main → 8b9c0d' },
            idx: { en: 'Nothing staged', bn: 'কিছু স্টেজ করা নেই' },
            wd: { en: 'No changes', bn: 'কোনো পরিবর্তন নেই' }
          },
          plainState: {
            repo: { en: 'Merged, clash fixed', bn: 'জোড়া, সংঘাত মিটেছে' },
            idx: { en: 'Tray empty', bn: 'ট্রে খালি' },
            wd: { en: 'All tidy', bn: 'সব গোছানো' }
          },
          title: { en: 'You finish the merge', bn: 'আপনি মেলানো শেষ করেন' },
          simple: {
            en: 'You save the page, and the merge is done. Your album now holds both versions of the story.',
            bn: 'আপনি পাতাটা সেভ করেন আর মেলানো শেষ। অ্যালবামে এখন গল্পের দুটো ধারাই আছে।'
          },
          tech: {
            en: '`git commit` records the merge commit `8b9c0d` with two parents. In a rebase, you would finish with `git rebase --continue` instead.',
            bn: '`git commit` দুই parent-সহ merge commit `8b9c0d` রেকর্ড করে। rebase-এর সময় এর বদলে `git rebase --continue` দিয়ে শেষ করতে হয়।'
          }
        }
      ]
    },
    {
      id: 'detached',
      label: { en: 'Back in time', bn: 'অতীতে ফেরা' },
      whatIf: {
        en: 'What if you jump back to an old page?',
        bn: 'পুরোনো একটা পাতায় ফিরে গেলে কী হয়?'
      },
      branchAfter: 'commit',
      steps: [
        {
          id: 'checkout-sha',
          work: { node: 'repo', kind: 'queue' },
          state: {
            repo: { en: 'HEAD → 9f8e7d (no branch)', bn: 'HEAD → 9f8e7d (কোনো ব্রাঞ্চ নেই)' }
          },
          plainState: {
            repo: { en: 'Marker off any branch', bn: 'নোট কোনো ব্রাঞ্চে নেই' }
          },
          title: { en: 'You jump to an old page', bn: 'আপনি পুরোনো পাতায় যান' },
          simple: {
            en: 'You jump back to an old page using its short code. Your sticky note now sits on no branch at all.',
            bn: 'আপনি ছোট কোড ধরে পুরোনো একটা পাতায় ফিরে যান। আপনার স্টিকি নোট এখন কোনো ব্রাঞ্চেই নেই।'
          },
          tech: {
            en: '`git checkout 9f8e7d` puts a raw SHA in `.git/HEAD` instead of `ref: refs/heads/...`. That is a detached HEAD, and Git warns you about it.',
            bn: '`git checkout 9f8e7d` `.git/HEAD`-এ `ref: refs/heads/...`-এর বদলে সরাসরি একটা SHA বসায়। এটাই detached HEAD, আর Git আপনাকে সতর্ক করে।'
          }
        },
        {
          id: 'orphan-commit',
          moves: [ { edge: 'commit', label: 'git commit', plain: { en: 'Glue to album', bn: 'অ্যালবামে আটকান' } } ],
          state: {
            repo: { en: 'HEAD → e3f4a5 (no branch)', bn: 'HEAD → e3f4a5 (কোনো ব্রাঞ্চ নেই)' },
            idx: { en: 'Nothing staged', bn: 'কিছু স্টেজ করা নেই' }
          },
          plainState: {
            repo: { en: 'New page, no branch', bn: 'নতুন পাতা, ব্রাঞ্চ নেই' },
            idx: { en: 'Tray empty', bn: 'ট্রে খালি' }
          },
          title: { en: 'A page that belongs to no branch', bn: 'কোনো ব্রাঞ্চের নয় এমন পাতা' },
          simple: {
            en: 'You save a fix as a new page. Careful: it is on no branch. Leave without naming it, and it is very hard to find again.',
            bn: 'আপনি একটা ফিক্স নতুন পাতা হিসেবে সেভ করেন। সাবধান: এটা কোনো ব্রাঞ্চে নেই। নাম না দিয়ে চলে গেলে এটা আবার খুঁজে পাওয়া খুব কঠিন।'
          },
          tech: {
            en: 'With a detached HEAD, a commit moves only HEAD, no branch. Once you switch away, the commit is unreachable except through `git reflog`, and is eventually garbage collected.',
            bn: 'detached HEAD-এ commit শুধু HEAD-কে সরায়, কোনো ব্রাঞ্চকে নয়। অন্য কোথাও চলে গেলে `git reflog` ছাড়া commit-টায় পৌঁছানো যায় না, আর শেষে garbage collect হয়ে যায়।'
          }
        },
        {
          id: 'rescue',
          work: { node: 'repo', kind: 'result' },
          state: { repo: { en: 'HEAD → rescue → e3f4a5', bn: 'HEAD → rescue → e3f4a5' } },
          plainState: { repo: { en: 'Saved as rescue', bn: 'rescue নামে সেভ' } },
          title: { en: 'You give it a branch', bn: 'আপনি ব্রাঞ্চ নাম দেন' },
          simple: {
            en: 'You give the page a branch name. Now your sticky note has a home, and the page is safe.',
            bn: 'আপনি পাতাটাকে একটা ব্রাঞ্চের নাম দেন। এখন স্টিকি নোটের একটা ঠিকানা আছে, আর পাতাটা নিরাপদ।'
          },
          tech: {
            en: '`git switch -c rescue` creates a branch at `e3f4a5` and attaches HEAD to it. The commit is now reachable, so it will not be garbage collected.',
            bn: '`git switch -c rescue` `e3f4a5`-এ একটা ব্রাঞ্চ বানায় আর HEAD-কে তার সাথে জুড়ে দেয়। commit-টা এখন reachable, তাই garbage collect হবে না।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'Think of building a photo album you share with family. Every Git place has a twin there.',
      bn: 'পরিবারের সাথে শেয়ার করা একটা ফটো অ্যালবাম বানানোর কথা ভাবুন। Git-এর প্রতিটি জায়গার একটা জোড়া আছে সেখানে।'
    },
    twins: [
      {
        icon: 'folder',
        node: 'wd',
        name: { en: 'Your messy desk', bn: 'আপনার এলোমেলো ডেস্ক' },
        d: {
          en: 'Photos, scissors and scribbles lie everywhere. Nothing here is in the album yet.',
          bn: 'ছবি, কাঁচি আর আঁকিবুকি সব ছড়ানো। এখানকার কিছুই এখনো অ্যালবামে নেই।'
        }
      },
      {
        icon: 'box',
        node: 'idx',
        name: { en: 'The arranging tray', bn: 'সাজানোর ট্রে' },
        d: {
          en: 'You place only the photos you want in the next page, ready to be shot.',
          bn: 'পরের পাতায় যে ছবিগুলো চান শুধু সেগুলোই ট্রেতে সাজান, তোলার জন্য তৈরি।'
        }
      },
      {
        icon: 'archive',
        node: 'repo',
        name: { en: 'The photo album', bn: 'ফটো অ্যালবাম' },
        d: {
          en: 'Each photo has a caption and points to the one before it. A sticky note marks where you are.',
          bn: 'প্রতিটি ছবির ক্যাপশন আছে আর সেটা আগের ছবির দিকে ইঙ্গিত করে। একটা স্টিকি নোট দেখায় আপনি কোথায়।'
        }
      },
      {
        icon: 'bookmark',
        node: 'rtrack',
        name: { en: 'Your cloud note', bn: 'আপনার ক্লাউড নোট' },
        d: {
          en: 'It says what the cloud album looked like when you last checked. It can be out of date.',
          bn: 'শেষবার দেখার সময় ক্লাউড অ্যালবাম কেমন ছিল সেটা লেখা। এটা পুরোনো হয়ে যেতে পারে।'
        }
      },
      {
        icon: 'cloud',
        node: 'remote',
        name: { en: 'The shared cloud album', bn: 'শেয়ার করা ক্লাউড অ্যালবাম' },
        d: {
          en: 'The family album everyone adds to. Teammates see only what is uploaded here.',
          bn: 'পরিবারের সবার অ্যালবাম, সবাই এতে ছবি যোগ করে। সহকর্মীরা শুধু এখানে আপলোড করা ছবিই দেখে।'
        }
      },
      {
        icon: 'code',
        node: null,
        name: { en: 'Two people glued different photos on one page', bn: 'দুজন একই পাতায় আলাদা ছবি সেঁটে দিয়েছে' },
        is: { en: 'is a merge conflict', bn: 'মানে মার্জ কনফ্লিক্ট' },
        d: {
          en: 'Nobody can tell which photo belongs there, so a human has to look at the page and pick.',
          bn: 'কোন ছবিটা ওখানে থাকবে কেউ বলতে পারে না, তাই কাউকে পাতাটা দেখে বেছে নিতে হয়।'
        }
      }
    ]
  },
  qa: [
    {
      q: { en: 'What does HEAD actually point to?', bn: 'HEAD আসলে কীসের দিকে ইঙ্গিত করে?' },
      short: {
        en: 'Usually to a branch name, which points to a commit.',
        bn: 'সাধারণত একটা ব্রাঞ্চের নামের দিকে, আর সেই ব্রাঞ্চ একটা commit-এর দিকে।'
      },
      deep: {
        en: '`.git/HEAD` contains `ref: refs/heads/main`, a symbolic ref. The branch file holds a commit SHA. Checking out a commit or tag leaves HEAD holding a raw SHA (detached). Committing moves the branch HEAD refers to, not HEAD itself.',
        bn: '`.git/HEAD`-এ থাকে `ref: refs/heads/main`, একটা symbolic ref। ব্রাঞ্চ ফাইলে থাকে commit SHA। কোনো commit বা tag checkout করলে HEAD সরাসরি SHA ধরে থাকে (detached)। commit করলে HEAD যে ব্রাঞ্চের দিকে ইঙ্গিত করে সেটা সরে, HEAD নিজে নয়।'
      },
      redFlag: {
        en: '“HEAD is the latest commit on the remote” or “HEAD is a copy of the code”.',
        bn: '“HEAD হলো remote-এর সর্বশেষ commit” বা “HEAD কোডের একটা কপি”।'
      }
    },
    {
      q: { en: 'What is the difference between fetch and pull?', bn: 'fetch আর pull-এর পার্থক্য কী?' },
      short: {
        en: 'Fetch downloads. Pull downloads and then integrates.',
        bn: 'fetch ডাউনলোড করে। pull ডাউনলোড করে তারপর integrate করে।'
      },
      deep: {
        en: 'Fetch updates remote-tracking refs like `origin/main` only, so it is always safe. Pull is fetch plus merge (or rebase with `--rebase`), which can change your branch and working tree and cause conflicts. Many people fetch, inspect with `git log main..origin/main`, then integrate.',
        bn: 'fetch শুধু `origin/main`-এর মতো remote-tracking ref আপডেট করে, তাই সবসময় নিরাপদ। pull হলো fetch আর merge (বা `--rebase` দিলে rebase), যা আপনার ব্রাঞ্চ আর working tree বদলাতে এবং কনফ্লিক্ট ঘটাতে পারে। অনেকে fetch করে `git log main..origin/main` দিয়ে দেখে তারপর integrate করেন।'
      },
      redFlag: {
        en: '“They are the same” or “fetch deletes local changes”.',
        bn: '“দুটো একই জিনিস” বা “fetch লোকাল পরিবর্তন মুছে দেয়”।'
      }
    },
    {
      q: { en: 'What is a branch?', bn: 'ব্রাঞ্চ কী?' },
      short: {
        en: 'A movable pointer to a commit.',
        bn: 'একটা commit-এর দিকে ইঙ্গিত করা সরানো-যায় এমন পয়েন্টার।'
      },
      deep: {
        en: 'It is a tiny file under `.git/refs/heads/` holding one commit SHA, which is why branching is cheap. History is a graph of immutable commits, and a branch just names one of them.',
        bn: 'এটা `.git/refs/heads/`-এর নিচের ছোট একটা ফাইল, যাতে একটা commit SHA থাকে, তাই ব্রাঞ্চ বানানো সস্তা। ইতিহাস হলো অপরিবর্তনীয় commit-এর একটা গ্রাফ, আর ব্রাঞ্চ শুধু তার একটার নাম।'
      },
      redFlag: {
        en: '“A branch is a copy of all the files”.',
        bn: '“ব্রাঞ্চ হলো সব ফাইলের একটা কপি”।'
      }
    },
    {
      q: { en: 'Why does the staging area exist?', bn: 'স্টেজিং এরিয়া কেন আছে?' },
      short: {
        en: 'It lets you build a commit from only part of your changes.',
        bn: 'এটা আপনাকে পরিবর্তনের শুধু একটা অংশ দিয়ে commit বানাতে দেয়।'
      },
      deep: {
        en: 'The index is the proposed next snapshot. `git add -p` stages hunks, so unrelated edits can become separate commits. `git diff` compares working files to the index, and `git diff --staged` compares the index to HEAD.',
        bn: 'index হলো প্রস্তাবিত পরের স্ন্যাপশট। `git add -p` hunk ধরে স্টেজ করে, তাই সম্পর্কহীন পরিবর্তনগুলো আলাদা commit হতে পারে। `git diff` working ফাইলকে index-এর সাথে, আর `git diff --staged` index-কে HEAD-এর সাথে তুলনা করে।'
      },
      redFlag: {
        en: '“It is just a temporary backup”.',
        bn: '“এটা শুধু একটা সাময়িক ব্যাকআপ”।'
      }
    },
    {
      q: { en: 'Merge or rebase: what is the difference?', bn: 'merge আর rebase-এর পার্থক্য কী?' },
      short: {
        en: 'Merge keeps history and adds a merge commit. Rebase rewrites it into a straight line.',
        bn: 'merge ইতিহাস রেখে একটা merge commit যোগ করে। rebase ইতিহাস নতুন করে লিখে সোজা লাইনে আনে।'
      },
      deep: {
        en: 'Rebase creates new commits with new parents and SHAs, so never rebase commits that others have based work on. Merge is non-destructive, while rebase gives a cleaner log. A squash merge collapses a branch into one commit.',
        bn: 'rebase নতুন parent আর SHA-সহ নতুন commit বানায়, তাই অন্যরা যে commit-এর ওপর কাজ করেছে সেগুলো কখনো rebase করবেন না। merge কিছু নষ্ট করে না, আর rebase লগ পরিষ্কার রাখে। squash merge একটা ব্রাঞ্চকে এক commit-এ গুটিয়ে আনে।'
      },
      redFlag: {
        en: '“Rebase is just a faster merge” or “rebase is always safe”.',
        bn: '“rebase শুধু একটা দ্রুত merge” বা “rebase সবসময় নিরাপদ”।'
      }
    },
    {
      q: { en: 'How do you undo a bad commit that is already pushed?', bn: 'push হয়ে যাওয়া খারাপ commit কীভাবে undo করবেন?' },
      short: {
        en: 'Use `git revert`.',
        bn: '`git revert` ব্যবহার করুন।'
      },
      deep: {
        en: 'Revert adds a new commit that inverts the change, so it is safe on shared branches. Reset plus force-push rewrites shared history and breaks teammates’ copies.',
        bn: 'revert পরিবর্তনটা উল্টে দেওয়া একটা নতুন commit যোগ করে, তাই শেয়ার করা ব্রাঞ্চে নিরাপদ। reset আর force-push শেয়ার করা ইতিহাস নতুন করে লিখে সহকর্মীদের কপি ভেঙে দেয়।'
      },
      redFlag: {
        en: '“reset --hard and force push to main”.',
        bn: '“reset --hard করে main-এ force push”।'
      }
    }
  ],
  cheats: [
    {
      code: 'git status -sb',
      d: {
        en: 'Short status, with the branch and how far it is ahead or behind.',
        bn: 'ছোট স্ট্যাটাস, সাথে ব্রাঞ্চ আর সেটা কতটা এগিয়ে বা পিছিয়ে।'
      }
    },
    {
      code: 'git add -p',
      d: {
        en: 'Stage changes hunk by hunk, so one commit holds one idea.',
        bn: 'পরিবর্তন hunk ধরে ধরে স্টেজ করুন, যাতে এক commit-এ এক ধারণা থাকে।'
      }
    },
    {
      code: 'git switch -c feature/x',
      d: {
        en: 'Create a new branch and switch to it.',
        bn: 'নতুন ব্রাঞ্চ বানিয়ে সেখানে চলে যান।'
      }
    },
    {
      code: 'git fetch --prune',
      d: {
        en: 'Update remote refs and drop the ones deleted on the remote.',
        bn: 'remote ref আপডেট করুন আর remote-এ মুছে যাওয়াগুলো বাদ দিন।'
      }
    },
    {
      code: 'git pull --rebase',
      d: {
        en: 'Fetch, then replay your local commits on top of the remote ones.',
        bn: 'fetch করুন, তারপর আপনার লোকাল commit-গুলো remote-এরগুলোর ওপরে নতুন করে বসান।'
      }
    },
    {
      code: 'git log --oneline --graph --decorate --all',
      d: {
        en: 'Draw the whole history as a graph with branch names.',
        bn: 'ব্রাঞ্চের নামসহ পুরো ইতিহাস গ্রাফ আকারে দেখুন।'
      }
    },
    {
      code: 'git revert <sha>',
      d: {
        en: 'Undo a commit by adding a new one. Safe on shared branches.',
        bn: 'নতুন একটা commit যোগ করে পুরোনোটা undo করুন। শেয়ার করা ব্রাঞ্চে নিরাপদ।'
      }
    },
    {
      code: 'git push --force-with-lease',
      d: {
        en: 'Force-push after a rebase. Safer than `--force`: it refuses if the remote moved since you last fetched.',
        bn: 'rebase-এর পর force-push। `--force`-এর চেয়ে নিরাপদ: শেষ fetch-এর পর remote সরে গেলে এটা রিজেক্ট করে।'
      }
    }
  ],
  sources: [
    { label: 'Pro Git: Git References', url: 'https://git-scm.com/book/en/v2/Git-Internals-Git-References' },
    { label: 'Pro Git: Rebasing', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
    { label: 'git-pull documentation', url: 'https://git-scm.com/docs/git-pull' }
  ]
}
