import type { GetStaticPaths, GetStaticProps } from 'next'
import { EXERCISES, EXERCISE_BY_ID } from '../../../data/workout/exercises'
import { ExerciseDetailView } from '../../../components/workout/library/ExerciseDetailView'
import { WorkoutLayout } from '../../../components/workout/shell/WorkoutLayout'

interface Props { id: string }

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: EXERCISES.map((e) => ({ params: { id: e.id } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => ({ props: { id: params!.id as string } })

export default function WorkoutExercise({ id }: Props) {
  return (
    <WorkoutLayout title={EXERCISE_BY_ID[id].name}>
      <ExerciseDetailView key={id} id={id} />
    </WorkoutLayout>
  )
}
