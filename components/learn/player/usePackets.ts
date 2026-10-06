import { useLayoutEffect, useRef } from 'react'
import type { LayoutKey, Pt, Topic } from '../../../data/learn/types'
import type { Lang } from '../../../lib/learn/l10n'
import type { Mode } from '../../../lib/learn/prefs'
import { packetText, type Trip } from './flow'
import { edgePoints, placePill, pointAt, polyLen, type Box, type Spot } from './geometry'

const D1 = 750
const D2 = 520
const PILL_H = 28
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

interface Opts {
  topic: Topic
  /** Memoised per stop: a new array means a new stop to animate. */
  trips: Trip[]
  animate: boolean
  mode: Mode
  lang: Lang
  layout: LayoutKey
  bidir: Set<string>
  r: number
}

/** Rides each trip's packet from its source to a clear resting spot, then runs a comet to the destination and flashes it. */
export function usePackets({ topic, trips, animate, mode, lang, layout, bidir, r }: Opts) {
  const svgRef = useRef<SVGSVGElement>(null)
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({})
  const packetRefs = useRef<(SVGGElement | null)[]>([])
  const cometRefs = useRef<(SVGCircleElement | null)[]>([])
  const lastRidden = useRef<Trip[] | null>(null)

  useLayoutEffect(() => {
    const svg = svgRef.current!
    const packets = trips.map((_, i) => packetRefs.current[i])
    const comets = trips.map((_, i) => cometRefs.current[i])
    const obstacles: Box[] = [...svg.querySelectorAll<SVGGraphicsElement>('.node .disc, .node text, .group text')]
      .map((el) => el.getBBox())
      .filter((b) => b.width > 0)
      .map((b) => ({ x: b.x - 2, y: b.y - 2, w: b.width + 4, h: b.height + 4 }))

    const geo = trips.map((trip, i) => {
      const hops = trip.edges.map((id) => edgePoints(topic, id, layout, bidir, r))
      const pts: Pt[] = hops.flat()
      const pk = packets[i]
      let spot: Spot = { t: 0.5, dx: 0, dy: 0 }
      if (pk) {
        const text = pk.querySelector('text')!
        const rect = pk.querySelector('rect')!
        text.textContent = packetText(trip.move, mode, lang)
        pk.removeAttribute('hidden')
        const w = text.getComputedTextLength() + 26
        rect.setAttribute('width', String(w))
        rect.setAttribute('x', String(-w / 2))
        const total = polyLen(pts)
        spot = placePill(pts, [w, PILL_H], obstacles, topic.view[layout], [(total - polyLen(hops[hops.length - 1])) / total, 1])
        const [x, y] = pointAt(pts, spot.t)
        obstacles.push({ x: x + spot.dx - w / 2, y: y + spot.dy - PILL_H / 2, w, h: PILL_H })
      }
      return { pts, spot, to: trip.to }
    })

    const place = (el: SVGElement, i: number, t: number, off: number) => {
      const { pts, spot } = geo[i]
      const [x, y] = pointAt(pts, t)
      el.setAttribute('transform', `translate(${(x + spot.dx * off).toFixed(1)} ${(y + spot.dy * off).toFixed(1)})`)
    }

    // Mode, language and layout changes re-place the pill at rest; only a new stop rides.
    const newStop = lastRidden.current !== trips
    lastRidden.current = trips
    let raf = 0
    let arriveTimer: ReturnType<typeof setTimeout> | undefined
    let arrived: SVGGElement[] = []
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!animate || !newStop || reduce) {
      packets.forEach((pk, i) => {
        if (!pk) return
        place(pk, i, geo[i].spot.t, 1)
        pk.style.opacity = '1'
      })
    } else {
      const t0 = performance.now()
      const tick = (now: number) => {
        const el = now - t0
        if (el < D1) {
          const k = ease(el / D1)
          packets.forEach((pk, i) => {
            if (!pk) return
            const rest = geo[i].spot.t
            const from = Math.min(0.04, rest)
            place(pk, i, from + (rest - from) * k, k)
            pk.style.opacity = String(Math.min(1, el / 200))
          })
        } else {
          const k = Math.min((el - D1) / D2, 1)
          packets.forEach((pk, i) => {
            const c = comets[i]
            if (!pk || !c) return
            const { pts, spot } = geo[i]
            place(pk, i, spot.t, 1)
            pk.style.opacity = '1'
            const [x, y] = pointAt(pts, spot.t + (1 - spot.t) * ease(k))
            c.removeAttribute('hidden')
            c.setAttribute('cx', String(x))
            c.setAttribute('cy', String(y))
          })
          if (k >= 1) {
            comets.forEach((c) => c?.setAttribute('hidden', ''))
            arrived = [...new Set(geo.map((g) => g.to))].flatMap((d) => { const g = nodeRefs.current[d]; return g ? [g] : [] })
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
  }, [trips, layout, mode, lang]) // eslint-disable-line react-hooks/exhaustive-deps

  return { svgRef, nodeRefs, packetRefs, cometRefs }
}
