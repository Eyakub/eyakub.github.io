import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'

interface Props {
  playing: boolean
  atStart: boolean
  atEnd: boolean
  onPrev: () => void
  onPlay: () => void
  onNext: () => void
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export default function PlayerControls({ playing, atStart, atEnd, onPrev, onPlay, onNext }: Props) {
  const { ui } = useLearnPrefs()
  return (
    <div className="controls">
      <button type="button" className="cbtn" id="prev" aria-label={ui('prev')} aria-disabled={atStart || undefined} onClick={atStart ? undefined : onPrev}>
        <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button type="button" className="cbtn play" id="play" onClick={onPlay}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {playing ? (
            <>
              <rect x="6" y="5" width="4.2" height="14" rx="1.2" />
              <rect x="13.8" y="5" width="4.2" height="14" rx="1.2" />
            </>
          ) : atEnd ? (
            <>
              <path d="M12 5a7 7 0 1 1-6.6 4.7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M4 4v5.5h5.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          )}
        </svg>
        <span id="play-label">{ui(playing ? 'pause' : atEnd ? 'again' : 'play')}</span>
      </button>
      <button type="button" className="cbtn" id="next" aria-label={ui('next')} aria-disabled={atEnd || undefined} onClick={atEnd ? undefined : onNext}>
        <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </div>
  )
}
