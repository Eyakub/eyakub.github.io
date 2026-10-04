import { describe, it, expect } from 'vitest'
import { tr, fmt, num } from './l10n'

describe('tr', () => {
  it('picks the language', () => {
    expect(tr({ en: 'Stop', bn: 'স্টপ' }, 'bn')).toBe('স্টপ')
  })
  it('falls back to en when bn is empty', () => {
    expect(tr({ en: 'Stop', bn: '' }, 'bn')).toBe('Stop')
  })
})

describe('fmt', () => {
  it('fills placeholders and leaves unknown ones intact', () => {
    expect(fmt('Stop {n} of {total} {x}', { n: '3', total: '10' })).toBe('Stop 3 of 10 {x}')
  })
})

describe('num', () => {
  it('uses Bangla digits in bn', () => {
    expect(num(10, 'bn')).toBe('১০')
  })
  it('keeps ASCII digits in en', () => {
    expect(num(10, 'en')).toBe('10')
  })
})
