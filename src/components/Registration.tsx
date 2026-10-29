import { useState } from 'react'
import type { GameState } from '../game/types'
import { NPCS, schoolEmail, TRANSFER } from '../data/npcs'
import { COUNTRIES, countryOf } from '../data/countries'
import { SpeakButton } from './SpeakButton'
import { SpriteIcon } from './Sprite'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

type Field = 'name' | 'age' | 'country' | 'nationality' | 'address' | 'phone' | 'email'

type Step = {
  text: string
  es: string
  /** Texto que se lee en voz alta, si es distinto del que se muestra */
  say?: string
  options?: string[]
  answer?: number
  tip?: string
  /** Campo de la ficha que se llena al responder bien */
  field?: Field
  /** Lo que dice la secretaria después de una respuesta correcta */
  after?: { text: string; es: string }
}

const LABELS: Record<Field, string> = {
  name: 'Name',
  age: 'Age',
  country: 'Country',
  nationality: 'Nationality',
  address: 'Address',
  phone: 'Phone number',
  email: 'Email',
}

/**
 * Ficha de matrícula en la secretaría: practica dar información personal,
 * números de teléfono (escucha) y cómo se dice un email (at, dot).
 * Dirección y teléfono son inventados, vienen en el papel de traslado del juego.
 */
export function Registration({ state, onClose }: { state: GameState; onClose: (finished: boolean) => void }) {
  const name = state.hero.name
  const age = state.hero.age ?? 15
  const c = countryOf(state.hero.country) ?? COUNTRIES[0]
  const email = schoolEmail(name)
  const fem = state.hero.gender === 'female'
  const bienvenido = fem ? 'Bienvenida' : 'Bienvenido'
  const nuevo = fem ? 'la estudiante nueva' : 'el estudiante nuevo'
  const values: Record<Field, string> = {
    name,
    age: String(age),
    country: c.en,
    nationality: c.nationality,
    address: TRANSFER.address,
    phone: TRANSFER.phone,
    email,
  }

  const steps: Step[] = [
    {
      text: "Hello! Welcome to Greenfield School. I'm Mrs. Lopez, the secretary. You are the new student, right? Let's fill in your registration form.",
      es: `¡Hola! ${bienvenido} a la escuela Greenfield. Soy la señora López, la secretaria. Eres ${nuevo}, ¿verdad? Llenemos tu ficha de matrícula.`,
    },
    {
      text: "What's your name?",
      es: '¿Cómo te llamas?',
      options: [`My name is ${name}.`, "I'm fine, thank you.", `I'm from ${c.en}.`],
      answer: 0,
      tip: '"What\'s your name?" pregunta tu nombre: My name is...',
      field: 'name',
    },
    {
      text: 'How old are you?',
      es: '¿Cuántos años tienes?',
      options: [`I have ${age} years.`, `I am ${age} years old.`, `I am ${age} old years.`],
      answer: 1,
      tip: 'La edad se dice con TO BE: I am ... years old.',
      field: 'age',
    },
    {
      text: 'Where are you from?',
      es: '¿De dónde eres?',
      options: [`I'm ${c.en}.`, `I'm from ${c.en}.`, `From ${c.en} I am.`],
      answer: 1,
      tip: 'Se responde: I\'m from + país.',
      field: 'country',
    },
    {
      text: "And what's your nationality?",
      es: '¿Y cuál es tu nacionalidad?',
      options: [`I'm from ${c.nationality}.`, `I'm ${c.en}.`, `I'm ${c.nationality}.`],
      answer: 2,
      tip: `La nacionalidad va sin "from": I'm ${c.nationality}.`,
      field: 'nationality',
    },
    {
      text: "What's your address? Look at your transfer paper.",
      es: '¿Cuál es tu dirección? Mira tu papel de traslado.',
      options: [`It's ${TRANSFER.address}.`, `It's ${TRANSFER.phone}.`, "It's Monday."],
      answer: 0,
      tip: '"Address" es la dirección: el nombre de la calle y el número.',
      field: 'address',
    },
    {
      text: `And your phone number is... ${TRANSFER.phoneWrong}? Is that right?`,
      say: `And your phone number is ${TRANSFER.phoneSpoken}. Is that right?`,
      es: 'Escucha bien el número que dice y compáralo con tu papel.',
      options: ["Yes, that's right.", `No, it isn't. It's ${TRANSFER.phone}.`, `No, it isn't. It's ${TRANSFER.address}.`],
      answer: 1,
      tip: `Ella dijo "${TRANSFER.phoneWrong}", pero en tu papel dice "${TRANSFER.phone}". Los números de teléfono se dicen uno por uno, y el 0 se dice "oh".`,
      field: 'phone',
      after: { text: 'Oh, sorry! Five, five, five, oh, one, four, seven. Thank you.', es: '¡Ay, perdón! 555-0147. Gracias.' },
    },
    {
      text: "Last question. What's your email?",
      es: 'Última pregunta. ¿Cuál es tu correo electrónico?',
      options: [`It's ${email}.`, `It's ${TRANSFER.address}.`, `It's ${name}.`],
      answer: 0,
      tip: 'El email tiene una @ (arroba). Búscalo en tu papel.',
      field: 'email',
      after: {
        text: `So, ${email.replace('@', ' at ').replace('.edu', ' dot e, d, u')}. In English, @ is "at" and the point is "dot".`,
        es: 'En inglés la @ se dice "at" y el punto se dice "dot".',
      },
    },
    {
      text: "Perfect! Your form is complete. Here is your student card and your school uniform. Welcome to Greenfield School!",
      es: `¡Perfecto! Tu ficha está completa. Aquí tienes tu carnet de estudiante y tu uniforme. ¡${bienvenido} a la escuela Greenfield!`,
    },
  ]

  const [i, setI] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [hideEs, setHideEs] = useState(true)
  const [filled, setFilled] = useState<Field[]>([])
  const s = steps[i]
  const last = i === steps.length - 1
  const waiting = !!s.options && !solved
  const npc = NPCS.secretary

  function choose(k: number) {
    if (k === s.answer) {
      setSolved(true)
      setTip(null)
      if (s.field) setFilled((f) => [...f, s.field!])
    } else setTip(s.tip ?? null)
  }

  function next() {
    setSolved(false)
    setTip(null)
    if (last) onClose(true)
    else setI(i + 1)
  }

  return (
    <Panel className="max-h-[88vh] overflow-y-auto">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">Secretaría</p>
          <h2 className="font-display text-xl">Ficha de matrícula</h2>
        </div>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      {/* La ficha que se va llenando */}
      <div className="rounded-xl bg-paper p-3 text-ink">
        <p className="mb-1 text-center font-display text-sm font-semibold tracking-wide">GREENFIELD SCHOOL · REGISTRATION FORM</p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[13px]">
          {(Object.keys(LABELS) as Field[]).map((f) => (
            <div key={f} className="contents">
              <dt className="font-semibold text-ink/70">{LABELS[f]}:</dt>
              <dd className={`truncate border-b border-dashed border-ink/30 ${filled.includes(f) ? 'anim-fade-in font-semibold' : 'text-transparent'}`}>
                {filled.includes(f) ? values[f] : '.'}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* El papel de traslado con los datos inventados */}
      {i >= 5 && i < steps.length - 1 && (
        <div className="mt-2 rounded-lg border border-dashed border-line px-3 py-2 text-xs text-paper/75">
          <span className="font-semibold text-gold">Tu papel de traslado: </span>
          {TRANSFER.address} · Tel. {TRANSFER.phone} · {email}
        </div>
      )}

      <div className="mt-3 flex items-start gap-3">
        <div className="rounded-xl bg-panel-2 p-1">
          <SpriteIcon look={npc.look} size={44} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-lg text-gold">{npc.name}</p>
            <SpeakButton text={s.say ?? s.text} size="sm" />
          </div>
          <p key={i} className="anim-fade-in text-[16px] leading-relaxed">{s.text}</p>
          {!hideEs && <p className="mt-0.5 text-sm text-paper/60">{s.es}</p>}
        </div>
      </div>

      {waiting && (
        <div className="mt-3 grid gap-2">
          {s.options!.map((o, k) => (
            <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>
              {o}
            </button>
          ))}
        </div>
      )}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">{tip}</p>}
      {solved && s.options && (
        <div className="anim-fade-in mt-3 grid gap-2">
          <p className="rounded-xl bg-[#3b6fb6]/25 px-3 py-2 text-[15px]">{s.options[s.answer!]}</p>
          {s.after && (
            <div className="flex items-start gap-2">
              <p className="flex-1 text-[15px]">
                <span className="font-semibold text-gold">{npc.name}: </span>"{s.after.text}"
                {!hideEs && <span className="mt-0.5 block text-sm text-paper/60">{s.after.es}</span>}
              </p>
              <SpeakButton text={s.after.text} size="sm" />
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <button className={btnGhost} onClick={() => setHideEs((v) => !v)}>{hideEs ? 'Traducir' : 'Ocultar'}</button>
        {!waiting && (
          <button className={btnPrimary} onClick={next} autoFocus>
            {last ? 'Recibir uniforme' : 'Siguiente'}
          </button>
        )}
      </div>
    </Panel>
  )
}
