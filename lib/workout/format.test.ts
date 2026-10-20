import { describe, expect, it } from 'vitest'
import { formatInches, formatKg, formatLoad, formatRange, formatRest, formatTarget, inWords } from './format'

const t = (min: number, max: number, per?: 'side' | 'leg', sets = 3) => ({ sets, min, max, per })

describe('formatRange', () => {
  it('uses an en dash for a range and one number for a fixed target', () => {
    expect(formatRange(t(5, 8), 'reps')).toBe('5–8')
    expect(formatRange(t(15, 15), 'reps')).toBe('15')
  })
  it('adds seconds', () => {
    expect(formatRange(t(20, 40), 'seconds')).toBe('20–40 s')
    expect(formatRange(t(45, 45), 'seconds')).toBe('45 s')
  })
  it('adds the per-side or per-leg suffix last', () => {
    expect(formatRange(t(10, 12, 'side'), 'reps')).toBe('10–12/side')
    expect(formatRange(t(8, 8, 'leg'), 'reps')).toBe('8/leg')
    expect(formatRange(t(20, 30, 'side'), 'seconds')).toBe('20–30 s/side')
  })
})

describe('formatTarget', () => {
  it('prefixes sets with a multiplication sign', () => {
    expect(formatTarget(t(5, 8), 'reps')).toBe('3 × 5–8')
    expect(formatTarget(t(30, 30, undefined, 2), 'seconds')).toBe('2 × 30 s')
    expect(formatTarget(t(10, 12, 'leg', 4), 'reps')).toBe('4 × 10–12/leg')
  })
})

describe('formatRest', () => {
  it('is m:ss', () => {
    expect(formatRest(120)).toBe('2:00')
    expect(formatRest(105)).toBe('1:45')
    expect(formatRest(45)).toBe('0:45')
    expect(formatRest(0)).toBe('0:00')
    expect(formatRest(9)).toBe('0:09')
  })
})

describe('formatLoad', () => {
  it('names bodyweight and dumbbell loads', () => {
    expect(formatLoad({ kind: 'bodyweight' })).toBe('Bodyweight')
    expect(formatLoad({ kind: 'dumbbell', kg: 7.5, count: 1 })).toBe('7.5 kg')
    expect(formatLoad({ kind: 'dumbbell', kg: 7.5, count: 2 })).toBe('7.5 kg ×2')
    expect(formatLoad({ kind: 'dumbbell', kg: 10, count: 2 })).toBe('10 kg ×2')
  })
})

describe('formatKg / formatInches', () => {
  it('formats kg to one decimal', () => {
    expect(formatKg(81.5)).toBe('81.5')
    expect(formatKg(72)).toBe('72.0')
  })
  it('formats inches to one decimal, two when a quarter needs it', () => {
    expect(formatInches(35)).toBe('35.0')
    expect(formatInches(35.5)).toBe('35.5')
    expect(formatInches(35.25)).toBe('35.25')
    expect(formatInches(35.75)).toBe('35.75')
    expect(formatInches(35.3)).toBe('35.3')
  })
})

describe('inWords', () => {
  it('spells small counts and leaves large ones as digits', () => {
    expect(inWords(4)).toBe('Four')
    expect(inWords(12)).toBe('Twelve')
    expect(inWords(15)).toBe('15')
  })
})
