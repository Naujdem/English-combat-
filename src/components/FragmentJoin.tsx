import { useEffect, useState } from 'react'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { sfx } from '../game/sfx'
import { memoryOpenId } from '../data/b1World'
import { StaticBurst } from './MemoryFrame'

/** Se guarda en `opened` la primera vez que se ve la animación (después sale el texto corto) */
export const FRAGMENTS_FIRST = 'b1-fragments-first'
const ANIM_MS = 2500

/**
 * Dos fragmentos se juntan (B1, ficha 0.4). Tarjeta a pantalla completa de ~2.5 s: dos astillas luminosas se acercan,
 * se unen en una pieza doble, brillan, destello de estática y sonido 'fragment-join'. Tocar salta la animación.
 * La primera vez sale el texto largo ("…but it's not yours"); las siguientes, el corto.
 * memoryNumber: al terminar, el recuerdo con ese número queda abierto en el mapa.
 * preview (modo profesor): solo se ve, no guarda nada.
 */
export function FragmentJoin({ state, update, memoryNumber, onDone, preview }: { state: GameState; update: Update; memoryNumber?: number; onDone: () => void; preview?: 'first' | 'next' }) {
  const [first] = useState(() => (preview ? preview === 'first' : !state.opened.includes(FRAGMENTS_FIRST)))
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    const s = setTimeout(() => sfx('fragment-join'), 350)
    const e = setTimeout(() => setEnded(true), ANIM_MS)
    return () => {
      clearTimeout(s)
      clearTimeout(e)
    }
  }, [])

  function finish() {
    if (!preview) {
      const add = [FRAGMENTS_FIRST, ...(memoryNumber ? [memoryOpenId(memoryNumber)] : [])]
      update((s) => {
        const fresh = add.filter((x) => !s.opened.includes(x))
        return fresh.length ? { ...s, opened: [...s.opened, ...fresh] } : s
      })
    }
    onDone()
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex cursor-pointer items-center justify-center bg-[#07040d] px-4"
      role="dialog"
      aria-label="Dos fragmentos se juntaron"
      onClick={() => (ended ? finish() : setEnded(true))}
    >
      {!ended && <StaticBurst delay={1300} />}
      <div className="relative w-full max-w-sm text-center">
        <FragmentPair joined={ended} />
        {ended && (
          <div className="anim-fade-in">
            {first ? (
              <>
                <p className="mt-4 rounded-xl border-2 border-[#9b6ad6] bg-[#9b6ad6]/20 px-3 py-3 font-display text-lg text-[#e6d6ff]">Two fragments joined. They hold a memory... but it's not yours.</p>
                <p className="mt-1 text-sm text-paper/60">Dos fragmentos se juntaron. Guardan un recuerdo... pero no es tuyo.</p>
              </>
            ) : (
              <>
                <p className="mt-4 font-display text-lg text-[#e6d6ff]">Two fragments joined.</p>
                <p className="mt-1 text-sm text-paper/60">Dos fragmentos se juntaron.</p>
              </>
            )}
            <p className="mt-5 text-xs text-paper/45">Toca para seguir</p>
          </div>
        )}
        {!ended && <p className="mt-6 text-xs text-paper/35">Toca para saltar</p>}
      </div>
    </div>
  )
}

/** Las dos astillas. Sin animación (o con "reducir movimiento") ya se ven unidas, que es la posición final */
function FragmentPair({ joined }: { joined: boolean }) {
  return (
    <svg viewBox="0 0 120 90" className={`mx-auto h-36 w-48 ${joined ? 'b1-frag-joined' : ''}`} aria-hidden="true">
      <defs>
        <radialGradient id="b1-frag-glow">
          <stop offset="0%" stopColor="#f1e6ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9b6ad6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="b1-frag-halo" cx="60" cy="45" r="40" fill="url(#b1-frag-glow)" />
      <g className={joined ? undefined : 'b1-frag-left'}><Shard side="left" /></g>
      <g className={joined ? undefined : 'b1-frag-right'}><Shard side="right" /></g>
    </svg>
  )
}

/** Una astilla luminosa (la mitad de una pieza del reloj, con el borde quebrado) */
export function Shard({ side }: { side: 'left' | 'right' }) {
  return side === 'left' ? (
    <path d="M30 28 L60 20 L55 38 L61 52 L57 66 L34 62 Z" fill="#b48be8" stroke="#efe4ff" strokeWidth="1.2" strokeLinejoin="round" />
  ) : (
    <path d="M60 20 L90 28 L86 62 L57 66 L61 52 L55 38 Z" fill="#d9c7f2" stroke="#efe4ff" strokeWidth="1.2" strokeLinejoin="round" />
  )
}

/**
 * Un fragmento suelto (la misión soltó uno solo): espera en el reloj hasta juntarse con otro.
 * Se dibuja junto al reloj (World › Reloj del tiempo). El estado está en GameState.looseFragments (game/memory.ts).
 */
export function LooseFragment({ count = 1, size = 40 }: { count?: number; size?: number }) {
  if (count <= 0) return null
  return (
    <span className="relative inline-flex" title="Fragmento suelto: espera a juntarse con otro" aria-label={`${count} fragmento${count > 1 ? 's' : ''} suelto${count > 1 ? 's' : ''}`}>
      <svg viewBox="26 14 40 56" width={size} height={size * 1.4} className="anim-bob" aria-hidden="true">
        <Shard side="left" />
      </svg>
      {count > 1 && <span className="absolute -right-1 -top-1 rounded-full bg-[#9b6ad6] px-1.5 text-[11px] font-bold text-white">{count}</span>}
    </span>
  )
}
