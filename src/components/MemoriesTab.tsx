import { useState } from 'react'
import { fillText } from '../game/gender'
import type { GameState } from '../game/types'
import { B1_MEMORIES, type B1Memory } from '../data/b1Memories'
import { isB1NodeOpen } from '../data/b1World'
import { SpriteL } from './SpriteL'
import { btnGhost } from './ui'

/**
 * Mochila › Recuerdos (B1): los recuerdos ya abiertos. Al tocar uno se ve como texto con una ilustración.
 * La pestaña solo aparece con B1 desbloqueado (ver Backpack en screens/Explore.tsx).
 */
export function MemoriesTab({ state }: { state: GameState }) {
  const open = B1_MEMORIES.filter((m) => isB1NodeOpen(m.n, state))
  const [picked, setPicked] = useState<B1Memory | null>(null)

  if (picked) {
    return (
      <div className="anim-fade-in">
        <button className={`${btnGhost} mb-2 text-sm`} onClick={() => setPicked(null)}>← Recuerdos</button>
        <div className="overflow-hidden rounded-xl border-2 border-[#9b6ad6]/60 bg-[#1d1528]">
          <div className="flex justify-center bg-[#2a2040] py-3" style={{ filter: 'saturate(0.6)' }}>{picked.art ? picked.art() : <GenericArt />}</div>
          <div className="px-3 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#b48be8]">Recuerdo {picked.n} · 20??</p>
            <p className="font-display text-lg">{picked.title}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-paper/85">{fillText(picked.summary, state)}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!open.length) return <p className="text-sm text-paper/60">Aún no tienes recuerdos. Se abren al juntar dos fragmentos.</p>
  return (
    <ul className="grid gap-1.5">
      {open.map((m) => (
        <li key={m.n}>
          <button className="flex w-full items-center gap-3 rounded-xl border-2 border-[#9b6ad6]/50 px-3 py-2 text-left" onClick={() => setPicked(m)}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9b6ad6] font-display text-ink">{m.n}</span>
            <span className="text-[15px]">{m.title}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

/** Ilustración genérica: L de espaldas en un pasillo morado */
function GenericArt() {
  return (
    <svg width="160" height="110" viewBox="0 0 160 110" aria-hidden="true">
      <path d="M0 110 L50 30 L110 30 L160 110 Z" fill="#3a2d55" />
      <rect x="50" y="10" width="60" height="20" fill="#241b36" />
      <rect x="70" y="14" width="20" height="16" fill="#9b6ad6" opacity="0.35" />
      <g transform="translate(56 40) scale(1.5)">
        <SpriteL pose="back" />
      </g>
    </svg>
  )
}
