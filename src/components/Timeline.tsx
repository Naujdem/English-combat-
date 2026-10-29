import { useMemo, useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/**
 * La historia del cine (1996), con Diana en la taquilla.
 * Parte 1: ordenar los momentos del cine del más viejo al más nuevo (in 1980 → yesterday).
 * Parte 2: mirar el calendario (hoy es viernes 14 de junio de 1996) y decir cuándo pasó algo:
 * two days ago, last week, yesterday, in 1980.
 */
const EVENTS: { when: string; text: string; es: string }[] = [
  { when: 'In 1980', text: 'In 1980, Mr. Clark opened the cinema.', es: 'En 1980, el señor Clark abrió el cine.' },
  { when: 'Ten years ago', text: 'Ten years ago, the cinema got a new screen.', es: 'Hace diez años, el cine tuvo una pantalla nueva.' },
  { when: 'Last year', text: 'Last year, Ray started work here.', es: 'El año pasado, Ray empezó a trabajar aquí.' },
  { when: 'Last week', text: 'Last week, Grace sold two hundred bags of popcorn.', es: 'La semana pasada, Grace vendió doscientas bolsas de palomitas.' },
  { when: 'Two days ago', text: 'Two days ago, a shiny thing fell on the film.', es: 'Hace dos días, una cosa brillante cayó sobre la película.' },
  { when: 'Yesterday', text: 'Yesterday, nobody came to the cinema.', es: 'Ayer no vino nadie al cine.' },
]

type Q = { q: string; es: string; options: string[]; answer: number; tip: string }
const QUESTIONS: Q[] = [
  { q: 'The film "Space Cats" started on Wednesday. When did it start?', es: 'La película empezó el miércoles. ¿Cuándo empezó?', options: ['Two days ago.', 'Ago two days.', 'Last two days.'], answer: 0, tip: 'Hoy es viernes: el miércoles fue hace dos días. Ago va después: two days ago.' },
  { q: 'Ray fixed the projector on Thursday. When did he fix it?', es: 'Ray arregló el proyector el jueves. ¿Cuándo lo arregló?', options: ['Yesterday.', 'In yesterday.', 'Last day.'], answer: 0, tip: 'Hoy es viernes: el jueves fue ayer, yesterday (sin "in").' },
  { q: 'Diana went to the beach from June 3 to June 7. When did she go?', es: 'Diana fue a la playa del 3 al 7 de junio. ¿Cuándo fue?', options: ['Last week.', 'The last week.', 'In last week.'], answer: 0, tip: 'Del 3 al 7 fue la semana pasada: last week (sin "the" ni "in").' },
  { q: 'When did Mr. Clark open the cinema?', es: '¿Cuándo abrió el señor Clark el cine?', options: ['In 1980.', 'On 1980.', '1980 ago.'], answer: 0, tip: 'Con un año se usa in: in 1980.' },
  { q: 'When did you come to the cinema?', es: '¿Cuándo viniste al cine?', options: ['I came an hour ago.', 'I came ago an hour.', 'I come an hour ago.'], answer: 0, tip: 'Pasado (came) y ago después del tiempo: an hour ago.' },
]

export function Timeline({ onClose }: { onClose: (done: boolean) => void }) {
  const [placed, setPlaced] = useState<number[]>([])
  const [part, setPart] = useState<1 | 2>(1)
  const [qi, setQi] = useState(0)
  const [ok, setOk] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const shuffled = useMemo(() => mixed(EVENTS, 'cine-1996'), [])
  const orderDone = placed.length === EVENTS.length
  const q = QUESTIONS[qi]

  function place(k: number) {
    if (placed.includes(k)) return
    const expected = placed.length
    if (k === expected) {
      sfx('correct')
      setPlaced([...placed, k])
      setTip(null)
    } else {
      sfx('wrong')
      setTip(
        k > expected
          ? `"${EVENTS[k].when}" es más reciente. Busca algo más viejo primero (el orden va del más viejo al más nuevo).`
          : `"${EVENTS[k].when}" es más viejo.`,
      )
    }
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">La historia del cine · {part === 1 ? 'parte 1 de 2' : `pregunta ${qi + 1} de ${QUESTIONS.length}`}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      {part === 1 ? (
        <>
          <p className="mt-1 text-sm text-paper/70">
            Diana: "My dad's cinema has a long story!" Toca los momentos en orden, <b className="text-paper">del más viejo al más nuevo</b>.
          </p>
          <ol className="mt-2 grid gap-1.5">
            {placed.map((k, n) => (
              <li key={k} className="anim-fade-in flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-1.5 text-[15px]">
                <span className="font-display text-hp">{n + 1}.</span>
                <span className="flex-1"><Tappable text={EVENTS[k].text} /></span>
                <SpeakButton text={EVENTS[k].text} size="sm" voice="female" />
              </li>
            ))}
          </ol>
          {!orderDone && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {shuffled.filter(([, k]) => !placed.includes(k)).map(([e, k]) => (
                <button key={k} className={`${btn} text-left text-[15px]`} onClick={() => place(k)}>
                  <b className="block text-[#b48cf0]">{e.when}</b>
                  <span className="text-[13px] text-paper/75">{e.es.split(', ').slice(1).join(', ') || e.es}</span>
                </button>
              ))}
            </div>
          )}
          {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
          {orderDone && (
            <button className={`${btnPrimary} mt-3 w-full`} autoFocus onClick={() => { setPart(2); setTip(null) }}>
              Ver el calendario
            </button>
          )}
        </>
      ) : (
        <>
          <div className="mt-2 rounded-xl border-2 border-[#8b5a2b] bg-[#f4efe4] p-2 text-ink">
            <p className="text-center font-display text-[15px]">JUNE 1996</p>
            <div className="mt-1 grid grid-cols-7 text-center text-[12px]">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <span key={d} className="font-semibold">{d}</span>)}
              {[0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((d, k) => (
                <span key={k} className={`py-0.5 ${d === 14 ? 'rounded bg-gold/60 font-bold' : d >= 3 && d <= 7 ? 'bg-[#cfe4ec]' : ''}`}>{d || ''}</span>
              ))}
            </div>
            <p className="mt-1 text-center text-[12px]">Today: <b>Friday, June 14</b></p>
          </div>
          <div className="mt-3 flex items-start gap-2">
            <p className="flex-1 text-[17px]"><span className="font-semibold text-gold">Diana: </span><Tappable text={q.q} /></p>
            <SpeakButton text={q.q} size="sm" auto voice="female" />
          </div>
          <p className="text-sm text-paper/55">{q.es}</p>
          {!ok && (
            <div className="mt-2 grid gap-2">
              {mixed(q.options).map(([o, k]) => (
                <button
                  key={k}
                  className={`${btn} text-left text-base`}
                  onClick={() => (k === q.answer ? (sfx('correct'), setOk(true), setTip(null)) : (sfx('wrong'), setTip(q.tip)))}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
          {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
          {ok && (
            <>
              <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Bien! "{q.options[q.answer]}"</p>
              <button
                className={`${btnPrimary} mt-3 w-full`}
                autoFocus
                onClick={() => {
                  if (qi === QUESTIONS.length - 1) return onClose(true)
                  setQi(qi + 1)
                  setOk(false)
                }}
              >
                {qi === QUESTIONS.length - 1 ? 'Listo' : 'Siguiente pregunta'}
              </button>
            </>
          )}
        </>
      )}
    </Panel>
  )
}
