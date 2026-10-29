import { useMemo, useState } from 'react'
import type { AnimalKind } from '../game/types'
import { ANIMALS, AnimalIcon } from './Animals'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'

/**
 * Los corrales de la doctora Patel: ella describe un animal (con doesn't) y tú eliges cuál es.
 * Luego dices cuántos hay en el corral, con su plural (sheep, geese, mice...).
 */
type Round = { animal: AnimalKind; others: [AnimalKind, AnimalKind]; clue: string; es: string; count: string; plural: [string, string, string]; answer: number; tip: string }

const ROUNDS: Round[] = [
  {
    animal: 'cow',
    others: ['horse', 'pig'],
    clue: "This animal doesn't fly. It gives milk, and it says moo.",
    es: 'Este animal no vuela. Da leche y dice muu.',
    count: 'four',
    plural: ['cow', 'cows', 'cowes'],
    answer: 1,
    tip: 'Plural normal: se agrega -s. cow → cows.',
  },
  {
    animal: 'sheep',
    others: ['rabbit', 'dog'],
    clue: "This animal doesn't give milk on this farm. It has got wool, and it says baa.",
    es: 'Este animal no da leche en esta granja. Tiene lana y dice bee.',
    count: 'five',
    plural: ['sheeps', 'sheepes', 'sheep'],
    answer: 2,
    tip: '"Sheep" no cambia: five sheep.',
  },
  {
    animal: 'goose',
    others: ['duck', 'chicken'],
    clue: "This animal doesn't live in the house. It swims in the pond, and it eats grass.",
    es: 'Este animal no vive en la casa. Nada en el estanque y come pasto.',
    count: 'three',
    plural: ['geese', 'gooses', 'goose'],
    answer: 0,
    tip: 'Plural irregular: goose → geese.',
  },
  {
    animal: 'mouse',
    others: ['cat', 'rabbit'],
    clue: "This animal doesn't like cats. It is very small, and it lives in the barn.",
    es: 'A este animal no le gustan los gatos. Es muy pequeño y vive en el granero.',
    count: 'six',
    plural: ['mouses', 'mice', 'mices'],
    answer: 1,
    tip: 'Plural irregular: mouse → mice.',
  },
]

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

export function AnimalPens({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [found, setFound] = useState(false)
  const [plural, setPlural] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [es, setEs] = useState(false)
  const r = ROUNDS[i]
  const choices = useMemo(() => shuffle([r.animal, ...r.others]), [r])
  const last = i === ROUNDS.length - 1
  const sentence = `There are ${r.count} ${r.plural[r.answer]} in this pen.`

  function next() {
    if (last) return onClose(true)
    setI(i + 1)
    setFound(false)
    setPlural(false)
    setTip(null)
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">Los corrales · {i + 1} de {ROUNDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <div className="mt-2 flex items-start gap-2">
        <p className="flex-1 text-[17px] leading-relaxed">
          <span className="font-semibold text-gold">Dr. Patel: </span>
          <Tappable text={r.clue} />
        </p>
        <SpeakButton text={r.clue} size="sm" auto voice="female" />
      </div>
      {es && <p className="mt-1 text-sm text-paper/60">{r.es}</p>}
      <button className="mt-1 text-xs font-semibold text-paper/55 underline underline-offset-4" onClick={() => setEs((v) => !v)}>
        {es ? 'Ocultar traducción' : 'Traducir'}
      </button>

      {!found && (
        <>
          <p className="mt-3 text-sm text-paper/75">¿Qué animal es?</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {choices.map((k) => (
              <button
                key={k}
                className={`${btn} flex flex-col items-center py-2`}
                onClick={() => {
                  if (k === r.animal) {
                    sfx('correct')
                    setFound(true)
                    setTip(null)
                  } else {
                    sfx('wrong')
                    setTip(`Lee otra vez la pista: "${ANIMALS[k].en}" no encaja.`)
                  }
                }}
              >
                <AnimalIcon kind={k} size={52} />
                <span className="text-sm">{ANIMALS[k].en}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {found && !plural && (
        <div className="anim-fade-in mt-3">
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(4, ['', '', '', 'three', 'four', 'five', 'six'].indexOf(r.count)) }).map((_, k) => (
              <AnimalIcon key={k} kind={r.animal} size={34} />
            ))}
          </div>
          <p className="mt-2 text-sm text-paper/75">¡Sí, es: {ANIMALS[r.animal].en} ({ANIMALS[r.animal].es})! Hay {['', '', '', 3, 4, 5, 6][['', '', '', 'three', 'four', 'five', 'six'].indexOf(r.count)]} en el corral. Completa:</p>
          <p className="mt-1 text-[17px]">There are {r.count} ___ in this pen.</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {r.plural.map((p, k) => (
              <button
                key={p}
                className={`${btn} text-base`}
                onClick={() => {
                  if (k === r.answer) {
                    sfx('correct')
                    setPlural(true)
                    setTip(null)
                  } else {
                    sfx('wrong')
                    setTip(r.tip)
                  }
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}

      {plural && (
        <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
          <p className="flex-1 text-sm text-hp">¡Bien! "{sentence}"</p>
          <SpeakButton text={sentence} size="sm" />
        </div>
      )}
      {plural && (
        <button className={`${btnPrimary} mt-4 w-full`} onClick={next} autoFocus>
          {last ? 'Listo' : 'Siguiente corral'}
        </button>
      )}
    </Panel>
  )
}
