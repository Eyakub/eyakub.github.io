import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { SEED } from '../data/workout/program'
import { toIsoDate } from '../lib/workout/dates'
import { createDoc, logMeasurement, newId, updateProfile as applyProfile, type OnboardingInput, type ProfilePatch } from '../lib/workout/doc'
import { discardSession as dropActive, finishSession as saveActive, startSession as openSession } from '../lib/workout/session'
import { clearDoc, loadDoc, saveDoc } from '../lib/workout/storage'
import type { ActiveSession, Id, SessionRecord, WorkoutDoc } from '../lib/workout/types'

type Status = 'loading' | 'new' | 'ready'
interface State { status: Status; doc: WorkoutDoc | null }

interface WorkoutValue {
  status: Status
  doc: WorkoutDoc | null
  completeOnboarding: (input: OnboardingInput) => void
  logToday: (patch: { weightKg?: number; waistIn?: number }) => void
  updateProfile: (patch: ProfilePatch) => void
  /** Opens a session on that routine, replacing one already open. */
  startSession: (routineId: Id) => void
  /** Applies a change to the open session and saves it; returning the same object skips the save. */
  updateActive: (fn: (a: ActiveSession, now: Date) => ActiveSession) => void
  /** Saves the open session as a record and returns it, or null if none was open. */
  finishSession: () => SessionRecord | null
  discardSession: () => void
  replaceDoc: (doc: WorkoutDoc) => void
  resetAll: () => void
}

const WorkoutContext = createContext<WorkoutValue | null>(null)

// Each /workout page mounts its own provider. Seeding from the last doc seen this session
// skips the loading state on client-side navigation; first load still starts at 'loading'.
let cachedDoc: WorkoutDoc | null | undefined

function stateFrom(doc: WorkoutDoc | null): State {
  return doc ? { status: 'ready', doc } : { status: 'new', doc: null }
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
  // Starts 'loading' on first load so the server render and the first client render match; localStorage is read after mount.
  const [state, setState] = useState<State>(() => (cachedDoc === undefined ? { status: 'loading', doc: null } : stateFrom(cachedDoc)))
  // Latest doc, so back-to-back updates in one tick build on each other instead of on a stale render.
  const docRef = useRef<WorkoutDoc | null>(cachedDoc ?? null)

  useEffect(() => {
    const doc = loadDoc()
    cachedDoc = doc
    docRef.current = doc
    setState(stateFrom(doc))
  }, [])

  const commit = useCallback((doc: WorkoutDoc) => {
    docRef.current = doc
    cachedDoc = doc
    saveDoc(doc)
    setState({ status: 'ready', doc })
  }, [])

  const completeOnboarding = useCallback(
    (input: OnboardingInput) => commit(createDoc(SEED, input, new Date(), newId())),
    [commit],
  )

  const logToday = useCallback(
    (patch: { weightKg?: number; waistIn?: number }) => {
      const doc = docRef.current
      if (!doc) return
      const now = new Date()
      commit(logMeasurement(doc, toIsoDate(now), patch, now))
    },
    [commit],
  )

  const updateProfile = useCallback(
    (patch: ProfilePatch) => {
      const doc = docRef.current
      if (!doc) return
      commit(applyProfile(doc, patch, new Date()))
    },
    [commit],
  )

  const startSession = useCallback(
    (routineId: Id) => {
      const doc = docRef.current
      if (doc) commit(openSession(doc, routineId, new Date()))
    },
    [commit],
  )

  const updateActive = useCallback(
    (fn: (a: ActiveSession, now: Date) => ActiveSession) => {
      const doc = docRef.current
      if (!doc?.active) return
      const now = new Date()
      const next = fn(doc.active, now)
      if (next !== doc.active) commit({ ...doc, active: { ...next, updatedAt: now.toISOString() } })
    },
    [commit],
  )

  const finishSession = useCallback((): SessionRecord | null => {
    const doc = docRef.current
    if (!doc?.active) return null
    const next = saveActive(doc, new Date())
    commit(next)
    return next.sessions[next.sessions.length - 1]
  }, [commit])

  const discardSession = useCallback(() => {
    const doc = docRef.current
    if (doc) commit(dropActive(doc))
  }, [commit])

  const resetAll = useCallback(() => {
    clearDoc()
    cachedDoc = null
    docRef.current = null
    setState({ status: 'new', doc: null })
  }, [])

  const value = useMemo<WorkoutValue>(
    () => ({
      status: state.status,
      doc: state.doc,
      completeOnboarding,
      logToday,
      updateProfile,
      startSession,
      updateActive,
      finishSession,
      discardSession,
      replaceDoc: commit,
      resetAll,
    }),
    [state, completeOnboarding, logToday, updateProfile, startSession, updateActive, finishSession, discardSession, commit, resetAll],
  )

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
}

export function useWorkout(): WorkoutValue {
  const ctx = useContext(WorkoutContext)
  if (!ctx) throw new Error('useWorkout must be used inside WorkoutProvider')
  return ctx
}
