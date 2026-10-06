import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { LayoutKey, Topic } from '../../../data/learn/types'
import type { Mode } from '../../../lib/learn/prefs'
import SegmentedControl from '../shell/SegmentedControl'
import FlowDiagram from './FlowDiagram'
import KindLegend from './KindLegend'
import NowPanel from './NowPanel'
import PlayerControls from './PlayerControls'
import StopList from './StopList'
import { firstAltIndex, stepKind } from './flow'
import { useStepPlayer } from './useStepPlayer'

const layoutFor = (width: number): LayoutKey => (width >= 600 ? 'wide' : 'narrow')

export default function FlowPlayer({ topic }: { topic: Topic }) {
  const { t, ui, mode, setMode } = useLearnPrefs()
  const { state, steps, dispatch } = useStepPlayer(topic, mode)
  const stageRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<LayoutKey>('wide')

  useLayoutEffect(() => {
    const el = stageRef.current!
    setLayout(layoutFor(el.clientWidth))
    const ro = new ResizeObserver(() => setLayout(layoutFor(el.clientWidth)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // First paint and layout swaps place the packet at rest; usePackets also rests it on mode/language changes, so only step changes animate.
  const seen = useRef<{ layout: LayoutKey } | null>(null)
  const animate = seen.current !== null && seen.current.layout === layout
  useEffect(() => {
    seen.current = { layout }
  })

  const step = steps[state.step]
  const kind = stepKind(topic, step)
  const atEnd = state.step === steps.length - 1

  const alt = topic.alts.find((a) => a.id === state.route)
  const whatIf = alt && state.step === firstAltIndex(topic, state.route) ? alt.whatIf : undefined
  const takeaway = state.route === 'main' && atEnd ? topic.takeaway : undefined

  const onKeyDown = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement).closest('button') && (e.key === ' ' || e.key === 'Enter')) return
    if (e.altKey || e.metaKey || e.ctrlKey || e.repeat) return
    if (e.key === 'ArrowRight') dispatch({ type: 'next' })
    if (e.key === 'ArrowLeft') dispatch({ type: 'prev' })
  }

  const onPlay = () => {
    if (state.playing) return dispatch({ type: 'pause' })
    dispatch({ type: 'play' })
    if (window.matchMedia('(max-width: 1179px)').matches) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.querySelector('.learn-root .now')?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' })
    }
  }

  const routeOptions = [
    { value: 'main', label: t(topic.main.label) },
    ...topic.alts.map((a) => ({ value: a.id, label: t(a.label) })),
  ]

  return (
    <>
      <div className="switches">
        <div className="switch">
          <span id="mode-l">{ui('explainLabel')}</span>
          <SegmentedControl
            ariaLabel={ui('explainLabel')}
            options={[{ value: 'simple', label: ui('modeSimple') }, { value: 'technical', label: ui('modeTech') }]}
            value={mode}
            onChange={(v) => setMode(v as Mode)}
          />
        </div>
        <div className="switch">
          <span id="route-l">{ui('routeLabel')}</span>
          <SegmentedControl ariaLabel={ui('routeLabel')} options={routeOptions} value={state.route} onChange={(v) => dispatch({ type: 'route', route: v })} />
        </div>
      </div>
      <section className="player" id="player" aria-labelledby="topic-title" onKeyDown={onKeyDown}>
        <div className="stage" id="stage" ref={stageRef}>
          <FlowDiagram topic={topic} layout={layout} steps={steps} index={state.step} animate={animate} />
          <KindLegend topic={topic} />
        </div>
        <div className="ride">
          <NowPanel steps={steps} index={state.step} kind={kind} whatIf={whatIf} takeaway={takeaway} />
          <PlayerControls
            playing={state.playing}
            atStart={state.step === 0}
            atEnd={atEnd}
            onPrev={() => dispatch({ type: 'prev' })}
            onNext={() => dispatch({ type: 'next' })}
            onPlay={onPlay}
          />
          <StopList steps={steps} index={state.step} kind={kind} onGo={(i) => dispatch({ type: 'go', index: i })} />
        </div>
      </section>
    </>
  )
}
