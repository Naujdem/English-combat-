import { useEffect } from 'react'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { finishMemory, wakeFromMemory } from '../game/memory'
import { sfx } from '../game/sfx'
import { StaticBurst } from './MemoryFrame'
import { SpeakButton } from './SpeakButton'
import { btnPrimary } from './ui'

/**
 * Salida de un recuerdo (B1), según state.memory.phase (ver game/memory.ts):
 *   'out'  → fundido a negro con estática, y el protagonista vuelve al último lugar del presente
 *   'wake' → "(You wake up. Your throat hurts.)" y, al seguir, se guardan las páginas del diario y se vuelve al mapa
 */
export function MemoryTransitions({ state, update }: { state: GameState; update: Update }) {
  const m = state.memory
  if (!m || state.screen !== 'explore') return null
  if (m.phase === 'out') return <MemoryOut key="out" onDone={() => update(wakeFromMemory)} />
  if (m.phase === 'wake') return <MemoryWake key="wake" onDone={() => update(finishMemory)} />
  return null
}

function MemoryOut({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    sfx('static')
    const id = setTimeout(onDone, 1000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="fixed inset-0 z-[90]" aria-hidden="true">
      <StaticBurst />
      <div className="b1-fade-black absolute inset-0 bg-black" />
    </div>
  )
}

const WAKE = { en: '(You wake up. Your throat hurts.)', es: '(Despiertas. Te duele la garganta.)' }

function MemoryWake({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    sfx('memory-out')
  }, [])
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black px-4" role="dialog" aria-label="Despiertas">
      <div className="anim-fade-in w-full max-w-sm text-center">
        <p className="text-[18px] text-paper/90">{WAKE.en}</p>
        <p className="mt-1 text-sm text-paper/60">{WAKE.es}</p>
        <div className="mt-2 flex justify-center"><SpeakButton text="You wake up. Your throat hurts." size="sm" /></div>
        <button className={`${btnPrimary} mt-5 w-full`} onClick={onDone}>Continuar</button>
      </div>
    </div>
  )
}
