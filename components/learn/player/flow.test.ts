import { describe, it, expect } from 'vitest'
import type { Step, Topic } from '../../../data/learn/types'
import { buildRoutes, firstAltIndex, stepKind, focusNodes, visitedEdges, nodeSubAt, dwellMs, workNodes, nodeLabels, packetText, trips, isPlain, effectiveMode, stepTitle } from './flow'

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
    expect(dwellMs('story')).toBe(6000)
  })
})

describe('parallel steps', () => {
  const par = {
    nodes: { a: { sub: L('a') }, b: { sub: L('b') }, c: { sub: L('c') }, d: { sub: L('d') } },
    edges: { ab: { from: 'a', to: 'b', kind: 'request' }, cd: { from: 'c', to: 'd', kind: 'result' } },
    main: {
      label: L('main'),
      steps: [
        st('p1', { moves: [{ edge: 'ab', label: 'x' }, { edge: 'cd', label: 'y' }] }),
        st('p2', { work: { node: ['b', 'd'], kind: 'result' } }),
      ],
    },
    alts: [],
  } as unknown as Topic
  const steps = par.main.steps
  it('work names one node or several', () => {
    expect(workNodes(steps[1])).toEqual(['b', 'd'])
    expect(workNodes(st('w', { work: { node: 'a', kind: 'error' } }))).toEqual(['a'])
    expect(workNodes(steps[0])).toEqual([])
  })
  it('focus covers both ends of every parallel move', () => {
    expect(focusNodes(par, steps[0])).toEqual(['a', 'b', 'c', 'd'])
  })
  it('focus covers every working node', () => {
    expect(focusNodes(par, steps[1])).toEqual(['b', 'd'])
  })
  it('visited edges include every edge of a parallel step', () => {
    expect([...visitedEdges(steps, 1)]).toEqual(['ab', 'cd'])
  })
})

describe('simply layer', () => {
  const tp = {
    nodes: {
      a: { name: L('Redis queue'), sub: L('The broker'), plain: { name: L('Order rail'), sub: L('Jobs wait here') } },
      b: { name: L('Worker'), sub: L('idle') },
    },
    edges: { ab: { from: 'a', to: 'b', kind: 'queue' } },
    main: {
      label: L('main'),
      steps: [
        st('s1', { moves: [{ edge: 'ab', label: 'POST /x', plain: L('your order') }], state: { b: L('busy(1)') }, plainState: { b: L('Cooking') } }),
        st('s2', { work: { node: 'b', kind: 'result' }, state: { b: L('done=1') } }),
      ],
    },
    alts: [],
  } as unknown as Topic
  const steps = tp.main.steps
  it('node labels switch by mode', () => {
    expect(nodeLabels(tp, 'a', 'simple').name.en).toBe('Order rail')
    expect(nodeLabels(tp, 'a', 'technical').name.en).toBe('Redis queue')
    expect(nodeLabels(tp, 'b', 'simple').name.en).toBe('Worker')
  })
  it('simple state prefers plainState within a step and the latest step overall', () => {
    expect(nodeSubAt(tp, steps, 0, 'b', 'simple').en).toBe('Cooking')
    expect(nodeSubAt(tp, steps, 0, 'b', 'technical').en).toBe('busy(1)')
    expect(nodeSubAt(tp, steps, 1, 'b', 'simple').en).toBe('done=1')
  })
  it('packet text switches by mode and language', () => {
    const m = steps[0].moves![0]
    expect(packetText(m, 'simple', 'en')).toBe('your order')
    expect(packetText(m, 'technical', 'en')).toBe('POST /x')
  })
  it('story uses the plain names', () => {
    expect(isPlain('simple')).toBe(true)
    expect(isPlain('story')).toBe(true)
    expect(isPlain('technical')).toBe(false)
    expect(nodeLabels(tp, 'a', 'story').name.en).toBe('Order rail')
    expect(nodeSubAt(tp, steps, 0, 'b', 'story').en).toBe('Cooking')
    expect(packetText(steps[0].moves![0], 'story', 'en')).toBe('your order')
  })
  it('stepTitle shows the story title only in story mode', () => {
    const s = { ...steps[0], title: L('Plain'), story: { title: L('Tale'), text: L('t') } }
    expect(stepTitle(s, 'story').en).toBe('Tale')
    expect(stepTitle(s, 'simple').en).toBe('Plain')
    expect(stepTitle(s, 'technical').en).toBe('Plain')
    expect(stepTitle({ ...s, story: undefined }, 'story').en).toBe('Plain')
  })
  it('effectiveMode falls back to simple only for a story preference on a topic without a story', () => {
    const withStory = { ...tp, story: { cast: L('c') } } as Topic
    expect(effectiveMode('story', tp)).toBe('simple')
    expect(effectiveMode('story', withStory)).toBe('story')
    expect(effectiveMode('technical', tp)).toBe('technical')
    expect(effectiveMode('simple', withStory)).toBe('simple')
  })
})

describe('trips', () => {
  const t = {
    edges: { ab: { from: 'a', to: 'b', kind: 'result' }, bc: { from: 'b', to: 'c', kind: 'result' }, cd: { from: 'c', to: 'd', kind: 'error' }, xy: { from: 'x', to: 'y', kind: 'result' } },
  } as unknown as Topic
  it('joins hand-on hops of one kind into a single trip carrying the last label', () => {
    const out = trips(t, [{ edge: 'ab', label: 'response' }, { edge: 'bc', label: '200 OK' }])
    expect(out).toHaveLength(1)
    expect(out[0]).toMatchObject({ edges: ['ab', 'bc'], to: 'c', kind: 'result' })
    expect(out[0].move.label).toBe('200 OK')
  })
  it('chains three hops of one kind into one trip, edges in order', () => {
    const chain = {
      edges: { ab: { from: 'a', to: 'b', kind: 'request' }, bc: { from: 'b', to: 'c', kind: 'request' }, cd: { from: 'c', to: 'd', kind: 'request' } },
    } as unknown as Topic
    const out = trips(chain, [{ edge: 'ab', label: '1' }, { edge: 'bc', label: '2' }, { edge: 'cd', label: '3' }])
    expect(out).toHaveLength(1)
    expect(out[0]).toMatchObject({ edges: ['ab', 'bc', 'cd'], to: 'd', kind: 'request' })
    expect(out[0].move.label).toBe('3')
  })
  it('keeps unrelated or different-kind moves apart', () => {
    expect(trips(t, [{ edge: 'ab', label: '1' }, { edge: 'xy', label: '2' }])).toHaveLength(2)
    expect(trips(t, [{ edge: 'bc', label: '1' }, { edge: 'cd', label: '2' }])).toHaveLength(2)
  })
})
