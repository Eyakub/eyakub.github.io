import type { L10n, LayoutKey, Pt, Topic } from '../../../data/learn/types'
import type { Placement } from './usePackets'

export type Anchor = 'start' | 'middle' | 'end'

/** Everything drawn for one node: its band, its icon disc, its label block and its lane dots. */
export interface Slot {
  band?: [number, number, number, number]
  disc: Pt
  discR: number
  text: Pt
  anchor: Anchor
  maxW: number
  inDot?: Pt
  outDot?: Pt
  /** A node hanging below a column has one dot, joined to the column's bottom lane. */
  dot?: Pt
}
export interface SpanGeo { label: L10n; plain?: L10n; at: Pt; anchor: Anchor; line: Pt[] }
export type Lane = 'in' | 'out' | 'turn' | 'drop'
export interface LaneGeo {
  w: number
  h: number
  slots: Record<string, Slot>
  spans: SpanGeo[]
  tracks: { lane: Lane; d: Pt[] }[]
  chevrons: { at: Pt; deg: number; lane: Lane }[]
}

export const DOT_R = 7
/** Name lines run this far apart, sub lines a little tighter. */
export const NAME_LH = 18
export const SUB_LH = 16
export const NAME_PX = { wide: 16, narrow: 17 }
export const SUB_PX = { wide: 13.5, narrow: 14 }

const BENGALI = /[\u0980-\u09FF]/
// hasanta, chandrabindu, nukta and the below-line vowel signs take no width of their own
const BN_ZERO = /[\u0981\u09BC\u09C1-\u09C4\u09CD]/g
/** Rough rendered width of a label in the condensed UI face, calibrated on screenshots; good enough to wrap and to keep pills apart. */
export const textW = (s: string, px: number, bold = false) =>
  BENGALI.test(s) ? s.replace(BN_ZERO, '').length * px * (bold ? 0.56 : 0.54) : s.length * px * (bold ? 0.47 : 0.44)

/**
 * Wrap into at most two lines, splitting where the two lines come out most even ("Host at / the door", not "Host at the / door").
 * A single word too long for a line breaks at its camelCase seams.
 */
export function wrap(s: string, maxW: number, px: number, bold = false): string[] {
  if (textW(s, px, bold) <= maxW) return [s]
  const toks = s.split(' ').flatMap((word, wi) =>
    (textW(word, px, bold) > maxW ? word.split(/(?<=[a-z])(?=[A-Z])/) : [word]).map((w, pi) => ({ w, sp: wi > 0 && pi === 0 })))
  const join = (ts: typeof toks) => ts.map((x, i) => (i && x.sp ? ' ' : '') + x.w).join('')
  let best: string[] = [join(toks)]
  let bestW = Infinity
  for (let i = 1; i < toks.length; i++) {
    const pair = [join(toks.slice(0, i)), join(toks.slice(i))]
    const w = Math.max(...pair.map((l) => textW(l, px, bold)))
    if (w < bestW) { best = pair; bestW = w }
  }
  return best
}

const PAD = 12
const OUTSIDE_W = 96
const WIDE = { w: 1000, spanY: 17, spanLine: 29, bandTop: 38, discY: 64, discR: 20, nameY: 110, inY: 222, outY: 290, bandBottom: 330, belowY: 368, h: 404 }
const NARROW = { w: 400, top: 8, spanH: 24, rowH: 60, inX: 28, outX: 56, discX: 98, discR: 16, textX: 124, bandX: 78, pillX: 72 }

function placeWide(topic: Topic): LaneGeo {
  const L = topic.lanes!
  const out = L.outside ? 1 : 0
  const colW = (WIDE.w - 2 * PAD - out * OUTSIDE_W) / (L.cols.length - out)
  const x = (i: number) => (i < out ? PAD + OUTSIDE_W / 2 : PAD + out * OUTSIDE_W + colW * (i - out + 0.5))
  const slots: Record<string, Slot> = {}
  L.cols.forEach((id, i) => {
    const cx = x(i)
    const outside = i < out
    slots[id] = {
      band: outside ? undefined : [cx - colW / 2 + 4, WIDE.bandTop, colW - 8, WIDE.bandBottom - WIDE.bandTop],
      disc: [cx, WIDE.discY],
      discR: WIDE.discR,
      text: [cx, WIDE.nameY],
      anchor: 'middle',
      maxW: (outside ? OUTSIDE_W : colW) - 10,
      inDot: [cx, WIDE.inY],
      outDot: [cx, WIDE.outY],
    }
  })
  const x0 = x(0)
  const xN = x(L.cols.length - 1)
  const tracks: LaneGeo['tracks'] = [
    { lane: 'in', d: [[x0, WIDE.inY], [xN, WIDE.inY]] },
    { lane: 'turn', d: [[xN, WIDE.inY], [xN, WIDE.outY]] },
    { lane: 'out', d: [[xN, WIDE.outY], [x0, WIDE.outY]] },
  ]
  for (const b of L.below ?? []) {
    const cx = slots[b.under].outDot![0]
    slots[b.node] = { disc: [cx, WIDE.belowY], discR: 16, dot: [cx, WIDE.belowY], text: [cx - 28, WIDE.belowY - 3], anchor: 'end', maxW: 260 }
    tracks.push({ lane: 'drop', d: [[cx, WIDE.outY], [cx, WIDE.belowY]] })
  }
  const chevrons: LaneGeo['chevrons'] = []
  for (let i = 0; i < L.cols.length - 1; i++) {
    const mx = (x(i) + x(i + 1)) / 2
    chevrons.push({ at: [mx, WIDE.inY], deg: 0, lane: 'in' }, { at: [mx, WIDE.outY], deg: 180, lane: 'out' })
  }
  const spans = (L.spans ?? []).map((s) => {
    const a = slots[s.from].band!
    const b = slots[s.to].band!
    const l = a[0] + 2
    const r = b[0] + b[2] - 2
    return { label: s.label, plain: s.plain, at: [(l + r) / 2, WIDE.spanY] as Pt, anchor: 'middle' as Anchor, line: [[l, WIDE.spanLine + 5], [l, WIDE.spanLine], [r, WIDE.spanLine], [r, WIDE.spanLine + 5]] as Pt[] }
  })
  return { w: WIDE.w, h: WIDE.h, slots, spans, tracks, chevrons }
}

/** Rows in walking order: the columns, then each below-node right after the column it hangs from. */
function narrowRows(topic: Topic): string[] {
  const L = topic.lanes!
  return L.cols.flatMap((id) => [id, ...(L.below ?? []).filter((b) => b.under === id).map((b) => b.node)])
}

function placeNarrow(topic: Topic): LaneGeo {
  const L = topic.lanes!
  const below = new Set((L.below ?? []).map((b) => b.node))
  const slots: Record<string, Slot> = {}
  const spans: SpanGeo[] = []
  let y = NARROW.top
  narrowRows(topic).forEach((id, i) => {
    const span = L.spans?.find((s) => s.from === id)
    if (span) {
      // the label sits right-aligned in its own short row, leaving the left free for a pill parked in that gap
      const lw = Math.max(textW(span.label.en, 13, true), textW(span.plain?.en ?? '', 13, true), textW(span.label.bn, 13, true), textW(span.plain?.bn ?? '', 13, true))
      spans.push({ label: span.label, plain: span.plain, at: [NARROW.w - 10, y + 17], anchor: 'end', line: [[NARROW.bandX + 4, y + 13], [Math.max(NARROW.bandX + 40, NARROW.w - 22 - lw), y + 13]] })
      y += NARROW.spanH
    }
    const cy = y + NARROW.rowH / 2
    const outside = L.outside && i === 0
    slots[id] = {
      band: outside ? undefined : [NARROW.bandX, cy - NARROW.rowH / 2 + 4, NARROW.w - NARROW.bandX - 8, NARROW.rowH - 8],
      disc: [NARROW.discX, cy],
      discR: NARROW.discR,
      text: [NARROW.textX, cy - 5],
      anchor: 'start',
      maxW: NARROW.w - NARROW.textX - 12,
      ...(below.has(id) ? { dot: [NARROW.outX, cy] as Pt } : { inDot: [NARROW.inX, cy] as Pt, outDot: [NARROW.outX, cy] as Pt }),
    }
    y += NARROW.rowH
  })
  const first = slots[L.cols[0]].inDot![1]
  const last = slots[L.cols[L.cols.length - 1]].inDot![1]
  const tracks: LaneGeo['tracks'] = [
    { lane: 'in', d: [[NARROW.inX, first], [NARROW.inX, last]] },
    { lane: 'turn', d: [[NARROW.inX, last], [NARROW.outX, last]] },
    { lane: 'out', d: [[NARROW.outX, last], [NARROW.outX, first]] },
  ]
  for (const b of L.below ?? []) tracks.push({ lane: 'drop', d: [[NARROW.outX, slots[b.under].outDot![1]], [NARROW.outX, slots[b.node].dot![1]]] })
  const chevrons: LaneGeo['chevrons'] = []
  for (let i = 0; i < L.cols.length - 1; i++) {
    const my = (slots[L.cols[i]].inDot![1] + slots[L.cols[i + 1]].inDot![1]) / 2
    chevrons.push({ at: [NARROW.inX, my], deg: 90, lane: 'in' }, { at: [NARROW.outX, my], deg: -90, lane: 'out' })
  }
  return { w: NARROW.w, h: y + 6, slots, spans, tracks, chevrons }
}

export const laneGeo = (topic: Topic, layout: LayoutKey): LaneGeo => (layout === 'wide' ? placeWide(topic) : placeNarrow(topic))

function shorten([a, b]: [Pt, Pt], s0: number, s1: number): Pt[] {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1])
  const ux = (b[0] - a[0]) / len
  const uy = (b[1] - a[1]) / len
  return [[a[0] + ux * s0, a[1] + uy * s0], [b[0] - ux * s1, b[1] - uy * s1]]
}

/** Forward edges ride the top lane (wide) or the left track (narrow); backward ones the other. Edges to a below-node drop from the bottom lane. */
export function lanePath(topic: Topic, geo: LaneGeo, edgeId: string): Pt[] {
  const e = topic.edges[edgeId]
  const a = geo.slots[e.from]
  const b = geo.slots[e.to]
  if (b.dot) return shorten([a.outDot!, b.dot], DOT_R + 3, (geo.w === WIDE.w ? b.discR : DOT_R) + 5)
  const fwd = topic.lanes!.cols.indexOf(e.to) > topic.lanes!.cols.indexOf(e.from)
  return shorten(fwd ? [a.inDot!, b.inDot!] : [a.outDot!, b.outDot!], DOT_R + 3, DOT_R + 6)
}

const PILL_GAP = 26

/**
 * Wide: pills float just above the top lane or just below the bottom one, clear of the dots.
 * Narrow: pills sit right of the tracks, parked in the gap after the first row they leave so they never cover a label.
 */
export function lanePlacement(topic: Topic, geo: LaneGeo, edgeId: string, layout: LayoutKey): Placement {
  const pts = lanePath(topic, geo, edgeId)
  const e = topic.edges[edgeId]
  const drop = Boolean(geo.slots[e.to].dot)
  if (layout === 'wide') {
    if (drop) return { rest: 0.5, dx: 0, dy: 0, anchor: 'middle' }
    const fwd = topic.lanes!.cols.indexOf(e.to) > topic.lanes!.cols.indexOf(e.from)
    return { rest: 0.5, dx: 0, dy: fwd ? -PILL_GAP : PILL_GAP, anchor: 'middle' }
  }
  const rows = narrowRows(topic)
  const ia = rows.indexOf(e.from)
  const ib = rows.indexOf(e.to)
  const next = rows[ia + Math.sign(ib - ia)]
  const ya = geo.slots[e.from].disc[1]
  const gap = (ya + geo.slots[next].disc[1]) / 2
  const len = Math.abs(pts[1][1] - pts[0][1])
  return { rest: Math.min(0.9, Math.max(0.1, Math.abs(gap - pts[0][1]) / len)), dx: NARROW.pillX - pts[0][0], dy: 0, anchor: 'start' }
}
