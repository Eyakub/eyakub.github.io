import type { Topic } from '../types'

export const authJwtOauth: Topic = {
  slug: 'auth-jwt-oauth',
  line: 'backend',
  title: { en: 'Auth: JWT & OAuth', bn: 'অথ: JWT ও OAuth' },
  summary: {
    en: 'Anika proves who she is at the front desk. The valet carries a key card, and a stolen ticket fails without the sealed note.',
    bn: 'আনিকা ফ্রন্ট ডেস্কে প্রমাণ করে সে কে। ভ্যালে একটা চাবির কার্ড বহন করে, আর সিল করা নোট ছাড়া চুরি হওয়া টিকিট ব্যর্থ হয়।'
  },
  hook: {
    en: 'Anika shows her passport at the desk, and the valet only carries a key card.',
    bn: 'আনিকা ডেস্কে পাসপোর্ট দেখায়, আর ভ্যালে শুধু একটা চাবির কার্ড বহন করে।'
  },
  story: {
    cast: {
      en: 'Anika wants her bag from the storeroom. A valet must fetch it, but her passport stays at the front desk.',
      bn: 'আনিকা স্টোররুম থেকে তার ব্যাগ চায়। একজন ভ্যালে এনে দেবে, কিন্তু তার পাসপোর্ট ফ্রন্ট ডেস্কেই থাকে।'
    }
  },
  takeaway: {
    en: 'The desk keeps the passport, the ticket is useless without the note, and the door trusts the card’s stripe.',
    bn: 'ডেস্ক পাসপোর্ট রাখে, নোট ছাড়া টিকিট অকেজো, আর দরজা কার্ডের দাগকে বিশ্বাস করে।'
  },
  words: [
    {
      term: { en: 'The sealed note (PKCE)', bn: 'সিল করা নোট (PKCE)' },
      d: { en: 'A secret the valet keeps, and a fingerprint of it that travels first.', bn: 'ভ্যালে যে গোপন কথা রাখে, আর তার একটা ছাপ যা আগে যায়।' }
    },
    {
      term: { en: 'The claim ticket (code)', bn: 'দাবির টিকিট (code)' },
      d: { en: 'A one-time slip the desk gives back, useless without the secret.', bn: 'ডেস্ক যে একবারের স্লিপ ফেরত দেয়, গোপন কথা ছাড়া অকেজো।' }
    },
    {
      term: { en: 'The key card (access token)', bn: 'চাবির কার্ড (access token)' },
      d: { en: 'What the valet shows at the door, instead of the passport.', bn: 'পাসপোর্টের বদলে ভ্যালে দরজায় যা দেখায়।' }
    },
    {
      term: { en: 'The stripe (JWT)', bn: 'দাগ (JWT)' },
      d: { en: 'The card’s writing. Anyone can read it. The signature shows it was not changed.', bn: 'কার্ডের লেখা। যে কেউ পড়তে পারে। স্বাক্ষর বলে সেটা বদলায়নি।' }
    },
    {
      term: { en: 'Who she is (OIDC)', bn: 'সে কে (OIDC)' },
      d: { en: 'A separate card that says who logged in. The key card does not.', bn: 'আলাদা এক কার্ড যা বলে কে ঢুকেছে। চাবির কার্ড বলে না।' }
    },
    {
      term: { en: 'The front desk (authorization server)', bn: 'ফ্রন্ট ডেস্ক (authorization server)' },
      d: { en: 'The only place that sees the passport and issues the card.', bn: 'একমাত্র জায়গা যা পাসপোর্ট দেখে এবং কার্ড দেয়।' }
    }
  ],
  legend: {
    request: { en: 'Asking', bn: 'জিজ্ঞেস' },
    queue: { en: 'Waiting', bn: 'অপেক্ষা' },
    result: { en: 'Allowed', bn: 'মঞ্জুর' },
    error: { en: 'Refused', bn: 'প্রত্যাখ্যান' }
  },
  view: { wide: [1000, 480], narrow: [400, 490] },
  nodeR: { narrow: 20 },
  nodes: {
    anika: {
      icon: 'user',
      name: { en: 'Anika', bn: 'আনিকা' },
      sub: { en: 'Resource owner', bn: 'সম্পদের মালিক' },
      plain: { name: { en: 'Anika', bn: 'আনিকা' }, sub: { en: 'The guest', bn: 'অতিথি' } },
      wide: [160, 140, 'up'],
      narrow: [250, 340, 'left']
    },
    valet: {
      icon: 'box',
      name: { en: 'Client', bn: 'ক্লায়েন্ট' },
      sub: { en: 'Public app', bn: 'পাবলিক অ্যাপ' },
      plain: { name: { en: 'The valet', bn: 'ভ্যালে' }, sub: { en: 'The app', bn: 'অ্যাপ' } },
      wide: [300, 360, 'up'],
      narrow: [250, 55, 'left']
    },
    window: {
      icon: 'route',
      name: { en: 'Browser', bn: 'ব্রাউজার' },
      sub: { en: 'Front channel', bn: 'সামনের পথ' },
      plain: { name: { en: 'The window', bn: 'জানালা' }, sub: { en: 'The browser', bn: 'ব্রাউজার' } },
      wide: [430, 140, 'up'],
      narrow: [250, 150, 'left']
    },
    desk: {
      icon: 'shield',
      name: { en: 'Auth server', bn: 'অনুমোদন' },
      sub: { en: 'Issues the card', bn: 'কার্ড দেয়' },
      plain: { name: { en: 'Front desk', bn: 'ফ্রন্ট ডেস্ক' }, sub: { en: 'Checks you', bn: 'তোমাকে দেখে' } },
      wide: [720, 140, 'up'],
      narrow: [250, 245, 'left']
    },
    door: {
      icon: 'lock',
      name: { en: 'API', bn: 'এপিআই' },
      sub: { en: 'Resource server', bn: 'রিসোর্স সার্ভার' },
      plain: { name: { en: 'The door', bn: 'দরজা' }, sub: { en: 'The room', bn: 'ঘর' } },
      wide: [900, 360, 'up'],
      narrow: [100, 430, 'right']
    }
  },
  corridors: {
    'valet-window': { wide: [[300, 360], [300, 140], [430, 140]], narrow: [[250, 55], [250, 150]] },
    'window-desk': { wide: [[430, 140], [720, 140]], narrow: [[250, 150], [250, 245]] },
    'anika-desk': { wide: [[160, 140], [160, 210], [720, 210], [720, 140]], narrow: [[250, 340], [250, 245]] },
    'valet-desk': { wide: [[300, 360], [300, 430], [800, 430], [800, 140], [720, 140]], narrow: [[250, 55], [370, 55], [370, 245], [250, 245]] },
    'valet-door': { wide: [[300, 360], [900, 360]], narrow: [[250, 55], [40, 55], [40, 430], [100, 430]] }
  },
  edges: {
    'valet-window': { from: 'valet', to: 'window', kind: 'request' },
    'window-desk': { from: 'window', to: 'desk', kind: 'request' },
    'anika-desk': { from: 'anika', to: 'desk', kind: 'result' },
    'desk-window': { from: 'desk', to: 'window', kind: 'result' },
    'window-valet': { from: 'window', to: 'valet', kind: 'result' },
    'valet-desk': { from: 'valet', to: 'desk', kind: 'request' },
    'desk-valet': { from: 'desk', to: 'valet', kind: 'result' },
    'valet-door': { from: 'valet', to: 'door', kind: 'result' }
  },
  main: {
    label: { en: 'Fetch the bag', bn: 'ব্যাগ আনুন' },
    steps: [
      {
        id: 'seal',
        moves: [{ edge: 'valet-window', label: 'Fingerprint', plain: { en: 'Sealed note', bn: 'সিল নোট' } }],
        state: { valet: { en: 'Note sealed', bn: 'নোট সিল' } },
        plainState: { valet: { en: 'Sealed', bn: 'সিল' } },
        story: {
          title: { en: 'She seals a fingerprint', bn: 'সে একটা ছাপ সিল করে' },
          text: {
            en: 'The valet writes a secret on a note and seals a fingerprint of it. Only the fingerprint goes to the window.',
            bn: 'ভ্যালে একটা নোটে গোপন কথা লেখে এবং তার একটা ছাপ সিল করে। শুধু ছাপটা জানালায় যায়।'
          }
        },
        title: { en: 'She seals a fingerprint', bn: 'সে একটা ছাপ সিল করে' },
        simple: {
          en: 'The valet writes a secret and sends only a fingerprint of it ahead.',
          bn: 'ভ্যালে একটা গোপন কথা লেখে এবং শুধু তার একটা ছাপ আগে পাঠায়।'
        },
        tech: {
          en: 'A `code_verifier` is 43 to 128 unreserved characters, fresh for each request. The client sends `code_challenge`, the base64url SHA-256 of that secret, with method `S256`. Use `plain` only if the client cannot do `S256`.',
          bn: 'একটা `code_verifier` ৪৩ থেকে ১২৮ অসংরক্ষিত অক্ষর, প্রতি অনুরোধে নতুন। ক্লায়েন্ট `code_challenge` পাঠায়, সেই গোপন কথার base64url SHA-256, পদ্ধতি `S256`। `plain` শুধু তখনই, যখন ক্লায়েন্ট `S256` করতে পারে না।'
        }
      },
      {
        id: 'ask',
        moves: [{ edge: 'window-desk', label: 'To the desk', plain: { en: 'Send her', bn: 'তাকে পাঠাও' } }],
        state: { desk: { en: 'Expecting her', bn: 'তাকে আশা করছে' } },
        plainState: { desk: { en: 'Waiting', bn: 'অপেক্ষা' } },
        story: {
          title: { en: 'The window takes her', bn: 'জানালা তাকে নিয়ে যায়' },
          text: {
            en: 'The window takes Anika to the front desk. The desk will only send her back to an address it already knows.',
            bn: 'জানালা আনিকাকে ফ্রন্ট ডেস্কে নিয়ে যায়। ডেস্ক তাকে শুধু সেই ঠিকানায় ফেরত পাঠাবে যা সে আগে থেকে জানে।'
          }
        },
        title: { en: 'The window takes her there', bn: 'জানালা তাকে সেখানে নিয়ে যায়' },
        simple: {
          en: 'Anika is sent to the front desk, and the return address must be one the desk already knows.',
          bn: 'আনিকাকে ফ্রন্ট ডেস্কে পাঠানো হয়, আর ফেরার ঠিকানা এমন হতে হবে যা ডেস্ক আগে থেকে জানে।'
        },
        tech: {
          en: 'The browser is sent to the authorization endpoint with `response_type=code`, the client id, the fingerprint, and a `state` value. `redirect_uri` must match a registered address by exact string comparison. `state` comes back unchanged so the client can reject a forged return.',
          bn: 'ব্রাউজারকে অনুমোদন এন্ডপয়েন্টে পাঠানো হয় `response_type=code`, ক্লায়েন্ট আইডি, ছাপ, আর একটা `state` মান সহ। `redirect_uri` নিবন্ধিত ঠিকানার সঙ্গে হুবহু স্ট্রিং মিলতে হবে। `state` অপরিবর্তিত ফিরে আসে যাতে ক্লায়েন্ট জাল ফেরত প্রত্যাখ্যান করতে পারে।'
        }
      },
      {
        id: 'vouch',
        moves: [{ edge: 'anika-desk', label: 'Her passport', plain: { en: 'She vouches', bn: 'সে সাক্ষ্য দেয়' } }],
        state: { desk: { en: 'Checking her', bn: 'তাকে দেখছে' } },
        plainState: { desk: { en: 'Checking', bn: 'দেখছে' } },
        story: {
          title: { en: 'She shows her passport', bn: 'সে পাসপোর্ট দেখায়' },
          text: {
            en: 'Anika shows her passport at the desk and agrees what the valet may fetch. The valet never sees the passport.',
            bn: 'আনিকা ডেস্কে পাসপোর্ট দেখায় এবং রাজি হয় ভ্যালে কী আনতে পারবে। ভ্যালে কখনো পাসপোর্ট দেখে না।'
          }
        },
        title: { en: 'She shows her passport', bn: 'সে পাসপোর্ট দেখায়' },
        simple: {
          en: 'She shows her passport at the desk and agrees what the valet may do. The valet never sees the passport.',
          bn: 'সে ডেস্কে পাসপোর্ট দেখায় এবং রাজি হয় ভ্যালে কী করতে পারবে। ভ্যালে কখনো পাসপোর্ট দেখে না।'
        },
        tech: {
          en: 'The resource owner authenticates only with the authorization server, so the password never reaches the client. The server then asks what the client may do. Public clients must use this code flow with PKCE. The password grant is not allowed.',
          bn: 'সম্পদের মালিক শুধু অনুমোদন সার্ভারের কাছে পরিচয় দেয়, তাই পাসওয়ার্ড কখনো ক্লায়েন্টে পৌঁছায় না। সার্ভার তারপর জিজ্ঞেস করে ক্লায়েন্ট কী করতে পারবে। পাবলিক ক্লায়েন্টকে এই কোড ফ্লো PKCE সহ ব্যবহার করতে হয়। পাসওয়ার্ড গ্রান্ট চলে না।'
        }
      },
      {
        id: 'ticket',
        moves: [
          { edge: 'desk-window', label: 'One ticket', plain: { en: 'The ticket', bn: 'টিকিট' } },
          { edge: 'window-valet', label: 'One ticket', plain: { en: 'The ticket', bn: 'টিকিট' } }
        ],
        state: { valet: { en: 'Has the ticket', bn: 'টিকিট আছে' } },
        plainState: { valet: { en: 'Has ticket', bn: 'টিকিট আছে' } },
        story: {
          title: { en: 'A one-time ticket', bn: 'একবারের টিকিট' },
          text: {
            en: 'The desk sends her back through the window with a one-time ticket. It expires soon, and it can be used only once.',
            bn: 'ডেস্ক তাকে জানালা দিয়ে একবারের টিকিটসহ ফেরত পাঠায়। সেটা শিগগির মেয়াদোত্তীর্ণ হয়, এবং একবারই ব্যবহার করা যায়।'
          }
        },
        title: { en: 'A one-time ticket comes back', bn: 'একবারের টিকিট ফিরে আসে' },
        simple: {
          en: 'The desk sends her back with a one-time ticket. It expires soon, and it works only once.',
          bn: 'ডেস্ক তাকে একবারের টিকিটসহ ফেরত পাঠায়। সেটা শিগগির মেয়াদ শেষ হয়, এবং একবারই কাজ করে।'
        },
        tech: {
          en: 'The server redirects back with a one-time `code` and the same `state`. The code must expire shortly. Ten minutes is the recommended maximum. Using a code twice must be denied, and tokens already issued from it should be revoked.',
          bn: 'সার্ভার একবারের `code` আর সেই একই `state` নিয়ে ফেরত পাঠায়। কোড শিগগির মেয়াদোত্তীর্ণ হতে হবে। দশ মিনিট সুপারিশকৃত সর্বোচ্চ। একটা কোড দুবার ব্যবহার করলে প্রত্যাখ্যান করতে হবে, এবং সেই কোড থেকে আগে দেওয়া টোকেন বাতিল করা উচিত।'
        }
      },
      {
        id: 'swap',
        moves: [{ edge: 'valet-desk', label: 'The secret', plain: { en: 'Open note', bn: 'খোলা নোট' } }],
        state: { desk: { en: 'Matching', bn: 'মিলিয়ে দেখছে' } },
        plainState: { desk: { en: 'Matching', bn: 'মিলাচ্ছে' } },
        story: {
          title: { en: 'The note matches', bn: 'নোট মিলে যায়' },
          text: {
            en: 'Back at the desk, the valet opens the note. The fingerprint matches, so the ticket can be spent.',
            bn: 'আবার ডেস্কে ভ্যালে নোট খোলে। ছাপ মিলে যায়, তাই টিকিট খরচ করা যায়।'
          }
        },
        title: { en: 'The note matches', bn: 'নোট মিলে যায়' },
        simple: {
          en: 'The valet shows the secret note. The desk checks that its fingerprint matches, then the ticket can be spent.',
          bn: 'ভ্যালে গোপন নোট দেখায়। ডেস্ক দেখে তার ছাপ মিলেছে কিনা, তারপর টিকিট খরচ করা যায়।'
        },
        tech: {
          en: 'The token request is a back-channel POST with the code and the `code_verifier`. The server hashes the verifier and compares it to the stored challenge. A mismatch returns `invalid_grant`. The secret never traveled through the browser.',
          bn: 'টোকেন অনুরোধ একটা ব্যাক-চ্যানেল POST, কোড আর `code_verifier` সহ। সার্ভার ভেরিফায়ার হ্যাশ করে জমানো চ্যালেঞ্জের সঙ্গে মেলায়। না মিললে `invalid_grant` আসে। গোপন কথা কখনো ব্রাউজার দিয়ে যায়নি।'
        }
      },
      {
        id: 'card',
        moves: [{ edge: 'desk-valet', label: 'The key card', plain: { en: 'Key card', bn: 'চাবির কার্ড' } }],
        state: { valet: { en: 'Has the card', bn: 'কার্ড আছে' } },
        plainState: { valet: { en: 'Has card', bn: 'কার্ড আছে' } },
        story: {
          title: { en: 'A card for the valet', bn: 'ভ্যালের জন্য এক কার্ড' },
          text: {
            en: 'The desk gives the valet a key card. If there is a longer slip, it stays with the valet and is never shown at the door.',
            bn: 'ডেস্ক ভ্যালেকে একটা চাবির কার্ড দেয়। লম্বা একটা স্লিপ থাকলে সেটা ভ্যালের কাছে থাকে এবং দরজায় কখনো দেখানো হয় না।'
          }
        },
        title: { en: 'A key card for the valet', bn: 'ভ্যালের জন্য চাবির কার্ড' },
        simple: {
          en: 'The desk hands the valet a key card. A longer slip, if there is one, stays with the valet and is never shown at the door.',
          bn: 'ডেস্ক ভ্যালেকে একটা চাবির কার্ড দেয়। লম্বা একটা স্লিপ থাকলে সেটা ভ্যালের কাছে থাকে এবং দরজায় কখনো দেখানো হয় না।'
        },
        tech: {
          en: 'The server returns an access token and, optionally, a refresh token that is sent only back to the authorization server. The spec fixes no lifetime. `expires_in` is recommended when one is set. OpenID Connect may add an `id_token`.',
          bn: 'সার্ভার একটা অ্যাক্সেস টোকেন দেয় এবং, ঐচ্ছিকভাবে, একটা রিফ্রেশ টোকেন যা শুধু অনুমোদন সার্ভারে ফেরত যায়। স্পেক কোনো মেয়াদ স্থির করে না। মেয়াদ থাকলে `expires_in` সুপারিশ করা হয়। OpenID Connect একটা `id_token` যোগ করতে পারে।'
        }
      },
      {
        id: 'show',
        moves: [{ edge: 'valet-door', label: 'Show the card', plain: { en: 'Show it', bn: 'দেখাও' } }],
        state: { door: { en: 'Reading', bn: 'পড়ছে' } },
        plainState: { door: { en: 'Reading', bn: 'পড়ছে' } },
        story: {
          title: { en: 'The door reads the card', bn: 'দরজা কার্ড পড়ে' },
          text: {
            en: 'The valet shows the card at the door. The door reads the stripe and the expiry and does not call the desk.',
            bn: 'ভ্যালে দরজায় কার্ড দেখায়। দরজা দাগ আর মেয়াদ পড়ে এবং ডেস্কে ফোন করে না।'
          }
        },
        title: { en: 'The door reads the card', bn: 'দরজা কার্ড পড়ে' },
        simple: {
          en: 'The valet shows the card at the door. The door reads the stripe and the expiry, and does not call the desk.',
          bn: 'ভ্যালে দরজায় কার্ড দেখায়। দরজা দাগ আর মেয়াদ পড়ে, এবং ডেস্কে ফোন করে না।'
        },
        tech: {
          en: 'The client calls the door with `Authorization: Bearer` and the access token. The door checks the signature and `exp` locally, and refuses the card when `aud` is present and does not name this door. No call back to the desk.',
          bn: 'ক্লায়েন্ট দরজাকে `Authorization: Bearer` আর অ্যাক্সেস টোকেন দিয়ে ডাকে। দরজা স্বাক্ষর আর `exp` স্থানীয়ভাবে দেখে, এবং `aud` থাকলে আর এই দরজার নাম না থাকলে কার্ড প্রত্যাখ্যান করে। ডেস্কে আর ফোন নেই।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'stolen',
      label: { en: 'Stolen ticket', bn: 'চুরি হওয়া টিকিট' },
      branchAfter: 'ticket',
      whatIf: { en: 'What if someone grabs the claim ticket but not the sealed note?', bn: 'কেউ যদি দাবির টিকিট নেয়, কিন্তু সিল করা নোট না নেয়?' },
      steps: [
        {
          id: 'snatch',
          work: { node: 'desk', kind: 'queue' },
          state: { desk: { en: 'Ticket only', bn: 'শুধু টিকিট' } },
          plainState: { desk: { en: 'No note', bn: 'নোট নেই' } },
          story: {
            title: { en: 'The ticket, no note', bn: 'টিকিট, নোট নেই' },
            text: {
              en: 'Someone else arrives with the ticket and asks for the card. They do not have the sealed note.',
              bn: 'অন্য কেউ টিকিট নিয়ে আসে এবং কার্ড চায়। তাদের কাছে সিল করা নোট নেই।'
            }
          },
          title: { en: 'The ticket without the note', bn: 'নোট ছাড়া টিকিট' },
          simple: {
            en: 'A stranger brings the ticket and asks for the card. The sealed note is still with the valet.',
            bn: 'একজন অচেনা লোক টিকিট আনে এবং কার্ড চায়। সিল করা নোট এখনো ভ্যালের কাছে।'
          },
          tech: {
            en: 'The authorization code came back through the browser, so another app on the device can intercept it. The thief has the code and not the `code_verifier` that never left the real client.',
            bn: 'অনুমোদন কোড ব্রাউজার দিয়ে ফিরে এসেছে, তাই ডিভাইসের অন্য অ্যাপ সেটা আটকাতে পারে। চোরের কাছে কোড আছে, কিন্তু `code_verifier` নেই যা আসল ক্লায়েন্টের কাছ থেকে বেরোয়নি।'
          }
        },
        {
          id: 'refuse',
          work: { node: 'desk', kind: 'error' },
          state: { desk: { en: 'Refused', bn: 'প্রত্যাখ্যান' } },
          plainState: { desk: { en: 'Refused', bn: 'প্রত্যাখ্যান' } },
          story: {
            title: { en: 'The desk refuses', bn: 'ডেস্ক প্রত্যাখ্যান করে' },
            text: {
              en: 'The fingerprint does not match, so the desk refuses the card. The ticket alone is not enough.',
              bn: 'ছাপ মিলে না, তাই ডেস্ক কার্ড দেয় না। শুধু টিকিট যথেষ্ট নয়।'
            }
          },
          title: { en: 'The desk refuses the card', bn: 'ডেস্ক কার্ড দেয় না' },
          simple: {
            en: 'The fingerprint does not match, so the desk refuses. The ticket alone cannot collect the card.',
            bn: 'ছাপ মিলে না, তাই ডেস্ক প্রত্যাখ্যান করে। শুধু টিকিট দিয়ে কার্ড মেলে না।'
          },
          tech: {
            en: 'The token endpoint hashes the verifier and compares it with the stored challenge. They differ, so the server returns `invalid_grant` and issues no token. Public clients must send PKCE. For confidential clients it is recommended.',
            bn: 'টোকেন এন্ডপয়েন্ট ভেরিফায়ার হ্যাশ করে জমানো চ্যালেঞ্জের সঙ্গে মেলায়। তারা আলাদা, তাই সার্ভার `invalid_grant` দেয় এবং কোনো টোকেন দেয় না। পাবলিক ক্লায়েন্টকে PKCE পাঠাতেই হয়। গোপন ক্লায়েন্টের জন্য সেটা সুপারিশ করা হয়।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'A hotel desk. The passport stays there, the valet carries a key card, and the door reads the stripe.',
      bn: 'একটা হোটেল ডেস্ক। পাসপোর্ট সেখানে থাকে, ভ্যালে চাবির কার্ড বহন করে, আর দরজা দাগ পড়ে।'
    },
    twins: [
      { node: 'anika', icon: 'user', name: { en: 'Anika', bn: 'আনিকা' }, d: { en: 'The guest who shows a passport and agrees what may be fetched.', bn: 'অতিথি যে পাসপোর্ট দেখায় এবং রাজি হয় কী আনা যাবে।' } },
      { node: 'valet', icon: 'box', name: { en: 'The valet', bn: 'ভ্যালে' }, d: { en: 'The app that fetches the bag and never sees the passport.', bn: 'অ্যাপ যে ব্যাগ আনে এবং পাসপোর্ট কখনো দেখে না।' } },
      { node: 'window', icon: 'route', name: { en: 'The window', bn: 'জানালা' }, d: { en: 'The browser that carries Anika to the desk and back.', bn: 'ব্রাউজার যা আনিকাকে ডেস্কে এবং ফেরত নিয়ে যায়।' } },
      { node: 'desk', icon: 'shield', name: { en: 'Front desk', bn: 'ফ্রন্ট ডেস্ক' }, d: { en: 'The only counter that sees the passport and issues the card.', bn: 'একমাত্র কাউন্টার যা পাসপোর্ট দেখে এবং কার্ড দেয়।' } },
      { node: 'door', icon: 'lock', name: { en: 'The door', bn: 'দরজা' }, d: { en: 'The room that reads the card and does not call the desk.', bn: 'ঘর যা কার্ড পড়ে এবং ডেস্কে ফোন করে না।' } }
    ]
  },
  qa: [
    {
      q: { en: 'Is the stripe on the card encrypted?', bn: 'কার্ডের দাগ কি এনক্রিপ্টেড?' },
      short: { en: 'Usually no. Anyone can read the writing. The signature shows it was not changed.', bn: 'সাধারণত না। যে কেউ লেখা পড়তে পারে। স্বাক্ষর বলে সেটা বদলায়নি।' },
      deep: {
        en: 'A JWT is a set of claims. It can be a signed token (the usual case) or an encrypted one. Header and payload of a signed token are base64url JSON, so they are readable. Do not put a password or other secret in them. Integrity comes from the signature, checked with the algorithm you name.',
        bn: 'একটা JWT হলো এক সেট দাবি। সেটা স্বাক্ষরিত টোকেন হতে পারে (স্বাভাবিক ক্ষেত্রে) অথবা এনক্রিপ্টেড। স্বাক্ষরিত টোকেনের হেডার আর পেলোড base64url JSON, তাই পড়া যায়। সেখানে পাসওয়ার্ড বা অন্য গোপন কথা রাখবেন না। অখণ্ডতা আসে স্বাক্ষর থেকে, যে অ্যালগরিদম আপনি নাম দেন সেটা দিয়ে যাচাই করা হয়।'
      },
      redFlag: { en: '“The card is encrypted, so the password can live on it.”', bn: '“কার্ড এনক্রিপ্টেড, তাই পাসওয়ার্ড তার ওপর থাকতে পারে।”' }
    },
    {
      q: { en: 'Why seal a note if the valet already has a secret of its own?', bn: 'ভ্যালের নিজের গোপন কথা থাকলেও নোট সিল করতে হয় কেন?' },
      short: { en: 'A public app cannot keep a secret. The note binds the ticket to the app that started.', bn: 'একটা পাবলিক অ্যাপ গোপন কথা রাখতে পারে না। নোট টিকিটকে সেই অ্যাপের সঙ্গে বাঁধে যে শুরু করেছিল।' },
      deep: {
        en: 'Public clients must use PKCE. For confidential clients it is recommended, because a client secret does not prove that this token request is the one that started the redirect. The server must support PKCE, and if a challenge was sent it must require the verifier. Clients that can hash must use S256. The plain method is only for a client that cannot.',
        bn: 'পাবলিক ক্লায়েন্টকে PKCE ব্যবহার করতেই হয়। গোপন ক্লায়েন্টের জন্য সেটা সুপারিশ করা হয়, কারণ ক্লায়েন্ট সিক্রেট প্রমাণ করে না যে এই টোকেন অনুরোধই রিডাইরেক্ট শুরু করেছিল। সার্ভারকে PKCE সমর্থন করতে হয়, এবং চ্যালেঞ্জ গেলে ভেরিফায়ার চাইতে হয়। যে ক্লায়েন্ট হ্যাশ করতে পারে তাকে S256 ব্যবহার করতে হয়। plain পদ্ধতি শুধু সেই ক্লায়েন্টের জন্য যে পারে না।'
      },
      redFlag: { en: '“The sealed note encrypts the ticket.”', bn: '“সিল করা নোট টিকিট এনক্রিপ্ট করে।”' }
    },
    {
      q: { en: 'Does the key card say who logged in?', bn: 'চাবির কার্ড কি বলে কে ঢুকেছে?' },
      short: { en: 'No. The key card says what the valet may do. A separate card says who she is.', bn: 'না। চাবির কার্ড বলে ভ্যালে কী করতে পারবে। আলাদা এক কার্ড বলে সে কে।' },
      deep: {
        en: 'OAuth 2.0 is delegated authorization: the access token is for the resource server. OpenID Connect adds an ID token so the client can tell who authenticated. Do not treat the access token as proof of identity for your own login. The refresh token, if any, goes back only to the authorization server.',
        bn: 'OAuth 2.0 হলো অর্পিত অনুমোদন: অ্যাক্সেস টোকেন রিসোর্স সার্ভারের জন্য। OpenID Connect একটা আইডি টোকেন যোগ করে যাতে ক্লায়েন্ট বুঝতে পারে কে পরিচয় দিয়েছে। নিজের লগইনের প্রমাণ হিসেবে অ্যাক্সেস টোকেন নেবেন না। রিফ্রেশ টোকেন থাকলে সেটা শুধু অনুমোদন সার্ভারে ফেরে।'
      },
      redFlag: { en: '“OAuth is a login protocol.”', bn: '“OAuth একটা লগইন প্রোটোকল।”' }
    },
    {
      q: { en: 'Why not hand the passport to the valet?', bn: 'পাসপোর্ট ভ্যালেকে দিলে হয় না কেন?' },
      short: { en: 'Then every leak of the valet leaks the passport. The password grant is not allowed.', bn: 'তাহলে ভ্যালের প্রতিটি ফাঁস পাসপোর্ট ফাঁস করে। পাসওয়ার্ড গ্রান্ট চলে না।' },
      deep: {
        en: 'The resource owner password credentials grant must not be used. It gives the password to the client, trains people to type it somewhere other than the authorization server, and does not fit a login that needs more than one step. The code flow keeps that password at the authorization server.',
        bn: 'রিসোর্স মালিকের পাসওয়ার্ড গ্রান্ট ব্যবহার করা যাবে না। সেটা পাসওয়ার্ড ক্লায়েন্টকে দেয়, মানুষকে অনুমোদন সার্ভার ছাড়া অন্য জায়গায় সেটা টাইপ করতে শেখায়, এবং একের বেশি ধাপের লগইনের সঙ্গে খাপ খায় না। কোড ফ্লো সেই পাসওয়ার্ড অনুমোদন সার্ভারে রাখে।'
      },
      redFlag: { en: '“The app is ours, so it can ask for the password.”', bn: '“অ্যাপ আমাদের, তাই সে পাসওয়ার্ড চাইতে পারে।”' }
    },
    {
      q: { en: 'Can the desk cancel a card the valet already holds?', bn: 'ভ্যালে যে কার্ড ধরে আছে ডেস্ক কি সেটা বাতিল করতে পারে?' },
      short: { en: 'Not by forgetting it. The door is not calling the desk. Short expiry is the usual limit.', bn: 'ভুলে গিয়ে নয়। দরজা ডেস্কে ফোন করছে না। ছোট মেয়াদই স্বাভাবিক সীমা।' },
      deep: {
        en: 'A signed token is checked from its own stripe, so deleting a row at the desk does not make the door forget the card before `exp`. Keep the lifetime short. A public client’s refresh token must be sender-constrained or rotated. Claims such as `iss`, `sub`, `aud`, `exp`, and `nbf` are optional in the JWT spec. When `exp` is present the door must not accept the card on or after that time, and when `aud` is present the door must be named in it.',
        bn: 'স্বাক্ষরিত টোকেন তার নিজের দাগ থেকে যাচাই হয়, তাই ডেস্কে একটা সারি মুছলে `exp`-এর আগে দরজা কার্ড ভোলে না। মেয়াদ ছোট রাখুন। পাবলিক ক্লায়েন্টের রিফ্রেশ টোকেন প্রেরক-বাধা অথবা ঘোরানো হতে হবে। `iss`, `sub`, `aud`, `exp`, `nbf` JWT স্পেকে ঐচ্ছিক। `exp` থাকলে সেই সময় বা তার পরে দরজা কার্ড নিতে পারবে না, আর `aud` থাকলে দরজার নাম সেখানে থাকতে হবে।'
      },
      redFlag: { en: '“Delete it at the desk and every door forgets it.”', bn: '“ডেস্কে মুছে ফেললে প্রতিটি দরজা ভুলে যায়।”' }
    }
  ],
  cheats: [
    { code: 'GET /authorize?response_type=code&client_id=app&redirect_uri=https%3A%2F%2Fapp%2Fcb&state=xyz&code_challenge=CHALLENGE&code_challenge_method=S256', d: { en: 'Send Anika to the desk with the fingerprint, not the secret.', bn: 'আনিকাকে ডেস্কে পাঠান ছাপসহ, গোপন কথা নয়।' } },
    { code: 'curl -X POST $TOKEN_URL -d grant_type=authorization_code -d code=$CODE -d code_verifier=$VERIFIER -d client_id=app -d redirect_uri=https://app/cb', d: { en: 'Spend the ticket on the back channel and reveal the secret.', bn: 'ব্যাক চ্যানেলে টিকিট খরচ করুন এবং গোপন কথা দেখান।' } },
    { code: 'curl -H "Authorization: Bearer $TOKEN" https://door.example/bag', d: { en: 'Show the key card at the door.', bn: 'দরজায় চাবির কার্ড দেখান।' } },
    { code: 'jwt.decode(token, key, algorithms=["RS256"])', d: { en: 'Check the signature, and name the algorithms you accept.', bn: 'স্বাক্ষর দেখুন, এবং যে অ্যালগরিদম আপনি মানেন সেগুলোর নাম দিন।' } },
    { code: 'curl -X POST $TOKEN_URL -d grant_type=refresh_token -d refresh_token=$REFRESH -d client_id=app', d: { en: 'Ask the desk for a new card. The refresh slip is not shown at the door.', bn: 'ডেস্কের কাছে নতুন কার্ড চান। রিফ্রেশ স্লিপ দরজায় দেখানো হয় না।' } }
  ],
  sources: [
    { label: 'RFC 6749: OAuth 2.0', url: 'https://www.rfc-editor.org/rfc/rfc6749' },
    { label: 'RFC 7636: PKCE', url: 'https://www.rfc-editor.org/rfc/rfc7636' },
    { label: 'RFC 6750: Bearer tokens', url: 'https://www.rfc-editor.org/rfc/rfc6750' },
    { label: 'RFC 7519: JWT', url: 'https://www.rfc-editor.org/rfc/rfc7519' },
    { label: 'RFC 9700: OAuth 2.0 security BCP', url: 'https://www.rfc-editor.org/rfc/rfc9700' },
    { label: 'OpenID Connect Core', url: 'https://openid.net/specs/openid-connect-core-1_0.html' }
  ],
  film: {
    src: '/learn/auth-jwt-oauth.mp4',
    note: {
      en: 'An intercepted authorization code without the code_verifier returns invalid_grant. Public clients must send PKCE. For confidential clients it is recommended.',
      bn: 'code_verifier ছাড়া আটকানো authorization code invalid_grant দেয়। পাবলিক ক্লায়েন্টকে PKCE পাঠাতেই হয়। গোপন ক্লায়েন্টের জন্য সেটা সুপারিশ করা হয়।'
    }
  }
}
