import { useEffect, useMemo, useReducer } from 'react'
import type { Topic } from '../../../data/learn/types'
import type { Mode } from '../../../lib/learn/prefs'
import { buildRoutes, dwellMs, firstAltIndex } from './flow'
import { initialPlayer, playerReducer, type PlayerAction, type PlayerCtx } from './playerReducer'

export function useStepPlayer(topic: Topic, mode: Mode) {
  const routes = useMemo(() => buildRoutes(topic), [topic])
  const ctx = useMemo<PlayerCtx>(() => ({
    lengths: Object.fromEntries(Object.entries(routes).map(([k, v]) => [k, v.length])),
    altStart: Object.fromEntries(Object.keys(routes).map((k) => [k, firstAltIndex(topic, k)])),
  }), [routes, topic])
  const [state, dispatch] = useReducer((s: typeof initialPlayer, a: PlayerAction) => playerReducer(s, a, ctx), initialPlayer)

  useEffect(() => {
    if (!state.playing) return
    const t = setTimeout(() => dispatch({ type: 'tick' }), dwellMs(mode))
    return () => clearTimeout(t)
  }, [state.playing, state.step, mode])

  return { state, steps: routes[state.route], routes, dispatch }
}
