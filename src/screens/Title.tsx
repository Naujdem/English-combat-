import { useState } from 'react'
import type { GameState } from '../game/types'
import { SpriteBody } from '../components/Sprite'
import { btn, btnPrimary } from '../components/ui'
import { heroLook } from '../game/helpers'

export function Title({ state, onContinue, onNew }: { state: GameState; onContinue: () => void; onNew: () => void }) {
  const hasSave = !!state.hero.name
  const [confirm, setConfirm] = useState(false)
  const look = hasSave ? heroLook(state, { book: true }) : { shirt: '#3b6fb6', hair: '#4a2c17', skin: '#f1c27d', cape: '#c0392b', book: true }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
      <svg width="180" height="150" viewBox="0 0 120 100" aria-hidden="true">
        <rect x="10" y="8" width="100" height="44" rx="4" fill="#7a5230" />
        <rect x="14" y="12" width="92" height="36" fill="#2f5d50" />
        <text x="60" y="27" textAnchor="middle" fill="#f4efe4" fontSize="9" fontFamily="Fredoka, Nunito, system-ui, sans-serif">I ___ ready!</text>
        <text x="60" y="40" textAnchor="middle" fill="#e0a526" fontSize="7" fontFamily="Fredoka, Nunito, system-ui, sans-serif">am · is · are</text>
        <g transform="translate(39 55) scale(1.3)">
          <g className="anim-bob">
            <SpriteBody look={look} />
          </g>
        </g>
      </svg>
      <div>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-gold">English Combat</h1>
        <p className="mt-1 text-paper/70">Recupera tu voz, palabra por palabra.</p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3">
        {hasSave && (
          <button className={btnPrimary} onClick={onContinue}>
            Continuar con {state.hero.name}
          </button>
        )}
        {!confirm ? (
          <button className={hasSave ? btn : btnPrimary} onClick={() => (hasSave ? setConfirm(true) : onNew())}>
            Nueva partida
          </button>
        ) : (
          <div className="anim-fade-in rounded-xl border-2 border-danger/60 p-3 text-sm">
            <p className="mb-2">Se borrará la partida guardada. ¿Seguro?</p>
            <div className="flex gap-2">
              <button className={`${btn} flex-1 text-base`} onClick={() => setConfirm(false)}>Cancelar</button>
              <button className={`${btn} flex-1 border-danger text-base`} onClick={onNew}>Borrar y empezar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
