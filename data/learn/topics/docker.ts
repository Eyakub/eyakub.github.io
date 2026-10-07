import type { Topic } from '../types'
import { UI } from '../ui'

export const docker: Topic = {
  slug: 'docker',
  line: 'devops',
  title: { en: 'Docker', bn: 'Docker' },
  summary: {
    en: 'How a Dockerfile becomes an image, travels through a registry, and runs as a container, with a volume for data that must survive.',
    bn: 'একটা Dockerfile কীভাবে image হয়, registry হয়ে অন্য মেশিনে যায়, আর container হিসেবে চলে, সাথে যে data টিকে থাকা দরকার তার জন্য volume।'
  },
  hook: {
    en: 'Docker packs your app and all it needs into a sealed meal kit, so any kitchen can cook it the same way.',
    bn: 'Docker আপনার অ্যাপ আর তার দরকারি সবকিছু একটা সিল করা মিল কিটে ভরে দেয়, যাতে যেকোনো রান্নাঘর সেটা একইভাবে রাঁধতে পারে।'
  },
  story: {
    cast: {
      en: 'Rumana writes a recipe card and packs it into a meal kit, Nusrat keeps the shop shelf, and Hasan cooks the kit in his own kitchen.',
      bn: 'রুমানা একটা রেসিপি কার্ড লিখে সেটা মিল কিটে গুছিয়ে রাখে, নুসরাত দোকানের তাক সামলায়, আর হাসান নিজের রান্নাঘরে কিটটা দিয়ে রান্না করে।'
    }
  },
  takeaway: {
    en: 'An image is a template, a container is a running copy, and only a volume keeps data when the copy goes.',
    bn: 'image হলো template, container তার চালু কপি, আর কপি মুছলে data টিকিয়ে রাখে শুধু volume।'
  },
  words: [
    {
      term: { en: 'Recipe card (Dockerfile)', bn: 'রেসিপি কার্ড (Dockerfile)' },
      d: {
        en: 'A text file listing the steps to build your app’s kit, in order.',
        bn: 'একটা টেক্সট ফাইল, যাতে আপনার অ্যাপের কিট বানানোর ধাপগুলো ক্রমে লেখা থাকে।'
      }
    },
    {
      term: { en: 'Meal kit (image)', bn: 'মিল কিট (image)' },
      d: {
        en: 'A sealed, unchangeable package of your app and everything it needs, built from layers.',
        bn: 'আপনার অ্যাপ আর তার দরকারি সবকিছুর সিল করা, না-বদলানো প্যাকেজ, স্তরে স্তরে তৈরি।'
      }
    },
    {
      term: { en: 'Stacked trays (layers)', bn: 'থাকে থাকে ট্রে (layer)' },
      d: {
        en: 'Each recipe step adds a tray, and a tray that did not change is reused.',
        bn: 'রেসিপির প্রতিটি ধাপ একটা করে ট্রে যোগ করে, আর যে ট্রে বদলায়নি সেটা আবার কাজে লাগে।'
      }
    },
    {
      term: { en: 'Shop shelf (registry)', bn: 'দোকানের তাক (registry)' },
      d: {
        en: 'A shared place that stores kits, so any kitchen can fetch one.',
        bn: 'কিট জমা রাখার একটা ভাগ করা জায়গা, যেখান থেকে যেকোনো রান্নাঘর একটা কিট আনতে পারে।'
      }
    },
    {
      term: { en: 'Cooked meal (container)', bn: 'রান্না করা খাবার (container)' },
      d: {
        en: 'A running copy made from a kit. You can cook many meals from one kit.',
        bn: 'একটা কিট থেকে বানানো চালু কপি। একটা কিট থেকে অনেক খাবার রান্না করা যায়।'
      }
    },
    {
      term: { en: 'Leftovers box (volume)', bn: 'বাড়তি খাবারের বক্স (volume)' },
      d: {
        en: 'Storage kept outside the pot, so food survives when the pot is thrown away.',
        bn: 'হাঁড়ির বাইরে রাখা জায়গা, তাই হাঁড়ি ফেলে দিলেও খাবার থেকে যায়।'
      }
    }
  ],
  legend: {
    request: { en: 'A step you start', bn: 'আপনার শুরু করা ধাপ' },
    queue: { en: 'Quietly piling up', bn: 'চুপচাপ জমছে' },
    result: { en: 'Made or kept', bn: 'তৈরি বা রাখা' },
    error: { en: 'Something went wrong', bn: 'কিছু গোলমাল হয়েছে' }
  },
  view: { wide: [ 1000, 340 ], narrow: [ 400, 520 ] },
  nodeR: { narrow: 20 },
  nodes: {
    dev: {
      icon: 'user',
      name: { en: 'Developer', bn: 'ডেভেলপার' },
      sub: { en: 'Writes and ships', bn: 'লেখে আর পাঠায়' },
      plain: {
        name: { en: 'You', bn: 'আপনি' },
        sub: { en: 'Writes the recipe', bn: 'রেসিপি লেখেন' }
      },
      wide: [ 75, 215, 'down' ],
      narrow: [ 85, 34, 'right' ]
    },
    dockerfile: {
      icon: 'code',
      name: { en: 'Dockerfile', bn: 'Dockerfile' },
      sub: { en: 'Build instructions', bn: 'build-এর নির্দেশ' },
      plain: {
        name: { en: 'Recipe card', bn: 'রেসিপি কার্ড' },
        sub: { en: 'Steps to follow', bn: 'মেনে চলার ধাপ' }
      },
      wide: [ 270, 215, 'down' ],
      narrow: [ 85, 112, 'right' ]
    },
    image: {
      icon: 'box',
      name: { en: 'Image', bn: 'Image' },
      sub: { en: 'Read-only layers', bn: 'read-only layer' },
      plain: {
        name: { en: 'Meal kit', bn: 'মিল কিট' },
        sub: { en: 'Sealed, stacked trays', bn: 'সিল করা, থাকে থাকে ট্রে' }
      },
      wide: [ 480, 215, 'down' ],
      narrow: [ 85, 195, 'right' ]
    },
    registry: {
      icon: 'cloud',
      name: { en: 'Registry', bn: 'Registry' },
      sub: { en: 'Shared image shelf', bn: 'ভাগ করা image-এর তাক' },
      plain: {
        name: { en: 'Shop shelf', bn: 'দোকানের তাক' },
        sub: { en: 'Kits wait here', bn: 'কিট এখানে থাকে' }
      },
      wide: [ 480, 70, 'right' ],
      narrow: [ 185, 295, 'right' ]
    },
    container: {
      icon: 'power',
      name: { en: 'Container', bn: 'Container' },
      sub: { en: 'A running copy', bn: 'একটা চালু কপি' },
      plain: {
        name: { en: 'Cooked meal', bn: 'রান্না করা খাবার' },
        sub: { en: 'Made from the kit', bn: 'কিট থেকে বানানো' }
      },
      wide: [ 700, 215, 'down' ],
      narrow: [ 85, 372, 'right' ]
    },
    volume: {
      icon: 'archive',
      name: { en: 'Volume', bn: 'Volume' },
      sub: { en: 'Data that survives', bn: 'যে data টিকে থাকে' },
      plain: {
        name: { en: 'Leftovers box', bn: 'বাড়তি খাবারের বক্স' },
        sub: { en: 'Kept outside the pot', bn: 'হাঁড়ির বাইরে রাখা' }
      },
      wide: [ 900, 215, 'down' ],
      narrow: [ 85, 482, 'right' ]
    }
  },
  corridors: {
    'dev-dockerfile': { wide: [ [ 75, 215 ], [ 270, 215 ] ], narrow: [ [ 85, 34 ], [ 85, 112 ] ] },
    'dockerfile-image': { wide: [ [ 270, 215 ], [ 480, 215 ] ], narrow: [ [ 85, 112 ], [ 85, 195 ] ] },
    'image-registry': { wide: [ [ 480, 215 ], [ 480, 70 ] ], narrow: [ [ 85, 195 ], [ 185, 295 ] ] },
    'image-container': { wide: [ [ 480, 215 ], [ 700, 215 ] ], narrow: [ [ 85, 195 ], [ 85, 372 ] ] },
    'container-volume': { wide: [ [ 700, 215 ], [ 900, 215 ] ], narrow: [ [ 85, 372 ], [ 85, 482 ] ] }
  },
  edges: {
    'dev-dockerfile': { from: 'dev', to: 'dockerfile', kind: 'request' },
    'dockerfile-image': { from: 'dockerfile', to: 'image', kind: 'request' },
    'image-registry': { from: 'image', to: 'registry', kind: 'request' },
    'registry-image': { from: 'registry', to: 'image', kind: 'result' },
    'image-container': { from: 'image', to: 'container', kind: 'request' },
    'container-volume': { from: 'container', to: 'volume', kind: 'request' },
    'volume-container': { from: 'volume', to: 'container', kind: 'result' }
  },
  main: {
    label: UI.routeMain,
    steps: [
      {
        id: 'recipe',
        moves: [ { edge: 'dev-dockerfile', label: 'write Dockerfile', plain: { en: 'Recipe card', bn: 'রেসিপি কার্ড' } } ],
        title: { en: 'You write the recipe', bn: 'আপনি রেসিপি লেখেন' },
        simple: {
          en: 'You write a recipe card for your app: start from a ready-made base, add the tools it needs, add your code, then say how to start it.',
          bn: 'আপনি আপনার অ্যাপের জন্য একটা রেসিপি কার্ড লেখেন: তৈরি একটা ভিত দিয়ে শুরু, তারপর দরকারি সরঞ্জাম, তারপর আপনার কোড, শেষে কীভাবে চালু করতে হবে।'
        },
        story: {
          title: { en: 'Rumana writes the recipe', bn: 'রুমানা রেসিপি লেখে' },
          text: {
            en: 'Rumana sits at her kitchen table and writes a recipe card for her app. First a ready-made base, then the tools it needs, then her own code, and last how to start it.',
            bn: 'রুমানা রান্নাঘরের টেবিলে বসে নিজের অ্যাপের জন্য একটা রেসিপি কার্ড লেখে। প্রথমে তৈরি একটা ভিত, তারপর দরকারি সরঞ্জাম, তারপর নিজের কোড, আর শেষে কীভাবে চালু করতে হবে।'
          }
        },
        tech: {
          en: 'A `Dockerfile` is a text file of instructions. `FROM` picks the base image, `COPY` adds files, `RUN` runs a command, and `CMD` sets the default command for containers. `.dockerignore` keeps files out of the build context.',
          bn: '`Dockerfile` হলো instruction-এর একটা text ফাইল। `FROM` base image বাছে, `COPY` ফাইল যোগ করে, `RUN` একটা command চালায়, আর `CMD` container-এর ডিফল্ট command ঠিক করে। `.dockerignore` ফাইলকে build context-এর বাইরে রাখে।'
        }
      },
      {
        id: 'build',
        moves: [ { edge: 'dockerfile-image', label: 'docker build', plain: { en: 'Pack the kit', bn: 'কিট প্যাক করা' } } ],
        state: { image: { en: 'base, deps, code', bn: 'base, deps, code' } },
        plainState: { image: { en: 'Basics, spices, veg', bn: 'চাল-ডাল, মশলা, সবজি' } },
        title: { en: 'The recipe becomes a kit', bn: 'রেসিপি থেকে কিট তৈরি হয়' },
        simple: {
          en: 'Following the card, the kitchen packs a sealed kit in stacked trays: pantry basics, spices, fresh veg. Once sealed, a kit never changes.',
          bn: 'কার্ড মেনে রান্নাঘর একটা সিল করা কিট প্যাক করে, থাকে থাকে ট্রেতে: চাল-ডাল, মশলা, তাজা সবজি। একবার সিল হলে কিট আর বদলায় না।'
        },
        story: {
          title: { en: 'Rumana packs the kit', bn: 'রুমানা কিট প্যাক করে' },
          text: {
            en: 'Rumana follows her card step by step. She packs pantry basics at the bottom, a bag of spices above, and her fresh veg on top, then seals the lid. The kit is finished.',
            bn: 'রুমানা ধাপে ধাপে কার্ড মেনে চলে। নিচে সে চাল-ডাল রাখে, তার ওপরে এক থলে মশলা, আর সবার ওপরে নিজের তাজা সবজি, তারপর ঢাকনা এঁটে দেয়। কিট তৈরি।'
          }
        },
        tech: {
          en: '`docker build -t myapp:1.0 .` runs the instructions and freezes the result into an image. Each instruction adds a read-only layer, here a base, the installed packages and your code. Images are immutable once built.',
          bn: '`docker build -t myapp:1.0 .` instruction-গুলো চালিয়ে ফলাফলটা একটা image-এ জমিয়ে দেয়। প্রতিটি instruction একটা read-only layer যোগ করে, এখানে base, install করা package আর আপনার কোড। image একবার তৈরি হলে আর বদলানো যায় না।'
        }
      },
      {
        id: 'rebuild',
        work: { node: 'image', kind: 'result' },
        state: { image: { en: '2 cached, 1 new', bn: '2টা cached, 1টা নতুন' } },
        plainState: { image: { en: 'Two reused, one new', bn: 'দুটো আগের, একটা নতুন' } },
        title: { en: 'A small change, a quick repack', bn: 'ছোট বদল, দ্রুত আবার প্যাক' },
        simple: {
          en: 'You tweak your code and pack again. The kitchen reuses the basics and spices it already has, and only repacks the fresh veg on top. Fast.',
          bn: 'আপনি আপনার কোড একটু বদলে আবার প্যাক করেন। রান্নাঘর আগের চাল-ডাল আর মশলা আবার কাজে লাগায়, শুধু ওপরের তাজা সবজিটা নতুন করে প্যাক করে। দ্রুত হয়।'
        },
        story: {
          title: { en: 'Rumana swaps the fresh veg', bn: 'রুমানা তাজা সবজি বদলায়' },
          text: {
            en: 'Rumana changes one line of her own code, which is the fresh veg. She repacks, but the kitchen sees the basics and spices are unchanged and reuses them. Only the top tray is new.',
            bn: 'রুমানা নিজের কোডের একটা লাইন বদলায়, মানে তাজা সবজি। সে আবার প্যাক করে, কিন্তু রান্নাঘর দেখে চাল-ডাল আর মশলা বদলায়নি, তাই সেগুলো আবার কাজে লাগায়। শুধু ওপরের ট্রেটা নতুন।'
          }
        },
        tech: {
          en: 'Docker reuses a cached layer while its instruction and inputs are unchanged. Once one layer changes, every layer after it is rebuilt. Putting `COPY requirements.txt` and `RUN pip install` before `COPY . .` keeps the install cached when only code changes.',
          bn: 'কোনো cached layer-এর instruction আর input না বদলালে Docker সেটা আবার কাজে লাগায়। একটা layer বদলালে তার পরের প্রতিটি layer আবার তৈরি হয়। তাই `COPY requirements.txt` আর `RUN pip install` রাখুন `COPY . .`-এর আগে, তাহলে শুধু কোড বদলালে install cached থাকে।'
        }
      },
      {
        id: 'push',
        moves: [ { edge: 'image-registry', label: 'docker push', plain: { en: 'Put on the shelf', bn: 'তাকে তোলা' } } ],
        title: { en: 'You put the kit on the shelf', bn: 'আপনি কিটটা তাকে তোলেন' },
        simple: {
          en: 'To share the kit, you put it on the shop shelf under a name. Anyone allowed to shop there can fetch it later.',
          bn: 'কিটটা ভাগ করে নিতে আপনি সেটা একটা নামসহ দোকানের তাকে তোলেন। যারা ওই দোকানে কেনাকাটা করতে পারে, তারা পরে সেটা আনতে পারে।'
        },
        story: {
          title: { en: 'Rumana shelves the kit', bn: 'রুমানা কিট তাকে তোলে' },
          text: {
            en: 'Rumana writes a name on the lid and takes the kit to Nusrat’s shop. Nusrat only needs the trays she does not already stock, then she puts the kit on the shelf.',
            bn: 'রুমানা ঢাকনায় একটা নাম লিখে কিটটা নুসরাতের দোকানে নিয়ে যায়। নুসরাতের যে ট্রেগুলো আগে থেকে নেই শুধু সেগুলোই লাগে, তারপর সে কিটটা তাকে তুলে রাখে।'
          }
        },
        tech: {
          en: '`docker push` uploads an image to a registry. The name carries the registry host, such as `registry.example.com/team/myapp:1.0`, and `docker tag` can add it. Layers the registry already holds are not uploaded again.',
          bn: '`docker push` একটা image registry-তে আপলোড করে। নামে registry-র host থাকে, যেমন `registry.example.com/team/myapp:1.0`, আর `docker tag` দিয়ে সেটা যোগ করা যায়। registry-তে যে layer আগে থেকেই আছে সেগুলো আবার আপলোড হয় না।'
        }
      },
      {
        id: 'pull',
        moves: [ { edge: 'registry-image', label: 'docker pull', plain: { en: 'Take it home', bn: 'বাড়ি নিয়ে যাওয়া' } } ],
        state: { image: { en: 'Same layers, new host', bn: 'একই layer, নতুন host' } },
        plainState: { image: { en: 'Same kit, new kitchen', bn: 'একই কিট, নতুন রান্নাঘর' } },
        title: { en: 'Another kitchen fetches it', bn: 'আরেকটা রান্নাঘর কিট নিয়ে আসে' },
        simple: {
          en: 'In another kitchen, someone takes the kit off the shelf. Only the trays that kitchen does not already have are carried over. It is the very same kit.',
          bn: 'আরেকটা রান্নাঘরে কেউ একজন তাক থেকে কিটটা নামায়। সেই রান্নাঘরে যে ট্রেগুলো আগে থেকে নেই শুধু সেগুলোই আনা হয়। কিটটা হুবহু একই।'
        },
        story: {
          title: { en: 'Hasan fetches the kit', bn: 'হাসান কিট নিয়ে আসে' },
          text: {
            en: 'Across town, Hasan wants to cook Rumana’s dish. He asks Nusrat for the kit and carries it home. His kitchen already has the pantry basics, so he only takes the new trays.',
            bn: 'শহরের ওপারে হাসান রুমানার পদটা রাঁধতে চায়। সে নুসরাতের কাছ থেকে কিটটা চেয়ে নিয়ে বাড়ি নিয়ে যায়। তার রান্নাঘরে চাল-ডাল আগে থেকেই আছে, তাই সে শুধু নতুন ট্রেগুলো নেয়।'
          }
        },
        tech: {
          en: '`docker pull` downloads an image from a registry, and with no tag it uses `:latest`. Layers the machine already has are not fetched again. Layers are immutable, so the same layers arrive.',
          bn: '`docker pull` registry থেকে একটা image নামায়; tag না দিলে `:latest` ধরে। মেশিনে যে layer আগে থেকে আছে সেগুলো আবার নামে না। layer অপরিবর্তনীয়, তাই একই layer-ই এসে পৌঁছায়।'
        }
      },
      {
        id: 'run',
        moves: [ { edge: 'image-container', label: 'docker run', plain: { en: 'Start cooking', bn: 'রান্না শুরু' } } ],
        state: { container: { en: 'Port 8000 published', bn: 'Port 8000 publish করা' } },
        plainState: { container: { en: 'Serving window open', bn: 'সার্ভিং জানালা খোলা' } },
        title: { en: 'The kit becomes a meal', bn: 'কিট থেকে খাবার রান্না হয়' },
        simple: {
          en: 'Cooking starts: the kit is opened and a meal is made from it, in its own pot, apart from other pots. A serving window lets guests reach it.',
          bn: 'রান্না শুরু হয়: কিট খোলা হয় আর তা থেকে একটা খাবার রাঁধা হয়, নিজের হাঁড়িতে, অন্য হাঁড়ি থেকে আলাদা। একটা সার্ভিং জানালা দিয়ে অতিথিরা পৌঁছাতে পারে।'
        },
        story: {
          title: { en: 'Hasan cooks the meal', bn: 'হাসান খাবার রাঁধে' },
          text: {
            en: 'Hasan opens the kit and cooks a meal in his own pot. He cuts a serving window in the wall so guests outside can order, and the same kit could cook more meals.',
            bn: 'হাসান কিটটা খুলে নিজের হাঁড়িতে খাবার রাঁধে। বাইরের অতিথিরা যেন অর্ডার দিতে পারে, তাই সে দেয়ালে একটা সার্ভিং জানালা কাটে। আর ওই একই কিট থেকে আরও খাবার রাঁধা যেত।'
          }
        },
        tech: {
          en: '`docker run -p 8000:8000 -v data:/data myapp` creates a container: a thin writable layer on top of the image, then it runs the `CMD`. `-p` publishes host port 8000 to container port 8000, and `-v` mounts the named volume `data`. The kernel is the host’s.',
          bn: '`docker run -p 8000:8000 -v data:/data myapp` একটা container বানায়: image-এর ওপর পাতলা একটা writable layer, তারপর `CMD` চলে। `-p` host port 8000-কে container port 8000-এর সাথে publish করে, `-v` `data` নামের named volume mount করে। kernel host-এর।'
        }
      },
      {
        id: 'write',
        moves: [ { edge: 'container-volume', label: 'write /data', plain: { en: 'Save leftovers', bn: 'বাড়তি রাখা' } } ],
        state: { volume: { en: 'Holds the data', bn: 'data রাখা আছে' } },
        plainState: { volume: { en: 'Leftovers inside', bn: 'ভেতরে বাড়তি খাবার' } },
        title: { en: 'Leftovers go in the box', bn: 'বাড়তি খাবার বক্সে যায়' },
        simple: {
          en: 'While cooking, some food is worth keeping. It goes into the leftovers box, which sits outside the pot rather than inside it.',
          bn: 'রান্না করতে করতে কিছু খাবার রেখে দেওয়ার মতো হয়। সেটা যায় বাড়তি খাবারের বক্সে, যেটা হাঁড়ির ভেতরে নয়, বাইরে থাকে।'
        },
        story: {
          title: { en: 'Hasan saves the leftovers', bn: 'হাসান বাড়তি খাবার রাখে' },
          text: {
            en: 'Hasan makes a rich sauce that is worth keeping for tomorrow. He spoons it into a leftovers box on the counter, outside the pot, because the pot gets washed after every meal.',
            bn: 'হাসান এমন একটা ঘন সস বানায় যা কালকের জন্য রেখে দেওয়ার মতো। সে সেটা চামচে করে কাউন্টারে রাখা বাড়তি খাবারের বক্সে তোলে, হাঁড়ির বাইরে, কারণ প্রতি বেলার পর হাঁড়ি ধোয়া হয়।'
          }
        },
        tech: {
          en: 'A named volume is storage managed by Docker and mounted into the container, here at `/data`. Writes go to the volume, not to the container’s writable layer. If the volume does not exist yet, Docker creates it.',
          bn: 'named volume হলো Docker-এর পরিচালিত storage, যা container-এ mount করা হয়, এখানে `/data`-তে। লেখা যায় volume-এ, container-এর writable layer-এ নয়। volume আগে না থাকলে Docker সেটা বানিয়ে নেয়।'
        }
      },
      {
        id: 'remove',
        work: { node: 'volume', kind: 'result' },
        state: {
          container: { en: 'Removed', bn: 'মুছে ফেলা' },
          volume: { en: 'Data still there', bn: 'data এখনো আছে' }
        },
        plainState: {
          container: { en: 'Washed and put away', bn: 'ধুয়ে তুলে রাখা' },
          volume: { en: 'Leftovers kept', bn: 'বাড়তি খাবার আছে' }
        },
        title: { en: 'The meal is cleared away', bn: 'খাবার সরিয়ে ফেলা হয়' },
        simple: {
          en: 'The meal is eaten and the pot is washed and put away. But the leftovers box was never inside the pot, so it still holds everything.',
          bn: 'খাবার খাওয়া শেষ, হাঁড়ি ধুয়ে তুলে রাখা হয়। কিন্তু বাড়তি খাবারের বক্স কখনো হাঁড়ির ভেতরে ছিল না, তাই সেটা আগের মতোই সব ধরে রেখেছে।'
        },
        story: {
          title: { en: 'The pot is washed away', bn: 'হাঁড়ি ধুয়ে যায়' },
          text: {
            en: 'Dinner is over. Hasan washes the pot and puts it away, and the meal is gone for good. But the leftovers box sits safe on the counter, with the sauce still inside.',
            bn: 'খাওয়া শেষ। হাসান হাঁড়ি ধুয়ে তুলে রাখে, আর খাবারটা চিরতরে শেষ। কিন্তু বাড়তি খাবারের বক্স কাউন্টারে নিরাপদে বসে আছে, ভেতরে সস আগের মতোই।'
          }
        },
        tech: {
          en: '`docker rm` deletes the container and its writable layer, but a named volume stays, so the data is safe. `docker rm -v` only removes anonymous volumes. To delete a named volume, run `docker volume rm`.',
          bn: '`docker rm` container আর তার writable layer মুছে ফেলে, কিন্তু named volume থেকে যায়, তাই data নিরাপদ। `docker rm -v` শুধু anonymous volume সরায়। named volume মুছতে চালান `docker volume rm`।'
        }
      },
      {
        id: 'run-again',
        moves: [
          { edge: 'image-container', label: 'docker run', plain: { en: 'A new meal', bn: 'নতুন খাবার' } },
          { edge: 'volume-container', label: '-v data:/data', plain: { en: 'Old leftovers', bn: 'আগের বাড়তি' } }
        ],
        state: {
          container: { en: 'Fresh, with old data', bn: 'নতুন, পুরোনো data সহ' },
          volume: { en: 'Mounted again', bn: 'আবার mount হয়েছে' }
        },
        plainState: {
          container: { en: 'New pot, old sauce', bn: 'নতুন হাঁড়ি, পুরোনো সস' },
          volume: { en: 'Beside the new pot', bn: 'নতুন হাঁড়ির পাশে' }
        },
        title: { en: 'A new meal, the old sauce', bn: 'নতুন খাবার, পুরোনো সস' },
        simple: {
          en: 'Cook again from the same kit: a new pot beside the old leftovers box. The sauce is still there.',
          bn: 'একই কিট থেকে আবার রান্না: নতুন হাঁড়ি, পাশে আগের বাড়তি খাবারের বক্স। সসটা এখনো আছে।'
        },
        story: {
          title: { en: 'Hasan cooks again', bn: 'হাসান আবার রাঁধে' },
          text: {
            en: 'Next week Hasan cooks again from the same kit. The pot is brand new, but he sets the old leftovers box beside it. The sauce is still there.',
            bn: 'পরের সপ্তাহে হাসান একই কিট থেকে আবার রাঁধে। হাঁড়িটা একদম নতুন, কিন্তু পাশে সে আগের বাড়তি খাবারের বক্সটা বসিয়ে দেয়। সসটা এখনো আছে।'
          }
        },
        tech: {
          en: 'A new container starts from the same image, so it begins with a fresh writable layer. Mounting the same named volume brings the old data back. The image is the template, the container a running copy, the volume what survives.',
          bn: 'নতুন container একই image থেকে শুরু হয়, তাই তার writable layer নতুন। একই named volume mount করলে পুরোনো data ফিরে আসে। image হলো template, container তার চালু কপি, আর volume হলো যা টিকে থাকে।'
        }
      }
    ]
  },
  alts: [
    {
      id: 'no-volume',
      label: { en: 'The leftovers stay in the pot', bn: 'বাড়তি খাবার হাঁড়িতেই থাকে' },
      whatIf: {
        en: 'What if the leftovers stay inside the pot?',
        bn: 'বাড়তি খাবার যদি হাঁড়ির ভেতরেই থেকে যায়?'
      },
      branchAfter: 'run',
      steps: [
        {
          id: 'writable-layer',
          work: { node: 'container', kind: 'queue' },
          state: { container: { en: 'Writing to its layer', bn: 'নিজের layer-এ লিখছে' } },
          plainState: { container: { en: 'Leftovers in the pot', bn: 'হাঁড়িতে বাড়তি খাবার' } },
          title: { en: 'The sauce stays in the pot', bn: 'সস হাঁড়িতেই থেকে যায়' },
          simple: {
            en: 'With no leftovers box, the sauce is left in the pot. It looks fine for now, because the pot keeps it while the meal is still there.',
            bn: 'বাড়তি খাবারের বক্স না থাকলে সস হাঁড়িতেই পড়ে থাকে। আপাতত সব ঠিকই লাগে, কারণ খাবারটা যতক্ষণ আছে হাঁড়ি সেটা ধরে রাখে।'
          },
          story: {
            title: { en: 'Hasan leaves it in the pot', bn: 'হাসান হাঁড়িতেই রেখে দেয়' },
            text: {
              en: 'This time Hasan skips the leftovers box and leaves the sauce in the pot. It looks fine tonight, and the sauce is right where he can reach it.',
              bn: 'এবার হাসান বাড়তি খাবারের বক্সটা এড়িয়ে সসটা হাঁড়িতেই রেখে দেয়। আজ রাতে সব ঠিকই লাগে, সস হাতের কাছেই আছে।'
            }
          },
          tech: {
            en: 'Without a volume, every file the app writes outside a mount goes into the container’s writable layer, on top of the read-only image. It works while the container lives, but that layer belongs to this one container.',
            bn: 'volume না থাকলে app mount-এর বাইরে যা লেখে, সবই যায় container-এর writable layer-এ, read-only image-এর ওপরে। container যতক্ষণ বেঁচে আছে এটা কাজ করে, কিন্তু ওই layer শুধু এই একটা container-এর।'
          }
        },
        {
          id: 'container-gone',
          work: { node: 'container', kind: 'error' },
          state: { container: { en: 'Removed, data gone', bn: 'মুছে গেছে, data নেই' } },
          plainState: { container: { en: 'Pot washed, sauce gone', bn: 'হাঁড়ি ধোয়া, সস গেছে' } },
          title: { en: 'The sauce is lost', bn: 'সসটা হারিয়ে যায়' },
          simple: {
            en: 'The pot is washed and put away, and the sauce goes down the drain with it. Cooking again from the kit starts with an empty pot.',
            bn: 'হাঁড়ি ধুয়ে তুলে রাখা হয়, আর সসও সাথে নালায় চলে যায়। কিট থেকে আবার রাঁধলে শুরু হয় খালি হাঁড়ি দিয়ে।'
          },
          story: {
            title: { en: 'The sauce goes down the drain', bn: 'সস নালায় চলে যায়' },
            text: {
              en: 'Dinner ends and Hasan washes the pot. The sauce goes down the drain with the water, and there is no way to bring it back. Next time he starts again from the kit with an empty pot.',
              bn: 'খাওয়া শেষে হাসান হাঁড়ি ধোয়। সস পানির সাথে নালায় চলে যায়, আর ফিরিয়ে আনার উপায় নেই। পরের বার সে কিট থেকে খালি হাঁড়ি নিয়েই আবার শুরু করে।'
            }
          },
          tech: {
            en: 'When the container is removed, its writable layer is deleted too, and the data with it. The image stays unchanged, so a new container starts empty. Keep data in a volume or a bind mount instead.',
            bn: 'container মুছে ফেললে তার writable layer-ও মুছে যায়, সাথে data-ও। image অপরিবর্তিত থাকে, তাই নতুন container খালি শুরু হয়। data রাখুন volume বা bind mount-এ।'
          }
        }
      ]
    },
    {
      id: 'build-fails',
      label: { en: 'A recipe step breaks', bn: 'রেসিপির একটা ধাপ ভেঙে যায়' },
      whatIf: {
        en: 'What if one step of the recipe fails while packing?',
        bn: 'প্যাক করার সময় রেসিপির একটা ধাপ ব্যর্থ হলে?'
      },
      branchAfter: 'recipe',
      steps: [
        {
          id: 'build-try',
          moves: [ { edge: 'dockerfile-image', label: 'docker build', plain: { en: 'Pack the kit', bn: 'কিট প্যাক করা' } } ],
          title: { en: 'The kitchen starts packing', bn: 'রান্নাঘর প্যাক করা শুরু করে' },
          simple: {
            en: 'The kitchen follows your card one step at a time. First the basics go in, then it moves on to the spices.',
            bn: 'রান্নাঘর আপনার কার্ড মেনে এক ধাপ করে এগোয়। আগে চাল-ডাল ওঠে, তারপর মশলার ধাপ আসে।'
          },
          story: {
            title: { en: 'Rumana tries to pack the kit', bn: 'রুমানা কিট প্যাক করতে চায়' },
            text: {
              en: 'Rumana tries to pack the kit. The kitchen follows her card one step at a time: the basics go in first, and then it reaches the step for the spices.',
              bn: 'রুমানা কিট প্যাক করার চেষ্টা করে। রান্নাঘর তার কার্ড মেনে এক ধাপ করে এগোয়: আগে চাল-ডাল ওঠে, তারপর আসে মশলার ধাপ।'
            }
          },
          tech: {
            en: '`docker build` works through the instructions in order: the base from `FROM`, then `COPY requirements.txt`, then `RUN pip install -r requirements.txt`. Each finished instruction is stored as a layer.',
            bn: '`docker build` instruction-গুলো পরপর চালায়: `FROM` থেকে base, তারপর `COPY requirements.txt`, তারপর `RUN pip install -r requirements.txt`। শেষ হওয়া প্রতিটি instruction একটা layer হিসেবে জমা থাকে।'
          }
        },
        {
          id: 'step-fails',
          work: { node: 'image', kind: 'error' },
          state: { image: { en: 'Failed at RUN', bn: 'RUN-এ ব্যর্থ' } },
          plainState: { image: { en: 'Packing stopped', bn: 'প্যাক থেমে গেছে' } },
          title: { en: 'One step breaks', bn: 'একটা ধাপ ভেঙে যায়' },
          simple: {
            en: 'The card names a spice that does not exist, so that step fails and packing stops. The steps before it are kept, so the next try restarts from here.',
            bn: 'কার্ডে এমন একটা মশলার নাম লেখা যা আসলে নেই, তাই ওই ধাপ ব্যর্থ হয় আর প্যাক থেমে যায়। আগের ধাপগুলো রাখা আছে, তাই পরের বার এখান থেকেই আবার শুরু।'
          },
          story: {
            title: { en: 'A spice is missing', bn: 'একটা মশলা নেই' },
            text: {
              en: 'Rumana misspelled a spice on her card, and the kitchen cannot find it. That step fails and packing stops, but the basics are already stored, so fixing the card and trying again is quick.',
              bn: 'রুমানা কার্ডে একটা মশলার নামের বানান ভুল লিখেছিল, আর রান্নাঘর সেটা খুঁজে পায় না। ধাপটা ব্যর্থ হয়, প্যাক থেমে যায়, কিন্তু চাল-ডাল আগেই জমা আছে, তাই কার্ড ঠিক করে আবার চেষ্টা করা সহজ।'
            }
          },
          tech: {
            en: 'A `RUN` whose command fails, here `pip install` on a misspelled package, fails that step, so the build does not succeed. The layers before it stay in the cache, and the retry resumes at the failed step.',
            bn: '`RUN`-এর command ব্যর্থ হলে, যেমন ভুল বানানের package-এ `pip install`, ওই ধাপ ব্যর্থ হয়, তাই build সফল হয় না। আগের layer-গুলো cache-এ থাকে, আর আবার চালালে ব্যর্থ ধাপ থেকেই শুরু হয়।'
          }
        }
      ]
    }
  ],
  analogy: {
    intro: {
      en: 'Cooking from a meal kit works the same way. Every stop has a twin in the kitchen.',
      bn: 'মিল কিট দিয়ে রান্না ঠিক এভাবেই চলে। প্রতিটি স্টপের একটা জোড়া আছে রান্নাঘরে।'
    },
    twins: [
      {
        icon: 'user',
        node: 'dev',
        name: { en: 'You', bn: 'আপনি' },
        d: {
          en: 'Write the recipe card and decide what to cook.',
          bn: 'রেসিপি কার্ড লেখেন আর ঠিক করেন কী রান্না হবে।'
        }
      },
      {
        icon: 'code',
        node: 'dockerfile',
        name: { en: 'The recipe card', bn: 'রেসিপি কার্ড' },
        d: {
          en: 'Lists every step in order: what to start from, what to add, and how to begin.',
          bn: 'প্রতিটি ধাপ ক্রমে লেখা থাকে: কী দিয়ে শুরু, কী যোগ করা, আর কীভাবে চালু করা।'
        }
      },
      {
        icon: 'box',
        node: 'image',
        name: { en: 'The meal kit', bn: 'মিল কিট' },
        d: {
          en: 'A sealed box of stacked trays. Once packed it never changes, and it can make many meals.',
          bn: 'থাকে থাকে ট্রে সাজানো সিল করা বাক্স। একবার প্যাক হলে আর বদলায় না, আর তা থেকে অনেক খাবার রাঁধা যায়।'
        }
      },
      {
        icon: 'cloud',
        node: 'registry',
        name: { en: 'The shop shelf', bn: 'দোকানের তাক' },
        d: {
          en: 'Keeps finished kits so any kitchen can pick one up.',
          bn: 'তৈরি কিট জমা রাখে, যাতে যেকোনো রান্নাঘর একটা তুলে নিতে পারে।'
        }
      },
      {
        icon: 'power',
        node: 'container',
        name: { en: 'The cooked meal', bn: 'রান্না করা খাবার' },
        d: {
          en: 'One live copy made from the kit. Wash the pot and it is gone.',
          bn: 'কিট থেকে বানানো একটা চালু কপি। হাঁড়ি ধুয়ে ফেললেই সেটা শেষ।'
        }
      },
      {
        icon: 'archive',
        node: 'volume',
        name: { en: 'The leftovers box', bn: 'বাড়তি খাবারের বক্স' },
        d: {
          en: 'Sits outside the pot, so what is kept in it survives when the pot is washed.',
          bn: 'হাঁড়ির বাইরে থাকে, তাই হাঁড়ি ধুয়ে ফেললেও এতে রাখা খাবার থেকে যায়।'
        }
      },
      {
        icon: 'alert',
        node: null,
        name: { en: 'Sauce down the drain', bn: 'নালায় যাওয়া সস' },
        is: { en: 'is data lost with its container', bn: 'মানে container-এর সাথে data হারানো' },
        d: {
          en: 'Without a leftovers box, anything left in the pot is washed away with it. Keep what matters in the box.',
          bn: 'বাড়তি খাবারের বক্স না থাকলে হাঁড়িতে রেখে যাওয়া সবকিছু হাঁড়ির সাথে ধুয়ে যায়। যা দরকারি তা বক্সে রাখুন।'
        }
      }
    ]
  },
  qa: [
    {
      q: {
        en: 'What is the difference between an image and a container?',
        bn: 'image আর container-এর পার্থক্য কী?'
      },
      short: {
        en: 'An image is the read-only template, and a container is a running instance of it.',
        bn: 'image হলো read-only template, আর container হলো তার একটা চালু instance।'
      },
      deep: {
        en: 'Many containers can run from one image, and each gets its own thin writable layer. Deleting a container deletes that layer, while the image stays unchanged.',
        bn: 'একটা image থেকে অনেক container চলতে পারে, আর প্রতিটির নিজের পাতলা writable layer থাকে। container মুছলে সেই layer-ও মুছে যায়, কিন্তু image অপরিবর্তিত থাকে।'
      },
      redFlag: {
        en: '“A container is a lightweight VM with its own kernel.”',
        bn: '“container হলো নিজের kernel-সহ হালকা একটা VM।”'
      }
    },
    {
      q: {
        en: 'How do image layers and the build cache work?',
        bn: 'image layer আর build cache কীভাবে কাজ করে?'
      },
      short: {
        en: 'Each instruction adds a layer, and Docker reuses a layer while nothing it depends on has changed.',
        bn: 'প্রতিটি instruction একটা layer যোগ করে, আর যতক্ষণ কিছু বদলায়নি Docker সেই layer আবার কাজে লাগায়।'
      },
      deep: {
        en: 'Once one layer changes, every layer after it is rebuilt. Order instructions from least to most often changed: copy `requirements.txt` and install before copying the source. A cached `RUN` is not invalidated automatically, so use `--no-cache` for a fresh install.',
        bn: 'একটা layer বদলালে তার পরের প্রতিটি layer আবার তৈরি হয়। তাই instruction সাজান কম বদলানো থেকে বেশি বদলানোর ক্রমে: আগে `requirements.txt` কপি করে install করুন, তারপর সোর্স কপি করুন। `RUN`-এর cache আপনা থেকে বাতিল হয় না, তাই নতুন করে install চাইলে `--no-cache` দিন।'
      },
      redFlag: {
        en: '“`COPY . .` first, then `pip install`.”',
        bn: '“আগে `COPY . .`, তারপর `pip install`।”'
      }
    },
    {
      q: {
        en: 'What is the difference between `CMD` and `ENTRYPOINT`?',
        bn: '`CMD` আর `ENTRYPOINT`-এর পার্থক্য কী?'
      },
      short: {
        en: '`ENTRYPOINT` sets the main executable, and `CMD` supplies its default arguments, or the default command when there is no `ENTRYPOINT`.',
        bn: '`ENTRYPOINT` মূল executable ঠিক করে, আর `CMD` দেয় তার ডিফল্ট argument, বা `ENTRYPOINT` না থাকলে ডিফল্ট command।'
      },
      deep: {
        en: 'Arguments to `docker run <image>` replace `CMD` and are appended to an exec-form `ENTRYPOINT`; `--entrypoint` overrides it. Prefer exec form, `["uvicorn", "app:app"]`: shell form runs under `/bin/sh -c`, so the app is not PID 1 and never gets the `SIGTERM` from `docker stop`.',
        bn: '`docker run <image>`-এ দেওয়া argument `CMD`-কে বদলে দেয় আর exec form `ENTRYPOINT`-এর পরে জুড়ে যায়; `--entrypoint` দিয়ে `ENTRYPOINT` বদলানো যায়। exec form পছন্দ করুন, যেমন `["uvicorn", "app:app"]`: shell form চলে `/bin/sh -c`-এর ভেতরে, তাই app PID 1 হয় না আর `docker stop`-এর `SIGTERM` পায় না।'
      },
      redFlag: {
        en: '“They are identical.”',
        bn: '“দুটো একই জিনিস।”'
      }
    },
    {
      q: {
        en: 'Where should data that must survive be kept?',
        bn: 'যে data টিকিয়ে রাখতে হবে, তা রাখতে হয় কোথায়?'
      },
      short: {
        en: 'In a volume or a bind mount, not in the container’s writable layer.',
        bn: 'volume বা bind mount-এ, container-এর writable layer-এ নয়।'
      },
      deep: {
        en: 'A named volume is managed by Docker and outlives the container; a bind mount maps a host path, which suits development. `docker rm` never deletes a named volume, and `-v` only removes anonymous ones. Remove a named volume with `docker volume rm`.',
        bn: 'named volume Docker নিজে পরিচালনা করে আর container-এর পরেও থাকে; bind mount host-এর একটা path জুড়ে দেয়, যা development-এ কাজের। `docker rm` কখনো named volume মোছে না, আর `-v` শুধু anonymous volume সরায়। named volume মুছতে `docker volume rm` চালান।'
      },
      redFlag: {
        en: '“Data stays in the container forever.”',
        bn: '“data container-এ চিরকাল থাকে।”'
      }
    },
    {
      q: {
        en: 'How do containers differ from virtual machines?',
        bn: 'container আর virtual machine-এর পার্থক্য কী?'
      },
      short: {
        en: 'Containers share the host’s kernel, while a VM runs a full guest operating system with its own kernel.',
        bn: 'container host-এর kernel ভাগ করে নেয়; VM নিজের kernel-সহ পুরো একটা guest operating system চালায়।'
      },
      deep: {
        en: 'Docker isolates each container with Linux namespaces, and cgroups can cap its CPU and memory (there are no limits by default). A container starts from an image instead of booting its own operating system, so it carries less overhead.',
        bn: 'Docker প্রতিটি container-কে আলাদা করে Linux namespace দিয়ে, আর cgroup তার CPU ও memory সীমিত করতে পারে (ডিফল্টে কোনো সীমা নেই)। container শুরু হয় image থেকে, নিজের operating system boot না করে, তাই overhead কম।'
      },
      redFlag: {
        en: '“Docker virtualizes the hardware.”',
        bn: '“Docker hardware virtualize করে।”'
      }
    },
    {
      q: {
        en: 'What does `-p 8080:80` do?',
        bn: '`-p 8080:80` কী করে?'
      },
      short: {
        en: 'It publishes container port 80 on host port 8080. The host port comes first.',
        bn: 'এটা container-এর port 80-কে host-এর port 8080-তে publish করে। host port আগে লিখতে হয়।'
      },
      deep: {
        en: 'By default the port is published on every host address, so outside clients can reach it, and `-p 127.0.0.1:8080:80` limits it to the host itself. `EXPOSE` only documents a port and does not publish it. Unpublished ports are unreachable from outside the host.',
        bn: 'ডিফল্টে port টা host-এর সব address-এ publish হয়, তাই বাইরের client পৌঁছাতে পারে; `-p 127.0.0.1:8080:80` সেটাকে শুধু host-এর নিজের জন্য রাখে। `EXPOSE` শুধু port-এর কথা জানিয়ে রাখে, publish করে না। publish না করা port বাইরে থেকে পৌঁছানো যায় না।'
      },
      redFlag: {
        en: '“`EXPOSE` opens the port to the outside.”',
        bn: '“`EXPOSE` লিখলেই port বাইরের জন্য খুলে যায়।”'
      }
    },
    {
      q: {
        en: 'How do containers find each other by name?',
        bn: 'container একে অপরকে নাম ধরে খুঁজে পায় কীভাবে?'
      },
      short: {
        en: 'On a user-defined bridge network Docker resolves container names. On the default bridge it does not.',
        bn: 'user-defined bridge network-এ Docker container-এর নাম resolve করে। default bridge-এ করে না।'
      },
      deep: {
        en: 'Run `docker network create net`, then start containers with `--network net`. They reach each other by name or alias. On the default bridge they can only use IP addresses, unless you use `--link`.',
        bn: '`docker network create net` চালিয়ে `--network net` দিয়ে container শুরু করুন। তখন তারা নাম বা alias ধরে একে অপরের কাছে পৌঁছায়। default bridge-এ শুধু IP address চলে, `--link` না দিলে।'
      },
      redFlag: {
        en: '“Containers on the default network can call each other by name.”',
        bn: '“default network-এর container নাম ধরে একে অপরকে ডাকতে পারে।”'
      }
    },
    {
      q: {
        en: 'What is a multi-stage build?',
        bn: 'multi-stage build কী?'
      },
      short: {
        en: 'A Dockerfile with several `FROM` stages: build in one, then `COPY --from` only the result into a small final stage.',
        bn: 'একটা Dockerfile-এ কয়েকটা `FROM` stage: এক stage-এ build করুন, তারপর `COPY --from` দিয়ে শুধু ফলাফলটা ছোট একটা শেষ stage-এ আনুন।'
      },
      deep: {
        en: 'Compilers and build tools stay in the earlier stage, so the final image is smaller. Name a stage with `AS`, and build only up to one stage with `--target`.',
        bn: 'compiler আর build tool আগের stage-এই থেকে যায়, তাই শেষ image ছোট হয়। stage-এর নাম দিন `AS` দিয়ে, আর `--target` দিয়ে একটা stage পর্যন্তই build করুন।'
      },
      redFlag: {
        en: '“One stage with the compiler and every build tool is fine for production.”',
        bn: '“production image-এ compiler আর সব build tool-সহ একটা stage-ই যথেষ্ট।”'
      }
    }
  ],
  cheats: [
    {
      code: 'docker build -t myapp:1.0 .',
      d: {
        en: 'Build an image from the Dockerfile in this folder and tag it.',
        bn: 'এই ফোল্ডারের Dockerfile থেকে image বানান আর tag দিন।'
      }
    },
    {
      code: 'docker run -d --name api -p 8000:8000 --env-file .env myapp:1.0',
      d: {
        en: 'Run in the background, name it, publish host port 8000, and read variables from a file.',
        bn: 'ব্যাকগ্রাউন্ডে চালান, নাম দিন, host port 8000 publish করুন, আর ফাইল থেকে variable পড়ান।'
      }
    },
    {
      code: 'docker ps -a',
      d: {
        en: 'List containers, including stopped ones.',
        bn: 'সব container দেখুন, থেমে যাওয়াগুলোসহ।'
      }
    },
    {
      code: 'docker logs -f api',
      d: {
        en: 'Follow a container’s log output.',
        bn: 'container-এর log আউটপুট অনুসরণ করুন।'
      }
    },
    {
      code: 'docker exec -it api sh',
      d: {
        en: 'Open a shell inside a running container.',
        bn: 'চালু একটা container-এর ভেতরে shell খুলুন।'
      }
    },
    {
      code: 'docker run -v data:/data myapp:1.0',
      d: {
        en: 'Mount the named volume data at `/data`. Docker creates it if it is missing.',
        bn: 'data নামের named volume `/data`-তে mount করুন। না থাকলে Docker বানিয়ে নেয়।'
      }
    },
    {
      code: 'docker network create net',
      d: {
        en: 'Make a user-defined bridge network, then start containers with `--network net` so they reach each other by name.',
        bn: 'user-defined bridge network বানান, তারপর `--network net` দিয়ে container চালান, যাতে তারা নাম ধরে একে অপরকে পায়।'
      }
    },
    {
      code: 'docker stop api && docker rm api',
      d: {
        en: 'Stop the container (SIGTERM first, SIGKILL after a grace period), then remove it.',
        bn: 'container থামান (আগে SIGTERM, কিছুক্ষণ পর SIGKILL), তারপর সেটা মুছুন।'
      }
    }
  ],
  sources: [
    { label: 'Docker docs: build cache', url: 'https://docs.docker.com/build/cache/' },
    { label: 'Docker docs: cache invalidation', url: 'https://docs.docker.com/build/cache/invalidation/' },
    { label: 'Docker docs: optimize cache usage', url: 'https://docs.docker.com/build/cache/optimize/' },
    { label: 'Docker docs: using the build cache', url: 'https://docs.docker.com/get-started/docker-concepts/building-images/using-the-build-cache/' },
    { label: 'Docker docs: understanding image layers', url: 'https://docs.docker.com/get-started/docker-concepts/building-images/understanding-image-layers/' },
    { label: 'Docker docs: what is an image', url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/' },
    { label: 'Docker docs: what is a container', url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/' },
    { label: 'Docker docs: what is a registry', url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/' },
    { label: 'Docker docs: Docker overview (daemon, namespaces)', url: 'https://docs.docker.com/get-started/docker-overview/' },
    { label: 'Dockerfile reference (RUN, CMD, ENTRYPOINT, EXPOSE)', url: 'https://docs.docker.com/reference/dockerfile/' },
    { label: 'Docker docs: Dockerfile best practices', url: 'https://docs.docker.com/build/building/best-practices/' },
    { label: 'Docker docs: multi-stage builds', url: 'https://docs.docker.com/build/building/multi-stage/' },
    { label: 'Docker docs: build context', url: 'https://docs.docker.com/build/concepts/context/' },
    { label: 'Docker docs: storage overview', url: 'https://docs.docker.com/engine/storage/' },
    { label: 'Docker docs: volumes', url: 'https://docs.docker.com/engine/storage/volumes/' },
    { label: 'Docker docs: bind mounts', url: 'https://docs.docker.com/engine/storage/bind-mounts/' },
    { label: 'Docker docs: storage drivers (container layer)', url: 'https://docs.docker.com/engine/storage/drivers/' },
    { label: 'Docker docs: port publishing', url: 'https://docs.docker.com/engine/network/port-publishing/' },
    { label: 'Docker docs: bridge network driver', url: 'https://docs.docker.com/engine/network/drivers/bridge/' },
    { label: 'Docker docs: resource constraints (cgroups)', url: 'https://docs.docker.com/engine/containers/resource_constraints/' },
    { label: 'docker build (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/image/build/' },
    { label: 'docker run (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/container/run/' },
    { label: 'docker rm (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/container/rm/' },
    { label: 'docker stop (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/container/stop/' },
    { label: 'docker ps (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/container/ls/' },
    { label: 'docker logs (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/container/logs/' },
    { label: 'docker exec (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/container/exec/' },
    { label: 'docker push (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/image/push/' },
    { label: 'docker pull (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/image/pull/' },
    { label: 'docker tag (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/image/tag/' },
    { label: 'docker volume create (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/volume/create/' },
    { label: 'docker network create (CLI reference)', url: 'https://docs.docker.com/reference/cli/docker/network/create/' }
  ]
}
