import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/**
 * La ruta de los turistas (ciudad, 2056): Marco, el guía holograma (nieto de Tony Rossi), tiene
 * el plan de mañana de tres grupos de turistas. Mirar la tabla y responder con going to en
 * negativo y en preguntas: Is Kira going to...? — No, she isn't.
 */
const PLACES = ['Fountain', 'Café', 'Shop', 'Statue', 'Sky Tower']
const TOURISTS: { name: string; es: string; plan: boolean[] }[] = [
  { name: 'Kira', es: 'ella', plan: [true, false, true, true, false] },
  { name: 'Bo', es: 'él', plan: [false, true, true, false, true] },
  { name: 'The Bleeps', es: 'ellos (robots)', plan: [true, true, false, false, true] },
]

type Round = { q: string; es: string; options: string[]; answer: number; tip: string; mark: [number, number][] }
const ROUNDS: Round[] = [
  { q: 'Is Kira going to visit the café?', es: '¿Kira va a visitar el café?', options: ["No, she isn't.", "No, she doesn't.", 'Yes, she is.'], answer: 0, tip: "Kira tiene ✗ en el café. Respuesta corta con she: No, she isn't.", mark: [[0, 1]] },
  { q: 'Are the Bleeps going to visit the fountain?', es: '¿Los Bleeps van a visitar la fuente?', options: ['Yes, they are.', 'Yes, they is.', "No, they aren't."], answer: 0, tip: 'Los Bleeps tienen ✓ en la fuente. Con they: Yes, they are.', mark: [[2, 0]] },
  { q: 'Is Bo going to visit the statue?', es: '¿Bo va a visitar la estatua?', options: ["No, he isn't.", "No, he aren't.", 'Yes, he is.'], answer: 0, tip: "Bo tiene ✗ en la estatua. Con he: No, he isn't.", mark: [[1, 3]] },
  { q: "Who isn't going to visit the shop?", es: '¿Quién no va a visitar la tienda?', options: ['The Bleeps.', 'Kira.', 'Bo.'], answer: 0, tip: 'Busca la ✗ en la columna Shop.', mark: [] },
  { q: 'Bo ___ going to visit the fountain.', es: 'Bo no va a visitar la fuente.', options: ["isn't", "aren't", 'not'], answer: 0, tip: "Bo (he): isn't going to.", mark: [[1, 0]] },
  { q: 'And you? Are you going to visit the Sky Tower tomorrow?', es: 'Y tú, ¿vas a visitar la Sky Tower mañana?', options: ['Yes, I am!', 'Yes, I going!', 'Yes, I do!'], answer: 0, tip: 'Respuesta corta con I: Yes, I am.', mark: [] },
]

export function TourPlan({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [ok, setOk] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [es, setEs] = useState(false)
  const r = ROUNDS[i]
  const last = i === ROUNDS.length - 1

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">La ruta de los turistas · {i + 1} de {ROUNDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">El plan de mañana (tomorrow). ✓ = va a ir (is going to) · ✗ = no va a ir (isn't going to).</p>

      <div className="mt-2 overflow-hidden rounded-xl border-2 border-[#2f7fbf] bg-[#12263a] text-[#d9f3ff]">
        <div className="grid grid-cols-6 text-center text-[12px] font-semibold">
          <div className="border-b border-[#2f7fbf]/60 py-1 pl-2 text-left text-[#7fe0ff]">Tourist</div>
          {PLACES.map((p) => <div key={p} className="border-b border-[#2f7fbf]/60 py-1 text-[#7fe0ff]">{p}</div>)}
          {TOURISTS.map((t, row) => (
            <div key={t.name} className="contents">
              <div className="border-b border-[#2f7fbf]/30 py-1 pl-2 text-left font-display text-[14px]">{t.name}</div>
              {t.plan.map((yes, col) => {
                const hl = r.mark.some(([a, b]) => a === row && b === col)
                return (
                  <div key={col} className={`border-b border-[#2f7fbf]/30 py-1 text-[15px] ${hl ? 'bg-gold/40' : ''} ${yes ? 'text-[#7ee08a]' : 'text-[#ff8a8a]'}`}>
                    {yes ? '✓' : '✗'}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2">
        <p className="flex-1 text-[17px]"><span className="font-semibold text-gold">Marco: </span><Tappable text={r.q} /></p>
        <SpeakButton text={r.q} size="sm" auto voice="male" />
      </div>
      {es && <p className="text-sm text-paper/60">{r.es}</p>}
      <button className="mt-1 text-xs font-semibold text-paper/55 underline underline-offset-4" onClick={() => setEs((v) => !v)}>
        {es ? 'Ocultar traducción' : 'Traducir'}
      </button>

      {!ok && (
        <div className="mt-2 grid gap-2">
          {mixed(r.options).map(([o, k]) => (
            <button
              key={k}
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
