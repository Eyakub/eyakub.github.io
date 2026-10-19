import { describe, expect, it } from 'vitest'
import { addDays, formatDay, parseIsoDate, startOfWeek, toIsoDate, weekDates, weekdayIndex, weekNumberSince } from './dates'

const d = (y: number, m: number, day: number, h = 0) => new Date(y, m - 1, day, h)

describe('toIsoDate / parseIsoDate', () => {
  it('formats local Y-M-D with padding', () => {
    expect(toIsoDate(d(2026, 3, 5))).toBe('2026-03-05')
    expect(toIsoDate(new Date(2026, 11, 31, 23, 59))).toBe('2026-12-31')
  })
  it('parses to local midnight and round-trips', () => {
    const p = parseIsoDate('2026-10-20')
    expect([p.getFullYear(), p.getMonth(), p.getDate(), p.getHours(), p.getMinutes()]).toEqual([2026, 9, 20, 0, 0])
    expect(toIsoDate(p)).toBe('2026-10-20')
  })
})

describe('addDays', () => {
  it('steps one calendar day at a time across spring-forward and fall-back dates', () => {
    // Covers EU (29 Mar / 25 Oct 2026) and US (8 Mar / 1 Nov 2026) transitions whatever TZ the tests run in.
    const start = d(2026, 3, 1)
    for (let i = 0; i < 300; i++) {
      const want = new Date(Date.UTC(2026, 2, 1 + i)).toISOString().slice(0, 10)
      expect(toIsoDate(addDays(start, i))).toBe(want)
    }
  })
  it('walks backwards over a transition', () => {
    expect(toIsoDate(addDays(d(2026, 3, 30), -2))).toBe('2026-03-28')
    expect(toIsoDate(addDays(d(2026, 10, 26), -2))).toBe('2026-10-24')
  })
  it('keeps the time of day and does not mutate', () => {
    const noon = d(2026, 10, 24, 12)
    const next = addDays(noon, 2)
    expect(toIsoDate(next)).toBe('2026-10-26')
    expect(next.getHours()).toBe(12)
    expect(toIsoDate(noon)).toBe('2026-10-24')
  })
})

describe('weekdayIndex / startOfWeek', () => {
  it('is Monday 0 and Sunday 6', () => {
    expect(weekdayIndex(d(2026, 10, 19))).toBe(0)
    expect(weekdayIndex(d(2026, 10, 20))).toBe(1)
    expect(weekdayIndex(d(2026, 10, 25))).toBe(6)
  })
  it('finds the Monday of a Sunday and of a Monday', () => {
    expect(toIsoDate(startOfWeek(d(2026, 10, 25, 22)))).toBe('2026-10-19')
    expect(toIsoDate(startOfWeek(d(2026, 10, 19, 9)))).toBe('2026-10-19')
    expect(toIsoDate(startOfWeek(d(2026, 10, 26)))).toBe('2026-10-26')
  })
  it('returns local midnight', () => {
    const m = startOfWeek(d(2026, 10, 22, 17))
    expect([m.getHours(), m.getMinutes(), m.getSeconds()]).toEqual([0, 0, 0])
  })
  it('crosses a month boundary', () => {
    expect(toIsoDate(startOfWeek(d(2026, 11, 1)))).toBe('2026-10-26')
  })
})

describe('weekDates', () => {
  it('lists Mon..Sun, including through the October fall-back', () => {
    expect(weekDates(d(2026, 10, 22)).map(toIsoDate)).toEqual([
      '2026-10-19', '2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23', '2026-10-24', '2026-10-25',
    ])
    expect(weekDates(d(2026, 10, 25)).map(toIsoDate)[0]).toBe('2026-10-19')
    expect(weekDates(d(2026, 10, 26)).map(toIsoDate)[6]).toBe('2026-11-01')
  })
})

describe('formatDay', () => {
  it('uses fixed English names', () => {
    expect(formatDay(d(2026, 10, 20))).toBe('Tue 20 Oct')
    expect(formatDay(d(2026, 1, 4))).toBe('Sun 4 Jan')
    expect(formatDay(d(2026, 12, 31))).toBe('Thu 31 Dec')
  })
})

describe('weekNumberSince', () => {
  const start = d(2026, 10, 14, 10).toISOString() // a Wednesday
  it('counts Monday-based weeks, week 1 being the one containing start', () => {
    expect(weekNumberSince(start, d(2026, 10, 14))).toBe(1)
    expect(weekNumberSince(start, d(2026, 10, 12))).toBe(1)
    expect(weekNumberSince(start, d(2026, 10, 18))).toBe(1)
    expect(weekNumberSince(start, d(2026, 10, 19))).toBe(2)
    expect(weekNumberSince(start, d(2026, 10, 25))).toBe(2)
    expect(weekNumberSince(start, d(2026, 10, 26))).toBe(3)
  })
  it('survives the fall-back week', () => {
    const early = d(2026, 10, 5, 8).toISOString()
    expect(weekNumberSince(early, d(2026, 10, 26))).toBe(4)
    expect(weekNumberSince(early, d(2026, 11, 2))).toBe(5)
  })
  it('never goes below 1', () => {
    expect(weekNumberSince(start, d(2026, 9, 1))).toBe(1)
  })
})
