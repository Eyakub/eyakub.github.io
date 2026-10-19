import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { SEED } from '../data/workout/program'
import { toIsoDate } from '../lib/workout/dates'
import { createDoc, logMeasurement, newId, type OnboardingInput } from '../lib/workout/doc'
import { clearDoc, loadDoc, saveDoc } from '../lib/workout/storage'
import type { WorkoutDoc } from '../lib/workout/types'

type Status = 'loading' | 'new' | 'ready'
interface State { status: Status; doc: WorkoutDoc | null }

interface WorkoutValue {
  status: Status
  doc: WorkoutDoc | null
  completeOnboarding: (input: OnboardingInput) => void
  logToday: (patch: { weightKg?: number; waistIn?: number }) => void
  replaceDoc: (doc: WorkoutDoc) => void
  resetAll: () => void
}

const WorkoutContext = createContext<WorkoutValue | null>(null)

export function WorkoutProvider({ children }: { children: ReactNode }) {
  // Starts 'loading' so the server render and the first client render match; localStorage is read after mount.
  const [state, setState] = useState<State>({ status: 'loading', doc: null })
  // Latest doc, so back-to-back updates in one tick build on each other instead of on a stale render.
  const docRef = useRef<WorkoutDoc | null>(null)

  useEffect(() => {
    const doc = loadDoc()
    docRef.current = doc
    setState(doc ? { status: 'ready', doc } : { status: 'new', doc: null })
  }, [])

  const commit = useCallback((doc: WorkoutDoc) => {
    docRef.current = doc
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

  const resetAll = useCallback(() => {
    clearDoc()
    docRef.current = null
    setState({ status: 'new', doc: null })
  }, [])

  const value = useMemo<WorkoutValue>(
    () => ({ status: state.status, doc: state.doc, completeOnboarding, logToday, replaceDoc: commit, resetAll }),
    [state, completeOnboarding, logToday, commit, resetAll],
  )

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
}

export function useWorkout(): WorkoutValue {
  const ctx = useContext(WorkoutContext)
  if (!ctx) throw new Error('useWorkout must be used inside WorkoutProvider')
  return ctx
}
