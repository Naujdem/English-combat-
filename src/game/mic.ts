import { normalizeAnswer } from './text'

/**
 * Reconocimiento de voz del navegador (Chrome en Android y escritorio).
 * Necesita internet y permiso del micrófono; el audio lo procesa el servicio del navegador.
 */
type Rec = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  abort: () => void
}

const Ctor: (new () => Rec) | undefined =
  typeof window !== 'undefined'
    ? ((window as unknown as { SpeechRecognition?: new () => Rec }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: new () => Rec }).webkitSpeechRecognition)
    : undefined

export const canRecognize = !!Ctor

export type HearResult = { ok: true; heard: string[] } | { ok: false; error: string }

/** Escucha una frase en inglés y devuelve lo que entendió (varias opciones) */
export function hear(): { promise: Promise<HearResult>; stop: () => void } {
  if (!Ctor) return { promise: Promise.resolve({ ok: false, error: 'unsupported' }), stop: () => {} }
  const r = new Ctor()
  r.lang = 'en-US'
  r.interimResults = false
  r.maxAlternatives = 4
  let settled = false
  const promise = new Promise<HearResult>((resolve) => {
    r.onresult = (e) => {
      settled = true
      const alts = Array.from(e.results[0] ?? []).map((a) => a.transcript)
      resolve({ ok: true, heard: alts })
    }
    r.onerror = (e) => {
      if (settled) return
      settled = true
      resolve({ ok: false, error: e.error })
    }
    r.onend = () => {
      if (!settled) {
        settled = true
        resolve({ ok: false, error: 'no-speech' })
      }
    }
  })
  try {
    r.start()
  } catch {
    return { promise: Promise.resolve({ ok: false, error: 'start' }), stop: () => {} }
  }
  return { promise, stop: () => r.abort() }
}

/** Qué tanto se parece lo dicho a lo esperado: palabras en orden (0 a 1) */
export function speechScore(said: string, expected: string): number {
  const a = normalizeAnswer(said).split(' ').filter(Boolean)
  const b = normalizeAnswer(expected).split(' ').filter(Boolean)
  if (!b.length) return 0
  // Subsecuencia común más larga, palabra por palabra
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0))
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1])
  return dp[a.length][b.length] / b.length
}

export function micErrorText(error: string) {
  if (error === 'not-allowed' || error === 'service-not-allowed') return 'El micrófono no tiene permiso. Actívalo en el navegador para hablar.'
  if (error === 'network') return 'Para reconocer la voz se necesita internet.'
  if (error === 'no-speech') return 'No te escuché. Toca el micrófono y habla cerca del celular.'
  if (error === 'audio-capture') return 'No se encontró un micrófono.'
  return 'No se pudo usar el micrófono.'
}
