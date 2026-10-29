import { useEffect, useRef } from 'react'
import { autoVoiceOn, canSpeak, speak } from '../game/speech'

/** Botón de bocina que lee el texto en inglés. Un toque: velocidad normal. Dos toques seguidos: más lento. */
export function SpeakButton({ text, size = 'md', label = 'Escuchar en inglés', auto }: { text: string; size?: 'sm' | 'md' | 'lg'; label?: string; auto?: boolean }) {
  const last = useRef(0)
  // auto: la frase se lee sola cuando aparece (si la voz automática está activada)
  useEffect(() => {
    if (!auto || !canSpeak || !autoVoiceOn()) return
    const t = window.setTimeout(() => speak(text), 250)
    return () => window.clearTimeout(t)
  }, [auto, text])
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
        speak(text, now - last.current < 1200)
        last.current = now
      }}
    >
      <svg width={icon} height={icon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 9 H8 L13 5 V19 L8 15 H4 Z" fill="currentColor" />
        <path d="M16 8.5 Q18.5 12 16 15.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.5 6 Q22.5 12 18.5 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  )
}
