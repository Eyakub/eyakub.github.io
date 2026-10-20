import { useRef, useState, type ChangeEvent } from 'react'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { downloadBackup, readBackupFile } from '../../../lib/workout/backup'
import type { WorkoutDoc } from '../../../lib/workout/types'
import { Sheet } from '../shell/Sheet'
import { useToast } from '../shell/Toast'

type Confirm = 'import' | 'reset' | null

export function DataGroup({ doc }: { doc: WorkoutDoc }) {
  const { replaceDoc, resetAll } = useWorkout()
  const toast = useToast()
  const [confirm, setConfirm] = useState<Confirm>(null)
  const [incoming, setIncoming] = useState<WorkoutDoc | null>(null)
  const [importFailed, setImportFailed] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const exportBackup = () => {
    downloadBackup(doc, new Date())
    toast('Backup downloaded')
  }

  const pickFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const parsed = await readBackupFile(file)
    setImportFailed(!parsed)
    if (!parsed) return
    setIncoming(parsed)
    setConfirm('import')
  }

  const cancel = () => {
    setConfirm(null)
    setIncoming(null)
  }

  const doImport = () => {
    if (incoming) {
      replaceDoc(incoming)
      toast('Backup restored')
    }
    cancel()
  }

  const doReset = () => {
    setConfirm(null)
    resetAll()
  }

  return (
    <section className="sec">
      <h2>Your data</h2>
      <p className="foot-note">Saved in this browser only.</p>
      <div className="quick">
        <button type="button" className="btn" onClick={exportBackup}>
          Export backup
        </button>
        <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
          Import backup
        </button>
      </div>
      <input ref={fileRef} type="file" accept="application/json" hidden onChange={pickFile} />
      {importFailed && (
        <p className="field-err" role="alert">
          That file isn&apos;t a workout backup.
        </p>
      )}
      <button type="button" className="btn btn-danger btn-wide" onClick={() => setConfirm('reset')}>
        Reset all data
      </button>

      <Sheet open={confirm === 'import'} onClose={cancel} label="Import backup">
        <div className="sheet-head">
          <h2>Import backup</h2>
        </div>
        <p>Replace the data in this browser with this backup?</p>
        <div className="sheet-actions">
          <button type="button" className="btn btn-go" onClick={doImport}>
            Replace data
          </button>
          <button type="button" className="btn btn-quiet" onClick={cancel}>
            Cancel
          </button>
        </div>
      </Sheet>

      <Sheet open={confirm === 'reset'} onClose={() => setConfirm(null)} label="Reset all data">
        <div className="sheet-head">
          <h2>Delete everything?</h2>
        </div>
        <p>This removes your sessions, measurements and settings from this browser. Export a backup first if you want to keep them.</p>
        <div className="sheet-actions">
          <button type="button" className="btn btn-danger" onClick={doReset}>
            Delete all workout data
          </button>
          <button type="button" className="btn btn-quiet" data-autofocus onClick={() => setConfirm(null)}>
            Cancel
          </button>
        </div>
      </Sheet>
    </section>
  )
}
