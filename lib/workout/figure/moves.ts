import { add, dir, type Vec } from './geometry'
import {
  BONE,
  bodyLine,
  fromShoulder,
  neckOf,
  type Keyframe,
  type Move,
  type Muscle,
  type Pair,
  type Phase,
  type Pose,
  type Prop,
  type View,
} from './rig'

export const MOVES: Record<string, Move> = {}

type MoveDef = Partial<Omit<Move, 'keys'>> & Pick<Move, 'keys'>

const def = (id: string, o: MoveDef): void => {
  MOVES[id] = { view: 'side', dur: 3.4, still: 0, base: {}, bend: {}, props: [], muscles: [], say: [], db: {}, floor: true, ...o }
}

function pushUp(id: string, handX: number, muscles: Muscle[]): void {
  const A: Vec = [0, -8.5]
  const top = bodyLine(A, -20.8)
  const bot = bodyLine(A, -6.4)
  def(id, {
    dur: 3.4,
    still: 0.45,
    base: { footN: 41.5, footF: 41.5, handN: [handX, -2.5], handF: [handX, -2.5], handAngN: 0, handAngF: 0 },
    bend: { armN: 1, armF: 1 },
    keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
    say: [[0, 'Lower for 2 seconds'], [0.55, 'Press up']],
    muscles,
  })
}
pushUp('push-up', 71, ['chest', 'triceps', 'frontDelt'])
pushUp('wide-push-up', 71, ['chest', 'frontDelt'])
pushUp('diamond-push-up', 66, ['triceps', 'chest'])

{
  const A: Vec = [0, -34.5]
  const top = bodyLine(A, -0.8)
  const bot = bodyLine(A, 13.3)
  def('decline-push-up', {
    still: 0.45,
    base: { footN: 41.5, footF: 41.5, handN: [75, -2.5], handF: [75, -2.5], handAngN: 0, handAngF: 0 },
    bend: { armN: 1, armF: 1 },
    keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
    say: [[0, 'Lower for 2 seconds'], [0.55, 'Press up']],
    muscles: ['chest', 'frontDelt', 'triceps'],
    props: [{ type: 'bench', x0: -13, x1: 7, y: -26 }],
  })
}

def('db-shoulder-press', {
  view: 'front',
  dur: 3.2,
  still: 0,
  base: { legN: [92, 90], legF: [88, 90] },
  keys: [
    { t: 0, armN: [160, -90], armF: [20, -90] },
    { t: 0.38, armN: [-100, -94], armF: [-80, -86] },
    { t: 0.5, armN: [-100, -94], armF: [-80, -86] },
    { t: 0.92, armN: [160, -90], armF: [20, -90] },
    { t: 1, armN: [160, -90], armF: [20, -90] },
  ],
  say: [[0, 'Press straight up'], [0.5, 'Lower to shoulder height']],
  muscles: ['delts', 'triceps'],
  db: { N: 'flat', F: 'flat' },
})

def('db-lateral-raise', {
  view: 'front',
  dur: 3.4,
  still: 0.42,
  base: { legN: [92, 90], legF: [88, 90] },
  keys: [
    { t: 0, armN: [100, 96], armF: [80, 84] },
    { t: 0.38, armN: [180, 172], armF: [0, 8] },
    { t: 0.5, armN: [180, 172], armF: [0, 8] },
    { t: 0.95, armN: [100, 96], armF: [80, 84] },
    { t: 1, armN: [100, 96], armF: [80, 84] },
  ],
  say: [[0, 'Raise to shoulder height'], [0.5, 'Lower for 3 seconds']],
  muscles: ['delts'],
  db: { N: 'end', F: 'end' },
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
  muscles: ['triceps'],
  db: { N: 'along' },
})

{
  const bar: Prop = { type: 'bar', y: 0, x0: -36, x1: 36 }
  const top = fromShoulder([0, 5], -90)
  const bot = fromShoulder([0, 35], -90)
  def('pull-up', {
    view: 'front',
    dur: 3.6,
    still: 0.42,
    base: { handN: [-21, 5], handF: [21, 5], legN: [95, 80], legF: [85, 100] },
    bend: { armN: -1, armF: 1 },
    keys: [{ t: 0, ...bot }, { t: 0.38, ...top }, { t: 0.5, ...top }, { t: 0.92, ...bot }, { t: 1, ...bot }],
    say: [[0, 'Pull your elbows down'], [0.38, 'Chin over the bar'], [0.5, 'Lower for 2 seconds']],
    muscles: ['lats', 'biceps'],
    props: [bar],
    floor: false,
  })
  def('dead-hang', {
    view: 'front',
    dur: 4.2,
    still: 0,
    base: { handN: [-17, 5], handF: [17, 5], legN: [93, 90], legF: [87, 90] },
    bend: { armN: -1, armF: 1 },
    keys: [{ t: 0, ...fromShoulder([0, 36], -90) }, { t: 0.5, ...fromShoulder([0.8, 36.3], -91) }, { t: 1, ...fromShoulder([0, 36], -90) }],
    say: [[0, 'Hang still and breathe']],
    muscles: ['forearm', 'lats'],
    props: [bar],
    floor: false,
  })
  const low = fromShoulder([0, 36.5], -90, 0)
  const high = fromShoulder([0, 36.5], -90, 6)
  def('scapular-pull-up', {
    view: 'front',
    dur: 3,
    still: 0.4,
    base: { handN: [-17, 5], handF: [17, 5], legN: [93, 90], legF: [87, 90] },
    bend: { armN: -1, armF: 1 },
    keys: [{ t: 0, ...low }, { t: 0.35, ...high }, { t: 0.55, ...high }, { t: 0.9, ...low }, { t: 1, ...low }],
    say: [[0, 'Pull your shoulders down'], [0.55, 'Relax back to the hang']],
    muscles: ['lats'],
    props: [bar],
    floor: false,
  })
}

{
  const top: Partial<Pose> = { ...fromShoulder([-7, 6], -80), neck: -70, legN: [80, 100], legF: [80, 100] }
  const bot: Partial<Pose> = { ...fromShoulder([-1, 37.5], -92), neck: -92, legN: [88, 98], legF: [88, 98] }
  def('chin-up', {
    dur: 3.6,
    still: 0.42,
    base: { handN: [1, 5], handF: [1, 5] },
    bend: { armN: 1, armF: 1 },
    keys: [{ t: 0, ...bot }, { t: 0.38, ...top }, { t: 0.5, ...top }, { t: 0.92, ...bot }, { t: 1, ...bot }],
    say: [[0, 'Pull your chest to the bar'], [0.5, 'Lower to a full hang']],
    muscles: ['lats', 'biceps'],
    props: [{ type: 'barEnd', at: [0, 0] }],
    floor: false,
  })
}

{
  const row = (u: Pair): Pick<Pose, 'armN' | 'armF'> => ({ armN: u, armF: u })
  def('db-bent-over-row', {
    dur: 3.2,
    still: 0.35,
    base: { root: [-10, -48], torso: -30, neck: -22, ankleN: [0, -4], ankleF: [1.5, -4] },
    bend: { legN: -1, legF: -1 },
    keys: [
      { t: 0, ...row([90, 90]) },
      { t: 0.35, ...row([195, 92]) },
      { t: 0.48, ...row([195, 92]) },
      { t: 0.92, ...row([90, 90]) },
      { t: 1, ...row([90, 90]) },
    ],
    say: [[0, 'Row toward your hips'], [0.35, 'Squeeze'], [0.48, 'Lower with control']],
    muscles: ['lats', 'midBack', 'rearDelt', 'biceps'],
    db: { N: 'end', F: 'end' },
  })
}

def('db-single-arm-row', {
  dur: 3.2,
  still: 0.35,
  base: { root: [-6, -51], torso: -15, neck: -8, ankleF: [-29, -29.5], footF: 150, ankleN: [2, -4], handF: [22, -28.5], handAngF: 0 },
  bend: { legN: -1, legF: -1, armF: 1 },
  keys: [
    { t: 0, armN: [90, 90] },
    { t: 0.35, armN: [198, 92] },
    { t: 0.48, armN: [198, 92] },
    { t: 0.92, armN: [90, 90] },
    { t: 1, armN: [90, 90] },
  ],
  say: [[0, 'Pull toward your hip'], [0.35, 'Pause'], [0.48, 'Lower to a full stretch']],
  muscles: ['lats', 'rearDeltN', 'bicepsN'],
  db: { N: 'end' },
  props: [{ type: 'bench', x0: -36, x1: 30, y: -26 }],
})

{
  const curl = (u: number, f: number): Pick<Pose, 'armN' | 'armF'> => ({ armN: [u, f], armF: [u, f] })
  const keys: Keyframe[] = [
    { t: 0, ...curl(90, 88) },
    { t: 0.3, ...curl(86, -62) },
    { t: 0.42, ...curl(86, -62) },
    { t: 0.95, ...curl(90, 88) },
    { t: 1, ...curl(90, 88) },
  ]
  const say: Phase[] = [[0, 'Curl, upper arms still'], [0.3, 'Squeeze'], [0.42, 'Lower for 3 seconds']]
  def('db-biceps-curl', { dur: 3.6, still: 0.3, keys, say, muscles: ['biceps'], db: { N: 'end', F: 'end' } })
  def('db-hammer-curl', { dur: 3.6, still: 0.3, keys, say, muscles: ['biceps', 'forearm'], db: { N: 'perp', F: 'perp' } })
}

{
  // Where the goblet dumbbell is held: in front of the chest, at the torso's current lean.
  const chest = (pose: Pick<Pose, 'root' | 'torso'>): Vec => add(add(neckOf(pose), dir(pose.torso + 90), 9), dir(pose.torso + 180), 4.5)
  const stand: Pick<Pose, 'root' | 'torso' | 'neck'> = { root: [-1, -52.5], torso: -88, neck: -88 }
  const deep: Pick<Pose, 'root' | 'torso' | 'neck'> = { root: [-9, -22], torso: -68, neck: -78 }
  const s: Partial<Pose> = { ...stand, handN: chest(stand), handF: chest(stand) }
  const d: Partial<Pose> = { ...deep, handN: chest(deep), handF: chest(deep) }
  def('db-goblet-squat', {
    dur: 3.6,
    still: 0.45,
    base: { ankleN: [2, -4], ankleF: [3.5, -4] },
    bend: { legN: -1, legF: -1, armN: 1, armF: 1 },
    keys: [{ t: 0, ...s }, { t: 0.45, ...d }, { t: 0.55, ...d }, { t: 0.9, ...s }, { t: 1, ...s }],
    say: [[0, 'Sit down between your heels'], [0.55, 'Drive up through your feet']],
    muscles: ['quads', 'glutes'],
    db: { goblet: true },
  })
}

{
  const top: Partial<Pose> = { root: [-6, -48], torso: -86 }
  const bot: Partial<Pose> = { root: [-8, -30], torso: -80 }
  def('db-bulgarian-split-squat', {
    dur: 3.6,
    still: 0.45,
    base: { ankleN: [16, -4], ankleF: [-32, -29], footF: 150, armN: [92, 90], armF: [92, 90] },
    bend: { legN: -1, legF: -1 },
    keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
    say: [[0, 'Lower straight down'], [0.55, 'Push through your front foot']],
    muscles: ['quadsN', 'glutes'],
    db: { N: 'end', F: 'end' },
    props: [{ type: 'bench', x0: -52, x1: -28, y: -26 }],
  })
}

def('db-romanian-deadlift', {
  dur: 3.8,
  still: 0.45,
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
  muscles: ['hamstrings', 'glutes'],
  db: { N: 'end', F: 'end' },
})

def('standing-calf-raise', {
  dur: 2.8,
  still: 0.42,
  base: { root: [0, -53], anchor: 'ballN', anchorAt: [1, -12] },
  keys: [
    { t: 0, footN: -20, footF: -20 },
    { t: 0.4, footN: 35, footF: 35 },
    { t: 0.55, footN: 35, footF: 35 },
    { t: 0.95, footN: -20, footF: -20 },
    { t: 1, footN: -20, footF: -20 },
  ],
  say: [[0, 'Rise as high as you can'], [0.55, 'Lower below the step']],
  muscles: ['calves'],
  props: [{ type: 'step', x0: -4, x1: 30, y: -12 }],
})

{
  const mat: Prop = { type: 'mat', x0: -50, x1: 44 }
  const lie: Partial<Pose> = { anchor: 'SN', anchorAt: [-30, -6], root: [0, 0], neck: 180 }
  def('reverse-crunch', {
    dur: 3.2,
    still: 0.45,
    base: { ...lie, armN: [6, 0], armF: [6, 0] },
    keys: [
      { t: 0, torso: 180, legN: [-90, 0], legF: [-90, 0] },
      { t: 0.45, torso: 166, legN: [-132, -42], legF: [-132, -42] },
      { t: 0.55, torso: 166, legN: [-132, -42], legF: [-132, -42] },
      { t: 0.95, torso: 180, legN: [-90, 0], legF: [-90, 0] },
      { t: 1, torso: 180, legN: [-90, 0], legF: [-90, 0] },
    ],
    say: [[0, 'Curl your hips off the floor'], [0.55, 'Lower slowly']],
    muscles: ['abs'],
    props: [mat],
  })
  const tuck: Partial<Pose> = { armN: [-90, -90], armF: [-90, -90], legN: [-90, 0], legF: [-90, 0] }
  const reachA: Partial<Pose> = { ...tuck, armN: [188, 186], legF: [-6, -4] }
  const reachB: Partial<Pose> = { ...tuck, armF: [188, 186], legN: [-6, -4] }
  def('dead-bug', {
    dur: 5.2,
    still: 0.25,
    base: { ...lie, torso: 180 },
    keys: [
      { t: 0, ...tuck },
      { t: 0.25, ...reachA },
      { t: 0.36, ...reachA },
      { t: 0.5, ...tuck },
      { t: 0.75, ...reachB },
      { t: 0.86, ...reachB },
      { t: 1, ...tuck },
    ],
    say: [[0, 'Reach opposite arm and leg'], [0.36, 'Back to the start'], [0.5, 'Switch sides'], [0.86, 'Back to the start']],
    muscles: ['abs'],
    props: [mat],
  })
}

{
  const A: Vec = [0, -8.5]
  def('plank', {
    dur: 4.4,
    still: 0,
    base: { footN: 41.5, footF: 41.5, armN: [90, 0], armF: [90, 0], handAngN: 0, handAngF: 0 },
    keys: [{ t: 0, ...bodyLine(A, -9.1) }, { t: 0.5, ...bodyLine(A, -9.7) }, { t: 1, ...bodyLine(A, -9.1) }],
    say: [[0, 'Hold one straight line and breathe']],
    muscles: ['abs', 'glutes', 'frontDelt'],
  })
}

{
  const stand: Partial<Pose> = { root: [0, -52.5], torso: -90, ankleF: [0, -4], footF: 0 }
  def('reverse-lunge', {
    dur: 4.2,
    still: 0.5,
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
    muscles: ['quadsN', 'glutes'],
    db: { N: 'end', F: 'end' },
  })
}

{
  const A: Vec = [0, -8.5]
  const top = bodyLine(A, -43.5)
  const bot = bodyLine(A, -27.4)
  def('incline-push-up', {
    still: 0.45,
    base: { footN: 41.5, footF: 41.5, handN: [55, -28.5], handF: [55, -28.5], handAngN: 0, handAngF: 0 },
    bend: { armN: 1, armF: 1 },
    keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
    say: [[0, 'Lower your chest to the edge'], [0.55, 'Press up']],
    muscles: ['chest', 'triceps', 'frontDelt'],
    props: [{ type: 'bench', x0: 46, x1: 70, y: -26 }],
  })
}

{
  const legs = (a: number): Pick<Pose, 'legN' | 'legF'> => ({ legN: [a + 180, a + 180], legF: [a + 180, a + 180] })
  const hip = (a: number): Vec => add([0, -8.5], dir(a), BONE.shin + BONE.thigh)
  const top: Partial<Pose> = { root: hip(-55), torso: 30, ...legs(-55) }
  const bot: Partial<Pose> = { root: hip(-50), torso: 55, ...legs(-50) }
  def('pike-push-up', {
    still: 0.45,
    base: { footN: 30, footF: 30, handN: [60, -2.5], handF: [60, -2.5], handAngN: 0, handAngF: 0 },
    bend: { armN: 1, armF: 1 },
    keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
    say: [[0, 'Lower the top of your head'], [0.55, 'Press back up']],
    muscles: ['delts', 'triceps'],
  })
}

{
  const top = fromShoulder([0, 5], -90)
  const bot = fromShoulder([0, 35], -90)
  def('negative-pull-up', {
    view: 'front',
    dur: 6,
    still: 0.35,
    base: { handN: [-21, 5], handF: [21, 5], legN: [95, 80], legF: [85, 100] },
    bend: { armN: -1, armF: 1 },
    keys: [{ t: 0, ...top }, { t: 0.08, ...top }, { t: 0.72, ...bot }, { t: 0.8, ...bot }, { t: 0.95, ...top }, { t: 1, ...top }],
    say: [[0, 'Start with your chin over the bar'], [0.08, 'Lower for 4 to 5 seconds'], [0.8, 'Step back up']],
    muscles: ['lats', 'biceps'],
    props: [{ type: 'bar', y: 0, x0: -36, x1: 36 }],
    floor: false,
  })
}

{
  const top: Partial<Pose> = { root: [-6, -49], torso: -88 }
  const bot: Partial<Pose> = { root: [-7, -30], torso: -86 }
  def('split-squat', {
    dur: 3.4,
    still: 0.45,
    base: { ankleN: [14, -4], ankleF: [-28, -9], footF: 50 },
    bend: { legN: -1, legF: -1 },
    keys: [{ t: 0, ...top }, { t: 0.45, ...bot }, { t: 0.55, ...bot }, { t: 0.9, ...top }, { t: 1, ...top }],
    say: [[0, 'Lower your back knee toward the floor'], [0.55, 'Push through the front foot']],
    muscles: ['quadsN', 'glutes'],
  })
}

{
  const lie: Partial<Pose> = { anchor: 'SN', anchorAt: [-30, -6], root: [0, 0], neck: 180, armN: [6, 0], armF: [6, 0] }
  def('glute-bridge', {
    dur: 3.2,
    still: 0.45,
    base: { ...lie, ankleN: [16, -4], ankleF: [17.5, -4] },
    bend: { legN: -1, legF: -1 },
    keys: [{ t: 0, torso: 180 }, { t: 0.4, torso: 157 }, { t: 0.55, torso: 157 }, { t: 0.95, torso: 180 }, { t: 1, torso: 180 }],
    say: [[0, 'Drive your hips up'], [0.4, 'Squeeze for a second'], [0.55, 'Lower']],
    muscles: ['glutes', 'hamstrings'],
    props: [{ type: 'mat', x0: -50, x1: 30 }],
  })
}

def('single-leg-calf-raise', {
  dur: 3,
  still: 0.42,
  base: { root: [0, -53], anchor: 'ballN', anchorAt: [1, -12], legF: [100, 160] },
  keys: [{ t: 0, footN: -20 }, { t: 0.42, footN: 35 }, { t: 0.56, footN: 35 }, { t: 0.95, footN: -20 }, { t: 1, footN: -20 }],
  say: [[0, 'Rise on one foot'], [0.56, 'Lower below the step']],
  muscles: ['calvesN'],
  props: [{ type: 'step', x0: -4, x1: 30, y: -12 }],
})

def('db-single-leg-rdl', {
  dur: 4,
  still: 0.45,
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
  muscles: ['hamstringsN', 'glutes'],
  db: { F: 'end' },
})

// ---------- lookups ----------
export function getMove(id: string): Move | undefined {
  return Object.prototype.hasOwnProperty.call(MOVES, id) ? MOVES[id] : undefined
}

export const hasMove = (id: string): boolean => getMove(id) !== undefined

export interface MoveInfo {
  view: View
  dur: number
  say: Phase[]
  muscles: Muscle[]
}

export function moveInfo(id: string): MoveInfo | null {
  const m = getMove(id)
  return m ? { view: m.view, dur: m.dur, say: m.say, muscles: m.muscles } : null
}

/** The caption in force at cycle position u: the last phase that has started. */
export function phaseAt(id: string, u: number): string {
  const say = getMove(id)?.say ?? []
  let cur = say.length ? say[0][1] : ''
  for (const [t, text] of say) if (u >= t) cur = text
  return cur
}
