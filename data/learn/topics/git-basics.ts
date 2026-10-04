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
  view: { wide: [ 820, 380 ], narrow: [ 400, 600 ] },
  nodes: {
    wd: {
      icon: 'folder',
      name: { en: 'Working directory', bn: 'Working directory' },
      sub: { en: 'Files you edit', bn: 'যে ফাইল আপনি বদলান' },
      wide: [ 80, 110, 'up' ],
      narrow: [ 90, 50, 'right' ]
    },
    idx: {
      icon: 'box',
      name: { en: 'Staging area', bn: 'স্টেজিং এরিয়া' },
      sub: { en: 'Next snapshot', bn: 'পরের স্ন্যাপশট' },
      wide: [ 290, 110, 'up' ],
      narrow: [ 90, 170, 'right' ]
    },
    repo: {
      icon: 'archive',
      name: { en: 'Local repository', bn: 'লোকাল রিপোজিটরি' },
      sub: { en: 'HEAD → main → 9f8e7d', bn: 'HEAD → main → 9f8e7d' },
      wide: [ 500, 110, 'up' ],
      narrow: [ 90, 290, 'right' ]
    },
    rtrack: {
      icon: 'bookmark',
      name: { en: 'origin/main', bn: 'origin/main' },
      sub: { en: 'Last seen: 9f8e7d', bn: 'শেষ দেখা: 9f8e7d' },
      wide: [ 620, 280, 'right' ],
      narrow: [ 290, 405, 'down' ]
    },
    remote: {
      icon: 'cloud',
      name: { en: 'GitHub (origin)', bn: 'GitHub (origin)' },
      sub: { en: 'main → 9f8e7d', bn: 'main → 9f8e7d' },
      wide: [ 740, 110, 'down' ],
      narrow: [ 90, 520, 'right' ]
    }
  },
  corridors: {
    'wd-idx': { wide: [ [ 80, 110 ], [ 290, 110 ] ], narrow: [ [ 90, 50 ], [ 90, 170 ] ] },
    'idx-repo': { wide: [ [ 290, 110 ], [ 500, 110 ] ], narrow: [ [ 90, 170 ], [ 90, 290 ] ] },
    'repo-remote': { wide: [ [ 500, 110 ], [ 740, 110 ] ], narrow: [ [ 90, 290 ], [ 90, 520 ] ] },
    'remote-rtrack': {
      wide: [ [ 740, 110 ], [ 660, 160 ], [ 630, 280 ], [ 620, 280 ] ],
      narrow: [ [ 90, 520 ], [ 130, 480 ], [ 290, 405 ] ]
    },
    'rtrack-repo': {
      wide: [ [ 620, 280 ], [ 500, 280 ], [ 500, 110 ] ],
      narrow: [ [ 290, 405 ], [ 150, 360 ], [ 90, 290 ] ]
    },
    'remote-wd': {
      wide: [ [ 740, 110 ], [ 740, 40 ], [ 80, 40 ], [ 80, 110 ] ],
      narrow: [ [ 90, 520 ], [ 12, 520 ], [ 12, 50 ], [ 90, 50 ] ]
    },
    'wd-repo': {
      wide: [ [ 80, 110 ], [ 80, 200 ], [ 410, 200 ], [ 500, 110 ] ],
      narrow: [ [ 90, 50 ], [ 30, 110 ], [ 30, 230 ], [ 90, 290 ] ]
    }
  },
  edges: {
    add: { from: 'wd', to: 'idx', kind: 'request' },
    commit: { from: 'idx', to: 'repo', kind: 'request' },
    push: { from: 'repo', to: 'remote', kind: 'request' },
    fetch: { from: 'remote', to: 'rtrack', kind: 'result' },
    merge: { from: 'rtrack', to: 'repo', kind: 'result' },
    pull: { from: 'remote', to: 'wd', kind: 'result' },
    conflict: { from: 'repo', to: 'wd', kind: 'error' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'edit',
        work: { node: 'wd', kind: 'request' },
        state: { wd: { en: 'app.py modified', bn: 'app.py বদলেছে' } },
        title: { en: 'You edit a file', bn: 'আপনি একটা ফাইল বদলান' },
        simple: {
          en: 'You change app.py in your project folder. Git notices the change, but nothing is saved yet.',
          bn: 'আপনি প্রজেক্ট ফোল্ডারে app.py বদলান। Git পরিবর্তনটা টের পায়, কিন্তু এখনো কিছু সেভ হয়নি।'
        },
        tech: {
          en: '`git status` lists app.py as modified. Git has recorded nothing yet; the change exists only as a file on disk.',
          bn: '`git status` app.py-কে modified হিসেবে দেখায়। Git এখনো কিছুই রেকর্ড করেনি; পরিবর্তনটা শুধু ডিস্কের ফাইল হিসেবে আছে।'
        }
      },
      {
        id: 'add',
        moves: [ { edge: 'add', label: 'git add app.py' } ],
        state: { idx: { en: 'app.py staged', bn: 'app.py স্টেজ করা' } },
        title: { en: 'You stage the change', bn: 'আপনি পরিবর্তনটা স্টেজ করেন' },
        simple: {
          en: 'You pick which changes go into the next save, like putting items in a box before sealing it.',
          bn: 'পরের সেভে কোন পরিবর্তনগুলো যাবে সেটা আপনি বাছেন, বাক্স সিল করার আগে জিনিস ভরার মতো।'
        },
        tech: {
          en: '`git add` writes the file content as a blob object and updates `.git/index` to describe the next snapshot. Staging lets you commit only part of your edits.',
          bn: '`git add` ফাইলের কনটেন্ট blob object হিসেবে লেখে আর পরের স্ন্যাপশট বোঝাতে `.git/index` আপডেট করে। স্টেজিংয়ের কারণে আপনি পরিবর্তনের শুধু একটা অংশও commit করতে পারেন।'
        }
      },
      {
        id: 'commit',
        moves: [ { edge: 'commit', label: 'git commit' } ],
        state: {
          repo: { en: 'HEAD → main → a1b2c3', bn: 'HEAD → main → a1b2c3' },
          idx: { en: 'Nothing staged', bn: 'কিছু স্টেজ করা নেই' },
          wd: { en: 'No changes', bn: 'কোনো পরিবর্তন নেই' }
        },
        title: { en: 'You commit', bn: 'আপনি commit করেন' },
        simple: {
          en: 'You seal the box and label it. It is now a permanent snapshot in your local history.',
          bn: 'আপনি বাক্স সিল করে লেবেল লাগান। এটা এখন আপনার লোকাল ইতিহাসে স্থায়ী একটা স্ন্যাপশট।'
        },
        tech: {
          en: 'Git builds a tree object from the index, then a commit object holding that tree, the parent, author and message. The SHA hash `a1b2c3` identifies it. Commits store snapshots, not diffs.',
          bn: 'Git index থেকে একটা tree object বানায়, তারপর একটা commit object, যাতে থাকে সেই tree, parent, author আর মেসেজ। SHA hash `a1b2c3` সেটাকে চেনায়। commit snapshot রাখে, diff নয়।'
        }
      },
      {
        id: 'branch-moves',
        work: { node: 'repo', kind: 'result' },
        title: { en: 'The branch marker moves', bn: 'ব্রাঞ্চের মার্কার এগোয়' },
        simple: {
          en: 'The “you are here” marker slides forward to your new snapshot.',
          bn: '“আপনি এখানে” মার্কারটা আপনার নতুন স্ন্যাপশটে এগিয়ে যায়।'
        },
        tech: {
          en: 'HEAD is a symbolic ref: `.git/HEAD` holds `ref: refs/heads/main`. Committing moves the `main` file to the new SHA `a1b2c3`; HEAD itself does not change.',
          bn: 'HEAD একটা symbolic ref: `.git/HEAD`-এ আছে `ref: refs/heads/main`। commit করলে `main` ফাইলটা নতুন SHA `a1b2c3`-তে সরে যায়; HEAD নিজে বদলায় না।'
        }
      },
      {
        id: 'push',
        moves: [ { edge: 'push', label: 'git push' } ],
        state: {
          remote: { en: 'main → a1b2c3', bn: 'main → a1b2c3' },
          rtrack: { en: 'Last seen: a1b2c3', bn: 'শেষ দেখা: a1b2c3' }
        },
        title: { en: 'You push to GitHub', bn: 'আপনি GitHub-এ push করেন' },
        simple: {
          en: 'You upload your new snapshots to the shared copy on GitHub, so teammates can get them.',
          bn: 'আপনি নতুন স্ন্যাপশটগুলো GitHub-এর শেয়ার করা কপিতে আপলোড করেন, যাতে সহকর্মীরা পায়।'
        },
        tech: {
          en: 'Git sends the missing objects, then asks the remote to fast-forward `refs/heads/main`. The remote rejects the push if it has commits you lack. Your `origin/main` updates on success.',
          bn: 'Git যে অবজেক্টগুলো নেই সেগুলো পাঠায়, তারপর remote-কে `refs/heads/main` fast-forward করতে বলে। remote-এ আপনার কাছে নেই এমন commit থাকলে push রিজেক্ট হয়। সফল হলে আপনার `origin/main` আপডেট হয়।'
        }
      },
      {
        id: 'you-commit',
        work: { node: 'repo', kind: 'request' },
        state: { repo: { en: 'HEAD → main → d4e5f6', bn: 'HEAD → main → d4e5f6' } },
        title: { en: 'You keep working', bn: 'আপনি কাজ চালিয়ে যান' },
        simple: {
          en: 'You make another commit on your laptop. GitHub does not have it yet.',
          bn: 'আপনি ল্যাপটপে আরেকটা commit করেন। GitHub-এর কাছে সেটা এখনো নেই।'
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
        title: { en: 'A teammate pushes', bn: 'সহকর্মী push করেন' },
        simple: {
          en: 'A teammate pushed new work to GitHub. Your copy has not heard about it yet.',
          bn: 'এক সহকর্মী GitHub-এ নতুন কাজ push করেছেন। আপনার কপি এখনো তা জানে না।'
        },
        tech: {
          en: 'The remote `main` moved to `77d4e1`. Your `origin/main` is only a local bookmark, updated on fetch, pull or push, so it stays stale until you ask.',
          bn: 'remote-এর `main` সরে `77d4e1`-এ গেছে। আপনার `origin/main` শুধু একটা লোকাল বুকমার্ক, fetch, pull বা push-এ আপডেট হয়, তাই আপনি না চাইলে পুরোনোই থাকে।'
        }
      },
      {
        id: 'fetch',
        moves: [ { edge: 'fetch', label: 'git fetch' } ],
        state: { rtrack: { en: 'Last seen: 77d4e1', bn: 'শেষ দেখা: 77d4e1' } },
        title: { en: 'You fetch their work', bn: 'আপনি তাদের কাজ fetch করেন' },
        simple: {
          en: 'You download what your teammate did. Your own files are untouched, so this is always safe.',
          bn: 'সহকর্মী যা করেছেন আপনি তা ডাউনলোড করেন। আপনার নিজের ফাইল ছোঁয়াই হয় না, তাই এটা সবসময় নিরাপদ।'
        },
        tech: {
          en: '`git fetch` downloads objects and updates `refs/remotes/origin/*`. It never touches your working directory, your index or your local branches.',
          bn: '`git fetch` অবজেক্ট ডাউনলোড করে আর `refs/remotes/origin/*` আপডেট করে। আপনার working directory, index বা লোকাল ব্রাঞ্চ এটা কখনো ছোঁয় না।'
        }
      },
      {
        id: 'merge',
        moves: [ { edge: 'merge', label: 'git merge origin/main' } ],
        state: { repo: { en: 'HEAD → main → 5c6d7e', bn: 'HEAD → main → 5c6d7e' } },
        title: { en: 'You merge it in', bn: 'আপনি merge করে নেন' },
        simple: {
          en: 'You combine their work with yours. You each added new work, so Git joins the two lines of history.',
          bn: 'আপনি তাদের কাজ নিজের কাজের সাথে মেলান। দুজনেই নতুন কাজ করেছেন, তাই Git ইতিহাসের দুটো ধারা জোড়া লাগায়।'
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
      label: { en: 'git pull', bn: 'git pull' },
      branchAfter: 'teammate',
      steps: [
        {
          id: 'pull',
          moves: [ { edge: 'pull', label: 'git pull' } ],
          title: { en: 'Pull: fetch and merge in one move', bn: 'Pull: fetch আর merge এক ধাপে' },
          simple: {
            en: 'Pull downloads your teammate’s work and immediately combines it with yours, straight into your project folder.',
            bn: 'Pull সহকর্মীর কাজ ডাউনলোড করে সাথে সাথে আপনার কাজের সাথে মিলিয়ে সরাসরি আপনার প্রজেক্ট ফোল্ডারে আনে।'
          },
          tech: {
            en: '`git pull` is `git fetch` plus `git merge`. It rebases instead only with `--rebase` or `pull.rebase=true`. It can change your branch and files, and can cause conflicts.',
            bn: '`git pull` মানে `git fetch` আর `git merge`। শুধু `--rebase` বা `pull.rebase=true` দিলে এটা merge-এর বদলে rebase করে। এটা আপনার ব্রাঞ্চ আর ফাইল বদলাতে পারে, কনফ্লিক্টও হতে পারে।'
          }
        },
        {
          id: 'pulled',
          work: { node: 'repo', kind: 'result' },
          state: {
            repo: { en: 'HEAD → main → 5c6d7e', bn: 'HEAD → main → 5c6d7e' },
            rtrack: { en: 'Last seen: 77d4e1', bn: 'শেষ দেখা: 77d4e1' }
          },
          title: { en: 'You are caught up with GitHub', bn: 'আপনি GitHub-এর সাথে হালনাগাদ' },
          simple: {
            en: 'You now have their work and yours together, and your note of GitHub is up to date.',
            bn: 'এখন আপনার কাছে তাদের আর আপনার কাজ একসাথে আছে, আর GitHub নিয়ে আপনার নোটও হালনাগাদ।'
          },
          tech: {
            en: 'Merge commit `5c6d7e` (parents `d4e5f6`, `77d4e1`) is on `main`; `origin/main` is `77d4e1`. GitHub lacks `5c6d7e` until you push. Fetching first and inspecting with `git log main..origin/main` gives you more control.',
            bn: 'merge commit `5c6d7e` (parent `d4e5f6`, `77d4e1`) এখন `main`-এ, আর `origin/main` `77d4e1`-এ। push না করা পর্যন্ত GitHub-এ `5c6d7e` নেই। আগে fetch করে `git log main..origin/main` দিয়ে দেখে নিলে নিয়ন্ত্রণ বেশি থাকে।'
          }
        }
      ]
    },
    {
      id: 'conflict',
      label: { en: 'Merge conflict', bn: 'মার্জ কনফ্লিক্ট' },
      branchAfter: 'fetch',
      steps: [
        {
          id: 'clash',
          work: { node: 'repo', kind: 'error' },
          title: { en: 'Both sides changed the same lines', bn: 'দুই পক্ষই একই লাইন বদলেছে' },
          simple: {
            en: 'You and your teammate edited the very same lines of app.py. Git cannot guess whose version is right, so it stops.',
            bn: 'আপনি আর সহকর্মী app.py-র ঠিক একই লাইনগুলো বদলেছেন। কার ভার্সন ঠিক Git আন্দাজ করতে পারে না, তাই থেমে যায়।'
          },
          tech: {
            en: 'Git can merge changes to different lines on its own. When both sides changed the same lines, the merge pauses with the conflicting files marked as unmerged.',
            bn: 'আলাদা লাইনের পরিবর্তন Git নিজেই merge করতে পারে। দুই পক্ষ একই লাইন বদলালে merge থেমে যায়, আর কনফ্লিক্ট হওয়া ফাইলগুলো unmerged হিসেবে চিহ্নিত থাকে।'
          }
        },
        {
          id: 'markers',
          moves: [ { edge: 'conflict', label: '<<<<<<< ======= >>>>>>>' } ],
          state: { wd: { en: 'app.py: conflict', bn: 'app.py: কনফ্লিক্ট' } },
          title: { en: 'Git marks the clash in your file', bn: 'Git ফাইলে কনফ্লিক্ট চিহ্নিত করে' },
          simple: {
            en: 'Git writes both versions into the file, with marker lines around them. Now it is your job to choose.',
            bn: 'Git ফাইলে দুটো ভার্সনই লিখে দেয়, চারপাশে মার্কার লাইন দিয়ে। এখন বেছে নেওয়া আপনার কাজ।'
          },
          tech: {
            en: 'The file gets `<<<<<<<` (your side), `=======` and `>>>>>>>` (theirs). Edit the file to the final text and delete all three marker lines before continuing.',
            bn: 'ফাইলে `<<<<<<<` (আপনার দিক), `=======` আর `>>>>>>>` (তাদের দিক) বসে। এগোনোর আগে ফাইলটা চূড়ান্ত লেখায় এনে তিনটা মার্কার লাইনই মুছে ফেলুন।'
          }
        },
        {
          id: 'resolve',
          moves: [ { edge: 'add', label: 'git add app.py' } ],
          state: {
            wd: { en: 'app.py resolved', bn: 'app.py ঠিক করা হয়েছে' },
            idx: { en: 'app.py staged', bn: 'app.py স্টেজ করা' }
          },
          title: { en: 'You resolve and stage', bn: 'আপনি ঠিক করে স্টেজ করেন' },
          simple: {
            en: 'After fixing the file by hand, you stage it. That tells Git the clash is settled.',
            bn: 'ফাইলটা হাতে ঠিক করে আপনি স্টেজ করেন। এতে Git বোঝে কনফ্লিক্ট মিটে গেছে।'
          },
          tech: {
            en: 'Running `git add app.py` after editing marks the conflict as resolved in the index. `git status` then shows the merge as ready to commit.',
            bn: 'এডিট করার পর `git add app.py` চালালে index-এ কনফ্লিক্টটা resolved হিসেবে চিহ্নিত হয়। তখন `git status` দেখায় merge commit করার জন্য তৈরি।'
          }
        },
        {
          id: 'finish',
          moves: [ { edge: 'commit', label: 'git commit' } ],
          state: {
            repo: { en: 'HEAD → main → 8b9c0d', bn: 'HEAD → main → 8b9c0d' },
            idx: { en: 'Nothing staged', bn: 'কিছু স্টেজ করা নেই' },
            wd: { en: 'No changes', bn: 'কোনো পরিবর্তন নেই' }
          },
          title: { en: 'You finish the merge', bn: 'আপনি merge শেষ করেন' },
          simple: {
            en: 'You commit, and the merge is done. History now holds both versions of the story.',
            bn: 'আপনি commit করেন আর merge শেষ। ইতিহাসে এখন গল্পের দুটো ধারাই আছে।'
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
      label: { en: 'Detached HEAD', bn: 'ডিটাচড HEAD' },
      branchAfter: 'commit',
      steps: [
        {
          id: 'checkout-sha',
          work: { node: 'repo', kind: 'error' },
          state: { repo: { en: 'HEAD → 9f8e7d (no branch)', bn: 'HEAD → 9f8e7d (কোনো ব্রাঞ্চ নেই)' } },
          title: { en: 'You check out an old snapshot', bn: 'আপনি পুরোনো একটা স্ন্যাপশটে যান' },
          simple: {
            en: 'You jump back to an old snapshot by its ID. The “you are here” marker now sits on no branch at all.',
            bn: 'আপনি আইডি ধরে পুরোনো একটা স্ন্যাপশটে ফিরে যান। “আপনি এখানে” মার্কারটা এখন কোনো ব্রাঞ্চেই নেই।'
          },
          tech: {
            en: '`git checkout 9f8e7d` puts a raw SHA in `.git/HEAD` instead of `ref: refs/heads/...`. That is a detached HEAD, and Git warns you about it.',
            bn: '`git checkout 9f8e7d` `.git/HEAD`-এ `ref: refs/heads/...`-এর বদলে সরাসরি একটা SHA বসায়। এটাই detached HEAD, আর Git আপনাকে সতর্ক করে।'
          }
        },
        {
          id: 'orphan-commit',
          moves: [ { edge: 'commit', label: 'git commit' } ],
          state: { repo: { en: 'HEAD → e3f4a5 (no branch)', bn: 'HEAD → e3f4a5 (কোনো ব্রাঞ্চ নেই)' } },
          title: { en: 'A commit that belongs to no branch', bn: 'কোনো ব্রাঞ্চের নয় এমন commit' },
          simple: {
            en: 'Careful: this new commit is on no branch. Leave without saving it, and it becomes very hard to find again.',
            bn: 'সাবধান: এই নতুন commit কোনো ব্রাঞ্চে নেই। সেভ না করে চলে গেলে এটা আবার খুঁজে পাওয়া খুব কঠিন হয়ে যায়।'
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
          title: { en: 'You save it on a branch', bn: 'আপনি ব্রাঞ্চে সেভ করেন' },
          simple: {
            en: 'You give the commit a branch name. Now it has a label, and it is safe.',
            bn: 'আপনি commit-টাকে একটা ব্রাঞ্চের নাম দেন। এখন এর একটা লেবেল আছে, আর এটা নিরাপদ।'
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
        name: { en: 'Your note about the cloud album', bn: 'ক্লাউড অ্যালবাম নিয়ে আপনার নোট' },
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
          en: 'The family album everyone adds to. Your relatives see only what is uploaded here.',
          bn: 'পরিবারের সবার অ্যালবাম, সবাই এতে ছবি যোগ করে। আত্মীয়রা শুধু এখানে আপলোড করা ছবিই দেখে।'
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
