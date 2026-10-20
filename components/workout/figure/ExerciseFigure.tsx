import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { mountFigure, prefersReducedMotion, subscribeReducedMotion, type FigureController } from '../../../lib/workout/figure/mount'
import { hasMove } from '../../../lib/workout/figure/moves'
import { figureAspect } from '../../../lib/workout/figure/scene'
import { PauseIcon, PlayIcon } from '../shell/icons'

export interface ExerciseFigureProps {
  /** Catalog exercise id. */
  id: string
  /** Start playing on mount. Ignored with playOnHover or when the viewer prefers reduced motion. */
  autoplay?: boolean
  /** Still until the pointer or focus enters, then plays; pauses on leave or blur. */
  playOnHover?: boolean
  /** Width / height, or 'auto' to follow the movement's own shape. */
  aspect?: number | 'auto'
  /** Called with the phase caption ("Lower for 2 seconds") whenever it changes. */
  onPhase?: (text: string) => void
  /** Accessible name; pass the exercise name. */
  label?: string
  className?: string
}

export function ExerciseFigure({ id, autoplay = true, playOnHover = false, aspect = 4 / 3, onPhase, label, className }: ExerciseFigureProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<FigureController | null>(null)
  const onPhaseRef = useRef(onPhase)
  const [playing, setPlaying] = useState(false)
  const reduced = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false)
  const known = hasMove(id)
  const name = label ?? `${id} demonstration`

  useEffect(() => {
    onPhaseRef.current = onPhase
  })

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !known) return
    const controller = mountFigure(stage, id, {
      autoplay: autoplay && !playOnHover,
      aspect,
      label: name,
      onPhase: (text) => onPhaseRef.current?.(text),
    })
    controllerRef.current = controller

    let unlisten = () => {}
    if (playOnHover && !reduced) {
      // A card is usually one link or button around the figure, so hover and focus on it count too.
      const host = stage.closest<HTMLElement>('a[href], button, [role="button"], [tabindex]') ?? stage
      let hovering = false
      let focused = false
      const sync = () => (hovering || focused ? controller.play() : controller.pause())
      const enter = () => {
        hovering = true
        sync()
      }
      const leave = () => {
        hovering = false
        sync()
      }
      const focusIn = () => {
        focused = true
        sync()
      }
      const focusOut = () => {
        focused = false
        sync()
      }
      host.addEventListener('pointerenter', enter)
      host.addEventListener('pointerleave', leave)
      host.addEventListener('focusin', focusIn)
      host.addEventListener('focusout', focusOut)
      unlisten = () => {
        host.removeEventListener('pointerenter', enter)
        host.removeEventListener('pointerleave', leave)
        host.removeEventListener('focusin', focusIn)
        host.removeEventListener('focusout', focusOut)
      }
    }

    return () => {
      unlisten()
      controller.destroy()
      controllerRef.current = null
      setPlaying(false)
    }
  }, [id, known, autoplay, playOnHover, aspect, name, reduced])

  const cls = className ? `fig ${className}` : 'fig'
  if (!known) {
    return (
      <div className={cls}>
        <div className="fig-pending" style={typeof aspect === 'number' ? { aspectRatio: String(aspect) } : undefined}>
          <span>No demo yet</span>
        </div>
      </div>
    )
  }
  // Reserving the ratio up front keeps the page from jumping when the client draws the figure.
  return (
    <div className={cls}>
      <div ref={stageRef} style={{ aspectRatio: figureAspect(id, aspect).toFixed(4) }} />
      {reduced && !playOnHover && (
        <button
          type="button"
          className="fig-play"
          aria-label={playing ? 'Pause demonstration' : 'Play demonstration'}
          onClick={() => setPlaying(controllerRef.current?.toggle() ?? false)}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      )}
    </div>
  )
}
