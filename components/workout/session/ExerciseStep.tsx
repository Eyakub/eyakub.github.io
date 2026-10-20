import { useState } from 'react'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'
import { formatLoadLong, formatRangeEach, formatRest } from '../../../lib/workout/format'
import { addSet, lastPerformance, readyToProgress, removeSet } from '../../../lib/workout/session'
import type { ActiveSession, WorkoutDoc } from '../../../lib/workout/types'
import { MuscleLine } from '../exercise/MuscleLine'
import { ExerciseFigure } from '../figure/ExerciseFigure'
import { ExerciseFolds } from './ExerciseFolds'
import { SetRows } from './SetRows'
import { StepNav } from './StepNav'

interface Props {
  active: ActiveSession
  doc: WorkoutDoc
  openFolds: ReadonlySet<string>
  onFold: (key: string, open: boolean) => void
  onTick: (exercise: number, set: number, fallback: number) => void
  onEnd: () => void
}

export function ExerciseStep({ active, doc, openFolds, onFold, onTick, onEnd }: Props) {
  const { updateActive } = useWorkout()
  const [phase, setPhase] = useState('')
  const index = active.step
  const e = active.exercises[index]
  const info = EXERCISE_BY_ID[e.exerciseId]
  // A swapped-in exercise has no routine history to compare with
  const last = e.swappedFrom ? null : lastPerformance(doc, e.exerciseId)
  const ready = readyToProgress(last, e.target) && Boolean(info?.progression)

  return (
    <div className={`screen ex-screen c-${active.routineId}`} key={index}>
      <div className="stage">
        <ExerciseFigure id={e.exerciseId} onPhase={setPhase} label={`${e.name}, animated demonstration`} />
        <p className="phase" aria-live="off">
          {phase}
        </p>
        <p className="stage-n" aria-hidden="true">
          {index + 1}
          <small>/{active.exercises.length}</small>
        </p>
      </div>
      <h1 className="ex-title">{e.name}</h1>
      {e.swappedFrom && <p className="swapped">Swapped in for {e.swappedFrom.name} today</p>}
      {info && <MuscleLine primary={info.primary} secondary={info.secondary} />}
      <dl className="facts">
        <div>
          <dt>Target</dt>
          <dd>
            {e.target.sets} × {formatRangeEach(e.target, e.measure)}
          </dd>
        </div>
        <div>
          <dt>Rest</dt>
          <dd>{formatRest(e.restSec)}</dd>
        </div>
        <div>
          <dt>Load</dt>
          <dd>{formatLoadLong(e.load)}</dd>
        </div>
      </dl>
      {last && (
        <p className="last">
          Last time <b>{last.join(', ')}</b>
        </p>
      )}
      {ready && (
        <p className="ready">
          <b>You hit the top of the range last time.</b> {info.progression}
        </p>
      )}
      <SetRows exercise={e} index={index} last={last} onTick={(set, fallback) => onTick(index, set, fallback)} />
      <div className="set-tools">
        <button type="button" className="btn btn-quiet" onClick={() => updateActive((a) => addSet(a, index))}>
          Add a set
        </button>
        {e.sets.length > 1 && (
          <button type="button" className="btn btn-quiet" onClick={() => updateActive((a) => removeSet(a, index))}>
            Remove a set
          </button>
        )}
      </div>
      <ExerciseFolds exercise={e} index={index} open={openFolds} onFold={onFold} />
      <StepNav active={active} onEnd={onEnd} />
    </div>
  )
}
