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
