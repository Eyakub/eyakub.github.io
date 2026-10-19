import type { ReactNode } from 'react'
import Head from 'next/head'
import { Archivo, Instrument_Sans, Geist_Mono } from 'next/font/google'
import { WorkoutProvider, useWorkout } from '../../../contexts/WorkoutContext'
import { Onboarding } from '../onboarding/Onboarding'
import { TabBar } from './TabBar'
import { TodaySkeleton } from './TodaySkeleton'
import { ToastProvider } from './Toast'

const display = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-wo-display', display: 'swap' })
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-wo-body', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-wo-mono', display: 'swap' })

function Gate({ children }: { children: ReactNode }) {
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
      <TabBar />
    </div>
  )
}

interface Props { title: string; children: ReactNode }

export function WorkoutLayout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{`${title} · Workout`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#0D1016" />
        {/* viewport-fit=cover is what makes env(safe-area-inset-*) report the notch and home bar */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div className={`wo-root ${display.variable} ${body.variable} ${mono.variable}`} data-theme="dark">
        <WorkoutProvider>
          <ToastProvider>
            <Gate>{children}</Gate>
          </ToastProvider>
        </WorkoutProvider>
      </div>
    </>
  )
}
