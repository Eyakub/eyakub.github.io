/* Vector helpers for the figure rig. World units: standing height is about 100, the floor is
   y = 0, y grows downward, and in side view the figure faces +x. Angles are degrees in screen
   space: 0 = forward (+x), 90 = down, 180 = back, -90 = up. */

export type Vec = readonly [number, number]

export const RAD = Math.PI / 180

export const dir = (a: number): Vec => [Math.cos(a * RAD), Math.sin(a * RAD)]
export const add = (p: Vec, v: Vec, s = 1): Vec => [p[0] + v[0] * s, p[1] + v[1] * s]
export const sub = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1]]
export const len = (v: Vec): number => Math.hypot(v[0], v[1])
export const ang = (v: Vec): number => Math.atan2(v[1], v[0]) / RAD
export const rot = (v: Vec, a: number): Vec => {
  const c = Math.cos(a * RAD)
  const s = Math.sin(a * RAD)
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c]
}
export const mid = (p: Vec, q: Vec, t: number): Vec => add(p, sub(q, p), t)

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t
/** Interpolates along the shorter way round the circle. */
export const lerpAng = (a: number, b: number, t: number): number => a + (((((b - a) % 360) + 540) % 360) - 180) * t
export const ease = (t: number): number => 0.5 - 0.5 * Math.cos(Math.PI * t)
export const r1 = (n: number): number => Math.round(n * 10) / 10

/** Two-bone IK: returns [joint, end] for a limb from `base` reaching toward `target`. `bend` picks which side the joint bows. */
export function ik(base: Vec, target: Vec, l1: number, l2: number, bend: number): [Vec, Vec] {
  const d0 = sub(target, base)
  const d = Math.min(Math.max(len(d0), Math.abs(l1 - l2) + 1e-3), l1 + l2 - 1e-3)
  const a = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)) / RAD
  const joint = add(base, dir(ang(d0) + (bend || 1) * a), l1)
  return [joint, add(joint, dir(ang(sub(target, joint))), l2)]
}
