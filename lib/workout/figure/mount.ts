/* The only module that touches the DOM. Importing it is safe during static prerender: browser
   globals are read lazily, inside functions that only run from mountFigure. */
import { r1 } from './geometry'
import { getMove, phaseAt } from './moves'
import { poseAt, solve, type Move } from './rig'
import { camera, sceneShapes, type Shape } from './scene'

export interface FigureOptions {
  autoplay?: boolean
  /** Width / height of the viewBox, or 'auto' to follow the movement's own shape. */
  aspect?: number | 'auto'
  speed?: number
  /** Accessible name for the drawing. */
  label?: string
  /** Called whenever the phase caption changes, and once on mount. */
  onPhase?: (text: string, u: number) => void
}

export interface FigureController {
  /** Draws the pose at cycle position u (0 to 1). */
  render(u: number): void
  play(): void
  pause(): void
  /** Returns whether it is playing afterwards. */
  toggle(): boolean
  setSpeed(speed: number): void
  destroy(): void
  readonly playing: boolean
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia(REDUCED_MOTION).matches
}

/** Calls `onChange` when the reduced-motion preference flips; returns the unsubscribe. */
export function subscribeReducedMotion(onChange: () => void): () => void {
  if (typeof matchMedia !== 'function') return () => {}
  const mq = matchMedia(REDUCED_MOTION)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

const NS = 'http://www.w3.org/2000/svg'

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent?: Element): SVGElementTagNameMap[K] {
  const e = document.createElementNS(NS, tag)
  for (const k in attrs) e.setAttribute(k, String(attrs[k]))
  if (parent) parent.appendChild(e)
  return e
}

// ---------- shared animation loop ----------
// One requestAnimationFrame loop drives every playing figure; off-screen ones skip drawing.
interface Runner {
  move: Move
  svg: SVGSVGElement
  speed: number
  t0: number
  visible: boolean
  render(u: number): void
}

const running = new Set<Runner>()
const runners = new WeakMap<Element, Runner>()
let raf = 0
let observer: IntersectionObserver | null | undefined

function visibilityObserver(): IntersectionObserver | null {
  if (observer === undefined) {
    observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver((entries) => {
            for (const e of entries) {
              const r = runners.get(e.target)
              if (r) r.visible = e.isIntersecting
            }
          })
        : null
  }
  return observer
}

function kick(): void {
  if (!raf && typeof requestAnimationFrame === 'function') raf = requestAnimationFrame(frame)
}

function frame(now: number): void {
  raf = 0
  for (const f of running) {
    if (!f.visible || !f.svg.isConnected) continue
    const dur = (f.move.dur * 1000) / f.speed
    f.render(((now - f.t0) % dur) / dur)
  }
  if (running.size) kick()
}

// ---------- drawing ----------
interface Drawn {
  a: SVGElement
  /** Second element for shapes made of two parts (a plate and its hub). */
  b?: SVGElement
}

const className = (cls: string): string => 'wf-' + cls.split(' ').join(' wf-')

function build(s: Shape, g: SVGGElement): Drawn {
  const cls = className(s.cls)
  switch (s.k) {
    case 'line': return { a: el('line', { class: cls }, g) }
    case 'dot': {
      const wrap = el('g', { class: cls }, g)
      return { a: el('circle', {}, wrap) }
    }
    case 'plate': {
      const wrap = el('g', { class: cls }, g)
      return { a: el('circle', { class: 'wf-plate' }, wrap), b: el('circle', { class: 'wf-hub' }, wrap) }
    }
    case 'poly': return { a: el('polygon', { class: cls }, g) }
    case 'rect': return { a: el('rect', { class: cls }, g) }
  }
}

function update(n: Drawn, s: Shape): void {
  switch (s.k) {
    case 'line':
      n.a.setAttribute('x1', String(r1(s.p0[0])))
      n.a.setAttribute('y1', String(r1(s.p0[1])))
      n.a.setAttribute('x2', String(r1(s.p1[0])))
      n.a.setAttribute('y2', String(r1(s.p1[1])))
      n.a.setAttribute('stroke-width', String(s.w))
      break
    case 'dot':
    case 'plate':
      n.a.setAttribute('cx', String(r1(s.c[0])))
      n.a.setAttribute('cy', String(r1(s.c[1])))
      n.a.setAttribute('r', String(s.r))
      if (n.b) {
        n.b.setAttribute('cx', String(r1(s.c[0])))
        n.b.setAttribute('cy', String(r1(s.c[1])))
        n.b.setAttribute('r', String(s.r * 0.36))
      }
      break
    case 'poly':
      n.a.setAttribute('points', s.pts.map((p) => `${r1(p[0])},${r1(p[1])}`).join(' '))
      n.a.setAttribute('stroke-width', String(s.w))
      break
    case 'rect':
      n.a.setAttribute('x', String(r1(s.x)))
      n.a.setAttribute('y', String(r1(Math.min(s.y, s.y + s.h))))
      n.a.setAttribute('width', String(r1(s.w)))
      n.a.setAttribute('height', String(r1(Math.abs(s.h))))
      n.a.setAttribute('rx', '1')
      break
  }
}

/** Draws the figure for exercise `id` into `container` and returns a controller for it. Browser only. */
export function mountFigure(container: HTMLElement, id: string, opts: FigureOptions = {}): FigureController {
  const move = getMove(id)
  if (!move) throw new Error(`Unknown exercise ${id}`)
  const { autoplay = true, aspect = 4 / 3, speed = 1, label, onPhase } = opts

  const cam = camera(id, aspect)
  const svg = el('svg', {
    viewBox: [cam.x, cam.y, cam.w, cam.h].map(r1).join(' '),
    class: 'wf',
    role: 'img',
    preserveAspectRatio: 'xMidYMid meet',
  })
  if (label) svg.setAttribute('aria-label', label)
  if (move.floor) el('line', { x1: r1(cam.x), y1: 0, x2: r1(cam.x + cam.w), y2: 0, class: 'wf-floor' }, svg)
  const g = el('g', {}, svg)
  container.appendChild(svg)

  let nodes: Drawn[] = []
  let u = move.still
  let playing = false
  let destroyed = false
  let lastPhase: string | null = null

  const render = (at: number): void => {
    u = at
    const shapes = sceneShapes(move, solve(move, poseAt(move, at)))
    if (nodes.length !== shapes.length) {
      g.textContent = ''
      nodes = shapes.map((s) => build(s, g))
    }
    shapes.forEach((s, i) => update(nodes[i], s))
    const phase = phaseAt(id, at)
    if (phase !== lastPhase) {
      lastPhase = phase
      onPhase?.(phase, at)
    }
  }
  const runner: Runner = { move, svg, speed, t0: 0, visible: true, render }
  const startClock = (): void => {
    runner.t0 = performance.now() - (u * move.dur * 1000) / runner.speed
  }

  const controller: FigureController = {
    render,
    play() {
      if (playing || destroyed) return
      playing = true
      startClock()
      running.add(runner)
      kick()
    },
    pause() {
      playing = false
      running.delete(runner)
    },
    toggle() {
      if (playing) controller.pause()
      else controller.play()
      return playing
    },
    setSpeed(s) {
      runner.speed = s
      startClock()
    },
    destroy() {
      destroyed = true
      controller.pause()
      visibilityObserver()?.unobserve(svg)
      runners.delete(svg)
      svg.remove()
    },
    get playing() {
      return playing
    },
  }

  render(move.still)
  runners.set(svg, runner)
  visibilityObserver()?.observe(svg)
  if (autoplay && !prefersReducedMotion()) controller.play()
  return controller
}
