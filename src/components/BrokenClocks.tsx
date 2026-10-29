import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { AnalogClock } from './Planner'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/**
 * Los relojes locos de la oficina (presente, A1) con Sara: cada reloj gira sin parar y tiene un
 * cartel con la hora mal dicha. Al decir la hora bien, el reloj se detiene. Repaso de la hora completa.
 */
type Round = { place: string; placeEs: string; time: [number, number]; sign: string; options: string[]; answer: number; tip: string }

const ROUNDS: Round[] = [
  { place: 'Reception', placeEs: 'La recepción', time: [8, 30], sign: "It's eight and half!", options: ["It's half past eight.", "It's half to eight.", "It's eight and half."], answer: 0, tip: '8:30 = half past eight (y media).' },
  { place: 'Café', placeEs: 'La cafetería', time: [9, 15], sign: "It's nine and quarter!", options: ["It's quarter past nine.", "It's quarter to nine.", "It's nine and quarter."], answer: 0, tip: '9:15 = quarter past nine (y cuarto).' },
  { place: 'Desks', placeEs: 'Los escritorios', time: [10, 45], sign: "It's ten and forty-five past!", options: ["It's quarter to eleven.", "It's quarter past ten.", "It's quarter to ten."], answer: 0, tip: '10:45: faltan 15 minutos para las once: quarter to eleven.' },
  { place: 'Meeting room', placeEs: 'La sala de reuniones', time: [12, 0], sign: "It's twelve hours!", options: ["It's twelve o'clock.", "It's twelve hours.", "It's twelve clock."], answer: 0, tip: "Hora en punto: twelve o'clock." },
  { place: 'Ms. Clark\'s door', placeEs: 'La puerta de la directora', time: [4, 50], sign: "It's four and fifty!", options: ["It's ten to five.", "It's ten past four.", "It's ten to four."], answer: 0, tip: '4:50: faltan diez para las cinco: ten to five.' },
]

export function BrokenClocks({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [ok, setOk] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const r = ROUNDS[i]
  const last = i === ROUNDS.length - 1

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">Los relojes locos · {i + 1} de {ROUNDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">Sara: "Every clock in this office is crazy! Could you fix them, please?" Mira las agujas y di la hora bien.</p>

      <div className="mt-3 flex flex-col items-center rounded-xl border-2 border-line bg-panel-2 px-3 py-3">
        <p className="text-sm text-paper/60">{r.placeEs} · {r.place}</p>
        <div key={i} className={ok ? 'anim-fade-in' : 'anim-wobble'}>
          <AnalogClock h={r.time[0]} m={r.time[1]} size={120} />
        </div>
        {!ok && <p className="mt-1 rounded bg-danger/20 px-2 py-0.5 text-sm text-[#f3b0b0] line-through decoration-2">{r.sign}</p>}
        {ok && <p className="anim-fade-in mt-1 rounded bg-hp/20 px-2 py-0.5 text-sm text-hp">✓ {r.options[r.answer]}</p>}
      </div>

      {!ok && (
        <div className="mt-3 grid gap-2">
          {mixed(r.options).map(([o, k]) => (
            <button
              key={`${i}-${k}`}
              className={`${btn} text-left text-base`}
              onClick={() => (k === r.answer ? (sfx('correct'), setOk(true), setTip(null)) : (sfx('wrong'), setTip(r.tip)))}
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
            <p className="flex-1 text-sm text-hp">¡Bien! El reloj ya no gira.</p>
            <SpeakButton text={r.options[r.answer]} size="sm" voice="female" />
          </div>
          <button
            className={`${btnPrimary} mt-3 w-full`}
            autoFocus
            onClick={() => {
              if (last) return onClose(true)
              setI(i + 1)
              setOk(false)
            }}
          >
            {last ? 'Volver con Sara' : 'Siguiente reloj'}
          </button>
        </>
      )}
    </Panel>
  )
}
