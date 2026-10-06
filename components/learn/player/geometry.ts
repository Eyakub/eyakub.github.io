import type { LayoutKey, Pt, Topic } from '../../../data/learn/types'

export const TRACK_OFFSET = 7.5
export const TRIM_START = 28
export const TRIM_END = 33

export function corridorFor(topic: Topic, from: string, to: string): { key: string; reversed: boolean } {
  const fk = `${from}-${to}`
  if (topic.corridors[fk]) return { key: fk, reversed: false }
  return { key: `${to}-${from}`, reversed: true }
}

export function bidirectionalCorridors(topic: Topic): Set<string> {
  const dirs = new Map<string, Set<boolean>>()
  for (const e of Object.values(topic.edges)) {
    const { key, reversed } = corridorFor(topic, e.from, e.to)
    const set = dirs.get(key) ?? new Set<boolean>()
    set.add(reversed)
    dirs.set(key, set)
  }
  return new Set([...dirs].filter(([, s]) => s.size === 2).map(([k]) => k))
}

export function offsetPolyline(pts: Pt[], d: number): Pt[] {
  if (!d) return pts
  const segs: [Pt, Pt][] = []
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[i + 1]
    const len = Math.hypot(x2 - x1, y2 - y1)
    const nx = -(y2 - y1) / len
    const ny = (x2 - x1) / len
    segs.push([[x1 + nx * d, y1 + ny * d], [x2 + nx * d, y2 + ny * d]])
  }
  const out: Pt[] = [segs[0][0]]
  for (let i = 0; i < segs.length - 1; i++) {
    const [[ax, ay], [bx, by]] = segs[i]
    const [[cx, cy], [dx, dy]] = segs[i + 1]
    const den = (ax - bx) * (cy - dy) - (ay - by) * (cx - dx)
    if (Math.abs(den) < 1e-6) { out.push(segs[i][1]); continue }
    const t = ((ax - cx) * (cy - dy) - (ay - cy) * (cx - dx)) / den
    out.push([ax + t * (bx - ax), ay + t * (by - ay)])
  }
  out.push(segs[segs.length - 1][1])
  return out
}

export function trimStart(input: Pt[], distance: number): Pt[] {
  const pts = input.map((p) => [p[0], p[1]] as Pt)
  let dist = distance
  while (pts.length > 2) {
    const len = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1])
    if (len > dist) break
    dist -= len
    pts.shift()
  }
  const [a, b] = pts
  const len = Math.hypot(b[0] - a[0], b[1] - a[1])
  const t = Math.min(dist / len, 0.9)
  pts[0] = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
  return pts
}

export const trimEnd = (pts: Pt[], dist: number): Pt[] => trimStart([...pts].reverse(), dist).reverse()

export const pathD = (pts: Pt[]): string =>
  'M' + pts.map((p) => p.map((v) => +v.toFixed(1)).join(' ')).join('L')

export function edgePoints(topic: Topic, edgeId: string, layout: LayoutKey, bidir: Set<string>, nodeR = 25): Pt[] {
  const e = topic.edges[edgeId]
  const { key, reversed } = corridorFor(topic, e.from, e.to)
  let pts = topic.corridors[key][layout].map((p) => [p[0], p[1]] as Pt)
  if (reversed) pts.reverse()
  pts = offsetPolyline(pts, bidir.has(key) ? TRACK_OFFSET : 0)
  return trimEnd(trimStart(pts, nodeR + TRIM_START - 25), nodeR + TRIM_END - 25)
}

export function pointAt(pts: Pt[], t: number): Pt {
  const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  let d = lens.reduce((a, b) => a + b, 0) * t
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i]) {
      const k = lens[i] ? d / lens[i] : 0
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]
    }
    d -= lens[i]
  }
  return pts[pts.length - 1]
}

export const polyLen = (pts: Pt[]): number => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0)

export interface Box { x: number; y: number; w: number; h: number }
/** Where a pill rests: `t` along the path, nudged off the line by (dx, dy). */
export interface Spot { t: number; dx: number; dy: number }

const overlap = (a: Box, b: Box) =>
  Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y))

const ALONG = [0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8]

/**
 * Rests a pill on its line where it covers the fewest stations and labels; when no spot on the line is clear,
 * it steps beside the line instead. `span` limits the search to part of the path (a trip's last hop).
 */
export function placePill(pts: Pt[], [w, h]: [number, number], obstacles: Box[], [vw, vh]: [number, number], span: [number, number] = [0, 1]): Spot {
  const offLine = 0.08 * w * h
  let best: Spot = { t: span[0] + (span[1] - span[0]) / 2, dx: 0, dy: 0 }
  let bestCost = Infinity
  for (const side of [0, 1, -1]) {
    for (const a of ALONG) {
      const t = span[0] + (span[1] - span[0]) * a
      const [x, y] = pointAt(pts, t)
      let spot: Spot = { t, dx: 0, dy: 0 }
      if (side) {
        const [x1, y1] = pointAt(pts, Math.max(span[0], t - 0.01))
        const [x2, y2] = pointAt(pts, Math.min(span[1], t + 0.01))
        spot = Math.abs(y2 - y1) > Math.abs(x2 - x1) ? { t, dx: side * (w / 2 + 10), dy: 0 } : { t, dx: 0, dy: side * (h / 2 + 10) }
      }
      const box = { x: x + spot.dx - w / 2, y: y + spot.dy - h / 2, w, h }
      const cost = obstacles.reduce((s, o) => s + overlap(box, o), 0) + (w * h - overlap(box, { x: 0, y: 0, w: vw, h: vh })) * 4 + (side ? offLine : 0)
      if (cost < bestCost - 1e-6) { best = spot; bestCost = cost }
      if (cost === 0) return best
    }
  }
  return best
}
