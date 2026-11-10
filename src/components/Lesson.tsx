import { useMemo, useState, type ReactNode } from 'react'
import { mixed } from '../game/mix'
import type { GameState, LessonStep } from '../game/types'
import { SpriteBody, type SpriteLook } from './Sprite'
import type { Voice } from '../game/speech'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { heroLook } from '../game/helpers'
import { FRIENDS, interestFriend } from '../data/friends'
import { B1_06_HADDAD_LOOK } from '../data/b1Shelter'
import { B1_06_NAYI_LOOK } from '../data/b1Kennels'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { GrammarPattern, GrammarTable, RoleSentence } from './Grammar'
import { NotebookPage, NotebookTable, NotebookText, notebookSay } from './LNotebook'
import { L_INK } from './Diary'

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
 * B1: la lección por mensajes. En vez del salón, la pantalla de un teléfono: tu mensaje a la derecha
 * y lo que Leo "escribe" (la pizarra) en burbujas a la izquierda.
 */
export function PhoneStage({ board, mine }: { board?: [string, string?]; mine?: string }) {
  const bubble = (text: string, y: number, color: string, size: number) => (
    <text x="100" y={y} fill={color} fontSize={size} fontFamily={FONT} fontWeight="600">{text}</text>
  )
  return (
    <svg viewBox="0 0 320 200" className="w-full rounded-2xl border-2 border-line" role="img" aria-label="Mensajes con Leo en el teléfono">
      <rect width="320" height="200" fill="#1f2430" />
      <rect x="70" y="6" width="180" height="188" rx="18" fill="#2d2d3a" stroke="#c9c2d6" strokeWidth="1.5" />
      <rect x="78" y="16" width="164" height="168" rx="10" fill="#e8eef3" />
      <rect x="78" y="16" width="164" height="26" rx="10" fill="#2f6f73" />
      <rect x="78" y="32" width="164" height="10" fill="#2f6f73" />
      <circle cx="94" cy="29" r="7" fill="#d4743a" />
      <text x="107" y="33" fill="#f4efe4" fontSize="12" fontFamily={FONT} fontWeight="700">Leo</text>
      <circle cx="132" cy="29" r="2.5" fill="#7ee08a" />
      {mine && (
        <g>
          <rect x="140" y="50" width="96" height="30" rx="8" fill="#cfe9d6" />
          <text x="146" y="62" fill="#1c1a17" fontSize="7.5" fontFamily={FONT}>{mine.length > 24 ? mine.slice(0, mine.lastIndexOf(' ', 24)) : mine}</text>
          {mine.length > 24 && <text x="146" y="73" fill="#1c1a17" fontSize="7.5" fontFamily={FONT}>{mine.slice(mine.lastIndexOf(' ', 24) + 1)}</text>}
        </g>
      )}
      {board && (
        <g key={board.join()} className="anim-fade-in">
          <rect x="86" y="92" width="150" height={board[1] ? 50 : 30} rx="8" fill="#ffffff" stroke="#c9d3dc" />
          {bubble(board[0], 110, '#1c1a17', Math.min(10, 230 / Math.max(1, board[0].length)))}
          {board[1] && bubble(board[1], 130, '#2f6f73', Math.min(10, 230 / Math.max(1, board[1].length)))}
        </g>
      )}
      <rect x="86" y="160" width="148" height="16" rx="8" fill="#ffffff" stroke="#c9d3dc" />
      <text x="94" y="171" fill="#9aa6b2" fontSize="7" fontFamily={FONT}>Leo is typing…</text>
    </svg>
  )
}

/**
 * Lección paso a paso con Leo. Los pasos 'board' son ejercicios que hay que
 * responder bien para avanzar. La traducción de Leo se muestra por defecto.
 */
export function Lesson({
  state,
  steps: rawSteps,
  title,
  onDone,
  phone,
  notebook,
  defaultGuide,
}: {
  state: GameState
  steps: LessonStep[]
  title?: string
  onDone: (completed: boolean) => void
  /** B1: por mensajes en el teléfono. Es tu mensaje (a la derecha); la pizarra son las burbujas de Leo */
  phone?: { mine: string }
  /** B1 (recuerdos 3, 5 y 7): la lección es una página del Cuaderno de L con ese número (components/LNotebook.tsx) */
  notebook?: number
  /** B1: el personaje de la tarea, si la lección no trae pasos de un guía propio (Leo solo si no hay nadie más) */
  defaultGuide?: { name: string; look: SpriteLook; voice: Voice }
}) {
  // La muletilla de Leo: empieza cada lección con "Hi, hi!"
  const steps = useMemo(() => {
    const first = rawSteps[0]
    if (!first || first.who !== 'leo' || /^hi, hi/i.test(first.text)) return rawSteps
    return [{ ...first, text: `Hi, hi! ${first.text}`, es: first.es ? `¡Hola, hola! ${first.es}` : first.es }, ...rawSteps.slice(1)]
  }, [rawSteps])
  const [i, setI] = useState(0)
  const [hideEs, setHideEs] = useState(true)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const s = steps[i]
  // Guía de la lección: Leo, o Maya si la lección tiene pasos 'maya' (B1-04). Mismo tratamiento: retrato, nombre y voz
  // B1-06: Ms. Haddad guía la lección si tiene pasos 'haddad'
  // B1-08: la persona especial guía la lección si tiene pasos 'special' (nombre, aspecto y voz que eligió el jugador)
  // B1-12: el abuelo Einer guía la lección si tiene pasos 'einer'
  const guide = steps.some((x) => x.who === 'einer')
    ? { name: 'Einer', look: { shirt: '#6b4a2f', hair: '#d8d8d8', skin: '#c98f68', gender: 'male' as const }, voice: 'male' as const }
    : steps.some((x) => x.who === 'special')
    ? { name: state.interest.name, look: interestFriend(state.interest).look, voice: state.interest.gender === 'female' ? ('female' as const) : ('male' as const) }
    : steps.some((x) => x.who === 'nayi')
    ? { name: 'Nayi', look: B1_06_NAYI_LOOK, voice: 'female' as const }
    : steps.some((x) => x.who === 'haddad')
    ? { name: 'Ms. Haddad', look: B1_06_HADDAD_LOOK, voice: 'female' as const }
    : steps.some((x) => x.who === 'maya')
    ? { name: 'Maya', look: FRIENDS.maya.look, voice: 'female' as const }
    : steps.some((x) => x.who === 'leo') || !defaultGuide
    ? { name: 'Leo', look: FRIENDS.leo.look, voice: 'male' as const }
    : defaultGuide
  const talks = s.who === 'leo' || s.who === 'maya' || s.who === 'haddad' || s.who === 'nayi' || s.who === 'special' || s.who === 'einer'
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
      {(title ?? !notebook) && <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">{title ?? `${guide.name} te ayuda`}</p>}
      {notebook ? null : phone ? (
        <PhoneStage board={board} mine={phone.mine} />
      ) : (
        <ClassroomStage board={board}>
          <g transform="translate(40 92) scale(3)">
            <SpriteBody look={heroLook(state)} mood={state.recovered.length ? 'normal' : 'mute'} />
          </g>
          <g className="anim-appear">
            <g transform="translate(280 92) scale(-3 3)">
              <SpriteBody look={guide.look} />
            </g>
          </g>
        </ClassroomStage>
      )}

      {s.who === 'board' && s.topic && <GrammarPattern topic={s.topic} sentence={text} compact />}

      {notebook ? (
        // Cuaderno de L: la página (sin retrato). El audio lo lee la voz neutral, con un lápiz
        <NotebookPage page={notebook}>
          <div key={i} className="anim-fade-in" style={{ transform: `rotate(${i % 2 ? 0.4 : -0.4}deg)` }}>
            {text && (
              <div className="flex items-start gap-2">
                {/* 'narrator' (B1-07: la tele): en cursiva, para que no parezca escrito por L */}
                <p className={`flex-1 text-[18px] leading-relaxed ${s.who === 'narrator' ? 'italic opacity-80' : ''}`}>
                  <NotebookText text={text} />
                </p>
                {notebookSay(text) && <SpeakButton text={notebookSay(text)} size="sm" auto icon="pencil" />}
              </div>
            )}
            {!hideEs && s.es && <p className="mt-1 text-sm opacity-70">{s.es}</p>}
            {s.table && <NotebookTable table={s.table} />}
          </div>
          {waiting && (
            <div className="mt-3 grid gap-2">
              {mixed(s.choice!.options).map(([o, k]) => (
                <button key={k} className="rounded-lg border-2 border-dashed px-3 py-2 text-left text-[16px] transition active:scale-[0.98]" style={{ borderColor: `${L_INK}66` }} onClick={() => choose(k)}>
                  {o}
                </button>
              ))}
            </div>
          )}
          {tip && <p className="anim-fade-in mt-3 rounded-lg bg-[#c0605a]/15 px-3 py-2 text-sm">Casi. {tip}</p>}
          {s.choice && solved && (
            <div className="anim-fade-in mt-2 flex items-center gap-2">
              <p className="text-sm font-semibold">✓ {s.choice.options[s.choice.answer]}</p>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between gap-2" style={{ fontFamily: 'inherit' }}>
            <div className="flex gap-1">
              {s.es && (
                <button className="rounded-lg px-2 py-1 text-sm underline underline-offset-4" onClick={() => setHideEs((v) => !v)}>{hideEs ? 'Traducir' : 'Ocultar'}</button>
              )}
              <button className="rounded-lg px-2 py-1 text-sm underline underline-offset-4" onClick={() => onDone(false)}>Saltar guía</button>
            </div>
            {!waiting && (
              <button className={btnPrimary} onClick={next} autoFocus>
                {last ? 'Listo' : 'Siguiente'}
              </button>
            )}
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full" style={{ background: `${L_INK}22` }} aria-hidden="true">
            <div className="h-full rounded-full transition-[width] duration-300" style={{ background: L_INK, width: `${((i + 1) / steps.length) * 100}%` }} />
          </div>
        </NotebookPage>
      ) : (
      <Panel>
        {talks && (
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-gold">{guide.name}</p>
            <SpeakButton text={s.text} size="sm" auto voice={guide.voice} />
          </div>
        )}
        {s.who === 'board' && <p className="text-xs font-semibold uppercase tracking-wide text-hp">Escribe en la pizarra</p>}
        <p
          key={i}
          className={`anim-fade-in leading-relaxed ${s.who === 'narrator' ? 'text-[17px] italic text-paper/85' : s.who === 'board' ? 'font-display text-[22px]' : 'text-[17px]'}`}
        >
          {talks ? <Tappable text={text} /> : text}
        </p>
        {!hideEs && s.es && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}
        {s.table && <GrammarTable key={`t${i}`} table={s.table} />}

        {waiting && (
          <div className={`mt-3 grid gap-2 ${s.who === 'board' ? 'grid-cols-3' : ''}`}>
            {mixed(s.choice!.options).map(([o, k]) => (
              <button key={k} className={`${btn} ${s.who === 'board' ? 'px-2 text-[18px]' : 'text-left text-base'}`} onClick={() => choose(k)}>
                {o}
              </button>
            ))}
          </div>
        )}
        {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">{guide.name}: casi. {tip}</p>}
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
      )}
    </div>
  )
}
