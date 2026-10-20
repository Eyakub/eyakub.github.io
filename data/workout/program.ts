import type { Load, ProgramSeed, RoutineItem, Target } from '../../lib/workout/types'

const BW: Load = { kind: 'bodyweight' }
const DB1: Load = { kind: 'dumbbell', kg: 7.5, count: 1 }
const DB2: Load = { kind: 'dumbbell', kg: 7.5, count: 2 }

function item(
  exerciseId: string,
  sets: number,
  min: number,
  max: number,
  restSec: number,
  load: Load,
  per?: Target['per'],
): RoutineItem {
  const target: Target = per ? { sets, min, max, per } : { sets, min, max }
  return { exerciseId, target, restSec, load }
}

export const SEED: ProgramSeed = {
  routines: [
    {
      routineId: 'push',
      name: 'Push',
      warmup: [
        { name: 'Arm circles', dose: '30 s' },
        { name: 'Shoulder rolls', dose: '30 s' },
        { name: 'Cat-cow', dose: '10 reps' },
        { name: 'Scapular push-ups', dose: '10 reps' },
        { name: 'Easy push-ups', dose: '8 reps' },
      ],
      items: [
        item('decline-push-up', 3, 10, 15, 105, BW),
        item('push-up', 3, 10, 15, 105, BW),
        item('diamond-push-up', 3, 8, 12, 90, BW),
        item('db-shoulder-press', 3, 10, 12, 90, DB2),
        item('db-lateral-raise', 2, 12, 15, 60, DB2),
        item('db-overhead-triceps-extension', 2, 12, 15, 60, DB1),
      ],
    },
    {
      routineId: 'pull',
      name: 'Pull',
      warmup: [
        { name: 'Arm swings', dose: '30 s' },
        { name: 'Shoulder circles', dose: '30 s' },
        { name: 'Scapular pull-ups', dose: '8 reps' },
        { name: 'Light dumbbell rows', dose: '10 reps' },
      ],
      items: [
        item('pull-up', 3, 5, 8, 120, BW),
        item('db-bent-over-row', 3, 10, 12, 90, DB2),
        item('db-single-arm-row', 3, 10, 12, 60, DB1, 'side'),
        item('db-biceps-curl', 3, 10, 12, 60, DB2),
        item('db-hammer-curl', 2, 10, 12, 60, DB2),
        item('dead-hang', 2, 20, 40, 60, BW),
      ],
    },
    {
      routineId: 'legs',
      name: 'Legs + Core',
      warmup: [
        { name: 'Marching or high knees', dose: '30 s' },
        { name: 'Hip circles', dose: '30 s' },
        { name: 'Bodyweight squats', dose: '15 reps' },
        { name: 'Leg swings', dose: '10 / leg' },
      ],
      items: [
        item('db-goblet-squat', 3, 15, 15, 90, DB1),
        item('db-bulgarian-split-squat', 3, 10, 10, 90, DB2, 'leg'),
        item('db-romanian-deadlift', 3, 12, 12, 90, DB2),
        item('standing-calf-raise', 3, 20, 20, 45, BW),
        item('reverse-crunch', 3, 15, 15, 45, BW),
        item('plank', 3, 45, 45, 60, BW),
      ],
    },
    {
      routineId: 'full',
      name: 'Full body',
      warmup: [
        { name: 'Jumping jacks', dose: '30 s' },
        { name: 'Arm swings', dose: '30 s' },
        { name: 'Bodyweight squats', dose: '15 reps' },
        { name: 'Push-up walkouts', dose: '5 reps' },
      ],
      items: [
        item('chin-up', 3, 5, 8, 120, BW),
        item('wide-push-up', 3, 10, 15, 90, BW),
        item('reverse-lunge', 3, 12, 12, 90, DB2, 'leg'),
        item('db-bent-over-row', 3, 12, 12, 90, DB2),
        item('db-shoulder-press', 2, 12, 12, 90, DB2),
        item('dead-bug', 3, 10, 10, 45, BW, 'side'),
      ],
    },
  ],
  order: ['push', 'pull', 'legs', 'full'],
  weeklyGoal: 4,
}
