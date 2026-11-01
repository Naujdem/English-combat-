import { useState } from 'react'
import { voiceOf } from '../game/speech'
import { sfx } from '../game/sfx'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Hearts, Panel } from './ui'

/** Un objeto del juego: icono, nombre en inglés y en español */
export type RoundItem = { id: string; icon: string; en: string; es: string }
type Line = { text: string; es: string }

/** Lo que dice el personaje en cada momento. {item} = el objeto que se movió (en inglés / en español) */
export type RoundLines = {
  /** Antes de cerrar los ojos */
  intro: Line
  /** Hay que tocar el objeto que se movió */
  ask: Line
  /** Acertó el objeto: ahora hay que decir su nombre en inglés */
  name: Line
  /** Acertó el objeto y su nombre */
  win: Line
  /** Tocó otro objeto */
  lose: Line
  /** Acertó el objeto pero no su nombre */
  nameLose: Line
  /** La vida llegó a 1: el personaje para el juego y se puede seguir con la historia */
  tired: Line
}

type Result = 'win' | 'lose' | 'nameLose' | 'tired'

/**
 * "One More Round!": un juego corto de memoria visual. Se ven cuatro objetos, se cierran los ojos,
 * uno cambia de lugar, hay que tocar el que se movió y después elegir su nombre en inglés.
 * Cada error quita una vida de verdad (onHurt). Hace falta ganar una ronda para seguir;
 * las rondas extra son opcionales y cuestan lo mismo si se falla.
 * Si la vida llega a 1, el personaje para el juego y se puede seguir igual (sin quedarse atascado).
 */
export function OneMoreRound({
  name,
  look,
  items,
  lines,
  hp,
  maxHp,
  onHurt,
  onClose,
}: {
  name: string
  look: SpriteLook
  items: RoundItem[]
  lines: RoundLines
  hp: number
  maxHp: number
  /** Quita una vida (nunca por debajo de 1) */
  onHurt: () => void
  onClose: (done: boolean) => void
}) {
  const SLOTS = 6
  const shuffle = () => [...Array(SLOTS).keys()].sort(() => Math.random() - 0.5).slice(0, items.length)
  const [pos, setPos] = useState<number[]>(shuffle)
  const [moved, setMoved] = useState<number | null>(null)
  const [phase, setPhase] = useState<'look' | 'eyes' | 'pick' | 'name' | 'result'>('look')
  const [picked, setPicked] = useState<number | null>(null)
  const [names, setNames] = useState<string[]>([])
  const [result, setResult] = useState<Result | null>(null)
  /** Ya ganó al menos una ronda: puede seguir con la historia */
  const [won, setWon] = useState(false)
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
    setResult(null)
    setPhase('look')
  }

  /** Un error: quita una vida. Si la vida llega a 1, el amigo para el juego */
  function fail(kind: 'lose' | 'nameLose') {
    sfx('hurt')
    onHurt()
    setResult(hp - 1 <= 1 ? 'tired' : kind)
    setPhase('result')
  }

  function pickItem(k: number) {
    setPicked(k)
    if (k !== moved) return fail('lose')
    sfx('correct')
    setNames(items.map((it) => it.en).sort(() => Math.random() - 0.5))
    setPhase('name')
  }

  function pickName(en: string) {
    if (moved === null) return
    if (en !== items[moved].en) return fail('nameLose')
    sfx('correct')
    setWon(true)
    setResult('win')
    setPhase('result')
  }

  const fill = (l: Line) => ({
    text: l.text.split('{item}').join(moved !== null ? items[moved].en : ''),
    es: l.es.split('{item}').join(moved !== null ? items[moved].es : ''),
  })
  const line = phase === 'result' && result ? fill(lines[result]) : phase === 'name' ? fill(lines.name) : phase === 'look' ? lines.intro : lines.ask

  return (
    <Panel>
      <div className="flex items-center gap-3">
        <SpriteIcon look={look} size={48} />
        <div className="flex-1">
          <p className="font-display text-lg text-gold">{name}</p>
          <p className="text-xs text-paper/60">One More Round!</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Hearts hp={hp} max={maxHp} />
          {phase !== 'eyes' && <SpeakButton text={line.text} size="sm" auto voice={voiceOf(look)} />}
        </div>
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
          // Al pedir el nombre, los nombres se esconden para no leerlos
          const label = phase !== 'name'
          const mark =
            (phase === 'result' || phase === 'name') && k === moved
              ? 'border-hp bg-hp/15'
              : phase === 'result' && k === picked
                ? 'border-danger bg-danger/15'
                : 'border-line bg-panel-2'
          return (
            <button
              key={slot}
              type="button"
              disabled={!it || phase !== 'pick'}
              onClick={() => pickItem(k)}
              aria-label={it && !hidden ? (label ? `${it.en} (${it.es})` : 'Objeto') : 'Lugar vacío'}
              className={`flex h-20 flex-col items-center justify-center rounded-xl border-2 ${mark} ${phase === 'pick' && it ? 'cursor-pointer active:scale-95' : ''}`}
            >
              {it && !hidden && (
                <>
                  <span className="text-3xl" aria-hidden="true">{it.icon}</span>
                  {label && <span className="mt-1 text-xs text-paper/75">{it.en}</span>}
                </>
              )}
            </button>
          )
        })}
      </div>

      {phase === 'pick' && <p className="mt-2 text-sm text-paper/70">Toca el objeto que cambió de lugar. Si fallas, pierdes una vida.</p>}

      {phase === 'name' && moved !== null && (
        <div className="anim-fade-in mt-3">
          <p className="text-sm text-paper/70">
            ¿Cómo se dice <span aria-hidden="true">{items[moved].icon}</span> en inglés? Si fallas, pierdes una vida.
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {names.map((en) => (
              <button key={en} className={btn} onClick={() => pickName(en)}>
                {en}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'result' && result && result !== 'win' && (
        <p className="mt-2 text-sm font-semibold text-danger">−1 vida{result === 'tired' ? ' · tu amigo para el juego' : ''}</p>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        {phase === 'look' ? (
          <button className={btnGhost} onClick={() => onClose(won)}>Salir</button>
        ) : (
          <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        )}
        {phase === 'look' && (
          <button className={btnPrimary} onClick={closeEyes} autoFocus>Listo, ¡ya miré!</button>
        )}
        {phase === 'result' && result === 'tired' && (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Seguir</button>
        )}
        {phase === 'result' && result !== 'tired' && (
          <div className="flex gap-2">
            <button className={won ? btn : btnPrimary} onClick={again} autoFocus={!won}>One more round!</button>
            {won ? (
              <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Seguir</button>
            ) : (
              <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
            )}
          </div>
        )}
      </div>
    </Panel>
  )
}
