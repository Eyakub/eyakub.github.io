import { describe, it, expect } from 'vitest'
import { TOPICS } from './index'
import { STATIONS, LINES } from './network'
import type { L10n, Topic } from './types'
import { bidirectionalCorridors, edgePoints, pointAt } from '../../components/learn/player/geometry'
import { trips, workNodes } from '../../components/learn/player/flow'

const words = (s: string) => s.replace(/`[^`]*`/g, 'x').trim().split(/\s+/).length
function collectL10n(v: unknown, out: L10n[] = []): L10n[] {
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>
    if (typeof o.en === 'string' && typeof o.bn === 'string' && Object.keys(o).length === 2) out.push(o as L10n)
    else Object.values(o).forEach((x) => collectL10n(x, out))
  }
  return out
}

describe.each(Object.values(TOPICS).map((t) => [t.slug, t] as [string, Topic]))('%s', (_slug, t) => {
  it('edges reference nodes and a corridor', () => {
    for (const e of Object.values(t.edges)) {
      expect(t.nodes[e.from], e.from).toBeTruthy()
      expect(t.nodes[e.to], e.to).toBeTruthy()
      expect(t.corridors[`${e.from}-${e.to}`] ?? t.corridors[`${e.to}-${e.from}`], `${e.from}-${e.to}`).toBeTruthy()
    }
  })
  it('every step has exactly one of moves/work and valid refs', () => {
    for (const s of [...t.main.steps, ...t.alts.flatMap((a) => a.steps)]) {
      expect(Boolean(s.moves) !== Boolean(s.work), s.id).toBe(true)
      if (s.moves) expect(s.moves.length, s.id).toBeGreaterThanOrEqual(1)
      if (s.work) expect(workNodes(s).length, s.id).toBeGreaterThanOrEqual(1)
      s.moves?.forEach((m) => expect(t.edges[m.edge], `${s.id}:${m.edge}`).toBeTruthy())
      workNodes(s).forEach((n) => expect(t.nodes[n], `${s.id} work ${n}`).toBeTruthy())
      Object.keys(s.state ?? {}).forEach((n) => expect(t.nodes[n], `${s.id} state ${n}`).toBeTruthy())
      expect(words(s.simple.en), `${s.id} simple`).toBeLessThanOrEqual(30)
      expect(words(s.tech.en), `${s.id} tech`).toBeLessThanOrEqual(45)
    }
  })
  it('alt routes branch from a main step and ids are unique per route', () => {
    const mainIds = t.main.steps.map((s) => s.id)
    expect(new Set(mainIds).size).toBe(mainIds.length)
    for (const a of t.alts) {
      expect(mainIds, a.id).toContain(a.branchAfter)
      const ids = [...mainIds.slice(0, mainIds.indexOf(a.branchAfter) + 1), ...a.steps.map((s) => s.id)]
      expect(new Set(ids).size, a.id).toBe(ids.length)
    }
  })
  it('all copy exists in both languages', () => {
    for (const l of collectL10n(t)) {
      expect(l.en.trim().length).toBeGreaterThan(0)
      expect(l.bn.trim().length, l.en).toBeGreaterThan(0)
    }
  })
  it('positions stay inside the viewBox', () => {
    for (const lk of ['wide', 'narrow'] as const) {
      const [w, h] = t.view[lk]
      const inside = ([x, y]: [number, number] | number[]) => x >= 0 && x <= w && y >= 0 && y <= h
      Object.entries(t.nodes).forEach(([id, n]) => expect(inside(n[lk]), `${lk} ${id}`).toBe(true))
      Object.entries(t.corridors).forEach(([id, c]) => c[lk].forEach((p) => expect(inside(p), `${lk} ${id}`).toBe(true)))
      t.groups?.forEach((g) => {
        const [x, y, gw, gh] = g[lk]
        expect(x >= 0 && y >= 22 && x + gw <= w && y + gh <= h, `${lk} group ${g.id}`).toBe(true)
      })
    }
  })
  it('content counts follow the rules', () => {
    expect(t.main.steps.length).toBeGreaterThanOrEqual(6)
    expect(t.main.steps.length).toBeLessThanOrEqual(12)
    expect(t.alts.length).toBeGreaterThanOrEqual(1)
    expect(t.qa.length).toBeGreaterThanOrEqual(5)
    expect(t.cheats.length).toBeGreaterThanOrEqual(5)
    expect(t.sources.length).toBeGreaterThanOrEqual(1)
  })
  it('a twin with no node says what it is', () => {
    for (const tw of t.analogy.twins) if (tw.node === null) expect(tw.is, tw.name.en).toBeTruthy()
  })
  it('every string has balanced backticks', () => {
    for (const l of collectL10n(t)) {
      expect(l.en.split('`').length % 2, l.en).toBe(1)
      expect(l.bn.split('`').length % 2, l.bn).toBe(1)
    }
  })
  it('parallel moves use distinct edges and their packets never overlap', () => {
    const pillW = (label: string) => label.length * 7.6 + 26
    const longest = (m: { label: string; plain?: L10n }) => [m.label, m.plain?.en ?? '', m.plain?.bn ?? ''].reduce((a, b) => (b.length > a.length ? b : a))
    const bidir = bidirectionalCorridors(t)
    for (const s of [...t.main.steps, ...t.alts.flatMap((a) => a.steps)]) {
      if (!s.moves || s.moves.length < 2) continue
      expect(s.moves.length, s.id).toBeLessThanOrEqual(3)
      expect(new Set(s.moves.map((m) => m.edge)).size, s.id).toBe(s.moves.length)
      const parallel = trips(t, s.moves)
      for (const lk of ['wide', 'narrow'] as const) {
        const r = t.nodeR?.[lk] ?? 25
        // a trip's pill rests on its last hop
        const box = parallel.map((tr) => ({ c: pointAt(edgePoints(t, tr.edges[tr.edges.length - 1], lk, bidir, r), 0.5), w: pillW(longest(tr.move)) }))
        for (let i = 0; i < box.length; i++) for (let j = i + 1; j < box.length; j++) {
          const apart = Math.abs(box[i].c[0] - box[j].c[0]) >= (box[i].w + box[j].w) / 2 + 4 || Math.abs(box[i].c[1] - box[j].c[1]) >= 32
          expect(apart, `${s.id} ${lk}: "${parallel[i].move.label}" overlaps "${parallel[j].move.label}"`).toBe(true)
        }
      }
    }
  })
  it('packet labels stay short', () => {
    for (const s of [...t.main.steps, ...t.alts.flatMap((a) => a.steps)]) s.moves?.forEach((m) => expect(m.label.length, `${s.id}: ${m.label}`).toBeLessThanOrEqual(24))
  })
  it('teaching fields are well-formed when present', () => {
    if (t.words) {
      expect(t.words.length).toBeGreaterThanOrEqual(3)
      expect(t.words.length).toBeLessThanOrEqual(6)
      t.words.forEach((w) => expect(words(w.d.en), w.term.en).toBeLessThanOrEqual(15))
    }
    if (t.hook) expect(words(t.hook.en)).toBeLessThanOrEqual(25)
    if (t.takeaway) expect(words(t.takeaway.en)).toBeLessThanOrEqual(25)
    t.alts.forEach((a) => { if (a.whatIf) expect(a.whatIf.en.startsWith('What if'), a.id).toBe(true) })
    for (const s of [...t.main.steps, ...t.alts.flatMap((a) => a.steps)]) s.moves?.forEach((m) => { if (m.plain) expect(m.plain.en.length, s.id).toBeLessThanOrEqual(18) })
  })
  it('Simply mode has no code or undefined acronyms (migrated topics)', () => {
    if (!t.words) return
    const defined = new Set(t.words.flatMap((w) => w.term.en.match(/\b[A-Z]{2,}\b/g) ?? []))
    const allow = new Set(['OK'])
    const code = /`|\(\)|__|->|=|\b[a-z]+\.[a-z]+\b|\b\w\/\w\b/i
    const seen: [string, string][] = []
    Object.entries(t.nodes).forEach(([id, n]) => { const p = n.plain ?? n; seen.push([`node ${id} name`, p.name.en], [`node ${id} sub`, p.sub.en]) })
    for (const s of [...t.main.steps, ...t.alts.flatMap((a) => a.steps)]) {
      seen.push([`${s.id} simple`, s.simple.en], [`${s.id} title`, s.title.en])
      s.moves?.forEach((m) => seen.push([`${s.id} packet`, m.plain?.en ?? m.label]))
      const keys = new Set([...Object.keys(s.state ?? {}), ...Object.keys(s.plainState ?? {})])
      keys.forEach((k) => seen.push([`${s.id} state ${k}`, (s.plainState?.[k] ?? s.state![k]).en]))
    }
    t.alts.forEach((a) => seen.push([`alt ${a.id} label`, a.label.en], [`alt ${a.id} whatIf`, a.whatIf?.en ?? '']))
    seen.push(['hook', t.hook?.en ?? ''], ['takeaway', t.takeaway?.en ?? ''])
    t.words.forEach((w) => seen.push([`word ${w.term.en}`, w.d.en]))
    t.groups?.forEach((g) => seen.push([`group ${g.id}`, (g.plain ?? g.label).en]))
    t.analogy.twins.forEach((tw) => seen.push([`twin ${tw.name.en}`, tw.d.en]))
    for (const [where, s] of seen) {
      expect(code.test(s), `${where}: "${s}"`).toBe(false)
      for (const a of s.match(/\b[A-Z]{2,}\b/g) ?? []) expect(defined.has(a) || allow.has(a), `${where}: acronym ${a}`).toBe(true)
    }
  })
  it('has a station on the map', () => {
    expect(STATIONS[t.slug]).toBeTruthy()
  })
})

describe('network', () => {
  it('every line stop is a station', () => {
    LINES.forEach((l) => l.stops.forEach((s) => expect(STATIONS[s], `${l.id}:${s}`).toBeTruthy()))
  })
})
