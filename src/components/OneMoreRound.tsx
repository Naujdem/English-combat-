import { useState } from 'react'
import { voiceOf } from '../game/speech'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/** Un objeto del juego: icono, nombre en inglés y en español */
export type RoundItem = { id: string; icon: string; en: string; es: string }
type Line = { text: string; es: string }

/**
 * "One More Round!": un juego corto de memoria visual. Se ven cuatro objetos, se cierran los ojos,
 * uno cambia de lugar y hay que tocar el que se movió. El personaje reacciona según el resultado.
 * Sin puntos ni récords. En win/lose, {item} se cambia por el nombre en inglés del objeto que se movió.
 */
export function OneMoreRound({
  name,
  look,
  items,
  lines,
  onClose,
}: {
  name: string
  look: SpriteLook
  items: RoundItem[]
  lines: { intro: Line; ask: Line; win: Line; lose: Line }
  onClose: (done: boolean) => void
}) {
  const SLOTS = 6
  const shuffle = () => [...Array(SLOTS).keys()].sort(() => Math.random() - 0.5).slice(0, items.length)
  const [pos, setPos] = useState<number[]>(shuffle)
  const [moved, setMoved] = useState<number | null>(null)
  const [phase, setPhase] = useState<'look' | 'eyes' | 'pick' | 'result'>('look')
  const [picked, setPicked] = useState<number | null>(null)
  const [showEs, setShowEs] = useState(false)

  function closeEyes() {
    setPhase('eyes')
    window.setTimeout(() => {
      // Un objeto se mueve a un lugar vacío
      const k = Math.floor(Math.random() * items.length)
      const free = [...Array(SLOTS).keys()].filter((s) => !pos.includes(s))
      setPos((p) => p.map((s, i) => (i === k ? free[Math.floor(Math.random() * free.length)] : s)))
      setMoved(k)
      setPhase('pick')
    }, 1200)
  }

  function again() {
    setPos(shuffle())
    setMoved(null)
    setPicked(null)
    setPhase('look')
  }

  const win = picked !== null && picked === moved
  const fill = (l: Line) => ({
    text: l.text.split('{item}').join(moved !== null ? items[moved].en : ''),
    es: l.es.split('{item}').join(moved !== null ? items[moved].es : ''),
  })
  const line = phase === 'result' ? fill(win ? lines.win : lines.lose) : phase === 'look' ? lines.intro : lines.ask

  return (
    <Panel>
      <div className="flex items-center gap-3">
        <SpriteIcon look={look} size={48} />
        <div className="flex-1">
          <p className="font-display text-lg text-gold">{name}</p>
          <p className="text-xs text-paper/60">One More Round!</p>
        </div>
        {phase !== 'eyes' && <SpeakButton text={line.text} size="sm" auto voice={voiceOf(look)} />}
      </div>

      {phase === 'eyes' ? (
        <p className="anim-fade-in mt-2 text-[17px]">Cierra los ojos... 🙈</p>
      ) : (
        <>
          <p key={`${phase}-${line.text}`} className="anim-fade-in mt-2 text-[17px] leading-relaxed">
            <Tappable text={line.text} />
          </p>
          {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}
        </>
      )}

      <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Objetos sobre la mesa">
        {[...Array(SLOTS).keys()].map((slot) => {
          const k = pos.indexOf(slot)
          const it = k >= 0 ? items[k] : null
          const hidden = phase === 'eyes'
          const mark = phase === 'result' && k === moved ? 'border-hp bg-hp/15' : phase === 'result' && k === picked ? 'border-danger bg-danger/15' : 'border-line bg-panel-2'
          return (
            <button
              key={slot}
              type="button"
              disabled={!it || phase !== 'pick'}
              onClick={() => {
                setPicked(k)
                setPhase('result')
              }}
              aria-label={it && !hidden ? `${it.en} (${it.es})` : 'Lugar vacío'}
              className={`flex h-20 flex-col items-center justify-center rounded-xl border-2 ${mark} ${phase === 'pick' && it ? 'cursor-pointer active:scale-95' : ''}`}
            >
              {it && !hidden && (
                <>
                  <span className="text-3xl" aria-hidden="true">{it.icon}</span>
                  <span className="mt-1 text-xs text-paper/75">{it.en}</span>
                </>
              )}
            </button>
          )
        })}
      </div>

      {phase === 'pick' && <p className="mt-2 text-sm text-paper/70">Toca el objeto que cambió de lugar.</p>}

      <div className="mt-4 flex items-center justify-between gap-2">
        {phase === 'look' ? (
          <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
        ) : (
          <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        )}
        {phase === 'look' && (
          <button className={btnPrimary} onClick={closeEyes} autoFocus>Listo, ¡ya miré!</button>
        )}
        {phase === 'result' && (
          <div className="flex gap-2">
            <button className={btn} onClick={again}>One more round!</button>
            <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Seguir</button>
          </div>
        )}
      </div>
    </Panel>
  )
}
