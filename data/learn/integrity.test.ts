import { describe, it, expect } from 'vitest'
import { TOPICS } from './index'
import { STATIONS, LINES } from './network'
import type { L10n, Topic } from './types'

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
      s.moves?.forEach((m) => expect(t.edges[m.edge], `${s.id}:${m.edge}`).toBeTruthy())
      if (s.work) expect(t.nodes[s.work.node], s.id).toBeTruthy()
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
  it('has a station on the map', () => {
    expect(STATIONS[t.slug]).toBeTruthy()
  })
})

describe('network', () => {
  it('every line stop is a station', () => {
    LINES.forEach((l) => l.stops.forEach((s) => expect(STATIONS[s], `${l.id}:${s}`).toBeTruthy()))
  })
})
