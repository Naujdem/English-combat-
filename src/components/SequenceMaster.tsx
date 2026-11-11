import { useMemo, useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/** Un paso del plan, en el orden correcto */
export type SequenceStep = { en: string; es: string }

/** Desafío lingüístico al final de un tramo de carrera (opción múltiple, sin reintento) */
export type RaceChallenge = { q: string; es: string; options: string[]; answer: number; tip: string }
/** Un tramo de la carrera: pasos en orden y, opcional, un desafío */
export type RaceLeg = { title: string; steps: SequenceStep[]; challenge?: RaceChallenge }
/**
 * Modo carrera (A2-07): varios tramos seguidos de Sequence Master. La posición sube con un tramo
 * sin errores o un desafío acertado, y baja con el primer error del tramo o un desafío fallado.
 * Siempre se llega a la meta (no bloquea la misión).
 */
export type RaceSetup = { runners: number; start: number; legs: RaceLeg[]; /** Los otros competidores: palabra e ícono (por defecto, caballos: A2-07) */ rival?: { word: string; icon: string } }

const ord = (n: number) => `${n}.º`

/** Pista de carrera: corredores en fila; el primero va a la derecha (más cerca de la meta) */
function Track({ position, runners, icon = '🐎' }: { position: number; runners: number; icon?: string }) {
  return (
    <div className="mt-3 rounded-lg bg-panel-2 px-3 py-2">
      <div className="flex items-center justify-between text-xs text-paper/60">
        <span>Salida</span>
        <span className="font-display text-sm text-gold">Posición: {ord(position)} de {runners}</span>
        <span>Meta 🏁</span>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5 border-t border-dashed border-paper/20 pt-1.5">
        {Array.from({ length: runners }, (_, k) => runners - k).map((place) => (
          <div key={place} className={`flex h-7 flex-1 items-center justify-center rounded-md text-xs transition-all duration-300 ${place === position ? 'bg-gold font-semibold text-ink' : 'bg-paper/10 text-paper/40'}`}>
            {place === position ? 'Tú' : icon}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Sequence Master (versión simple, A2-03): los pasos salen desordenados y el jugador
 * los toca en orden. Feedback inmediato en cada toque; al ordenarlos todos se puede cerrar.
 * Con `race` (A2-07) recorre varios tramos y muestra la posición en la pista.
 */
export function SequenceMaster({ title, intro, steps, hint, race, onClose }: { title: string; intro: SequenceStep; steps: SequenceStep[]; hint?: string; race?: RaceSetup; onClose: (done: boolean) => void }) {
  const [leg, setLeg] = useState(0)
  const [position, setPosition] = useState(() => (race ? Math.min(race.runners, Math.max(1, race.start)) : 1))
  const [legSlip, setLegSlip] = useState(false)
  const [note, setNote] = useState<{ text: string; good: boolean } | null>(null)
  const [pick, setPick] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)
  const cur = race ? race.legs[leg] : null
  const curSteps = cur ? cur.steps : steps
  const shuffled = useMemo(() => mixed(curSteps, `${title}-${leg}`), [curSteps, title, leg])
  const [placed, setPlaced] = useState<number[]>([])
  const [wrong, setWrong] = useState<number | null>(null)
  const [showEs, setShowEs] = useState(false)
  const done = placed.length === curSteps.length

  const move = (delta: number) => {
    if (!race) return position
    const next = Math.min(race.runners, Math.max(1, position + delta))
    setPosition(next)
    return next
  }

  function tap(k: number) {
    if (done || placed.includes(k)) return
    if (k === placed.length) {
      sfx('correct')
      const now = [...placed, k]
      setPlaced(now)
      setWrong(null)
      if (race && now.length === curSteps.length && !legSlip) {
        const p = move(-1)
        setNote({ text: `¡Tramo perfecto! Ganas velocidad: vas en el ${ord(p)} puesto.`, good: true })
      } else if (race && now.length === curSteps.length) {
        setNote({ text: `Tramo terminado. Vas en el ${ord(position)} puesto.`, good: false })
      }
    } else {
      sfx('wrong')
      setWrong(k)
      if (race && !legSlip) {
        setLegSlip(true)
        const p = move(1)
        setNote({ text: `¡Paso equivocado! Pierdes velocidad: bajas al ${ord(p)} puesto.`, good: false })
      }
    }
  }

  function answer(k: number) {
    if (!cur?.challenge || pick !== null) return
    setPick(k)
    if (k === cur.challenge.answer) {
      sfx('correct')
      const p = move(-1)
      setNote({ text: `¡Bien dicho! Adelantas a otro ${race?.rival?.word ?? 'caballo'}: vas en el ${ord(p)} puesto.`, good: true })
    } else {
      sfx('wrong')
      const p = move(1)
      setNote({ text: `${cur.challenge.tip} Pierdes un puesto: vas en el ${ord(p)}.`, good: false })
    }
  }

  function nextLeg() {
    if (!race) return
    if (leg + 1 >= race.legs.length) {
      setFinished(true)
      setNote(null)
      return
    }
    setLeg(leg + 1)
    setPlaced([])
    setWrong(null)
    setLegSlip(false)
    setPick(null)
    setNote(null)
  }

  const challengeOpen = !!race && done && !!cur?.challenge && pick === null
  const legClosed = !!race && done && (!cur?.challenge || pick !== null)

  if (race && finished) {
    const end = position === 1 ? '¡Ganaste la carrera!' : position <= 3 ? '¡Buena carrera! Llegaste entre los primeros.' : 'Llegaste a la meta. La próxima vez puedes ir más rápido.'
    return (
      <Panel>
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">Sequence Master · Carrera</p>
        <p className="font-display text-lg">{title}</p>
        <Track position={position} runners={race.runners} icon={race.rival?.icon} />
        <p className={`anim-fade-in mt-3 rounded-lg px-3 py-2 text-sm ${position <= 3 ? 'bg-hp/15 text-hp' : 'bg-paper/10 text-paper/80'}`}>
          Cruzaste la meta en el {ord(position)} puesto de {race.runners}. {end}
        </p>
        <div className="mt-4 flex justify-end">
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Listo</button>
        </div>
      </Panel>
    )
  }

  return (
    <Panel>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">Sequence Master{race ? ' · Carrera' : ''}</p>
      <p className="font-display text-lg">{title}</p>
      {race && cur && <p className="text-sm text-paper/70">Tramo {leg + 1} de {race.legs.length} · {cur.title}</p>}
      {race && <Track position={position} runners={race.runners} icon={race.rival?.icon} />}
      <div className="mt-2 flex items-start gap-2">
        <p className="flex-1 text-[15px] leading-relaxed"><Tappable text={intro.en} /></p>
        <SpeakButton text={intro.en} size="sm" />
      </div>
      {showEs && <p className="mt-1 text-sm text-paper/60">{intro.es}</p>}

      <ol className="mt-3 grid gap-1.5">
        {curSteps.map((_, n) => (
          <li key={n} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[15px] ${placed[n] !== undefined ? 'anim-fade-in bg-hp/15 text-hp' : 'border border-dashed border-paper/20 text-paper/40'}`}>
            <span className="font-display">{n + 1}.</span>
            <span>{placed[n] !== undefined ? curSteps[placed[n]].en : '...'}</span>
          </li>
        ))}
      </ol>

      {!done && (
        <>
          <p className="mt-3 text-sm text-paper/75">Toca los pasos en orden: ¿qué va {placed.length === 0 ? 'primero' : 'después'}?</p>
          <div className="mt-2 grid gap-2">
            {shuffled
              .filter(([, k]) => !placed.includes(k))
              .map(([s, k]) => (
                <button key={k} className={`${btn} text-left text-base ${wrong === k ? 'anim-shake border-danger' : ''}`} onClick={() => tap(k)}>
                  {s.en}
                  {showEs && <span className="block text-xs text-paper/50">{s.es}</span>}
                </button>
              ))}
          </div>
        </>
      )}
      {wrong !== null && !done && !race && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Ese no va ahí. {hint ?? 'Mira las horas del plan.'}</p>}
      {wrong !== null && !done && race && note && !note.good && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">{note.text} {hint}</p>}
      {done && !race && <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Plan perfecto! Todo en orden.</p>}

      {race && done && note && (pick === null || cur?.challenge === undefined) && (
        <p className={`anim-fade-in mt-3 rounded-lg px-3 py-2 text-sm ${note.good ? 'bg-hp/15 text-hp' : 'bg-paper/10 text-paper/80'}`}>{note.text}</p>
      )}

      {cur?.challenge && done && (
        <div className="anim-fade-in mt-3">
          <div className="flex items-start gap-2">
            <p className="flex-1 text-[15px] font-semibold"><Tappable text={cur.challenge.q} /></p>
            <SpeakButton text={cur.challenge.q.replace('___', '...')} size="sm" />
          </div>
          {showEs && <p className="mt-1 text-sm text-paper/60">{cur.challenge.es}</p>}
          <div className="mt-2 grid gap-2">
            {mixed(cur.challenge.options, cur.challenge.q).map(([o, k]) => (
              <button
                key={k}
                disabled={pick !== null}
                className={`${btn} text-left text-base ${pick !== null && k === cur.challenge!.answer ? 'border-hp text-hp' : pick === k ? 'border-danger text-[#f3b0b0]' : ''}`}
                onClick={() => answer(k)}
              >
                {o}
              </button>
            ))}
          </div>
          {pick !== null && note && <p className={`anim-fade-in mt-3 rounded-lg px-3 py-2 text-sm ${note.good ? 'bg-hp/15 text-hp' : 'bg-danger/15 text-[#f3b0b0]'}`}>{note.text}</p>}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {race ? (
          legClosed ? (
            <button className={btnPrimary} onClick={nextLeg} autoFocus>{leg + 1 >= race.legs.length ? 'Ver la llegada' : 'Siguiente tramo'}</button>
          ) : challengeOpen ? null : (
            <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
          )
        ) : done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Listo</button>
        ) : (
          <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
        )}
      </div>
    </Panel>
  )
}
