/**
 * Voz en inglés usando la síntesis de voz del propio dispositivo (Web Speech API).
 * No necesita internet ni archivos de audio. Si el dispositivo no la tiene,
 * los botones de audio simplemente no aparecen.
 */

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

/**
 * Voces por personaje: mujer, hombre o el desconocido (grave y lento, como ronco).
 * Se usan las voces en inglés que tenga el dispositivo; si solo hay una,
 * se distingue cambiando el tono.
 */
export type Voice = 'female' | 'male' | 'villain' | 'neutral'

const FEMALE = /female|woman|samantha|zira|aria|jenny|susan|karen|victoria|moira|tessa|fiona|serena|allison|ava|joanna|salli|kimberly|ivy|emma|libby|sonia|michelle|hazel|catherine|natasha|clara|google us english/i
const MALE = /\bmale\b|\bman\b|david|mark|guy|daniel|alex\b|fred|arthur|thomas|oliver|ryan|christopher|eric|roger|steffan|tom\b|aaron|rishi|gordon|lee\b|george|james|william|brian|matthew|joey|justin|liam/i

let voices: { female: SpeechSynthesisVoice | null; male: SpeechSynthesisVoice | null; any: SpeechSynthesisVoice | null } = { female: null, male: null, any: null }

function pickVoices() {
  if (!canSpeak) return
  const all = window.speechSynthesis.getVoices()
  const en = all.filter((v) => v.lang.toLowerCase().startsWith('en'))
  const us = en.filter((v) => /en[-_]us/i.test(v.lang))
  const pool = [...us, ...en.filter((v) => !us.includes(v))]
  const male = pool.find((v) => MALE.test(v.name) && !/female/i.test(v.name)) ?? null
  const female = pool.find((v) => FEMALE.test(v.name) && v !== male) ?? null
  voices = { female, male, any: female ?? pool[0] ?? null }
}

if (canSpeak) {
  pickVoices()
  window.speechSynthesis.onvoiceschanged = pickVoices
}

/** Voz que corresponde a un personaje según su aspecto (sin género = hombre, como en los dibujos) */
export function voiceOf(look?: { gender?: string } | null): Voice {
  if (!look) return 'neutral'
  return look.gender === 'female' ? 'female' : 'male'
}

/** Limpia el texto para leerlo: quita acotaciones entre paréntesis y cambia ___ por una pausa */
function clean(text: string) {
  return text.replace(/\([^)]*\)/g, '').replace(/_{2,}/g, ' ... ').replace(/\s*→\s*/g, ', ').trim()
}

export function speak(text: string, slow = false, who: Voice = 'neutral') {
  if (!canSpeak) return
  const t = clean(text)
  if (!t) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(t)
  const wantMale = who === 'male' || who === 'villain'
  const v = wantMale ? voices.male : who === 'female' ? voices.female : voices.any
  const chosen = v ?? voices.any
  if (chosen) u.voice = chosen
  u.lang = chosen?.lang ?? 'en-US'
  // Si no hay una voz del género pedido, se cambia el tono de la que hay
  let pitch = 1
  if (wantMale && !voices.male) pitch = 0.7
  if (who === 'female' && !voices.female) pitch = 1.25
  if (who === 'villain') pitch = voices.male ? 0.45 : 0.3
  u.pitch = pitch
  u.rate = (slow ? 0.65 : 0.9) * (who === 'villain' ? 0.8 : 1)
  window.speechSynthesis.speak(u)
}

export function stopSpeaking() {
  if (canSpeak) window.speechSynthesis.cancel()
}

/** Voz automática: las frases se leen solas al aparecer (se puede apagar en el mapa) */
const AUTO_KEY = 'english-combat-autovoice'
export function autoVoiceOn(): boolean {
  try {
    return localStorage.getItem(AUTO_KEY) !== 'off'
  } catch {
    return true
  }
}
export function setAutoVoice(on: boolean) {
  try {
    localStorage.setItem(AUTO_KEY, on ? 'on' : 'off')
  } catch {
    /* sin almacenamiento */
  }
}
