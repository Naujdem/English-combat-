import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'

/**
 * La lista de asistencia de la señora Higgins (1996): mirar la tabla de la semana pasada
 * y responder con was / were: Was Greg here on Monday? — No, he wasn't.
 */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const LIST: { name: string; days: boolean[] }[] = [
  { name: 'Greg', days: [false, true, true, true, true] },
  { name: 'Tina', days: [true, true, true, false, true] },
  { name: 'Paul', days: [true, true, false, false, true] },
  { name: 'Rosa', days: [true, false, true, true, true] },
  { name: 'Sam', days: [true, true, true, false, false] },
]

type Round = { q: string; es: string; options: string[]; answer: number; tip: string; mark: [number, number][] }

const ROUNDS: Round[] = [
  {
    q: 'Was Greg here on Monday?',
    es: '¿Greg estuvo aquí el lunes?',
    options: ['Yes, he was.', "No, he wasn't.", 'No, he weren\'t.'],
    answer: 1,
    tip: 'Mira la fila de Greg, columna Mon: hay una ✗. Con he: No, he wasn\'t.',
    mark: [[0, 0]],
  },
  {
    q: 'Were Tina and Rosa here on Wednesday?',
    es: '¿Tina y Rosa estuvieron aquí el miércoles?',
    options: ['Yes, they were.', 'Yes, they was.', "No, they weren't."],
    answer: 0,
    tip: 'Las dos tienen ✓ el miércoles. Con they: Yes, they were.',
    mark: [[1, 2], [3, 2]],
  },
  {
    q: "Who wasn't here on Tuesday?",
    es: '¿Quién no estuvo aquí el martes?',
    options: ['Paul.', 'Rosa.', 'Sam.'],
    answer: 1,
    tip: 'Busca la ✗ en la columna Tue.',
    mark: [],
  },
  {
    q: 'Was Sam here on Friday?',
    es: '¿Sam estuvo aquí el viernes?',
    options: ["No, he wasn't.", 'Yes, he was.', "No, he isn't."],
    answer: 0,
    tip: 'Fila de Sam, columna Fri: ✗. Es pasado: wasn\'t, no isn\'t.',
    mark: [[4, 4]],
  },
  {
    q: 'How many students were here on Thursday?',
    es: '¿Cuántos estudiantes estuvieron aquí el jueves?',
    options: ['There were two.', 'There was two.', 'There were four.'],
    answer: 0,
    tip: 'Cuenta las ✓ del jueves (Thu): son dos. Varias personas: there were.',
    mark: [],
  },
]

export function Attendance({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [ok, setOk] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [es, setEs] = useState(false)
  const r = ROUNDS[i]
  const last = i === ROUNDS.length - 1

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">La lista de asistencia · {i + 1} de {ROUNDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">La semana pasada (last week). ✓ = estuvo aquí (was here) · ✗ = no estuvo (wasn't here).</p>

      <div className="mt-2 overflow-hidden rounded-xl border-2 border-[#8b5a2b] bg-[#f4efe4] text-ink">
        <div className="grid grid-cols-6 text-center text-[13px] font-semibold">
          <div className="border-b border-[#c9b79a] py-1 text-left pl-2">Name</div>
          {DAYS.map((d) => (
            <div key={d} className="border-b border-[#c9b79a] py-1">{d}</div>
          ))}
          {LIST.map((p, row) => (
            <div key={p.name} className="contents">
              <div className="border-b border-[#e0d4bd] py-1 pl-2 text-left font-display text-[15px]">{p.name}</div>
              {p.days.map((here, col) => {
                const hl = r.mark.some(([a, b]) => a === row && b === col)
                return (
                  <div key={col} className={`border-b border-[#e0d4bd] py-1 text-[15px] ${hl ? 'bg-gold/40' : ''} ${here ? 'text-[#2f7a33]' : 'text-[#b03030]'}`}>
                    {here ? '✓' : '✗'}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2">
        <p className="flex-1 text-[17px]">
          <span className="font-semibold text-gold">Mrs. Higgins: </span>
          <Tappable text={r.q} />
        </p>
        <SpeakButton text={r.q} size="sm" auto voice="female" />
      </div>
      {es && <p className="text-sm text-paper/60">{r.es}</p>}
      <button className="mt-1 text-xs font-semibold text-paper/55 underline underline-offset-4" onClick={() => setEs((v) => !v)}>
        {es ? 'Ocultar traducción' : 'Traducir'}
      </button>

      {!ok && (
        <div className="mt-2 grid gap-2">
          {r.options.map((o, k) => (
            <button
              key={o}
              className={`${btn} text-left text-base`}
              onClick={() => {
                if (k === r.answer) {
                  sfx('correct')
                  setOk(true)
                  setTip(null)
                } else {
                  sfx('wrong')
                  setTip(r.tip)
                }
              }}
            >
              {o}
            </button>
          ))}
        </div>
      )}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {ok && (
        <>
          <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
            <p className="flex-1 text-sm text-hp">¡Bien! "{r.options[r.answer]}"</p>
            <SpeakButton text={r.options[r.answer]} size="sm" />
          </div>
          <button
            className={`${btnPrimary} mt-3 w-full`}
            autoFocus
            onClick={() => {
              if (last) return onClose(true)
              setI(i + 1)
              setOk(false)
              setEs(false)
            }}
          >
            {last ? 'Listo' : 'Siguiente pregunta'}
          </button>
        </>
      )}
    </Panel>
  )
}
