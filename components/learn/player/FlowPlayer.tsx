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
import { stepKind } from './flow'
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

  // First paint and layout swaps place the packet at rest; only step changes animate.
  const seen = useRef<{ layout: LayoutKey } | null>(null)
  const animate = seen.current !== null && seen.current.layout === layout
  useEffect(() => {
    seen.current = { layout }
  })

  const step = steps[state.step]
  const kind = stepKind(topic, step)
  const atEnd = state.step === steps.length - 1

  const onKeyDown = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement).closest('button') && (e.key === ' ' || e.key === 'Enter')) return
    if (e.key === 'ArrowRight') dispatch({ type: 'next' })
    if (e.key === 'ArrowLeft') dispatch({ type: 'prev' })
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
          <KindLegend />
        </div>
        <div className="ride">
          <NowPanel steps={steps} index={state.step} kind={kind} />
          <PlayerControls
            playing={state.playing}
            atStart={state.step === 0}
            atEnd={atEnd}
            onPrev={() => dispatch({ type: 'prev' })}
            onNext={() => dispatch({ type: 'next' })}
            onPlay={() => dispatch({ type: state.playing ? 'pause' : 'play' })}
          />
          <StopList steps={steps} index={state.step} kind={kind} onGo={(i) => dispatch({ type: 'go', index: i })} />
        </div>
      </section>
    </>
  )
}
