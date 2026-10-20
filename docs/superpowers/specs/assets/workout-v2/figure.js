/* Workout figure: a small 2D rig that animates exercise demonstrations.
   World units: standing height is about 100, the floor is y = 0, y grows downward,
   and in side view the figure faces +x. Angles are degrees in screen space:
   0 = forward (+x), 90 = down, 180 = back, -90 = up. Segment angles are absolute,
   which keeps authoring readable ("forearm points up") and interpolation simple. */
(function (root) {
  'use strict'

  const RAD = Math.PI / 180
  const dir = (a) => [Math.cos(a * RAD), Math.sin(a * RAD)]
  const add = (p, v, s = 1) => [p[0] + v[0] * s, p[1] + v[1] * s]
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]]
  const len = (v) => Math.hypot(v[0], v[1])
  const ang = (v) => Math.atan2(v[1], v[0]) / RAD
  const rot = (v, a) => {
    const c = Math.cos(a * RAD), s = Math.sin(a * RAD)
    return [v[0] * c - v[1] * s, v[0] * s + v[1] * c]
  }
  const lerp = (a, b, t) => a + (b - a) * t
  const lerpAng = (a, b, t) => a + (((((b - a) % 360) + 540) % 360) - 180) * t
  const ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t)
  const r1 = (n) => Math.round(n * 10) / 10

  const BONE = { torso: 30, neck: 9, head: 6.5, upper: 18, fore: 15, hand: 4.5, thigh: 25, shin: 24, shrug: 3, shoulderHalf: 10, hipHalf: 6.5 }
  const WIDTH = { torso: 13, torsoFront: 7, neck: 5, upper: 6.6, fore: 5.6, hand: 4.2, thigh: 9, shin: 7.2, foot: 4.4 }
  const FOOT = { side: { heel: [-3, 3.5], ball: [9, 3.5] }, front: { heel: [-2.6, 3.5], ball: [2.6, 3.5] } }
  const ANGLE_KEYS = ['torso', 'neck', 'footN', 'footF', 'handAngN', 'handAngF']
  const PAIR_KEYS = ['armN', 'armF', 'legN', 'legF']
  const POINT_KEYS = ['root', 'handN', 'handF', 'ankleN', 'ankleF', 'anchorAt']
  const STAND = { root: [0, -53], torso: -90, neck: null, shrug: BONE.shrug, armN: [90, 90], armF: [90, 90], legN: [90, 90], legF: [90, 90], footN: 0, footF: 0 }

  // ---------- authoring helpers ----------
  // Straight body from a fixed ankle, pointing ankle → head at angle a (planks, push-ups).
  function bodyLine(ankle, a) {
    const knee = add(ankle, dir(a), BONE.shin)
    const hip = add(knee, dir(a), BONE.thigh)
    return { root: hip, torso: a, legN: [a + 180, a + 180], legF: [a + 180, a + 180] }
  }
  // Pelvis that puts the shoulder joint (or the point between the shoulders) at S.
  function fromShoulder(S, torso, shrug = BONE.shrug) {
    const neck = add(S, dir(torso), shrug)
    return { root: add(neck, dir(torso), -BONE.torso), torso, shrug }
  }
  const neckOf = (pose) => add(pose.root, dir(pose.torso), BONE.torso)

  // ---------- exercises ----------
  const EX = {}
  const def = (id, o) => { EX[id] = Object.assign({ view: 'side', dur: 3.4, still: 0, base: {}, bend: {}, props: [], muscles: [], say: [], db: {}, floor: true }, o) }

  function pushUp(id, handX, muscles, inset) {
    const A = [0, -8.5]
    const top = bodyLine(A, -20.8), bot = bodyLine(A, -6.4)
    def(id, {
      dur: 3.4, still: 0.45, inset,
      base: { footN: 41.5, footF: 41.5, handN: [handX, -2.5], handF: [handX, -2.5], handAngN: 0, handAngF: 0 },
      bend: { armN: 1, armF: 1 },
      keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
      say: [[0, 'Lower for 2 seconds'], [0.55, 'Press up']],
      muscles, angle: ['EN', 'SN', 'WN'], line: ['AN', 'SN'],
    })
  }
  pushUp('push-up', 71, ['chest', 'triceps', 'frontDelt'], 'hands-shoulder')
  pushUp('wide-push-up', 71, ['chest', 'frontDelt'], 'hands-wide')
  pushUp('diamond-push-up', 66, ['triceps', 'chest'], 'hands-diamond')

  {
    const A = [0, -34.5]
    const top = bodyLine(A, -0.8), bot = bodyLine(A, 13.3)
    def('decline-push-up', {
      still: 0.45,
      base: { footN: 41.5, footF: 41.5, handN: [75, -2.5], handF: [75, -2.5], handAngN: 0, handAngF: 0 },
      bend: { armN: 1, armF: 1 },
      keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
      say: [[0, 'Lower for 2 seconds'], [0.55, 'Press up']],
      muscles: ['chest', 'frontDelt', 'triceps'], props: [{ type: 'bench', x0: -13, x1: 7, y: -26 }], angle: ['EN', 'SN', 'WN'],
    })
  }

  def('db-shoulder-press', {
    view: 'front', dur: 3.2, still: 0,
    base: { legN: [92, 90], legF: [88, 90] },
    keys: [
      { t: 0, armN: [160, -90], armF: [20, -90] },
      { t: 0.38, armN: [-100, -94], armF: [-80, -86] },
      { t: 0.5, armN: [-100, -94], armF: [-80, -86] },
      { t: 0.92, armN: [160, -90], armF: [20, -90] },
      { t: 1, armN: [160, -90], armF: [20, -90] },
    ],
    say: [[0, 'Press straight up'], [0.5, 'Lower to shoulder height']],
    muscles: ['delts', 'triceps'], db: { N: 'flat', F: 'flat' }, trace: 'WN',
  })

  def('db-lateral-raise', {
    view: 'front', dur: 3.4, still: 0.42,
    base: { legN: [92, 90], legF: [88, 90] },
    keys: [
      { t: 0, armN: [100, 96], armF: [80, 84] },
      { t: 0.38, armN: [180, 172], armF: [0, 8] },
      { t: 0.5, armN: [180, 172], armF: [0, 8] },
      { t: 0.95, armN: [100, 96], armF: [80, 84] },
      { t: 1, armN: [100, 96], armF: [80, 84] },
    ],
    say: [[0, 'Raise to shoulder height'], [0.5, 'Lower for 3 seconds']],
    muscles: ['delts'], db: { N: 'end', F: 'end' },
  })

  def('db-overhead-triceps-extension', {
    still: 0.45,
    keys: [
      { t: 0, armN: [-78, -86], armF: [-78, -86], neck: -86 },
      { t: 0.45, armN: [-78, 116], armF: [-78, 116], neck: -86 },
      { t: 0.55, armN: [-78, 116], armF: [-78, 116], neck: -86 },
      { t: 0.9, armN: [-78, -86], armF: [-78, -86], neck: -86 },
      { t: 1, armN: [-78, -86], armF: [-78, -86], neck: -86 },
    ],
    say: [[0, 'Lower behind your head'], [0.55, 'Straighten your arms']],
    muscles: ['triceps'], db: { N: 'along' }, angle: ['EN', 'SN', 'WN'],
  })

  {
    const bar = { type: 'bar', y: 0, x0: -36, x1: 36 }
    const top = fromShoulder([0, 5], -90), bot = fromShoulder([0, 35], -90)
    def('pull-up', {
      view: 'front', dur: 3.6, still: 0.42, inset: 'grip-overhand',
      base: { handN: [-21, 5], handF: [21, 5], legN: [95, 80], legF: [85, 100] },
      bend: { armN: -1, armF: 1 },
      keys: [{ t: 0, ...bot }, { t: 0.38, ...top }, { t: 0.5, ...top }, { t: 0.92, ...bot }, { t: 1, ...bot }],
      say: [[0, 'Pull your elbows down'], [0.38, 'Chin over the bar'], [0.5, 'Lower for 2 seconds']],
      muscles: ['lats', 'biceps'], props: [bar], floor: false,
    })
    def('dead-hang', {
      view: 'front', dur: 4.2, still: 0, inset: 'grip-overhand',
      base: { handN: [-17, 5], handF: [17, 5], legN: [93, 90], legF: [87, 90] },
      bend: { armN: -1, armF: 1 },
      keys: [{ t: 0, ...fromShoulder([0, 36], -90) }, { t: 0.5, ...fromShoulder([0.8, 36.3], -91) }, { t: 1, ...fromShoulder([0, 36], -90) }],
      say: [[0, 'Hang still and breathe']],
      muscles: ['forearm', 'lats'], props: [bar], floor: false,
    })
    const low = fromShoulder([0, 36.5], -90, 0), high = fromShoulder([0, 36.5], -90, 6)
    def('scapular-pull-up', {
      view: 'front', dur: 3, still: 0.4, inset: 'grip-overhand',
      base: { handN: [-17, 5], handF: [17, 5], legN: [93, 90], legF: [87, 90] },
      bend: { armN: -1, armF: 1 },
      keys: [{ t: 0, ...low }, { t: 0.35, ...high }, { t: 0.55, ...high }, { t: 0.9, ...low }, { t: 1, ...low }],
      say: [[0, 'Pull your shoulders down'], [0.55, 'Relax back to the hang']],
      muscles: ['lats'], props: [bar], floor: false,
    })
  }

  {
    const top = { ...fromShoulder([-7, 6], -80), neck: -70, legN: [80, 100], legF: [80, 100] }
    const bot = { ...fromShoulder([-1, 37.5], -92), neck: -92, legN: [88, 98], legF: [88, 98] }
    def('chin-up', {
      dur: 3.6, still: 0.42, inset: 'grip-underhand',
      base: { handN: [1, 5], handF: [1, 5] },
      bend: { armN: 1, armF: 1 },
      keys: [{ t: 0, ...bot }, { t: 0.38, ...top }, { t: 0.5, ...top }, { t: 0.92, ...bot }, { t: 1, ...bot }],
      say: [[0, 'Pull your chest to the bar'], [0.5, 'Lower to a full hang']],
      muscles: ['lats', 'biceps'], props: [{ type: 'barEnd', at: [0, 0] }], floor: false, trace: 'SN',
    })
  }

  {
    const row = (u) => ({ armN: u, armF: u })
    def('db-bent-over-row', {
      dur: 3.2, still: 0.35,
      base: { root: [-10, -48], torso: -30, neck: -22, ankleN: [0, -4], ankleF: [1.5, -4] },
      bend: { legN: -1, legF: -1 },
      keys: [{ t: 0, ...row([90, 90]) }, { t: 0.35, ...row([195, 92]) }, { t: 0.48, ...row([195, 92]) }, { t: 0.92, ...row([90, 90]) }, { t: 1, ...row([90, 90]) }],
      say: [[0, 'Row toward your hips'], [0.35, 'Squeeze'], [0.48, 'Lower with control']],
      muscles: ['lats', 'midBack', 'rearDelt', 'biceps'], db: { N: 'end', F: 'end' }, trace: 'WN',
    })
  }

  def('db-single-arm-row', {
    dur: 3.2, still: 0.35,
    base: { root: [-6, -51], torso: -15, neck: -8, ankleF: [-29, -29.5], footF: 150, ankleN: [2, -4], handF: [22, -28.5], handAngF: 0 },
    bend: { legN: -1, legF: -1, armF: 1 },
    keys: [{ t: 0, armN: [90, 90] }, { t: 0.35, armN: [198, 92] }, { t: 0.48, armN: [198, 92] }, { t: 0.92, armN: [90, 90] }, { t: 1, armN: [90, 90] }],
    say: [[0, 'Pull toward your hip'], [0.35, 'Pause'], [0.48, 'Lower to a full stretch']],
    muscles: ['lats', 'rearDeltN', 'bicepsN'], db: { N: 'end' }, props: [{ type: 'bench', x0: -36, x1: 30, y: -26 }], trace: 'WN',
  })

  {
    const curl = (u, f) => ({ armN: [u, f], armF: [u, f] })
    const keys = [{ t: 0, ...curl(90, 88) }, { t: 0.3, ...curl(86, -62) }, { t: 0.42, ...curl(86, -62) }, { t: 0.95, ...curl(90, 88) }, { t: 1, ...curl(90, 88) }]
    const say = [[0, 'Curl, upper arms still'], [0.3, 'Squeeze'], [0.42, 'Lower for 3 seconds']]
    def('db-biceps-curl', { dur: 3.6, still: 0.3, keys, say, muscles: ['biceps'], db: { N: 'end', F: 'end' }, angle: ['EN', 'SN', 'WN'] })
    def('db-hammer-curl', { dur: 3.6, still: 0.3, keys, say, muscles: ['biceps', 'forearm'], db: { N: 'perp', F: 'perp' }, angle: ['EN', 'SN', 'WN'] })
  }

  {
    const chest = (pose) => add(add(neckOf(pose), dir(pose.torso + 90), 9), dir(pose.torso + 180), 4.5)
    const stand = { root: [-1, -52.5], torso: -88, neck: -88 }
    const deep = { root: [-9, -22], torso: -68, neck: -78 }
    const s = { ...stand, handN: chest(stand), handF: chest(stand) }
    const d = { ...deep, handN: chest(deep), handF: chest(deep) }
    def('db-goblet-squat', {
      dur: 3.6, still: 0.45,
      base: { ankleN: [2, -4], ankleF: [3.5, -4] },
      bend: { legN: -1, legF: -1, armN: 1, armF: 1 },
      keys: [{ t: 0, ...s }, { t: 0.45, ...d }, { t: 0.55, ...d }, { t: 0.9, ...s }, { t: 1, ...s }],
      say: [[0, 'Sit down between your heels'], [0.55, 'Drive up through your feet']],
      muscles: ['quads', 'glutes'], db: { goblet: true }, angle: ['KN', 'HN', 'AN'],
    })
  }

  {
    const top = { root: [-6, -48], torso: -86 }, bot = { root: [-8, -30], torso: -80 }
    def('db-bulgarian-split-squat', {
      dur: 3.6, still: 0.45,
      base: { ankleN: [16, -4], ankleF: [-32, -29], footF: 150, armN: [92, 90], armF: [92, 90] },
      bend: { legN: -1, legF: -1 },
      keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
      say: [[0, 'Lower straight down'], [0.55, 'Push through your front foot']],
      muscles: ['quadsN', 'glutes'], db: { N: 'end', F: 'end' }, props: [{ type: 'bench', x0: -52, x1: -28, y: -26 }], angle: ['KN', 'HN', 'AN'],
    })
  }

  def('db-romanian-deadlift', {
    dur: 3.8, still: 0.45,
    base: { ankleN: [0, -4], ankleF: [1.5, -4], armN: [90, 90], armF: [90, 90] },
    bend: { legN: -1, legF: -1 },
    keys: [
      { t: 0, root: [0, -52], torso: -90 },
      { t: 0.45, root: [-20, -47], torso: -18 },
      { t: 0.55, root: [-20, -47], torso: -18 },
      { t: 0.92, root: [0, -52], torso: -90 },
      { t: 1, root: [0, -52], torso: -90 },
    ],
    say: [[0, 'Push your hips back'], [0.55, 'Drive your hips forward']],
    muscles: ['hamstrings', 'glutes'], db: { N: 'end', F: 'end' }, angle: ['HN', 'N', 'KN'], trace: 'WN',
  })

  def('standing-calf-raise', {
    dur: 2.8, still: 0.42,
    base: { root: [0, -53], anchor: 'ballN', anchorAt: [1, -12] },
    keys: [
      { t: 0, footN: -20, footF: -20 },
      { t: 0.4, footN: 35, footF: 35 },
      { t: 0.55, footN: 35, footF: 35 },
      { t: 0.95, footN: -20, footF: -20 },
      { t: 1, footN: -20, footF: -20 },
    ],
    say: [[0, 'Rise as high as you can'], [0.55, 'Lower below the step']],
    muscles: ['calves'], props: [{ type: 'step', x0: -4, x1: 30, y: -12 }],
  })

  {
    const mat = { type: 'mat', x0: -50, x1: 44 }
    const lie = { anchor: 'SN', anchorAt: [-30, -6], root: [0, 0], neck: 180 }
    def('reverse-crunch', {
      dur: 3.2, still: 0.45,
      base: { ...lie, armN: [6, 0], armF: [6, 0] },
      keys: [
        { t: 0, torso: 180, legN: [-90, 0], legF: [-90, 0] },
        { t: 0.45, torso: 166, legN: [-132, -42], legF: [-132, -42] },
        { t: 0.55, torso: 166, legN: [-132, -42], legF: [-132, -42] },
        { t: 0.95, torso: 180, legN: [-90, 0], legF: [-90, 0] },
        { t: 1, torso: 180, legN: [-90, 0], legF: [-90, 0] },
      ],
      say: [[0, 'Curl your hips off the floor'], [0.55, 'Lower slowly']],
      muscles: ['abs'], props: [mat],
    })
    const tuck = { armN: [-90, -90], armF: [-90, -90], legN: [-90, 0], legF: [-90, 0] }
    const reachA = { ...tuck, armN: [188, 186], legF: [-6, -4] }
    const reachB = { ...tuck, armF: [188, 186], legN: [-6, -4] }
    def('dead-bug', {
      dur: 5.2, still: 0.25,
      base: { ...lie, torso: 180 },
      keys: [{ t: 0, ...tuck }, { t: 0.25, ...reachA }, { t: 0.36, ...reachA }, { t: 0.5, ...tuck }, { t: 0.75, ...reachB }, { t: 0.86, ...reachB }, { t: 1, ...tuck }],
      say: [[0, 'Reach opposite arm and leg'], [0.36, 'Back to the start'], [0.5, 'Switch sides'], [0.86, 'Back to the start']],
      muscles: ['abs'], props: [mat],
    })
  }

  {
    const A = [0, -8.5]
    def('plank', {
      dur: 4.4, still: 0,
      base: { footN: 41.5, footF: 41.5, armN: [90, 0], armF: [90, 0], handAngN: 0, handAngF: 0 },
      keys: [{ t: 0, ...bodyLine(A, -9.1) }, { t: 0.5, ...bodyLine(A, -9.7) }, { t: 1, ...bodyLine(A, -9.1) }],
      say: [[0, 'Hold one straight line and breathe']],
      muscles: ['abs', 'glutes', 'frontDelt'], line: ['AN', 'SN'],
    })
  }

  {
    const stand = { root: [0, -52.5], torso: -90, ankleF: [0, -4], footF: 0 }
    def('reverse-lunge', {
      dur: 4.2, still: 0.5,
      base: { ankleN: [2, -4], armN: [92, 90], armF: [92, 90] },
      bend: { legN: -1, legF: -1 },
      keys: [
        { t: 0, ...stand },
        { t: 0.12, root: [-1, -52], torso: -90, ankleF: [-14, -12], footF: 20 },
        { t: 0.28, root: [-8, -46], torso: -87, ankleF: [-34, -9], footF: 50 },
        { t: 0.5, root: [-14, -30], torso: -84, ankleF: [-34, -9], footF: 50 },
        { t: 0.58, root: [-14, -30], torso: -84, ankleF: [-34, -9], footF: 50 },
        { t: 0.78, root: [-6, -48], torso: -88, ankleF: [-30, -9], footF: 50 },
        { t: 0.9, root: [-1, -52], torso: -90, ankleF: [-12, -12], footF: 20 },
        { t: 1, ...stand },
      ],
      say: [[0, 'Step back'], [0.28, 'Lower straight down'], [0.58, 'Push through your front heel']],
      muscles: ['quadsN', 'glutes'], db: { N: 'end', F: 'end' }, angle: ['KN', 'HN', 'AN'],
    })
  }

  {
    const A = [0, -8.5]
    const top = bodyLine(A, -43.5), bot = bodyLine(A, -27.4)
    def('incline-push-up', {
      still: 0.45,
      base: { footN: 41.5, footF: 41.5, handN: [55, -28.5], handF: [55, -28.5], handAngN: 0, handAngF: 0 },
      bend: { armN: 1, armF: 1 },
      keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
      say: [[0, 'Lower your chest to the edge'], [0.55, 'Press up']],
      muscles: ['chest', 'triceps', 'frontDelt'], props: [{ type: 'bench', x0: 46, x1: 70, y: -26 }], angle: ['EN', 'SN', 'WN'],
    })
  }

  {
    const legs = (a) => ({ legN: [a + 180, a + 180], legF: [a + 180, a + 180] })
    const hip = (a) => add([0, -8.5], dir(a), BONE.shin + BONE.thigh)
    const top = { root: hip(-55), torso: 30, ...legs(-55) }, bot = { root: hip(-50), torso: 55, ...legs(-50) }
    def('pike-push-up', {
      still: 0.45,
      base: { footN: 30, footF: 30, handN: [60, -2.5], handF: [60, -2.5], handAngN: 0, handAngF: 0 },
      bend: { armN: 1, armF: 1 },
      keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
      say: [[0, 'Lower the top of your head'], [0.55, 'Press back up']],
      muscles: ['delts', 'triceps'], angle: ['EN', 'SN', 'WN'],
    })
  }

  {
    const top = fromShoulder([0, 5], -90), bot = fromShoulder([0, 35], -90)
    def('negative-pull-up', {
      view: 'front', dur: 6, still: 0.35, inset: 'grip-overhand',
      base: { handN: [-21, 5], handF: [21, 5], legN: [95, 80], legF: [85, 100] },
      bend: { armN: -1, armF: 1 },
      keys: [{ t: 0, ...top }, { t: 0.08, ...top }, { t: 0.72, ...bot }, { t: 0.8, ...bot }, { t: 0.95, ...top }, { t: 1, ...top }],
      say: [[0, 'Start with your chin over the bar'], [0.08, 'Lower for 4 to 5 seconds'], [0.8, 'Step back up']],
      muscles: ['lats', 'biceps'], props: [{ type: 'bar', y: 0, x0: -36, x1: 36 }], floor: false,
    })
  }

  {
    const top = { root: [-6, -49], torso: -88 }, bot = { root: [-7, -30], torso: -86 }
    def('split-squat', {
      dur: 3.4, still: 0.45,
      base: { ankleN: [14, -4], ankleF: [-28, -9], footF: 50 },
      bend: { legN: -1, legF: -1 },
      keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
      say: [[0, 'Lower your back knee toward the floor'], [0.55, 'Push through the front foot']],
      muscles: ['quadsN', 'glutes'], angle: ['KN', 'HN', 'AN'],
    })
  }

  {
    const lie = { anchor: 'SN', anchorAt: [-30, -6], root: [0, 0], neck: 180, armN: [6, 0], armF: [6, 0] }
    def('glute-bridge', {
      dur: 3.2, still: 0.45,
      base: { ...lie, ankleN: [16, -4], ankleF: [17.5, -4] },
      bend: { legN: -1, legF: -1 },
      keys: [{ t: 0, torso: 180 }, { t: 0.4, torso: 157 }, { t: 0.55, torso: 157 }, { t: 0.95, torso: 180 }, { t: 1, torso: 180 }],
      say: [[0, 'Drive your hips up'], [0.4, 'Squeeze for a second'], [0.55, 'Lower']],
      muscles: ['glutes', 'hamstrings'], props: [{ type: 'mat', x0: -50, x1: 30 }],
    })
  }

  def('single-leg-calf-raise', {
    dur: 3, still: 0.42,
    base: { root: [0, -53], anchor: 'ballN', anchorAt: [1, -12], legF: [100, 160] },
    keys: [{ t: 0, footN: -20 }, { t: 0.42, footN: 35 }, { t: 0.56, footN: 35 }, { t: 0.95, footN: -20 }, { t: 1, footN: -20 }],
    say: [[0, 'Rise on one foot'], [0.56, 'Lower below the step']],
    muscles: ['calvesN'], props: [{ type: 'step', x0: -4, x1: 30, y: -12 }],
  })

  def('db-single-leg-rdl', {
    dur: 4, still: 0.45,
    base: { ankleN: [0, -4], armN: [90, 90], armF: [90, 90] },
    bend: { legN: -1 },
    keys: [
      { t: 0, root: [0, -52], torso: -90, legF: [96, 92] },
      { t: 0.45, root: [-4, -49], torso: -14, legF: [166, 166] },
      { t: 0.55, root: [-4, -49], torso: -14, legF: [166, 166] },
      { t: 0.92, root: [0, -52], torso: -90, legF: [96, 92] },
      { t: 1, root: [0, -52], torso: -90, legF: [96, 92] },
    ],
    say: [[0, 'Hinge as the back leg reaches'], [0.55, 'Stand tall']],
    muscles: ['hamstringsN', 'glutes'], db: { F: 'end' },
  })

  // ---------- pose interpolation and solving ----------
  function poseAt(ex, u) {
    const keys = ex.keys
    let k = 0
    while (k < keys.length - 2 && u >= keys[k + 1].t) k++
    const a = keys[k], b = keys[k + 1]
    const span = b.t - a.t
    const t = span > 0 ? ease(Math.min(1, Math.max(0, (u - a.t) / span))) : 0
    const A = Object.assign({}, STAND, ex.base, a), Bk = Object.assign({}, STAND, ex.base, b)
    const p = Object.assign({}, A)
    for (const key of ANGLE_KEYS) {
      if (A[key] == null || Bk[key] == null) continue
      p[key] = lerpAng(A[key], Bk[key], t)
    }
    for (const key of PAIR_KEYS) p[key] = [lerpAng(A[key][0], Bk[key][0], t), lerpAng(A[key][1], Bk[key][1], t)]
    for (const key of POINT_KEYS) {
      if (!A[key] || !Bk[key]) continue
      p[key] = [lerp(A[key][0], Bk[key][0], t), lerp(A[key][1], Bk[key][1], t)]
    }
    p.shrug = lerp(A.shrug, Bk.shrug, t)
    return p
  }

  function ik(base, target, l1, l2, bend) {
    const d0 = sub(target, base)
    const d = Math.min(Math.max(len(d0), Math.abs(l1 - l2) + 1e-3), l1 + l2 - 1e-3)
    const a = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)) / RAD
    const joint = add(base, dir(ang(d0) + (bend || 1) * a), l1)
    return [joint, add(joint, dir(ang(sub(target, joint))), l2)]
  }

  function solve(ex, p) {
    const front = ex.view === 'front'
    const foot = front ? FOOT.front : FOOT.side
    const J = {}
    const place = (pelvis) => {
      J.P = pelvis
      J.N = add(pelvis, dir(p.torso), BONE.torso)
      J.H = add(J.N, dir(p.neck == null ? p.torso : p.neck), BONE.neck)
      const S = add(J.N, dir(p.torso), -p.shrug)
      if (front) {
        const perp = dir(p.torso + 90)
        J.SN = add(S, perp, -BONE.shoulderHalf); J.SF = add(S, perp, BONE.shoulderHalf)
        J.HN = add(pelvis, perp, -BONE.hipHalf); J.HF = add(pelvis, perp, BONE.hipHalf)
      } else {
        J.SN = J.SF = S
        J.HN = J.HF = pelvis
      }
      for (const s of ['N', 'F']) {
        J['E' + s] = add(J['S' + s], dir(p['arm' + s][0]), BONE.upper)
        J['W' + s] = add(J['E' + s], dir(p['arm' + s][1]), BONE.fore)
        J['K' + s] = add(J['H' + s], dir(p['leg' + s][0]), BONE.thigh)
        J['A' + s] = add(J['K' + s], dir(p['leg' + s][1]), BONE.shin)
        feet(s)
      }
    }
    const feet = (s) => {
      const r = p['foot' + s] || 0
      J['heel' + s] = add(J['A' + s], rot(foot.heel, r))
      J['ball' + s] = add(J['A' + s], rot(foot.ball, r))
    }
    place(p.root)
    if (p.anchor && p.anchorAt) place(add(p.root, sub(p.anchorAt, J[p.anchor])))
    for (const s of ['N', 'F']) {
      if (p['hand' + s]) [J['E' + s], J['W' + s]] = ik(J['S' + s], p['hand' + s], BONE.upper, BONE.fore, ex.bend['arm' + s])
      if (p['ankle' + s]) {
        [J['K' + s], J['A' + s]] = ik(J['H' + s], p['ankle' + s], BONE.thigh, BONE.shin, ex.bend['leg' + s] || -1)
        feet(s)
      }
      const fa = ang(sub(J['W' + s], J['E' + s]))
      J['fore' + s] = fa
      J['hand' + s] = add(J['W' + s], dir(p['handAng' + s] == null ? fa : p['handAng' + s]), BONE.hand)
    }
    J.torso = p.torso
    J.neckAng = p.neck == null ? p.torso : p.neck
    return J
  }

  // ---------- muscles ----------
  // Bands sit on one face of a segment: +1 = front (chest, quads), -1 = back (lats, hamstrings).
  // "Front" of the torso is its direction +90°, of a limb its direction -90°.
  function band(a, b, t0, t1, face, off, w, torso) {
    const d = ang(sub(b, a))
    const n = dir(d + (torso ? 90 : -90) * face)
    const p0 = add(add(a, sub(b, a), t0), n, off), p1 = add(add(a, sub(b, a), t1), n, off)
    return { k: 'line', p0, p1, w }
  }
  function torsoMuscle(name, J, front) {
    if (front) {
      const mid = (p, q, t) => add(p, sub(q, p), t)
      switch (name) {
        case 'chest': return [{ k: 'line', p0: mid(mid(J.SN, J.HN, 0.22), mid(J.SF, J.HF, 0.22), 0.18), p1: mid(mid(J.SN, J.HN, 0.22), mid(J.SF, J.HF, 0.22), 0.82), w: 6 }]
        case 'abs': return [{ k: 'line', p0: mid(J.P, J.N, 0.08), p1: mid(J.P, J.N, 0.5), w: 6 }]
        case 'lats': return [
          { k: 'line', p0: add(mid(J.SN, J.HN, 0.15), sub(J.SF, J.SN), 0.08), p1: add(mid(J.SN, J.HN, 0.62), sub(J.SF, J.SN), 0.12), w: 4.6 },
          { k: 'line', p0: add(mid(J.SF, J.HF, 0.15), sub(J.SN, J.SF), 0.08), p1: add(mid(J.SF, J.HF, 0.62), sub(J.SN, J.SF), 0.12), w: 4.6 }]
        case 'midBack': return []
        case 'glutes': return []
        case 'delts': case 'frontDelt': case 'rearDelt': return [{ k: 'dot', c: J.SN, r: 4.3 }, { k: 'dot', c: J.SF, r: 4.3 }]
      }
      return []
    }
    const S = J.SN
    switch (name) {
      case 'chest': return [band(J.P, J.N, 0.55, 0.9, 1, 3.4, 6, true)]
      case 'abs': return [band(J.P, J.N, 0.1, 0.5, 1, 3.4, 5.5, true)]
      case 'lats': return [band(J.P, J.N, 0.42, 0.84, -1, 3.4, 6, true)]
      case 'midBack': return [band(J.P, J.N, 0.62, 0.95, -1, 3.4, 5, true)]
      case 'glutes': return [{ k: 'dot', c: add(J.P, dir(J.torso - 90), 4.2), r: 4.6 }]
      case 'frontDelt': return [{ k: 'dot', c: add(S, dir(J.torso + 90), 2.2), r: 3.8 }]
      case 'rearDelt': return [{ k: 'dot', c: add(S, dir(J.torso - 90), 2.2), r: 3.8 }]
      case 'delts': return [{ k: 'dot', c: S, r: 4.3 }]
    }
    return []
  }
  function limbMuscle(name, J, s, front) {
    const full = (a, b, w) => ({ k: 'line', p0: add(a, sub(b, a), 0.12), p1: add(a, sub(b, a), 0.86), w })
    const arm = (x) => Object.assign(x, { limb: 'arm' }), leg = (x) => Object.assign(x, { limb: 'leg' })
    switch (name) {
      case 'biceps': return [arm(front ? full(J['S' + s], J['E' + s], 4) : band(J['S' + s], J['E' + s], 0.15, 0.82, 1, 1.5, 3.8))]
      case 'triceps': return [arm(front ? full(J['S' + s], J['E' + s], 4) : band(J['S' + s], J['E' + s], 0.15, 0.85, -1, 1.5, 3.8))]
      case 'forearm': return [arm(full(J['E' + s], J['W' + s], 4))]
      case 'quads': return [leg(front ? full(J['H' + s], J['K' + s], 5.5) : band(J['H' + s], J['K' + s], 0.12, 0.86, 1, 2.1, 5.2))]
      case 'hamstrings': return [leg(band(J['H' + s], J['K' + s], 0.15, 0.86, -1, 2.1, 5.2))]
      case 'calves': return [leg(band(J['K' + s], J['A' + s], 0.08, 0.5, -1, 1.7, 5.2))]
    }
    return []
  }
  const LIMB = new Set(['biceps', 'triceps', 'forearm', 'quads', 'hamstrings', 'calves'])
  function muscleShapes(ex, J) {
    const front = ex.view === 'front'
    const out = { torso: [], N: [], F: [] }
    for (const raw of ex.muscles) {
      const side = /[NF]$/.test(raw) && !/^(abs)$/.test(raw) ? raw.slice(-1) : null
      const name = side ? raw.slice(0, -1) : raw
      if (LIMB.has(name)) {
        for (const s of side ? [side] : ['N', 'F']) out[s].push(...limbMuscle(name, J, s, front))
      } else out.torso.push(...torsoMuscle(name, J, front))
    }
    return out
  }

  // ---------- dumbbells ----------
  function dumbbellShapes(ex, J) {
    const out = { N: [], F: [] }
    const db = ex.db || {}
    const sideOn = (c, a, s) => {
      const u = dir(a), v = dir(a + 90)
      const e0 = add(c, u, -5.2), e1 = add(c, u, 5.2)
      out[s].push({ k: 'line', p0: e0, p1: e1, w: 2.2, cls: 'db' },
        { k: 'line', p0: add(e0, v, -4.6), p1: add(e0, v, 4.6), w: 3.6, cls: 'db' },
        { k: 'line', p0: add(e1, v, -4.6), p1: add(e1, v, 4.6), w: 3.6, cls: 'db' })
    }
    if (db.goblet) {
      const c = add([(J.handN[0] + J.handF[0]) / 2, (J.handN[1] + J.handF[1]) / 2], [0, -1])
      sideOn(c, -90, 'N')
      return out
    }
    for (const s of ['N', 'F']) {
      const mode = db[s]
      if (!mode) continue
      const fa = J['fore' + s]
      const grip = add(J['W' + s], dir(fa), 2.4)
      if (mode === 'end') out[s].push({ k: 'plate', c: grip, r: 5.2 })
      else if (mode === 'perp') sideOn(grip, fa - 90, s)
      else if (mode === 'flat') sideOn(grip, 0, s)
      else if (mode === 'along') sideOn(add(J['W' + s], dir(fa), 6.5), fa, s)
    }
    return out
  }

  // ---------- props and camera ----------
  function propShapes(ex) {
    const out = []
    for (const pr of ex.props) {
      if (pr.type === 'bench') {
        out.push({ k: 'rect', x: pr.x0, y: pr.y, w: pr.x1 - pr.x0, h: 3.5, cls: 'prop' },
          { k: 'line', p0: [pr.x0 + 3, pr.y + 3], p1: [pr.x0 + 3, 0], w: 2.2, cls: 'prop' },
          { k: 'line', p0: [pr.x1 - 3, pr.y + 3], p1: [pr.x1 - 3, 0], w: 2.2, cls: 'prop' })
      } else if (pr.type === 'step') {
        out.push({ k: 'rect', x: pr.x0, y: pr.y, w: pr.x1 - pr.x0, h: -pr.y, cls: 'prop' })
      } else if (pr.type === 'mat') {
        out.push({ k: 'rect', x: pr.x0, y: -1.4, w: pr.x1 - pr.x0, h: 1.4, cls: 'mat' })
      } else if (pr.type === 'bar') {
        out.push({ k: 'line', p0: [pr.x0, pr.y], p1: [pr.x1, pr.y], w: 2.6, cls: 'prop' },
          { k: 'line', p0: [pr.x0, pr.y - 8], p1: [pr.x0, pr.y + 4], w: 3.4, cls: 'prop' },
          { k: 'line', p0: [pr.x1, pr.y - 8], p1: [pr.x1, pr.y + 4], w: 3.4, cls: 'prop' })
      } else if (pr.type === 'barEnd') {
        // Seen end-on the bar sits in the hands, so it draws over the figure.
        out.push({ k: 'line', p0: [pr.at[0], pr.at[1] - 12], p1: pr.at, w: 2.4, cls: 'prop', over: true },
          { k: 'dot', c: pr.at, r: 2.8, cls: 'prop', over: true })
      }
    }
    return out
  }

  const cameraCache = {}
  function camera(id, aspect) {
    const key = id + ':' + aspect
    if (cameraCache[key]) return cameraCache[key]
    const ex = EX[id]
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
    const grow = (p, m) => { x0 = Math.min(x0, p[0] - m); y0 = Math.min(y0, p[1] - m); x1 = Math.max(x1, p[0] + m); y1 = Math.max(y1, p[1] + m) }
    for (let i = 0; i < 40; i++) {
      const J = solve(ex, poseAt(ex, i / 40))
      for (const k of Object.keys(J)) if (Array.isArray(J[k])) grow(J[k], k === 'H' ? BONE.head + 1 : 5.5)
      const dbs = dumbbellShapes(ex, J)
      for (const s of ['N', 'F']) for (const d of dbs[s]) d.c ? grow(d.c, 6) : (grow(d.p0, 2.5), grow(d.p1, 2.5))
    }
    for (const pr of propShapes(ex)) {
      if (pr.k === 'rect') { grow([pr.x, pr.y], 1); grow([pr.x + pr.w, pr.y + pr.h], 1) }
      else if (pr.k === 'line') { grow(pr.p0, 2); grow(pr.p1, 2) }
      else grow(pr.c, pr.r + 1)
    }
    if (ex.floor) y1 = Math.max(y1, 3)
    const pad = 7
    x0 -= pad; y0 -= pad; x1 += pad; y1 += ex.floor ? 3 : pad
    let w = x1 - x0, h = y1 - y0
    // 'auto' keeps the movement's own shape within sane bounds, so wide moves don't float in empty space.
    if (aspect === 'auto') aspect = Math.min(2.1, Math.max(1.2, w / h))
    if (w / h < aspect) { const nw = h * aspect; x0 -= (nw - w) / 2; w = nw }
    else { const nh = w / aspect; y0 -= nh - h; h = nh }
    return (cameraCache[key] = { x: x0, y: y0, w, h })
  }

  // ---------- rendering ----------
  const NS = 'http://www.w3.org/2000/svg'
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag)
    for (const k in attrs) e.setAttribute(k, attrs[k])
    if (parent) parent.appendChild(e)
    return e
  }

  function sceneShapes(ex, J, opts) {
    const front = ex.view === 'front'
    const m = muscleShapes(ex, J)
    const dbs = dumbbellShapes(ex, J)
    const seg = (a, b, w, cls) => ({ k: 'line', p0: a, p1: b, w, cls })
    const far = front ? 'body' : 'far'
    const off = front ? [0, 0] : [-1.6, -1.1]
    const shift = (sh) => sh.map((s) => {
      const o = Object.assign({}, s)
      if (o.p0) { o.p0 = add(o.p0, off); o.p1 = add(o.p1, off) }
      if (o.c) o.c = add(o.c, off)
      return o
    })
    const leg = (s, cls) => [seg(J['H' + s], J['K' + s], WIDTH.thigh, cls), seg(J['K' + s], J['A' + s], WIDTH.shin, cls), seg(J['heel' + s], J['ball' + s], WIDTH.foot, cls)]
    const arm = (s, cls) => [seg(J['S' + s], J['E' + s], WIDTH.upper, cls), seg(J['E' + s], J['W' + s], WIDTH.fore, cls), seg(J['W' + s], J['hand' + s], WIDTH.hand, cls)]
    const mus = (list) => list.map((x) => Object.assign({ cls: 'muscle' }, x))
    const torso = front
      ? [{ k: 'poly', pts: [J.SN, J.SF, J.HF, J.HN], w: WIDTH.torsoFront, cls: 'body' }]
      : [seg(J.P, J.N, WIDTH.torso, 'body')]
    const head = [seg(J.N, add(J.N, dir(J.neckAng), BONE.neck - 2), WIDTH.neck, 'body'), { k: 'dot', c: J.H, r: BONE.head, cls: 'body' }]
    if (!front) head.push({ k: 'dot', c: add(J.H, dir(J.neckAng + 90), 6.1), r: 1.7, cls: 'body' })
    const dbCls = (list) => list.map((x) => Object.assign({ cls: 'db' }, x))

    const legM = (s) => mus(m[s].filter((x) => x.limb === 'leg'))
    const armM = (s) => mus(m[s].filter((x) => x.limb === 'arm'))
    const farM = (list) => shift(list).map((x) => Object.assign(x, { cls: 'muscle far-m' }))

    const props = propShapes(ex)
    const L = [props.filter((x) => !x.over)]
    if (front) {
      L.push(leg('F', 'body'), leg('N', 'body'), legM('F'), legM('N'))
      L.push(torso, mus(m.torso), head)
      L.push(arm('N', 'body'), armM('N'), dbCls(dbs.N), arm('F', 'body'), armM('F'), dbCls(dbs.F))
    } else {
      L.push(shift(leg('F', far)), farM(legM('F')), shift(arm('F', far)), farM(armM('F')), shift(dbCls(dbs.F)))
      L.push(torso, mus(m.torso), head)
      L.push(leg('N', 'body'), legM('N'), arm('N', 'body'), armM('N'), dbCls(dbs.N))
    }
    L.push(props.filter((x) => x.over))
    if (opts.annotate) L.push(annotations(ex, J))
    return L.map((shapes) => ({ shapes }))
  }

  function annotations(ex, J) {
    const out = []
    if (ex.angle) {
      const [v, a, b] = ex.angle
      const V = J[v], A = J[a], Bp = J[b]
      if (V && A && Bp) {
        const a0 = ang(sub(A, V)), a1 = ang(sub(Bp, V))
        let d = ((a1 - a0 + 540) % 360) - 180
        const r = 9
        const p0 = add(V, dir(a0), r), p1 = add(V, dir(a0 + d), r)
        out.push({ k: 'arc', V, r, a0, d, p0, p1, cls: 'annot' })
        out.push({ k: 'text', at: add(V, dir(a0 + d / 2), r + 7), text: Math.round(Math.abs(d)) + '°', cls: 'annot-t' })
      }
    }
    if (ex.line) {
      const [a, b] = ex.line
      const A = J[a], Bp = J[b]
      const u = sub(Bp, A), n = dir(ang(u) - 90)
      out.push({ k: 'line', p0: add(add(A, u, -0.12), n, 9), p1: add(add(A, u, 1.12), n, 9), w: 0.7, cls: 'annot dash' })
    }
    return out
  }

  function mount(container, id, opts) {
    const ex = EX[id]
    if (!ex) throw new Error('Unknown exercise ' + id)
    opts = Object.assign({ style: 'solid', annotate: false, autoplay: true, aspect: 4 / 3, speed: 1 }, opts || {})
    const cam = camera(id, opts.aspect)
    const svg = el('svg', { viewBox: [cam.x, cam.y, cam.w, cam.h].map(r1).join(' '), class: 'wf wf-' + opts.style, role: 'img', preserveAspectRatio: 'xMidYMid meet' })
    if (opts.label) svg.setAttribute('aria-label', opts.label)
    if (ex.floor) el('line', { x1: r1(cam.x), y1: 0, x2: r1(cam.x + cam.w), y2: 0, class: 'wf-floor' }, svg)
    if (opts.annotate && ex.trace) {
      const pts = []
      for (let i = 0; i <= 48; i++) pts.push(solve(ex, poseAt(ex, i / 48))[ex.trace].map(r1).join(','))
      el('polyline', { points: pts.join(' '), class: 'wf-trace' }, svg)
    }
    const g = el('g', {}, svg)
    container.appendChild(svg)
    let nodes = null
    const outline = opts.style === 'outline'

    function draw(u) {
      const J = solve(ex, poseAt(ex, u))
      const layers = sceneShapes(ex, J, opts)
      const flat = []
      for (const l of layers) for (const s of l.shapes) flat.push(s)
      if (!nodes || nodes.length !== flat.length) {
        g.textContent = ''
        nodes = flat.map((s) => build(s))
      }
      flat.forEach((s, i) => update(nodes[i], s))
    }
    function build(s) {
      const cls = 'wf-' + (s.cls || 'body').split(' ').join(' wf-')
      if (s.k === 'line') {
        if (outline && /body|far/.test(s.cls)) {
          const wrap = el('g', { class: cls }, g)
          return { wrap, a: el('line', { class: 'wf-ink' }, wrap), b: el('line', { class: 'wf-fill' }, wrap) }
        }
        return { a: el('line', { class: cls }, g) }
      }
      if (s.k === 'dot' || s.k === 'plate') {
        const wrap = el('g', { class: s.k === 'plate' ? 'wf-db' : cls }, g)
        const o = { wrap, a: el('circle', { class: s.k === 'plate' ? 'wf-plate' : '' }, wrap) }
        if (s.k === 'plate') o.b = el('circle', { class: 'wf-hub' }, wrap)
        return o
      }
      if (s.k === 'poly') {
        if (outline) {
          const wrap = el('g', { class: cls }, g)
          return { wrap, a: el('polygon', { class: 'wf-ink' }, wrap), b: el('polygon', { class: 'wf-fill' }, wrap) }
        }
        return { a: el('polygon', { class: cls }, g) }
      }
      if (s.k === 'rect') return { a: el('rect', { class: cls }, g) }
      if (s.k === 'arc') return { a: el('path', { class: cls }, g) }
      if (s.k === 'text') return { a: el('text', { class: cls, 'text-anchor': 'middle' }, g) }
      return { a: el('g', {}, g) }
    }
    function update(n, s) {
      if (s.k === 'line') {
        const at = { x1: r1(s.p0[0]), y1: r1(s.p0[1]), x2: r1(s.p1[0]), y2: r1(s.p1[1]) }
        for (const k in at) { n.a.setAttribute(k, at[k]); if (n.b) n.b.setAttribute(k, at[k]) }
        n.a.setAttribute('stroke-width', n.b ? s.w + 2.4 : s.w)
        if (n.b) n.b.setAttribute('stroke-width', s.w)
      } else if (s.k === 'dot' || s.k === 'plate') {
        n.a.setAttribute('cx', r1(s.c[0])); n.a.setAttribute('cy', r1(s.c[1])); n.a.setAttribute('r', s.r)
        if (n.b) { n.b.setAttribute('cx', r1(s.c[0])); n.b.setAttribute('cy', r1(s.c[1])); n.b.setAttribute('r', s.r * 0.36) }
      } else if (s.k === 'poly') {
        const pts = s.pts.map((p) => r1(p[0]) + ',' + r1(p[1])).join(' ')
        n.a.setAttribute('points', pts); n.a.setAttribute('stroke-width', n.b ? s.w + 2.4 : s.w)
        if (n.b) { n.b.setAttribute('points', pts); n.b.setAttribute('stroke-width', s.w) }
      } else if (s.k === 'rect') {
        n.a.setAttribute('x', r1(s.x)); n.a.setAttribute('y', r1(Math.min(s.y, s.y + s.h)))
        n.a.setAttribute('width', r1(s.w)); n.a.setAttribute('height', r1(Math.abs(s.h))); n.a.setAttribute('rx', 1)
      } else if (s.k === 'arc') {
        const large = Math.abs(s.d) > 180 ? 1 : 0, sweep = s.d > 0 ? 1 : 0
        n.a.setAttribute('d', `M${r1(s.p0[0])} ${r1(s.p0[1])} A${s.r} ${s.r} 0 ${large} ${sweep} ${r1(s.p1[0])} ${r1(s.p1[1])}`)
      } else if (s.k === 'text') {
        n.a.setAttribute('x', r1(s.at[0])); n.a.setAttribute('y', r1(s.at[1] + 2)); n.a.textContent = s.text
      }
    }

    const inst = {
      svg, id, playing: false, u: ex.still, speed: opts.speed, onPhase: opts.onPhase || null, lastPhase: null, visible: true, t0: 0,
      render(u) {
        this.u = u
        draw(u)
        const ph = phaseAt(id, u)
        if (ph !== this.lastPhase) { this.lastPhase = ph; if (this.onPhase) this.onPhase(ph, u) }
      },
      play() { if (this.playing) return; this.playing = true; this.t0 = performance.now() - this.u * ex.dur * 1000 / this.speed; LOOP.add(this); kick() },
      pause() { this.playing = false; LOOP.delete(this) },
      toggle() { this.playing ? this.pause() : this.play(); return this.playing },
      setSpeed(s) { const u = this.u; this.speed = s; this.t0 = performance.now() - u * ex.dur * 1000 / s },
      destroy() { this.pause(); io && io.unobserve(svg); svg.remove() },
    }
    inst.render(ex.still)
    if (io) { io.observe(svg); svg.__wf = inst }
    if (opts.autoplay && !REDUCED) inst.play()
    return inst
  }

  function phaseAt(id, u) {
    const say = EX[id].say
    let cur = say.length ? say[0][1] : ''
    for (const [t, text] of say) if (u >= t) cur = text
    return cur
  }

  const LOOP = new Set()
  let raf = 0
  const REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const io = typeof IntersectionObserver === 'function' ? new IntersectionObserver((entries) => {
    for (const e of entries) if (e.target.__wf) e.target.__wf.visible = e.isIntersecting
  }) : null
  function kick() { if (!raf) raf = requestAnimationFrame(frame) }
  function frame(now) {
    raf = 0
    for (const f of LOOP) {
      if (!f.visible || !f.svg.isConnected) continue
      const dur = EX[f.id].dur * 1000 / f.speed
      f.render(((now - f.t0) % dur) / dur)
    }
    if (LOOP.size) kick()
  }

  root.WorkoutFigure = {
    mount,
    ids: () => Object.keys(EX),
    has: (id) => !!EX[id],
    info: (id) => { const e = EX[id]; return e && { view: e.view, dur: e.dur, say: e.say, inset: e.inset || null, muscles: e.muscles } },
    phaseAt,
    reducedMotion: REDUCED,
    // The 3D renderer reuses the same poses: joints for exercise id at cycle position u, plus its definition.
    rig: { solve: (id, u) => solve(EX[id], poseAt(EX[id], u)), ex: (id) => EX[id], BONE },
  }
})(window)
