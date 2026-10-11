import { useEffect, useRef, useState } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { L10n } from '../../../lib/learn/l10n'

export default function FilmButton({ src, note }: { src: string; note?: L10n }) {
  const { ui, t } = useLearnPrefs()
  const [open, setOpen] = useState(false)
  const openBtn = useRef<HTMLButtonElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) openBtn.current?.focus()
      wasOpen.current = false
      return
    }
    wasOpen.current = true
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      void video.play().catch(() => {})
    }
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }
  }, [open])

  return (
    <>
      <div className="film-launch">
        <button ref={openBtn} type="button" className="btn" id="play-motion" onClick={() => setOpen(true)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" fill="currentColor" />
          </svg>
          {ui('playMotion')}
        </button>
        <p>{ui('motionNote')}</p>
      </div>
      {open && (
        <div className="film-back" onClick={() => setOpen(false)}>
          <div
            className="film-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="film-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="film-bar">
              <h2 id="film-title">{ui('motionTitle')}</h2>
              <button ref={closeBtn} type="button" className="btn" onClick={() => setOpen(false)}>{ui('close')}</button>
            </div>
            <video ref={videoRef} src={src} controls playsInline autoPlay muted />
            <p>{note ? t(note) : ui('motionClock')}</p>
          </div>
        </div>
      )}
      <style jsx>{`
        .film-launch {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px 16px;
          padding-bottom: 14px;
        }
        .film-launch p { margin: 0; color: var(--ink-2); max-width: 46ch; }
        .film-back {
          position: fixed;
          inset: 0;
          z-index: 40;
          display: grid;
          place-items: center;
          padding: 24px 16px;
          background: rgba(8, 12, 20, 0.72);
          backdrop-filter: blur(8px);
        }
        .film-dialog {
          width: min(960px, 100%);
          display: grid;
          gap: 12px;
          padding: 16px;
          background: var(--surface);
          color: var(--ink);
          border: 1px solid var(--rule);
          border-radius: var(--r-card);
        }
        .film-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .film-bar h2 { font-size: var(--t-xl); }
        video {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #0c1222;
          border-radius: 16px;
        }
        .film-dialog p { margin: 0; color: var(--ink-2); }
      `}</style>
    </>
  )
}
