// The rest-over chime: three short notes. Browsers only let audio start after a tap, so the context is
// created and resumed from the first click in the session (unlockAudio); playChime then works unprompted.
type AudioCtor = typeof AudioContext

let ctx: AudioContext | null = null

function context(): AudioContext | null {
  if (ctx) return ctx
  const Ctor: AudioCtor | undefined = window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext
  if (!Ctor) return null
  try {
    ctx = new Ctor()
  } catch {
    return null
  }
  return ctx
}

export function unlockAudio(): void {
  const c = context()
  if (c && c.state !== 'running') void c.resume().catch(() => {})
}

export function playChime(): void {
  const c = context()
  if (!c) return
  if (c.state !== 'running') void c.resume().catch(() => {})
  ;[0, 0.18, 0.36].forEach((delay, i) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    const t = c.currentTime + delay
    osc.frequency.value = i === 2 ? 1175 : 880
    osc.connect(gain)
    gain.connect(c.destination)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
    osc.start(t)
    osc.stop(t + 0.16)
  })
}

export function buzz(): void {
  if ('vibrate' in navigator) navigator.vibrate([120, 80, 120])
}
