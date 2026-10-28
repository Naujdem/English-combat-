/**
 * Voz en inglés usando la síntesis de voz del propio dispositivo (Web Speech API).
 * No necesita internet ni archivos de audio. Si el dispositivo no la tiene,
 * los botones de audio simplemente no aparecen.
 */

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

let voice: SpeechSynthesisVoice | null = null

function pickVoice() {
  if (!canSpeak) return
  const voices = window.speechSynthesis.getVoices()
  voice =
    voices.find((v) => v.lang === 'en-US' && /female|samantha|zira|google/i.test(v.name)) ??
    voices.find((v) => v.lang === 'en-US') ??
    voices.find((v) => v.lang.startsWith('en')) ??
    null
}

if (canSpeak) {
  pickVoice()
  window.speechSynthesis.onvoiceschanged = pickVoice
}

/** Limpia el texto para leerlo: quita acotaciones entre paréntesis y cambia ___ por una pausa */
function clean(text: string) {
  return text.replace(/\([^)]*\)/g, '').replace(/_{2,}/g, ' ... ').trim()
}

export function speak(text: string, slow = false) {
  if (!canSpeak) return
  const t = clean(text)
  if (!t) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(t)
  u.lang = voice?.lang ?? 'en-US'
  if (voice) u.voice = voice
  u.rate = slow ? 0.65 : 0.9
  window.speechSynthesis.speak(u)
}

export function stopSpeaking() {
  if (canSpeak) window.speechSynthesis.cancel()
}
