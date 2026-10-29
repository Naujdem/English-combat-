import { useState } from 'react'
import type { Gender, Hero, Interest } from '../game/types'
import { SpriteBody } from '../components/Sprite'
import { ClassroomStage } from '../components/Lesson'
import { SpeakButton } from '../components/SpeakButton'
import { btn, btnPrimary, Panel } from '../components/ui'
import { FRIENDS } from '../data/friends'
import { COUNTRIES, countryOf } from '../data/countries'

const SKINS = ['#f6d3b3', '#f1c27d', '#c68642', '#8d5524']
const HAIRS = ['#1f1f1f', '#4a2c17', '#a0522d', '#d9b46a']

type Draft = {
  name: string
  gender: Gender
  skin: string
  hair: string
  age: number
  country: string
  interestMode: 'romance' | 'friendship' | 'none' | null
  interestGender: Gender
  interestName: string
}

type Opt = { text: string; reply?: string; es?: string; apply: (d: Draft) => Partial<Draft> }

type Step =
  | { kind: 'say'; text: string; es?: string; board?: [string, string?] }
  | { kind: 'practice'; text: string; board?: [string, string?]; options: string[]; answer: number; tip: string }
  | { kind: 'input'; field: 'name' | 'interestName'; text: string; es?: string; prefix: string; placeholder: string; board?: [string, string?] }
  | { kind: 'pick'; text: string; es?: string; board?: [string, string?]; options: Opt[] }
  | { kind: 'look' }
  | { kind: 'age'; text: string; es?: string; board?: [string, string?] }
  | { kind: 'country'; text: string; es?: string; board?: [string, string?] }

/** Los pasos de la presentación. Algunos dependen de lo que el jugador ya respondió. */
function buildSteps(d: Draft): Step[] {
  const c = countryOf(d.country) ?? COUNTRIES[0]
  const other = COUNTRIES.find((x) => x.en !== c.en && x.en !== 'the United States')!
  const ig = d.interestGender
  const He = ig === 'female' ? 'She' : 'He'
  const his = ig === 'female' ? 'her' : 'his'
  const His = ig === 'female' ? 'Her' : 'His'
  const him = ig === 'female' ? 'her' : 'him'
  const el = ig === 'female' ? 'ella' : 'él'

  const steps: Step[] = [
    {
      kind: 'say',
      text: "Now let's practice! First, greetings. We say Hello or Hi. In the morning: Good morning!",
      es: 'Ahora, ¡practiquemos! Primero, los saludos. Decimos "Hello" o "Hi". En la mañana: "Good morning".',
      board: ['Hello! · Hi!', 'Good morning!'],
    },
    {
      kind: 'practice',
      text: 'It is 8 in the morning. ___, Leo!',
      board: ['Hello! · Hi!', 'Good morning!'],
      options: ['Good night', 'Good morning', 'Goodbye'],
      answer: 1,
      tip: 'En la mañana se saluda con "Good morning". "Good night" es para despedirse en la noche.',
    },
    {
      kind: 'say',
      text: "Now tell me about you. What's your name?",
      es: '¿Cómo te llamas? Se responde: "My name is..."',
      board: ["What's your name?", 'My name is ...'],
    },
    { kind: 'input', field: 'name', text: "What's your name?", prefix: 'My name is', placeholder: 'Alex', board: ["What's your name?", 'My name is ...'] },
    {
      kind: 'say',
      text: `Nice to meet you, ${d.name}! I'm Leo.`,
      es: `¡Mucho gusto, ${d.name}! Yo soy Leo. "Nice to meet you" significa "mucho gusto".`,
      board: ['Nice to meet you!', '= Mucho gusto'],
    },
    {
      kind: 'pick',
      text: 'Are you a boy or a girl?',
      es: '¿Eres chico o chica? "Boy" = chico, "girl" = chica.',
      board: ['boy = chico', 'girl = chica'],
      options: [
        { text: 'I am a boy.', reply: 'OK! You are a boy.', apply: () => ({ gender: 'male' }) },
        { text: 'I am a girl.', reply: 'OK! You are a girl.', apply: () => ({ gender: 'female' }) },
      ],
    },
    { kind: 'look' },
    {
      kind: 'age',
      text: 'How old are you?',
      es: '¿Cuántos años tienes? En inglés la edad se dice con TO BE: "I am 15 years old".',
      board: ['How old are you?', 'I am ... years old.'],
    },
    {
      kind: 'practice',
      text: `Careful! Which one is correct?`,
      board: ['How old are you?', `I am ${d.age} years old.`],
      options: [`I have ${d.age} years.`, `I am ${d.age} years old.`, `I is ${d.age} years old.`],
      answer: 1,
      tip: 'En español "tengo 15 años", pero en inglés se usa TO BE: "I am 15 years old". Nunca "I have".',
    },
    {
      kind: 'country',
      text: 'Where are you from?',
      es: '¿De dónde eres? Se responde: "I am from" + país.',
      board: ['Where are you from?', 'I am from ...'],
    },
    {
      kind: 'practice',
      text: `I am from ${c.en}. I am ___.`,
      board: [`${c.en} → ${c.nationality}`, `I am ${c.nationality}.`],
      options: [c.en, c.nationality, other.nationality],
      answer: 1,
      tip: `La nacionalidad de ${c.es} es "${c.nationality}". Va sin "from" y con mayúscula: I am ${c.nationality}.`,
    },
    c.en === 'Colombia'
      ? { kind: 'say', text: 'Me too! I am Colombian. We are from the same country!', es: '¡Yo también! Soy colombiano. ¡Somos del mismo país!', board: ['I am Colombian.', 'We are Colombian.'] }
      : { kind: 'say', text: `Cool! I am Colombian and you are ${c.nationality}.`, es: `¡Genial! Yo soy colombiano y tú eres de ${c.es}.`, board: ['I am Colombian.', `You are ${c.nationality}.`] },
    {
      kind: 'pick',
      text: 'One more question... Do you know someone in this school? Someone special?',
      es: 'Una pregunta más... ¿Conoces a alguien en esta escuela? ¿Alguien especial?',
      options: [
        { text: 'Yes... someone special.', reply: 'Ooh! Tell me more!', es: '¡Uy! ¡Cuéntame más!', apply: () => ({ interestMode: 'romance' }) },
        { text: 'Yes, a good friend.', reply: 'Nice! Tell me more!', es: '¡Qué bien! ¡Cuéntame más!', apply: () => ({ interestMode: 'friendship' }) },
        { text: "No, I don't.", reply: "That's OK! I can introduce you to my friend.", es: '¡No pasa nada! Te puedo presentar a mi amigo.', apply: () => ({ interestMode: 'none' }) },
      ],
    },
  ]

  if (d.interestMode === 'none') {
    steps.push({
      kind: 'pick',
      text: 'My friend is in the library. Do you want to meet a boy or a girl?',
      es: 'Mi amigo está en la biblioteca. ¿Quieres conocer a un chico o a una chica?',
      options: [
        { text: 'A boy.', reply: 'OK! His name is Sam.', es: '¡Bien! Se llama Sam.', apply: () => ({ interestGender: 'male', interestName: 'Sam' }) },
        { text: 'A girl.', reply: 'OK! Her name is Sofia.', es: '¡Bien! Se llama Sofía.', apply: () => ({ interestGender: 'female', interestName: 'Sofia' }) },
      ],
    })
    steps.push({
      kind: 'say',
      text: `${d.interestName} is very nice. ${He} is in the library. Talk to ${him}!`,
      es: `${d.interestName} es muy amable. Está en la biblioteca. ¡Habla con ${el}!`,
      board: [`${He} is in the library.`, `${His} name is ${d.interestName}.`],
    })
  } else if (d.interestMode) {
    steps.push({
      kind: 'pick',
      text: 'Is it a boy or a girl?',
      es: '¿Es un chico o una chica? Para un chico se usa "he" y "his"; para una chica, "she" y "her".',
      board: ['boy → he · his', 'girl → she · her'],
      options: [
        { text: 'He is a boy.', apply: () => ({ interestGender: 'male' }) },
        { text: 'She is a girl.', apply: () => ({ interestGender: 'female' }) },
      ],
    })
    steps.push({
      kind: 'input',
      field: 'interestName',
      text: `What is ${his} name?`,
      es: `¿Cómo se llama? Responde: "${His} name is..."`,
      prefix: `${His} name is`,
      placeholder: ig === 'female' ? 'Sofia' : 'Sam',
      board: [`What is ${his} name?`, `${His} name is ...`],
    })
    steps.push(
      d.interestMode === 'romance'
        ? {
            kind: 'say',
            text: `Ooh! ${d.interestName}! ${He} is in the library now. Go and talk to ${him}!`,
            es: `¡Uy! ¡${d.interestName}! Está en la biblioteca ahora. ¡Ve a hablar con ${el}!`,
            board: [`${He} is in the library.`, `${His} name is ${d.interestName}.`],
          }
        : {
            kind: 'say',
            text: `Great! ${d.interestName} is my friend too. ${He} is in the library.`,
            es: `¡Genial! ${d.interestName} también es mi amigo. Está en la biblioteca.`,
            board: [`${He} is in the library.`, `${His} name is ${d.interestName}.`],
          },
    )
  }

  steps.push({
    kind: 'say',
    text: "OK, last thing. I'm your trainer! Let's have a practice battle. Use your words!",
    es: 'Bueno, lo último. ¡Soy tu entrenador! Hagamos un combate de práctica. ¡Usa tus palabras!',
    board: ['Hello! · Nice to meet you!', 'I am ... · I am from ...'],
  })
  return steps
}

export function Presentation({ onDone }: { onDone: (hero: Hero, interest: Interest) => void }) {
  const [d, setD] = useState<Draft>({
    name: '',
    gender: 'male',
    skin: SKINS[1],
    hair: HAIRS[1],
    age: 15,
    country: 'Colombia',
    interestMode: null,
    interestGender: 'female',
    interestName: '',
  })
  const [i, setI] = useState(0)
  const [hideEs, setHideEs] = useState(true)
  const [picked, setPicked] = useState<Opt | null>(null)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [draftText, setDraftText] = useState('')
  const [error, setError] = useState('')

  const steps = buildSteps(d)
  const s = steps[i]
  const last = i === steps.length - 1
  const country = countryOf(d.country) ?? COUNTRIES[0]

  function next() {
    setPicked(null)
    setSolved(false)
    setTip(null)
    setError('')
    if (last) {
      onDone(
        { name: d.name, gender: d.gender, look: { skin: d.skin, hair: d.hair }, age: d.age, country: d.country },
        { name: d.interestName, gender: d.interestGender, mode: d.interestMode === 'romance' ? 'romance' : 'friendship', viaLeo: d.interestMode === 'none' },
      )
    } else setI(i + 1)
  }

  function submitInput(field: 'name' | 'interestName') {
    const v = draftText.trim()
    if (!v) return setError('Escribe un nombre para continuar.')
    if (v.length > 14) return setError('Usa máximo 14 letras.')
    setD({ ...d, [field]: v[0].toUpperCase() + v.slice(1) })
    setDraftText('')
    next()
  }

  // Lo que muestra la pizarra; en los campos de texto se va escribiendo en vivo
  let board = 'board' in s ? s.board : undefined
  if (s.kind === 'input') board = [s.text, `${s.prefix} ${draftText || '...'}`]
  if (s.kind === 'age') board = ['How old are you?', `I am ${d.age} years old.`]
  if (s.kind === 'country') board = ['Where are you from?', `I am from ${country.en}.`]
  if (s.kind === 'look') board = [`I am ${d.name}.`, d.gender === 'female' ? 'I am a girl.' : 'I am a boy.']

  const heroLook = { shirt: '#3b6fb6', cape: '#c0392b', skin: d.skin, hair: d.hair, gender: d.gender }
  const leoLine = s.kind !== 'look' && s.kind !== 'practice'
  const es = 'es' in s ? s.es : undefined
  const sayText = s.kind === 'practice' ? s.text : s.kind === 'look' ? '' : s.text

  return (
    <div className="mx-auto flex h-full max-w-md flex-col justify-center gap-4 overflow-y-auto px-4 py-6">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">Presentación con Leo</p>
      <ClassroomStage board={board}>
        <g transform="translate(40 92) scale(3)">
          <SpriteBody look={heroLook} mood="mute" />
        </g>
        <g transform="translate(280 92) scale(-3 3)">
          <SpriteBody look={FRIENDS.leo.look} />
        </g>
      </ClassroomStage>

      <Panel>
        {leoLine && (
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-gold">Leo</p>
            <SpeakButton text={sayText} size="sm" auto voice="male" />
          </div>
        )}
        {s.kind === 'practice' && <p className="text-xs font-semibold uppercase tracking-wide text-hp">Escribe en la pizarra</p>}
        {s.kind === 'look' && <p className="text-xs font-semibold uppercase tracking-wide text-gold">Tu aspecto</p>}

        {s.kind === 'look' ? (
          <p className="text-[17px] italic text-paper/85">Te ves en el reflejo de la ventana. ¿Cómo eres?</p>
        ) : (
          <p key={i} className={`anim-fade-in leading-relaxed ${s.kind === 'practice' ? 'font-display text-[21px]' : 'text-[17px]'}`}>
            {s.kind === 'practice' && solved ? s.text.replace('___', s.options[s.answer]) : sayText}
          </p>
        )}
        {!hideEs && es && !picked && <p className="mt-1 text-sm text-paper/60">{es}</p>}

        {/* Respuesta de práctica en la pizarra */}
        {s.kind === 'practice' && !solved && (
          <div className={`mt-3 grid gap-2 ${s.options.some((o) => o.length > 12) ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {s.options.map((o, k) => (
              <button
                key={k}
                className={`${btn} ${s.options.some((x) => x.length > 12) ? 'text-left text-base' : 'px-2 text-[17px]'}`}
                onClick={() => (k === s.answer ? (setSolved(true), setTip(null)) : setTip(s.tip))}
              >
                {o}
              </button>
            ))}
          </div>
        )}
        {s.kind === 'practice' && tip && !solved && (
          <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Leo: casi. {tip}</p>
        )}
        {s.kind === 'practice' && solved && <p className="anim-fade-in mt-2 text-sm font-semibold text-hp">¡Bien hecho!</p>}

        {/* Escribir un nombre */}
        {s.kind === 'input' && (
          <form
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault()
              submitInput(s.field)
            }}
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-hp">Escribe en la pizarra</p>
            <div className="flex items-center gap-2">
              <span className="font-display text-[18px] whitespace-nowrap">{s.prefix}</span>
              <input
                autoFocus
                value={draftText}
                maxLength={14}
                onChange={(e) => {
                  setDraftText(e.target.value)
                  setError('')
                }}
                placeholder={s.placeholder}
                className="min-w-0 flex-1 rounded-xl border-2 border-line bg-ink px-3 py-2 text-lg outline-none focus:border-gold"
              />
            </div>
            {error && <p className="mt-2 text-sm text-[#f3b0b0]">{error}</p>}
            <button type="submit" className={`${btnPrimary} mt-3 w-full`}>Escribir</button>
          </form>
        )}

        {/* Elegir una respuesta */}
        {s.kind === 'pick' && !picked && (
          <div className="mt-3 grid gap-2">
            {s.options.map((o, k) => (
              <button
                key={k}
                className={`${btn} text-left text-base`}
                onClick={() => {
                  setD({ ...d, ...o.apply(d) })
                  if (o.reply) setPicked(o)
                  else next()
                }}
              >
                {o.text}
              </button>
            ))}
          </div>
        )}
        {s.kind === 'pick' && picked && (
          <div className="anim-fade-in mt-2 grid gap-2">
            <p className="rounded-xl bg-[#3b6fb6]/25 px-3 py-2 text-[15px]">
              <span className="font-semibold text-[#9cc0f0]">{d.name || 'Tú'}: </span>
              {picked.text}
            </p>
            <div className="flex items-start gap-2">
              <p className="flex-1 text-[17px]"><span className="font-semibold text-gold">Leo: </span>"{picked.reply}"</p>
              <SpeakButton text={picked.reply!} size="sm" auto voice="male" />
            </div>
            {!hideEs && picked.es && <p className="text-sm text-paper/60">{picked.es}</p>}
          </div>
        )}

        {/* Aspecto */}
        {s.kind === 'look' && (
          <div className="mt-3 grid gap-3">
            <div>
              <p className="mb-1.5 text-sm font-semibold text-paper/80">Piel</p>
              <div className="flex gap-2" role="radiogroup" aria-label="Tono de piel">
                {SKINS.map((c) => (
                  <button key={c} role="radio" aria-checked={d.skin === c} aria-label={c} onClick={() => setD({ ...d, skin: c })}
                    className={`h-10 w-10 rounded-full border-[3px] transition ${d.skin === c ? 'scale-110 border-gold' : 'border-transparent'}`} style={{ background: c }} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-semibold text-paper/80">Cabello</p>
              <div className="flex gap-2" role="radiogroup" aria-label="Color de cabello">
                {HAIRS.map((c) => (
                  <button key={c} role="radio" aria-checked={d.hair === c} aria-label={c} onClick={() => setD({ ...d, hair: c })}
                    className={`h-10 w-10 rounded-full border-[3px] transition ${d.hair === c ? 'scale-110 border-gold' : 'border-transparent'}`} style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Edad */}
        {s.kind === 'age' && (
          <div className="mt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-hp">Escribe en la pizarra</p>
            <div className="flex items-center justify-center gap-4">
              <button className={`${btn} h-12 w-12 px-0 text-2xl`} aria-label="Menos" onClick={() => setD({ ...d, age: Math.max(7, d.age - 1) })}>−</button>
              <p className="min-w-[4ch] text-center font-display text-3xl">{d.age}</p>
              <button className={`${btn} h-12 w-12 px-0 text-2xl`} aria-label="Más" onClick={() => setD({ ...d, age: Math.min(99, d.age + 1) })}>+</button>
            </div>
            <p className="mt-2 text-center text-xs text-paper/50">Tu edad solo se guarda en este dispositivo.</p>
          </div>
        )}

        {/* País */}
        {s.kind === 'country' && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {COUNTRIES.map((c) => (
              <button
                key={c.en}
                onClick={() => setD({ ...d, country: c.en })}
                className={`rounded-xl border-2 px-2 py-2 text-left text-sm font-semibold transition ${d.country === c.en ? 'border-gold bg-gold/15 text-gold' : 'border-line text-paper/80'}`}
                aria-pressed={d.country === c.en}
              >
                {c.es}
                <span className="block text-xs font-normal text-paper/50">{c.en}</span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          {es ? (
            <button className="rounded-lg px-3 py-1.5 text-sm font-semibold text-paper/80" onClick={() => setHideEs((v) => !v)}>
              {hideEs ? 'Traducir' : 'Ocultar'}
            </button>
          ) : <span />}
          {(s.kind === 'say' || s.kind === 'look' || s.kind === 'age' || s.kind === 'country' || (s.kind === 'practice' && solved) || (s.kind === 'pick' && picked)) && (
            <button className={btnPrimary} onClick={next} autoFocus>
              {last ? '¡A entrenar!' : s.kind === 'look' ? 'Así me veo' : s.kind === 'age' || s.kind === 'country' ? 'Escribir' : 'Siguiente'}
            </button>
          )}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/35" aria-hidden="true">
          <div className="h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
        </div>
      </Panel>
    </div>
  )
}
