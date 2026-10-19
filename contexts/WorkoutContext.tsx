import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { SEED } from '../data/workout/program'
import { toIsoDate } from '../lib/workout/dates'
import { createDoc, logMeasurement, newId, updateProfile as applyProfile, type OnboardingInput, type ProfilePatch } from '../lib/workout/doc'
import { clearDoc, loadDoc, saveDoc } from '../lib/workout/storage'
import type { WorkoutDoc } from '../lib/workout/types'

type Status = 'loading' | 'new' | 'ready'
interface State { status: Status; doc: WorkoutDoc | null }

interface WorkoutValue {
  status: Status
  doc: WorkoutDoc | null
  completeOnboarding: (input: OnboardingInput) => void
  logToday: (patch: { weightKg?: number; waistIn?: number }) => void
  updateProfile: (patch: ProfilePatch) => void
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

  const resetAll = useCallback(() => {
    clearDoc()
    cachedDoc = null
    docRef.current = null
    setState({ status: 'new', doc: null })
  }, [])

  const value = useMemo<WorkoutValue>(
    () => ({ status: state.status, doc: state.doc, completeOnboarding, logToday, updateProfile, replaceDoc: commit, resetAll }),
    [state, completeOnboarding, logToday, updateProfile, commit, resetAll],
  )

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
}

export function useWorkout(): WorkoutValue {
  const ctx = useContext(WorkoutContext)
  if (!ctx) throw new Error('useWorkout must be used inside WorkoutProvider')
  return ctx
}
