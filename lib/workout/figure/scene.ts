/* Turns a solved pose into flat drawable shapes in world units; mount.ts draws them as SVG. */
import { add, ang, dir, mid, sub, type Vec } from './geometry'
import { getMove } from './moves'
import { BONE, SIDES, WIDTH, poseAt, solve, type Joints, type Move, type Muscle, type MuscleBase, type Side } from './rig'

export type Limb = 'arm' | 'leg'

export interface LineShape {
  k: 'line'
  p0: Vec
  p1: Vec
  w: number
  cls: string
  limb?: Limb
  /** Drawn after (over) the figure instead of behind it. */
  over?: boolean
}
export interface DotShape {
  k: 'dot'
  c: Vec
  r: number
  cls: string
  limb?: Limb
  over?: boolean
}
/** End-on dumbbell head: a disc with a hub. */
export interface PlateShape {
  k: 'plate'
  c: Vec
  r: number
  cls: string
}
export interface PolyShape {
  k: 'poly'
  pts: Vec[]
  w: number
  cls: string
}
export interface RectShape {
  k: 'rect'
  x: number
  y: number
  w: number
  h: number
  cls: string
}
export type Shape = LineShape | DotShape | PlateShape | PolyShape | RectShape

/** A muscle highlight before it is given its class. */
type Mark = Omit<LineShape, 'cls'> | Omit<DotShape, 'cls'>
type MarkLine = Omit<LineShape, 'cls'>

const line = (p0: Vec, p1: Vec, w: number, cls: string): LineShape => ({ k: 'line', p0, p1, w, cls })

// ---------- muscles ----------
// Bands sit on one face of a segment: +1 = front (chest, quads), -1 = back (lats, hamstrings).
// "Front" of the torso is its direction +90°, of a limb its direction -90°.
function band(a: Vec, b: Vec, t0: number, t1: number, face: 1 | -1, off: number, w: number, torso = false): MarkLine {
  const d = ang(sub(b, a))
  const n = dir(d + (torso ? 90 : -90) * face)
  return { k: 'line', p0: add(mid(a, b, t0), n, off), p1: add(mid(a, b, t1), n, off), w }
}

function torsoMuscle(name: MuscleBase, J: Joints, front: boolean): Mark[] {
  if (front) {
    switch (name) {
      case 'chest': {
        const top = mid(J.SN, J.HN, 0.22)
        const topF = mid(J.SF, J.HF, 0.22)
        return [{ k: 'line', p0: mid(top, topF, 0.18), p1: mid(top, topF, 0.82), w: 6 }]
      }
      case 'abs': return [{ k: 'line', p0: mid(J.P, J.N, 0.08), p1: mid(J.P, J.N, 0.5), w: 6 }]
      case 'lats': return [
        { k: 'line', p0: add(mid(J.SN, J.HN, 0.15), sub(J.SF, J.SN), 0.08), p1: add(mid(J.SN, J.HN, 0.62), sub(J.SF, J.SN), 0.12), w: 4.6 },
        { k: 'line', p0: add(mid(J.SF, J.HF, 0.15), sub(J.SN, J.SF), 0.08), p1: add(mid(J.SF, J.HF, 0.62), sub(J.SN, J.SF), 0.12), w: 4.6 },
      ]
      case 'delts': case 'frontDelt': case 'rearDelt': return [{ k: 'dot', c: J.SN, r: 4.3 }, { k: 'dot', c: J.SF, r: 4.3 }]
      default: return []
    }
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
    default: return []
  }
}

const LIMB_MUSCLES: ReadonlySet<MuscleBase> = new Set<MuscleBase>(['biceps', 'triceps', 'forearm', 'quads', 'hamstrings', 'calves'])

function limbMuscle(name: MuscleBase, J: Joints, s: Side, front: boolean): Mark[] {
  const S = J[`S${s}` as const]
  const E = J[`E${s}` as const]
  const W = J[`W${s}` as const]
  const H = J[`H${s}` as const]
  const K = J[`K${s}` as const]
  const A = J[`A${s}` as const]
  const full = (a: Vec, b: Vec, w: number): MarkLine => ({ k: 'line', p0: mid(a, b, 0.12), p1: mid(a, b, 0.86), w })
  const arm = (m: MarkLine): Mark => ({ ...m, limb: 'arm' })
  const leg = (m: MarkLine): Mark => ({ ...m, limb: 'leg' })
  switch (name) {
    case 'biceps': return [arm(front ? full(S, E, 4) : band(S, E, 0.15, 0.82, 1, 1.5, 3.8))]
    case 'triceps': return [arm(front ? full(S, E, 4) : band(S, E, 0.15, 0.85, -1, 1.5, 3.8))]
    case 'forearm': return [arm(full(E, W, 4))]
    case 'quads': return [leg(front ? full(H, K, 5.5) : band(H, K, 0.12, 0.86, 1, 2.1, 5.2))]
    case 'hamstrings': return [leg(band(H, K, 0.15, 0.86, -1, 2.1, 5.2))]
    case 'calves': return [leg(band(K, A, 0.08, 0.5, -1, 1.7, 5.2))]
    default: return []
  }
}

function parseMuscle(raw: Muscle): { name: MuscleBase; side: Side | null } {
  const last = raw.slice(-1)
  if (last === 'N' || last === 'F') return { name: raw.slice(0, -1) as MuscleBase, side: last }
  return { name: raw as MuscleBase, side: null }
}

function muscleMarks(move: Move, J: Joints): Record<'torso' | Side, Mark[]> {
  const front = move.view === 'front'
  const out: Record<'torso' | Side, Mark[]> = { torso: [], N: [], F: [] }
  for (const raw of move.muscles) {
    const { name, side } = parseMuscle(raw)
    if (LIMB_MUSCLES.has(name)) {
      for (const s of side ? [side] : SIDES) out[s].push(...limbMuscle(name, J, s, front))
    } else out.torso.push(...torsoMuscle(name, J, front))
  }
  return out
}

// ---------- dumbbells ----------
type DumbbellShape = LineShape | PlateShape

function dumbbellShapes(move: Move, J: Joints): Record<Side, DumbbellShape[]> {
  const out: Record<Side, DumbbellShape[]> = { N: [], F: [] }
  const db = move.db
  const sideOn = (c: Vec, a: number, s: Side) => {
    const u = dir(a)
    const v = dir(a + 90)
    const e0 = add(c, u, -5.2)
    const e1 = add(c, u, 5.2)
    out[s].push(
      line(e0, e1, 2.2, 'db'),
      line(add(e0, v, -4.6), add(e0, v, 4.6), 3.6, 'db'),
      line(add(e1, v, -4.6), add(e1, v, 4.6), 3.6, 'db'),
    )
  }
  if (db.goblet) {
    sideOn(add([(J.handN[0] + J.handF[0]) / 2, (J.handN[1] + J.handF[1]) / 2], [0, -1]), -90, 'N')
    return out
  }
  for (const s of SIDES) {
    const mode = db[s]
    if (!mode) continue
    const fa = J[`fore${s}` as const]
    const W = J[`W${s}` as const]
    const grip = add(W, dir(fa), 2.4)
    if (mode === 'end') out[s].push({ k: 'plate', c: grip, r: 5.2, cls: 'db' })
    else if (mode === 'perp') sideOn(grip, fa - 90, s)
    else if (mode === 'flat') sideOn(grip, 0, s)
    else sideOn(add(W, dir(fa), 6.5), fa, s)
  }
  return out
}

// ---------- props ----------
function propShapes(move: Move): Shape[] {
  const out: Shape[] = []
  for (const pr of move.props) {
    if (pr.type === 'bench') {
      out.push(
        { k: 'rect', x: pr.x0, y: pr.y, w: pr.x1 - pr.x0, h: 3.5, cls: 'prop' },
        line([pr.x0 + 3, pr.y + 3], [pr.x0 + 3, 0], 2.2, 'prop'),
        line([pr.x1 - 3, pr.y + 3], [pr.x1 - 3, 0], 2.2, 'prop'),
      )
    } else if (pr.type === 'step') {
      out.push({ k: 'rect', x: pr.x0, y: pr.y, w: pr.x1 - pr.x0, h: -pr.y, cls: 'prop' })
    } else if (pr.type === 'mat') {
      out.push({ k: 'rect', x: pr.x0, y: -1.4, w: pr.x1 - pr.x0, h: 1.4, cls: 'mat' })
    } else if (pr.type === 'bar') {
      out.push(
        line([pr.x0, pr.y], [pr.x1, pr.y], 2.6, 'prop'),
        line([pr.x0, pr.y - 8], [pr.x0, pr.y + 4], 3.4, 'prop'),
        line([pr.x1, pr.y - 8], [pr.x1, pr.y + 4], 3.4, 'prop'),
      )
    } else {
      // Seen end-on the bar sits in the hands, so it draws over the figure.
      out.push(
        { ...line([pr.at[0], pr.at[1] - 12], pr.at, 2.4, 'prop'), over: true },
        { k: 'dot', c: pr.at, r: 2.8, cls: 'prop', over: true },
      )
    }
  }
  return out
}

// ---------- camera ----------
export interface Camera {
  x: number
  y: number
  w: number
  h: number
}

const cameraCache = new Map<string, Camera>()

/** A viewBox that holds the whole movement, so the figure never moves or rescales while it plays. */
export function camera(id: string, aspect: number | 'auto'): Camera {
  const key = `${id}:${aspect}`
  const cached = cameraCache.get(key)
  if (cached) return cached
  const move = getMove(id)
  if (!move) throw new Error(`Unknown exercise ${id}`)
  let x0 = Infinity
  let y0 = Infinity
  let x1 = -Infinity
  let y1 = -Infinity
  const grow = (p: Vec, m: number) => {
    x0 = Math.min(x0, p[0] - m)
    y0 = Math.min(y0, p[1] - m)
    x1 = Math.max(x1, p[0] + m)
    y1 = Math.max(y1, p[1] + m)
  }
  for (let i = 0; i < 40; i++) {
    const J = solve(move, poseAt(move, i / 40))
    for (const [k, v] of Object.entries(J)) if (typeof v !== 'number') grow(v, k === 'H' ? BONE.head + 1 : 5.5)
    const dbs = dumbbellShapes(move, J)
    for (const s of SIDES) {
      for (const d of dbs[s]) {
        if (d.k === 'plate') grow(d.c, 6)
        else {
          grow(d.p0, 2.5)
          grow(d.p1, 2.5)
        }
      }
    }
  }
  for (const pr of propShapes(move)) {
    if (pr.k === 'rect') {
      grow([pr.x, pr.y], 1)
      grow([pr.x + pr.w, pr.y + pr.h], 1)
    } else if (pr.k === 'line') {
      grow(pr.p0, 2)
      grow(pr.p1, 2)
    } else if (pr.k === 'dot') grow(pr.c, pr.r + 1)
  }
  if (move.floor) y1 = Math.max(y1, 3)
  const pad = 7
  x0 -= pad
  y0 -= pad
  x1 += pad
  y1 += move.floor ? 3 : pad
  let w = x1 - x0
  let h = y1 - y0
  // 'auto' keeps the movement's own shape within sane bounds, so wide moves don't float in empty space.
  const ratio = aspect === 'auto' ? Math.min(2.1, Math.max(1.2, w / h)) : aspect
  if (w / h < ratio) {
    const nw = h * ratio
    x0 -= (nw - w) / 2
    w = nw
  } else {
    const nh = w / ratio
    y0 -= nh - h
    h = nh
  }
  const cam = { x: x0, y: y0, w, h }
  cameraCache.set(key, cam)
  return cam
}

/** The width / height the figure will be drawn at; lets a container reserve its space before mount. */
export function figureAspect(id: string, aspect: number | 'auto'): number {
  const cam = camera(id, aspect)
  return cam.w / cam.h
}

// ---------- scene ----------
/** Shapes in draw order, back to front. */
export function sceneShapes(move: Move, J: Joints): Shape[] {
  const front = move.view === 'front'
  const m = muscleMarks(move, J)
  const dbs = dumbbellShapes(move, J)
  const far = front ? 'body' : 'far'
  // The far limbs are nudged up and back so they read as behind the near ones.
  const off: Vec = front ? [0, 0] : [-1.6, -1.1]
  const shift = (list: Shape[]): Shape[] =>
    list.map((s): Shape => {
      if (s.k === 'line') return { ...s, p0: add(s.p0, off), p1: add(s.p1, off) }
      if (s.k === 'dot' || s.k === 'plate') return { ...s, c: add(s.c, off) }
      return s
    })
  const leg = (s: Side, cls: string): Shape[] => [
    line(J[`H${s}` as const], J[`K${s}` as const], WIDTH.thigh, cls),
    line(J[`K${s}` as const], J[`A${s}` as const], WIDTH.shin, cls),
    line(J[`heel${s}` as const], J[`ball${s}` as const], WIDTH.foot, cls),
  ]
  const arm = (s: Side, cls: string): Shape[] => [
    line(J[`S${s}` as const], J[`E${s}` as const], WIDTH.upper, cls),
    line(J[`E${s}` as const], J[`W${s}` as const], WIDTH.fore, cls),
    line(J[`W${s}` as const], J[`hand${s}` as const], WIDTH.hand, cls),
  ]
  const mus = (list: Mark[], cls = 'muscle'): Shape[] => list.map((x): Shape => ({ ...x, cls }))
  const limbMarks = (s: Side, limb: Limb): Mark[] => m[s].filter((x) => x.limb === limb)
  const torso: Shape[] = front
    ? [{ k: 'poly', pts: [J.SN, J.SF, J.HF, J.HN], w: WIDTH.torsoFront, cls: 'body' }]
    : [line(J.P, J.N, WIDTH.torso, 'body')]
  const head: Shape[] = [
    line(J.N, add(J.N, dir(J.neckAng), BONE.neck - 2), WIDTH.neck, 'body'),
    { k: 'dot', c: J.H, r: BONE.head, cls: 'body' },
  ]
  if (!front) head.push({ k: 'dot', c: add(J.H, dir(J.neckAng + 90), 6.1), r: 1.7, cls: 'body' })

  const props = propShapes(move)
  const isOver = (s: Shape) => (s.k === 'line' || s.k === 'dot') && s.over === true
  const out: Shape[] = props.filter((s) => !isOver(s))
  if (front) {
    out.push(
      ...leg('F', 'body'), ...leg('N', 'body'), ...mus(limbMarks('F', 'leg')), ...mus(limbMarks('N', 'leg')),
      ...torso, ...mus(m.torso), ...head,
      ...arm('N', 'body'), ...mus(limbMarks('N', 'arm')), ...dbs.N, ...arm('F', 'body'), ...mus(limbMarks('F', 'arm')), ...dbs.F,
    )
  } else {
    out.push(
      ...shift(leg('F', far)), ...shift(mus(limbMarks('F', 'leg'), 'muscle far-m')),
      ...shift(arm('F', far)), ...shift(mus(limbMarks('F', 'arm'), 'muscle far-m')), ...shift(dbs.F),
      ...torso, ...mus(m.torso), ...head,
      ...leg('N', 'body'), ...mus(limbMarks('N', 'leg')), ...arm('N', 'body'), ...mus(limbMarks('N', 'arm')), ...dbs.N,
    )
  }
  out.push(...props.filter(isOver))
  return out
}
