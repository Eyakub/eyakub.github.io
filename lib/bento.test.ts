import { describe, expect, it } from 'vitest'
import fit from '../data/fit.json'
import { AXIS_MONTHS, bar, monthIndex, rangeLabel, shortCompany } from './bento'

const NOW = '2026-10-16'

describe('bento helpers', () => {
  it('parses month names and Present', () => {
    expect(monthIndex('January 2019', NOW)).toBe(0)
    expect(monthIndex('July 2025', NOW)).toBe(78)
    expect(monthIndex('Present', NOW)).toBe(93)
    expect(() => monthIndex('Smarch 2020', NOW)).toThrow()
  })
  it('places bars on the axis', () => {
    const done = bar('May 2022', 'August 2025', NOW)
    expect(done.open).toBe(false)
    expect(done.left).toBeCloseTo((40 / AXIS_MONTHS) * 100)
    expect(done.width).toBeCloseTo((40 / AXIS_MONTHS) * 100)
    const live = bar('July 2025', 'Present', NOW)
    expect(live.open).toBe(true)
    expect(live.left + live.width).toBeCloseTo(((93 + 0.5) / AXIS_MONTHS) * 100)
  })
  it('shortens names and ranges', () => {
    expect(shortCompany('Aadi BD Ltd.')).toBe('Aadi BD')
    expect(shortCompany('Tryonyx (now The Prestige Global)')).toBe('Tryonyx')
    expect(rangeLabel('February 2019', 'May 2019')).toBe('Feb – May 2019')
    expect(rangeLabel('July 2025', 'Present')).toBe('Jul 2025 – now')
    expect(rangeLabel('May 2022', 'August 2025')).toBe('May 2022 – Aug 2025')
  })
  it('every fit preset key exists in EV', () => {
    for (const p of fit.PRESETS) for (const k of p.keys) expect(fit.EV, k).toHaveProperty(k)
  })
})
