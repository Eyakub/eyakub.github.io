import { describe, expect, it } from 'vitest'
import { createDoc } from './doc'
import { nextUp } from './rotation'
import {
  addSet,
  adjustRest,
  discardSession,
  elapsedSec,
  endRest,
  finishSession,
  lastPerformance,
  loggedSets,
  pauseClock,
  pauseRest,
  placeholderFor,
  plannedSets,
  readyToProgress,
  removeSet,
  repsLogged,
  restLeft,
  restLines,
  resumeClock,
  resumeRest,
  setStep,
  setValue,
  skipExercise,
  startRest,
  startSession,
  swapExercise,
  swapOptions,
  toggleDone,
  toggleWarmup,
} from './session'
import type { ActiveSession, ProgramSeed, SessionExercise, SessionRecord, WorkoutDoc } from './types'

const BW = { kind: 'bodyweight' } as const
const SEED: ProgramSeed = {
  routines: [
    {
      routineId: 'push',
      name: 'Push',
      warmup: [
        { name: 'Arm circles', dose: '30 s' },
        { name: 'Cat-cow', dose: '10 reps' },
      ],
      items: [
        { exerciseId: 'decline-push-up', target: { sets: 3, min: 10, max: 15 }, restSec: 105, load: BW },
        { exerciseId: 'db-shoulder-press', target: { sets: 3, min: 10, max: 12 }, restSec: 90, load: { kind: 'dumbbell', kg: 7.5, count: 2 } },
        { exerciseId: 'plank', target: { sets: 2, min: 30, max: 45 }, restSec: 60, load: BW },
      ],
    },
    {
      routineId: 'pull',
      name: 'Pull',
      warmup: [],
      items: [
        { exerciseId: 'db-biceps-curl', target: { sets: 3, min: 10, max: 12 }, restSec: 60, load: { kind: 'dumbbell', kg: 7.5, count: 1 } },
        { exerciseId: 'pull-up', target: { sets: 3, min: 5, max: 8 }, restSec: 120, load: BW },
      ],
    },
  ],
  order: ['push', 'pull'],
  weeklyGoal: 4,
}
const INPUT = { weightKg: 80, waistIn: null, heightCm: null, targetWeightKg: null, targetWaistIn: null, equipment: ['dumbbells', 'chair', 'bodyweight'] as const, dumbbellKg: 10 }
const T0 = new Date(2026, 9, 20, 7, 30, 0)
const after = (sec: number, from = T0) => new Date(from.getTime() + sec * 1000)

const BASE = createDoc(SEED, { ...INPUT, equipment: [...INPUT.equipment] }, T0, 'dev')
const begin = (routineId = 'push', doc = BASE): ActiveSession => startSession(doc, routineId, T0).active as ActiveSession
const profile = BASE.profile
// Logs the given values as done sets on one exercise
const logSets = (a: ActiveSession, ex: number, values: number[]) =>
  values.reduce((acc, v, k) => toggleDone(setValue(acc, ex, k, v), ex, k, 0), a)

describe('startSession', () => {
  it('snapshots the current routine version into doc.active', () => {
    const doc = startSession(BASE, 'push', T0)
    const a = doc.active as ActiveSession
    expect(a).toMatchObject({
      routineId: 'push',
      routineVersion: 1,
      routineName: 'Push',
      date: '2026-10-20',
      startedAt: T0.toISOString(),
      elapsedSec: 0,
      runningSince: T0.toISOString(),
      step: -1,
      warmupDone: [false, false],
      rest: null,
    })
    expect(typeof a.id).toBe('string')
    expect(a.exercises).toHaveLength(3)
    expect(a.exercises[0]).toEqual({
      exerciseId: 'decline-push-up',
      name: 'Decline push-up',
      measure: 'reps',
      target: { sets: 3, min: 10, max: 15 },
      load: BW,
      restSec: 105,
      sets: [{ value: null, done: false }, { value: null, done: false }, { value: null, done: false }],
      skipped: false,
    })
    expect(a.exercises[2]).toMatchObject({ measure: 'seconds', sets: [{ value: null, done: false }, { value: null, done: false }] })
  })
  it('follows program.current, not an older version', () => {
    const v2 = { ...BASE.routines[0], version: 2, name: 'Push v2', items: BASE.routines[0].items.slice(0, 1) }
    const doc = { ...BASE, routines: [...BASE.routines, v2], program: { ...BASE.program, current: { ...BASE.program.current, push: 2 } } }
    const a = startSession(doc, 'push', T0).active as ActiveSession
    expect(a).toMatchObject({ routineVersion: 2, routineName: 'Push v2' })
    expect(a.exercises).toHaveLength(1)
  })
  it('does not mutate the doc or share the routine target', () => {
    const before = JSON.stringify(BASE)
    const a = startSession(BASE, 'push', T0).active as ActiveSession
    expect(JSON.stringify(BASE)).toBe(before)
    expect(a.exercises[0].target).not.toBe(BASE.routines[0].items[0].target)
  })
  it('ignores a routine that does not exist', () => {
    expect(startSession(BASE, 'nope', T0)).toBe(BASE)
  })
  it('replaces a session that is already open', () => {
    const second = startSession(startSession(BASE, 'push', T0), 'pull', after(60)).active as ActiveSession
    expect(second.routineId).toBe('pull')
  })
})

describe('clock', () => {
  it('counts whole seconds while running', () => {
    const a = begin()
    expect(elapsedSec(a, T0)).toBe(0)
    expect(elapsedSec(a, after(125.9))).toBe(125)
  })
  it('stops while paused and carries on after resume', () => {
    const a = begin()
    const paused = pauseClock(a, after(125))
    expect(paused.runningSince).toBeNull()
    expect(paused.elapsedSec).toBe(125)
    expect(elapsedSec(paused, after(3600))).toBe(125)
    const resumed = resumeClock(paused, after(600))
    expect(resumed.runningSince).toBe(after(600).toISOString())
    expect(elapsedSec(resumed, after(635))).toBe(160)
    expect(elapsedSec(pauseClock(resumed, after(640)), after(9999))).toBe(165)
  })
  it('keeps the fraction across a pause instead of rounding it away', () => {
    const a = pauseClock(pauseClock(resumeClock(pauseClock(begin(), after(10.5)), after(20)), after(30.5)), after(99))
    expect(elapsedSec(a, after(99))).toBe(21)
  })
  it('pause and resume are no-ops when already in that state', () => {
    const a = begin()
    expect(resumeClock(a, after(5))).toBe(a)
    const paused = pauseClock(a, after(5))
    expect(pauseClock(paused, after(9))).toBe(paused)
  })
  it('pauses a running rest with the clock and resumes it again', () => {
    const resting = startRest(begin(), 90, { exercise: 0, set: 0 }, after(100))
    const paused = pauseClock(resting, after(130))
    expect(paused.rest).toMatchObject({ endsAt: null, leftSec: 60 })
    expect(restLeft(paused.rest!, after(5000))).toBe(60)
    const resumed = resumeClock(paused, after(1000))
    expect(resumed.rest!.endsAt).toBe(after(1060).toISOString())
    expect(restLeft(resumed.rest!, after(1030))).toBe(30)
  })
})

describe('steps and warm-up', () => {
  it('moves between the warm-up (-1) and exercises, ignoring out-of-range steps', () => {
    const a = begin()
    expect(setStep(a, 2).step).toBe(2)
    expect(setStep(setStep(a, 2), -1).step).toBe(-1)
    expect(setStep(a, 3)).toBe(a)
    expect(setStep(a, -2)).toBe(a)
  })
  it('ticks warm-up items on and off', () => {
    const a = toggleWarmup(begin(), 1)
    expect(a.warmupDone).toEqual([false, true])
    expect(toggleWarmup(a, 1).warmupDone).toEqual([false, false])
    expect(toggleWarmup(a, 5)).toBe(a)
  })
})

describe('sets', () => {
  it('setValue writes one set and can clear it', () => {
    const a = setValue(begin(), 0, 1, 12)
    expect(a.exercises[0].sets.map((s) => s.value)).toEqual([null, 12, null])
    expect(setValue(a, 0, 1, null).exercises[0].sets[1].value).toBeNull()
  })
  it('toggleDone stores the fallback when nothing was typed', () => {
    const a = toggleDone(begin(), 0, 0, 14)
    expect(a.exercises[0].sets[0]).toEqual({ value: 14, done: true })
  })
  it('toggleDone keeps a typed value and keeps it when undone', () => {
    const typed = toggleDone(setValue(begin(), 0, 0, 11), 0, 0, 14)
    expect(typed.exercises[0].sets[0]).toEqual({ value: 11, done: true })
    expect(toggleDone(typed, 0, 0, 14).exercises[0].sets[0]).toEqual({ value: 11, done: false })
  })
  it('logging a set on a skipped exercise un-skips it', () => {
    const skipped = skipExercise(begin(), 0)
    expect(skipped.exercises[0].skipped).toBe(true)
    expect(toggleDone(skipped, 0, 0, 10).exercises[0].skipped).toBe(false)
  })
  it('addSet appends an empty set', () => {
    const a = addSet(begin(), 0)
    expect(a.exercises[0].sets).toHaveLength(4)
    expect(a.exercises[0].sets[3]).toEqual({ value: null, done: false })
    expect(a.exercises[0].target.sets).toBe(3)
  })
  it('removeSet drops the last set and never goes below one', () => {
    let a = logSets(begin(), 0, [14, 12, 11])
    a = removeSet(a, 0)
    expect(a.exercises[0].sets.map((s) => s.value)).toEqual([14, 12])
    a = removeSet(removeSet(a, 0), 0)
    expect(a.exercises[0].sets).toHaveLength(1)
    expect(a.exercises[0].sets[0].value).toBe(14)
  })
  it('ignores indexes that do not exist and does not mutate', () => {
    const a = begin()
    const before = JSON.stringify(a)
    expect(setValue(a, 9, 0, 3)).toBe(a)
    expect(toggleDone(a, 0, 9, 3)).toBe(a)
    addSet(a, 0)
    toggleDone(a, 0, 0, 3)
    expect(JSON.stringify(a)).toBe(before)
  })
})

describe('skipExercise', () => {
  it('marks it skipped and moves on to the next exercise', () => {
    const a = skipExercise(setStep(begin(), 0), 0)
    expect(a.exercises[0].skipped).toBe(true)
    expect(a.exercises[1].skipped).toBe(false)
    expect(a.step).toBe(1)
  })
  it('stays on the last exercise', () => {
    const a = skipExercise(setStep(begin(), 2), 2)
    expect(a.exercises[2].skipped).toBe(true)
    expect(a.step).toBe(2)
  })
})

describe('swapExercise', () => {
  it('takes the catalog name and measure, keeps target and rest, and resets the sets', () => {
    const logged = logSets(begin(), 0, [14, 12])
    const a = swapExercise(logged, 0, 'push-up', profile)
    expect(a.exercises[0]).toEqual({
      exerciseId: 'push-up',
      name: 'Push-up',
      measure: 'reps',
      target: { sets: 3, min: 10, max: 15 },
      load: BW,
      restSec: 105,
      sets: [{ value: null, done: false }, { value: null, done: false }, { value: null, done: false }],
      skipped: false,
      swappedFrom: { exerciseId: 'decline-push-up', name: 'Decline push-up' },
    })
  })
  it('resets the sets to the target count, not the count after Add a set', () => {
    const a = swapExercise(addSet(addSet(begin(), 0), 0), 0, 'push-up', profile)
    expect(a.exercises[0].sets).toHaveLength(3)
  })
  it('keeps the original through a second swap, and clears it on the way back', () => {
    const one = swapExercise(begin(), 0, 'push-up', profile)
    const two = swapExercise(one, 0, 'incline-push-up', profile)
    expect(two.exercises[0].swappedFrom).toEqual({ exerciseId: 'decline-push-up', name: 'Decline push-up' })
    const back = swapExercise(two, 0, 'decline-push-up', profile)
    expect(back.exercises[0].exerciseId).toBe('decline-push-up')
    expect(back.exercises[0].name).toBe('Decline push-up')
    expect('swappedFrom' in back.exercises[0]).toBe(false)
  })
  it('goes bodyweight when the new exercise has no dumbbells', () => {
    const a = swapExercise(begin(), 1, 'pike-push-up', profile)
    expect(a.exercises[1].load).toEqual(BW)
  })
  it('keeps an old dumbbell load when the new exercise uses dumbbells', () => {
    const a = swapExercise(begin('pull'), 0, 'db-hammer-curl', profile)
    expect(a.exercises[0].load).toEqual({ kind: 'dumbbell', kg: 7.5, count: 1 })
  })
  it('uses the profile dumbbell weight, two of them, when coming from bodyweight', () => {
    const a = swapExercise(begin('pull'), 1, 'db-bent-over-row', profile)
    expect(a.exercises[1].load).toEqual({ kind: 'dumbbell', kg: 10, count: 2 })
  })
  it('takes the measure of the new exercise', () => {
    const a = swapExercise(begin(), 2, 'side-plank', profile)
    expect(a.exercises[2]).toMatchObject({ name: 'Side plank', measure: 'seconds' })
    expect(swapExercise(begin(), 2, 'dead-bug', profile).exercises[2].measure).toBe('reps')
  })
  it('ignores an unknown exercise and a swap to itself', () => {
    const a = begin()
    expect(swapExercise(a, 0, 'nope', profile)).toEqual(a)
    expect(swapExercise(a, 0, 'decline-push-up', profile)).toEqual(a)
  })
})

describe('swapOptions', () => {
  const ex = (exerciseId: string, extra: Partial<SessionExercise> = {}): SessionExercise =>
    ({ ...begin().exercises[0], exerciseId, ...extra })

  it('lists the alternatives the profile has equipment for', () => {
    expect(swapOptions(ex('decline-push-up'), profile).map((x) => x.id)).toEqual(['push-up', 'pike-push-up'])
    // pull-up needs a bar; negative pull-ups need a bar and a chair; rows need dumbbells
    expect(swapOptions(ex('pull-up'), profile).map((x) => x.id)).toEqual(['db-bent-over-row'])
  })
  it('counts bodyweight even when the profile forgot to list it', () => {
    const bare = { ...profile, equipment: [] }
    expect(swapOptions(ex('decline-push-up'), bare).map((x) => x.id)).toEqual(['push-up', 'pike-push-up'])
    expect(swapOptions(ex('db-shoulder-press'), bare).map((x) => x.id)).toEqual(['pike-push-up'])
    expect(swapOptions(ex('plank'), { ...bare, equipment: [] }).map((x) => x.id)).toEqual(['side-plank', 'dead-bug'])
  })
  it('needs every piece of equipment', () => {
    const noChair = { ...profile, equipment: ['dumbbells' as const] }
    expect(swapOptions(ex('pull-up'), { ...noChair, equipment: ['pull-up-bar'] }).map((x) => x.id)).toEqual(['chin-up'])
    expect(swapOptions(ex('db-bulgarian-split-squat'), noChair).map((x) => x.id)).toEqual(['split-squat', 'reverse-lunge'])
  })
  it('leaves the original out, because it has its own Back button', () => {
    const swapped = ex('push-up', { swappedFrom: { exerciseId: 'decline-push-up', name: 'Decline push-up' } })
    expect(swapOptions(swapped, profile).map((x) => x.id)).toEqual(['incline-push-up', 'wide-push-up'])
  })
  it('is empty for an exercise the catalog does not know', () => {
    expect(swapOptions(ex('nope'), profile)).toEqual([])
  })
})

describe('rest', () => {
  const resting = (total = 90, at0 = T0) => startRest(begin(), total, { exercise: 0, set: 1 }, at0)

  it('starts a countdown from now', () => {
    const rest = resting().rest!
    expect(rest).toEqual({ totalSec: 90, endsAt: after(90).toISOString(), leftSec: 90, after: { exercise: 0, set: 1 } })
    expect(restLeft(rest, T0)).toBe(90)
    expect(restLeft(rest, after(30))).toBe(60)
  })
  it('reaches 0 at the end time and stays there', () => {
    const rest = resting().rest!
    expect(restLeft(rest, after(90))).toBe(0)
    expect(restLeft(rest, after(500))).toBe(0)
  })
  it('a new rest replaces the old one', () => {
    const next = startRest(resting(), 60, { exercise: 1, set: 0 }, after(20))
    expect(next.rest).toMatchObject({ totalSec: 60, after: { exercise: 1, set: 0 } })
    expect(restLeft(next.rest!, after(20))).toBe(60)
  })
  it('pause freezes what is left and resume counts down from there', () => {
    const paused = pauseRest(resting(), after(40))
    expect(paused.rest).toMatchObject({ endsAt: null, leftSec: 50 })
    expect(restLeft(paused.rest!, after(4000))).toBe(50)
    expect(pauseRest(paused, after(41))).toBe(paused)
    const resumed = resumeRest(paused, after(100))
    expect(resumed.rest!.endsAt).toBe(after(150).toISOString())
    expect(restLeft(resumed.rest!, after(120))).toBe(30)
    expect(resumeRest(resumed, after(121))).toBe(resumed)
  })
  it('cannot pause a rest that already ran out', () => {
    const a = resting()
    expect(pauseRest(a, after(95))).toBe(a)
  })
  it('adjusts the remaining time, running or paused', () => {
    const a = resting()
    const less = adjustRest(a, -15, after(30))
    expect(restLeft(less.rest!, after(30))).toBe(45)
    expect(less.rest!.endsAt).toBe(after(75).toISOString())
    const paused = adjustRest(pauseRest(a, after(30)), 15, after(50))
    expect(paused.rest).toMatchObject({ endsAt: null, leftSec: 75 })
  })
  it('never goes below 1 s', () => {
    const a = adjustRest(resting(), -15, after(80))
    expect(restLeft(a.rest!, after(80))).toBe(1)
    expect(restLeft(adjustRest(resting(), -500, after(5)).rest!, after(5))).toBe(1)
  })
  it('grows the total when more time is added than it had', () => {
    const grown = adjustRest(resting(), 15, after(10))
    expect(restLeft(grown.rest!, after(10))).toBe(95)
    expect(grown.rest!.totalSec).toBe(95)
    const shorter = adjustRest(resting(), 15, after(30))
    expect(shorter.rest!.totalSec).toBe(90)
  })
  it('adding time after it ran out starts a fresh countdown', () => {
    const a = adjustRest(resting(), 15, after(200))
    expect(restLeft(a.rest!, after(200))).toBe(15)
  })
  it('endRest clears it, and everything is a no-op without a rest', () => {
    expect(endRest(resting()).rest).toBeNull()
    const a = begin()
    expect(pauseRest(a, T0)).toBe(a)
    expect(resumeRest(a, T0)).toBe(a)
    expect(adjustRest(a, 15, T0)).toBe(a)
    expect(endRest(a)).toBe(a)
  })
  it('does not mutate the session it was given', () => {
    const a = begin()
    const before = JSON.stringify(a)
    adjustRest(startRest(a, 60, { exercise: 0, set: 0 }, T0), 15, T0)
    expect(JSON.stringify(a)).toBe(before)
  })
})

describe('restLines', () => {
  it('points at the next set of the same exercise', () => {
    const a = logSets(begin(), 0, [14])
    expect(restLines(a, { exercise: 0, set: 0 })).toEqual({ label: 'After set 1 of decline push-up', next: 'Next: set 2, 10–15' })
  })
  it('points at the first set not done yet, wherever it is', () => {
    const a = toggleDone(begin(), 0, 1, 12)
    expect(restLines(a, { exercise: 0, set: 1 }).next).toBe('Next: set 1, 10–15')
  })
  it('names the next exercise once every set is done', () => {
    const a = logSets(begin(), 0, [14, 12, 11])
    expect(restLines(a, { exercise: 0, set: 2 })).toEqual({ label: 'After set 3 of decline push-up', next: 'Next: Dumbbell shoulder press' })
  })
  it('says so after the last set of the last exercise', () => {
    const a = logSets(begin(), 2, [30, 30])
    expect(restLines(a, { exercise: 2, set: 1 }).next).toBe('That was the last set. Finish when ready.')
  })
  it('spells out seconds and sides', () => {
    const a = begin()
    const timed = { ...a, exercises: a.exercises.map((e, i) => (i === 2 ? { ...e, target: { ...e.target, per: 'side' as const } } : e)) }
    expect(restLines(timed, { exercise: 2, set: 0 }).next).toBe('Next: set 1, 30–45 s each side')
  })
})

describe('finishSession', () => {
  const FINISH = after(41 * 60)

  it('turns the open session into a record, exactly as logged', () => {
    let a = begin()
    a = logSets(a, 0, [14, 12, 11])
    a = swapExercise(a, 1, 'pike-push-up', profile)
    a = toggleDone(setValue(a, 1, 0, 8), 1, 0, 0)
    a = skipExercise(a, 2)
    const doc = finishSession({ ...BASE, active: a }, FINISH)
    expect(doc.active).toBeNull()
    expect(doc.sessions).toHaveLength(1)
    const rec = doc.sessions[0]
    expect(rec).toMatchObject({
      id: a.id,
      date: '2026-10-20',
      routineId: 'push',
      routineVersion: 1,
      routineName: 'Push',
      startedAt: T0.toISOString(),
      finishedAt: FINISH.toISOString(),
      durationSec: 41 * 60,
      updatedAt: FINISH.toISOString(),
    })
    expect(rec.exercises).toEqual(a.exercises)
    expect(rec.exercises[1]).toMatchObject({ name: 'Pike push-up', swappedFrom: { exerciseId: 'db-shoulder-press' } })
    expect(rec.exercises[1].sets.map((s) => s.done)).toEqual([true, false, false])
    expect(rec.exercises[2].skipped).toBe(true)
  })
  it('counts training time only, not the time paused', () => {
    const paused = pauseClock(begin(), after(600))
    const resumed = resumeClock(paused, after(5000))
    const doc = finishSession({ ...BASE, active: resumed }, after(5300))
    expect(doc.sessions[0].durationSec).toBe(900)
  })
  it('keeps the local start date even when finished after midnight', () => {
    const late = new Date(2026, 9, 20, 23, 50)
    const doc = startSession(BASE, 'push', late)
    const next = finishSession(doc, new Date(2026, 9, 21, 0, 20))
    expect(next.sessions[0].date).toBe('2026-10-20')
    expect(next.sessions[0].durationSec).toBe(30 * 60)
  })
  it('moves the rotation on to the next routine', () => {
    expect(nextUp(BASE)).toBe('push')
    const afterPush = finishSession(startSession(BASE, 'push', T0), FINISH)
    expect(nextUp(afterPush)).toBe('pull')
    const afterPull = finishSession(startSession(afterPush, 'pull', after(86400)), after(86400 + 1800))
    expect(afterPull.sessions).toHaveLength(2)
    expect(nextUp(afterPull)).toBe('push')
  })
  it('appends without touching earlier sessions, and does not mutate the input', () => {
    const first = finishSession(startSession(BASE, 'push', T0), FINISH)
    const open = startSession(first, 'pull', after(86400))
    const before = JSON.stringify(open)
    const second = finishSession(open, after(87000))
    expect(JSON.stringify(open)).toBe(before)
    expect(second.sessions[0]).toBe(first.sessions[0])
    expect(second.sessions).toHaveLength(2)
  })
  it('does nothing without an open session', () => {
    expect(finishSession(BASE, FINISH)).toBe(BASE)
  })
})

describe('discardSession', () => {
  it('drops the open session and records nothing', () => {
    const doc = startSession(BASE, 'push', T0)
    const out = discardSession({ ...doc, active: logSets(doc.active!, 0, [14, 12]) })
    expect(out.active).toBeNull()
    expect(out.sessions).toEqual([])
    expect(nextUp(out)).toBe('push')
  })
  it('is a no-op without an open session', () => {
    expect(discardSession(BASE)).toBe(BASE)
  })
})

describe('lastPerformance', () => {
  const rec = (finishedAt: string, exercises: Partial<SessionExercise>[], id = finishedAt): SessionRecord => ({
    id,
    date: finishedAt.slice(0, 10),
    routineId: 'push',
    routineVersion: 1,
    routineName: 'Push',
    startedAt: finishedAt,
    finishedAt,
    durationSec: 2400,
    exercises: exercises.map((e) => ({ ...begin().exercises[0], ...e })),
    updatedAt: finishedAt,
  })
  const sets = (...v: (number | null)[]) => v.map((value) => ({ value, done: true }))
  const withSessions = (...sessions: SessionRecord[]): WorkoutDoc => ({ ...BASE, sessions })

  it('is null when it was never done', () => {
    expect(lastPerformance(BASE, 'decline-push-up')).toBeNull()
    expect(lastPerformance(withSessions(rec('2026-10-05T09:00:00.000Z', [{ exerciseId: 'plank' }])), 'decline-push-up')).toBeNull()
  })
  it('returns the done values from the most recent session, whatever the list order', () => {
    const newer = rec('2026-10-12T09:00:00.000Z', [{ sets: sets(12, 11, 10) }])
    const older = rec('2026-10-05T09:00:00.000Z', [{ sets: sets(9, 9, 9) }])
    expect(lastPerformance(withSessions(newer, older), 'decline-push-up')).toEqual([12, 11, 10])
    expect(lastPerformance(withSessions(older, newer), 'decline-push-up')).toEqual([12, 11, 10])
  })
  it('ignores a session where the exercise was skipped and falls back to the one before', () => {
    const skipped = rec('2026-10-12T09:00:00.000Z', [{ skipped: true, sets: [{ value: null, done: false }] }])
    const older = rec('2026-10-05T09:00:00.000Z', [{ sets: sets(10, 10, 9) }])
    expect(lastPerformance(withSessions(older, skipped), 'decline-push-up')).toEqual([10, 10, 9])
    expect(lastPerformance(withSessions(skipped), 'decline-push-up')).toBeNull()
  })
  it('ignores a skipped exercise even if it has done sets, and keeps only done sets with a value', () => {
    const odd = rec('2026-10-12T09:00:00.000Z', [{ skipped: true, sets: sets(15, 15, 15) }])
    expect(lastPerformance(withSessions(odd), 'decline-push-up')).toBeNull()
    const mixed = rec('2026-10-13T09:00:00.000Z', [
      { sets: [{ value: 12, done: true }, { value: 11, done: false }, { value: null, done: true }, { value: 10, done: true }] },
    ])
    expect(lastPerformance(withSessions(mixed), 'decline-push-up')).toEqual([12, 10])
  })
  it('skips a session where no set was done', () => {
    const none = rec('2026-10-12T09:00:00.000Z', [{ sets: [{ value: 10, done: false }] }])
    const older = rec('2026-10-05T09:00:00.000Z', [{ sets: sets(8, 8) }])
    expect(lastPerformance(withSessions(older, none), 'decline-push-up')).toEqual([8, 8])
  })
})

describe('readyToProgress / placeholderFor', () => {
  const target = { sets: 3, min: 10, max: 15 }

  it('is ready once every set last time reached the top of the range', () => {
    expect(readyToProgress([15, 15, 15], target)).toBe(true)
    expect(readyToProgress([16, 15, 15, 15], target)).toBe(true)
  })
  it('is not ready if any set fell short, or there were too few sets', () => {
    expect(readyToProgress([15, 15, 14], target)).toBe(false)
    expect(readyToProgress([15, 15], target)).toBe(false)
    expect(readyToProgress([], target)).toBe(false)
    expect(readyToProgress(null, target)).toBe(false)
  })
  it('works for a fixed target', () => {
    expect(readyToProgress([45, 45], { sets: 2, min: 45, max: 45 })).toBe(true)
  })
  it('placeholder is last time for that set, else the top of the range', () => {
    expect(placeholderFor([14, 12], target, 1)).toBe(12)
    expect(placeholderFor([14, 12], target, 2)).toBe(15)
    expect(placeholderFor(null, target, 0)).toBe(15)
  })
})

describe('totals', () => {
  it('counts logged and planned sets, and moves with add and remove', () => {
    let a = logSets(begin(), 0, [14, 12])
    expect(loggedSets(a)).toBe(2)
    expect(plannedSets(a)).toBe(8)
    a = addSet(a, 1)
    expect(plannedSets(a)).toBe(9)
    a = removeSet(removeSet(a, 0), 0)
    expect(plannedSets(a)).toBe(7)
  })
  it('counts reps from done sets only, and leaves out timed exercises', () => {
    let a = logSets(begin(), 0, [14, 12])
    a = toggleDone(setValue(a, 0, 2, 11), 0, 2, 0)
    a = toggleDone(setValue(a, 0, 2, 11), 0, 2, 0) // done, then undone again
    a = logSets(a, 2, [40, 35])
    expect(repsLogged(a)).toBe(26)
    expect(loggedSets(a)).toBe(4)
  })
  it('works on a saved record too', () => {
    const doc = finishSession({ ...BASE, active: logSets(begin(), 0, [10, 10, 10]) }, after(60))
    expect(loggedSets(doc.sessions[0])).toBe(3)
    expect(repsLogged(doc.sessions[0])).toBe(30)
  })
})
