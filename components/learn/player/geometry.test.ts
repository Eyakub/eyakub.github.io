import { describe, it, expect } from 'vitest'
import type { MetroTopic } from '../../../data/learn/types'
import { offsetPolyline, trimStart, trimEnd, corridorFor, bidirectionalCorridors, edgePoints, pathD, pointAt } from './geometry'

const L = { en: 'x', bn: 'x' }
const node = (x: number, y: number) => ({ icon: 'user' as const, name: L, sub: L, wide: [x, y, 'down'] as [number, number, 'down'], narrow: [x, y, 'down'] as [number, number, 'down'] })
const topic = {
  nodes: { a: node(0, 0), b: node(100, 0), c: node(100, 100) },
  corridors: { 'a-b': { wide: [[0, 0], [100, 0]], narrow: [[0, 0], [100, 0]] }, 'b-c': { wide: [[100, 0], [100, 100]], narrow: [[100, 0], [100, 100]] } },
  edges: { ab: { from: 'a', to: 'b', kind: 'request' }, ba: { from: 'b', to: 'a', kind: 'result' }, bc: { from: 'b', to: 'c', kind: 'queue' } },
} as unknown as MetroTopic

describe('offsetPolyline', () => {
  it('moves an eastbound segment to its right side (south, +y)', () => {
    expect(offsetPolyline([[0, 0], [10, 0]], 5)).toEqual([[0, 5], [10, 5]])
  })
  it('joins a corner at the intersection of the offset segments', () => {
    const out = offsetPolyline([[0, 0], [10, 0], [10, 10]], 2)
    expect(out[1][0]).toBeCloseTo(8)
    expect(out[1][1]).toBeCloseTo(2)
  })
  it('returns the input when d is 0', () => {
    expect(offsetPolyline([[0, 0], [10, 0]], 0)).toEqual([[0, 0], [10, 0]])
  })
})

describe('trim', () => {
  it('walks across short first segments', () => {
    expect(trimStart([[0, 0], [5, 0], [5, 100]], 15)).toEqual([[5, 10], [5, 100]])
  })
  it('trims the end along the path', () => {
    expect(trimEnd([[0, 0], [100, 0]], 30)).toEqual([[0, 0], [70, 0]])
  })
})

describe('corridors', () => {
  it('finds a corridor authored in the opposite direction', () => {
    expect(corridorFor(topic, 'b', 'a')).toEqual({ key: 'a-b', reversed: true })
  })
  it('marks corridors used both ways as bidirectional', () => {
    expect([...bidirectionalCorridors(topic)]).toEqual(['a-b'])
  })
  it('offsets bidirectional edges to opposite sides', () => {
    const bidir = bidirectionalCorridors(topic)
    const ab = edgePoints(topic, 'ab', 'wide', bidir)
    const ba = edgePoints(topic, 'ba', 'wide', bidir)
    expect(ab[0][1]).toBeCloseTo(7.5)
    expect(ba[0][1]).toBeCloseTo(-7.5)
  })
  it('does not offset one-way edges', () => {
    const pts = edgePoints(topic, 'bc', 'wide', bidirectionalCorridors(topic))
    expect(pts[0][0]).toBeCloseTo(100)
  })
})

describe('pathD', () => {
  it('formats points to one decimal', () => {
    expect(pathD([[0, 0], [10.04, 5.56]])).toBe('M0 0L10 5.6')
  })
})

describe('pointAt', () => {
  it('walks the polyline by length', () => {
    expect(pointAt([[0, 0], [100, 0], [100, 100]], 0.5)).toEqual([100, 0])
    expect(pointAt([[0, 0], [100, 0], [100, 100]], 0.75)).toEqual([100, 50])
  })
  it('clamps to the ends', () => {
    expect(pointAt([[0, 0], [10, 0]], 0)).toEqual([0, 0])
    expect(pointAt([[0, 0], [10, 0]], 1)).toEqual([10, 0])
  })
})
