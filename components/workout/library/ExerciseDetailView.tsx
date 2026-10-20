import { useState } from 'react'
import Link from 'next/link'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'
import { DIFFICULTY_LABEL, EQUIPMENT_LABEL } from '../../../lib/workout/labels'
import { routinesWith } from '../../../lib/workout/rotation'
import { AlternativeList } from '../exercise/AlternativeList'
import { MistakeList } from '../exercise/MistakeList'
import { MuscleLine } from '../exercise/MuscleLine'
import { StepList } from '../exercise/StepList'
import { ExerciseFigure } from '../figure/ExerciseFigure'
import { BackIcon } from '../shell/icons'

export function ExerciseDetailView({ id }: { id: string }) {
  const { doc } = useWorkout()
  const [phase, setPhase] = useState('')
  const ex = EXERCISE_BY_ID[id]
  if (!ex || !doc) return null

  const routines = routinesWith(doc, ex.id)
  const needs = ex.equipment.includes('bodyweight') ? 'Nothing' : ex.equipment.map((e) => EQUIPMENT_LABEL[e]).join(', ')
  return (
    <div className={`screen detail-screen${routines[0] ? ` c-${routines[0].routineId}` : ''}`}>
      <Link className="back" href="/workout/library">
        <BackIcon />
        <span>Exercises</span>
      </Link>
      <div className="stage">
        <ExerciseFigure id={ex.id} onPhase={setPhase} label={`${ex.name}, animated demonstration`} />
        <p className="phase" aria-live="off">
          {phase}
        </p>
      </div>
      <h1 className="ex-title">{ex.name}</h1>
      <MuscleLine primary={ex.primary} secondary={ex.secondary} />
      <dl className="facts">
        <div>
          <dt>Needs</dt>
          <dd>{needs}</dd>
        </div>
        <div>
          <dt>Level</dt>
          <dd>{DIFFICULTY_LABEL[ex.difficulty]}</dd>
        </div>
        <div>
          <dt>In</dt>
          <dd>{routines.length ? routines.map((r) => r.name).join(', ') : 'Not in your routine'}</dd>
        </div>
      </dl>
      <section className="sec">
        <h2>How to do it</h2>
        <StepList steps={ex.steps} />
      </section>
      <section className="sec">
        <h2>Common mistakes</h2>
        <MistakeList mistakes={ex.mistakes} />
      </section>
      {ex.progression && (
        <section className="sec">
          <h2>When it gets easy</h2>
          <p className="prose">{ex.progression}</p>
        </section>
      )}
      {ex.alternatives.length > 0 && (
        <section className="sec">
          <h2>Alternatives</h2>
          <AlternativeList ids={ex.alternatives} />
        </section>
      )}
    </div>
  )
}
