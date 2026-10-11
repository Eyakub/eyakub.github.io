import { useLayoutEffect, useRef } from 'react'
import type { LayoutKey, Pt, Topic } from '../../../data/learn/types'
import type { Lang } from '../../../lib/learn/l10n'
import type { Mode } from '../../../lib/learn/prefs'
import { packetText, type Trip } from './flow'
import { edgePoints, placePill, pointAt, polyLen, type Box, type Spot } from './geometry'

/** How long the label rides the whole wire. The time bar uses the same duration. */
export const RIDE_MS = 1200
const SETTLE_MS = 260
const PILL_H = 34
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

/** Rides each trip's label the full wire, comet ahead of it, then eases the label aside so it stays readable. */
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
        const w = text.getComputedTextLength() + 32
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
      let flashed = false
      const flash = () => {
        if (flashed) return
        flashed = true
        arrived = [...new Set(geo.map((g) => g.to))].flatMap((d) => { const g = nodeRefs.current[d]; return g ? [g] : [] })
        arrived.forEach((g) => { g.classList.remove('arrive'); void g.getBoundingClientRect(); g.classList.add('arrive') })
        if (arrived.length) arriveTimer = setTimeout(() => arrived.forEach((g) => g.classList.remove('arrive')), 600)
      }
      const tick = (now: number) => {
        const el = now - t0
        if (el < RIDE_MS) {
          const k = ease(el / RIDE_MS)
          packets.forEach((pk, i) => {
            if (!pk) return
            const t = 0.02 + 0.98 * k
            place(pk, i, t, 0)
            pk.style.opacity = String(Math.min(1, el / 140))
            const c = comets[i]
            if (!c) return
            const [x, y] = pointAt(geo[i].pts, Math.min(1, t + 0.08))
            c.removeAttribute('hidden')
            c.setAttribute('cx', x.toFixed(1))
            c.setAttribute('cy', y.toFixed(1))
          })
        } else {
          const k = Math.min((el - RIDE_MS) / SETTLE_MS, 1)
          comets.forEach((c) => c?.setAttribute('hidden', ''))
          packets.forEach((pk, i) => {
            if (!pk) return
            const rest = geo[i].spot.t
            place(pk, i, 1 + (rest - 1) * ease(k), ease(k))
            pk.style.opacity = '1'
          })
          flash()
          if (k >= 1) return
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
