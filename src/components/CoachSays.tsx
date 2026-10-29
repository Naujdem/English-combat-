import { useEffect, useState } from 'react'
import { SpriteBody, type SpriteLook } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { NPCS } from '../data/npcs'
import { speak } from '../game/speech'

/**
 * "Coach says": el entrenador grita órdenes (imperativos).
 * Primero hay que entender la orden y luego darla uno mismo en una situación.
 */
type Round = {
  /** Lo que dice el entrenador */
  coach: string
  coachEs: string
  /** Texto corto del globo */
  bubble: string
  /** Pregunta para el jugador */
  ask: string
  options: string[]
  answer: number
  tip: string
  /** Animación del protagonista al acertar */
  move?: 'jump' | 'run' | 'sit'
}

const ROUNDS: Round[] = [
  { bubble: 'Run!', coach: 'Run!', coachEs: '¡Corre!', ask: '¿Qué te pide el entrenador?', options: ['Correr', 'Saltar', 'Sentarte'], answer: 0, tip: '"Run" significa correr.', move: 'run' },
  { bubble: 'Jump!', coach: 'Jump!', coachEs: '¡Salta!', ask: '¿Qué te pide el entrenador?', options: ['Parar', 'Saltar', 'Beber agua'], answer: 1, tip: '"Jump" significa saltar.', move: 'jump' },
  { bubble: "Don't stop!", coach: "Don't stop! Run again!", coachEs: '¡No pares! ¡Corre otra vez!', ask: '¿Qué te pide el entrenador?', options: ['Parar y descansar', 'Seguir corriendo', 'Sentarte'], answer: 1, tip: '"Don\'t stop" es "no pares": hay que seguir.', move: 'run' },
  { bubble: 'Sit down!', coach: 'OK, stop. Sit down and drink some water.', coachEs: 'Bien, para. Siéntate y bebe un poco de agua.', ask: '¿Qué te pide el entrenador?', options: ['Saltar y correr', 'Sentarte y beber agua', 'Pasar la pelota'], answer: 1, tip: '"Sit down" es sentarse y "drink some water" es beber agua.', move: 'sit' },
  { bubble: 'Your turn!', coach: "Now it's your turn. Ben is your teammate. Ask him for the ball!", coachEs: 'Ahora es tu turno. Ben es tu compañero. ¡Pídele la pelota!', ask: '¿Qué le dices a Ben?', options: ['Passes me the ball!', 'Pass me the ball!', 'You pass me the ball!'], answer: 1, tip: 'La orden va con el verbo base, sin "you" y sin -s: Pass me the ball!' },
  { bubble: 'Max! Tell him!', coach: 'Max is running in the hallway. Tell him!', coachEs: 'Max está corriendo en el pasillo. ¡Díselo!', ask: '¿Qué le dices a Max?', options: ["No run in the hallway!", "Doesn't run in the hallway!", "Don't run in the hallway!"], answer: 2, tip: 'Para prohibir: Don\'t + verbo. Don\'t run!' },
  { bubble: 'Tell your team!', coach: 'The floor is wet. Tell your team!', coachEs: 'El piso está mojado. ¡Díselo a tu equipo!', ask: '¿Qué les dices?', options: ['Be careful!', 'Are careful!', 'Is careful!'], answer: 0, tip: 'La orden de "to be" es "Be": Be careful!' },
]

export function CoachSays({ look, onClose }: { look: SpriteLook; onClose: (done: boolean) => void }) {
  const [r, setR] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const done = r >= ROUNDS.length
  const round = ROUNDS[Math.min(r, ROUNDS.length - 1)]
  const coach = NPCS.coach

  // El entrenador grita la orden al empezar cada ronda
  useEffect(() => {
    if (!done) speak(round.coach)
  }, [r, done, round.coach])

  function choose(k: number) {
    if (solved) return
    if (k === round.answer) {
      setSolved(true)
      setTip(null)
      if (r >= 4) speak(round.options[round.answer])
    } else setTip(round.tip)
  }

  function next() {
    setSolved(false)
    setTip(null)
    setR(r + 1)
  }

  const move = solved ? round.move : undefined
  const line = done
    ? { text: 'Great! You understand my orders. Now, the sports words!', es: '¡Genial! Entiendes mis órdenes. ¡Ahora, las palabras de deportes!' }
    : { text: round.coach, es: round.coachEs }

  return (
    <Panel>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">Patio · Coach says</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      <svg viewBox="0 0 320 150" className="w-full rounded-xl border-2 border-line" role="img" aria-label="Patio con el entrenador">
        <rect width="320" height="60" fill="#9fd3f0" />
        <rect y="60" width="320" height="90" fill="#7fb85a" />
        <line x1="160" y1="60" x2="160" y2="150" stroke="#e8f2dc" strokeWidth="2" />
        <circle cx="160" cy="110" r="22" fill="none" stroke="#e8f2dc" strokeWidth="2" />
        <g transform="translate(30 50) scale(2.6)">
          <SpriteBody look={coach.look} />
        </g>
        {!done && (
          <g key={r} className="anim-pop">
            <rect x="100" y="12" width="120" height="30" rx="10" fill="#f4efe4" />
            <polygon points="112,40 104,52 124,40" fill="#f4efe4" />
            <text x="160" y="32" textAnchor="middle" fontSize={round.bubble.length > 11 ? 13 : 16} fontFamily="Fredoka, Nunito, system-ui, sans-serif" fontWeight="600" fill="#2b241c">
              {round.bubble}
            </text>
          </g>
        )}
        <g transform={`translate(${move === 'run' ? 240 : 210} ${move === 'sit' ? 74 : 62}) scale(-2.4 2.4)`} style={{ transition: 'transform 400ms ease-out' }}>
          <g className={move === 'jump' ? 'anim-jump' : undefined}>
            <SpriteBody look={look} />
          </g>
        </g>
      </svg>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-display text-lg text-gold">Coach Mike</p>
        <SpeakButton text={line.text} size="sm" />
      </div>
      <p key={r} className="anim-fade-in font-display text-[20px] leading-snug">{line.text}</p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {!done && (
        <>
          <p className="mt-3 text-sm text-paper/75">{round.ask}</p>
          {!solved && (
            <div className="mt-2 grid gap-2">
              {round.options.map((o, k) => (
                <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>{o}</button>
              ))}
            </div>
          )}
        </>
      )}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {solved && (
        <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
          <p className="flex-1 text-sm text-hp">¡Bien! {r >= 4 ? `"${round.options[round.answer]}"` : `${round.options[round.answer]}: ${round.coachEs}`}</p>
          {r >= 4 && <SpeakButton text={round.options[round.answer]} size="sm" />}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>A las palabras</button>
        ) : solved ? (
          <button className={btnPrimary} onClick={next} autoFocus>Siguiente</button>
        ) : null}
      </div>
    </Panel>
  )
}
