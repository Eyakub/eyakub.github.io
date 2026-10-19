import { describe, expect, it } from 'vitest'
import { RANGES, checkOptional, checkRequired, parseDecimal } from './fields'

describe('parseDecimal', () => {
  it('reads plain and comma decimals', () => {
    expect(parseDecimal('72.4')).toBe(72.4)
    expect(parseDecimal(' 72,4 ')).toBe(72.4)
    expect(parseDecimal('72')).toBe(72)
    expect(parseDecimal('.5')).toBe(0.5)
    expect(parseDecimal('72.')).toBe(72)
  })
  it('rejects anything that is not a plain positive number', () => {
    for (const bad of ['', ' ', 'abc', '7 2', '1e3', '-5', '0x10', '1.2.3', '72kg', '+5']) {
      expect(parseDecimal(bad)).toBeNull()
    }
  })
})

describe('checkRequired', () => {
  it('accepts values on and inside the range edges', () => {
    expect(checkRequired('30', RANGES.weightKg)).toEqual({ status: 'valid', value: 30 })
    expect(checkRequired('250', RANGES.weightKg)).toEqual({ status: 'valid', value: 250 })
    expect(checkRequired('72,4', RANGES.weightKg)).toEqual({ status: 'valid', value: 72.4 })
  })
  it('rejects values outside the range with the unit in the message', () => {
    expect(checkRequired('29.9', RANGES.weightKg)).toEqual({ status: 'invalid', error: 'Enter a number between 30 and 250 kg.' })
    expect(checkRequired('251', RANGES.weightKg)).toMatchObject({ status: 'invalid' })
    expect(checkRequired('19', RANGES.waistIn)).toEqual({ status: 'invalid', error: 'Enter a number between 20 and 70 in.' })
  })
  it('rejects blank and garbage', () => {
    expect(checkRequired('', RANGES.weightKg)).toMatchObject({ status: 'invalid' })
    expect(checkRequired('heavy', RANGES.weightKg)).toMatchObject({ status: 'invalid' })
  })
})

describe('checkOptional', () => {
  it('treats blank as null', () => {
    expect(checkOptional('', RANGES.heightCm)).toEqual({ status: 'valid', value: null })
    expect(checkOptional('  ', RANGES.heightCm)).toEqual({ status: 'valid', value: null })
  })
  it('still validates anything typed', () => {
    expect(checkOptional('176', RANGES.heightCm)).toEqual({ status: 'valid', value: 176 })
    expect(checkOptional('tall', RANGES.heightCm)).toMatchObject({ status: 'invalid' })
    expect(checkOptional('99', RANGES.heightCm)).toMatchObject({ status: 'invalid' })
  })
})
