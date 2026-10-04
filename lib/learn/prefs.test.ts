import { describe, it, expect } from 'vitest'
import { parseStored, DEFAULT_PREFS } from './prefs'

describe('parseStored', () => {
  it('returns defaults for null values', () => {
    expect(parseStored({ lang: null, mode: null, learned: null })).toEqual(DEFAULT_PREFS)
  })
  it('accepts valid values', () => {
    expect(parseStored({ lang: '"bn"', mode: '"technical"', learned: '["celery-redis"]' })).toEqual({
      lang: 'bn', mode: 'technical', learned: ['celery-redis'],
    })
  })
  it('ignores garbage and wrong types', () => {
    expect(parseStored({ lang: '"fr"', mode: '{bad json', learned: '{"a":1}' })).toEqual(DEFAULT_PREFS)
  })
  it('drops non-string learned entries', () => {
    expect(parseStored({ lang: null, mode: null, learned: '["git-basics", 4, null]' }).learned).toEqual(['git-basics'])
  })
})
