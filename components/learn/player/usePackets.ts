import { useLayoutEffect, useRef } from 'react'
import type { Step, Topic } from '../../../data/learn/types'
import type { Lang } from '../../../lib/learn/l10n'
import type { Mode } from '../../../lib/learn/prefs'
import { packetText } from './flow'

/** Where a packet rests on its edge, and how its pill sits relative to the line. */
export interface Placement { rest: number; dx: number; dy: number; anchor: 'middle' | 'start' }
export const ON_LINE: Placement = { rest: 0.5, dx: 0, dy: 0, anchor: 'middle' }

const D1 = 750
const D2 = 520
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

interface Opts {
  topic: Topic
  steps: Step[]
  index: number
  animate: boolean
  mode: Mode
  lang: Lang
  /** Changes that should re-place packets without a new step (e.g. a layout swap). */
  layoutKey: string
  placement?: (edge: string) => Placement
}

/** Rides each move's packet from its source to its rest point, then runs a comet to the destination and flashes it. */
export function usePackets({ topic, steps, index, animate, mode, lang, layoutKey, placement = () => ON_LINE }: Opts) {
  const edgeRefs = useRef<Record<string, SVGPathElement | null>>({})
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({})
  const packetRefs = useRef<(SVGGElement | null)[]>([])
  const cometRefs = useRef<(SVGCircleElement | null)[]>([])

  useLayoutEffect(() => {
    const cur = steps[index].moves ?? []
    const packets = cur.map((_, i) => packetRefs.current[i])
    const comets = cur.map((_, i) => cometRefs.current[i])
    const geo = cur.map((m) => {
      const path = edgeRefs.current[m.edge]
      return path ? { path, len: path.getTotalLength(), to: topic.edges[m.edge].to, at: placement(m.edge) } : null
    })
    const place = (el: SVGElement, i: number, t: number) => {
      const g = geo[i]!
      const p = g.path.getPointAtLength(g.len * t)
      el.setAttribute('transform', `translate(${(p.x + g.at.dx).toFixed(1)} ${(p.y + g.at.dy).toFixed(1)})`)
    }
    packets.forEach((pk, i) => {
      if (!pk || !geo[i]) return
      const text = pk.querySelector('text')!
      const rect = pk.querySelector('rect')!
      text.textContent = packetText(cur[i], mode, lang)
      pk.removeAttribute('hidden')
      const tw = text.getComputedTextLength() + 26
      const start = geo[i]!.at.anchor === 'start'
      rect.setAttribute('width', String(tw))
      rect.setAttribute('x', String(start ? 0 : -tw / 2))
      text.setAttribute('x', String(start ? tw / 2 : 0))
    })

    let raf = 0
    let arriveTimer: ReturnType<typeof setTimeout> | undefined
    let arrived: SVGGElement[] = []
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!animate || reduce) {
      packets.forEach((pk, i) => {
        if (!pk || !geo[i]) return
        place(pk, i, geo[i]!.at.rest)
        pk.style.opacity = '1'
      })
    } else {
      const t0 = performance.now()
      const tick = (now: number) => {
        const el = now - t0
        if (el < D1) {
          const t = ease(el / D1)
          packets.forEach((pk, i) => {
            if (!pk || !geo[i]) return
            const rest = geo[i]!.at.rest
            place(pk, i, Math.min(0.04, rest) + (rest - Math.min(0.04, rest)) * t)
            pk.style.opacity = String(Math.min(1, el / 200))
          })
        } else {
          const t = Math.min((el - D1) / D2, 1)
          packets.forEach((pk, i) => {
            const c = comets[i]
            if (!pk || !c || !geo[i]) return
            const g = geo[i]!
            place(pk, i, g.at.rest)
            pk.style.opacity = '1'
            const p = g.path.getPointAtLength(g.len * (g.at.rest + (1 - g.at.rest) * ease(t)))
            c.removeAttribute('hidden')
            c.setAttribute('cx', String(p.x))
            c.setAttribute('cy', String(p.y))
          })
          if (t >= 1) {
            comets.forEach((c) => c?.setAttribute('hidden', ''))
            const dests = [...new Set(geo.flatMap((g) => (g ? [g.to] : [])))]
            arrived = dests.flatMap((d) => { const g = nodeRefs.current[d]; return g ? [g] : [] })
            arrived.forEach((g) => { g.classList.remove('arrive'); void g.getBoundingClientRect(); g.classList.add('arrive') })
            if (arrived.length) arriveTimer = setTimeout(() => arrived.forEach((g) => g.classList.remove('arrive')), 600)
            return
          }
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(arriveTimer)
      arrived.forEach((g) => g.classList.remove('arrive'))
      comets.forEach((c) => c?.setAttribute('hidden', ''))
    }
  }, [index, steps, layoutKey, mode, lang]) // eslint-disable-line react-hooks/exhaustive-deps

  return { edgeRefs, nodeRefs, packetRefs, cometRefs }
}
