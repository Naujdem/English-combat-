import { useState } from 'react'
import { mixed } from '../game/mix'
import { voiceOf } from '../game/speech'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

type Line = { text: string; es: string }

/** Una opción del jugador: su valor (buena / neutral / mala) y la reacción del personaje */
export type DebateOption = { en: string; es: string; value: 'good' | 'neutral' | 'bad'; reply?: Line }
export type DebateTurn = Line & { options: DebateOption[] }
/** Desenlaces según las respuestas buenas: high (3 o más), mid (1-2), low (0) */
export type DebateEndings = { high: Line; mid: Line; low: Line }
export type DebateTier = keyof DebateEndings

/**
 * Dialogue Under Pressure (versión de debate, A2-06): turnos con tres respuestas (buena, neutral, mala).
 * No hay respuesta incorrecta: el personaje reacciona distinto, se cuentan las buenas y al final hay un desenlace.
 * Siempre se termina (no bloquea la misión).
 * reply y endings son opcionales (A2-07): sin reply se sigue al siguiente turno; sin endings se cierra tras el último.
 * onClose recibe el desenlace (high / mid / low) para que la misión pueda guardarlo.
 */
export function DebateTalk({ name, look, title, turns, endings, ask, onClose }: { name: string; look: SpriteLook; title: string; turns: DebateTurn[]; endings?: DebateEndings; ask?: string; onClose: (done: boolean, tier?: DebateTier) => void }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<DebateOption | null>(null)
  const [good, setGood] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const end = i >= turns.length
  const tier: DebateTier = good >= 3 ? 'high' : good >= 1 ? 'mid' : 'low'
  const turn = turns[i]
  const line: Line = end && endings ? endings[tier] : (picked?.reply ?? turn)
  const last = i === turns.length - 1
  const tone = picked?.value === 'good' ? 'bg-hp/15 text-hp' : picked?.value === 'bad' ? 'bg-danger/15 text-[#f3b0b0]' : 'bg-paper/10 text-paper/80'

  function pick(o: DebateOption) {
    setPicked(o)
    if (o.value === 'good') setGood((n) => n + 1)
  }

  function next() {
    if (last && !endings) return onClose(true, tier)
    setPicked(null)
    setI(i + 1)
  }

  return (
    <Panel>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">Dialogue Under Pressure</p>
      <p className="font-display text-lg">{title}</p>
      <div className="mt-2 flex items-center gap-3">
        <SpriteIcon look={look} size={48} />
        <p className="flex-1 font-display text-lg text-gold">{name}</p>
        <SpeakButton key={line.text} text={line.text} size="sm" auto voice={voiceOf(look)} />
      </div>
      {!end && <p className="mt-1 text-xs text-paper/50">Turno {i + 1} de {turns.length}</p>}
      {picked && (
        <div className={`anim-fade-in mt-2 rounded-lg px-3 py-2 text-sm ${tone}`}>
          <p>Tú: "{picked.en}"</p>
          {showEs && <p className="mt-0.5 opacity-75">{picked.es}</p>}
        </div>
      )}
      <p key={line.text} className="anim-fade-in mt-2 text-[17px] leading-relaxed">
        <Tappable text={line.text} />
      </p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {!end && !picked && (
        <>
          <p className="mt-3 text-sm text-paper/75">¿Qué le respondes? {ask ?? 'Defiende la tradición.'}</p>
          <div className="mt-2 grid gap-2">
            {mixed(turn.options, turn.text).map(([o, k]) => (
              <button key={k} className={`${btn} text-left text-base`} onClick={() => pick(o)}>
                {o.en}
              </button>
            ))}
          </div>
        </>
      )}
      {end && <p className="anim-fade-in mt-3 text-sm text-paper/75">Respuestas fuertes: {good} de {turns.length}.</p>}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {picked && (
          <button className={btnPrimary} onClick={next} autoFocus>
            {last && !endings ? 'Listo' : 'Siguiente'}
          </button>
        )}
        {end && (
          <button className={btnPrimary} onClick={() => onClose(true, tier)} autoFocus>
            Listo
          </button>
        )}
      </div>
    </Panel>
  )
}
