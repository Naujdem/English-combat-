import { useEffect, useRef, useState, type ReactNode } from 'react'
import { sfx } from '../game/sfx'
import { SpeakButton } from './SpeakButton'
import { btnPrimary } from './ui'

/** Duración de la entrada a una Ventana (destello azul + año), en milisegundos */
export const WINDOW_ENTER_MS = 1600

/**
 * Filtro de Ventana (B2, ficha 0.3): el mismo filtro de los recuerdos de B1 (MemoryFrame), pero con tono azul
 * y sin bordes oscuros, porque es el futuro real y no un recuerdo. Las caras de los NPC se ven normales.
 * entering: el reloj se ilumina, destello azul y el letrero con el año (por ejemplo, "2061"). onEntered al terminar.
 */
export function WindowFrame({ children, year, entering = false, onEntered }: { children: ReactNode; year: number; entering?: boolean; onEntered?: () => void }) {
  const done = useRef(onEntered)
  done.current = onEntered
  useEffect(() => {
    if (!entering) return
    sfx('memory-in')
    const id = setTimeout(() => done.current?.(), WINDOW_ENTER_MS)
    return () => clearTimeout(id)
  }, [entering])

  return (
    <div className="relative h-full">
      <div className="h-full" style={{ filter: 'saturate(0.7) brightness(0.95)' }}>
        {children}
      </div>
      {/* Tono azul (no bloquea los toques) */}
      <div className="pointer-events-none absolute inset-0 z-[60]" style={{ background: '#1f6fd1', mixBlendMode: 'color', opacity: 0.28 }} />
      <p className="pointer-events-none absolute bottom-2 right-3 z-[60] font-display text-xs tracking-wide text-[#bfe2ff]/75">Ventana · {year}</p>
      {entering && (
        <>
          <div className="b2-window-flash pointer-events-none absolute inset-0 z-[70]" style={{ background: 'radial-gradient(circle at center, #e8f5ff 0%, #3fa9ff 45%, #0b2a4d 100%)' }} />
          <p className="b2-window-year pointer-events-none absolute inset-0 z-[71] flex items-center justify-center font-display text-5xl text-white drop-shadow-[0_0_12px_#3fa9ff]">{year}</p>
        </>
      )}
    </div>
  )
}

/**
 * Regla de las Ventanas: nadie oye al protagonista. Si intenta hablar, su texto sale como "…" en azul tenue.
 * Se usa en lugar de la línea del protagonista dentro de una Ventana (menos en la 13, donde recupera la voz).
 */
export function UnheardLine({ tried }: { tried?: string }) {
  return (
    <p className="text-[17px] italic text-[#8fcbff]/60" aria-label={tried ? `Intentas decir: ${tried}. Nadie te oye.` : 'Nadie te oye.'}>
      …
      <span className="ml-2 align-middle text-xs not-italic text-paper/45">(Nadie te oye.)</span>
    </p>
  )
}

/**
 * Salida de una Ventana (ficha 0.3): fundido azul y "vuelves al presente". Al seguir se guarda lo que haga falta (onDone).
 * El protagonista ya no siente dolor de garganta, a diferencia de los recuerdos de B1.
 */
export function WindowExit({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'fade' | 'back'>('fade')
  useEffect(() => {
    if (phase !== 'fade') return
    const id = setTimeout(() => {
      sfx('memory-out')
      setPhase('back')
    }, 1000)
    return () => clearTimeout(id)
  }, [phase])
  if (phase === 'fade')
    return (
      <div className="fixed inset-0 z-[90]" aria-hidden="true">
        <div className="b2-fade-blue absolute inset-0 bg-[#0b2a4d]" />
      </div>
    )
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0b2a4d] px-4" role="dialog" aria-label="Vuelves al presente">
      <div className="anim-fade-in w-full max-w-sm text-center">
        <p className="text-[18px] text-paper/90">(The light fades. You're back in the present.)</p>
        <p className="mt-1 text-sm text-paper/60">(La luz se apaga. Vuelves al presente.)</p>
        <div className="mt-2 flex justify-center"><SpeakButton text="The light fades. You're back in the present." size="sm" /></div>
        <button className={`${btnPrimary} mt-5 w-full`} onClick={onDone}>Continuar</button>
      </div>
    </div>
  )
}

