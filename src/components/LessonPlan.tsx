import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/**
 * La clase de mañana (escuela, 2056): el profesor Garcia (Leo adulto) prepara su plan de clase
 * en la pizarra holográfica. Hay que completar cada línea con am / is / are going to.
 */
type Row = { time: string; before: string; after: string; options: string[]; answer: number; tip: string; es: string }

const ROWS: Row[] = [
  { time: '8:00', before: 'Tomorrow I', after: 'teach a new lesson.', options: ['am going to', 'is going to', 'going to'], answer: 0, tip: 'Con I: am going to.', es: 'Mañana voy a enseñar una lección nueva.' },
  { time: '8:15', before: 'First, the students', after: 'read a story.', options: ['are going to', 'is going to', 'are go to'], answer: 0, tip: 'Varios (they): are going to.', es: 'Primero, los estudiantes van a leer un cuento.' },
  { time: '8:45', before: 'Then Theo', after: 'write on the smart board.', options: ['is going to', 'are going to', 'is going'], answer: 0, tip: 'Theo (he): is going to.', es: 'Luego Theo va a escribir en la pizarra digital.' },
  { time: '9:30', before: 'We', after: 'sing a song in English.', options: ['are going to', 'am going to', 'are going'], answer: 0, tip: 'We: are going to (y no olvides el to).', es: 'Vamos a cantar una canción en inglés.' },
  { time: '10:00', before: 'After the break, the robot', after: 'clean the classroom.', options: ['is going to', 'are going to', 'going to'], answer: 0, tip: 'The robot (it): is going to.', es: 'Después del recreo, el robot va a limpiar el salón.' },
  { time: 'Next week', before: 'My class', after: 'visit the old farm!', options: ['is going to', 'are going to', 'is go to'], answer: 0, tip: 'My class (it, una clase): is going to.', es: '¡La próxima semana mi clase va a visitar la granja vieja!' },
]

export function LessonPlan({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [tip, setTip] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const done = i >= ROWS.length
  const r = ROWS[Math.min(i, ROWS.length - 1)]
  const sentence = (row: Row) => `${row.before} ${row.options[row.answer]} ${row.after}`

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">La clase de mañana · {Math.min(i + 1, ROWS.length)} de {ROWS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">
        El profesor Garcia escribe su plan en la pizarra digital. Completa cada línea con <b className="text-paper">am / is / are going to</b>.
      </p>

      <div className="mt-2 rounded-xl border-2 border-[#2f7fbf] bg-[#12263a] p-2 text-[15px] text-[#d9f3ff]">
        <p className="text-center font-display text-[#7fe0ff]">LESSON PLAN · TOMORROW</p>
        {ROWS.map((row, k) => (
          <div key={k} className={`mt-1 flex gap-2 rounded px-1 ${k === i ? 'bg-[#2f7fbf]/40' : ''} ${k > i ? 'opacity-40' : ''}`}>
            <span className="w-16 shrink-0 text-[12px] leading-6 text-[#7fe0ff]">{row.time}</span>
            <span>
              {row.before}{' '}
              {k < i || (k === i && ok) ? <b className="text-[#b48cf0]">{row.options[row.answer]}</b> : <span className="text-[#7fe0ff]">___</span>} {row.after}
            </span>
          </div>
        ))}
      </div>

      {!done && !ok && (
        <div className="mt-3 grid gap-2">
          {mixed(r.options).map(([o, k]) => (
            <button
              key={k}
              className={`${btn} text-left text-base`}
              onClick={() => (k === r.answer ? (sfx('correct'), setOk(true), setTip(null)) : (sfx('wrong'), setTip(r.tip)))}
            >
              {r.before} <b>{o}</b> {r.after}
            </button>
          ))}
        </div>
      )}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {!done && ok && (
        <>
          <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
            <p className="flex-1 text-sm text-hp"><Tappable text={sentence(r)} /> <span className="text-paper/60">({r.es})</span></p>
            <SpeakButton text={sentence(r)} size="sm" voice="male" />
          </div>
          <button
            className={`${btnPrimary} mt-3 w-full`}
            autoFocus
            onClick={() => {
              setOk(false)
              if (i === ROWS.length - 1) return onClose(true)
              setI(i + 1)
            }}
          >
            {i === ROWS.length - 1 ? 'Listo' : 'Siguiente línea'}
          </button>
        </>
      )}
    </Panel>
  )
}
