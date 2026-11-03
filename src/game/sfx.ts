/**
 * Sonidos del juego hechos con el sintetizador del navegador (Web Audio):
 * no hay archivos que descargar y funcionan sin internet.
 */
export type Sfx = 'correct' | 'wrong' | 'hit' | 'hurt' | 'victory' | 'defeat' | 'item' | 'step' | 'static' | 'memory-in' | 'memory-out' | 'fragment-join'

const KEY = 'english-combat-sound'
let ctx: AudioContext | null = null

export function soundOn(): boolean {
  try {
    return localStorage.getItem(KEY) !== 'off'
  } catch {
    return true
  }
}

export function setSound(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* sin almacenamiento */
  }
}

function audio() {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** Una nota corta: frecuencia, inicio y duración en segundos */
function note(a: AudioContext, freq: number, at: number, dur: number, type: OscillatorType = 'triangle', vol = 0.18) {
  const o = a.createOscillator()
  const g = a.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, a.currentTime + at)
  g.gain.setValueAtTime(0.0001, a.currentTime + at)
  g.gain.exponentialRampToValueAtTime(vol, a.currentTime + at + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + at + dur)
  o.connect(g).connect(a.destination)
  o.start(a.currentTime + at)
  o.stop(a.currentTime + at + dur + 0.05)
}

function noise(a: AudioContext, at: number, dur: number, vol = 0.2) {
  const buf = a.createBuffer(1, Math.floor(a.sampleRate * dur), a.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length)
  const s = a.createBufferSource()
  const g = a.createGain()
  g.gain.value = vol
  s.buffer = buf
  s.connect(g).connect(a.destination)
  s.start(a.currentTime + at)
}

/** Ruido blanco filtrado (estática de radio): banda de frecuencias alrededor de freq */
function staticNoise(a: AudioContext, at: number, dur: number, vol = 0.12, freq = 2400, type: BiquadFilterType = 'bandpass') {
  const buf = a.createBuffer(1, Math.floor(a.sampleRate * dur), a.sampleRate)
  const d = buf.getChannelData(0)
  // Crepita: el volumen salta en trozos cortos
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() < 0.85 ? 1 : 0.2) * (1 - i / d.length)
  const s = a.createBufferSource()
  const f = a.createBiquadFilter()
  const g = a.createGain()
  f.type = type
  f.frequency.value = freq
  f.Q.value = 0.8
  g.gain.value = vol
  s.buffer = buf
  s.connect(f).connect(g).connect(a.destination)
  s.start(a.currentTime + at)
}

/** Un tono que se desliza de una frecuencia a otra */
function glide(a: AudioContext, from: number, to: number, at: number, dur: number, type: OscillatorType = 'sine', vol = 0.1) {
  const o = a.createOscillator()
  const g = a.createGain()
  const t = a.currentTime + at
  o.type = type
  o.frequency.setValueAtTime(from, t)
  o.frequency.exponentialRampToValueAtTime(to, t + dur)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(vol, t + 0.05)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(a.destination)
  o.start(t)
  o.stop(t + dur + 0.05)
}

export function sfx(kind: Sfx) {
  if (!soundOn()) return
  const a = audio()
  if (!a) return
  switch (kind) {
    case 'correct':
      note(a, 660, 0, 0.12)
      note(a, 990, 0.09, 0.18)
      break
    case 'wrong':
      note(a, 220, 0, 0.18, 'sawtooth', 0.08)
      note(a, 180, 0.12, 0.22, 'sawtooth', 0.08)
      break
    case 'hit':
      noise(a, 0, 0.12, 0.16)
      note(a, 140, 0, 0.12, 'square', 0.06)
      break
    case 'hurt':
      noise(a, 0, 0.18, 0.12)
      note(a, 120, 0.02, 0.2, 'sawtooth', 0.06)
      break
    case 'victory':
      ;[523, 659, 784, 1047].forEach((f, i) => note(a, f, i * 0.11, 0.22))
      note(a, 1047, 0.46, 0.45, 'triangle', 0.14)
      break
    case 'defeat':
      ;[392, 330, 262, 196].forEach((f, i) => note(a, f, i * 0.16, 0.26, 'triangle', 0.12))
      break
    case 'item':
      ;[880, 1175, 1568].forEach((f, i) => note(a, f, i * 0.07, 0.16, 'sine', 0.12))
      break
    case 'step':
      note(a, 300, 0, 0.04, 'sine', 0.03)
      break
    // ── B1: recuerdos ──
    case 'static':
      staticNoise(a, 0, 0.18, 0.1)
      break
    case 'memory-in':
      staticNoise(a, 0, 0.35, 0.12, 1800)
      glide(a, 320, 90, 0.15, 0.9, 'sine', 0.12)
      break
    case 'memory-out':
      glide(a, 220, 520, 0, 0.75, 'sine', 0.08)
      note(a, 660, 0.55, 0.4, 'sine', 0.05)
      break
    case 'fragment-join':
      glide(a, 440, 660, 0, 0.6, 'triangle', 0.08)
      glide(a, 880, 662, 0, 0.6, 'triangle', 0.06)
      ;[1320, 1760, 2093].forEach((f, i) => note(a, f, 0.6 + i * 0.06, 0.3, 'sine', 0.06))
      staticNoise(a, 0.55, 0.2, 0.06, 3200)
      break
  }
}
