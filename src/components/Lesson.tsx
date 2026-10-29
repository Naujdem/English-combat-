import { useState, type ReactNode } from 'react'
import type { GameState, LessonStep } from '../game/types'
import { SpriteBody } from './Sprite'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { heroLook } from '../game/helpers'
import { FRIENDS } from '../data/friends'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { GrammarPattern, RoleSentence } from './Grammar'

export const FONT = 'Fredoka, Nunito, system-ui, sans-serif'

/** Fondo de salón con pizarra, ventanas y piso; los personajes van en `children` */
export function ClassroomStage({ board, children }: { board?: [string, string?]; children: ReactNode }) {
  return (
    <svg viewBox="0 0 320 200" className="w-full rounded-2xl border-2 border-line" role="img" aria-label="Salón de clase">
      <rect width="320" height="140" fill="#e8dcc8" />
      <rect y="140" width="320" height="60" fill="#b98c5a" />
      <line x1="0" y1="160" x2="320" y2="160" stroke="#a37848" />
      <line x1="0" y1="182" x2="320" y2="182" stroke="#a37848" />
      <rect x="90" y="14" width="140" height="66" rx="3" fill="#7a5230" />
      <rect x="95" y="19" width="130" height="56" fill="#2f5d50" />
      {board && (
        <g key={board.join()} className="anim-fade-in">
          {/* El tamaño baja con frases largas para que quepan en la pizarra */}
          <text x="160" y="42" textAnchor="middle" fill="#f4efe4" fontSize={Math.min(14, 205 / Math.max(1, board[0].length))} fontFamily={FONT} fontWeight="600">{board[0]}</text>
          {board[1] && <text x="160" y="63" textAnchor="middle" fill="#e0a526" fontSize={Math.min(12, 215 / Math.max(1, board[1].length))} fontFamily={FONT}>{board[1]}</text>}
        </g>
      )}
      <rect x="14" y="20" width="44" height="60" fill="#9fd3f0" stroke="#7a6a58" strokeWidth="4" />
      <rect x="262" y="20" width="44" height="60" fill="#9fd3f0" stroke="#7a6a58" strokeWidth="4" />
      {children}
    </svg>
  )
}

/**
 * Lección paso a paso con Leo. Los pasos 'board' son ejercicios que hay que
 * responder bien para avanzar. La traducción de Leo se muestra por defecto.
 */
export function Lesson({
  state,
  steps,
  title,
  onDone,
}: {
  state: GameState
  steps: LessonStep[]
  title?: string
  onDone: (completed: boolean) => void
}) {
  const [i, setI] = useState(0)
  const [hideEs, setHideEs] = useState(false)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const s = steps[i]
  const last = i === steps.length - 1
  const waiting = !!s.choice && !solved
  // La pizarra conserva lo último escrito si el paso actual no trae nada nuevo
  const board = steps.slice(0, i + 1).reverse().find((x) => x.board)?.board

  function next() {
    setSolved(false)
    setTip(null)
    if (last) onDone(true)
    else setI(i + 1)
  }

  function choose(k: number) {
    if (!s.choice) return
    if (k === s.choice.answer) {
      setSolved(true)
      setTip(null)
    } else setTip(s.choice.tip)
  }

  const text = s.choice && solved && s.text.includes('___') ? s.text.replace('___', s.choice.options[s.choice.answer]) : s.text

  return (
    <div className="mx-auto flex h-full max-w-md flex-col justify-center gap-4 px-4 py-6">
      {title && <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">{title}</p>}
      <ClassroomStage board={board}>
        <g transform="translate(40 92) scale(3)">
          <SpriteBody look={heroLook(state)} mood={state.recovered.length ? 'normal' : 'mute'} />
        </g>
        <g className="anim-appear">
          <g transform="translate(280 92) scale(-3 3)">
            <SpriteBody look={FRIENDS.leo.look} />
          </g>
        </g>
      </ClassroomStage>

      {s.who === 'board' && s.topic && <GrammarPattern topic={s.topic} sentence={text} compact />}

      <Panel>
        {s.who === 'leo' && (
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-gold">Leo</p>
            <SpeakButton text={s.text} size="sm" />
          </div>
        )}
        {s.who === 'board' && <p className="text-xs font-semibold uppercase tracking-wide text-hp">Escribe en la pizarra</p>}
        <p
          key={i}
          className={`anim-fade-in leading-relaxed ${s.who === 'narrator' ? 'text-[17px] italic text-paper/85' : s.who === 'board' ? 'font-display text-[22px]' : 'text-[17px]'}`}
        >
          {s.who === 'leo' ? <Tappable text={text} /> : text}
        </p>
        {!hideEs && s.es && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}

        {waiting && (
          <div className={`mt-3 grid gap-2 ${s.who === 'board' ? 'grid-cols-3' : ''}`}>
            {s.choice!.options.map((o, k) => (
              <button key={k} className={`${btn} ${s.who === 'board' ? 'px-2 text-[18px]' : 'text-left text-base'}`} onClick={() => choose(k)}>
                {o}
              </button>
            ))}
          </div>
        )}
        {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Leo: casi. {tip}</p>}
        {s.choice && solved && (
          <div className="anim-fade-in mt-2 flex items-center gap-2">
            <p className="text-sm font-semibold text-hp">¡Bien hecho!</p>
            {s.who === 'board' && s.topic && <RoleSentence text={text.replace(/\s*\([^)]*\)\s*$/, '')} topic={s.topic} size="sm" />}
            {s.who === 'board' && <SpeakButton text={text} size="sm" />}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex gap-1">
            {s.es && (
              <button className={btnGhost} onClick={() => setHideEs((v) => !v)}>{hideEs ? 'Traducir' : 'Ocultar'}</button>
            )}
            <button className={btnGhost} onClick={() => onDone(false)}>Saltar guía</button>
          </div>
          {!waiting && (
            <button className={btnPrimary} onClick={next} autoFocus>
              {last ? 'Listo' : 'Siguiente'}
            </button>
          )}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/35" aria-hidden="true">
          <div className="h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
        </div>
      </Panel>
    </div>
  )
}
