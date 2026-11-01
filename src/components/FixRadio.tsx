import { useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { voiceOf } from '../game/speech'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btnGhost, btnPrimary, Panel } from './ui'

/** Piezas de la radio. 'switch' está en la radio misma; las demás están sueltas en la mesa */
export type RadioPiece = 'battery' | 'screws' | 'dial' | 'antenna' | 'switch'

/** Una instrucción: lo que dice el personaje y la pieza que hay que tocar. tip: ayuda en español si se equivoca */
export type FixStep = { en: string; es: string; piece: RadioPiece; tip: string }

const GLOW = '#f2c230'
const BENCH_X = [40, 100, 160, 220, 280]

/** Dibujo de cada pieza suelta (centrada en 0,0) */
function PieceArt({ piece }: { piece: RadioPiece }) {
  switch (piece) {
    case 'battery':
      return (
        <g>
          <rect x="-16" y="-9" width="32" height="18" rx="3" fill="#3b9d5d" stroke="#2e7a47" strokeWidth="2" />
          <rect x="16" y="-4" width="4" height="8" fill="#2e7a47" />
          <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f4efe4">+</text>
        </g>
      )
    case 'screws':
      return (
        <g>
          {[-9, 9].map((x) => (
            <g key={x} transform={`translate(${x} 0)`}>
              <circle cy="-7" r="5" fill="#9aa5b1" stroke="#55606e" strokeWidth="1.5" />
              <line x1="-3" y1="-7" x2="3" y2="-7" stroke="#55606e" strokeWidth="1.5" />
              <rect x="-1.5" y="-2" width="3" height="12" fill="#9aa5b1" />
            </g>
          ))}
        </g>
      )
    case 'dial':
      return (
        <g>
          <circle r="12" fill="#55606e" stroke="#2e2620" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="-9" stroke="#f4efe4" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )
    case 'antenna':
      return (
        <g>
          <line x1="-18" y1="6" x2="16" y2="-6" stroke="#7a6a58" strokeWidth="3" strokeLinecap="round" />
          <circle cx="16" cy="-6" r="4" fill="#7a6a58" />
        </g>
      )
    default:
      return null
  }
}

/**
 * Fix the Radio (A2-04): el personaje lee las instrucciones del señor Hale una por una y el jugador toca la pieza
 * correcta (en la mesa o en la radio). Cada pieza se coloca y se ilumina; al final la radio suena.
 * Un error no quita vida: la pieza tiembla y aparece una ayuda.
 */
export function FixRadio({
  name,
  look,
  title,
  intro,
  steps,
  onClose,
}: {
  name: string
  look: SpriteLook
  title: string
  intro: { en: string; es: string }
  steps: FixStep[]
  onClose: (done: boolean) => void
}) {
  const [i, setI] = useState(0)
  const [wrong, setWrong] = useState<RadioPiece | null>(null)
  const [showEs, setShowEs] = useState(false)
  const done = i >= steps.length
  const step = steps[Math.min(i, steps.length - 1)]
  const placed = steps.slice(0, i).map((s) => s.piece)
  const last = placed[placed.length - 1]
  const has = (p: RadioPiece) => placed.includes(p)
  const playing = has('switch')

  /** Piezas sueltas en la mesa, en orden revuelto (el interruptor está en la radio) */
  const loose = useMemo(() => mixed(steps.map((s) => s.piece).filter((p) => p !== 'switch'), title).map(([p]) => p), [steps, title])

  function tap(p: RadioPiece) {
    if (done || has(p)) return
    if (p === step.piece) {
      sfx('correct')
      setWrong(null)
      setI(i + 1)
    } else {
      sfx('wrong')
      setWrong(p)
    }
  }

  const line = done ? { en: 'It works! Listen... music!', es: '¡Funciona! Escucha... ¡música!' } : i === 0 && !wrong ? { en: `${intro.en} ${step.en}`, es: `${intro.es} ${step.es}` } : step
  const pop = (p: RadioPiece) => (last === p ? 'anim-pop' : '')
  const hit = (p: RadioPiece) => ({
    role: 'button' as const,
    tabIndex: done || has(p) ? -1 : 0,
    onClick: () => tap(p),
    onKeyDown: (e: KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && tap(p),
    className: `${done || has(p) ? '' : 'cursor-pointer'} ${wrong === p ? 'anim-shake' : ''}`,
  })

  return (
    <Panel>
      <div className="flex items-center gap-3">
        <SpriteIcon look={look} size={48} />
        <div className="flex-1">
          <p className="font-display text-lg text-gold">{name}</p>
          <p className="text-xs text-paper/60">Fix the Radio · {title}</p>
        </div>
        <SpeakButton text={line.en} size="sm" auto voice={voiceOf(look)} />
      </div>
      <p key={line.en} className="anim-fade-in mt-2 text-[17px] leading-relaxed"><Tappable text={line.en} /></p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      <svg viewBox="0 0 320 220" className="mt-3 w-full rounded-xl border-2 border-line" role="group" aria-label={`Radio en la mesa de trabajo: ${i} de ${steps.length} pasos`}>
        <rect width="320" height="150" fill="#e8dcc8" />
        <rect y="150" width="320" height="70" fill="#b98c5a" />
        <line x1="0" y1="150" x2="320" y2="150" stroke="#8a5a32" strokeWidth="3" />
        {/* herramientas colgadas en la pared */}
        <rect x="258" y="20" width="44" height="60" rx="3" fill="#cfc0a6" stroke="#a88a4f" />
        <rect x="266" y="28" width="5" height="34" fill="#55606e" />
        <rect x="264" y="26" width="9" height="8" rx="1" fill="#c0392b" />
        <path d="M284 30 v30 M280 30 h8" stroke="#55606e" strokeWidth="4" fill="none" />

        {/* antena: hueco o colocada */}
        {has('antenna') ? (
          <g className={pop('antenna')}>
            <line x1="196" y1="52" x2="236" y2="14" stroke={playing ? GLOW : '#7a6a58'} strokeWidth="3" strokeLinecap="round" />
            <circle cx="236" cy="14" r="4" fill={playing ? GLOW : '#7a6a58'} className={playing ? 'anim-bob' : ''} />
          </g>
        ) : (
          <line x1="196" y1="52" x2="236" y2="14" stroke="#a88a4f" strokeWidth="2" strokeDasharray="4 4" />
        )}

        {/* cuerpo de la radio */}
        <rect x="70" y="50" width="150" height="90" rx="12" fill="#8a5a32" stroke="#6e4524" strokeWidth="3" />
        <rect x="78" y="58" width="134" height="74" rx="8" fill="#a8703f" />
        <circle cx="108" cy="86" r="18" fill="#5a3a20" />
        {[-10, -3, 4, 11].map((d) => <line key={d} x1={94} y1={86 + d} x2={122} y2={86 + d} stroke="#3b2414" strokeWidth="2.5" strokeLinecap="round" />)}
        {/* ventana del dial */}
        <rect x="140" y="64" width="64" height="20" rx="3" fill={playing ? '#fff3c4' : '#4a4038'} stroke={playing ? GLOW : '#2e2620'} strokeWidth="2" />
        {[150, 162, 174, 186, 198].map((x) => <line key={x} x1={x} y1={69} x2={x} y2={79} stroke={playing ? '#c08a1a' : '#6b6058'} strokeWidth="1.5" />)}
        <line x1="166" y1="66" x2="166" y2="82" stroke="#c0392b" strokeWidth="2" />

        {/* perilla del dial: hueco o colocada */}
        {has('dial') ? (
          <g transform="translate(188 112)" className={pop('dial')}>
            <circle r="13" fill="none" stroke={GLOW} strokeWidth="2" opacity={playing ? 1 : 0.6} />
            <PieceArt piece="dial" />
          </g>
        ) : (
          <circle cx="188" cy="112" r="11" fill="#6e4524" stroke="#d8c6a8" strokeWidth="1.5" strokeDasharray="3 3" />
        )}

        {/* compartimento de la batería y tornillos */}
        <rect x="88" y="108" width="52" height="20" rx="3" fill={has('screws') ? '#8a5a32' : '#2e2620'} stroke={has('battery') ? GLOW : '#d8c6a8'} strokeWidth={has('battery') ? 2 : 1.5} strokeDasharray={has('battery') ? undefined : '3 3'} />
        {has('battery') && !has('screws') && (
          <g transform="translate(114 118) scale(0.75)" className={pop('battery')}>
            <PieceArt piece="battery" />
          </g>
        )}
        {[94, 134].map((x) =>
          has('screws') ? (
            <g key={x} className={pop('screws')}>
              <circle cx={x} cy="118" r="3.5" fill="#9aa5b1" stroke={GLOW} strokeWidth="1.5" />
              <line x1={x - 2} y1="118" x2={x + 2} y2="118" stroke="#55606e" strokeWidth="1.2" />
            </g>
          ) : (
            <circle key={x} cx={x} cy="118" r="2" fill="#1b1b26" />
          ),
        )}

        {/* interruptor en la radio (último paso) */}
        <g {...hit('switch')}>
          <rect x="94" y="30" width="44" height="30" fill="transparent" />
          <rect x="98" y="38" width="36" height="14" rx="4" fill={playing ? GLOW : '#55606e'} stroke="#2e2620" strokeWidth="2" />
          <rect x={playing ? 118 : 100} y="40" width="14" height="10" rx="2" fill="#f4efe4" />
          <text x="116" y="34" textAnchor="middle" fontSize="8" fontWeight="700" fill="#5a3a20">{playing ? 'ON' : 'OFF'}</text>
        </g>

        {/* ondas de sonido */}
        {playing && (
          <g className="anim-fade-in" fill="none" stroke={GLOW} strokeWidth="3" strokeLinecap="round">
            <path d="M58 72 Q48 86 58 100" />
            <path d="M46 64 Q32 86 46 108" opacity="0.7" />
            <path d="M34 56 Q16 86 34 116" opacity="0.4" />
          </g>
        )}

        {/* piezas sueltas en la mesa */}
        {loose.map((p, n) =>
          has(p) ? null : (
            <g key={p} transform={`translate(${BENCH_X[n] ?? 40 + n * 60} 186)`} {...hit(p)} aria-label="Pieza suelta">
              <rect x="-26" y="-26" width="52" height="52" rx="10" fill={wrong === p ? '#c0392b' : '#f2c230'} opacity={wrong === p ? 0.3 : 0.12} />
              <PieceArt piece={p} />
            </g>
          ),
        )}
        <text x="310" y="214" textAnchor="end" fontSize="9" fill="#5a3a20">{Math.min(i, steps.length)}/{steps.length}</text>
      </svg>

      {!done && <p className="mt-2 text-sm text-paper/75">Toca la pieza que dice {name}. Si dice "turn on", toca el interruptor de la radio.</p>}
      {wrong && !done && <p className="anim-fade-in mt-2 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Esa no. {step.tip}</p>}
      {done && <p className="anim-fade-in mt-2 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Radio reparada! Seguiste todas las instrucciones.</p>}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Listo</button>
        ) : (
          <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
        )}
      </div>
    </Panel>
  )
}
