import { useEffect, useRef, type ReactNode } from 'react'
import { sfx } from '../game/sfx'

/** Duración de la entrada (fundido a negro + estática), en milisegundos */
export const MEMORY_ENTER_MS = 1000

/**
 * Filtro de recuerdo (B1): se pone alrededor de cualquier pantalla (exploración, combate, diálogo).
 * Colores apagados con tono morado, viñeta oscura en los bordes y la marca "Recuerdo · 20??".
 * entering: al cargar, fundido desde negro con un destello corto de estática (350 ms) y el sonido 'memory-in'.
 * onEntered se llama cuando termina la entrada.
 * Las escenas de recuerdo (isMemoryScene, en game/memory.ts) se envuelven solas en Explore.
 */
export function MemoryFrame({ children, entering = false, onEntered }: { children: ReactNode; entering?: boolean; onEntered?: () => void }) {
  const done = useRef(onEntered)
  done.current = onEntered
  useEffect(() => {
    if (!entering) return
    sfx('memory-in')
    const id = setTimeout(() => done.current?.(), MEMORY_ENTER_MS)
    return () => clearTimeout(id)
  }, [entering])

  return (
    <div className="relative h-full">
      <div className="h-full" style={{ filter: 'saturate(0.45) brightness(0.9) contrast(0.95)' }}>
        {children}
      </div>
      {/* Tono morado y viñeta (no bloquean los toques) */}
      <div className="pointer-events-none absolute inset-0 z-[60]" style={{ background: '#5b3a8c', mixBlendMode: 'color', opacity: 0.32 }} />
      <div className="pointer-events-none absolute inset-0 z-[60]" style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(8,4,16,0.75) 100%)' }} />
      <p className="pointer-events-none absolute bottom-2 right-3 z-[60] font-display text-xs tracking-wide text-[#d9c7f2]/70">Recuerdo · 20??</p>
      {entering && (
        <>
          <div className="b1-memory-curtain pointer-events-none absolute inset-0 z-[70] bg-black" />
          <StaticBurst delay={450} />
        </>
      )}
    </div>
  )
}

/** Destello corto de estática (ruido SVG), de 350 ms. Con "reducir movimiento" no se muestra */
export function StaticBurst({ delay = 0 }: { delay?: number }) {
  return (
    <svg className="b1-static-burst pointer-events-none absolute inset-0 z-[71] h-full w-full" style={{ animationDelay: `${delay}ms` }} aria-hidden="true">
      <filter id="b1-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#b1-noise)" />
    </svg>
  )
}
