import { toIsoDate } from './dates'
import { migrate } from './doc'
import type { WorkoutDoc } from './types'

export function backupFileName(now: Date): string {
  return `workout-backup-${toIsoDate(now)}.json`
}

export function parseBackup(text: string): WorkoutDoc | null {
  try {
    return migrate(JSON.parse(text))
  } catch {
    return null
  }
}

export async function readBackupFile(file: File): Promise<WorkoutDoc | null> {
  try {
    return parseBackup(await file.text())
  } catch {
    return null
  }
}

// A temporary link is the one download path that works in every browser without a dependency.
export function downloadBackup(doc: WorkoutDoc, now: Date): void {
  const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = backupFileName(now)
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
