import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/**
 * Future Planner (A2-12 · Out of Control; parte de TourPlan de A1): en la estación de 2056 todas las rutas
 * están cerradas y los planes de los viajeros están desordenados. El tablero dice qué está reservado y qué no:
 *  BOOKED (boleto en mano)       → presente continuo (I'm leaving at ten)
 *  PLAN (sin boleto, intención) → going to (We're going to visit…)
 *  CANCELLED → decide ahora      → will (OK, I'll take the next one)
 * Más vocabulario de reservas (single / return, platform, delayed). Un error no quita vida.
 * onClose(true, perfect): perfect = 0 o 1 errores en total (escudo).
 */
type Status = 'BOOKED' | 'PLAN' | 'CANCELLED' | 'DELAYED'
type Row = { who: string; to: string; time: string; status: Status }

const START: Row[] = [
  { who: 'Mrs. Kim', to: 'Lake Town', time: '10:15', status: 'BOOKED' },
  { who: 'The Okafors', to: 'Green Valley', time: '—', status: 'PLAN' },
  { who: 'Mr. Silva', to: 'Sky Port', time: '11:30', status: 'CANCELLED' },
  { who: 'Nadia', to: 'Old Harbor', time: '14:00', status: 'DELAYED' },
]

type Round = {
  who: string
  /** Fila del tablero que hay que mirar */
  row: number
  q: string
  es: string
  options: string[]
  answer: number
  tip: string
  /** Cambio en el tablero al acertar */
  set?: Partial<Row>
}

const ROUNDS: Round[] = [
  { who: 'Mrs. Kim', row: 0, q: 'I have my ticket. I ___ for Lake Town at 10:15.', es: 'Tengo mi boleto. Salgo para Lake Town a las 10:15.', options: ['am leaving', 'leave going', 'will leaving'], answer: 0, tip: 'El tablero dice BOOKED: ya tiene boleto. Plan acordado → presente continuo (am leaving).' },
  { who: 'Mr. Okafor', row: 1, q: "We ___ visit Green Valley, but we haven't bought the tickets yet.", es: 'Vamos a visitar Green Valley, pero todavía no hemos comprado los boletos.', options: ['are going to', 'are visiting to', 'will to'], answer: 0, tip: 'El tablero dice PLAN: es una intención, sin boleto. Intención → going to.' },
  { who: 'The clerk', row: 1, q: 'Single or return?', es: '¿Ida o ida y vuelta?', options: ['A return ticket, please. We are coming back on Sunday.', 'A single ticket, please. We are coming back on Sunday.', 'A cancel ticket, please. We are coming back on Sunday.'], answer: 0, tip: 'Si vuelven, el boleto es de ida y vuelta: return.', set: { time: '12:40', status: 'BOOKED' } },
  { who: 'The clerk', row: 2, q: 'Sorry, Mr. Silva. Your 11:30 train is cancelled. The next one is at noon.', es: 'Lo siento, señor Silva. Su tren de las 11:30 está cancelado. El próximo es al mediodía.', options: ["OK. I'll take the noon train.", "OK. I'm take the noon train.", 'OK. I taking the noon train.'], answer: 0, tip: 'CANCELLED: el señor Silva decide en este momento. Decisión ahora → will (I\'ll take).', set: { time: '12:00', status: 'BOOKED' } },
  { who: 'Nadia', row: 3, q: 'Look at the board! My train is late. I ___ miss my meeting!', es: '¡Mira el tablero! Mi tren va tarde. ¡Voy a perder mi reunión!', options: ['am going to', 'will to', 'am missing to'], answer: 0, tip: 'Ella lo ve venir en el tablero (DELAYED). Evidencia → going to.' },
  { who: 'You', row: 3, q: "Don't worry, Nadia. ___ call your office for you.", es: 'No te preocupes, Nadia. Yo llamo a tu oficina por ti.', options: ["I'll", "I'm going", 'I calling'], answer: 0, tip: 'Ofrecer ayuda en el momento → will (I\'ll call).' },
  { who: 'Nadia', row: 3, q: 'The board says 14:40 now. What does it mean?', es: 'El tablero ahora dice 14:40. ¿Qué significa?', options: ['The train is delayed. It is going to arrive at 14:40.', 'The train is booked. It is going to arrive at 14:40.', 'The train is single. It is going to arrive at 14:40.'], answer: 0, tip: 'Un tren que llega tarde está delayed.', set: { time: '14:40' } },
  { who: 'Mrs. Kim', row: 0, q: 'Excuse me, which platform ___ my train leave from?', es: 'Disculpe, ¿de qué andén sale mi tren?', options: ['does', 'is', 'will to'], answer: 0, tip: 'Horario fijo del tren: presente simple → which platform does it leave from?' },
]

const COLOR: Record<Status, string> = { BOOKED: '#7ee08a', PLAN: '#f2c230', CANCELLED: '#ff8a8a', DELAYED: '#ffb36b' }

export function FuturePlanner({ name, onClose }: { name: string; onClose: (done: boolean, perfect: boolean) => void }) {
  const [i, setI] = useState(0)
  const [rows, setRows] = useState<Row[]>(START)
  const [ok, setOk] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [es, setEs] = useState(false)
  const [errors, setErrors] = useState(0)
  const r = ROUNDS[i]
  const last = i === ROUNDS.length - 1

  function pick(k: number) {
    if (k !== r.answer) {
      sfx('wrong')
      setErrors((e) => e + 1)
      setTip(r.tip)
      return
    }
    sfx('correct')
    setOk(true)
    setTip(null)
    if (r.set) setRows((rs) => rs.map((row, n) => (n === r.row ? { ...row, ...r.set } : row)))
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">Future Planner · {i + 1} de {ROUNDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">
        {name}: ayudemos a los viajeros. Mira el tablero: <span className="font-semibold text-[#7ee08a]">BOOKED</span> = ya tiene boleto · <span className="font-semibold text-gold">PLAN</span> = solo intención · <span className="font-semibold text-[#ff8a8a]">CANCELLED</span> = hay que decidir ahora.
      </p>

      <div className="mt-2 overflow-hidden rounded-xl border-2 border-[#2f7fbf] bg-[#12263a] text-[#d9f3ff]">
        <div className="grid grid-cols-[1.3fr_1.3fr_0.8fr_1.1fr] text-[12px] font-semibold">
          {['Traveler', 'To', 'Time', 'Status'].map((h) => (
            <div key={h} className="border-b border-[#2f7fbf]/60 px-2 py-1 text-[#7fe0ff]">{h}</div>
          ))}
          {rows.map((row, n) => {
            const hl = n === r.row ? 'bg-gold/25' : ''
            return (
              <div key={row.who} className="contents">
                <div className={`border-b border-[#2f7fbf]/30 px-2 py-1 font-display text-[14px] ${hl}`}>{row.who}</div>
                <div className={`border-b border-[#2f7fbf]/30 px-2 py-1 ${hl}`}>{row.to}</div>
                <div className={`border-b border-[#2f7fbf]/30 px-2 py-1 ${hl}`}>{row.time}</div>
                <div className={`border-b border-[#2f7fbf]/30 px-2 py-1 font-bold ${hl}`} style={{ color: COLOR[row.status] }}>{row.status}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2">
        <p className="flex-1 text-[17px]"><span className="font-semibold text-gold">{r.who}: </span><Tappable text={r.q} /></p>
        <SpeakButton text={r.q.replace('___', '…')} size="sm" auto />
      </div>
      {es && <p className="text-sm text-paper/60">{r.es}</p>}
      <button className="mt-1 text-xs font-semibold text-paper/55 underline underline-offset-4" onClick={() => setEs((v) => !v)}>
        {es ? 'Ocultar traducción' : 'Traducir'}
      </button>

      {!ok && (
        <div className="mt-2 grid gap-2">
          {mixed(r.options).map(([o, k]) => (
            <button key={k} className={`${btn} text-left text-base`} onClick={() => pick(k)}>
              {o}
            </button>
          ))}
        </div>
      )}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {ok && (
        <>
          <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
            <p className="flex-1 text-sm text-hp">¡Bien! "{r.q.includes('___') ? r.q.replace('___', r.options[r.answer]) : r.options[r.answer]}"</p>
            <SpeakButton text={r.q.includes('___') ? r.q.replace('___', r.options[r.answer]) : r.options[r.answer]} size="sm" />
          </div>
          {last && <p className="anim-fade-in mt-2 text-sm text-paper/80">Todos los viajeros tienen un plan.{errors <= 1 ? ' Casi sin errores: ganas un escudo.' : ''}</p>}
          <button
            className={`${btnPrimary} mt-3 w-full`}
            autoFocus
            onClick={() => {
              if (last) return onClose(true, errors <= 1)
              setI(i + 1)
              setOk(false)
              setEs(false)
            }}
          >
            {last ? 'Listo' : 'Siguiente viajero'}
          </button>
        </>
      )}
    </Panel>
  )
}
