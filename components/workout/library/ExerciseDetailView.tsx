import Link from 'next/link'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'
import { DIFFICULTY_LABEL, EQUIPMENT_LABEL } from '../../../lib/workout/labels'
import { routinesWith } from '../../../lib/workout/rotation'
import type { Exercise } from '../../../lib/workout/types'
import { AlternativeList } from '../exercise/AlternativeList'
import { ExerciseMedia } from '../exercise/ExerciseMedia'
import { MistakeList } from '../exercise/MistakeList'
import { MuscleChips } from '../exercise/MuscleChips'
import { StepList } from '../exercise/StepList'
import { BackIcon } from '../shell/icons'

function mediaStatus(ex: Exercise): string {
  const first = ex.media[0]
  if (!first) return 'Media: none yet. Each exercise gets its own checked source and licence, shown here.'
  if (first.kind === 'youtube') return 'Media: a YouTube embed that loads only when you press play.'
  return 'Media: credited under the demo.'
}

export function ExerciseDetailView({ id }: { id: string }) {
  const { doc } = useWorkout()
  const ex = EXERCISE_BY_ID[id]
  if (!ex || !doc) return null

  const routines = routinesWith(doc, ex.id)
  return (
    <div className="screen">
      <Link className="back" href="/workout/library">
        <BackIcon />
        Library
      </Link>
      <ExerciseMedia key={ex.id} exercise={ex} />
      <div className="ex-head">
        <h1 className="display ex-name">{ex.name}</h1>
        <MuscleChips primary={ex.primary} secondary={ex.secondary} />
      </div>
      <dl className="meta">
        <div>
          <dt>Equipment</dt>
          <dd>{ex.equipment.map((e) => EQUIPMENT_LABEL[e]).join(', ')}</dd>
        </div>
        <div>
          <dt>Difficulty</dt>
          <dd>{DIFFICULTY_LABEL[ex.difficulty]}</dd>
        </div>
        <div>
          <dt>In your routines</dt>
          <dd>{routines.length ? routines.map((r) => r.name).join(', ') : 'Not in a routine'}</dd>
        </div>
      </dl>
      <section className="sec">
        <h2 className="sec-title">How to do it</h2>
        <StepList steps={ex.steps} />
      </section>
      <section className="sec">
        <h2 className="sec-title">Common mistakes</h2>
        <MistakeList mistakes={ex.mistakes} />
      </section>
      {ex.progression && (
        <section className="sec">
          <h2 className="sec-title">How to progress</h2>
          <p>{ex.progression}</p>
        </section>
      )}
      {ex.alternatives.length > 0 && (
        <section className="sec">
          <h2 className="sec-title">Alternatives</h2>
          <AlternativeList ids={ex.alternatives} />
        </section>
      )}
      <p className="src">
        {mediaStatus(ex)} ID: <code>{ex.id}</code>
      </p>
    </div>
  )
}
