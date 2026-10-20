import type { ReactNode } from 'react'
import Head from 'next/head'
import { Sofia_Sans, Sofia_Sans_Extra_Condensed } from 'next/font/google'
import { WorkoutProvider, useWorkout } from '../../../contexts/WorkoutContext'
import { Onboarding } from '../onboarding/Onboarding'
import { TabBar } from './TabBar'
import { TodaySkeleton } from './TodaySkeleton'
import { ToastProvider } from './Toast'

const body = Sofia_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-wo-body', display: 'swap' })
const display = Sofia_Sans_Extra_Condensed({ subsets: ['latin'], weight: ['700', '800'], style: ['normal', 'italic'], variable: '--font-wo-display', display: 'swap' })

function Gate({ children, bare }: { children: ReactNode; bare: boolean }) {
  const { status } = useWorkout()
  if (status === 'loading') {
    return (
      <div className="app">
        <main className="viewport">
          <TodaySkeleton />
        </main>
      </div>
    )
  }
  if (status === 'new') {
    return (
      <div className="app">
        <main className="viewport">
          <Onboarding />
        </main>
      </div>
    )
  }
  return (
    <div className="app">
      <main className="viewport">{children}</main>
      {!bare && <TabBar />}
    </div>
  )
}

interface Props {
  title: string
  children: ReactNode
  /** Hides the tab bar, for a screen that takes over the whole phone (a workout in progress). */
  bare?: boolean
}

export function WorkoutLayout({ title, children, bare = false }: Props) {
  return (
    <>
      <Head>
        <title>{`${title} · Workout`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#1E1F22" />
        {/* viewport-fit=cover is what makes env(safe-area-inset-*) report the notch and home bar */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div className={`wo-root ${display.variable} ${body.variable}`}>
        <WorkoutProvider>
          <ToastProvider>
            <Gate bare={bare}>{children}</Gate>
          </ToastProvider>
        </WorkoutProvider>
      </div>
    </>
  )
}
