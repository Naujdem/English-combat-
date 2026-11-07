import { useEffect, useRef } from 'react'
import { autoVoiceOn, canSpeak, speak, type Voice } from '../game/speech'

/** Botón de bocina que lee el texto en inglés. Un toque: velocidad normal. Dos toques seguidos: más lento. */
export function SpeakButton({ text, size = 'md', label = 'Escuchar en inglés', auto, voice = 'neutral', icon: kind = 'speaker' }: { text: string; size?: 'sm' | 'md' | 'lg'; label?: string; auto?: boolean; voice?: Voice; /** 'pencil': el Cuaderno de L (B1) se lee con un lápiz en vez del altavoz */ icon?: 'speaker' | 'pencil' }) {
  const last = useRef(0)
  // auto: la frase se lee sola cuando aparece (si la voz automática está activada)
  useEffect(() => {
    if (!auto || !canSpeak || !autoVoiceOn()) return
    const t = window.setTimeout(() => speak(text, false, voice), 250)
    return () => window.clearTimeout(t)
  }, [auto, text, voice])
  if (!canSpeak) return null
  const dims = size === 'lg' ? 'h-14 w-14' : size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'
  const icon = size === 'lg' ? 28 : size === 'sm' ? 15 : 18
  return (
    <button
      type="button"
      aria-label={label}
      title="Toca para escuchar. Toca dos veces seguidas para escuchar más lento."
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-[#5d8fd4]/60 bg-[#5d8fd4]/15 text-[#9cc0f0] transition active:scale-90 ${dims}`}
      onClick={(e) => {
        e.stopPropagation()
        const now = Date.now()
        // Dos toques rápidos = más lento
        speak(text, now - last.current < 1200, voice)
        last.current = now
      }}
    >
      {kind === 'pencil' ? (
        <svg width={icon} height={icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 20 L5.2 15.2 L15.8 4.6 Q17 3.4 18.2 4.6 L19.4 5.8 Q20.6 7 19.4 8.2 L8.8 18.8 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M14 6.4 L17.6 10 M5.2 15.2 L8.8 18.8" stroke="currentColor" strokeWidth="2" />
        </svg>
      ) : (
        <svg width={icon} height={icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9 H8 L13 5 V19 L8 15 H4 Z" fill="currentColor" />
          <path d="M16 8.5 Q18.5 12 16 15.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18.5 6 Q22.5 12 18.5 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}
