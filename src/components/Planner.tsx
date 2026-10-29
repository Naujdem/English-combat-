import { useMemo, useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'

/** Reloj de agujas para leer la hora */
export function AnalogClock({ h, m, size = 64 }: { h: number; m: number; size?: number }) {
  const minA = (m / 60) * 360
  const hourA = ((h % 12) / 12) * 360 + (m / 60) * 30
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-label={`${h}:${String(m).padStart(2, '0')}`}>
      <circle cx="20" cy="20" r="18" fill="#f4efe4" stroke="#5a4a3a" strokeWidth="2" />
      {Array.from({ length: 12 }).map((_, k) => {
        const a = (k / 12) * Math.PI * 2
        const big = k % 3 === 0
        return <line key={k} x1={20 + Math.sin(a) * (big ? 13 : 14.5)} y1={20 - Math.cos(a) * (big ? 13 : 14.5)} x2={20 + Math.sin(a) * 16.5} y2={20 - Math.cos(a) * 16.5} stroke="#5a4a3a" strokeWidth={big ? 1.6 : 0.8} />
      })}
      <line x1="20" y1="20" x2="20" y2="10.5" stroke="#2d2d3a" strokeWidth="2.4" strokeLinecap="round" transform={`rotate(${hourA} 20 20)`} />
      <line x1="20" y1="20" x2="20" y2="6" stroke="#d64545" strokeWidth="1.4" strokeLinecap="round" transform={`rotate(${minA} 20 20)`} />
      <circle cx="20" cy="20" r="1.6" fill="#2d2d3a" />
    </svg>
  )
}

/**
 * La agenda de la directora con Sara: leer un correo (con and / but / or), poner la cita
 * en el día y la hora correctos (leyendo relojes de agujas) y decirlo con at / on / in.
 */
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const DAYS_ES = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']

type Round = {
  from: string
  email: string
  es: string
  day: number
  time: [number, number]
  clocks: [number, number][]
  label: string
  sentence: { text: string; options: string[]; answer: number; tip: string }
}

const ROUNDS: Round[] = [
  {
    from: 'Mr. Stone',
    email: "Hi Sara, could you put my meeting with Ms. Clark on Monday at nine o'clock? I'm free in the morning, but I'm busy in the afternoon. Thanks!",
    es: 'Hola, Sara: ¿podrías poner mi reunión con la señora Clark el lunes a las nueve? Estoy libre en la mañana, pero ocupado en la tarde. ¡Gracias!',
    day: 0,
    time: [9, 0],
    clocks: [[9, 0], [12, 45], [3, 0], [9, 30]],
    label: 'Mr. Stone',
    sentence: { text: "The meeting is ___ Monday ___ nine o'clock.", options: ['on / at', 'in / on', 'at / in'], answer: 0, tip: 'on + día, at + hora.' },
  },
  {
    from: 'Dr. Patel',
    email: "Hello! Could you ask Ms. Clark to call me on Wednesday at half past two? I work at the farm in the morning, and I'm free in the afternoon.",
    es: '¡Hola! ¿Podrías pedirle a la señora Clark que me llame el miércoles a las dos y media? Trabajo en la granja en la mañana y estoy libre en la tarde.',
    day: 2,
    time: [2, 30],
    clocks: [[6, 10], [2, 30], [3, 30], [2, 15]],
    label: 'Call Dr. Patel',
    sentence: { text: 'Ms. Clark: call ___ on Wednesday at half past two.', options: ['she', 'her', 'hers'], answer: 1, tip: 'Después del verbo: her.' },
  },
  {
    from: 'Amy',
    email: 'Dear Sara, the designers can come on Thursday at quarter to four or on Friday at quarter past ten. Friday is better for us. Thank you! Amy',
    es: 'Querida Sara: los diseñadores pueden venir el jueves a las cuatro menos cuarto o el viernes a las diez y cuarto. El viernes es mejor para nosotros. ¡Gracias! Amy',
    day: 4,
    time: [10, 15],
    clocks: [[3, 45], [10, 45], [10, 15], [2, 50]],
    label: 'Designers',
    sentence: { text: 'The designers come on Friday ___ the morning.', options: ['on', 'in', 'at'], answer: 1, tip: 'Partes del día: in the morning.' },
  },
  {
    from: 'Paula',
    email: "Hi Sara! Could you book the meeting room for us on Tuesday at quarter to twelve? It's a short meeting, but it's very important.",
    es: '¡Hola, Sara! ¿Podrías reservarnos la sala de reuniones el martes a las doce menos cuarto? Es una reunión corta, pero muy importante.',
    day: 1,
    time: [11, 45],
    clocks: [[12, 15], [11, 45], [9, 0], [12, 45]],
    label: 'Meeting room',
    sentence: { text: "What time is Paula's meeting? It's ___.", options: ['quarter past twelve', 'quarter to twelve', 'twelve and quarter'], answer: 1, tip: '11:45 = quarter to twelve (falta un cuarto para las doce).' },
  },
]

const pad = (n: number) => String(n).padStart(2, '0')

export function Planner({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [step, setStep] = useState<'read' | 'day' | 'time' | 'say' | 'ok'>('read')
  const [tip, setTip] = useState<string | null>(null)
  const [es, setEs] = useState(false)
  const [booked, setBooked] = useState<Round[]>([])
  const r = ROUNDS[i]
  const last = i === ROUNDS.length - 1
  const clocks = useMemo(() => [...r.clocks].sort(() => Math.random() - 0.5), [r])

  function wrong(t: string) {
    sfx('wrong')
    setTip(t)
  }
  function right(next: typeof step) {
    sfx('correct')
    setTip(null)
    setStep(next)
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">La agenda · correo {i + 1} de {ROUNDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      {/* La semana de la directora */}
      <div className="mt-2 grid grid-cols-5 gap-1 text-center text-[11px]">
        {DAYS.map((d, k) => {
          const items = booked.filter((b) => b.day === k)
          return (
            <div key={d} className={`min-h-[58px] rounded-lg border p-1 ${step === 'day' ? 'border-gold/50' : 'border-line'}`}>
              <p className="font-semibold text-paper/80">{d.slice(0, 3)}</p>
              {items.map((b) => (
                <p key={b.label} className="mt-0.5 rounded bg-hp/20 px-0.5 text-[10px] leading-tight text-hp">
                  {b.time[0]}:{pad(b.time[1])} {b.label}
                </p>
              ))}
            </div>
          )
        })}
      </div>

      <div className="mt-3 rounded-xl border-2 border-line bg-paper/95 p-3 text-ink">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">De: {r.from} · Para: Sara</p>
          <SpeakButton text={r.email} size="sm" voice={r.from === 'Mr. Stone' ? 'male' : 'female'} />
        </div>
        <p className="mt-1 text-[16px] leading-relaxed">
          <Tappable text={r.email} />
        </p>
      </div>
      {es && <p className="mt-1 text-sm text-paper/60">{r.es}</p>}
      <button className="mt-1 text-xs font-semibold text-paper/55 underline underline-offset-4" onClick={() => setEs((v) => !v)}>
        {es ? 'Ocultar traducción' : 'Traducir'}
      </button>

      {step === 'read' && (
        <button className={`${btnPrimary} mt-3 w-full`} onClick={() => setStep('day')} autoFocus>
          Poner en la agenda
        </button>
      )}

      {step === 'day' && (
        <div className="mt-3">
          <p className="text-sm text-paper/75">¿Qué día? Toca el día en la agenda:</p>
          <div className="mt-2 grid grid-cols-5 gap-1">
            {DAYS.map((d, k) => (
              <button key={d} className={`${btn} px-1 py-2 text-sm`} onClick={() => (k === r.day ? right('time') : wrong(`Lee otra vez: el correo no dice ${DAYS_ES[k]} (${d}).`))}>
                {d.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'time' && (
        <div className="mt-3">
          <p className="text-sm text-paper/75">¿A qué hora? Elige el reloj correcto:</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {clocks.map(([h, m]) => (
              <button
                key={`${h}:${m}`}
                className={`${btn} flex items-center justify-center p-1.5`}
                onClick={() => (h === r.time[0] && m === r.time[1] ? right('say') : wrong('Mira las agujas: la corta es la hora y la larga (roja) son los minutos. Half past = y media, quarter past = y cuarto, quarter to = menos cuarto.'))}
                aria-label={`${h}:${pad(m)}`}
              >
                <AnalogClock h={h} m={m} size={58} />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'say' && (
        <div className="mt-3">
          <p className="text-sm text-paper/75">Completa la nota de la agenda:</p>
          <p className="mt-1 text-[17px]">{r.sentence.text}</p>
          <div className="mt-2 grid gap-2">
            {r.sentence.options.map((o, k) => (
              <button
                key={o}
                className={`${btn} text-left text-base`}
                onClick={() => {
                  if (k === r.sentence.answer) {
                    right('ok')
                    setBooked((b) => [...b, r])
                  } else wrong(r.sentence.tip)
                }}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}

      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}

      {step === 'ok' && (
        <>
          <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
            <AnalogClock h={r.time[0]} m={r.time[1]} size={40} />
            <p className="flex-1 text-sm text-hp">¡En la agenda! {DAYS[r.day]}, {r.time[0]}:{pad(r.time[1])}.</p>
          </div>
          <button
            className={`${btnPrimary} mt-3 w-full`}
            autoFocus
            onClick={() => {
              if (last) return onClose(true)
              setI(i + 1)
              setStep('read')
              setEs(false)
            }}
          >
            {last ? 'Listo' : 'Siguiente correo'}
          </button>
        </>
      )}
    </Panel>
  )
}
