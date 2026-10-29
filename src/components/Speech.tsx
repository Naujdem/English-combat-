import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/**
 * El discurso de despedida de Diana (torre Green Valley, 2056): repaso de todo A1.
 * Tiene cuatro partes: el pasado (1996), el presente (hoy), el futuro (mañana) y el agradecimiento (would like to).
 * Cada frase se completa y se va escribiendo en la hoja del discurso.
 */
type Round = { part: string; partEs: string; before: string; after: string; options: string[]; answer: number; tip: string }

const ROUNDS: Round[] = [
  { part: '1996', partEs: 'El pasado', before: 'In 1996, I', after: "tickets in my father's cinema.", options: ['sold', 'sell', 'selled'], answer: 0, tip: 'Sell es irregular: sold.' },
  { part: '1996', partEs: 'El pasado', before: 'Ray', after: 'the old projector every week.', options: ['fixed', 'fix', 'fixs'], answer: 0, tip: 'Pasado regular: fix → fixed.' },
  { part: '1996', partEs: 'El pasado', before: 'We', after: 'very happy there.', options: ['were', 'was', 'are'], answer: 0, tip: 'We + were (pasado de to be).' },
  { part: 'Today', partEs: 'El presente', before: 'Today, three hundred people', after: 'in this tower.', options: ['work', 'works', 'worked'], answer: 0, tip: 'People (they): work, sin -s.' },
  { part: 'Today', partEs: 'El presente', before: 'Every morning, Grace and I', after: 'coffee in the café.', options: ['drink', 'drinks', 'drank'], answer: 0, tip: 'Grace and I = we: drink.' },
  { part: 'Tomorrow', partEs: 'El futuro', before: 'Tomorrow, Paula', after: 'going to be the new director.', options: ['is', 'are', 'am'], answer: 0, tip: 'Paula (she): is going to.' },
  { part: 'Tomorrow', partEs: 'El futuro', before: "And I'm going to", after: 'a lot of books!', options: ['read', 'reads', 'reading'], answer: 0, tip: 'going to + verbo simple: read.' },
  { part: 'Thank you', partEs: 'El agradecimiento', before: 'I would like', after: 'thank you all.', options: ['to', '—', 'for'], answer: 0, tip: 'would like + to + verbo: I would like to thank...' },
  { part: 'Thank you', partEs: 'El agradecimiento', before: 'And Ray... I want', after: 'you a question.', options: ['to ask', 'ask', 'asking'], answer: 0, tip: 'want + to + verbo: I want to ask...' },
]

const sentence = (r: Round) => `${r.before} ${r.options[r.answer] === '—' ? '' : `${r.options[r.answer]} `}${r.after}`

export function Speech({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [ok, setOk] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [done, setDone] = useState<string[]>([])
  const r = ROUNDS[i]
  const last = i === ROUNDS.length - 1
  const finished = last && ok

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">El discurso de Diana · {i + 1} de {ROUNDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">
        Diana: "I would like to say goodbye... but my speech is a mess! Could you help me?" Completa cada frase: el pasado, el presente, el futuro y las gracias.
      </p>

      <div className="mt-2 rounded-xl border-2 border-[#8b5a2b] bg-[#f4efe4] px-3 py-2 text-[15px] text-ink">
        <p className="font-display text-[13px] text-[#8b5a2b]">GOODBYE, GREEN VALLEY · DIANA CLARK</p>
        {(finished ? [...done, sentence(r)] : done).map((d) => <p key={d}>{d}</p>)}
        {!finished && (
          <p className="anim-fade-in">
            <span className="mr-1 rounded bg-[#e8c95a]/60 px-1 text-[12px] font-semibold">{r.part}</span>
            {r.before} <b>{ok ? (r.options[r.answer] === '—' ? '' : r.options[r.answer]) : '___'}</b> {r.after}
          </p>
        )}
      </div>
      {!finished && <p className="mt-1 text-sm text-paper/60">{r.partEs}</p>}

      {!ok && (
        <div className="mt-2 grid gap-2">
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
            <p className="flex-1 text-sm text-hp">{finished ? '¡El discurso está listo!' : `¡Bien! "${sentence(r)}"`}</p>
            <SpeakButton text={finished ? [...done, sentence(r)].join(' ') : sentence(r)} size="sm" voice="female" />
          </div>
          <button
            className={`${btnPrimary} mt-3 w-full`}
            autoFocus
            onClick={() => {
              if (finished) return onClose(true)
              setDone((d) => [...d, sentence(r)])
              setI(i + 1)
              setOk(false)
            }}
          >
            {finished ? 'Darle el discurso a Diana' : 'Siguiente frase'}
          </button>
        </>
      )}
    </Panel>
  )
}
