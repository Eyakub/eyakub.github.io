import { describe, expect, it } from 'vitest'
import { complete, resolve } from './terminal'

const slugs = ['sds_manager', 'go_games', 'hub_one_stride', 'rallo']

describe('resolve', () => {
  it('resolves aliases', () => {
    expect(resolve('goama', slugs)).toEqual({ id: 'project', slug: 'go_games' })
    expect(resolve('open stride', slugs)).toEqual({ id: 'project', slug: 'hub_one_stride' })
    expect(resolve('open rallo', slugs)).toEqual({ id: 'project', slug: 'rallo' })
    expect(resolve('LS', slugs)).toEqual({ id: 'projects' })
  })
  it('flags unknown input', () => {
    expect(resolve('foo', slugs)).toEqual({ id: 'unknown', cmd: 'foo' })
    expect(resolve('open nope', slugs)).toEqual({ id: 'open-missing', arg: 'nope' })
    expect(resolve('   ', slugs)).toBeNull()
  })
})

describe('complete', () => {
  it('completes by prefix', () => {
    expect(complete('rall')).toBe('rallo ')
    expect(complete('r')).toBe('razlio')
    expect(complete('zzz')).toBeNull()
    expect(complete('')).toBeNull()
  })
})
