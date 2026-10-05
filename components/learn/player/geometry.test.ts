import { describe, it, expect } from 'vitest'
import type { Topic } from '../../../data/learn/types'
import { offsetPolyline, trimStart, trimEnd, corridorFor, bidirectionalCorridors, edgePoints, pathD, pointAt, placePill, polyLen } from './geometry'

const L = { en: 'x', bn: 'x' }
const node = (x: number, y: number) => ({ icon: 'user' as const, name: L, sub: L, wide: [x, y, 'down'] as [number, number, 'down'], narrow: [x, y, 'down'] as [number, number, 'down'] })
const topic = {
  nodes: { a: node(0, 0), b: node(100, 0), c: node(100, 100) },
  corridors: { 'a-b': { wide: [[0, 0], [100, 0]], narrow: [[0, 0], [100, 0]] }, 'b-c': { wide: [[100, 0], [100, 100]], narrow: [[100, 0], [100, 100]] } },
  edges: { ab: { from: 'a', to: 'b', kind: 'request' }, ba: { from: 'b', to: 'a', kind: 'result' }, bc: { from: 'b', to: 'c', kind: 'queue' } },
} as unknown as Topic

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

describe('placePill', () => {
  const line: [number, number][] = [[0, 50], [200, 50]]
  it('rests mid-line when nothing is in the way', () => {
    expect(placePill(line, [60, 28], [], [200, 100])).toEqual({ t: 0.5, dx: 0, dy: 0 })
  })
  it('slides along the line to clear a station', () => {
    const spot = placePill(line, [60, 28], [{ x: 90, y: 30, w: 20, h: 40 }], [200, 100])
    expect(spot.dx).toBe(0)
    expect(spot.dy).toBe(0)
    expect(Math.abs(spot.t - 0.5)).toBeGreaterThan(0.1)
  })
  it('steps beside the line when the whole line is covered', () => {
    const spot = placePill(line, [60, 28], [{ x: 0, y: 40, w: 200, h: 20 }], [200, 100])
    expect(Math.abs(spot.dy)).toBeGreaterThan(14)
  })
  it('keeps a pill inside the view', () => {
    const spot = placePill([[0, 5], [200, 5]], [60, 28], [], [200, 100])
    expect(spot.dy).toBeGreaterThan(0)
  })
  it('searches only inside the span', () => {
    expect(placePill(line, [20, 10], [], [200, 100], [0.5, 1]).t).toBeCloseTo(0.75)
  })
})

describe('polyLen', () => {
  it('sums segment lengths', () => {
    expect(polyLen([[0, 0], [3, 4], [3, 10]])).toBe(11)
  })
})
