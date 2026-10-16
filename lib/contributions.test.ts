import { describe, expect, it } from 'vitest'
import { toWeeks } from './contributions'

const days = (count: number) => Array.from({ length: count }, (_, i) => [i, i % 5] as [number, number])

describe('toWeeks', () => {
  it('splits days into week columns with their dates', () => {
    const weeks = toWeeks('2025-10-12', days(15))
    expect(weeks.map((w) => w.days.length)).toEqual([7, 7, 1])
    expect(weeks[2].days[0]).toEqual({ n: 14, level: 4, date: '2025-10-26' })
  })

  it('labels the first column when the next month is at least 3 weeks away', () => {
    const weeks = toWeeks('2025-10-12', days(8 * 7))
    expect(weeks.map((w) => w.month ?? '')).toEqual(['Oct', '', '', 'Nov', '', '', '', ''])
  })

  it('skips the first label when the next month starts right after it', () => {
    const weeks = toWeeks('2025-10-26', days(7 * 7))
    expect(weeks.map((w) => w.month ?? '')).toEqual(['', 'Nov', '', '', '', '', 'Dec'])
  })
})
