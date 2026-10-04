import { describe, it, expect } from 'vitest'
import { playerReducer, initialPlayer, type PlayerCtx } from './playerReducer'

const ctx: PlayerCtx = { lengths: { main: 10, fail: 8 }, altStart: { main: 0, fail: 4 } }
const run = (actions: Parameters<typeof playerReducer>[1][]) =>
  actions.reduce((s, a) => playerReducer(s, a, ctx), initialPlayer)

describe('playerReducer', () => {
  it('clamps go within the route', () => {
    expect(run([{ type: 'go', index: 99 }]).step).toBe(9)
    expect(run([{ type: 'go', index: -3 }]).step).toBe(0)
  })
  it('manual navigation pauses', () => {
    expect(run([{ type: 'play' }, { type: 'next' }]).playing).toBe(false)
  })
  it('tick advances while playing and stops at the end', () => {
    const s = run([{ type: 'go', index: 8 }, { type: 'play' }, { type: 'tick' }])
    expect(s.step).toBe(9)
    expect(s.playing).toBe(true)
    expect(playerReducer(s, { type: 'tick' }, ctx).playing).toBe(false)
  })
  it('play at the last stop restarts from 0', () => {
    const s = run([{ type: 'go', index: 9 }, { type: 'play' }])
    expect(s.step).toBe(0)
    expect(s.playing).toBe(true)
  })
  it('switching route pauses and jumps to the first alt-only stop', () => {
    const s = run([{ type: 'play' }, { type: 'route', route: 'fail' }])
    expect(s).toMatchObject({ route: 'fail', step: 4, playing: false })
    expect(playerReducer(s, { type: 'route', route: 'main' }, ctx).step).toBe(0)
  })
  it('selecting the current route is a no-op', () => {
    const s = run([{ type: 'go', index: 3 }])
    expect(playerReducer(s, { type: 'route', route: 'main' }, ctx)).toBe(s)
  })
})
