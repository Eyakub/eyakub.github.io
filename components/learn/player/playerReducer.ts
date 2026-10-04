export interface PlayerState { route: string; step: number; playing: boolean }
export type PlayerAction =
  | { type: 'go'; index: number }
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'tick' }
  | { type: 'route'; route: string }
export interface PlayerCtx { lengths: Record<string, number>; altStart: Record<string, number> }

export const initialPlayer: PlayerState = { route: 'main', step: 0, playing: false }

export function playerReducer(s: PlayerState, a: PlayerAction, ctx: PlayerCtx): PlayerState {
  const last = ctx.lengths[s.route] - 1
  const clamp = (i: number) => Math.max(0, Math.min(last, i))
  switch (a.type) {
    case 'go': return { ...s, step: clamp(a.index), playing: false }
    case 'next': return { ...s, step: clamp(s.step + 1), playing: false }
    case 'prev': return { ...s, step: clamp(s.step - 1), playing: false }
    case 'play': return { ...s, step: s.step >= last ? 0 : s.step, playing: true }
    case 'pause': return { ...s, playing: false }
    case 'tick':
      if (!s.playing) return s
      return s.step < last ? { ...s, step: s.step + 1 } : { ...s, playing: false }
    case 'route':
      if (a.route === s.route) return s
      return { route: a.route, step: ctx.altStart[a.route] ?? 0, playing: false }
  }
}
