/* Segment angles are absolute (screen space), which keeps authoring readable ("forearm points up")
   and interpolation simple. See geometry.ts for the world-space conventions. */
import { add, ang, dir, ease, ik, lerp, lerpAng, rot, sub, type Vec } from './geometry'

/** N = near limb (drawn in front in side view), F = far limb. */
export type Side = 'N' | 'F'
export const SIDES: readonly Side[] = ['N', 'F']

export type View = 'side' | 'front'
/** [upper, lower] absolute segment angles: upper arm + forearm, or thigh + shin. */
export type Pair = readonly [number, number]

export const BONE = { torso: 30, neck: 9, head: 6.5, upper: 18, fore: 15, hand: 4.5, thigh: 25, shin: 24, shrug: 3, shoulderHalf: 10, hipHalf: 6.5 }
export const WIDTH = { torso: 13, torsoFront: 7, neck: 5, upper: 6.6, fore: 5.6, hand: 4.2, thigh: 9, shin: 7.2, foot: 4.4 }
export const FOOT = {
  side: { heel: [-3, 3.5], ball: [9, 3.5] },
  front: { heel: [-2.6, 3.5], ball: [2.6, 3.5] },
} as const satisfies Record<View, { heel: Vec; ball: Vec }>

export interface Joints {
  /** Pelvis, neck base, head centre. */
  P: Vec
  N: Vec
  H: Vec
  /** Shoulders and hips (near/far); the same point for both in side view. */
  SN: Vec
  SF: Vec
  HN: Vec
  HF: Vec
  EN: Vec
  EF: Vec
  WN: Vec
  WF: Vec
  KN: Vec
  KF: Vec
  AN: Vec
  AF: Vec
  heelN: Vec
  heelF: Vec
  ballN: Vec
  ballF: Vec
  /** Fingertip end of the hand segment. */
  handN: Vec
  handF: Vec
  /** Absolute forearm angles. */
  foreN: number
  foreF: number
  torso: number
  neckAng: number
}
export type PointJoint = { [K in keyof Joints]: Joints[K] extends Vec ? K : never }[keyof Joints]

export interface Pose {
  /** Pelvis position. */
  root: Vec
  torso: number
  /** null = the neck continues the torso line. */
  neck: number | null
  /** How far the shoulder sits below the neck base. */
  shrug: number
  armN: Pair
  armF: Pair
  legN: Pair
  legF: Pair
  footN: number
  footF: number
  /** IK targets: when set the limb is solved to reach the point instead of using its pair. */
  handN?: Vec
  handF?: Vec
  ankleN?: Vec
  ankleF?: Vec
  handAngN?: number
  handAngF?: number
  /** Pins `anchor` to `anchorAt`, moving the whole body (lying poses, calf raises). */
  anchor?: PointJoint
  anchorAt?: Vec
}

export type Keyframe = Partial<Pose> & { t: number }
/** [from u, caption]. */
export type Phase = readonly [number, string]

export type MuscleBase =
  | 'chest' | 'abs' | 'lats' | 'midBack' | 'glutes' | 'delts' | 'frontDelt' | 'rearDelt'
  | 'biceps' | 'triceps' | 'forearm' | 'quads' | 'hamstrings' | 'calves'
/** A trailing N or F limits a limb muscle to one side ("quadsN"). */
export type Muscle = MuscleBase | `${MuscleBase}${Side}`

export type DumbbellMode = 'end' | 'perp' | 'flat' | 'along'
export interface DumbbellSpec {
  N?: DumbbellMode
  F?: DumbbellMode
  /** One dumbbell held vertically against the chest. */
  goblet?: boolean
}

export type Prop =
  | { type: 'bench'; x0: number; x1: number; y: number }
  | { type: 'step'; x0: number; x1: number; y: number }
  | { type: 'bar'; x0: number; x1: number; y: number }
  | { type: 'mat'; x0: number; x1: number }
  | { type: 'barEnd'; at: Vec }

export interface Move {
  view: View
  /** Seconds per cycle at speed 1. */
  dur: number
  /** Cycle position of the still pose shown before and instead of playing. */
  still: number
  base: Partial<Pose>
  /** IK bend direction per limb: which way the elbow or knee bows. */
  bend: Partial<Record<'armN' | 'armF' | 'legN' | 'legF', 1 | -1>>
  keys: Keyframe[]
  say: Phase[]
  muscles: Muscle[]
  db: DumbbellSpec
  props: Prop[]
  floor: boolean
}

export const STAND: Pose = {
  root: [0, -53],
  torso: -90,
  neck: null,
  shrug: BONE.shrug,
  armN: [90, 90],
  armF: [90, 90],
  legN: [90, 90],
  legF: [90, 90],
  footN: 0,
  footF: 0,
}

// ---------- authoring helpers ----------
/** Straight body from a fixed ankle, pointing ankle → head at angle a (planks, push-ups). */
export function bodyLine(ankle: Vec, a: number): Pick<Pose, 'root' | 'torso' | 'legN' | 'legF'> {
  const knee = add(ankle, dir(a), BONE.shin)
  const hip = add(knee, dir(a), BONE.thigh)
  return { root: hip, torso: a, legN: [a + 180, a + 180], legF: [a + 180, a + 180] }
}
/** Pelvis that puts the shoulder joint (or the point between the shoulders) at S. */
export function fromShoulder(S: Vec, torso: number, shrug: number = BONE.shrug): Pick<Pose, 'root' | 'torso' | 'shrug'> {
  const neck = add(S, dir(torso), shrug)
  return { root: add(neck, dir(torso), -BONE.torso), torso, shrug }
}
export const neckOf = (pose: Pick<Pose, 'root' | 'torso'>): Vec => add(pose.root, dir(pose.torso), BONE.torso)

// ---------- pose interpolation and solving ----------
const ANGLE_KEYS = ['torso', 'neck', 'footN', 'footF', 'handAngN', 'handAngF'] as const
const PAIR_KEYS = ['armN', 'armF', 'legN', 'legF'] as const
const POINT_KEYS = ['root', 'handN', 'handF', 'ankleN', 'ankleF', 'anchorAt'] as const

/** The pose at cycle position u, easing between the two surrounding keyframes. */
export function poseAt(move: Move, u: number): Pose {
  const keys = move.keys
  let k = 0
  while (k < keys.length - 2 && u >= keys[k + 1].t) k++
  const ka = keys[k]
  const kb = keys[k + 1]
  const span = kb.t - ka.t
  const t = span > 0 ? ease(Math.min(1, Math.max(0, (u - ka.t) / span))) : 0
  const A: Pose = { ...STAND, ...move.base, ...ka }
  const B: Pose = { ...STAND, ...move.base, ...kb }
  const p: Pose = { ...A }
  for (const key of ANGLE_KEYS) {
    const x = A[key]
    const y = B[key]
    if (x == null || y == null) continue
    p[key] = lerpAng(x, y, t)
  }
  for (const key of PAIR_KEYS) p[key] = [lerpAng(A[key][0], B[key][0], t), lerpAng(A[key][1], B[key][1], t)]
  for (const key of POINT_KEYS) {
    const x = A[key]
    const y = B[key]
    if (!x || !y) continue
    p[key] = [lerp(x[0], y[0], t), lerp(x[1], y[1], t)]
  }
  p.shrug = lerp(A.shrug, B.shrug, t)
  return p
}

const ORIGIN: Vec = [0, 0]
const emptyJoints = (): Joints => ({
  P: ORIGIN, N: ORIGIN, H: ORIGIN, SN: ORIGIN, SF: ORIGIN, HN: ORIGIN, HF: ORIGIN,
  EN: ORIGIN, EF: ORIGIN, WN: ORIGIN, WF: ORIGIN, KN: ORIGIN, KF: ORIGIN, AN: ORIGIN, AF: ORIGIN,
  heelN: ORIGIN, heelF: ORIGIN, ballN: ORIGIN, ballF: ORIGIN, handN: ORIGIN, handF: ORIGIN,
  foreN: 0, foreF: 0, torso: 0, neckAng: 0,
})

/** Forward kinematics for the pose, then IK for limbs that have a hand/ankle target. */
export function solve(move: Move, p: Pose): Joints {
  const front = move.view === 'front'
  const foot = front ? FOOT.front : FOOT.side
  const J = emptyJoints()
  const neckAng = p.neck ?? p.torso
  const feet = (s: Side) => {
    const r = p[`foot${s}` as const] || 0
    J[`heel${s}` as const] = add(J[`A${s}` as const], rot(foot.heel, r))
    J[`ball${s}` as const] = add(J[`A${s}` as const], rot(foot.ball, r))
  }
  const place = (pelvis: Vec) => {
    J.P = pelvis
    J.N = add(pelvis, dir(p.torso), BONE.torso)
    J.H = add(J.N, dir(neckAng), BONE.neck)
    const S = add(J.N, dir(p.torso), -p.shrug)
    if (front) {
      const perp = dir(p.torso + 90)
      J.SN = add(S, perp, -BONE.shoulderHalf)
      J.SF = add(S, perp, BONE.shoulderHalf)
      J.HN = add(pelvis, perp, -BONE.hipHalf)
      J.HF = add(pelvis, perp, BONE.hipHalf)
    } else {
      J.SN = J.SF = S
      J.HN = J.HF = pelvis
    }
    for (const s of SIDES) {
      const arm = p[`arm${s}` as const]
      const leg = p[`leg${s}` as const]
      J[`E${s}` as const] = add(J[`S${s}` as const], dir(arm[0]), BONE.upper)
      J[`W${s}` as const] = add(J[`E${s}` as const], dir(arm[1]), BONE.fore)
      J[`K${s}` as const] = add(J[`H${s}` as const], dir(leg[0]), BONE.thigh)
      J[`A${s}` as const] = add(J[`K${s}` as const], dir(leg[1]), BONE.shin)
      feet(s)
    }
  }
  place(p.root)
  if (p.anchor && p.anchorAt) place(add(p.root, sub(p.anchorAt, J[p.anchor])))
  for (const s of SIDES) {
    const hand = p[`hand${s}` as const]
    if (hand) {
      const [e, w] = ik(J[`S${s}` as const], hand, BONE.upper, BONE.fore, move.bend[`arm${s}` as const] ?? 1)
      J[`E${s}` as const] = e
      J[`W${s}` as const] = w
    }
    const ankle = p[`ankle${s}` as const]
    if (ankle) {
      const [k, a] = ik(J[`H${s}` as const], ankle, BONE.thigh, BONE.shin, move.bend[`leg${s}` as const] ?? -1)
      J[`K${s}` as const] = k
      J[`A${s}` as const] = a
      feet(s)
    }
    const fa = ang(sub(J[`W${s}` as const], J[`E${s}` as const]))
    J[`fore${s}` as const] = fa
    J[`hand${s}` as const] = add(J[`W${s}` as const], dir(p[`handAng${s}` as const] ?? fa), BONE.hand)
  }
  J.torso = p.torso
  J.neckAng = neckAng
  return J
}
