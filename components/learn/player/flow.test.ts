import { describe, it, expect } from 'vitest'
import type { Step, Topic } from '../../../data/learn/types'
import { buildRoutes, firstAltIndex, stepKind, focusNodes, visitedEdges, nodeSubAt, dwellMs } from './flow'

const L = (s: string) => ({ en: s, bn: s })
const st = (id: string, extra: Partial<Step>): Step => ({ id, title: L(id), simple: L(id), tech: L(id), ...extra })
const topic = {
  nodes: { a: { sub: L('idle') }, b: { sub: L('b') } },
  edges: { ab: { from: 'a', to: 'b', kind: 'queue' } },
  main: { label: L('main'), steps: [st('s1', { moves: [{ edge: 'ab', label: 'm' }] }), st('s2', { work: { node: 'b', kind: 'error' }, state: { a: L('busy') } }), st('s3', { moves: [{ edge: 'ab', label: 'm' }] })] },
  alts: [{ id: 'fail', label: L('fail'), branchAfter: 's1', steps: [st('f1', { work: { node: 'b', kind: 'error' } })] }],
} as unknown as Topic

describe('routes', () => {
  it('builds alt routes from the main prefix', () => {
    expect(buildRoutes(topic).fail.map((s) => s.id)).toEqual(['s1', 'f1'])
  })
  it('first alt index points at the first alt-only stop', () => {
    expect(firstAltIndex(topic, 'fail')).toBe(1)
    expect(firstAltIndex(topic, 'main')).toBe(0)
  })
})

describe('step helpers', () => {
  const steps = buildRoutes(topic).main
  it('kind comes from the edge or the work entry', () => {
    expect(stepKind(topic, steps[0])).toBe('queue')
    expect(stepKind(topic, steps[1])).toBe('error')
  })
  it('focus is both edge ends or the working node', () => {
    expect(focusNodes(topic, steps[0])).toEqual(['a', 'b'])
    expect(focusNodes(topic, steps[1])).toEqual(['b'])
  })
  it('visited edges exclude the current step', () => {
    expect([...visitedEdges(steps, 0)]).toEqual([])
    expect([...visitedEdges(steps, 2)]).toEqual(['ab'])
  })
  it('state overrides apply from their stop onward', () => {
    expect(nodeSubAt(topic, steps, 0, 'a').en).toBe('idle')
    expect(nodeSubAt(topic, steps, 1, 'a').en).toBe('busy')
    expect(nodeSubAt(topic, steps, 2, 'a').en).toBe('busy')
  })
  it('dwell is longer in technical mode', () => {
    expect(dwellMs('simple')).toBe(4300)
    expect(dwellMs('technical')).toBe(6500)
  })
})
