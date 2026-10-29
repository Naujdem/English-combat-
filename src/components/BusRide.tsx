import { useState } from 'react'
import { SpriteBody, type SpriteLook } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { btn, btnPrimary, Panel } from './ui'
import { FRIENDS } from '../data/friends'
import { NPCS } from '../data/npcs'

/**
 * Viaje en autobús entre lugares del mapa: comprar el boleto con el conductor.
 * Repasa saludos, números, "Here you are" y una orden sencilla.
 */
type Step = { who: 'narrator' | 'leo' | 'driver'; text: string; es: string; choice?: { options: string[]; answer: number; tip: string } }

export type BusTrip = { place: string; placeEs: string; price: string; priceNum: string; wrongPrices: [string, string]; arrival: { text: string; es: string }; sign: string; intro?: string; three?: boolean
  /** Viaje en bicicleta (granja): pasos propios y otro dibujo */
  bike?: { steps: Step[]; person: string }
  /** Pasos propios para un viaje en autobús */
  steps?: Step[]
  /** Viaje con el reloj del tiempo (otro dibujo) */
  art?: 'clock' | 'walk'
  /** Texto del botón final */
  end?: string
}

export const BUS_TO_CITY: BusTrip = {
  place: 'the city',
  placeEs: 'la ciudad',
  price: 'two dollars',
  priceNum: '$2',
  wrongPrices: ['$12', '$20'],
  arrival: { text: 'Look! There is a big fountain, and there are a lot of shops!', es: '¡Mira! ¡Hay una fuente grande y hay muchas tiendas!' },
  sign: 'CITY BUS',
}

/** A la granja en bicicleta por el camino viejo: preguntar el camino con Does...? */
export const BIKE_TO_FARM: BusTrip = {
  place: 'the farm',
  placeEs: 'la granja',
  price: '',
  priceNum: '',
  wrongPrices: ['', ''],
  arrival: { text: '', es: '' },
  sign: 'FARM 3 km',
  three: true,
  bike: {
    person: 'Mr. Gray',
    steps: [
      { who: 'narrator', text: 'Al día siguiente, Leo, {iname} y tú van en bicicleta por el camino viejo. Nick les prestó la suya.', es: '' },
      { who: 'leo', text: "Look! A sign: FARM, three kilometers. Let's go!", es: '¡Mira! Un letrero: GRANJA, tres kilómetros. ¡Vamos!' },
      { who: 'narrator', text: 'En el camino, un señor arregla una cerca. Paran a preguntarle.', es: '' },
      {
        who: 'driver',
        text: 'Hello, kids! Do you need help?',
        es: '¡Hola, chicos! ¿Necesitan ayuda?',
        choice: { options: ['Yes, please. Do this road go to the farm?', 'Yes, please. Does this road go to the farm?', 'Yes, please. Does this road goes to the farm?'], answer: 1, tip: '"This road" es "it": Does + verbo sin -s. Does this road go...?' },
      },
      {
        who: 'driver',
        text: "Yes, it does! Mr. Brown's farm is next to the big tree. Do you like animals?",
        es: '¡Sí! La granja del señor Brown está al lado del árbol grande. ¿Les gustan los animales?',
        choice: { options: ['Yes, we does!', 'Yes, we are!', 'Yes, we do!'], answer: 2, tip: 'Respuesta corta con we: Yes, we do.' },
      },
      { who: 'driver', text: "Be careful. The animals on that farm are very strange today. They... talk!", es: 'Tengan cuidado. Los animales de esa granja están muy raros hoy. Ellos... ¡hablan!' },
      { who: 'leo', text: "Animals that talk? I don't believe it! Come on, let's go!", es: '¿Animales que hablan? ¡No lo creo! ¡Vamos, vamos!' },
    ],
  },
}

/** A la oficina en autobús por la carretera: practicar la hora */
export const BUS_TO_OFFICE: BusTrip = {
  place: 'Office Park',
  placeEs: 'la zona de oficinas',
  price: 'two dollars',
  priceNum: '$2',
  wrongPrices: ['$12', '$20'],
  arrival: { text: '', es: '' },
  sign: 'OFFICE PARK',
  three: true,
  steps: [
    { who: 'narrator', text: 'Al día siguiente, Leo, {iname} y tú esperan el autobús en la carretera, al lado de la granja.', es: '' },
    {
      who: 'leo',
      text: "My watch says 8:45. What time is it? I can't read it!",
      es: 'Mi reloj marca 8:45. ¿Qué hora es? ¡No lo sé leer!',
      choice: { options: ["It's quarter to nine.", "It's quarter past nine.", "It's eight and forty-five."], answer: 0, tip: '8:45 = quarter to nine (falta un cuarto para las nueve).' },
    },
    {
      who: 'driver',
      text: 'Good morning! This bus goes to Office Park. We arrive at half past nine.',
      es: '¡Buenos días! Este autobús va a la zona de oficinas. Llegamos a las nueve y media.',
      choice: { options: ['At 9:30.', 'At 9:15.', 'At 8:30.'], answer: 0, tip: '"Half past nine" = 9:30.' },
    },
    {
      who: 'driver',
      text: 'Tickets are two dollars each.',
      es: 'Los boletos cuestan dos dólares cada uno.',
      choice: { options: ['Could we have three tickets, please?', 'Could we to have three tickets?', 'Give we three tickets!'], answer: 0, tip: 'Para pedir con cortesía: Could we have..., please?' },
    },
    { who: 'driver', text: 'Sure! Here you are. Sit down, please. Next stop: Office Park!', es: '¡Claro! Aquí tienen. Siéntense, por favor. Próxima parada: ¡la zona de oficinas!' },
    { who: 'leo', text: 'Look! A big office: Green Valley Company. The last piece of the clock is there!', es: '¡Mira! Una oficina grande: Green Valley Company. ¡La última pieza del reloj está ahí!' },
  ],
}

/** El viaje en el tiempo a 1996: llegada a la escuela vieja */
export const CLOCK_TO_1996: BusTrip = {
  place: 'the past',
  placeEs: '1996',
  price: '',
  priceNum: '',
  wrongPrices: ['', ''],
  arrival: { text: '', es: '' },
  sign: 'GREENFIELD SCHOOL · 1996',
  three: true,
  art: 'clock',
  end: 'Entrar a la escuela',
  steps: [
    { who: 'narrator', text: 'La luz blanca se apaga. Huele a tiza y a madera. Estás en un patio de tierra, frente a una escuela pequeña de ladrillo.', es: '' },
    { who: 'leo', text: 'Where are we? ... Look at the sign: GREENFIELD SCHOOL, 1996!', es: '¿Dónde estamos? ... Mira el letrero: ¡ESCUELA GREENFIELD, 1996!' },
    {
      who: 'leo',
      text: '1996! That was thirty years ago! What can you see?',
      es: '¡1996! ¡Eso fue hace treinta años! ¿Qué ves?',
      choice: { options: ['The school was small, and the walls were red!', 'The school were small, and the walls was red!', 'The school is small yesterday!'], answer: 0, tip: 'Una escuela: was. Varias paredes: were.' },
    },
    { who: 'narrator', text: 'Sientes algo en la garganta: unas palabras que todavía no puedes decir. Tu voz del pasado también está aquí, en pedazos.', es: '' },
    { who: 'leo', text: "Listen! There are voices in the classroom. Come on, let's go!", es: '¡Escucha! Hay voces en el salón. ¡Vamos!' },
  ],
}

/** A pie por la carretera destapada: de la escuela de 1996 a la ciudad vieja */
export const WALK_TO_OLD_CITY: BusTrip = {
  place: 'the old city',
  placeEs: 'la ciudad de 1996',
  price: '',
  priceNum: '',
  wrongPrices: ['', ''],
  arrival: { text: '', es: '' },
  sign: 'MARKET',
  three: true,
  art: 'walk',
  end: 'Entrar a la ciudad',
  steps: [
    { who: 'narrator', text: 'Salen de la escuela por la carretera de tierra. No hay carros: solo una carreta, unas gallinas y mucho polvo.', es: '' },
    { who: 'leo', text: 'Look! This is our city... thirty years ago! There was no fountain and there were no cars.', es: '¡Mira! Esta es nuestra ciudad... ¡hace treinta años! No había fuente y no había carros.' },
    {
      who: 'leo',
      text: 'We walked a lot! Tell me, what did we do this morning?',
      es: '¡Caminamos mucho! Dime, ¿qué hicimos esta mañana?',
      choice: { options: ['We helped Greg and we talked to Mrs. Higgins.', 'We help Greg yesterday and we talk to Mrs. Higgins.', 'We helpped Greg and we talkd to Mrs. Higgins.'], answer: 0, tip: 'Para contar lo que ya pasó, el verbo lleva -ed: helped, talked.' },
    },
    { who: 'leo', text: 'Yes! Helped, talked... In the past, the verbs have -ED at the end. Easy!', es: '¡Sí! Helped, talked... En pasado, los verbos llevan -ed al final. ¡Fácil!' },
    { who: 'narrator', text: 'Al fondo se ve un mercado con toldos rojos y un letrero: MARKET. Tu voz se siente un poco más cerca.', es: '' },
  ],
}

export const BUS_TO_BARRIO: BusTrip = {
  place: 'Green Street',
  placeEs: 'Green Street, el barrio de Leo',
  price: 'three dollars',
  priceNum: '$3',
  wrongPrices: ['$13', '$30'],
  arrival: { text: 'This is my street! My house is the yellow one. And look: your house is next to the park!', es: '¡Esta es mi calle! Mi casa es la amarilla. Y mira: ¡tu casa está al lado del parque!' },
  sign: 'GREEN ST.',
  three: true,
  intro: 'Al día siguiente, después de clase, Leo, {iname} y tú toman otro autobús. Van a Green Street: Leo vive allá... y tú también, en Park Street.',
}

function steps(t: BusTrip, iname: string): Step[] {
  return (t.bike ? t.bike.steps : t.steps ? t.steps : [
    { who: 'narrator', text: t.intro ?? `Al día siguiente, Leo y tú van a la parada de autobús. Van a ${t.placeEs}.`, es: '' },
    { who: 'leo', text: "Here is the bus! Let's buy our tickets.", es: '¡Aquí está el autobús! Compremos los boletos.' },
    {
      who: 'driver',
      text: 'Good morning! Where are you going?',
      es: '¡Buenos días! ¿A dónde van?',
      choice: { options: [`To ${t.place}, please.`, `In ${t.place}, please.`, `${t.place[0].toUpperCase()}${t.place.slice(1)} is me.`], answer: 0, tip: `Para decir a dónde vas: To + lugar. "To ${t.place}, please."` },
    },
    {
      who: 'driver',
      text: 'OK! How many tickets?',
      es: '¡Bien! ¿Cuántos boletos?',
      choice: t.three
        ? { options: ['Three tickets, please.', 'Three ticket, please.', 'Three tickets, thank.'], answer: 0, tip: 'Son tres (Leo, {iname} y tú): three tickets (plural con -s), please.' }
        : { options: ['Two tickets, please.', 'Two ticket, please.', 'Two tickets, thank.'], answer: 0, tip: 'Leo y tú son dos: two tickets (plural con -s), please.' },
    },
    {
      who: 'driver',
      text: `That's ${t.price} each.`,
      es: 'Cada uno cuesta eso.',
      choice: { options: [t.wrongPrices[0], t.priceNum, t.wrongPrices[1]], answer: 1, tip: `Escucha otra vez: "${t.price}" = ${t.priceNum}.` },
    },
    {
      who: 'driver',
      text: 'Can I have the money, please?',
      es: '¿Me da el dinero, por favor?',
      choice: { options: ['Here are you.', 'You are here.', 'Here you are.'], answer: 2, tip: 'Al entregar algo se dice: Here you are.' },
    },
    { who: 'driver', text: `Thank you! Sit down, please. Next stop: ${t.place}!`, es: `¡Gracias! Siéntense, por favor. Próxima parada: ¡${t.placeEs}!` },
    { who: 'leo', text: t.arrival.text, es: t.arrival.es },
  ] as Step[]).map((st) => ({ ...st, text: st.text.replaceAll('{iname}', iname), choice: st.choice && { ...st.choice, tip: st.choice.tip.replaceAll('{iname}', iname) } }))
}

export function BusRide({ trip, hero, friend, friendName = '', onDone }: { trip: BusTrip; hero: SpriteLook; friend?: SpriteLook; friendName?: string; onDone: () => void }) {
  const list = steps(trip, friendName)
  const [i, setI] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const s = list[i]
  const last = i === list.length - 1
  const waiting = !!s.choice && !solved
  const moving = trip.bike || trip.art ? i >= 1 : i >= 6

  function next() {
    setSolved(false)
    setTip(null)
    if (last) onDone()
    else setI(i + 1)
  }

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-ink">
      <div className="mx-auto flex max-w-md flex-col gap-3 px-3 py-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">{trip.art === 'clock' ? 'Viaje en el tiempo' : trip.art === 'walk' ? 'A pie' : trip.bike ? 'En bicicleta' : 'En el autobús'}</p>
        <svg viewBox="0 0 320 170" className="w-full rounded-2xl border-2 border-line" role="img" aria-label={`Autobús a ${trip.placeEs}`}>
          <rect width="320" height="170" fill="#bfe3f5" />
          <rect y="128" width="320" height="42" fill="#6b6b73" />
          {Array.from({ length: 6 }).map((_, k) => <rect key={k} x={k * 60 + 8} y="148" width="30" height="4" fill="#f2d16b" />)}
          {trip.art === 'clock' ? (
            <g>
              <rect width="320" height="170" fill="#e9dcc0" />
              <rect y="120" width="320" height="50" fill="#c2a878" />
              <rect x="70" y="40" width="180" height="82" fill="#a4553a" />
              <polygon points="60,42 160,10 260,42" fill="#6b3a2a" />
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((r) => <line key={r} x1="70" y1={48 + r * 9} x2="250" y2={48 + r * 9} stroke="#7d3f2a" />)}
              <rect x="110" y="50" width="100" height="14" rx="2" fill="#f4efe4" />
              <text x="160" y="60" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2b241c" fontFamily="Fredoka, Nunito, system-ui, sans-serif">{trip.sign}</text>
              <rect x="146" y="82" width="28" height="40" fill="#5a3a1a" />
              <circle cx="160" cy="95" r={moving ? 0 : 70} fill="#ffffff" opacity="0.85" style={{ transition: 'r 900ms ease-out' }} />
              {(trip.three && friend ? [hero, FRIENDS.leo.look, friend] : [hero, FRIENDS.leo.look]).map((look, k) => (
                <g key={k} transform={`translate(${40 + k * 90} 104) scale(1.3)`}><SpriteBody look={look} /></g>
              ))}
            </g>
          ) : trip.art === 'walk' ? (
            <g>
              <rect width="320" height="170" fill="#cfe6f2" />
              <path d="M0 112 Q90 92 170 104 T320 98 V130 H0 Z" fill="#a9c47e" />
              <rect x="196" y="58" width="48" height="56" fill="#a4553a" />
              <rect x="248" y="70" width="40" height="44" fill="#c98b4a" />
              <polygon points="192,60 220,40 248,60" fill="#6b3a2a" />
              <rect x="208" y="74" width="10" height="12" fill="#cfe4ec" />
              <rect x="226" y="74" width="10" height="12" fill="#cfe4ec" />
              <rect x="246" y="64" width="44" height="8" fill="#d64545" />
              <rect x="252" y="40" width="34" height="11" rx="2" fill="#f4efe4" stroke="#8b5a2b" strokeWidth="1.5" />
              <text x="269" y="48.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2b241c" fontFamily="Fredoka, Nunito, system-ui, sans-serif">{trip.sign}</text>
              <rect y="128" width="320" height="42" fill="#b8946a" />
              <path d="M0 140 H320 M0 158 H320" stroke="#9c7a52" strokeWidth="2" strokeDasharray="10 8" />
              <g transform="translate(150 116)">
                <rect x="0" y="0" width="34" height="12" rx="2" fill="#8b5a2b" />
                <circle cx="7" cy="15" r="5" fill="none" stroke="#5a3a1a" strokeWidth="2" />
                <circle cx="27" cy="15" r="5" fill="none" stroke="#5a3a1a" strokeWidth="2" />
              </g>
              {(trip.three && friend ? [hero, FRIENDS.leo.look, friend] : [hero, FRIENDS.leo.look]).map((look, k) => (
                <g key={k} transform={`translate(${24 + k * 40} 100)`}>
                  <g className={moving ? 'anim-bob' : undefined}><SpriteBody look={look} /></g>
                </g>
              ))}
            </g>
          ) : trip.bike ? (
            <g>
              <rect y="0" width="320" height="128" fill="#bfe3f5" />
              <path d="M0 128 Q80 96 160 116 T320 104 V128 Z" fill="#9cc46e" />
              <rect y="128" width="320" height="42" fill="#c9a46a" />
              <rect x="262" y="58" width="5" height="70" fill="#8b5a2b" />
              <rect x="236" y="56" width="62" height="20" rx="3" fill="#f4efe4" stroke="#8b5a2b" strokeWidth="2" />
              <text x="267" y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2b241c" fontFamily="Fredoka, Nunito, system-ui, sans-serif">{trip.sign}</text>
              {(trip.three && friend ? [hero, FRIENDS.leo.look, friend] : [hero, FRIENDS.leo.look]).map((look, k) => (
                <g key={k} transform={`translate(${30 + k * 62} 82)`}>
                  <g className={moving ? 'anim-bob' : undefined}>
                  <circle cx="6" cy="44" r="8" fill="none" stroke="#2b2b2b" strokeWidth="3" />
                  <circle cx="38" cy="44" r="8" fill="none" stroke="#2b2b2b" strokeWidth="3" />
                  <path d="M6 44 L18 30 L32 30 L38 44 M18 30 L22 44" fill="none" stroke={['#d64545', '#2f6fd0', '#3b9d5d'][k]} strokeWidth="3" />
                  <g transform="translate(6 -2) scale(1.1)"><SpriteBody look={look} /></g>
                  </g>
                </g>
              ))}
            </g>
          ) : (
          <g className={moving ? 'anim-bob' : undefined}>
            <rect x="20" y="40" width="280" height="92" rx="12" fill="#e0a526" />
            <rect x="20" y="104" width="280" height="10" fill="#c98b1a" />
            {[0, 1, 2, 3].map((k) => <rect key={k} x={36 + k * 52} y="52" width="44" height="40" rx="4" fill="#d9eef8" />)}
            <rect x="248" y="52" width="40" height="70" rx="4" fill="#d9eef8" stroke="#c98b1a" strokeWidth="2" />
            <g transform="translate(44 58) scale(1.05)"><SpriteBody look={hero} /></g>
            <g transform="translate(96 58) scale(1.05)"><SpriteBody look={FRIENDS.leo.look} /></g>
            {trip.three && friend && <g transform="translate(148 58) scale(1.05)"><SpriteBody look={friend} /></g>}
            <g transform="translate(252 66) scale(1.05)"><SpriteBody look={NPCS.driver.look} /></g>
            <circle cx="70" cy="132" r="12" fill="#2b2b2b" />
            <circle cx="250" cy="132" r="12" fill="#2b2b2b" />
            <text x="150" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2b241c" fontFamily="Fredoka, Nunito, system-ui, sans-serif">{trip.sign}</text>
          </g>
          )}
        </svg>

        <Panel>
          {s.who !== 'narrator' && (
            <div className="flex items-center justify-between">
              <p className="font-display text-lg text-gold">{s.who === 'leo' ? 'Leo' : trip.bike ? trip.bike.person : NPCS.driver.name}</p>
              <SpeakButton text={s.text} size="sm" auto voice="male" />
            </div>
          )}
          <p key={i} className={`anim-fade-in text-[17px] leading-relaxed ${s.who === 'narrator' ? 'italic text-paper/85' : ''}`}>{s.text}</p>
          {s.es && s.who !== 'narrator' && showEs && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}
          {s.es && s.who !== 'narrator' && (
            <button className="mt-1 text-xs font-semibold text-paper/55 underline underline-offset-4" onClick={() => setShowEs((v) => !v)}>
              {showEs ? 'Ocultar traducción' : 'Traducir'}
            </button>
          )}

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
              <p className="text-sm font-semibold text-hp">¡Bien! "{s.choice.options[s.choice.answer]}"</p>
              <SpeakButton text={s.choice.options[s.choice.answer]} size="sm" />
            </div>
          )}
          {!waiting && (
            <button className={`${btnPrimary} mt-4 w-full`} onClick={next} autoFocus>
              {last ? (trip.end ?? (trip.bike ? 'Llegar a la granja' : 'Bajar del autobús')) : 'Siguiente'}
            </button>
          )}
        </Panel>
      </div>
    </div>
  )
}
