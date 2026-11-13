import { useEffect, useMemo, useState } from 'react'
import { fillDeep } from '../game/gender'
import type { GameState, Question } from '../game/types'
import type { Update } from '../game/store'
import type { SpriteLook } from './Sprite'
import { questionById } from '../data/questions'
import { B1_01_CALL_IDS } from '../data/questions-b1-01'
import { ACCIDENT_ALARM, ACCIDENT_RESCUE, ACCIDENT_TALK, B1_01_ALARM, B1_01_TALKED } from '../data/b1Accident'
import { recordAnswer } from '../game/helpers'
import { canRecognize } from '../game/mic'
import { canSpeak, speak, stopSpeaking } from '../game/speech'
import { sfx } from '../game/sfx'
import { QuestionCard } from './QuestionCard'
import { MemoryScript } from './MemoryScript'
import { SpriteL } from './SpriteL'
import { btnGhost, btnPrimary, Panel } from './ui'

/** Lo que L grita después de cada ronda (la quinta ya no tiene voz) */
const SHOUTS = ["Stay there! We're coming!", 'Follow my voice! The fire exit is on your left!', 'Call the firefighters! We are on the third floor!', "Get out now! Don't use the lift!", '…']
/** El texto de L se hace más pequeño en cada ronda */
const SHOUT_SIZE = [26, 22, 18, 15, 14]

/**
 * Call for Help (B1-01, recuerdo 1). No es un minijuego del catálogo: es una secuencia de la escena.
 * L grita para sacar a todos del edificio mientras el humo se espesa. 5 rondas, una pregunta cada una (tag b1-01-call).
 * La barra de voz baja 20% por ronda aunque aciertes (es narrativo). Equivocarse no quita vida ni baja más la barra:
 * se muestra la pista y se repite la misma ronda. Ronda 5: decirlo en voz alta (o escribirlo, sin micrófono).
 */
export function CallForHelp({ update, onDone }: { update: Update; onDone: () => void }) {
  const [round, setRound] = useState(0)
  /** null = respondiendo · true = acertó (se ve el grito) · false = falló (pista y reintento) */
  const [result, setResult] = useState<boolean | null>(null)
  const [attempt, setAttempt] = useState(0)
  // Sin micrófono (o si falla), la última ronda se escribe
  const [noMic, setNoMic] = useState(!canRecognize)
  const last = round === B1_01_CALL_IDS.length - 1
  const voice = Math.max(0, 100 - 20 * (round + (result ? 1 : 0)))

  const q = useMemo<Question | null>(() => {
    const id = B1_01_CALL_IDS[round]
    if (!last) return questionById(id) ?? null
    const base = questionById(noMic ? `T-${id}` : `S-${id}`)
    if (!base) return null
    return noMic ? base : { ...base, prompt: 'Con lo que te queda de voz… di en voz alta:' }
  }, [round, last, noMic])

  // Se corta la voz: al acertar la última ronda, silencio
  useEffect(() => {
    if (!result) return
    if (last) {
      stopSpeaking()
      return
    }
    if (round >= 1) sfx('cough')
    const t = window.setTimeout(() => speak(SHOUTS[round], round >= 2, 'male'), round >= 1 ? 350 : 0)
    return () => window.clearTimeout(t)
  }, [result, round, last])

  function answer(ok: boolean) {
    if (q) update((s) => recordAnswer(s, q, ok))
    setResult(ok)
  }

  function next() {
    if (last) return onDone()
    setResult(null)
    setRound(round + 1)
  }

  const shout = result ? SHOUTS[round] : round > 0 ? SHOUTS[round - 1] : null
  const shoutRound = result ? round : round - 1
  const cough = shoutRound >= 1 && shout !== '…'

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-ink">
      <div className="mx-auto flex max-w-md flex-col gap-3 px-3 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#c9b8e8]">Recuerdo 1</p>
            <p className="font-display text-xl text-gold">Call for Help</p>
          </div>
          <p className="text-sm text-paper/60">Ronda {round + 1} de {B1_01_CALL_IDS.length}</p>
        </div>

        <SmokeHallway level={round + (result ? 1 : 0)} mute={voice <= 60} />

        {/* Barra de voz: baja aunque aciertes */}
        <div>
          <div className="mb-1 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-paper/60">
            <span>Voz de L</span>
            <span>{voice}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-black/40" role="meter" aria-label="Voz de L" aria-valuemin={0} aria-valuemax={100} aria-valuenow={voice}>
            <div className="h-full rounded-full bg-[#8fd0d4] transition-[width] duration-700 motion-reduce:transition-none" style={{ width: `${voice}%` }} />
          </div>
        </div>

        {/* Lo que L grita: cada vez más pequeño, con tos */}
        {shout && (
          <p key={`${shoutRound}-${shout}`} className="anim-fade-in text-center font-display leading-snug text-paper" style={{ fontSize: SHOUT_SIZE[Math.max(0, shoutRound)] }} aria-live="polite">
            {cough && <span className="mr-1 text-paper/50">*cough*</span>}
            {shout === '…' ? '…' : `"${shout}"`}
          </p>
        )}

        {result === null && last && <p className="text-center text-sm text-[#c9b8e8]">Con lo que te queda de voz…</p>}

        {result !== true && q && (
          <Panel>
            {round === 0 && !canSpeak && q.audio && (
              <p className="mb-2 rounded-lg bg-panel-2 px-3 py-2 text-sm text-paper/80">
                (No se puede reproducir el audio aquí. Lo que se oye detrás de la puerta: "{q.audio}")
              </p>
            )}
            <QuestionCard
              key={`${q.id}-${attempt}`}
              q={q}
              speaker="Alguien en el pasillo"
              reveal={false}
              onSkip={q.kind === 'speak' ? () => setNoMic(true) : undefined}
              onAnswer={answer}
            />
            {result === false && (
              <div className="anim-fade-in mt-3">
                <p className="rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {q.tip}</p>
                <button
                  className={`${btnPrimary} mt-3 w-full`}
                  autoFocus
                  onClick={() => {
                    setResult(null)
                    setAttempt(attempt + 1)
                  }}
                >
                  Intentar otra vez
                </button>
              </div>
            )}
          </Panel>
        )}

        {result === true && (
          <button className={`${btnPrimary} w-full`} autoFocus onClick={next}>
            {last ? 'Seguir' : 'Siguiente ronda'}
          </button>
        )}
        {result === null && last && !noMic && (
          <button className={`${btnGhost} text-sm`} onClick={() => setNoMic(true)}>No tengo micrófono: escribirlo</button>
        )}
      </div>
    </div>
  )
}

/** El pasillo con humo: más nubes y más espesas en cada ronda. L de perfil, con la mano en la garganta cuando pierde la voz */
function SmokeHallway({ level, mute }: { level: number; mute: boolean }) {
  const clouds = [
    { x: 250, y: 120, r: 26 },
    { x: 210, y: 92, r: 22 },
    { x: 280, y: 70, r: 28 },
    { x: 160, y: 110, r: 24 },
    { x: 120, y: 60, r: 30 },
    { x: 60, y: 96, r: 26 },
    { x: 200, y: 40, r: 30 },
  ]
  const shown = clouds.slice(0, Math.min(clouds.length, 1 + level * 1.5))
  return (
    <svg viewBox="0 0 320 170" className="w-full rounded-2xl border-2 border-line" role="img" aria-label={`Pasillo con humo, nivel ${level} de 5`}>
      <rect width="320" height="170" fill="#4a5462" />
      <rect y="120" width="320" height="50" fill="#5d6878" />
      <line x1="0" y1="120" x2="320" y2="120" stroke="#3a4250" strokeWidth="2" />
      {/* Puertas de las aulas y la salida de emergencia */}
      <rect x="20" y="58" width="34" height="62" fill="#3a4250" />
      <rect x="140" y="58" width="34" height="62" fill="#3a4250" />
      <rect x="262" y="58" width="40" height="62" fill="#2a3a30" />
      <rect x="264" y="38" width="36" height="14" rx="2" fill="#2e9d5b" />
      <text x="282" y="49" textAnchor="middle" fontSize="9" fontWeight="700" fill="#e8f5ec" fontFamily="Fredoka, Nunito, system-ui, sans-serif">EXIT</text>
      {/* Luz roja de la alarma */}
      <circle cx="100" cy="30" r="6" fill="#d64545" className="b1-alarm-light" />
      <g transform="translate(60 70) scale(2.4)">
        <SpriteL pose="profile" mute={mute} />
      </g>
      <defs>
        <filter id="b1-smoke-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <g className="b1-smoke" filter="url(#b1-smoke-blur)">
        {shown.map((c, k) => (
          <circle key={k} cx={c.x} cy={c.y} r={c.r * 1.3} fill="#c4c8cf" opacity={0.3 + level * 0.1} />
        ))}
      </g>
      {level >= 4 && <rect width="320" height="170" fill="#9aa0aa" opacity="0.25" />}
    </svg>
  )
}

/**
 * La secuencia completa del recuerdo 1 (la tarea del amigo): charla → alarma → Call for Help → rescate.
 * Guarda puntos de control (B1_01_TALKED, B1_01_ALARM) para retomar donde quedó si se cierra el juego.
 * onDone: termina la tarea (y con ella el recuerdo: exitMemory en data/tasks.ts).
 */
export function TheAccident({ state, update, friend, onDone }: { state: GameState; update: Update; friend: SpriteLook; onDone: () => void }) {
  const [stage, setStage] = useState<'talk' | 'alarm' | 'call' | 'rescue'>(() =>
    state.opened.includes(B1_01_ALARM) ? 'call' : state.opened.includes(B1_01_TALKED) ? 'alarm' : 'talk',
  )
  const mark = (id: string) => update((s) => (s.opened.includes(id) ? s : { ...s, opened: [...s.opened, id] }))

  if (stage === 'call') return <CallForHelp update={update} onDone={() => setStage('rescue')} />
  const lines = fillDeep(stage === 'talk' ? ACCIDENT_TALK : stage === 'alarm' ? ACCIDENT_ALARM : ACCIDENT_RESCUE, state)
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center bg-black/40 px-3 pb-6">
      <div className="w-full max-w-md">
        <MemoryScript
          key={stage}
          lines={lines}
          friend={friend}
          onDone={() => {
            if (stage === 'talk') {
              mark(B1_01_TALKED)
              setStage('alarm')
            } else if (stage === 'alarm') {
              mark(B1_01_ALARM)
              setStage('call')
            } else onDone()
          }}
        />
      </div>
    </div>
  )
}
