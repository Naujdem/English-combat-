import { useMemo, useState } from 'react'
import type { AnimalKind } from '../game/types'
import { ANIMALS, AnimalIcon } from './Animals'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'

/**
 * "Adivina el animal" con Rosie: un animal se esconde en el granero y tú preguntas
 * con Does it...? / Is it...? / Can people...? hasta adivinarlo.
 * Cada pregunta se elige primero en español y luego hay que escoger cómo se dice bien.
 */
const POOL: AnimalKind[] = ['cow', 'horse', 'sheep', 'pig', 'chicken', 'duck', 'goose', 'dog', 'cat', 'rabbit']

type Feature = {
  id: string
  es: string
  q: string
  wrong: [string, string]
  /** Tipo de respuesta corta */
  kind: 'does' | 'is' | 'can'
  yes: AnimalKind[]
}

const FEATURES: Feature[] = [
  { id: 'wings', es: '¿Tiene alas?', q: 'Does it have wings?', wrong: ['Do it have wings?', 'Does it has wings?'], kind: 'does', yes: ['chicken', 'duck', 'goose'] },
  { id: 'grass', es: '¿Come pasto?', q: 'Does it eat grass?', wrong: ['Does it eats grass?', 'Is it eat grass?'], kind: 'does', yes: ['cow', 'horse', 'sheep', 'rabbit', 'goose'] },
  { id: 'big', es: '¿Es grande?', q: 'Is it big?', wrong: ['Does it big?', 'It is big?'], kind: 'is', yes: ['cow', 'horse'] },
  { id: 'house', es: '¿Vive en la casa?', q: 'Does it live in the house?', wrong: ['Do it live in the house?', 'Does it lives in the house?'], kind: 'does', yes: ['dog', 'cat'] },
  { id: 'pond', es: '¿Nada en el estanque?', q: 'Does it swim in the pond?', wrong: ['Does it swims in the pond?', 'Do it swim in the pond?'], kind: 'does', yes: ['duck', 'goose'] },
  { id: 'wool', es: '¿Tiene lana?', q: 'Does it have wool?', wrong: ['Has it wool?', 'Does it has wool?'], kind: 'does', yes: ['sheep'] },
  { id: 'pink', es: '¿Es rosado?', q: 'Is it pink?', wrong: ['Does it pink?', 'Is it pinks?'], kind: 'is', yes: ['pig'] },
  { id: 'ears', es: '¿Tiene orejas largas?', q: 'Does it have long ears?', wrong: ['Does it have longs ears?', 'Do it has long ears?'], kind: 'does', yes: ['rabbit'] },
  { id: 'ride', es: '¿La gente lo monta?', q: 'Can people ride it?', wrong: ['Do people can ride it?', 'Can people rides it?'], kind: 'can', yes: ['horse'] },
  { id: 'mice', es: '¿Caza ratones?', q: 'Does it catch mice?', wrong: ['Does it catches mice?', 'Does it catch mouses?'], kind: 'does', yes: ['cat'] },
  { id: 'milk', es: '¿Da leche?', q: 'Does it give milk?', wrong: ['Does it gives milk?', 'Do it give milk?'], kind: 'does', yes: ['cow'] },
]

function shortAnswer(f: Feature, yes: boolean) {
  if (f.kind === 'is') return yes ? 'Yes, it is.' : "No, it isn't."
  if (f.kind === 'can') return yes ? 'Yes, they can.' : "No, they can't."
  return yes ? 'Yes, it does.' : "No, it doesn't."
}

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

const ROUNDS = 3

export function GuessAnimal({ onClose }: { onClose: (done: boolean) => void }) {
  const secrets = useMemo(() => shuffle(POOL).slice(0, ROUNDS), [])
  const [round, setRound] = useState(0)
  const [asked, setAsked] = useState<string[]>([])
  const [out, setOut] = useState<AnimalKind[]>([])
  const [picking, setPicking] = useState<Feature | null>(null)
  const [tip, setTip] = useState<string | null>(null)
  const [reply, setReply] = useState<{ q: string; a: string } | null>(null)
  const [won, setWon] = useState(false)
  const [finished, setFinished] = useState(false)
  const secret = secrets[round]
  const opts = useMemo(() => (picking ? shuffle([picking.q, ...picking.wrong]) : []), [picking])

  function ask(f: Feature) {
    const yes = f.yes.includes(secret)
    // Se apagan los animales que ya no pueden ser
    setOut((o) => [...new Set([...o, ...POOL.filter((k) => f.yes.includes(k) !== yes)])])
    setAsked((a) => [...a, f.id])
    setReply({ q: f.q, a: shortAnswer(f, yes) })
    setPicking(null)
    setTip(null)
  }

  function guess(k: AnimalKind) {
    if (out.includes(k) || won) return
    const name = ANIMALS[k].en
    const article = /^[aeiou]/.test(name) ? 'an' : 'a'
    if (k === secret) {
      sfx('correct')
      setReply({ q: `Is it ${article} ${name}?`, a: `Yes, it is! It's ${article} ${name}!` })
      setWon(true)
    } else {
      sfx('wrong')
      setOut((o) => [...o, k])
      setReply({ q: `Is it ${article} ${name}?`, a: "No, it isn't. Ask more questions!" })
    }
  }

  function next() {
    if (round + 1 >= ROUNDS) return setFinished(true)
    setRound(round + 1)
    setAsked([])
    setOut([])
    setReply(null)
    setWon(false)
  }

  if (finished) {
    return (
      <Panel>
        <p className="font-display text-xl text-gold">¡Adivinaste los {ROUNDS} animales!</p>
        <p className="mt-2 text-[15px] text-paper/85">Rosie: "You are very good at this game!"</p>
        <button className={`${btnPrimary} mt-4 w-full`} onClick={() => onClose(true)} autoFocus>Listo</button>
      </Panel>
    )
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">Adivina el animal · {round + 1} de {ROUNDS}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">
        Rosie esconde un animal en el granero. Pregúntale con <b>Does it...?</b> y toca el animal cuando sepas cuál es.
      </p>

      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {POOL.map((k) => (
          <button
            key={k}
            className={`flex flex-col items-center rounded-xl border-2 p-1 ${won && k === secret ? 'border-hp bg-hp/15' : 'border-line'} disabled:opacity-100`}
            onClick={() => guess(k)}
            disabled={out.includes(k) || won}
            aria-label={ANIMALS[k].en}
          >
            <AnimalIcon kind={k} size={40} dim={out.includes(k) && !(won && k === secret)} />
            <span className={`text-[11px] ${out.includes(k) ? 'text-paper/30' : 'text-paper/80'}`}>{ANIMALS[k].en}</span>
          </button>
        ))}
      </div>

      {reply && (
        <div className="anim-fade-in mt-3 rounded-xl bg-panel-2 px-3 py-2">
          <p className="text-sm text-paper/70">Tú: "{reply.q}"</p>
          <div className="flex items-center gap-2">
            <p className={`flex-1 text-[17px] font-semibold ${won ? 'text-hp' : ''}`}>Rosie: "{reply.a}"</p>
            <SpeakButton text={reply.a} size="sm" auto voice="female" />
          </div>
        </div>
      )}

      {won ? (
        <button className={`${btnPrimary} mt-3 w-full`} onClick={next} autoFocus>
          {round + 1 >= ROUNDS ? 'Terminar' : 'Otro animal'}
        </button>
      ) : picking ? (
        <div className="mt-3">
          <p className="text-sm text-paper/75">{picking.es} ¿Cómo se pregunta?</p>
          <div className="mt-2 grid gap-2">
            {opts.map((o) => (
              <button
                key={o}
                className={`${btn} text-left text-base`}
                onClick={() =>
                  o === picking.q
                    ? ask(picking)
                    : setTip(picking.kind === 'does' ? 'Con "it": Does it + verbo sin -s?' : picking.kind === 'is' ? 'Con adjetivos (big, pink) se pregunta con to be: Is it...?' : 'Con can no va do: Can people + verbo?')
                }
              >
                {o}
              </button>
            ))}
          </div>
          {tip && <p className="anim-fade-in mt-2 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
          <button className={`${btnGhost} mt-2`} onClick={() => { setPicking(null); setTip(null) }}>Otra pregunta</button>
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-sm text-paper/75">¿Qué le preguntas a Rosie?</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FEATURES.filter((f) => !asked.includes(f.id)).map((f) => (
              <button key={f.id} className="rounded-full border-2 border-line bg-panel-2 px-3 py-1.5 text-sm hover:border-gold/70" onClick={() => setPicking(f)}>
                {f.es}
              </button>
            ))}
          </div>
        </div>
      )}
    </Panel>
  )
}
