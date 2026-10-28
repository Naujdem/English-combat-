import { useState } from 'react'
import { SpriteBody } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { NPCS } from '../data/npcs'

/**
 * Pedir en el café con Lily: Can I have...?, a/an, some/any, precios,
 * deletrear el nombre para el vaso y pedir el café del guía.
 */
type Round = { lily: string; es: string; ask: string; options: string[]; answer: number; tip: string; reply?: { text: string; es: string } }

const MENU: [string, string][] = [
  ['coffee', '$2'],
  ['juice', '$2'],
  ['water', '$1'],
  ['sandwich', '$4'],
  ['apple', '$1'],
  ['cake', '$3'],
]

/** El nombre mal escrito en el vaso: cambia de lugar dos letras */
function misspell(name: string) {
  const n = name.toUpperCase().replace(/[^A-ZÑÁÉÍÓÚ]/g, '') || 'ALEX'
  if (n.length < 3) return n + n[n.length - 1]
  return n[0] + n[2] + n[1] + n.slice(3)
}
const spell = (n: string) => n.toUpperCase().replace(/[^A-ZÑÁÉÍÓÚ]/g, '').split('').join('-')

function rounds(name: string): Round[] {
  const wrong = misspell(name)
  return [
    {
      lily: 'Hi! Welcome to Sunny Café. What can I get you?',
      es: '¡Hola! Bienvenido a Sunny Café. ¿Qué te sirvo?',
      ask: '¿Cómo pides un jugo?',
      options: ['Can I have a juice, please?', 'I want juice.', 'Give me a juice!'],
      answer: 0,
      tip: '"I want" y "Give me" suenan bruscos. Lo amable es: Can I have..., please?',
    },
    {
      lily: 'Sure! Anything to eat?',
      es: '¡Claro! ¿Algo de comer?',
      ask: 'Pide una manzana.',
      options: ['Yes. Can I have a apple, please?', 'Yes. Can I have an apple, please?', 'Yes. Can I have apple, please?'],
      answer: 1,
      tip: '"Apple" empieza con sonido de vocal: an apple.',
    },
    {
      lily: "Oh, sorry! There aren't any apples today.",
      es: '¡Ay, lo siento! Hoy no hay manzanas.',
      ask: 'Pregunta si hay pastel.',
      options: ['Is there a any cake?', 'Are there any cake?', 'Is there any cake?'],
      answer: 2,
      tip: '"Cake" aquí es una cosa sin contar: Is there any cake?',
      reply: { text: 'Yes, there is some chocolate cake.', es: 'Sí, hay pastel de chocolate.' },
    },
    {
      lily: 'Juice and chocolate cake. Anything else?',
      es: 'Jugo y pastel de chocolate. ¿Algo más?',
      ask: 'Pregunta cuánto es.',
      options: ['No, thank you. How many is it?', 'No, thank you. How much is it?', 'No, thank you. How much it is?'],
      answer: 1,
      tip: 'Para preguntar un precio: How much is it?',
    },
    {
      lily: 'The juice is two dollars and the cake is three dollars. So that is...',
      es: 'El jugo cuesta dos dólares y el pastel tres dólares. Entonces son...',
      ask: '¿Cuánto es en total? Mira el menú.',
      options: ['fifteen dollars', 'five dollars', 'fifty dollars'],
      answer: 1,
      tip: '2 + 3 = 5: five dollars. Fifteen es 15 y fifty es 50.',
      reply: { text: "That's five dollars, please.", es: 'Son cinco dólares, por favor.' },
    },
    {
      lily: `What's your name? I write it on your cup... Is it ${wrong.split('').join('-')}?`,
      es: `¿Cómo te llamas? Lo escribo en tu vaso... ¿Es ${wrong}?`,
      ask: 'Mira el vaso. ¿Está bien escrito tu nombre?',
      options: ['Yes, perfect!', `No, sorry. It's ${spell(name)}.`, `No, sorry. It's ${wrong.split('').join('-')}.`],
      answer: 1,
      tip: 'El vaso está mal escrito. Deletrea tu nombre letra por letra.',
      reply: { text: 'Oops! Sorry. Thank you!', es: '¡Ups! Perdón. ¡Gracias!' },
    },
    {
      lily: 'Here you are! Anything else?',
      es: '¡Aquí tienes! ¿Algo más?',
      ask: 'Pide el café negro para el señor Rossi.',
      options: ['Yes. I want black coffee for Mr. Rossi.', 'Yes. Can I have an black coffee for Mr. Rossi?', 'Yes. Can I have a black coffee for Mr. Rossi, please?'],
      answer: 2,
      tip: '"Black" empieza con consonante: a black coffee. Y se pide con Can I have..., please?',
      reply: { text: 'For Mr. Rossi? He always has a black coffee at ten! Here you are.', es: '¿Para el señor Rossi? ¡Siempre toma un café negro a las diez! Aquí tienes.' },
    },
    {
      lily: 'Here you are. Have a nice day!',
      es: 'Aquí tienes. ¡Que tengas un buen día!',
      ask: '¿Qué respondes?',
      options: ["You're welcome!", 'Thank you! You too!', 'Here you are!'],
      answer: 1,
      tip: 'Cuando te entregan algo, se responde "Thank you!". "You\'re welcome" es "de nada".',
    },
  ]
}

export function CafeOrder({ name, onClose }: { name: string; onClose: (done: boolean) => void }) {
  const list = rounds(name)
  const [r, setR] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(true)
  const done = r >= list.length
  const round = list[Math.min(r, list.length - 1)]
  const cup = r >= 5 ? (r === 5 && !solved ? misspell(name) : name.toUpperCase()) : null
  const line = done ? { text: 'Bye! Come back soon!', es: '¡Adiós! ¡Vuelve pronto!' } : solved && round.reply ? round.reply : { text: round.lily, es: round.es }

  function choose(k: number) {
    if (solved) return
    if (k === round.answer) {
      setSolved(true)
      setTip(null)
    } else setTip(round.tip)
  }

  function next() {
    setSolved(false)
    setTip(null)
    setR(r + 1)
  }

  return (
    <Panel>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">Café · Lily</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      <svg viewBox="0 0 320 150" className="w-full rounded-xl border-2 border-line" role="img" aria-label="Mostrador del café con el menú">
        <rect width="320" height="150" fill="#f1dcc0" />
        <rect y="104" width="320" height="46" fill="#8b5a2b" />
        <rect y="100" width="320" height="8" fill="#a8743f" />
        <g transform="translate(28 46) scale(1.9)">
          <SpriteBody look={NPCS.lily.look} />
        </g>
        <rect x="150" y="10" width="160" height="86" rx="5" fill="#2b241c" />
        <text x="230" y="26" textAnchor="middle" fontSize="11" fill="#f6d36b" fontFamily="Fredoka, Nunito, system-ui, sans-serif">MENU</text>
        {MENU.map(([item, price], k) => (
          <g key={item}>
            <text x={162 + (k % 2) * 78} y={46 + Math.floor(k / 2) * 18} fontSize="10" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">{item}</text>
            <text x={222 + (k % 2) * 78} y={46 + Math.floor(k / 2) * 18} textAnchor="end" fontSize="10" fill="#f6d36b" fontFamily="Fredoka, Nunito, system-ui, sans-serif">{price}</text>
          </g>
        ))}
        {cup && (
          <g className="anim-pop">
            <path d="M104 74 h34 l-4 30 h-26 z" fill="#f4efe4" stroke="#8b5a2b" strokeWidth="1.5" />
            <rect x="102" y="70" width="38" height="6" rx="2" fill="#6b4423" />
            <text x="121" y="94" textAnchor="middle" fontSize={cup.length > 6 ? 6 : 8} fontWeight="700" fill={r === 5 && !solved ? '#d64545' : '#2b241c'} fontFamily="Fredoka, Nunito, system-ui, sans-serif">{cup}</text>
          </g>
        )}
      </svg>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-display text-lg text-gold">Lily</p>
        <SpeakButton text={line.text} size="sm" />
      </div>
      <p key={`${r}-${solved}`} className="anim-fade-in text-[17px] leading-relaxed">{line.text}</p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {!done && !solved && (
        <>
          <p className="mt-3 text-sm text-paper/75">{round.ask}</p>
          <div className="mt-2 grid gap-2">
            {round.options.map((o, k) => (
              <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>{o}</button>
            ))}
          </div>
        </>
      )}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {solved && (
        <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
          <p className="flex-1 text-sm text-hp">¡Bien! Dijiste: "{round.options[round.answer]}"</p>
          <SpeakButton text={round.options[round.answer].replace(/-/g, ', ')} size="sm" />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Llevar el café</button>
        ) : solved ? (
          <button className={btnPrimary} onClick={next} autoFocus>Siguiente</button>
        ) : null}
      </div>
    </Panel>
  )
}
