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
import { ENEMIES } from '../data/enemies'

const FONT = 'Fredoka, Nunito, system-ui, sans-serif'

type Who = 'narrator' | 'leo' | 'maya' | 'interest' | 'villain' | 'hero' | 'nick'
type Cast = 'leo' | 'maya' | 'interest' | 'nick'
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
  cast?: Cast[]
}

/**
 * Final del capítulo 1: al salir de la escuela, Leo y la persona especial esperan.
 * El protagonista habla por primera vez, presenta a sus amigos, aparece el villano
 * y todos se despiden. Practica "This is..." y las despedidas.
 */
function buildSteps(s: GameState, sceneId: string): Step[] {
  if (sceneId === 'city') return citySteps(s)
  if (sceneId === 'barrio') return barrioSteps(s)
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

/**
 * Final del capítulo 2: al salir de la oficina de turismo. Repasa there is/are,
 * aparece el desconocido y Leo cuenta que vive en Green Street, el barrio.
 */
function citySteps(s: GameState): Step[] {
  const name = s.hero.name
  const iname = s.interest.name
  const cast: ('leo' | 'maya' | 'interest')[] = ['leo', 'interest']
  return [
    { who: 'narrator', text: `Sales de la oficina de turismo. Al lado de la fuente, Leo y ${iname} miran los peces.`, cast },
    { who: 'leo', text: `${name}! Is Mr. Rossi OK now?`, es: `¡${name}! ¿El señor Rossi ya está bien?`, cast },
    {
      who: 'hero',
      text: '¿Qué le respondes a Leo?',
      cast,
      clock: true,
      choice: {
        options: ['Yes, he is. And look: another piece of the clock!', 'Yes, he are. Look at the clock!', "No, he isn't. He is a fish."],
        answer: 0,
        tip: 'Con "he" va "is": Yes, he is. Y muéstrales la pieza del reloj.',
      },
    },
    { who: 'interest', text: 'Wow! There are two pieces now. And there is a little light inside!', es: '¡Guau! Ahora hay dos piezas. ¡Y hay una lucecita adentro!', cast, clock: true },
    { who: 'narrator', text: 'Leo se acerca a la fuente para contar los peces. Entonces, una voz ronca suena a tu lado.', cast },
    { who: 'villain', text: 'Two pieces... You are fast. Very fast.', es: 'Dos piezas... Eres rápido. Muy rápido.', villain: true, cast },
    { who: 'villain', text: 'But the next piece is on Green Street. And this time, I am going to find it first!', es: 'Pero la siguiente pieza está en Green Street. ¡Y esta vez yo la voy a encontrar primero!', villain: true, cast },
    { who: 'narrator', text: 'Cuando Leo se da vuelta, el desconocido ya no está. Solo queda un poco de humo oscuro.', cast },
    { who: 'leo', text: 'Who was that? ... Wait. Green Street? My house is on Green Street!', es: '¿Quién era? ... Espera. ¿Green Street? ¡Mi casa está en Green Street!', cast },
    {
      who: 'hero',
      text: '¿Qué les propones?',
      cast,
      choice: {
        options: ["Let's go to Green Street tomorrow!", 'Go to Green Street yesterday!', 'Green Street are my house!'],
        answer: 0,
        tip: 'Para proponer algo se dice "Let\'s + verbo": Let\'s go! (¡Vamos!).',
      },
    },
    { who: 'interest', text: 'Can I come too?', es: '¿Puedo ir yo también?', cast },
    {
      who: 'hero',
      text: `¿Qué le respondes a ${iname}?`,
      cast,
      choice: {
        options: ['Yes, of course!', "No, I can't swim.", 'Yes, I am a bank.'],
        answer: 0,
        tip: '"Yes, of course!" significa "¡Sí, claro!". Las otras respuestas no tienen sentido aquí.',
      },
    },
    { who: 'leo', text: 'Great! Tomorrow we take the bus to Green Street. My family is very nice. See you tomorrow!', es: '¡Genial! Mañana tomamos el autobús a Green Street. Mi familia es muy amable. ¡Nos vemos mañana!', cast },
    {
      who: 'hero',
      text: '¿Cómo te despides?',
      cast,
      choice: {
        options: ['See you tomorrow, Leo!', 'Good morning, Leo!', 'Nice to meet you, Leo!'],
        answer: 0,
        tip: 'Para despedirse hasta mañana: "See you tomorrow!".',
      },
    },
    {
      who: 'narrator',
      text: 'Fin del capítulo 2: La ciudad. Recuperaste there is / there are, this / these, los precios y cómo pedir en un café. Tu viaje continúa en Green Street, el barrio de Leo... Esa noche, escribes en tu diario.',
      cast,
    },
  ]
}

/**
 * Final del capítulo 3: Nick vuelve a ser él mismo, la fiesta de Leo sigue en el parque.
 * Repasa presente simple, have got y can. El regalo misterioso de "L" y la voz ronca
 * que sabe el nombre de Leo.
 */
function barrioSteps(s: GameState): Step[] {
  const name = s.hero.name
  const iname = s.interest.name
  const cast: Cast[] = ['leo', 'maya', 'interest']
  const withNick: Cast[] = ['nick', 'leo', 'interest']
  return [
    { who: 'narrator', text: `Nick y tú salen de la casa. En el parque, la fiesta de Leo sigue: Leo, Maya y ${iname} los esperan al lado del pastel.`, cast: withNick },
    { who: 'leo', text: `${name}! Is that your brother? Is he OK now?`, es: `¡${name}! ¿Ese es tu hermano? ¿Ya está bien?`, cast: withNick },
    {
      who: 'hero',
      text: 'Presenta a Nick.',
      cast: withNick,
      choice: {
        options: ['Yes! Leo, this is my brother Nick. He likes playing basketball.', 'Yes! Leo, this is my brother Nick. He like play basketball.', 'Yes! Leo, these is my brother Nick.'],
        answer: 0,
        tip: 'This is + persona. Y con "he": likes + verbo con -ing.',
      },
    },
    { who: 'nick', text: "Hi, Leo! Happy birthday! Sorry... I don't remember this morning. My head hurts.", es: '¡Hola, Leo! ¡Feliz cumpleaños! Perdón... no recuerdo esta mañana. Me duele la cabeza.', cast: withNick },
    { who: 'maya', text: 'Look at the clock! There are three pieces now. And the light is brighter!', es: '¡Miren el reloj! Ahora hay tres piezas. ¡Y la luz brilla más!', cast, clock: true },
    { who: 'leo', text: 'Now, my gift! The gift from "L". Let\'s open it!', es: '¡Ahora, mi regalo! El regalo de "L". ¡Abrámoslo!', cast },
    { who: 'narrator', text: 'Dentro hay una tarjeta vieja. La letra es temblorosa. Leo la lee en voz alta.', cast },
    { who: 'leo', text: '"Happy birthday, Leo. Be brave. Use your voice." ... Use my voice? What does it mean?', es: '"Feliz cumpleaños, Leo. Sé valiente. Usa tu voz." ... ¿Usar mi voz? ¿Qué significa?', cast },
    {
      who: 'hero',
      text: '¿Qué le respondes a Leo?',
      cast,
      choice: {
        options: ["I don't know. But you always help me, Leo.", "I doesn't know. But you always helps me.", "I don't know. But you help always me."],
        answer: 0,
        tip: 'Con "I" y "you" el verbo va sin -s, y always va antes del verbo: you always help.',
      },
    },
    { who: 'narrator', text: 'Leo se agacha a recoger el papel de regalo. Entonces, una voz ronca suena detrás del árbol.', cast },
    { who: 'villain', text: 'Happy birthday... Leo.', es: 'Feliz cumpleaños... Leo.', villain: true, cast },
    { who: 'villain', text: 'And you... three pieces. The next piece is at the farm. The animals are waiting for you.', es: 'Y tú... tres piezas. La siguiente pieza está en la granja. Los animales te están esperando.', villain: true, cast },
    { who: 'narrator', text: 'Leo levanta la cabeza. Detrás del árbol no hay nadie.', cast },
    { who: 'leo', text: 'Did you hear that? That voice... He knows my name! How?', es: '¿Oyeron eso? Esa voz... ¡Sabe mi nombre! ¿Cómo?', cast },
    { who: 'interest', text: 'He is going to the farm. We can take the old road tomorrow.', es: 'Va a la granja. Mañana podemos tomar el camino viejo.', cast },
    {
      who: 'hero',
      text: `¿Qué le respondes a ${iname}?`,
      cast,
      choice: {
        options: ['Yes! We can go together.', 'Yes! We can to go together.', 'Yes! We cans go together.'],
        answer: 0,
        tip: 'can + verbo, sin "to" y sin -s: we can go.',
      },
    },
    { who: 'nick', text: 'The farm? I have got a bike. You can take it. And be careful, OK?', es: '¿La granja? Tengo una bicicleta. Puedes llevártela. Y ten cuidado, ¿sí?', cast: withNick },
    {
      who: 'hero',
      text: '¿Cómo le respondes a Nick?',
      cast: withNick,
      choice: {
        options: ['Thank you, Nick! See you at home!', 'You are welcome, Nick!', 'Happy birthday, Nick!'],
        answer: 0,
        tip: 'Nick te presta su bicicleta: agradece con "Thank you!".',
      },
    },
    {
      who: 'narrator',
      text: 'Fin del capítulo 3: Green Street. Recuperaste el presente simple y las rutinas, los gustos con -ing, can, el presente continuo y have got. Tu viaje sigue en la granja... Esa noche, en tu propia casa, escribes en tu diario.',
      cast,
    },
  ]
}

export function Epilogue({ state, onDone }: { state: GameState; onDone: () => void }) {
  const city = state.sceneId === 'city'
  const barrio = state.sceneId === 'barrio'
  const steps = buildSteps(state, state.sceneId)
  const [i, setI] = useState(0)
  const [hideEs, setHideEs] = useState(true)
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
    nick: 'Nick',
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
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">{barrio ? 'Capítulo 3 · Final' : city ? 'Capítulo 2 · Final' : 'Capítulo 1 · Final'}</p>
      <svg viewBox="0 0 320 200" className="w-full rounded-2xl border-2 border-line" role="img" aria-label={barrio ? 'Fiesta en el parque de Green Street' : city ? 'Plaza de la ciudad' : 'Entrada de la escuela'}>
        {barrio ? (
          <g>
            <rect width="320" height="200" fill="#bfe3f5" />
            <circle cx="280" cy="34" r="18" fill="#f6d36b" />
            <rect x="20" y="44" width="80" height="76" fill="#f0d27a" />
            <polygon points="12,46 60,16 108,46" fill="#b5523b" />
            <rect x="50" y="84" width="20" height="36" fill="#7a5230" />
            <rect x="120" y="54" width="70" height="66" fill="#d6e0ee" />
            <polygon points="112,56 155,28 198,56" fill="#5b7a99" />
            <rect x="145" y="88" width="18" height="32" fill="#5b7a99" />
            <rect x="216" y="82" width="10" height="40" fill="#7a5230" />
            <circle cx="221" cy="72" r="26" fill="#3b8a3e" />
            <line x1="0" y1="22" x2="200" y2="30" stroke="#8d7c68" />
            {['#d64545', '#e0a526', '#3b9d5d', '#2f6fd0', '#d4537e', '#e0a526', '#3b9d5d'].map((c, k) => (
              <path key={k} d={`M${12 + k * 28} ${22.5 + k * 1.1} l10 0.4 l-5.5 9 z`} fill={c} />
            ))}
            <rect y="120" width="320" height="80" fill="#8fbf6a" />
            <rect x="230" y="126" width="76" height="8" rx="2" fill="#f4efe4" />
            <rect x="240" y="112" width="22" height="15" rx="2" fill="#e88aa8" />
            <rect x="250" y="106" width="2" height="7" fill="#e0a526" />
            <rect x="272" y="116" width="14" height="11" fill="#2f6fd0" />
            <rect x="234" y="134" width="4" height="20" fill="#8d7c68" />
            <rect x="298" y="134" width="4" height="20" fill="#8d7c68" />
          </g>
        ) : city ? (
          <g>
            <rect width="320" height="200" fill="#f0c48c" />
            <rect width="320" height="120" fill="#e5a37a" />
            <circle cx="40" cy="36" r="18" fill="#f6d36b" />
            <rect x="80" y="30" width="70" height="90" fill="#c98b4a" />
            <rect x="150" y="50" width="60" height="70" fill="#8a9bb0" />
            <rect x="210" y="24" width="90" height="96" fill="#2f5d50" />
            <rect x="222" y="34" width="66" height="16" rx="3" fill="#f4efe4" />
            <text x="255" y="46" textAnchor="middle" fontSize="8" fill="#2f5d50" fontFamily={FONT}>TOURIST OFFICE</text>
            {[0, 1].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={90 + c * 28} y={44 + r * 30} width="18" height="18" fill="#e8f2f8" />))}
            <rect y="120" width="320" height="80" fill="#d6d1c7" />
            <ellipse cx="160" cy="150" rx="46" ry="14" fill="#9aa3ad" />
            <ellipse cx="160" cy="147" rx="40" ry="10" fill="#7cc4e6" />
            <rect x="156" y="122" width="8" height="24" fill="#9aa3ad" />
            <circle cx="160" cy="120" r="6" fill="#7cc4e6" />
          </g>
        ) : (
          <g>
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
          </g>
        )}

        <g transform="translate(10 128) scale(2)">
          <SpriteBody look={heroLook(state)} />
        </g>
        {shown.map((who, k) => {
          const look = who === 'leo' ? FRIENDS.leo.look : who === 'maya' ? FRIENDS.maya.look : who === 'nick' ? ENEMIES['barrio-boss'].look : interest.look
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
            {s.who !== 'hero' && <SpeakButton text={s.text} size="sm" auto />}
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
