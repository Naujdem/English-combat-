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

/** Lugares de la habitación donde se pueden poner los objetos (centro, base): alféizar, mesa de noche y bandeja de la cama */
const ROOM_SLOTS: [number, number][] = [
  [36, 74],
  [78, 74],
  [126, 112],
  [168, 112],
  [226, 124],
  [278, 124],
]

/** Dibujo de cada objeto (base en 0,0). Si un objeto no tiene dibujo, se usa su icono */
function ItemArt({ it }: { it: RoundItem }) {
  switch (it.id) {
    case 'water':
      return (
        <g>
          <rect x="-7" y="-26" width="14" height="26" rx="2" fill="#d8eef8" stroke="#7a9bb0" strokeWidth="1.5" />
          <rect x="-5.5" y="-15" width="11" height="13.5" rx="1" fill="#6fb7e6" />
        </g>
      )
    case 'pills':
      return (
        <g>
          <rect x="-7" y="-22" width="14" height="22" rx="2" fill="#f4efe4" stroke="#9c8f7a" strokeWidth="1.2" />
          <rect x="-8" y="-27" width="16" height="6" rx="1.5" fill="#c0392b" />
          <rect x="-5" y="-15" width="10" height="7" fill="#3b9d5d" />
        </g>
      )
    case 'apple':
      return (
        <g>
          <circle cx="0" cy="-10" r="10" fill="#d63c3c" />
          <rect x="-1" y="-24" width="2" height="6" fill="#6e4524" />
          <ellipse cx="5" cy="-21" rx="4" ry="2" fill="#3b9d5d" />
        </g>
      )
    case 'book':
      return (
        <g>
          <rect x="-13" y="-11" width="26" height="11" rx="1.5" fill="#2f6fd0" />
          <rect x="-11" y="-8" width="24" height="5" fill="#f4efe4" />
        </g>
      )
    default:
      return <text x="0" y="-4" textAnchor="middle" fontSize="24">{it.icon}</text>
  }
}

/** Habitación de hospital en SVG para el modo visual 'room' */
function RoomArt({
  items,
  pos,
  phase,
  moved,
  picked,
  onPick,
}: {
  items: RoundItem[]
  pos: number[]
  phase: 'look' | 'eyes' | 'pick' | 'name' | 'result'
  moved: number | null
  picked: number | null
  onPick: (k: number) => void
}) {
  const hidden = phase === 'eyes'
  return (
    <svg viewBox="0 0 320 190" className="mt-3 w-full rounded-xl border-2 border-line" role="group" aria-label="Habitación del hospital con objetos">
      {/* pared, piso y ventana */}
      <rect width="320" height="150" fill="#e8dcc8" />
      <rect y="150" width="320" height="40" fill="#cdd6d9" />
      <line x1="0" y1="150" x2="320" y2="150" stroke="#a7b3b8" />
      <rect x="14" y="14" width="86" height="54" fill="#9fd3f0" stroke="#7a6a58" strokeWidth="4" />
      <line x1="57" y1="14" x2="57" y2="68" stroke="#7a6a58" strokeWidth="3" />
      <rect x="8" y="74" width="98" height="6" rx="1" fill="#f4efe4" stroke="#a88a4f" />
      {/* cruz del hospital */}
      <rect x="140" y="26" width="24" height="24" rx="3" fill="#f4efe4" />
      <rect x="149" y="30" width="6" height="16" fill="#c0392b" />
      <rect x="144" y="35" width="16" height="6" fill="#c0392b" />
      {/* mesa de noche */}
      <rect x="106" y="112" width="82" height="7" rx="2" fill="#8a5a32" />
      <rect x="112" y="119" width="70" height="36" fill="#a8703f" stroke="#6e4524" strokeWidth="2" />
      <line x1="112" y1="137" x2="182" y2="137" stroke="#6e4524" strokeWidth="1.5" />
      {/* cama con bandeja */}
      <rect x="300" y="78" width="10" height="82" rx="2" fill="#7a8a95" />
      <rect x="202" y="128" width="104" height="22" rx="3" fill="#f4efe4" stroke="#a7b3b8" strokeWidth="2" />
      <rect x="202" y="136" width="70" height="14" fill="#9fc6e0" />
      <ellipse cx="288" cy="124" rx="14" ry="7" fill="#ffffff" stroke="#a7b3b8" />
      <rect x="208" y="150" width="5" height="18" fill="#7a8a95" />
      <rect x="296" y="150" width="5" height="18" fill="#7a8a95" />
      <rect x="208" y="124" width="88" height="4" rx="1" fill="#b98c5a" />

      {[...Array(6).keys()].map((slot) => {
        const k = pos.indexOf(slot)
        const it = k >= 0 ? items[k] : null
        const [x, y] = ROOM_SLOTS[slot]
        const good = (phase === 'result' || phase === 'name') && k === moved
        const bad = phase === 'result' && k === picked && k !== moved
        const canPick = !!it && phase === 'pick'
        return (
          <g
            key={slot}
            transform={`translate(${x} ${y})`}
            role={canPick ? 'button' : undefined}
            tabIndex={canPick ? 0 : undefined}
            aria-label={it && !hidden ? (phase !== 'name' ? `${it.en} (${it.es})` : 'Objeto') : 'Lugar vacío'}
            onClick={() => canPick && onPick(k)}
            onKeyDown={(e) => canPick && (e.key === 'Enter' || e.key === ' ') && onPick(k)}
            className={canPick ? 'cursor-pointer' : ''}
          >
            {/* zona para tocar, cómoda en móvil */}
            <rect x="-20" y="-36" width="40" height="44" rx="8" fill={good ? '#3b9d5d' : bad ? '#c0392b' : canPick ? '#f2c230' : 'transparent'} opacity={good || bad ? 0.25 : canPick ? 0.12 : 0} stroke={good ? '#3b9d5d' : bad ? '#c0392b' : 'none'} strokeWidth="2" />
            {it && !hidden && (
              <g className={good ? 'anim-pop' : ''}>
                <ItemArt it={it} />
                {phase !== 'name' && (
                  <text x="0" y="16" textAnchor="middle" fontSize="9" fontWeight="600" fill="#3b2414" stroke="#f4efe4" strokeWidth="3" paintOrder="stroke">{it.en}</text>
                )}
              </g>
            )}
            {good && (
              <g className="anim-pop">
                <circle cx="15" cy="-32" r="8" fill="#3b9d5d" stroke="#f4efe4" strokeWidth="1.5" />
                <path d="M11 -32 l3 3 l5 -6" fill="none" stroke="#f4efe4" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
          </g>
        )
      })}
      {hidden && (
        <g className="anim-fade-in">
          <rect width="320" height="190" fill="#1b1b26" opacity="0.88" />
          <text x="160" y="104" textAnchor="middle" fontSize="30">🙈</text>
        </g>
      )}
    </svg>
  )
}

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
  visual = 'none',
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
  /** 'room': los objetos aparecen dibujados en una habitación de hospital (SVG) en vez de la cuadrícula */
  visual?: 'room' | 'none'
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

      {visual === 'room' ? (
        <RoomArt items={items} pos={pos} phase={phase} moved={moved} picked={picked} onPick={pickItem} />
      ) : (
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
      )}

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
