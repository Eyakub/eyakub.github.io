import { describe, it, expect } from 'vitest'
import type { Topic } from '../../../data/learn/types'
import { laneGeo, lanePath, lanePlacement, wrap } from './lanes'

const L = { en: 'x', bn: 'x' }
const node = { icon: 'user' as const, name: L, sub: L }
const topic = {
  nodes: { c: node, a: node, b: node, z: node, q: node },
  lanes: { cols: ['c', 'a', 'b', 'z'], outside: true, below: [{ node: 'q', under: 'z' }], spans: [{ from: 'a', to: 'b', label: L }] },
  edges: { ca: { from: 'c', to: 'a', kind: 'request' }, za: { from: 'z', to: 'a', kind: 'result' }, zq: { from: 'z', to: 'q', kind: 'queue' } },
} as unknown as Topic

describe('wrap', () => {
  it('keeps a short label on one line', () => expect(wrap('Chef', 100, 16)).toEqual(['Chef']))
  it('splits where the two lines are most even', () => expect(wrap('Checks you in and out', 110, 13.5)).toEqual(['Checks you', 'in and out']))
  it('breaks a long camelCase word at its seam without adding a space', () => expect(wrap('ServerErrorMiddleware', 110, 16, true)).toEqual(['ServerError', 'Middleware']))
})

describe('lanes', () => {
  for (const lk of ['wide', 'narrow'] as const) {
    const g = laneGeo(topic, lk)
    it(`${lk}: forward edges ride the in lane, backward ones the out lane`, () => {
      const fwd = lanePath(topic, g, 'ca')
      const back = lanePath(topic, g, 'za')
      if (lk === 'wide') {
        expect(fwd[0][1]).toBe(g.slots.a.inDot![1])
        expect(back[0][1]).toBe(g.slots.a.outDot![1])
        expect(fwd[1][0]).toBeGreaterThan(fwd[0][0])
        expect(back[1][0]).toBeLessThan(back[0][0])
      } else {
        expect(fwd[0][0]).toBe(g.slots.a.inDot![0])
        expect(back[0][0]).toBe(g.slots.a.outDot![0])
        expect(fwd[1][1]).toBeGreaterThan(fwd[0][1])
        expect(back[1][1]).toBeLessThan(back[0][1])
      }
    })
    it(`${lk}: the outside column has no band and a below-node gets one dot`, () => {
      expect(g.slots.c.band).toBeUndefined()
      expect(g.slots.a.band).toBeDefined()
      expect(g.slots.q.dot).toBeDefined()
      expect(g.slots.q.inDot).toBeUndefined()
    })
    it(`${lk}: pills rest inside the path`, () => {
      for (const id of Object.keys(topic.edges)) {
        const at = lanePlacement(topic, g, id, lk)
        expect(at.rest).toBeGreaterThan(0)
        expect(at.rest).toBeLessThan(1)
      }
    })
  }
  it('wide pills float above the in lane and below the out lane', () => {
    const g = laneGeo(topic, 'wide')
    expect(lanePlacement(topic, g, 'ca', 'wide').dy).toBeLessThan(0)
    expect(lanePlacement(topic, g, 'za', 'wide').dy).toBeGreaterThan(0)
  })
})
