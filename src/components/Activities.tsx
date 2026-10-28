import { useMemo, useState } from 'react'
import type { GameState } from '../game/types'
import { SCHOOL_VOCAB } from '../data/activities'
import { DAYS, HOURS, SESSIONS, type Session } from '../data/schedule'

type Word = { en: string; es: string }
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { SpeakButton } from './SpeakButton'

function sample<T>(list: T[], n: number): T[] {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

type VocabQ = { ask: string; options: string[]; answer: number; toEs: boolean; en: string }

function buildVocabQuiz(words: Word[]): VocabQ[] {
  return sample(words, 5).map((w, i) => {
    const toEs = i % 2 === 0
    const others = sample(words.filter((x) => x.en !== w.en), 2)
    const opts = sample([w, ...others], 3)
    return {
      ask: toEs ? w.en : w.es,
      options: opts.map((o) => (toEs ? o.es : o.en)),
      answer: opts.indexOf(w),
      toEs,
      en: w.en,
    }
  })
}

/** Repaso de vocabulario (biblioteca, patio...). Con 4 de 5 aciertos se gana un escudo de palabras. */
export function VocabActivity({
  state,
  onClose,
  words = SCHOOL_VOCAB,
  place = 'Biblioteca',
  title = 'Repaso de vocabulario',
  rewardText = 'Los libros te dan un escudo de palabras: bloquea un error en combate.',
}: {
  state: GameState
  /** passed: acertó 4 de 5 o más */
  onClose: (passed: boolean) => void
  words?: Word[]
  place?: string
  title?: string
  rewardText?: string
}) {
  const quiz = useMemo(() => buildVocabQuiz(words), [words])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const done = i >= quiz.length
  const full = state.items.shield >= 2
  const q = quiz[i]

  function choose(k: number) {
    if (picked !== null) return
    setPicked(k)
    if (k === q.answer) setScore((s) => s + 1)
  }

  return (
    <Panel>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{place}</p>
          <h2 className="font-display text-xl">{title}</h2>
        </div>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      {!done ? (
        <>
          <p className="text-sm text-paper/60">
            {i + 1} de {quiz.length} · {q.toEs ? '¿Qué significa?' : '¿Cómo se dice en inglés?'}
          </p>
          <div className="mt-1 flex items-center gap-3">
            <p className="font-display text-[26px]">{q.ask}</p>
            {(q.toEs || picked !== null) && <SpeakButton text={q.en} />}
          </div>
          <div className="mt-3 grid gap-2">
            {q.options.map((o, k) => {
              const look =
                picked === null ? '' : k === q.answer ? 'border-hp bg-hp/20' : picked === k ? 'border-danger bg-danger/20' : 'opacity-40'
              return (
                <button key={k} className={`${btn} text-left text-base disabled:opacity-100 ${look}`} onClick={() => choose(k)} disabled={picked !== null}>
                  {o}
                </button>
              )
            })}
          </div>
          {picked !== null && (
            <div className="mt-3 flex justify-end">
              <button className={btnPrimary} onClick={() => { setPicked(null); setI(i + 1) }} autoFocus>Siguiente</button>
            </div>
          )}
        </>
      ) : (
        <div className="anim-fade-in">
          <p className="font-display text-2xl">{score} de {quiz.length}</p>
          {score >= 4 ? (
            <p className="mt-1 text-[15px] text-paper/80">
              {full ? '¡Muy bien! Ya tienes el máximo de escudos (2), pero el repaso siempre ayuda.' : `¡Muy bien! ${rewardText}`}
            </p>
          ) : (
            <p className="mt-1 text-[15px] text-paper/80">Necesitas 4 aciertos para ganar un escudo. Puedes intentarlo otra vez.</p>
          )}
          <button className={`${btnPrimary} mt-4 w-full`} onClick={() => onClose(score >= 4)} autoFocus>Continuar</button>
        </div>
      )}
    </Panel>
  )
}

/** Horario de la semana: muestra las clases que el jugador ya leyó en la pizarra */
export function Timetable({ opened, highlight }: { opened: string[]; highlight?: Session | null }) {
  const known = SESSIONS.filter((s) => opened.includes(s.id) || s.id === highlight?.id).flatMap((s) =>
    s.entries.map((e) => ({ ...e, fresh: s.id === highlight?.id })),
  )
  return (
    <div className="overflow-hidden rounded-xl border border-[#7a5230] bg-[#2f5d50] p-2 text-paper">
      <p className="mb-1 text-center font-display text-sm">Class schedule</p>
      <table className="w-full table-fixed border-collapse text-center text-[11px]">
        <thead>
          <tr>
            <th className="w-[13%] font-normal text-paper/60" />
            {DAYS.map((d) => (
              <th key={d.id} className="pb-1 font-semibold">{d.id}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.map((h) => (
            <tr key={h}>
              <td className="py-1 text-paper/60">{h}</td>
              {DAYS.map((d) => {
                const e = known.find((k) => k.day === d.id && k.hour === h)
                return (
                  <td key={d.id} className="p-0.5">
                    <div
                      className={`rounded-md px-0.5 py-1 leading-tight ${
                        e ? (e.fresh ? 'anim-pop bg-gold/30 font-semibold text-paper' : 'bg-black/20') : 'bg-black/10 text-paper/30'
                      }`}
                    >
                      {e ? e.subject : '?'}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Sesión de lectura del horario en la pizarra: un texto corto con preguntas de comprensión.
 * Al terminar da una tiza para retar al esbirro de esa sesión.
 */
export function ReadingActivity({
  state,
  session,
  minionName,
  onClose,
}: {
  state: GameState
  session: Session
  minionName: string
  onClose: (finished: boolean) => void
}) {
  const r = session
  const [showEs, setShowEs] = useState(false)
  const [i, setI] = useState(-1)
  const [tip, setTip] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const reading = i === -1
  const done = i >= r.questions.length
  const q = r.questions[i]

  function choose(k: number) {
    if (k === q.answer) {
      setOk(true)
      setTip(null)
    } else setTip(q.tip)
  }

  return (
    <Panel className="max-h-[88vh] overflow-y-auto">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">Pizarra del aula · Sesión {SESSIONS.indexOf(r) + 1} de {SESSIONS.length}</p>
          <h2 className="font-display text-xl">{r.title}</h2>
        </div>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      <Timetable opened={state.opened} highlight={done ? r : null} />

      {!done && (
        <div className="mt-3 rounded-xl bg-[#2f5d50] p-3 text-[15px] leading-relaxed text-paper">
          {r.text.map((p, k) => (
            <div key={k} className={`flex items-start gap-2 ${k ? 'mt-2' : ''}`}>
              <p className="flex-1">
                {p}
                {showEs && <span className="mt-0.5 block text-sm text-paper/60">{r.es[k]}</span>}
              </p>
              <SpeakButton text={p} size="sm" />
            </div>
          ))}
        </div>
      )}

      {reading ? (
        <div className="mt-3 flex items-center justify-between">
          <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar traducción' : 'Traducir'}</button>
          <button className={btnPrimary} onClick={() => setI(0)} autoFocus>Responder preguntas</button>
        </div>
      ) : !done ? (
        <div className="anim-fade-in mt-3">
          <p className="text-sm text-paper/60">Pregunta {i + 1} de {r.questions.length}</p>
          <div className="flex items-center gap-2">
            <p className="flex-1 font-display text-[19px]">{q.q}</p>
            <SpeakButton text={q.q} size="sm" />
          </div>
          <div className="mt-2 grid gap-2">
            {q.options.map((o, k) => (
              <button
                key={k}
                className={`${btn} text-left text-base disabled:opacity-100 ${ok && k === q.answer ? 'border-hp bg-hp/20' : ok ? 'opacity-40' : ''}`}
                onClick={() => choose(k)}
                disabled={ok}
              >
                {o}
              </button>
            ))}
          </div>
          {tip && <p className="mt-2 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Vuelve a leer: {tip}</p>}
          {ok && (
            <div className="mt-3 flex justify-end">
              <button className={btnPrimary} onClick={() => { setOk(false); setI(i + 1) }} autoFocus>Siguiente</button>
            </div>
          )}
        </div>
      ) : (
        <div className="anim-fade-in mt-3">
          <p className="font-display text-xl text-gold">¡Sesión completa: {r.subjectEs}!</p>
          <p className="mt-1 text-[15px] text-paper/80">
            Las clases nuevas quedaron en tu horario. Junto a la pizarra encuentras una tiza: llévasela a <b>{minionName}</b> para retarlo.
          </p>
          <button className={`${btnPrimary} mt-4 w-full`} onClick={() => onClose(true)} autoFocus>Tomar la tiza</button>
        </div>
      )}
    </Panel>
  )
}
