import { useEffect, useRef, useState } from 'react'
import type { Exercise, ExerciseMedia as MediaItem, MediaCredit } from '../../../lib/workout/types'
import { PauseIcon, PlayIcon } from '../shell/icons'
import { ExerciseGlyph } from './ExerciseGlyph'

type Of<K extends MediaItem['kind']> = Extract<MediaItem, { kind: K }>

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function PlayToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button type="button" className="iconbtn media-ctl" aria-label={playing ? 'Pause demo' : 'Play demo'} onClick={onToggle}>
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}

// Two stacked stills cross-faded by CSS. Reduced motion starts on frame 1 and waits for the play button.
function Frames({ media }: { media: Of<'frames'> }) {
  const [playing, setPlaying] = useState(() => !prefersReducedMotion())
  return (
    <>
      <div className={playing ? 'frames is-playing' : 'frames'}>
        <img className="frame f1" src={media.frames[0]} alt={media.alt} loading="lazy" />
        <img className="frame f2" src={media.frames[1]} alt="" loading="lazy" />
      </div>
      <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} />
    </>
  )
}

// The poster is a still, so the heavy gif only loads once it scrolls into view or is tapped.
function Gif({ media }: { media: Of<'gif'> }) {
  const [playing, setPlaying] = useState(false)
  const img = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const el = img.current
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setPlaying(true)
        io.disconnect()
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <>
      <img ref={img} src={playing ? media.src : media.poster} alt={media.alt} loading="lazy" />
      <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} />
    </>
  )
}

// Nothing is requested from YouTube until the button is pressed.
function YouTube({ media }: { media: Of<'youtube'> }) {
  const [loaded, setLoaded] = useState(false)
  if (loaded) {
    const start = media.start ? `?start=${media.start}` : ''
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(media.videoId)}${start}`}
        title={media.title}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="encrypted-media; picture-in-picture"
        allowFullScreen
      />
    )
  }
  return (
    <div className="yt">
      <b>{media.title}</b>
      <small>{media.channel} · loads from YouTube when you play it</small>
      <button type="button" className="btn" onClick={() => setLoaded(true)}>
        Play video
      </button>
    </div>
  )
}

function Credit({ credit }: { credit: MediaCredit }) {
  return (
    <figcaption className="credit">
      {credit.author} · {credit.licence} ·{' '}
      <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">
        Source
      </a>
    </figcaption>
  )
}

export function ExerciseMedia({ exercise }: { exercise: Exercise }) {
  const media = exercise.media[0]
  if (!media) {
    return (
      <figure className="media-fig">
        <div className="media">
          <div className="pending">
            <ExerciseGlyph equipment={exercise.equipment} />
            <b>No demo linked yet</b>
            <p>A demo goes here only when it shows this exact exercise and its licence is checked.</p>
          </div>
        </div>
      </figure>
    )
  }
  return (
    <figure className="media-fig">
      <div className="media">
        {media.kind === 'frames' && <Frames media={media} />}
        {media.kind === 'image' && <img src={media.src} alt={media.alt} loading="lazy" />}
        {media.kind === 'gif' && <Gif media={media} />}
        {media.kind === 'youtube' && <YouTube media={media} />}
      </div>
      {media.kind !== 'youtube' && <Credit credit={media.credit} />}
    </figure>
  )
}
