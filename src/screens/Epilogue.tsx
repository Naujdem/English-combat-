import { useState } from 'react'
import type { GameState } from '../game/types'
import { SpriteBody } from '../components/Sprite'
import { SpeakButton } from '../components/SpeakButton'
import { Tappable } from '../components/Words'
import { btn, btnGhost, btnPrimary, Panel } from '../components/ui'
import { FRIENDS, interestFriend } from '../data/friends'
import { heroLook } from '../game/helpers'
import { TimeClock } from '../components/TimeClock'
import { WORLD } from '../data/world'

const FONT = 'Fredoka, Nunito, system-ui, sans-serif'

type Who = 'narrator' | 'leo' | 'maya' | 'interest' | 'villain' | 'hero'
type Step = {
  who: Who
  text: string
  es?: string
  /** El jugador elige qué decir; solo una opción es correcta */
  choice?: { options: string[]; answer: number; tip: string }
  villain?: boolean
  /** Muestra el reloj del tiempo en la escena */
  clock?: boolean
  /** Quién más aparece en la escena */
  cast?: ('leo' | 'maya' | 'interest')[]
}

/**
 * Final del capítulo 1: al salir de la escuela, Leo y la persona especial esperan.
 * El protagonista habla por primera vez, presenta a sus amigos, aparece el villano
 * y todos se despiden. Practica "This is..." y las despedidas.
 */
function buildSteps(s: GameState): Step[] {
  const name = s.hero.name
  const it = s.interest
  const iname = it.name
  const He = it.gender === 'female' ? 'She' : 'He'
  const romance = it.mode === 'romance'
  // Si Leo fue quien presentó a esta persona, el jugador se la presenta a Maya
  const other = it.viaLeo ? 'Maya' : 'Leo'
  const otherId = it.viaLeo ? 'maya' : 'leo'
  const cast: ('leo' | 'maya' | 'interest')[] = it.viaLeo ? ['leo', 'maya', 'interest'] : ['leo', 'interest']

  return [
    { who: 'narrator', text: `Sales de la sala de profesores. En la entrada de la escuela te esperan ${it.viaLeo ? 'Leo, Maya y ' + iname : 'Leo y ' + iname}.`, cast },
    { who: 'leo', text: `${name}! You did it! Mr. Grimm is OK now!`, es: `¡${name}! ¡Lo lograste! ¡El profesor Grimm ya está bien!`, cast },
    { who: 'narrator', text: 'Abres la boca para responder y... ¡por fin sale tu voz!', cast },
    {
      who: 'hero',
      text: '¿Qué le dices a Leo con tu nueva voz?',
      cast,
      choice: {
        options: ['Thank you, Leo! I can talk again!', 'Goodbye, Leo!', 'I is happy, Leo!'],
        answer: 0,
        tip: 'Leo te felicita, así que lo natural es agradecer: "Thank you!". Y recuerda: no es "I is", es "I am".',
      },
    },
    {
      who: otherId as Who,
      text: it.viaLeo ? "Ha ha! Your voice is back! ... And who is this? I don't know your friend." : 'Ha ha! Your voice is back! ... Wait, who is this?',
      es: it.viaLeo ? '¡Ja, ja! ¡Recuperaste la voz! ... ¿Y quién es? No conozco a tu amigo.' : '¡Ja, ja! ¡Recuperaste la voz! ... Espera, ¿quién es?',
      cast,
    },
    {
      who: 'hero',
      text: `Presenta a ${iname} y a ${other}.`,
      cast,
      choice: {
        options: [
          `${other}, this is ${iname}. ${iname}, this is my friend ${other}.`,
          `${other}, ${He.toLowerCase()} name ${iname}.`,
          `${other}, this are ${iname}.`,
        ],
        answer: 0,
        tip: `Para presentar a alguien se dice "This is...": ${other}, this is ${iname}.`,
      },
    },
    { who: 'interest', text: `Nice to meet you, ${other}!`, es: `¡Mucho gusto, ${other}!`, cast },
    { who: otherId as Who, text: `Nice to meet you too, ${iname}!`, es: `¡Mucho gusto también, ${iname}!`, cast },
    romance
      ? { who: 'interest', text: `${name}, your voice is beautiful. I am happy you can talk now.`, es: `${name}, tu voz es hermosa. Me alegra que ya puedas hablar.`, cast }
      : { who: 'interest', text: `${name}, you are very brave. I am happy you are my friend.`, es: `${name}, eres muy valiente. Me alegra que seas mi amigo.`, cast },
    { who: 'narrator', text: 'Leo se agacha a amarrarse los zapatos. Entonces, una voz ronca suena detrás de ti.', cast },
    { who: 'villain', text: 'Ha! So you have your school words back... and a piece of MY clock.', es: '¡Ja! Así que recuperaste tus palabras de la escuela... y una pieza de MI reloj.', villain: true, cast },
    { who: 'villain', text: 'Keep it... for now. There is another piece in the city, and I am going to find it first!', es: 'Quédatela... por ahora. Hay otra pieza en la ciudad, ¡y yo la voy a encontrar primero!', villain: true, cast },
    { who: 'narrator', text: 'Cuando Leo levanta la cabeza, el desconocido ya no está. Sacas la pieza del reloj que te dio Grimm.', cast, clock: true },
    { who: 'leo', text: 'Look! It is a piece of a clock. The clock has five pieces. Where are the other pieces?', es: '¡Mira! Es una pieza de un reloj. El reloj tiene cinco piezas. ¿Dónde están las otras piezas?', cast, clock: true },
    {
      who: 'hero',
      text: '¿Qué le respondes a Leo?',
      cast,
      clock: true,
      choice: {
        options: ['They are in the city and in other times.', 'It are in the city.', 'They is in the city.'],
        answer: 0,
        tip: '"The other pieces" es plural, así que va "they are". "It are" y "they is" mezclan singular y plural.',
      },
    },
    { who: 'leo', text: "The city? We can go together! But now it's late. Goodbye, everyone! See you tomorrow!", es: '¿La ciudad? ¡Podemos ir juntos! Pero ya es tarde. ¡Adiós a todos! ¡Nos vemos mañana!', cast },
    {
      who: 'hero',
      text: '¿Cómo te despides de Leo?',
      cast,
      choice: {
        options: ['Bye, Leo! See you tomorrow!', 'Good morning, Leo!', 'Nice to meet you, Leo!'],
        answer: 0,
        tip: 'Para despedirse: "Bye", "Goodbye" o "See you tomorrow". "Nice to meet you" se dice cuando conoces a alguien.',
      },
    },
    {
      who: 'narrator',
      text: 'Fin del capítulo 1: La escuela. Recuperaste los saludos, el verbo to be, los posesivos, las preposiciones de lugar y los imperativos. Tu viaje continúa en la ciudad... Esa noche, en casa, escribes todo en tu diario.',
      cast,
    },
  ]
}

export function Epilogue({ state, onDone }: { state: GameState; onDone: () => void }) {
  const steps = buildSteps(state)
  const [i, setI] = useState(0)
  const [hideEs, setHideEs] = useState(false)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const s = steps[i]
  const last = i === steps.length - 1
  const waiting = !!s.choice && !solved
  const interest = interestFriend(state.interest, state.hero.name)

  const names: Record<Who, string> = {
    narrator: '',
    leo: 'Leo',
    maya: 'Maya',
    interest: state.interest.name,
    villain: '???',
    hero: state.hero.name,
  }

  function next() {
    setSolved(false)
    setTip(null)
    if (last) onDone()
    else setI(i + 1)
  }

  const shown = s.cast ?? []
  const spots = shown.length === 3 ? [88, 150, 212] : [110, 190]

  return (
    <div className="mx-auto flex h-full max-w-md flex-col justify-center gap-4 overflow-y-auto px-4 py-6">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">Capítulo 1 · Final</p>
      <svg viewBox="0 0 320 200" className="w-full rounded-2xl border-2 border-line" role="img" aria-label="Entrada de la escuela">
        <rect width="320" height="200" fill="#f2c79a" />
        <rect width="320" height="120" fill="#e9a77a" />
        <circle cx="270" cy="40" r="22" fill="#f6d36b" />
        <rect x="40" y="40" width="200" height="100" fill="#d8c8b0" />
        <polygon points="30,42 140,10 250,42" fill="#9c5a3c" />
        <rect x="88" y="22" width="104" height="16" rx="3" fill="#2f5d50" />
        <text x="140" y="34" textAnchor="middle" fontSize="9" fill="#f4efe4" fontFamily={FONT}>GREENFIELD SCHOOL</text>
        <rect x="120" y="90" width="40" height="50" fill="#7a5230" />
        <rect x="55" y="60" width="30" height="28" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="3" />
        <rect x="195" y="60" width="30" height="28" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="3" />
        <rect y="140" width="320" height="60" fill="#8fbf6a" />
        <rect x="118" y="140" width="44" height="60" fill="#cdb79a" />

        <g transform="translate(10 128) scale(2)">
          <SpriteBody look={heroLook(state)} />
        </g>
        {shown.map((who, k) => {
          const look = who === 'leo' ? FRIENDS.leo.look : who === 'maya' ? FRIENDS.maya.look : interest.look
          return (
            <g key={who} transform={`translate(${spots[k] + 64} 128) scale(-2 2)`}>
              <SpriteBody look={look} />
            </g>
          )
        })}
        {s.villain && (
          <g className="anim-appear">
            <path d="M282 196 L288 136 Q300 118 312 136 L318 196 Z" fill="#2d2440" />
            <ellipse cx="300" cy="143" rx="10" ry="11" fill="#15111f" />
            <circle cx="296" cy="143" r="1.8" fill="#e0a526" />
            <circle cx="304" cy="143" r="1.8" fill="#e0a526" />
          </g>
        )}
      </svg>
      {s.clock && (
        <div className="anim-pop -mt-2 flex items-center justify-center gap-3">
          <TimeClock pieces={Math.max(1, state.relics)} size={84} />
          <p className="text-sm text-paper/75">Reloj del tiempo: {Math.max(1, state.relics)} de {WORLD.length} piezas</p>
        </div>
      )}

      <Panel>
        {names[s.who] && (
          <div className="flex items-center justify-between">
            <p className={`font-display text-lg ${s.who === 'villain' ? 'text-[#b9a3e8]' : 'text-gold'}`}>{names[s.who]}</p>
            {s.who !== 'hero' && <SpeakButton text={s.text} size="sm" />}
          </div>
        )}
        <p key={i} className={`anim-fade-in text-[17px] leading-relaxed ${s.who === 'narrator' ? 'italic text-paper/85' : ''}`}>
          {s.who === 'hero' && solved ? `"${s.choice!.options[s.choice!.answer]}"` : s.who === 'narrator' || s.who === 'hero' ? s.text : <Tappable text={s.text} />}
        </p>
        {!hideEs && s.es && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}

        {waiting && (
          <div className="mt-3 grid gap-2">
            {s.choice!.options.map((o, k) => (
              <button
                key={k}
                className={`${btn} text-left text-base`}
                onClick={() => (k === s.choice!.answer ? (setSolved(true), setTip(null)) : setTip(s.choice!.tip))}
              >
                {o}
              </button>
            ))}
          </div>
        )}
        {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
        {s.choice && solved && (
          <div className="anim-fade-in mt-2 flex items-center gap-2">
            <p className="text-sm font-semibold text-hp">¡Muy bien!</p>
            <SpeakButton text={s.choice.options[s.choice.answer]} size="sm" />
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          {s.es ? (
            <button className={btnGhost} onClick={() => setHideEs((v) => !v)}>{hideEs ? 'Traducir' : 'Ocultar'}</button>
          ) : <span />}
          {!waiting && (
            <button className={btnPrimary} onClick={next} autoFocus>
              {last ? 'Ir al mapa' : 'Siguiente'}
            </button>
          )}
        </div>
      </Panel>
    </div>
  )
}
